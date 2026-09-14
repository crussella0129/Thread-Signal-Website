# Sprint 3 Unit Test Results

- **Tested head:** `3ca7301edcb88c1d8a9bf054e7ca857d503726c1` (branch `codex/work`)
- **Suite:** `docs/sprints/s3/sprint-tests/dist-check-s3.mjs` (parse5 over the built
  `docs/design-studies/dist/index.html`, plus README/direction source checks).
- **Command:**
  `node node_modules/astro/astro.js build --root docs/design-studies && node docs/sprints/s3/sprint-tests/dist-check-s3.mjs`
- **Result:** 18 passed, 0 failed.

| Test | EARS clause / criterion | Result |
|------|-------------------------|--------|
| `check_single_primary_action` | T-002 #1 (one primary CTA = quote mailto) | PASS (count=1, mailto quote) |
| `check_jetson_hero` | T-002 #2 (Jetson img: width/height, alt, CAD caption) | PASS (w=2160 h=1082, CAD figcaption) |
| `check_hero_eager` | T-002 #7 (no `loading="lazy"`) | PASS (loading unset → eager) |
| `check_hero_responsive_css` | T-003 #4 (hero `max-width:100%`) | PASS |
| `check_offers_named` | T-002 #3 / INT-0002 #1 (both offers, plain) | PASS (Automate a task; local AI on your own computer) |
| `check_promise_present` | T-002 #3 / INT-0002 #1 (one-line promise) | PASS ("I automate repetitive work.") |
| `check_no_service_paragraphs` | INT-0002 #2/#3 (old copy gone) | PASS |
| `check_block_count` | INT-0002 #3 (few blocks, ≤5 sections) | PASS (4 sections) |
| `check_builds_line` | T-002 #4 / INT-0002 #6 (3 builds; SpecuLex in development) | PASS |
| `check_builds_export` | T-001 #1 (builds data renders: names + repo links) | PASS (Animus Ferric, sdr.rs, SpecuLex with hrefs) |
| `check_links_resolve` | T-001 #2 (only verified-resolving URLs; no broken links) | PASS (3 hrefs, all in the verified set) |
| `check_no_js_dependence` | T-002 #5 / INT-0002 #4 (JS-off content) | PASS (0 `<script>`) |
| `check_no_membership_or_outcome_claim` | T-002 #6 / INT-0002 #6 (no false claims) | PASS (no membership claim, no metric, no client-outcome) |
| `check_monochrome_only` | INT-0002 #4 (monochrome) | PASS (all hex grayscale; no rgb color) |
| `check_contrast_tokens` | T-003 #3 (contrast) | PASS (body 19.0, muted 8.8, action 19.0) |
| `check_touch_targets` | T-003 #5 (≥44px) | PASS (action 52px, standalone link 44px) |
| `check_readme_current` | T-004 #1 (README updated) | PASS |
| `check_direction_pointer` | T-004 #2 (no stale "sales page") | PASS |

Note: `check_promise_present` initially failed on a test-only regex bug
(`/repeat/` vs. the word "repetitive"); the assertion was corrected to
`/repetit|repeat/` — the page copy was never wrong.
