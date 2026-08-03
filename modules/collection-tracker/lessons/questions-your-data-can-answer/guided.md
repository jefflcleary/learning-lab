# Questions your data can answer

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your tracker holds two tables of facts now: every card that matters and every
purchase you've made. Facts are not the same as answers. "How much have I
actually spent on all this?" is not written in any cell — it's spread across
every row of the Purchases tab, waiting for something to gather it up. Same for
"how much of that went on packs?", "how many cards do I have from each set?",
and the one left standing from the day you built the Purchases tab: "how much of
it was fronted?"

This session the formulas change jobs. Until now they've computed cells — a
gain, a total, a balance. Today they answer questions about whole tables. You'll
build a Stats tab where every number is the answer to a question you wrote down
first, and where nobody types the numbers: they're computed from the tables,
live, and they move by themselves when the tables change.

One warning made in advance, because it's half the lesson: somewhere along the
way, a number will probably come out wrong. When it does, nothing is broken —
and finding out why is the most valuable thing that happens today.

---

## Before you start

You need:

- **A Purchases tab recording every buy, its cost, and who paid.**
  [Every pack you open](../every-pack-you-open/guided.md) builds it, including
  formulas that reach across tabs. Quick check: the Purchases tab has real rows,
  and you can read a reference like `Purchases!D2` and say which cell it means.
- **A Collection tab with cards, sets, costs, and values.**
  [What is it all worth?](../first-ledger/guided.md) builds it. Quick check: the
  Set column has a set name on every row.

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

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- How much have you spent in total, ever? Write the guess before any formula
  answers it.
- Which Type — Pack, Box, Single, Supplies — has eaten the most money, and
  roughly how far ahead of second place is it?
- If you add up the four Type totals, will they *exactly* equal the overall
  total? Yes or no, and why.
- How many cards do you have from your biggest set?

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
column B. The rest of this session is filling column B.

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

That number is worth a pause. If you've built the payback ledger, you've been
paying this off; if you haven't, this is the first time the tracker has told
you the size of it.

### Count the collection: cards per set

Question 5 lives on the other table. One row per set on your Stats tab: "Cards
from Base Set", and so on for each set you collect. This is counting, not
adding — `COUNTIF`, two slots, no numbers column. The looking happens in the
Collection tab's Set column.

Build one per set. Do the counts add up to the number of cards on the Collection
tab? Eyeball it — or make it a stat of its own if you want the check to be
permanent.

### Average pack cost

Question 6. Same three slots as `SUMIF`, different verb: `AVERAGEIF`. You have
everything you need — the look-range and match are the same as your pack total;
only the function name and what it does to the matched rows change.

Sanity-check the answer: does it look like what a pack actually costs when
you're standing at the shop?

### The stretch: spent this month

Every criterion so far matched a word exactly. "This month" is different — it
means "every row whose date is on or after the 1st." The criteria slot can hold
a comparison, and building one is the last new move of the day.

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

(If every number checked out: your typing has been more consistent than most
people's ever is. Borrow the failure anyway, because you need to have run this
hunt before the day it happens for real: pick one Purchases row and change
`Pack` to `Packs`. Watch two stats move at once — the pack total drops and the
check row now disagrees. Now hunt it as if you didn't know.)

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
is not prevention. Prevention is the next session:
[Keeping the data clean](../keeping-data-clean/guided.md).

---

## Break it on purpose

Both of these are freely undoable — break a working formula, read what happens,
put it back.

**Drop the quotes.** Take your pack total and remove the quotes around the
criterion: `=SUMIF(Purchases!C2:C, Pack, Purchases!D2:D)`. Read the whole error,
every word. In a formula, a bare word isn't text — Sheets takes it as the *name
of something*, a range or a function, goes looking for something called Pack,
and tells you it couldn't find it. The double quotes are what mark
text-to-match. Put them back.

**Ranges that don't line up.** Take a working type total and cut the add-range
short: change `Purchases!D2:D` to `Purchases!D2:D10` while the look-range stays
open-ended. Watch closely what you get — it may be an error, or it may be a
number that looks plausible and was computed from cells you never named. Either
way the lesson is the same, and it's worth having seen once: the two ranges are
read *row for row*, matched by position, and they have to line up. A formula
that gets this wrong doesn't always announce it. Restore the open range.

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

And the hunt taught you the fine print. All of this rests on a quiet assumption:
the formulas *trust the categories*. `SUMIF` never complains about a value that
matches nothing — it leaves it out, silently, and hands you a number that looks
just as confident as a right one. Your stats will stay true exactly as long as
the categories stay honest. Making that automatic — instead of a promise to
type carefully forever — is precisely where the next session goes.

---

## Go further

- Invent one stat of your own — a question about your collection nobody assigned
  you. Build it, and write in your logbook why it's worth knowing. One stat you
  can defend is worth ten you copied.
- `MAXIFS` and `MINIFS` exist — same family, different verbs. Find them in the
  function list and answer two questions worth knowing: what was your single
  most expensive purchase, and what's the cheapest pack you ever bought?
- Genuinely open: what question about your collection can the data *not*
  answer, no matter how many formulas you write? And is that because a column
  is missing — or because it's the kind of question no column could ever hold?

---

## What you have now

- A Stats tab answering at least six real questions — spend in total, this
  month, by type, fronted, cards per set, average pack cost — every number
  computed live from the tables, none typed
- A check row that compares the per-type totals against the grand total: two
  claims about the same fact, agreeing in public
- The `SUMIF` family and its criteria slot — "add up the rows where..." — plus
  `&` and `DATE` for conditions that compare
- A wrong number you hunted to its cause with a one-row test, fixed by hand —
  and the knowledge that hand-fixing is not prevention, which is where
  [Keeping the data clean](../keeping-data-clean/guided.md) picks up
