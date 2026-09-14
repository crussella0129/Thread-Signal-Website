# Sprint 3 End-to-End Test Results

- **Status:** possible — executed.
- **Tested head:** `3ca7301edcb88c1d8a9bf054e7ca857d503726c1` (branch `codex/work`)
- **How:** built study served locally with
  `node node_modules/astro/astro.js preview --root docs/design-studies --host 127.0.0.1 --port 4323`
  and driven in the in-app browser. Measurements via `document.documentElement`
  scroll/client widths and computed styles (deterministic; no timing/flake).

| Test | Clause / criterion | Result |
|------|--------------------|--------|
| `check_no_overflow_360_390_768_1440` | T-003 #1 (no horizontal overflow) | PASS — scrollWidth==clientWidth at 360, 390, 768, 1440 (widest element right edge == viewport). H1 clamps to 40px at 360. Services grid is 2-up at 768, single column below 600px. |
| `check_focus_ring` | T-003 #2 (visible 2px focus outline) | PASS — keyboard Tab set `:focus-visible`; computed outline = **2px solid rgb(255,255,255)** on the focused link. The global `a:focus-visible` rule covers the primary action (also an `<a>`). |
| `check_above_the_fold_desktop` | INT-0002 #1 (promise + action above fold) | PASS — at 1440×900 the wordmark, promise `<h1>`, lead line, "Ask for a quote" action, and fine print all render before the hero image (screenshot). |
| hero image loads | T-002 #2 | PASS — `GET /jetson-v2-2-render.png → 200`; rendered 832×418 at 1440; intrinsic 2160×1082 preserved (no layout shift). PNG background is light gray (rgb 178), so the render reads as a bright panel on black. |
| 200% zoom | INT-0002 #4 | PASS (by reflow) — 200% zoom on desktop reflows like a ~720px viewport, bracketed by the passing 360/768 overflow checks (no fixed-width elements force overflow). |

## Notes / non-issues
- The isolated study requests `/favicon.ico` → 404 (it declares no favicon; the
  page is `noindex`). Benign; production serves its own favicon. No other console
  errors on load.
- Screenshots occasionally timed out in the in-app pane (window behind another
  window); measurements were taken with JavaScript, which does not depend on the
  pane painting. A full-page desktop screenshot was captured via Playwright for
  Charles's sign-off.
- Nothing was published or deployed; work stayed on `codex/work` (see
  `check_no_deploy_action`).

## `check_no_deploy_action` (INT-0002 #5)
PASS — no push/deploy performed; branch `codex/work`; `dist/` untracked
(gitignored). Publication remains a separate, later, explicitly authorized step.
