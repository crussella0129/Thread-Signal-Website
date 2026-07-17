# Thread & Signal — Positioning & Marketing Guide

*Written 2026-07-02 as part of the sprint-0 website revamp. Source research:
`sprints/s0/sprint-research/`.*

## The one-line answer: what you're most marketable at

**"AI agents and automation that run on hardware you own."**

Business process automation is the offer companies write checks for — but everyone
sells that. What almost nobody sells, and what your public work uniquely proves, is
the **local/edge version** of it: agentic systems on air-gapped workstations,
on-prem servers, and Jetson-class devices. That's the wedge. Lead with automation
(the known budget line), differentiate with local-first (the defensible niche).

## Why local-first is your defensible niche

Most AI consultancies are cloud-API wrappers; their moat is a prompt library. Your
moat is a **stack of public, verifiable proof** that you can make small models do
real work on real hardware:

- **Animus Ferric** — a Rust harness purpose-built for 1B–14B GGUF models, with
  constrained decoding and a measured capability ladder. Nobody buys "we'll try a
  7B model"; they buy "we benchmarked your workload at L4 on your hardware."
- **diploid** — CPU+GPU llama.cpp serving on one device.
- **Jetson Orin Nano Super Case + JetMother** — you don't just deploy to edge
  hardware, you literally design and print the enclosures. No competitor has that
  photo.
- **MDR** — even your model-downloading is engineered for reliability.

The buyers who need this — defense-adjacent, healthcare, legal, manufacturing,
anyone with proprietary code or regulated data — have real budgets and few
credible vendors. "Privacy by architecture, not by policy" is the sentence to
repeat everywhere.

## The three lanes and who buys each

| Lane | Page | Buyer | What they pay for |
|------|------|-------|-------------------|
| Agents & Automation | /animus, /services | SMB owners & engineering leads with sensitive data or repetitive workflows | Process automation builds; custom harness implementations; edge deployments; local-agent feasibility benchmarks |
| Skills & Training | /skills | Engineering managers adopting agentic tools; platform teams | Custom skills/protocols for their workflows; team workshops (the highest-margin, most repeatable offer) |
| Design & Fabrication | /design | Manufacturers (jigs & fixtures), companies (branded gear), enthusiasts & academics (commissions, lessons) | Commissioned CAD work; 1-on-1 Fusion lessons |

Workshops deserve emphasis: they're productizable (fixed curriculum, per-seat or
per-team pricing), they showcase the skills line, and every workshop attendee is a
warm lead for automation work.

## Positioning sentences (use verbatim)

- Hero: *Custom AI agents, business process automation, and local-first LLM
  deployments — built in Rust and Python, running on your hardware when the cloud
  isn't an option.*
- Animus: *Cloud agents are remarkable — and for a lot of real work, they're not an
  option.*
- Skills: *Your process shouldn't be a hostage of your subscription.*
- The trust move: tell the four-implementation Animus story (Python → Prion → fev →
  Ferric) as engineering honesty. Buyers trust people who show their scars.

## Next marketing moves (in priority order)

1. **Guard the direct-email funnel.** The contact page is deliberately
   form-free (decided 2026-07): no vendor, no spam surface — every channel goes
   straight to charles@threadandsignal.com. The asset is response time: answer
   within one business day, every time. Revisit a form only if volume ever
   makes triage necessary.
2. **Write the "benchmark your hardware" lead magnet.** A blog post (or free
   15-minute consult offer): "Can a 7B model on your hardware actually run your
   workflow? Ferric's L0–L6 ladder answers that." This converts curiosity into
   consults and is unique to you.
3. **Publish 3 cornerstone blog posts** targeting the searches your buyers make:
   (a) "Running coding agents on-prem / air-gapped" (automation buyers),
   (b) "Making Claude Code skills portable to Codex and local harnesses" (skills
   buyers), (c) "The Animus lineage: four harnesses to get local agents right"
   (credibility + link bait for the AI community). Each ends with a service CTA.
4. **Align LinkedIn and GitHub profiles to the site.** LinkedIn headline →
   "AI agents & automation on hardware you own | Thread & Signal"; pin the three
   flagship repos on GitHub; put threadandsignal.com in every profile field
   available. Add the site URL to the READMEs of Animus_Ferric, sprint-loops,
   GECK, MDR, and the Jetson case ("Commissioned work: threadandsignal.com").
   Those repos are your top-of-funnel — the Jetson case alone is 39 stars of
   traffic with no pointer to your business.
5. **Package one workshop and one automation offer with a price.** "Agentic
   Development Workshop — half-day, remote, up to 8 engineers" and "Automation
   Sprint — one workflow automated in two weeks, fixed price." Named, scoped
   offers convert far better than "contact us"; add prices when you're confident.
6. **Submit the site for AI discovery.** llms.txt and JSON-LD are live; also add
   the site to your GitHub org/profile README, and answer relevant questions
   (r/LocalLLaMA, HN threads on local agents) with genuinely useful content that
   links back. AI crawlers weight exactly these sources.
7. **Collect proof continuously.** After every engagement, ask for a two-sentence
   testimonial and (where possible) a case-study paragraph with a number in it
   ("saved 6 hours/week"). Numbers on the services page are the next conversion
   multiplier.

## Brand voice — "Lamplight Atelier" (added sprint 1, 2026-07-02)

The user-approved rebrand direction. All future copy should speak this voice:

- **Master tagline:** "Handwoven automation." Anchor story: *the first
  programmable business machine was a loom — let's build yours.* (Earlier
  draft "we've been weaving ever since" was dropped — it read as claiming we
  invented the loom.)
- **Lane taglines:** Animus — "Intelligence that stays home." · Skills —
  "Skills that outlive subscriptions." · Design — "Drawn, printed, held."
- **Vocabulary:** commission, workshop, bench, woven, thread, signal. CTAs are
  "Commission a build" / "Book a workshop" / "Book a Lesson" — never "Get
  started" or "Learn more".
- **Palette (traditional dye colors on ink):** ground #141210, linen text
  #ece5d8, copper #e8a33d (signal/primary), verdigris #4fb8a8 (thread/skills),
  madder #c2543f (fabrication/design).
- **Type:** Fraunces display serif (the fable voice) + Inter body +
  JetBrains Mono (the machine voice).
- **Rule:** literary but concrete — every poetic line is backed by a factual
  claim (star counts, repo links, named hardware) in the same breath.

## What NOT to sell (for now)

- **Game development as a service** — removed from the site; it diluted the story.
  HexQuest lives on as design proof instead.
- **The CAD platform / geometry kernel as a product** — crusst is honest R&D on
  /projects, not a promise. Revisit only if it earns real traction.
- **Generic "full-stack development"** — you'd be competing with every agency on
  price. Your premium comes from the niche.
