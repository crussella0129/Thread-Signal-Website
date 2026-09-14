# Sprint 3 Research Report

## Intents Reviewed
- [INT-0002](../../../intents/INT-0002-work-led-homepage.md) — created; relevance: this sprint directly advances it; current state: `proposed`.
- [INT-0001](../../../intents/INT-0001-marketing-search.md) — selected (context only, not modified); relevance: the realized live marketing site this homepage direction will eventually re-present; current state: `realized`.

## 1. Sprint Goal
Refine the existing homepage design study into one radically simplified,
work-led composition that Charles can sign off on. Keep the white-on-black
monochrome he endorsed, cut the service copy down to a single plain-language
promise plus at most two short capability lines, and make the Jetson Orin Nano
enclosure the page's hero proof instead of a paragraph. Provide exactly one
action to start a conversation. The deliverable is a reviewable local study
under `docs/design-studies/`; this sprint does not integrate into the production
Astro app and does not publish.

## 2. Existing Code Survey
| File | Relevance | Notes |
|------|-----------|-------|
| docs/design-studies/src/pages/index.astro | high | Current simplified "offer" homepage (61 words, white-on-black, one quote button). The base to simplify further and make work-led. |
| docs/design-studies/src/styles/offer.css | high | Token set + layout for the offer page. Monochrome palette (`--offer-bg #0a0a0a`, `--offer-text #fff`), Arial, tight tracking — the aesthetic Charles likes. Extend here. |
| docs/design-studies/src/components/Hardware.astro | high | The Jetson Orin Nano section Charles singled out: v2.2 CAD render + assembly photo + honest caption + repo link. Source of the hero artifact. |
| docs/design-studies/src/pages/portfolio.astro | high | The "portfolio" opening Charles preferred over the case-study. Shows the work-led ordering (intro → software feature → Hardware → process → services → about) to distill from. |
| docs/design-studies/assets/jetson-v2-2-render.png | high | 2160×1082 CAD render served at `/jetson-v2-2-render.png` (publicDir is `./assets`). Candidate hero image. |
| docs/design-studies/assets/jetson-assembly-photo.jpg | medium | 1685×2247 assembly photo; secondary/"inside" view. |
| docs/design-studies/jetson-image-sources.md | medium | Provenance for the Jetson assets — needed to keep captions honest. |
| docs/design-studies/src/data/evidence.ts | medium | Animus Ferric eval + Sprint Loops process data. The eval is an honestly-labeled *failed* run — reason to keep it off the hero. |
| docs/design-studies/src/pages/direction.astro | medium | Recorded visual spec (type scale, color roles, spacing, geometry). Reuse its tokens; note it predates the "even simpler" instruction. |
| docs/design-studies/src/layouts/StudyLayout.astro | medium | Shared study chrome (header nav, footer) used by portfolio/case-study; the index page bypasses it with its own minimal shell. |
| docs/design-studies/astro.config.mjs | medium | root=this dir, publicDir=`./assets`, outDir=`./dist`, dev server 127.0.0.1:4322. How the study builds/serves locally. |
| src/data/site.ts | high | Single source of truth for identity/contact (`EMAIL`, `OWNER_NAME`, `GITHUB_URL`, `AUTOMATION_BRIEF_URL`). Study imports from here; never hardcode. |
| docs/plans/2026-09-13-design-reset.md | high | The governing design plan. This sprint executes its "develop the selected study into the homepage" step, narrowed by Charles's "even simpler" feedback. |
| docs/design-studies/verification.md | medium | Existing study verification notes; extend with this iteration's checks. |
| docs/design-studies/src/components/Evaluation.astro | low | Software-evidence table; likely dropped from the simplified hero, kept available for a secondary/link. |

## 3. External Sources
- [Claude house-style specimen](https://claude.ai/public/artifacts/37cb0fd0-c3a9-457e-bd1b-745a4c1009fa) — the "avoid claudeslop" guide Charles supplied; its lesson is that a palette swap leaves the same decorative composition, so simplification must be structural (fewer blocks, work-led), not cosmetic.
- [Panic](https://panic.com/) — real, named products with distinct artwork carry the page; supports letting the Jetson object be the identity.
- [Playdate](https://play.date/) — a large image of the actual device leads; supports the Jetson render as a prominent hero at a scale that explains the object.
- [Jetson Orin Nano Super Case repo](https://github.com/crussella0129/Jetson-Orin-Nano-Super-Case) — the public source the hero links to; confirms this is public project work, not a client outcome.

## 4. Risks, Unknowns, Dependencies
- **Risk:** Leading with a hardware enclosure can imply Charles sells cases, not automation/local-AI (the actual revenue). Mitigation: hero line + caption must frame the object as evidence of "software, hardware, and local AI, built to order," keeping the two paid offers legible.
- **Risk:** Over-cutting copy can leave the page pretty but unclear about what to buy. Mitigation: retain two short plain-language capability lines and one unambiguous action; verify with the acceptance-criteria "explain the offer" check.
- **Risk:** A 2160×1082 render dropped in at full size hurts page weight and mobile. Mitigation: explicit width/height, responsive sizing, `loading` strategy appropriate for an above-the-fold hero (eager, not lazy).
- **Unknown:** Whether Charles wants any software proof on the page at all, or Jetson-only with software behind a "view my work" link. Recommendation carries a primary (Jetson-led, software as one compact link) with a clearly-removable secondary software slot so the review can settle it.
- **Dependency:** Jetson image provenance in `jetson-image-sources.md` must back the caption wording (CAD render vs. photo, version label) to keep claims honest.
- **Dependency:** Local-only verification this sprint — GitHub CI minutes are exhausted for the month, so all checks run locally (Astro build/check + browser preview at the target viewports). A Debian box `nighthawk` (charles@nighthawk) is available on the tailnet if a Linux run is ever needed; not expected for a static Astro study.
- **Constraint:** No push/deploy; production deploy needs Charles's visual sign-off per project practice ([[thread-signal-open-items]]).

## 5. Recommended Approach
Primary: Evolve `index.astro` + `offer.css` in place into a work-led hero page:
(1) small wordmark; (2) one plain-language promise line — e.g. "I build custom
software, hardware, and local AI that does your repetitive work."; (3) the
Jetson Orin Nano CAD render as a large hero image on black with one honest
caption; (4) two short capability lines naming the paid offers ("Automate a
repeating task" / "Set up & test local AI on your computer") — labels, not
paragraphs; (5) one primary action ("Ask for a quote", the existing
`AUTOMATION_BRIEF_URL`/quote mailto); (6) quiet footer (name · Ohio · view my
work → GitHub). Reuse the monochrome tokens already in `offer.css`; keep the
Jetson section's honest-caption pattern from `Hardware.astro`.

Alternative considered: keep the full portfolio study (software eval + hardware +
process + services + about) and merely trim it. Rejected — that is the "bunch of
words" Charles reacted against; the ask is structural reduction to one hero + one
line + one action.

Rationale: this satisfies "as simple as possible," is genuinely work-led
(portfolio instinct), foregrounds the exact element Charles endorsed, states the
sellable offers in plain language, and avoids over-weighting the failed software
eval. It stays inside the endorsed monochrome system and remains a local study
for sign-off before any integration or publication.

## Artifacts
- No new code artifacts produced in the research phase. Reference material is the
  existing study tree surveyed in section 2 and the design plan
  `docs/plans/2026-09-13-design-reset.md`. Implementation artifacts are produced
  in the Build phase per the plan.
