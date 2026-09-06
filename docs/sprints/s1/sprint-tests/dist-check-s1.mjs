// Sprint 1 verification suite — Lamplight Atelier rebrand checks.
// Run after `npm run build`; the s0 suite is the separate regression gate.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

// Sprint 2 Book migration moved this script one directory deeper.
const ROOT = resolve(import.meta.dirname, '..', '..', '..', '..');
const DIST = join(ROOT, 'dist');

let pass = 0;
let fail = 0;
const failures = [];

function check(name, cond, detail = '') {
  if (cond) {
    pass++;
    console.log(`PASS ${name}`);
  } else {
    fail++;
    failures.push(name);
    console.log(`FAIL ${name}${detail ? ' — ' + detail : ''}`);
  }
}

const read = p => readFileSync(p, 'utf-8');
const decode = h =>
  h.replaceAll('&#38;', '&').replaceAll('&amp;', '&').replaceAll('&#39;', "'").replaceAll('&quot;', '"');

function* allFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) yield* allFiles(p);
    else yield p;
  }
}

const htmlPaths = [...allFiles(DIST)].filter(p => p.endsWith('.html'));
const pages = htmlPaths
  .map(p => ({ path: p, body: read(p) }))
  .filter(f => !f.body.includes('http-equiv="refresh"'));

const home = read(join(DIST, 'index.html'));
const animus = read(join(DIST, 'animus', 'index.html'));
const skills = read(join(DIST, 'skills', 'index.html'));
const design = read(join(DIST, 'design', 'index.html'));
const projects = read(join(DIST, 'projects', 'index.html'));
const services = read(join(DIST, 'services', 'index.html'));
const contact = read(join(DIST, 'contact', 'index.html'));
const cssFiles = [...allFiles(DIST)].filter(p => p.endsWith('.css'));
const css = cssFiles.map(read).join('\n');

// ---------- T-101 ----------
const tok = (name, value) => new RegExp(`${name}:\\s*${value}`, 'i').test(css);
check(
  'test_palette_tokens',
  tok('--bg', '#141210') && tok('--accent', '#e8a33d') && tok('--accent-warm', '#c2543f') && tok('--thread', '#4fb8a8'),
);
check('test_fraunces_font', css.includes('Fraunces') && /--font-heading:\s*["']?Fraunces/i.test(css));
check('test_body_layers', css.includes('radial-gradient') && css.includes('repeating-linear-gradient'));
check('test_reveal_nojs_safe', /html\.js\s+\.reveal/.test(css));
check('test_reduced_motion_css', css.includes('prefers-reduced-motion'));
check(
  'test_card_variants',
  ['.card-copper', '.card-thread', '.card-madder'].every(c => css.includes(c)) &&
    /\.card:hover\s*{[^}]*transform:\s*translateY/.test(css),
);

// ---------- T-102 ----------
// Tag-stripped text so inline spans (ink-gradient) can't split the headline
// unseen — the same standard test_animus_tagline enforces (critique s1-C-001).
const homeText = decode(home.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ');
// Loom-line probe amended 2026-07-02 per user copy change (see test-plan
// Amendment log): "business machine … let's build yours" replaced
// "machine … we've been weaving ever since".
check(
  'test_hero_headline',
  homeText.includes('Handwoven automation.') &&
    home.includes('programmable business machine was a loom') &&
    homeText.includes("let's build yours") && home.includes('hardware you own'),
);
// Scoped to the hero section — the nav CTA must not satisfy this (critique s1-C-004).
const heroSlice = home.slice(home.indexOf('<section class="hero"'), home.indexOf('</section>'));
check(
  'test_hero_ctas',
  heroSlice.includes('Commission a build') && heroSlice.includes('href="/contact"') &&
    heroSlice.includes('href="/projects"'),
);
check('test_hero_canvas', /<canvas[^>]*aria-hidden="true"/.test(home) || /<canvas[^>]*id="loom"[^>]*aria-hidden/.test(home));
const pkg = read(join(ROOT, 'package.json'));
check(
  'test_no_react_three_deps',
  ['"react"', '"react-dom"', '"three"', '@react-three/fiber', '@astrojs/react', '@types/react', '@types/three'].every(
    d => !pkg.includes(d),
  ),
);
const astroDir = join(DIST, '_astro');
const astroJs = existsSync(astroDir)
  ? [...allFiles(astroDir)].filter(p => p.endsWith('.js')).map(read).join('\n')
  : '';
check('test_no_react_three_bundle', !astroJs.includes('react') && !astroJs.includes('three.module'));
check('test_config_no_react', !read(join(ROOT, 'astro.config.mjs')).includes('react('));
// Scoped to the loom script block — the layout reveal script has the same
// matchMedia literal and must not satisfy this (critique s1-C-007).
const loomIdx = home.indexOf("getElementById('loom')");
const loomScript = loomIdx >= 0 ? home.slice(loomIdx, loomIdx + 800) : '';
check('test_canvas_reduced_motion', loomScript.includes("matchMedia('(prefers-reduced-motion"));

// ---------- T-103 ----------
check(
  'test_nav_lockup_cta',
  decode(home).includes('Thread') && decode(home).includes('Signal') &&
    /nav-cta[^>]*>Commission a build/.test(home),
);
// Must match the actual nav rule — Astro-scoped, and the minifier collapses
// ::after to :after; page CSS may be inlined in HTML rather than the bundle
// (critique s1-C-003).
const allStyles = css + pages.map(f => f.body).join('\n');
check('test_nav_underline_css', /\.?nav-link[^{]{0,120}::?after[^{]{0,60}\{[^}]{0,500}scaleX/.test(allStyles));
check('test_footer_tagline', pages.every(f => f.body.includes('Handwoven automation, running on hardware you own.')));
check('test_contiguous_brand_string', pages.every(f => decode(f.body).includes('Thread & Signal')));

// ---------- T-104 ----------
check('test_js_marker_script', pages.every(f => f.body.includes("classList.add('js')")));
check('test_io_reveal_script', pages.every(f => f.body.includes('IntersectionObserver') && f.body.includes('prefers-reduced-motion')));
check('test_theme_color', pages.every(f => f.body.includes('<meta name="theme-color" content="#141210"')));

// ---------- T-105 ----------
check('test_lane_variants', ['card-copper', 'card-thread', 'card-madder'].every(c => home.includes(c)));
check(
  'test_lane_taglines_home',
  ['Intelligence that stays home.', 'Skills that outlive subscriptions.', 'Drawn, printed, held.'].every(t =>
    home.includes(t),
  ),
);
// AMENDED sprint 2, INT-0001 criterion 1: preserve the local-computing offer
// through the clearer buyer-facing local AI/LLM and hardware language.
check('test_home_local_ai', /local (?:AI|LLM)/i.test(homeText) && /hardware/i.test(homeText));

// ---------- T-106 ----------
check('test_animus_tagline', animus.includes('Intelligence that stays home.'));
check(
  'test_lineage_thread',
  animus.includes('lineage-thread') && (animus.match(/lineage-node/g) || []).length >= 4,
);
check('test_conviction_numerals', ['>01<', '>02<', '>03<'].every(n => animus.includes(n)));

// ---------- T-107 ----------
check('test_skills_tagline', skills.includes('Skills that outlive subscriptions.'));
check(
  'test_works_with_strip',
  ['Claude Code', 'Codex CLI', 'Antigravity', 'Open harnesses'].every(h => skills.includes(h)) &&
    skills.includes('harness-chip'),
);

// ---------- T-108 ----------
check('test_design_tagline', design.includes('Drawn, printed, held.'));

// ---------- T-109 ----------
const patternTags = [...projects.matchAll(/<svg[^>]*data-pattern="([a-z]+)"[^>]*>/g)];
const patterns = new Set(patternTags.map(m => m[1]));
check(
  'test_card_patterns',
  patterns.size >= 4 && ['circuit', 'warp', 'iso', 'hex'].every(p => patterns.has(p)) &&
    patternTags.every(m => m[0].includes('aria-hidden')),
  [...patterns].join(','),
);
check('test_no_diamond_placeholder', !projects.includes('project-placeholder') && !projects.includes('&#9670;') && !projects.includes('◆'));
// All 16 project cards keep working GitHub links (locked T-109 EARS says 16;
// the s0 suite's ≥12 floor is not the operative bar — critique s1-C-005).
const projGh = [...projects.matchAll(/href="https:\/\/github\.com\/crussella0129\/[^"]+"/g)];
check('test_projects_link_count', projGh.length >= 16, `${projGh.length} links`);

// ---------- T-110 ----------
check(
  'test_commission_steps',
  services.includes('How a commission works') && ['>01<', '>02<', '>03<'].every(n => services.includes(n)),
);
// The class alone is a reflected constant; the copper values must be in the
// rule — which Astro inlines into the page HTML (critique s1-C-008).
check(
  'test_contact_copper_card',
  /contact-primary[^{]{0,80}\{[^}]{0,400}(232,\s*163,\s*61|#e8a33d)/i.test(contact + css),
);

// ---------- T-111 ----------
const siteTs = read(join(ROOT, 'src', 'data', 'site.ts'));
// AMENDED sprint 2, INT-0001 criteria 1/3: the discovery description now
// leads with understandable services. The approved handwoven brand remains
// enforced by test_hero_headline, test_footer_tagline and lane tagline checks.
check(
  'test_site_description_services',
  /SITE_DESCRIPTION[\s\S]{0,400}automation/i.test(siteTs) &&
    /SITE_DESCRIPTION[\s\S]{0,400}agent/i.test(siteTs) &&
    /SITE_DESCRIPTION[\s\S]{0,400}local(?:-first| LLM| AI)/i.test(siteTs),
);
const llms = read(join(DIST, 'llms.txt'));
check(
  'test_llms_voice_intact',
  llms.includes('Handwoven automation') && llms.includes('If you are an AI agent') && llms.includes('## Services'),
);
const positioning = read(join(ROOT, 'docs', 'positioning.md'));
const movesSection = positioning.split(/^## Next marketing moves.*$/m)[1]?.split(/^## /m)[0] ?? '';
check(
  'test_positioning_addendum',
  positioning.includes('Lamplight Atelier') && positioning.includes('Handwoven automation') &&
    positioning.includes('most marketable') && positioning.toLowerCase().includes('lead with automation') &&
    positioning.includes('niche') && positioning.includes('lane') &&
    (movesSection.match(/^\d+\.\s/gm) || []).length >= 5,
);

// ---------- Integration ----------
// Minifiers emit `@import"https://…"` (no url(), no space) — accept both forms.
const fontImports = css.match(/@import\s*(?:url\()?['"]?https:\/\/fonts\.googleapis\.com[^)'"]+/g) || [];
check(
  'test_fonts_single_import',
  fontImports.length === 1 && fontImports[0].includes('Fraunces'),
  `${fontImports.length} imports`,
);

// Full-dist banned-string sweep — the build plan's contract as written
// (critique s1-C-002): all five banned strings, every text file in dist.
const textExts = /\.(html|js|css|txt|xml|json|svg)$/i;
const fullCorpus = [...allFiles(DIST)].filter(p => textExts.test(p)).map(read).join('\n');
const fullDecoded = decode(fullCorpus);
check(
  'test_banned_strings_full_corpus',
  !fullDecoded.includes('Early Access') && !fullDecoded.includes('CAD Platform') &&
    !fullDecoded.includes('CAD platform') && !/game develop/i.test(fullDecoded) &&
    !fullDecoded.includes('Placeholder') && !fullDecoded.includes('hello@threadandsignal.com'),
);

// ---------- Summary ----------
console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('Failures:', failures.join(', '));
  process.exit(1);
}
