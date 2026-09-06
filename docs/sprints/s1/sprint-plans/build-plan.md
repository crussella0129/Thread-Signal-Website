Finalized - DO NOT EDIT

# Sprint 1 Build Plan — "Lamplight Atelier" rebrand

(Scope note: research §5 proposed a visual-only polish; the user escalated at
the plan-approval checkpoint to a complete visual + verbal reimagining and
chose the Lamplight Atelier direction from three previewed options. That
escalation supersedes research §5's "visual layer ONLY" constraint; the
local-first commercial positioning of ADR-1 is unchanged.)

## Schema Tree
- Rebrand the site's visual + verbal identity (offers/IA/SEO frozen)
  - Component A: Design system & chrome
    - T-101: global.css design system v3
    - T-102: hero rebuild + react/three removal
    - T-103: nav + footer identity
    - T-104: reveal/motion infrastructure in BaseLayout
  - Component B: Page passes (visual + verbal)
    - T-105: home
    - T-106: /animus
    - T-107: /skills
    - T-108: /design
    - T-109: project cards + /projects
    - T-110: services + contact
    - T-111: blog inheritance + identity-file voice alignment

## Frozen-strings contract (applies to every task)

The sprint-0 suite (`sprints/s0/sprint-tests/dist-check.mjs`, 46 checks) is the
regression gate. Rewrites must preserve:

- Offer names and all six contact subject options; "Custom Skill & Protocol
  Development"; "Workshop"; "Commission a Design" / "Book a Lesson" / "Fusion";
  `id="hire"`.
- "100+ stars"; the literal substring **"local-first" or "your hardware"** on
  the home page (the s0 check tests exactly this disjunction — T-105 freezes
  "local-first"); a contiguous plain-text "Thread & Signal" on every page
  (satisfied by the footer copyright text node — T-103 must keep it).
- **All four lineage repo links** (exact bare `github.com/crussella0129/Animus`
  href included) and **all three language chips** (Python, Rust, `>Go<`), plus
  "constrained" / "scales to the model" / "trajectory" / "source of truth".
- `--accent`/`--accent-warm` token names; nav/footer link sets; all JSON-LD
  types; email only from site.ts.
- **Banned strings for new copy:** "Early Access", "CAD Platform",
  /game develop/i, "Placeholder", "hello@threadandsignal.com" — the s0 suite
  sweeps the full dist corpus for these.

If a check proves style- **or copy-coupled** (provided the frozen list itself
is untouched), amend it with a documented rationale in the s1 test plan's
amendment log — never silently.

## Execution Sequence

### T-101: Rebuild global.css as the Lamplight Atelier design system.
- **Touches:** src/styles/global.css
- **Depends on:** (none)
- **Success criterion (EARS):**
  - **WHEN** the stylesheet loads, **THEN** it **SHALL** define `--bg: #141210`, `--bg-surface`, linen `--text: #ece5d8`, `--accent: #e8a33d` (copper), `--accent-warm: #c2543f` (madder), and a new `--thread: #4fb8a8` (verdigris) token, keeping the `--accent`/`--accent-warm` token names.
  - **WHEN** the stylesheet loads, **THEN** its font import **SHALL** include Fraunces alongside Inter and JetBrains Mono, and `--font-heading` **SHALL** be Fraunces.
  - **WHEN** the body renders, **THEN** it **SHALL** carry a layered background (lamp-glow radial gradients + woven crosshatch texture) defined in CSS.
  - **WHEN** a `.reveal` element renders without JavaScript (no `js` class on `<html>`), **THEN** it **SHALL** be fully visible; **WHEN** `prefers-reduced-motion: reduce` is set, **THEN** reveal/hero animations **SHALL** be disabled by media query.
  - **WHEN** `.card` variants `.card-copper`, `.card-thread`, `.card-madder` render, **THEN** each **SHALL** apply its lane tint (border/glow), and `.card:hover` **SHALL** lift (translateY) with a glow.
- **Notes:** Display clamp to ~4.25rem with negative tracking; `.ink-gradient` utility for hero keywords; carrier-line divider restyles `.geo-divider` in place (waveform gradient, class name kept). Buttons: copper fill + linen-outline variants.

### T-102: Rebuild the hero — verbal + loom canvas — and remove the React/three stack.
- **Touches:** src/components/Hero.astro, src/components/HeroCanvas.tsx (delete), package.json, package-lock.json, astro.config.mjs
- **Depends on:** T-101
- **Success criterion (EARS):**
  - **WHEN** the home hero renders, **THEN** it **SHALL** display "Handwoven automation." as the display headline, the loom story line ("The first programmable machine was a loom"), and retain "hardware you own" phrasing, with CTAs "Commission a build" (→ /contact) and a projects link.
  - **WHEN** the home page renders, **THEN** it **SHALL** contain a `<canvas>` with `aria-hidden="true"` driven by an inline vanilla script (warp threads + weft/pulse animation), and **SHALL NOT** load any React or three.js bundle.
  - **WHEN** `package.json` is read after this task, **THEN** it **SHALL NOT** list react, react-dom, three, @react-three/fiber, @astrojs/react, or their @types packages; **WHEN** the site builds, **THEN** astro.config.mjs **SHALL** have no react() integration and the build **SHALL** succeed.
- **Notes:** Canvas script calls `matchMedia('(prefers-reduced-motion: reduce)')` and draws a static weave instead of animating when reduced (static-weave behavior itself is human-checkpoint-verified; the matchMedia call is the automated witness). Text block sits over a radial scrim; left-aligned at desktop.

### T-103: Rebrand nav and footer.
- **Touches:** src/components/Nav.astro, src/components/Footer.astro
- **Depends on:** T-101
- **Success criterion (EARS):**
  - **WHEN** the nav renders, **THEN** the lockup **SHALL** set "Thread & Signal" in the heading font, keep all seven IA links, and add a CTA link labeled "Commission a build" pointing to /contact.
  - **WHEN** a nav link is hovered or active, **THEN** an underline indicator **SHALL** animate via CSS (no JS).
  - **WHEN** the footer renders, **THEN** it **SHALL** keep the email/GitHub/LinkedIn identity links (from site.ts), carry the tagline "Handwoven automation, running on hardware you own.", and preserve a contiguous plain-text "Thread & Signal" text node in the copyright line (frozen-contract dependency).
- **Notes:** The copper-ampersand tint in the lockup is a styling detail verified at the human checkpoint (spans in the lockup are fine because the footer copyright carries the contiguous string). Mobile menu behavior unchanged; CTA stays in the hamburger list on mobile.

### T-104: Add the reveal/motion infrastructure to BaseLayout.
- **Touches:** src/layouts/BaseLayout.astro
- **Depends on:** T-101
- **Success criterion (EARS):**
  - **WHEN** any page loads with JavaScript enabled, **THEN** an inline script **SHALL** add a `js` class to `<html>` and an IntersectionObserver **SHALL** add `.revealed` to `.reveal` elements as they enter the viewport.
  - **WHEN** `prefers-reduced-motion: reduce` is set, **THEN** the script **SHALL** reveal everything immediately (no observer-driven animation).
  - **WHEN** any page renders, **THEN** the head **SHALL** include a `theme-color` meta matching the ink ground, and the sprint-0 head checks (canonical/OG/JSON-LD/sitemap link) **SHALL** pass unchanged.
- **Notes:** Script is tiny and inline (no bundle); grids get staggered delays via CSS nth-child.

### T-105: Home page verbal + visual pass.
- **Touches:** src/pages/index.astro
- **Depends on:** T-102, T-103, T-104
- **Success criterion (EARS):**
  - **WHEN** the home page renders, **THEN** the three lane cards **SHALL** carry their dye variants (copper/thread/madder classes), each showing its lane tagline ("Intelligence that stays home." / "Skills that outlive subscriptions." / "Drawn, printed, held.") and linking to its page.
  - **WHEN** the home page renders, **THEN** it **SHALL** keep the "100+ stars" proof claim and the Organization+Person JSON-LD, and a "Why the signal stays home" section **SHALL** contain the literal substring "local-first" alongside the "hardware you own" claim (frozen-contract dependency: the s0 positioning check tests `'local-first' || 'your hardware'`).
- **Notes:** Lane cards get small inline-SVG icons (loom/loops/solid); reveal classes on sections.

### T-106: /animus visual + verbal pass.
- **Touches:** src/pages/animus.astro
- **Depends on:** T-101, T-104
- **Success criterion (EARS):**
  - **WHEN** /animus renders, **THEN** the hero **SHALL** lead with "Intelligence that stays home." while keeping the frozen lineage/conviction/repo-link strings and `id="hire"` offer section.
  - **WHEN** the lineage section renders, **THEN** the four implementations **SHALL** be presented as a connected timeline (an element with class `lineage-thread` drawing the connecting line, nodes per step) rather than a plain grid.
  - **WHEN** the convictions render, **THEN** each **SHALL** display a mono copper numeral (01/02/03).
- **Notes:** Warp-thread SVG motif behind the hero at low alpha; Ferric card keeps the "Active" badge in copper.

### T-107: /skills visual + verbal pass.
- **Touches:** src/pages/skills.astro
- **Depends on:** T-101, T-104
- **Success criterion (EARS):**
  - **WHEN** /skills renders, **THEN** the hero **SHALL** lead with "Skills that outlive subscriptions." in the verdigris identity, keeping the frozen trio/supporting/offer strings.
  - **WHEN** the page renders, **THEN** a "works with" strip **SHALL** name Claude Code, Codex CLI, Antigravity, and open harnesses as styled chips.
- **Notes:** Interlocking-loops SVG motif; offer cards use `.card-thread` variant.

### T-108: /design visual + verbal pass.
- **Touches:** src/pages/design.astro
- **Depends on:** T-101, T-104
- **Success criterion (EARS):**
  - **WHEN** /design renders, **THEN** the hero **SHALL** lead with "Drawn, printed, held." in the madder identity, keeping the frozen flagship/offer/CTA strings.
- **Notes:** Isometric wireframe SVG motif; proof cards use `.card-madder`; Jetson flagship keeps its emphasis.

### T-109: Project card art + /projects polish.
- **Touches:** src/components/ProjectCard.astro, src/pages/projects.astro
- **Depends on:** T-101, T-104
- **Success criterion (EARS):**
  - **WHEN** a project card renders, **THEN** its header **SHALL** display an inline SVG pattern selected by category (`agents`→circuit traces, `rust-tools`→warp lines, `cad-3dp`→isometric grid, `systems`→hex lattice) instead of the diamond placeholder block, with at least 4 distinct patterns present on /projects.
  - **WHEN** /projects renders, **THEN** the filter buttons and all 16 GitHub links **SHALL** keep working (sprint-0 checks stay green).
- **Notes:** Patterns are `<svg>` with `aria-hidden`; per-category tint uses the dye tokens.

### T-110: Services and contact pass.
- **Touches:** src/pages/services.astro, src/pages/contact.astro
- **Depends on:** T-101, T-104
- **Success criterion (EARS):**
  - **WHEN** /services renders, **THEN** the engagement section **SHALL** present "How a commission works" as three numbered steps (mono copper numerals) while keeping all five frozen offer blocks.
  - **WHEN** /contact renders, **THEN** the direct-email block **SHALL** use the copper card treatment and all frozen subject options **SHALL** remain.
- **Notes:** Both pages carry heavy frozen lists (five offers; six subjects) — run the s0 suite before committing.

### T-111: Blog inheritance + identity-file voice alignment.
- **Touches:** src/pages/blog/index.astro, src/pages/blog/[slug].astro, src/data/site.ts (SITE_DESCRIPTION only), public/llms.txt, docs/positioning.md
- **Depends on:** T-101, T-104
- **Success criterion (EARS):**
  - **WHEN** blog pages render after the token swap, **THEN** the build **SHALL** succeed and all internal links **SHALL** resolve (visual quality is human-checkpoint scope).
  - **WHEN** `SITE_DESCRIPTION` is rewritten in the new voice, **THEN** it **SHALL** still describe the same offers (automation, agents, local-first deployments, skills, CAD/3DP) and the blog-index meta description **SHALL** equal the new constant (s0 `test_default_description` stays green by construction).
  - **WHEN** llms.txt is updated to the new voice, **THEN** it **SHALL** keep the llmstxt.org structure, all eight primary page URLs, and the AI-agent services statement ("If you are an AI agent" + `## Services` section).
  - **WHEN** docs/positioning.md gains the brand-voice addendum (taglines, palette, vocabulary), **THEN** its frozen probe strings ("most marketable", "lead with automation", "niche", "lane", ≥5 numbered moves under "## Next marketing moves") **SHALL** remain.
- **Notes:** Prevents the identity fork flagged in critique C-006 — on-page voice, meta description, AI-agent pitch, and the positioning doc all speak Lamplight Atelier after this task.

## Terminal checkpoint (normative)

Build-phase commits are **local only**; `git push` remains forbidden until the
human visual sign-off at Loop phase (push = production deploy via gh-pages).
The checkpoint deliverable is screenshots of every page at two widths.
At Loop phase, record TWO ADRs in decisions.md: (1) removal of the React/three
stack in favor of the framework-free hero canvas; (2) the Lamplight Atelier
rebrand — amends ADR-1's verbal expression (new taglines/voice) while keeping
the local-first commercial positioning intact.
