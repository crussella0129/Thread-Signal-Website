# INT-0002 — A minimal, work-led homepage that sells in plain language

<!-- sprint-loop-intent-v2 -->
- **Intent ID:** INT-0002
- **State:** proposed
- **Work evidence:** none
- **Completion evidence:** none
- **Code evidence:** none
- **Test evidence:** none
- **Documentation evidence:** none

## Intent
Replace the wordy homepage opening with a single, radically simplified
composition that lets real work do the selling. Keep the monochrome treatment
Charles endorsed (white text on near-black), lead with one plain-language
promise, and make an actual artifact — the Jetson Orin Nano enclosure Charles
designed — the page's hero proof rather than a paragraph of service copy. State
the two things a visitor can pay for (a custom tool that automates a repeating
task; local AI set up and tested on their own computer) in plain words, and give
exactly one action to start a conversation.

Non-goals for the sprint advancing this intent: publishing to the live domain,
rolling the direction across the rest of the site, adding motion, or introducing
new palettes/typefaces beyond the endorsed monochrome sans system. The homepage
composition is produced and reviewed as a local study first; production
integration and publication are separate, later, explicitly authorized steps.

## Acceptance criteria
1. A first-time visitor sees, without scrolling on a normal desktop viewport, a
   one-line plain-language statement of what Charles builds and one clear action
   to start a conversation — with no jargon, acronyms, or metaphor required to
   understand the offer.
2. Real work carries the page: the Jetson Orin Nano enclosure appears as a
   prominent, honestly captioned hero artifact (public project, not a client
   outcome), and the two sellable offers are conveyed in at most two short
   plain-language lines rather than descriptive paragraphs.
3. The page is meaningfully simpler than the current 61-word offer page: fewer
   words and fewer distinct blocks, with a single primary action and no invented
   dashboards, decorative diagrams, or unexplained technical imagery.
4. Monochrome white-on-black is preserved; all content is present with
   JavaScript disabled; the layout, focus states, contrast (body ≥ 4.5:1, large
   text/UI ≥ 3:1), and 44px touch targets hold at 360, 390, 768, and 1440 CSS
   pixels and at 200% zoom.
5. The composition builds and passes local Astro/type checks and the study's
   verification checklist. No push or deployment occurs while this intent is
   `active`; realization of publication is out of scope for the initiating
   sprint.

## Rationale
Direct feedback: the monochrome look is liked, but the copy "isn't selling
anything" and is "a bunch of words." Charles specifically endorsed the portfolio
(work-led) direction over the case-study opening, and singled out the Jetson
Orin Nano section as working especially well against the new color scheme.
Showing a concrete, well-made object communicates capability faster than a list
of services, and it sidesteps the honesty problem of foregrounding a software
evaluation that was recorded as a failure. Fewer words with one strong visual is
both what Charles asked for and a stronger sales instrument.

## Alternatives
- Keep the two-service word-block offer page (rejected: the copy is what Charles
  found unpersuasive and wordy).
- Lead with the Animus Ferric evaluation as the hero (rejected: it is an
  honestly-labeled failed run and gives a single negative result too much
  prominence for a homepage; better kept as a linked, secondary detail).
- Add motion or a second palette to differentiate (rejected: the monochrome
  treatment is already endorsed and the request is for less, not more).
- Publish immediately (rejected: production deploy requires visual sign-off and
  an explicit authorization per project practice).

## Consequences
- Leading with a hardware enclosure risks implying Charles sells hardware; the
  hero copy and caption must tie the object to the broader "software, hardware,
  and local AI, built to order" capability so the automation/local-AI revenue
  lines stay legible.
- Cutting service paragraphs shifts persuasion onto one image and one line, so
  those must be strong and the single action unambiguous.
- This direction will eventually supersede parts of INT-0001's homepage
  presentation; INT-0001 stays realized (its live marketing pages are
  unaffected) until a later sprint integrates and publishes this composition.
- The study remains isolated from the production Astro app; nothing ships until
  a separate authorized publication step with live verification.

## Transition history
- 2026-09-13: created as `proposed` from Charles's feedback that the monochrome
  offer page is liked but too wordy and unpersuasive, his preference for the
  work-led ("portfolio") opening, and his endorsement of the Jetson Orin Nano
  section against the new color scheme.
