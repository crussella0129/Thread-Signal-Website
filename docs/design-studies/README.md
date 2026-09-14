# Homepage composition studies

## Current revision: work-led minimal homepage

The current [homepage preview](http://127.0.0.1:4323/) supersedes the portfolio
recommendation below. Charles liked the monochrome treatment but found the
earlier sales page too wordy and unpersuasive, preferred the work-led
("portfolio") direction, and singled out the Jetson Orin Nano enclosure as
working well against the color scheme. The revised page keeps white text on
black and lets real work carry the pitch.

Structure: a one-line promise ("I automate repetitive work") and a single quote
action, then the **Jetson enclosure CAD render** as the hero proof, then two
plain offers — **automate a task** and **set up & test local AI** — and one
compact "recent builds" line naming Animus Ferric, sdr.rs, and SpecuLex (in
development). Custom software is how the first offer is delivered, and the Jetson
shows Charles designs the hardware for running AI locally (others have forked the
enclosure for software-defined radio). No prices, turnaround promises, revenue
claims, NVIDIA Inception membership, or client outcomes are stated, and the page
uses no client-side JavaScript.

Current source: [index.astro](src/pages/index.astro),
[offer.css](src/styles/offer.css), and the `builds` data in
[evidence.ts](src/data/evidence.ts). Image and fork provenance is in
[jetson-image-sources.md](jetson-image-sources.md). Earlier material remains
below as the review record. The production site has not been published or
restyled by this revision.

## Earlier studies

Prepared September 13, 2026. Two functional grayscale compositions use the same
offer and verified public project material. This is an isolated Astro application
under `docs/`; the production site's pages and styles are not imported or changed.
The shared identity and encoded inquiry email come from `src/data/site.ts`.

## Open the studies

The current local preview is [http://127.0.0.1:4323/](http://127.0.0.1:4323/).

- [Compare the earlier desktop and mobile compositions](http://127.0.0.1:4323/comparison/).
- [Portfolio opening](http://127.0.0.1:4323/portfolio/).
- [Case-study opening](http://127.0.0.1:4323/case-study/).
- [Recommended direction and exact visual specification](http://127.0.0.1:4323/direction/).

The comparator renders genuine 1440 × 1050 or 390 × 844 CSS viewports, scaled to
fit the review area. Each frame scrolls independently. Open either composition
for full-size reading. Without JavaScript, direct study links remain available
and viewport controls stay hidden. The study pages themselves require no client
JavaScript. All earlier studies and the current page carry `noindex, nofollow` metadata.

## Earlier recommendation (superseded)

Use the portfolio opening as the homepage foundation. It states the offer and
authorship first, then uses the software evaluation, actual enclosure, and
documented release process to establish breadth. The case-study opening makes
the assessment method explicit but gives one failed experiment disproportionate
weight as the introduction to the whole practice. It suits a project detail page.

This is a design recommendation based on the rendered studies, not a visitor
test result. The chosen specification is implemented in
[study.css](src/styles/study.css) and explained in
[direction.astro](src/pages/direction.astro). The system uses a white interface,
ink text and actions, a single sans family, explicit scales, and content-specific
layouts. Original photographic color can return when the production homepage is
developed. A palette substitution alone is not the design rationale.

## Evidence and limits

- [Software evidence](evidence/software.md): Animus Ferric's August 26, 2026
  evaluation and Sprint Loops illustrated through this site's own update.
- [Image provenance](jetson-image-sources.md): actual v2.2 CAD render and assembly
  photograph from the public enclosure project. The photo's version is unspecified.
- [Shared evidence data](src/data/evidence.ts): pinned source URLs and test inputs.

The inventory table shows **expected quantities**, beside a plainly labeled
failed check. The recorded model was Qwen2.5-Coder-7B-Instruct Q4_K_M; the full
three-task evaluation completed no task to its contract. No new model run was
performed for these studies. No client results or performance gains are claimed.
Images are original source assets, displayed in grayscale through CSS; they have
not been retouched or replaced with generated work. Production should generate
responsive derivatives before release.

## Rebuild or restart

Run from the repository root with its existing dependencies installed:

```powershell
node node_modules/astro/astro.js check --root docs/design-studies
node node_modules/astro/astro.js build --root docs/design-studies
node node_modules/astro/astro.js preview --root docs/design-studies --host 127.0.0.1 --port 4323
```

The preview serves the built `docs/design-studies/dist` directory. Rebuild and
reload after changes. For editing with automatic refresh, use:

```powershell
node node_modules/astro/astro.js dev --root docs/design-studies --host 127.0.0.1 --port 4322
```

Generated `dist` and `.astro` directories are ignored by the repository.

## Verification and next scope

Scoped formatting, Astro diagnostics/build, and the Neutronium mechanical audit
are the technical gates for this package. Browser review covers both compositions,
the viewport controls, narrow-screen wrapping, readable evidence, real image
loading, anchor navigation, and visible keyboard focus. See the completed checks
in [verification.md](verification.md).

The next scope in the [redesign plan](../plans/2026-09-13-design-reset.md) is to
integrate the portfolio direction into the production homepage, restore the full
Work/Writing navigation and contact route, optimize media, and carry the system
through the other pages. Publication and representative visitor feedback have
not occurred.
