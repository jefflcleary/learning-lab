# Price snapshots

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** price-snapshots
- **Module / Part:** Building a collection tracker — Part 4: Time and flow
- **Scaffolding:** level 2 — time series and the state/history distinction are
  new; charting and formula skills are established. Goals plus hints.
- **Deliveries:** guided only (module default)
- **Status:** ready

## Goal and payoff

Give the tracker a memory. The tracker knows what the collection is worth *now*
and nothing about yesterday — history has to be recorded on purpose, because
nothing keeps it for you. The learner builds a Snapshots tab (Date | Total value
| Total spent | Net), performs the first snapshot by hand, backfills two or three
honest estimates so a line exists on day one, and charts Net over time — the
growth curve, the single most motivating picture in the module. The chore is
**manual by design**: doing it by hand for a few weeks teaches exactly what a
later automation must do, and a later lesson makes the machine do it
(`lessons/first-script/` — same-release forward link, sanctioned). Payoff: a
line chart of the collection's worth over time, plus sparklines beside the
headline stats — the dashboard starts moving.

## Prerequisites

- A Collection tab whose Value column is kept roughly current — begun in
  `lessons/first-ledger/`
- Stats totals: total value and total spent, live — established by
  `lessons/questions-your-data-can-answer/`
- The ability to build a chart from a range and title it — established by
  `lessons/charting-the-collection/`

## Establishes

- A Snapshots tab (Date | Total value | Total spent | Net) with at least one real
  snapshot and two or three labeled estimates; a Net-over-time line chart; a
  snapshot ritual on a schedule the learner picked
- The state/history distinction: Collection overwrites, Snapshots appends
- Cited by other cores as: "a Snapshots tab (Date | Total value | Total spent |
  Net) exists and a manual snapshot ritual is running — established by
  `lessons/price-snapshots/`."

## Facts

- New tab: **Snapshots**, columns Date | Total value | Total spent | Net.
- **Snapshot rows are typed values, not formulas pointing at Stats.** A cell
  containing `=Stats!B2` recalculates forever and rewrites the past silently; a
  typed number is frozen. Net alone may be an in-row formula (value minus spent
  *of that row*) because its inputs are frozen constants in the same row. This is
  orientation-grade — getting it wrong silently destroys the tab's entire
  purpose — and break-it #3 demonstrates the failure live.
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
  `charting-the-collection`.
- Gap behavior: whether a line chart spaces points by actual date distance or
  evenly by row depends on how the chart treats the date column [verify — current
  Sheets behavior varies with chart type and axis treatment as of 2026-08].
  Deliveries never assert it; break-it #1 has the learner measure it.
- `=SPARKLINE(range)` draws a tiny chart inside a single cell; default is a line.
  Documentation: the **SPARKLINE function** help page in Google's Docs editors
  help center (support.google.com/docs — search "SPARKLINE"). Options exist
  (chart type, color) — the help page is the map.
- Sparkline placement: next to the headline stats on Stats, fed by the Snapshots
  Net (and/or Total value) column.
- Experiments guard: gap and duplicate experiments run on a copy (File → Make a
  copy, or duplicate the tab) per the module's standing expendable-surface habit;
  break-it #3 runs on the real tab but is undone immediately and protected by a
  named version first (File → Version history → Name current version [volatile]).
- Forward link (sanctioned, same release): the automation that takes over this
  chore is `lessons/first-script/`.

## Arc

### Orientation — given plainly

The tracker is entirely present-tense: every number on Stats describes *now*, and
when a card's value is updated, the old value ceases to exist anywhere. If the
learner wants to know whether the collection is growing, someone has to write the
present down before it stops being the present — and nothing does that for free.
The Snapshots tab is introduced as the tracker's diary: one row per visit, never
edited, only appended. The typed-values rule stated plainly with its reason. The
tedium stated plainly, unsoftened: this chore is manual **on purpose**; doing it
by hand for a few weeks teaches precisely what a machine would have to do, and a
later lesson hands the chore to a machine. Do not apologize for the chore and do
not dress it up; feeling its weight is part of the design.

### Predictions to elicit

- What was the collection worth one month ago? Write a number — then write how
  you could ever check it. (The honest answer to the second part is the lesson.)
- Weekly snapshots for a year: how many rows? Does that worry a spreadsheet?
- Two snapshots two weeks apart with nothing between: what should the chart draw
  in the gap — and what *will* it draw?

### The work — goals and hint ladders

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
   words. Weekly suggested; the learner may choose otherwise and note why.

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

### What just happened — the explanation

The Snapshots tab is a **time series** — measurements plus dates, appended and
never edited — and it is the same data shape behind every stock chart, every step
counter, every weather record and growth chart on earth. The deeper distinction:
Collection is **state** (what is true now; updating it destroys the old truth),
Snapshots is **history** (what was true when; it only grows). One overwrites, one
appends. The asymmetry the learner met while backfilling is the general law: you
can always derive state from history (the last row, or a SUMIF up to any date —
Purchases proved it), but never history from state — which is why history must
be kept on purpose, and why the value column's past is gone while the spending's
past was recoverable. Purchases was a history tab all along; Snapshots just made
the pattern deliberate. And the chore now has a precise shape: read two numbers,
type three, weekly. Worth noticing that this is a *procedure a machine could
follow* — which is exactly what a later lesson does with it.

### Go further — open questions

- Should snapshots record per-set values too? Sketch what the tab would need —
  more columns per row, or more rows per date — and what each design does to the
  chart. (This is a real data-design fork with real tradeoffs.)
- What's the right gap between snapshots? Daily would catch more, cost more, and
  mostly record noise; monthly is cheap and blurry. What would change your
  answer — and does card-market speed matter to it?
- Genuinely open, seeded here on purpose: when a card's market value jumps, did
  your collection *gain* anything? The chart says yes; your wallet hasn't
  noticed. Hold the question — it returns, properly, when the tracker starts
  handling actual sales.

## Delivery notes

- **guided:** the tedium paragraph must stay plain and unsoftened — no apology,
  no pep, no "it'll be worth it" cheerleading. State the design: manual now,
  machine later, and the by-hand weeks are what teach the machine's job. The
  forward link to `first-script` renders as a normal lesson link.
- Estimates must be labeled honestly everywhere they appear, including the chart
  section — the growth curve's first version is part measurement, part memory,
  and the delivery says so.
- Do not assert gap/duplicate chart behavior — both are measurements.
- The selling-lesson resolution of paper-vs-realized is mentioned without a link
  (phrased as "when the tracker starts handling actual sales") to avoid coupling
  to a lesson outside this batch; revisit and add the link once
  `the-cost-of-selling` exists.
