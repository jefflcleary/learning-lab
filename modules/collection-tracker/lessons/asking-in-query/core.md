# Asking in QUERY

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** asking-in-query
- **Module / Part:** Building a collection tracker — Part 3: Questions the data can answer
- **Scaffolding:** level 3 — third lesson of the query-language thread (criteria
  formulas → validated categories → QUERY); goals and success criteria only, no
  hint ladders. The QUERY function help page is the learner's primary text.
- **Deliveries:** guided only (module default)
- **Status:** ready

## Goal and payoff

Ask the tracker questions in QUERY — a one-line question language built into
Sheets — and verify every answer against a number reached by another road
(SUMIF/COUNTIF), which is how a new tool earns trust. The module's query-language
thread pays off here: criteria formulas were single questions; QUERY is a question
*grammar*, and it is the same select/where/group-by grammar professionals use
against databases every day. This is the one lesson where the word SQL lands in
learner text, once. Payoff: a questions tab where a typed sentence produces a
table as its answer — askable on demand, showable to anyone.

## Prerequisites

- A Collection tab of clean card rows — established by `lessons/first-ledger/`
- A Purchases tab recording every buy, its Type, and who paid — established by
  `lessons/every-pack-you-open/`
- Categories that match exactly, enforced by dropdowns — established by
  `lessons/keeping-data-clean/`
- Comfort with criteria formulas (SUMIF, COUNTIF) — established by
  `lessons/questions-your-data-can-answer/`

## Establishes

- The learner has read the entire clause surface of QUERY and written working
  queries using select, where, group by, and order by, each verified against an
  independently computed number
- Knows that QUERY's errors are readable and reads them fully
- Cited by other cores as: "you can ask the tracker questions in QUERY and verify
  the answers — established by `lessons/asking-in-query/`."

## Facts

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
- Documentation: the **QUERY function** help page in Google's Docs editors help
  center (support.google.com/docs — search "QUERY function"). It documents every
  clause with examples and links to the fuller query-language reference. This
  page is the lesson's primary text.
- IMPORTRANGE (go further only): its own function help page, same help center,
  "IMPORTRANGE" by name. First use against a new source file triggers a one-time
  permission prompt [volatile in detail — friction is discoverable, deliveries
  flag that it exists and no more]. When querying an imported range, column
  addressing changes form — deliberately left discoverable, the help page covers
  it.
- Experiments guard: named version before experiments — File → Version history →
  Name current version [volatile] — standing habit; QUERY writes nothing, but the
  scratch-tab suggestion keeps spills away from data regardless.

## Arc

### Orientation — given plainly

What QUERY is: a function whose second argument is a sentence in a small,
purpose-built question language — clauses like `select`, `where`, `group by`,
`order by`, combined in one line. That the help page documents every clause and
serves as the lesson's actual text. How columns are addressed (letters within the
queried range). Where answers land (spill; scratch tab suggested). What is *not*
given: the queries themselves — every goal below is a question the learner
translates into the language, checked against a number they can already compute.

### Predictions to elicit

- Before opening the help page: how many clauses does a question language need?
  A number.
- Take the question "every purchase someone else fronted, newest first" and
  underline each word that does work: which word filters, which word sorts, which
  words pick columns?
- What happens if a query names a column that isn't in the range it was given?

### The work — goals and success criteria (level 3: no hint ladders)

1. **Read the surface.** The QUERY function help page, top to bottom — not
   hunting for anything, just seeing the size of the language. Done when: every
   clause is listed in the logbook with a one-line guess at its job, and the
   clause-count prediction is checked.
2. **Cards worth more than $X, best first.** Learner picks X so the answer isn't
   empty. Done when: the query returns card name, set, and value, ordered most
   valuable first; the top row is the card they already know is their best; and a
   COUNTIF written beside the query agrees with the number of rows returned.
3. **Total spent per Type.** Done when: one query returns each purchase type and
   its total; each total agrees with a SUMIF for the same type (existing Stats
   numbers or fresh SUMIFs written next to the query — either road). Two roads,
   same truth: this is how a new tool earns trust.
4. **Purchases that were fronted, newest first.** "Fronted" = whatever exact
   value the learner's Paid-by dropdown uses. Done when: the query returns date,
   item, and cost, newest at the top; and the costs sum (a SUM around the query's
   cost column, or a SUMIF on Purchases) to the same total the payback ledger's
   Borrowed side implies.
5. **If you're brave: average pack cost per month.** Done when: a query groups
   pack purchases by month and averages their cost — and the learner has
   confirmed one month's average by hand (sum ÷ count for that month). Warning
   built into the goal, not a spoiler: check the month *labels* against a month
   you know; the language has a surprise there, and the check is how it's found.

### Break it on purpose — failures to cause, what each teaches, how to undo

All on the scratch tab; nothing here touches data.

- **Misspell a clause.** Take a working query and break one clause's spelling
  (`selct`, `order byy`). Read the entire error — hover or click for the full
  text. It says what the parser was trying to do and where it gave up. Teaches:
  QUERY's errors are written to be read, and reading the whole error is the
  debugging habit. Undo the spelling.
- **Ask for a column that isn't there.** Change a working query to reference a
  letter outside the queried range. Read the error completely — note that it
  names the thing it couldn't find. Undo.
- **Lie about types.** Two edits, one at a time: put quotes around a number
  (`where D > '20'`) and remove the quotes from a text value (`where E =
  Fronted`). Read both errors fully. Teaches: the language distinguishes numbers
  from text and says so when the query confuses them — quoted means text,
  unquoted means number or column name. Undo both.

### What just happened — the explanation

The learner just used a query language. The shape they've been writing —
select-columns, where-condition, group-by-category, order-by-value — is the
grammar of **SQL**, the language professionals use to question databases every
day; QUERY is the grown-up sibling's grammar borrowed into a spreadsheet. (Module
rule: the word SQL appears here, once, now that it names something the learner
has done.) One layer deeper on the thread: SUMIF asks one question and returns
one number; QUERY is a grammar — the same handful of clauses recombine into any
question, which is why learning four clauses beats learning forty functions. And
the clean-data contract pays again, compounding: `where E = 'Fronted'` returns
truth only because every fronted purchase says exactly `Fronted` — the dropdowns
built earlier are why a one-line question can be trusted at all.

### Go further — open questions

- The `pivot` clause turns a query's answer into a grid — spend per type *per
  month*, in one line. The help page shows it; what question of yours wants a
  grid?
- Query answers arrive with machine-made column headings. The `label` clause
  renames them. Make one query's answer read like something you'd show a person.
- QUERY can question **another spreadsheet entirely**, through a function called
  IMPORTRANGE — its own page in the same help center, by name. Expect a
  permission step the first time two files meet, and expect one more surprise
  about how columns are addressed. Both are findable.
- Genuinely open: QUERY can do everything ten SUMIFs do in one line — so why
  would anyone still use ten SUMIFs? There are real answers; using both for a few
  weeks is how they surface.

## Delivery notes

- **guided:** level 3 discipline — goals and done-when criteria, no collapsed
  hints. The help page is the primary text; resist re-teaching its clauses in
  the lesson body. The read-the-surface step comes first and the delivery should
  make its point explicit (seeing the size of the space).
- SQL appears exactly once, in What just happened, per the module design note.
- Never print a complete working query for goals 2–5 in the delivery; clause
  names and the column maps are orientation, assembled queries are the work.
  The syntax examples in Facts (`where E = 'Fronted'`, `where E > 20`) surface
  only as quoting-rule illustrations in orientation, not as answers.
- Do not assert exact error wordings or the zero-based month fact; both are
  learner measurements by design.
