# Building the ledger: cards, formulas, formatting

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** building-the-ledger
- **Module / Part:** collection-tracker — Part 1: The ledger
- **Scaffolding:** level 1 — first spreadsheet contact, first lesson of the
  spreadsheet skill; reasoning shown throughout, generous hints, rung-4 worked
  answers allowed in the first half. The formatting/sorting half runs level 1–2:
  goals plus hints for conditional formatting; full level-1 staging for the
  sorting disaster, which is new territory and a centerpiece.
- **Deliveries:** guided only (module-wide decision — see MODULE.md)
- **Status:** ready
- **Merged from:** the former `first-ledger` and `making-it-readable` cores
  (consolidation of Part 1's opening micro-lessons into one substantial lesson).

## Goal and payoff

Build the first sheet of the tracker and make it readable at a glance. First
half: the learner's best cards in a table, a Gain column that computes itself,
and three totals that answer "what is it all worth?" live. The beating heart is
the reveal: change one card's value and watch every dependent number update
without being told to. That moment — a document that recalculates — is the
single idea everything later in the module stands on, and it gets staged with
full weight.

Second half: the correct-but-raw ledger becomes legible — money that looks like
money, a header that never scrolls away, a Gain column that goes green or red
on its own, safe sorting, and filter views. The green/red glance is the
show-off moment and caps the lesson: someone reading over the learner's
shoulder sees which cards won and which lost without a word of explanation.

The skill with teeth arrives via the classic disaster: the learner deliberately
sorts a single column on a copy, watches the data relationships scramble, and
only then owns the sort-the-table-as-a-unit discipline.

Secondary goal: install both halves of the module's safety net as habits —
named versions before experiments on the real sheet, File → Make a copy for
destructive ones — before anything later leans on them.

## Prerequisites

This is the module's starting lesson. Conditions only — no lesson establishes
them:

- A web browser and a Google account. The account is free; it's created on
  Google's own sign-up page (the "Create account" option on any Google sign-in
  screen). Creating one asks for personal details and a birthdate — depending on
  age, an adult may need to create it or approve it. Stated plainly, no assumed
  household.
- A collection with cards the learner actually cares about — real data is a
  module constraint (MODULE.md).
- A rough idea of what the cards are worth. An honest guess or a quick search per
  card is fine today and the delivery says so explicitly; finding prices properly
  is later material.

## Establishes

- Verbatim citation for other cores: "a Collection tab, readable at a glance,
  that answers what the collection is worth — established by
  `modules/collection-tracker/lessons/building-the-ledger/`"
- Also establishes, citable informally: the learner knows the difference between
  a cell that stores and a cell that computes; can use the fill handle and SUM;
  has read #VALUE! and #REF! once each and seen the silent-SUM failure; knows
  the format-vs-value distinction (formatting changes how a value looks, never
  what it is); has the rows-are-units sorting discipline (sort the sheet or a
  whole range, never one column); knows filter views as the
  look-without-touching tool; and holds both safety-net habits — name a version
  before experimenting on the real sheet, File → Make a copy for destructive
  experiments. Later lessons reference these habits, never re-teach them.

## Facts

Sheet and grid basics:

- Google Sheets is free and runs in the browser at `sheets.google.com`
  (also reachable from the apps menu on any Google page). A new blank
  spreadsheet is started from there. [volatile] UI labels and layout shift; name
  controls plainly, have the learner find them by name.
- There is no save button. Sheets saves every change to Google Drive as it
  happens. Worth stating — new users look for one.
- Renaming the file: the title box at the top left (a new file says "Untitled
  spreadsheet"). Click it, type the new name. Canonical name: **Collection
  Tracker**.
- The grid: columns are lettered, rows are numbered, a cell is named by column
  letter + row number (`B3`). The box to the left of the formula bar shows the
  current cell's name.
- Tabs live in a strip at the bottom. Double-click a tab's name to rename it.
  Canonical: rename `Sheet1` to **Collection**.
- Canonical Collection columns, A–F, headers in row 1:
  `Card | Set | Date | Cost | Value | Gain`. Data starts in row 2.
- **Cost may be blank** for pulled cards. All formulas in this module must
  tolerate that. In arithmetic, Sheets treats a blank cell as 0, so a pulled
  card's Gain equals its full Value.

Formulas:

- Formulas start with `=`. The cell displays the result; the formula bar
  displays the formula. Enter commits.
- Canonical Gain formula: `=E2-D2` in F2, filled down.
- The fill handle: the small square at the bottom-right corner of a selected
  cell. Dragging it down copies the formula; references adjust per row
  (relative references — F9 gets `=E9-D9`).
- Range syntax: `D2:D10` is a rectangle of cells from D2 to D10. The open-ended
  form `D2:D` runs from D2 to the bottom of the column and keeps working as rows
  are added — canonical for this module's totals.
- Canonical totals block, to the right of the table so sorting can't disturb
  it: labels in H1:H3 (`Total Cost`, `Total Value`, `Total Gain`), formulas in
  I1:I3 (`=SUM(D2:D)`, `=SUM(E2:E)`, `=SUM(F2:F)`).
- Typing `=` and the first letters of a function name pops up autocomplete with
  a help card per function; every function's full help page is also at Google's
  Docs editors help center (support.google.com/docs). Phrase resiliently — no
  deep URLs.
- The alignment tell: numbers and dates right-align by default; text
  left-aligns. A number that sits left is the sheet saying "I read this as
  words."
- Text in arithmetic: a subtraction whose input is text shows the error
  `#VALUE!` — loud. `SUM` over a range **silently skips** cells it can't add —
  no error, a quietly wrong total. The loud/silent contrast is the point of the
  first break-it.
- Deleting a row: right-click the row number → Delete row.
- A formula pointing at one specific cell (`=F2`) shows `#REF!` if that exact
  cell is deleted. A range (`=SUM(F2:F)`) shrinks and survives the same
  deletion. The contrast is the point of the second break-it.
- Undo: Ctrl+Z (⌘Z on a Mac), or the Edit menu → Undo. Many steps deep.

Formatting and readability:

- Currency format: select the Cost, Value, and Gain columns (click column
  letter D, shift-click F selects D through F), then Format menu → Number →
  Currency. [volatile] menu wording drifts; find "Number" inside the Format
  menu, then the currency option.
- Formatting is display only. The stored value is untouched — the formula bar
  still shows the raw value for a selected cell. Load-bearing concept of the
  readability half.
- Bold: select row 1 (click the row number), Ctrl+B / ⌘B or the toolbar B.
- Freeze: View menu → Freeze → 1 row. Frozen rows stay put when scrolling and
  are left in place when the sheet is sorted. [verify: frozen rows excluded
  from "Sort sheet" — believed correct as of 2026-08, confirm in a live sheet]
- Conditional formatting: Format menu → Conditional formatting. Apply to range
  `F2:F`. Rule 1: "Greater than" 0, green fill. Rule 2 (added via "Add another
  rule"): "Less than" 0, red fill. Rules live in a side panel; a cell with no
  matching rule keeps its normal look. [volatile] panel layout shifts; the
  learner finds fields by their labels.
- Negative currency renders with a leading minus by default; the conditional
  red does the visual work regardless.

Sorting and views:

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

Safety net:

- Version history: in the File menu. "Name current version" marks a named
  restore point; "See version history" browses the timeline and can restore any
  point. Canonical named versions in this lesson: **first working ledger**
  (after the totals work) and **before first sort** (before sorting the real
  sheet). [volatile] menu wording may drift; find by name in the File menu.
- Copies: File menu → Make a copy — full duplicate in the learner's Drive,
  named at creation. The module's expendable surface (MODULE.md). Canonical
  copy name in this lesson: **Collection Tracker crash test**.
- Sheet size limit: there is a hard cap on cells per spreadsheet. [volatile] Do
  not assert the number; Go further points the learner at finding the current
  answer.

## Arc

### Orientation — given plainly

What a spreadsheet is: a grid of cells where each cell holds either a value or a
formula, and formulas recompute from the cells they reference. Google Sheets
named, located, and its no-save-button autosave stated. Cell naming (letter +
number) given at first contact with the grid. The column layout given as a
decision made for the learner today (they'll redesign tables themselves later in
the module). Value guesses explicitly licensed: honest guess or quick search,
truth-ish is fine, proper price research is later material. Where function
documentation lives: the in-sheet help card as you type, and the Docs editors
help center.

For the readability half: correct is for you, legible is for everyone else.
Formatting introduced as a second layer every cell has — the value, and the
costume the value wears. Currency, bold, freeze given as plain instructions
(they're switches, not puzzles). Conditional formatting named and explained —
formatting that a rule applies for you — before the learner configures it. For
sorting: the promise that one deliberate disaster on a copy is worth a hundred
warnings.

### Predictions to elicit

- You type `=E2-D2` into a cell and press Enter. What does the cell show — the
  text you typed, or something else?
- Later, you change the number in E2. Does the Gain cell update on its own, or
  do you have to do something?
- Guess the total value of the cards you're about to enter. An actual number —
  it gets checked against the sheet's answer.
- After the money columns show as currency, is the number stored in each cell
  different? How would you check?
- You select only the Value column and sort just that selection. What happens
  to the rest of the table?
- A date formatted as a plain number: what shows? Take a real guess at what the
  number would even mean.

### The work — goals and hint ladders

1. **A blank sheet with your name on it.** Go to sheets.google.com, start a
   blank spreadsheet, name the file Collection Tracker, rename the tab to
   Collection, type the six headers into row 1. All plain orientation — no
   hints, nothing withheld. Autosave stated here.
2. **Your best cards go in.** 10–20 cards, one per row from row 2. Each column's
   meaning stated: Card (name), Set (which set it's from), Date (when it was
   got — approximate is fine), Cost (what was paid — **blank if pulled from a
   pack**; the pack's money is a truth for another table, later), Value
   (today's honest number). The alignment tell named here as friction-point
   orientation: dates and numbers snap right, words sit left.
3. **A cell that computes.** The formula moment. Predict first (from the
   logbook), then type `=E2-D2` into F2 and watch. Cell shows a number; formula
   bar shows the formula. Both faces of the cell named. Then the fill handle,
   given plainly (a UI feature nobody can derive): drag F2's handle down to the
   last card row. Have them click a middle Gain cell and read its formula —
   the row numbers moved. Relative references named right there. Pulled cards
   observed: blank Cost, Gain equals Value, blank-is-zero stated.
4. **The totals.** Goal: labels in H1:H3, and three cells in I1:I3 that always
   show total Cost, total Value, total Gain — placed to the side on purpose
   (room for the table to grow downward, and — quietly — safe from the sorting
   that arrives later in the session). First hint-laddered goal; first lesson
   of the skill, so the ladder runs to rung 4.
   - Rung 1: the Gain formula did arithmetic on two cells you named. Now you
     want to add up a whole column. Click I2, type `=` and then the letter S,
     and read what the sheet offers you.
   - Rung 2: the tool is a function — a named operation that takes inputs in
     parentheses. The one that adds is `SUM`, and its input is a range: two
     cell names joined by a colon, like `E2:E20`, meaning "everything from
     here to there."
   - Rung 3: a range doesn't need a bottom. `E2:E` means "from E2 to the end of
     the column" — it keeps working when card 21 arrives. The help card that
     popped up when you typed `=SUM(` documents this; so does the SUM page at
     the Docs editors help center.
   - Rung 4 (worked, for comparison after something works): `=SUM(D2:D)` in I1,
     `=SUM(E2:E)` in I2, `=SUM(F2:F)` in I3.
   Then: check the guessed total against I2.
5. **Watch it live.** The reveal, staged with weight — this is the lesson's
   beating heart, not a checkbox. Pick one card. Before changing anything,
   predict exactly which cells will change if its Value goes up by 10. Change
   it. Watch the Gain cell and two of the three totals move the instant Enter
   lands. Nothing was told to recalculate. Then set the value back to the
   truth. The delivery gives this its own subsection and lets it breathe.
6. **Name this version.** File menu → Version history → Name current version →
   **first working ledger**. Orientation: Sheets has been keeping every change
   already; naming a version pins a point on that timeline that can be returned
   to from "See version history." This is the safety net for the whole module —
   the delivery says so plainly, because later in this session things get
   broken on purpose. This step is also the internal transition into the
   readability half: the ledger is now correct; the rest of the session makes
   it legible.
7. **Money that looks like money.** Select columns D through F, Format →
   Number → Currency. Instantly the sheet half-explains itself. Then the check
   that matters (prediction from the logbook): click any Value cell and read
   the formula bar — the raw number, unchanged. Formatting dressed the value;
   it didn't touch it. Blank Costs stay blank — currency format has nothing to
   dress.
8. **A header that stays put.** Bold row 1. Then View → Freeze → 1 row, and
   scroll: the data moves under the headers. Stated plainly: freezing also
   tells the sheet "this row is furniture, not data" — which quietly pays off
   when sorting arrives.
9. **Sort the real sheet, safely.** Rules-with-reasons, pointing forward: in
   Break it on purpose the learner causes the disaster these rules prevent, on
   a copy. Habit first: name a version, `before first sort`. Then: right-click
   column E's letter and Sort sheet Z→A. Whole rows travel together; the
   frozen header doesn't move; best card rises to row 2. Check a known card:
   its Cost, Date, Gain all came along. Totals unmoved in H/I — placed to the
   side earlier in the session for exactly this moment.
10. **Explore without rearranging.** Filter views. Data → Filter views →
    Create new filter view: a dark banner appears — the sign of being *inside*
    a view. Filter Set to one set only, sort by Gain inside the view, look
    around. Close the view: the sheet is exactly as it was. The tool for
    answering "just show me…" questions without touching the table everyone
    else sees.
11. **Green and red at a glance.** The closing goal and the show-off payoff.
    Every winning card's Gain shows on green, every losing card's on red,
    entirely on its own — including for cards added next month.
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
    No rung 4 — the panel guides, and by this point in the session the learner
    has several formula wins behind them. End by having the learner stand back
    and read their own collection at a glance — the tracker now looks like a
    product and explains itself.

### Break it on purpose — failures to cause, what each teaches, how to undo

Four deliberate breakages, exercising both halves of the safety net. The first
two happen on the real sheet, protected by named versions and undo — deliberate:
the learner should feel that net hold. The last two happen on a copy — the
module's other net, met here for the first time.

- **Words where numbers go.** Change one card's Cost to the text `about $20`.
  First tell: it sits left. Then read, carefully, that row's Gain cell and all
  three totals. Two different things happen — one loud, one silent. The Gain
  subtraction errors with `#VALUE!` (read the whole error; hovering the cell
  explains it); SUM skips the cell it can't add and presents a quietly wrong
  Total Cost with no error at all. Teaches: errors that shout are gifts; the
  dangerous failure is the number that looks fine and lies. Undo: retype the
  real cost.
- **Delete the ground under a formula.** Stage it: in a scratch cell (H6), type
  `=F2` — a formula pointing at one exact cell. Now right-click row 2's number
  and delete the row. H6 shows `#REF!` — a reference to a cell that no longer
  exists. Read it. Then look at the totals: fine. Teaches the contrast: ranges
  shrink and survive; pointers to one dead cell break. Undo: Ctrl+Z / ⌘Z (or
  Edit → Undo) brings the row back and heals the error; clear the scratch cell.
  Name version history as the deeper net if undo ever runs out.
- **The one-column sort** (the centerpiece — full staging, prediction checked).
  On a copy: File → Make a copy, name it `Collection Tracker crash test`. In
  the copy: select column E by its letter — only that column — then Data →
  Sort range, and sort the selection descending. Now *look at the table*.
  Values are in tidy order; every other column stayed where it was. Find a
  card whose value you know cold — the value in its row now belongs to some
  other card. No error anywhere. The sheet did exactly what it was told: "sort
  these cells." It has no idea rows are supposed to mean something — the
  meaning was in the learner's head, and one sorted column just severed it
  for every row at once. Connects explicitly to the earlier break-it: the
  silent wrong is the dangerous one, and this is the biggest silent wrong in
  spreadsheets. Undo works (Ctrl+Z / ⌘Z) — or throw the whole copy away; it
  was born for this. The rule extracted: **never sort a selection smaller
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

Three ideas, all about the gap between what a cell *is* and what it *shows* —
and what a row *means*.

The live document: a spreadsheet is a machine where every cell holds either a
value or a formula, and formulas re-run whenever any cell they reference
changes. That's why the totals moved on their own: nobody recalculates a
spreadsheet — it recalculates itself. This is the difference between this
tracker and a paper list with the same numbers on it. One layer deeper: Sheets
maintains a dependency graph — a private map of which cells feed which. F2
depends on E2 and D2; I2 depends on every cell in column E; when E5 changes,
the machine follows the map and re-runs exactly the cells downstream of E5,
nothing else. `#REF!` is a broken edge in that map seen from the outside. The
learner meets the same graph again when formulas start crossing between tabs.

Format vs value: every cell carries a value and, separately, instructions for
displaying it. Currency, date, bold, green — all costume. The formula bar
always shows the value naked, which makes it the tool for answering "what is
this cell really?" This is why the date trick worked — the calendar-looking
thing was a formatted number all along, and day-counts are what make time
arithmetic possible.

Sorting: a table's rows are records — each row is one card's facts, and the row
is the unit of meaning. A sort is a rearrangement of records. Hand the sorter
whole records and meaning survives any number of sorts; hand it one column and
it faithfully destroys the recordness of every row, silently, because the sheet
never knew about the meaning in the first place. The grid doesn't know a row
is "a card." The learner knows. That knowledge now has a discipline attached.

### Go further — open questions

- How big a collection could this sheet hold? There is a hard limit on how many
  cells one spreadsheet may contain — find the current number (the Docs editors
  help center documents limits), and work out how your collection compares.
- Some Gain cells are now sitting on red. How does seeing that in plain numbers
  feel, compared to not knowing? Is a ledger that tells the truth worth more
  than one that flatters?
- Number formats can be custom-built: a format that shows cents only when a
  value has them (whole dollars stay clean) is possible with a custom number
  format. The Docs editors help center documents the custom format language —
  a small puzzle in a tiny language.
- Genuinely open: is a card's "value" even one number? There's the price it
  last sold for, the price sellers ask, what a grader would change, what a
  friend would actually pay. If it isn't one number, what would you record
  instead? Nobody has a settled answer to this — pricing anything is an
  argument, not a lookup.
- Genuinely open: what actually makes a table "readable"? Find the ugliest
  real spreadsheet you can — a shared schedule, a league standings sheet, a
  price list from the wild — and name *precisely* why it hurts. Designers
  argue about this professionally and there is no settled answer.

## Delivery notes

- Merged from the former `first-ledger` and `making-it-readable` cores; their
  guidance carries over as follows.
- **guided:** the live-recalculation reveal (work step 5) and the one-column
  sort disaster (break-it 3) are the lesson's two full-weight moments — give
  each room and let the concrete moment do the work; no cheerleading around
  either. Keep the value-guess licensing explicit and unembarrassed: truth-ish
  today, rigor later.
- The loud/silent contrast in the first break-it must not be spoiled before the
  learner looks — instruct "read carefully," then explain. Same rhythm for the
  sort disaster: "now look at the table," then the explanation.
- The green/red step ends the work on purpose — the learner stands back and
  reads their own collection at a glance; that is the session's showable
  moment.
- The safe-sort step presents its rules as rules-with-reasons and explicitly
  points forward to Break it on purpose, where the disaster those rules
  prevent gets caused on a copy.
- No Mac assumption anywhere: undo is Ctrl+Z / ⌘Z / Edit menu. Any OS with a
  browser.
- Do not assert the cell cap, the epoch date, current UI labels, or exact menu
  wording — name menus plainly and have the learner find controls by name; the
  learner is invited to work out or look up which day is day zero.
- Forward references: none. Later material is only ever "later" — no lesson
  links out of this one except the standard reference pages and the logbook.
