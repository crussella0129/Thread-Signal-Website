// Check the built customer experience, including redirects and saved GitHub data.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { parse } from "parse5";

const origin = "https://threadandsignal.com";
const root = new URL("../dist/", import.meta.url);
const dist = decodeURIComponent(root.pathname).replace(/^\/(\w:)/, "$1");
const routes = ["/", "/contact/", "/open-source/", "/services/"];
const legacy = {
  "/portfolio/": "/open-source/",
  "/projects/": "/open-source/",
  "/product/": "/open-source/",
  "/animus/": "/open-source/",
  "/skills/": "/services/",
  "/design/": "/services/",
  "/blog/": "/open-source/",
  "/blog/hello-world/": "/contact/",
  "/blog/local-llm-business-workflow/": "/services/",
};
const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(join(dir, entry.name))
      : [join(dir, entry.name)],
  );
const nodes = (node) => [node, ...(node.childNodes || []).flatMap(nodes)];
const attr = (node, name) => node?.attrs?.find((a) => a.name === name)?.value;
const text = (node) =>
  node.nodeName === "#text"
    ? node.value
    : ["script", "style"].includes(node.tagName)
      ? ""
      : (node.childNodes || []).map(text).join(" ");
const elements = (page, tag) => page.nodes.filter((n) => n.tagName === tag);
const meta = (page, name) =>
  attr(
    elements(page, "meta").find(
      (n) => attr(n, "name") === name || attr(n, "property") === name,
    ),
    "content",
  );
const canonical = (page) =>
  attr(
    elements(page, "link").find((n) => attr(n, "rel") === "canonical"),
    "href",
  );
const refresh = (page) =>
  attr(
    elements(page, "meta").find(
      (n) => attr(n, "http-equiv")?.toLowerCase() === "refresh",
    ),
    "content",
  );
const html = files(dist)
  .filter((path) => path.endsWith(".html"))
  .map((path) => {
    const document = parse(readFileSync(path, "utf8"));
    return {
      path,
      route:
        "/" +
        relative(dist, path)
          .split(sep)
          .join("/")
          .replace(/index\.html$/, ""),
      nodes: nodes(document),
      document,
    };
  });
const pages = html.filter((p) => !refresh(p));
const pageAt = (route) => {
  const p = html.find((p) => p.route === route);
  assert.ok(p, `Missing ${route}`);
  return p;
};
let count = 0;
function check(name, fn) {
  fn();
  count++;
  console.log(`PASS ${name}`);
}

check("exactly four canonical pages and four navigation choices", () => {
  assert.deepEqual(pages.map((p) => p.route).sort(), routes);
  for (const p of pages) {
    const nav = elements(p, "nav");
    assert.equal(nav.length, 1);
    const links = nodes(nav[0]).filter((n) => n.tagName === "a");
    assert.deepEqual(links.map((n) => attr(n, "href")).sort(), routes);
    assert.equal(
      links.filter((n) => attr(n, "aria-current") === "page").length,
      1,
    );
    assert.equal(
      attr(
        links.find((n) => attr(n, "aria-current") === "page"),
        "href",
      ),
      p.route,
    );
    assert.equal(elements(p, "h1").length, 1);
    assert.equal(elements(p, "main").length, 1);
    assert.ok(
      elements(p, "a").some((n) => attr(n, "href") === "#main-content"),
    );
    assert.equal(
      elements(p, "script").filter(
        (n) => attr(n, "type") !== "application/ld+json",
      ).length,
      0,
    );
  }
});

check("page metadata, social previews, and both co-owners", () => {
  const titles = new Set();
  const descriptions = new Set();
  for (const p of pages) {
    const title = text(elements(p, "title")[0]).trim();
    const description = meta(p, "description");
    assert.ok(title && description);
    assert.ok(!titles.has(title) && !descriptions.has(description));
    titles.add(title);
    descriptions.add(description);
    assert.equal(canonical(p), origin + p.route);
    assert.equal(meta(p, "og:url"), canonical(p));
    assert.equal(meta(p, "og:title"), title);
    assert.equal(meta(p, "og:description"), description);
    assert.equal(meta(p, "twitter:title"), title);
    assert.equal(meta(p, "og:image"), origin + "/social-card.png");
    assert.equal(meta(p, "twitter:image"), meta(p, "og:image"));
    assert.ok(meta(p, "og:image:alt").length > 10);
    const schema = elements(p, "script").flatMap((n) =>
      JSON.parse((n.childNodes || []).map((c) => c.value || "").join("")),
    );
    for (const name of ["Charles Russella", "Darian Russella"])
      assert.ok(schema.some((s) => s["@type"] === "Person" && s.name === name));
    assert.equal(meta(p, "theme-color"), "#000000");
  }
  const png = readFileSync(new URL("social-card.png", root));
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(png.readUInt32BE(16), 1200);
  assert.equal(png.readUInt32BE(20), 630);
});

check(
  "local links, fragments, and images resolve in the built artifact",
  () => {
    for (const p of pages) {
      for (const a of elements(p, "a")) {
        const href = attr(a, "href");
        assert.ok(href && !/^javascript:/i.test(href));
        if (/^(mailto:|https:)/.test(href)) continue;
        const url = new URL(href, origin + p.route);
        const target = pageAt(url.pathname);
        if (url.hash)
          assert.ok(
            target.nodes.some(
              (n) => attr(n, "id") === decodeURIComponent(url.hash.slice(1)),
            ),
            href,
          );
      }
      for (const img of elements(p, "img")) {
        assert.ok(attr(img, "alt")?.trim());
        assert.ok(
          Number(attr(img, "width")) > 0 && Number(attr(img, "height")) > 0,
        );
        assert.ok(
          existsSync(new URL(attr(img, "src").replace(/^\//, ""), root)),
          attr(img, "src"),
        );
      }
    }
  },
);

check(
  "retired URLs redirect directly to their new home and stay out of the sitemap",
  () => {
    for (const [route, target] of Object.entries(legacy)) {
      const p = pageAt(route);
      assert.ok(refresh(p).includes(target));
      assert.equal(canonical(p), origin + target);
      assert.match(meta(p, "robots"), /noindex/);
    }
    const sitemap = readFileSync(new URL("sitemap-0.xml", root), "utf8");
    const listed = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
      .map((m) => m[1])
      .sort();
    assert.deepEqual(listed, routes.map((r) => origin + r).sort());
  },
);

check(
  "short homepage, scope-based automation pricing, and contact for both owners",
  () => {
    assert.ok(
      text(elements(pageAt("/"), "main")[0])
        .trim()
        .split(/\s+/).length <= 100,
    );
    const services = pageAt("/services/");
    assert.equal(elements(services, "li").length, 3);
    const offers = elements(services, "li");
    assert.match(text(offers[0]), /Scope-based pricing/);
    assert.ok(
      nodes(offers[0]).some(
        (n) => n.tagName === "a" && attr(n, "href") === "/contact/",
      ),
    );
    for (const li of offers.slice(1))
      assert.match(text(li), /\$[\d,]+–\$[\d,]+/);
    assert.match(text(services.document), /Planning estimates in USD/);
    const contact = pageAt("/contact/");
    assert.equal(elements(contact, "form").length, 0);
    const links = elements(contact, "a").map((n) => attr(n, "href"));
    assert.equal(links.filter((h) => h.startsWith("mailto:")).length, 1);
    const brief = new URL(
      links.find((h) => h.startsWith("mailto:") && h.includes("body=")),
    );
    assert.deepEqual(brief.pathname.split(","), [
      "charles@threadandsignal.com",
      "darian@threadandsignal.com",
    ]);
    assert.match(brief.searchParams.get("body"), /What we do now:\r?\n/);
    for (const name of ["Charles Russella", "Darian Russella"])
      assert.ok(text(contact.document).includes(name));
  },
);

check(
  "five real GitHub projects render in saved star order with the saved date",
  () => {
    const snapshot = JSON.parse(
      readFileSync(new URL("../src/data/github.json", import.meta.url), "utf8"),
    );
    const page = pageAt("/open-source/");
    const items = elements(page, "li");
    assert.deepEqual(
      items.map((n) => attr(n, "data-repository")),
      snapshot.repositories.map((r) => r.name),
    );
    for (const [i, repo] of snapshot.repositories.entries()) {
      assert.ok(text(items[i]).includes(`${repo.stars} stars`));
      assert.ok(
        nodes(items[i]).some(
          (n) => n.tagName === "a" && attr(n, "href") === repo.url,
        ),
      );
    }
    assert.equal(
      attr(elements(page, "time")[0], "datetime"),
      snapshot.updatedAt,
    );
  },
);
console.log(
  `${count} site checks passed across ${pages.length} canonical pages and ${Object.keys(legacy).length} redirects.`,
);
