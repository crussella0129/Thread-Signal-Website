# Plan Critique — Sprint 0

(Critic subagent output, with primary-agent responses inline under each concern.)

## Concerns

### C-001: Unmeasurable EARS response fragments in T-006, T-011, T-012
- **Where:** `build-plan.md` T-006, T-011, T-012 success criteria
- **Quote:** T-006: "the four-implementation lineage … told as learning-not-failure"; T-011: "SHALL state the new positioning … while retaining the thread/signal identity"; T-012: "SHALL NOT list generic game development or placeholder consulting copy". Also T-001's degenerate "WHEN any component imports EMAIL" trigger.
- **Failure mode:** EARS-vague
- **Suggested response:** fix-in-plan
- **RESPONSE: fix-in-plan — APPLIED.** Tone fragments moved to Notes; criteria restated as checkable proxies (T-011: "SHALL retain the 'Thread & Signal' name and existing accent design tokens"; T-012 SHALL NOT narrowed to the game-development block; T-001 triggers restated as build-time events).

### C-002: EARS clause fragments with no matching test
- **Where:** T-003 sitemap `<link>`, T-006 SoftwareSourceCode/convictions/repo links, T-007 oovra/.lux, T-009 category filters, T-011 star proof
- **Failure mode:** plan-test-mismatch
- **Suggested response:** fix-in-plan
- **RESPONSE: fix-in-plan — APPLIED.** Added `test_sitemap_link_head`, extended `test_animus_lineage` (convictions + both repo links) and `test_animus_jsonld` (SoftwareSourceCode), added `test_skills_supporting`, `test_projects_filters`, `test_home_proof`.

### C-003: llms.txt coverage test checks the wrong direction
- **Where:** T-013 (now T-014) vs Component F integration
- **Failure mode:** plan-test-mismatch
- **Suggested response:** fix-in-plan
- **RESPONSE: fix-in-plan — APPLIED.** Clause now names the eight primary pages explicitly; added `test_llms_covers_primary` (all eight page URLs ∈ llms.txt) alongside the existing llms ⊆ sitemap check, plus a services-statement content check.

### C-004: Hard-coded star counts contradict the research's staleness note
- **Where:** T-008/T-011 criteria vs research §4
- **Failure mode:** missing-risk
- **Suggested response:** fix-in-plan
- **RESPONSE: fix-in-plan — APPLIED.** Exact per-repo counts removed from success criteria (moved to Notes with verify-at-publish caveat); proof claims use rounded aggregates ("100+ stars", "35+ stars") which age safely.

### C-005: Undeclared ordering between T-009 and T-010 on astro.config.mjs; T-004 references routes created later
- **Failure mode:** hidden-dep
- **Suggested response:** fix-in-plan
- **RESPONSE: fix-in-plan — APPLIED.** T-010 now depends on T-006 **and T-009** (serializing the two astro.config.mjs edits). T-004's criterion annotated: routes go live in T-006–T-009; link resolution is verified by the sprint-end integration check, not at T-004 commit time.

### C-006: Non-elementary tasks bundling two distinct concerns (T-001, T-004, T-013)
- **Failure mode:** granularity
- **Suggested response:** fix-in-plan for T-013; defer for T-001/T-004
- **RESPONSE: fix-in-plan for T-013 — APPLIED.** Split: T-013 = robots.txt, T-014 = llms.txt, positioning doc renumbered T-015 (test plan renumbered to match). **defer-with-rationale for T-001 and T-004:** each pair (two data modules; nav+footer) always changes together, shares one concern (site identity / IA), and splitting adds commit ceremony without reducing risk.

### C-007: `test_no_cad_platform_copy` hardcodes the HTML-entity-encoded phrase
- **Failure mode:** plan-test-mismatch
- **Suggested response:** fix-in-plan
- **RESPONSE: fix-in-plan — APPLIED (with a correction to the critic's suggestion).** The entity-agnostic substring "Geometry Kernel" would false-positive on the legitimate crusst project entry ("Rust Based Geometry Kernel") on /projects. Test instead bans the distinctive retired marketing strings "CAD Platform" and "Early Access" (no ampersand, encoding-proof) across dist.

### C-008: `test_default_description` is not implementable from dist alone
- **Failure mode:** plan-test-mismatch (testability)
- **Suggested response:** fix-in-plan
- **RESPONSE: fix-in-plan — APPLIED.** Pinned to a named fixture: the blog index page will rely on the default (T-003 touches extended to ensure it passes no explicit description); test asserts blog index meta description equals SITE_DESCRIPTION.

### C-009: Auto-deploy risk survives only as a non-normative test-plan note
- **Failure mode:** missing-risk
- **Suggested response:** defer-with-rationale or fix-in-plan
- **RESPONSE: fix-in-plan — APPLIED (belt) + protocol already covers it (suspenders).** Added a normative terminal checkpoint line at the end of the build plan's execution sequence: build-phase commits are local only; `git push` to main is forbidden until the human visual sign-off at Loop phase (push = production deploy via gh-pages workflow). This also matches sprint-loop SKILL.md checkpoint 1 (visual/UX inspection) and 2 (public deploy).

## Confidence

`proceed-with-caveats` — critic's must-address list (C-002, C-003, C-005) fully applied; all other concerns fixed or deferred with rationale above. Plans amended prior to lock.
