# Sprint 0 Research Report

## Decisions Reviewed
`decisions.md` has no entries yet (freshly created header only). No prior decision is being violated.

## 1. Sprint Goal

Revamp the Thread & Signal website (Astro 5 static site, deployed to GitHub Pages at threadandsignal.com) from a generic "software consultancy" brochure into a revenue-oriented site that reflects what Charles actually does and sells: agentic-AI-powered development (Rust/Python), the Animus/Ferric local-model harness with paid custom implementations, a line of harness-agnostic agent skills (Sprint Loops, MDR, GECK), CAD/3D-printing design work and 1-on-1 lessons, and agentic-development workshops. Concretely: fix the contact email (charles@threadandsignal.com, not hello@), replace placeholder/fictional content (fake portfolio entries, "geometry kernel platform" product page) with real GitHub-backed projects, add service landing pages with clear offers and CTAs, and make the site SEO- and AI-agent-SEO-friendly (meta/OG/JSON-LD structured data, sitemap, robots.txt, llms.txt). A secondary deliverable is positioning guidance: which offer to lead with.

## 2. Existing Code Survey

| File | Relevance | Notes |
|------|-----------|-------|
| src/layouts/BaseLayout.astro | high | Only layout; minimal head — no OG tags, no canonical, no JSON-LD, no sitemap link. SEO work centers here. |
| src/pages/index.astro | high | Generic hero + 5 generic service cards (incl. "Game Development" not in current positioning). Needs full repositioning. |
| src/pages/services.astro | high | Five generic services with placeholder-ish copy; no pricing/engagement info, no distinct CTAs. |
| src/pages/portfolio.astro | high | Contains literal placeholders ("Client Project — Placeholder", "Game Project — Placeholder") and outdated Animus description (points to deprecated Python repo). |
| src/pages/product.astro | high | Markets a "Geometry Kernel & CAD Platform" — aspirational (crusst repo is 5★, early). Candidate for replacement by Animus/Ferric page. |
| src/pages/contact.astro | high | Wrong email (hello@); Formspree action is literal `YOUR_FORMSPREE_ID` placeholder — form is non-functional; subject options don't match real offers. |
| src/components/Nav.astro | high | Nav links: Home/Services/Portfolio/Product/Blog/Contact. Will need new IA (Animus, Skills, Workshops...). |
| src/components/Footer.astro | med | No email, no LinkedIn; nav mirrors old IA. |
| src/components/Hero.astro | med | "Software Consultancy" tag, "Applications. Games. CAD. AI." — needs new positioning copy. |
| src/components/ServiceCard.astro | low | Simple presentational card, reusable as-is. |
| src/components/ProjectCard.astro | low | Card with tags/category/link, reusable for GitHub projects page. |
| src/components/HeroCanvas.tsx | low | react-three-fiber background; heavy dep but working; keep. |
| src/content.config.ts | med | Blog collection (title/description/pubDate/tags) — blog exists and can carry SEO content later. |
| src/styles/global.css | med | Design tokens (dark theme, cyan `--accent`, warm orange `--accent-warm`); keep visual identity. |
| astro.config.mjs | high | `site` set correctly; no sitemap integration — add `@astrojs/sitemap`. |
| package.json | med | Astro 5 + React 19 + three.js. No sitemap/RSS deps yet. |
| public/CNAME | med | `threadandsignal.com` custom domain confirmed; robots.txt/llms.txt belong in public/. |
| .github/workflows/deploy.yml | med | gh-pages branch deploy — publishing a commit to main auto-deploys (deploy = public consequence; noted for checkpoint discipline). |
| src/content/blog/hello-world.md | low | Single placeholder post. |
| README.md | low | One-liner; not user-facing. |

## 3. External Sources

- [GitHub API: crussella0129 repo list](https://api.github.com/users/crussella0129/repos) — Full inventory of real projects with stars/descriptions. Flagships: **Jetson-Orin-Nano-Super-Case** (39★), **Animus** Python prototype (18★, deprecated), **GECK** (17★), **Animus_Ferric** (10★, Rust, active), **sprint-loops** (8★), **Scribblings** (6★), **crusst** geometry kernel (5★), **tricorne** (4★), plus MDR, carbide, Banquo, diploid, Gitr, HexQuest, PreHeat-Macros. Sum comfortably over 100★ — validates the LinkedIn claim.
- [Animus_Ferric README](https://github.com/crussella0129/Animus_Ferric) — The lineage story is explicit: Ferric is "the Rust synthesis of the Animus lineage — Animus (Python), Animus_Prion (Go), fev (Go)". Three convictions: harness owns constrained decoding; behavior scales deterministically to model size (1B–14B GGUF); trajectory (JSONL trace) is source of truth. This is the raw material for the Animus landing page narrative ("three dormant implementations before Ferric").
- [sprint-loops README](https://github.com/crussella0129/sprint-loops) — Harness-agnostic protocol shipped three ways (Claude Code plugin/marketplace, Codex CLI skill, open-harness spec). Strong proof of the "brand-agnostic skills" product line; cross-harness compatibility is the differentiator.
- [GECK README](https://github.com/crussella0129/GECK) — "Garden of Eden Creation Kit": protocol + generator solving agent "context amnesia" across sessions. Third pillar of the skills line alongside Sprint Loops and MDR (Massive Download Resilience — HuggingFace model-download skill).
- [llms.txt specification](https://llmstxt.org/) — `/llms.txt` at site root: H1 name, blockquote summary, H2 sections of `[title](url): note` links; optional markdown mirrors of pages. This plus JSON-LD, OG tags, sitemap.xml, robots.txt forms the AI-SEO package.

## 4. Risks, Unknowns, Dependencies

- **Risk:** The current site sells things that don't exist (CAD platform "early access", fake portfolio items). Leaving any placeholder live undermines credibility with both humans and AI crawlers; the sprint must remove all of them, not just add pages.
- **Risk:** Scope explosion — "revamp + 5 landing pages + SEO + positioning" is large. Mitigate by reusing BaseLayout/cards, keeping the existing visual system, and treating copy quality > page count.
- **Risk:** Deploying to production happens automatically on push to main (gh-pages workflow). Final visual/copy sign-off is a human checkpoint before push.
- **Unknown:** Formspree form ID — real ID unknown (`YOUR_FORMSPREE_ID` placeholder). Commit d7634bd says "add contact page with Formspree form" but no ID was ever set. Fallback: mailto CTA prominently, keep form wired to a placeholder constant in one obvious place, flag for the user.
- **Unknown:** Pricing. No pricing data exists anywhere; pages will use "book a consult / request a quote" CTAs rather than invented numbers, with structure ready for prices later.
- **Unknown:** Whether the user wants the CAD-platform ambition (crusst) kept as a roadmap item or removed entirely. Default: fold it into the open-source projects page as an honest "early-stage R&D" entry.
- **Dependency:** `@astrojs/sitemap` package (small, official) for sitemap.xml.
- **Dependency:** GitHub project facts (stars, descriptions) captured in this report; pages should link out rather than embed live counts (static site, counts go stale).

## 5. Recommended Approach

**Primary:** Reposition the site around one clear headline offer — **"agentic development, delivered as products and services"** — with three revenue lanes, each getting a landing page with its own CTA:

1. **Animus / Ferric** (`/animus`) — flagship story page: goal (local-first agentic coding on small models), the honest lineage narrative (Python → Prion → fev → Ferric), what makes Ferric different (constrained decoding, deterministic scale policies, trace-first), and a paid offer: **custom harness implementations / edge-AI deployments** (llama.cpp + custom harness — matches LinkedIn commercial work).
2. **Agent Skills** (`/skills`) — the brand-agnostic skills product line: Sprint Loops, GECK, MDR (+ oovra/.lux as supporting cast). Offer: custom skill/protocol development for teams, plus **agentic-development workshops** (recommend a workshops section on `/skills` first, split into `/workshops` later if traction).
3. **Design & Fabrication** (`/design`) — CAD/3D-printing: Jetson case (39★ flagship), HexQuest, PreHeat-Macros; commissioned design work and 1-on-1 Fusion 360 lessons (geometry + additive manufacturing).

Supporting changes: rewrite `/` home around the three lanes with real proof (stars, named projects); convert `/portfolio` to a real **open-source projects** page (Banquo, carbide, crusst, tricorne, Gitr, diploid...) fed by a data file; **replace** `/product` (CAD platform) with the Animus page (redirect or retire the route); fix contact email to charles@threadandsignal.com everywhere + add LinkedIn; add SEO layer in BaseLayout (canonical, OG/Twitter tags, JSON-LD Person/Organization/Service schemas), `@astrojs/sitemap`, `public/robots.txt`, `public/llms.txt`.

**Positioning recommendation (the "what am I most marketable at" question):** lead with **"AI-native business process automation & custom agent tooling"** as the commercial umbrella — it's the offer businesses pay for — with Animus/skills as credibility proof, and CAD/3D design as a distinct second audience. The rare, defensible niche is **local/edge AI agents on small models** (privacy, on-prem, Jetson-class hardware): almost nobody sells "agentic coding that runs on YOUR hardware," and Ferric + Jetson case + diploid + MDR all reinforce it.

**Alternative considered:** A single long-scroll landing page (one-pager) instead of multiple pages. Rejected: worse for SEO (one URL, diluted keywords), worse for AI agents (llms.txt wants distinct addressable resources), and the three audiences (businesses buying automation, developers adopting skills, makers buying design/lessons) need different pitches.

**Rationale:** Multiple focused landing pages map 1:1 to search intent and to llms.txt entries; reusing the existing design system keeps the sprint shippable; honest project-backed copy converts better than the current fictional placeholders and is exactly what AI crawlers will quote.

## Artifacts

- `github-repos.md` — captured repo inventory (name, stars, description) used for project pages.
