# Test Critique — Sprint 1

(Test-critic subagent output summary with primary-agent responses. The critic
independently re-ran both suites and the build — all claimed results
reproduced. Confidence: `proceed-with-caveats`; C-001 and C-002 named
must-resolve. All ten concerns addressed below; both suites re-run green after
the changes: **s1 39/39, s0 46/46.** Note: the harness safety classifier was
briefly unavailable during the critic's run; its factual claims were
independently re-verified by the primary agent before acting.)

### C-001: test_hero_headline silently weakened — contiguous "Handwoven automation." absent from dist (ink-gradient span split)
- **RESPONSE: tighten-assertion — APPLIED.** The check now matches tag-stripped page text (scripts removed, tags → spaces, whitespace collapsed), which honestly passes today's markup and applies the same standard as `test_animus_tagline`. Deviation documented in unit-tests.md.

### C-002: "Full dist corpus" banned-string sweep didn't exist for 2 of 5 strings; live /game develop/i match in the hello-world blog post
- **RESPONSE: add-test + content fix — APPLIED.** (1) New `test_banned_strings_full_corpus` sweeps every text file in dist for all five banned strings (plus lowercase "CAD platform", which the s0 case-sensitive check had missed). (2) The stale pre-rebrand blog post was rewritten in the new voice — it also pitched the retired "CAD platform", so this was overdue content work, not test gaming. The integration claim ("contract held site-wide") is now backed by an implemented sweep.

### C-003: test_nav_underline_css passed only via a vacuous `scaleX` substring fallback
- **RESPONSE: tighten-assertion — APPLIED.** Now a single nav-scoped rule regex (handles minified `:after` and inlined page CSS); the bare-substring disjunct removed. The tightened probe initially FAILED — proving the critic right — and was fixed against the real emitted rule.

### C-004: test_hero_ctas fully satisfiable by the nav CTA
- **RESPONSE: tighten-assertion — APPLIED.** Probes scoped to the hero `<section>` slice.

### C-005: "all 16 GitHub links" enforced only at s0's ≥12 floor
- **RESPONSE: add-test — APPLIED.** `test_projects_link_count` asserts ≥16 project GitHub links (18 present).

### C-006: card-pattern aria-hidden clause dropped
- **RESPONSE: tighten-assertion — APPLIED.** Every `data-pattern` SVG tag must also carry `aria-hidden`.

### C-007: canvas matchMedia witness satisfiable by the layout script
- **RESPONSE: tighten-assertion — APPLIED.** Probe scoped to the script block containing `getElementById('loom')`.

### C-008: test_contact_copper_card asserted a reflected class name
- **RESPONSE: tighten-assertion — APPLIED.** The rule body must now contain the copper value (rgba or minified hex form); Astro inlines page CSS into the HTML, so the probe searches page + bundle. This tightened probe also initially FAILED before being fixed against the real output.

### C-009: 'agents' probe dropped from T-111; Fraunces import untested
- **RESPONSE: tighten-assertion — APPLIED.** `/agent/i` added to the SITE_DESCRIPTION window; `test_fonts_single_import` now asserts Fraunces inside the captured import URL.

### C-010: robustness notes (_astro crash path, 'react' substring false-fail risk, unversioned s0 suite)
- **RESPONSE: partially applied + defer-with-rationale.** `_astro` now guarded with existsSync. The bare 'react' substring stays (false-fails are safe-direction; no react-adjacent deps exist). The gitignored-suite auditability point is real and recorded in test-report.md as accepted debt: `sprints/` is ephemeral by protocol design (SKILL schema); the plans that DESCRIBE the checks are what's authoritative, and both critic runs re-verified implementation-against-plan.

## Confidence
`proceed-with-caveats` → all ten concerns resolved (8 tightenings applied — two of which exposed genuinely vacuous passes — 1 content fix, 1 partial defer with rationale). Final: **s1 39/39, s0 46/46, build green.**
