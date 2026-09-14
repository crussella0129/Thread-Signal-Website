# Sprint 3 Build Plan

## Intents
- [INT-0002](../../../intents/INT-0002-work-led-homepage.md) — state: planned; acceptance criteria covered: 1, 2, 3, 4, 5, 6.

## Schema Tree
- Sprint Goal: a work-led, minimal, Jetson-anchored homepage study
  - Data
    - T-001: project/build data with honest provenance
  - Markup & copy
    - T-002: rebuild index.astro as the work-led minimal hero
  - Styling & accessibility
    - T-003: style the hero (offer.css) — monochrome, responsive, accessible
  - Documentation consistency
    - T-004: refresh study docs to match the new homepage

## Execution Sequence

### T-001: Add project/build data with honest provenance
- **Intent:** [INT-0002](../../../intents/INT-0002-work-led-homepage.md)
- **Touches:** docs/design-studies/src/data/evidence.ts, docs/design-studies/jetson-image-sources.md
- **Depends on:** (none)
- **Acceptance criterion:** INT-0002 #6 (compact builds line naming real projects; honest labeling; links resolve or name-only).
- **Success criterion (EARS):**
  - **WHEN** `evidence.ts` is compiled, **THEN** the module **SHALL** export a `builds` array whose entries name Animus Ferric, sdr.rs, and SpecuLex, with the SpecuLex entry carrying a `status` of "in development".
  - **WHEN** a `builds` entry has no verified public URL, **THEN** that entry **SHALL** omit its `url` field so the page renders it as plain text rather than a broken link.
- **Notes:** Verify each repo URL resolves (read-only WebFetch/HTTP) before setting `url`. Record the community SDR fork of the enclosure as provenance in `jetson-image-sources.md`; only surface it on the page if the fork is verified.

### T-002: Rebuild index.astro as the work-led minimal hero
- **Intent:** [INT-0002](../../../intents/INT-0002-work-led-homepage.md)
- **Touches:** docs/design-studies/src/pages/index.astro
- **Depends on:** T-001
- **Acceptance criterion:** INT-0002 #1, #2, #3, #6 (one-line promise + one action above the fold; Jetson hero as honest proof; no service paragraphs; builds line; no false claims).
- **Success criterion (EARS):**
  - **WHEN** the homepage renders, **THEN** `index.astro` **SHALL** present exactly one primary call-to-action (the quote mailto) and no second button.
  - **WHEN** the homepage renders, **THEN** it **SHALL** display `/jetson-v2-2-render.png` with explicit `width`/`height` attributes, non-empty `alt` text, and a caption identifying it as a CAD render of a public project.
  - **WHEN** the homepage renders, **THEN** it **SHALL** state both paid offers (automating a repeating task; setting up and testing local AI) in plain language without acronyms or metaphor.
  - **WHEN** the homepage renders, **THEN** it **SHALL** name Animus Ferric, sdr.rs, and SpecuLex in one compact line, with SpecuLex labeled in development.
  - **WHEN** JavaScript is disabled, **THEN** all homepage content (promise, image, offers, builds line, action, footer) **SHALL** be present in the server-rendered HTML.
  - **WHEN** the homepage renders, **THEN** it **SHALL NOT** contain any string claiming NVIDIA Inception membership or any client-outcome/performance claim.
  - **WHEN** the hero image is emitted, **THEN** it **SHALL NOT** declare `loading="lazy"` (it is above the fold; use eager loading).
- **Notes:** Import identity/contact from `src/data/site.ts` (EMAIL, OWNER_NAME, GITHUB_URL) and the quote mailto pattern already in the file; consume `builds` from `evidence.ts`. Reuse the honest-caption pattern from `Hardware.astro` but not its `loading="lazy"` (that component renders below the fold). No client-side JavaScript.

### T-003: Style the hero (offer.css) — monochrome, responsive, accessible
- **Intent:** [INT-0002](../../../intents/INT-0002-work-led-homepage.md)
- **Touches:** docs/design-studies/src/styles/offer.css
- **Depends on:** T-002
- **Acceptance criterion:** INT-0002 #4 (monochrome preserved; responsive; focus; contrast; 44px targets; no overflow).
- **Success criterion (EARS):**
  - **WHEN** the viewport width is 360, 390, 768, or 1440 CSS px, or the page is at 200% zoom, **THEN** the layout **SHALL** render without horizontal overflow.
  - **WHEN** a link or the primary action receives keyboard focus, **THEN** a visible 2px focus outline with a non-zero offset **SHALL** be shown.
  - **WHEN** the page renders, **THEN** body and caption text **SHALL** meet at least 4.5:1 contrast against the background and the primary action **SHALL** meet at least 3:1.
  - **WHEN** the hero image renders, **THEN** it **SHALL** be constrained to `max-width:100%` and retain intrinsic `width`/`height` so it reserves layout space (no layout shift).
  - **WHEN** any interactive element is targeted, **THEN** its hit target **SHALL** be at least 44px in its smaller dimension.
- **Notes:** Extend the existing monochrome token set (`--offer-*`); do not introduce an accent hue or a new typeface. Keep scoped to this study's CSS.

### T-004: Refresh study docs to match the new homepage
- **Intent:** [INT-0002](../../../intents/INT-0002-work-led-homepage.md)
- **Touches:** docs/design-studies/README.md, docs/design-studies/src/pages/direction.astro
- **Depends on:** T-002
- **Acceptance criterion:** INT-0002 #2, #3 (Book/docs honestly describe the current page; keep scope-limit notes).
- **Success criterion (EARS):**
  - **WHEN** the README "current revision" section is read, **THEN** it **SHALL** describe the current homepage as a work-led hero (Jetson render + two offers + compact builds line) and **SHALL NOT** describe the current page as image-free or as the two-paragraph offer page.
  - **WHEN** `direction.astro`'s lead pointer is read, **THEN** it **SHALL** describe the current homepage accurately and **SHALL NOT** refer to a superseded "sales page" that no longer exists.
- **Notes:** Preserve existing honesty/scope-limit language (isolated study, nothing published, evidence is public project work). Actual test results are recorded in the Test Phase, not here.
