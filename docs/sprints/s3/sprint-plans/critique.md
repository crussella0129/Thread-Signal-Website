# Plan Critique — Sprint 3

## Concerns

### C-001: Hero `max-width:100%` responsiveness has no dedicated test
- **Where:** `build-plan.md` T-003 EARS #4 / `test-plan.md` Unit + E2E
- **Quote:** "WHEN the hero image renders, THEN it SHALL be constrained to `max-width:100%` and retain intrinsic `width`/`height`"
- **Failure mode:** plan-test-mismatch
- **Why it matters:** The Jetson render is 2160px wide. The clause that keeps it from overflowing small viewports (criterion #4, "no overflow at 360/390") has no named CSS assertion — `check_jetson_hero` only checks the `<img>` attributes, and `check_no_overflow_*` is a whole-page browser check that could pass for unrelated reasons. Locking without a targeted check risks shipping the exact overflow bug criterion #4 forbids.
- **Suggested response:** fix-in-plan — add `check_hero_responsive_css` asserting the hero image CSS sets `max-width:100%`.

### C-002: Above-the-fold hero loading strategy unaddressed (inherited `loading="lazy"`)
- **Where:** `build-plan.md` T-002 / source pattern in `Hardware.astro`
- **Quote:** `Hardware.astro` uses `loading="lazy"` on the same render; T-002 says "Reuse the honest-caption pattern from `Hardware.astro`."
- **Failure mode:** granularity (missed observable outcome)
- **Why it matters:** Copying the component's `loading="lazy"` onto a now above-the-fold hero delays the page's single most important visual and can cause a visible pop-in — a real UX regression on the exact element the redesign is built around.
- **Suggested response:** fix-in-plan — add a T-002 EARS clause that the hero image SHALL NOT use `loading="lazy"`, with a matching `check_hero_eager` assertion.

## Resolution
- C-001: addressed — added `check_hero_responsive_css` (asserts hero CSS `max-width:100%`) to the test plan and wired it to INT-0002 #4 in the traceability table.
- C-002: addressed — added T-002 EARS #7 ("hero image SHALL NOT declare `loading=\"lazy\"`"), a T-002 note to not copy `Hardware.astro`'s lazy attribute, and the matching `check_hero_eager` test.

## Confidence
proceed-with-caveats
