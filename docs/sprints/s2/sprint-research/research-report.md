# Sprint 2 Research Report

## Intents Reviewed
- [INT-0001](../../../intents/INT-0001-marketing-search.md) — created; relevance: marketing, search, skill convergence and production verification; current state: proposed.

## 1. Sprint Goal
Make the existing studio site easier to understand, discover, and commission using Charles's supported public work; deliver one focused buyer guide and technical discovery improvements, then publish and observe the live site.

## 2. Existing Code Survey
| File | Relevance | Notes |
|---|---|---|
| src/data/site.ts | high | Charles Russella, Ohio, email, social identity |
| src/data/projects.ts | high | Public proof; dated star snapshots |
| src/components/Hero.astro | high | Preserve handwoven brand; clarify buyer language |
| src/pages/index.astro | high | Three commercial lanes, lacks visible founder |
| src/pages/services.astro | high | Offers need concrete starting point |
| src/pages/contact.astro | high | Approved form-free funnel |
| src/pages/animus.astro | high | Local AI offer; overbroad licensing/correctness claims |
| src/pages/skills.astro | high | Portable skills; avoid universal compatibility promises |
| src/pages/blog/index.astro | high | Generic metadata, one announcement |
| src/pages/blog/[slug].astro | high | No article identity or author metadata |
| src/layouts/BaseLayout.astro | high | Existing canonical, missing social image |
| src/styles/global.css | high | Existing copper/ink design system |
| astro.config.mjs | high | Sitemap and aliases already configured |
| public/llms.txt | medium | Accuracy only; no special Google benefit |
| .github/workflows/deploy.yml | high | main builds to gh-pages; add validation before publish |
| docs/positioning.md | high | Approved niche and brand; stale discovery advice |
| docs/sprints/s0/sprint-tests/dist-check.mjs | high | Regression script root shifts after migration |
| docs/sprints/s1/sprint-tests/dist-check-s1.mjs | high | Rebrand regression |

## 3. External Sources
- [Sprint Loops upstream](https://github.com/crussella0129/Animus_Sprint_Loops) — manifest 0.22.0 at 0bdbe66f3f2b82584e4f8b44cbd3f5101f0dc69f matches installed bundle.
- [Google titles](https://developers.google.com/search/docs/appearance/title-link) — distinct concise descriptive page titles.
- [Google Article data](https://developers.google.com/search/docs/appearance/structured-data/article) — author, publication date and article metadata should match visible content.
- [Google AI features](https://developers.google.com/search/docs/appearance/ai-features) — ordinary SEO applies; no special AI file or markup requirement.
- [Ferric public repository](https://github.com/crussella0129/Animus_Ferric) — current README delegates license; remove unsupported MIT/free-forever promise.

## 4. Risks, Unknowns, Dependencies
- **Risk:** unsupported delivery, model correctness, licensing, or privacy claims. Use conditional scope and public source links; distinguish schema validity from action correctness.
- **Risk:** migrating historical scripts changes their repository-relative root. Repair execution paths and retain historical evidence.
- **Unknown:** Search Console access/rankings and client results; do not invent either.
- **Dependency:** GitHub Pages main → gh-pages deployment, verified via GitHub API; use existing custom domain.
- **Dependency:** bundled Claude-oriented phase text mentions unavailable EnterPlanMode/ExitPlanMode APIs. This Codex session remains in Default mode; preserve the substantive read-only planning and independent critic gates before implementation. User already authorized the sprint and publication.

## 5. Recommended Approach
Preserve design, add direct commercial copy and founder proof, publish one useful local AI assessment guide, improve shared metadata, then enforce output checks before deployment. No new hosting or frontend framework is needed.

## Artifacts
- [Migration provenance](../../../history/migration-provenance.md) — helper-generated source preservation evidence.
- [Remote profile](../../../work/remote-profile.md) — GitHub, main, persistent codex/work, human-approve default; this sprint has explicit user publication authorization.

## Budget Override
The combined independent audits inspected additional supporting project pages and official Google guidance beyond the summarized table. This is necessary for shared layout, public claims, migration compatibility and deployment review in one cross-cutting site sprint; research remained bounded within 30 minutes.
