# Test Critique — Sprint 3

## Concerns

### C-001: T-001 EARS clauses had no executed named test
- **Where:** `test-plan.md` T-001 unit tests / `unit-tests.md`
- **Quote:** "`check_builds_export` … a `builds` array exists naming Animus Ferric, sdr.rs, SpecuLex" and "`check_links_resolve_or_nameonly`"
- **Failure mode:** EARS-coverage
- **Why it matters:** T-001's two EARS clauses (builds data present; only verified URLs linked) were verified by hand in the build phase but the first suite run (16 checks) executed no named test for them, leaving criterion INT-0002 #6's data half unproved by an automated gate.
- **Suggested response:** add-test.
- **Resolution:** Added `check_builds_export` (asserts the built page renders all three builds with their repo links) and `check_links_resolve` (asserts every rendered build href is in the verified-resolving set). Suite now 18/18. Network resolution itself was performed and recorded in T-301 (git ls-remote + GitHub forks API); the suite asserts against that verified set to stay deterministic rather than hitting the network on every run.

### C-002: The "omit URL when unverified" branch is unexercised
- **Where:** `build-plan.md` T-001 #2 / `evidence.ts` `builds`
- **Quote:** "WHEN a `builds` entry has no verified public URL, THEN that entry SHALL omit its `url` field"
- **Failure mode:** negative-path
- **Why it matters:** All three current builds resolved, so no data triggers the name-only branch; the negative path is proven only by code inspection, not by data.
- **Suggested response:** defer-with-rationale — no unverified project is in scope this sprint. The invariant is enforced structurally (the template renders `<a>` only when `b.url` is set) and `check_links_resolve` fails loudly if any non-verified href ever appears. Revisit if a future build without a public repo is added.

## Confidence
proceed-with-caveats
