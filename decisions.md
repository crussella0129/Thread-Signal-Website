# Architectural Decisions

## 2026-07-02 — Remove the React/three.js island; framework-free hero canvas (sprint 1)
- **Context:** The only React usage was HeroCanvas.tsx, a stock three.js icosahedron costing ~100KB+ of page JS and fighting hero text legibility.
- **Decision:** Deleted react, react-dom, three, @react-three/fiber, @astrojs/react and types; the hero is a ~3KB inline vanilla canvas (thread weave + golden textile wave packets — zigzag carrier in a raised-cosine envelope, per user direction at the checkpoint). Build time dropped ~4.0s → ~1.4s.
- **Alternatives considered:** Art-directing the three.js scene (rejected: weight, genericness, legibility).
- **Consequences:** No UI-framework runtime on the site; future interactive islands need a deliberate re-introduction decision. Canvas honors prefers-reduced-motion with a static weave.

## 2026-07-02 — "Lamplight Atelier" rebrand: visual + verbal identity (sprint 1)
- **Context:** User rejected sprint-0's cyan/navy look as plain, then escalated to a complete reimagining; chose Lamplight Atelier from three previewed directions.
- **Decision:** Palette = traditional dye colors on ink (ground #141210, linen #ece5d8, copper #e8a33d = signal/Animus, verdigris #4fb8a8 = thread/Skills, madder #c2543f = fabrication/Design; token names --accent/--accent-warm retained). Type = Fraunces display + Inter + JetBrains Mono. Verbal identity: "Handwoven automation." anchored in the Jacquard-loom story; lane taglines "Intelligence that stays home." / "Skills that outlive subscriptions." / "Drawn, printed, held."; atelier vocabulary (commission/workshop/bench). This AMENDS the 2026-07-02 positioning ADR's verbal expression only — the local-first commercial positioning is unchanged. Full voice guide: docs/positioning.md §Brand voice.
- **Alternatives considered:** Midnight Broadcast (phosphor/CRT) and Paper & Ink (editorial light) — previewed and declined by the user; incremental polish of the cyan system — rejected by the user before planning.
- **Consequences:** All future copy uses the voice guide; banned strings for new copy ("Early Access", "CAD Platform"/"CAD platform", /game develop/i, "Placeholder", hello@) are enforced by a full-dist sweep in the s1 test suite.

## 2026-07-02 — Positioning: local-first agentic development is the lead (sprint 0)
- **Context:** The site sold generic "software consultancy" services with fictional portfolio items; the user asked what he is most marketable at.
- **Decision:** Lead commercially with AI-native automation & custom agent tooling; differentiate on "agents that run on hardware you own" (local/edge, 1B–14B models). Three revenue lanes: Animus/automation (/animus), skills & workshops (/skills), CAD/3D design & lessons (/design). Game development dropped as a service; the crusst CAD-platform ambition demoted to an honest R&D entry on /projects.
- **Alternatives considered:** Single long-scroll landing page (rejected: worse SEO, worse llms.txt addressability, three distinct audiences need distinct pitches); leading with generic full-stack development (rejected: no premium, no moat).
- **Consequences:** All future copy/pages should reinforce the local-first niche; per-repo star counts must stay rounded ("100+", "35+") to age safely.

## 2026-07-02 — Single-source site identity in src/data/ (sprint 0)
- **Context:** The wrong contact email (hello@) was hardcoded in markup; the Formspree form ID was a dead placeholder.
- **Decision:** All identity constants (EMAIL, GITHUB_URL, LINKEDIN_URL, FORMSPREE_ENDPOINT, SITE_DESCRIPTION) live in `src/data/site.ts`; project inventory lives in `src/data/projects.ts`. A test (`test_email_source_single`) enforces that the literal email appears in src/ only there.
- **Alternatives considered:** Fixing strings in place (rejected: same drift recurs).
- **Consequences:** Contact/identity changes are one-line edits; FORMSPREE_ENDPOINT is still a placeholder the user must replace to activate the form.

## 2026-07-02 — SEO/AI-SEO layer conventions (sprint 0)
- **Context:** No canonical/OG/JSON-LD/sitemap/robots/llms.txt existed; the user wants discovery by both search engines and AI agents.
- **Decision:** BaseLayout emits canonical + OG + Twitter metas and accepts a `jsonLd` prop; @astrojs/sitemap generates the sitemap; `public/robots.txt` and `public/llms.txt` (llmstxt.org format, addressing AI agents as buyers) are hand-maintained; retired routes get config `redirects` (/portfolio→/projects, /product→/animus).
- **Alternatives considered:** Per-page hand-rolled meta tags (rejected: drift); omitting llms.txt (rejected: explicit user goal).
- **Consequences:** New pages must pass title/description/jsonLd through BaseLayout and be added to llms.txt; dist-check.mjs (sprints/s0/sprint-tests/) verifies the contract and llms↔sitemap coherence.

## 2026-07-02 — Push-to-main equals production deploy; human sign-off gate (sprint 0)
- **Context:** The gh-pages workflow deploys on every push to main; sprint commits are made locally on main.
- **Decision:** Build/Test phases never push. Push happens only after human visual/copy sign-off (sprint-loop stop-criterion categories 1 and 2).
- **Alternatives considered:** Feature-branch + PR flow (viable later; single-author repo made local-main commits acceptable this sprint).
- **Consequences:** Every future sprint on this repo inherits the no-push-without-sign-off gate; consider moving to PR flow if collaborators join.
