// Check the built customer experience, including redirects and saved GitHub data.
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { parse } from "parse5";
import config from "../astro.config.mjs";

const origin = "https://threadandsignal.com";
const root = new URL("../dist/", import.meta.url);
const dist = decodeURIComponent(root.pathname).replace(/^\/(\w:)/, "$1");
const routes = [
  "/",
  "/contact/",
  "/founders-club/",
  "/open-source/",
  "/yarduluv/",
];
const navRoutes = [
  "/contact/",
  "/founders-club/",
  "/open-source/",
  "/yarduluv/",
];
const yardulumRoutes = ["/", "/yarduluv/", "/founders-club/", "/contact/"];
const TEL = "tel:+13303572440";
const SMS = "sms:+13303572440";
const legacy = {
  "/services/": "/contact/",
  "/coming-soon/": "/yarduluv/",
  "/how-it-works/": "/yarduluv/",
  "/yardulum/": "/yarduluv/",
  "/skills/": "/contact/",
  "/design/": "/contact/",
  "/blog/local-llm-business-workflow/": "/contact/",
  "/portfolio/": "/open-source/",
  "/projects/": "/open-source/",
  "/product/": "/open-source/",
  "/animus/": "/open-source/",
  "/blog/": "/open-source/",
  "/blog/hello-world/": "/contact/",
  "/about/": "/contact/",
  "/founders/": "/founders-club/",
};
const files = (dir) =>
  readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
    entry.isDirectory()
      ? files(join(dir, entry.name))
      : [join(dir, entry.name)],
  );
const nodes = (node) => [node, ...(node.childNodes || []).flatMap(nodes)];
const within = (node, tag) => nodes(node).filter((n) => n.tagName === tag);
const ancestors = (node) => {
  const list = [];
  for (let n = node.parentNode; n; n = n.parentNode) list.push(n);
  return list;
};
const attr = (node, name) => node?.attrs?.find((a) => a.name === name)?.value;
const hasClass = (node, name) =>
  (attr(node, "class") || "").split(/\s+/).includes(name);
// The product name's bold U (Brand.astro) is one word: no space around the <b>.
const text = (node) =>
  node.nodeName === "#text"
    ? node.value
    : ["script", "style"].includes(node.tagName)
      ? ""
      : (node.childNodes || [])
          .map(text)
          .join(hasClass(node, "brand") ? "" : " ");
// Like text(), but SVG titles, descriptions and labels are left out too.
const textNoSvg = (node) =>
  node.nodeName === "#text"
    ? node.value
    : ["script", "style", "svg"].includes(node.tagName)
      ? ""
      : (node.childNodes || [])
          .map(textNoSvg)
          .join(hasClass(node, "brand") ? "" : " ");
const squash = (s) => s.replace(/\s+/g, " ").trim();
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
    const source = readFileSync(path, "utf8");
    const document = parse(source);
    return {
      path,
      source,
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
const stubs = html.filter((p) => refresh(p));
const pageAt = (route) => {
  const p = html.find((p) => p.route === route);
  assert.ok(p, `Missing ${route}`);
  return p;
};
const mainOf = (page) => elements(page, "main")[0];
const titleOf = (page) => squash(text(elements(page, "title")[0]));
const schemaOf = (page) =>
  elements(page, "script").flatMap((n) =>
    JSON.parse((n.childNodes || []).map((c) => c.value || "").join("")),
  );
const linksIn = (node) => within(node, "a").map((n) => attr(n, "href") || "");
const usd = (cents) =>
  "$" +
  (cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
let count = 0;
function check(name, fn) {
  fn();
  count++;
  console.log(`PASS ${name}`);
}

check(
  "five canonical pages, four in the main nav (Founders Club under YardUluv), Home on the logo, Open-Source in the nav and the footer",
  () => {
    assert.deepEqual(pages.map((p) => p.route).sort(), routes);
    for (const p of pages) {
      const nav = elements(p, "nav");
      assert.equal(nav.length, 1, `${p.route}: one <nav>`);
      assert.deepEqual(linksIn(nav[0]).sort(), navRoutes, p.route);
      const header = elements(p, "header").find((n) =>
        hasClass(n, "site-header"),
      );
      assert.ok(header, `${p.route}: site header`);
      const wordmark = within(header, "a").find((n) => hasClass(n, "wordmark"));
      assert.equal(attr(wordmark, "href"), "/", `${p.route}: logo links Home`);
      assert.ok(linksIn(header).includes(TEL), `${p.route}: header phone`);
      const current = p.nodes.filter((n) => attr(n, "aria-current") === "page");
      assert.equal(current.length, 1, `${p.route}: one aria-current`);
      assert.equal(attr(current[0], "href"), p.route, p.route);
      const owner = p.route === "/" ? wordmark : nav[0];
      assert.ok(
        current[0] === owner || ancestors(current[0]).includes(owner),
        `${p.route}: aria-current is on the wrong link`,
      );
      const footer = elements(p, "footer");
      assert.equal(footer.length, 1, `${p.route}: one <footer>`);
      for (const tag of ["nav", "ul", "li"])
        assert.equal(within(footer[0], tag).length, 0, `footer has <${tag}>`);
      const footerLinks = linksIn(footer[0]);
      for (const href of ["/open-source/", TEL, SMS])
        assert.ok(footerLinks.includes(href), `${p.route}: footer ${href}`);
      assert.ok(footerLinks.some((h) => h.startsWith("https://github.com/")));
      const footerText = squash(text(footer[0]));
      assert.ok(footerText.includes("(330) 357-2440"));
      assert.match(footerText, /in development/i);
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
  },
);

check(
  "page metadata, the YardUluv social preview, the phone, and both co-owners",
  () => {
    const titles = new Set();
    const descriptions = new Set();
    for (const p of pages) {
      const title = titleOf(p);
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
      assert.equal(meta(p, "twitter:description"), description);
      assert.equal(meta(p, "og:image"), origin + "/social-card-yarduluv.png");
      assert.equal(meta(p, "twitter:image"), meta(p, "og:image"));
      const alt = meta(p, "og:image:alt");
      assert.match(alt, /YardUluv/);
      assert.match(alt, /in development/i);
      assert.equal(meta(p, "twitter:image:alt"), alt);
      const schema = schemaOf(p);
      for (const name of ["Charles Russella", "Darian Russella"])
        assert.ok(
          schema.some((s) => s["@type"] === "Person" && s.name === name),
        );
      const org = schema.find((s) => s["@type"] === "Organization");
      assert.equal(org?.telephone, "+1-330-357-2440");
      const types = (value) =>
        value && typeof value === "object"
          ? [
              ...[value["@type"]].flat().filter(Boolean),
              ...Object.values(value).flatMap(types),
            ]
          : [];
      for (const type of types(schema))
        assert.ok(
          ![
            "Offer",
            "AggregateRating",
            "Review",
            "Product",
            "SoftwareApplication",
          ].includes(type),
          `${p.route}: JSON-LD ${type}`,
        );
      // Search snippets and link previews cut a description at about 155 characters, so on the
      // YardUluv pages the status words (or the "for life" qualifier) must come before that.
      if (yardulumRoutes.includes(p.route)) {
        const status =
          /in development|being built|we[’']re building|is building|for as long as (you|they) stay (a member|members)/gi;
        const found = [...description.matchAll(status)];
        assert.ok(found.length, `${p.route}: description has no status words`);
        for (const m of found)
          assert.ok(
            m.index + m[0].length <= 155,
            `${p.route}: "${m[0]}" ends after character 155 of the description`,
          );
      }
      assert.equal(meta(p, "theme-color"), "#000000");
      assert.equal(meta(p, "format-detection"), "telephone=no");
    }
    const png = readFileSync(new URL("social-card-yarduluv.png", root));
    assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
    assert.equal(png.readUInt32BE(16), 1200);
    assert.equal(png.readUInt32BE(20), 630);
    assert.ok(!existsSync(new URL("social-card.png", root)));
  },
);

check(
  "links, phone links, fragments, figures, and images resolve in the built artifact",
  () => {
    for (const p of pages) {
      for (const a of elements(p, "a")) {
        const href = attr(a, "href");
        assert.ok(href && !/^javascript:/i.test(href), href);
        assert.ok(!/stripe\.com/i.test(href), `${p.route}: ${href}`);
        if (/^(tel|sms):/i.test(href)) {
          assert.ok([TEL, SMS].includes(href), `${p.route}: ${href}`);
          continue;
        }
        assert.ok(!/^http:/i.test(href), `${p.route}: ${href}`);
        if (/^(mailto:|https:)/.test(href)) continue;
        const url = new URL(href, origin + p.route);
        const target = pages.find((t) => t.route === url.pathname);
        assert.ok(target, `${p.route}: ${href} is not a canonical page`);
        if (url.hash)
          assert.ok(
            target.nodes.some(
              (n) => attr(n, "id") === decodeURIComponent(url.hash.slice(1)),
            ),
            href,
          );
      }
      // The short <title> is the name and the long <desc> the description, so a screen
      // reader reads each once (aria-labelledby on both would read the desc twice).
      for (const svg of within(mainOf(p), "svg")) {
        if (attr(svg, "aria-hidden") === "true") continue;
        assert.equal(attr(svg, "role"), "img", `${p.route}: svg role`);
        for (const [name, tag] of [
          ["aria-labelledby", "title"],
          ["aria-describedby", "desc"],
        ]) {
          const ids = (attr(svg, name) || "").split(/\s+/).filter(Boolean);
          assert.equal(ids.length, 1, `${p.route}: svg ${name} "${ids}"`);
          const target = nodes(svg).find((n) => attr(n, "id") === ids[0]);
          assert.equal(
            target?.tagName,
            tag,
            `${p.route}: svg ${name} -> <${tag}>`,
          );
          assert.ok(squash(text(target)), `${p.route}: empty <${tag}>`);
        }
      }
      // Measurement tags: each label is centred in its yellow box, so the box's slack sits on
      // both sides and a text-spacing override grows the label evenly (FINAL §4.0).
      const tags = within(mainOf(p), "rect").filter(
        (n) => attr(n, "fill") === "#FFD23F",
      );
      if (["/", "/yarduluv/"].includes(p.route))
        assert.ok(
          tags.length >= 3,
          `${p.route}: ${tags.length} measurement tags`,
        );
      for (const rect of tags) {
        const row = rect.parentNode.childNodes.filter((n) => n.tagName);
        const label = row[row.indexOf(rect) + 1];
        assert.equal(
          label?.tagName,
          "text",
          `${p.route}: tag box without a label`,
        );
        const name = `${p.route}: tag "${squash(text(label))}"`;
        assert.equal(
          attr(label, "text-anchor"),
          "middle",
          `${name} text-anchor`,
        );
        assert.equal(
          Number(attr(label, "x")),
          Number(attr(rect, "x")) + Number(attr(rect, "width")) / 2,
          `${name} is not centred in its box`,
        );
      }
      const ids = p.nodes.map((n) => attr(n, "id")).filter(Boolean);
      assert.equal(new Set(ids).size, ids.length, `${p.route}: duplicate id`);
      // The sample sheet scrolls sideways at large text sizes: keyboard users must reach it,
      // and screen readers name it by its caption.
      for (const sheet of p.nodes.filter((n) => hasClass(n, "yd-sheet"))) {
        assert.equal(
          attr(sheet, "tabindex"),
          "0",
          `${p.route}: .yd-sheet tabindex`,
        );
        assert.equal(
          attr(sheet, "role"),
          "region",
          `${p.route}: .yd-sheet role`,
        );
        const label = p.nodes.find(
          (n) => attr(n, "id") === attr(sheet, "aria-labelledby"),
        );
        assert.ok(label && squash(text(label)), `${p.route}: .yd-sheet name`);
      }
      for (const svg of elements(p, "svg"))
        assert.ok(!text(svg).includes("$"), `${p.route}: $ inside an svg`);
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
    assert.deepEqual(
      Object.fromEntries(
        Object.entries(config.redirects).map(([from, to]) => [`${from}/`, to]),
      ),
      legacy,
      "astro.config.mjs redirects and the legacy map differ",
    );
    assert.deepEqual(
      stubs.map((p) => p.route).sort(),
      Object.keys(legacy).sort(),
    );
    for (const [route, target] of Object.entries(legacy)) {
      assert.ok(routes.includes(target), `${route} chains to ${target}`);
      const p = pageAt(route);
      assert.equal(refresh(p).match(/url=(.*)$/i)?.[1], target, route);
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
  "honest YardUluv status, sample prices, and contact for both owners",
  () => {
    // (a) Home budget, measured on the build: 384 words with <svg> excluded.
    const home = pageAt("/");
    const words = squash(textNoSvg(mainOf(home))).split(" ").length;
    assert.ok(words <= 400, `home <main> has ${words} words`);

    // (b) The first screen: what it is, its status, who, and call or text.
    const hero = home.nodes.find((n) => attr(n, "id") === "hero");
    assert.ok(hero, "#hero");
    assert.equal(within(hero, "h1").length, 1);
    const heroText = squash(textNoSvg(hero));
    assert.ok(heroText.includes("In development"));
    assert.match(heroText, /sales tool we[’']re building for landscapers/);
    assert.ok(heroText.includes("Charles Russella"));
    assert.ok(heroText.includes("Kent, Ohio"));
    const heroLinks = linksIn(hero);
    assert.equal(heroLinks.filter((h) => h === TEL).length, 1);
    assert.equal(heroLinks.filter((h) => h === SMS).length, 1);
    // A Call button's label is one inline run: in a flex button, "Call " and the number as
    // separate items lose the space between them ("Call(330)…").
    for (const p of pages)
      for (const a of elements(p, "a").filter(
        (n) => attr(n, "href") === TEL && hasClass(n, "action"),
      )) {
        const kids = (a.childNodes || []).filter(
          (n) => n.tagName || (n.nodeName === "#text" && n.value.trim()),
        );
        assert.equal(
          kids.length,
          1,
          `${p.route}: Call button has one label element`,
        );
        assert.equal(squash(text(a)), "Call (330) 357-2440", p.route);
      }
    const figures = within(hero, "figure").filter((n) =>
      n.attrs.some((a) => a.name === "data-sample"),
    );
    assert.equal(figures.length, 1, "#hero figure[data-sample]");
    const [figure] = figures;
    assert.ok(within(figure, "svg").some((n) => attr(n, "role") === "img"));
    assert.ok(
      within(figure, "caption").some((n) => text(n).includes("Sample prices")),
    );
    const figcaption = squash(text(within(figure, "figcaption")[0]));
    for (const phrase of ["Works today", "Being built", "Illustration"])
      assert.ok(figcaption.includes(phrase), `hero figcaption: ${phrase}`);

    // (c) Sample arithmetic is exact, on the hero estimate and the proposal.
    const sampleTables = pages.flatMap((p) =>
      within(mainOf(p), "table").filter((n) => hasClass(n, "yd-estimate")),
    );
    assert.ok(sampleTables.length >= 2, "sample estimate tables present");
    for (const p of pages) {
      const main = mainOf(p);
      for (const table of within(main, "table").filter((n) =>
        hasClass(n, "yd-estimate"),
      )) {
        const rows = within(within(table, "tbody")[0], "tr");
        assert.ok(rows.length > 0);
        let sum = 0;
        for (const row of rows) {
          const cents = Number(attr(row, "data-cents"));
          assert.ok(Number.isInteger(cents), `${p.route}: row data-cents`);
          sum += cents;
          assert.equal(squash(text(within(row, "td").at(-1))), usd(cents));
        }
        const total = within(within(table, "tfoot")[0], "tr")[0];
        assert.equal(Number(attr(total, "data-cents-total")), sum, p.route);
        assert.equal(squash(text(within(total, "td").at(-1))), usd(sum));
      }
      // (d) Dollar amounts only inside labelled sample figures.
      for (const node of nodes(main).filter(
        (n) => n.nodeName === "#text" && /\$\s?\d/.test(n.value),
      )) {
        const sample = ancestors(node).find((n) =>
          n.attrs?.some((a) => a.name === "data-sample"),
        );
        assert.ok(sample, `${p.route}: "${node.value}" outside [data-sample]`);
        assert.match(text(sample), /sample prices/i);
      }
      assert.ok(!titleOf(p).includes("$"), `${p.route}: $ in title`);
      assert.ok(!meta(p, "description").includes("$"), p.route);
      // (e) "For life" always carries its qualifier.
      // A member keeps the price through a pause or a late launch (STRATEGY 2.7), so the
      // qualifier is membership, not an unbroken subscription.
      const qualifier = /for as long as (you|they) stay (a member|members)/i;
      for (const block of [
        ...["p", "li", "td", "summary"].flatMap((tag) => within(main, tag)),
      ].map((n) => squash(text(n)))) {
        if (/for life/i.test(block))
          assert.match(block, qualifier, `${p.route}: "${block}"`);
      }
      for (const value of [meta(p, "description"), meta(p, "og:image:alt")])
        if (/for life/i.test(value)) assert.match(value, qualifier, p.route);
    }
    // (f) Dates are past or present only: no forecasts.
    const built = statSync(new URL("index.html", root)).mtime;
    const today = built.toISOString().slice(0, 10);
    for (const p of pages)
      for (const time of elements(p, "time")) {
        const value = attr(time, "datetime");
        assert.ok(value, `${p.route}: <time> without datetime`);
        if (/^\d{4}(-\d{2}){0,2}$/.test(value))
          assert.ok(
            value <= today.slice(0, value.length),
            `${p.route}: ${value} is after the build date ${today}`,
          );
        else
          assert.ok(
            Date.parse(value) <= built.getTime(),
            `${p.route}: ${value} is after the build date`,
          );
      }
    for (const route of ["/founders-club/", "/contact/"])
      assert.ok(!pageAt(route).source.includes("$"), `${route} contains $`);

    // (g) The YardUluv page keeps its status words and limits.
    const how = pageAt("/yarduluv/");
    const howText = squash(text(mainOf(how)));
    for (const phrase of [
      "Works today",
      "Being built",
      "Not a survey",
      "won’t price the slope",
      // Measurements are drafts (STRATEGY 2.10, 2.12 item 10).
      "Confirm every quantity on site before your customer signs",
    ])
      assert.ok(howText.includes(phrase), `/yarduluv/: ${phrase}`);
    // The privacy answer names who sees prices and promises the full list in writing.
    const prices = within(mainOf(how), "details").find((n) =>
      squash(text(within(n, "summary")[0])).startsWith("Who sees my prices?"),
    );
    assert.ok(prices, "/yarduluv/: Who sees my prices?");
    for (const phrase of [
      "Charles",
      "Darian",
      "don’t sell it",
      "written terms",
    ])
      assert.ok(
        squash(text(prices)).includes(phrase),
        `Who sees my prices?: ${phrase}`,
      );
    const stands = how.nodes.find((n) => attr(n, "id") === "where-it-stands");
    assert.ok(stands && within(stands, "time").length > 0, "#where-it-stands");

    // (h) Founders Club states the terms without a price.
    const club = pageAt("/founders-club/");
    const clubText = squash(text(mainOf(club)));
    assert.match(clubText, /founder pricing for life/i);
    assert.match(clubText, /sales training/i);
    assert.match(clubText, /monthly subscription/i);
    // Draft contract terms stay off the site: billing before launch is disclosed, the
    // asks are never a condition of the price, and every term comes in writing first.
    assert.match(clubText, /starts when you join, before YardUluv is finished/);
    assert.match(clubText, /every term in writing before you pay anything/);
    assert.match(clubText, /requests, not conditions/);
    for (const draft of [
      /up to three/i,
      /12 months/i,
      /pause/i,
      /participation/i,
    ])
      assert.ok(!draft.test(clubText), `/founders-club/: draft term ${draft}`);
    // The estimating service is what the fee mainly pays for before the software (2.1, 2.3).
    assert.match(clubText, /Estimates built for you/);
    assert.ok(linksIn(mainOf(club)).includes(TEL));
    assert.ok(linksIn(mainOf(club)).includes(SMS));

    // (i) About & Contact: one email draft to both owners, plus call or text.
    const contact = pageAt("/contact/");
    assert.equal(elements(contact, "form").length, 0);
    const links = elements(contact, "a").map((n) => attr(n, "href"));
    const mailto = links.filter((h) => h.startsWith("mailto:"));
    assert.equal(mailto.length, 1);
    const brief = new URL(mailto[0]);
    assert.deepEqual(brief.pathname.split(","), [
      "charles@threadandsignal.com",
      "darian@threadandsignal.com",
    ]);
    assert.equal(brief.searchParams.get("subject"), "YardUluv");
    assert.match(brief.searchParams.get("body"), /How we price jobs now:\r?\n/);
    const contactText = squash(text(contact.document));
    for (const name of ["Charles Russella", "Darian Russella"])
      assert.ok(contactText.includes(name));
    assert.ok(contactText.includes("seven years in sales"));
    assert.equal(contactText.split("Super Intelligence (SI)").length - 1, 1);
    const lastSection = within(mainOf(contact), "section").at(-1);
    assert.ok(text(lastSection).includes("Super Intelligence (SI)"));
    assert.ok(links.includes(TEL) && links.includes(SMS));
  },
);

check(
  "five real GitHub projects render in saved star order with the saved date",
  () => {
    const snapshot = JSON.parse(
      readFileSync(new URL("../src/data/github.json", import.meta.url), "utf8"),
    );
    const page = pageAt("/open-source/");
    const items = within(mainOf(page), "li");
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
check("media queries use a form iOS Safari before 16.4 can read", () => {
  // It ignores range syntax such as (width<=640px) and a leading "not (",
  // which would drop every mobile layout rule. Container queries are exempt.
  for (const path of files(dist).filter((p) => /\.(css|html)$/.test(p))) {
    for (const [, query] of readFileSync(path, "utf8").matchAll(
      /@media([^{]*)\{/g,
    ))
      assert.ok(
        !/[<>]/.test(query) && !/^\s*not\s*\(/.test(query),
        `${relative(dist, path)} uses @media${query}`,
      );
  }
});

check("copy guardrails on the YardUluv pages and llms.txt", () => {
  const banned = [
    /schedul/i,
    /\bCRM\b/,
    /onboarding/i,
    /black box/i,
    /\bplatform\b/i,
    /\bsolution/i,
    /survey-grade/i,
    /accura(te|cy)/i,
    /close[- ]rate|profit margin|\bROI\b/i,
    /testimonial/i,
    /\bAI\b/,
    /Founder University/i,
    /\bLAUNCH\b/,
    /\blaunch(es|ed|ing)?\b/i,
    /invest|pre-seed/i,
    /\bsigned\b|e-?signature/i,
    /\b(Rust|WASM|lidar|point cloud)\b/i,
    /Gnash/i,
    /nothing to sell/i,
    /stay subscribed/i,
    /automate repetitive work/i,
    /\byet\b/i,
    /slopes? included|grade-aware/i,
    /(enter|type|send us) (an|the|your) address/i,
    /our (customers|clients|members)|trusted by|used by|customers love|companies (already|now) use|building it with (landscaping )?companies|works with landscaping companies/i,
  ];
  const si = /\bSI\b|Super Intelligence/;
  const llms = readFileSync(new URL("llms.txt", root), "utf8");
  const sources = [
    ...yardulumRoutes.map((route) => {
      const p = pageAt(route);
      return {
        name: route,
        // SVG text counts here: titles, descriptions and tags are copy too.
        copy: [
          titleOf(p),
          meta(p, "description"),
          meta(p, "og:image:alt"),
          squash(text(mainOf(p))),
        ].join("\n"),
        siAllowed: route === "/contact/",
      };
    }),
    ...llms.split("\n").map((line, i) => ({
      name: `llms.txt line ${i + 1}`,
      copy: line,
      siAllowed: line.startsWith("- [About & Contact]"),
    })),
  ];
  for (const { name, copy, siAllowed } of sources) {
    for (const pattern of banned)
      assert.ok(
        !pattern.test(copy),
        `${name}: ${pattern} matches "${copy.match(pattern)?.[0]}"`,
      );
    if (!siAllowed) assert.ok(!si.test(copy), `${name}: SI outside About`);
  }
  assert.ok(llms.includes("in development"));
  assert.ok(llms.includes("for as long as they stay members"));
});

check("hyphenated words in page text move to the next line whole", () => {
  // A line break after a compound's hyphen ("a ride- / along") reads as a typo. Wrap every
  // letter-hyphen-letter word in <main> in <span class="nobr">. SVG text and the sample tables
  // are laid out on their own, and the Open-Source project list is GitHub data refreshed daily.
  for (const p of pages) {
    const walk = (node) => {
      if (node.nodeName === "#text") {
        for (const [word] of node.value.matchAll(/\p{L}+(?:-\p{L}+)+/gu))
          assert.fail(
            `${p.route}: "${word}" can break at its hyphen; wrap it in <span class="nobr">`,
          );
        return;
      }
      if (
        ["svg", "table", "script", "style"].includes(node.tagName) ||
        hasClass(node, "nobr") ||
        (p.route === "/open-source/" && hasClass(node, "projects"))
      )
        return;
      for (const child of node.childNodes || []) walk(child);
    };
    walk(mainOf(p));
  }
});

check("CSS keeps the WebKit motion and hover rules", () => {
  // A small brace walker, so minified and pretty CSS parse the same way.
  const parseCss = (source) => {
    const css = source.replace(/\/\*[\s\S]*?\*\//g, "");
    const top = { prelude: "", parent: null, rules: [], decls: [] };
    let current = top;
    let buffer = "";
    let quote = null;
    const flush = () => {
      const decl = buffer.trim();
      buffer = "";
      const colon = decl.indexOf(":");
      if (colon > 0 && current !== top)
        current.decls.push({
          prop: decl.slice(0, colon).trim().toLowerCase(),
          value: decl.slice(colon + 1).trim(),
        });
    };
    for (let i = 0; i < css.length; i++) {
      const c = css[i];
      if (quote) {
        buffer += c;
        if (c === "\\") buffer += css[++i] ?? "";
        else if (c === quote) quote = null;
      } else if (c === '"' || c === "'") {
        quote = c;
        buffer += c;
      } else if (c === "{") {
        const rule = {
          prelude: buffer.trim(),
          parent: current,
          rules: [],
          decls: [],
        };
        buffer = "";
        current.rules.push(rule);
        current = rule;
      } else if (c === "}") {
        flush();
        assert.ok(current.parent, "unbalanced } in CSS");
        current = current.parent;
      } else if (c === ";") flush();
      else buffer += c;
    }
    assert.equal(current, top, "unbalanced { in CSS");
    return top;
  };
  const allRules = (rule) => [rule, ...rule.rules.flatMap(allRules)];
  const outer = (rule) => {
    const list = [];
    for (let r = rule.parent; r; r = r.parent) list.push(r);
    return list;
  };
  const compact = (s) => s.replace(/\s+/g, "").toLowerCase();
  // Split a property value at top-level commas (not inside cubic-bezier() or calc()).
  const layers = (value) => {
    const list = [""];
    let depth = 0;
    for (const c of value) {
      if (c === "(") depth++;
      else if (c === ")") depth--;
      if (c === "," && depth === 0) list.push("");
      else list[list.length - 1] += c;
    }
    return list.map((l) => l.trim());
  };
  const sheets = [
    ...files(dist)
      .filter((p) => p.endsWith(".css"))
      .map((p) => ({ name: relative(dist, p), css: readFileSync(p, "utf8") })),
    ...html.flatMap((p) =>
      elements(p, "style").map((n) => ({
        name: `${p.route} <style>`,
        css: (n.childNodes || []).map((c) => c.value || "").join(""),
      })),
    ),
  ];
  let reducedMotion = false;
  for (const { name, css } of sheets) {
    for (const rule of allRules(parseCss(css))) {
      const where = `${name}: ${rule.prelude}`;
      for (const { prop, value } of rule.decls) {
        if (value.includes("steps("))
          assert.ok(
            /\bbackwards\b/.test(value) && !/\b(forwards|both)\b/.test(value),
            `${where}: steps() must fill backwards only`,
          );
        if (prop === "animation" && /(^|[\s,])yd-[\w-]+/.test(value))
          assert.ok(
            /\bbackwards\b/.test(value) || /\byd-flash\b/.test(value),
            `${where}: ${value} must fill backwards`,
          );
        // Entrance animations fill backwards only, so each element ends on its own style and
        // no identity transform is held: the figure (yd-*, except the yd-flash highlight) and
        // the headline entrances in use (print, rise, thread-pull, lift).
        if (prop === "animation")
          for (const layer of layers(value))
            if (
              /(^|\s)(yd-[\w-]+|print|rise|thread-pull|lift)(\s|$)/.test(
                layer,
              ) &&
              !/(^|\s)yd-flash(\s|$)/.test(layer)
            )
              assert.ok(
                /\bbackwards\b/.test(layer) &&
                  !/\b(forwards|both)\b/.test(layer),
                `${where}: ${layer} must fill backwards only`,
              );
      }
      if (/^@(-webkit-)?keyframes\b/i.test(rule.prelude))
        for (const inner of allRules(rule))
          for (const { prop, value } of inner.decls)
            assert.ok(
              !value.includes("var(") && !prop.includes("var("),
              `${where}: var() inside @keyframes`,
            );
      if (!rule.prelude.startsWith("@") && rule.prelude.includes(":hover"))
        assert.ok(
          outer(rule).some(
            (r) =>
              /^@media/i.test(r.prelude) &&
              compact(r.prelude).includes("hover:hover") &&
              compact(r.prelude).includes("pointer:fine"),
          ),
          `${where}: :hover outside (hover:hover) and (pointer:fine)`,
        );
      if (
        /^@media/i.test(rule.prelude) &&
        compact(rule.prelude).includes("prefers-reduced-motion:reduce") &&
        // The global switch: the universal selector, not one component's rule.
        allRules(rule).some(
          (r) =>
            r.prelude.split(",").some((s) => s.trim() === "*") &&
            r.decls.some(
              (d) =>
                d.prop === "animation" && compact(d.value) === "none!important",
            ),
        )
      )
        reducedMotion = true;
    }
  }
  assert.ok(
    reducedMotion,
    "no reduced-motion * { animation: none !important }",
  );
  for (const p of html) {
    const strings = p.nodes.flatMap((n) => [
      ...(n.nodeName === "#text" ? [n.value] : []),
      ...(n.attrs || []).map((a) => a.value),
    ]);
    for (const value of strings)
      assert.ok(
        !/\u2197(?!\uFE0E)/.test(value),
        `${p.route}: ↗ without U+FE0E in "${value}"`,
      );
  }
});
console.log(
  `${count} site checks passed across ${pages.length} canonical pages and ${Object.keys(legacy).length} redirects.`,
);
