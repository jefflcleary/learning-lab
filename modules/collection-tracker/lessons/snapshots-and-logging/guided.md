# Value snapshots and logging from your phone

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

A tracker dies in two ways, and this session closes off both.

The first way: it forgets. Your tracker is entirely present-tense. Every number
on Stats describes right now, and the moment you update a card's value, the old
value stops existing — anywhere. Ask the tracker what the collection is worth
and it answers instantly; ask what it was worth last month and there is nothing
to answer with. Whether the collection is *growing* is arguably the most
interesting question it could answer, and today it can't. History has to be
recorded on purpose; nothing keeps it for you. The first half of this session
builds the tracker's diary — a tab where, on a schedule, you write down what
the collection is worth before now stops being now — and draws the growth
curve that diary makes possible.

The second way: it starves. Picture a Saturday afternoon at a card shop. You
buy a pack, you tell yourself you'll log it when you get home, and you don't —
not out of laziness, but because "log it" meant "later, at a computer," and
later lost. Trackers die exactly this way: not deleted, just quietly starved,
one unlogged purchase at a time. The second half builds a Google Form whose
questions mirror your Purchases columns, linked to your tracker so every
submission lands as a new row — and puts it one tap from your phone's home
screen, so logging a pack becomes a ten-second job you can do standing at the
counter.

One thing said plainly up front: the snapshot recording is a chore, done by
hand, every week. That is deliberate. A few weeks of doing this chore yourself
teaches you exactly what it is — which matters, because a later session,
[Automating the tracker with Apps Script](../apps-script-automation/guided.md),
teaches a machine to do it, and you can only teach a machine a job you know
completely.

---

## Before you start

You need:

- **A Collection tab whose Value column is roughly current** — begun in
  [Building the ledger](../building-the-ledger/guided.md) and kept up since.
  Quick check: you could defend each card's Value as "about right this week."
- **Live totals on Stats and a validated Type column** — built in
  [Stats with SUMIF and keeping data clean](../stats-and-clean-data/guided.md).
  Quick check: change a card's Value and watch the total move; type a made-up
  category into a Type cell and watch it get rejected, then undo.
- **Charting skills** — you can build a chart from a range and title it, from
  [Charts and the QUERY function](../charts-and-query/guided.md). Quick check:
  you can say what the chart editor's two real questions are.
- **A Purchases tab with real history** — columns Date, Item, Type, Cost, Paid
  by, Notes, built in
  [Tracking purchases and money owed](../purchases-and-payback/guided.md).
  Quick check: the tab holds actual purchases, not sample rows.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A Snapshots tab holding the collection's first recorded history — one real
  measurement and a few honest, clearly labeled estimates
- A line chart of the collection's net position over time — the growth curve,
  from day one — plus tiny in-cell charts next to your headline stats
- A weekly ritual, scheduled and written down, that keeps the history growing
- A form whose questions mirror your Purchases columns, linked to your tracker
  and sitting on your phone's home screen, with a real purchase logged in about
  ten seconds
- A deliberate, written-down decision about where form responses live in your
  tracker — a choice with real tradeoffs and no right answer

---

## New tools

**A cell note.** Right-click a cell and choose the note option (menus shift;
the word to look for is "note") to attach a small text annotation to it. Today
it's how estimate rows get labeled as estimates.

**SPARKLINE** is a Sheets function: `=SPARKLINE(range)` draws a miniature chart
— by default a line — inside the single cell holding the formula. It has
options for type and color; its documentation is the **SPARKLINE function**
help page in Google's Docs editors help center at
[support.google.com/docs](https://support.google.com/docs) — search
"SPARKLINE."

**One rule, and the reason for it.** The rows you're about to write into the
Snapshots tab must be **typed numbers, not formulas that point at Stats**. A
cell containing a formula like `=Stats!B2` never stops recalculating — next
month it will show next month's total, and your "history" will silently
rewrite itself to match the present, forever. A typed number is frozen; that's
the whole point of it. The one exception is Net, which may be a formula *if*
it only uses the frozen numbers in its own row. You'll watch the failure
happen live in the break-it section, but the rule comes first because breaking
it by accident destroys the tab's entire purpose without a single error
message.

**Google Forms** is a free Google tool for building forms — pages of questions
that anyone with the link can answer and submit. It comes with the same Google
account you already use for Sheets; nothing gets installed. A form can be
**linked to a spreadsheet**, which means every submission is written into the
spreadsheet as a new row, automatically, the moment someone taps Submit. Its
documentation lives in the Google Forms section of the same
[Docs editors help center](https://support.google.com/docs).

One fact worth knowing before you build: linked responses land in a **new tab
of their own**, which the form creates and owns. They do not land in Purchases
or any other existing tab. That fact is going to matter near the end of this
session.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- What was the collection worth one month ago? Write an actual number — and
  then write down how you could ever check it.
- Two snapshots two weeks apart, nothing recorded between them: what *should* a
  chart draw in the gap — and what do you think it *will* draw?
- Count honestly: of the purchases you made in the last month, how many are in
  the Purchases tab — and how many never made it? (If the answer is "all of
  them made it," excellent; the form is insurance. For most people the gap is
  the reason the second half of this session exists.)
- When a form submission arrives in the spreadsheet, where do you expect the
  new row to appear — at the bottom of Purchases, or somewhere else?
- Your Type column rejects categories that aren't on its list. If the form asks
  for Type as a multiple-choice question, can a submission contain a category
  that isn't on the list? What if the question offered an "Other" answer people
  could type into?

---

## The work

### Build the diary

Goal: a new tab named **Snapshots**, with four columns: Date, Total value,
Total spent, Net. This tab has a different contract from every other tab in the
tracker: rows get added, and rows never get edited. One row per visit.

### Take the first real snapshot

Goal: the first row of true history, in three steps done in order:

1. A quick value pass over Collection — update the Value column the way you
   always price your cards. The snapshot is only as honest as the values behind
   it.
2. Read Total value and Total spent off Stats.
3. On Snapshots: type today's date, type the two totals, and fill in Net — what
   the collection is worth minus what it cost.

<details>
<summary>About that Net column</summary>

Net is the one column allowed to be a formula — value minus spent — but only if
it uses the frozen numbers in its own row. If the formula mentions another
tab's name, it isn't a snapshot anymore; it's a window onto the present wearing
a date.

</details>

### Backfill an honest prehistory

A single dot isn't a line. Goal: two or three earlier rows — a month ago, two
months ago — so the chart has a shape on day one. These rows are estimates, and
they get labeled as estimates: a note on the Date cell saying so, or an
asterisk convention you pick. Honest data admits which parts are memory.

But here's the interesting part: only *half* of each old row is actually an
estimate.

<details>
<summary>Stuck? Start here</summary>

One of the two totals can be reconstructed exactly — not guessed — from data
the tracker already keeps. Which of your tabs remembers dates?

</details>

<details>
<summary>The reconstruction</summary>

Purchases records every buy with its date. A SUMIF over dates before a cutoff
rebuilds Total spent *as of that day*, exactly — the past of your spending was
being written down all along. Total value has no such tab behind it: nobody
recorded card values a month ago, so that number is memory, and it gets marked
as such. Notice the asymmetry. It's the subject of this half of the lesson,
and it gets named properly at the end.

</details>

### Draw the growth curve

Goal: a line chart — Date along the bottom, Net as the line, Total value as a
second line if you want it — titled as its question. "Is the collection
growing?" is a fine title; yours may be better.

This chart is the single most motivating picture the tracker will ever produce,
and it starts existing today. Its first version is part measurement, part
labeled memory; every week from now on it gets one more true point, and the
estimates matter less and less.

### Put history inside the headline numbers

Goal: next to the headline stats on Stats — total value, net — a sparkline fed
from the matching Snapshots column, so the dashboard's biggest numbers each
carry a tiny picture of their own recent past.

<details>
<summary>Stuck? Start here</summary>

The SPARKLINE help page is short — read all of it. The only real decision is
which Snapshots column each sparkline should watch.

</details>

### Commit to the schedule

Goal: pick the day. Weekly is the suggestion — often enough that the line means
something, rare enough to actually happen. Put a reminder wherever your
reminders live, and write the ritual in your logbook in your own words: value
pass, read two numbers, type one row.

This is the part that is deliberately manual. Every week you will read two
numbers off one tab and type them into another, and it will feel like being a
machine's substitute. That feeling is accurate, and it is the point: you are
learning this chore's exact shape by carrying it, and in
[Automating the tracker with Apps Script](../apps-script-automation/guided.md)
you will hand it — precisely specified, because you lived it — to an actual
machine.

### The other half of staying alive

The diary keeps the tracker remembering. The rest of the session keeps it fed —
because a history of only the purchases that survived the trip home is not
much of a history.

### Build the form to mirror Purchases

Your goal: a form with one question per Purchases column — Date, Item, Type,
Cost, Paid by, Notes — linked to your tracker, so that submitting the form
writes a row into the spreadsheet.

Design requirements, which are the same requirements Purchases already lives
by:

- **Type and Paid by are fixed choices**, not free text — and the Type choices
  must match your validation list on Purchases exactly, character for
  character.
- **Cost should only accept a number.**
- **Notes is optional.** Everything else is required.

You're done when you submit a test response from your computer and watch the
row appear in the spreadsheet.

<details>
<summary>Stuck on creating the form? Start here</summary>

There are two roads and they end in the same place. The spreadsheet's own menus
can start a form that's linked from birth — look through them for anything
about forms; the option currently lives in a menu named along the lines of
**Tools**. Or build the form at [forms.google.com](https://forms.google.com)
and then look in the form's **Responses** area for a way to send responses to a
spreadsheet — it will let you pick your existing tracker. If neither turns up
where you expect, the help center's Forms section covers both routes; controls
move, names mostly don't.

</details>

<details>
<summary>Stuck on question types?</summary>

Each column has a natural question type, and matching them up is the design
work: a **date** question for Date; **short answer** for Item; a fixed-choice
type — **multiple choice** or **dropdown** — for Type and Paid by; short answer
for Cost, with the number-only rule enforced by what Forms calls **response
validation** (look in the question's own options); **paragraph** for Notes.

The Type question's choices come from your Purchases validation list, copied
exactly. A fixed-choice question is the same contract as your validation
dropdown: a list of allowed answers, agreed in advance. You've set this
contract once before; this is the same contract at a second door.

</details>

<details>
<summary>Verifying the link</summary>

After linking, look at the spreadsheet's tab strip — a new tab has appeared,
with a name along the lines of "Form Responses 1". Submit one test response,
then read the new tab's header row side by side with the Purchases header row.
Same information, plus one column you never asked for: **Timestamp**, the exact
moment of submission, which the form records on its own. Keep it; it's free
data, and Purchases never had anything like it.

</details>

### Put it on the phone

The form's **Send** control gives you its link (there's an option to shorten
it). Open that link on your phone, then use the browser's share or menu
control — the option is named along the lines of **Add to Home Screen** — so
the form becomes an icon next to your apps.

Then run the honest test: from home-screen tap to Submit, log a real purchase.
The target is about ten seconds. That number is the entire point — it has to be
short enough to happen at a shop counter, standing up, while whoever fronted
the money is still putting their wallet away. If it's slower than that, look at
which questions are costing time and whether the form can meet you halfway
(fewer required questions, dropdown instead of typing).

### Decide where responses live

Now the part the form forced on you. Responses land in their own tab. Your
stats — whatever reads Purchases today — know nothing about that tab. Two
purchase records now exist, and something has to give. There are three honest
ways out, all three used in the real world:

**(a) Point the stats at both tabs.** Purchases stays the manual record, the
responses tab is the phone record, and every stat formula reads both. The cost:
every future formula has to remember there are two sources. Forget one, and the
stat silently undercounts — no error, just a wrong number.

**(b) Copy rows over as a ritual.** Every so often, move new responses into
Purchases by hand. One table stays the single truth. The cost: a recurring
chore — exactly the species of friction this session exists to kill — and every
lapse means the truth is stale until you catch up.

**(c) Make the responses tab the purchases record.** Retire manual entry.
Repoint your stats at the responses tab, and decide what happens to the old
Purchases rows — folded into the new record, or kept as a closed historical
tab. The cost: the form now owns your schema. Column order belongs to it, the
Timestamp column is there whether you wanted it or not, and your history lives
in two shapes unless you merge it.

There is no hint for this one, because there is no answer to hint toward. Pick
the one that fits how you actually live with this tracker. Implement enough of
your choice to see it working — repointed or doubled formulas for (a), one
performed ritual for (b), the repointing plus a decision about old rows for
(c) — and then write the decision and your reasoning in your logbook.
Future-you will meet this fork again in other systems; what future-you needs is
not the answer you picked but the reasons you picked it.

---

## Break it on purpose

The first two experiments run on a copy — File → Make a copy, or duplicate the
tab — the same expendable-surface habit as always. The third runs on the real
tab, so save a named version first: File → Version history, name the current
version. The fourth needs only the form and one throwaway row.

**Skip two weeks.** On the copy: invent a plausible history with a two-week
hole in it, chart it, and study what the chart does with the gap. Does it space
points by real date distance, or evenly by row? Does the line stride across the
hole as if nothing happened? Whatever you find, notice what that stretch of
line *is*: a guess. Nobody measured anything there. A line chart draws
something between every pair of points whether or not anything is known about
the space between — which means a gappy history produces a chart that lies by
omission, smoothly. Delete the copy when you've seen it.

**Snapshot twice in one day.** Same copy: two rows, same date, different
numbers. Look at what the line does at that date. The tab's contract was one
row per date, and a duplicate is an ambiguity — the chart has to render the
ambiguity somehow, and what it renders is nonsense. Decide your house rule now
(a second snapshot in a day replaces the first, or doesn't happen) and write it
in the logbook. Delete the copy.

**The self-rewriting history.** On the real tab, named version saved: take one
snapshot row and replace its typed totals with formulas pointing at Stats. It
looks identical. Now change one card's Value on Collection — and watch the
*past* move. That row is no longer a record of anything; it's the present
wearing a date. Undo immediately: retype the frozen numbers, or restore your
named version. This is the entire reason for the typed-values rule, seen once
with your own eyes so you never have to see it by accident.

**Walk around the guard.** On the Purchases tab, validation rejects a made-up
category — you proved that yourself when you set it up. Now edit the form's
Type question and enable the **"Other"** option, the one that lets people type
an answer of their own. From your phone, submit a purchase with a nonsense
category through it. Go look at the responses tab: the nonsense landed,
unchallenged. The sheet's validation guards the sheet's front door — and the
form is a second door, and your submission walked straight past. Every door
needs its own guard. That is exactly why your Type question uses a fixed list
with no "Other": the question's choice list *is* the form's validation. Undo:
remove the "Other" option and delete the nonsense row.

---

## What just happened

The Snapshots tab is a **time series**: measurements paired with dates,
appended and never edited. It is the same data shape behind every stock chart,
every step counter, every weather record, every growth chart penciled on a
door frame. You now maintain one.

The deeper thing the first half built is a distinction. Collection is
**state** — what is true now, where every update destroys the old truth by
overwriting it. Snapshots is **history** — what was true when, which only ever
grows. One overwrites; one appends. They feel similar to edit, and they could
not be more different in what they can answer. You met the law that connects
them while backfilling: you could rebuild your total spending for any past
date, exactly, because Purchases — though you never called it this — has been a
history tab all along. But no formula could recover what the collection was
*worth* a month ago, because value only ever lived in state, and state
forgets. That's the general rule, and it's worth keeping for life: **you can
always derive state from history, never history from state.** Which is why
history has to be kept on purpose, starting before you need it.

The second half built the pattern that runs the web. A form is a friendly face
on a table: questions in front, rows landing in something table-shaped behind.
Every signup page, every checkout, every survey you have ever filled in is this
exact machinery — and now that you've built both halves, you can see the seam
everywhere. A required field is validation. A dropdown is the fixed-list
contract you've now enforced at two different doors. The confirmation page is
the row being written. And the break-it moment generalizes further than it
looks: rules enforced at one entrance do not cover an entrance added later.
Real systems — banks, games, stores — validate at the form *and* at the table,
because doors keep getting added and each one needs its own guard. You now know
that from having walked through an unguarded one yourself.

Put the halves together and the theme has a name: a tracker that stays alive.
It now remembers on purpose, and it eats without effort — and easier is the
thing that decides whether data exists at all. Six months from now, the
difference between a record you trust and one full of holes won't be a
formula; it will be whether logging cost ten seconds or ten minutes. Systems
that survive are the ones cheap enough to keep feeding. And notice what the
snapshot chore turned out to be, precisely: read two numbers, type three,
weekly. A procedure so exact a machine could follow it. That is not an
accident.

---

## Go further

- Should snapshots record per-set values too? Sketch what the tab would need —
  more columns per row, or more rows per date — and work out what each design
  would do to the chart. This is a real fork with real tradeoffs, and data
  designers argue about exactly this shape.
- What's the right gap between snapshots? Daily catches more and mostly records
  noise; monthly is cheap and blurry. What facts about the card market — or
  about you — would change the answer?
- The Timestamp column arrived free with every submission, and Purchases never
  had one. What could the tracker learn from *when* purchases happen — day of
  week, time of day — that the Date column alone can't tell it?
- Genuinely open: when a card's market value jumps, did your collection *gain*
  anything? The growth curve says yes. Your wallet hasn't noticed. Both are
  telling the truth about something — hold the question, because it comes back
  properly the day the tracker starts handling actual sales.
- Genuinely open: entry friction was starving this tracker, and a form fixed
  it. What other good habits die of friction — logging exercise, tracking
  spending, practicing an instrument — and which of them could a form pointed
  at a spreadsheet fix? The pattern is yours now. Where else does it apply?

---

## What you have now

- A Snapshots tab (Date | Total value | Total spent | Net) holding one true
  measurement and a labeled, honest prehistory
- The growth curve: a titled line chart of Net over time that gains one true
  point every week from now on — and sparklines beside the headline stats
- A weekly snapshot ritual, scheduled and written in your own words — the exact
  chore a later lesson teaches a machine to do
- A distinction other lessons will lean on: state overwrites, history appends
- A Google Form linked to the tracker, on your phone's home screen — logging a
  purchase away from a computer takes about ten seconds, and anyone you hand
  the phone to can do it
- A written-down, deliberate decision about where form responses live relative
  to the Purchases tab, with the reasoning in your logbook
- Firsthand proof that a form is a second door needing its own guard
