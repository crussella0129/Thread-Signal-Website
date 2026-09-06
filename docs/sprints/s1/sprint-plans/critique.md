# Plan Critique — Sprint 1

(Critic subagent output summary with primary-agent responses. Confidence:
`proceed-with-caveats`; C-001..C-004 named must-fix before lock. All applied
as below; plans amended prior to finalize.)

### C-001: Frozen contract says "your hardware"; new copy says "hardware you own" — s0 `test_home_positioning` would fail
- **Failure mode:** s0-regression-gap
- **RESPONSE: fix-in-plan — APPLIED.** T-105 EARS now requires the home page to contain the literal substring "local-first" (in the "Why the signal stays home" section) in addition to the "hardware you own" phrasing; contract line corrected to name the exact disjunction the s0 check tests.

### C-002: Amendment mechanism only covers "style-coupled" checks in a verbal rebrand
- **Failure mode:** s0-regression-gap
- **RESPONSE: fix-in-plan — APPLIED.** Amendment clause widened to "style- or copy-coupled, provided the frozen list itself is untouched."

### C-003: Copper-ampersand lockup breaks the contiguous "Thread & Signal" string match
- **Failure mode:** s0-regression-gap
- **RESPONSE: fix-in-plan — APPLIED.** T-103 EARS now requires a contiguous plain-text "Thread & Signal" (entity-encoded ok) to remain on every page via the footer copyright line, which T-103 must preserve as a text node.

### C-004: Frozen list under-covers `test_animus_lineage` (fev link, Python/Rust chips, exact bare-Animus href)
- **Failure mode:** s0-regression-gap
- **RESPONSE: fix-in-plan — APPLIED.** Contract now freezes all four lineage repo links (including the exact bare `.../Animus` href) and all three language chips (Python, Rust, `>Go<`).

### C-005: Scope escalation and react-removal not scheduled as ADRs; research §5 contradicts the build plan
- **Failure mode:** ignored-ADR
- **RESPONSE: fix-in-plan — APPLIED.** Build plan context notes research §5's direction was superseded by user escalation ("complete reimagining", Lamplight Atelier chosen via preview). Terminal checkpoint now mandates recording two ADRs at Loop phase: (1) react/three removal, (2) Lamplight Atelier rebrand amending ADR-1's verbal expression while preserving the local-first commercial positioning.

### C-006: SITE_DESCRIPTION, llms.txt, and docs/positioning.md keep the old voice — identity forks
- **Failure mode:** missing-risk
- **RESPONSE: fix-in-plan — APPLIED (as new T-111).** Identity files get a voice-alignment pass: SITE_DESCRIPTION rewritten in the new voice (safe: `test_default_description` compares dist to the source constant), llms.txt summary updated (structural/URL/services-statement checks preserved), positioning.md gains a brand-voice addendum (its frozen probe strings preserved).

### C-007: EARS vagueness ("byte-compatible in structure", "no layout regressions")
- **Failure mode:** EARS-vague
- **RESPONSE: fix-in-plan — APPLIED.** T-104 restated as "the s0 head checks SHALL pass unchanged"; blog clause restated as exactly what is tested (build green + links resolve + tokens present), visuals to the human checkpoint.

### C-008: T-110 bundles services + contact + blog
- **Failure mode:** granularity
- **RESPONSE: fix-in-plan — APPLIED.** Split: T-110 = services + contact (both carry heavy frozen lists, one "commercial pages" concern); T-111 = blog inheritance + identity-file voice alignment (C-006). Builder commits per task as always.

### C-009: Untested EARS fragments (copper ampersand, static weave) + no banned-strings rule for new copy
- **Failure mode:** plan-test-mismatch
- **RESPONSE: fix-in-plan — APPLIED.** Fragments moved to Notes (explicitly human-checkpoint-verified); contract gains: "new copy must not introduce the s0 banned strings ('Early Access', 'CAD Platform', /game develop/i, 'Placeholder', 'hello@threadandsignal.com')"; `test_canvas_reduced_motion` strengthened to require a `matchMedia('(prefers-reduced-motion` call in the hero script.

## Confidence
`proceed-with-caveats` → all nine concerns fixed in-plan before lock.
