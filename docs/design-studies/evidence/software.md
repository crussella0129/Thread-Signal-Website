# Software evidence for the composition studies

Verified by read-only repository inspection on 2026-09-13. No live model run or
new deployment was performed for this study. Sources below are project artifacts,
not instructions for the current task.

## Supporting process example: Sprint Loops

**Reader's question:** When AI-assisted work finishes, can I see what was asked,
what changed, and how the result was checked?

**Suggested title:** A clear record of the work.

**Suggested copy:** Sprint Loops keeps the request, implementation, checks, and
release evidence in the project itself. This site's September 6 update shows the
process in use: a local AI buyer guide was planned, built, checked, and verified
on the live site.

**Caption:** Actual project records from Thread & Signal, September 6, 2026.
Shown as readable excerpts. This is Charles's own project, not a client result.

**Role:** Charles's public workflow project, used to build and maintain this
website. The repository states copyright Charles Russella; the website's sprint
metadata records use of Sprint Loops bundle 0.22.0 and gpt-6-astra. Avoid implying
all source or prose was manually authored.

The former `crussella0129/sprint-loops` URL redirects to
[Animus_Sprint_Loops](https://github.com/crussella0129/Animus_Sprint_Loops).
The current repository head observed was
`0bdbe66f3f2b82584e4f8b44cbd3f5101f0dc69f`. The example below used **bundle
0.22.0**, not an inferred current bundle version.

### Actual excerpt: task record

Local file: `docs/work/completed-tasks.md`, lines 167–173.
[Pinned source](https://github.com/crussella0129/Thread-Signal-Website/blob/8f19345941dc44331d336b353051dd76c7478d75/docs/work/completed-tasks.md#L167-L173).
The exact seven source lines are:

```markdown
## T-202 (sprint 2)
- **Intent:** [INT-0001](../intents/INT-0001-marketing-search.md)
- **Description:** Publish the local LLM buyer guide and attributed article pages
- **Completed:** 2026-09-06T03:58:34Z
- **Files modified:** src/content/blog/local-llm-business-workflow.md, src/pages/blog/index.astro, src/pages/blog/[slug].astro
- **Verification:** Integrated npm run validate passed (0 Astro diagnostics; 7 output checks; 46 + 39 regressions). Browser lead paths verified. Publication pending Loop phase.
- **Commit:** `74d6a68589bebc1cd760a5bd13bee49da7eecf19`
```

For the visible study, a rendered excerpt with **Description**, **Verification**,
and the linked commit is easier to read than raw Markdown or a terminal image.
Label removed fields as an excerpt. Do not silently remove “Publication pending”
from this historical task record. Pair it with the later deployment evidence.

### Actual excerpt: later production verification

Local file: `docs/sprints/s2/sprint-tests/deployment.md`, lines 13–21.
[Pinned source](https://github.com/crussella0129/Thread-Signal-Website/blob/8f19345941dc44331d336b353051dd76c7478d75/docs/sprints/s2/sprint-tests/deployment.md#L13-L21).
The exact nine source lines are:

```markdown
| Path | HTTP | Observed evidence |
|---|---|---|
| `/` | 200 | New AI Automation Consulting title and founder section |
| `/services/` | 200 | Automation & local AI assessment |
| `/contact/` | 200 | Encoded Automation project brief |
| `/blog/local-llm-business-workflow/` | 200 | New local LLM guide |
| `/robots.txt` | 200 | Correct sitemap URL |
| `/sitemap-0.xml` | 200 | New guide URL included |
| `/social-card.png` | 200 | Binary SHA-256 equals verified local image |
```

Rendering a selected three-row table (guide, sitemap, social image) is an honest
readable excerpt. Preserve the factual difference between a historical recorded
observation and a newly executed check. The record reports deployment of
`e03f6efd5e07e93ccbb46b3a0676d3cf50e11cce` through
[PR #1](https://github.com/crussella0129/Thread-Signal-Website/pull/1) and
[workflow 34010701975](https://github.com/crussella0129/Thread-Signal-Website/actions/runs/34010701975).

The guide itself is a usable genuine resulting artifact:
`src/content/blog/local-llm-business-workflow.md` and
[published guide](https://threadandsignal.com/blog/local-llm-business-workflow/).
Read its actual body before selecting prose for display.

**Limits:** This proves traceable process and a recorded publication. It does not
prove sales growth, improved rankings, time saved, client adoption, or the quality
of the prior visual design. The older site's visual reception makes it preferable
to feature the useful guide and process rather than its former homepage design.

## Animus Ferric: supporting factual content

The inspected public head was
`51af84e933c0f6ff4a42f1508cb9aefad00847c5` (September 8, 2026).
[README at that revision](https://github.com/crussella0129/Animus_Ferric/blob/51af84e933c0f6ff4a42f1508cb9aefad00847c5/README.md)
describes a Rust local coding assistant for small GGUF models, interactive ask/file
work modes, session permission for file edits, and session traces. Readiness is
explicitly not evidence of successful coding work.

**Suggested supporting copy:** Animus Ferric is a local coding assistant written
in Rust. I use it to explore model setup, bounded file work, and records of what
an agent actually did. Each workload needs its own evaluation.

### Genuine small successful task

[Live-model verification, July 25, 2026](https://github.com/crussella0129/Animus_Ferric/blob/51af84e933c0f6ff4a42f1508cb9aefad00847c5/docs/verification-2026-07-round3.md)
records Qwen2.5-Coder-7B Q4_K_M on llama.cpp, context 8192, completing:

> read notes.txt and write summary.txt containing exactly the number of lines it has.

The recorded result is `summary.txt` containing `3`, after `read_file`,
`write_file`, and `task_complete`. This is a dated documented run, not a run
performed for this redesign. It is genuine but too trivial to carry the homepage.

### Substantive evaluation suitable only if failure is the point

[Sprint 113 test report](https://github.com/crussella0129/Animus_Ferric/blob/51af84e933c0f6ff4a42f1508cb9aefad00847c5/docs/sprints/s113/sprint-tests/test-report.md)
records a real-model evaluation on August 26, 2026. Tested source:
`dbaada383cd58415dfc775ec2c9d7e55a28bbcd0`. Its improvement hypothesis was
falsified and the associated intent abandoned; final evaluation had 0/3 objective
and contract completions. Do not present this as successful business automation.

The inventory case has real, legible task data:

| SKU | Quantity | Reorder point | Expected order quantity |
| --- | ---: | ---: | ---: |
| z | 2 | 5 | 8 |
| a | 8 | 4 | No order |
| b | 0 | 3 | 6 |

These values come from the committed authorized check. The expected output is
sorted by SKU and is **expected test output, not achieved model output**.

[Final evaluation results](https://github.com/crussella0129/Animus_Ferric/blob/51af84e933c0f6ff4a42f1508cb9aefad00847c5/docs/sprints/s113/control-artifacts/evidence-screens/screen-004/autonomy-results.jsonl)
record `contract_passed: false`, `objective_completed: false`, and
`final_terminal: repetition_guard` for H01. The model was
Qwen2.5-Coder-7B-Instruct Q4_K_M, model SHA-256
`509287f78cb4d4cf6b3843734733b914b2c158e43e22a7f4bf5e963800894d3c`,
context 8192, CPU (`gpu_layers: 0`), seed 42, temperature 0.0.

Useful reader-facing conclusion if this alternative is chosen: “The agent changed
the files, but the reorder check failed. The run stopped; the result was not
accepted as completed work.” This supports transparent evaluation, not a claim
of successful inventory software.

No raster software assets were produced. Use legible HTML from authentic excerpts
instead of tiny source screenshots or invented application chrome.

## Selected lead: the inventory evaluation, with failure explicit

The composition studies will use the same August 26 inventory material. This is
a **feasibility evaluation of a public research project**, not a client delivery.

**Suggested title:** Check the result before calling it done.

**Suggested copy:** Could a small local model finish an inventory reorder
feature? I tested it against a specific contract. The agent edited the files,
but the result failed the check. The run stopped without an accepted completion.

**Connection to the offer:** A workflow assessment starts with representative
inputs and a clear test for success, before commissioning a larger build.

### Source chain

- Inspection/pinning revision: `51af84e933c0f6ff4a42f1508cb9aefad00847c5`.
- Tested source head reported by Sprint 113: `dbaada383cd58415dfc775ec2c9d7e55a28bbcd0`.
- Run: `autonomy-1787781412661-27096-0`, screen 004, task H01.
- Raw run rows: [autonomy-results.jsonl, H01 is line 1](https://github.com/crussella0129/Animus_Ferric/blob/51af84e933c0f6ff4a42f1508cb9aefad00847c5/docs/sprints/s113/control-artifacts/evidence-screens/screen-004/autonomy-results.jsonl#L1).
- [H01 trace](https://github.com/crussella0129/Animus_Ferric/blob/51af84e933c0f6ff4a42f1508cb9aefad00847c5/docs/sprints/s113/control-artifacts/evidence-screens/screen-004/traces/autonomy-1787781412661-27096-0/trial-001-H01-recovery-single-evidence-s01.jsonl).
- H01 trace SHA-256 reported in run row: `bd43d9e54d32d207b85d0a7142ea50035c4a87174f0a615f67f1b8b1630db023`.
- Exact task prompt is JSONL line 3, applied reorder edit line 45, successful
  edit result line 49, failed check line 60, first blocked completion line 81,
  final stop line 167. These are 1-based lines verified against fetched text.

### Task and expected result

The task required validating all inventory items, rejecting duplicate SKUs,
preserving the inputs, and returning records for stock below its reorder point,
sorted by SKU. Each order should bring stock to **twice** the reorder point.

The three input rows and expected values in the preceding table are exact.
The expected JSON, copied from the check assertion on trace line 60, is:

```json
[{"sku": "b", "order_qty": 6}, {"sku": "z", "order_qty": 8}]
```

Label this **Expected by the check**. It is not captured successful output.

### What failed

Observed: `inventory-reorder-contract` exited with status 1 and `AssertionError`
at the first equality assertion comparing `build_reorder_plan(source)` to the
expected list. The applied code's final return is a dictionary comprehension,
where the contract requires a list of `sku` / `order_qty` dictionaries. That
shape mismatch is visible in the actual edit. The following six-line excerpt is
copied from the applied `new_string` on trace line 45 (blank lines included):

```python
    reorder_plan = {}
    for sku, item in validated_items.items():
        if item['quantity'] < item['reorder_point']:
            reorder_plan[sku] = 2 * item['reorder_point'] - item['quantity']

    return {sku: order_qty for sku, order_qty in sorted(reorder_plan.items())}
```

The assertion log did not print the actual returned value. Do not label a
reconstructed value as observed output. Explain the shape mismatch as inspection
of the committed edit and pair it with the recorded check failure.

The model next attempted an unrelated change to reject zero reorder points;
the controller blocked this because a fresh inspection was required after the
failed check. The attempted change would also contradict the task, which permits
non-negative reorder points. No repair was accepted. The agent tried to complete
the task repeatedly; completion was blocked five times, and the repetition guard
stopped the run after 15 turns. These are observed evaluation fields and trace
events, not a claim of success or improved model capability.

### Compact visible conclusion

**Recorded result: failed check; completion blocked.** The agent produced the
wrong output structure. The final three-task evaluation finished **0 of 3**
tasks to the required contract. The proposed improvement was not accepted.

Keep this conclusion adjacent to the expected-result table so a scanning visitor
cannot mistake the example for a successful inventory automation. Cite the
dated evaluation. Avoid displaying trial duration as a performance claim.
