// Real open-source project inventory, sourced from github.com/crussella0129.
// Star counts are a snapshot (captured 2026-07-01) — display rounded aggregates
// ("100+ stars") rather than per-repo exact numbers where possible.

export type ProjectCategory = 'agents' | 'rust-tools' | 'cad-3dp' | 'systems';

export interface Project {
  name: string;
  description: string;
  tags: string[];
  category: ProjectCategory;
  url: string;
  stars?: number;
  flagship?: boolean;
}

export const projects: Project[] = [
  {
    name: 'Animus Ferric',
    description:
      'Rust-native agentic coding harness purpose-built for small local models (1B–14B GGUF). Harness-owned constrained decoding, deterministic model-scale policies, trajectory-first observability.',
    tags: ['Rust', 'LLM Agents', 'llama.cpp', 'Local-First'],
    category: 'agents',
    url: 'https://github.com/crussella0129/Animus_Ferric',
    stars: 10,
    flagship: true,
  },
  {
    name: 'Animus',
    description:
      'The original Animus prototype — an open-source, natively running agentic CLI in Python. Deprecated in favor of Animus Ferric, and the first step in the lineage that got us there.',
    tags: ['Python', 'LLM Agents', 'CLI'],
    category: 'agents',
    url: 'https://github.com/crussella0129/Animus',
    stars: 18,
  },
  {
    name: 'Sprint Loops',
    description:
      'A lightweight, agent-agnostic loop engineering protocol for autonomous development. Ships as a Claude Code plugin marketplace, a Codex CLI skill, and an open-harness spec.',
    tags: ['Agent Skills', 'Protocol', 'Claude Code', 'Codex'],
    category: 'agents',
    url: 'https://github.com/crussella0129/sprint-loops',
    stars: 8,
    flagship: true,
  },
  {
    name: 'GECK',
    description:
      'The Garden of Eden Creation Kit (for software): a protocol plus generator that gives CLI agents structured memory and task management across sessions — a fix for context amnesia.',
    tags: ['Agent Skills', 'Python', 'Rust', 'Memory'],
    category: 'agents',
    url: 'https://github.com/crussella0129/GECK',
    stars: 17,
  },
  {
    name: 'MDR',
    description:
      'Massive Download Resilience — an agent skill for Claude Code, Codex, and Antigravity that procures large models from HuggingFace and guarantees the download completes via nested cron jobs.',
    tags: ['Agent Skills', 'HuggingFace', 'Automation'],
    category: 'agents',
    url: 'https://github.com/crussella0129/MDR',
  },
  {
    name: 'oovra',
    description:
      'Rust tool for composing, decomposing, and comparing agentic system prompts from a standardized Markdown + TOML "prompt element" format.',
    tags: ['Rust', 'Prompts', 'Tooling'],
    category: 'agents',
    url: 'https://github.com/crussella0129/oovra',
  },
  {
    name: 'diploid',
    description:
      'Rust framework for serving two llama.cpp instances on one device — CPU and GPU models in tandem — to squeeze the full potential out of a single machine.',
    tags: ['Rust', 'llama.cpp', 'Edge AI'],
    category: 'agents',
    url: 'https://github.com/crussella0129/diploid',
  },
  {
    name: 'Jetson Orin Nano Super Case',
    description:
      'Open-source, 3D-printable desktop case design for Nvidia’s Jetson Orin Nano Super Developer Kit. The most-starred project in the catalog.',
    tags: ['3D Printing', 'CAD', 'Nvidia Jetson'],
    category: 'cad-3dp',
    url: 'https://github.com/crussella0129/Jetson-Orin-Nano-Super-Case',
    stars: 39,
    flagship: true,
  },
  {
    name: 'HexQuest',
    description:
      'Parametric 40×40 hex game-board piece generator for tabletop gaming — CAD-driven game assets you can print at home.',
    tags: ['3D Printing', 'CAD', 'Gaming'],
    category: 'cad-3dp',
    url: 'https://github.com/crussella0129/HexQuest',
  },
  {
    name: 'PreHeat Macros',
    description:
      'Material-specific preheat macros with automatic chamber soak for Klipper 3D printers.',
    tags: ['3D Printing', 'Klipper'],
    category: 'cad-3dp',
    url: 'https://github.com/crussella0129/PreHeat-Macros',
  },
  {
    name: 'Banquo',
    description:
      'A most beautiful terminal: 100% Rust GUI terminal with a verifiable truth/appearance architecture and a layered material engine.',
    tags: ['Rust', 'GUI', 'Terminal'],
    category: 'rust-tools',
    url: 'https://github.com/crussella0129/Banquo',
  },
  {
    name: 'carbide',
    description:
      'DAG-evaluated spreadsheet with tessellating cell shapes (squares, hexes, triangles) and switchable per-cell formula languages — Excel-lite, Python via PyO3, or Rust.',
    tags: ['Rust', 'Spreadsheet', 'PyO3'],
    category: 'rust-tools',
    url: 'https://github.com/crussella0129/carbide',
  },
  {
    name: 'crusst',
    description:
      'Rust-based geometry kernel — early-stage R&D toward native CAD tooling. Exploratory, honest work-in-progress.',
    tags: ['Rust', 'Geometry', 'CAD'],
    category: 'rust-tools',
    url: 'https://github.com/crussella0129/crusst',
    stars: 5,
  },
  {
    name: 'Gitr',
    description:
      'Mass pull/push tool that syncs your whole collection of repos and forks across Git hosts — GitHub, GitLab, Gitea, and more.',
    tags: ['Rust', 'Git', 'CLI'],
    category: 'rust-tools',
    url: 'https://github.com/crussella0129/Gitr',
  },
  {
    name: 'tricorne',
    description:
      'A Fedora remix focused on pentesting and purple-hat tooling.',
    tags: ['Linux', 'Security', 'Python'],
    category: 'systems',
    url: 'https://github.com/crussella0129/tricorne',
    stars: 4,
  },
  {
    name: 'JetMother',
    description:
      'Companion-host setup for the Nvidia Jetson Orin Nano: turns a spare Ubuntu desktop into a purpose-built host with SSH, NAT-isolated networking, remote desktop, and Docker.',
    tags: ['Linux', 'Nvidia Jetson', 'Shell'],
    category: 'systems',
    url: 'https://github.com/crussella0129/JetMother',
  },
];

// Snapshot aggregate across all public repos (own projects), used for the
// rounded "100+ stars" proof claim.
export const TOTAL_STARS_CLAIM = '100+ stars';
