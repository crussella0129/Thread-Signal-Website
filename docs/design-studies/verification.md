# Study verification

## Current sales-page revision

After Charles's feedback, the root preview was replaced with a short white-on-black
page offering task automation and AI setup/testing. The earlier comparator is
available at `/comparison/`.

- [x] Reduced the rendered page to 61 whitespace-delimited words, measured from
      browser `innerText`; zero images, scripts, iframes, or canvases.
- [x] Formatted changed source. Astro check: 14 files, zero errors, warnings, or
      hints. Static build: five pages.
- [x] Neutronium audit: eight checks passed. Local built-output audit: 49 checks
      passed across the five pages, including the moved comparison route.
- [x] Visually inspected desktop and 390 × 844 mobile. The complete pitch fits
      that mobile viewport. No horizontal overflow at widths 320, 390, 768, or 1440.
- [x] Confirmed keyboard focus on the quote action: visible white 2px outline.
- [x] Verified the quote email destination, subject, and decoded short brief.
      No email was sent. The new page needs no JavaScript for content or links.

Production code was not changed; the previous production suite result below is
from the earlier study turn and was not rerun for this isolated copy/layout edit.

## Earlier composition verification

September 13, 2026. Local static preview at `http://127.0.0.1:4323/`.

## Technical checks

| Check                         | Result                                                                                                                                                                                                           |
| ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scoped Prettier               | Passed for study source/configuration and edited documentation.                                                                                                                                                  |
| Isolated `astro check`        | 13 files, zero errors, warnings, or hints.                                                                                                                                                                       |
| Isolated static build         | Four pages built successfully.                                                                                                                                                                                   |
| Repository `npm run validate` | Passed: Astro diagnostics and production build, seven site checks, nine hero tests, and 85 legacy checks. Root diagnostics included the study source: 36 files, zero errors, warnings, or hints.                 |
| Neutronium mechanical audit   | Eight checks passed, zero failures. Git Bash required its normal Unix utilities on PATH.                                                                                                                         |
| Built HTML audit with parse5  | 48 local-reference checks passed: 22 route references, eight asset references, and 12 anchor targets across four pages; additional page checks included. External links were excluded from this mechanical pass. |

The existing production tests still assert its current appearance and animation.
Their passing result establishes that the isolated study package has not broken
those checks; it does not evaluate the new design's visual quality.

## Browser review

- Inspected both complete desktop compositions and the revised portfolio rhythm.
- Inspected the mobile offer, inquiry action, evidence table, failed result,
  wrapping source caption, and enclosure render. The original assembly photograph
  and CAD render were also inspected separately during asset preparation.
- Checked both compositions at viewport widths 360, 390, 768, and 1440 CSS pixels.
  Measured no horizontal overflow at 360, 768, or 1440; narrow-screen screenshots
  confirmed readable stacking. Desktop scrollbars reduce the content width by
  15px in this browser, so checks compared actual document dimensions.
- Confirmed the direction page fits a 390px viewport.
- Confirmed comparison controls switch between 1440 × 1050 and 390 × 844 iframe
  dimensions, update `aria-pressed`, and change the visible composition.
- Confirmed Enter activates the Desktop control. Tab moves from the homepage
  navigation to the inquiry action, whose visible focus ring is 2px ink with a
  4px offset. Work navigation reaches the work anchor.
- Verified local routes, source assets, and anchors from built output. Inquiry
  links reuse the existing encoded email brief; no email was sent.
- Verified the no-JavaScript fallback in source and built output: controls start
  hidden and reveal only after successful initialization. The study content is
  server-rendered. A separate browser run with JavaScript disabled was not made.

The in-app browser logged an unscoped `MutationObserver.observe` TypeError on
comparison loads. The six built HTML/CSS/JS files contain no `MutationObserver`
reference; the comparator uses `ResizeObserver`, and its tested controls and
frames functioned correctly. The error's origin could not be attributed from the
available browser log. This review does not claim an empty browser console.

## Scope limits

The software evidence is a dated public evaluation, not a fresh inference run or
client outcome. No visitor study or conversion experiment has been performed.
Original media is retained for layout review; responsive image optimization
belongs to production integration. No production pages, deployment configuration,
or existing route behavior were redesigned in this package. Nothing was published.
