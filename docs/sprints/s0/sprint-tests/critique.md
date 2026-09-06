# Test Critique — Sprint 0

(Test-critic subagent output summary, with primary-agent responses inline. The
critic independently re-ran the suite — reproduced green — and full-grepped
dist/ including `_astro` bundles, finding no banned content: all flagged items
were latent test weaknesses, not live site failures. Confidence:
`proceed-with-caveats`.)

### C-001: og:type never tested
- **Failure mode:** EARS-coverage
- **RESPONSE: add-test — APPLIED.** `property="og:type"` term added to `test_og_meta_all_pages`.

### C-002: test_default_description used a hardcoded fragment, not equality with SITE_DESCRIPTION
- **Failure mode:** weak-assertion
- **RESPONSE: tighten-assertion — APPLIED.** SITE_DESCRIPTION is now parsed from site.ts and the blog-index meta description asserted for full equality (entity-decoded).

### C-003: SHALL NOT sweeps excluded _astro bundles; retired-copy sweep excluded llms/robots
- **Failure mode:** negative-path
- **RESPONSE: tighten-assertion — APPLIED.** New `fullCorpus` reads every text file in dist (html/js/css/txt/xml/json/svg); both the hello@ sweep and the retired-copy sweep now run against it, entity-decoded.

### C-004: llms.txt home-page coverage check was vacuous (prefix match)
- **Failure mode:** weak-assertion
- **RESPONSE: tighten-assertion — APPLIED.** Root URL must now appear as an exact markdown link target `](https://threadandsignal.com/)`.

### C-005: lineage check missing 'Go'; conviction probes too loose ('scale', 'trace')
- **Failure mode:** weak-assertion / EARS-coverage
- **RESPONSE: tighten-assertion — APPLIED.** Added `>Go<` (rendered language chip), and probes tightened to 'constrained', 'scales to the model', 'trajectory', 'source of truth'.

### C-006: unit-tests.md claimed 41/41 but table had 40 rows
- **Failure mode:** results-accuracy
- **RESPONSE: fixed — APPLIED.** Results files rewritten with reconciled counts (now 42 unit + 4 integration = 46 after the two added checks).

### C-007: contact-subjects check was page-wide with truncated labels
- **Failure mode:** weak-assertion
- **RESPONSE: tighten-assertion — APPLIED.** The `<select>` block is extracted first and all six full option labels asserted inside it.

### C-008: test_email_single_source didn't test single-sourcing
- **Failure mode:** integration-drift
- **RESPONSE: add-test — APPLIED.** New `test_email_source_single`: the literal email exists in src/ only inside `src/data/site.ts`.

### C-009: JSON-LD checks were substring probes; malformed JSON would pass
- **Failure mode:** weak-assertion
- **RESPONSE: tighten-assertion — APPLIED.** New `jsonLdTypes()` helper extracts each ld+json block, `JSON.parse`s it (crashing the suite on malformed JSON), and walks `@type` values; all four JSON-LD checks now assert parsed types.

### C-010: design flagship check didn't verify repo links
- **Failure mode:** weak-assertion
- **RESPONSE: tighten-assertion — APPLIED.** All three projects now asserted as full `href="https://github.com/crussella0129/..."` links.

### C-011: "existing accent design tokens" sub-clause untested
- **Failure mode:** EARS-coverage
- **RESPONSE: add-test — APPLIED (plus human checkpoint).** New `test_home_accent_tokens` asserts `--accent` and `--accent-warm` survive into the built CSS. Full visual retention judgment stays with the Loop-phase human checkpoint.

### C-012: game-development SHALL NOTs were case-sensitive title-case only
- **Failure mode:** negative-path
- **RESPONSE: tighten-assertion — APPLIED.** Both checks now use `/game develop/i`.

### C-013: form action check reflects a source constant into dist — passes with placeholder endpoint
- **Failure mode:** stub-leak (by design)
- **RESPONSE: defer-with-rationale.** The EARS clause is explicitly about single-sourcing, and the placeholder is deliberate until the user supplies a real Formspree ID. Surfaced in test-report.md technical debt AND in the Loop-phase summary so it isn't forgotten at push time.

### C-014: positioning-doc numbered-move count not scoped to the marketing section; lead offer unasserted
- **Failure mode:** weak-assertion
- **RESPONSE: tighten-assertion — APPLIED.** Count now scoped to the section under "## Next marketing moves"; added a 'lead with automation' probe. Doc quality overall remains a human-checkpoint item.

## Confidence

`proceed-with-caveats` → all 14 concerns addressed (12 applied, 2 deferred with rationale and surfaced). Suite re-run after tightening: **46/46 PASS**.
