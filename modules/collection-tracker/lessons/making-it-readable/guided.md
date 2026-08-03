# Making it readable

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your tracker is correct. It is not yet *legible* — the money doesn't look like
money, the headers scroll away, and telling the winning cards from the losing
ones means reading the Gain column number by number. Correct is for you.
Legible is for everyone else: the version of this sheet someone can read over
your shoulder and understand without you saying a word.

This session makes the tracker look like a product — currency formatting, a
header row that stays put, and a Gain column that turns green or red entirely
on its own. Then it teaches the one spreadsheet skill that regularly destroys
real data in the real world: sorting. You'll cause the classic sorting disaster
yourself, deliberately, on a copy — because seeing that particular wreck once,
safely, is worth more than a hundred warnings about it.

---

## Before you start

You need:

- **A Collection tab that answers what the collection is worth.**
  [What is it all worth?](../first-ledger/guided.md) builds it. Quick check:
  open Collection Tracker, change one card's Value, and watch Total Value and
  Total Gain move on their own; then set it back.
- **The version-naming habit from that same session.** Quick check: you can
  find Version history in the File menu and say what "Name current version"
  is for.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- Money columns that read as money, and a bold header row that stays on screen
  no matter how far the collection scrolls
- A Gain column that colors itself — green for every winner, red for every
  loser, automatically, including for cards you add months from now
- Sorted your real collection best-card-first without breaking anything — and
  the discipline to keep it that way
- Caused the classic one-column sorting disaster on purpose, on a copy, and
  seen exactly what it destroys and why nothing warns you
- Filter views: a way to ask "show me only…" questions without rearranging the
  table at all

---

## New tools

Nothing to install today — everything in this session is already inside Google
Sheets, mostly behind two menus.

**Number formats** control how a value is *displayed* — as currency, as a
date, as a plain number — without changing the value itself. They live under
the Format menu, in its Number section.

**Conditional formatting** is formatting applied by a rule instead of by hand:
"when a cell satisfies this condition, give it this look." The sheet applies
and re-applies the rule as values change. It also lives under the Format menu.

**Filter views** let you filter and sort what *you* see without changing the
sheet itself. They live under the Data menu.

All three are documented at Google's Docs editors help center
(support.google.com/docs) — search the feature's name. One note for this whole
session: menus get reorganized from time to time, so if an item isn't exactly
where this text says, it still exists under the same name — look for the name,
not the position.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- After you format the Value column as currency, is the number *stored* in
  each cell different from before? How could you check?
- Suppose you select only the Value column — nothing else — and sort just that
  selection. What happens to the rest of the table?
- A date, formatted as a plain number, shows some number. What number? Take a
  real guess at what it could even mean.

---

## The work

### Money that looks like money

Select columns D through F in one stroke: click column D's letter, hold Shift,
click column F's letter. Then Format menu → Number → Currency.

Cost, Value, and Gain now read as money. Pulled cards' blank Costs stay blank
— there's no value there to dress up.

Now the check that this session's first big idea hangs on. Click any Value
cell and read the formula bar. The raw number is still there, exactly as you
typed it. Formatting changed what the cell *shows*, not what it *is*. Keep
that distinction — it comes back before the session ends.

### A header that stays put

Two small moves:

- Select row 1 by clicking its row number, and make it bold — Ctrl+B (⌘B on a
  Mac), or the B in the toolbar.
- View menu → Freeze → 1 row.

Scroll down. The data slides under the headers, and the headers stay. Freezing
does one more thing that pays off later today: it tells the sheet that row 1
is furniture, not data — the sheet will remember that when you sort.

### Green and red at a glance

The goal: every winning card's Gain sits on green, every losing card's on red
— automatically, forever, including cards you add next month. No coloring
anything by hand.

Work it out with the hints, opened in order.

<details>
<summary>Stuck? Start here</summary>

Coloring cells by hand would rot the moment any value changed — tomorrow's
loser could be sitting on yesterday's green. What you want is formatting the
sheet applies *for* you, by rule. The Format menu has an entry for exactly
this; skim the menu and read the entries' names.

</details>

<details>
<summary>The concept</summary>

Conditional formatting attaches a rule to a range: "when a cell's value
satisfies this condition, wear this look." Configuring one takes three
decisions — which cells, what condition, what look. And you need *two* rules,
because green-when-positive and red-when-negative are two different
conditions.

</details>

<details>
<summary>The pointer</summary>

Format → Conditional formatting opens a panel. Apply it to the range `F2:F` —
open-ended for the same reason your totals were, so future cards are covered.
In the condition dropdown you'll find "Greater than" and "Less than"; the
number both rules compare against is 0. After the first rule, "Add another
rule" gets you the second.

</details>

When both rules are in, stand back and look at your collection. Wins and
losses, visible from across a room, no reading required. This is the moment
the tracker becomes something you can turn around and show: the sheet now
explains itself.

### Sort the real sheet, safely

Best cards should be at the top. Sorting will do it — and sorting is the one
everyday spreadsheet operation that can silently destroy a table, which is why
it comes with rules. The rules first, the wreckage after: in Break it on
purpose, you'll cause the disaster these rules prevent, on a copy, and see for
yourself why they exist.

First, the habit from last session: File → Version history → Name current
version — name it `before first sort`. Any experiment on the real sheet gets a
named version first. That's the deal.

Now sort: right-click column E's letter — the Value column — and choose **Sort
sheet Z to A** (find it by name; it may sit in a submenu). "Sort sheet" is the
key phrase: it sorts *entire rows*, keeping each card's facts together, and it
leaves the frozen header row alone.

Your most valuable card is now in row 2. Check a card you know well: its Set,
Date, Cost, and Gain all traveled with it. And glance at your totals in
columns H and I — unmoved and unbothered. They were placed off to the side in
the first session for exactly this day: rows can now be rearranged freely
without the totals ever being caught in the shuffle.

### Explore without rearranging

Sorting the sheet changes the sheet — sometimes you don't want that. "Show me
only cards from one set, ordered by Gain" is a question, and answering a
question shouldn't have to rearrange the furniture.

Data menu → Filter views → Create new filter view. A dark border and banner
appear around the grid: that's the sign you're *inside* a view. In the header
row, each column now has a small filter control. Use the one on Set to show
only one set; use the one on Gain to sort descending. Look around — best and
worst pulls of that set, in order.

Now close the view (the X on the dark banner). Everything is exactly as it was
before. The filter view changed what you *saw*, never what the sheet *is* —
the same distinction as formatting, one level up. This is the tool for every
"just show me…" question from now on.

---

## Break it on purpose

Both experiments run on a copy — File menu → Make a copy, name it
`Collection Tracker crash test`. The copy is expendable by construction:
nothing done to it can touch the real tracker, which is the whole reason it
exists.

**The one-column sort.** You predicted this one. In the crash-test copy,
select column E by its letter — only that column. Then Data → Sort range, and
sort the selection so the biggest values come first.

Now look at the table.

The values are in beautiful descending order — and every other column stayed
exactly where it was. Find the card you know best: the value sitting in its
row now belongs to some other card. Every single row is now a lie, and not one
error appeared. Nothing warned you, because nothing went wrong as far as the
sheet is concerned: you said "sort these cells," and it did precisely that.
The sheet has never known that a row *means* something — that row 2 is one
card's facts. The meaning lived in your head, and one sorted column just
severed it for the entire table at once.

Remember the lesson from your first session — the loud error versus the
silently wrong total? This is the biggest silent wrong in spreadsheets, the
one that ruins gradebooks and payrolls in the real world. The rule it buys
you: **never sort a selection smaller than the table.** Sort the sheet, or a
range that includes every column — rows only survive as rows if you treat the
table as a unit.

Undo works here (Ctrl+Z / ⌘Z) if you want to watch the wreck reverse. Or
don't bother — it's the crash-test copy. Breaking it was its job.

**Dates unmasked.** Still in the copy: select the Date column, then Format →
Number → Number — the plain-number format. Every date turns into a number in
the tens of thousands. Check your prediction: what is that number? It's a
count of days — each date is stored as "how many days since day zero," a
particular day the spreadsheet counts from. Which day is day zero? You have
everything you need to work it out from the numbers in front of you, or to
look it up at the help center.

Format the column back (Format → Number → Date) and the calendar look
returns, perfectly intact — because the *values* never changed. The dates were
numbers all along, wearing calendar clothes. That's the format-versus-value
idea proven from the other side, and it's also a preview: because dates are
numbers, subtracting two of them will simply work, and "how many days did I
hold this card?" is a formula waiting for a later session.

When you're done, throw the crash-test copy away or keep it as a souvenir —
it's a copy. Deleting copies is free; that's what makes them copies.

---

## What just happened

Two ideas today, and both are about the gap between what a cell *is* and what
it *shows*.

Every cell carries a value, and separately, instructions for how to display
it. Currency, date formats, bold, green-on-positive — all of it is costume.
The value underneath never changed once this whole session, and the formula
bar will always show it to you naked. That's why the dates survived being
displayed as day-counts, and it's why formatting is always safe to experiment
with: the look and the fact are different layers.

Sorting is the opposite kind of operation — it moves the facts themselves. A
table's rows are records: one row, one card, and the row is the unit of
meaning. Sort whole records and the meaning survives any number of
rearrangements. Hand the sorter less than whole records, and it faithfully,
silently destroys the recordness of every row — because the grid never knew
your rows meant anything. The sheet knows values and cells. *You* know row 2
is a card. Keeping a table truthful means treating it as a unit — and now you
know that not as a rule someone gave you, but as a wreck you caused yourself
and walked away from.

---

## Go further

- The Format menu can stripe a table with alternating row colors by itself —
  the feature is named for exactly what it does. Find it and decide whether
  the tracker deserves it.
- Number formats are a tiny language you can write yourself: a custom format
  can show cents only when a value has them, so whole dollars stay clean. The
  Docs editors help center documents custom number formats — a small puzzle
  in a small language.
- A genuinely open one: what actually makes a table "readable"? Find the
  ugliest spreadsheet in the wild — a shared schedule, league standings, a
  price list — and name *precisely* why it hurts to read. Professionals argue
  about this without a settled answer. Having opinions with reasons attached
  is the entire substance of design taste, and you just started collecting
  them.

---

## What you have now

- A tracker readable at a glance: currency columns, a bold frozen header, and
  a Gain column that colors its own winners green and losers red
- The format-versus-value distinction, proven in both directions — and the
  formula bar as the way to see any cell's naked value
- The sorting discipline: rows are records, tables are sorted as units, and a
  named version comes first — plus the one-column disaster seen once, safely,
  so it never happens to data you care about
- Filter views for exploring without rearranging
- A crash-test copy caused, used, and discarded: the copy habit is now
  practice, not theory
