# On a schedule

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** on-a-schedule
- **Module / Part:** Building a collection tracker — Part 6 — It runs itself
- **Scaffolding:** level 2 — second programming lesson in this module. Goals plus
  hints; concepts named but not applied; hint ladders stop at rung 3. One
  completion problem allowed for the guard's `if` (first branch ever — a
  syntax-heavy moment per PRINCIPLES).
- **Deliveries:** guided only (module-wide decision in MODULE.md)
- **Status:** ready

## Goal and payoff

Remove the last human dependency from the snapshot: remembering. A time-driven
trigger runs `snapshotToday()` weekly with nobody present; the learner learns to
*verify* unattended runs (the Snapshots tab plus the executions log), builds the
duplicate guard the previous lesson earned (their first `if`), and writes a second
function that emails a weekly collection report. Payoff: the tracker acts alone —
a row appears while nobody is watching, and a report lands in an inbox every week;
optionally, whoever fronted money gets the payback balance ambiently, weekly,
without being asked for it.

The lesson under the lesson: the trigger–log–guard triangle — schedule it, verify
it ran, make it safe to re-run — which is the shape of every unattended system.

## Prerequisites

- A working snapshot script behind a custom menu (`snapshotToday()` and the
  Tracker menu) — established by `lessons/first-script/`
- A Snapshots tab feeding a value-over-time chart — established by
  `lessons/price-snapshots/`
- A Stats tab with the totals in known cells — established by
  `lessons/questions-your-data-can-answer/`
- (Optional thread) A payback balance on its own tab — established by
  `lessons/the-payback-ledger/` — used only if the learner opts into the shared
  report

## Establishes

- A weekly time-driven trigger runs `snapshotToday()` unattended
- `snapshotToday()` is guarded: if Snapshots already has a row for today, it does
  nothing — safe to run twice (idempotent, named gently in learner text as "safe
  to run twice")
- A `weeklyReport()` function emails a summary assembled from Stats values, on its
  own weekly trigger
- The learner can read the executions log and knows the two places evidence of an
  unattended run appears
- The learner knows where the script's authorization lives in their Google account
  and how to revoke it
- Cited by other cores as: "the tracker snapshots itself weekly and emails a
  report, and the learner can build guarded, scheduled functions — established by
  `lessons/on-a-schedule/`."

## Facts

- Triggers are managed from a panel in the script editor's left sidebar, labeled
  **Triggers** [volatile as of 2026-08 in icon/labeling — deliveries phrase
  resiliently: the sidebar panel named Triggers]. **Add Trigger** opens a form:
  choose the function, event source **Time-driven**, type **Week timer**, then a
  day and an hour window [verify current form fields — deliveries describe the
  choices by meaning, not by pixel position].
- Time-driven triggers run within the chosen hour window, not at an exact minute
  [verify]. Deliveries state this so a 9am trigger firing at 9:40 doesn't read as
  failure.
- The **Executions** panel (same sidebar) lists every run of every function:
  when, which function, how started (manual, trigger, menu), status, duration
  [verify current column set — describe by meaning].
- Creating a trigger may re-prompt authorization [verify]; same rule as always —
  read what it asks.
- By default Google emails the account when a trigger's run fails [verify current
  default and cadence — core-level note; delivery mentions failure email exists as
  a third evidence surface only if kept resilient: "Google can email you when a
  run fails"].
- Guard mechanics:
  - `sheet.getLastRow()` — index of the last row with content [verify]
  - `sheet.getRange(row, column)` — numeric addressing; `(lastRow, 1)` is the date
    cell of the newest snapshot [verify]
  - A date-formatted cell read via `getValue()` comes back as a JavaScript Date
    object [verify]
  - Same-day comparison via `.toDateString()` on both sides is the simplest
    reliable form: `lastDate.toDateString() === new Date().toDateString()`
    [verify — comparing Date objects with `===` compares identity, not day; this
    is the friction that motivates the string comparison and deliveries explain it
    at that moment]
  - `if (condition) { ... }` and early `return` — first branch in this module;
    named and explained at friction
- Email:
  - `MailApp.sendEmail(recipient, subject, body)` [verify signature — documented
    on the Apps Script developer site under MailApp]
  - Sending email as the learner is a new scope; the authorization prompt returns
    and deserves the same honest reading — this one is genuinely weightier
  - Daily send quotas exist and differ by account type [volatile as of 2026-08 —
    deliveries never assert numbers; point at the Apps Script quotas page
    (developers.google.com/apps-script/guides/services/quotas)]
  - Body assembly is plain string concatenation with `+`; numbers concatenate into
    text; `'\n'` is a line break — concatenation named at friction
- Revoking/inspecting authorization: the Google account's security settings
  include a page listing third-party apps and services with access
  (myaccount.google.com → the connections/third-party access area) [volatile as of
  2026-08 in naming and location — deliveries give a resilient pointer: Google
  account settings, security area, the list of apps with access; find the script
  project by name].
- Copies of a spreadsheet carry its bound script [verify] but **not** its triggers
  [verify — important for the blast-radius design in break-it; if wrong, the
  break-it still works because the learner creates the every-minute trigger fresh
  wherever they run it].
- Every-minute trigger option: event source Time-driven → Minutes timer → every
  minute [verify current options].

## Arc

### Orientation — given plainly

The snapshot is one click, but a human still has to remember to click — the last
human dependency. A **trigger** defined plainly: a standing instruction to Apps
Script to run a named function when something happens; a **time-driven trigger**
when the something is the clock. Where triggers live (the editor's Triggers
panel). The trust problem stated honestly before any trigger is set: a function
running while nobody watches raises a real question — how do you know it ran? —
and the lesson's structure answers it with evidence surfaces rather than faith.
The executions log introduced as a log of every run. MailApp introduced as the
service that sends email as the learner, with its quotas pointed at, not asserted.

### Predictions to elicit

- A function runs while the spreadsheet is closed and you're asleep. Where could
  evidence of that run possibly appear? List every place you can think of.
- The trigger fires weekly, and some weeks you'll also click the menu item out of
  habit. What goes wrong, and on which tab?
- Google limits how many emails a script may send per day. Write down your guess,
  then check the quotas page when you get there.

### The work — goals and hint ladders

0. **Name a version** (`before scheduling`). Plain instruction; the habit extends
   to every session that touches scripts.

1. **Schedule the snapshot.** Goal: `snapshotToday` runs weekly at a chosen
   day/hour with nobody present. This is tool orientation, not problem-solving —
   given plainly: Triggers panel → Add Trigger → choose `snapshotToday`,
   time-driven, week timer, pick the day/hour that matches the real snapshot
   habit. Note the hour-window fact (it runs within the hour, not on the minute).
   If authorization is asked again, read it again.

2. **The trust problem.** Goal: be able to answer "did it run?" without having
   watched. Two evidence surfaces, taught by inspection now so they're familiar
   before the first unattended run:
   - The Snapshots tab itself — a row nobody typed.
   - The **Executions** panel — open it and read the history that already exists:
     every manual run, every menu click from last session is in there. Each entry
     says what ran, when, how it was started, and whether it succeeded. The
     scheduled runs will appear in this same list.
   The first scheduled run happens later this week without the learner; the
   assignment explicitly includes checking both surfaces afterwards. (The break-it
   section provides same-day proof that triggers fire unattended.)

3. **Earn the guard.** The duplicate problem is now structural: a schedule *and* a
   menu *and* a habit guarantee a same-day double eventually — and mistakes on a
   schedule repeat themselves. Goal: `snapshotToday` does nothing when Snapshots
   already has a row for today; test = menu click twice, one new row total.
   - Rung 1: the function needs to look before it leaps — specifically at the
     newest row of Snapshots, specifically at its date, and compare that to today.
     Everything needed to *read* a cell is already in the function; the new part
     is acting differently depending on what was read.
   - Rung 2: the concepts — an **if statement** runs its bracketed block only when
     its condition is true (the first branch in this module: code that chooses);
     `return` ends the function early, and "check, and bail out if so" is one of
     the most common shapes in all of programming. Finding the newest row:
     `getLastRow()` gives its number, and `getRange(row, column)` addresses cells
     by number, so the date cell of the newest snapshot is reachable. One genuine
     wrinkle, named honestly: two Date values that mean the same day still differ
     (they carry times), so the reliable same-day comparison is to reduce both to
     their day-as-text first — Date objects have a method that does exactly that.
   - Rung 3, as a completion problem (first branch = syntax-heavy moment):

     ```javascript
     function snapshotToday() {
       const ss = SpreadsheetApp.getActiveSpreadsheet();
       const snaps = ss.getSheetByName('Snapshots');
       const lastDate = snaps.getRange(snaps.getLastRow(), 1).getValue();
       if (________________________) {
         return;   // today's snapshot already exists — do nothing
       }
       // ...the existing read-and-append lines...
     }
     ```

     The blank is the same-day comparison; `.toDateString()` on each side turns a
     date into its day-as-text, and `===` asks whether two values are equal.
   - Test: menu click twice in a row. One new row. The second click did nothing,
     silently and correctly.

4. **The weekly report.** Goal: a function `weeklyReport()` that emails the
   learner a short summary — total value, total spent, net, whatever else Stats
   already computes — then goes on its own weekly trigger. Orientation:
   `MailApp.sendEmail` named plainly with its three pieces (recipient, subject,
   body); recipient is the learner's own address typed as text; the body is one
   piece of text assembled from several values — **string concatenation** named at
   friction (`+` glues text and numbers into text; `'\n'` is a line break). Run
   manually first; the authorization prompt returns because sending mail as the
   learner is a new, weightier permission — read it with that weight. Then check
   the inbox, then add the trigger.
   - Rung 1: the reading half is `snapshotToday`'s reading half; the new half is
     building one text value out of several pieces and handing it to the mail
     service. Build the text in a variable and look at it before sending anything
     (the executions log shows what a run logged; logging the body first is a
     fine way to check it).
   - Rung 2: concatenation examples in the abstract — `'Total value: ' + value`
     yields one string; chains of `+` build paragraphs; `'\n'` starts a new line.
     Subject and body are just two such strings.
   - Rung 3: `MailApp.sendEmail(recipient, subject, body)` — signature confirmed
     on its page at the Apps Script developer site; while there, find the quotas
     page and read the daily send limit for your kind of account (checking the
     Predict guess).
   - **The shared-report option, offered not assumed:** if someone fronted money
     for cards, the payback balance is on its own tab — adding it to the report
     body, and that person to the recipients, turns the weekly email into
     accountability made ambient: the number both sides trust, arriving without
     anyone asking. Two conditions stated plainly: ask the person first (a weekly
     automated email is offered, never imposed), and only if the payback ledger
     exists.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **The flood.** Design the blast radius first, deliberately — that design step is
  itself the lesson content: either (a) File → Make a copy, and in the copy remove
  the guard, or (b) stay on the real tracker with the guard confirmed working.
  Then create a second trigger on `snapshotToday`: time-driven, minutes timer,
  every minute. Let it run for a handful of minutes while watching the Executions
  panel fill — run after run after run, nobody touching anything. On the
  unguarded copy, Snapshots floods a row a minute and the chart smears; on the
  guarded real tracker, the runs pile up in the log while the tab stays clean —
  the guard visibly doing its job against a machine-speed mistake. Then **delete
  the trigger** (and the copy, or the flood rows). What it teaches: a schedule
  multiplies whatever it's attached to, mistakes included — by hand you make a
  mistake once; scheduled, it repeats every minute until noticed. This is also
  same-day proof that triggers genuinely fire with nobody present.
- **Find the leash.** Not breaking the script — inspecting its permission. In the
  Google account's security settings there is a list of apps and services with
  access to the account [resilient pointer per Facts]; find the script project by
  name and read what it's allowed to do — the same scopes agreed to at
  authorization, on file. Optional full cycle: revoke access, run the function,
  read the failure, re-authorize, run clean. What it teaches: authorization is
  not a one-time gate but a standing grant that lives somewhere inspectable and
  is always revocable — the learner should know where the off switch is for
  anything acting as them.

### What just happened — the explanation

The tracker now acts without a human present — which is the actual definition of
automation; the menu item last session still had a human in the loop, and now
there isn't one. The triangle built this session — **schedule it, verify it ran,
make it safe to re-run** — is not a spreadsheet pattern but the shape of every
unattended system: backups, billing runs, report jobs all stand on the same three
legs, and their operators ask the same three questions (when does it run? how do I
know it ran? what happens if it runs twice?). The guard's grown-up name, given
gently: engineers call an action that's safe to run twice **idempotent**, and
designing for idempotence is a mark of production-quality automation — the learner
has now done it for a real reason, not as an exercise. One layer deeper on the
log: the executions history is the general pattern of **logging** — unattended
systems write down what they did precisely because nobody was there — and the
server logs, backup reports, and audit trails of the working world are this same
idea at scale.

### Go further — open questions

- A monthly summary email is one trigger and one function away — and Stats already
  computes things the weekly report doesn't mention (best set, spend by month).
  What belongs in a monthly view that would be noise weekly?
- The trigger form offered event sources other than time. One of them fires when a
  form is submitted — and purchases arrive by form. What could happen at the
  moment a purchase is logged? (A thank-you email to whoever fronted the money is
  one idea; there are better ones.)
- Genuinely open: this session gave a machine standing permission to write to the
  tracker and send email as you, on a schedule, unsupervised. What should a
  machine *never* do without asking you first? Where is your own line — and what
  is it about those actions that puts them past it?

## Delivery notes

- **guided:** level 2 — goals and hints; do not walk through the guard or report
  line by line in the open text. The completion problem for the `if` is the
  sanctioned exception; no rung-4 worked answers anywhere in this lesson.
- The trust problem must be framed before the first trigger is set, not after —
  the lesson's honesty depends on raising "how would you know?" as a question the
  learner owns.
- The flood must not be runnable by accident on the real tracker without the
  guard: the delivery presents the blast-radius choice as an explicit decision
  with both options legitimate.
- Never assert quota numbers, panel labels, or account-page paths; point.
- The shared-report thread: "whoever fronted the money," offer-not-assume, ask
  the person first. No assumed household.
- Mention that the trigger fires within an hour window, or the first unattended
  run reads as late/broken.
