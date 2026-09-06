// Verify the published artifact, independently of Astro component implementation.
// Run after `npm run build`; no external services or browser are required.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "parse5";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = join(ROOT, "dist");
const ORIGIN = "https://threadandsignal.com";
const GUIDE = "/blog/local-llm-business-workflow/";
const EMAIL = "charles@threadandsignal.com";
const OWNER = "Charles Russella";
const failures = [];
let passed = 0;

function test(name, verify) {
  try {
    verify();
    passed++;
    console.log(`PASS ${name}`);
  } catch (error) {
    failures.push(name);
    console.error(`FAIL ${name}: ${error.message}`);
  }
}

function files(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? files(path) : [path];
  });
}

function nodes(node) {
  return [node, ...(node.childNodes ?? []).flatMap(nodes)];
}

const attr = (node, name) =>
  node.attrs?.find((entry) => entry.name === name)?.value;
const content = (node) =>
  node.nodeName === "#text"
    ? node.value
    : ["script", "style"].includes(node.tagName)
      ? ""
      : (node.childNodes ?? []).map(content).join(" ");
const normalizedText = (node) => content(node).replace(/\s+/g, " ").trim();
const elements = (page, tag) =>
  page.nodes.filter((node) => node.tagName === tag);
const metas = (page, name) =>
  elements(page, "meta").filter(
    (node) => attr(node, "name") === name || attr(node, "property") === name,
  );

function meta(page, name) {
  const matches = metas(page, name);
  assert.equal(matches.length, 1, `${page.url}: expected one ${name}`);
  const value = attr(matches[0], "content");
  assert.ok(value?.trim(), `${page.url}: empty ${name}`);
  return value;
}

function canonical(page) {
  const matches = elements(page, "link").filter(
    (node) => attr(node, "rel") === "canonical",
  );
  assert.equal(matches.length, 1, `${page.url}: expected one canonical`);
  return attr(matches[0], "href");
}

function jsonObjects(value) {
  if (Array.isArray(value)) return value.flatMap(jsonObjects);
  if (!value || typeof value !== "object") return [];
  return [value, ...Object.values(value).flatMap(jsonObjects)];
}

function schemas(page) {
  return elements(page, "script")
    .filter((node) => attr(node, "type") === "application/ld+json")
    .flatMap((node) => {
      const source = (node.childNodes ?? [])
        .map((child) => child.value ?? "")
        .join("");
      return jsonObjects(JSON.parse(source));
    });
}

const hasType = (value, type) => [value["@type"]].flat().includes(type);

assert.ok(
  existsSync(join(DIST, "index.html")),
  "Build the site before running test:site.",
);
const allPages = files(DIST)
  .filter((path) => path.endsWith(".html"))
  .map((path) => {
    const document = parse(readFileSync(path, "utf8"));
    const pathname = `/${relative(DIST, path).split(sep).join("/")}`.replace(
      /index\.html$/,
      "",
    );
    return {
      path,
      url: new URL(pathname, ORIGIN).href,
      document,
      nodes: nodes(document),
    };
  });
const redirect = (page) =>
  elements(page, "meta").some(
    (node) => attr(node, "http-equiv")?.toLowerCase() === "refresh",
  );
const pages = allPages.filter((page) => !redirect(page));
const pageByUrl = new Map(allPages.map((page) => [page.url, page]));
const pageAt = (pathname) => {
  const page = pageByUrl.get(new URL(pathname, ORIGIN).href);
  assert.ok(page, `Missing built page: ${pathname}`);
  return page;
};

test("metadata_contract", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const page of pages) {
    const titlesOnPage = elements(page, "title");
    assert.equal(titlesOnPage.length, 1, `${page.url}: expected one title`);
    const title = normalizedText(titlesOnPage[0]);
    const description = meta(page, "description");
    assert.ok(title, `${page.url}: empty title`);
    assert.ok(!titles.has(title), `${page.url}: duplicate title`);
    assert.ok(
      !descriptions.has(description),
      `${page.url}: duplicate description`,
    );
    titles.add(title);
    descriptions.add(description);
    const headings = elements(page, "h1");
    assert.equal(headings.length, 1, `${page.url}: expected one H1`);
    assert.ok(normalizedText(headings[0]), `${page.url}: empty H1`);
    assert.equal(
      canonical(page),
      page.url,
      `${page.url}: canonical differs from built route`,
    );
    assert.equal(meta(page, "og:url"), page.url);
    assert.equal(meta(page, "og:title"), title);
    assert.equal(meta(page, "og:description"), description);
    assert.equal(meta(page, "twitter:title"), title);
    assert.equal(meta(page, "twitter:description"), description);
    assert.ok(
      !metas(page, "robots").some((node) =>
        /noindex|none/i.test(attr(node, "content")),
      ),
    );
  }
});

test("social_asset", () => {
  const png = readFileSync(join(DIST, "social-card.png"));
  assert.ok(png.length > 100, "Social image is empty or truncated");
  assert.equal(
    png.subarray(0, 8).toString("hex"),
    "89504e470d0a1a0a",
    "Not a PNG",
  );
  assert.equal(png.subarray(12, 16).toString(), "IHDR");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
  assert.ok(
    png.includes(Buffer.from("IDAT")) && png.includes(Buffer.from("IEND")),
  );
  for (const page of pages) {
    assert.equal(meta(page, "og:image"), `${ORIGIN}/social-card.png`);
    assert.equal(meta(page, "og:image:width"), "1200");
    assert.equal(meta(page, "og:image:height"), "630");
    assert.ok(meta(page, "og:image:alt").length > 10);
    assert.equal(meta(page, "twitter:card"), "summary_large_image");
    assert.equal(meta(page, "twitter:image"), meta(page, "og:image"));
    assert.equal(meta(page, "twitter:image:alt"), meta(page, "og:image:alt"));
  }
});

test("structured_data", () => {
  // Parse every block, including service pages, so malformed JSON cannot hide.
  for (const page of pages) schemas(page);
  const home = pageAt("/");
  const homeSchemas = schemas(home);
  for (const type of ["WebSite", "Organization", "Person"]) {
    assert.ok(
      homeSchemas.some((item) => hasType(item, type)),
      `Homepage missing ${type}`,
    );
  }
  for (const type of ["WebSite", "Organization"]) {
    const identity = homeSchemas.find((item) => hasType(item, type));
    assert.equal(identity.name, "Thread & Signal");
    assert.equal(identity.url, home.url);
  }
  assert.equal(
    homeSchemas.find((item) => hasType(item, "Organization")).email,
    EMAIL,
  );
  const person = homeSchemas.find(
    (item) => hasType(item, "Person") && item.name === OWNER,
  );
  assert.ok(person, "Homepage must identify the actual founder");
  assert.ok(
    normalizedText(home.document).includes(OWNER),
    "Founder must be visible",
  );
  const articles = pages.filter(
    (page) =>
      new URL(page.url).pathname.startsWith("/blog/") &&
      page.url !== `${ORIGIN}/blog/`,
  );
  assert.ok(
    articles.length >= 2,
    "Expected the existing article and the buyer guide",
  );
  for (const page of articles) {
    const matching = schemas(page).filter((item) =>
      hasType(item, "BlogPosting"),
    );
    assert.equal(matching.length, 1, `${page.url}: expected one BlogPosting`);
    const article = matching[0];
    assert.equal(article.headline, normalizedText(elements(page, "h1")[0]));
    assert.equal(article.description, meta(page, "description"));
    assert.equal(article.url, page.url);
    const mainEntity =
      typeof article.mainEntityOfPage === "string"
        ? article.mainEntityOfPage
        : article.mainEntityOfPage?.["@id"];
    assert.equal(mainEntity, page.url);
    const author = [article.author].flat().find((item) => item?.name === OWNER);
    assert.ok(
      author && hasType(author, "Person"),
      `${page.url}: missing person author`,
    );
    assert.ok(
      normalizedText(page.document).includes(OWNER),
      `${page.url}: author must be visible`,
    );
    assert.ok(
      author.url && new URL(author.url).protocol === "https:",
      `${page.url}: missing author profile URL`,
    );
    const published = new Date(article.datePublished);
    assert.ok(
      Number.isFinite(published.getTime()),
      `${page.url}: invalid publication date`,
    );
    assert.ok(
      elements(page, "time").some(
        (node) =>
          new Date(attr(node, "datetime")).getTime() === published.getTime(),
      ),
      `${page.url}: publication date differs from visible time`,
    );
    assert.equal(meta(page, "og:type"), "article");
    assert.equal(meta(page, "article:published_time"), article.datePublished);
  }
});

function localFile(url) {
  const pathname = decodeURIComponent(url.pathname);
  const candidate = resolve(DIST, `.${pathname}`);
  assert.ok(
    candidate === DIST || candidate.startsWith(`${DIST}${sep}`),
    `URL escapes dist: ${url}`,
  );
  if (existsSync(candidate) && statSync(candidate).isFile()) return candidate;
  const index = join(candidate, "index.html");
  return existsSync(index) ? index : null;
}

function sitemapLocations(path) {
  const xml = readFileSync(path, "utf8");
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) =>
    match[1].replaceAll("&amp;", "&"),
  );
}

test("sitemap_coverage", () => {
  const indexPath = join(DIST, "sitemap-index.xml");
  const sitemapUrls = sitemapLocations(indexPath);
  assert.ok(sitemapUrls.length, "Sitemap index is empty");
  const listed = sitemapUrls.flatMap((value) => {
    const url = new URL(value);
    assert.equal(url.origin, ORIGIN);
    const path = localFile(url);
    assert.ok(path, `Missing sitemap: ${value}`);
    return sitemapLocations(path);
  });
  assert.equal(new Set(listed).size, listed.length, "Duplicate sitemap URL");
  assert.deepEqual([...listed].sort(), pages.map(canonical).sort());
  for (const alias of ["/portfolio/", "/product/"])
    assert.ok(!listed.includes(`${ORIGIN}${alias}`));
  const robots = readFileSync(join(DIST, "robots.txt"), "utf8");
  assert.match(
    robots,
    /Sitemap:\s*https:\/\/threadandsignal\.com\/sitemap-index\.xml/,
  );
  assert.ok(
    !/^Disallow:\s*\/\s*$/m.test(robots),
    "Robots file blocks the site",
  );
});

test("internal_links", () => {
  const errors = [];
  for (const page of pages) {
    for (const node of page.nodes) {
      const attribute = ["a", "link"].includes(node.tagName)
        ? "href"
        : ["img", "script", "source", "video", "audio"].includes(node.tagName)
          ? "src"
          : null;
      const value = attribute && attr(node, attribute);
      if (!value || /^(mailto:|tel:|data:)/i.test(value)) continue;
      const url = new URL(value, page.url);
      if (url.origin !== ORIGIN) continue;
      const path = localFile(url);
      if (!path) {
        errors.push(`${page.url} -> ${value}`);
        continue;
      }
      if (url.hash && path.endsWith(".html")) {
        const id = decodeURIComponent(url.hash.slice(1).split(":~:text=")[0]);
        if (!id) continue;
        const target = allPages.find((candidate) => candidate.path === path);
        if (
          !target?.nodes.some(
            (element) =>
              attr(element, "id") === id ||
              (element.tagName === "a" && attr(element, "name") === id),
          )
        ) {
          errors.push(`${page.url} -> ${value} (missing fragment)`);
        }
      }
    }
  }
  assert.deepEqual(errors, []);
});

function linksTo(page, pathname) {
  const expected = pathname.replace(/\/$/, "");
  return elements(page, "a").some((node) => {
    const href = attr(node, "href");
    if (!href) return false;
    const url = new URL(href, page.url);
    return (
      url.origin === ORIGIN && url.pathname.replace(/\/$/, "") === expected
    );
  });
}

test("marketing_content", () => {
  const home = pageAt("/");
  const services = pageAt("/services/");
  const contact = pageAt("/contact/");
  assert.ok(normalizedText(home.document).includes(OWNER));
  assert.match(normalizedText(home.document), /automation/i);
  assert.match(normalizedText(home.document), /local.{0,12}(AI|LLM|model)/i);
  for (const page of [home, services])
    assert.ok(linksTo(page, GUIDE), `${page.url}: missing guide link`);
  assert.ok(linksTo(home, "/services/"));
  assert.ok(linksTo(services, "/contact/"));
  assert.equal(
    elements(contact, "form").length,
    0,
    "Preserve the direct-email funnel",
  );
  const emails = elements(contact, "a")
    .map((node) => attr(node, "href"))
    .filter((href) => href?.startsWith("mailto:"));
  assert.ok(
    emails.includes(`mailto:${EMAIL}`),
    "Plain email must remain available",
  );
  const briefs = emails
    .map((href) => new URL(href))
    .filter((url) => url.searchParams.has("body"));
  assert.ok(briefs.length, "Missing prefilled inquiry brief");
  for (const brief of briefs) {
    assert.equal(decodeURIComponent(brief.pathname), EMAIL);
    assert.ok(brief.searchParams.get("subject")?.trim());
    const body = brief.searchParams.get("body");
    assert.ok(
      body.length > 40 && body.includes("\n"),
      "Brief must contain useful readable prompts",
    );
    assert.ok(!body.includes("%0A"), "Brief is double encoded");
  }
});

test("guide_content", () => {
  const guide = pageAt(GUIDE);
  const article = elements(guide, "article")[0];
  assert.ok(article, "Guide needs an article landmark");
  const text = normalizedText(article);
  assert.ok(
    text.split(/\s+/).length >= 500,
    "Buyer guide is unexpectedly short",
  );
  for (const topic of [
    /workflow/i,
    /hardware/i,
    /data/i,
    /evaluat|test/i,
    /maintain|maintenance|ownership/i,
  ])
    assert.match(text, topic);
  assert.ok(text.includes(OWNER));
  assert.ok(linksTo(guide, "/services/"));
  assert.ok(linksTo(guide, "/contact/"));
  assert.ok(
    nodes(article)
      .filter((node) => node.tagName === "a")
      .some((node) =>
        /^https:\/\/(github\.com|developers\.google\.com|docs\.)/.test(
          attr(node, "href") ?? "",
        ),
      ),
    "Guide must link technical sources",
  );
});

console.log(
  `\n${passed} checks passed, ${failures.length} failed across ${pages.length} indexable pages.`,
);
if (failures.length) process.exitCode = 1;
