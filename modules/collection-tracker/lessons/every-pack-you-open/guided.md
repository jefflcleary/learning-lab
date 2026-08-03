# Every pack you open

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your tracker knows what the collection is worth. It has no idea what the
collection has *cost* — every pack, every box, every single, every sleeve and
binder, and, importantly, whose money paid for each one. Those are facts too,
and they're the other half of every honest question about this hobby.

But a purchase is not a card. A card is a thing you have; a purchase is an
event that happened — with its own facts: when, what, how much, whose money.
A different kind of thing deserves its own table, and in a spreadsheet, a new
table gets a new tab. This session builds the tracker's second table, fills
it with your real purchase history, and then teaches tabs to read each other
— so that one screen shows what it's all worth right next to what it's all
cost. Most collectors never look at those two numbers side by side. You're
about to.

---

## Before you start

You need:

- **A tracker readable at a glance** — currency columns, frozen header, and
  a Gain column that colors itself. [Making it readable](../making-it-readable/guided.md)
  gets it there. Quick check: open Collection Tracker and confirm the Gain
  column shows green and red on its own.
- **The habits from the first session** — totals built with SUM, and naming
  a version before experiments. From
  [What is it all worth?](../first-ledger/guided.md). Quick check: you can
  say from memory what `=SUM(D2:D)` adds up, and where Version history
  lives.
- **Your purchase history, as well as you can remember it.** Order history,
  receipts, or memory — whatever you honestly have.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A Purchases tab recording every buy you can honestly reconstruct — date,
  item, type, cost, and who paid — plus the rule that keeps it alive from
  today onward
- A live Total spent, and your guess about that number checked against the
  truth
- Your first cross-sheet formula: Collection reading straight out of
  Purchases, so worth and cost sit on one screen
- Tested what happens to a formula when the tab it references is renamed —
  and when that tab is deleted outright
- One good question the tracker can't answer yet, written down and waiting
  for the tool that answers it

---

## New tools

Nothing to install — today's new territory is two features of the
spreadsheet you're already in.

**Tabs** (the strip along the bottom of the screen) each hold a full grid of
their own. One spreadsheet file can hold many tabs — which means one file
can hold many *tables*, and the tracker is about to have two. The `+` at the
left end of the strip adds a tab; double-clicking a tab renames it.

**Cross-sheet references** let a formula on one tab use cells from another:
the tab's name, then an exclamation mark, then the cell or range —
`Purchases!D2`, or `Purchases!D2:D`. If a tab's name contains spaces, it
goes in single quotes: `='Pack log'!D2`. That syntax is the whole feature,
and you'll have used it before this session ends.

Both are documented at Google's Docs editors help center
(support.google.com/docs) — search "sheets" or "reference another sheet."
As always: if a menu item has moved since this was written, it still exists
under the same name — find it by name.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- How much have you spent on this hobby, ever — packs, boxes, singles,
  supplies, all of it? An actual number. The sheet is going to check you,
  and for most people the honest answer lands higher than the guess.
- What share of that money was someone else's — fronted for you, still
  owed?
- Later, a formula on Collection will name the Purchases tab. If the tab
  then gets renamed — does the formula break, or follow along?

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
- **Item** — what it was: "Booster pack", "151 booster box", the card's
  name for a single, "250 sleeves".
- **Type** — one of exactly four words: `Pack`, `Box`, `Single`,
  `Supplies`. Pick these exact words and stick to them — same spelling,
  same capitalization, every row. Why exact matching matters this much is
  something a later session makes vivid; for now it's a habit worth having
  from the first row.
- **Cost** — what it cost.
- **Paid by** — `Me` or `Fronted`. **Fronted** means someone else's money
  bought this: whoever fronted it is owed. This one column is the seed of a
  whole thread of this module — what Fronted really means, and paying it
  down to zero, is [The payback ledger](../the-payback-ledger/guided.md)'s
  territory. Today the column just records the fact.
- **Notes** — anything worth remembering, including "estimate" when a
  number is one.

Three touches you've done before, one line each: format column D as
currency (Format → Number → Currency), bold row 1, and freeze it (View →
Freeze → 1 row).

### The honest backfill

Now fill it — every purchase you can honestly reconstruct, one per row.
Order history and receipts give you exact rows; memory gives you
approximate ones, and approximate is fine *if it says so*: put the best
number you can defend in Cost and the word "estimate" in Notes. What you
may not do is invent precision — a tracker full of confident fiction is
worse than a short honest one.

Don't chase completeness. The backfill is a snapshot of what's
rememberable. The real product of this session is the rule that starts
today: **every buy gets a row the day it happens.** Ten seconds at the
counter, and the table stays true forever. Backfills happen once; the habit
is the tracker.

### What has all of it cost?

Goal: a live total on this tab — the label **Total spent** in H1, and a
cell in I1 that always holds the answer. Same off-to-the-side pattern as
Collection's totals, for the same reason.

<details>
<summary>Stuck? Start here</summary>

This is exactly the shape you built on Collection: a label, and next to it
an open-ended SUM over the column that holds the money.

</details>

<details>
<summary>The formula</summary>

```
I1:  =SUM(D2:D)
```

</details>

Now open your logbook. How did your guess compare to the real number? Most
people meet a bigger number than they expected here — if that's you, you
just learned something a vague sense of "I've bought some packs" was
hiding. That's the tracker doing its job.

### The question with no cell yet

Look at the Paid by column, and try to answer your second prediction
properly: **how much of Total spent was fronted money?**

Try it with the tools you have. A filter view (Data → Filter views) showing
only the rows where Paid by is `Fronted` gets you the right rows on screen
— and then what? You can add them up by eye or on paper, and the moment the
next fronted purchase lands, your hand-made answer is stale. Total spent
updates itself; this number doesn't. There's no live cell for it.

The same wall stands in front of "how much has gone on packs versus
singles?" The data is all sitting right there — every row tagged, every
cost recorded — and the question is one the sheet clearly *ought* to
answer. What's missing is a way to say "add up only the rows where…", and
that is a real tool the sheet has, one this module reaches later.

Write the wall in your logbook — what you wanted to compute, what you
tried, where it ran out. Noticing a question before you have its tool is
not a failure; it's the best possible reason to learn the tool when it
arrives.

### Tabs that read each other

Total spent lives on Purchases. Total value lives on Collection. The whole
point of those two numbers is comparing them — so they belong on one
screen.

The syntax is in New tools: a tab's name, an exclamation mark, then the
cell or range. Feel it work first: click any empty scratch cell on the
Collection tab and type `=Purchases!D2`. Enter — and one tab is displaying
another tab's cell, live. Clear the scratch cell.

Now the real goal: a fourth row on Collection's summary block — **Total
Spent** in H4, and in I4, the live total of every cost on Purchases.

<details>
<summary>Stuck? Start here</summary>

You already wrote this formula once today, on the Purchases tab. Written
from Collection's side, only one thing changes: the range has to say which
tab it lives on.

</details>

<details>
<summary>The formula</summary>

```
I4:  =SUM(Purchases!D2:D)
```

</details>

Look at the block now: Total Cost, Total Value, Total Gain, Total Spent —
one screen, both big questions. And the two ends can never drift apart:
add a purchase on one tab and the number on the other is already correct.
That pairing — what it's worth, against what it's cost — is the honest
view of a collection, and yours is now permanent.

---

## Break it on purpose

The habit first, one line: File → Version history → Name current version →
`before tab experiments`. Net in place.

**Rename a tab out from under a formula.** You made a prediction about
this. Double-click the Purchases tab and rename it to anything — `Loot`,
say. Now go to Collection and look at I4: the value, and then the formula
bar.

The formula now *says* `Loot`. Nothing broke — Sheets rewrote your formula
the instant the tab's name changed. Which tells you something precise: the
reference was never to the text "Purchases." It points at the tab itself —
the thing — and the name in the formula bar is just how that pointer is
spelled today. This is the dependency map from your first session again,
now stretching across tabs: references follow things, not spellings.
Rename the tab back to Purchases and watch the formula follow home.

**Delete a tab.** Right-click the Purchases tab and choose Delete. A
warning appears — read the whole thing before you agree to it; knowing
exactly what you're consenting to is the habit, and this warning means what
it says. Then delete.

Collection's I4 now shows `#REF!` — the formula's dependency points at
nothing. And it's worse than one broken cell: every row of purchase data
went down with the tab. A tab isn't decoration around a table; it *is* the
table. Deleting one deletes a table whole and breaks every formula that
fed from it.

Undo — Ctrl+Z (⌘Z on a Mac), or Edit → Undo. The tab returns, data and
all, and I4 heals on its own. And if undo ever weren't enough, `before tab
experiments` is sitting in Version history, restorable whenever. Both nets,
tested and holding.

---

## What just happened

The tracker became a *designed* thing today. One file now holds two tables:
a table of things you have, and a table of events that happened. They got
separate tabs because they're different kinds — different facts per row,
different columns, different reasons to grow — and one table couldn't
honestly hold both. Deciding what kinds of thing exist and giving each its
own table is called data design, and it's the same act a database designer
performs for a business. Nothing was simplified for you here; the real
decision arrived at its natural size, and you made it.

One layer deeper: every cell always had a full address — tab, column, row.
`Purchases!D2` isn't new machinery; it's the long form of an address you'd
been abbreviating all along, the way `D2` quietly meant "D2 on the tab I'm
standing on." The dependency map follows full addresses, which is why it
crossed tabs without noticing, why renaming a tab rewrote your formula
instead of breaking it, and why deleting the tab produced `#REF!` — the
thing an address pointed at was gone.

And the questions you couldn't answer — the fronted total, spend by type —
are the right kind of unanswered. "Add up only the rows where…" is a real
operation, it has a real tool, and this module reaches it. The wall is
logged. The cure is coming.

---

## Go further

- What other *kinds* of thing might deserve a tab of their own someday? A
  card you sell is an event with a price and fees. The collection's total
  value on a particular date is a snapshot. A trade is an event where cards
  move and no money does. For each: what would its columns be? Sketch them
  in your logbook — several of these become real later in this module, and
  you can check your design against what arrives.
- The honest number nobody computes: Total Value minus Total Spent. The
  Gain column compares each card to its own cost — but pulled cards sat
  there with blank Costs while the packs that produced them cost real
  money, and that money is only visible now. Is Value minus Spent the true
  "am I ahead?" number? Is it even fair — sleeves and binders never gain
  value, but they protect everything that does. What would the fairest
  single number be?
- A genuinely open one: Purchases holds packs, boxes, singles, and supplies
  in one table, separated by a Type column — yet cards got an entire
  separate tab. Both choices probably felt natural. So where exactly is the
  line between "one table with a Type column" and "two different tables"?
  Professional data designers argue this case by case, and there is no
  settled rule. Try to write yours down in one sentence, and see if it
  survives the examples in the first question.

---

## What you have now

- A Purchases tab recording every buy, its cost, and who paid — honestly
  backfilled, and kept live from today by the row-the-day-it-happens rule
- A live Total spent on Purchases, and Collection reading it across tabs:
  worth and cost, one screen, permanently in sync
- Cross-sheet references — `Purchases!D2:D` — and the knowledge, tested
  yourself, that they follow a renamed tab and break with a deleted one
- The tab-per-kind-of-thing idea: your first act of data design, performed
  on your own data
- One good question the tracker can't answer yet, logged and waiting for
  its tool — and a Paid by column quietly holding the start of the payback
  story
