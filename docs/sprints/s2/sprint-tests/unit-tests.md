# Sprint 2 Unit / Output Contract Results

- **Intent:** [INT-0001](../../../intents/INT-0001-marketing-search.md), criteria 1–3; T-201, T-202, T-203.
- **Verified source head:** `308d827af696cdb6712fb499b483dd14d3cbcca5`. Validation ran on the final working source before task commits; only the Book ledger changed during those commits. Source working tree is clean at this head.
- **Runner:** `npm run test:site` → **7 passed, 0 failed across 10 indexable pages**.
- `metadata_contract` passed: parsed HTML has distinct titles/descriptions, a single H1/canonical, correct production OG URL and social metadata.
- `structured_data` passed: every JSON-LD block parses; homepage identity and WebSite match site data; both BlogPosting nodes match visible headline, author, publication date and canonical.
- `social_asset` passed: actual PNG is 1200×630, present and nonempty, with matching metadata. Root visually inspected the typographic card: no clipping or invented imagery.
- `marketing_content` and `guide_content` passed: founder/brief and substantive guide survive rendering. First guide check caught a test stemming bug (`mainten` omitted `maintain`); corrected the assertion to recognize the actual maintenance section rather than changing copy to satisfy it.
- Remaining integration-oriented output checks are documented in integration-tests.md. No mocks or stubs.
