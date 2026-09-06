Finalized - DO NOT EDIT

# Sprint 1 Test Plan

Two suites run against the built site after `npm run build`:
1. **Regression:** `node sprints/s0/sprint-tests/dist-check.mjs` — all 46 sprint-0
   checks stay green (frozen-strings contract). Any check that proves
   style-coupled is amended HERE with rationale, never silently.
2. **New:** `node sprints/s1/sprint-tests/dist-check-s1.mjs` — one named check
   per s1 EARS clause, listed below.

Amendment authority: a sprint-0 check may be amended only if style- OR
copy-coupled while the frozen list itself is untouched, recorded in the
Amendment log below (critique C-002).

## Unit Tests

### T-101 unit tests
- `test_palette_tokens`: built CSS defines `--bg:#141210`, `--accent:#e8a33d`, `--accent-warm:#c2543f`, `--thread:#4fb8a8` (whitespace-tolerant match)
- `test_fraunces_font`: built CSS font import includes `Fraunces`; `--font-heading` names Fraunces
- `test_body_layers`: built CSS body/background rules include at least one `radial-gradient` and a repeating pattern (crosshatch) declaration
- `test_reveal_nojs_safe`: reveal hiding rules are scoped under a `.js` (html marker) selector in built CSS
- `test_reduced_motion_css`: built CSS contains a `prefers-reduced-motion` media query disabling animation
- `test_card_variants`: built CSS defines `.card-copper`, `.card-thread`, `.card-madder` and a `:hover` transform on cards

### T-102 unit tests
- `test_hero_headline`: dist/index.html contains "Handwoven automation." and "programmable machine was a loom" and retains "hardware you own"
- `test_hero_ctas`: hero contains a /contact CTA labeled "Commission a build" and a /projects link
- `test_hero_canvas`: dist/index.html contains a `<canvas` with `aria-hidden="true"`
- `test_no_react_three_deps`: package.json has none of react, react-dom, three, @react-three/fiber, @astrojs/react, @types/react*, @types/three
- `test_no_react_three_bundle`: no file under dist/_astro contains "react" or "three.module" identifiers (case-sensitive markers)
- `test_config_no_react`: astro.config.mjs contains no `react(`
- `test_canvas_reduced_motion`: the hero inline script contains a `matchMedia('(prefers-reduced-motion` call (comment-proof: must be a call site, checked as the literal call string)

### T-103 unit tests
- `test_nav_lockup_cta`: nav HTML contains the Thread & Signal lockup and a "Commission a build" link to /contact
- `test_nav_underline_css`: nav CSS contains an underline/scale indicator rule on hover/active (no JS dependency)
- `test_footer_tagline`: footer contains "Handwoven automation, running on hardware you own."
- `test_contiguous_brand_string`: every built page contains a contiguous plain-text "Thread & Signal" (entity-decoded match — the footer copyright text node; critique C-003)

### T-104 unit tests
- `test_js_marker_script`: every built page contains the inline script adding the `js` class to documentElement
- `test_io_reveal_script`: built pages contain an IntersectionObserver reveal script with a reduced-motion early-out
- `test_theme_color`: every page head contains `<meta name="theme-color"` with the ink value
- (head contract regression covered by s0 suite: canonical/OG/JSON-LD/sitemap link)

### T-105 unit tests
- `test_lane_variants`: dist/index.html contains card-copper, card-thread, and card-madder classes on the three lane cards
- `test_lane_taglines_home`: home shows all three lane taglines
- `test_home_local_first`: home contains the literal substring "local-first" (critique C-001 — feeds s0 `test_home_positioning`)
- `test_home_frozen`: covered by s0 (`test_home_proof`, `test_home_jsonld`, `test_home_positioning`) — rerun s0

### T-106 unit tests
- `test_animus_tagline`: dist/animus/index.html contains "Intelligence that stays home."
- `test_lineage_thread`: animus page contains a `lineage-thread` element (connected timeline) and four step nodes
- `test_conviction_numerals`: animus page contains mono numerals 01, 02, 03 in the convictions section
- (frozen lineage/conviction/repo/hire strings: s0 `test_animus_*` rerun)

### T-107 unit tests
- `test_skills_tagline`: dist/skills/index.html contains "Skills that outlive subscriptions."
- `test_works_with_strip`: skills page contains chips naming Claude Code, Codex CLI, Antigravity, and open harnesses
- (frozen trio/supporting/offers: s0 `test_skills_*` rerun)

### T-108 unit tests
- `test_design_tagline`: dist/design/index.html contains "Drawn, printed, held."
- (frozen flagship/offers: s0 `test_design_*` rerun)

### T-109 unit tests
- `test_card_patterns`: dist/projects/index.html contains ≥4 distinct `data-pattern` values (circuit, warp, iso, hex) on card header SVGs, each `aria-hidden`
- `test_no_diamond_placeholder`: projects page contains no `project-placeholder` block / `&#9670;` diamond glyph
- (filters/links/Placeholder-ban: s0 `test_projects_*` rerun)

### T-110 unit tests
- `test_commission_steps`: dist/services/index.html contains "How a commission works" with three numbered steps
- `test_contact_copper_card`: contact page email block carries the copper card treatment class
- (frozen offers/subjects: s0 `test_services_*`, `test_contact_*` rerun)

### T-111 unit tests
- `test_site_description_voice`: SITE_DESCRIPTION in site.ts mentions automation, agents, and local-first/hardware phrasing in the new voice (source check); s0 `test_default_description` proves dist equality by construction
- `test_llms_voice_intact`: llms.txt keeps llmstxt.org structure, all eight primary URLs, "If you are an AI agent", and `## Services` after the voice rewrite (s0 `test_llms*` rerun covers most; this asserts the rewrite happened — llms.txt contains "Handwoven automation" or loom-voice phrasing)
- `test_positioning_addendum`: docs/positioning.md contains a brand-voice section (taglines/palette) AND all frozen probe strings ("most marketable", "lead with automation", "niche", "lane", ≥5 moves under "## Next marketing moves")

## Integration Tests

- `test_s0_suite_green`: the entire sprint-0 suite (46 checks) exits 0 against the rebuilt dist — the frozen-strings contract holds site-wide
- `test_internal_links_still_resolve`: (inside s0 suite) all internal links resolve post-rebrand
- `test_fonts_single_import`: exactly one Google Fonts import URL in built CSS (no duplicate font loading from the redesign)

## End-to-End Tests
- **Status:** possible
- `test_build_green`: `npm run build` exits 0
- `test_both_suites`: s0 (46) + s1 suites all green
- **Human checkpoint (the sprint's real exit):** screenshots of home, animus, skills, design, projects, services, contact at desktop and mobile widths, delivered in the checkpoint summary. No push without sign-off.

## Amendment log
(Empty at plan time. If any s0 check proves style-coupled during Build, record
the check name, why it was style-coupled, and the amendment here.)

- **2026-07-02 — `test_hero_headline` (s1 suite), copy-coupled.** User directed
  a hero copy change at the post-sprint checkpoint: the loom story line became
  "The first programmable business machine was a loom — let's build yours"
  (the prior "we've been weaving ever since" read as claiming we invented the
  loom). Probe updated to the new line; docs/positioning.md voice guide updated
  to match. No frozen-list string was touched; both suites re-run green.

- **2026-07-16 — contact-form retirement (s0 suite, three checks),
  architecture-coupled.** User decided to remove the contact form entirely
  (no Formspree, no self-hosted Worker): the contact page is direct channels
  only (email / GitHub / LinkedIn) with a morse-wire hero. Amendments:
  `test_site_constants` no longer requires FORMSPREE_ENDPOINT (constant
  deleted); `test_contact_subjects` → `test_contact_channels` (all three
  channels present); `test_form_action_constant` → `test_contact_no_form`
  (page contains no form element — the decision is enforced, not just
  permitted). Contact-page frozen strings otherwise unchanged (charles@ email,
  hello@ ban). Both suites re-run green.
