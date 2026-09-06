# Sprint 2 Production Verification

- **Intent:** [INT-0001](../../../intents/INT-0001-marketing-search.md), acceptance criterion 4 / `live_deployment`.
- **Result:** PASS, 2026-09-06 UTC. This completes the publication evidence that was deliberately pending at local sprint closure.
- **Checkpoint:** [PR #1](https://github.com/crussella0129/Thread-Signal-Website/pull/1), merged at `2026-09-06T04:07:26Z` after both final-head validation checks succeeded.
- **Final PR head:** `a3160dd7de2807184ab0dfeca52023c8e0359418`; checks [34010655684](https://github.com/crussella0129/Thread-Signal-Website/actions/runs/34010655684) and [34010653979](https://github.com/crussella0129/Thread-Signal-Website/actions/runs/34010653979) both concluded success.
- **Deployed source commit:** `e03f6efd5e07e93ccbb46b3a0676d3cf50e11cce`.
- **Production workflow:** [34010701975](https://github.com/crussella0129/Thread-Signal-Website/actions/runs/34010701975), Deploy to GitHub Pages, conclusion **success** for that merged commit. It ran the full validation before publishing.

## Live observations
Fresh HTTPS requests to the custom domain with a commit-specific query and Cache-Control: no-cache returned:

| Path | HTTP | Observed evidence |
|---|---|---|
| `/` | 200 | New AI Automation Consulting title and founder section |
| `/services/` | 200 | Automation & local AI assessment |
| `/contact/` | 200 | Encoded Automation project brief |
| `/blog/local-llm-business-workflow/` | 200 | New local LLM guide |
| `/robots.txt` | 200 | Correct sitemap URL |
| `/sitemap-0.xml` | 200 | New guide URL included |
| `/social-card.png` | 200 | Binary SHA-256 equals verified local image |

Published image SHA-256: `054526C4E40975FA64146D69D9BB234D1B991E72C1F5182201D921E42A794C9D`.

The GitHub Pages API reports `status: built`, custom domain `threadandsignal.com`. The CUA browser then loaded the clean public URL (without a cache-busting query), confirmed the new title, visible founder content and guide link, and visually displayed the updated homepage. The live tab was left open for the user.

Post-publication bookkeeping lives on persistent `codex/work` after the single checkpoint merge. It changes only Book evidence; production source remains the exact verified merged commit. No second sprint PR or unrelated production change is needed to record observations.

Indexing and ranking were not measured or promised. No email was sent.
