# Sprint 2 Build Plan

## Intents
- [INT-0001](../../../intents/INT-0001-marketing-search.md) — planned; covers criteria 1–5.

## Schema Tree
- Market the studio and publish discoverable content
  - T-201: Commercial positioning and direct inquiry
  - T-202: Local AI guide and article presentation
  - T-203: Technical search and social metadata
  - T-204: Validation, CI, and maintenance documentation

## Execution Sequence

### T-201: Clarify the studio offer and first inquiry
- **Intent:** [INT-0001](../../../intents/INT-0001-marketing-search.md)
- **Touches:** src/components/Hero.astro, src/pages/index.astro, src/pages/services.astro, src/pages/contact.astro, src/pages/animus.astro, src/pages/skills.astro, src/styles/global.css, src/data/site.ts
- **Depends on:** none
- **Acceptance criterion:** 1
- **Success criterion (EARS):** **WHEN** a visitor reads the home, services and contact pages, **THEN** they **SHALL** see Charles's identity, explicit automation/local AI services, a scoped starting offer and an email brief; existing brand and plain email remain usable. **WHEN** public capability claims are reviewed, **THEN** the copy **SHALL** avoid unsupported licensing, correctness, universal portability and privacy guarantees.
- **Notes:** No invented client results, prices or delivery guarantees. Correct licensing and tool correctness overclaims. Add shared spacing/type tokens before new UI. T-201 owns inbound guide links on home/services; they resolve after T-202 and are integration-verified in T-204.

### T-202: Publish a useful local LLM feasibility guide
- **Intent:** [INT-0001](../../../intents/INT-0001-marketing-search.md)
- **Touches:** src/content/blog/local-llm-business-workflow.md, src/pages/blog/index.astro, src/pages/blog/[slug].astro
- **Depends on:** none
- **Acceptance criterion:** 2
- **Success criterion (EARS):** **WHEN** a buyer opens the guide, **THEN** the page **SHALL** describe workflow, hardware, data boundary, evaluation and maintenance decisions, display Charles as author and link to services/contact.
- **Notes:** Use article illustration-free editorial layout; sources for technical statements, no claimed customer benchmarks. Root adds shared article schema in T-203 after agent handoff.

### T-203: Add consistent technical discovery metadata
- **Intent:** [INT-0001](../../../intents/INT-0001-marketing-search.md)
- **Touches:** src/layouts/BaseLayout.astro, src/data/site.ts, src/pages/index.astro, src/pages/services.astro, src/pages/blog/[slug].astro, src/pages/design.astro, src/pages/projects.astro, src/components/Nav.astro, public/social-card.png, public/llms.txt, astro.config.mjs
- **Depends on:** T-201, T-202
- **Acceptance criterion:** 3
- **Success criterion (EARS):** **WHEN** the production site is built, **THEN** indexable pages **SHALL** have unique titles/descriptions, one canonical, matching OG URL, real social image metadata, valid identity/article schema and sitemap coverage excluding redirect aliases.
- **Notes:** Normalize nav paths. Structured data must match visible claims; llms.txt accuracy is not a ranking promise. Social card is typographic branding, no invented photos.

### T-204: Make publication verifiable and maintainable
- **Intent:** [INT-0001](../../../intents/INT-0001-marketing-search.md)
- **Touches:** package.json, package-lock.json, scripts/check-site.mjs, .github/workflows/deploy.yml, .github/workflows/check.yml, docs/MAINTENANCE.md, docs/positioning.md, README.md, docs/sprints/s0/sprint-tests/dist-check.mjs, docs/sprints/s1/sprint-tests/dist-check-s1.mjs, Book evidence
- **Depends on:** T-201, T-202, T-203
- **Acceptance criterion:** 4, 5
- **Success criterion (EARS):** **WHEN** the change is verified for publication, **THEN** type/build/output checks and desktop/mobile lead-path checks **SHALL** pass, CI **SHALL** validate before publish, and the Book **SHALL** show current substrate and traceable evidence.
- **Notes:** Keep legacy reports intact; update script roots and explicitly obsolete assertions only. Loop phase owns the authorized one-PR merge and live-domain verification. The bundle requires closure before checkpoint: local closure records publication pending and INT-0001 remains active; realize it only after actual live verification. No pending deployment is reported as passed.
