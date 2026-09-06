# Completed Tasks Log (Append-Only)

## T-001 (sprint 0)
- **Description:** Create single-source-of-truth data modules for site identity and project inventory
- **Completed:** 2026-07-02T03:55:00Z
- **Files modified:** src/data/site.ts, src/data/projects.ts
- **Commit:** 9d7ad11

## T-002 (sprint 0)
- **Description:** Add @astrojs/sitemap so builds emit a sitemap
- **Completed:** 2026-07-02T03:56:00Z
- **Files modified:** package.json, package-lock.json, astro.config.mjs
- **Commit:** d6c3a25

## T-003 (sprint 0)
- **Description:** Upgrade BaseLayout head with full SEO/social/structured-data support
- **Completed:** 2026-07-02T03:57:00Z
- **Files modified:** src/layouts/BaseLayout.astro, src/pages/blog/index.astro
- **Commit:** 3fda5e8

## T-004 (sprint 0)
- **Description:** Update Nav and Footer to the new IA and correct identity
- **Completed:** 2026-07-02T03:58:00Z
- **Files modified:** src/components/Nav.astro, src/components/Footer.astro
- **Commit:** a0af22d

## T-005 (sprint 0)
- **Description:** Fix the contact page identity and offers
- **Completed:** 2026-07-02T03:59:00Z
- **Files modified:** src/pages/contact.astro
- **Commit:** 2521a94

## T-006 (sprint 0)
- **Description:** Build the /animus landing page
- **Completed:** 2026-07-02T04:01:00Z
- **Files modified:** src/pages/animus.astro
- **Commit:** 5b68e77

## T-007 (sprint 0)
- **Description:** Build the /skills landing page with workshops offer
- **Completed:** 2026-07-02T04:02:00Z
- **Files modified:** src/pages/skills.astro
- **Commit:** ed8009f

## T-008 (sprint 0)
- **Description:** Build the /design landing page (CAD & 3D printing)
- **Completed:** 2026-07-02T04:03:00Z
- **Files modified:** src/pages/design.astro
- **Commit:** 986a644

## T-009 (sprint 0)
- **Description:** Replace /portfolio with a real /projects page
- **Completed:** 2026-07-02T04:05:00Z
- **Files modified:** src/pages/projects.astro (new), src/pages/portfolio.astro (deleted), astro.config.mjs
- **Commit:** 5078398

## T-010 (sprint 0)
- **Description:** Retire the fictional /product page
- **Completed:** 2026-07-02T04:06:00Z
- **Files modified:** src/pages/product.astro (deleted), astro.config.mjs
- **Commit:** 5ff723c

## T-011 (sprint 0)
- **Description:** Rewrite the home page around the three revenue lanes
- **Completed:** 2026-07-02T04:07:00Z
- **Files modified:** src/pages/index.astro, src/components/Hero.astro
- **Commit:** bc30402

## T-012 (sprint 0)
- **Description:** Rewrite the services page as the commercial umbrella
- **Completed:** 2026-07-02T04:08:00Z
- **Files modified:** src/pages/services.astro
- **Commit:** 3717c91

## T-013 (sprint 0)
- **Description:** Add robots.txt for crawler discovery
- **Completed:** 2026-07-02T04:09:00Z
- **Files modified:** public/robots.txt
- **Commit:** eb2ac78

## T-014 (sprint 0)
- **Description:** Add llms.txt for AI-agent discovery
- **Completed:** 2026-07-02T04:10:00Z
- **Files modified:** public/llms.txt
- **Commit:** e3a49ca

## T-015 (sprint 0)
- **Description:** Write the positioning & marketing guidance doc
- **Completed:** 2026-07-02T04:11:00Z
- **Files modified:** docs/positioning.md
- **Commit:** 7d28930

## T-101 (sprint 1)
- **Description:** Rebuild global.css as the Lamplight Atelier design system
- **Completed:** 2026-07-02T13:35:00Z
- **Files modified:** src/styles/global.css
- **Commit:** 3ba7f44

## T-102 (sprint 1)
- **Description:** Rebuild hero (verbal + loom canvas) and remove React/three stack
- **Completed:** 2026-07-02T13:38:00Z
- **Files modified:** src/components/Hero.astro, src/components/HeroCanvas.tsx (deleted), package.json, package-lock.json, astro.config.mjs
- **Commit:** 10d85cc

## T-103 (sprint 1)
- **Description:** Rebrand nav and footer
- **Completed:** 2026-07-02T13:40:00Z
- **Files modified:** src/components/Nav.astro, src/components/Footer.astro
- **Commit:** db12a61

## T-104 (sprint 1)
- **Description:** Reveal/motion infrastructure in BaseLayout
- **Completed:** 2026-07-02T13:41:00Z
- **Files modified:** src/layouts/BaseLayout.astro
- **Commit:** 031a888

## T-105 (sprint 1)
- **Description:** Home page verbal + visual pass
- **Completed:** 2026-07-02T13:43:00Z
- **Files modified:** src/pages/index.astro
- **Commit:** a1a41f4

## T-106 (sprint 1)
- **Description:** /animus visual + verbal pass (lineage timeline)
- **Completed:** 2026-07-02T13:45:00Z
- **Files modified:** src/pages/animus.astro
- **Commit:** 933fc99

## T-107 (sprint 1)
- **Description:** /skills visual + verbal pass (verdigris)
- **Completed:** 2026-07-02T13:47:00Z
- **Files modified:** src/pages/skills.astro
- **Commit:** c863025

## T-108 (sprint 1)
- **Description:** /design visual + verbal pass (madder)
- **Completed:** 2026-07-02T13:48:00Z
- **Files modified:** src/pages/design.astro
- **Commit:** 56215c7

## T-109 (sprint 1)
- **Description:** Project card art + /projects polish
- **Completed:** 2026-07-02T13:50:00Z
- **Files modified:** src/components/ProjectCard.astro, src/pages/projects.astro
- **Commit:** ad6578e

## T-110 (sprint 1)
- **Description:** Services and contact atelier pass with commission steps
- **Completed:** 2026-07-02T13:51:00Z
- **Files modified:** src/pages/services.astro, src/pages/contact.astro
- **Commit:** 006c621

## T-111 (sprint 1)
- **Description:** Blog inheritance + identity-file voice alignment
- **Completed:** 2026-07-02T13:52:00Z
- **Files modified:** src/pages/blog/index.astro, src/pages/blog/[slug].astro, src/data/site.ts, public/llms.txt, docs/positioning.md
- **Commit:** 81e8d17

## T-201 (sprint 2)
- **Intent:** [INT-0001](../intents/INT-0001-marketing-search.md)
- **Description:** Clarify automation offers, founder proof and the email brief
- **Completed:** 2026-09-06T03:58:28Z
- **Files modified:** src/components/Hero.astro, src/data/site.ts, src/pages/index.astro, src/pages/services.astro, src/pages/contact.astro, src/pages/animus.astro, src/pages/skills.astro, src/styles/global.css, docs/intents/INT-0001-marketing-search.md, docs/sprints/s2/sprint-plans/build-plan.md, docs/sprints/s2/sprint-plans/test-plan.md
- **Verification:** Integrated npm run validate passed (0 Astro diagnostics; 7 output checks; 46 + 39 regressions). Browser lead paths verified. Publication pending Loop phase.
- **Commit:** `7ba1bf45d069e8f48b75166720614285d9e38e68`

## T-202 (sprint 2)
- **Intent:** [INT-0001](../intents/INT-0001-marketing-search.md)
- **Description:** Publish the local LLM buyer guide and attributed article pages
- **Completed:** 2026-09-06T03:58:34Z
- **Files modified:** src/content/blog/local-llm-business-workflow.md, src/pages/blog/index.astro, src/pages/blog/[slug].astro
- **Verification:** Integrated npm run validate passed (0 Astro diagnostics; 7 output checks; 46 + 39 regressions). Browser lead paths verified. Publication pending Loop phase.
- **Commit:** `74d6a68589bebc1cd760a5bd13bee49da7eecf19`

## T-203 (sprint 2)
- **Intent:** [INT-0001](../intents/INT-0001-marketing-search.md)
- **Description:** Add search identity, social metadata and accessible navigation
- **Completed:** 2026-09-06T03:58:40Z
- **Files modified:** src/layouts/BaseLayout.astro, src/components/Nav.astro, src/pages/design.astro, src/pages/projects.astro, public/social-card.png, public/social-card.svg, public/llms.txt
- **Verification:** Integrated npm run validate passed (0 Astro diagnostics; 7 output checks; 46 + 39 regressions). Browser lead paths verified. Publication pending Loop phase.
- **Commit:** `89d4d5209def2c1a206bfa3c71b0294aaf7b7858`

## T-204 (sprint 2)
- **Intent:** [INT-0001](../intents/INT-0001-marketing-search.md)
- **Description:** Gate publication on site validation and document maintenance
- **Completed:** 2026-09-06T03:58:46Z
- **Files modified:** package.json, package-lock.json, scripts/check-site.mjs, .github/workflows/check.yml, .github/workflows/deploy.yml, docs/sprints/s0/sprint-tests/dist-check.mjs, docs/sprints/s1/sprint-tests/dist-check-s1.mjs, README.md, docs/MAINTENANCE.md, docs/positioning.md
- **Verification:** Integrated npm run validate passed (0 Astro diagnostics; 7 output checks; 46 + 39 regressions). Browser lead paths verified. Publication pending Loop phase.
- **Commit:** `754503c653d8ddbead1546b77416f13724d467c1`
