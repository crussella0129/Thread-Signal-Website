// Sprint 0 verification suite — runs against dist/ after `npm run build`.
// One check per EARS clause in the locked test-plan. Exit 0 = all pass.
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..', '..', '..');
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

function read(p) {
  return readFileSync(p, 'utf-8');
}

function decode(html) {
  return html
    .replaceAll('&#38;', '&')
    .replaceAll('&amp;', '&')
    .replaceAll('&#39;', "'")
    .replaceAll('&quot;', '"');
}

function* htmlFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (entry.endsWith('.html')) yield p;
  }
}

function* allFiles(dir) {
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry);
    if (statSync(p).isDirectory()) yield* allFiles(p);
    else yield p;
  }
}

// Extract every @type value from every JSON-LD block; throws on malformed JSON.
function jsonLdTypes(html) {
  const types = [];
  for (const m of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    const parsed = JSON.parse(decode(m[1]));
    const walk = node => {
      if (Array.isArray(node)) return node.forEach(walk);
      if (node && typeof node === 'object') {
        if (node['@type']) types.push(node['@type']);
        Object.values(node).forEach(walk);
      }
    };
    walk(parsed);
  }
  return types;
}

const allHtml = [...htmlFiles(DIST)].map(p => ({ path: p, body: read(p) }));
const isRedirect = f => f.body.includes('http-equiv="refresh"');
const pages = allHtml.filter(f => !isRedirect(f));

const home = read(join(DIST, 'index.html'));
const contact = read(join(DIST, 'contact', 'index.html'));
const animus = read(join(DIST, 'animus', 'index.html'));
const skills = read(join(DIST, 'skills', 'index.html'));
const design = read(join(DIST, 'design', 'index.html'));
const projects = read(join(DIST, 'projects', 'index.html'));
const services = read(join(DIST, 'services', 'index.html'));
const blogIndex = read(join(DIST, 'blog', 'index.html'));

// ---------- T-001 (source-level) ----------
const siteTs = read(join(ROOT, 'src', 'data', 'site.ts'));
// AMENDED (see s1 test-plan Amendment log): FORMSPREE_ENDPOINT removed — the
// contact form was retired by user decision; direct channels only.
check(
  'test_site_constants',
  ['charles@threadandsignal.com', 'GITHUB_URL', 'LINKEDIN_URL', 'SITE_DESCRIPTION'].every(s =>
    siteTs.includes(s),
  ),
);
const projectsTs = read(join(ROOT, 'src', 'data', 'projects.ts'));
const entryCount = (projectsTs.match(/name:\s*'/g) || []).length;
check(
  'test_projects_min_count',
  entryCount >= 12 &&
    ['description:', 'tags:', 'category:', 'url:'].every(f => projectsTs.includes(f)),
  `found ${entryCount} entries`,
);

// ---------- T-002 ----------
const sitemapIndexPath = join(DIST, 'sitemap-index.xml');
check('test_sitemap_emitted_index', existsSync(sitemapIndexPath));
const sitemap0 = read(join(DIST, 'sitemap-0.xml'));
const sitemapUrls = [...sitemap0.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
check('test_sitemap_emitted_urls', sitemapUrls.length >= 8, `found ${sitemapUrls.length} URLs`);

// ---------- T-003 ----------
check(
  'test_canonical_all_pages',
  allHtml.every(f => f.body.includes('rel="canonical"') && f.body.includes('https://threadandsignal.com')),
);
check(
  'test_og_meta_all_pages',
  pages.every(
    f =>
      f.body.includes('property="og:title"') &&
      f.body.includes('property="og:description"') &&
      f.body.includes('property="og:url"') &&
      f.body.includes('property="og:type"') &&
      f.body.includes('name="twitter:card"'),
  ),
);
check('test_sitemap_link_head', pages.every(f => f.body.includes('rel="sitemap"')));
const siteDescConst = siteTs.match(/SITE_DESCRIPTION =\s*\n?\s*'([^']+)'/)?.[1] ?? 'MISSING';
const blogDesc = decode(blogIndex).match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '';
check('test_default_description', blogDesc === siteDescConst, blogDesc.slice(0, 80));

// ---------- T-004 ----------
check(
  'test_nav_ia',
  ['/services', '/animus', '/skills', '/design', '/projects', '/blog', '/contact'].every(h =>
    home.includes(`href="${h}"`),
  ),
);
check(
  'test_footer_identity',
  home.includes('mailto:charles@threadandsignal.com') &&
    home.includes('github.com/crussella0129') &&
    home.includes('linkedin.com/in/cgriv'),
);

// ---------- T-005 ----------
// Full-corpus sweep: every file in dist (HTML, _astro JS/CSS bundles, txt, xml).
const textExts = /\.(html|js|css|txt|xml|json|svg)$/i;
const fullCorpus = [...allFiles(DIST)]
  .filter(p => textExts.test(p))
  .map(read)
  .join('\n');
check(
  'test_contact_email_fixed',
  contact.includes('charles@threadandsignal.com') && !fullCorpus.includes('hello@threadandsignal.com'),
);
// AMENDED (see s1 test-plan Amendment log): the form and its subject dropdown
// were retired by user decision. The contact page now proves its three direct
// channels instead, and proves the form's ABSENCE (the decision is enforced).
check(
  'test_contact_channels',
  contact.includes('mailto:charles@threadandsignal.com') &&
    contact.includes('github.com/crussella0129') &&
    contact.includes('linkedin.com/in/cgriv'),
);
check('test_contact_no_form', !/<form[\s>]/.test(contact));
// Single-source integration check (critique C-008): the literal email exists in
// src/ only inside src/data/site.ts.
const srcFiles = [...allFiles(join(ROOT, 'src'))].filter(p => /\.(astro|ts|tsx|css)$/.test(p));
const emailLeaks = srcFiles.filter(
  p => read(p).includes('charles@threadandsignal.com') && !p.endsWith('site.ts'),
);
check('test_email_source_single', emailLeaks.length === 0, emailLeaks.join(', '));

// ---------- T-006 ----------
check(
  'test_animus_lineage',
  ['Animus_Prion', 'crussella0129/fev', 'crussella0129/Animus_Ferric', 'crussella0129/Animus"', 'Python', 'Rust', '>Go<'].every(
    s => animus.includes(s),
  ) &&
    ['constrained', 'scales to the model', 'trajectory'].every(s => animus.toLowerCase().includes(s)) &&
    animus.toLowerCase().includes('source of truth'),
);
check('test_animus_offer', animus.includes('id="hire"') && animus.includes('href="/contact"'));
const animusTypes = jsonLdTypes(animus);
check(
  'test_animus_jsonld',
  animusTypes.includes('Service') && animusTypes.includes('SoftwareSourceCode'),
  animusTypes.join(','),
);

// ---------- T-007 ----------
check(
  'test_skills_trio',
  ['Sprint Loops', 'GECK', 'MDR'].every(s => skills.includes(s)) &&
    ['crussella0129/sprint-loops', 'crussella0129/GECK', 'crussella0129/MDR'].every(s => skills.includes(s)),
);
check('test_skills_supporting', skills.includes('oovra') && skills.includes('.lux'));
check(
  'test_skills_offers',
  skills.includes('Workshop') &&
    decode(skills).includes('Custom Skill & Protocol Development') &&
    (skills.match(/href="\/contact"/g) || []).length >= 2,
);
check('test_skills_jsonld', jsonLdTypes(skills).includes('Service'));

// ---------- T-008 ----------
check(
  'test_design_flagship',
  [
    'href="https://github.com/crussella0129/Jetson-Orin-Nano-Super-Case"',
    'href="https://github.com/crussella0129/HexQuest"',
    'href="https://github.com/crussella0129/PreHeat-Macros"',
  ].every(s => design.includes(s)),
);
check(
  'test_design_offers',
  design.includes('Commission a Design') && design.includes('Book a Lesson') && design.includes('Fusion'),
);
check('test_design_jsonld', jsonLdTypes(design).includes('Service'));

// ---------- T-009 ----------
const externalLinks = [...projects.matchAll(/href="(https?:\/\/[^"]+)"/g)].map(m => m[1]);
const projectGithubLinks = externalLinks.filter(u => u.includes('github.com'));
check(
  'test_projects_real_only',
  !projects.includes('Placeholder') &&
    projectGithubLinks.length >= 12 &&
    projectGithubLinks.every(u => u.includes('github.com/crussella0129')),
  `${projectGithubLinks.length} github links`,
);
check('test_projects_filters', (projects.match(/data-filter="/g) || []).length >= 4);
const portfolioStub = read(join(DIST, 'portfolio', 'index.html'));
check('test_portfolio_redirect', portfolioStub.includes('url=/projects'));

// ---------- T-010 ----------
const productStub = read(join(DIST, 'product', 'index.html'));
check('test_product_redirect', productStub.includes('url=/animus'));
// Retired copy banned across the full corpus (HTML + bundles + txt/xml), entity-decoded.
const fullDecoded = decode(fullCorpus);
check('test_no_retired_copy', !fullDecoded.includes('CAD Platform') && !fullDecoded.includes('Early Access'));

// ---------- T-011 ----------
check(
  'test_home_positioning',
  decode(home).includes('Thread & Signal') && !/game develop/i.test(home) &&
    (home.includes('local-first') || home.includes('your hardware')),
);
check(
  'test_home_lanes',
  ['/animus', '/skills', '/design'].every(h => home.includes(`href="${h}"`)),
);
check('test_home_proof', home.includes('100+ stars'));
const homeTypes = jsonLdTypes(home);
check('test_home_jsonld', homeTypes.includes('Organization') && homeTypes.includes('Person'), homeTypes.join(','));
// Accent design tokens survive into the built CSS (T-011 clause 1, critique C-011).
const builtCss = [...allFiles(DIST)].filter(p => p.endsWith('.css')).map(read).join('\n');
check('test_home_accent_tokens', builtCss.includes('--accent') && builtCss.includes('--accent-warm'));

// ---------- T-012 ----------
const servicesDec = decode(services);
check(
  'test_services_offers',
  ['Business Process Automation', 'Custom Agentic Development', 'Edge AI', 'Workshops', 'CAD'].every(s =>
    servicesDec.includes(s),
  ),
);
check('test_services_no_games', !/game develop/i.test(servicesDec));

// ---------- T-013 ----------
const robots = read(join(DIST, 'robots.txt'));
check(
  'test_robots',
  robots.includes('Allow: /') && robots.includes('https://threadandsignal.com/sitemap-index.xml'),
);

// ---------- T-014 ----------
const llms = read(join(DIST, 'llms.txt'));
check(
  'test_llmstxt_format',
  llms.startsWith('# ') &&
    llms.includes('\n> ') &&
    (llms.match(/^## /gm) || []).length >= 2 &&
    /\[[^\]]+\]\(https?:\/\/[^)]+\):/.test(llms),
);
const primary = ['/services', '/animus', '/skills', '/design', '/projects', '/blog', '/contact'];
check(
  'test_llms_covers_primary',
  primary.every(p => llms.includes(`https://threadandsignal.com${p}`)) &&
    // Home must appear as an exact root link, not just as a URL prefix (critique C-004).
    llms.includes('](https://threadandsignal.com/)'),
);
check('test_llms_services_statement', llms.includes('If you are an AI agent') && llms.includes('## Services'));

// ---------- T-015 ----------
const positioningPath = join(ROOT, 'docs', 'positioning.md');
check('test_positioning_doc_exists', existsSync(positioningPath));
const positioning = read(positioningPath);
// Numbered-move count scoped to the marketing-moves section (critique C-014).
const movesSection = positioning.split(/^## Next marketing moves.*$/m)[1]?.split(/^## /m)[0] ?? '';
check(
  'test_positioning_doc_content',
  positioning.includes('most marketable') &&
    positioning.toLowerCase().includes('lead with automation') &&
    positioning.includes('niche') &&
    positioning.includes('lane') &&
    (movesSection.match(/^\d+\.\s/gm) || []).length >= 5,
);

// ---------- Integration ----------
const distPaths = new Set(
  [...htmlFiles(DIST)].map(p => p.slice(DIST.length).replaceAll('\\', '/')),
);
let orphan = null;
outer: for (const f of pages) {
  const hrefs = [...f.body.matchAll(/href="(\/[^"#]*)"/g)].map(m => m[1]);
  for (const h of hrefs) {
    const clean = h.replace(/\/$/, '');
    if (/\.[a-z0-9]+$/i.test(clean)) {
      // Asset link (css/js/xml/txt/svg/ico/...) — verify the file itself exists.
      if (!existsSync(join(DIST, clean.slice(1)))) { orphan = `${h} (asset)`; break outer; }
      continue;
    }
    const candidate = clean === '' ? '/index.html' : `${clean}/index.html`;
    if (!distPaths.has(candidate)) { orphan = h; break outer; }
  }
}
check('test_internal_links_resolve', orphan === null, orphan ?? '');

// Integration: the email renders on contact + footer(home) AND is single-sourced
// in src (test_email_source_single above proves the source side).
check(
  'test_email_single_source',
  contact.includes('charles@threadandsignal.com') &&
    home.includes('charles@threadandsignal.com') &&
    !fullCorpus.includes('hello@threadandsignal.com'),
);

const llmsPageUrls = [...llms.matchAll(/https:\/\/threadandsignal\.com([^\s)"]*)/g)]
  .map(m => m[1].replace(/\/$/, ''))
  .filter(p => !p.endsWith('.xml'));
const sitemapPaths = sitemapUrls.map(u => new URL(u).pathname.replace(/\/$/, ''));
const missingFromSitemap = llmsPageUrls.filter(p => !sitemapPaths.includes(p));
check('test_llms_urls_in_sitemap', missingFromSitemap.length === 0, missingFromSitemap.join(', '));

const deadSitemap = sitemapPaths.filter(p => {
  const candidate = p === '' ? '/index.html' : `${p}/index.html`;
  return !distPaths.has(candidate);
});
check('test_sitemap_no_dead_urls', deadSitemap.length === 0, deadSitemap.join(', '));

// ---------- Summary ----------
console.log(`\n${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('Failures:', failures.join(', '));
  process.exit(1);
}
