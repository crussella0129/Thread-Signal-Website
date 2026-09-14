# Sprint 3 Test Report

- **Result:** PASS (local verification; not published).
- **Tested head:** `3ca7301edcb88c1d8a9bf054e7ca857d503726c1` (branch `codex/work`).
- **Intent verified:** [INT-0002](../../../intents/INT-0002-work-led-homepage.md) — a minimal, work-led homepage that sells in plain language.
- **CI conclusion:** none — GitHub CI minutes are exhausted this month, so all
  gates were run locally at Charles's direction. No push or deployment occurred.

## Evidence
- Unit: [unit-tests.md](unit-tests.md) — `dist-check-s3.mjs`, **18 passed, 0 failed**.
- Integration: [integration-tests.md](integration-tests.md) — `astro check`
  (14 files, 0 errors), `astro build` (5 pages), Neutronium audit (8/8).
- E2E: [e2e-tests.md](e2e-tests.md) — no horizontal overflow at 360/390/768/1440
  (+200% by reflow), 2px white focus ring, promise+action above the fold at
  1440×900, hero image 200 OK with no layout shift, no deploy.
- Critique: [critique.md](critique.md) — `proceed-with-caveats` (both concerns
  resolved/deferred with rationale).

## Intent acceptance coverage
| INT-0002 criterion | Verified by | Status |
|--------------------|-------------|--------|
| #1 promise + one action above the fold, no jargon | check_promise_present, check_single_primary_action, check_offers_named, E2E above-the-fold | met |
| #2 Jetson hero as honest proof; offers as short lines | check_jetson_hero, check_no_service_paragraphs | met |
| #3 no service paragraphs; few blocks; one action | check_block_count (4 sections), check_single_primary_action | met |
| #4 monochrome, JS-off, responsive, focus, contrast, 44px | check_monochrome_only, check_no_js_dependence, E2E overflow/focus, check_contrast_tokens, check_touch_targets, check_hero_responsive_css | met |
| #5 builds & passes local checks; no deploy | astro_check, astro_build, neutronium_audit, check_no_deploy_action | met |
| #6 builds line named + honest; no false claims | check_builds_line, check_builds_export, check_links_resolve, check_no_inception_or_outcome_claim | met |

## Caveats
- The name-only rendering branch for an unverified build URL is unexercised (all
  three repos resolved); enforced structurally and guarded by `check_links_resolve`.
- Verification is on the isolated study under `docs/design-studies/`. This report
  is not evidence of production integration or live behavior.

## Scope / publication
This sprint produced a reviewable local study only. Realization of INT-0002
(production integration, then an explicitly authorized publish + live
verification with Charles's visual sign-off) is out of scope here; INT-0002
remains `active`.
