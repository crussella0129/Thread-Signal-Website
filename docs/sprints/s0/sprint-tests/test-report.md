# Sprint 0 Test Report

## Summary
- Unit tests: 42 passed / 0 failed / 42 total
- Integration tests: 4 passed / 0 failed / 4 total
- E2E tests: 2 passed / 0 failed / 2 total (build green + full dist sweep)
- CI status: not run this sprint by design — the only workflow is the gh-pages
  production deploy, which triggers on push to main; push is gated behind the
  Loop-phase human visual sign-off (locked build-plan Terminal checkpoint).

## Failures
None in the final run. Two test-script defects were found and root-caused during
the phase (site was never at fault):
1. Link-resolution check misclassified hashed CSS asset hrefs as page links
   (extension allowlist too narrow) — fixed to existence-check any extensioned href.
2. Test critic identified 12 weak/miscoped assertions (missing og:type coverage,
   substring JSON-LD probes instead of parsed @types, SHALL NOT sweeps not covering
   the full dist corpus, vacuous llms.txt root check, loose lineage/subject probes,
   an off-by-one results count). All applied; suite re-run green at 46/46.
   Full record with responses: `critique.md`.

## Technical Debt Identified
- **Contact form endpoint is a deliberate placeholder** (`FORMSPREE_ENDPOINT` in
  src/data/site.ts). The form will not submit until the user creates a Formspree
  form and replaces the ID. The mailto CTA is primary until then. (Critique C-013 —
  must be surfaced at push time.)
- Star-count proof claims ("100+ stars", "35+ stars") are snapshots; re-verify
  rounded claims still hold at future publishes (per locked plan Notes).
- Visual/tone retention (accent tokens beyond CSS presence, lineage told as
  learning-not-failure) is deferred to the Loop-phase human checkpoint by design.

## Coverage Observations
- Every EARS clause in the locked build-plan maps to at least one named check in
  `dist-check.mjs`; the T-003 `jsonLd`-prop clause is covered indirectly but
  robustly by four downstream parsed-JSON-LD checks (critic-reviewed as acceptable).
- The suite is static-file inspection: deterministic, no timing/network flake
  surface. Environment assumptions: Node ≥ 20.11, single `sitemap-0.xml` (crashes
  loudly, not silently, if Astro ever splits the sitemap).
- The critic independently reproduced the green run and full-grepped dist/
  (including _astro bundles) for banned content — none found.
