# Automating the tracker with Apps Script

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every week you do the same thing to your tracker: open it, read the total
value and total spent off the Stats tab, and type them into a new row on
Snapshots with the date. You know the steps without thinking. That is exactly
the problem — a job you can do without thinking is a job a machine should be
doing.

This session, the spreadsheet learns to do it — in two stages. First you'll
write your first program: a short script, typed by you, that reads the same
two cells your eyes read and appends the same row your hands append, behind a
menu item on the spreadsheet's own menu bar — **Tracker → Take snapshot**,
one click, and the chart updates before your finger leaves the mouse. Then
you'll notice what's still left: somebody has to remember to click, and that
somebody is the last human part in the system. So the second stage removes
the remembering. You'll give the tracker a schedule, so the snapshot takes
itself every week whether you're thinking about cards or not — which raises
an honest question this session takes seriously: if a thing runs while
nobody's watching, how do you ever know it ran? You'll learn where the
evidence lives, build the safety guard that stops a scheduled mistake from
repeating itself forever, and finish with a weekly report, assembled from
your Stats tab and delivered to your inbox by email, from the tracker,
without being asked.

---

## Before you start

You need:

- **A Snapshots tab you've been filling by hand.** Four columns — Date, Total
  value, Total spent, Net — with a row for each week, feeding a
  value-over-time chart.
  [Value snapshots and logging from your phone](../snapshots-and-logging/guided.md) is where that ritual
  started. Quick check: the last row of Snapshots is a snapshot you typed
  yourself, and you can say the steps of the ritual from memory.
- **A Stats tab with the two totals in known cells.** Built in
  [Stats with SUMIF and keeping data clean](../stats-and-clean-data/guided.md).
  Quick check: you can point at the cell holding the collection's total value
  and the cell holding total spent, and name their addresses (like `B2`).

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- Written and run your first program — a script that takes a complete,
  correct snapshot exactly the way your hands do, behind a **Tracker → Take
  snapshot** menu item on the spreadsheet's own menu bar
- A tracker that takes its own snapshot every week, at a day and hour you
  chose, with nobody present — and a guard in the script that makes it safe
  to run twice, click or schedule or both
- A weekly email report of the collection — total value, total spent, net —
  arriving in your inbox on schedule
- Read and understood what you granted when you gave the script permission to
  act as you, the ability to check whether an unattended run actually
  happened, and knowledge of where that permission lives in your Google
  account
- Caused your first `null` error on purpose, read it end to end, and learned
  what it means — an error you will meet again for the rest of your computing
  life

---

## New tools

**Google Apps Script** is a programming environment built into Google
Sheets: it lets you write instructions the spreadsheet can run — the same
instructions your hands carry out, written precisely enough for a machine.
Nothing to install; it opens from a menu inside your spreadsheet. Its
documentation lives at Google's Apps Script developer site
([developers.google.com/apps-script](https://developers.google.com/apps-script)) —
every service you'll use today has its reference pages there. When this page
and those pages disagree, trust theirs.

**JavaScript** is the language Apps Script uses — not a private spreadsheet
dialect but one of the most widely used programming languages in the world;
everything you learn about it today transfers far beyond Google Sheets.

**The script editor** is where the code goes. It opens in its own browser
tab, and the script you write there is bound to this specific spreadsheet.

**Triggers.** A trigger is a standing instruction to Apps Script: run this
function when this happens. When the "this" is the clock, it's a time-driven
trigger. Triggers are managed from a panel in the script editor's sidebar;
look for the one named **Triggers**.

**The executions log.** In the same sidebar, a panel listing every run of
every function in your project — when it ran, how it was started, whether it
succeeded. It is the answer to "did it run?"

**MailApp.** The Apps Script service that sends email as you. Its reference
pages are on the same developer site — and so is a page of **quotas**, the
daily limits Google puts on what scripts can do, including how many emails
they may send. The numbers there change over time, so this page won't quote
them; you'll read them at the source.

One rule for this session and every programming session after it: **the
script is typed by hand, not pasted.** Typing forces you to read every
character, and reading every character is where the learning is.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Write out your weekly snapshot ritual as numbered instructions, precise
  enough that a stranger who has never seen your tracker could follow them
  without asking a single question. How many steps? Keep the list — it's the
  raw material for everything below.
- A script you wrote is about to edit your spreadsheet. What do you think
  Google will ask you before it allows that for the first time?
- A function runs while the spreadsheet is closed and you're asleep. Where
  could evidence of that run possibly appear? List every place you can think
  of.
- Later today a schedule will take the snapshot weekly — and some weeks
  you'll also click the menu item out of habit. What goes wrong, and on which
  tab?
- Google limits how many emails a script may send per day. Write down your
  guess; you'll check it against the quotas page later.

---

## The work

### Name a version first

A script changes your spreadsheet the same way your hands do, so the safety
habit for experiments applies to scripts too. Before anything else: **File →
Version history → Name current version** — something like `before first
script`. Whatever happens next, the tracker as it stands is one click away.

### Open the editor

In your spreadsheet, open the **Extensions** menu and choose **Apps Script**.
(Menu layouts shift over time — if it isn't exactly there, it's nearby;
you're looking for the item named Apps Script.) A new tab opens: the script
editor. Give the project a name if it asks — `Tracker scripts` is fine.
There's one file already, containing a mostly empty **function** — a named
bundle of instructions; the name is the handle you use to run it. Read what's
there before changing anything — it's short.

### Make the script touch the sheet

Your first goal is small on purpose: a function that, when run, makes
something — anything — appear on the Snapshots tab. A single test row with a
message in it is perfect; you'll delete it right after.

Here is the discovery tool that makes this findable rather than magic. In the
body of the function, type `SpreadsheetApp` and then a dot — and stop. The
editor pops up a list: everything `SpreadsheetApp` can do. **Read the whole
list.** This is the same move as reading every line of a settings file: not
hunting for one answer, seeing the size of the space. Every object you meet
today offers this list the moment you type the dot — the closest thing
programming has to a map, one keystroke away.

<details>
<summary>Stuck? Start here</summary>

The object that knows about spreadsheets is `SpreadsheetApp`. Type it, type
the dot, and read every suggestion. One of them is about getting *the
spreadsheet this script is attached to*. Once you have the spreadsheet,
you'll want one particular tab of it — and tabs have names.

</details>

<details>
<summary>The shape of it</summary>

The code is a chain: get the spreadsheet → get one of its tabs by name → tell
that tab to do something. Each link is a **method** — a thing an object can
do — and the dot is how you ask. Chains get long, so there's a way to keep
them readable: a **variable** — a name you give to a value so you can use it
again. `const sheet = ...` means "call the thing on the right `sheet` from
now on."

</details>

<details>
<summary>The names</summary>

`getActiveSpreadsheet()`, then `getSheetByName('Snapshots')` — the tab's name
in quotes, spelled exactly — then `appendRow([...])`, which adds one row to
the bottom. The square brackets hold a list of values, one per column; a list
in brackets is called an **array**. All three have reference pages on the
developer site, under SpreadsheetApp.

</details>

<details>
<summary>A complete version, to compare against</summary>

If yours is working, read this against it — differences are fine if you can
explain them. If yours isn't and the hints didn't unstick it, type this in,
get it running, then find what was different in your attempt.

```javascript
function hello() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Snapshots');
  sheet.appendRow(['hello from a script']);
}
```

</details>

Now run it: make sure your function's name is selected in the toolbar, and
click **Run**.

It won't run — not yet. This is the moment from your prediction: **Google
stops and asks your permission.** Read what it actually says; this is not a
formality to click through. A script runs *as you* — whatever you can do to
your spreadsheets, a script you authorize can do to them. The prompt lists
the specific permissions being requested; each named permission is called a
**scope**. This script asks for access to your spreadsheets, because
spreadsheets are the only thing the code touches. Read the list, see that it
matches what you wrote, and then agree. (The exact screens change over time,
and your own scripts can trigger an extra warning screen — read whatever
appears; the skill is reading it, not memorizing it.)

Once authorized, the function runs. Switch to the spreadsheet and look at
Snapshots: there's your row. A program you wrote just changed a file. Delete
the row — it's not a real snapshot — and notice you're deleting it by hand,
like any other cell. Scripts write ordinary data.

### The real thing: `snapshotToday`

Now the actual ritual. Pull out the numbered list from Predict — that list is
the specification. Your goal: a function named `snapshotToday` that in one
run appends a complete, correct row to Snapshots — today's date, total value,
total spent, net — indistinguishable from a row your hands made.

<details>
<summary>Stuck? Start here</summary>

Your ritual has two halves. The *writing* half — put a row on Snapshots — is
the function you just wrote, with different cargo. The *reading* half is new
but uses the same chain, aimed at the Stats tab, ending in a method that
reads a cell instead of appending a row. Type the dot after a sheet and read
the list with that in mind.

</details>

<details>
<summary>The concepts, named</summary>

`getRange('B2')` names one cell, using the same addresses formulas use;
`getValue()` reads what's in it. Read each total into a variable and it's
yours to reuse — including inside the array you hand to `appendRow`. Two more
pieces: today's date is `new Date()` — the machine's "now"; put it in the
array and it lands as a date. And net isn't stored anywhere — it's value
minus spent, computed with `-` right inside the array.

</details>

<details>
<summary>The structure</summary>

Get the Stats sheet. `getValue()` your total-value cell into a variable, your
total-spent cell into another — **your** cell addresses, from the
Before-you-start check. Then, on Snapshots:
`appendRow([new Date(), value, spent, value - spent])`.

</details>

<details>
<summary>A complete version, to compare against</summary>

The two cell addresses here are placeholders — yours are wherever your Stats
tab keeps its totals.

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

Run it, then grade it like a teacher: is the row exactly what your hands
would have written? (One cosmetic difference is allowed: the date may arrive
with a time attached. It's still a date — format the cell if it bothers you.)
When the row passes, delete it — the next step deserves a clean stage.

### The human handle

A function buried in an editor tab is no way to run a weekly ritual. Your
goal: a menu named **Tracker** on the spreadsheet's own menu bar, holding one
item, **Take snapshot**, that runs `snapshotToday`.

One piece of orientation makes this possible: some function names are
reserved. A function named exactly `onOpen` runs automatically every time the
spreadsheet is opened. Build the menu inside `onOpen`, and the menu is simply
always there.

<details>
<summary>Stuck? Start here</summary>

The spreadsheet's user interface — its menus and dialogs — is reachable from
`SpreadsheetApp` too. Type the dot and read the list again; one entry is
about the Ui.

</details>

<details>
<summary>The shape of it</summary>

Menu building is another chain: create a menu with a name, add an item to it,
add the finished menu to the Ui. The item takes two pieces of text: the label
people see, and the *name of the function to run* — as text, in quotes.
That second part is how the menu knows what the click means.

</details>

<details>
<summary>The names</summary>

`getUi()`, `createMenu('Tracker')`, `addItem('Take snapshot',
'snapshotToday')`, `addToUi()` — documented on the developer site under
SpreadsheetApp's Ui pages.

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

Save the script. Switch to the spreadsheet and reload the browser tab —
`onOpen` runs when the spreadsheet opens, and reloading is an opening. Watch
the menu bar as it loads: next to Google's own menus, **Tracker** appears.

Click it. **Take snapshot.** One click: the row lands, the chart moves, done.
Last week this was a numbered list of steps you performed by hand; now it is
one item on a menu that is part of the spreadsheet itself. That distance,
between the list and the click, is what programming is for.

Now do one more thing: click it a **second** time. Two rows, same date — and
the chart dutifully plots the stutter. You've met duplicate snapshots before,
back when a distracted evening could produce two hand-typed rows. Notice what
automation did to that problem: it didn't remove it, it made it *faster* — a
machine repeats your mistakes at machine speed. Delete the extra row by hand
and hold the thought. The next move is to hand the clicking itself to a
machine, and once a schedule, a menu, and a human habit all point at the same
function, a same-day double stops being a curiosity and becomes a certainty.
The fix is a few steps away.

### Schedule the snapshot

Name a version first — `before scheduling`. Every session that touches
scripts starts this way.

In the script editor, open the **Triggers** panel from the sidebar and add a
trigger. The form asks a series of choices; what you want is: run
`snapshotToday`, event source time-driven, on a week timer, on the day and
hour that matches when you actually take snapshots. (If Google asks for
authorization again, same rule as always — read what it asks before
agreeing.)

One fact worth knowing so the first run doesn't look broken: a time-driven
trigger fires *within* the hour you pick, not at the top of it. A 9am trigger
that runs at 9:40 is working correctly.

That's it — the schedule exists. Which immediately raises the real question.

### The trust problem

Sometime this week, `snapshotToday` will run while you're not there —
genuinely unattended, spreadsheet closed, you elsewhere. How will you know it
happened?

Two places will hold the evidence, and you should get familiar with both
*now*, while the history in them is still history you made yourself:

- **The Snapshots tab.** After the trigger fires, there will be a row nobody
  typed and nobody clicked for. The data itself is evidence.
- **The executions log.** Open the Executions panel in the editor and read
  what's already in it: every run from earlier today is there — each menu
  click, each manual run, with a timestamp, how it was started, and whether
  it succeeded. When the trigger fires, its run will appear in this same
  list, marked as started by a trigger instead of by you.

Your assignment extends past today: after the scheduled hour passes this
week, check both places. A row you didn't make, and a log entry that says the
clock made it — that pair is what "it ran" looks like from the outside.
(Before this session ends, the Break-it section will also give you same-day
proof that triggers really do fire on their own.)

### Earn the guard

Look at what you've built: a schedule that snapshots weekly, a menu item that
snapshots on click, and a human with a habit. You saw two clicks make two
rows; with a schedule attached, that collision is coming on its own.

Your goal: change `snapshotToday` so that **if Snapshots already has a row
for today, the function does nothing**. The test: click **Tracker → Take
snapshot** twice in a row. Exactly one new row.

<details>
<summary>Stuck? Start here</summary>

The function needs to look before it leaps: at the newest row of Snapshots,
specifically at its date, compared against today. You already know how to
read a cell — that was half of writing `snapshotToday`. The genuinely new
part is making the function *act differently* depending on what it read.

</details>

<details>
<summary>The concepts, named</summary>

An **if statement** is how code chooses: `if (condition) { ... }` runs the
lines inside the braces only when the condition holds. And `return` ends a
function early — nothing after it runs. Put together, "check, and bail out if
so" is one of the most common shapes in all of programming, and this is your
first one.

Finding the newest row: `getLastRow()` gives you its row number, and
`getRange` can also take numbers — `getRange(row, column)` — so the date cell
of the newest snapshot is `getRange(thatRow, 1)`.

One honest wrinkle: two dates that mean the same *day* are still not equal,
because each carries a time of day. The reliable comparison reduces both to
their day-as-text first — Date values have a method that does exactly that.
Its name is one dot away, in the list.

</details>

<details>
<summary>The structure, with the load-bearing part missing</summary>

```javascript
function snapshotToday() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const snaps = ss.getSheetByName('Snapshots');
  const lastDate = snaps.getRange(snaps.getLastRow(), 1).getValue();
  if (________________________) {
    return;   // today's snapshot already exists — do nothing
  }
  // ...your existing read-and-append lines...
}
```

The blank is the same-day comparison. `.toDateString()` turns a date into its
day-as-text, and `===` asks whether two values are equal. You need both sides
of the comparison — the newest row's day, and today's.

</details>

Run the test: two clicks, one row. The second click did nothing — silently,
correctly, exactly as designed. Doing nothing on purpose is a feature you
built.

### The weekly report

The tracker knows things worth hearing about once a week: what the collection
is worth, what's been spent, the net. Your goal: a new function,
`weeklyReport`, that emails you a short summary built from your Stats cells —
and then a second weekly trigger that sends it on schedule.

Orientation first. `MailApp.sendEmail` takes three pieces: a recipient (your
own email address, typed as text in quotes), a subject, and a body. The body
is one piece of text assembled from several values, which needs one new idea:
**string concatenation** — the `+` sign glues text and numbers together into
text. `'Total value: ' + value` is one string; chain more `+` onto it and you
build a paragraph; `'\n'` inside quotes starts a new line.

Run it manually the first time, before any trigger. Two things to expect: the
authorization prompt returns, because *sending email as you* is a new
permission — heavier than editing spreadsheets, and worth reading with that
weight. And then, your inbox: an email from your own tracker.

<details>
<summary>Stuck? Start here</summary>

The reading half of this function is the reading half of `snapshotToday` —
same cells, same methods. The new half is building one text value out of
several pieces, then handing it to the mail service. Build the body in a
variable first so you can get it right before anything is sent.

</details>

<details>
<summary>The pieces</summary>

A body might be assembled like:
`'Collection this week' + '\n' + 'Value: ' + value + '\n' + 'Spent: ' + spent`
— and so on, with the net computed the way `snapshotToday` computes it.
Subject and body are just two strings.

</details>

<details>
<summary>The pointer</summary>

`MailApp.sendEmail` — confirm its exact signature on its page at the Apps
Script developer site. While you're there, find the quotas page and read the
current daily email limit for your kind of account. Compare it to your
Predict guess.

</details>

When the email reads well, add the trigger: weekly, `weeklyReport`, a day and
hour you'd want the report to arrive.

**One option, if it fits your situation.** If someone fronted money for your
cards and your tracker has a payback ledger, the report body can include the
current payback balance — and that person can be a recipient. A number both
sides trust, arriving weekly, without anyone having to ask. Two conditions:
ask them first — a weekly automated email is something you offer, never
impose — and keep the balance in your own copy of the report too, so you're
both reading the same number.

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Misspell the tab name.** In `snapshotToday`, change `'Snapshots'` to
`'Snapshotss'` — one extra letter — and run it from the editor. It fails.
Read the entire error message before touching anything; the important word in
it is **null**. Here's what happened: `getSheetByName` looked for a tab
called `Snapshotss`, found no such thing, and handed back `null` — the
programming word for "nothing." The next line then tried to call a method on
nothing, as if nothing were a thing, and that's the line that blew up. This
is the first null error of your career and very far from the last; it's among
the most common errors in all of programming. It always poses the same
question: *which thing did I ask for that wasn't there?* Here the answer is
one typo deep; someday it'll be buried deeper, but the question will be the
same one. Fix the spelling and run it clean.

**The flood.** You're going to point a schedule at `snapshotToday` and set it
to **every minute** — and before you do, you get to make a real engineering
decision: where should this mistake land? Two legitimate choices. Either make
a copy of the tracker (**File → Make a copy** — the copy carries the script)
and remove the guard in the copy, so you can watch the damage uncontained; or
stay on the real tracker with the guard you just tested standing between the
schedule and the data. Decide, then add the trigger: time-driven, minutes
timer, every minute.

Let it run for a few minutes with the Executions panel open. Watch the runs
stack up — one a minute, nobody touching anything. On an unguarded copy,
Snapshots grows a row a minute and the chart smears into nonsense. On the
guarded tracker, the log fills while the tab stays clean — the guard
rejecting a machine-speed mistake once a minute, visibly worth having built.
Then **delete the trigger**, and clean up whatever it made. What this teaches
is worth the mess: a schedule multiplies whatever it's attached to, mistakes
included. By hand, you make a mistake once; on a schedule, it repeats every
minute until someone notices. This is also your same-day proof that triggers
fire with nobody present — you just watched them do it.

**Find the leash.** Nothing gets broken here; you're going to inspect the
permission you granted. Somewhere in your Google account's security settings
is a list of apps and services with access to your account — find it (the
exact name shifts, but look for third-party apps or connections in the
security area). Your script project is in that list, by name. Open it and
read what it's allowed to do — the same permissions you agreed to, on file,
with a way to remove access sitting right there. You don't have to revoke it
(though the full cycle — revoke, watch the next run fail in the executions
log, re-authorize — is worth doing once if you're curious). What matters is
knowing this page exists: every permission you grant lives somewhere
inspectable, and you now know where the off switch is for anything acting as
you.

---

## What just happened

Count the ways into your tracker now: your hands, formulas, the phone form if
you built one, and — as of today — a script. Four interfaces to the same
data, each added because the previous one made some job tedious.

Notice that the script isn't smarter than your ritual. It *is* your ritual —
the same two reads and one write, in the same order. That's why the weeks of
doing it by hand were not wasted time; they were the preparation. You can
only automate what you can describe precisely, and the manual weeks were
where your description got precise. The numbered list you wrote in Predict
was already a program; today you translated it.

One layer deeper on where your code actually ran: not on your computer. Your
spreadsheet lives on Google's machines, and when you clicked Run, your
instructions executed there — which is why the authorization prompt was a
genuine event, not ceremony: you granted a program standing permission to act
as you on machines you don't own. Reading what such prompts ask, every time,
is a habit worth keeping for life. And the language transfers — everything
you learned today about functions, variables, methods, and reading the dot's
list goes wherever JavaScript goes, which is most of the interactive web.

Then the second act. The menu item still had a human in the loop; by the end
of this week there won't be one — and that, precisely, is the definition of
**automation**: not "less work," but *acts without a person present*. The
three things you built around the schedule form a triangle much bigger than
spreadsheets. **Schedule it** — the trigger. **Verify it ran** — the
executions log and the data itself. **Make it safe to re-run** — the guard.
Every unattended system in the world stands on those three legs — nightly
backups, monthly billing runs, report jobs — and the people who run them ask
exactly the three questions you now know to ask: when does it run, how do I
know it ran, and what happens if it runs twice?

Your guard has a grown-up name, worth knowing: engineers call an action
that's safe to run twice **idempotent**, and designing for it is a mark of
serious automation — you did it not as an exercise but because your own chart
was going to stutter without it. And the executions log is the general
pattern of **logging**: unattended systems write down what they did, because
nobody was there to see it. Server logs, audit trails, and backup reports are
this same idea at scale. You read your first one today; it will not be the
last.

---

## Go further

- One more line in `snapshotToday` — or a second menu item — could stamp a
  "last snapshot" date into a cell on Stats, so the dashboard itself tells
  you how fresh it is. You have every piece this needs.
- The Ui object does more than menus. Somewhere on its documentation pages is
  a way to ask "are you sure?" before the snapshot runs. Read the surface of
  what Ui offers and find it.
- A monthly summary is one function and one trigger away — and Stats computes
  things the weekly report doesn't mention, like spend by month and best set.
  What belongs in a monthly view that would be noise every week?
- The trigger form offered event sources besides time. One of them fires when
  a form is submitted — and your purchases arrive by form. What could
  usefully happen at the exact moment a purchase is logged? An instant
  thank-you email to whoever fronted the money is one idea; you may have
  better ones.
- The snapshot qualified for automation because you could describe it
  precisely enough for a stranger to follow. What else in your weekly tracker
  routine passes that test? Anything that does is a candidate — for the menu
  or for a trigger. Anything that doesn't — what exactly is the imprecise
  part?
- This session gave a machine standing permission to write your data and send
  email as you, on a schedule, unsupervised — and you drew no line anywhere.
  So where is it? What should a machine *never* do without asking you first,
  and what exactly is it about those actions that puts them past your line?
  There's no answer key for this one.

---

## What you have now

- A script bound to your tracker, typed by hand: a guarded `snapshotToday`
  that takes a complete snapshot exactly as your hands did — safe to run
  twice, whether by click, schedule, or both on the same day — plus `onOpen`,
  which builds the **Tracker → Take snapshot** menu
- A weekly trigger that takes the snapshot with nobody present — the last
  human dependency, remembering, is gone
- A `weeklyReport` function on its own weekly trigger, delivering the
  collection's numbers to your inbox — and optionally to whoever fronted
  money, with their agreement
- A script authorized to act as you, where you read what you granted — plus
  the ability to verify an unattended run from the executions log and the
  data itself, and knowledge of where the permission lives in your Google
  account and how you'd take it back
- Your first null error, caused on purpose and read end to end — and the
  question it always asks: which thing did I ask for that wasn't there?
