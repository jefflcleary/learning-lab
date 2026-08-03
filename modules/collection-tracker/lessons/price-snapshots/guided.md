# Price snapshots

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your tracker is entirely present-tense. Every number on Stats describes right
now, and the moment you update a card's value, the old value stops existing —
anywhere. Ask the tracker what the collection is worth and it answers instantly;
ask what it was worth last month and there is nothing to answer with. Whether
the collection is *growing* is arguably the most interesting question it could
answer, and today it can't.

History has to be recorded on purpose. Nothing keeps it for you. This session
builds the tracker's diary — a tab where, on a schedule, you write down what the
collection is worth before now stops being now — and draws the chart that diary
makes possible: the growth curve, a line that shows where the collection has
been and which way it's going.

One thing said plainly up front: the recording is a chore, done by hand, every
week. That is deliberate. A few weeks of doing this chore yourself teaches you
exactly what it is — which matters, because a later session,
[Your first script](../first-script/guided.md), teaches a machine to do it, and
you can only teach a machine a job you know completely.

---

## Before you start

You need:

- **A Collection tab whose Value column is roughly current** — begun in
  [What is it all worth?](../first-ledger/guided.md) and kept up since. Quick
  check: you could defend each card's Value as "about right this week."
- **Live totals on Stats** — total value and total spent, from
  [Questions your data can answer](../questions-your-data-can-answer/guided.md).
  Quick check: change a card's Value and watch the total move.
- **Charting skills** — you can build a chart from a range and title it, from
  [Charting the collection](../charting-the-collection/guided.md). Quick check:
  you can say what the chart editor's two real questions are.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A Snapshots tab holding the collection's first recorded history — one real
  measurement and a few honest, clearly labeled estimates
- A line chart of the collection's net position over time — the growth curve,
  from day one
- Tiny in-cell charts next to your headline stats, so the biggest numbers on the
  dashboard carry their own recent history
- A weekly ritual, scheduled and written down, that keeps the history growing

---

## New tools

**A cell note.** Right-click a cell and choose the note option (menus shift; the
word to look for is "note") to attach a small text annotation to it. Today it's
how estimate rows get labeled as estimates.

**SPARKLINE** is a Sheets function: `=SPARKLINE(range)` draws a miniature chart
— by default a line — inside the single cell holding the formula. It has options
for type and color; its documentation is the **SPARKLINE function** help page in
Google's Docs editors help center at
[support.google.com/docs](https://support.google.com/docs) — search "SPARKLINE."

**One rule, and the reason for it.** The rows you're about to write into the
Snapshots tab must be **typed numbers, not formulas that point at Stats**. A
cell containing a formula like `=Stats!B2` never stops recalculating — next
month it will show next month's total, and your "history" will silently rewrite
itself to match the present, forever. A typed number is frozen; that's the whole
point of it. The one exception is Net, which may be a formula *if* it only uses
the frozen numbers in its own row. You'll watch the failure happen live in the
break-it section, but the rule comes first because breaking it by accident
destroys the tab's entire purpose without a single error message.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- What was the collection worth one month ago? Write an actual number — and then
  write down how you could ever check it.
- If you snapshot weekly for a year, how many rows is that? Is that a lot, for a
  spreadsheet?
- Two snapshots two weeks apart, nothing recorded between them: what *should* a
  chart draw in the gap — and what do you think it *will* draw?

---

## The work

### Build the diary

Goal: a new tab named **Snapshots**, with four columns: Date, Total value, Total
spent, Net. This tab has a different contract from every other tab in the
tracker: rows get added, and rows never get edited. One row per visit.

### Take the first real snapshot

Goal: the first row of true history, in three steps done in order:

1. A quick value pass over Collection — update the Value column the way you
   always price your cards. The snapshot is only as honest as the values behind
   it.
2. Read Total value and Total spent off Stats.
3. On Snapshots: type today's date, type the two totals, and fill in Net — what
   the collection is worth minus what it cost.

<details>
<summary>About that Net column</summary>

Net is the one column allowed to be a formula — value minus spent — but only if
it uses the frozen numbers in its own row. If the formula mentions another tab's
name, it isn't a snapshot anymore; it's a window onto the present wearing a
date.

</details>

### Backfill an honest prehistory

A single dot isn't a line. Goal: two or three earlier rows — a month ago, two
months ago — so the chart has a shape on day one. These rows are estimates, and
they get labeled as estimates: a note on the Date cell saying so, or an asterisk
convention you pick. Honest data admits which parts are memory.

But here's the interesting part: only *half* of each old row is actually an
estimate.

<details>
<summary>Stuck? Start here</summary>

One of the two totals can be reconstructed exactly — not guessed — from data the
tracker already keeps. Which of your tabs remembers dates?

</details>

<details>
<summary>The reconstruction</summary>

Purchases records every buy with its date. A SUMIF over dates before a cutoff
rebuilds Total spent *as of that day*, exactly — the past of your spending was
being written down all along. Total value has no such tab behind it: nobody
recorded card values a month ago, so that number is memory, and it gets marked
as such. Notice the asymmetry. It's the subject of this whole lesson, and it
gets named properly at the end.

</details>

### Draw the growth curve

Goal: a line chart — Date along the bottom, Net as the line, Total value as a
second line if you want it — titled as its question. "Is the collection
growing?" is a fine title; yours may be better.

This chart is the single most motivating picture the tracker will ever produce,
and it starts existing today. Its first version is part measurement, part
labeled memory; every week from now on it gets one more true point, and the
estimates matter less and less.

### Put history inside the headline numbers

Goal: next to the headline stats on Stats — total value, net — a sparkline fed
from the matching Snapshots column, so the dashboard's biggest numbers each
carry a tiny picture of their own recent past.

<details>
<summary>Stuck? Start here</summary>

The SPARKLINE help page is short — read all of it. The only real decision is
which Snapshots column each sparkline should watch.

</details>

### Commit to the schedule

Goal: pick the day. Weekly is the suggestion — often enough that the line means
something, rare enough to actually happen. Put a reminder wherever your
reminders live, and write the ritual in your logbook in your own words: value
pass, read two numbers, type one row.

This is the part that is deliberately manual. Every week you will read two
numbers off one tab and type them into another, and it will feel like being a
machine's substitute. That feeling is accurate, and it is the point: you are
learning this chore's exact shape by carrying it, and in
[Your first script](../first-script/guided.md) you will hand it — precisely
specified, because you lived it — to an actual machine.

---

## Break it on purpose

The first two experiments run on a copy — File → Make a copy, or duplicate the
tab — the same expendable-surface habit as always. The third runs on the real
tab, so save a named version first: File → Version history, name the current
version.

**Skip two weeks.** On the copy: invent a plausible history with a two-week hole
in it, chart it, and study what the chart does with the gap. Does it space
points by real date distance, or evenly by row? Does the line stride across the
hole as if nothing happened? Whatever you find, notice what that stretch of line
*is*: a guess. Nobody measured anything there. A line chart draws something
between every pair of points whether or not anything is known about the space
between — which means a gappy history produces a chart that lies by omission,
smoothly. Delete the copy when you've seen it.

**Snapshot twice in one day.** Same copy: two rows, same date, different
numbers. Look at what the line does at that date. The tab's contract was one row
per date, and a duplicate is an ambiguity — the chart has to render the
ambiguity somehow, and what it renders is nonsense. Decide your house rule now
(a second snapshot in a day replaces the first, or doesn't happen) and write it
in the logbook. Delete the copy.

**The self-rewriting history.** On the real tab, named version saved: take one
snapshot row and replace its typed totals with formulas pointing at Stats. It
looks identical. Now change one card's Value on Collection — and watch the
*past* move. That row is no longer a record of anything; it's the present
wearing a date. Undo immediately: retype the frozen numbers, or restore your
named version. This is the entire reason for the typed-values rule, seen once
with your own eyes so you never have to see it by accident.

---

## What just happened

The Snapshots tab is a **time series**: measurements paired with dates, appended
and never edited. It is the same data shape behind every stock chart, every step
counter, every weather record, every growth chart penciled on a door frame. You
now maintain one.

The deeper thing you built today is a distinction. Collection is **state** —
what is true now, where every update destroys the old truth by overwriting it.
Snapshots is **history** — what was true when, which only ever grows. One
overwrites; one appends. They feel similar to edit, and they could not be more
different in what they can answer.

You met the law that connects them while backfilling. You could rebuild your
total spending for any past date, exactly, because Purchases — though you never
called it this — has been a history tab all along: rows with dates, appended,
never edited. But no formula could recover what the collection was *worth* a
month ago, because value only ever lived in state, and state forgets. That's the
general rule, and it's worth keeping for life: **you can always derive state
from history, never history from state.** Which is why history has to be kept on
purpose, starting before you need it.

And notice what the chore turned out to be, precisely: read two numbers, type
three, weekly. A procedure so exact a machine could follow it. That is not an
accident.

---

## Go further

- Should snapshots record per-set values too? Sketch what the tab would need —
  more columns per row, or more rows per date — and work out what each design
  would do to the chart. This is a real fork with real tradeoffs, and data
  designers argue about exactly this shape.
- What's the right gap between snapshots? Daily catches more and mostly records
  noise; monthly is cheap and blurry. What facts about the card market — or
  about you — would change the answer?
- Genuinely open: when a card's market value jumps, did your collection *gain*
  anything? The growth curve says yes. Your wallet hasn't noticed. Both are
  telling the truth about something — hold the question, because it comes back
  properly the day the tracker starts handling actual sales.

---

## What you have now

- A Snapshots tab (Date | Total value | Total spent | Net) holding one true
  measurement and a labeled, honest prehistory
- The growth curve: a titled line chart of Net over time that gains one true
  point every week from now on
- Sparklines beside the headline stats — the dashboard's numbers now carry their
  own recent history
- A weekly snapshot ritual, scheduled and written in your own words — the exact
  chore a later lesson teaches a machine to do
- A distinction other lessons will lean on: state overwrites, history appends
