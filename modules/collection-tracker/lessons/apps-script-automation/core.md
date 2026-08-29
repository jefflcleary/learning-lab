# Automating the tracker with Apps Script

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** apps-script-automation
- **Module / Part:** Building a collection tracker — Part 6 — It runs itself
- **Scaffolding:** graduated within the lesson — the first half (first code the
  learner has ever written, as far as this module assumes) is level 1:
  reasoning shown throughout, hint ladders to rung 4 per the first-contact
  policy. The second half (scheduling, the guard, the report) is level 2:
  goals plus hints, ladders stop at rung 3, with one completion problem for
  the guard's `if` (first branch ever — a syntax-heavy moment per PRINCIPLES).
- **Deliveries:** guided only (module-wide decision in MODULE.md)
- **Status:** ready

## Goal and payoff

One arc, one click to no clicks. The learner writes their first program: an
Apps Script bound to their tracker that does the weekly snapshot ritual —
read the Stats totals, append a dated row to Snapshots — and puts it behind a
custom menu item, so a chore they have been doing by hand for weeks becomes
one click. Then the last human dependency — remembering to click — is removed
too: a time-driven trigger runs the snapshot weekly with nobody present, the
learner learns to *verify* unattended runs (the Snapshots tab plus the
executions log), builds the duplicate guard the first half's double-click
demands (their first `if`), and writes a second function that emails a weekly
collection report.

Payoff: click **Tracker → Take snapshot** and a row appears and the chart
updates instantly — then, by week's end, a row appears while nobody is
watching and a report lands in an inbox; optionally, whoever fronted money
gets the payback balance ambiently, weekly, without being asked for it.
Anyone the tracker is shown to sees a spreadsheet with its own menu — a
feature Google didn't ship — that also acts alone.

The lessons under the lesson: a script is the same instructions as your
hands, executed by the machine — you can only automate what you can describe
precisely, which is why weeks of doing it manually were the real preparation.
And the trigger–log–guard triangle — schedule it, verify it ran, make it safe
to re-run — which is the shape of every unattended system.

## Prerequisites

- The manual snapshot ritual: a Snapshots tab (Date | Total value | Total
  spent | Net) filled by hand weekly, feeding a value-over-time chart, and
  the felt tedium of it — established by `lessons/snapshots-and-logging/`
- A Stats tab with cells holding the collection's total value and total
  spent — established by `lessons/stats-and-clean-data/`
- (Optional thread) A payback balance on its own tab — established by
  `lessons/purchases-and-payback/` — used only if the learner opts into the
  shared report

## Establishes

- A script bound to the tracker: `snapshotToday()` reads the Stats totals and
  appends `[today, value, spent, net]` to Snapshots, guarded so that if
  Snapshots already has a row for today it does nothing — safe to run twice
  (idempotent, named gently in learner text as "safe to run twice")
- A custom **Tracker** menu (built by `onOpen()`) with a **Take snapshot**
  item, and a weekly time-driven trigger that runs the snapshot unattended
- A `weeklyReport()` function emails a summary assembled from Stats values,
  on its own weekly trigger
- The script is authorized to act as the learner; the learner has read what
  they granted, knows where the authorization lives in their Google account,
  and how to revoke it
- The learner has read a null error end to end and can say what null means,
  can read the executions log, and knows the two places evidence of an
  unattended run appears
- Cited by other cores as: "the tracker snapshots itself weekly behind a
  guarded script and a custom menu, emails a weekly report, and the learner
  can build guarded, scheduled functions — established by
  `lessons/apps-script-automation/`."

## Facts

### The editor, the language, the services

- The script editor opens from the spreadsheet's **Extensions** menu → **Apps
  Script** [volatile as of 2026-08 in exact menu naming — deliveries phrase
  resiliently: find the item named Apps Script]. It opens in a new browser
  tab, and the project it opens is bound to this specific spreadsheet.
- Apps Script's language is JavaScript. The default file is `Code.gs` and
  contains an empty function skeleton [verify current default contents —
  deliveries say "read what's there," never assert it].
- Apps Script's documentation lives at Google's Apps Script developer site
  (developers.google.com/apps-script). The services used here —
  `SpreadsheetApp`, `MailApp`, and later `UrlFetchApp` — are documented
  there. Deliveries point, and never assert exact API shapes beyond the
  well-established basics below.
- The editor autocompletes: type an object name, type a dot, and a list of
  everything it offers appears [verify exact trigger behavior; a keyboard
  shortcut also exists — point at the editor rather than asserting]. This is
  read-the-surface in miniature and deliveries celebrate it explicitly as a
  discovery surface.
- Well-established basics (stable for years, still tagged for the record):
  - `SpreadsheetApp.getActiveSpreadsheet()` — the spreadsheet this script is
    bound to [verify]
  - `.getSheetByName('Snapshots')` — a tab by its exact name; returns `null`
    when no tab has that name [verify]
  - `sheet.appendRow([...])` — appends one row; the square brackets are an
    array (a list of values, one per column) [verify]
  - `sheet.getRange('B2')` / `.getValue()` — one cell and its current value
    [verify]
  - `new Date()` — JavaScript's "now"; landing it in a cell renders as a date
- Running a function first time triggers the authorization flow: Google
  explains that the script wants to act as the learner and lists the specific
  permissions (scopes) — for the snapshot, seeing/editing spreadsheets. Exact
  screens change [volatile as of 2026-08]; deliveries teach "read what it
  asks" rather than describing screens. A warning screen for unverified apps
  may appear for one's own scripts [verify current flow — resilient phrasing
  only].
- `onOpen()` is a reserved function name: Apps Script runs it automatically
  each time the spreadsheet opens [verify]. Menu building:
  `SpreadsheetApp.getUi().createMenu('Tracker').addItem('Take snapshot', 'snapshotToday').addToUi()`
  [verify signature]. `addItem`'s second argument is the *name* of the
  function to run, as text in quotes.
- Calling a method on `null` (e.g. `appendRow` after a misspelled tab name)
  throws a TypeError naming null [verify exact current message text —
  deliveries must not assert the wording; the learner reads their own].
- The safety habit: **File → Version history → Name current version** before
  the experiment. Scripts edit the spreadsheet exactly as hands do, so the
  habit applies to scripts too — deliveries say this plainly.
- Stats cell addresses for the two totals vary per learner's own layout.
  Deliveries must use placeholders and say "your addresses," never assert
  cells.
- Dates appended via `new Date()` may render with a time component; formatted
  like any cell (Format menu). Minor; mention so it doesn't read as a bug.

### Triggers, the log, the guard, the mail

- Triggers are managed from a panel in the script editor's left sidebar,
  labeled **Triggers** [volatile as of 2026-08 in icon/labeling — deliveries
  phrase resiliently: the sidebar panel named Triggers]. **Add Trigger**
  opens a form: choose the function, event source **Time-driven**, type
  **Week timer**, then a day and an hour window [verify current form fields —
  deliveries describe the choices by meaning, not by pixel position].
- Time-driven triggers run within the chosen hour window, not at an exact
  minute [verify]. Deliveries state this so a 9am trigger firing at 9:40
  doesn't read as failure.
- The **Executions** panel (same sidebar) lists every run of every function:
  when, which function, how started (manual, trigger, menu), status, duration
  [verify current column set — describe by meaning].
- Creating a trigger may re-prompt authorization [verify]; same rule as
  always — read what it asks.
- By default Google emails the account when a trigger's run fails [verify
  current default and cadence — core-level note; delivery mentions failure
  email exists as a third evidence surface only if kept resilient: "Google
  can email you when a run fails"].
- Guard mechanics:
  - `sheet.getLastRow()` — index of the last row with content [verify]
  - `sheet.getRange(row, column)` — numeric addressing; `(lastRow, 1)` is the
    date cell of the newest snapshot [verify]
  - A date-formatted cell read via `getValue()` comes back as a JavaScript
    Date object [verify]
  - Same-day comparison via `.toDateString()` on both sides is the simplest
    reliable form: `lastDate.toDateString() === new Date().toDateString()`
    [verify — comparing Date objects with `===` compares identity, not day;
    this is the friction that motivates the string comparison and deliveries
    explain it at that moment]
  - `if (condition) { ... }` and early `return` — first branch in this
    module; named and explained at friction
- Email:
  - `MailApp.sendEmail(recipient, subject, body)` [verify signature —
    documented on the Apps Script developer site under MailApp]
  - Sending email as the learner is a new scope; the authorization prompt
    returns and deserves the same honest reading — this one is genuinely
    weightier
  - Daily send quotas exist and differ by account type [volatile as of
    2026-08 — deliveries never assert numbers; point at the Apps Script
    quotas page (developers.google.com/apps-script/guides/services/quotas)]
  - Body assembly is plain string concatenation with `+`; numbers concatenate
    into text; `'\n'` is a line break — concatenation named at friction
- Revoking/inspecting authorization: the Google account's security settings
  include a page listing third-party apps and services with access
  (myaccount.google.com → the connections/third-party access area) [volatile
  as of 2026-08 in naming and location — deliveries give a resilient pointer:
  Google account settings, security area, the list of apps with access; find
  the script project by name].
- Copies of a spreadsheet carry its bound script [verify] but **not** its
  triggers [verify — important for the blast-radius design in break-it; if
  wrong, the break-it still works because the learner creates the
  every-minute trigger fresh wherever they run it].
- Every-minute trigger option: event source Time-driven → Minutes timer →
  every minute [verify current options].

## Arc

### Orientation — given plainly

What a script is: instructions typed into a file that the spreadsheet can
run — the same instructions the learner's hands execute weekly, written
precisely enough for a machine. Apps Script named as Google Sheets' built-in
programming environment; JavaScript named as the language, with one sentence
acknowledging it exists far beyond spreadsheets. The editor, how to open it,
and that it's bound to this spreadsheet. **Function** defined at first
contact (a named bundle of instructions; the name is the handle you run it
by), **variable** at the moment the first one appears (a name given to a
value so it can be used again). The subject-matter code is typed by hand,
stated as the working rule. The authorization prompt is foreshadowed
honestly: a script acting as you needs your permission, and Google will ask.

For the second half: a **trigger** defined plainly — a standing instruction
to Apps Script to run a named function when something happens; a
**time-driven trigger** when the something is the clock. Where triggers live
(the editor's Triggers panel). The trust problem stated honestly before any
trigger is set: a function running while nobody watches raises a real
question — how do you know it ran? — and the lesson's structure answers it
with evidence surfaces rather than faith. The executions log introduced as a
log of every run. MailApp introduced as the service that sends email as the
learner, with its quotas pointed at, not asserted.

### Predictions to elicit

- Write the weekly snapshot ritual as numbered instructions precise enough
  that a stranger could follow them without asking a single question. How
  many steps did it take? (This list is the lesson's raw material.)
- A script you wrote is about to edit your spreadsheet. What do you think
  Google asks you before allowing that the first time?
- A function runs while the spreadsheet is closed and you're asleep. Where
  could evidence of that run possibly appear? List every place you can think
  of.
- A schedule will take the snapshot weekly — and some weeks you'll also click
  the menu item out of habit. What goes wrong, and on which tab?
- Google limits how many emails a script may send per day. Write down your
  guess, then check the quotas page when you get there.

### The work — goals and hint ladders

First half — one click (level 1: ladders to rung 4):

0. **Name a version.** File → Version history → Name current version —
   something like "before first script." Scripts change the spreadsheet the
   same way hands do, so the same safety habit applies. Stated plainly, no
   hint.

1. **Open the editor.** Extensions menu → the item named Apps Script
   (resilient phrasing). Look around: one file, an empty function skeleton.
   Read what's there. No hint ladder — pure orientation.

2. **Hello: make the script touch the sheet.** Goal: a function that, when
   run, makes something appear on the Snapshots tab — a single test row is
   fine, and it gets deleted right after. The route to discovery is the
   autocomplete: type `SpreadsheetApp`, type a dot, and *read the entire
   list* before picking anything — read-the-surface in miniature, celebrated
   as such.
   - Rung 1: the object that knows about spreadsheets is called
     `SpreadsheetApp`. Type it in the function body, add a dot, and read
     every suggestion the editor offers. Somewhere in that list is "the
     spreadsheet this script belongs to."
   - Rung 2: the shape is a chain: get the spreadsheet → get one tab of it by
     name → tell that tab to do something. Each link in the chain is a method
     (a thing an object can do), and the dot is how you ask. Storing a link
     in a variable (`const sheet = ...`) keeps the chain readable.
   - Rung 3: the names are `getActiveSpreadsheet()`,
     `getSheetByName('Snapshots')` — the tab name in quotes, spelled
     exactly — and `appendRow([...])`, whose square brackets hold a list of
     cell values. Their reference pages are on the Apps Script developer site
     under SpreadsheetApp.
   - Rung 4 (worked answer, framed as comparison):

     ```javascript
     function hello() {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Snapshots');
       sheet.appendRow(['hello from a script']);
     }
     ```

   Running it: pick the function in the toolbar, Run. **The authorization
   prompt arrives here and is met honestly**: the script wants to act as the
   learner; Google lists exactly what it would be allowed to do; the learner
   reads the list before agreeing — a scope is one named permission, and this
   script asks for spreadsheet access because that is what the code touches.
   Then: check the Snapshots tab, find the row, delete it (it isn't a real
   snapshot).

3. **The real thing: `snapshotToday()`.** Goal: one run appends a full,
   correct snapshot row — `[today, total value, total spent, net]` —
   indistinguishable from a hand-made one except that hands didn't make it.
   The learner's own numbered ritual from Predict is the specification.
   - Rung 1: the ritual has two halves — *read* two numbers from Stats,
     *write* one row to Snapshots. The writing half is `hello` with different
     cargo. The reading half is the same chain aimed at the Stats tab, ending
     in a method that gets instead of appends.
   - Rung 2: `getRange('B2')` names one cell the way formulas do;
     `getValue()` reads what's in it. A value read into a variable can be
     used again — including inside the array handed to `appendRow`. Today's
     date is `new Date()` — the machine's "now." Net isn't read from
     anywhere: it's value minus spent, computed with `-` right where it's
     needed.
   - Rung 3: the shape, with the learner's own cell addresses to fill in: get
     the Stats sheet, `getValue()` the total-value cell and the total-spent
     cell into two variables, then
     `appendRow([new Date(), value, spent, value - spent])` on Snapshots.
   - Rung 4 (worked answer; placeholder addresses flagged as "yours will
     differ"):

     ```javascript
     function snapshotToday() {
       const ss = SpreadsheetApp.getActiveSpreadsheet();
       const stats = ss.getSheetByName('Stats');
       const value = stats.getRange('B2').getValue();   // your total-value cell
       const spent = stats.getRange('B3').getValue();   // your total-spent cell
       ss.getSheetByName('Snapshots').appendRow([new Date(), value, spent, value - spent]);
     }
     ```

   Verify against the ritual: run it, compare the new row to what hands would
   have written. The date may carry a time; format the cell if it bothers
   you. Then delete the test row, so the staged moment in step 4 produces the
   real one.

4. **The human handle: `onOpen()` and the menu.** Goal: a **Tracker** menu on
   the spreadsheet's own menu bar with one item, **Take snapshot**, wired to
   `snapshotToday`. Orientation: some function names are reserved — `onOpen`
   runs automatically every time the spreadsheet opens, which is why building
   the menu there makes it always present.
   - Rung 1: the spreadsheet's user interface is itself reachable from
     `SpreadsheetApp` — type the dot and read the list again; one suggestion
     is about the Ui.
   - Rung 2: the Ui object builds menus as another chain: create a menu with
     a name, add an item to it (a label, plus *which function to run* — the
     function's name as text in quotes), then add the finished menu to the
     Ui.
   - Rung 3: `getUi()`, `createMenu('Tracker')`, `addItem('Take snapshot',
     'snapshotToday')`, `addToUi()` — documented under SpreadsheetApp → Ui on
     the developer site.
   - Rung 4 (worked answer):

     ```javascript
     function onOpen() {
       SpreadsheetApp.getUi()
         .createMenu('Tracker')
         .addItem('Take snapshot', 'snapshotToday')
         .addToUi();
     }
     ```

   **Stage the moment deliberately**: save, reload the spreadsheet tab, watch
   the Tracker menu appear next to Google's own menus. Then click **Tracker →
   Take snapshot** once. Row appears, chart moves, and the ritual that took a
   numbered list of steps every week is now one click. Deliveries should let
   this land — plainly, with the concrete before/after, no cheering.

**The internal transition (delivery renders it as the pivot, in the open
text): click the menu item twice.** Two rows, same date, and the chart shows
the stutter — the duplicate problem from the manual ritual returned in
automated form, and the sharper lesson: machines repeat mistakes faster than
hands ever could. Today the fix is deleting the extra row by hand. But the
next move is to hand the clicking itself to a machine — and a schedule *and*
a menu *and* a habit guarantee a same-day double eventually. The problem just
demonstrated becomes structural the moment a trigger exists; the guard gets
earned a few steps from now.

Second half — no clicks (level 2: ladders stop at rung 3):

5. **Schedule the snapshot.** Goal: `snapshotToday` runs weekly at a chosen
   day/hour with nobody present. This is tool orientation, not
   problem-solving — given plainly: name a version first (`before
   scheduling`), then Triggers panel → Add Trigger → choose `snapshotToday`,
   time-driven, week timer, pick the day/hour that matches the real snapshot
   habit. Note the hour-window fact (it runs within the hour, not on the
   minute). If authorization is asked again, read it again.

6. **The trust problem.** Goal: be able to answer "did it run?" without
   having watched. Two evidence surfaces, taught by inspection now so they're
   familiar before the first unattended run:
   - The Snapshots tab itself — a row nobody typed.
   - The **Executions** panel — open it and read the history that already
     exists: every manual run, every menu click from earlier in this session
     is in there. Each entry says what ran, when, how it was started, and
     whether it succeeded. The scheduled runs will appear in this same list.
   The first scheduled run happens later this week without the learner; the
   assignment explicitly includes checking both surfaces afterwards. (The
   break-it section provides same-day proof that triggers fire unattended.)

7. **Earn the guard.** The double-click earlier showed the flaw; the schedule
   makes it a certainty. Goal: `snapshotToday` does nothing when Snapshots
   already has a row for today; test = menu click twice, one new row total.
   - Rung 1: the function needs to look before it leaps — specifically at the
     newest row of Snapshots, specifically at its date, and compare that to
     today. Everything needed to *read* a cell is already in the function;
     the new part is acting differently depending on what was read.
   - Rung 2: the concepts — an **if statement** runs its bracketed block only
     when its condition is true (the first branch in this module: code that
     chooses); `return` ends the function early, and "check, and bail out if
     so" is one of the most common shapes in all of programming. Finding the
     newest row: `getLastRow()` gives its number, and `getRange(row, column)`
     addresses cells by number, so the date cell of the newest snapshot is
     reachable. One genuine wrinkle, named honestly: two Date values that
     mean the same day still differ (they carry times), so the reliable
     same-day comparison is to reduce both to their day-as-text first — Date
     objects have a method that does exactly that.
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

     The blank is the same-day comparison; `.toDateString()` on each side
     turns a date into its day-as-text, and `===` asks whether two values are
     equal.
   - Test: menu click twice in a row. One new row. The second click did
     nothing, silently and correctly.

8. **The weekly report.** Goal: a function `weeklyReport()` that emails the
   learner a short summary — total value, total spent, net, whatever else
   Stats already computes — then goes on its own weekly trigger. Orientation:
   `MailApp.sendEmail` named plainly with its three pieces (recipient,
   subject, body); recipient is the learner's own address typed as text; the
   body is one piece of text assembled from several values — **string
   concatenation** named at friction (`+` glues text and numbers into text;
   `'\n'` is a line break). Run manually first; the authorization prompt
   returns because sending mail as the learner is a new, weightier
   permission — read it with that weight. Then check the inbox, then add the
   trigger.
   - Rung 1: the reading half is `snapshotToday`'s reading half; the new half
     is building one text value out of several pieces and handing it to the
     mail service. Build the text in a variable and look at it before sending
     anything (the executions log shows what a run logged; logging the body
     first is a fine way to check it).
   - Rung 2: concatenation examples in the abstract —
     `'Total value: ' + value` yields one string; chains of `+` build
     paragraphs; `'\n'` starts a new line. Subject and body are just two such
     strings.
   - Rung 3: `MailApp.sendEmail(recipient, subject, body)` — signature
     confirmed on its page at the Apps Script developer site; while there,
     find the quotas page and read the daily send limit for your kind of
     account (checking the Predict guess).
   - **The shared-report option, offered not assumed:** if someone fronted
     money for cards, the payback balance is on its own tab — adding it to
     the report body, and that person to the recipients, turns the weekly
     email into accountability made ambient: the number both sides trust,
     arriving without anyone asking. Two conditions stated plainly: ask the
     person first (a weekly automated email is offered, never imposed), and
     only if the payback ledger exists.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Misspell the tab name.** In `snapshotToday`, change `'Snapshots'` to
  `'Snapshotss'`. Run. `getSheetByName` finds no such tab and returns
  `null` — "nothing" — and the next line calls a method on nothing, which
  throws. Have the learner read the entire error before touching anything;
  the important word in it is **null**. What null means,
  first-null-of-their-career treatment: you asked for a thing that doesn't
  exist, were handed "nothing," then used nothing as if it were a thing. The
  question a null error always poses: *which thing did I ask for that wasn't
  there?* This error will recur for the rest of their computing life; meeting
  it on a one-character typo they caused is the cheapest introduction
  available. Undo the spelling.
- **The flood.** Design the blast radius first, deliberately — that design
  step is itself the lesson content: either (a) File → Make a copy, and in
  the copy remove the guard, or (b) stay on the real tracker with the guard
  confirmed working. Then create a second trigger on `snapshotToday`:
  time-driven, minutes timer, every minute. Let it run for a handful of
  minutes while watching the Executions panel fill — run after run after run,
  nobody touching anything. On the unguarded copy, Snapshots floods a row a
  minute and the chart smears; on the guarded real tracker, the runs pile up
  in the log while the tab stays clean — the guard visibly doing its job
  against a machine-speed mistake. Then **delete the trigger** (and the copy,
  or the flood rows). What it teaches: a schedule multiplies whatever it's
  attached to, mistakes included — by hand you make a mistake once;
  scheduled, it repeats every minute until noticed. This is also same-day
  proof that triggers genuinely fire with nobody present.
- **Find the leash.** Not breaking the script — inspecting its permission. In
  the Google account's security settings there is a list of apps and services
  with access to the account [resilient pointer per Facts]; find the script
  project by name and read what it's allowed to do — the same scopes agreed
  to at authorization, on file. Optional full cycle: revoke access, run the
  function, read the failure, re-authorize, run clean. What it teaches:
  authorization is not a one-time gate but a standing grant that lives
  somewhere inspectable and is always revocable — the learner should know
  where the off switch is for anything acting as them.

### What just happened — the explanation

The tracker now has a fourth way in: hands, formulas, the phone form (if
built), and now a script — four interfaces to the same data, each one added
because the previous one made some job tedious. The script is not smarter
than the ritual; it *is* the ritual, verbatim, which is why the weeks of
doing it by hand mattered — you can only automate what you can describe, and
the manual weeks were where the description got precise. One layer deeper:
when the learner clicks Run, Google's computers execute the instructions —
the spreadsheet doesn't live on the learner's machine and neither does the
script, which is why authorization was a real event and not ceremony: they
granted a program standing permission to act as them. And one sentence, door
open, no lecture: JavaScript is not a spreadsheet language that happens to be
here — it runs most of the interactive web, and everything learned today
transfers.

Then the second act's frame: the menu item still had a human in the loop, and
by week's end there isn't one — which is the actual definition of automation.
The triangle built this session — **schedule it, verify it ran, make it safe
to re-run** — is not a spreadsheet pattern but the shape of every unattended
system: backups, billing runs, report jobs all stand on the same three legs,
and their operators ask the same three questions (when does it run? how do I
know it ran? what happens if it runs twice?). The guard's grown-up name,
given gently: engineers call an action that's safe to run twice
**idempotent**, and designing for idempotence is a mark of
production-quality automation — the learner has now done it for a real
reason, not as an exercise. One layer deeper on the log: the executions
history is the general pattern of **logging** — unattended systems write down
what they did precisely because nobody was there — and the server logs,
backup reports, and audit trails of the working world are this same idea at
scale.

### Go further — open questions

- A second menu item, or one more line in `snapshotToday`, could stamp a
  "last snapshot" date into a cell on Stats — so the dashboard itself says
  how fresh it is. The pieces are all in hand.
- The Ui object does more than menus. Somewhere on its documentation page is
  a way to ask "are you sure?" before the snapshot happens. Read the surface
  and find it.
- A monthly summary email is one trigger and one function away — and Stats
  already computes things the weekly report doesn't mention (best set, spend
  by month). What belongs in a monthly view that would be noise weekly?
- The trigger form offered event sources other than time. One of them fires
  when a form is submitted — and purchases arrive by form. What could happen
  at the moment a purchase is logged? (A thank-you email to whoever fronted
  the money is one idea; there are better ones.)
- Genuinely open: the snapshot qualified for automation because it could be
  described precisely enough for a stranger to follow. What else in the
  weekly tracker routine passes that test? Anything that does is a candidate.
  Anything that doesn't — why not, exactly?
- Genuinely open: this session gave a machine standing permission to write to
  the tracker and send email as you, on a schedule, unsupervised. What should
  a machine *never* do without asking you first? Where is your own line — and
  what is it about those actions that puts them past it?

## Delivery notes

- Merged from the former `first-script` and `on-a-schedule` cores (Part 6's
  two micro-lessons); their folders are superseded by this one. The old
  cliffhanger — first-script's "snapshot twice" break-it pointing at
  on-a-schedule for the guard — is now the internal transition between the
  two halves of The work, rendered in the open text, not as a break-it.
- **guided:** the biggest first-contact lesson in the module — a
  project-folder moment like minecraft-server's first-bot, minus the
  terminal. Explain generously; every new word (function, variable, method,
  array, scope, null, trigger, string concatenation) defined at its moment of
  friction, none earlier. The autocomplete deserves explicit celebration as a
  discovery surface, in house style: concrete, not giddy.
- Scaffolding is graduated within the lesson and the delivery must respect
  the seam: rung-4 worked answers only in the first half (hello,
  snapshotToday, onOpen); the guard and report stop at rung 3, with the
  guard's completion problem as the sanctioned exception — do not walk
  through the guard or report line by line in the open text.
- The authorization prompt must be treated with respect, not waved through:
  "click through the warnings" is the anti-lesson. Read what it asks; a
  script acting as you is a serious thing to allow, and knowing what you
  granted is the point. Do not describe exact screens (volatile); teach
  reading them. Same rule at the trigger re-prompt and, with more weight, at
  the mail scope.
- Never assert the Stats cell addresses — the learner's layout is their own.
  The worked answer flags its addresses as placeholders. Do not assert exact
  error-message wording, quota numbers, panel labels, or account-page paths;
  point.
- The staged menu-click moment is the mid-lesson payoff; keep the framing
  concrete (list of steps → one click) and let the chart's instant update
  carry it. The trust problem must be framed before the first trigger is set,
  not after.
- The flood must not be runnable by accident on the real tracker without the
  guard: the delivery presents the blast-radius choice as an explicit
  decision with both options legitimate. Mention the hour-window fact, or the
  first unattended run reads as late/broken.
- The shared-report thread: "whoever fronted the money," offer-not-assume,
  ask the person first. No assumed household.
- JavaScript is named once, in New tools, with the one-sentence
  it-runs-the-web acknowledgment; the What-just-happened echo closes the
  loop without re-introducing it.
