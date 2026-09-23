// Editorial context stays separate from GitHub's automatically refreshed ranking.
export const projectNotes: Record<
  string,
  { title: string; summary: string; status?: string }
> = {
  "Jetson-Orin-Nano-Super-Case": {
    title: "Jetson Orin Nano Super Case",
    summary:
      "A case for a small AI computer, with space for cooling and storage. Design files are available to print, machine, or adapt.",
  },
  Animus_Ferric: {
    title: "Animus Ferric",
    summary:
      "A coding assistant that runs local AI models. Written in Rust, with permission checks for work on your files.",
  },
  "Animus_1.0": {
    title: "Animus 1.0",
    summary:
      "The original local AI assistant prototype. Its development led to Ferric, where the current work continues.",
    status: "Earlier prototype",
  },
  Animus_GECK: {
    title: "Animus GECK",
    summary:
      "A project setup wizard that turns an idea, requirements, and a definition of done into a brief for an AI coding tool.",
  },
  Animus_Sprint_Loops: {
    title: "Sprint Loops",
    summary:
      "A repeatable process for AI coding tools: plan the work, implement it, check it, and keep a record of what happened.",
  },
};
