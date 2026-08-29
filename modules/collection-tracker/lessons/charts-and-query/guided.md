# Charts and the QUERY function

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your tracker can answer questions — spend by month, value by set, the best
pulls — but every answer is a number, and numbers have to be read one at a
time. This session adds two bigger ways of looking at the same data.

The first is shape. A chart shows which month was biggest, whether the
collection is top-heavy, which cards earned their price — at a glance, and to
people who would never sit down and read your table. You'll turn three of the
tracker's numbers into three charts, each one teaching a different shape on
purpose, and the stats tab becomes the first version of something people
actually ask to see: a dashboard.

The second is grammar. Every question you've asked so far took one formula per
answer: a SUMIF for this total, a COUNTIF for that count. Sheets contains
something bigger — a function called QUERY, whose argument is a sentence in a
small question language. One line can say "show me these columns, only the rows
where this is true, grouped by that, biggest first" — and the answer arrives as
a whole table. You'll learn that language the way you'd learn any real tool: by
reading its actual documentation, asking questions you already know the answers
to, and checking every result against a number you trust.

---

## Before you start

You need:

- **A Stats tab with real numbers, clean categories, and criteria-formula
  skills** — built in
  [Stats with SUMIF and keeping data clean](../stats-and-clean-data/guided.md).
  Quick check: change one card's Value on Collection and watch a Stats number
  move; click a Type cell on Purchases and a dropdown appears; and you can
  write a SUMIF that totals one category without looking one up.
- **A Collection tab with a Cost and a Value for each card** — begun in
  [Building the ledger: cards, formulas, formatting](../building-the-ledger/guided.md). Quick check: every
  card row has both numbers filled in.
- **A Purchases tab recording every buy** — built in
  [Tracking purchases and money owed](../purchases-and-payback/guided.md). Quick
  check: each purchase has a Type and a Paid-by value.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A column chart answering which month cost you the most, a chart answering
  which set holds the collection's value — built two ways, with the honest one
  kept — and a chart with one dot per card showing which purchases earned
  their price
- A stats tab arranged so someone can read it on a phone without you narrating
- Read the complete documentation of a query language — all of it — and used
  four of its clauses
- Asked the tracker four real questions in that language, each answer verified
  against a number you computed by another road
- A questions tab where typing one sentence produces a table as its answer

---

## New tools

**The chart editor.** Selecting a range of cells and choosing Insert → Chart
opens a panel where the chart is defined. Menus move around over time, so hold
on to what the editor actually is rather than where its buttons sit: it asks
you two real questions — **what data** (which range, and which column holds
the labels) and **which shape** (the chart type). Everything else it offers is
decoration. Charts float above the grid once created; you can drag them where
you want them. A chart, once made, is not a picture: it stays connected to its
range and redraws whenever the data changes — you'll prove that later in this
session.

Chart documentation lives in Google's **Docs editors help center** at
[support.google.com/docs](https://support.google.com/docs) — search it for
"add and edit charts." Each chart type has its own page there too.

One rule before any charting, because it is the difference between a dashboard
and wallpaper: **a chart answers one question, and its title should be that
question.** A chart titled "Chart of Stats" answers nothing. Every chart you
make today gets titled with the question it exists to answer.

**QUERY** is a Sheets function: `=QUERY(range, "question")`. The first argument
is a range — usually another tab's columns, like `Purchases!A:F`. The second is
a sentence, in quotes, written in QUERY's own language: clauses such as
`select`, `where`, `group by`, and `order by`, combined in one line. There is
also an optional third argument for saying how many header rows the range has.

Three orientation facts, so the language doesn't fight you:

- Inside the sentence, columns are addressed by their **column letter in the
  sheet being queried** — `A`, `B`, `C` of that tab.
- Text values take single quotes inside the double-quoted sentence
  (`where B = 'Charizard'`); numbers go bare (`where E > 20`).
- The answer **spills**: it fills the cells below and beside the formula, and it
  errors if that space isn't empty. Make a fresh tab for the second half of this
  session — call it Questions — so answers have room.

QUERY's documentation is the **QUERY function** help page in the same Docs
editors help center — search the help center for "QUERY function." That page
documents every clause with examples, and it is the second half's primary
text. This lesson will not re-teach what it says.

Two column maps you'll be addressing, from your own tracker:

- Collection: A Card, B Set, C Date, D Cost, E Value, F Gain
- Purchases: A Date, B Item, C Type, D Cost, E Paid by, F Notes

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Sketch the spend-by-month chart by hand, from the numbers already on Stats.
  Which month is tallest, and roughly how much taller than the next one?
- Which set do you expect to dominate the collection's value — and what fraction
  of the whole? Half? A quarter?
- If every card were a dot placed by what it cost and what it's worth, how many
  of your cards sit on the winning side? Write a number.
- Before opening the QUERY help page: how many clauses do you think a question
  language needs? An actual number.
- Take the question "every purchase someone else fronted, newest first" and
  underline the working words: which one filters? Which one sorts? Which ones
  choose the columns you'd want to see?

---

## The work

### Which month cost the most?

Goal: a column chart on Stats, built from your spend-by-month numbers, titled
with its question. A column chart compares heights across a handful of
categories — exactly the comparison "which month was biggest" needs.

You're done when the chart matches the sketch from your logbook — or when you
can say precisely why it doesn't.

<details>
<summary>Stuck? Start here</summary>

A chart wants a rectangle: one column of labels, one column of numbers, and
nothing else — no headers, no total row. Find that rectangle among your stats
before touching the Insert menu.

</details>

<details>
<summary>The two questions</summary>

Select the rectangle, then Insert → Chart. The editor will guess a chart type;
a guess is not a verdict. Answer its two questions yourself: confirm the range
is exactly your labels-and-numbers rectangle, and set the shape to a column
chart. Then find where the title is edited and make the title the question.

</details>

### Which set holds the value?

Goal: build your value-by-set numbers as a chart **twice** — once as a pie,
once as a bar chart — then keep the one that answers the question better and
delete the other.

One fact to weigh while you look: human eyes are good at comparing lengths and
bad at comparing angles. A pie shows parts of a whole as angles, and past four
or five slices the small ones become indistinguishable slivers. Sometimes "what
fraction of the whole" really is the question and a pie with few slices answers
it well. Sometimes it isn't. Look at both of yours and decide.

You're done when one chart remains, titled as its question, and you can defend
the choice in one sentence.

<details>
<summary>Stuck? Start here</summary>

Same rectangle rule as before. And when the editor's chart-type list is open,
read it as a menu of comparisons, not styles — for each candidate, ask: what
does this shape make my eye do? Compare lengths? Compare angles? Follow a
trend?

</details>

### Which cards earned their price?

Goal: a chart with **one dot per card** — cost on one axis, value on the other.
This shape is called a scatter chart, and it's the only one today that shows
every card individually instead of summing them into groups.

You're done when you can point at the chart and name your best and worst
purchase without looking at the table — and when you can say where "break-even"
is on the picture.

<details>
<summary>Stuck? Start here</summary>

This chart needs the card names, the Cost column, and the Value column — and on
Collection those aren't next to each other. You can select more than one range
at once: select the first, then hold Cmd (Mac) or Ctrl (Windows) while
selecting the rest. Or select roughly and fix the ranges inside the chart
editor afterward.

</details>

<details>
<summary>If the dots make no sense</summary>

Check which column the editor put on which axis. That's a what-data question,
not a which-shape question — open the editor and read what it was fed.

</details>

Once the dots are up: the diagonal line where value equals cost is break-even.
Every dot above it is a card worth more than it cost. Every dot below it paid
for a lesson instead.

### Arrange the dashboard

The three charts need a home. Two reasonable answers: right on Stats next to
the numbers that feed them, or dragged together into a cleared region of Stats
that acts as the dashboard. The tradeoff is small but real — one tab to show
people, versus a stats table that stays readable as charts multiply. Your call.

Goal: arrange the charts so the tab reads top to bottom on someone else's
screen, each title a question, each chart the answer.

### From pictures to grammar

Each chart you just built answers one fixed question, forever. The rest of this
session is for the questions you haven't thought of yet — a language that can
phrase any of them. From here on, the pattern for every goal is deliberate:
each is a question stated in English, and each comes with its own proof. When a
new tool and an old tool reach the same number by different roads, you can
trust the new tool. That's how it's done with every new tool, forever.

No collapsed hints in this half. The help page is your text.

### Read the surface

Open the QUERY function help page and read it top to bottom. You are not
hunting for anything — you are seeing the size of the language before using it,
the same way you once read every line of a reference to see how big the space
was.

Done when: every clause the page documents is listed in your logbook with a
one-line guess at its job, and you've checked your clause-count prediction.

### Your best cards, best first

The question: every card worth more than some amount — pick an amount that
doesn't leave the answer empty — showing card, set, and value, most valuable at
the top.

Done when: the query returns exactly those columns in that order of value; the
top row is the card you already know is your best; and a COUNTIF written next
to the query agrees with how many rows the query returned.

### Total spent per Type

The question: for each type of purchase, the total spent — one query, one
table, every type at once.

Done when: each total in the query's answer matches a SUMIF for that same type.
Your Stats tab already holds these numbers; for any it doesn't, write a fresh
SUMIF beside the query. Two roads, same truth, every row.

### Fronted purchases, newest first

The question: every purchase someone else fronted — date, item, and cost,
newest at the top. "Fronted" here means whatever exact value your Paid-by
dropdown uses; the query has to match it precisely, and thanks to the dropdown,
it can.

Done when: the newest fronted purchase is the first row; and the costs in the
answer add up to the same total your payback ledger's Borrowed side implies. If
those two numbers disagree, one of your ledgers has a story to tell — finding
out which is part of the work.

### If you're brave: average pack cost per month

The question: for pack purchases only, the average cost, grouped by month. This
one combines everything — filtering, grouping, an aggregate that isn't sum —
plus a scalar function for pulling the month out of a date, which the help
page's linked reference covers.

Done when: the query returns one row per month; and you have confirmed one
month's average by hand — sum divided by count for that month. One warning,
built into the goal: check the month *labels* against a month you know. The
language has a surprise waiting there, and checking against a known answer is
exactly how surprises like it get caught.

---

## Break it on purpose

The chart experiments come first — save a named version before them: File →
Version history, then name the current version. The query experiments run on
the Questions tab and touch no data.

**Feed a chart the header and the total.** Rebuild the spend chart's range — or
edit the existing chart's range — to include the header row and the total row.
Look at what the chart does with them. Then diagnose it properly: open the
chart's editor and read what range it was actually fed, and account for every
strange thing on the picture by finding its row. What this teaches is worth
keeping forever: a chart never lies on its own initiative. It draws exactly the
range it was given, and when a chart looks insane, the fix is always in the
range. Restore the correct range when you're done.

**Edit the data and watch.** With your value-by-set chart in view, go to
Collection and change one card's Value to something absurd. Watch: Stats
recalculates, and the chart redraws itself, untouched by you. Now try the
opposite — add a new row just *below* the range one of your charts uses, and
notice the chart ignores it completely. Charts are formulas that draw: live
within their range, blind outside it. Put the real value back.

**Misspell a clause.** Take a working query and wound one clause — `selct`,
`order byy`. Read the entire error: hover over or click the error in the cell
until you can see the whole message. It tells you what the parser was
attempting and where it gave up. QUERY's errors are written to be read, which
makes them rare and valuable — read every word before fixing the spelling.

**Lie about types.** Two separate edits, one at a time. First, put quotes
around a number in a `where` — turning an amount into text. Second, take the
quotes off a text value. Read both errors in full. The language keeps numbers
and text strictly apart, and when a query confuses them it says so: quoted
means text, bare means a number or a column name. Undo both edits and watch the
answer return.

---

## What just happened

Your tracker now has four kinds of derived view, and it's worth seeing them as
a family. Formulas derive numbers from rows. Stats derive summaries from whole
columns. Charts derive *shape* from ranges. And queries derive whole tables
from tables. Underneath all four sits the same data, entered once — each view
is a different sense organ pointed at it, and none of them ever needs updating
by hand, because none of them stores anything of its own.

On the charts side, the deeper lesson is the choice you made on the
value-by-set chart. Choosing a chart type is choosing which comparison the
reader's eye performs: columns and bars make it compare lengths, pies make it
compare angles, scatters make it judge position in space. The eye is
dramatically better at some of these than others. That's why a wrong-type chart
isn't ugly — it's *wrong*: it makes the eye compare the wrong thing, and the
reader walks away misinformed while feeling informed, which is worse than no
chart at all. And it's why the title rule earns its keep: titling a chart with
its question forces you to know which single question it answers. A chart whose
maker can't name its question is decoration. Every dashboard in every office in
the world works the way your Stats tab now does — tables nobody reads, feeding
pictures everybody does — and the good ones are built by people who ask, of
every chart, what its question is.

On the other side: you just used a query language. The shape you've been
writing — select these columns, where this is true, group by that, order by
this — is the grammar of **SQL**, the language professionals use to question
databases every single day. Banks, games, hospitals, every app with an account
system: behind each one is someone writing sentences of exactly this shape
against tables not so different from yours. QUERY is that grammar, borrowed
into a spreadsheet. When you meet the real thing someday, it will not be a
stranger.

It's also worth seeing what changed since the criteria formulas. A SUMIF asks
one question and hands back one number; ten questions cost ten formulas. QUERY
is not a bigger formula — it's a *grammar*: the same four or five clauses
recombine into any question you can phrase. Learning a handful of clauses beat
learning forty functions, and that trade — grammar over vocabulary — is the
reason query languages exist.

And underneath it all, the contract you signed when you cleaned your data paid
off again. Your fronted-purchases query returned the truth only because every
fronted purchase says exactly the same word — the dropdowns guaranteed it.
Clean categories made SUMIF trustworthy, then the stats tab, then the charts
fed by it, and now a whole question language. Good data keeps paying compound
interest; that's why the cleaning came first.

---

## Go further

- The Payback tab holds a balance that has been falling toward zero. That is a
  chart waiting to exist, and its shape is the entire story of the debt. Build
  it — and decide what its title-question is.
- The `pivot` clause turns a query's answer into a grid — spend per type *per
  month*, one line — and the `label` clause renames the machine-made column
  headings. The help page shows both. Take your best query and make its answer
  read like something you'd hand a person.
- QUERY can question **another spreadsheet entirely**, through a function called
  IMPORTRANGE — it has its own page in the same help center, by name. Expect a
  permission step the first time two files meet, and expect one more surprise
  about how columns get addressed. Both are findable, and finding them is the
  exercise.
- Genuinely open: find one chart in the wild — news, an ad, a video, a game's
  stats screen — that misleads. Not "looks bad": misleads. What exactly does it
  make your eye compare, and what would the honest version of it look like?
  Nobody has an answer key for this one.
- Genuinely open: QUERY can do everything ten SUMIFs do, in one line — so why
  would anyone still use ten SUMIFs? There are real answers to this. Keep using
  both for a few weeks and see which ones you discover.

---

## What you have now

- Three charts, each titled as the question it answers: spend by month, value
  by set, and cost against value for every card — arranged as a dashboard you
  can hand to someone on a phone
- The chart editor's two real questions — what data, which shape — and the
  habit of overriding its guesses
- Proof, watched with your own eyes, that charts recalculate like formulas:
  edit the data and the picture follows
- The complete clause surface of QUERY, read once and listed in your logbook
- Four questions asked in a query language, every answer verified against a
  number reached by another road — and the habit of reading a query error all
  the way through before touching anything
- A Questions tab where a typed sentence produces a table — ready for any
  question the collection raises next
