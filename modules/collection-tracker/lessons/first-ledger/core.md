# What is it all worth?

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** first-ledger
- **Module / Part:** collection-tracker — Part 1: The ledger
- **Scaffolding:** level 1 — first spreadsheet contact, first lesson of the
  spreadsheet skill; reasoning shown throughout, generous hints, rung-4 worked
  answers allowed
- **Deliveries:** guided only (module-wide decision — see MODULE.md)
- **Status:** ready

## Goal and payoff

Build the first sheet of the tracker: the learner's best cards in a table, a Gain
column that computes itself, and three totals that answer "what is it all worth?"
live. The beating heart of the lesson is the reveal: change one card's value and
watch every dependent number update without being told to. That moment — a
document that recalculates — is the single idea everything later in the module
stands on, and it gets staged with full weight.

Payoff: one glance at one screen answers the question every collector gets asked.
The number is real, it's about the learner's own cards, and it stays current
forever. Showable to anyone.

Secondary goal: install the safety net (named versions) before the first
break-it-on-purpose, so every later lesson can lean on the habit.

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

- Verbatim citation for other cores: "a Collection tab that answers what the
  collection is worth — established by
  `modules/collection-tracker/lessons/first-ledger/`"
- Also establishes, citable informally: the learner knows the difference between
  a cell that stores and a cell that computes; can use the fill handle and SUM;
  has read #VALUE! and #REF! once each; and has the name-a-version-before-
  experimenting habit (this lesson introduces version history as the module's
  safety net — later lessons reference the habit, not re-teach it).

## Facts

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
- Formulas start with `=`. The cell displays the result; the formula bar
  displays the formula. Enter commits.
- Canonical Gain formula: `=E2-D2` in F2, filled down.
- The fill handle: the small square at the bottom-right corner of a selected
  cell. Dragging it down copies the formula; references adjust per row
  (relative references — F9 gets `=E9-D9`).
- Range syntax: `D2:D10` is a rectangle of cells from D2 to D10. The open-ended
  form `D2:D` runs from D2 to the bottom of the column and keeps working as rows
  are added — canonical for this module's totals.
- Canonical totals block, to the right of the table so later sorting can't
  disturb it: labels in H1:H3 (`Total Cost`, `Total Value`, `Total Gain`),
  formulas in I1:I3 (`=SUM(D2:D)`, `=SUM(E2:E)`, `=SUM(F2:F)`).
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
- Version history: in the File menu. "Name current version" marks a named
  restore point; "See version history" browses the timeline and can restore any
  point. Canonical first named version: **first working ledger**. [volatile]
  menu wording may drift; find by name in the File menu.
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

### Predictions to elicit

- You type `=E2-D2` into a cell and press Enter. What does the cell show — the
  text you typed, or something else?
- Later, you change the number in E2. Does the Gain cell update on its own, or
  do you have to do something?
- Guess the total value of the cards you're about to enter. An actual number —
  it gets checked against the sheet's answer.
- How many of your cards do you expect are worth less than you paid for them?

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
   (room for the table to grow downward). This is the one hint-laddered goal;
   first lesson of the skill, so the ladder runs to rung 4.
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
   truth. The delivery should give this its own subsection and let it breathe.
6. **Name this version.** File menu → Version history → Name current version →
   **first working ledger**. Orientation: Sheets has been keeping every change
   already; naming a version pins a point on that timeline that can be returned
   to from "See version history." This is the safety net for the whole module —
   the delivery says so, because the very next section starts breaking things.

### Break it on purpose — failures to cause, what each teaches, how to undo

Both happen on the real sheet, protected by the named version and undo — that's
deliberate: the learner should feel the net hold.

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

### What just happened — the explanation, one layer deeper

A spreadsheet is a machine where every cell holds either a value or a formula,
and formulas re-run whenever any cell they reference changes. That's why the
totals moved on their own: nobody recalculates a spreadsheet — it recalculates
itself. This is the live-document idea, and it's the difference between this
tracker and a paper list with the same numbers on it.

One layer deeper: Sheets maintains a dependency graph — a private map of which
cells feed which. F2 depends on E2 and D2; I2 depends on every cell in column E;
so when E5 changes, the machine follows the map and re-runs exactly the cells
downstream of E5, nothing else. `#REF!` is what a broken edge in that map looks
like from the outside. The learner will meet the same graph again when formulas
start crossing between tabs.

### Go further — open questions

- How big a collection could this sheet hold? There is a hard limit on how many
  cells one spreadsheet may contain — find the current number (the Docs editors
  help center documents limits), and work out how your collection compares.
- Some Gain cells may already be negative. How does seeing that in plain
  numbers feel, compared to not knowing? Is a ledger that tells the truth worth
  more than one that flatters?
- Genuinely open: is a card's "value" even one number? There's the price it
  last sold for, the price sellers ask, what a grader would change, what a
  friend would actually pay. If it isn't one number, what would you record
  instead? Nobody has a settled answer to this — pricing anything is an
  argument, not a lookup.

## Delivery notes

- **guided:** the reveal (step 5) carries the lesson — give it room and let the
  concrete moment do the work; no cheerleading around it. Keep the value-guess
  licensing explicit and unembarrassed: truth-ish today, rigor later.
- The loud/silent contrast in the first break-it must not be spoiled before the
  learner looks — instruct "read carefully," then explain.
- No Mac assumption anywhere: undo is Ctrl+Z / ⌘Z / Edit menu. Any OS with a
  browser.
- Do not assert the cell cap, current UI labels, or exact menu wording — name
  menus plainly and have the learner find controls by name.
- Forward references: none. Later material is only ever "later" — no lesson
  links out of this one except the standard reference pages and the logbook.
