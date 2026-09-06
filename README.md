# Thread-Signal-Website
The official [Thread & Signal](https://threadandsignal.com/) website. Astro generates the static site; GitHub Pages publishes it from `gh-pages` after a validated change reaches `main`.

```sh
npm ci
npm run dev
npm run validate
```

See [the workshop manual](docs/MAINTENANCE.md) for publishing and editing, [positioning](docs/positioning.md) for voice, and [the Project Book](docs/README.md) for sprint state.

Sprint Loops **0.22.0**, Book schema **2**, substrate contract **4** are loaded for this repository. Verified against the upstream plugin manifest at `0bdbe66f3f2b82584e4f8b44cbd3f5101f0dc69f` on 2026-09-06. Invoke `/sprint-loop:sprint-loop` from the installed plugin; run its `check-substrate.sh`/`deploy-substrate.sh` helpers from this repository when upgrading. Sprint work uses persistent `codex/work`, with one checkpoint PR to `main`; the remote profile keeps its default human-approval policy. Publication was explicitly authorized for sprint 2.

No task-local settings or credentials belong in the repository. The existing `.claude/settings.local.json` remains local.
