# Value snapshots and logging from your phone

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** snapshots-and-logging
- **Module / Part:** collection-tracker — Part 4 — Time and flow
- **Scaffolding:** level 2 throughout — time series and the state/history
  distinction are new, and this is the first Google Forms work (goals plus
  hints, concepts named); charting and formula skills are established. The
  responses-tab design decision at the end is level 3: options and tradeoffs
  stated, the choice entirely the learner's — there is no hint ladder for a
  judgment call.
- **Deliveries:** guided only (module default)
- **Status:** ready

## Goal and payoff

One theme, said out loud: a tracker that stays alive. A tracker dies two ways —
it forgets (nothing keeps history), or it starves (entry friction means data
stops arriving). This lesson closes both.

First half: give the tracker a memory. The tracker knows what the collection is
worth *now* and nothing about yesterday — history has to be recorded on
purpose, because nothing keeps it for you. The learner builds a Snapshots tab
(Date | Total value | Total spent | Net), performs the first snapshot by hand,
backfills two or three honest estimates so a line exists on day one, and charts
Net over time — the growth curve, the single most motivating picture in the
module. The chore is **manual by design**: doing it by hand for a few weeks
teaches exactly what a later automation must do, and a later lesson makes the
machine do it (`lessons/apps-script-automation/` — same-release forward link,
sanctioned).

Second half: kill the tracker's biggest real threat, entry friction. Build a
Google Form whose questions mirror the Purchases columns, linked to the tracker
so every submission lands as a new row, and put the form one tap from the
phone's home screen — so a pack bought at a card-shop counter gets logged
before the receipt is in a pocket. Then face the design decision the form
forces (responses land in their own tab, not in Purchases) and choose
deliberately among three honest options.

Payoff, visible to others: a line chart of the collection's worth over time,
sparklines beside the headline stats — the dashboard starts moving — and a
tracker anyone can feed: hand someone your phone and they can log a purchase in
about ten seconds. The tracker stops being a thing you sit down to maintain and
becomes a thing that keeps itself fed.

## Prerequisites

- A Collection tab whose Value column is kept roughly current — begun in
  `lessons/building-the-ledger/`
- Stats totals (total value and total spent, live) and a Type column
  restricted to a fixed category list by data validation, the reason why felt
  first — established by `lessons/stats-and-clean-data/`
- The ability to build a chart from a range and title it — established by
  `lessons/charts-and-query/`
- A Purchases tab (Date | Item | Type | Cost | Paid by | Notes) with real
  purchase history — established by `lessons/purchases-and-payback/`

## Establishes

- A Snapshots tab (Date | Total value | Total spent | Net) with at least one
  real snapshot and two or three labeled estimates; a Net-over-time line chart;
  sparklines beside the headline stats; a manual snapshot ritual running on a
  schedule the learner picked — established by `lessons/snapshots-and-logging/`
- The state/history distinction: Collection overwrites, Snapshots appends
- A Google Form is linked to the tracker; submitting it appends a row to a
  form-responses tab; the form is reachable from the learner's phone home
  screen, so logging a purchase away from a computer takes seconds —
  established by `lessons/snapshots-and-logging/`
- The learner has made and recorded a deliberate decision about where form
  responses live relative to the Purchases tab (pointed stats at the responses
  tab, copies rows over on a ritual, or made the responses tab the purchases
  record going forward)
- Cited by other cores as: "a Snapshots tab exists and a manual snapshot ritual
  is running, and purchases get logged from a phone through a form —
  established by `lessons/snapshots-and-logging/`."

## Facts

### Snapshots

- New tab: **Snapshots**, columns Date | Total value | Total spent | Net.
- **Snapshot rows are typed values, not formulas pointing at Stats.** A cell
  containing `=Stats!B2` recalculates forever and rewrites the past silently; a
  typed number is frozen. Net alone may be an in-row formula (value minus spent
  *of that row*) because its inputs are frozen constants in the same row. This is
  orientation-grade — getting it wrong silently destroys the tab's entire
  purpose — and the self-rewriting-history break-it demonstrates the failure
  live.
- The ritual, in order: (1) quick value pass over Collection — update the Value
  column however the learner already prices cards; (2) read Total value and
  Total spent off Stats; (3) type one new row on Snapshots: today's date, the
  two numbers, Net.
- Schedule: learner picks; weekly suggested, same day each week. The reminder
  lives wherever the learner's reminders live — never in this repo, and the
  tracker itself can't nag yet.
- Backfill for day-one line: Total *spent* as of an earlier date is exactly
  reconstructable — Purchases has dates, so a SUMIF over dates before the cutoff
  gives the true figure (learner has the skills). Total *value* at an earlier
  date is gone; an honest estimate from memory is the only option. Mark estimate
  rows as estimates — a cell note (right-click → note, or Insert menu [volatile])
  on the Date cell, or an asterisk convention; learner's choice, but marked.
  Asymmetry is deliberate teaching material for What just happened: spent has a
  history because Purchases *is* one; value has none because nobody kept it.
- Line chart: Date and Net (Total value optionally as second series), line type,
  titled as a question ("Is the collection growing?"). Chart skills assumed from
  `lessons/charts-and-query/`.
- Gap behavior: whether a line chart spaces points by actual date distance or
  evenly by row depends on how the chart treats the date column [verify — current
  Sheets behavior varies with chart type and axis treatment as of 2026-08].
  Deliveries never assert it; the gap break-it has the learner measure it.
- `=SPARKLINE(range)` draws a tiny chart inside a single cell; default is a line.
  Documentation: the **SPARKLINE function** help page in Google's Docs editors
  help center (support.google.com/docs — search "SPARKLINE"). Options exist
  (chart type, color) — the help page is the map.
- Sparkline placement: next to the headline stats on Stats, fed by the Snapshots
  Net (and/or Total value) column.
- Experiments guard: gap and duplicate experiments run on a copy (File → Make a
  copy, or duplicate the tab) per the module's standing expendable-surface habit;
  the self-rewriting-history break-it runs on the real tab but is undone
  immediately and protected by a named version first (File → Version history →
  Name current version [volatile]).
- Forward link (sanctioned, same release): the automation that takes over this
  chore is `lessons/apps-script-automation/`.

### The form

- **Google Forms** is a free Google tool for building forms — pages of questions
  that anyone with the link can fill in and submit. It comes with the same Google
  account the learner already uses for Sheets; nothing is installed.
- Documentation: the Google Forms section of Google's **Docs editors help center**
  (support.google.com/docs) — the same help center that covers Sheets.
- A form can be **linked to a spreadsheet**, and there are two ways in
  [volatile as of 2026-08 — UI labels and menu locations shift; deliveries phrase
  resiliently and have the learner find controls by name]:
  - From inside the spreadsheet: the **Tools** menu has an option to create a
    linked form (currently worded along the lines of "Create a new form").
  - From **forms.google.com**: build the form, then in its **Responses** area
    choose to send responses to a spreadsheet and pick the existing one.
  Either route ends in the same place: a linked form plus a new tab in the
  spreadsheet.
- Linked responses land in a **new tab of their own** (currently named something
  like "Form Responses 1"), never in an existing tab. The form owns that tab: it
  writes the header row from the question titles and appends one row per
  submission. A **Timestamp** column is added automatically as the first column —
  the exact submission time, free.
- Question types relevant here: **short answer** (free text), **multiple choice**
  (pick one from a fixed list), **dropdown** (same contract, rendered as a menu),
  **date**, and a plain paragraph/text type for notes. Multiple choice and
  dropdown can be marked **required**; multiple choice can optionally offer an
  **"Other"** choice that accepts free text.
- The mapping this lesson builds: one question per Purchases column — Date (date
  type), Item (short answer), Type (multiple choice or dropdown, choices copied
  exactly from the validation list on Purchases), Cost (short answer; Forms can
  also apply response validation to require a number), Paid by (multiple choice),
  Notes (paragraph, not required).
- Sharing: the form's **Send** control produces a link (with an option to shorten
  it). Anyone with the link can submit; they see the questions, never the
  spreadsheet.
- Phone home screen: every major mobile browser can add a website to the home
  screen from its share or menu control (iOS Safari: Share → Add to Home Screen;
  Android Chrome: menu → Add to Home screen) [volatile as of 2026-08 — phrase as
  "your browser's share or menu has an option named along the lines of 'Add to
  Home Screen'"].
- Editing a form's questions or choices later does **not** touch rows already in
  the responses tab. Responses are copies made at submission time; the form is
  only the stencil they were made through.
- The responses tab is a normal tab for reading purposes: formulas elsewhere can
  reference it (`SUMIF('Form Responses 1'!...)` works like any cross-tab
  reference). Hand-editing *inside* it works but is worth gentle caution — the
  form appends below the last response it knows about, so treat the tab as the
  form's territory and do manual fixes deliberately.
- The three options for where responses live, with tradeoffs (the lesson's
  decision section; no right answer):
  - **(a) Point the stats at both tabs.** Purchases stays the manual record, the
    responses tab is the phone record, and every stat formula reads both.
    Tradeoff: every future formula must remember there are two sources; forget
    one and the stat silently undercounts.
  - **(b) Copy rows over as a ritual.** Periodically move new responses into
    Purchases by hand. One table remains the truth; the cost is a recurring chore
    — exactly the kind of friction this lesson exists to remove — and any lapse
    means the truth is stale.
  - **(c) The responses tab becomes the purchases record.** Retire manual entry;
    repoint stats formulas at the responses tab; keep old Purchases rows either
    by pasting them (carefully) above/into the record or by keeping Purchases as
    a closed historical tab. Tradeoff: a schema change — column order now belongs
    to the form, the Timestamp column arrives whether wanted or not, and history
    lives in two shapes unless merged.
- The connection to name explicitly: a multiple-choice question is the **same
  contract** as the validation dropdown on Purchases — a fixed list of allowed
  answers, agreed in advance. The learner has now enforced one contract at two
  different doors.
- The general pattern to name: **a form is a friendly face on a table**. Every
  signup page, order form, and survey on the web is this pattern — questions in
  front, rows landing in something table-shaped behind. The learner has now built
  both halves.

## Arc

### Orientation — given plainly

The theme, opened plainly: a tracker dies two ways. It forgets — the tracker is
entirely present-tense; every number on Stats describes *now*, and when a
card's value is updated, the old value ceases to exist anywhere. And it starves
— the tracker is only as good as what gets entered, and entry has friction: a
pack bought at a card shop on a Saturday gets logged never, not out of
laziness but because "log it" meant "later, at a computer," and later lost. The
best tracker is not the cleverest one; it is the one that stays alive. This
session closes both mouths of the trap.

For the memory half: the Snapshots tab is introduced as the tracker's diary:
one row per visit, never edited, only appended. The typed-values rule stated
plainly with its reason. The tedium stated plainly, unsoftened: this chore is
manual **on purpose**; doing it by hand for a few weeks teaches precisely what
a machine would have to do, and a later lesson hands the chore to a machine.
Do not apologize for the chore and do not dress it up; feeling its weight is
part of the design.

For the feeding half: what Google Forms is, that it is free and already part of
the account, where its documentation lives, what "linked to a spreadsheet"
means, and the two ways to create the link (resilient phrasing — find the
control by name, or start from forms.google.com). State plainly that responses
will land in a new tab of their own; that fact is load-bearing for the decision
section.

### Predictions to elicit

- What was the collection worth one month ago? Write a number — then write how
  you could ever check it. (The honest answer to the second part is the lesson.)
- Two snapshots two weeks apart with nothing between: what should the chart draw
  in the gap — and what *will* it draw?
- Count honestly: of the purchases you made in the last month, how many are in
  the Purchases tab, and how many never made it? (The gap is the reason the
  second half exists. Zero gap is a fine answer — then the form is insurance.)
- When a form submission arrives in the spreadsheet, where do you expect the new
  row to appear — the bottom of Purchases, or somewhere else?
- Your Type column rejects categories that aren't on its list. If the form asks
  for Type as multiple choice, can a submission contain a category not on the
  list? What if the question allowed an "Other" answer?

### The work — goals and hint ladders

**First half — memory:**

1. **Build the Snapshots tab.** Columns Date | Total value | Total spent | Net.
   Goal framed with the typed-values rule already in hand (orientation, not
   puzzle).
2. **Take the first real snapshot.** The full ritual: value pass on Collection,
   read the two totals off Stats, type the row, compute Net.
   - Rung 1: Net is the one column allowed to be a formula — but only if its
     inputs are the frozen numbers *in its own row*. If the formula mentions
     another tab's name, it isn't a snapshot anymore.
3. **Backfill an honest prehistory.** Two or three earlier rows so the chart has
   a line on day one, each marked as an estimate.
   - Rung 1: half of each old row is *not* an estimate — one of the two totals
     can be reconstructed exactly from data the tracker already keeps. Which tab
     remembers dates?
   - Rung 2: Purchases has every buy with its date — a SUMIF over dates before
     the cutoff rebuilds Total spent as of that day exactly. Total value has no
     such tab behind it; estimate from memory and mark it.
4. **Draw the growth curve.** Line chart of Net over time (Total value optional
   as a second line), titled as its question. Success: a line exists, estimates
   and all, and its direction is legible at a glance.
5. **Sparklines beside the headline stats.** `=SPARKLINE(...)` next to Total
   value / Net on Stats, fed from Snapshots, so the dashboard's biggest numbers
   carry their own recent history in-cell.
   - Rung 1: the function's help page is short; the only real decision is which
     Snapshots column each sparkline should watch.
6. **Pick the schedule and commit.** A day of the week, a reminder wherever
   reminders live, and the ritual written in the logbook in the learner's own
   words. Weekly suggested; the learner may choose otherwise and note why. The
   deliberateness of the manual chore restated here, with the forward link to
   `lessons/apps-script-automation/` rendered as a normal lesson link.

**Second half — feeding.** Transition made in place: the diary keeps the
tracker remembering; the rest of the session keeps it fed.

7. **Build the form to mirror Purchases.** Goal: a linked form with one question
   per Purchases column — Date, Item, Type, Cost, Paid by, Notes — created so
   that submissions land in the tracker spreadsheet. Type and Paid by as fixed
   choices (choices copied exactly from the validation list); Cost should only
   accept a number; Notes optional; the rest required. Success: submit a test
   response from the computer and watch the row appear.
   - Rung 1 (creation): the spreadsheet's own menus can start a linked form —
     look through them for anything about forms. If nothing turns up, build at
     forms.google.com and look in the form's Responses area for a way to send
     responses to an existing spreadsheet. The help center covers both routes.
   - Rung 2 (question types): each column has a natural question type — a date
     question for Date, free text for Item, a fixed-choice type for Type and
     Paid by, free text with number-only validation for Cost (Forms calls this
     response validation), paragraph for Notes. Matching column to type *is* the
     design work; the choices for Type must match the Purchases validation list
     character for character, for the same reason the validation list exists at
     all.
   - Rung 3 (verify the link): after linking, look at the spreadsheet's tab
     strip. Submit one test response and read the new tab's header row against
     the Purchases header row — same information, plus a Timestamp column the
     form added on its own.
8. **Put it on the phone.** Goal: the form opens from the phone's home screen in
   one tap. Get the form's link from its Send control, open it on the phone, and
   use the browser's share or menu option (named along the lines of "Add to Home
   Screen"). Success criterion, timed honestly: from home screen tap to
   submitted, a real purchase logged in about ten seconds. That ten seconds is
   the entire point — it has to be short enough to happen at a counter.
9. **Decide where responses live.** The form writes to its own tab; the stats
   read Purchases; something has to give. Present options (a), (b), (c) with
   their tradeoffs stated in full (see Facts). No hint ladder — this is a
   judgment call, and all three options are used in the real world. The learner
   chooses, implements enough of the choice to see it working (repointed or
   doubled formulas for (a), one performed ritual for (b), the repointing and a
   decision about old rows for (c)), and **records the decision and the reasoning
   in the logbook**. Owning the choice is the lesson; there is no right answer to
   reveal.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Skip two weeks (simulated).** On a copy of the file or a duplicated tab:
  invent a plausible history with a two-week hole in it, chart it, and study the
  gap. Does the chart space points by real date distance or evenly by row? Does
  the line span the hole as if nothing happened? Teaches: a line between two
  points is the chart *guessing*, and a gap can make a chart lie by omission —
  the flat-or-interpolated stretch describes no measurement anyone took. Undo:
  delete the copy.
- **Snapshot twice in one day.** Same copy: two rows, same date, different
  numbers. What does the line do — vertical stitch, doubled point, something
  else? Teaches: the tab's implicit contract is one row per date; duplicates are
  ambiguity, and the chart renders ambiguity as nonsense. Decide the house rule
  (second snapshot replaces the first, or is not taken). Undo: delete the copy.
- **The self-rewriting history.** On the real tab, protected by a named version:
  replace one snapshot row's typed totals with formulas pointing at Stats. Now
  change one card's Value on Collection and watch the *past* move. Teaches, in
  one motion, the entire reason for the typed-values rule: a formula is state
  wearing history's clothes. Undo immediately: retype the frozen numbers (or
  restore the named version).
- **Walk around the guard.** On the Purchases tab, validation rejects a made-up
  category — the learner proved that when setting it up. Now add an "Other"
  option to the form's Type question, submit a nonsense category through it
  from the phone, and watch it land in the responses tab unchallenged. The
  sheet's validation guards the sheet's front door; the form is a second door,
  and it walked right past. Every door needs its own guard — that is why the
  Type question uses a fixed list with no "Other": the question's choice list
  *is* the form's validation. Undo: remove the "Other" option and delete the
  nonsense row.

(Cut in the merge, for the ≤4 budget: the change-the-stencil break-it from the
former form lesson — its rows-are-copies teaching survives as a plain fact in
Facts and can return if a future revision needs it.)

### What just happened — the explanation

The Snapshots tab is a **time series** — measurements plus dates, appended and
never edited — and it is the same data shape behind every stock chart, every
step counter, every weather record and growth chart on earth. The deeper
distinction: Collection is **state** (what is true now; updating it destroys
the old truth), Snapshots is **history** (what was true when; it only grows).
One overwrites, one appends. The asymmetry the learner met while backfilling is
the general law: you can always derive state from history (the last row, or a
SUMIF up to any date — Purchases proved it), but never history from state —
which is why history must be kept on purpose, and why the value column's past
is gone while the spending's past was recoverable. Purchases was a history tab
all along; Snapshots just made the pattern deliberate.

The form half names its pattern at full size: a form is a friendly face on a
table. The web runs on this — every signup, every checkout, every survey is
questions in front and rows landing in something table-shaped behind. Having
built both halves, the learner can now see the seam in every website they use:
required fields are validation, dropdowns are the fixed-list contract, the
confirmation page is the row being written. Second: friction as a design force.
The tracker didn't get more capable today — it got *easier*, and easier is what
determines whether data exists at all six months from now. Systems that survive
are systems cheap enough to keep feeding. Third, the two-door lesson in general
form: rules enforced at one entrance don't cover an entrance added later;
guards belong at every door, which is why real systems validate at the form
*and* the table.

Close on the theme: the tracker now remembers on purpose and eats without
effort — the two halves of staying alive. And the snapshot chore now has a
precise shape: read two numbers, type three, weekly. Worth noticing that this
is a *procedure a machine could follow* — which is exactly what
`lessons/apps-script-automation/` does with it.

### Go further — open questions

- Should snapshots record per-set values too? Sketch what the tab would need —
  more columns per row, or more rows per date — and what each design does to the
  chart. (This is a real data-design fork with real tradeoffs.)
- What's the right gap between snapshots? Daily would catch more, cost more, and
  mostly record noise; monthly is cheap and blurry. What would change your
  answer — and does card-market speed matter to it?
- The Timestamp column arrived free with every submission, and Purchases never
  had one. What could the tracker learn from *when* purchases happen that the
  Date column alone can't tell it?
- Genuinely open, seeded here on purpose: when a card's market value jumps, did
  your collection *gain* anything? The chart says yes; your wallet hasn't
  noticed. Hold the question — it returns, properly, when the tracker starts
  handling actual sales.
- Genuinely open: entry friction was killing this tracker, and a form fixed it.
  What other good habits die of friction — logging exercise, tracking spending,
  practicing anything — and which of them could a form pointed at a spreadsheet
  fix? The pattern is now yours; where else does it apply?

## Delivery notes

- **Merged from** the former `price-snapshots` and `log-it-from-your-phone`
  cores. The shared theme — a tracker that stays alive: history kept on
  purpose, entry made frictionless — is named in the opening and closed in
  What just happened. Both halves' forward references to automation point at
  `lessons/apps-script-automation/`.
- **guided:** the tedium paragraph must stay plain and unsoftened — no apology,
  no pep, no "it'll be worth it" cheerleading. State the design: manual now,
  machine later, and the by-hand weeks are what teach the machine's job.
- Estimates must be labeled honestly everywhere they appear, including the chart
  section — the growth curve's first version is part measurement, part memory,
  and the delivery says so.
- Do not assert gap/duplicate chart behavior — both are measurements.
- The ten-seconds-at-the-counter image carries the form half's motivation; keep
  it concrete and keep the payoff deliverable-shaped (hand someone the phone).
  The decision section must not lean toward an option — present all three flat,
  tradeoffs stated, and make the logbook entry the required artifact. Resist
  any urge to add a hint ladder there.
- UI paths are volatile: menu names ("Tools", "Create a new form", "Send",
  "Add to Home Screen") get "named along the lines of" phrasing, and the help
  center is the pointer of record.
- Do not spoil the break-it outcomes in learner text beyond what the setup
  requires (the "Other" response landing unvalidated is half-spoiled by the
  predict question; that is deliberate — the felt moment still lands).
- The soft dependency on rich stats: phrase the decision section so it works
  even if the learner's stats are thin — "whatever reads Purchases today"
  rather than assuming a rich Stats tab.
- The selling-lesson resolution of paper-vs-realized is mentioned without a
  link (phrased as "when the tracker starts handling actual sales") — revisit
  and link `lessons/pack-value-and-selling/` once cross-linking that lesson is
  wanted.
