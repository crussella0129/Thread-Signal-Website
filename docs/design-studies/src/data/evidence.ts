const snapshot =
  "https://github.com/crussella0129/Animus_Ferric/blob/51af84e933c0f6ff4a42f1508cb9aefad00847c5";

export const evaluation = {
  name: "Animus Ferric",
  date: "August 26, 2026",
  model: "Qwen2.5-Coder-7B-Instruct Q4_K_M",
  report: `${snapshot}/docs/sprints/s113/sprint-tests/test-report.md`,
  trace: `${snapshot}/docs/sprints/s113/control-artifacts/evidence-screens/screen-004/traces/autonomy-1787781412661-27096-0/trial-001-H01-recovery-single-evidence-s01.jsonl`,
  rows: [
    { sku: "z", stock: 2, point: 5, order: "8" },
    { sku: "a", stock: 8, point: 4, order: "None" },
    { sku: "b", stock: 0, point: 3, order: "6" },
  ],
  expected: '[{"sku": "b", "order_qty": 6}, {"sku": "z", "order_qty": 8}]',
};

// Compact "recent builds" list for the homepage: just enough to show Charles
// makes real devices do useful things. Verified 2026-09-13 (git ls-remote); an
// entry without a resolving public repo omits `url` and renders as plain text.
// No client outcomes or performance claims. SpecuLex is honestly in development.
export interface Build {
  name: string;
  blurb: string;
  url?: string;
  status?: string;
}

export const builds: Build[] = [
  {
    name: "Animus Ferric",
    blurb: "local AI agents",
    url: "https://github.com/crussella0129/Animus_Ferric",
  },
  {
    name: "sdr.rs",
    blurb: "software-defined radio in Rust",
    url: "https://github.com/crussella0129/sdr.rs",
  },
  {
    name: "SpecuLex",
    blurb: "a non-destructive book-scanning table",
    status: "in development",
    url: "https://github.com/crussella0129/SpecuLex",
  },
];

export const process = {
  name: "Sprint Loops",
  repository: "https://github.com/crussella0129/Animus_Sprint_Loops",
  task: "https://github.com/crussella0129/Thread-Signal-Website/blob/8f19345941dc44331d336b353051dd76c7478d75/docs/work/completed-tasks.md#L167-L173",
  checks:
    "https://github.com/crussella0129/Thread-Signal-Website/blob/8f19345941dc44331d336b353051dd76c7478d75/docs/sprints/s2/sprint-tests/test-report.md",
  release:
    "https://github.com/crussella0129/Thread-Signal-Website/blob/8f19345941dc44331d336b353051dd76c7478d75/docs/sprints/s2/sprint-tests/deployment.md#L13-L21",
  guide: "https://threadandsignal.com/blog/local-llm-business-workflow/",
};
