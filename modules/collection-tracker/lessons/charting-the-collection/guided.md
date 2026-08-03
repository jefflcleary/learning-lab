# Charting the collection

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your tracker can answer questions — spend by month, value by set, the best pulls —
but every answer is a number, and numbers have to be read one at a time. A chart
answers with shape. Which month was biggest, whether the collection is
top-heavy, which cards earned their price: shape shows all of it at a glance, and
it shows it to people who would never sit down and read your table.

This session turns three of the tracker's numbers into three charts, and each one
teaches a different shape on purpose. By the end, the stats tab becomes the first
version of something people actually ask to see: a dashboard.

---

## Before you start

You need:

- **A Stats tab with real numbers on it** — spend by month and value by set, built
  in [Questions your data can answer](../questions-your-data-can-answer/guided.md).
  Quick check: change one card's Value on Collection and watch a Stats number move.
- **Categories that match exactly**, enforced by dropdowns — set up in
  [Keeping the data clean](../keeping-data-clean/guided.md). Quick check: click a
  Set cell on Collection and a dropdown appears.
- **A Collection tab with a Cost and a Value for each card** — begun in
  [What is it all worth?](../first-ledger/guided.md). Quick check: every card row
  has both numbers filled in.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A column chart answering which month cost you the most
- A chart answering which set holds the collection's value — after building it two
  ways and choosing the honest one
- A chart with one dot per card that shows, in a single look, which purchases
  earned their price and which didn't
- A stats tab arranged so someone can read it on a phone without you narrating

---

## New tools

**The chart editor.** Selecting a range of cells and choosing Insert → Chart opens
a panel where the chart is defined. Menus move around over time, so hold on to
what the editor actually is rather than where its buttons sit: it asks you two
real questions — **what data** (which range, and which column holds the labels)
and **which shape** (the chart type). Everything else it offers is decoration.
Charts float above the grid once created; you can drag them where you want them.

A chart, once made, is not a picture. It stays connected to its range and redraws
whenever the data changes — you'll prove that later in this session.

Documentation lives in Google's **Docs editors help center** at
[support.google.com/docs](https://support.google.com/docs) — search it for
"add and edit charts." Each chart type has its own page there too.

One rule before any of it, because it is the difference between a dashboard and
wallpaper: **a chart answers one question, and its title should be that
question.** A chart titled "Chart of Stats" answers nothing. Every chart you make
today gets titled with the question it exists to answer.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Sketch the spend-by-month chart by hand, from the numbers already on Stats.
  Which month is tallest, and roughly how much taller than the next one?
- Which set do you expect to dominate the collection's value — and what fraction
  of the whole? Half? A quarter?
- If every card were a dot placed by what it cost and what it's worth, how many of
  your cards sit on the winning side? Write a number.

---

## The work

### Which month cost the most?

Goal: a column chart on Stats, built from your spend-by-month numbers, titled with
its question. A column chart compares heights across a handful of categories —
exactly the comparison "which month was biggest" needs.

You're done when the chart matches the sketch from your logbook — or when you can
say precisely why it doesn't.

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

Goal: build your value-by-set numbers as a chart **twice** — once as a pie, once
as a bar chart — then keep the one that answers the question better and delete
the other.

One fact to weigh while you look: human eyes are good at comparing lengths and
bad at comparing angles. A pie shows parts of a whole as angles, and past four or
five slices the small ones become indistinguishable slivers. Sometimes "what
fraction of the whole" really is the question and a pie with few slices answers
it well. Sometimes it isn't. Look at both of yours and decide.

You're done when one chart remains, titled as its question, and you can defend
the choice in one sentence.

<details>
<summary>Stuck? Start here</summary>

Same rectangle rule as before. And when the editor's chart-type list is open,
read it as a menu of comparisons, not styles — for each candidate, ask: what does
this shape make my eye do? Compare lengths? Compare angles? Follow a trend?

</details>

### Which cards earned their price?

Goal: a chart with **one dot per card** — cost on one axis, value on the other.
This shape is called a scatter chart, and it's the only one today that shows
every card individually instead of summing them into groups.

You're done when you can point at the chart and name your best and worst purchase
without looking at the table — and when you can say where "break-even" is on the
picture.

<details>
<summary>Stuck? Start here</summary>

This chart needs the card names, the Cost column, and the Value column — and on
Collection those aren't next to each other. You can select more than one range at
once: select the first, then hold Cmd (Mac) or Ctrl (Windows) while selecting the
rest. Or select roughly and fix the ranges inside the chart editor afterward.

</details>

<details>
<summary>If the dots make no sense</summary>

Check which column the editor put on which axis. That's a what-data question,
not a which-shape question — open the editor and read what it was fed.

</details>

Once the dots are up: the diagonal line where value equals cost is break-even.
Every dot above it is a card worth more than it cost. Every dot below it paid for
a lesson instead.

### Arrange the dashboard

The three charts need a home. Two reasonable answers: right on Stats next to the
numbers that feed them, or dragged together into a cleared region of Stats that
acts as the dashboard. The tradeoff is small but real — one tab to show people,
versus a stats table that stays readable as charts multiply. Your call.

Goal: arrange the charts so the tab reads top to bottom on someone else's screen,
each title a question, each chart the answer.

---

## Break it on purpose

Save a named version first — File → Version history, then name the current
version — the same habit as before any experiment.

**Feed a chart the header and the total.** Rebuild the spend chart's range — or
edit the existing chart's range — to include the header row and the total row.
Look at what the chart does with them. Then diagnose it properly: open the chart's
editor and read what range it was actually fed, and account for every strange
thing on the picture by finding its row. What this teaches is worth keeping
forever: a chart never lies on its own initiative. It draws exactly the range it
was given, and when a chart looks insane, the fix is always in the range. Restore
the correct range when you're done.

**Edit the data and watch.** With your value-by-set chart in view, go to
Collection and change one card's Value to something absurd. Watch: Stats
recalculates, and the chart redraws itself, untouched by you. Now try the
opposite — add a new row just *below* the range one of your charts uses, and
notice the chart ignores it completely. Charts are formulas that draw: live
within their range, blind outside it. Put the real value back.

---

## What just happened

Your tracker now has three kinds of derived view, and it's worth seeing them as a
family. Formulas derive numbers from rows. Stats derive summaries from whole
columns. Charts derive *shape* from ranges. Underneath all three sits the same
data, entered once — each view is a different sense organ pointed at it, and none
of them ever needs updating by hand, because none of them stores anything of its
own.

The deeper lesson is about the choice you made on the value-by-set chart.
Choosing a chart type is choosing which comparison the reader's eye performs:
columns and bars make it compare lengths, pies make it compare angles, scatters
make it judge position in space. The eye is dramatically better at some of these
than others. That's why a wrong-type chart isn't ugly — it's *wrong*: it makes
the eye compare the wrong thing, and the reader walks away misinformed while
feeling informed, which is worse than no chart at all.

And it's why the title rule earns its keep. Titling a chart with its question
forces you to know which single question it answers. A chart whose maker can't
name its question is decoration. Every dashboard in every office in the world
works the way your Stats tab now does — tables nobody reads, feeding pictures
everybody does — and the good ones are built by people who ask, of every chart,
what its question is.

---

## Go further

- Your table goes green and red by gain and loss. Can a chart do the same —
  winning cards one color, losing cards another? Dig into what the chart editor
  allows for individual series or points.
- The Payback tab holds a balance that has been falling toward zero. That is a
  chart waiting to exist, and its shape is the entire story of the debt. Build
  it — and decide what its title-question is.
- Find one chart in the wild — news, an ad, a video, a game's stats screen — that
  misleads. Not "looks bad": misleads. What exactly does it make your eye compare,
  and what would the honest version of it look like? Nobody has an answer key for
  this one.

---

## What you have now

- Three charts, each titled as the question it answers: spend by month, value by
  set, and cost against value for every card
- The chart editor's two real questions — what data, which shape — and the habit
  of overriding its guesses
- Proof, watched with your own eyes, that charts recalculate like formulas: edit
  the data and the picture follows
- A stats tab arranged as a dashboard — the version of the tracker you hand to
  someone on a phone
