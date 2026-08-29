# Tracking purchases and money owed

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your tracker knows what the collection is worth. It has no idea what the
collection has *cost* — every pack, every box, every single, every sleeve and
binder, and, importantly, whose money paid for each one. Those are facts too,
and they're the other half of every honest question about this hobby.

But a purchase is not a card. A card is a thing you have; a purchase is an
event that happened — with its own facts: when, what, how much, whose money. A
different kind of thing deserves its own table, and in a spreadsheet, a new
table gets a new tab. This session builds the tracker's second table, fills it
with your real purchase history, and teaches tabs to read each other — so that
one screen shows what it's all worth right next to what it's all cost.

Then it follows the money that wasn't yours. Some purchases get marked
**Fronted** — someone else paid, on the understanding that the money comes
back. Right now, what you still owe lives in two memories: yours and theirs.
Memories drift, and sooner or later the two of you will remember two different
numbers with no way to settle it. The second half of this session replaces
both memories with a **ledger**: a list of money events in date order — what
was fronted, what you've paid back — plus one computed column that always
answers "so where does that leave us?" By the end, you and whoever fronted the
money can look at the same tab and agree on a single number, down to the cent.

If nobody has ever fronted you money, the second half still works: you'll
build the tab empty, ready for the first time someone does.

---

## Before you start

You need:

- **A Collection tab that answers what the collection is worth, readable at a
  glance** — formulas, totals, currency columns, and a Gain column that colors
  itself. [Building the ledger: cards, formulas, formatting](../building-the-ledger/guided.md) gets it all
  in place. Quick check: open Collection Tracker, change one card's Value, and
  watch Total Value and Total Gain move on their own; then set it back.
- **The habits from that session** — totals built with SUM, fill-down by
  dragging the small square at a cell's corner, and naming a version before
  experiments. Quick check: you can say from memory what `=SUM(D2:D)` adds up,
  and where Version history lives.
- **Your purchase history, as well as you can remember it.** Order history,
  receipts, or memory — whatever you honestly have.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A Purchases tab recording every buy you can honestly reconstruct — date,
  item, type, cost, and who paid — plus the rule that keeps it alive from
  today onward
- A live Total spent, your first cross-sheet formula putting it on the same
  screen as Total Value, and your guess about that number checked against the
  truth
- A Payback tab: every fronted purchase carried over, every payment recorded,
  and a Balance column that recomputes itself whenever a row changes — built
  on the running-balance pattern, each row using the row above
- One number that you and whoever fronted the money have looked at together
  and agreed on
- Tested what happens to a formula when the tab it references is renamed, when
  that tab is deleted outright, and when a row is inserted into the middle of
  a formula chain
- One good question the tracker can't answer yet, written down and waiting for
  the tool that answers it

---

## New tools

Nothing to install — everything new today is a feature of the spreadsheet
you're already in.

**Tabs** (the strip along the bottom of the screen) each hold a full grid of
their own. One spreadsheet file can hold many tabs — which means one file can
hold many *tables*, and the tracker is about to have three. The `+` at the
left end of the strip adds a tab; double-clicking a tab renames it.

**Cross-sheet references** let a formula on one tab use cells from another:
the tab's name, then an exclamation mark, then the cell or range —
`Purchases!D2`, or `Purchases!D2:D`. If a tab's name contains spaces, it goes
in single quotes: `='Pack log'!D2`. That syntax is the whole feature, and
you'll have used it before this session ends.

**A running balance** is a column where each row's formula uses the answer
from the row above it. You've written formulas that combine cells on their own
row (the Gain column does exactly that); today's reach one row up. How that
works is the puzzle of the session, so it stays a puzzle for now — no new
functions are involved, just arithmetic and one new kind of cell reference.

All of it is documented at Google's Docs editors help center
(support.google.com/docs) — search the feature's name, or "reference another
sheet." As always: if a menu item has moved since this was written, it still
exists under the same name — find it by name.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- How much have you spent on this hobby, ever — packs, boxes, singles,
  supplies, all of it? An actual number. The sheet is going to check you, and
  for most people the honest answer lands higher than the guess.
- What share of that money was someone else's — fronted for you? And of that,
  how much do you think you still owe, right now? An actual number; by the end
  of the session you'll find out how far off memory was.
- Later, a formula on Collection will name the Purchases tab. If the tab then
  gets renamed — does the formula break, or follow along?
- Suppose a payment row gets added in the middle of a ledger, on its correct
  date. What should happen to every balance below it?
- Months from now the payback ledger will be much longer. What does its bottom
  number do as rows are added — and what would the whole Balance column look
  like, read top to bottom, if the payback is going well?

---

## The work

### A second table for a different kind of thing

Click the `+` at the left end of the tab strip. Double-click the new tab and
name it **Purchases**. Then the headers, row 1, columns A through F:

```
Date    Item    Type    Cost    Paid by    Notes
```

What each column means:

- **Date** — when the purchase happened.
- **Item** — what it was: "Booster pack", "151 booster box", the card's name
  for a single, "250 sleeves".
- **Type** — one of exactly four words: `Pack`, `Box`, `Single`, `Supplies`.
  Pick these exact words and stick to them — same spelling, same
  capitalization, every row. Why exact matching matters this much is something
  a later session makes vivid; for now it's a habit worth having from the
  first row.
- **Cost** — what it cost.
- **Paid by** — `Me` or `Fronted`. **Fronted** means someone else's money
  bought this: whoever fronted it is owed. For now the column just records the
  fact — settling what Fronted really means, and paying it down to zero, is
  the second half of this session.
- **Notes** — anything worth remembering, including "estimate" when a number
  is one.

Three touches you've done before, one line each: format column D as currency
(Format → Number → Currency), bold row 1, and freeze it (View → Freeze →
1 row).

### The honest backfill

Now fill it — every purchase you can honestly reconstruct, one per row. Order
history and receipts give you exact rows; memory gives you approximate ones,
and approximate is fine *if it says so*: put the best number you can defend in
Cost and the word "estimate" in Notes. What you may not do is invent precision
— a tracker full of confident fiction is worse than a short honest one.

Don't chase completeness. The backfill is a snapshot of what's rememberable.
The real product of this step is the rule that starts today: **every buy gets
a row the day it happens.** Ten seconds at the counter, and the table stays
true forever. Backfills happen once; the habit is the tracker.

### What has all of it cost?

Goal: a live total on this tab — the label **Total spent** in H1, and a cell
in I1 that always holds the answer. Same off-to-the-side pattern as
Collection's totals, for the same reason.

<details>
<summary>Stuck? Start here</summary>

This is exactly the shape you built on Collection: a label, and next to it an
open-ended SUM over the column that holds the money.

</details>

<details>
<summary>The formula</summary>

```
I1:  =SUM(D2:D)
```

</details>

Now open your logbook. How did your guess compare to the real number? Most
people meet a bigger number than they expected here — if that's you, you just
learned something a vague sense of "I've bought some packs" was hiding. That's
the tracker doing its job.

### The question with no cell yet

Look at the Paid by column, and try to answer your second prediction properly:
**how much of Total spent was fronted money?**

Try it with the tools you have. A filter view (Data → Filter views) showing
only the rows where Paid by is `Fronted` gets you the right rows on screen —
and then what? You can add them up by eye or on paper, and the moment the next
fronted purchase lands, your hand-made answer is stale. Total spent updates
itself; this number doesn't. There's no live cell for it.

The same wall stands in front of "how much has gone on packs versus singles?"
The data is all sitting right there — every row tagged, every cost recorded —
and the question is one the sheet clearly *ought* to answer. What's missing is
a way to say "add up only the rows where…", and that is a real tool the sheet
has. It arrives later in this module, in
[the session on what your data can answer](../stats-and-clean-data/guided.md).

Write the wall in your logbook — what you wanted to compute, what you tried,
where it ran out. Noticing a question before you have its tool is not a
failure; it's the best possible reason to learn the tool when it arrives. And
notice the wall's edge while you're there: the *total ever fronted* has no
live cell yet — but "what do I still owe *right now*?" is a different
question, and this session answers it properly before it's done.

### Tabs that read each other

Total spent lives on Purchases. Total value lives on Collection. The whole
point of those two numbers is comparing them — so they belong on one screen.

The syntax is in New tools: a tab's name, an exclamation mark, then the cell
or range. Feel it work first: click any empty scratch cell on the Collection
tab and type `=Purchases!D2`. Enter — and one tab is displaying another tab's
cell, live. Clear the scratch cell.

Now the real goal: a fourth row on Collection's summary block — **Total
Spent** in H4, and in I4, the live total of every cost on Purchases.

<details>
<summary>Stuck? Start here</summary>

You already wrote this formula once today, on the Purchases tab. Written from
Collection's side, only one thing changes: the range has to say which tab it
lives on.

</details>

<details>
<summary>The formula</summary>

```
I4:  =SUM(Purchases!D2:D)
```

</details>

Look at the block now: Total Cost, Total Value, Total Gain, Total Spent — one
screen, both big questions. And the two ends can never drift apart: add a
purchase on one tab and the number on the other is already correct. That
pairing — what it's worth, against what it's cost — is the honest view of a
collection, and yours is now permanent.

One column is still just sitting there recording a fact: Paid by. Every row
that says `Fronted` is money someone is owed — and what's still owed currently
lives in two memories. Time to replace them with a table.

### Make the Payback tab

Add another tab and rename it **Payback**. Give it headers in row 1: `Date`,
`What`, `Borrowed`, `Paid`, `Balance` — columns A through E. Format the three
money columns (Borrowed, Paid, Balance) as currency, the same move as always.

### Carry the debts over

Go through the Purchases tab and find every row where Paid by says
**Fronted**. Each one becomes a row here: its date, its item as What, its cost
as **Borrowed**. Leave Paid empty on those rows. Keep the rows in date order.

One thing matters more than speed: every fronted row makes the trip. The
number at the bottom of this ledger is only worth trusting if it's built from
everything — a ledger with missing rows isn't a record, it's a story. If
you're not sure about a row, carry it over and mark your doubt in the What
column; you can settle it later, together.

### Record what you've already paid

If you've already handed any money back — allowance you passed along, birthday
money, chore money, whatever it actually was — each of those is a row too: the
date, a short What (`allowance`, `birthday money`), the amount in **Paid**,
and Borrowed left empty. In date order with everything else.

If nothing's been paid back yet, skip this. The column is ready for when it
is.

### The running balance

Now the technical heart of the session. The goal: a Balance column where every
row answers the question *after this row, what's still owed?*

The first data row is easy, and you get it for free: there's no history above
it, so its balance is just its own row — in E2, type `=C2-D2`. (An empty cell
counts as zero in arithmetic, so rows that only borrow or only pay need
nothing special.)

Row 3 is the puzzle. Its balance has to account for everything that happened
above it *and* its own row. Write the formula for E3 — and before you resort
to adding up every cell by hand, think about what's already sitting on the
sheet.

<details>
<summary>Stuck? Start here</summary>

You could write `=C2+C3-D2-D3` in row 3. And something longer in row 4, and
longer again in row 5, forever. Before you do: one cell on this sheet already
holds most of that arithmetic, finished and up to date. Which cell?

</details>

<details>
<summary>The concept, named</summary>

This pattern is called a **running balance**: each row's answer is built from
the answer above it. Row 3's balance needs exactly three ingredients — the
balance so far, this row's Borrowed, this row's Paid. And a formula can use E2
like any other cell.

</details>

<details>
<summary>The shape, with one blank</summary>

E3 is `=____ + C3 - D3` — the blank is the cell that already holds the balance
so far. Fill it in and press Enter.

Then fill it down: select E3, grab the small square at its corner, and drag to
the bottom of your rows. Before moving on, click three or four of the filled
cells and read what fill-down actually wrote in each one. It's not the same
formula every time — look closely at the row numbers.

</details>

When the column is full, test it the way you'd test anything: change one early
Paid amount and watch every balance below it recompute instantly. Change it
back. The bottom cell of the Balance column is now the answer to the whole
question: that's what you still owe, today, according to every fact in the
ledger.

Check it against the number you predicted in your logbook.

### Show it

This tab was built for two people. Sit down with whoever fronted the money and
walk them through it: every fronted purchase, every payment, and the balance
at the bottom. If they remember a purchase that's missing, add the row while
they watch — the balance updates in front of both of you, which is worth more
than any amount of explaining.

What you're after isn't the number itself. It's agreement: from today, there
is one number, both of you can see how it's built, and nobody argues from
memory again.

---

## Break it on purpose

The habit first, one line: File → Version history → Name current version →
`before tab experiments`. One net covers everything below.

**Rename a tab out from under a formula.** You made a prediction about this.
Double-click the Purchases tab and rename it to anything — `Loot`, say. Now go
to Collection and look at I4: the value, and then the formula bar.

The formula now *says* `Loot`. Nothing broke — Sheets rewrote your formula the
instant the tab's name changed. Which tells you something precise: the
reference was never to the text "Purchases." It points at the tab itself — the
thing — and the name in the formula bar is just how that pointer is spelled
today. This is the dependency map from your first session again, now
stretching across tabs: references follow things, not spellings. Rename the
tab back to Purchases and watch the formula follow home.

**Delete a tab.** Right-click the Purchases tab and choose Delete. A warning
appears — read the whole thing before you agree to it; knowing exactly what
you're consenting to is the habit, and this warning means what it says. Then
delete.

Collection's I4 now shows `#REF!` — the formula's dependency points at
nothing. And it's worse than one broken cell: every row of purchase data went
down with the tab. A tab isn't decoration around a table; it *is* the table.
Deleting one deletes a table whole and breaks every formula that fed from it.

Undo — Ctrl+Z (⌘Z on a Mac), or Edit → Undo. The tab returns, data and all,
and I4 heals on its own. And if undo ever weren't enough, `before tab
experiments` is sitting in Version history, restorable whenever. Both nets,
tested and holding.

**Insert a row into the middle of the chain.** Over on Payback: say you
discover a forgotten fronted purchase from months ago. Right-click a row
number in the middle of the ledger and insert a row above it, then type the
entry in: date, what, amount borrowed. Now read the Balance column, top to
bottom. Where's the hole? Click the Balance cell just *below* your new row and
read its formula in the formula bar — which row is it pointing at?

Here's what happened: when rows move, formulas follow the cells they were
pointing at. The old chain didn't break — every old formula still points at
the same neighbors it always did. But your new row was never part of the
chain, and nothing joins it in automatically. The fix is the same move that
built the column: select the last correct Balance cell above the hole and fill
down from there to the bottom. Fill-down rewrites the whole chain, new row
included. Check that the bottom number changed by exactly the new row's
amount.

**Delete a payment.** Right-click the row number of a Paid row and delete the
entire row. Watch the Balance column: every balance below jumps back *up* by
that amount. The debt came back — because the ledger only knows what its rows
say, and you just removed a fact. Undo it (Edit menu → Undo, or Ctrl+Z — ⌘Z
on a Mac) and watch the payment count again.

That's not a flaw. A ledger that recomputes from its rows can always be
trusted to say exactly what the rows say — which is why the rows, not the
balance, are the thing you keep honest.

---

## What just happened

The tracker became a *designed* thing today. One file now holds three tables:
a table of things you have, and two tables of events — money spent, and money
borrowed and paid back. They got separate tabs because they're different kinds
— different facts per row, different columns, different reasons to grow — and
one table couldn't honestly hold them all. Deciding what kinds of thing exist
and giving each its own table is called data design, and it's the same act a
database designer performs for a business. Nothing was simplified for you
here; the real decision arrived at its natural size, and you made it.

One layer deeper on addresses: every cell always had a full address — tab,
column, row. `Purchases!D2` isn't new machinery; it's the long form of an
address you'd been abbreviating all along, the way `D2` quietly meant "D2 on
the tab I'm standing on." The dependency map follows full addresses, which is
why it crossed tabs without noticing, why renaming a tab rewrote your formula
instead of breaking it, and why deleting the tab produced `#REF!` — the thing
an address pointed at was gone.

The Payback tab is a **ledger**: two things stapled together. The first is an
append-only list of facts — rows that get added in date order and never
rewritten. The second is a derived answer — the balance, computed from the
facts and never typed by hand. Keep the facts honest and the answer takes care
of itself. You have seen this exact structure before, even if you've never
looked closely: a bank statement is a list of money events with a running
balance down the right-hand side. That is literally what a bank account *is* —
this tab, at scale, with more zeros. You've now built the thing banks print.

The words for what the tab holds, now that you've seen each one: money owed is
a **debt**. The amount still owed right now is the **balance**. Each
**payment** shrinks it. And paying down a number you can see is a different
experience from paying down a number you remember — the column trending toward
zero is visible progress, and both sides are watching the same column.

One layer deeper on the formulas. Fill-down worked because cell references are
**relative** by default: `E2` inside the row-3 formula doesn't really mean
"cell E2" — it means "column E, one row up from here." That's why every copy
pointed at its own previous row, and it's what you saw when you read the
filled-down cells. Sometimes you need the opposite: a reference that refuses
to move when copied. A dollar sign pins it. For comparison, now that your
column works — this formula, put in E2 and filled all the way down, produces
the identical balance:

```
=SUM(C$2:C2)-SUM(D$2:D2)
```

Read it slowly: each range starts at row 2 — pinned there by the `$` — and
ends at the current row, which travels. So every row sums *everything borrowed
so far* minus *everything paid so far*. Two shapes, one truth. The `$` will
come back again and again from here on; today was your first sight of it.

And the questions you couldn't answer — the fronted total, spend by type — are
the right kind of unanswered. "Add up only the rows where…" is a real
operation, it has a real tool, and this module reaches it. The wall is logged.
The cure is coming.

---

## Go further

- What other *kinds* of thing might deserve a tab of their own someday? A card
  you sell is an event with a price and fees. The collection's total value on
  a particular date is a snapshot. A trade is an event where cards move and no
  money does. For each: what would its columns be? Sketch them in your logbook
  — several of these become real later in this module, and you can check your
  design against what arrives.
- The honest number nobody computes: Total Value minus Total Spent. The Gain
  column compares each card to its own cost — but pulled cards sat there with
  blank Costs while the packs that produced them cost real money, and that
  money is only visible now. Is Value minus Spent the true "am I ahead?"
  number? Is it even fair — sleeves and binders never gain value, but they
  protect everything that does. What would the fairest single number be?
- On a **copy** of the spreadsheet (File → Make a copy — experiments that
  rewrite history belong on copies): what would it mean if whoever fronted the
  money charged **interest** — say, 5% of the outstanding balance, added as a
  new Borrowed row at the end of each month? Build a few months of it and pay
  it down slowly. What happens to the balance when the payments are smaller
  than the interest rows? This is the mechanism inside every loan in the
  world, and the copy is a place to watch it run with nothing at stake.
- A genuinely open one: Purchases holds packs, boxes, singles, and supplies in
  one table, separated by a Type column — yet cards got an entire separate
  tab, and so did the payback events. Both choices probably felt natural. So
  where exactly is the line between "one table with a Type column" and "two
  different tables"? Professional data designers argue this case by case, and
  there is no settled rule. Try to write yours down in one sentence, and see
  if it survives the examples in the first question.
- Another genuinely open one: either of you could have just kept the balance
  in your head. Why does both sides trusting *one* number matter more than
  what the number actually is? What breaks between people when there are two
  numbers — and does anything you built today work if only one side believes
  it?

---

## What you have now

- A Purchases tab recording every buy, its cost, and who paid — honestly
  backfilled, and kept live from today by the row-the-day-it-happens rule
- A live Total spent on Purchases, and Collection reading it across tabs:
  worth and cost, one screen, permanently in sync
- Cross-sheet references — `Purchases!D2:D` — and the knowledge, tested
  yourself, that they follow a renamed tab and break with a deleted one
- A Payback tab — Date, What, Borrowed, Paid, Balance — with every fronted
  purchase carried over, every payment recorded, and a running Balance column
  built on the pattern of each row using the row above, tested by changing
  history and watching it recompute
- First contact with absolute references — the `$` that pins part of a
  reference in place — with much more of it to come
- One number that you and whoever fronted the money have agreed on, in front
  of the tab that proves it
- The tab-per-kind-of-thing idea: your first acts of data design, performed on
  your own data
- One good question the tracker can't answer yet — the fronted total, spend by
  type — logged and waiting for its tool
