# Your first script

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** first-script
- **Module / Part:** Building a collection tracker — Part 6 — It runs itself
- **Scaffolding:** level 1 — first programming lesson in this module (first code the
  learner has ever written, as far as this module assumes). Reasoning shown
  throughout; hint ladders run to rung 4 (worked answers) per the first-contact
  policy.
- **Deliveries:** guided only (module-wide decision in MODULE.md)
- **Status:** ready

## Goal and payoff

The learner writes their first program: an Apps Script bound to their tracker that
does the weekly snapshot ritual — read the Stats totals, append a dated row to
Snapshots — and puts it behind a custom menu item, so a chore they have been doing
by hand for weeks becomes one click. Payoff: click **Tracker → Take snapshot**, a
row appears, the value-over-time chart updates instantly, and anyone the tracker is
shown to sees a spreadsheet with its own menu — a feature Google didn't ship.

The lesson under the lesson: a script is the same instructions as your hands,
executed by the machine — and you can only automate what you can describe
precisely, which is why weeks of doing it manually were the real preparation.

## Prerequisites

- The manual snapshot ritual: a Snapshots tab (Date | Total value | Total spent |
  Net) filled by hand weekly, feeding a value-over-time chart, and the felt tedium
  of it — established by `lessons/price-snapshots/`
- A Stats tab with cells holding the collection's total value and total spent —
  established by `lessons/questions-your-data-can-answer/`

## Establishes

- A script bound to the tracker containing a working `snapshotToday()` that reads
  the Stats totals and appends `[today, value, spent, net]` to Snapshots
- A custom **Tracker** menu (built by `onOpen()`) with a **Take snapshot** item —
  the weekly ritual is now one click
- The script is authorized to act as the learner, and the learner has read what
  they granted
- The learner has read a null error end to end and can say what null means
- Known limitation, on purpose: running the snapshot twice makes duplicate rows;
  no guard exists yet
- Cited by other cores as: "a working snapshot script behind a custom menu —
  established by `lessons/first-script/`."

## Facts

- The script editor opens from the spreadsheet's **Extensions** menu → **Apps
  Script** [volatile as of 2026-08 in exact menu naming — deliveries phrase
  resiliently: find the item named Apps Script]. It opens in a new browser tab, and
  the project it opens is bound to this specific spreadsheet.
- Apps Script's language is JavaScript. The default file is `Code.gs` and contains
  an empty function skeleton [verify current default contents — deliveries say
  "read what's there," never assert it].
- Apps Script's documentation lives at Google's Apps Script developer site
  (developers.google.com/apps-script). The services used here — `SpreadsheetApp`,
  and later `MailApp`, `UrlFetchApp` — are documented there. Deliveries point, and
  never assert exact API shapes beyond the well-established basics below.
- The editor autocompletes: type an object name, type a dot, and a list of
  everything it offers appears [verify exact trigger behavior; a keyboard shortcut
  also exists — point at the editor rather than asserting]. This is read-the-surface
  in miniature and deliveries celebrate it explicitly as a discovery surface.
- Well-established basics (stable for years, still tagged for the record):
  - `SpreadsheetApp.getActiveSpreadsheet()` — the spreadsheet this script is bound
    to [verify]
  - `.getSheetByName('Snapshots')` — a tab by its exact name; returns `null` when
    no tab has that name [verify]
  - `sheet.appendRow([...])` — appends one row; the square brackets are an array (a
    list of values, one per column) [verify]
  - `sheet.getRange('B2')` / `.getValue()` — one cell and its current value
    [verify]
  - `new Date()` — JavaScript's "now"; landing it in a cell renders as a date
- Running a function first time triggers the authorization flow: Google explains
  that the script wants to act as the learner and lists the specific permissions
  (scopes) — for this lesson, seeing/editing spreadsheets. Exact screens change
  [volatile as of 2026-08]; deliveries teach "read what it asks" rather than
  describing screens. A warning screen for unverified apps may appear for one's own
  scripts [verify current flow — resilient phrasing only].
- `onOpen()` is a reserved function name: Apps Script runs it automatically each
  time the spreadsheet opens [verify]. Menu building:
  `SpreadsheetApp.getUi().createMenu('Tracker').addItem('Take snapshot', 'snapshotToday').addToUi()`
  [verify signature]. `addItem`'s second argument is the *name* of the function to
  run, as text in quotes.
- Calling a method on `null` (e.g. `appendRow` after a misspelled tab name) throws
  a TypeError naming null [verify exact current message text — deliveries must not
  assert the wording; the learner reads their own].
- The safety habit: **File → Version history → Name current version** before the
  experiment. Scripts edit the spreadsheet exactly as hands do, so the habit
  applies to scripts too — deliveries say this plainly.
- Stats cell addresses for the two totals vary per learner's own layout. Deliveries
  must use placeholders and say "your addresses," never assert cells.
- Dates appended via `new Date()` may render with a time component; formatted like
  any cell (Format menu). Minor; mention so it doesn't read as a bug.

## Arc

### Orientation — given plainly

What a script is: instructions typed into a file that the spreadsheet can run — the
same instructions the learner's hands execute weekly, written precisely enough for
a machine. Apps Script named as Google Sheets' built-in programming environment;
JavaScript named as the language, with one sentence acknowledging it exists far
beyond spreadsheets. The editor, how to open it, and that it's bound to this
spreadsheet. **Function** defined at first contact (a named bundle of instructions;
the name is the handle you run it by), **variable** at the moment the first one
appears (a name given to a value so it can be used again). The subject-matter code
is typed by hand, stated as the working rule. The authorization prompt is
foreshadowed honestly: a script acting as you needs your permission, and Google
will ask.

### Predictions to elicit

- Write the weekly snapshot ritual as numbered instructions precise enough that a
  stranger could follow them without asking a single question. How many steps did
  it take? (This list is the lesson's raw material.)
- A script you wrote is about to edit your spreadsheet. What do you think Google
  asks you before allowing that the first time?
- When a script adds a row to Snapshots, what will the value-over-time chart do,
  and when?

### The work — goals and hint ladders

0. **Name a version.** File → Version history → Name current version — something
   like "before first script." Scripts change the spreadsheet the same way hands
   do, so the same safety habit applies. Stated plainly, no hint.

1. **Open the editor.** Extensions menu → the item named Apps Script (resilient
   phrasing). Look around: one file, an empty function skeleton. Read what's there.
   No hint ladder — pure orientation.

2. **Hello: make the script touch the sheet.** Goal: a function that, when run,
   makes something appear on the Snapshots tab — a single test row is fine, and it
   gets deleted right after. The route to discovery is the autocomplete: type
   `SpreadsheetApp`, type a dot, and *read the entire list* before picking anything
   — read-the-surface in miniature, celebrated as such.
   - Rung 1: the object that knows about spreadsheets is called `SpreadsheetApp`.
     Type it in the function body, add a dot, and read every suggestion the editor
     offers. Somewhere in that list is "the spreadsheet this script belongs to."
   - Rung 2: the shape is a chain: get the spreadsheet → get one tab of it by name
     → tell that tab to do something. Each link in the chain is a method (a thing
     an object can do), and the dot is how you ask. Storing a link in a variable
     (`const sheet = ...`) keeps the chain readable.
   - Rung 3: the names are `getActiveSpreadsheet()`, `getSheetByName('Snapshots')`
     — the tab name in quotes, spelled exactly — and `appendRow([...])`, whose
     square brackets hold a list of cell values. Their reference pages are on the
     Apps Script developer site under SpreadsheetApp.
   - Rung 4 (worked answer, framed as comparison):

     ```javascript
     function hello() {
       const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Snapshots');
       sheet.appendRow(['hello from a script']);
     }
     ```

   Running it: pick the function in the toolbar, Run. **The authorization prompt
   arrives here and is met honestly**: the script wants to act as the learner;
   Google lists exactly what it would be allowed to do; the learner reads the list
   before agreeing — a scope is one named permission, and this script asks for
   spreadsheet access because that is what the code touches. Then: check the
   Snapshots tab, find the row, delete it (it isn't a real snapshot).

3. **The real thing: `snapshotToday()`.** Goal: one run appends a full, correct
   snapshot row — `[today, total value, total spent, net]` — indistinguishable from
   a hand-made one except that hands didn't make it. The learner's own numbered
   ritual from Predict is the specification.
   - Rung 1: the ritual has two halves — *read* two numbers from Stats, *write*
     one row to Snapshots. The writing half is `hello` with different cargo. The
     reading half is the same chain aimed at the Stats tab, ending in a method
     that gets instead of appends.
   - Rung 2: `getRange('B2')` names one cell the way formulas do; `getValue()`
     reads what's in it. A value read into a variable can be used again — including
     inside the array handed to `appendRow`. Today's date is `new Date()` — the
     machine's "now." Net isn't read from anywhere: it's value minus spent,
     computed with `-` right where it's needed.
   - Rung 3: the shape, with the learner's own cell addresses to fill in: get the
     Stats sheet, `getValue()` the total-value cell and the total-spent cell into
     two variables, then `appendRow([new Date(), value, spent, value - spent])` on
     Snapshots.
   - Rung 4 (worked answer; placeholder addresses flagged as "yours will differ"):

     ```javascript
     function snapshotToday() {
       const ss = SpreadsheetApp.getActiveSpreadsheet();
       const stats = ss.getSheetByName('Stats');
       const value = stats.getRange('B2').getValue();   // your total-value cell
       const spent = stats.getRange('B3').getValue();   // your total-spent cell
       ss.getSheetByName('Snapshots').appendRow([new Date(), value, spent, value - spent]);
     }
     ```

   Verify against the ritual: run it, compare the new row to what hands would have
   written. The date may carry a time; format the cell if it bothers you. Then
   delete the test row, so the staged moment in step 4 produces the real one.

4. **The human handle: `onOpen()` and the menu.** Goal: a **Tracker** menu on the
   spreadsheet's own menu bar with one item, **Take snapshot**, wired to
   `snapshotToday`. Orientation: some function names are reserved — `onOpen` runs
   automatically every time the spreadsheet opens, which is why building the menu
   there makes it always present.
   - Rung 1: the spreadsheet's user interface is itself reachable from
     `SpreadsheetApp` — type the dot and read the list again; one suggestion is
     about the Ui.
   - Rung 2: the Ui object builds menus as another chain: create a menu with a
     name, add an item to it (a label, plus *which function to run* — the
     function's name as text in quotes), then add the finished menu to the Ui.
   - Rung 3: `getUi()`, `createMenu('Tracker')`, `addItem('Take snapshot',
     'snapshotToday')`, `addToUi()` — documented under SpreadsheetApp → Ui on the
     developer site.
   - Rung 4 (worked answer):

     ```javascript
     function onOpen() {
       SpreadsheetApp.getUi()
         .createMenu('Tracker')
         .addItem('Take snapshot', 'snapshotToday')
         .addToUi();
     }
     ```

   **Stage the moment deliberately**: save, reload the spreadsheet tab, watch the
   Tracker menu appear next to Google's own menus. Then click **Tracker → Take
   snapshot** once. Row appears, chart moves, and the ritual that took a numbered
   list of steps every week is now one click. Deliveries should let this land —
   plainly, with the concrete before/after, no cheering.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Misspell the tab name.** In `snapshotToday`, change `'Snapshots'` to
  `'Snapshotss'`. Run. `getSheetByName` finds no such tab and returns `null` —
  "nothing" — and the next line calls a method on nothing, which throws. Have the
  learner read the entire error before touching anything; the important word in it
  is **null**. What null means, first-null-of-their-career treatment: you asked for
  a thing that doesn't exist, were handed "nothing," then used nothing as if it
  were a thing. The question a null error always poses: *which thing did I ask for
  that wasn't there?* This error will recur for the rest of their computing life;
  meeting it on a one-character typo they caused is the cheapest introduction
  available. Undo the spelling.
- **Take the snapshot twice.** Click the menu item twice in a row: two rows, same
  date, and the chart shows the stutter. This is the duplicate problem from the
  manual ritual returned in automated form — and the sharper lesson: machines
  repeat mistakes faster than hands ever could. Fix today by deleting the extra
  row by hand; note plainly that a real guard — the script noticing today's row
  already exists and declining — is possible, and is built in
  `lessons/on-a-schedule/`.

### What just happened — the explanation

The tracker now has a fourth way in: hands, formulas, the phone form (if built),
and now a script — four interfaces to the same data, each one added because the
previous one made some job tedious. The script is not smarter than the ritual; it
*is* the ritual, verbatim, which is why the weeks of doing it by hand mattered —
you can only automate what you can describe, and the manual weeks were where the
description got precise. One layer deeper: when the learner clicks Run, Google's
computers execute the instructions — the spreadsheet doesn't live on the learner's
machine and neither does the script, which is why authorization was a real event
and not ceremony: they granted a program standing permission to act as them. And
one sentence, door open, no lecture: JavaScript is not a spreadsheet language that
happens to be here — it runs most of the interactive web, and everything learned
today transfers.

### Go further — open questions

- A second menu item, or one more line in `snapshotToday`, could stamp a "last
  snapshot" date into a cell on Stats — so the dashboard itself says how fresh it
  is. The pieces are all in hand.
- The Ui object does more than menus. Somewhere on its documentation page is a way
  to ask "are you sure?" before the snapshot happens. Read the surface and find it.
- Genuinely open: the snapshot qualified for automation because it could be
  described precisely enough for a stranger to follow. What else in the weekly
  tracker routine passes that test? Anything that does is a candidate. Anything
  that doesn't — why not, exactly?

## Delivery notes

- **guided:** the biggest first-contact lesson in the module — a project-folder
  moment like minecraft-server's first-bot, minus the terminal. Explain generously;
  every new word (function, variable, method, array, scope, null) defined at its
  moment of friction, none earlier. The autocomplete deserves explicit celebration
  as a discovery surface, in house style: concrete, not giddy.
- The authorization prompt must be treated with respect, not waved through:
  "click through the warnings" is the anti-lesson. Read what it asks; a script
  acting as you is a serious thing to allow, and knowing what you granted is the
  point. Do not describe exact screens (volatile); teach reading them.
- Never assert the Stats cell addresses — the learner's layout is their own. The
  worked answer flags its addresses as placeholders.
- Do not assert exact error-message wording in learner text; the learner reads
  their own screen.
- The staged menu-click moment is the payoff of the whole Part; keep the delivery's
  framing concrete (list of steps → one click) and let the chart's instant update
  carry it.
