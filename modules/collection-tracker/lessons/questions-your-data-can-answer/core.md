# Questions your data can answer

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** questions-your-data-can-answer
- **Module / Part:** collection-tracker — Part 3 — Questions the data can answer
- **Scaffolding:** level 2 — formula-writing is well established; the criteria
  family (SUMIF/COUNTIF/AVERAGEIF) is new, so the first SUMIF gets a full ladder
  including a worked comparison, then support drops off steeply for the siblings
- **Deliveries:** guided only (module-wide decision in MODULE.md)
- **Status:** ready

## Goal and payoff

A new Stats tab where the questions come first and the functions second: total
spent, spent this month, spent on packs vs singles, total fronted (closing the
question left standing in `every-pack-you-open`), cards per set, average pack
cost. The frame for the whole lesson is **interrogation**: the learner writes the
questions down, then learns the one formula shape that answers nearly all of them.
The star is the criteria argument — a tiny filter language living inside a
function.

The lesson also contains a **planned failure**: some Type or Set values won't
match (trailing spaces, plurals, misspellings) and counts come up short. This is
deliberate; it is diagnosed with the stuck-page method, fixed by hand, and named
as the wound the next lesson heals.

Payoff: a Stats tab of numbers nobody typed — show someone the answer to "how
much have you actually spent on all this?" computed live from every row.

## Prerequisites

- A Purchases tab recording every buy, its cost, and who paid — established by
  `lessons/every-pack-you-open/` (cross-tab formulas — `Purchases!D2:D` — also
  established there)
- A Collection tab with cards, sets, costs, and values — established by
  `lessons/first-ledger/`

## Establishes

- A Stats tab of derived answers — SUMIF/COUNTIF/AVERAGEIF over Purchases and
  Collection, including a check row comparing the per-type totals against the
  overall total — and the lived experience of inconsistent category values making
  stats quietly wrong — established by
  `lessons/questions-your-data-can-answer/`

## Facts

- Stats tab layout suggestion: questions/labels in column A, answers (formulas)
  in column B, starting row 2 with headers in row 1 (`Question | Answer`). Exact
  layout is the learner's; formulas name tabs absolutely so layout doesn't matter.
- Open-ended ranges: `Purchases!D2:D` means column D from row 2 to the bottom,
  with no fixed end — new rows are included automatically. Define at first use
  even if seen before.
- The function family:
  - `SUMIF(range, criterion, sum_range)` — add up sum_range where range matches.
  - `COUNTIF(range, criterion)` — count matching cells; no third argument, since
    counting needs no numbers column.
  - `AVERAGEIF(range, criterion, average_range)` — same shape as SUMIF, averages.
- Criteria facts:
  - Text criteria match whole cell contents and are written in double quotes:
    `"Pack"`.
  - Matching is case-insensitive in Google Sheets ("pack" matches "Pack")
    [verify — relied on for choosing failure examples; as of 2026-08 believed
    correct]. Consequence: case differences are NOT usable as the planned
    failure; use trailing spaces, plurals ("Packs"), and misspellings, which do
    fail to match.
  - Comparison criteria are text: `">=10"`, and for dates the robust form glues
    text to a real date with `&`: `">="&DATE(2026,8,1)`. `DATE(year, month, day)`
    builds a date value; `&` concatenates. Typed date strings inside criteria are
    locale-dependent [volatile] — deliveries teach the `&`+`DATE` form only.
- The stat set (formulas as built in the delivery; learner types their own month):
  - Total ever spent: `=SUM(Purchases!D2:D)`
  - Spent on each type: `=SUMIF(Purchases!C2:C, "Pack", Purchases!D2:D)` and
    siblings for Box / Single / Supplies
  - All types together (the check row): sum of the four type cells; must equal
    total ever spent
  - Total fronted: `=SUMIF(Purchases!E2:E, "Fronted", Purchases!D2:D)`
  - Spent this month: `=SUMIF(Purchases!A2:A, ">="&DATE(2026,8,1), Purchases!D2:D)`
    (assumes no future-dated rows; that assumption is stated to the learner)
  - Cards from each set: `=COUNTIF(Collection!B2:B, "Base Set")` per set
  - Average pack cost: `=AVERAGEIF(Purchases!C2:C, "Pack", Purchases!D2:D)`
- In-sheet formula help: typing `=SUMIF(` shows the function's help card with
  argument names [volatile in exact presentation]. Full catalog: the "Google
  Sheets function list" page in Google's Docs editors help center — point by
  name, no deep URLs.
- Planned-failure diagnosis facts:
  - Smallest possible test: in a scratch cell, `=Purchases!C7="Pack"` returns
    TRUE or FALSE for one single row — a comparison is itself a formula.
  - Trailing spaces are invisible when viewing but visible when editing the cell
    (cursor parks past the last character; End key shows it).
  - Fix in this lesson is by hand (retype the cell). Prevention is the next
    lesson — `keeping-data-clean`, same release, forward link by title.
- Break-it facts:
  - Unquoted text criterion (`=SUMIF(Purchases!C2:C, Pack, Purchases!D2:D)`)
    fails: Sheets treats a bare word as the name of a range/function and errors
    (a #NAME?-family error) [verify exact error text; do not assert wording in
    delivery — have the learner read it].
  - Mismatched range lengths in SUMIF (criteria range open-ended, sum range cut
    short, e.g. `Purchases!D2:D10`): behavior may be a silent resize of the sum
    range to match the criteria range rather than an error [verify — as of
    2026-08 Sheets is believed to resize silently, matching Excel]. Delivery is
    written observationally: cause it, observe, and draw the lesson (ranges must
    line up row for row) whichever way Sheets behaves.

## Arc

### Orientation — given plainly

The reframe, stated openly: so far formulas have computed cells (a gain, a total,
a balance). Today they answer questions about whole tables. The learner writes
their questions in the logbook first, as questions in plain words — the functions
are just how the questions get typed. The SUMIF family is introduced plainly in
New tools: what each does, the three-slot shape, where the help card lives. The
criteria argument is named as the star up front: one shape, endless questions.

Core-only note: criteria are predicates; this is the module's query-language
thread and the SQL foreshadow (`SUMIF` criteria ≈ WHERE). Learner text says "add
up only the rows where..." in plain English and never says SQL.

### Predictions to elicit

- Total ever spent: write the guess before the formula answers it.
- Which Type has eaten the most money — and by roughly how much over the second
  place?
- Will the four Type totals, added together, exactly equal the overall total?
  (This seeds the audit; whatever they answer, the check row settles it.)
- How many cards from your biggest set?

### The work — goals and hint ladders

1. **Write the questions first.** In the logbook: at least the six standard
   questions, plus any of the learner's own. Then make the Stats tab: labels in
   A, answers in B.
2. **The warm-up: total ever spent.** `SUM` over the Purchases cost column —
   known move, cross-tab reference known. Given nearly plainly (level 2): the
   goal and the reminder that open-ended ranges include future rows. No ladder.
3. **First interrogation: how much has gone into packs?** The first SUMIF.
   - Rung 1: the function needs three questions answered, in order: where to
     look, what to match, what to add up. Say the answer in plain words first —
     "look at the Type column, match Pack, add up the Cost column" — then find
     which slot is which as you type it.
   - Rung 2: the shape is `=SUMIF(look-range, "match", add-range)`. The match is
     text, so it goes in double quotes. The two ranges live on the Purchases tab
     and you already know how to name a column there.
   - Rung 3 (completion problem):
     `=SUMIF(Purchases!__2:__, "____", Purchases!__2:__)` — column letters and
     the matched word are the blanks.
   - Rung 4 (worked comparison, first-of-a-new-skill):
     `=SUMIF(Purchases!C2:C, "Pack", Purchases!D2:D)` — compare after yours
     works, or if it won't and the staring is done.
4. **The rest of the family — no more ladders.** Box, Single, Supplies: three
   more rows, same shape, one word changes. Then the **check row**: "all types
   together" — sum of those four answer cells, placed next to total ever spent.
   State plainly: these two numbers claim to be the same fact computed two ways.
   If they agree, hold that thought. If they don't, that's the section below,
   and nothing is wrong with the formulas.
5. **Close an old question: how much was fronted?** `every-pack-you-open` left
   this standing: SUM could total everything, but not *only the fronted rows*.
   Say so. Goal only, no hints beyond: which column does the looking move to?
6. **Count the collection: cards per set.** COUNTIF on Collection's Set column,
   one row per set. Note the missing third argument and why (counting needs no
   numbers). Optional extra check: `COUNTA` over the Card column vs the set
   counts added up.
7. **Average pack cost.** AVERAGEIF, same three slots as SUMIF. Goal only.
8. **The stretch: spent this month.** The first criteria that isn't an exact
   match.
   - Rung 1: every criterion so far matched exactly. "On or after the 1st" is a
     comparison, and the criteria slot can hold one.
   - Rung 2: comparisons are written as text — `">="` — but a date typed inside
     text is ambiguous. `DATE(year, month, day)` builds a real date, and `&`
     glues text and values into one criterion.
   - Rung 3: the criterion is `">="&DATE(2026,8,1)` — with the learner's own
     year and month. (Works because no purchase is dated in the future; if the
     learner has future-dated rows, that assumption is theirs to notice.)

9. **The hunt (planned failure).** Entered when the check row disagrees, or a
   set count is short, or the fronted total looks low. Do not pre-announce which
   stat will be wrong — but the lesson must handle both outcomes:
   - If something is short: this is the real thing. Method per the stuck page:
     make it fail on demand, then shrink. Smallest test: pick one row believed
     to be a Pack and put `=Purchases!C7="Pack"` (their row) in a scratch cell —
     TRUE or FALSE for exactly one row. On FALSE with identical-looking text:
     edit the cell and look for the cursor parking beyond the last letter
     (trailing space), or a plural, or a misspelling. Fix by hand: retype.
     Delete scratch cells after.
   - If every number checks out: say plainly their typing has been unusually
     consistent, then borrow the failure anyway — change one row's `Pack` to
     `Packs`, watch two stats move (the Pack total drops, the check row
     disagrees), run the same smallest-test diagnosis, fix it back.
   - Then NAME the wound, verbatim spirit: every mismatch just fixed by hand can
     come back tomorrow, because nothing stops the next inconsistent value from
     being typed. Cleaning is not prevention. Prevention is the next session:
     forward link to `../keeping-data-clean/guided.md` by title ("Keeping the
     data clean").

### Break it on purpose — failures to cause, what each teaches, how to undo

On a working SUMIF (name a version first if nervous; these two are freely
undoable):

- **Drop the quotes.** `=SUMIF(Purchases!C2:C, Pack, Purchases!D2:D)`. Read the
  whole error. Teaches: in a formula, a bare word is taken as the *name of
  something* — a range, a function; double quotes are what mark text-to-match.
  The error names the problem if read slowly. Undo: restore quotes.
- **Ranges that don't line up.** Take a working type SUMIF and cut the sum range
  short: `Purchases!D2:D10` while the criteria range stays open-ended. Observe
  what Sheets does — do not assert the outcome [verify note in Facts]: it may
  error, or it may quietly compute from cells that weren't named. Either
  outcome teaches the same rule: the two ranges are read *row for row*, matched
  by position, and must line up. Undo: restore the open range.

### What just happened — the explanation

The leap, named: formulas stopped computing cells and started answering
questions about tables. The criteria argument is a tiny language — exact match
(`"Pack"`), comparison (`">="&DATE(...)`) — riding inside a function, and the
same shape answered six different questions today. Say plainly: "add up the rows
where..." is one of the most useful sentences in computing, and the learner can
now type it. (Core note: this is the SQL WHERE foreshadow; QUERY makes it
explicit later in the module. Learner text does not say SQL.)

The Stats tab is the tracker's first **derived view**: a tab where every number
is computed and none is typed. Add a purchase tomorrow and the stats move by
themselves. And the whole thing rests on a quiet assumption the hunt exposed:
the formulas trust the categories. `SUMIF` never complains about a value that
matches nothing — it just leaves it out, silently. The stats stay right exactly
as long as the categories stay honest, which is the door the next lesson walks
through.

### Go further — open questions

- Invent one stat of your own — a question about your collection nobody assigned
  — build it, and write in the logbook why it's worth knowing. A stat you can
  defend beats ten you copied.
- `MAXIFS` and `MINIFS` exist — same family, different verbs. Find them in the
  function list and answer: what was the single most expensive purchase — and
  the cheapest pack that ever paid off?
- Genuinely open: what question about your collection can the data *not* answer,
  no matter how many formulas you write — and is that a missing column, or is it
  something no column could hold?

## Delivery notes

- **guided:** the interrogation frame carries the lesson — questions in the
  learner's words first, functions second. Do not let it become a function
  catalog.
- The planned failure must not be pre-announced as planned. The check row is
  presented straight ("two claims about the same fact"), and the hunt section
  handles both the natural failure and the clean-data case honestly.
- [verify] flags in Facts: (1) case-insensitivity of SUMIF/COUNTIF criteria in
  Google Sheets — failure examples were chosen assuming case does NOT break
  matching; (2) exact behavior of SUMIF with mismatched range lengths (believed
  silent resize) — the break-it is written observationally so either behavior
  teaches; (3) exact wording of the unquoted-criterion error — delivery has the
  learner read it rather than asserting it.
- "Spent this month" uses `&`+`DATE(...)` only; typed date strings in criteria
  are locale-dependent and must not appear in the delivery.
- Forward link to `keeping-data-clean` is sanctioned (same release) — by title,
  at the wound-naming moment only.
