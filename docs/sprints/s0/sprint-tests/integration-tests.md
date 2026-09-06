# Sprint 0 Integration Test Results

Implemented in `dist-check.mjs`; run 2026-07-02 against the built dist/.

| Check | Component | Result |
|-------|-----------|--------|
| test_internal_links_resolve — every internal href on every non-redirect page resolves to an existing dist file (pages and assets) | B+C+E site-wide coherence | PASS |
| test_email_single_source — charles@ renders on contact + home(footer); hello@ nowhere in the full dist corpus (HTML + _astro bundles + txt/xml); source-side single-sourcing proven by test_email_source_single | B+C+E | PASS |
| test_llms_urls_in_sitemap — every threadandsignal.com page URL in llms.txt ⊆ sitemap | F | PASS |
| test_sitemap_no_dead_urls — every sitemap URL has a dist file | F | PASS |

**4/4 integration checks pass.**
