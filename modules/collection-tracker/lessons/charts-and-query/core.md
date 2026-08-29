# Charts and the QUERY function

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** charts-and-query
- **Module / Part:** collection-tracker — Part 3 — Questions the data can answer
- **Scaffolding:** split by half. Charts: level 2 leaning 3 — first charts
  work, but the learner is data-fluent; goals with thin hints, one or two rungs
  only. QUERY: level 3 — third stage of the query-language thread (criteria
  formulas → validated categories → QUERY); goals and success criteria only,
  no hint ladders. The QUERY function help page is the learner's primary text.
- **Deliveries:** guided only (module default)
- **Status:** ready

## Goal and payoff

Two new ways of looking at the same data, in one arc: pictures of the data,
then a question grammar for the data.

First half: turn three of the tracker's numbers into three charts — spend by
month, value by set, cost against value per card — each chart built as the
answer to exactly one question, titled as that question. The lesson under the
lesson: a chart is a derived view, a formula that draws; and choosing a chart
type is choosing which comparison the reader's eye performs.

Second half: ask the tracker questions in QUERY — a one-line question language
built into Sheets — and verify every answer against a number reached by another
road (SUMIF/COUNTIF), which is how a new tool earns trust. The module's
query-language thread pays off here: criteria formulas were single questions;
QUERY is a question *grammar*, the same select/where/group-by grammar
professionals use against databases every day. This is the one lesson where the
word SQL lands in learner text, once.

The spine joining the halves: charts and query answers are both **derived
views** — nothing stored, everything computed from the same tables, each view a
different sense organ pointed at the data.

Payoff: a stats tab that reads at a glance — the first version of the dashboard
other people actually want to look at — plus a questions tab where a typed
sentence produces a table as its answer, askable on demand, showable to anyone.

## Prerequisites

- A Stats tab with real numbers on it (spend by month, value by set), a check
  row, categories that match exactly enforced by dropdowns, and comfort with
  criteria formulas (SUMIF, COUNTIF) — established by
  `lessons/stats-and-clean-data/`
- A Collection tab with Cost and Value per card — established by
  `lessons/building-the-ledger/`
- A Purchases tab recording every buy, its Type, and who paid — established by
  `lessons/purchases-and-payback/`

## Establishes

- The learner can build a chart from a range, choose its type deliberately, and
  title it as the question it answers; three charts exist on the Stats tab (or
  a dashboard region of it): spend by month, value by set, cost vs value per
  card; and the learner knows charts recalculate like formulas — established by
  `lessons/charts-and-query/`
- The learner has read the entire clause surface of QUERY and written working
  queries using select, where, group by, and order by, each verified against an
  independently computed number; knows QUERY's errors are readable and reads
  them fully — established by `lessons/charts-and-query/`
- Cited by other cores as: "you can build a chart from a range and title it,
  and you can ask the tracker questions in QUERY and verify the answers —
  established by `lessons/charts-and-query/`."

## Facts

### Charts

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
- Charts documentation: the charts section of Google's **Docs editors help
  center** (support.google.com/docs) — search it for "add and edit charts."
  Chart-type specifics live in the same help center under each type's name.

### QUERY

- `=QUERY(range, "query")` — first argument a range (usually another tab's
  columns, e.g. `Purchases!A:F`), second a quoted sentence in QUERY's own small
  language. An optional third argument states how many header rows the range has;
  the help page covers it.
- Inside the query sentence, columns are addressed by their **spreadsheet column
  letter within the queried range**: `A`, `B`, `C`… of the sheet being queried.
- Clause order is fixed: `select`, `where`, `group by`, `pivot`, `order by`,
  `limit`, `label` (and others — the help page is the complete list; the read-
  the-surface step has the learner enumerate them, so deliveries don't).
- Text values in `where` take single quotes inside the double-quoted sentence
  (`where E = 'Fronted'` — learner substitutes their own category value). Numbers
  go unquoted (`where E > 20`).
- `group by` requires every non-aggregated selected column to appear in the
  clause; aggregates are `sum()`, `avg()`, `count()`, `min()`, `max()`.
- `order by ... desc` / `asc`.
- QUERY output spills into the cells below and to the right of the formula; it
  needs empty space or it errors. A scratch tab (suggest name: Questions) keeps
  spills from colliding with real data.
- Error behavior: a failed QUERY shows an error in the cell; the full message
  (visible on hover / in the cell) states what the parser objected to, often
  naming the offending token or column. Genuinely readable; do not assert exact
  wording in deliveries — the break-it section has the learner read them whole.
- Date/time scalar functions exist (`month()`, `year()`, …). `month()` returns
  months numbered from zero (January = 0) [verify — long-standing Google
  Visualization query-language behavior as of 2026-08; deliveries do not assert
  it, the brave goal has the learner discover it against a known month].
- Canonical column maps for this tracker:
  - Collection: A Card | B Set | C Date | D Cost | E Value | F Gain
  - Purchases: A Date | B Item | C Type | D Cost | E Paid by | F Notes
- QUERY documentation: the **QUERY function** help page in Google's Docs editors
  help center (support.google.com/docs — search "QUERY function"). It documents
  every clause with examples and links to the fuller query-language reference.
  This page is the second half's primary text.
- IMPORTRANGE (go further only): its own function help page, same help center,
  "IMPORTRANGE" by name. First use against a new source file triggers a one-time
  permission prompt [volatile in detail — friction is discoverable, deliveries
  flag that it exists and no more]. When querying an imported range, column
  addressing changes form — deliberately left discoverable, the help page covers
  it.
- Experiments guard: before restructuring anything, save a named version — File →
  Version history → Name current version [volatile] — the module's standing
  habit. QUERY writes nothing, but the scratch-tab suggestion keeps spills away
  from data regardless.

## Arc

### Orientation — given plainly

Numbers answer questions one at a time; a chart answers with shape — biggest,
trend, outlier, at a glance, and to people who would never read the table. What a
chart is here: a derived view of a range, like a formula that draws instead of
calculates. Insert → Chart stated plainly. The editor's two real questions (what
data, which shape) stated plainly. The design rule given upfront, because it is
orientation and not puzzle: **a chart answers one question, and its title should
be that question** — a chart titled "Chart of Stats" answers nothing.

QUERY oriented plainly as the second half's tool: a function whose second
argument is a sentence in a small, purpose-built question language — clauses
like `select`, `where`, `group by`, `order by`, combined in one line. That the
help page documents every clause and serves as that half's actual text. How
columns are addressed (letters within the queried range). Where answers land
(spill; scratch tab suggested). What is *not* given: the queries themselves —
every QUERY goal is a question the learner translates into the language,
checked against a number they can already compute.

### Predictions to elicit

- Before charting: sketch the spend-by-month chart by hand in the logbook from the
  Stats numbers. Which month tallest? Tallest by roughly how much?
- Value by set: which set dominates, and what fraction of the whole collection's
  value — half? a quarter?
- Cost vs value: how many cards sit above break-even? A number.
- Before opening the help page: how many clauses does a question language need?
  A number.
- Take the question "every purchase someone else fronted, newest first" and
  underline each word that does work: which word filters, which word sorts, which
  words pick columns?

### The work — goals and hint ladders

**First half — pictures (thin hints):**

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

**Second half — grammar (level 3: goals and done-when criteria only).** The
transition, made in place: the charts each answer one fixed question; the next
tool answers any question that can be phrased. Two roads, same truth is the
verification pattern for every goal.

5. **Read the surface.** The QUERY function help page, top to bottom — not
   hunting for anything, just seeing the size of the language. Done when: every
   clause is listed in the logbook with a one-line guess at its job, and the
   clause-count prediction is checked.
6. **Cards worth more than $X, best first.** Learner picks X so the answer isn't
   empty. Done when: the query returns card name, set, and value, ordered most
   valuable first; the top row is the card they already know is their best; and a
   COUNTIF written beside the query agrees with the number of rows returned.
7. **Total spent per Type.** Done when: one query returns each purchase type and
   its total; each total agrees with a SUMIF for the same type (existing Stats
   numbers or fresh SUMIFs written next to the query — either road). Two roads,
   same truth: this is how a new tool earns trust.
8. **Purchases that were fronted, newest first.** "Fronted" = whatever exact
   value the learner's Paid-by dropdown uses. Done when: the query returns date,
   item, and cost, newest at the top; and the costs sum (a SUM around the query's
   cost column, or a SUMIF on Purchases) to the same total the payback ledger's
   Borrowed side implies.
9. **If you're brave: average pack cost per month.** Done when: a query groups
   pack purchases by month and averages their cost — and the learner has
   confirmed one month's average by hand (sum ÷ count for that month). Warning
   built into the goal, not a spoiler: check the month *labels* against a month
   you know; the language has a surprise there, and the check is how it's found.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Feed a chart the header and the total.** Named version first. Rebuild the
  spend chart (or re-range the existing one) to include the header row and the
  total row. Look at what happens — typically a monster bar making every real
  month unreadable, and possibly a phantom category [do not assert exact
  behavior; the learner observes]. Then diagnose it the honest way: open the
  chart's editor and read *what range it was fed*. Teaches: a chart never lies
  on its own initiative — it draws exactly the range it was given, and the fix
  is always in the range. Undo: restore the correct range.
- **Edit the data and watch.** With the value-by-set chart visible, change one
  card's Value on Collection by something large. Watch Stats recalculate and the
  chart redraw, no touch needed. Then add a brand-new row *below* the charted
  range on Stats (if their stats layout allows) and notice the chart ignores it.
  Teaches: charts are formulas that draw — live within their range, blind outside
  it. Undo the fake value.
- **Misspell a clause.** On the Questions tab; touches no data. Take a working
  query and break one clause's spelling (`selct`, `order byy`). Read the entire
  error — hover or click for the full text. It says what the parser was trying
  to do and where it gave up. Teaches: QUERY's errors are written to be read,
  and reading the whole error is the debugging habit. Undo the spelling.
- **Lie about types.** Two edits, one at a time: put quotes around a number
  (`where D > '20'`) and remove the quotes from a text value (`where E =
  Fronted`). Read both errors fully. Teaches: the language distinguishes numbers
  from text and says so when the query confuses them — quoted means text,
  unquoted means number or column name. Undo both.

### What just happened — the explanation

The family of derived views, named at full size: formulas derive numbers from
rows, stats derive summaries from columns, charts derive *shape* from ranges,
and queries derive whole tables from tables. Same data underneath every time;
each view is a different sense organ pointed at it, none stores anything of its
own, and none ever needs updating by hand.

On charts: choosing a chart type is choosing which comparison the reader's eye
performs — lengths (column, bar), angles (pie), position in space (scatter) —
and the eye is dramatically better at some of these than others, which is why a
wrong-type chart isn't ugly, it is *wrong*: it makes the eye compare the wrong
thing, and the reader walks away with a wrong impression while feeling
informed. This is also why the title-as-question rule matters: it forces the
author to know which single question the chart answers, and a chart whose
author can't name its question is decoration. One layer deeper: every dashboard
in every office works exactly like the Stats tab now does — tables nobody
reads, feeding pictures everybody does.

On QUERY: the learner just used a query language. The shape they've been
writing — select-columns, where-condition, group-by-category, order-by-value —
is the grammar of **SQL**, the language professionals use to question databases
every day; QUERY is the grown-up sibling's grammar borrowed into a spreadsheet.
(Module rule: the word SQL appears here, once, now that it names something the
learner has done.) One layer deeper on the thread: SUMIF asks one question and
returns one number; QUERY is a grammar — the same handful of clauses recombine
into any question, which is why learning four clauses beats learning forty
functions. And the clean-data contract pays again, compounding: `where E =
'Fronted'` returns truth only because every fronted purchase says exactly
`Fronted` — the dropdowns built earlier are why a one-line question can be
trusted at all.

### Go further — open questions

- The Payback tab holds a balance that has been falling toward zero. That is a
  chart waiting to exist, and its shape is the whole story of the debt. Build it,
  and decide what its title-question is.
- The `pivot` clause turns a query's answer into a grid — spend per type *per
  month*, in one line — and the `label` clause renames the machine-made column
  headings. The help page shows both; make one query's answer read like
  something you'd show a person.
- QUERY can question **another spreadsheet entirely**, through a function called
  IMPORTRANGE — its own page in the same help center, by name. Expect a
  permission step the first time two files meet, and expect one more surprise
  about how columns are addressed. Both are findable.
- Genuinely open: find one chart in the wild — news, an ad, a video, a game's
  stats screen — that misleads. Not "looks bad": misleads. What exactly does it
  make your eye compare, and what would the honest version look like? There is no
  answer key for this one.
- Genuinely open: QUERY can do everything ten SUMIFs do in one line — so why
  would anyone still use ten SUMIFs? There are real answers; using both for a few
  weeks is how they surface.

## Delivery notes

- **Merged from** the former `charting-the-collection` and `asking-in-query`
  cores. The arc is pictures of the data → a question grammar for the data;
  both halves are derived views, which is the merged What-just-happened's
  spine.
- **guided:** the charts half gets thin hints only (one or two rungs); the
  QUERY half holds level 3 discipline — goals and done-when criteria, no
  collapsed hints. The help page is the QUERY half's primary text; resist
  re-teaching its clauses in the lesson body. The read-the-surface step opens
  that half and the delivery should make its point explicit (seeing the size
  of the space).
- Never name specific chart-editor tab labels or button positions; describe
  intent ("tell the editor which range and which shape"). The editor UI is the
  most volatile surface in the module.
- Do not spoil the monster-bar's exact appearance; the learner observes and
  diagnoses from the fed range.
- The pie discussion must stay honest but unsneering — one plain sentence about
  angles and slice count, no data-circles in-jokes in learner text.
- SQL appears exactly once, in What just happened, per the module design note.
- Never print a complete working query for goals 6–9 in the delivery; clause
  names and the column maps are orientation, assembled queries are the work.
  The syntax examples in Facts (`where E = 'Fronted'`, `where E > 20`) surface
  only as quoting-rule illustrations in orientation, not as answers.
- Do not assert exact error wordings or the zero-based month fact; both are
  learner measurements by design.
