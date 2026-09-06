# GitHub Repo Inventory — crussella0129 (captured 2026-07-01)

Own (non-fork) repos relevant to the site, by star count:

| Repo | ★ | Lang | Description (abridged) |
|------|---|------|------------------------|
| Jetson-Orin-Nano-Super-Case | 39 | — | Open source desktop case design for Nvidia's Jetson Orin Nano Super Developer Kit |
| Animus (deprecated prototype) | 18 | Python | Original open-source agentic CLI; superseded by Animus_Ferric |
| GECK | 17 | Python | Garden of Eden Creation Kit — protocol + generator giving CLI agents structured memory/tasks across sessions (fixes "context amnesia") |
| Animus_Ferric | 10 | Rust | Rust-native agentic coding harness for small local models (1B–14B GGUF); harness-owned constrained decoding, deterministic model-scale policies, trajectory-first observability |
| sprint-loops | 8 | Shell | Lightweight, platform-agnostic protocol for autonomous development; ships as Claude Code plugin marketplace, Codex skill, and open-harness spec |
| Scribblings | 6 | — | Writings on mathematics, philosophy, humanity's role regarding AI |
| crusst | 5 | Rust | Rust-based geometry kernel (early-stage R&D) |
| tricorne | 4 | Python | Fedora remix focused on pentesting / purple-hat tooling |
| Gitr | 1 | Rust | Mass pull/push tool across all Git hosts |
| HexQuest | 1 | — | Parametric 40x40 hex game board piece generator |
| PreHeat-Macros | 1 | — | Material-specific preheat macros w/ chamber soak for Klipper 3D printers |
| diploid | 1 | — | Rust framework serving two llama.cpp instances (CPU+GPU in tandem) on one device |
| linux-nivida-troubleshooting | 1 | — | Nvidia-on-Linux troubleshooting guide |
| Steamd-Artix | 1 | Shell | Artix Linux on Steam Deck walkthrough + automation |
| MDR | 0 | — | Massive Download Resilience — agent skill ensuring successful large-model downloads from HuggingFace via nested cron jobs |
| carbide | 0 | Rust | DAG-evaluated spreadsheet with tessellating cell shapes and switchable per-cell formula languages (Excel-lite, Python via PyO3, Rust) |
| Banquo | 0 | Rust | 100% Rust GUI terminal; verifiable truth/appearance architecture, layered material engine |
| oovra | 0 | Rust | Composition/decomposition/comparison of agentic system prompts (.md + TOML prompt elements) |
| crussnet | 0 | Rust | Tailnet-native remote access controller (Rust + Axum + HTMX) |
| LuxLex | 0 | — | Knowledge graphing marrying .md with formula-relationship cells |
| .lux | 0 | — | LightBooks — plain-text doc format for human+AI first-class consumers |
| fev | 0 | Go | Local-first agentic CLI harness (Animus lineage, dormant) |
| JetMother | 0 | Shell | Companion-host setup for Jetson Orin Nano |
| bent-oxide | 0 | — | AUR-style exploit-patching repo concept |
| rusty | 0 | Rust | Rust learning resource app |
| law-of-the-jungle | 0 | Python | Multi-agent LLM survival simulation |

Animus lineage (for the /animus story): **Animus (Python, 18★) → Animus_Prion (Go) → fev (Go) → Animus_Ferric (Rust, active)**.

Ferric's three convictions (from README, quote-ready):
1. The harness should own decoding — constrained generation makes malformed tool calls impossible rather than repairable.
2. Behavior should scale to the model, deterministically — ModelProfile → RunPolicy pure function; small models get small steps.
3. The trajectory is the source of truth — versioned JSONL trace, replayable and diffable.
