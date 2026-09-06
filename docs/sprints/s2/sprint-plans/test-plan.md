# Sprint 2 Test Plan

## Intent Traceability
| Intent | Acceptance criterion | Build task / EARS clause | Verification |
|---|---|---|---|
| [INT-0001](../../../intents/INT-0001-marketing-search.md) | 1 | T-201 visible offer/identity/brief | marketing_content, browser_lead_path |
| [INT-0001](../../../intents/INT-0001-marketing-search.md) | 1 | T-201 supported public claims | public_claims_review |
| [INT-0001](../../../intents/INT-0001-marketing-search.md) | 2 | T-202 guide and links | guide_content, internal_links, browser_guide |
| [INT-0001](../../../intents/INT-0001-marketing-search.md) | 3 | T-203 metadata and sitemap | metadata_contract, structured_data, sitemap_coverage, social_asset |
| [INT-0001](../../../intents/INT-0001-marketing-search.md) | 4 | T-204 validation/CI and Loop publication | astro_check, build_output, legacy_regressions, browser_mobile, live_deployment |
| [INT-0001](../../../intents/INT-0001-marketing-search.md) | 5 | T-204 current substrate/Book | book_integrity, upstream_version |

## Unit Tests
- **Intent:** [INT-0001](../../../intents/INT-0001-marketing-search.md)
- `metadata_contract`: parse generated HTML, exactly one title/description/H1/canonical, distinct titles/descriptions, absolute production URLs, matching OG fields.
- `structured_data`: parse all JSON-LD; assert homepage identity/website and articles' author/headline/date/canonical match HTML.
- `social_asset`: PNG exists, nonempty, dimensions agree with metadata. No test that merely mirrors copy implementation.

## Integration Tests
- **Intent:** [INT-0001](../../../intents/INT-0001-marketing-search.md)
- `astro_check`, `build_output`: npm run check and build succeed.
- `sitemap_coverage`: generated sitemap URLs equal canonical page set; no portfolio/product aliases.
- `internal_links`: resolve local links/assets/fragments, including guide and direct mailto; no missing targets.
- `marketing_content`, `guide_content`: rendered identity, offers, email-brief encoding and article sections survive build, with substantive manual editorial review.
- `public_claims_review`: manually compare changed capability/licensing/portability/privacy copy to public source and existing identity; no perpetual license, guaranteed action correctness, universal harness compatibility, fabricated customer results or blanket deployment privacy claims. Inbound home/services guide links belong to T-201 and are finally resolved by T-204 internal_links.
- `legacy_regressions`: migrated s0/s1 checks execute with corrected roots; update only explicitly superseded exact-copy assertions and record them.
- `book_integrity`, `upstream_version`: installed helpers confirm current substrate, valid tracked Book and version 0.22.0 matching upstream manifest.

## End-to-End Tests
- **Status:** possible
- **Intent:** [INT-0001](../../../intents/INT-0001-marketing-search.md)
- `browser_lead_path`: desktop home → services → contact; mailto opens no message automatically, decoded href has correct recipient and useful brief; plain email remains.
- `browser_guide`: home/services → guide → contact; author and readable sections present, keyboard focus visible.
- `browser_mobile`: narrow viewport navigation opens/closes; no horizontal overflow or hidden CTA; read page with reduced motion and JavaScript-disabled browser if available.
- `live_deployment`: after one sprint PR merge, require successful deployment run for the merged SHA; fetch custom-domain homepage, services, guide, contact, social image, robots and sitemap and verify the new content. Rankings/indexing are not a pass condition.
- Before the bundle's required close-before-checkpoint boundary, report `live_deployment` as pending and keep INT-0001 active. Local test verdict covers implementation only; append actual deployment evidence before intent realization.
