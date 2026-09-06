# Design Audit — live screenshots, 2026-07-02 (dev server, ~555px and desktop preset)

## Home / hero (worst offender)
- The three.js icosahedron wireframe fills the entire hero at huge scale; hero
  copy (centered) sits directly on top of dense cyan lines with zero scrim —
  the muted sub-headline (#6b7a8d on line-noise) is genuinely hard to read.
- Reads as "default three.js demo," not a designed brand moment.
- CTAs float over the wireframe with no grounding surface.

## Flatness inventory (all pages)
- One flat navy (#0a0e1a); a second flat navy for cards (#121829). No gradients,
  no vignette, no texture, no depth layering anywhere.
- All cards identical: 1px faint border, same radius, same padding, no hover
  lift (only a border-color change), no accent variation between lanes.
- Buttons: filled cyan + outline cyan only; no gradient, no motion.
- Headings jump from big to small with no eyebrow/kicker rhythm besides one
  mono uppercase tag style.

## /animus specifics
- Copy hierarchy is good (tag → display → lead) but the display line's
  highlight is a flat color swap; no gradient ink, no motif.
- "Four Implementations" — content is a literal timeline, rendered as four
  disconnected identical rectangles in a grid. The story loses its shape.
- Language chips (Python/Go/Rust) all the same gray.

## /projects specifics (from sprint-0 build knowledge)
- 16 cards all headed by the same gray block with one diamond glyph — at
  catalog scale this looks like unfinished placeholders.

## What already works (keep)
- Color pair cyan/#f0a030 has good contrast identity; the logo lockup uses it well.
- Space Grotesk headings look right for the brand; fonts need no replacement.
- geo-divider gradient line is a nice, ownable detail — extend its use.
- Content/copy: user accepted positioning and copy; do not touch semantics.
