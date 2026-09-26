# Website maintenance

The production Astro site has four canonical pages: Home (`/`), Services Offered (`/services/`), Open-Source Dev (`/open-source/`), and About & Contact (`/contact/`). The black design replaces the previous marketing site. Historical design studies and blog Markdown remain in the repository; they are not additional published pages.

## Editing

- Identity, shared email, and inquiry wording: `src/data/site.ts`.
- Services and planning estimates: `src/pages/services.astro`. Charles approved these ranges for the preview on September 23, 2026. They are proposed service budgets, not market benchmarks or promises about completed client work.
- Bios: `src/pages/contact.astro`, based on the two resumes supplied by Charles. Full resumes, private phone numbers, and personal emails are not published. Darian's broadcast assistance is mentioned without advertising equipment-dependent production services.
- Black/white colors, type, spacing, and radii: `src/styles/global.css`. Controls and image frames use CSS `corner-shape: squircle` where supported, with rounded-corner fallback. No claim of mathematical G2/G3 continuity is made. See [MDN corner-shape](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape).
- Real project images: `src/assets/`; provenance is in `docs/media-sources.md`. Astro generates responsive WebP images. Do not replace real project evidence with generated imagery.
- Logo: the header uses the white lockup from the Signalium framework (`assets/logo/`), copied to `src/assets/logo/`. `public/favicon.ico`, `icon-192.png`, and `apple-touch-icon.png` are drawn from the white mark on black. Derive replacements from the Signalium files. Never redraw or retype the logo.
- Social preview: `public/social-card.svg` (with the lockup embedded) and its 1200 x 630 PNG.

## GitHub project refresh

`npm run refresh:github` retrieves every page of public repositories owned by `crussella0129`, excludes forks, sorts by stars descending (name breaks ties), and saves the top five to `src/data/github.json`. The public API needs no token for local use; `GITHUB_TOKEN` is optional and used only in the build process.

Repository names, descriptions, counts, and URLs come from GitHub. Short editorial descriptions live separately in `src/data/project-notes.ts`; an unfamiliar new entrant falls back to its repository description. Earlier prototypes remain honestly labeled. GitHub content is rendered as escaped text, never raw HTML.

The deployment workflow is scheduled daily at 09:17 UTC and refreshes before each deployment. It restores the last successful snapshot from the Actions cache, falling back to the committed copy when no cache exists. A failed or incomplete API response preserves the old data and its date; it never empties the project list or invents fresh numbers. Cache storage is best-effort, so the committed copy remains important. A fresh successful run replaces the snapshot atomically. Ordinary `npm run build` works offline from the snapshot.

A scheduled build is periodic, not a real-time browser feed. The displayed date is the snapshot date. The daily schedule becomes active only when the approved workflow reaches the default branch. GitHub can delay scheduled runs or disable schedules on inactive repositories; maintainers should check Actions if the displayed date becomes stale.

## Verification and local preview

```sh
npm ci
npm run refresh:github
npm run format
npm run validate
npm run preview -- --host 127.0.0.1 --port 4324
```

Validation runs Astro type checks, GitHub pagination/ranking/fallback tests, a production build, and static artifact checks for four pages, nine legacy redirects, metadata, images, the sitemap, contact links, and the rendered project ranking. The prior hero-motion and sprint 0/1 page-count assertions described the retired site and are no longer release gates; historical sprint reports are retained.

If the local Windows npm shim is broken, use `C:\Program Files\nodejs\npm.cmd` and prepend `C:\Program Files\nodejs` to the current process PATH. In a restricted environment set `ASTRO_TELEMETRY_DISABLED=1` to avoid writing a global telemetry directory. Do not change the user's global npm installation to run this site.

## Publication

**Charles approved this conversion for publication on September 23, 2026, after a security check.** See `docs/security-review-2026-09-23.md` for findings and applied repository protections. Computer use (including browser automation and Cap recording) still requires Charles's explicit go-ahead.

Validate the final revision and use a PR into `main`. Active repository rules require passing `validate` checks and block direct updates, force-pushes, and deletion. Contributions require Charles's code-owner review; his PR-only review bypass supports his own changes, while the separate integrity rules remain enforced. Rule payloads are versioned under `.github/`; editing those JSON files does not itself change GitHub's live configuration.

Build and dependency execution have read-only credentials. A separate Pages/OIDC job publishes the artifact from `main` without checking out or executing source. The Pages environment allows only `main`; `gh-pages` is retained as historical output and is no longer the publishing source. All actions are pinned, only GitHub-owned actions are allowed, and external contributors require approval before their Actions run. Secret scanning, push protection, and Dependabot alerts/security fixes are enabled.

Verify all four live pages, redirects, images, inquiry links, and the GitHub snapshot date after deployment. For rollback, revert the release through a checked PR rather than force-pushing. The content security policy disallows executable JavaScript; adding interactive code requires a deliberate security review and CSP update.

Retired routes redirect directly to the closest relevant page in `astro.config.mjs`. No old route is in the sitemap. Adding another page requires a deliberate scope decision and an update to the site contract test.
