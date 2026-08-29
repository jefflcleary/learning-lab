# Stats with SUMIF and keeping data clean

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** stats-and-clean-data
- **Module / Part:** collection-tracker — Part 3 — Questions the data can answer
- **Scaffolding:** level 2 — formula-writing is well established; the criteria
  family (SUMIF/COUNTIF/AVERAGEIF) is new, so the first SUMIF gets a full ladder
  including a worked comparison, then support drops off steeply for the
  siblings. Data validation is a feature to configure, not a formula to derive,
  so its orientation is generous and the withheld parts are the design
  decisions and the diagnosis moments.
- **Deliveries:** guided only (module-wide decision in MODULE.md)
- **Status:** ready

## Goal and payoff

One continuous arc: interrogate the data, get wounded by it, cure the wound.

First half: a new Stats tab where the questions come first and the functions
second — total spent, spent this month, spent on packs vs singles, total
fronted (closing the question left standing when the Purchases tab was built),
cards per set, average pack cost. The frame is **interrogation**: the learner
writes the questions down, then learns the one formula shape that answers
nearly all of them. The star is the criteria argument — a tiny filter language
living inside a function.

The half contains a **planned failure**: some Type or Set values won't match
(trailing spaces, plurals, misspellings) and counts come up short. This is
deliberate; it is diagnosed with the stuck-page method and fixed by hand — and
then named honestly as not being prevention, which pivots the lesson into its
second half.

Second half: prevention. Data validation dropdowns on the two category columns:
Type (Purchases) limited to the four official values, Set (Collection) fed from
a small Sets list the learner curates. Applying validation to existing columns
*finds* the old inconsistencies — cleanup as archaeology. Reject vs warn is
felt, not just described. The through-line, said plainly: consistent categories
are a **contract** between the data and the formulas, and deciding the allowed
values IS designing the data — data modeling wearing work clothes.

Payoff: a Stats tab of numbers nobody typed, whose check row agrees permanently
instead of by luck — and data entry that feels like an app: chips to pick from,
garbage refused at the door. Showable twice over: the answer to "how much have
you actually spent on all this?" computed live from every row, and handing
someone else the keyboard to record a purchase while the sheet steers them.

## Prerequisites

- A Purchases tab recording every buy, its cost, and who paid — established by
  `lessons/purchases-and-payback/` (cross-tab formulas — `Purchases!D2:D` —
  also established there)
- A Collection tab with cards, sets, costs, and values — established by
  `lessons/building-the-ledger/`

## Establishes

- A Stats tab of derived answers — SUMIF/COUNTIF/AVERAGEIF over Purchases and
  Collection, including a check row comparing the per-type totals against the
  overall total — established by `lessons/stats-and-clean-data/`
- Validated category columns: Type (Purchases) restricted to
  Pack / Box / Single / Supplies by a dropdown, Set (Collection) restricted to
  an official Sets list kept on the Stats tab — with rejection on, so category
  drift is stopped at typing time — established by
  `lessons/stats-and-clean-data/`
- The Sets list itself: the tracker's first piece of deliberately designed
  reference data (a range other machinery points at)
- The lived experience of an inconsistent category value making a stat quietly
  wrong, hunted down with a one-row test — and the knowledge that validation,
  not careful typing, is what keeps it from coming back

## Facts

### Stats and the criteria family

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
  - Fix at the diagnosis moment is by hand (retype the cell). Prevention is the
    second half of this same lesson — the pivot is internal, not a forward link.

### Data validation

- **Data validation** is the Sheets feature that restricts what a cell will
  accept. Lives in the **Data menu** → look for "Data validation" [volatile as
  of 2026-08: currently opens a side panel with an "Add rule" control; layout
  and wording shift over the years — deliveries describe the three decisions to
  find (which cells, what rule, what happens on failure) rather than
  pixel-hunting].
- Rule types used here [volatile in exact naming]:
  - **Dropdown** — allowed values typed directly into the rule. Used for Type:
    `Pack`, `Box`, `Single`, `Supplies`.
  - **Dropdown (from a range)** — allowed values read from cells. Used for Set,
    pointing at the Sets list.
- The failure behavior choice, usually under advanced/extra options [volatile]:
  **show a warning** (input accepted, cell flagged) vs **reject the input**
  (input refused with a message). Both get felt in this lesson; both columns
  end at reject.
- Applying a rule to a range that already has data: existing values that break
  the rule get visibly flagged (currently a red marker on the cell corner
  [volatile in exact appearance — deliveries say "Sheets marks the offending
  cells" and let the learner spot the marks]).
- Dropdown cells currently render as clickable chips [volatile]; chip colors
  are configurable in the rule's options (Go further).
- The Sets list: a column on the Stats tab, off to the right of the stats
  (suggested: a header `Sets` with one set name per row beneath). Each set name
  appears exactly once, spelled the way it will be spelled forever. Open-ended
  range when the rule points at it (e.g. the column from the first data row
  down), so new sets added to the list appear in the dropdown without touching
  the rule [verify — believed current behavior for from-a-range dropdowns as of
  2026-08: blank cells in the range are ignored rather than offered as an empty
  choice].
- Removing a rule: select the range, open Data validation, delete/remove the
  rule [volatile wording].
- The proof instrument: the Stats check row ("all types together" vs total
  ever spent) built in the first half — used before/after to show the disease
  and the cure.
- Docs pointer for New tools: Google's Docs editors help center — searching it
  for "data validation" finds the current instructions; no deep URLs.
- Named version before the lapse experiment: File → Version history [volatile
  wording] — standard pre-experiment move.

### Break-it facts

- Unquoted text criterion (`=SUMIF(Purchases!C2:C, Pack, Purchases!D2:D)`)
  fails: Sheets treats a bare word as the name of a range/function and errors
  (a #NAME?-family error) [verify exact error text; do not assert wording in
  delivery — have the learner read it].

## Arc

### Orientation — given plainly

The reframe, stated openly: so far formulas have computed cells (a gain, a
total, a balance). Today they answer questions about whole tables. The learner
writes their questions in the logbook first, as questions in plain words — the
functions are just how the questions get typed. The SUMIF family is introduced
plainly in New tools: what each does, the three-slot shape, where the help card
lives. The criteria argument is named as the star up front: one shape, endless
questions.

Data validation is also oriented up front (it is the second half's tool): a
rule attached to cells saying what they'll accept; dropdowns as its friendliest
face; reject vs warn as the two failure behaviors. Said openly: deciding the
list of allowed values is not busywork before the real task — it IS the real
task. Choosing what a column may contain is designing the data; the word for
people who do this for a living is data modeling, and this is it, wearing work
clothes.

One warning made in advance, because it shapes the whole session: somewhere
along the way a number will probably come out wrong, nothing will be broken,
and finding out why — then making sure it can never happen again — is the most
valuable thing that happens today.

Core-only note: criteria are predicates; this is the module's query-language
thread and the SQL foreshadow (`SUMIF` criteria ≈ WHERE). Learner text says
"add up only the rows where..." in plain English and never says SQL.

### Predictions to elicit

- Total ever spent: write the guess before the formula answers it.
- Which Type has eaten the most money — and by roughly how much over the second
  place?
- Will the four Type totals, added together, exactly equal the overall total?
  (This seeds the audit; whatever they answer, the check row settles it.)
- Where *should* a mistake announce itself: the moment it's typed, or the
  moment a stat reads it? What's the cost of each?
- Later this session a rule will check every value ever typed into the Type
  column: how many cells will turn out to break it? An actual number.
- Which columns of the tracker should never get a dropdown, and why?

### The work — goals and hint ladders

**First half — interrogation:**

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
   If they agree, hold that thought. If they don't, that's the hunt section
   below, and nothing is wrong with the formulas.
5. **Close an old question: how much was fronted?** The Purchases lesson left
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
     being typed. Cleaning is not prevention. Prevention is the rest of this
     session — the transition into the second half, made in place.

**Second half — prevention:**

10. **Decide the law.** Two lists, written in the logbook first. Type is already
    decided — Pack / Box / Single / Supplies, the four the module has used all
    along. Sets is the learner's own: every set they collect, each spelled the
    one way it will be spelled forever. The moment of care is the point: this
    list outlives any single row.
11. **Build the Sets list.** On the Stats tab, right of the stats with a gap: a
    `Sets` header, one set per row beneath it. Plainly given; this is the
    tracker's first piece of reference data — a range that exists so other
    machinery can point at it.
12. **Put Type under contract.** Select the Type column's data range on
    Purchases, open Data validation from the Data menu, add a rule: a dropdown
    with the four values, and set it to **reject** what doesn't match. The
    delivery names the three decisions (cells, rule, failure behavior) and lets
    the learner find the controls — the panel's layout shifts over the years,
    and finding controls by purpose is the durable skill. No hint ladder; this
    is configuration, and the help center covers it if the panel confuses.
13. **Archaeology.** The moment the rule lands, Sheets marks every existing cell
    that breaks it. Goal: find every marked cell in the Type column and repair
    it — click, pick the right chip from the dropdown. Each mark is a stat that
    was wrong or was going to be. Check the count against the logbook
    prediction, and check the Stats check row after: agreeing, and now not by
    luck.
14. **Put Set under contract — from the list.** Same move on Collection's Set
    column, but the rule reads its allowed values **from a range**: the Sets
    list. First pass: set it to **warn** instead of reject, on purpose, to feel
    the difference —
    - type a junk set name into a Set cell: it goes in, and the cell gets
      flagged. The mistake happened anyway; the sheet just muttered about it.
    - switch the rule to **reject**, try the same junk: refused at the door,
      with a message.
    - fix any junk, and repair whatever old Set inconsistencies the rule
      flagged, same as step 13.
    Withheld here (one nudge allowed): why from-a-range for sets but
    typed-into-the-rule for types? Answer to surface in What just happened: the
    Type list is closed and small; sets keep arriving — the list will grow, and
    a rule pointing at a range grows with it.
15. **The payoff demo.** Enter the next real purchase using only the chips —
    or better, hand the keyboard to someone else and let the sheet steer them.
    Data entry now behaves like an app, and that is showable.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Drop the quotes.** `=SUMIF(Purchases!C2:C, Pack, Purchases!D2:D)`. Read the
  whole error. Teaches: in a formula, a bare word is taken as the *name of
  something* — a range, a function; double quotes are what mark text-to-match.
  The error names the problem if read slowly. Undo: restore quotes.
- **A new set arrives.** A newly started set isn't in the Sets list. Try to
  type it straight into a validated Set cell: rejected — the contract doesn't
  know it yet, and the sheet can't tell a new truth from a typo. The right
  order: add the set to the Sets list first, then return to the cell — the
  dropdown now offers it. Name it gently afterward: those were two different
  kinds of act. Changing the list changed *the rules* — what's allowed to
  exist. Picking from the dropdown recorded *a fact*. Real systems keep rule
  changes and fact entry separate on purpose, and the mild friction of "add it
  to the list first" is that separation, felt.
- **Let the contract lapse.** Name a version first (File → Version history —
  the standard move). Select the Type column, open Data validation, and remove
  the rule. Type `Packs` into one row's Type. No mark, no complaint — and the
  Stats tab: pack total short, check row disagreeing, silently, *again*. The
  disease from the hunt came straight back the moment the contract lapsed.
  Undo the damage: fix the cell, re-add the rule (or restore the named
  version). Teaches: validation isn't a one-time cleanup, it's a standing
  guard, and the formulas were never protecting themselves — only trusting.

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
the formulas trust the categories. "Garbage in, garbage out" — usually said as
a shrug, actually a mechanism, and the learner has now watched every gear of
it: every `SUMIF` trusts the category columns completely; a value that matches
nothing isn't an error, it's silently left out; so garbage goes in at typing
time and comes out at reading time as a confident wrong number, with silence in
between.

What validation changes is not whether mistakes happen — it's **when and how
loudly**. Without it, the error is silent at write time and silent at read
time. With it, the error is loud at write time — refused at the door, in front
of the person who knows the truth and can fix it in two seconds. Moving
failure from silent-and-late to loud-and-early is the whole game, and not just
in spreadsheets: it's why every app and website the learner has ever used puts
dropdowns on anything it can. Ten thousand dropdowns later, the learner now
knows what they were all *for*.

The deeper name: the columns now have a contract, and deciding its terms —
what values may exist — was designing the data. Type's four values were typed
into the rule because that list is closed; Sets points at a range because that
list grows, and the design anticipated its own future. That anticipation is
the craft.

### Go further — open questions

- Invent one stat of your own — a question about your collection nobody assigned
  — build it, and write in the logbook why it's worth knowing. A stat you can
  defend beats ten you copied.
- `MAXIFS` and `MINIFS` exist — same family, different verbs. Find them in the
  function list and answer: what was the single most expensive purchase — and
  the cheapest pack that ever paid off?
- Genuinely open: after everything this lesson taught, the Notes column on
  Purchases is free text — and that's correct. When is free text the *right*
  choice? What gets lost when a column is validated, and how would you decide,
  for a brand-new column, which side of the line it belongs on?
- Genuinely open: what question about your collection can the data *not* answer,
  no matter how many formulas you write — and is that a missing column, or is it
  something no column could hold?

## Delivery notes

- **Merged from** the former `questions-your-data-can-answer` and
  `keeping-data-clean` cores. That pair was designed as wound-then-cure;
  merged, the failure and the fix are one continuous arc: diagnose the
  mismatch, fix it by hand, then install validation so it can't return. The
  old forward link between them is now an internal transition at the end of
  the hunt.
- **guided:** the interrogation frame carries the first half — questions in the
  learner's words first, functions second; do not let it become a function
  catalog. The second half's risk is preachiness — "always validate your data"
  energy. It stays concrete: the wound is minutes old, the fix is felt via the
  check row, the contract framing is stated once and plainly.
- The planned failure must not be pre-announced as planned. The check row is
  presented straight ("two claims about the same fact"), and the hunt section
  handles both the natural failure and the clean-data case honestly.
- [verify] flags in Facts: (1) case-insensitivity of SUMIF/COUNTIF criteria in
  Google Sheets — failure examples were chosen assuming case does NOT break
  matching; (2) exact wording of the unquoted-criterion error — delivery has
  the learner read it rather than asserting it; (3) from-a-range dropdowns
  ignoring blank cells in an open-ended range (believed correct as of 2026-08)
  — if wrong, the Sets-list range guidance should bound the range instead.
- Cut in the merge, for the break-it budget and length: the mismatched-range
  SUMIF break-it (open criteria range, cut-short sum range) and the
  date-validation Go further item from the source cores. Both can return in a
  future revision if the lesson gains room.
- "Spent this month" uses `&`+`DATE(...)` only; typed date strings in criteria
  are locale-dependent and must not appear in the delivery.
- UI phrasing must survive redesigns: name menus and purposes ("the three
  decisions: which cells, what rule, what happens on failure"), never panel
  geometry. All current-UI specifics are [volatile] in Facts.
- The reject-vs-warn sequence in step 14 is deliberately experiential (warn
  first, then reject); don't compress it into a description.
- The schema-change vs data-entry naming stays gentle — one paragraph after
  the friction, no terminology beyond "changing the rules" vs "recording a
  fact."
