# Release security review — September 23, 2026

Scope: the four-page conversion, public GitHub data, dependencies, contributor access, Actions, branch rules, and Pages publishing. Charles approved going live after this check. Review used source, built artifacts, dependency advisories, and authenticated GitHub APIs; no desktop/browser automation or Cap recording was performed.

## Findings and fixes

| Priority | Finding | Resolution |
| --- | --- | --- |
| P1 | `main` had no protection rules. A future collaborator or compromised write credential could update production without checks. | Active ruleset 23898953 requires a PR, the GitHub Actions `validate` check against the current base, resolved review threads, and blocks force-pushes/deletion. No bypass actors. |
| P1 | npm reported 13 affected packages, including a critical AVIF decoder issue in Astro's image build chain. | Updated Astro to 7.3.4, sitemap to 3.7.4, and transitive dependencies. `npm audit` now reports zero advisories. Install scripts are disabled in CI. |
| P1 | The old build job, its dependencies, and mutable action tags had repository write credentials. | Pinned every action to a verified full commit SHA. Builds have read-only contents access and no persisted checkout credential. A separate Pages/OIDC job publishes only the validated artifact, with no source checkout or package execution. |
| P2 | No code ownership requirement or secret scanning. | CODEOWNERS names Charles for all files. Ruleset 23898954 requires an owner review of contributions and invalidates stale reviews. Secret scanning, push protection, vulnerability alerts, and Dependabot security fixes enabled. |
| P2 | The cached GitHub JSON was validated by the refresh script but not by an offline page build. | A shared validator now rejects unsafe destinations, malformed/duplicate repositories, path syntax, and invalid star counts before the page renders. The page escapes descriptions; its CSP disallows executable scripts. |
| P2 | Actions allowed arbitrary publishers and previously approved outside contributors could run new PR workflows automatically. | Only GitHub-owned actions are permitted, full SHA pinning is required, and all external contributors require workflow approval. No `pull_request_target`, self-hosted runner, or PR deployment path. |

The review ruleset has a **Charles-only, PR-only bypass** so the sole owner can merge his own work. It does not bypass the separate PR/check/integrity ruleset. Anyone later granted repository administration could edit the rules themselves; administrative access remains a trust boundary.

## Evidence

- GitHub collaborator API: only `crussella0129`, role admin; no outside write collaborators.
- Rules and Actions policies were read back from GitHub after application and confirmed active.
- Secret-scanning open-alert API returned an empty list after enablement. The bounded credential-pattern scan of source, scripts, workflows, and project docs found no matches. This is not a guarantee that every possible secret format was detected.
- Astro check: zero errors, warnings, or hints after the dependency upgrade.
- Four GitHub pagination/ranking/fallback tests, three adversarial metadata tests, and six built-site checks pass. The adversarial cases cover executable URLs, host spoofing, traversal, duplicate records, malformed objects, invalid counts, and hostile API destination fields.
- Built pages contain no executable scripts, inline event handlers, forms, frames, objects, or embeds. JSON-LD is serialized with `<` escaped. CSP permits local images and required CSS while disallowing scripts, forms, and base URL changes.
- No source maps, resumes, local settings, credentials, or server application are intentionally included in the static output. The existing local Claude settings file is ignored and excluded from staging.
- Existing checkout-v7 updates on the remote work branch are retained in the release.

## Deployment boundary

Pages is being moved from publishing the writable `gh-pages` branch to the official artifact deployment workflow. Its environment is restricted to `main`; both build and deployment jobs also check the repository and branch. HTTPS remains enforced. The daily data refresh runs through the same validation and deployment boundary. The old `gh-pages` branch is retained as historical material, not an active publishing source.

GitHub star counts can be influenced by public users. That affects ordering among Charles's own public repositories; it cannot add somebody else's repository or executable content. Stars are not represented as client results.

This is a focused release review, not an exhaustive penetration test. GitHub Pages serves the static output; the npm packages run during builds, not as a public application server. Native browser review and optional software clips remain subject to Charles's separate computer-use permission.

## References

- [GitHub secure-use guidance](https://docs.github.com/en/actions/reference/security/secure-use)
- [Repository rules API](https://docs.github.com/en/rest/repos/rules)
- [Custom GitHub Pages workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)
- [Astro image-processing advisory](https://github.com/advisories/GHSA-26w7-cxv4-gfx2)
