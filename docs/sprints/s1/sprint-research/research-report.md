# Sprint 1 Research Report

## Decisions Reviewed
- **2026-07-02 Positioning: local-first agentic development is the lead** (sprint 0) — relevance: the redesign changes the visual layer ONLY; copy, offers, and lane structure are settled and must survive intact.
- **2026-07-02 Single-source site identity in src/data/** (sprint 0) — relevance: no identity strings may be reintroduced into markup during restyling.
- **2026-07-02 SEO/AI-SEO layer conventions** (sprint 0) — relevance: BaseLayout's head contract (canonical/OG/JSON-LD/sitemap link) must be preserved verbatim through any layout changes; sprint-0's dist-check.mjs is the regression gate.
- **2026-07-02 Push-to-main equals production deploy; human sign-off gate** (sprint 0) — relevance: unchanged; this sprint again ends at a visual checkpoint, no push.

One NEW architectural decision is proposed this sprint: **remove the React/three.js island** (see §5) — this revises no prior ADR but will be recorded in decisions.md at Loop phase.

## 1. Sprint Goal

Sprint 0 shipped correct structure, copy, and SEO but the user rejected the visual layer at the sign-off checkpoint: "it looks a little plain." This sprint elevates the site's visual design — distinctive on-brand hero, depth and texture in the background system, a richer type scale, card/motion polish, and per-lane visual identity — without touching positioning, copy semantics, IA, or the SEO contract. Exit is the same human visual checkpoint that sprint 0 failed.

## 2. Existing Code Survey

| File | Relevance | Notes |
|------|-----------|-------|
| src/styles/global.css | high | The whole design system: 2 accents (cyan #00d4ff / warm #f0a030) on flat navy (#0a0e1a, #121829); Space Grotesk/Inter/JetBrains Mono via Google Fonts; flat cards (1px border), plain buttons, one gradient divider. No texture, no depth layers, no motion system. |
| src/components/HeroCanvas.tsx | high | react-three-fiber icosahedron wireframe — renders as a giant tangled globe BEHIND the hero text (screenshot-verified): hurts readability, reads as a stock three.js demo, and costs ~100KB+ of React+three JS for a background. |
| src/components/Hero.astro | high | Centered text over the canvas with no scrim; muted #6b7a8d sub-text over busy lines fails readability on both mobile and desktop widths. |
| src/pages/index.astro | med | Lane cards are structurally good but visually uniform: same flat card, no per-lane identity, no iconography, no motion. |
| src/pages/animus.astro | med | Screenshot-verified: good copy, flat presentation — lineage cards are plain rectangles; no timeline/thread visual despite the content being a literal sequence. |
| src/pages/skills.astro, design.astro | med | Same flatness; lanes have no distinguishing hue or motif. |
| src/components/ProjectCard.astro | med | Every card shows the same diamond-icon "placeholder" header block — looks unfinished at catalog scale (16 cards). |
| src/components/Nav.astro | low | Functional; no active-link animation, no nav CTA. Hamburger breakpoint at 768px is fine. |
| src/components/Footer.astro | low | Functional 3-column; can inherit the polish pass cheaply. |
| package.json / astro.config.mjs | med | react, react-dom, three, @react-three/fiber, @astrojs/react + type packages exist ONLY for HeroCanvas — removable if the hero is rebuilt framework-free. |

## 3. External Sources

None fetched this sprint. The research input is the live rendered site itself (dev server screenshots at mobile and desktop-ish widths: home hero + /animus, captured 2026-07-02) plus the existing token system. Fonts stay on the already-loaded Google Fonts families, so no new external dependencies require research. (Budget: 0/5 sources.)

## 4. Risks, Unknowns, Dependencies

- **Risk — regression of sprint-0 guarantees:** restyling touches every page; the SEO head contract, email single-sourcing, and copy assertions could silently break. Mitigation: sprint-0's `dist-check.mjs` (46 checks) is rerun as the regression gate in this sprint's test plan.
- **Risk — taste is the exit criterion:** "less plain" is a human judgment; automated tests can only verify mechanics (tokens present, canvas mounted, motion guarded). Mitigation: the Loop-phase checkpoint delivers screenshots of every page, not a described diff.
- **Risk — motion/accessibility:** scroll reveals and an animated hero can harm reduced-motion users and CLS. Mitigation: all animation behind `prefers-reduced-motion`, reveals must not hide content when JS is absent (progressive enhancement), canvas is decorative `aria-hidden`.
- **Unknown — user's aesthetic ceiling:** "plain" was the complaint; the fix direction chosen (crafted, thematic, restrained-neon) could still miss. The design leans into the existing brand metaphor rather than inventing a new one, which minimizes the miss radius.
- **Dependency:** none new. Removing five npm packages (react/three stack) is a subtraction, not an addition.

## 5. Recommended Approach

**Direction: "the loom" — make the brand metaphor the design system.** Thread & Signal's identity (threads carrying signal) becomes literal, crafted visuals instead of a stock 3D demo:

1. **Hero rebuild (the centerpiece):** replace the three.js icosahedron with a purpose-built, framework-free 2D canvas: horizontal woven bezier *threads* that gently drift, with bright *signal pulses* traveling along them (cyan + rare warm ones). Left-aligned text block over a radial scrim so copy always wins. ~2KB of vanilla TS vs ~100KB+ React/three — remove `react`, `react-dom`, `three`, `@react-three/fiber`, `@astrojs/react` and types entirely.
2. **Background/depth system:** layered fixed radial glows (cyan NW, warm SE, very low alpha) + a faint dot-grid texture on `body`; cards get gradient borders (background-clip trick), hover lift (translateY + glow), and a `card-glow` accent variant per lane.
3. **Three-lane visual identity:** cyan = Animus/tech, **new violet accent** (#8b5cf6, used sparingly) = Skills, warm = Design. Each landing page gets a signature inline-SVG motif in its hero (thread-weave for Animus, interlocking loops for Skills, isometric wireframe for Design) and lane-tinted chips/CTAs.
4. **Type scale upgrade:** display clamp to ~4.25rem with tighter tracking, gradient-ink keywords in the hero, refined eyebrow/kicker style, numbered-step treatment for "How Engagements Work".
5. **Motion system:** IntersectionObserver fade-up reveals (stagger on grids), nav active-link underline animation, all guarded by `prefers-reduced-motion`; nav gains a "Book a Consult" CTA button (conversion win).
6. **Project card art:** replace the uniform diamond header with generated inline-SVG patterns seeded per category (woven lines / hex lattice / isometric grid / circuit traces) — 16 distinct-looking cards, zero images to maintain.
7. **Animus lineage as a timeline:** connect the four implementation cards with a literal thread line + signal nodes — the page's content is a sequence; draw it as one.

**Alternative considered:** keep three.js and art-direct the 3D scene (dim it, blur it, recompose text). Rejected: still fights text legibility, keeps ~100KB+ JS for a background, and wireframe-globe is the most generic dark-tech visual there is — the opposite of the "taste" the user asked for.

**Rationale:** every change reinforces the one metaphor the brand already owns; subtraction (React/three) funds the additions (perf budget improves while visuals get richer); sprint-0's test suite guards everything that made the site correct.

## Artifacts

- `design-audit.md` — screenshot-based audit notes (hero readability failure, flatness inventory, per-page observations).
