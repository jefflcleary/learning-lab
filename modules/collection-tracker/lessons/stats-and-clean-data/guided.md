# Stats with SUMIF and keeping data clean

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your tracker holds two tables of facts now: every card that matters and every
purchase you've made. Facts are not the same as answers. "How much have I
actually spent on all this?" is not written in any cell — it's spread across
every row of the Purchases tab, waiting for something to gather it up. Same
for "how much of that went on packs?", and for the question left standing the
day you built the Purchases tab: "how much of it was fronted?"

This session the formulas change jobs. Until now they've computed cells — a
gain, a total, a balance. Today they answer questions about whole tables. You'll
build a Stats tab where every number is the answer to a question you wrote down
first, and where nobody types the numbers: they're computed from the tables,
live, and they move by themselves when the tables change.

One warning made in advance, because it shapes the whole session: somewhere
along the way, a number will probably come out wrong. When it does, nothing is
broken. You'll hunt down the cause, fix it by hand — and then, because a fix by
hand only fixes one cell, you'll spend the second half of the session making
sure the same wound can never open again: by the end, your two category
columns will refuse bad data at the door.

---

## Before you start

You need:

- **A Purchases tab recording every buy, its cost, and who paid.**
  [Tracking purchases and money owed](../purchases-and-payback/guided.md) builds
  it, including formulas that reach across tabs. Quick check: the Purchases tab
  has real rows, and you can read a reference like `Purchases!D2` and say which
  cell it means.
- **A Collection tab with cards, sets, costs, and values.**
  [Building the ledger: cards, formulas, formatting](../building-the-ledger/guided.md) builds it. Quick
  check: the Set column has a set name on every row.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A Stats tab answering at least six questions about your collection and your
  spending — total spent, spent this month, spent by type, total fronted, cards
  per set, average pack cost — every one computed, none typed
- A new family of functions that add, count, and average *only the rows that
  match a condition* — the single most reusable formula shape you'll meet
- At least one wrong number hunted down to its cause and fixed, with the method
  written in your logbook
- A Type column that only accepts Pack, Box, Single, or Supplies, and a Set
  column fed from an official Sets list you curate — with anything else
  refused at typing time
- Stats that stay right by enforcement, not by luck — and data entry you can
  hand to someone else and watch the sheet steer them

---

## New tools

Three functions today, and they're triplets — learn one and you've nearly
learned all three.

**`SUMIF`** adds up numbers, but only from rows that match a condition: "add up
the Cost column, but only where the Type column says Pack." It takes three
things, in order: where to look, what to match, what to add up.

**`COUNTIF`** counts rows that match a condition. It only takes two things —
where to look and what to match — because counting doesn't need a numbers
column.

**`AVERAGEIF`** averages, with the same three slots as `SUMIF`.

The part that matters most isn't the function names — it's the middle slot, the
**criterion**: the condition that decides which rows count. It starts as simple
as a word in quotes and grows into comparisons like "on or after this date."
One formula shape, endless questions.

Where the documentation lives, today and always: type `=` and a function name
into a cell — `=SUMIF(` — and Sheets shows a help card naming each argument as
you type. The full catalog is the Google Sheets function list in Google's Docs
editors help center; searching the web for "Google Sheets function list" finds
Google's own page.

One feature joins the functions today. **Data validation** is the Sheets
feature that restricts what a cell will accept. A rule names a range of cells
and what counts as valid there; the friendliest kind of rule is a **dropdown**,
where valid means "one of these values" and the cell offers them as a clickable
list. A rule also decides what happens when someone types something invalid:
**show a warning** (the value goes in, but the cell gets flagged) or **reject
the input** (the value is refused with a message). You'll feel the difference
between those two today rather than take it on faith.

You'll find it in the **Data menu** — look for "Data validation." The exact
layout of what opens changes as Google redesigns things, so hunt by purpose,
not by position: every version of this feature asks the same three questions —
*which cells, what rule, what happens on failure*. If the panel ever confuses
you, searching the same help center for "data validation" finds Google's
current instructions. Nothing to install; it's built in.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- How much have you spent in total, ever? Write the guess before any formula
  answers it.
- Which Type — Pack, Box, Single, Supplies — has eaten the most money, and
  roughly how far ahead of second place is it?
- If you add up the four Type totals, will they *exactly* equal the overall
  total? Yes or no, and why.
- Where *should* a mistake announce itself: the moment it's typed, or the
  moment a stat reads it? What does each choice cost?
- Later this session, a rule will check every value ever typed into your Type
  column. How many cells do you think will fail the check? An actual number.
- Which columns of the tracker should *never* get a dropdown? Name them and
  say why.

---

## The work

### Write the questions first

Before any formulas: in your logbook, write the questions in plain words. At
minimum these six — plus any of your own:

1. How much have I spent in total?
2. How much this month?
3. How much on packs? Boxes? Singles? Supplies?
4. How much was fronted?
5. How many cards do I have from each set?
6. What does a pack cost me, on average?

Then add a tab named **Stats**: questions (short labels) in column A, answers in
column B. The first half of this session is filling column B.

### The warm-up: total ever spent

You know this move. The answer to question 1 is a `SUM` over the Purchases cost
column. One reminder about the range: `Purchases!D2:D` — with no ending row —
means column D from row 2 all the way down, forever. New purchases join the
total automatically, which is exactly what a stat should do.

Check the answer against your logbook guess.

### The first interrogation: how much has gone into packs?

`SUM` can't answer this one — it adds everything. You need "add up the Cost
column, but *only the rows where* Type says Pack." That's `SUMIF`, and this
first one you build with as much help as you need.

<details>
<summary>Stuck? Start here</summary>

The function needs three questions answered, in order: where to look, what to
match, what to add up. Say your answer in plain words first — which column gets
looked at, which word gets matched, which column gets added — and then find
which slot is which as you type. The help card that appears when you type
`=SUMIF(` names each slot.

</details>

<details>
<summary>The shape</summary>

`=SUMIF(look-range, "match", add-range)` — the thing to match is text, so it
goes in double quotes. Both ranges live on the Purchases tab, and you already
know how to name a column there from another tab.

</details>

<details>
<summary>The shape, with blanks</summary>

`=SUMIF(Purchases!__2:__, "____", Purchases!__2:__)` — two column letters and
one matched word are all that's missing.

</details>

<details>
<summary>The whole formula, for comparison</summary>

`=SUMIF(Purchases!C2:C, "Pack", Purchases!D2:D)`

Compare after yours works — or if it won't work and you've stared long enough.
If yours differs and gives the right answer, yours is also right.

</details>

### The rest of the family

Three more rows, same shape, one word changes: Box, Single, Supplies. No hints —
you just built this formula.

Then add one more row and label it **All types together**: the four answers you
just computed, added up (they're ordinary cells now — a `SUM` or a `+` chain
over those four cells in column B). Put it right next to your total-ever-spent
row.

Look at those two numbers. They claim to be the same fact computed two different
ways: every purchase has exactly one Type, so the four type totals should
rebuild the grand total to the cent. If they agree, hold that thought — it
matters later. If they *don't* agree, nothing is wrong with your formulas, and
the section called "When a number comes out wrong" is waiting for you after
you've built the rest.

### Close an old question: how much was fronted?

When you built the Purchases tab, this question was left standing: `SUM` could
total the whole Cost column, but it couldn't total *only the fronted rows*. Now
you have the tool. Build the stat.

One nudge, not a hint ladder: compared with the pack formula, which column does
the *looking* move to — and which word gets matched?

That number is worth a pause — it's the size of what someone else has fronted,
computed for the first time.

### Count the collection: cards per set

Question 5 lives on the other table. One row per set on your Stats tab: "Cards
from Base Set", and so on for each set you collect. This is counting, not
adding — `COUNTIF`, two slots, no numbers column. The looking happens in the
Collection tab's Set column.

Build one per set. Do the counts add up to the number of cards on the
Collection tab? Eyeball it — or make the check a stat of its own.

### Average pack cost

Question 6. Same three slots as `SUMIF`, different verb: `AVERAGEIF`. You have
everything you need — the look-range and match are the same as your pack total;
only the function name and what it does to the matched rows change.

Sanity-check the answer: does it look like what a pack actually costs when
you're standing at the shop?

### The stretch: spent this month

Every criterion so far matched a word exactly. "This month" is different — it
means "every row whose date is on or after the 1st." The criteria slot can hold
a comparison, and building one is the last new formula move of the day.

<details>
<summary>Stuck? Start here</summary>

The condition you want is "date is on or after the first of this month." The
criteria slot has held text so far — `"Pack"` — and it turns out it can hold a
comparison written as text, too. The question is how to write "on or after" and
a real date in one criterion.

</details>

<details>
<summary>The concept, named</summary>

Comparisons are written as text: `">="` means "on or after." But a date typed
*inside* text is ambiguous — different countries read 8/1 two different ways.
`DATE(year, month, day)` builds an unambiguous date value, and the `&` operator
glues text and values together into one criterion. Text, glue, date.

</details>

<details>
<summary>The specific piece</summary>

The criterion is `">="&DATE(2026,8,1)` — with your own year and month. The rest
of the formula is the same shape as every `SUMIF` today: look at the Date
column, match with that criterion, add up the Cost column.

One honest footnote: this counts everything from the 1st onward, which equals
"this month" as long as no purchase is dated in the future. If you ever
pre-enter future purchases, this stat will need a second condition — a problem
for the day you have it.

</details>

### When a number comes out wrong

Maybe you're here because the check row disagreed, or a set count came up short,
or the fronted total looked too small. Good — this is the real thing, and it's
the most useful failure in the whole module.

(If every number checked out: your typing has been unusually consistent.
Borrow the failure anyway — you need to have run this hunt before the day it
happens for real. Pick one Purchases row and change `Pack` to `Packs`: the
pack total drops, the check row disagrees. Now hunt it as if you didn't know.)

The method comes straight from [When you're stuck](../../../../reference/when-youre-stuck.md):
make it fail on demand, then shrink. The failure is already on demand — the stat
is wrong every time you look. So shrink: instead of asking about the whole
column, ask about *one row*.

Pick a row you're certain should match — one you believe says Pack. In any empty
scratch cell, type a comparison against exactly that one cell:

```
=Purchases!C7="Pack"
```

(your row number, not 7). A comparison is itself a formula, and it answers TRUE
or FALSE — the smallest test there is. TRUE: that row is innocent, pick another
suspect. FALSE, while your eyes insist the cell says Pack: you've found it, and
now you look *closely*. Click into the cell as if to edit it. Does the cursor
park one space past the last letter? That's a trailing space — invisible when
reading, fatal for matching. Is it `Packs`? A misspelling? The formula matched
exactly what you asked; the cell just doesn't contain what you thought.

Fix it by hand: retype the value, watch the stat snap right, delete your scratch
cells. Write the wall entry in your logbook — what stopped you, what it actually
was.

Now the honest part. You fixed that cell, but nothing stops tomorrow's you from
typing `packs ` with a trailing space into a new row, and the stats will go
quietly wrong again — no error, no warning, just a number that's short. Cleaning
is not prevention. Prevention is the rest of this session, and it starts with a
decision, not a menu.

### Decide the law

Before touching any menus, write two lists in your logbook.

The first is already decided — the Type column has used four values all along:
**Pack, Box, Single, Supplies**. Write them anyway; they're about to become
law.

The second is yours to design: every set you collect, each spelled the one way
it will be spelled forever. `Base Set` or `Base Set (1999)`? Full name or the
short one everyone actually says? Take the extra minute — this list will
outlive any single row of your data, and every future formula, dropdown, and
stat will spell things exactly the way you write them now. Deciding which
values a column may contain is not busywork before the real task. It *is* the
real task: choosing what's allowed to exist in your data is called designing
the data, people do it for a living, and right now you're doing it — in work
clothes.

### Build the Sets list

The Sets list needs to live in cells so a rule can point at it. Put it on the
Stats tab, off to the right of your stats with an empty column as a gap: a
header saying `Sets`, then one set name per row beneath it, straight from your
logbook.

Plain-looking, but new in kind: this is the first range in your tracker that
exists not to record events, but to be *pointed at* — reference data, the
official spellings, in one place.

### Put Type under contract

Select the Type column's data cells on the Purchases tab (from the first data
row down). Open the Data menu, find Data validation, and add a rule. The three
decisions:

- **Which cells:** the Type column data you selected.
- **What rule:** a dropdown whose values are exactly your four — Pack, Box,
  Single, Supplies — typed into the rule.
- **What happens on failure:** reject. Not warn — reject. For this column
  there is no fifth type, so anything else is by definition a mistake.

Save the rule and look at your Purchases tab. The Type cells have become
pickable — chips or a small arrow, depending on the year — and typing is now
optional where clicking will do.

### Archaeology

Here's the satisfying part. The moment the rule landed, Sheets checked every
existing cell in that range against it — and marked the ones that fail. Scan
the Type column for marked cells (a small colored flag in the corner of the
cell; hover one and Sheets explains its objection).

Compare the count against your logbook prediction. Then repair each one:
click the cell, pick the right value from the dropdown, watch the mark
disappear. Every one of those marks was a stat already wrong or waiting to be —
the hunt you ran an hour ago, mass-produced.

When the column is clean, look at the check row: agreeing — and now it isn't
luck. It's enforced.

### Put Set under contract — from the list

Same move on the Collection tab's Set column, with two differences.

First: instead of typing values into the rule, choose the rule kind that reads
its allowed values **from a range** — and point it at your Sets list on the
Stats tab. (Why from a range here, when Type's values went straight into the
rule? Set the question aside; it gets answered once you've used both for a
while — or work it out now: what's different about the two lists?)

Second: on your first pass, deliberately set the failure behavior to **show a
warning** instead of reject. Then feel the difference:

- Type a junk set name — `zzz` — into some Set cell. It goes in. The cell gets
  flagged, but the mistake is now *in your data*, muttering to itself.
- Change the rule's failure behavior to **reject**, and try the same junk
  again. Refused at the door, with a message, before it ever touches the data.

That's the whole difference: a warning documents the mistake; a rejection
prevents it. Leave the rule on reject, clean up your `zzz`, and repair
whatever old Set inconsistencies the rule flagged — same archaeology as
before.

### Show it

Enter your next real purchase using only the chips — or better, hand the
keyboard to someone else and say "add a pack for me." Watch the sheet steer
them: the Type column offers exactly four choices, the Set column offers your
official list, and there is no way to fumble a category. Data entry in your
tracker now behaves like an app, because you built what apps are built from.

---

## Break it on purpose

The first breaks a working formula — freely undoable; read what happens, put
it back. The last one needs a named version first.

**Drop the quotes.** Take your pack total and remove the quotes around the
criterion: `=SUMIF(Purchases!C2:C, Pack, Purchases!D2:D)`. Read the whole error,
every word. In a formula, a bare word isn't text — Sheets takes it as the *name
of something*, a range or a function, goes looking for something called Pack,
and tells you it couldn't find it. The double quotes are what mark
text-to-match. Put them back.

**A new set arrives.** Sooner or later you'll start collecting a set that
isn't in your Sets list. Simulate it now: pick any set name you don't collect
yet and try to type it directly into a validated Set cell. Rejected — the
contract doesn't know it yet, and the sheet has no way to tell a new truth
from a typo.

The right order: go to the Sets list first, add the new name there, then come
back to the cell — the dropdown now offers it. (If the new name doesn't
appear, check whether your rule points at a range that includes the row you
just added — a rule aimed at a too-short range is the usual cause.) Remove
your test entries when done.

Notice that those were two different kinds of act. Adding to the Sets list
changed *the rules* — what's allowed to exist. Picking from the dropdown
recorded *a fact* — what happened. Real systems keep those two separate on
purpose; the small friction of "add it to the list first" is that separation,
felt, and you'll meet it again in every database you ever touch.

**Let the contract lapse.** First, the standard pre-experiment move: File →
Version history, name the current version. Now select the Type column, open
Data validation, and remove the rule entirely. Type `Packs` into one row's
Type. No mark. No complaint. Now look at the check row: pack total short,
disagreement — quietly, *again*. The disease from the hunt came straight back
the moment the contract lapsed, because the formulas were never protecting
themselves; they were only trusting.

Put it right: fix the cell, re-create the rule (or restore your named
version), confirm the check row agrees. Validation isn't a one-time cleanup —
it's a standing guard.

---

## What just happened

Your formulas changed jobs today. Until this session they computed cells; now
they answer questions about tables. The sentence you learned to type — "add up
the rows where..." — is one of the most useful sentences in all of computing,
and the criteria slot is what makes it a sentence: exact words, comparisons,
dates. One shape answered six different questions, and the same shape will
answer hundreds more.

The Stats tab itself is a new kind of thing for your tracker: a **derived
view**. Every number on it is computed and none is typed. Add a purchase
tomorrow and the stats move on their own — try it: type a test row into
Purchases and watch column B, then remove it.

And the hunt taught you the fine print. All of it rests on a quiet assumption:
the formulas *trust the categories*. "Garbage in, garbage out" gets said like a
shrug, but you've now watched every gear of the mechanism. `SUMIF` never
complains about a value that matches nothing — it leaves it out, silently, and
hands you a number that looks just as confident as a right one. Garbage enters
at typing time, exits at reading time, and in between: silence.

What validation changed is not whether mistakes happen. It's **when and how
loudly**. Without the rule, a mistake is silent when written and silent when
read. With the rule, it's loud at the exact moment of writing — refused at the
door, in front of the one person who knows what they meant and can fix it in
two seconds. Moving failure from silent-and-late to loud-and-early is the
whole game, and not just in spreadsheets: it's why every app, every website,
every form you have ever used puts a dropdown on anything it possibly can.
You've clicked ten thousand of them. Now you know what they were all for.

And the two rules you wrote weren't configured the same way, for a reason
worth noticing. Type's four values went straight into the rule because that
list is *closed* — there is no fifth kind of purchase coming. Sets points at a
range because that list *grows* — new sets keep arriving, and a rule that
reads from a range grows with the list, no rule-editing required. The columns
now have a contract, and deciding its terms was designing the data. You
designed for your data's future, which is most of what data design is.

---

## Go further

- Invent one stat of your own — a question about your collection nobody assigned
  you. Build it, and write in your logbook why it's worth knowing. One stat you
  can defend is worth ten you copied.
- `MAXIFS` and `MINIFS` exist — same family, different verbs. Find them in the
  function list and answer two questions worth knowing: what was your single
  most expensive purchase, and what's the cheapest pack you ever bought?
- Genuinely open: after everything this session taught, the Notes column on
  Purchases is still free text — and that's *correct*. When is free text the
  right choice? What gets lost when a column is validated, and for the next
  new column you ever add, how would you decide which side of the line it
  belongs on?
- Genuinely open: what question about your collection can the data *not*
  answer, no matter how many formulas you write? And is that because a column
  is missing — or because it's the kind of question no column could ever hold?

---

## What you have now

- A Stats tab answering at least six real questions — spend in total, this
  month, by type, fronted, cards per set, average pack cost — every number
  computed live from the tables, none typed
- The `SUMIF` family and its criteria slot — "add up the rows where..." — plus
  `&` and `DATE` for conditions that compare
- A wrong number you hunted to its cause with a one-row test, fixed by hand —
  and the lived knowledge that hand-fixing is not prevention
- A Type column under contract: four official values, dropdown-picked,
  everything else rejected at typing time — and a Set column fed from an
  official Sets list on the Stats tab, the tracker's first reference data
- A check row that agrees by enforcement, not by luck: two claims about the
  same fact, agreeing in public, permanently
- Data entry you can hand to anyone: the sheet itself now steers them right
