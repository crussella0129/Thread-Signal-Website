# Sprint 2 Test Report

**Final status:** PASS including production. [Deployment evidence](deployment.md) completes the pending post-checkpoint check in the historical pre-checkpoint report below. INT-0001 is now realized; no publication work remains.

## Intent Verification
| Intent | Acceptance criterion | EARS / tests | Result | Intent evidence update |
|---|---|---|---|---|
| [INT-0001](../../../intents/INT-0001-marketing-search.md) | 1: supported offer, founder and brief | T-201 / marketing_content, public_claims_review, browser_lead_path | pass | Test evidence linked; active pending publication |
| INT-0001 | 2: useful attributed guide | T-202 / guide_content, internal_links, browser_guide | pass | Same report |
| INT-0001 | 3: discovery metadata | T-203 / metadata_contract, structured_data, social_asset, sitemap_coverage | pass | Same report |
| INT-0001 | 4: validation and production | T-204 / astro_check, build_output, legacy_regressions, browser_mobile | local and CI pass; live_deployment pending | Do not realize before live evidence |
| INT-0001 | 5: current skill and Book | T-204 / book_integrity, upstream_version | pass | Same report |

## Summary
- Current parsed-output checks: **7 passed / 0 failed** across 10 indexable pages.
- Legacy integration checks: **46 + 39 passed / 0 failed**.
- Astro: **0 errors / 0 warnings / 0 hints**; static production build succeeds.
- Browser: desktop lead path, guide navigation, 390px menu and 320px layout checks passed. No console errors.
- CI status: **green**. Production deployment is **pending**, not counted as passed.

## CI Confirmation
- **Head SHA:** `308d827af696cdb6712fb499b483dd14d3cbcca5`
- **CI run:** [34010418220](https://github.com/crussella0129/Thread-Signal-Website/actions/runs/34010418220)
- **Conclusion:** success
- **Confirmations:** `npm run validate`; [output results](unit-tests.md), [integration results](integration-tests.md), [browser results](e2e-tests.md), [accepted critique](critique.md).

## Failures
No remaining implementation failures. During verification, a guide-test stem omitted “maintain”; the assertion was repaired. A Service catalog label was aligned to its visible offer and checked again. Both fixes are in the passing source head.

## Technical Debt Identified
Existing dependency audit advisories were observed during development-tool installation; no dependency security review or unrelated upgrade was included. Search Console ownership and ranking measurement remain outside scope.

## Coverage Observations
All local EARS clauses map to executed checks and independent source review. No email was sent. No-JS/reduced-motion source regressions pass; separate browser emulation was unavailable. The bundle's close-before-checkpoint sequence requires an explicit local closure with publication pending. Keep INT-0001 active until actual deployment evidence is appended.
