# Sprint 1 Unit Test Results

Two suites, final run 2026-07-02 against the rebuilt dist (post test-critic
tightening — see critique.md):
- Regression: `sprints/s0/sprint-tests/dist-check.mjs` — **46/46 PASS** (frozen-strings contract held; Amendment log remains empty).
- New: `dist-check-s1.mjs` (this directory) — **39/39 PASS** (37 original + `test_projects_link_count` and `test_banned_strings_full_corpus` added per critique C-005/C-002; eight assertions tightened per critique, two of which briefly went red against vacuous passes before being fixed against the real emitted output).

| Check | Task | Result |
|-------|------|--------|
| test_palette_tokens (ink/copper/madder/verdigris under kept token names) | T-101 | PASS |
| test_fraunces_font (import + --font-heading) | T-101 | PASS |
| test_body_layers (radial glows + crosshatch) | T-101 | PASS |
| test_reveal_nojs_safe (hiding scoped under html.js) | T-101 | PASS |
| test_reduced_motion_css | T-101 | PASS |
| test_card_variants (.card-copper/thread/madder + hover lift) | T-101 | PASS |
| test_hero_headline ("Handwoven automation." + loom story + hardware you own) | T-102 | PASS |
| test_hero_ctas (Commission a build → /contact, /projects link) | T-102 | PASS |
| test_hero_canvas (canvas aria-hidden) | T-102 | PASS |
| test_no_react_three_deps (package.json clean) | T-102 | PASS |
| test_no_react_three_bundle (dist/_astro clean) | T-102 | PASS |
| test_config_no_react | T-102 | PASS |
| test_canvas_reduced_motion (matchMedia call site) | T-102 | PASS |
| test_nav_lockup_cta | T-103 | PASS |
| test_nav_underline_css | T-103 | PASS |
| test_footer_tagline (every page) | T-103 | PASS |
| test_contiguous_brand_string (every page, decoded) | T-103 | PASS |
| test_js_marker_script (every page) | T-104 | PASS |
| test_io_reveal_script (IO + reduced-motion early-out) | T-104 | PASS |
| test_theme_color (#141210 every page) | T-104 | PASS |
| test_lane_variants | T-105 | PASS |
| test_lane_taglines_home (all three mottos) | T-105 | PASS |
| test_home_local_first (feeds s0 positioning check) | T-105 | PASS |
| test_animus_tagline (contiguous "Intelligence that stays home.") | T-106 | PASS |
| test_lineage_thread (timeline element + ≥4 nodes) | T-106 | PASS |
| test_conviction_numerals (01/02/03) | T-106 | PASS |
| test_skills_tagline | T-107 | PASS |
| test_works_with_strip (4 harness chips) | T-107 | PASS |
| test_design_tagline | T-108 | PASS |
| test_card_patterns (circuit/warp/iso/hex all present) | T-109 | PASS |
| test_no_diamond_placeholder | T-109 | PASS |
| test_commission_steps ("How a commission works" + 01/02/03) | T-110 | PASS |
| test_contact_copper_card | T-110 | PASS |
| test_site_description_voice (handwoven + automation + local-first) | T-111 | PASS |
| test_llms_voice_intact (new voice + structure + agent statement) | T-111 | PASS |
| test_positioning_addendum (brand voice + frozen probes) | T-111 | PASS |
| test_fonts_single_import (integration; counted in the 37) | int. | PASS |

**Additional checks (post-critique):**
| test_projects_link_count (≥16 project GitHub links; 18 present) | T-109 | PASS |
| test_banned_strings_full_corpus (5 banned strings + lowercase variant, every dist text file) | contract | PASS |

**Test-script defects found and fixed during the phase** (script, not site):
1. `test_fonts_single_import` matched only unminified `@import url()`; minifier
   emits `@import"…"`. Widened.
2. `test_hero_headline` had been quietly weakened around the ink-gradient span
   split (critique C-001) — now matches tag-stripped text, same standard as
   `test_animus_tagline` (which caught the identical defect on T-106 during
   build).
3. `test_nav_underline_css` and `test_contact_copper_card` were passing
   vacuously (critique C-003/C-008); tightened probes went red, then were fixed
   against the real emitted rules (minified `:after`; Astro-inlined page CSS).

**Content fix during the phase:** the pre-rebrand hello-world blog post carried
banned copy ("CAD platform", "Game development notes") — rewritten in the
Lamplight Atelier voice (critique C-002).

**Checkpoint-feedback rework:** the hero pulses read as "balls" at the user's
first look; rebuilt as golden textile wave packets (zigzag carrier in a
raised-cosine envelope + stitch ticks) at the user's direction. Committed as a
T-102 rework; `test_hero_canvas`/`test_canvas_reduced_motion` re-verified.
