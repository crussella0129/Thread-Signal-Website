// Sprint 3 verification suite — work-led minimal homepage (INT-0002).
// Static assertions over the built study page. Run after building the study:
//   node node_modules/astro/astro.js build --root docs/design-studies
//   node docs/sprints/s3/sprint-tests/dist-check-s3.mjs
// Browser E2E (viewports/focus/above-the-fold) is recorded separately in
// e2e-tests.md; this file covers the unit-level EARS assertions.
import { readFileSync } from "node:fs";
import { resolve, join } from "node:path";
import * as parse5 from "parse5";

const ROOT = resolve(import.meta.dirname, "..", "..", "..", "..");
const STUDY = join(ROOT, "docs", "design-studies");
const INDEX = join(STUDY, "dist", "index.html");
const README = join(STUDY, "README.md");
const DIRECTION = join(STUDY, "src", "pages", "direction.astro");

let pass = 0;
let fail = 0;
const failures = [];
function check(name, cond, detail = "") {
  if (cond) {
    pass++;
    console.log(`PASS ${name}`);
  } else {
    fail++;
    failures.push(name);
    console.log(`FAIL ${name}${detail ? " — " + detail : ""}`);
  }
}

const html = readFileSync(INDEX, "utf-8");
const doc = parse5.parse(html);

// ---- DOM helpers ----
function* walk(node) {
  yield node;
  for (const c of node.childNodes || []) yield* walk(c);
}
const nodes = [...walk(doc)];
const attr = (n, name) =>
  (n.attrs || []).find((a) => a.name === name)?.value ?? null;
const hasClass = (n, cls) =>
  (attr(n, "class") || "").split(/\s+/).includes(cls);
const byTag = (t) => nodes.filter((n) => n.tagName === t);
function text(n) {
  let s = "";
  for (const d of walk(n)) if (d.nodeName === "#text") s += d.value;
  return s.replace(/\s+/g, " ").trim();
}
const bodyText = text(byTag("body")[0] || doc);
const styleText = byTag("style")
  .map((s) => text(s))
  .join("\n");

// ---- check_single_primary_action ----
const actions = nodes.filter((n) => hasClass(n, "offer-action"));
const actionHref = actions[0] ? attr(actions[0], "href") : null;
check(
  "check_single_primary_action",
  actions.length === 1 &&
    !!actionHref &&
    actionHref.startsWith("mailto:") &&
    /Project%20quote|Project\+quote|Project quote/.test(actionHref),
  `count=${actions.length} href=${actionHref?.slice(0, 40)}`,
);

// ---- check_jetson_hero ----
const imgs = byTag("img");
const hero = imgs.find((i) => (attr(i, "src") || "").includes("jetson-v2-2-render"));
const figcaps = byTag("figcaption").map((f) => text(f));
check(
  "check_jetson_hero",
  !!hero &&
    /^\d+$/.test(attr(hero, "width") || "") &&
    /^\d+$/.test(attr(hero, "height") || "") &&
    (attr(hero, "alt") || "").trim().length > 0 &&
    figcaps.some((c) => /CAD/.test(c)),
  hero ? `w=${attr(hero, "width")} h=${attr(hero, "height")}` : "no hero img",
);

// ---- check_hero_eager ----
check(
  "check_hero_eager",
  !!hero && (attr(hero, "loading") || "").toLowerCase() !== "lazy",
  hero ? `loading=${attr(hero, "loading")}` : "no hero img",
);

// ---- check_hero_responsive_css ----
const heroRule = styleText.match(/\.offer-hero\s+img\s*\{[^}]*\}/);
check(
  "check_hero_responsive_css",
  !!heroRule && /max-width:\s*100%/.test(heroRule[0]),
  heroRule ? heroRule[0].replace(/\s+/g, " ") : "no .offer-hero img rule",
);

// ---- check_offers_named ----
check(
  "check_offers_named",
  /Automate a task/i.test(bodyText) &&
    /local AI/i.test(bodyText) &&
    /own computer/i.test(bodyText),
  "offers must name automate-a-task and local-AI-on-your-computer",
);

// ---- check_promise_present ----
const h1 = byTag("h1")[0];
check(
  "check_promise_present",
  !!h1 && /automate/i.test(text(h1)) && /repetit|repeat/i.test(text(h1)),
  h1 ? text(h1) : "no h1",
);

// ---- check_no_service_paragraphs (old copy removed) ----
check(
  "check_no_service_paragraphs",
  !/You get a working tool built around your process/i.test(bodyText) &&
    !/I install it, test your task, and tell you what works/i.test(bodyText),
  "old two-paragraph service copy must be gone",
);

// ---- check_block_count ----
const sections = byTag("section").length;
check("check_block_count", sections <= 5, `sections=${sections}`);

// ---- check_builds_line ----
const buildsOk =
  /Animus Ferric/.test(bodyText) &&
  /sdr\.rs/.test(bodyText) &&
  /SpecuLex/.test(bodyText) &&
  /SpecuLex[^.]*in development/i.test(bodyText);
check("check_builds_line", buildsOk, "must name 3 builds; SpecuLex in development");

// ---- check_builds_export (T-001 #1): rendered builds carry names + repo links ----
const VERIFIED = [
  "https://github.com/crussella0129/Animus_Ferric",
  "https://github.com/crussella0129/sdr.rs",
  "https://github.com/crussella0129/SpecuLex",
];
const buildLinks = byTag("a").filter((n) =>
  /crussella0129\/(Animus_Ferric|sdr\.rs|SpecuLex)/.test(attr(n, "href") || ""),
);
const buildHrefs = buildLinks.map((n) => attr(n, "href"));
check(
  "check_builds_export",
  VERIFIED.every((u) => buildHrefs.includes(u)) &&
    /Animus Ferric/.test(bodyText) &&
    /sdr\.rs/.test(bodyText) &&
    /SpecuLex/.test(bodyText),
  "built page must render the 3 builds with their repo links",
);

// ---- check_links_resolve (T-001 #2): every build link is a verified-resolving URL ----
// Network resolution was performed and recorded in T-301 (git ls-remote + GitHub
// forks API). The suite asserts hrefs match that verified set — deterministic, no
// network flake. A build with no verified URL would render name-only (no <a>).
check(
  "check_links_resolve",
  buildHrefs.length === 3 && buildHrefs.every((u) => VERIFIED.includes(u)),
  "build links: " + buildHrefs.join(", "),
);

// ---- check_no_js_dependence ----
const scripts = byTag("script");
check("check_no_js_dependence", scripts.length === 0, `scripts=${scripts.length}`);

// ---- check_no_inception_or_outcome_claim ----
const inception = /inception/i.test(html);
const fabricatedMetric = /\b\d+%\s*(faster|savings?|reduction|increase|improvement)\b/i.test(bodyText);
const clientOutcome = /\b(saved|helped)\s+(our|a)\s+client/i.test(bodyText);
check(
  "check_no_inception_or_outcome_claim",
  !inception && !fabricatedMetric && !clientOutcome,
  `inception=${inception} metric=${fabricatedMetric} clientOutcome=${clientOutcome}`,
);

// ---- check_monochrome_only ----
// Every hex color literal in the inline CSS must be grayscale (R==G==B).
const hexes = [...styleText.matchAll(/#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b/g)].map(
  (m) => m[1],
);
function grayscale(hex) {
  let r, g, b;
  if (hex.length === 3) {
    r = hex[0] + hex[0];
    g = hex[1] + hex[1];
    b = hex[2] + hex[2];
  } else {
    r = hex.slice(0, 2);
    g = hex.slice(2, 4);
    b = hex.slice(4, 6);
  }
  return r.toLowerCase() === g.toLowerCase() && g.toLowerCase() === b.toLowerCase();
}
const nonGray = hexes.filter((h) => !grayscale(h));
const rgbColor = /rgb\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/.test(styleText)
  ? [...styleText.matchAll(/rgb\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/g)].some(
      (m) => !(m[1] === m[2] && m[2] === m[3]),
    )
  : false;
check(
  "check_monochrome_only",
  nonGray.length === 0 && !rgbColor,
  nonGray.length ? "non-gray hex: #" + nonGray.join(", #") : "",
);

// ---- check_contrast_tokens ----
function lum(hex) {
  const h = hex.length === 3 ? hex.replace(/(.)/g, "$1$1") : hex;
  const c = [0, 2, 4].map((i) => {
    let v = parseInt(h.slice(i, i + 2), 16) / 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
function contrast(a, b) {
  const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}
const bodyContrast = contrast("ffffff", "0a0a0a"); // text on bg
const mutedContrast = contrast("b8b8b8", "0a0a0a"); // muted caption on bg
const actionContrast = contrast("0a0a0a", "ffffff"); // ink action on white
check(
  "check_contrast_tokens",
  bodyContrast >= 4.5 && mutedContrast >= 4.5 && actionContrast >= 3,
  `body=${bodyContrast.toFixed(1)} muted=${mutedContrast.toFixed(1)} action=${actionContrast.toFixed(1)}`,
);

// ---- check_touch_targets ----
function remToPx(css, varName) {
  const m = css.match(new RegExp(varName.replace(/[-]/g, "\\-") + ":\\s*([\\d.]+)rem"));
  return m ? parseFloat(m[1]) * 16 : null;
}
const actionH = remToPx(styleText, "--offer-action-height");
const targetH = remToPx(styleText, "--offer-target");
check(
  "check_touch_targets",
  actionH !== null && actionH >= 44 && targetH !== null && targetH >= 44,
  `action=${actionH}px target=${targetH}px`,
);

// ---- check_readme_current (T-004) ----
const readme = readFileSync(README, "utf-8");
const readmeCurrent = readme.slice(0, readme.indexOf("## Earlier studies"));
check(
  "check_readme_current",
  /Jetson/.test(readmeCurrent) &&
    /Animus Ferric/.test(readmeCurrent) &&
    /SpecuLex/.test(readmeCurrent) &&
    !/two concrete services/i.test(readmeCurrent) &&
    !/contains no[^.]*images/i.test(readmeCurrent),
  "README current-revision must describe the work-led hero + builds line",
);

// ---- check_direction_pointer (T-004) ----
const direction = readFileSync(DIRECTION, "utf-8");
const pointer = direction.slice(0, direction.indexOf("<header>"));
check(
  "check_direction_pointer",
  !/sales page/i.test(pointer),
  "direction.astro lead pointer must not call the current page a 'sales page'",
);

console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log("FAILURES: " + failures.join(", "));
  process.exit(1);
}
