# Every pack you open

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** every-pack-you-open
- **Module / Part:** collection-tracker — Part 1: The ledger
- **Scaffolding:** level 2 — third lesson of the spreadsheet skill. Goals plus
  hints; concepts named but not applied for the learner. New syntax
  (cross-sheet references) is orientation and given plainly; applying it is
  the learner's work.
- **Deliveries:** guided only (module-wide decision — see MODULE.md)
- **Status:** ready

## Goal and payoff

Add the second table: a Purchases tab recording every buy — packs, boxes,
singles, supplies — with cost and who paid. This is data design arriving on
foot: cards and purchases are different *kinds* of thing, so they get
different tables. Then the first cross-sheet formula: Collection's summary
block gains a live "Total spent" read straight out of Purchases, so one screen
answers both of the collector's big questions — what is it worth, and what
has it cost.

Deliberate cliffhanger: the learner is led to notice questions the tracker
now contains the data for but cannot yet answer in a live cell — "how much of
this was fronted?", "how much went on packs versus singles?" The tool for
those (conditional adding) is later material and is not taught here; the
lesson's job is to make the learner *want* it and log the wall. The Paid by
column is planted as the seed of the payback thread.

Payoff: total spent, live, sitting next to total value — the honest pairing
most collectors never look at.

## Prerequisites

- A tracker readable at a glance — established by
  `modules/collection-tracker/lessons/making-it-readable/`
- (Transitively: the Collection tab, totals block, version-naming and copy
  habits from `modules/collection-tracker/lessons/first-ledger/`.)

## Establishes

- Verbatim citation for other cores: "a Purchases tab recording every buy,
  its cost, and who paid — established by
  `modules/collection-tracker/lessons/every-pack-you-open/`"
- Also establishes: cross-sheet reference syntax (`Purchases!D2`,
  `Purchases!D2:D`); the tab-per-kind-of-thing design idea; a logged open
  question ("how much was fronted?") that the stats material later answers;
  the going-forward logging rule (every buy gets a row the day it happens).

## Facts

- New tab: the `+` at the left end of the tab strip at the bottom. Rename by
  double-clicking the new tab. Canonical name: **Purchases**.
- Canonical Purchases columns, A–F, headers in row 1:
  `Date | Item | Type | Cost | Paid by | Notes`. Data from row 2.
- Canonical Type values: `Pack`, `Box`, `Single`, `Supplies` — exact words,
  same spelling and capitalization every time. The *why it must match*
  lesson comes later (keeping-data-clean, per MODULE.md — this lesson only
  states the habit: pick exact words and stick to them; do not explain
  category-matching failures here, they need to be felt first later).
- Canonical Paid by values: `Me`, `Fronted`. "Fronted" defined: someone
  else's money bought this — whoever fronted the money is owed it. Settling
  what Fronted really means is the payback ledger's territory. PATH-order
  forward mention by title with link is sanctioned for
  `../the-payback-ledger/guided.md` (ships in the same release).
- Backfill honestly: rememberable purchases only, estimates marked as such in
  Notes. Going forward, live: every buy gets a row the day it happens.
- Purchases summary block, same pattern as Collection's: `Total spent` label
  in H1, `=SUM(D2:D)` in I1.
- Currency-format column D; bold + freeze row 1 — rehearsed skills, stated as
  one-line reminders, not re-taught.
- Cross-sheet reference syntax: `TabName!CellOrRange` — `=Purchases!D2` shows
  one cell from another tab; `=SUM(Purchases!D2:D)` sums a range from another
  tab. Tab names containing spaces need single quotes: `='Pack log'!D2`.
  This syntax is underivable → plain orientation, never behind a hint.
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
- Version history and named versions: established habit (first-ledger);
  canonical version name before the tab experiments: `before tab experiments`.
- SUMIF exists and is deliberately NOT taught or named in learner text here —
  the conditional-adding tool belongs to the stats lessons (MODULE.md design
  note: the wall is felt here, the cure arrives later).

## Arc

### Orientation — given plainly

The design idea up front, in plain words: the Collection tab's rows are
*things you have*; a purchase is a different kind of thing — an *event that
happened*, with its own facts (when, what, what it cost, whose money). A
different kind of thing gets its own table, and in a spreadsheet a table
gets a tab. One file, several tables — this is the same decision every
database designer makes, met here at natural size. Column meanings, the
canonical Type and Paid by words, and the exact-words habit stated plainly.
Cross-sheet syntax given plainly when its moment comes.

### Predictions to elicit

- Total spent on this hobby, ever — an actual number, guessed before the
  sheet answers. (For most people the honest number lands high.)
- What share of that spending was someone else's money?
- Later, a formula on Collection will reference the Purchases tab by name.
  If the tab is then renamed — does the formula break, or follow?

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
   here and the payback forward-mention placed (what Fronted really means,
   and paying it down, is [The payback ledger]'s territory — link). Then the
   going-forward rule, stated as the actual product of this session: from
   today, every buy gets a row the day it happens. The backfill is a
   snapshot; the habit is the tracker.
3. **What has all of it cost?** Goal: a live Total spent on the Purchases
   tab — label H1, total in I1 — same pattern as Collection's block. Third
   time using SUM; level-2 support:
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
   this module. Log the wall in the logbook (walls template) — wanting a
   tool before meeting it is the point. No SUMIF named, nothing taught.
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
   Close on the payoff: one screen now answers both questions — worth it
   next to cost — and the two will never drift, because both ends are live.

### Break it on purpose — failures to cause, what each teaches, how to undo

Named version first: `before tab experiments` — the established habit, one
line.

- **Rename a tab out from under a formula.** The prediction from the top of
  the session gets tested. Double-click the Purchases tab, rename it to
  anything (`Loot`). Go look at Collection's I4 — the value, and the formula
  bar. The formula now *says the new name*: Sheets rewrote it. The reference
  was never to the text "Purchases"; it points at the tab itself, and the
  displayed formula is just how that pointer is spelled today. Same
  dependency graph as the first session, now spanning tabs. Rename it back;
  watch the formula follow again. Undo also works.
- **Delete a tab.** Right-click Purchases → Delete — and read the whole
  warning before clicking through; the habit is reading what the machine
  says before agreeing to it. Delete. Collection's I4: `#REF!` — its
  dependency now points at nothing, and every row of purchase data went with
  the tab. Feel the weight: a tab is structure; deleting one deletes a whole
  table and breaks every formula that fed from it. Undo: Ctrl+Z / ⌘Z (or
  Edit → Undo) — the tab returns, data and all, and I4 heals. And beneath
  undo, the named version `before tab experiments` is the deeper net —
  restorable from Version history whenever undo isn't enough.

### What just happened — the explanation, one layer deeper

One file, several tables. The tracker now has a table of *things* (cards
owned) and a table of *events* (money spent), and they earned separate tabs
because they are different kinds — different facts per row, different
columns, different reasons to grow. Choosing what kinds of thing exist and
giving each its own table is data design — the same act, at the same moment
of need, that database designers perform for businesses; it arrived here on
foot, because one table couldn't honestly hold two kinds.

One layer deeper: every cell always had a full address — tab, column, row.
`Purchases!D2` is the long form of an address that was being abbreviated all
along, the way "D2" quietly meant "D2 on the tab you're standing on." The
dependency graph from the first session follows full addresses, which is why
it crosses tabs without noticing, why renaming a tab rewrote formulas
instead of breaking them (references point at things, not at spellings), and
why deleting the tab produced `#REF!` — the thing itself was gone.

The questions that couldn't be answered — fronted total, spend by type —
are the cliffhanger, and they are exactly the right shape: "add up only the
rows where…" is a real operation with a real tool, and it arrives later in
this module. The wall was logged; the cure is coming.

### Go further — open questions

- What other *kinds* of thing might deserve their own tab someday? Cards
  sold would be events with a price and fees; the collection's total value
  on a given date would be a snapshot; trades are events where no money
  moves at all. For each: what would its columns be? (Several of these
  become real tabs later in this module.)
- The honest number nobody computes: Total Value minus Total spent. Gain
  compares each card to its own cost — but packs cost money too, and blank
  Costs hid that from the Gain column. Is Value-minus-spent the *true* "am
  I ahead?" number? Is it even fair — supplies protect cards but never gain
  value. What would the fairest single number be?
- Genuinely open: Purchases holds packs, boxes, singles, and supplies in
  one table separated by a Type column — yet cards got a whole separate
  tab. Both choices felt natural. So where is the line between "one table
  with a Type column" and "two different tables"? Data designers argue this
  professionally, case by case, and there is no settled rule. What's your
  rule?

## Delivery notes

- **guided:** the wall in step 4 must feel like the learner's own noticing,
  not a planted ad for a later lesson — stage it as an honest attempt
  (filter view, eyeball the rows) that runs out of tool. One forward link
  only (the payback ledger, sanctioned); the stats material is "later in
  this module," unnamed and unlinked.
- Do not teach or name SUMIF anywhere in learner text.
- Do not explain the consequences of inconsistent Type spellings — state
  the exact-words habit and move on; the failure is deliberately saved to
  be felt in a later lesson (MODULE.md design note).
- The rename-follows behavior must land after observation, not before —
  predict, do, look, then explain.
- Fronted framing: "whoever fronted the money," never an assumed parent or
  household.
- The backfill must stay honest and bounded: rememberable purchases,
  estimates flagged in Notes — no fabricating a complete history.
