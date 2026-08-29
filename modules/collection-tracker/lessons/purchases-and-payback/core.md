# Tracking purchases and money owed

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** purchases-and-payback
- **Module / Part:** collection-tracker — Parts 1–2: The ledger / Money owed
- **Scaffolding:** level 2 — later lessons of the spreadsheet skill. Goals plus
  hints; concepts named but not applied for the learner. New syntax
  (cross-sheet references) is orientation and given plainly; applying it is
  the learner's work. The running-balance pattern gets a hint ladder ending in
  a completion problem.
- **Deliveries:** guided only (module-wide decision — see MODULE.md)
- **Status:** ready
- **Merged from:** the former `every-pack-you-open` and `the-payback-ledger`
  cores (consolidation into one substantial lesson: record every buy and who
  paid, then settle what "Fronted" means).

## Goal and payoff

First half: add the second table — a Purchases tab recording every buy (packs,
boxes, singles, supplies) with cost and who paid. This is data design arriving
on foot: cards and purchases are different *kinds* of thing, so they get
different tables. Then the first cross-sheet formula: Collection's summary
block gains a live "Total spent" read straight out of Purchases, so one screen
answers both of the collector's big questions — what is it worth, and what has
it cost.

Deliberate cliffhanger, kept: the learner is led to notice questions the
tracker now contains the data for but cannot yet answer in a live cell — "how
much of this was fronted?", "how much went on packs versus singles?" The tool
for those (conditional adding) is later material — resolved in
`modules/collection-tracker/lessons/stats-and-clean-data/` — and is not taught
here; this lesson's job is to make the learner *want* it and log the wall.

Second half: the Paid by column's `Fronted` rows get settled. A new Payback tab
turns "I think I still owe you something" into one number: every fronted
purchase carried over as a Borrowed row, every payment as a Paid row, and a
running Balance column where each row builds on the row above. Payoff is
social and concrete: the learner sits down with whoever fronted the money,
walks them through the tab, and both sides agree on a single number — no
arguing from memory. The learner owns the words for what they're seeing: debt,
balance, payment.

The payback half is the module's money-concepts heart. **Zero moralizing** —
the ledger is a tool for clarity, not a lecture about borrowing. Debt here is
a number with a direction, nothing more.

## Prerequisites

- A Collection tab, readable at a glance, that answers what the collection is
  worth — established by `modules/collection-tracker/lessons/building-the-ledger/`
  (includes formulas, fill-down, SUM, currency formatting, the totals block in
  H/I, and the version-naming and copy habits).

If no purchase was ever fronted, the payback half still works: build the tab
empty, ready for the first fronted pack. Say this once, lightly, in the
delivery.

## Establishes

- Verbatim citation for other cores: "a Purchases tab recording every buy, its
  cost, and who paid, plus a Payback tab with a running balance both sides
  trust — established by
  `modules/collection-tracker/lessons/purchases-and-payback/`"
- Also establishes: cross-sheet reference syntax (`Purchases!D2`,
  `Purchases!D2:D`); the tab-per-kind-of-thing design idea; the going-forward
  logging rule (every buy gets a row the day it happens); a logged open
  question ("how much was fronted?") that the stats material answers
  (`lessons/stats-and-clean-data/`); the running-balance pattern (a formula
  referencing the row above, filled down); and first contact with absolute
  references (`$`).

## Facts

Purchases tab:

- New tab: the `+` at the left end of the tab strip at the bottom. Rename by
  double-clicking the new tab. Canonical name: **Purchases**.
- Canonical Purchases columns, A–F, headers in row 1:
  `Date | Item | Type | Cost | Paid by | Notes`. Data from row 2.
- Canonical Type values: `Pack`, `Box`, `Single`, `Supplies` — exact words,
  same spelling and capitalization every time. The *why it must match*
  lesson comes later (`stats-and-clean-data`, per MODULE.md — this lesson only
  states the habit: pick exact words and stick to them; do not explain
  category-matching failures here, they need to be felt first later).
- Canonical Paid by values: `Me`, `Fronted`. "Fronted" defined: someone
  else's money bought this — whoever fronted the money is owed it. Settling
  what Fronted really means is this lesson's own second half.
- Backfill honestly: rememberable purchases only, estimates marked as such in
  Notes. Going forward, live: every buy gets a row the day it happens.
- Purchases summary block, same pattern as Collection's: `Total spent` label
  in H1, `=SUM(D2:D)` in I1.
- Currency-format column D; bold + freeze row 1 — rehearsed skills, stated as
  one-line reminders, not re-taught.
- SUMIF exists and is deliberately NOT taught or named in learner text here —
  the conditional-adding tool belongs to the stats lesson (MODULE.md design
  note: the wall is felt here, the cure arrives in
  `lessons/stats-and-clean-data/` — the sanctioned forward link).

Cross-sheet references:

- Syntax: `TabName!CellOrRange` — `=Purchases!D2` shows one cell from another
  tab; `=SUM(Purchases!D2:D)` sums a range from another tab. Tab names
  containing spaces need single quotes: `='Pack log'!D2`. This syntax is
  underivable → plain orientation, never behind a hint.
- Canonical cross-sheet cell: on Collection, `Total Spent` label in H4,
  `=SUM(Purchases!D2:D)` in I4 (under the existing H1:I3 block).
- Renaming a tab that formulas reference: Sheets rewrites every referencing
  formula to the new name — the reference follows the tab, it does not
  break. Delivery stages this as predict-then-test; the explanation lands
  after observation.
- Deleting a tab: right-click the tab → Delete; a confirmation warning
  appears (read it whole — read-the-error habit). After deletion, referencing
  formulas show `#REF!`. Undo (Ctrl+Z / ⌘Z / Edit → Undo) restores the
  deleted tab and heals the references. [verify: undo restores a deleted
  sheet in current Sheets — believed correct as of 2026-08]
- Version history and named versions: established habit (building-the-ledger);
  canonical version name before the tab experiments: `before tab experiments`.

Payback tab:

- Payback tab columns: `Date | What | Borrowed | Paid | Balance` (A–E). Row 1
  is headers; data starts row 2. Currency format for the three money columns.
- Carrying over: every Purchases row with Paid by = `Fronted` becomes a
  Payback row with its Date, its Item as What, its Cost as Borrowed, Paid left
  empty.
- Payments are rows with Paid filled and Borrowed empty. What examples:
  allowance, birthday money, chore money — always examples, never assumptions
  about where the learner's money comes from.
- Rows go in date order. New rows are added at the bottom; the ledger grows
  downward.
- First balance (row 2): `=C2-D2`. Every later row: previous balance + this
  row's Borrowed − this row's Paid, i.e. row 3 holds `=E2+C3-D3`, filled down.
- Empty cells count as 0 in arithmetic — so mixed Borrowed/Paid rows need no
  special handling.
- Fill-down rewrites references relative to position: `=E2+C3-D3` becomes
  `=E3+C4-D4` one row lower. References are **relative** by default
  (established in building-the-ledger; deepened here).
- Absolute references: a `$` before a row or column freezes that part. The
  expanding-range alternative for the same balance column:
  `=SUM(C$2:C2)-SUM(D$2:D2)` filled down — the start of each range is pinned,
  the end moves. Same numbers, different shape. This is the one-layer-deeper
  for relative vs absolute, shown after success, not required for the main
  path.
- Inserting a row (right-click the row number → insert a row above [volatile
  wording]): existing formula references follow the cells they pointed at when
  rows shift, so the formula below the insertion now skips the new row, and
  the new row has no Balance formula at all — a hole in the chain. Repair:
  select the last correct Balance cell above the hole and fill down from there
  to the bottom; fill-down rewrites the whole chain.
- Deleting a row (right-click the row number → delete row): every balance
  below recomputes instantly. Undo: Edit menu → Undo, or Ctrl+Z / ⌘Z.
- (Not delivered: the former payback core carried a Go-further chart teaser —
  Date + Balance columns, Insert menu → Chart. Dropped in the merge; charts
  get real treatment later in the module. If ever restored, deliveries must
  not name or link the future charts lesson.)

## Arc

### Orientation — given plainly

The design idea up front, in plain words: the Collection tab's rows are
*things you have*; a purchase is a different kind of thing — an *event that
happened*, with its own facts (when, what, what it cost, whose money). A
different kind of thing gets its own table, and in a spreadsheet a table gets
a tab. One file, several tables — the same decision every database designer
makes, met here at natural size. Column meanings, the canonical Type and Paid
by words, and the exact-words habit stated plainly. Cross-sheet syntax given
plainly when its moment comes.

For the payback half: what a ledger is — a list of money events in date order,
never rewritten, only added to — plus one derived column that answers "so
where does that leave us?" The two event kinds here: money fronted for you
(Borrowed) and money you gave back (Paid). The tab layout, the carrying-over
job, and the fact that the Balance column is computed, not typed, are all
stated openly. The only thing withheld is how a formula can build on the row
above it.

Words are named after being seen, not before: what you owe is a **debt**; the
amount still owed right now is the **balance**; each payment shrinks it.

### Predictions to elicit

- Total spent on this hobby, ever — an actual number, guessed before the
  sheet answers. (For most people the honest number lands high.)
- What share of that spending was someone else's money — and, of what was
  fronted, how much do you think you still owe? An actual number; memory gets
  checked against the ledger at the end.
- Later, a formula on Collection will reference the Purchases tab by name.
  If the tab is then renamed — does the formula break, or follow?
- When a Paid row is added in the middle of the dates, what should happen to
  every balance below it?
- As more rows are added over the months, what does the Balance column's last
  number do — and what would the whole column look like, read top to bottom,
  if the payback is going well?

### The work — goals and hint ladders

1. **A second table for a different kind of thing.** Orientation delivered
   (see above), then: `+` on the tab strip, rename to Purchases, headers
   `Date | Item | Type | Cost | Paid by | Notes` in row 1. Reminders, one
   line each: currency-format column D, bold and freeze row 1 — the learner
   has done all three before.
2. **The honest backfill.** Enter every purchase that can honestly be
   remembered — the exact ones from receipts or order history, the
   approximate ones marked as estimates in Notes. Type gets one of the four
   exact words; Paid by gets `Me` or `Fronted`, with Fronted defined right
   here and the internal forward-mention placed (what Fronted really means,
   and paying it down, is the second half of this session). Then the
   going-forward rule, stated as an actual product of this session: from
   today, every buy gets a row the day it happens. The backfill is a
   snapshot; the habit is the tracker.
3. **What has all of it cost?** Goal: a live Total spent on the Purchases
   tab — label H1, total in I1 — same pattern as Collection's block. Rehearsed
   SUM; level-2 support:
   - Rung 1: this is the same shape as the totals built on Collection —
     one label, one open-ended SUM next door.
   - Rung 2: `=SUM(D2:D)` in I1. (Single rung to a worked line is
     acceptable here: rehearsed skill, the interest is elsewhere.)
   Then the logbook check: guessed total vs. real total.
4. **The question with no cell yet.** Staged wall, on purpose. The learner
   is asked: how much of Total spent was fronted money? Explore honestly:
   a filter view shows only the Fronted rows (rehearsed skill), and the rows
   can be added up by eye — but there is no *live cell* holding the answer,
   and hand-adding rots the moment the next purchase lands. Same for "how
   much has gone on packs versus singles?" The data is all there; the tool
   for asking "add up only the rows where…" is real and arrives later in
   this module — the cliffhanger's resolution is
   `lessons/stats-and-clean-data/` (sanctioned forward link by title). Log
   the wall in the logbook (walls template) — wanting a tool before meeting
   it is the point. No SUMIF named, nothing taught. Note the wall's edge:
   the *total* fronted has no live cell yet — but "what do I still owe?" is
   a different question, and the rest of this session answers it properly.
5. **Tabs that read each other.** The syntax, plainly: a formula can
   reference cells on another tab by prefixing the tab's name and an
   exclamation mark — `=Purchases!D2` is "cell D2 on the Purchases tab";
   ranges work too: `Purchases!D2:D`; names with spaces need quotes:
   `='Pack log'!D2`. Try the toy first: in any scratch cell on Collection,
   `=Purchases!D2`, watch one tab display another's cell, then clear it.
   Goal: Collection's summary block gains a fourth row — `Total Spent` in
   H4, live total from Purchases in I4.
   - Rung 1: the formula is the Total spent formula from Purchases, written
     from Collection's point of view — say where the range lives.
   - Rung 2: `=SUM(Purchases!D2:D)`.
   Close on the payoff: one screen now answers both questions — worth next to
   cost — and the two will never drift, because both ends are live. Internal
   transition into the payback half: the Paid by column is still just
   recording a fact; the Fronted rows are owed to someone, and right now what
   is still owed lives in two memories.
6. **Make the Payback tab.** Add a tab, name it Payback, headers
   `Date | What | Borrowed | Paid | Balance`. Format the three money columns
   as currency. Given plainly, no hints.
7. **Carry the debts over.** Every Fronted row in Purchases becomes a Borrowed
   row here, in date order. The honesty point, made without moralizing: the
   number at the bottom is only worth trusting if every fronted purchase made
   the trip — a ledger with missing rows is a story, not a record. No hints;
   this is data entry with a purpose.
8. **Record what's already been paid.** Any money already handed back —
   allowance, gift money, chore money, whatever it actually was — as Paid rows
   on their dates. If nothing has been paid yet, skip; the column is ready.
9. **The running balance** — the technical heart. Goal: a Balance column where
   every row answers "after this row, what's still owed?" Row 2 is given
   openly: no history above it, so its balance is its own row, `=C2-D2`. The
   puzzle is row 3 and beyond.
   - Rung 1: you could write `=C2+C3-D2-D3` in row 3, and something longer in
     row 4, and longer again forever. Before doing that: one cell on the sheet
     already holds most of that arithmetic, finished. Which cell?
   - Rung 2: this pattern is called a **running balance**: each row's answer
     is built from the answer above it. Row 3 needs exactly three
     ingredients — the balance so far, this row's Borrowed, this row's Paid.
     A formula can use E2 like any other cell.
   - Rung 3 (completion problem): row 3 is `=____ + C3 - D3` — the blank is
     the cell that already holds the balance so far. Fill it in, then fill
     down the whole column. Then click three or four of the filled cells and
     read what fill-down actually wrote in each.
   After it works: change one early Paid amount and watch every balance below
   it recompute. Change it back. Check the bottom number against the logbook
   prediction of what was still owed.
10. **Show it.** Sit down with whoever fronted the money and walk through the
    tab: every fronted purchase, every payment, the balance at the bottom. If
    they remember a row that's missing, add it while they watch and let the
    balance update in front of both of you. The deliverable is agreement: one
    number, trusted from both sides, and no more arguing from memory.

### Break it on purpose — failures to cause, what each teaches, how to undo

Named version first: `before tab experiments` — the established habit, one
line. One net covers all four experiments.

- **Rename a tab out from under a formula.** The prediction from the top of
  the session gets tested. Double-click the Purchases tab, rename it to
  anything (`Loot`). Go look at Collection's I4 — the value, and the formula
  bar. The formula now *says the new name*: Sheets rewrote it. The reference
  was never to the text "Purchases"; it points at the tab itself, and the
  displayed formula is just how that pointer is spelled today. Same
  dependency graph as the first lesson, now spanning tabs. Rename it back;
  watch the formula follow again. Undo also works.
- **Delete a tab.** Right-click Purchases → Delete — and read the whole
  warning before clicking through; the habit is reading what the machine
  says before agreeing to it. Delete. Collection's I4: `#REF!` — its
  dependency now points at nothing, and every row of purchase data went with
  the tab. Feel the weight: a tab is structure; deleting one deletes a whole
  table and breaks every formula that fed from it. Undo: Ctrl+Z / ⌘Z (or
  Edit → Undo) — the tab returns, data and all, and I4 heals. And beneath
  undo, the named version is the deeper net — restorable from Version history
  whenever undo isn't enough.
- **Insert a row into the middle of the chain.** On Payback: right-click a
  row number in the middle of the ledger, insert a row above, and type in a
  forgotten borrowed entry. Now read the Balance column top to bottom — where
  is the hole? Click the Balance cell just below the new row and read its
  formula: which row is it pointing at? Teaches: when rows move, references
  follow the cells they pointed at — the chain didn't break, but the new row
  was never part of it, and nothing re-chains automatically. Fix: select the
  last correct Balance above the hole and fill down to the bottom; verify the
  final number changed by exactly the new row's amount. The delivery must let
  the learner find the hole themselves before the explanation lands.
- **Delete a payment.** Right-click a Paid row's number and delete the whole
  row. Every balance below jumps back up by that amount — the debt reappears,
  because the ledger only knows what its rows say. Undo it (Edit → Undo) and
  watch the payment count again. Teaches: rows are the facts, the balance is
  derived, and the ledger remembers everything — which is the point of
  keeping one.

### What just happened — the explanation, one layer deeper

One file, several tables. The tracker now has a table of *things* (cards
owned) and two tables of *events* (money spent; money borrowed and paid
back), and they earned separate tabs because they are different kinds —
different facts per row, different columns, different reasons to grow.
Choosing what kinds of thing exist and giving each its own table is data
design — the same act, at the same moment of need, that database designers
perform for businesses; it arrived here on foot, because one table couldn't
honestly hold two kinds.

One layer deeper on addresses: every cell always had a full address — tab,
column, row. `Purchases!D2` is the long form of an address that was being
abbreviated all along, the way "D2" quietly meant "D2 on the tab you're
standing on." The dependency graph from the first lesson follows full
addresses, which is why it crosses tabs without noticing, why renaming a tab
rewrote formulas instead of breaking them (references point at things, not at
spellings), and why deleting the tab produced `#REF!` — the thing itself was
gone.

The ledger idea: a ledger is two things stapled together — an append-only
list of facts (rows that get added, never rewritten) and a derived answer
(the balance, computed from the facts). That is the same structure as a bank
account: a bank statement is literally this — a list of money events with a
running balance down the right-hand side — at scale. The learner has now
built the thing banks print.

The words, plainly: money owed is a **debt**. The amount still owed right now
is the **balance**. Each **payment** shrinks it. Paying down a number you can
see behaves differently from paying down a number you remember — the column
trending toward zero is visible progress, and both sides watch the same
column.

One layer deeper on references: fill-down worked because references are
**relative** — `E2` in the row-3 formula means "the cell one up and in column
E," so each copy points at its own previous row. Sometimes you need the
opposite: a reference that refuses to move. A `$` pins it. Comparison, now
that the column works: `=SUM(C$2:C2)-SUM(D$2:D2)` filled down produces the
identical balance — each range's start is pinned to row 2 with `$`, its end
travels with the row, so every row sums everything above it. Two shapes, one
truth; the `$` returns often from here on.

The questions that couldn't be answered — fronted total, spend by type — are
the cliffhanger, and they are exactly the right shape: "add up only the rows
where…" is a real operation with a real tool, and it arrives later in this
module (`lessons/stats-and-clean-data/`). The wall was logged; the cure is
coming.

### Go further — open questions

- What other *kinds* of thing might deserve their own tab someday? Cards
  sold would be events with a price and fees; the collection's total value
  on a given date would be a snapshot; trades are events where no money
  moves at all. For each: what would its columns be? (Several of these
  become real tabs later in this module.)
- The honest number nobody computes: Total Value minus Total Spent. Gain
  compares each card to its own cost — but packs cost money too, and blank
  Costs hid that from the Gain column. Is Value-minus-spent the *true* "am
  I ahead?" number? Is it even fair — supplies protect cards but never gain
  value. What would the fairest single number be?
- On a copy of the spreadsheet (File → Make a copy — experiments that rewrite
  history belong on copies): what would it mean if whoever fronted the money
  charged **interest** — say 5% of the outstanding balance added at the end of
  each month? Add those rows to the copy and pay it down slowly. What does the
  balance do if payments are smaller than the interest rows? This is how loans
  work everywhere; the copy is a place to watch the mechanism with no stakes.
  Keep it a game — the point is seeing the mechanism, not a warning label.
- Genuinely open: Purchases holds packs, boxes, singles, and supplies in
  one table separated by a Type column — yet cards got a whole separate
  tab, and so did the payback events. Both choices felt natural. So where is
  the line between "one table with a Type column" and "two different
  tables"? Data designers argue this professionally, case by case, and there
  is no settled rule. What's your rule?
- Genuinely open: the balance is just a number, and either side could have
  kept it in their head. Why does both sides trusting *one* number matter
  more than what the number actually is? What breaks between people when
  there are two numbers?

## Delivery notes

- Merged from the former `every-pack-you-open` and `the-payback-ledger`
  cores; their guidance carries over as follows.
- **guided:** the wall in step 4 must feel like the learner's own noticing,
  not a planted ad for a later lesson — stage it as an honest attempt
  (filter view, eyeball the rows) that runs out of tool. One forward link
  only: the stats lesson (`../stats-and-clean-data/guided.md`), placed at the
  wall. Do not teach or name SUMIF anywhere in learner text.
- Do not explain the consequences of inconsistent Type spellings — state
  the exact-words habit and move on; the failure is deliberately saved to
  be felt in a later lesson (MODULE.md design note).
- The rename-follows behavior must land after observation, not before —
  predict, do, look, then explain.
- Fronted framing: "whoever fronted the money," never an assumed parent or
  household. The tone risk in the payback half is moralizing — any hint of
  "debt is bad" or "be responsible" breaks the module's framing. The ledger
  is an instrument. The interest experiment in Go further stays
  judgment-free: a mechanism to watch, not a cautionary tale.
- The backfill must stay honest and bounded: rememberable purchases,
  estimates flagged in Notes — no fabricating a complete history.
- The insert-a-row break-it must let the learner find the hole themselves
  before the explanation lands; do not pre-announce what will be wrong.
- If the learner has no fronted purchases, one light sentence keeps the
  payback half valid (build it ready); do not build a hypothetical dataset.
- The former standalone lessons' cut material: the payback lesson's Go
  further chart teaser (Insert → Chart on Date + Balance) was dropped in the
  merge — charts get their full treatment later in the module and the merged
  Go further was already long.
