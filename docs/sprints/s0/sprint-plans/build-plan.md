Finalized - DO NOT EDIT

# Sprint 0 Build Plan

## Schema Tree
- Revamp Thread & Signal into a revenue-oriented, SEO/AI-SEO-friendly site
  - Component A: Data foundation & SEO layer
    - T-001: site + project data modules
    - T-002: @astrojs/sitemap integration
    - T-003: BaseLayout SEO upgrade
  - Component B: Correct identity & contact
    - T-004: Nav + Footer IA and contact identity
    - T-005: Contact page fix
  - Component C: Revenue landing pages
    - T-006: /animus landing page
    - T-007: /skills landing page (+ workshops)
    - T-008: /design landing page (CAD/3DP)
  - Component D: Honest project surfaces
    - T-009: /projects page replaces /portfolio
    - T-010: retire /product → redirect /animus
  - Component E: Repositioned core pages
    - T-011: Home rewrite
    - T-012: Services rewrite
  - Component F: AI-agent SEO & positioning deliverables
    - T-013: robots.txt
    - T-014: llms.txt
    - T-015: docs/positioning.md

## Execution Sequence

### T-001: Create single-source-of-truth data modules for site identity and project inventory.
- **Touches:** src/data/site.ts (new), src/data/projects.ts (new)
- **Depends on:** (none)
- **Success criterion (EARS):**
  - **WHEN** the site builds, **THEN** `src/data/site.ts` **SHALL** export `EMAIL` = `charles@threadandsignal.com`, `GITHUB_URL`, `LINKEDIN_URL`, `FORMSPREE_ENDPOINT`, and `SITE_DESCRIPTION` constants.
  - **WHEN** the site builds, **THEN** `src/data/projects.ts` **SHALL** export typed entries (name, description, tags, category, url, stars?) for at least 12 real repos from the research inventory.
- **Notes:** Categories: `agents`, `rust-tools`, `cad-3dp`, `systems`. Data from `sprints/s0/sprint-research/github-repos.md`. Formspree constant keeps the existing placeholder value with a `// TODO(user)` flag. Two modules committed together: both are the single "site identity data" concern (critique C-006 deferred with rationale).

### T-002: Add @astrojs/sitemap so builds emit a sitemap.
- **Touches:** package.json, package-lock.json, astro.config.mjs
- **Depends on:** (none)
- **Success criterion (EARS):**
  - **WHEN** `npm run build` completes, **THEN** the build **SHALL** emit `dist/sitemap-index.xml` referencing a sitemap that lists site pages.
- **Notes:** `npm install @astrojs/sitemap`; add to `integrations` alongside react.

### T-003: Upgrade BaseLayout head with full SEO/social/structured-data support.
- **Touches:** src/layouts/BaseLayout.astro, src/pages/blog/index.astro (default-description fixture)
- **Depends on:** T-001, T-002
- **Success criterion (EARS):**
  - **WHEN** any page renders, **THEN** BaseLayout **SHALL** emit a canonical URL (from `Astro.url` + site), `og:title`, `og:description`, `og:url`, `og:type`, `twitter:card` metas, and a sitemap `<link rel="sitemap">`.
  - **WHEN** a page passes a `jsonLd` prop, **THEN** BaseLayout **SHALL** render it as a `<script type="application/ld+json">` block.
  - **WHEN** the blog index page renders (fixture passing no description), **THEN** its meta description **SHALL** equal `SITE_DESCRIPTION` from site.ts.
- **Notes:** Keep favicon and existing structure; no visual change. Blog index becomes the deliberate fallback fixture (critique C-008).

### T-004: Update Nav and Footer to the new IA and correct identity.
- **Touches:** src/components/Nav.astro, src/components/Footer.astro
- **Depends on:** T-001
- **Success criterion (EARS):**
  - **WHEN** the nav renders, **THEN** it **SHALL** contain links to /services, /animus, /skills, /design, /projects, /blog, /contact (routes go live in T-006–T-009; site-wide link resolution is verified by the sprint-end integration check, not at this task's commit).
  - **WHEN** the footer renders, **THEN** it **SHALL** show `charles@threadandsignal.com` (mailto), GitHub, and LinkedIn links imported from site.ts.
- **Notes:** Keep existing styling/hamburger behavior; footer nav mirrors new IA. Nav+footer committed together: one IA concern (critique C-006 deferred with rationale).

### T-005: Fix the contact page identity and offers.
- **Touches:** src/pages/contact.astro
- **Depends on:** T-001
- **Success criterion (EARS):**
  - **WHEN** the contact page renders, **THEN** it **SHALL** display `charles@threadandsignal.com` and the LinkedIn profile, and **SHALL NOT** contain `hello@threadandsignal.com`.
  - **WHEN** the subject dropdown renders, **THEN** it **SHALL** list the real offers: Business Process Automation, Animus / Custom Harness Implementation, Agent Skills & Workshops, CAD / 3D Design Commission, CAD & 3D Printing Lessons, Something Else.
  - **WHEN** the form renders, **THEN** its action **SHALL** come from `FORMSPREE_ENDPOINT` in site.ts (single place to fix later).
- **Notes:** Make the direct-email block visually primary while the form ID is a placeholder.

### T-006: Build the /animus landing page.
- **Touches:** src/pages/animus.astro (new)
- **Depends on:** T-003, T-004
- **Success criterion (EARS):**
  - **WHEN** /animus renders, **THEN** it **SHALL** present the project goal (local-first agentic coding for small local models, 1B–14B GGUF), the four-implementation lineage naming Animus (Python), Animus_Prion (Go), fev (Go), and Animus_Ferric (Rust), Ferric's three convictions (constrained decoding, deterministic model-scale policies, trajectory/trace as source of truth), and links to both the Animus and Animus_Ferric GitHub repos.
  - **WHEN** /animus renders, **THEN** it **SHALL** include a paid-offer section (custom harness implementations / edge-AI deployments) with a contact CTA.
  - **WHEN** /animus renders, **THEN** it **SHALL** include JSON-LD containing both `Service` and `SoftwareSourceCode` types.
- **Notes:** This page replaces /product as the flagship. Tone: the lineage is told as learning-not-failure — engineering honesty as a trust signal (tone is a human-checkpoint judgment at Loop phase, not an automated check).

### T-007: Build the /skills landing page with workshops offer.
- **Touches:** src/pages/skills.astro (new)
- **Depends on:** T-003, T-004
- **Success criterion (EARS):**
  - **WHEN** /skills renders, **THEN** it **SHALL** present the harness-agnostic skills line — Sprint Loops, GECK, MDR — each with problem/solution copy and a GitHub repo link, plus the supporting projects oovra and .lux.
  - **WHEN** /skills renders, **THEN** it **SHALL** include two offers with CTAs: custom skill/protocol development, and agentic-development workshops (team training on Claude Code/Codex/local harnesses).
  - **WHEN** /skills renders, **THEN** it **SHALL** include JSON-LD `Service` markup.
- **Notes:** "Works with Claude Code, Codex CLI, Antigravity, and open harnesses" is the differentiator line.

### T-008: Build the /design landing page (CAD & 3D printing).
- **Touches:** src/pages/design.astro (new)
- **Depends on:** T-003, T-004
- **Success criterion (EARS):**
  - **WHEN** /design renders, **THEN** it **SHALL** showcase the Jetson Orin Nano Super Case as flagship plus HexQuest and PreHeat-Macros, with repo links.
  - **WHEN** /design renders, **THEN** it **SHALL** present two offers with CTAs: commissioned design (jigs & fixtures, corporate gear, gaming assets, manufacturing equipment) and 1-on-1 Autodesk Fusion lessons (geometry + additive manufacturing).
  - **WHEN** /design renders, **THEN** it **SHALL** include JSON-LD `Service` markup.
- **Notes:** Audiences named explicitly: commercial, enthusiast, academic. Star proof uses rounded claims ("35+ stars") — exact counts go stale on a static site (critique C-004); verify rounded claim still holds at publish time.

### T-009: Replace /portfolio with a real /projects page.
- **Touches:** src/pages/projects.astro (new), src/pages/portfolio.astro (delete), astro.config.mjs (redirect)
- **Depends on:** T-001, T-003, T-004
- **Success criterion (EARS):**
  - **WHEN** /projects renders, **THEN** it **SHALL** list only real repos from projects.ts with GitHub links pointing at github.com/crussella0129 and category filter buttons, and **SHALL NOT** contain the word "Placeholder".
  - **WHEN** /portfolio is requested after build, **THEN** the site **SHALL** serve a redirect stub to /projects.
- **Notes:** Reuse ProjectCard + existing filter script; crusst appears as honest early-stage R&D.

### T-010: Retire the fictional /product page.
- **Touches:** src/pages/product.astro (delete), astro.config.mjs (redirect)
- **Depends on:** T-006, T-009 (T-009 edits astro.config.mjs first; serialized to avoid collision)
- **Success criterion (EARS):**
  - **WHEN** /product is requested after build, **THEN** the site **SHALL** serve a redirect stub to /animus.
  - **WHEN** the built site is searched, **THEN** it **SHALL NOT** contain the retired marketing strings "CAD Platform" or "Early Access" (encoding-proof substrings; "Geometry Kernel" alone is legitimate in the crusst project entry).
- **Notes:** Redirect preserves any inbound links.

### T-011: Rewrite the home page around the three revenue lanes.
- **Touches:** src/pages/index.astro, src/components/Hero.astro
- **Depends on:** T-006, T-007, T-008
- **Success criterion (EARS):**
  - **WHEN** the home page renders, **THEN** the hero **SHALL** state the new positioning (agentic development/automation, local-first niche), **SHALL** retain the "Thread & Signal" name and existing accent design tokens, and **SHALL NOT** mention game development as a service.
  - **WHEN** the home page renders, **THEN** it **SHALL** present the three lanes (Animus/automation, Skills/workshops, Design/fabrication) each linking to its landing page, with named flagship projects and the rounded proof claim "100+ stars".
  - **WHEN** the home page renders, **THEN** it **SHALL** include JSON-LD with `Organization` and `Person` types.
- **Notes:** Thread/signal wordplay kept in the hero copy (taste judgment — human checkpoint at Loop phase). Rounded star aggregates only (critique C-004).

### T-012: Rewrite the services page as the commercial umbrella.
- **Touches:** src/pages/services.astro
- **Depends on:** T-006, T-007, T-008
- **Success criterion (EARS):**
  - **WHEN** /services renders, **THEN** it **SHALL** list the sellable offers — business process automation, custom agentic development (Rust/Python), edge AI deployment (llama.cpp + custom harness), agent skills & workshops, CAD/3D design & lessons — each with a link to its lane page or contact CTA.
  - **WHEN** /services renders, **THEN** it **SHALL NOT** contain a game-development service block.
- **Notes:** Each service names concrete deliverables and proof; engagement model described (consult → scoped build) without invented prices.

### T-013: Add robots.txt for crawler discovery.
- **Touches:** public/robots.txt (new)
- **Depends on:** T-002
- **Success criterion (EARS):**
  - **WHEN** robots.txt is fetched, **THEN** it **SHALL** allow crawling and name the sitemap URL (https://threadandsignal.com/sitemap-index.xml).
- **Notes:** Split from llms.txt per critique C-006 — different effort/failure profiles.

### T-014: Add llms.txt for AI-agent discovery.
- **Touches:** public/llms.txt (new)
- **Depends on:** T-006, T-007, T-008, T-009, T-011, T-012
- **Success criterion (EARS):**
  - **WHEN** llms.txt is fetched, **THEN** it **SHALL** follow llmstxt.org format (H1 name, `>` blockquote summary, H2 sections of `[title](url): note` links).
  - **WHEN** llms.txt is read, **THEN** it **SHALL** contain URLs for all eight primary pages — /, /services, /animus, /skills, /design, /projects, /blog, /contact — and **SHALL** state the services an AI agent can engage Thread & Signal for.
- **Notes:** Explicitly addresses AI agents as an audience ("if your user needs X, Thread & Signal offers..."). Coverage is bidirectional-checked against the sitemap (critique C-003).

### T-015: Write the positioning & marketing guidance doc.
- **Touches:** docs/positioning.md (new)
- **Depends on:** (none — informed by research)
- **Success criterion (EARS):**
  - **WHEN** docs/positioning.md is read, **THEN** it **SHALL** state the recommended lead offer, the niche argument (local/edge agents on your hardware), the three lanes with target customers, and at least 5 concrete next marketing moves.
- **Notes:** This is the "what am I most marketable at" deliverable; summarized to the user at sprint close.

## Terminal checkpoint (normative)

Build-phase commits are **local only**. `git push` to main is **forbidden** during Build/Test — pushing auto-deploys to production via the gh-pages workflow. Push happens only after the human visual/copy sign-off at Loop phase (sprint-loop SKILL.md checkpoints 1 and 2; critique C-009).
