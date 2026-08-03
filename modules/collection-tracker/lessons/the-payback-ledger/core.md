# The payback ledger

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** the-payback-ledger
- **Module / Part:** collection-tracker — Part 2 — Money owed
- **Scaffolding:** level 2 — second-plus lesson of formula-writing and fill-down
  (both established in `first-ledger`); the new element is the running-balance
  pattern, which gets a hint ladder ending in a completion problem
- **Deliveries:** guided only (module-wide decision in MODULE.md)
- **Status:** ready

## Goal and payoff

A new Payback tab that turns "I think I still owe you something" into one number:
every fronted purchase carried over as a Borrowed row, every payment as a Paid row,
and a running Balance column where each row builds on the row above. Payoff is
social and concrete: the learner sits down with whoever fronted the money, walks
them through the tab, and both sides agree on a single number — no arguing from
memory. The learner watches the balance move when rows change, and owns the words
for what they're seeing: debt, balance, payment.

This is the module's money-concepts heart. **Zero moralizing** — the ledger is a
tool for clarity, not a lecture about borrowing. Debt here is a number with a
direction, nothing more.

## Prerequisites

- A Purchases tab recording every buy, its cost, and who paid — established by
  `lessons/every-pack-you-open/`
- Formulas, fill-down, and currency formatting on the Collection tab — established
  by `lessons/first-ledger/` (formatting polished in `lessons/making-it-readable/`;
  do not hard-require that lesson, currency formatting is enough)

If no purchase was ever fronted, the lesson still works: build the tab empty, ready
for the first fronted pack. Say this once, lightly, in the delivery.

## Establishes

- A Payback tab (Date | What | Borrowed | Paid | Balance) with every fronted
  purchase carried over, payments recorded, and a running Balance formula filled
  down — a number both sides trust — established by `lessons/the-payback-ledger/`
- The running-balance pattern: a formula that references the row above and is
  filled down, plus first contact with absolute references (`$`)

## Facts

- New tab: the **+** control at the bottom-left of the sheet adds a tab; double-click
  a tab's name to rename it [volatile in exact placement; describe by function].
- Payback tab columns: `Date | What | Borrowed | Paid | Balance` (A–E). Row 1 is
  headers; data starts row 2.
- Carrying over: every Purchases row with Paid by = `Fronted` becomes a Payback row
  with its Date, its Item as What, its Cost as Borrowed, Paid left empty.
- Payments are rows with Paid filled and Borrowed empty. What examples: allowance,
  birthday money, chore money — always examples, never assumptions about where the
  learner's money comes from.
- Rows go in date order. New rows are added at the bottom; the ledger grows
  downward.
- First balance (row 2): `=C2-D2`. Every later row: previous balance + this row's
  Borrowed − this row's Paid, i.e. row 3 holds `=E2+C3-D3`, filled down.
- Empty cells count as 0 in arithmetic — so mixed Borrowed/Paid rows need no
  special handling.
- Fill-down rewrites references relative to position: `=E2+C3-D3` becomes
  `=E3+C4-D4` one row lower. References are **relative** by default.
- Absolute references: a `$` before a row or column freezes that part. The
  expanding-range alternative for the same balance column:
  `=SUM(C$2:C2)-SUM(D$2:D2)` filled down — the start of each range is pinned, the
  end moves. Same numbers, different shape. This is the one-layer-deeper for
  relative vs absolute, shown after success, not required for the main path.
- Inserting a row (right-click the row number → insert a row above [volatile
  wording]): existing formula references follow the cells they pointed at when rows
  shift, so the formula below the insertion now skips the new row, and the new row
  has no Balance formula at all — a hole in the chain. Repair: select the last
  correct Balance cell above the hole and fill down from there to the bottom;
  fill-down rewrites the whole chain.
- Deleting a row (right-click the row number → delete row): every balance below
  recomputes instantly. Undo: Edit menu → Undo, or Ctrl+Z / Cmd+Z.
- Currency format for Borrowed, Paid, Balance: Format menu → Number → Currency
  [volatile in menu layout; learner knows this move already].
- Named versions before experiments: File menu → Version history → name the
  current version [volatile wording] — the module's standard pre-experiment move.
- Chart (Go further only): select the Date and Balance columns (hold Ctrl/Cmd to
  select the second column), then Insert menu → Chart. Charts get real treatment
  later in the module; deliveries must not name or link the future lesson.

## Arc

### Orientation — given plainly

What a ledger is: a list of money events in date order, never rewritten, only
added to — plus one derived column that answers "so where does that leave us?"
The two event kinds here: money fronted for you (Borrowed) and money you gave back
(Paid). The tab layout, the carrying-over job, and the fact that the Balance
column is computed, not typed, are all stated openly. The only thing withheld is
how a formula can build on the row above it.

Words are named after being seen, not before: what you owe is a **debt**; the
amount still owed right now is the **balance**; each payment shrinks it.

### Predictions to elicit

- Before carrying anything over: what do you think the balance will come to?
  Write an actual number, then find out how far off memory was.
- When a Paid row is added in the middle of the dates, what should happen to every
  balance below it?
- As more rows are added over the months, what does the Balance column's last
  number do — and what would the whole column look like if you read it top to
  bottom a year from now?

### The work — goals and hint ladders

1. **Make the Payback tab.** Add a tab, name it Payback, headers
   `Date | What | Borrowed | Paid | Balance`. Format the three money columns as
   currency. Given plainly, no hints.
2. **Carry the debts over.** Every Fronted row in Purchases becomes a Borrowed row
   here, in date order. The honesty point, made without moralizing: the number at
   the bottom is only worth trusting if every fronted purchase made the trip — a
   ledger with missing rows is a story, not a record. No hints; this is data
   entry with a purpose.
3. **Record what's already been paid.** Any money already handed back — allowance,
   gift money, chore money, whatever it actually was — as Paid rows on their dates.
   If nothing has been paid yet, skip; the column is ready.
4. **The running balance** — the technical heart. Goal: a Balance column where
   every row answers "after this row, what's still owed?" Row 2 is given openly:
   no history above it, so its balance is its own row, `=C2-D2`. The puzzle is
   row 3 and beyond.
   - Rung 1: you could write `=C2+C3-D2-D3` in row 3, and something longer in
     row 4, and longer again forever. Before doing that: one cell on the sheet
     already holds most of that arithmetic, finished. Which cell?
   - Rung 2: this pattern is called a **running balance**: each row's answer is
     built from the answer above it. Row 3 needs exactly three ingredients — the
     balance so far, this row's Borrowed, this row's Paid. A formula can use E2
     like any other cell.
   - Rung 3 (completion problem): row 3 is `=____ + C3 - D3` — the blank is the
     cell that already holds the balance so far. Fill it in, then fill down the
     whole column. Then click three or four of the filled cells and read what
     fill-down actually wrote in each.
   After it works: change one early Paid amount and watch every balance below it
   recompute. Change it back.
5. **Show it.** Sit down with whoever fronted the money and walk through the tab:
   every fronted purchase, every payment, the balance at the bottom. If they
   remember a row that's missing, add it while they watch and let the balance
   update in front of both of you. The deliverable is agreement: one number,
   trusted from both sides, and no more arguing from memory.

### Break it on purpose — failures to cause, what each teaches, how to undo

Name a version first (File → Version history) — the standard pre-experiment move.

- **Insert a row into the middle of the chain.** Right-click a row number in the
  middle of the ledger, insert a row above, and type in a forgotten borrowed
  entry. Now read the Balance column top to bottom — where is the hole? Click the
  Balance cell just below the new row and read its formula: which row is it
  pointing at? Teaches: when rows move, references follow the cells they pointed
  at — the chain didn't break, but the new row was never part of it, and nothing
  re-chains automatically. Fix: select the last correct Balance above the hole and
  fill down to the bottom; verify the final number changed by exactly the new
  row's amount.
- **Delete a payment.** Right-click a Paid row's number and delete the whole row.
  Every balance below jumps back up by that amount — the debt reappears, because
  the ledger only knows what its rows say. Undo it (Edit → Undo) and watch the
  payment count again. Teaches: rows are the facts, the balance is derived, and
  the ledger remembers everything — which is the point of keeping one.

### What just happened — the explanation

A ledger is two things stapled together: an append-only list of facts (rows that
get added, never rewritten) and a derived answer (the balance, computed from the
facts). That is the same structure as a bank account: a bank statement is
literally this — a list of money events with a running balance down the right-hand
side — at scale. The learner has now built the thing banks print.

The words, plainly: money owed is a **debt**. The amount still owed right now is
the **balance**. Each **payment** shrinks it. Paying down a number you can see
behaves differently from paying down a number you remember — the column trending
toward zero is visible progress, and both sides watch the same column.

One layer deeper on references: fill-down worked because references are
**relative** — `E2` in the row-3 formula means "the cell one up and in column E,"
so each copy points at its own previous row. Sometimes you need the opposite: a
reference that refuses to move. A `$` pins it. Comparison, now that the column
works: `=SUM(C$2:C2)-SUM(D$2:D2)` filled down produces the identical balance —
each range's start is pinned to row 2 with `$`, its end travels with the row, so
every row sums everything above it. Two shapes, one truth; the `$` returns often
from here on.

### Go further — open questions

- Select the Date and Balance columns and try inserting a chart. Whatever comes
  out, it is a picture of a debt shrinking (or not) over time — worth seeing even
  roughly. Making charts good is a later concern; do not polish, just look.
- On a copy of the spreadsheet (File → Make a copy — experiments that rewrite
  history belong on copies): what would it mean if whoever fronted the money
  charged **interest** — say 5% of the outstanding balance added at the end of
  each month? Add those rows to the copy and pay it down slowly. What does the
  balance do if payments are smaller than the interest rows? This is how loans
  work everywhere; the copy is a place to watch the mechanism with no stakes.
  Keep it a game — the point is seeing the mechanism, not a warning label.
- Genuinely open: the balance is just a number, and either side could have kept it
  in their head. Why does both sides trusting *one* number matter more than what
  the number actually is? What breaks between people when there are two numbers?

## Delivery notes

- **guided:** the tone risk is moralizing — any hint of "debt is bad" or "be
  responsible" breaks the module's framing. The ledger is an instrument. The
  interest experiment in Go further stays judgment-free: a mechanism to watch,
  not a cautionary tale.
- "Whoever fronted the money" throughout — never parents, never an assumed
  household.
- The insert-a-row break-it must let the learner find the hole themselves before
  the explanation lands; do not pre-announce what will be wrong.
- If the learner has no fronted purchases, one light sentence keeps the lesson
  valid (build it ready); do not build a hypothetical dataset.
