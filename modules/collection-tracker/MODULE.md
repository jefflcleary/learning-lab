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

### Part 1 — The ledger

Milestone: the tracker answers "what's it worth?" and "what have I spent?" and
people ask to see it.

| Lesson | Goal | Status |
|---|---|---|
| `first-ledger` | One sheet of the good cards; first formulas; a live total | core + guided written |
| `making-it-readable` | Currency, frozen headers, green/red conditional format, sorting | core + guided written |
| `every-pack-you-open` | Purchases tab: every buy, cost, and who paid; cross-tab totals | core + guided written |

### Part 2 — Money owed

Milestone: a payback balance both sides trust, watched down to zero.

| Lesson | Goal | Status |
|---|---|---|
| `the-payback-ledger` | Borrowed amounts, payments, running balance; debt concepts lived | core + guided written |

### Part 3 — Questions the data can answer

Milestone: a dashboard worth showing around.

| Lesson | Goal | Status |
|---|---|---|
| `questions-your-data-can-answer` | SUMIF/COUNTIF stats: spend by month, value by set, best pulls | core + guided written |
| `keeping-data-clean` | Validation dropdowns; why categories must match (felt first) | core + guided written |
| `charting-the-collection` | Spend and value as charts on the dashboard | core + guided written |
| `asking-in-query` | The QUERY function: select/where/group-by in one line | core + guided written |

### Part 4 — Time and flow

Milestone: the growth curve exists, and logging takes ten seconds from a phone.

| Lesson | Goal | Status |
|---|---|---|
| `price-snapshots` | Manual value snapshots; the value-over-time chart; the tedium noted | core + guided written |
| `log-it-from-your-phone` | A Google Form feeding the purchases data | core + guided written |

### Part 5 — The honest numbers

Milestone: buying and selling decisions made from data.

| Lesson | Goal | Status |
|---|---|---|
| `packs-or-singles` | Expected value of a pack from own pull history vs buying singles | core + guided written |
| `the-cost-of-selling` | Sales ledger: fees, shipping, materials; real profit; paper vs realized value | core + guided written |

### Part 6 — It runs itself

Milestone: the tracker does chores without a human.

| Lesson | Goal | Status |
|---|---|---|
| `first-script` | Apps Script: a custom menu that takes a snapshot on click | core + guided written |
| `on-a-schedule` | Time-driven trigger: weekly auto-snapshot and an emailed report | core + guided written |

### Part 7 — The outside world

Milestone: found out what's currently possible — whichever way it goes.

| Lesson | Goal | Status |
|---|---|---|
| `fetching-real-prices` | Exploration: can market prices flow in automatically? UrlFetchApp; the pricing-data ecosystem as found | core + guided written |

### Part 8 — Open

The learner's own extension. No lesson file; deliberately no card. (Candidates
they may invent: grading tracking, want-lists, trade ledgers, a shared family
dashboard.)

## Design notes

- The snapshot chore in Part 4 is deliberately manual so Part 6's automation is
  felt as relief, not decoration — same pattern as any earn-the-tool arc.
- `questions-your-data-can-answer` deliberately hits the inconsistent-category
  failure so `keeping-data-clean` lands as the cure.
- Criteria arguments (SUMIF) and QUERY are this module's query-language thread;
  cores may note the SQL foreshadow, learner text never says SQL until QUERY
  makes it real.
- Deliveries: guided only throughout (nothing setup-heavy enough to earn a
  reference delivery; revisit if account setup proves painful).
