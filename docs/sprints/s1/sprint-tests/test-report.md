# Sprint 1 Test Report

## Summary
- Unit tests: 39 passed / 0 failed / 39 total (s1 suite, post-critique tightening)
- Integration tests: 3 passed / 0 failed / 3 total (incl. the full s0 regression suite, 46/46, as the frozen-strings gate — amendment log EMPTY)
- E2E tests: 2 passed / 0 failed / 2 total (build green; both suites green — 85 named checks total)
- CI status: not run by design — the only workflow is the gh-pages production deploy on push to main; push is gated behind the human visual sign-off (locked Terminal checkpoint).

## Failures
None in the final run. Defects found and root-caused during the phase:
1. **Test-fidelity defects (critic-found, script-side):** the hero-headline probe
   had been weakened around an ink-gradient span split; two checks
   (nav-underline, contact-copper) were passing vacuously — their tightened
   versions went red until fixed against the real emitted output (minified
   `:after`, Astro-inlined page CSS). Eight assertions tightened in total;
   full record with responses in `critique.md`.
2. **Content defect (critic-found, site-side):** the pre-rebrand hello-world
   blog post still pitched the retired "CAD platform" and "Game development
   notes" — outside every existing sweep's corpus. Rewritten in the new voice;
   a new full-corpus banned-string sweep now enforces the contract as the
   build plan states it.
3. **Human-checkpoint defect (user-found, site-side):** the hero signal pulses
   read as "small balls bugging across the screen." Rebuilt per the user's
   direction as golden textile wave packets (zigzag carrier in a raised-cosine
   envelope with stitch ticks riding the thread). Visually re-verified in the
   preview; canvas checks re-run green.

## Technical Debt Identified
- **Contact form endpoint remains a placeholder** (`FORMSPREE_ENDPOINT`) —
  carried from sprint 0; must be surfaced at push time.
- The s0/s1 suites live under gitignored `sprints/` (protocol: sprints are
  ephemeral working memory). Auditability of "never silently amended" rests on
  the locked plans describing every check plus critic re-verification each
  sprint — accepted, noted per critique C-010.
- `test_no_react_three_bundle` uses a bare 'react' substring (false-fail-safe;
  revisit only if a react-adjacent dependency ever returns).

## Coverage Observations
- Every T-101…T-111 EARS clause maps to an implemented check in one of the two
  suites; the critic re-ran both suites and the build independently and
  reconciled all counts (37→39 s1 checks, 46 s0, exact).
- Two critic-tightened checks exposing vacuous passes is the strongest argument
  this sprint for keeping the adversarial test-critic step.
- The suites remain static-file inspection: deterministic, no timing or network
  surface. Visual/taste judgment (the sprint's real exit) stays with the human
  checkpoint, with screenshots delivered.
