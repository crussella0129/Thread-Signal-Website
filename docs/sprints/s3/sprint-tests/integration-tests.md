# Sprint 3 Integration Test Results

- **Tested head:** `3ca7301edcb88c1d8a9bf054e7ca857d503726c1` (branch `codex/work`)
- **Scope:** T-001 data + T-002 markup + T-003 styles + T-004 docs compile and
  build together into the study site. GitHub CI minutes are exhausted this month,
  so all gates were run locally (per Charles); no CI conclusion applies.

## `astro_check`
- **Command:** `node node_modules/astro/astro.js check --root docs/design-studies`
- **Result:** PASS — 14 files, **0 errors, 0 warnings, 0 hints**. Confirms the new
  `builds` import in `index.astro` and the typed `Build` interface in
  `evidence.ts` type-check across the boundary.

## `astro_build`
- **Command:** `node node_modules/astro/astro.js build --root docs/design-studies`
- **Result:** PASS — **5 pages** built (`/`, `/case-study/`, `/comparison/`,
  `/direction/`, `/portfolio/`); `dist/index.html` produced for the unit suite.

## `neutronium_audit`
- **Command:** `bash ~/.claude/skills/neutronium/scripts/audit.sh docs/design-studies/src`
- **Result:** PASS — 8 checks passed, 0 failures (no React imports/hooks, no
  `className`, no destructured props, no browser globals at module top level).
  Expected clean: the page is static Astro with zero client islands.

All three integration gates green at the tested head.
