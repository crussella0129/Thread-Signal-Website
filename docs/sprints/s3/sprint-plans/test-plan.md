# Sprint 3 Test Plan

## Intent Traceability
| Intent | Acceptance criterion | Build task / EARS clause | Verification |
|--------|----------------------|--------------------------|--------------|
| [INT-0002](../../../intents/INT-0002-work-led-homepage.md) | #1 one-line promise + one action, no jargon | T-002 / one primary CTA; offers in plain language | `check_single_primary_action`, `check_promise_present`, browser `check_above_the_fold_desktop` |
| [INT-0002](../../../intents/INT-0002-work-led-homepage.md) | #2 Jetson hero as honest proof; offers as short lines | T-002 / Jetson img with dims+alt+caption; hero eager | `check_jetson_hero`, `check_hero_eager`, `check_no_service_paragraphs` |
| [INT-0002](../../../intents/INT-0002-work-led-homepage.md) | #3 no service paragraphs, few blocks, one action | T-002 / one CTA; T-003 | `check_single_primary_action`, `check_block_count` |
| [INT-0002](../../../intents/INT-0002-work-led-homepage.md) | #4 monochrome, JS-off, responsive, focus, contrast, 44px | T-003 / overflow; focus; contrast; targets; hero max-width. T-002 / JS-off content | `check_monochrome_only`, `check_no_js_dependence`, `check_hero_responsive_css`, browser `check_no_overflow_360_390_768_1440`, browser `check_focus_ring`, `check_contrast_tokens`, `check_touch_targets` |
| [INT-0002](../../../intents/INT-0002-work-led-homepage.md) | #5 builds & passes local checks; no deploy | T-002+T-003 / build & type check | `astro_check`, `astro_build`, `neutronium_audit`, `check_no_deploy_action` |
| [INT-0002](../../../intents/INT-0002-work-led-homepage.md) | #6 builds line named + honest; no false claims | T-001 / `builds` export; T-002 / builds line + no false claims | `check_builds_export`, `check_builds_line`, `check_no_inception_or_outcome_claim`, `check_links_resolve_or_nameonly` |

## Unit Tests
### T-001 unit tests
- **Intent:** [INT-0002](../../../intents/INT-0002-work-led-homepage.md)
- `check_builds_export`: import/parse `evidence.ts` → a `builds` array exists naming Animus Ferric, sdr.rs, SpecuLex; the SpecuLex entry has `status` containing "development". (EARS T-001 #1)
- `check_links_resolve_or_nameonly`: every `builds[].url` present is a well-formed public URL that resolved during T-001 verification; entries without a verified URL have no `url` key. (EARS T-001 #2)

### T-002 unit tests (static assertions over built `dist/index.html`, via parse5)
- **Intent:** [INT-0002](../../../intents/INT-0002-work-led-homepage.md)
- `check_single_primary_action`: exactly one element with the primary-action class, and its href is the quote `mailto:`. (EARS T-002 #1)
- `check_jetson_hero`: one `<img>` with src `/jetson-v2-2-render.png`, numeric `width`+`height`, non-empty `alt`; a `<figcaption>`/caption node contains "CAD". (EARS T-002 #2)
- `check_hero_eager`: the hero `<img>` does not declare `loading="lazy"`. (EARS T-002 #7)
- `check_hero_responsive_css`: the hero image rule in the effective CSS sets `max-width:100%` (and does not pin a fixed width exceeding the container). (EARS T-003 #4)
- `check_offers_named`: page text contains both a plain automate-a-task offer and a plain local-AI setup/test offer; no undefined acronyms in the offer text. (EARS T-002 #3)
- `check_promise_present`: an `<h1>` one-line promise naming what Charles builds. (EARS T-002 #3 / criterion #1)
- `check_no_service_paragraphs`: the two old service `<p>` blocks ("You get a working tool…", "I install it, test your task…") are absent. (criterion #2/#3)
- `check_block_count`: top-level `<section>` count is small (≤ 5). (criterion #3)
- `check_builds_line`: page text names Animus Ferric, sdr.rs, and SpecuLex in one region, with "development" adjacent to SpecuLex. (EARS T-002 #4)
- `check_no_js_dependence`: built HTML has no `<script>` and content is fully present in static markup. (EARS T-002 #5)
- `check_no_inception_or_outcome_claim`: HTML contains no "Inception" membership phrasing and no client-outcome/performance claim strings. (EARS T-002 #6)
- `check_monochrome_only`: no non-grayscale color values in the page's effective CSS (only #000/#fff/#0a0a0a/gray tokens). (criterion #4)
- `check_contrast_tokens`: computed text/background token pairs meet ≥4.5:1 (body/caption) and the action ≥3:1. (EARS T-003 #3)
- `check_touch_targets`: the primary action and standalone links have min-height ≥44px in CSS. (EARS T-003 #5)

### T-004 unit tests
- **Intent:** [INT-0002](../../../intents/INT-0002-work-led-homepage.md)
- `check_readme_current`: `README.md` current-revision text names the Jetson hero + builds line and no longer asserts "zero images" / "two concrete services" as the current page. (EARS T-004 #1)
- `check_direction_pointer`: `direction.astro` lead pointer text does not contain "sales page" as the description of the current homepage. (EARS T-004 #2)

## Integration Tests
### Homepage build integration
- **Intents:** [INT-0002](../../../intents/INT-0002-work-led-homepage.md)
- `astro_check`: `astro check --root docs/design-studies` → zero errors (T-001 data + T-002 markup + T-003 styles compile together, incl. the `builds` import). 
- `astro_build`: `astro build --root docs/design-studies` → all pages build; `dist/index.html` produced for the dist-check assertions above.
- `neutronium_audit`: `bash scripts/audit.sh docs/design-studies/src` → zero failures (no React idioms, no SSR-breaking globals; static page expected clean).

## End-to-End Tests
- **Status:** possible
- `check_no_overflow_360_390_768_1440`: load built preview in the Claude Browser; at 360, 390, 768, 1440 CSS px (and 200% zoom) `document.scrollWidth <= clientWidth` (allowing scrollbar delta). (EARS T-003 #1)
- `check_focus_ring`: keyboard-focus the primary action; a visible 2px outline with offset is present (computed style / screenshot). (EARS T-003 #2)
- `check_above_the_fold_desktop`: at 1440×900 the promise line and primary action are within the initial viewport. (criterion #1)
- `check_no_deploy_action`: confirm no push/deploy occurred — `git status` shows work only on `codex/work`, no push, `dist/` untracked. (criterion #5)
