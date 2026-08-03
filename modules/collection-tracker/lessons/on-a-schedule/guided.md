# On a schedule

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your snapshot is one click now. But somebody still has to remember to click — and
that somebody is the last human part left in the system. Forget for two weeks and
the value-over-time chart grows a gap, exactly as if the script had never been
written.

This session removes the remembering. You'll give the tracker a schedule, so the
snapshot takes itself every week whether you're thinking about cards or not. That
raises an honest question this lesson takes seriously: if a thing runs while
nobody's watching, how do you ever know it ran? You'll learn where the evidence
lives, build the safety guard that stops a scheduled mistake from repeating itself
forever, and then go one step further — a weekly report, assembled from your Stats
tab and delivered to your inbox by email, from the tracker, without being asked.

---

## Before you start

You need:

- **A working snapshot script behind a menu.** Built in
  [Your first script](../first-script/guided.md). Quick check: **Tracker → Take
  snapshot** adds a correct row to Snapshots (this can count as this week's
  snapshot, or delete it after).
- **A Snapshots tab feeding a value-over-time chart.** Started in
  [Price snapshots](../price-snapshots/guided.md).
- **A Stats tab with the totals in known cells.** Built in
  [Questions your data can answer](../questions-your-data-can-answer/guided.md).

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A tracker that takes its own snapshot every week, at a day and hour you chose,
  with nobody present
- A guard inside `snapshotToday` that makes it safe to run twice — click it, let
  the schedule fire it, no duplicates either way
- A weekly email report of the collection — total value, total spent, net —
  arriving in your inbox on schedule
- The ability to check whether an unattended run actually happened, and knowledge
  of where the script's permission to act as you lives in your Google account

---

## New tools

**Triggers.** A trigger is a standing instruction to Apps Script: run this
function when this happens. When the "this" is the clock — every week, every day,
every minute — it's called a time-driven trigger. Triggers are managed from a
panel in the script editor's sidebar; look for the one named **Triggers**. They're
documented, along with everything else in this session, at Google's Apps Script
developer site ([developers.google.com/apps-script](https://developers.google.com/apps-script)).

**The executions log.** In the same sidebar is a panel listing every run of every
function in your project — when it ran, how it was started, whether it succeeded.
It is the answer to "did it run?" and you'll be reading it today.

**MailApp.** The Apps Script service that sends email as you. Its reference pages
are on the same developer site — and so is a page of **quotas**, the daily limits
Google puts on what scripts can do, including how many emails they may send. The
numbers there change over time, so this page won't quote them; you'll read them at
the source.

As always: the script code is typed by hand, not pasted.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- A function runs while the spreadsheet is closed and you're asleep. Where could
  evidence of that run possibly appear? List every place you can think of.
- The schedule fires weekly — and some weeks you'll also click the menu item out
  of habit. What goes wrong, and on which tab?
- Google limits how many emails a script may send per day. Write down your guess;
  you'll check it against the quotas page later in this session.

---

## The work

### Name a version first

**File → Version history → Name current version** — call it `before scheduling`.
Every session that touches scripts starts this way.

### Schedule the snapshot

In the script editor, open the **Triggers** panel from the sidebar and add a
trigger. The form asks a series of choices; what you want is: run `snapshotToday`,
event source time-driven, on a week timer, on the day and hour that matches when
you actually take snapshots. (If Google asks for authorization again, same rule as
always — read what it asks before agreeing.)

One fact worth knowing so the first run doesn't look broken: a time-driven trigger
fires *within* the hour you pick, not at the top of it. A 9am trigger that runs at
9:40 is working correctly.

That's it — the schedule exists. Which immediately raises the real question.

### The trust problem

Sometime this week, `snapshotToday` will run while you're not there. Not "you
clicked and looked away" — genuinely unattended, spreadsheet closed, you elsewhere.
How will you know it happened?

Two places will hold the evidence, and you should get familiar with both *now*,
while the history in them is still history you made yourself:

- **The Snapshots tab.** After the trigger fires, there will be a row nobody
  typed and nobody clicked for. The data itself is evidence.
- **The executions log.** Open the Executions panel in the editor and read what's
  already in it: every run from last session is there — each menu click, each
  manual run, with a timestamp, how it was started, and whether it succeeded.
  Read a few entries closely. When the trigger fires, its run will appear in this
  same list, marked as started by a trigger instead of by you.

Your assignment extends past today: after the scheduled hour passes this week,
check both places. A row you didn't make, and a log entry that says the clock made
it — that pair is what "it ran" looks like from the outside. (Before this session
ends, the Break-it section will also give you same-day proof that triggers really
do fire on their own.)

### Earn the guard

Now look at what you've built: a schedule that snapshots weekly, a menu item that
snapshots on click, and a human with a habit. Sooner or later — probably sooner —
both will fire on the same day, and you know from last session exactly what that
produces: duplicate rows and a stuttering chart. Last session that was a
curiosity. With a schedule attached, it's a certainty.

Your goal: change `snapshotToday` so that **if Snapshots already has a row for
today, the function does nothing**. The test: click **Tracker → Take snapshot**
twice in a row. Exactly one new row.

<details>
<summary>Stuck? Start here</summary>

The function needs to look before it leaps: at the newest row of Snapshots,
specifically at its date, compared against today. You already know how to read a
cell — that was half of last session. The genuinely new part is making the
function *act differently* depending on what it read.

</details>

<details>
<summary>The concepts, named</summary>

An **if statement** is how code chooses: `if (condition) { ... }` runs the lines
inside the braces only when the condition holds. And `return` ends a function
early — nothing after it runs. Put together, "check, and bail out if so" is one of
the most common shapes in all of programming, and this is your first one.

Finding the newest row: `getLastRow()` gives you its row number, and `getRange`
can also take numbers — `getRange(row, column)` — so the date cell of the newest
snapshot is `getRange(thatRow, 1)`.

One honest wrinkle: two dates that mean the same *day* are still not equal,
because each carries a time of day. The reliable comparison reduces both to their
day-as-text first — Date values have a method that does exactly that. Its name is
one dot away, in the list.

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
day-as-text, and `===` asks whether two values are equal. You need both sides of
the comparison — the newest row's day, and today's.

</details>

Run the test: two clicks, one row. The second click did nothing — silently,
correctly, exactly as designed. Doing nothing on purpose is a feature you built.

### The weekly report

The tracker knows things worth hearing about once a week: what the collection is
worth, what's been spent, the net. Your goal: a new function, `weeklyReport`, that
emails you a short summary built from your Stats cells — and then a second weekly
trigger that sends it on schedule.

Orientation first. `MailApp.sendEmail` takes three pieces: a recipient (your own
email address, typed as text in quotes), a subject, and a body. The body is one
piece of text assembled from several values, which needs one new idea: **string
concatenation** — the `+` sign glues text and numbers together into text.
`'Total value: ' + value` is one string; chain more `+` onto it and you build a
paragraph; `'\n'` inside quotes starts a new line.

Run it manually the first time, before any trigger. Two things to expect: the
authorization prompt returns, because *sending email as you* is a new permission —
heavier than editing spreadsheets, and worth reading with that weight. And then,
your inbox: an email from your own tracker.

<details>
<summary>Stuck? Start here</summary>

The reading half of this function is the reading half of `snapshotToday` — same
cells, same methods. The new half is building one text value out of several
pieces, then handing it to the mail service. Build the body in a variable first so
you can get it right before anything is sent.

</details>

<details>
<summary>The pieces</summary>

A body might be assembled like:
`'Collection this week' + '\n' + 'Value: ' + value + '\n' + 'Spent: ' + spent` —
and so on, with the net computed the way `snapshotToday` computes it. Subject and
body are just two strings.

</details>

<details>
<summary>The pointer</summary>

`MailApp.sendEmail` — confirm its exact signature on its page at the Apps Script
developer site. While you're there, find the quotas page and read the current
daily email limit for your kind of account. Compare it to your Predict guess.

</details>

When the email reads well, add the trigger: weekly, `weeklyReport`, a day and hour
you'd want the report to arrive.

**One option, if it fits your situation.** If someone fronted money for your cards
and your tracker has a payback ledger, the report body can include the current
payback balance — and that person can be a recipient. A number both sides trust,
arriving weekly, without anyone having to ask: that's accountability made ambient,
and it tends to be appreciated. Two conditions: ask them first — a weekly
automated email is something you offer, never impose — and keep the balance in
your own copy of the report too, so you're both reading the same number.

---

## Break it on purpose

Cause each one, read what happens, undo it.

**The flood.** You're going to point a schedule at `snapshotToday` and set it to
**every minute** — and before you do, you get to make a real engineering decision:
where should this mistake land? Two legitimate choices. Either make a copy of the
tracker (**File → Make a copy** — the copy carries the script) and remove the
guard in the copy, so you can watch the damage uncontained; or stay on the real
tracker with the guard you just tested standing between the schedule and the data.
Decide, then add the trigger: time-driven, minutes timer, every minute.

Let it run for a few minutes with the Executions panel open. Watch the runs stack
up — one a minute, nobody touching anything. On an unguarded copy, Snapshots grows
a row a minute and the chart smears into nonsense. On the guarded tracker, the log
fills while the tab stays clean — the guard rejecting a machine-speed mistake once
a minute, visibly worth having built.

Then **delete the trigger**, and clean up whatever it made. What this teaches is
worth the mess: a schedule multiplies whatever it's attached to, mistakes
included. By hand, you make a mistake once. On a schedule, it repeats every minute
until someone notices. This is also your same-day proof that triggers fire with
nobody present — you just watched them do it.

**Find the leash.** Nothing gets broken here; you're going to inspect the
permission you granted. Somewhere in your Google account's security settings is a
list of apps and services with access to your account — find it (it's under the
security area of your account settings; the exact name shifts, but look for
third-party apps or connections). Your script project is in that list, by name.
Open it and read what it's allowed to do — the same permissions you agreed to,
on file, with a way to remove access sitting right there. You don't have to
revoke it (though the full cycle — revoke, watch the next run fail in the
executions log, re-authorize — is worth doing once if you're curious). What
matters is knowing this page exists: every permission you grant lives somewhere
inspectable, and you now know where the off switch is for anything acting as you.

---

## What just happened

Last session the tracker did a chore when you clicked. This week it will do that
chore with no human anywhere in the loop — and that, precisely, is the definition
of **automation**: not "less work," but *acts without a person present*.

The three things you built today form a triangle that is much bigger than
spreadsheets. **Schedule it** — the trigger. **Verify it ran** — the executions
log and the data itself. **Make it safe to re-run** — the guard. Every unattended
system in the world stands on those three legs: nightly backups, monthly billing
runs, report jobs at every company on earth. The people who run them ask exactly
the three questions you now know to ask: when does it run, how do I know it ran,
and what happens if it runs twice?

Your guard has a grown-up name, worth knowing: engineers call an action that's
safe to run twice **idempotent**. Designing things to be idempotent is a mark of
serious automation — and you did it not as an exercise but because your own chart
was going to stutter without it.

One layer deeper on the executions log: it exists because unattended systems must
write down what they did — nobody was there to see it. That idea is called
**logging**, and the working world runs on it: server logs, audit trails, backup
reports are all this same pattern at scale. You read your first one today; it will
not be the last.

---

## Go further

- A monthly summary is one function and one trigger away — and Stats computes
  things the weekly report doesn't mention, like spend by month and best set.
  What belongs in a monthly view that would be noise every week?
- The trigger form offered event sources besides time. One of them fires when a
  form is submitted — and your purchases arrive by form. What could usefully
  happen at the exact moment a purchase is logged? An instant thank-you email to
  whoever fronted the money is one idea; you may have better ones.
- This session gave a machine standing permission to write your data and send
  email as you, on a schedule, unsupervised — and you drew no line anywhere. So
  where is it? What should a machine *never* do without asking you first, and
  what exactly is it about those actions that puts them past your line? There's
  no answer key for this one.

---

## What you have now

- A weekly trigger that takes the snapshot with nobody present — the last human
  dependency, remembering, is gone
- A guarded `snapshotToday`: safe to run twice, whether by click, schedule, or
  both on the same day
- A `weeklyReport` function on its own weekly trigger, delivering the
  collection's numbers to your inbox — and optionally to whoever fronted money,
  with their agreement
- The ability to verify an unattended run from the executions log and the data
  itself
- Knowledge of where the script's permission lives in your Google account, and
  how you'd take it back
