# The Workshop Manual

*How to keep threadandsignal.com — change copy, add work to the shelf, retune
the loom — without breaking the weave. Everything here assumes you're at the
repo root.*

---

## The three commands

```bash
npm run dev      # workbench: live site at localhost:4321, hot-reloads on save
npm run build    # weave the cloth: static site into dist/
git push         # SHIP IT — pushing main deploys to threadandsignal.com
```

**Push is production.** The gh-pages workflow deploys every push to `main`.
Before any push, run the gates:

```bash
npm run build && node sprints/s0/sprint-tests/dist-check.mjs && node sprints/s1/sprint-tests/dist-check-s1.mjs
```

Two green summaries (46 + 39 checks) mean the contact info, SEO layer, brand
strings, and links all survived your edit. A red check names exactly what broke.

---

## Where everything lives

| You want to change… | Open… |
|---|---|
| Email, GitHub, LinkedIn, site description | `src/data/site.ts` — the ONLY place identity lives |
| The project catalog (/projects cards) | `src/data/projects.ts` |
| Colors, fonts, spacing, card/button styles | `src/styles/global.css` (tokens at the top) |
| The hero: copy, animation, specimen plate | `src/components/Hero.astro` |
| Nav links / footer links | `src/components/Nav.astro`, `src/components/Footer.astro` |
| A page's copy | `src/pages/<page>.astro` — one file per URL |
| Blog posts | `src/content/blog/*.md` — one markdown file per post |
| What AI agents read about you | `public/llms.txt` |
| Brand voice & marketing strategy | `docs/positioning.md` |

---

## Recipes

### The contact page is form-free by design
There is no contact form and no form vendor — a deliberate decision (2026-07):
leads write directly to `charles@threadandsignal.com`, or arrive via GitHub
and LinkedIn. Nothing to configure, no spam surface, no subscription. The
channel cards live in `src/pages/contact.astro`; the addresses come from
`site.ts`. A test (`test_contact_no_form`) enforces the form's absence — if
you ever add one back, do it consciously and update that check.

### Add a project to the shelf
Open `src/data/projects.ts` and add an entry to the array:

```ts
{
  name: 'Your Project',
  description: 'One or two sentences. Concrete beats clever.',
  tags: ['Rust', 'CLI'],
  category: 'rust-tools',   // agents | rust-tools | cad-3dp | systems
  url: 'https://github.com/crussella0129/your-project',
  stars: 12,                // optional; display uses rounded claims anyway
},
```

The category picks the card's woven header art automatically:
`agents` → copper circuit traces · `rust-tools` → verdigris warp lines ·
`cad-3dp` → madder isometric grid · `systems` → linen hex lattice.

### Write a blog post
Create `src/content/blog/my-post.md`:

```markdown
---
title: "Running a 7B agent on a Jetson"
description: "One or two sentences — this becomes the meta description."
pubDate: 2026-08-01
tags: ["local-first", "animus"]
---

Body in plain Markdown. Code blocks, lists, and headings are styled already.
```

That's the whole job — the index page, RSS-ready dates, and SEO tags come free.

### Change a color or font
The palette is five tokens at the top of `src/styles/global.css`:

```css
--bg: #141210;            /* ink — the ground */
--text: #ece5d8;          /* linen — the words */
--accent: #e8a33d;        /* copper — the signal (Animus, CTAs) */
--thread: #4fb8a8;        /* verdigris — the thread (Skills) */
--accent-warm: #c2543f;   /* madder — fabrication (Design) */
```

Change a token and the whole site follows — cards, chips, dividers, the hero.
(Keep the token *names* `--accent` / `--accent-warm`; the test suites pin them.)
Fonts load in the `@import` on line 1: Fraunces speaks the fable, JetBrains
Mono speaks the machine, Inter carries the body.

### Retune the loom (hero animation)
Every dial is a constant in the `<script>` at the bottom of
`src/components/Hero.astro`:

| Dial | Where | Effect |
|---|---|---|
| `THREADS = 14` | top of script | how many threads on the loom |
| `amp: 9 + Math.random() * 22` | `spawnPacket()` | packet height range (1x–3x) |
| `v: 55 + Math.random() * 45` | `spawnPacket()` | packet speed (px/sec) |
| `spawnTimer > 1.6 && packets.length < 5` | `frame()` | spawn rate / max in flight |
| gradient stops `0.9` (gold) and `0.7` (verdigris) | `drawPacket()` | waveform brightness |

One rule if you edit `resize()`: update the thread objects **in place** — never
rebuild the array. In-flight packets hold references to those objects, and
rebuilding them makes packets ride invisible paths (the de-sync bug, fixed once
already).

### Add a whole page
1. Create `src/pages/my-page.astro`; start from `src/pages/design.astro` as a
   template (hero + sections + offer cards).
2. Wrap it in `<BaseLayout title="…" description="…">` — canonical URL, OG
   tags, and sitemap entry come free. Pass `jsonLd={…}` if it sells something.
3. Add the link in `Nav.astro` and `Footer.astro`.
4. Add a line for it in `public/llms.txt` so AI agents can find it.
5. Gates, push.

### Change page copy
Edit the `.astro` file, keep two habits:
- **Voice** (full guide in `docs/positioning.md`): atelier vocabulary —
  commission, workshop, bench, woven. CTAs are "Commission a build" /
  "Book a workshop" / "Book a Lesson", never "Get started". Literary but
  concrete: every poetic line carries a fact in the same breath.
- **Frozen strings**: the gates pin factual copy (offer names, contact
  subjects, "100+ stars", the Animus lineage, taglines). If a gate goes red
  after a copy edit, it's telling you which promise you rewrote — either
  restore the string or consciously update the check in
  `sprints/s1/sprint-tests/dist-check-s1.mjs` and note why in the commit.

---

## The deeper records

- `decisions.md` — why the site is the way it is (ADR log: the rebrand, the
  react removal, the push gate). Read before undoing something that looks odd.
- `docs/positioning.md` — what you sell, to whom, the niche argument, the next
  marketing moves, and the full brand-voice guide.
- `agent-tasks/completed-tasks.md` — the ledger of every change made by sprint,
  with commit hashes.
- The site was built (and is best maintained) with **Sprint Loops** — your own
  protocol. Point Claude Code at this repo, run `/sprint-loop start "<goal>"`,
  and the research → plan → build → test → checkpoint discipline that built
  the site will maintain it too. The gates above run automatically inside it.

*Keep the signal on the thread.*
