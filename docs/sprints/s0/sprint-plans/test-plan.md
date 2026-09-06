Finalized - DO NOT EDIT

# Sprint 0 Test Plan

All tests run against the built site: `npm run build` then a Node check script
(`sprints/s0/sprint-tests/dist-check.mjs`) that inspects `dist/` (plus two
source-level checks where noted). One check per EARS clause; names below map to
script check IDs.

## Unit Tests

### T-001 unit tests
- `test_site_constants`: src/data/site.ts contains `charles@threadandsignal.com`, GITHUB_URL, LINKEDIN_URL, FORMSPREE_ENDPOINT, SITE_DESCRIPTION (source-level check)
- `test_projects_min_count`: src/data/projects.ts exports ≥ 12 entries, every entry has name/description/tags/category/url (source-level check)
- Stubs: none (static data)

### T-002 unit tests
- `test_sitemap_emitted`: dist/sitemap-index.xml exists and references a sitemap file listing ≥ 8 URLs

### T-003 unit tests
- `test_canonical_all_pages`: every dist/**/index.html has `<link rel="canonical"` with https://threadandsignal.com prefix
- `test_og_meta_all_pages`: every page has og:title, og:description, og:url, twitter:card
- `test_sitemap_link_head`: every page head contains `<link rel="sitemap"`
- `test_default_description`: dist/blog/index.html meta description equals SITE_DESCRIPTION (blog index is the no-description fixture)

### T-004 unit tests
- `test_nav_ia`: built pages contain nav links to /services, /animus, /skills, /design, /projects, /blog, /contact
- `test_footer_identity`: footer contains mailto:charles@threadandsignal.com, GitHub URL, LinkedIn URL

### T-005 unit tests
- `test_contact_email_fixed`: dist/contact/index.html contains charles@threadandsignal.com; zero occurrences of hello@threadandsignal.com anywhere in dist
- `test_contact_subjects`: contact page lists the six real offer options
- `test_form_action_constant`: form action equals FORMSPREE_ENDPOINT value from site.ts

### T-006 unit tests
- `test_animus_lineage`: dist/animus/index.html mentions all four implementations — Animus (Python), Animus_Prion, fev, Animus_Ferric/Ferric (Rust) — plus the three convictions (constrained decoding, model-scale policies, trace/trajectory) and links to both github.com/crussella0129/Animus and github.com/crussella0129/Animus_Ferric
- `test_animus_offer`: page contains a paid-offer section with contact CTA link
- `test_animus_jsonld`: page contains `application/ld+json` including both "Service" and "SoftwareSourceCode"

### T-007 unit tests
- `test_skills_trio`: dist/skills/index.html covers Sprint Loops, GECK, MDR with GitHub links
- `test_skills_supporting`: page mentions oovra and .lux
- `test_skills_offers`: page contains custom-skill-development and workshops offer sections with CTAs
- `test_skills_jsonld`: JSON-LD Service present

### T-008 unit tests
- `test_design_flagship`: dist/design/index.html covers Jetson Orin Nano Super Case, HexQuest, PreHeat-Macros with repo links
- `test_design_offers`: commissioned-design and Fusion-lessons offers with CTAs present
- `test_design_jsonld`: JSON-LD Service present

### T-009 unit tests
- `test_projects_real_only`: dist/projects/index.html contains no "Placeholder"; every project link points at github.com/crussella0129
- `test_projects_filters`: page contains category filter buttons (data-filter attributes)
- `test_portfolio_redirect`: dist/portfolio/index.html exists and redirects (meta refresh / canonical) to /projects

### T-010 unit tests
- `test_product_redirect`: dist/product/index.html redirects to /animus
- `test_no_retired_copy`: zero occurrences of "CAD Platform" or "Early Access" in dist HTML (encoding-proof substrings; "Geometry Kernel" alone is allowed — crusst entry)

### T-011 unit tests
- `test_home_positioning`: dist/index.html states agentic/local-first positioning, contains "Thread" and "Signal" branding; no "Game Development" service card
- `test_home_lanes`: home links to /animus, /skills, /design
- `test_home_proof`: home contains the rounded proof claim "100+ stars"
- `test_home_jsonld`: JSON-LD with Organization and Person present

### T-012 unit tests
- `test_services_offers`: dist/services/index.html lists automation, agentic development, edge AI deployment, skills & workshops, CAD/design & lessons
- `test_services_no_games`: no game-development service block

### T-013 unit tests
- `test_robots`: dist/robots.txt allows crawling and names https://threadandsignal.com/sitemap-index.xml

### T-014 unit tests
- `test_llmstxt_format`: dist/llms.txt starts with `# `, has a `>` summary line and ≥ 2 `## ` sections with [title](url) links
- `test_llms_covers_primary`: llms.txt contains URLs for all eight primary pages (/, /services, /animus, /skills, /design, /projects, /blog, /contact)
- `test_llms_services_statement`: llms.txt states the services an AI agent can engage Thread & Signal for (checks for a services/hire section)

### T-015 unit tests
- `test_positioning_doc`: docs/positioning.md exists with lead-offer, niche, lanes, and ≥ 5 marketing moves

## Integration Tests

### Component B+C+E integration (site-wide coherence)
- `test_internal_links_resolve`: every internal href in every built page resolves to an existing dist path (no orphan nav/footer/CTA links)
- `test_email_single_source`: charles@ appears on contact + footer; hello@ appears nowhere

### Component F integration
- `test_llms_urls_in_sitemap`: every URL in llms.txt is present in the sitemap (llms ⊆ sitemap)
- `test_sitemap_no_dead_urls`: every sitemap URL corresponds to a dist file

## End-to-End Tests
- **Status:** possible
- `test_build_green`: `npm run build` exits 0 with no errors
- `test_dist_sweep`: full dist-check.mjs suite passes (all unit + integration checks above)
- Human checkpoint (not automated, normative per build-plan Terminal checkpoint): visual/copy review on `npm run dev` before any push to main — push auto-deploys to production via gh-pages workflow.
