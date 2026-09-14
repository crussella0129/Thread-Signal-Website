# Thread & Signal redesign plan

Date: 2026-09-13  
Status: The first two studies were reviewed and superseded by a short sales page. Production integration and publication remain pending.

Latest review: Charles liked the monochrome treatment but found the designs too
wordy and unpersuasive. The current local homepage leads with a plain offer to
automate repetitive work. It presents just two purchasable services: a tool for
one recurring task, and an AI setup tested on the buyer's own computer. Project
stories, graphics, process explanations, and the evaluation table are removed
from the opening. A quote email and a small work link provide the next steps.
White text on black follows Charles's stated visual preference. This revision
supersedes the earlier recommendation to lead with a full portfolio.

Revision: incorporates Charles's supplied visual-style guide. The earlier
recommendation to retain the warm dark palette and Fraunces/Inter pairing is
superseded by the reference and composition process below.

The completed [study package](../design-studies/README.md) contains portfolio and
case-study openings, a desktop/mobile comparator, verified project assets and
source notes, and the exact visual specification. The portfolio opening is the
recommended homepage foundation. Its broader offer precedes the evidence; the
case-study opening gives a single failed evaluation too much prominence for the
homepage, but provides a useful project-detail structure. This is a design
recommendation, not a measured conversion finding or a user approval.

The software evidence is an honestly labeled historical evaluation, not a fresh
model run or a successful client outcome. The studies are isolated from the
production Astro application and include no publication action.

## Outcome

A first-time visitor can explain what Charles builds, see credible evidence of
his work, and find a practical way to discuss a project. The visual identity
should feel deliberate even with all animation disabled.

The working positioning is an independent engineering studio specializing in
business automation and local AI. The primary visitor is a small-business owner
or technical lead with a recurring workflow to improve. Workshops and fabrication
remain available, with supporting prominence. This is a proposed hierarchy for
the site, not a claim that the business model is settled.

The attached conversation is feedback to evaluate, not an implementation
instruction. The public Threads replies were inaccessible behind login. This
plan draws on the attached conversation, the live site, and repository review.
Charles subsequently supplied [The Claude house style specimen](https://claude.ai/public/artifacts/37cb0fd0-c3a9-457e-bd1b-745a4c1009fa),
which was read and inspected in its cream and midnight variants. Its useful
demonstration is that changing colors leaves the same composition and decorative
habits in place. Treat its markers as design-review questions, not a validated
detector of AI authorship or a universal ban on familiar design tools.

## 1. Establish a concrete design brief

**Creative direction: an authored portfolio of working software and useful
objects.** Introduce Charles and a specific piece of work together. Make the
artifact, its explanation, and the connection to a service the memorable parts
of the page. Broad adjectives such as "warm," "editorial," or "human" are not
sufficient instructions for choosing a visual system.

Keep the Thread & Signal name. Reassess the current wordmark treatment, palette,
font pairing, tagline placement, and section templates against concrete examples.
Removing ornament while keeping the same composition is not the redesign target.

### Inspected references

Inspected on 2026-09-13. Each informs a particular decision rather than serving
as a template for the whole site.

| Reference                                      | Observed decision                                                                                                                       | Application and limits                                                                                                                                                                          |
| ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Panic](https://panic.com/)                    | Named software, games, and hardware provide recognizable subjects, with distinct product artwork and short category descriptions.       | Give real projects recognizable identities and explain their purpose directly. Its large promotional opening, three-up app arrangement, and game-publisher tone do not establish our layout.    |
| [Playdate](https://play.date/)                 | A large image of the actual device leads; internal and in-hand views explain construction and scale, and SDK screenshots show software. | Select enclosure views that explain fit, construction, or use. Use Charles's material at a scale appropriate to a supporting project; the yellow identity and shopping flow belong to Playdate. |
| [Bartosz Ciechanowski](https://ciechanow.ski/) | The Moon article connects readable explanations with working visual demonstrations.                                                     | Pair a software example with the question it answers and an observable result. Adapt this relationship, not the article's length, palette, or simulation complexity.                            |

### Composition before styling

Prepare the actual content inventory and lead artifact first, including text
lengths and image proportions. Then make **two grayscale desktop studies**, with
one narrow-screen adaptation each:

- **Recommended: a portfolio opening.** A compact introduction and contact link
  lead into one large, unframed project artifact with an adjacent or immediately
  following explanation. Supporting work varies in size according to its content.
- **Alternative: a case-study opening.** Introduce a specific task, then show its
  actual input and result together, with a short explanation of Charles's role
  and a visible route to discussing similar work.

Use the same verified material and offer in both. They must differ in information
arrangement and emphasis, not simply font or background color. Develop only the
stronger study into the complete homepage. The later content outline describes
priorities, not mandatory identical bands or alternating rows.

For the chosen composition, record exact type families, weights, tracking, line
heights, spacing, background/text values, and interaction treatments before styled
implementation. Begin with a restrained sans-led study; serif display type must
have a specific reason to return. An arbitrary fashionable replacement font or
palette is not evidence of differentiation.

| Element    | Proposed direction                                                                                                                                                                                                                                                                                           |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Color      | Choose explicit values with the real images present. Document roles for the primary action, ordinary links, focus, text, boundaries, and data. A brand accent must not automatically tint every rule, icon, heading, and chart. Accessible shared colors are acceptable; novelty does not require more hues. |
| Typography | Specify the stack and scale from rendered studies. Fraunces and Inter are not prescribed. Use sentence-case headings with natural emphasis, monospace for actual code/output, and labels only when they add information.                                                                                     |
| Layout     | Let text length, image proportions, and the reader's question shape each section. Use aligned edges and readable measures. Use whitespace or rules for actual grouping; do not replace every card with an identically ruled row.                                                                             |
| Identity   | Retain the name; evaluate the wordmark and tagline in the complete composition. Use literal navigation and action labels. Express authorship through Charles's work and explanations.                                                                                                                        |
| Imagery    | Real software captures, actual objects, or diagrams explaining a documented system. Each image earns its space by showing something specific.                                                                                                                                                                |
| Decoration | Remove the homepage waveform plate, background canvas, crosshatching, glowing buttons, gradient lettering, and ornamental dividers. Remove equivalent decorative treatments on secondary pages during rollout.                                                                                               |
| Motion     | Static content is visible immediately. Keep brief interaction feedback and necessary menu transitions; respect reduced motion. A later demonstration can use explicit playback controls if movement helps explain the work.                                                                                  |

The prototype brief excludes decorative status lamps, ticker bars, repeated
eyebrows, arbitrary section numbers, invented dashboard frames, and icon badges
without a navigational purpose. Standard controls remain standard and accessible.
Boxes, labels, diagrams, and color are appropriate when they carry information.
An engineering business is not a reason to add terminal chrome, blueprint grids,
specimen numbers, coordinates, or wires as atmosphere.

Deliverables: the annotated references above, two composition studies, and one
selected direction with exact tokens and a rationale for its major choices.

## 2. Prepare the proof and homepage copy

The current public asset directory contains branding files, not project photos
or screenshots. Preparing evidence is an early dependency.

| Material         | What to prepare                                                                                                                                                            | Role                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Animus Ferric    | One reproducible, understandable task with its input, output, relevant configuration, and a readable capture of the actual run. Verify the current project behavior first. | Preferred lead example for local AI.                                                         |
| Sprint Loops     | One documented example showing how a task moves through planning, implementation, and verification, with a real artifact from the process.                                 | Supporting software/process example; alternative lead if it explains the offer more clearly. |
| Jetson enclosure | An existing usable photograph or an actual CAD render, with a caption explaining Charles's design contribution.                                                            | Supporting evidence of fabrication and work across software and hardware.                    |
| Charles          | A short first-person introduction. Use an existing suitable portrait or workspace photo if available; the design must also work without one.                               | Personal authorship and direct working relationship.                                         |

For each selected project, record the source, capture date or version, what it
demonstrates, Charles's contribution, and its limitations. Introduce it as public
project work unless a genuine client engagement is documented. Do not imply
client outcomes, invent performance figures, or treat old star counts as current.
Use neutral sample data for demonstrations. Synthetic images must not stand in
for evidence of a real build.

Before choosing a format, write the question each artifact answers. A software
example might show the input, resulting output, and point of human review. A
terminal capture is useful only when its readable contents demonstrate something
the caption cannot. Crop for understanding while keeping enough context to verify
the result. A real screenshot rendered too small to interpret is still a weak
visual. Diagrams must explain actual relationships rather than signal "technical."

Start with one strong software example and two shorter supporting entries. Use
existing public project material where suitable. If the lead example cannot be
verified, prepare an honest demonstration before release. Labeled placeholders
are acceptable during layout exploration, not in the released showcase.

Draft hero copy:

> **Automate the work your team keeps repeating.**
>
> I build custom software and local AI systems around your workflows, tools, and
> hardware. Start with one recurring task and a clear definition of success.

Primary action: **Discuss a workflow**, linking to the contact page.  
Secondary action: **See selected work**, linking to the homepage work section.  
Byline: **Charles Russella · Independent developer and designer · Ohio**.

The contact page explains the assessment and offers the existing editable email
brief. The wording should make clear that scope, price, and timing are agreed
before paid work starts; an inquiry is not a commitment to commission a build.

## 3. Design and implement the homepage first

Required information, with arrangement resolved by the composition studies:

1. **Header:** wordmark, Work, Services, About, Writing, and Contact. Work and
   Writing link to the existing projects and blog routes; About links to
   `/#about`. Specialist pages remain reachable from relevant content and footer.
2. **Opening:** the direct offer, short explanation, byline, and one primary action
   close to the first project. Avoid a separate full-height marketing preamble.
3. **Featured work:** one larger example with a plain-language problem, actual
   artifact, explanation of the build, and a source/detail link. Project names
   follow the explanation of what the work does.
4. **Start with one workflow:** explain what to bring, what the assessment covers,
   and what the visitor receives. Reuse the existing factual assessment scope.
5. **Other selected work:** two compact, distinct entries. Include workshops and
   fabrication links where the examples make them relevant.
6. **About Charles:** concise introduction, direct working relationship, and
   GitHub/professional links. Preserve the `about` anchor.
7. **Closing contact invitation and footer:** a simple next step and secondary
   navigation. Keep useful writing accessible without another large promotional
   panel.

Develop the selected study into a complete desktop composition and a narrow
mobile version with the same copy and actual media. On mobile, introduce the
offer and inquiry action before large imagery and ensure captures are readable.

Review the rendered homepage before propagating the design: its hierarchy,
imagery, and typography are the main design checkpoint. Resolve substantive
feedback there. Approval of a palette alone is not sufficient evidence that the
page works.

Initial implementation area: `src/styles/global.css`, `src/components/Hero.astro`,
`src/components/Nav.astro`, `src/components/Footer.astro`,
`src/layouts/BaseLayout.astro`, and `src/pages/index.astro`. Shared changes must be
checked against every existing page even during the homepage phase.

## 4. Carry the direction through the site

| Page or system          | Change                                                                                                                                                                                                   |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Services                | Lead with the existing automation/local AI assessment and its concrete deliverables. Present broader services in a readable list with relevant work attached.                                            |
| Contact                 | Use a direct heading and quiet layout. Remove the decorative Morse canvas. Keep the direct address, editable email brief, and explanation of what happens after inquiry.                                 |
| Projects                | Lead with selected examples; retain the full catalog and working category filters. Use actual media where it helps and plain text entries where it does not. Replace generated category-pattern headers. |
| Animus, Skills, Design  | Apply the same type and spacing system. Lead each page with what the work does, then evidence and technical detail. Replace repeated slogan/decoration patterns.                                         |
| Blog index and articles | Keep comfortable reading width, code formatting, publication dates, authorship, and useful contextual links.                                                                                             |
| Shared identity         | Align social previews, favicon, theme color, descriptions, and `public/llms.txt` with the selected design. Keep the Thread & Signal name; resolve the wordmark through the composition studies.          |
| Documentation           | Update `docs/positioning.md` and `docs/MAINTENANCE.md` to describe the final implemented system. Leave historical sprint reports and approval records intact.                                            |

Keep the existing routes, GitHub Pages deployment, static Astro architecture,
identity source in `src/data/site.ts`, and form-free contact path. No framework
migration, CMS, booking service, or pricing system is needed for this redesign.

## 5. Verify the design and release behavior

### Design acceptance

- Review the page in grayscale and with decorative accents suppressed. Its
  hierarchy must still come from content, proportions, alignment, and type scale.
  A color change alone must not explain its difference from the current site.
- Compare both studies using the same offer and project material. Record which
  makes the work, authorship, and next step easier to understand, and why. Reject
  a rationale consisting only of "cleaner," "premium," or "less AI."
- Annotate the selected desktop and mobile composition against the guide's 16
  markers. Explain the function of retained patterns; do not optimize a numeric
  score or damage familiar navigation merely to avoid a marker.
- Every prominent graphic answers a concrete question about the project. Review
  any fake apparatus, unreadable console output, ornamental numbering, repeated
  label hierarchy, or universal accent treatment as a reason to revise the design.
- At a normal desktop and mobile viewport, the opening view identifies the offer,
  the person behind it, and the next action.
- A meaningful project artifact appears in the opening view or the next section.
- Each showcased artifact has a factual explanation; technical names do not have
  to be understood before the visitor understands the value.
- Headings, links, and paragraph text remain readable without decorative effects.
- All content is present with JavaScript disabled. There are no scroll-triggered
  reveals hiding server-rendered content.
- Inspect at 360, 390, 768, and 1440 CSS pixels, plus keyboard navigation and 200%
  zoom. Check menu behavior, wrapping, overflow, image crops, and visible focus.
- Body text clears 4.5:1 contrast; large text and necessary UI boundaries clear
  3:1. Touch targets meet the project's 44px standard.
- Media has suitable alt text, explicit dimensions, and responsive sizing. Avoid
  loading full-resolution captures where a smaller image is sufficient.

### Engineering acceptance

- Review current and legacy tests for assumptions about old copy, decorative
  patterns, animation, and DOM structure. Replace only requirements intentionally
  changed by this plan; preserve behavior checks and record why assertions change.
  In particular, `docs/sprints/s1/sprint-tests/dist-check-s1.mjs` requires the
  current gradients, headline, colored lanes, and decorative project patterns;
  `docs/sprints/s0/sprint-tests/dist-check.mjs` pins the seven-link navigation.
  These are executable regression checks that need maintenance even though they
  live under historical sprint directories.
- Retire obsolete hero-animation checks when the animation is removed, replacing
  them with meaningful checks for immediate content visibility and the new hero's
  essential links. Do not retain unused motion code simply to satisfy old tests.
- Preserve route/link integrity, canonical metadata, structured data, sitemap,
  social image validity, blog dates/bylines, and identity/contact consistency.
  Keep the `/portfolio` to `/projects` and `/product` to `/animus` redirects in
  `astro.config.mjs`, along with the `about` and `automation-assessment` anchors.
- Preserve menu accessibility, project filters, no-JavaScript content access, and
  valid encoded email briefs.
  Check menu open/close, Escape, focus handling, and resizing across breakpoints;
  shared navigation styling must not trap the drawer inside the header.
- Run scoped formatting for edited files, the Neutronium mechanical/judgment
  audit, and `npm run validate` after coherent implementation changes. Validate
  the built site visually; passing source assertions alone does not judge design.
- Compare page weight and browser behavior with the current site. Removing
  decorative JavaScript should not be offset by oversized project media.

### Feedback and publication

Use the completed homepage preview for a short review with representative
visitors, coordinated by Charles. Ask what the business does, what they would
click next, and which example supports their confidence. Record misunderstandings
and adjust hierarchy before release. Do not initiate external outreach as part
of implementation without an explicit request.

Prepare the complete change and validation evidence for review. Publication
remains a separate action: a merge to `main` triggers production deployment.
When publication is authorized, verify the deployed revision and the live pages,
including the inquiry path and social preview.

## Execution checklist

- [x] Inspect the live site, feedback screenshot, source, and current architecture.
- [x] Document a proposed direction, staged scope, dependencies, and acceptance criteria.
- [x] Read the supplied style guide, inspect its palette demonstration, and revise the visual process.
- [x] Inspect and annotate references for actual products and useful technical explanation.
- [x] Verify the lead project material and its reader-facing question against dated source records.
- [x] Prepare study homepage copy and real project assets with provenance.
- [x] Compare two grayscale compositions and recommend one with a written rationale.
- [x] Define exact tokens and build the static desktop/mobile studies.
- [ ] Integrate and review the selected production homepage, including full navigation and optimized media.
- [ ] Apply the resulting system to the remaining pages and documentation.
- [ ] Update affected regression checks and complete technical/visual validation.
- [ ] Gather concrete visitor feedback and resolve important misunderstandings.
- [ ] Prepare the reviewed release; publish when authorized and verify production.

The critical sequence is **references and credible project material → composition
studies → exact visual specification → homepage → site-wide application →
validation and feedback → release**. Avoid refining every secondary page before
the homepage demonstrates that the direction works.
