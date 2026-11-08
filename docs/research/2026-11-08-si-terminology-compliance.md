# "Super Intelligence (SI)" vs "AI" on the site: compliance review

Date: 2026-11-08. Status: research and recommendation, no copy changed yet.

## Question

PR #43 (merged 2026-10-17) renamed "AI" to "Super Intelligence (SI)" across the
site to match Executive Order 14434. Since then: Democrats won the 2026 midterms,
House Democrats are pushing the Ban Artificial Superintelligence Act as a day-one
priority, and the OCC published a "Super Intelligence" supervisory framework on
2026-11-04. Which wording leaves Thread & Signal most likely to be in compliance,
and least exposed, over the next two years?

## What the site says today (main at 373d953)

About 18 occurrences in 5 source files, plus the positioning doc. The owner
title in src/data/site.ts no longer carries the term (it now reads "Co-owner,
building YardUluv"), and the Yardulum-first homepage has none.

| File | Occurrences | Example |
| --- | --- | --- |
| src/data/project-notes.ts | 5 | "runs local SI models", "an SI coding tool" |
| src/pages/open-source.astro | 4 | "local Super Intelligence (SI) assistants", "SI-assisted" |
| src/content/blog/local-llm-business-workflow.md | 4 | "local SI (Super Intelligence) automation", tag "Local SI" |
| src/pages/contact.astro | 3 | "sets up local Super Intelligence (SI) systems" |
| src/content/blog/hello-world.md | 2 | "Local-first SI (Super Intelligence)" |
| docs/positioning.md | 2 | "Local Super Intelligence (SI) setup is one line at the bottom of About" |

The phrase "superintelligence augmented labor" does not appear anywhere in this
repository's history. If it is in use, it lives in another repo or channel.

## The three regimes, from primary sources where reachable

### 1. Executive Order 14434, "Inaugurating the Era of Super Intelligence"

Signed 2026-09-29, 91 Fed. Reg. 63129. Read via Arnold & Porter and Wiley
summaries; the Federal Register page blocks automated fetches.

- Directs federal agencies to use "Super Intelligence" and "SI" instead of
  "Artificial Intelligence" and "AI" in non-statutory materials, "to the maximum
  extent permitted by law".
- Defines SI as the same thing as "artificial intelligence" in 15 U.S.C. 9401(3).
  It is a rename, not a new category.
- Binds executive agencies only. It imposes no obligation on private parties,
  contractors or vendors, and has no penalty provision. The 2026-10-08 Truth Social
  post calling AI-sayers "the enemy" carries no legal weight.
- Proposed legislative language defining the term is due by 2026-11-28. Only
  Congress can change the statutory definition, and Congress just changed hands.

### 2. OCC Bulletin 2026-54, "Super Intelligence: Supervisory Framework" (2026-11-04)

Read directly at occ.gov. The OCC is the national bank regulator, not a central
bank; the search found no Federal Reserve, ECB or other central bank adopting the
term.

- Footnote 2: SI "refers to the technologies and systems previously encompassed by
  the term 'Artificial Intelligence' as defined in 15 USC 9401(3) as well as the
  promise, potential, and rapidly advancing capabilities of those technologies."
- An examiner resource only. "Nothing in this guide is intended to establish new
  regulatory expectations or set forth enforceable standards." Applies to national
  banks and federal savings associations, not to their vendors or to non-banks.
- Examiners are told not to treat SI as a separate risk category.

Net: the OCC is complying with the EO's vocabulary mandate. It is not evidence
that "SI" is becoming a required term for private businesses.

### 3. Ban Artificial Superintelligence Act of 2026 (H.R. 10538 / S. 5493)

Read directly from govinfo.gov (House text as introduced 2026-09-24).

- "Artificial superintelligence" (Sec. 3(2)): an AI system that "exceeds human
  cognitive performance and capabilities across most domains or tasks" or "has
  sufficient capabilities to plan and execute the destruction or disempowerment of
  humanity".
- "Advanced artificial intelligence system" (Sec. 3(1)): trained on at least 10^25
  integer or floating-point operations, adjusted annually.
- Sec. 9: no person may develop, deploy, acquire, possess, fund, import or transfer
  ASI or systems with "superintelligence precursor characteristics" (which include
  automating AI R&D and resisting shutdown). Sec. 8 and 9(d): advanced AI systems
  are paused and need pre-deployment approval. Sec. 12: a charter is needed to
  develop or distribute an advanced model. Sec. 13: up to 20 years for reckless
  violations by policymaking individuals.
- No provision anywhere regulates marketing, advertising or the use of the word
  "superintelligence".
- Status: referred to House Oversight, no committee action. It needs to pass both
  chambers and survive a presidential veto before 2029, so it is a 2027 to 2029
  signal, not a 2026 rule.

Where Thread & Signal's work falls under this bill if it ever passed: a 27B-class
open-weight model (Qwen-class) trained on roughly 30 to 40 trillion tokens lands
around 5 x 10^24 operations by the standard 6ND estimate, below the 10^25 line.
The 7B models actually recorded in docs/design-studies are two orders of
magnitude below it. Thread & Signal develops none of these models; it deploys
them. Only ASI-grade systems are banned for deployers and possessors.

## The regime that already applies: FTC Section 5

The only AI-related enforcement actually hitting small vendors today is
"AI-washing" under Section 5 of the FTC Act (unfair or deceptive practices).
Law-firm counts put the May 2026 CMG Media action as the 13th such case since
2024, and seven of the last eight were business-to-business claims. Respondents
with fewer than 100 employees have been charged. State attorneys general have
signalled they will follow, and the blue wave gave Democrats new trifectas in at
least five states with AI and consumer-protection bills expected in 2027.

Calling a 7B to 27B local model "Super Intelligence" is a capability claim that
cannot be substantiated. That is the concrete legal exposure in the current
wording, and it exists under either party's reading of the term.

## Weighing it

| Consideration | Keep "Super Intelligence (SI)" | Return to "AI" |
| --- | --- | --- |
| Binding legal requirement to use the term | None. EO binds agencies only. | None. |
| Exposure under the Ban ASI Act (if enacted) | The word invites the "ASI" reading of an agentic coding harness; the bill regulates capability, not vocabulary, so exposure is reputational and discovery-shaped, not statutory. | Neutral. |
| FTC / state AG deceptive-claims exposure | Real. "Superintelligence" overstates a 7B to 27B model. | Low, if paired with honest qualifiers. |
| Term stability | 40 days old, legislative definition due 2026-11-28, Congress flipped. Likely to shift again. | Stable since the 2020 statute (15 U.S.C. 9401). |
| Customer comprehension and search | Prospects search "local AI". "SI" is unfamiliar and collides with the ASI meaning in the news. | Matches how buyers talk. |
| Alignment with docs/positioning.md | Already bans "AI or SI in Yardulum copy"; SI elsewhere is a one-line mention. | Consistent with "plain language, no speculative services". |
| Federal procurement | Agencies will say SI in solicitations; nothing requires vendors to mirror it. | Fine. Mirror the agency's term inside a specific bid if it helps. |

## Recommendation

1. Revert the public copy to "AI" and drop "Super Intelligence" and "SI" entirely.
   Do not pivot to a third coinage such as "intelligently augmented labor": it is
   vaguer than "AI", it is not a term regulators or buyers use, and the honesty
   rules in docs/positioning.md already favour saying what the thing does.
2. Qualify it the way the business actually works: "local AI", "small, specialized
   models that run on your own hardware", "AI-assisted drafting and document
   search with human review". This is accurate, is the opposite of an ASI claim,
   and is what the FTC asks for (claims you can substantiate).
3. Replace "superintelligence augmented labor", wherever it lives, with plain
   descriptions such as "AI-assisted work" or "automation with human review".
4. Keep one factual sentence available, not necessarily on the site, for anyone
   who asks: "Federal agencies now use the term Super Intelligence (SI) for what
   the statute calls artificial intelligence; we use AI."
5. Re-check after 2026-11-28 (EO definition proposal) and when the 120th Congress
   seats in January 2027.

## Proposed copy changes (for the build plan)

| Current | Proposed |
| --- | --- |
| "local Super Intelligence (SI) assistants" | "local AI assistants" |
| "SI-assisted development" | "AI-assisted development" |
| "runs local SI models" | "runs small AI models locally" |
| "an SI coding tool" / "SI coding tools" | "an AI coding tool" / "AI coding tools" |
| "A case for a small SI computer" | "A case for a small AI computer" |
| "sets up local Super Intelligence (SI) systems" | "sets up local AI systems" |
| "Local-first SI (Super Intelligence)" | "Local-first AI" |
| "local SI (Super Intelligence) automation" / tag "Local SI" | "local AI automation" / tag "Local AI" |
| positioning.md: "Local Super Intelligence (SI) setup" | "Local AI setup" |

Most of these are the exact strings PR #43 replaced, so reverting the copy hunks
of 9095a32 and df281da (keeping the Coming Soon page) is the cleanest path.

## Sources

- Arnold & Porter, "What's in a Name?" (2026-10-13): https://www.arnoldporter.com/en/perspectives/blogs/enforcement-edge/2026/10/whats-in-a-name
- Wiley alert on EO 14434 (2026-10-02): https://www.wiley.law/alert-Executive-Order-Rebrands-AI-as-Super-Intelligence-and-Signals-Potential-Federal-Legislative-Changes
- Federal Register entry (not fetchable by tool): https://www.federalregister.gov/documents/2026/10/02/2026-20321/inaugurating-the-era-of-super-intelligence
- OCC Bulletin 2026-54: https://www.occ.gov/news-issuances/bulletins/2026/bulletin-2026-54.html
- Ballard Spahr on the OCC framework: https://www.consumerfinancemonitor.com/2026/11/06/occ-issues-supervisory-framework-for-banks-use-of-super-intelligence-a-risk-based-approach-to-generative-and-agentic-ai/
- ABA Banking Journal on the OCC framework: https://bankingjournal.aba.com/2026/11/occ-releases-framework-for-supervising-artificial-intelligence/
- H.R. 10538 text (govinfo): https://www.govinfo.gov/content/pkg/BILLS-119hr10538ih/html/BILLS-119hr10538ih.htm
- Sanders press release: https://www.sanders.senate.gov/press-releases/news-sanders-casar-introduce-legislation-to-ban-artificial-superintelligence-and-temporarily-pause-advanced-ai-development/
- Ansari day-one remarks: https://www.thestandard.com.hk/world/article/347702/Democrat-calls-for-AI-development-pause-and-superintelligence-ban
- Midterm AI coverage: https://venturebeat.com/technology/what-the-blue-wave-in-the-2026-midterm-election-means-for-the-american-ai-industry-and-businesses , https://www.jenner.com/en/news-insights/client-alerts/blue-wave-will-reshape-state-tech-and-ai-regulation-in-2027 , https://www.cnbc.com/2026/11/04/midterm-election-blue-wave-trump-billionaires.html
- FTC AI-washing: https://www.dlapiper.com/insights/publications/2026/05/ftc-ai-washing-action-underscores-enforcement-in-business-to-business-context , https://natlawreview.com/press-releases/ftc-brings-dozen-ai-washing-enforcement-cases-2025-targeting-overstated-ai
