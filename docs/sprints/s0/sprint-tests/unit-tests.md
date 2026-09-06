# Sprint 0 Unit Test Results

Implemented in `dist-check.mjs` (this directory); run via
`npm run build && node sprints/s0/sprint-tests/dist-check.mjs`.
One named check per EARS clause of the locked build-plan. Run 2026-07-02.

| Check | Task | Result |
|-------|------|--------|
| test_site_constants | T-001 | PASS |
| test_projects_min_count (16 entries ≥ 12) | T-001 | PASS |
| test_sitemap_emitted_index | T-002 | PASS |
| test_sitemap_emitted_urls (≥ 8 URLs) | T-002 | PASS |
| test_canonical_all_pages | T-003 | PASS |
| test_og_meta_all_pages (incl. og:type; redirect stubs excluded by design) | T-003 | PASS |
| test_sitemap_link_head | T-003 | PASS |
| test_default_description (blog index meta == SITE_DESCRIPTION parsed from site.ts, full equality) | T-003 | PASS |
| test_nav_ia | T-004 | PASS |
| test_footer_identity | T-004 | PASS |
| test_contact_email_fixed (charles@ present, hello@ nowhere in full dist corpus incl. _astro bundles) | T-005 | PASS |
| test_contact_subjects (six full offer labels inside the `<select>` block) | T-005 | PASS |
| test_form_action_constant (action == FORMSPREE_ENDPOINT from site.ts; endpoint itself is a deliberate placeholder — see technical debt) | T-005 | PASS |
| test_email_source_single (literal email in src/ only in site.ts) | T-005 | PASS |
| test_animus_lineage (4 implementations incl. Go chips + tightened conviction probes + both repo links) | T-006 | PASS |
| test_animus_offer (id="hire" + contact CTA) | T-006 | PASS |
| test_animus_jsonld (parsed JSON-LD @types include Service + SoftwareSourceCode) | T-006 | PASS |
| test_skills_trio (Sprint Loops/GECK/MDR + repo links) | T-007 | PASS |
| test_skills_supporting (oovra, .lux) | T-007 | PASS |
| test_skills_offers (2 offers, ≥ 2 contact CTAs) | T-007 | PASS |
| test_skills_jsonld (parsed @types) | T-007 | PASS |
| test_design_flagship (Jetson case, HexQuest, PreHeat-Macros as full repo hrefs) | T-008 | PASS |
| test_design_offers (commission + lessons + Fusion) | T-008 | PASS |
| test_design_jsonld (parsed @types) | T-008 | PASS |
| test_projects_real_only (no "Placeholder"; 16 GitHub links, all crussella0129) | T-009 | PASS |
| test_projects_filters (≥ 4 data-filter buttons) | T-009 | PASS |
| test_portfolio_redirect (→ /projects) | T-009 | PASS |
| test_product_redirect (→ /animus) | T-010 | PASS |
| test_no_retired_copy (no "CAD Platform"/"Early Access" in full dist corpus, entity-decoded) | T-010 | PASS |
| test_home_positioning ("Thread & Signal" + local-first, no /game develop/i) | T-011 | PASS |
| test_home_lanes (/animus, /skills, /design linked) | T-011 | PASS |
| test_home_proof ("100+ stars") | T-011 | PASS |
| test_home_jsonld (parsed @types include Organization + Person) | T-011 | PASS |
| test_home_accent_tokens (--accent/--accent-warm in built CSS) | T-011 | PASS |
| test_services_offers (all five offers) | T-012 | PASS |
| test_services_no_games (/game develop/i) | T-012 | PASS |
| test_robots (Allow + sitemap pointer) | T-013 | PASS |
| test_llmstxt_format (H1, blockquote, ≥ 2 H2, [title](url): links) | T-014 | PASS |
| test_llms_covers_primary (7 section pages + exact root link `](https://threadandsignal.com/)`) | T-014 | PASS |
| test_llms_services_statement (AI-agent services statement) | T-014 | PASS |
| test_positioning_doc_exists | T-015 | PASS |
| test_positioning_doc_content (lead-offer probe + ≥ 5 moves scoped to the marketing-moves section) | T-015 | PASS |

**42/42 unit checks pass** (final run after critic-driven tightening; see
`critique.md` — 12 of 14 concerns applied as assertion tightenings/new checks,
2 deferred with rationale).

Notes on defects found during testing (both in the test script, not the site):
1. `test_internal_links_resolve` initially flagged hashed CSS asset hrefs
   (`/_astro/*.css`) as orphan page links — extension allowlist too narrow;
   fixed to verify any extensioned href by file existence.
2. The test critic identified 12 weak/missing assertions (og:type coverage,
   substring-vs-parsed JSON-LD, corpus gaps, etc.); all applied and re-run green.
