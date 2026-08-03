# Making it readable

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** making-it-readable
- **Module / Part:** collection-tracker — Part 1: The ledger
- **Scaffolding:** level 1–2 — second lesson of the spreadsheet skill. Goals
  plus hints for the applied work (conditional formatting); full level-1
  staging for the sorting disaster, which is new territory and the lesson's
  centerpiece.
- **Deliveries:** guided only (module-wide decision — see MODULE.md)
- **Status:** ready

## Goal and payoff

Turn a correct-but-raw ledger into something readable at a glance: money that
looks like money, a header that never scrolls away, and a Gain column that goes
green or red on its own. Then the skill with teeth: sorting — taught through
the classic disaster. The learner deliberately sorts a single column on a copy,
watches the data relationships scramble, and only then learns to sort safely,
plus filter views for exploring without rearranging anything.

Payoff: the tracker looks like a product. Someone reading over the learner's
shoulder can see which cards won and which lost without a word of explanation
— the green/red glance is the show-off moment.

Second agenda: this is the first outing for both halves of the module's safety
net as a *habit* — File → Make a copy for the destructive experiment, a named
version before touching the real sheet's row order.

## Prerequisites

- A Collection tab that answers what the collection is worth — established by
  `modules/collection-tracker/lessons/first-ledger/` (includes the
  name-a-version habit and the totals block in H/I).

## Establishes

- Verbatim citation for other cores: "a tracker readable at a glance —
  established by `modules/collection-tracker/lessons/making-it-readable/`"
- Also establishes: the format-vs-value distinction (formatting changes how a
  value looks, never what it is); the rows-are-units sorting discipline (sort
  the sheet or a whole range, never one column); filter views as the
  look-without-touching tool; first real use of File → Make a copy as the
  expendable surface.

## Facts

- Currency format: select the Cost, Value, and Gain columns (click column
  letter D, shift-click F selects D through F), then Format menu → Number →
  Currency. [volatile] menu wording drifts; find "Number" inside the Format
  menu, then the currency option.
- Formatting is display only. The stored value is untouched — the formula bar
  still shows the raw value for a selected cell. This is the load-bearing
  concept of the lesson's first half.
- Bold: select row 1 (click the row number), Ctrl+B / ⌘B or the toolbar B.
- Freeze: View menu → Freeze → 1 row. Frozen rows stay put when scrolling and
  are left in place when the sheet is sorted. [verify: frozen rows excluded
  from "Sort sheet" — believed correct as of 2026-08, confirm in a live sheet]
- Conditional formatting: Format menu → Conditional formatting. Apply to range
  `F2:F`. Rule 1: "Greater than" 0, green fill. Rule 2 (added via "Add another
  rule"): "Less than" 0, red fill. Rules live in a side panel; a cell with no
  matching rule keeps its normal look. [volatile] panel layout shifts; the
  learner finds fields by their labels.
- Sorting one selected column: select column E by its letter, Data menu → Sort
  range → sort the selection. Sheets sorts **only the selected cells**,
  divorcing values from their rows. [volatile as of 2026-08: no warning dialog
  appears for a single-column sort-range; if the UI has since added one, the
  learner reads it and proceeds deliberately — the experiment is on a copy
  either way.] [verify current behavior in a live sheet]
- Safe sort, whole sheet: right-click a column's letter → "Sort sheet A to Z" /
  "Sort sheet Z to A" — moves entire rows together, leaves frozen rows alone.
  Also available via the Data menu. [volatile] labels drift; find "sort sheet"
  by name.
- Safe sort, explicit range: select the whole table first, Data → Sort range →
  advanced options, tick "Data has header row," choose column. [volatile]
- Filter views: Data menu → Filter views (also under the funnel toolbar
  button's menu) → Create new filter view. Sorting and filtering inside a
  filter view changes what the viewer sees, not the sheet itself; close the
  view (the X on its dark banner) and the sheet is exactly as it was.
  [volatile] [verify: entry points for filter views in current UI]
- Dates are numbers underneath: formatting the Date column as a plain number
  (Format → Number → Number) shows each date as a count of days since the
  spreadsheet's day zero. Do not assert which day zero is in the delivery —
  the learner can compute or look it up; the core's note: Sheets uses the
  1899-12-30 epoch. [verify]
- Copies: File menu → Make a copy — full duplicate in the learner's Drive,
  named at creation. The module's expendable surface (MODULE.md).
- Negative currency renders with a leading minus by default; the conditional
  red does the visual work regardless.

## Arc

### Orientation — given plainly

The frame: the ledger is already correct; today is about making it *legible* —
correct is for you, legible is for everyone else. Formatting introduced as a
second layer every cell has: the value, and the costume the value wears.
Currency, bold, freeze given as plain instructions (they're switches, not
puzzles). Conditional formatting named and explained — formatting that a rule
applies for you — before the learner configures it. For sorting: the promise
that one deliberate disaster on a copy is worth a hundred warnings.

### Predictions to elicit

- After the money columns show as currency, is the number stored in the cell
  different? How would you check?
- You select only the Value column and sort just that selection. What happens
  to the rest of the table?
- A date formatted as a plain number: what shows? Take a real guess at what the
  number would even mean.

### The work — goals and hint ladders

1. **Money that looks like money.** Select columns D through F, Format →
   Number → Currency. Instantly the sheet half-explains itself. Then the
   check that matters: click any Value cell and read the formula bar — the raw
   number, unchanged. Formatting dressed the value; it didn't touch it. Blank
   Costs stay blank — currency format has nothing to dress.
2. **A header that stays put.** Bold row 1. Then View → Freeze → 1 row, and
   scroll: the data moves under the headers. Stated plainly: freezing also
   tells the sheet "this row is furniture, not data" — which quietly pays off
   when sorting arrives later in the session.
3. **Green and red at a glance.** The one hint-laddered goal. Goal: every
   winning card's Gain shows on green, every losing card's on red, entirely on
   its own — including for cards added next month.
   - Rung 1: doing this by hand — coloring cells one by one — would rot the
     moment a value changed. The Format menu has something that applies
     formatting *by rule*. Skim that menu's entries and their names.
   - Rung 2: conditional formatting — a rule attached to a range: "when a
     cell's value satisfies this condition, wear this look." It needs three
     decisions from you: which cells, what condition, what look. You need two
     rules, because green-when-positive and red-when-negative are two
     conditions.
   - Rung 3: Format → Conditional formatting opens a panel. Apply it to
     `F2:F` (open-ended, same reasoning as the totals — next month's cards
     are covered). The condition dropdown has "Greater than" and "Less than";
     the value for both rules is 0. "Add another rule" gets you the second.
   No rung 4 — second lesson of the skill, and the panel guides.
4. **Sort the real sheet, safely.** After the disaster (break-it runs before
   this in spirit — delivery orders it: the disaster happens mid-session on
   the copy, then this on the original; see delivery notes). Habit first: name
   a version, `before first sort`. Then: right-click column E's letter and
   Sort sheet Z→A. Whole rows travel together; the frozen header doesn't
   move; best card rises to row 2. Check a known card: its Cost, Date, Gain
   all came along. Totals unmoved in H/I — placed to the side in the first
   session for exactly this day.
5. **Explore without rearranging.** Filter views. Data → Filter views →
   Create new filter view: a dark banner appears — the sign of being *inside*
   a view. Filter Set to one set only, sort by Gain inside the view, look
   around. Close the view: the sheet is exactly as it was. The tool for
   answering "just show me…" questions without touching the table everyone
   else sees.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **The one-column sort** (the centerpiece — full staging, prediction checked).
  On a copy: File → Make a copy, name it `Collection Tracker crash test`. In
  the copy: select column E by its letter — only that column — then Data →
  Sort range, and sort the selection descending. Now *look at the table*.
  Values are in tidy order; every other column stayed where it was. Find a
  card whose value you know cold — the value in its row now belongs to some
  other card. No error anywhere. The sheet did exactly what it was told: "sort
  these cells." It has no idea rows are supposed to mean something — the
  meaning was in the learner's head, and one sorted column just severed it
  for every row at once. Connects explicitly to the first session's lesson:
  the silent wrong is the dangerous one, and this is the biggest silent wrong
  in spreadsheets. Undo works (Ctrl+Z / ⌘Z) — or throw the whole copy away;
  it was born for this. The rule extracted: **never sort a selection smaller
  than the table.** Sort the sheet, or a range that includes every column.
- **Dates unmasked.** On the copy: select the Date column, Format → Number →
  Number. Every date turns into a five-digit-ish number. That number is a
  count of days since a day zero the spreadsheet counts from. Format back
  (Format → Number → Date) — the dates return, untouched, because the *value*
  never changed; only the costume did. Glimpse one layer down: dates are
  numbers wearing calendar clothes, which is why date arithmetic will simply
  work later (subtracting two dates yields days between). Undo: reformat, or
  discard the copy.

### What just happened — the explanation, one layer deeper

Two ideas, both about the gap between what a cell *is* and what it *shows*.

Format vs value: every cell carries a value and, separately, instructions for
displaying it. Currency, date, bold, green — all costume. The formula bar
always shows the value naked, which makes it the tool for answering "what is
this cell really?" One layer deeper: this is why the date trick worked — the
calendar-looking thing was a formatted number all along, and day-counts are
what make time arithmetic possible.

Sorting: a table's rows are records — each row is one card's facts, and the row
is the unit of meaning. A sort is a rearrangement of records. Hand the sorter
whole records and meaning survives any number of sorts; hand it one column and
it faithfully destroys the recordness of every row, silently, because the sheet
never knew about the meaning in the first place. The grid doesn't know a row
is "a card." The learner knows. That knowledge now has a discipline attached.

### Go further — open questions

- The Format menu can stripe a table with alternating row colors on its own —
  find the feature (it's named about what it does) and decide whether it earns
  a place in the tracker.
- Number formats can be custom-built: a format that shows cents only when a
  value has them (whole dollars stay clean) is possible with a custom number
  format. The Docs editors help center documents the custom format language —
  a small puzzle in a tiny language.
- Genuinely open: what actually makes a table "readable"? Find the ugliest
  real spreadsheet you can — a shared schedule, a league standings sheet, a
  price list from the wild — and name *precisely* why it hurts. Designers
  argue about this professionally and there is no settled answer; you now
  have opinions with reasons behind them, which is all "design taste" is.

## Delivery notes

- **guided:** the disaster stays in Break it on purpose (standard section
  order holds). To make the pedagogy work in that order, the safe-sort step
  in The work presents its rules as rules-with-reasons and explicitly points
  forward: "in Break it on purpose you'll cause the disaster these rules
  prevent." The disaster is the centerpiece of Break it and gets the fullest
  staging in the lesson — prediction checked, wreck inspected, rule
  extracted.
- Don't spoil the disaster's visual before the learner looks — "now look at
  the table" then the explanation, same rhythm as first-ledger's silent-SUM
  moment.
- The green/red moment is the show-off payoff; end the conditional-formatting
  step by having the learner stand back and read their own collection at a
  glance.
- Menu paths are [volatile] throughout: name menus plainly, never coordinates;
  where an item may have moved, say to find it by name.
- Epoch date: never asserted in the delivery — the learner is invited to work
  out or look up which day is day zero.
