# Architectural Decisions

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
