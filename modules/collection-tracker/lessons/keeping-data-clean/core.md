# Keeping the data clean

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** keeping-data-clean
- **Module / Part:** collection-tracker — Part 3 — Questions the data can answer
- **Scaffolding:** level 2 — second lesson of the categories/consistency thread
  (the pain was lived in `questions-your-data-can-answer`); data validation is a
  feature to configure, not a formula to derive, so orientation is generous and
  the withheld parts are the design decisions and the diagnosis moments
- **Deliveries:** guided only (module-wide decision in MODULE.md)
- **Status:** ready

## Goal and payoff

Data validation dropdowns on the two category columns: Type (Purchases) limited
to the four official values, Set (Collection) fed from a small Sets list the
learner curates. Applying validation to existing columns *finds* the old
inconsistencies — cleanup as archaeology. Reject vs warn is felt, not just
described. The through-line, said plainly: consistent categories are a
**contract** between the data and the formulas, and deciding the allowed values
IS designing the data — this is data modeling wearing work clothes.

Payoff: data entry now feels like an app — chips to pick from, garbage refused
at the door — and the Stats check row agrees permanently instead of by luck.
Showable: let someone else record a purchase and watch the sheet steer them.

## Prerequisites

- A Stats tab whose numbers have been wrong at least once because a category
  value didn't match — established by `lessons/questions-your-data-can-answer/`
  (the check row from that lesson is the proof instrument here)
- A Purchases tab with a Type column and a Collection tab with a Set column —
  established by `lessons/every-pack-you-open/` and `lessons/first-ledger/`

## Establishes

- Validated category columns: Type (Purchases) restricted to
  Pack / Box / Single / Supplies by a dropdown, Set (Collection) restricted to
  an official Sets list kept on the Stats tab — with rejection on, so category
  drift is stopped at typing time — established by `lessons/keeping-data-clean/`
- The Sets list itself: the tracker's first piece of deliberately designed
  reference data (a range other machinery points at)

## Facts

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
  ever spent) from `questions-your-data-can-answer` — used before/after to show
  the disease and the cure.
- Docs pointer for New tools: Google's Docs editors help center — searching it
  for "data validation" finds the current instructions; no deep URLs.
- Named version before the lapse experiment: File → Version history [volatile
  wording] — standard pre-experiment move.

## Arc

### Orientation — given plainly

Recap the wound honestly: last session a category value with a typo made a stat
quietly wrong, it got fixed by hand, and hand-fixing was named as not being
prevention. Today is prevention. Data validation explained plainly: a rule
attached to cells saying what they'll accept; dropdowns as its friendliest
face; reject vs warn as the two failure behaviors. Said openly and early:
deciding the list of allowed values is not busywork before the real task — it
IS the real task. Choosing what a column may contain is designing the data;
the word for people who do this for a living is data modeling, and this is it,
wearing work clothes.

### Predictions to elicit

- When validation lands on the existing Type column: how many cells will turn
  out to break the rule? An actual number.
- Where *should* a mistake announce itself: the moment it's typed, or the
  moment a stat reads it? What's the cost of each?
- Which columns of the tracker should never get a dropdown, and why?

### The work — goals and hint ladders

1. **Decide the law.** Two lists, written in the logbook first. Type is already
   decided — Pack / Box / Single / Supplies, the four the module has used all
   along. Sets is the learner's own: every set they collect, each spelled the
   one way it will be spelled forever. The moment of care is the point: this
   list outlives any single row.
2. **Build the Sets list.** On the Stats tab, right of the stats with a gap: a
   `Sets` header, one set per row beneath it. Plainly given; this is the
   tracker's first piece of reference data — a range that exists so other
   machinery can point at it.
3. **Put Type under contract.** Select the Type column's data range on
   Purchases, open Data validation from the Data menu, add a rule: a dropdown
   with the four values, and set it to **reject** what doesn't match. The
   delivery names the three decisions (cells, rule, failure behavior) and lets
   the learner find the controls — the panel's layout shifts over the years,
   and finding controls by purpose is the durable skill. No hint ladder; this
   is configuration, and the help center covers it if the panel confuses.
4. **Archaeology.** The moment the rule lands, Sheets marks every existing cell
   that breaks it. Goal: find every marked cell in the Type column and repair
   it — click, pick the right chip from the dropdown. Each mark is a stat that
   was wrong or was going to be. Check the Stats check row after: agreeing,
   and now not by luck.
5. **Put Set under contract — from the list.** Same move on Collection's Set
   column, but the rule reads its allowed values **from a range**: the Sets
   list. First pass: set it to **warn** instead of reject, on purpose, to feel
   the difference —
   - type a junk set name into a Set cell: it goes in, and the cell gets
     flagged. The mistake happened anyway; the sheet just muttered about it.
   - switch the rule to **reject**, try the same junk: refused at the door,
     with a message.
   - fix any junk, and repair whatever old Set inconsistencies the rule
     flagged, same as step 4.
   Withheld here (one nudge allowed): why from-a-range for sets but
   typed-into-the-rule for types? Answer to surface in What just happened: the
   Type list is closed and small; sets keep arriving — the list will grow, and
   a rule pointing at a range grows with it.
6. **The payoff demo.** Enter the next real purchase using only the chips —
   or better, hand the keyboard to someone else and let the sheet steer them.
   Data entry now behaves like an app, and that is showable.

### Break it on purpose — failures to cause, what each teaches, how to undo

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
  disease from last session came straight back the moment the contract lapsed.
  Undo the damage: fix the cell, re-add the rule (or restore the named
  version). Teaches: validation isn't a one-time cleanup, it's a standing
  guard, and the formulas were never protecting themselves — only trusting.

### What just happened — the explanation

"Garbage in, garbage out" — usually said as a shrug, actually a mechanism, and
the learner has now watched every gear of it: every `SUMIF` on the Stats tab
trusts the category columns completely; a value that matches nothing isn't an
error, it's silently left out; so garbage goes in at typing time and comes out
at reading time as a confident wrong number, with silence in between.

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

- The dropdown chips can be colored — find the option in the validation rule.
  Colored types make the Purchases tab readable from across a room; decide if
  that's signal or decoration.
- Dates can be validated too: a rule that a cell must be a valid date. Should
  the tracker also refuse dates in the *future*? Whichever way you decide,
  make the rule match your answer — and notice you just wrote another clause
  of the contract.
- Genuinely open: after everything this lesson taught, the Notes column on
  Purchases is free text — and that's correct. When is free text the *right*
  choice? What gets lost when a column is validated, and how would you decide,
  for a brand-new column, which side of the line it belongs on?

## Delivery notes

- **guided:** the risk is preachiness — "always validate your data" energy. The
  lesson stays concrete: the wound is recent and personal, the fix is felt via
  the check row, the contract framing is stated once and plainly.
- UI phrasing must survive redesigns: name menus and purposes ("the three
  decisions: which cells, what rule, what happens on failure"), never panel
  geometry. All current-UI specifics are [volatile] in Facts.
- [verify] flag in Facts: from-a-range dropdowns ignoring blank cells in an
  open-ended range (believed correct as of 2026-08) — if wrong, the Sets-list
  range guidance should bound the range instead.
- The reject-vs-warn sequence in step 5 is deliberately experiential (warn
  first, then reject); don't compress it into a description.
- The schema-change vs data-entry naming stays gentle — one paragraph after
  the friction, no terminology beyond "changing the rules" vs "recording a
  fact."
