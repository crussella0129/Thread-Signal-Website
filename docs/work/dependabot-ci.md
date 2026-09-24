# Dependabot CI repair

- [x] Inspect all 13 open dependency PRs and identify blockers.
- [x] Confirm that PRs #8–#14 are superseded by dependencies already on main; close them.
- [x] Defer TypeScript 7 while the latest Astro checker supports only TypeScript 5 and 6.
- [x] Integrate PRs #17, #18, #19, #21, and #22, resolving the formatter lockfile conflict. Full local validation and workflow lint pass.
- [ ] Validate the combined result and prepare the repair PR.
- [ ] Auto-merge configuration: awaiting explicit approval following automatic approval review.

The original checkout has unrelated documentation edits; this repair uses an isolated worktree.
