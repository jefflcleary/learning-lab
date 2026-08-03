# Your first script

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every week you do the same thing to your tracker: open it, read the total value and
total spent off the Stats tab, and type them into a new row on Snapshots with the
date. You know the steps without thinking. That is exactly the problem — a job you
can do without thinking is a job a machine should be doing.

This session, the spreadsheet learns to do it. You're going to write your first
program: a short script, typed by you, that reads the same two cells your eyes read
and appends the same row your hands append. Then you'll put it behind a menu item on
the spreadsheet's own menu bar, so the whole weekly ritual becomes one click —
**Tracker → Take snapshot** — and the chart updates before your finger leaves the
mouse. Anyone you show the tracker to will see a spreadsheet with a menu Google
didn't put there. You did.

---

## Before you start

You need:

- **A Snapshots tab you've been filling by hand.** Four columns — Date, Total
  value, Total spent, Net — with a row for each week, feeding a value-over-time
  chart. [Price snapshots](../price-snapshots/guided.md) is where that ritual
  started. Quick check: the last row of Snapshots is a snapshot you typed
  yourself, and you can say the steps of the ritual from memory.
- **A Stats tab with the two totals in known cells.** Built in
  [Questions your data can answer](../questions-your-data-can-answer/guided.md).
  Quick check: you can point at the cell holding the collection's total value and
  the cell holding total spent, and name their addresses (like `B2`).

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- Written and run your first program — a script that takes a complete, correct
  snapshot exactly the way your hands do
- A **Tracker** menu on your spreadsheet's menu bar, with a **Take snapshot** item
  that does the whole weekly chore in one click
- Read and understood what you were granting when you gave the script permission
  to act as you
- Caused your first `null` error on purpose, read it end to end, and learned what
  it means — an error you will meet again for the rest of your computing life

---

## New tools

**Google Apps Script** is a programming environment built into Google Sheets. It
lets you write instructions the spreadsheet can run — the same instructions your
hands carry out, written precisely enough for a machine to follow. Nothing to
install: it opens from a menu inside your spreadsheet. Its documentation lives at
Google's Apps Script developer site
([developers.google.com/apps-script](https://developers.google.com/apps-script)) —
every service you'll use today, starting with one called `SpreadsheetApp`, has its
reference pages there. When this page and those pages disagree, trust theirs.

**JavaScript** is the language Apps Script uses. It's worth knowing that this isn't
some private spreadsheet dialect: JavaScript is one of the most widely used
programming languages in the world, and everything you learn about it today
transfers far beyond Google Sheets.

**The script editor** is where the code goes. It opens in its own browser tab, and
the script you write there is bound to this specific spreadsheet — it knows which
file it belongs to.

One rule for this session and every programming session after it: **the script is
typed by hand, not pasted.** Typing forces you to read every character, and reading
every character is where the learning is.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Write out your weekly snapshot ritual as numbered instructions, precise enough
  that a stranger who has never seen your tracker could follow them without asking
  a single question. How many steps did it take? Keep the list — it's the raw
  material for everything below.
- A script you wrote is about to edit your spreadsheet. What do you think Google
  will ask you before it allows that for the first time?
- When a script adds a row to Snapshots, what will the value-over-time chart do —
  and when?

---

## The work

### Name a version first

A script changes your spreadsheet the same way your hands do, so the safety habit
for experiments applies to scripts too. Before anything else: **File → Version
history → Name current version**, and call it something like `before first script`.
Whatever happens next, the tracker as it stands right now is one click away.

### Open the editor

In your spreadsheet, open the **Extensions** menu and choose **Apps Script**. (Menu
layouts shift over time — if it isn't exactly there, it's nearby; you're looking
for the item named Apps Script.)

A new tab opens: the script editor. Give the project a name if it asks — `Tracker
scripts` is fine. There's one file in it already, containing a mostly empty
**function**. A function is a named bundle of instructions; the name is the handle
you use to run it. Read what's there before changing anything — it's short.

### Make the script touch the sheet

Your first goal is small on purpose: a function that, when run, makes something —
anything — appear on the Snapshots tab. A single test row with a message in it is
perfect. You'll delete it right after; the point is to see your code move the
spreadsheet.

Here is the discovery tool that makes this findable rather than magic. In the body
of the function, type `SpreadsheetApp` and then a dot — and stop. The editor pops
up a list: everything `SpreadsheetApp` can do, right there. **Read the whole
list.** This is the same move as reading every line of a settings file or every
column of a reference page: you're not hunting for one answer, you're seeing the
size of the space. Every object you meet today offers you this list the moment you
type the dot. It is the closest thing programming has to a map, and it's always
one keystroke away.

<details>
<summary>Stuck? Start here</summary>

The object that knows about spreadsheets is `SpreadsheetApp`. Type it, type the
dot, and read every suggestion. One of them is about getting *the spreadsheet this
script is attached to*. Once you have the spreadsheet, you'll want one particular
tab of it — and tabs have names.

</details>

<details>
<summary>The shape of it</summary>

The code is a chain: get the spreadsheet → get one of its tabs by name → tell that
tab to do something. Each link is a **method** — a thing an object can do — and
the dot is how you ask for it. Each method's result offers its own dot and its own
list.

Chains get long, so there's a way to keep them readable: a **variable** — a name
you give to a value so you can use it again. `const sheet = ...` means "call the
thing on the right `sheet` from now on."

</details>

<details>
<summary>The names</summary>

The methods you want are `getActiveSpreadsheet()`, then `getSheetByName('Snapshots')`
— the tab's name goes in quotes, spelled exactly as the tab is spelled — then
`appendRow([...])`, which adds one row to the bottom. The square brackets hold a
list of values, one per column; a list in brackets like that is called an
**array**. All three methods have reference pages on the Apps Script developer
site, under SpreadsheetApp.

</details>

<details>
<summary>A complete version, to compare against</summary>

If yours is working, read this against it — differences are fine if you can explain
them. If yours isn't working and the hints didn't unstick it, type this in, get it
running, then find what was different in your attempt.

```javascript
function hello() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Snapshots');
  sheet.appendRow(['hello from a script']);
}
```

</details>

Now run it: make sure your function's name is the one selected in the toolbar, and
click **Run**.

It won't run — not yet. This is the moment from your prediction: **Google stops
and asks your permission.** Read what it actually says, because this is not a
formality to click through. A script runs *as you*. Whatever you can do to your
spreadsheets, a script you authorize can do to them — that's what makes it able to
take your snapshot, and it's why Google refuses to proceed until you've agreed.
The prompt lists the specific permissions being requested; each named permission
is called a **scope**. This script asks for access to your spreadsheets, because
spreadsheets are the only thing the code touches. Read the list, see that it
matches what you wrote, and then agree. (The exact screens change over time, and
your own scripts can trigger an extra warning screen — read whatever appears; the
skill is reading it, not memorizing it.)

Once authorized, the function runs. Switch to the spreadsheet tab and look at
Snapshots: there's your row. A program you wrote just changed a file. Delete the
row — it's not a real snapshot — and notice that you're deleting it by hand, like
any other cell. Scripts write ordinary data; nothing about it is special
afterwards.

### The real thing: `snapshotToday`

Now the actual ritual. Pull out the numbered list you wrote in Predict — that list
is the specification. Your goal: a function named `snapshotToday` that in one run
appends a complete, correct row to Snapshots — today's date, total value, total
spent, net — indistinguishable from a row your hands made.

<details>
<summary>Stuck? Start here</summary>

Your ritual has two halves. The *writing* half — put a row on Snapshots — is the
function you just wrote, with different cargo. The *reading* half is new but uses
the same chain, aimed at the Stats tab instead, ending in a method that reads a
cell instead of appending a row. Type the dot after a sheet and read the list with
that in mind.

</details>

<details>
<summary>The concepts, named</summary>

`getRange('B2')` names one cell, using the same addresses formulas use;
`getValue()` reads what's in it. Read each total into a variable and it's yours to
reuse — including inside the array you hand to `appendRow`.

Two more pieces. Today's date is `new Date()` — the machine's "now"; put it in the
array and it lands in the cell as a date. And net isn't stored anywhere: it's
value minus spent, and you can compute it with `-` right inside the array, where
it's needed.

</details>

<details>
<summary>The structure</summary>

Get the Stats sheet. `getValue()` your total-value cell into a variable, your
total-spent cell into another — **your** cell addresses, from the Before-you-start
check, not anyone else's. Then, on Snapshots:
`appendRow([new Date(), value, spent, value - spent])`.

</details>

<details>
<summary>A complete version, to compare against</summary>

The two cell addresses here are placeholders — yours are wherever your Stats tab
keeps its totals.

```javascript
function snapshotToday() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const stats = ss.getSheetByName('Stats');
  const value = stats.getRange('B2').getValue();   // your total-value cell
  const spent = stats.getRange('B3').getValue();   // your total-spent cell
  ss.getSheetByName('Snapshots').appendRow([new Date(), value, spent, value - spent]);
}
```

</details>

Run it, then grade it like a teacher: is the row exactly what your hands would have
written? (One cosmetic difference is allowed: the date may arrive with a time
attached. It's still a date — format the cell the way you'd format any cell if it
bothers you.) When the row passes, delete it. That sounds strange after the work of
producing it, but the next step deserves a clean stage.

### The human handle

A function buried in an editor tab is no way to run a weekly ritual. Your goal: a
menu named **Tracker** on the spreadsheet's own menu bar, holding one item, **Take
snapshot**, that runs `snapshotToday` — so the chore is one click, from inside the
spreadsheet, no editor in sight.

One piece of orientation makes this possible: some function names are reserved. A
function named exactly `onOpen` runs automatically every time the spreadsheet is
opened. Build the menu inside `onOpen`, and the menu is simply always there.

<details>
<summary>Stuck? Start here</summary>

The spreadsheet's user interface — its menus and dialogs — is reachable from
`SpreadsheetApp` too. Type the dot and read the list again; one entry is about the
Ui.

</details>

<details>
<summary>The shape of it</summary>

Menu building is another chain: create a menu with a name, add an item to it, add
the finished menu to the Ui. The item takes two pieces of text: the label people
see, and the *name of the function to run* — as text, in quotes. That second part
is how the menu knows what the click means.

</details>

<details>
<summary>The names</summary>

`getUi()`, `createMenu('Tracker')`, `addItem('Take snapshot', 'snapshotToday')`,
`addToUi()` — documented on the developer site under SpreadsheetApp's Ui pages.

</details>

<details>
<summary>A complete version, to compare against</summary>

```javascript
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Tracker')
    .addItem('Take snapshot', 'snapshotToday')
    .addToUi();
}
```

</details>

Save the script. Now switch to the spreadsheet and reload the browser tab — because
`onOpen` runs when the spreadsheet opens, and reloading is an opening. Watch the
menu bar as it loads: next to Google's own menus, **Tracker** appears.

Click it. **Take snapshot.** One click: the row lands, the chart moves, done.

Sit with the before and after for a moment. Last week this was a numbered list of
steps you performed by hand. Now it is one item on a menu, and the menu is part of
the spreadsheet itself — every future week, snapshot day is a single click. That
distance, between the list and the click, is what programming is for.

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Misspell the tab name.** In `snapshotToday`, change `'Snapshots'` to
`'Snapshotss'` — one extra letter — and run it from the editor. It fails. Read the
entire error message before touching anything; the important word in it is
**null**. Here's what happened: `getSheetByName` looked for a tab called
`Snapshotss`, found no such thing, and handed back `null` — the programming word
for "nothing." The next line then tried to call a method on nothing, as if nothing
were a thing, and that's the line that blew up. This is the first null error of
your career and very far from the last; it's among the most common errors in all
of programming. It always poses the same question: *which thing did I ask for that
wasn't there?* Here the answer is one typo deep. Someday it'll be buried deeper —
but the question will be the same one. Fix the spelling and run it clean (then
delete the extra row).

**Take the snapshot twice.** Click **Tracker → Take snapshot** two times in a row.
Two rows, same date — and the chart dutifully plots the stutter. You've met
duplicate snapshots before, back when a distracted evening could produce two
hand-typed rows. Notice what automation did to that problem: it didn't remove it,
it made it *faster*. A machine repeats your mistakes at machine speed. Today the
fix is the same as it ever was — delete the extra row by hand. But a real fix is
possible: a script can check whether today's row already exists and decline to add
another. That guard gets built in [On a schedule](../on-a-schedule/guided.md),
where it stops being a nicety and becomes necessary.

---

## What just happened

Count the ways into your tracker now: your hands, formulas, the phone form if you
built one, and — as of today — a script. Four interfaces to the same data, and
every one of them was added because the previous one made some job tedious.

Notice that the script isn't smarter than your ritual. It *is* your ritual — the
same two reads and one write, in the same order. That's why the weeks of doing it
by hand were not wasted time you're now escaping; they were the preparation. You
can only automate what you can describe precisely, and the manual weeks were where
your description got precise. The numbered list you wrote in Predict was already a
program; today you translated it.

One layer deeper on where your code actually ran: not on your computer. Your
spreadsheet lives on Google's machines, and when you clicked Run, your instructions
executed there — which is why the authorization prompt was a genuine event, not
ceremony. You granted a program standing permission to act as you on machines you
don't own. Reading what such prompts ask, every time, is a habit worth keeping for
life.

And the language you did it in is not a spreadsheet curiosity: JavaScript runs most
of the interactive web, and what you learned today — functions, variables, methods,
reading the dot's list — goes wherever it goes.

---

## Go further

- One more line in `snapshotToday` — or a second menu item — could stamp a "last
  snapshot" date into a cell on Stats, so the dashboard itself tells you how fresh
  it is. You have every piece this needs.
- The Ui object does more than menus. Somewhere on its documentation pages is a way
  to ask "are you sure?" before the snapshot runs. Read the surface of what Ui
  offers and find it.
- The snapshot qualified for automation because you could describe it precisely
  enough for a stranger to follow. What else in your weekly tracker routine passes
  that test? Anything that does is a candidate for the Tracker menu. Anything that
  doesn't — what exactly is the imprecise part?

---

## What you have now

- A script bound to your tracker, typed by hand: `snapshotToday`, which takes a
  complete snapshot exactly as your hands did, and `onOpen`, which builds the menu
- A **Tracker → Take snapshot** menu item — the weekly ritual is now one click,
  and the chart updates the moment it's clicked
- A script authorized to act as you, where you read what you granted before
  agreeing
- Your first null error, caused on purpose and read end to end — and the question
  it always asks: which thing did I ask for that wasn't there?
- One known gap, on purpose: nothing stops a second snapshot on the same day yet
