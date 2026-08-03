# Asking in QUERY

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every question you've asked the tracker so far took one formula per answer: a
SUMIF for this total, a COUNTIF for that count. Useful — but each formula asks
exactly one question, and a new question means a new formula.

Sheets contains something bigger: a function called QUERY, whose argument is a
sentence in a small question language. One line can say "show me these columns,
only the rows where this is true, grouped by that, biggest first" — and the
answer arrives as a whole table. This session is about learning that language the
way you'd learn any real tool: by reading its actual documentation, asking
questions you already know the answers to, and checking every result against a
number you trust.

---

## Before you start

You need:

- **A Collection tab of clean card rows** — begun in
  [What is it all worth?](../first-ledger/guided.md). Quick check: every row has a
  Card, a Set, a Cost, and a Value.
- **A Purchases tab recording every buy** — built in
  [Every pack you open](../every-pack-you-open/guided.md). Quick check: each
  purchase has a Type and a Paid-by value.
- **Categories that match exactly**, enforced by dropdowns — set up in
  [Keeping the data clean](../keeping-data-clean/guided.md). Quick check: click a
  Type cell and a dropdown appears.
- **Comfort with criteria formulas** — SUMIF and COUNTIF, from
  [Questions your data can answer](../questions-your-data-can-answer/guided.md).
  Quick check: you can write a SUMIF that totals one category without looking one
  up.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- Read the complete documentation of a query language — all of it — and used four
  of its clauses
- Asked the tracker four real questions in that language, each answer verified
  against a number you computed by another road
- Broken the language on purpose three ways and read what it said back
- A questions tab where typing one sentence produces a table as its answer

---

## New tools

**QUERY** is a Sheets function: `=QUERY(range, "question")`. The first argument
is a range — usually another tab's columns, like `Purchases!A:F`. The second is a
sentence, in quotes, written in QUERY's own language: clauses such as `select`,
`where`, `group by`, and `order by`, combined in one line. There is also an
optional third argument for saying how many header rows the range has.

Three orientation facts, so the language doesn't fight you:

- Inside the sentence, columns are addressed by their **column letter in the
  sheet being queried** — `A`, `B`, `C` of that tab.
- Text values take single quotes inside the double-quoted sentence
  (`where B = 'Charizard'`); numbers go bare (`where E > 20`).
- The answer **spills**: it fills the cells below and beside the formula, and it
  errors if that space isn't empty. Make a fresh tab for this session — call it
  Questions — so answers have room.

The documentation is the **QUERY function** help page in Google's Docs editors
help center at [support.google.com/docs](https://support.google.com/docs) —
search the help center for "QUERY function." That page documents every clause
with examples, and today it is your primary text. This lesson will not re-teach
what it says.

Two column maps you'll be addressing, from your own tracker:

- Collection: A Card, B Set, C Date, D Cost, E Value, F Gain
- Purchases: A Date, B Item, C Type, D Cost, E Paid by, F Notes

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Before opening the help page: how many clauses do you think a question language
  needs? An actual number.
- Take the question "every purchase someone else fronted, newest first" and
  underline the working words: which one filters? Which one sorts? Which ones
  choose the columns you'd want to see?
- What do you think happens if a query names a column that isn't in the range it
  was handed?

---

## The work

Each goal below is a question stated in English, and each comes with its own
proof. The pattern is deliberate: when a new tool and an old tool reach the same
number by different roads, you can trust the new tool. That's how it's done with
every new tool, forever.

### Read the surface

Open the QUERY function help page and read it top to bottom. You are not hunting
for anything — you are seeing the size of the language before using it, the same
way you once read every server setting or every line of a file.

Done when: every clause the page documents is listed in your logbook with a
one-line guess at its job, and you've checked your clause-count prediction.

### Your best cards, best first

The question: every card worth more than some amount — pick an amount that
doesn't leave the answer empty — showing card, set, and value, most valuable at
the top.

Done when: the query returns exactly those columns in that order of value; the
top row is the card you already know is your best; and a COUNTIF written next to
the query agrees with how many rows the query returned.

### Total spent per Type

The question: for each type of purchase, the total spent — one query, one table,
every type at once.

Done when: each total in the query's answer matches a SUMIF for that same type.
Your Stats tab may already hold some of these numbers; for any it doesn't, write
a fresh SUMIF beside the query. Two roads, same truth, every row.

### Fronted purchases, newest first

The question: every purchase someone else fronted — date, item, and cost, newest
at the top. "Fronted" here means whatever exact value your Paid-by dropdown uses;
the query has to match it precisely, and thanks to the dropdown, it can.

Done when: the newest fronted purchase is the first row; and the costs in the
answer add up to the same total your payback ledger's Borrowed side implies. If
those two numbers disagree, one of your ledgers has a story to tell — finding out
which is part of the work.

### If you're brave: average pack cost per month

The question: for pack purchases only, the average cost, grouped by month. This
one combines everything — filtering, grouping, an aggregate that isn't sum — plus
a scalar function for pulling the month out of a date, which the help page's
linked reference covers.

Done when: the query returns one row per month; and you have confirmed one
month's average by hand — sum divided by count for that month. One warning,
built into the goal: check the month *labels* against a month you know. The
language has a surprise waiting there, and checking against a known answer is
exactly how surprises like it get caught.

---

## Break it on purpose

All of this happens on the Questions tab; none of it touches your data.

**Misspell a clause.** Take a working query and wound one clause — `selct`,
`order byy`. Read the entire error: hover over or click the error in the cell
until you can see the whole message. It tells you what the parser was attempting
and where it gave up. QUERY's errors are written to be read, which makes them
rare and valuable — read every word before fixing the spelling.

**Ask for a column that isn't there.** Point a working query at a column letter
outside the range you gave it. Read the whole error again, and notice that it
names the thing it couldn't find. Put the real letter back.

**Lie about types.** Two separate edits, one at a time. First, put quotes around
a number in a `where` — turning an amount into text. Second, take the quotes off
a text value. Read both errors in full. The language keeps numbers and text
strictly apart, and when a query confuses them it says so: quoted means text,
bare means a number or a column name. Undo both edits and watch the answer
return.

---

## What just happened

You just used a query language.

The shape you've been writing all session — select these columns, where this is
true, group by that, order by this — is the grammar of **SQL**, the language
professionals use to question databases every single day. Banks, games,
hospitals, every app with an account system: behind each one is someone writing
sentences of exactly this shape against tables not so different from yours. QUERY
is that grammar, borrowed into a spreadsheet. When you meet the real thing
someday, it will not be a stranger.

It's also worth seeing what changed since the criteria formulas. A SUMIF asks one
question and hands back one number; ten questions cost ten formulas. QUERY is not
a bigger formula — it's a *grammar*: the same four or five clauses recombine into
any question you can phrase. Learning a handful of clauses beat learning forty
functions, and that trade — grammar over vocabulary — is the reason query
languages exist.

And underneath it all, the contract you signed in the data-cleaning session paid
off again. Your fronted-purchases query returned the truth only because every
fronted purchase says exactly the same word — the dropdowns guaranteed it. Clean
categories made SUMIF trustworthy, then made the stats tab trustworthy, and now
they make a whole question language trustworthy. Good data keeps paying compound
interest; that's why the cleaning came first.

---

## Go further

- The `pivot` clause turns an answer into a grid — spend per type *per month*,
  one line. The help page shows it. Which of your questions wants a grid?
- Query answers arrive with machine-made column headings. The `label` clause
  renames them. Take your best query and make its answer read like something
  you'd hand a person.
- QUERY can question **another spreadsheet entirely**, through a function called
  IMPORTRANGE — it has its own page in the same help center, by name. Expect a
  permission step the first time two files meet, and expect one more surprise
  about how columns get addressed. Both are findable, and finding them is the
  exercise.
- Genuinely open: QUERY can do everything ten SUMIFs do, in one line — so why
  would anyone still use ten SUMIFs? There are real answers to this. Keep using
  both for a few weeks and see which ones you discover.

---

## What you have now

- The complete clause surface of QUERY, read once and listed in your logbook
- Four questions asked in a query language, every answer verified against a
  number reached by another road
- The habit of reading a query error all the way through before touching anything
- A Questions tab where a typed sentence produces a table — ready for any
  question the collection raises next
