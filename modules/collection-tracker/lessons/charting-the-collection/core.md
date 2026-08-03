# Charting the collection

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** charting-the-collection
- **Module / Part:** Building a collection tracker — Part 3: Questions the data can answer
- **Scaffolding:** level 2 leaning 3 — first charts lesson, but the learner is
  data-fluent by now; goals with thin hints, one or two rungs only
- **Deliveries:** guided only (module default)
- **Status:** ready

## Goal and payoff

Turn three of the tracker's numbers into three charts — spend by month, value by
set, cost against value per card — each chart built as the answer to exactly one
question, titled as that question. The lesson under the lesson: a chart is a
derived view, a formula that draws; and choosing a chart type is choosing which
comparison the reader's eye performs. Payoff: a stats tab that reads at a glance,
worth handing to someone on a phone — the first version of the dashboard other
people actually want to look at.

## Prerequisites

- A Stats tab with real numbers on it — spend by month, value by set — established
  by `lessons/questions-your-data-can-answer/`
- Categories that match exactly, enforced by dropdowns — established by
  `lessons/keeping-data-clean/`
- A Collection tab with Cost and Value per card — established by
  `lessons/first-ledger/`

## Establishes

- The learner can build a chart from a range, choose its type deliberately, and
  title it as the question it answers
- Three charts exist on the Stats tab (or a dashboard region of it): spend by
  month, value by set, cost vs value per card
- Knows that charts recalculate like formulas — edit the data, the picture follows
- Cited by other cores as: "you can build a chart from a range and title it —
  established by `lessons/charting-the-collection/`."

## Facts

- Inserting a chart: select a range, then Insert → Chart [volatile as of 2026-08 —
  menu locations shift; deliveries phrase as intent, never pixel-hunt]. A chart
  editor panel opens.
- The chart editor asks two real questions, whatever Google currently calls its
  tabs [volatile]: **what data** (the range, and which column is labels vs values)
  and **which shape** (the chart type). Everything else is decoration.
- Titles: editable in the chart editor's customization area, or by double-clicking
  the title on the chart itself [volatile].
- Charts float above the grid and can be dragged anywhere, including onto other
  tabs (cut and paste the chart, or use its own move option [volatile]).
- A chart is bound to the range it was fed. Edit values inside the range → the
  chart redraws. Add rows *below* the range → the chart ignores them, unless the
  range was written to include future rows (e.g. `B2:C100` or a whole-column
  range).
- Chart types used in this lesson and the comparison each makes the eye perform:
  - **Column** — compare heights across a handful of categories (months). Good for
    "which is biggest, and by how much."
  - **Bar** — same comparison, horizontal; labels stay readable when category
    names are long (set names).
  - **Pie** — parts of a whole, as angles. Honest note: the eye is bad at
    comparing angles, and past four or five slices a pie becomes decoration; this
    is why pies get mocked in data circles. Legitimate when the question really is
    "what fraction of the whole," with few slices.
  - **Scatter** — two measures per row, one dot per row (cost on one axis, value
    on the other). The only shape here that shows every card individually.
- For cost-vs-value the learner needs non-adjacent columns (Card, Cost, Value).
  Select the first column, then hold Cmd (Mac) or Ctrl (Windows) while selecting
  the others [volatile in detail]; or set the ranges inside the chart editor.
- On a cost-vs-value scatter, the break-even line is the diagonal where value =
  cost: dots above it are cards worth more than they cost.
- Feeding a chart a range that includes a header row or a total row makes the
  chart treat those as data. A total row typically dwarfs everything (the monster
  bar); exact behavior with header rows varies with the editor's header detection
  [verify — current header-detection behavior; the break-it has the learner
  observe rather than be told, so deliveries need no assertion].
- Where charts live: on Stats next to the numbers, or in a cleared region of Stats
  acting as a dashboard. Tradeoff (delivery keeps it light): one tab to show
  people vs a stats table that stays readable. Learner's call; either satisfies
  later lessons.
- Documentation: the charts section of Google's **Docs editors help center**
  (support.google.com/docs) — search it for "add and edit charts." Chart-type
  specifics live in the same help center under each type's name.
- Experiments guard: before restructuring anything, save a named version — File →
  Version history → Name current version [volatile] — the module's standing habit.

## Arc

### Orientation — given plainly

Numbers answer questions one at a time; a chart answers with shape — biggest,
trend, outlier, at a glance, and to people who would never read the table. What a
chart is here: a derived view of a range, like a formula that draws instead of
calculates. Insert → Chart stated plainly. The editor's two real questions (what
data, which shape) stated plainly. The design rule given upfront, because it is
orientation and not puzzle: **a chart answers one question, and its title should
be that question** — a chart titled "Chart of Stats" answers nothing.

### Predictions to elicit

- Before charting: sketch the spend-by-month chart by hand in the logbook from the
  Stats numbers. Which month tallest? Tallest by roughly how much?
- Value by set: which set dominates, and what fraction of the whole collection's
  value — half? a quarter?
- Cost vs value: how many cards sit above break-even? A number.

### The work — goals and hint ladders

1. **Spend by month, as a column chart.** Goal: a chart on Stats titled with the
   question (e.g. "Which month cost the most?"). Success: the columns match the
   hand sketch or the learner can say why not.
   - Rung 1: a chart wants a rectangle — one column of labels, one column of
     numbers, nothing else. Find that rectangle in Stats before touching Insert.
   - Rung 2: select the rectangle, Insert → Chart, then answer the editor's two
     questions: confirm the range, choose column. If the editor guessed a
     different type, that is a guess, not a verdict — override it.
2. **Value by set — and an honest choice of shape.** Goal: build it twice, as a
   pie and as a bar chart, and keep the one that answers the question better.
   Deliveries state the pie problem plainly (angle comparison, slice count) but
   the *choice* is the learner's, made by looking at both. Success: the kept chart
   is titled as its question; the learner can defend the choice in one sentence.
   - Rung 1: the same rectangle rule applies; the editor's chart-type list is a
     menu of comparisons, not styles. Ask of each candidate: what does this shape
     make my eye do?
3. **Cost vs value, one dot per card.** Goal: a scatter with cost on one axis and
   value on the other, titled as its question (e.g. "Which cards earned their
   price?"). Success: the learner can point at the chart and name the best and
   worst purchase without touching the table, and can say where break-even is on
   the picture.
   - Rung 1: this chart needs two number columns plus the card names, and they
     are not adjacent — select multiple ranges (Cmd/Ctrl), or wire the ranges up
     inside the editor.
   - Rung 2: if the dots make no sense, check which column the editor put on
     which axis — that is a "what data" question, not a "which shape" question.
4. **Decide where the dashboard lives.** Goal: charts arranged on Stats (or a
   region of it), deliberately, so the tab reads top-to-bottom on someone else's
   screen. Tradeoff stated lightly, learner decides.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Feed a chart the header and the total.** Rebuild the spend chart (or re-range
  the existing one) to include the header row and the total row. Look at what
  happens — typically a monster bar making every real month unreadable, and
  possibly a phantom category [do not assert exact behavior; the learner
  observes]. Then diagnose it the honest way: open the chart's editor and read
  *what range it was fed*. Teaches: a chart never lies on its own initiative — it
  draws exactly the range it was given, and the fix is always in the range. Undo:
  restore the correct range.
- **Edit the data and watch.** With the value-by-set chart visible, change one
  card's Value on Collection by something large. Watch Stats recalculate and the
  chart redraw, no touch needed. Then add a brand-new row *below* the charted
  range on Stats (if their stats layout allows) and notice the chart ignores it.
  Teaches: charts are formulas that draw — live within their range, blind outside
  it. Undo the fake value.

### What just happened — the explanation

Charts are the third derived view the tracker has grown: formulas derive numbers
from rows, stats derive summaries from columns, charts derive *shape* from ranges.
Same data underneath every time; each view is a different sense organ pointed at
it. Choosing a chart type is choosing which comparison the reader's eye performs —
lengths (column, bar), angles (pie), position in space (scatter) — and the eye is
dramatically better at some of these than others, which is why a wrong-type chart
isn't ugly, it is *wrong*: it makes the eye compare the wrong thing, and the
reader walks away with a wrong impression while feeling informed. This is also why
the title-as-question rule matters: it forces the author to know which single
question the chart answers, and a chart whose author can't name its question is
decoration. One layer deeper: every dashboard in every office works exactly like
the Stats tab now does — tables nobody reads, feeding pictures everybody does.

### Go further — open questions

- The gain and loss colors from the conditional-formatting work live on the table.
  Can a *chart* color by gain versus loss — winners one color, losers another?
  Investigate what the chart editor allows per-series or per-point.
- The Payback tab holds a balance that has been falling toward zero. That is a
  chart waiting to exist, and its shape is the whole story of the debt. Build it,
  and decide what its title-question is.
- Genuinely open: find one chart in the wild — news, an ad, a video, a game's
  stats screen — that misleads. Not "looks bad": misleads. What exactly does it
  make your eye compare, and what would the honest version look like? There is no
  answer key for this one.

## Delivery notes

- **guided:** thin hints only — this learner has built formulas, cross-tab
  references, and validation; the chart editor is new surface but not a new kind
  of thinking. Keep rungs to one or two.
- Never name specific chart-editor tab labels or button positions; describe intent
  ("tell the editor which range and which shape"). The editor UI is the most
  volatile surface in the module.
- Do not spoil the monster-bar's exact appearance; the learner observes and
  diagnoses from the fed range.
- The pie discussion must stay honest but unsneering — one plain sentence about
  angles and slice count, no data-circles in-jokes in learner text.
