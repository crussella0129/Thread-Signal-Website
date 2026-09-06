# Sprint 2 End-to-End Results

- **Intent:** [INT-0001](../../../intents/INT-0001-marketing-search.md), criteria 1–4.
- **Verified source head:** `308d827af696cdb6712fb499b483dd14d3cbcca5`; CUA browser tested the production build at `http://127.0.0.1:4322/` on 2026-09-06 UTC.
- `browser_lead_path` passed: desktop homepage → Services; visible assessment/FAQs; active nav is Services. Mobile menu opened with aria-expanded=true, Contact navigation succeeded, recipient and decoded brief contain workflow, result, approval, hardware and budget prompts. Plain email remains. No email was sent or external mail client invoked.
- `browser_guide` passed: guide is reachable through home and services; Charles's author link targets /#about; guide offers services/contact next steps. Visible byline/date and readable headings checked in browser.
- `browser_mobile` passed: 390px mobile hero screenshot reviewed; 320px home/services/contact/guide all report scrollWidth 305px within innerWidth 320px, with no overflowing main elements. Existing card minimums were made safe on the two affected pages.
- Desktop homepage and services screenshots reviewed: retained copper/ink typography and loom artwork, clear CTA hierarchy, and new assessment/founder sections. 320px guide screenshot reviewed: text wraps without clipping. Temporary viewport override reset.
- Keyboard check: focused navigation link has a visible solid outline; skip-to-content link is present. Closed mobile drawer now uses visibility:hidden to keep its offscreen links out of keyboard navigation. Browser console: no errors recorded.
- Reduced-motion and JavaScript-disabled behavior: existing no-JS reveal safety and reduced-motion regression checks pass; all new content and mailto links are static HTML. This browser surface exposes no no-JS/reduced-motion emulation, so separate browser emulation was not run.
- `live_deployment`: **PENDING**, deliberately not counted as passed before the bundle's required closure/checkpoint. INT-0001 remains active until merge, actual deployment SHA/run, and custom-domain verification are recorded.
