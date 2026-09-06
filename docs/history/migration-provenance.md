# Legacy Sprint Loops Migration Provenance

<!-- sprint-loop-migration-v2 -->

- **Book schema version:** 2
- **Migrated at:** 2026-09-06T03:32:53Z
- **Authority:** Historical provenance only. The `docs/` Book is the sole writable Sprint Loops authority.

## Path mappings

- `sprints/` -> `docs/sprints/`
- `agent-tasks/agent-tasks.md` -> `docs/work/tasks.md`
- `agent-tasks/completed-tasks.md` -> `docs/work/completed-tasks.md`
- Other `agent-tasks/` content -> the same relative path under `docs/work/`
- `confidence.txt` -> `docs/work/confidence.txt`
- `decisions.md` -> `docs/history/decisions-legacy.md` (non-authoritative history)

## Content inventory

Each indented row is `type<TAB>sha256-or--<TAB>legacy-path<TAB>Book-path`.

    D	-	agent-tasks	docs/work
    D	-	sprints	docs/sprints
    D	-	sprints/s0	docs/sprints/s0
    D	-	sprints/s0/sprint-plans	docs/sprints/s0/sprint-plans
    D	-	sprints/s0/sprint-research	docs/sprints/s0/sprint-research
    D	-	sprints/s0/sprint-tests	docs/sprints/s0/sprint-tests
    D	-	sprints/s1	docs/sprints/s1
    D	-	sprints/s1/sprint-plans	docs/sprints/s1/sprint-plans
    D	-	sprints/s1/sprint-research	docs/sprints/s1/sprint-research
    D	-	sprints/s1/sprint-tests	docs/sprints/s1/sprint-tests
    F	06055a3e32686121ea692d2862bc1c41f742a753fac30135ba6df95fe0d26b78	sprints/s1/sprint-meta.md	docs/sprints/s1/sprint-meta.md
    F	0ab0abbf83bab4d981d06444d92c8e6375cdb265c2782fa1d06cc31ffe6e9406	sprints/s1/sprint-research/research-report.md	docs/sprints/s1/sprint-research/research-report.md
    F	115b84a08fd4087a7c2595994dc7c0be3cf134ccfe47e0bbf8df145c913664cd	agent-tasks/agent-tasks.md	docs/work/tasks.md
    F	203366aaa7dd1d99b120f712e4f5898b0b400939c35e037391c9e13998aff1a3	sprints/s1/sprint-tests/unit-tests.md	docs/sprints/s1/sprint-tests/unit-tests.md
    F	2126ce6e5d0afc729ed313555011b847cc9cb744af825bae791248b1ec5b13ca	sprints/s0/sprint-research/github-repos.md	docs/sprints/s0/sprint-research/github-repos.md
    F	31d6a9d9481ac174a2afbc4e91b60d22a3a82e3dcce99bd65b9652e1fa8b9e89	sprints/s0/sprint-plans/test-plan.md	docs/sprints/s0/sprint-plans/test-plan.md
    F	356e77d980105cd9fa712c6175b78476b970f4d73238ba45bce193e6798f641e	sprints/s1/sprint-plans/test-plan.md	docs/sprints/s1/sprint-plans/test-plan.md
    F	3ed39c56d9abd077c9007838ac09ad17cb1735c18bf5290b41c143cee9270106	sprints/s1/sprint-tests/critique.md	docs/sprints/s1/sprint-tests/critique.md
    F	47a9442619540068c18e2446668f71af7ba39cf1baea56690ea7d0facbbbfe45	sprints/s0/sprint-tests/dist-check.mjs	docs/sprints/s0/sprint-tests/dist-check.mjs
    F	60de93391c4ee9397889cc6653e7e60421d5f4cc5c5d3ccd878c039dfd8eca5d	agent-tasks/completed-tasks.md	docs/work/completed-tasks.md
    F	66188b46a544082b6d696b888a83e9292646908d489b516c88817892ddff4bc1	sprints/s0/sprint-plans/critique.md	docs/sprints/s0/sprint-plans/critique.md
    F	6a275dd38d04db9726d1a7a0192cea5332201943ec91e5de8182029ef5284f46	sprints/s1/sprint-tests/integration-tests.md	docs/sprints/s1/sprint-tests/integration-tests.md
    F	70b89fe3d8741ec97ba6f703af0a9cba4ee56677c07a7477af9dc56c735f4d82	sprints/s0/sprint-tests/unit-tests.md	docs/sprints/s0/sprint-tests/unit-tests.md
    F	74228e76378c2f827bb660a3fbb84fcbda0926bc14281b6d2df1cb9df85d63ad	sprints/s0/sprint-tests/test-report.md	docs/sprints/s0/sprint-tests/test-report.md
    F	75f16516adc0a13f480e09db8f7661b9200753734dc6dce5dc1f1b8510dc91ac	sprints/s1/sprint-tests/e2e-tests.md	docs/sprints/s1/sprint-tests/e2e-tests.md
    F	77942ea7cf3bf5dd7505777dfd1b21b37c21610b6ccdde4b59ad4bbdf66c20b4	sprints/s0/sprint-research/research-report.md	docs/sprints/s0/sprint-research/research-report.md
    F	89861569e432d6979eb6a0e71fa85f47f38165c26af8b73d0338b0bfff51c522	sprints/s1/sprint-tests/test-report.md	docs/sprints/s1/sprint-tests/test-report.md
    F	90c5bb369f69f149822dfd445ced50765a7cf5368afb9744e9b0ceb5c20fb070	sprints/s0/sprint-plans/build-plan.md	docs/sprints/s0/sprint-plans/build-plan.md
    F	96cb3716cbc912c52a26b98959802d4062e5da24abe00b5dff283725718bb9da	sprints/s1/sprint-plans/critique.md	docs/sprints/s1/sprint-plans/critique.md
    F	9ca1aba993fe7ccf884a9eadc17010edd5018f7dc8d9033fb2d35dfa89a51403	sprints/s0/sprint-tests/e2e-tests.md	docs/sprints/s0/sprint-tests/e2e-tests.md
    F	a839ab0447b2d415fe1732387938b5e06aa9d5aba7ed0f0c927837f0e77027f2	confidence.txt	docs/work/confidence.txt
    F	afedf517b704e64442e3b26678ad914a2b86289a9c3a4370d20f3706aba8fbcc	decisions.md	docs/history/decisions-legacy.md
    F	b7e4bdefb5139d5801f14285ab7c25f7ccb817de19c4cfe5868d141cf32a1163	sprints/s1/sprint-tests/dist-check-s1.mjs	docs/sprints/s1/sprint-tests/dist-check-s1.mjs
    F	b94d05924e283260c341531f83a562df3290051de8ee8ac36126fd332c412b45	sprints/s1/sprint-plans/build-plan.md	docs/sprints/s1/sprint-plans/build-plan.md
    F	d2b051c6ba185955717ce08137fbdc100f4c66e99c6f2e00ca6dca86b94565f9	sprints/s0/sprint-tests/critique.md	docs/sprints/s0/sprint-tests/critique.md
    F	d7758cdb413c5700747e2d16cd17c7f5f40ca967912bfd9f97f05f8c84f32206	sprints/s1/sprint-research/design-audit.md	docs/sprints/s1/sprint-research/design-audit.md
    F	d8690ed4278839fcd1a31f38eb94af6cab9bda2907a3890216554e8307909e27	sprints/s0/sprint-meta.md	docs/sprints/s0/sprint-meta.md
    F	deda62d20f44b05d406babbe2641f0cc8dae2e5de563ac6723585d7be7bb7cf9	sprints/s0/sprint-tests/integration-tests.md	docs/sprints/s0/sprint-tests/integration-tests.md
