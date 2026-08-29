# Module design — Building a collection tracker

Teaches spreadsheets — and through them data design, analysis, personal finance,
and eventually automation with real code — by building a trading-card collection
tracker in Google Sheets. The use case carries the motivation: the learner's own
cards, own money, own questions. General method and format rules live in
`authoring/PRINCIPLES.md`; this file binds only this module.

## Module-specific constraints

- **Google Sheets, in the browser.** Not Excel (concepts transfer; instructions
  don't need to fork). Platform dimension is moot — any OS with a browser. Menu
  locations and UI labels shift over time [volatile]: deliveries name menus
  plainly but never pixel-hunt, and lean on the learner finding controls by name.
- **Framing: trading cards generally, Pokémon freely in examples.** The material
  works read cold for any collector; no assumed fandom, learner, or household.
  The debt thread says "whoever fronted the money," never assumes parents.
- **Real data from day one.** The tracker tracks the learner's actual collection
  and purchases. A collection the learner cares about is a condition of the world.
- **The expendable surface is a copy.** File → Make a copy, and named versions
  (File → Version history) before experiments. Destructive exercises happen on
  copies; version history is this module's undo-of-last-resort and gets taught as
  such.
- **Nothing added until it's needed.** No add-ons, no extensions, no Apps Script
  until a lesson's pain demands it — the just-in-time rule, spreadsheet edition.
- **Apps Script is JavaScript.** When code arrives, it's typed by hand like all
  subject matter. This module assumes no prior programming and stands alone.
- **The external-data part is exploration by design** (see PRINCIPLES
  "Exploration lessons"): what price sources currently exist, what they permit,
  and whether live prices can flow in at all is unknown territory — including to
  the authors. The lessons there equip the finding-out, not a guaranteed
  integration.

## Parts

### Part 1 — The ledger and the money

Milestone: the tracker answers "what's it worth?", "what have I spent?", and "what
do I owe?" — and people ask to see it.

| Lesson | Goal | Status |
|---|---|---|
| `building-the-ledger` | Collection tab, first formulas, live recalculation; currency, conditional format, safe sorting | merged from first-ledger + making-it-readable |
| `purchases-and-payback` | Purchases with who-paid; the payback ledger's running balance both sides trust | merged from every-pack-you-open + the-payback-ledger |

### Part 2 — Questions the data can answer

Milestone: a dashboard worth showing around.

| Lesson | Goal | Status |
|---|---|---|
| `stats-and-clean-data` | SUMIF/COUNTIF stats; the category-mismatch wound and the validation cure, one arc | merged from questions-your-data-can-answer + keeping-data-clean |
| `charts-and-query` | Charts as derived views; QUERY as a question grammar; SQL named at last | merged from charting-the-collection + asking-in-query |

### Part 3 — A tracker that stays alive

Milestone: the growth curve exists, and logging takes ten seconds from a phone.

| Lesson | Goal | Status |
|---|---|---|
| `snapshots-and-logging` | Manual value snapshots (tedium by design) + a Google Form for phone logging | merged from price-snapshots + log-it-from-your-phone |

### Part 4 — The honest numbers

Milestone: buying and selling decisions made from data.

| Lesson | Goal | Status |
|---|---|---|
| `pack-value-and-selling` | Expected value from own pulls; sales ledger with fees/shipping/materials; paper vs realized | merged from packs-or-singles + the-cost-of-selling |

### Part 5 — It runs itself

Milestone: the tracker does chores without a human.

| Lesson | Goal | Status |
|---|---|---|
| `apps-script-automation` | snapshotToday() behind a menu; time-driven trigger; the duplicate guard; weekly email | merged from first-script + on-a-schedule |

### Part 6 — The outside world

Milestone: found out what's currently possible — whichever way it goes.

| Lesson | Goal | Status |
|---|---|---|
| `fetching-real-prices` | Exploration: can market prices flow in automatically? UrlFetchApp; the pricing-data ecosystem as found | core + guided written |

### Part 7 — Open

The learner's own extension. No lesson file; deliberately no card. (Candidates
they may invent: grading tracking, want-lists, trade ledgers, a shared family
dashboard.)

## Design notes

- The snapshot chore in `snapshots-and-logging` is deliberately manual so
  `apps-script-automation` is felt as relief, not decoration — same pattern as any
  earn-the-tool arc.
- `stats-and-clean-data` deliberately hits the inconsistent-category failure in
  its first half so the validation half lands as the cure — the wound-then-cure
  pair is now one continuous arc inside one lesson.
- Criteria arguments (SUMIF) and QUERY are this module's query-language thread;
  cores may note the SQL foreshadow, learner text never says SQL until QUERY
  makes it real.
- Deliveries: guided only throughout (nothing setup-heavy enough to earn a
  reference delivery; revisit if account setup proves painful).
