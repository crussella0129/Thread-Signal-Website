# Website maintenance

The production Astro site has five canonical pages: Home (`/`, Yardulum), How It Works (`/how-it-works/`), Founders Club (`/founders-club/`), About & Contact (`/contact/`) and Open-Source Dev (`/open-source/`, linked from the footer only). The main nav holds How It Works, Founders Club and About; the logo is the Home link. Historical design studies and blog Markdown remain in the repository; they are not additional published pages.

## Editing

- Identity, phone and inquiry wording: `src/data/site.ts`. (330) 357-2440 is the published business line, chosen by Charles on 2026-10-23. Links are exactly `tel:+13303572440` and `sms:+13303572440`, with no sms body. Personal numbers, full resumes and personal emails are still not published.
- Bios: `src/pages/contact.astro`. Charles must confirm any change to his background lines.
- Yardulum figures: `YardPlan`, `SampleEstimate`, `LoopFigure` and `PriceMath` are hand-drawn diagrams of the documented sales loop (model, design, price, proposal) on a synthetic sample yard with sample prices from `src/data/sample-job.ts`. They are not screenshots or customer work. `YardPlan` draws the yard as an angled 3D (isometric) illustration, not a plan or a survey: building heights and the slope of the yard are exaggerated, and each yard figure carries "3D illustration" and "not to scale" (two right-aligned lines at the top right, clear of the roof) and says so in its `<desc>`. Each SVG is named by its `<title>` (`aria-labelledby`) and described by its `<desc>` (`aria-describedby`), so the description is read once (check C3). Tag boxes are wide enough to hold their text with WCAG 1.4.12 text-spacing overrides. Its coordinates come from one isometric projection of the sample lot, so move a point only together with what touches it, and after moving a tag, leader dot or badge, check that it covers no building, tree, bed, edging, shrub, label or other tag. The home figure's edging draw uses the path's measured `getTotalLength()` (192.66) as a literal dash of 193; measure again if the bed outline changes. Keep 'Illustration' and 'Sample prices' on every figure, keep the arithmetic exact (check C5), and never add device frames. Replace or supplement them with a real capture only of a licence-clean property (Charles's own, with his OK).
- Founders Club terms: the home teaser, `src/pages/founders-club.astro` (lead, "What you get", "What we ask", FAQ), both meta descriptions and `public/llms.txt` state one rule: a landscaping company that takes part before Yardulum goes on sale to everyone keeps founder pricing for life, for as long as it stays a member. The site discloses that membership is a monthly subscription that starts when a company joins, before Yardulum is finished, and says what it pays for before and after Yardulum is ready. Every specific term (what "for life" covers, pauses, cancellation, how many hand-built estimates, how helpers who don't pay yet keep the price, which outside services handle member data) lives only in the written agreement, which an Ohio attorney reviews before the first sale. Don't publish draft terms here; check-site rejects the obvious ones. Charles confirms the rule; change every copy together.
- Status words: Works today covers only the property model, two-point measuring with slope, and the offline-reopening web app. Everything else is Being built. Update How It Works 'Where it stands' when something ships: past dates only.
- Line breaks: wrap every hyphenated word in page text in `<span class="nobr">` (the site check fails otherwise), keep a number with its unit with `&nbsp;` (`324&nbsp;sq&nbsp;ft`), and in a Line rise H1 join a phrase with U+00A0 to move it to the next line whole (`"The Founders\u00a0Club."`). On the Yardulum pages the meta description carries its status words ("we're building", "being built", "in development") within the first 155 characters, where search snippets and link previews cut it; the site check enforces this.
- Colour: black and white chrome. Yardulum colours (`--yd-*`) appear only inside figures, the home kicker icon and the social card.
- Black/white colors, type, spacing, and radii: `src/styles/global.css`. Controls and image frames use CSS `corner-shape: squircle` where supported, with rounded-corner fallback. No claim of mathematical G2/G3 continuity is made. See [MDN corner-shape](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/corner-shape).
- Real project images: `src/assets/`; provenance is in `docs/media-sources.md`. Astro generates responsive WebP images. Do not replace real project evidence with generated imagery.
- Logo: the header uses the white lockup from the Signalium framework (`assets/logo/`), copied to `src/assets/logo/`. `public/favicon.ico`, `icon-192.png`, and `apple-touch-icon.png` are drawn from the white mark on black. Derive replacements from the Signalium files. Never redraw or retype the logo.
- Headline entrances: `src/components/HeadlineMotion.astro` splits each page's H1 at build time and animates it with CSS only. Home has a static H1 (the hero figure carries the motion). How It Works, Founders Club and About use Line rise; Open-Source uses Thread. Both fill `backwards` only (check C9). The hero figure plays once on desktop (under 2 s), is static at 760 px and below, and is skipped for reduced motion. Animation CSS must live in the component that renders the animated elements. Timing and easing tokens are in `src/styles/global.css`. Change a headline by editing the `lines` prop; each array item is one line.
- Social preview: `public/social-card-yardulum.svg` (lockup and icon embedded) and its 1200x630 PNG, rendered through Chromium. Its right panel shows the same 3D illustration of the sample yard as the home figure, with the three tags listed under it and "Illustration · sample yard"; it shows no prices. A new card needs a new file name.

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

Validation runs Astro type checks, GitHub pagination/ranking/fallback tests, a production build, and static artifact checks for five pages, fourteen legacy redirects, metadata, the phone and footer contract, sample-price labelling and arithmetic, copy guardrails, CSS motion rules, images, the sitemap, contact links, and the rendered project ranking. The prior hero-motion and sprint 0/1 page-count assertions described the retired site and are no longer release gates; historical sprint reports are retained. Before outreach, run the xb harness with `--engines=pwwebkit --devices=iphone15-visible` and confirm Call and Text end above 640 px on `/`.

If the local Windows npm shim is broken, use `C:\Program Files\nodejs\npm.cmd` and prepend `C:\Program Files\nodejs` to the current process PATH. In a restricted environment set `ASTRO_TELEMETRY_DISABLED=1` to avoid writing a global telemetry directory. Do not change the user's global npm installation to run this site.

## Dependency updates

Dependabot version and security updates both target `main`, the branch that deploys; `main` needs a passing `validate` check and the owner's review to merge. Test updates with `npm ci --ignore-scripts`, `npm audit --audit-level=high`, and `npm run validate` before merging. Keep related updates together when their package or lockfile edits overlap.

The latest `@astrojs/check` (0.9.10, checked September 24, 2026) accepts TypeScript 5 and 6. TypeScript 7 fails at `npm ci` with a peer-dependency conflict. `.github/dependabot.yml` temporarily ignores TypeScript versions 7 and later; remove the bound once the checker supports them. Do not bypass peer dependency resolution or disable the type check to make such an update pass.

Prettier's Astro plugin 1.x can reformat existing Astro source differently. This dependency repair preserves source formatting; a later `npm run format` may produce formatting-only changes.

## Publication

**Charles approved this conversion for publication on September 23, 2026, after a security check.** See `docs/security-review-2026-09-23.md` for findings and applied repository protections. Computer use (including browser automation and Cap recording) still requires Charles's explicit go-ahead.

Validate the final revision and use a PR into `main`. Active repository rules require passing `validate` checks and block direct updates, force-pushes, and deletion. Contributions require Charles's code-owner review; his PR-only review bypass supports his own changes, while the separate integrity rules remain enforced. Rule payloads are versioned under `.github/`; editing those JSON files does not itself change GitHub's live configuration.

Build and dependency execution have read-only credentials. A separate Pages/OIDC job publishes the artifact from `main` without checking out or executing source. The Pages environment allows only `main`; `gh-pages` is retained as historical output and is no longer the publishing source. All actions are pinned, only GitHub-owned actions are allowed, and external contributors require approval before their Actions run. Secret scanning, push protection, and Dependabot alerts/security fixes are enabled.

Verify all five live pages, redirects, images, inquiry links, and the GitHub snapshot date after deployment. Test the link preview in iMessage and Android Messages after deploy, before texting the link. Text only canonical URLs (https://threadandsignal.com/, /how-it-works/, /founders-club/, /contact/): /yardulum, /founders and /about are redirect stubs for saying out loud, and their HTML carries no preview card. Keep the site a marketing site: no payments, checkout or Stripe links (GitHub Pages terms). For rollback, revert the release through a checked PR rather than force-pushing. The content security policy disallows executable JavaScript; adding interactive code requires a deliberate security review and CSP update.

Retired routes redirect directly to the closest relevant page in `astro.config.mjs`. No old route is in the sitemap. Adding another page requires a deliberate scope decision and an update to the site contract test.
