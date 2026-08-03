# The payback ledger

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Somewhere in your Purchases tab are rows marked **Fronted** — packs and boxes
someone else paid for, on the understanding that the money comes back. Right now,
what you still owe lives in two memories: yours and theirs. Memories drift. Sooner
or later the two of you will remember two different numbers, and there will be no
way to settle it.

This session replaces both memories with a **ledger**: a list of money events in
date order — what was fronted, what you've paid back — plus one computed column
that always answers "so where does that leave us?" By the end, you and whoever
fronted the money can look at the same tab and agree on a single number, down to
the cent. The formula pattern that makes it work — each row building on the row
above — is one you'll use for the rest of your spreadsheet life.

If nobody has ever fronted you money, this session still works: you'll build the
tab empty, ready for the first time someone does.

---

## Before you start

You need:

- **A Purchases tab recording every buy, its cost, and who paid.**
  [Every pack you open](../every-pack-you-open/guided.md) builds it. Quick check:
  open your Collection Tracker, click the Purchases tab, and confirm the Paid by
  column says Me or Fronted on every row.
- **Formulas and fill-down.** [What is it all worth?](../first-ledger/guided.md)
  establishes both. Quick check: you can say what the Gain column on your
  Collection tab computes, and you've filled a formula down a column by dragging
  the small square at the corner of a selected cell.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A new Payback tab: every fronted purchase carried over, every payment recorded,
  and a Balance column that recomputes itself whenever a row changes
- The running-balance formula pattern — each row building on the row above —
  built by you and tested by you
- One number that you and whoever fronted the money have looked at together and
  agreed on

---

## New tools

Nothing to install today, and only one genuinely new idea.

**A running balance** is a column where each row's formula uses the answer from
the row above it. You've written formulas that combine cells on their own row (the
Gain column does exactly that); today's formulas reach one row up. How that works
is the puzzle of the session, so it stays a puzzle for now.

**Where formula help lives**, for this and every session from here on: type `=`
and a function name into any cell and Sheets shows a help card for that function
as you type. The complete catalog is the Google Sheets function list in Google's
Docs editors help center — search the web for "Google Sheets function list" and
it's the page Google itself publishes. Today needs no new functions at all; the
whole trick is arithmetic and one new kind of cell reference.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Before you carry anything over: how much do you think you still owe, in total?
  Write an actual number. At the end of the session you'll find out how far off
  memory was.
- Suppose a payment row gets added in the middle of the ledger, on its correct
  date. What should happen to every balance below it?
- Months from now this ledger will be much longer. What does the bottom number do
  as rows are added — and what would the whole Balance column look like, read top
  to bottom, if the payback is going well?

---

## The work

### Make the Payback tab

At the bottom of the spreadsheet, find the control that adds a new tab (the small
plus). Add one and rename it **Payback** — double-clicking a tab's name lets you
retype it.

Give it headers in row 1: `Date`, `What`, `Borrowed`, `Paid`, `Balance` — columns
A through E. Format the three money columns (Borrowed, Paid, Balance) as currency,
the same move you've made before.

### Carry the debts over

Go through the Purchases tab and find every row where Paid by says **Fronted**.
Each one becomes a row here: its date, its item as What, its cost as **Borrowed**.
Leave Paid empty on those rows. Keep the rows in date order.

One thing matters more than speed: every fronted row makes the trip. The number
at the bottom of this ledger is only worth trusting if it's built from everything
— a ledger with missing rows isn't a record, it's a story. If you're not sure
about a row, carry it over and mark your doubt in the What column; you can settle
it later, together.

### Record what you've already paid

If you've already handed any money back — allowance you passed along, birthday
money, chore money, whatever it actually was — each of those is a row too: the
date, a short What (`allowance`, `birthday money`), the amount in **Paid**, and
Borrowed left empty. In date order with everything else.

If nothing's been paid back yet, skip this. The column is ready for when it is.

### The running balance

Now the heart of the session. The goal: a Balance column where every row answers
the question *after this row, what's still owed?*

The first data row is easy, and you get it for free: there's no history above it,
so its balance is just its own row — in E2, type `=C2-D2`. (An empty cell counts
as zero in arithmetic, so rows that only borrow or only pay need nothing special.)

Row 3 is the puzzle. Its balance has to account for everything that happened
above it *and* its own row. Write the formula for E3 — and before you resort to
adding up every cell by hand, think about what's already sitting on the sheet.

<details>
<summary>Stuck? Start here</summary>

You could write `=C2+C3-D2-D3` in row 3. And something longer in row 4, and
longer again in row 5, forever. Before you do: one cell on this sheet already
holds most of that arithmetic, finished and up to date. Which cell?

</details>

<details>
<summary>The concept, named</summary>

This pattern is called a **running balance**: each row's answer is built from
the answer above it. Row 3's balance needs exactly three ingredients — the
balance so far, this row's Borrowed, this row's Paid. And a formula can use E2
like any other cell.

</details>

<details>
<summary>The shape, with one blank</summary>

E3 is `=____ + C3 - D3` — the blank is the cell that already holds the balance
so far. Fill it in and press Enter.

Then fill it down: select E3, grab the small square at its corner, and drag to
the bottom of your rows. Before moving on, click three or four of the filled
cells and read what fill-down actually wrote in each one. It's not the same
formula every time — look closely at the row numbers.

</details>

When the column is full, test it the way you'd test anything: change one early
Paid amount and watch every balance below it recompute instantly. Change it back.
The bottom cell of the Balance column is now the answer to the whole question:
that's what you still owe, today, according to every fact in the ledger.

Check it against the number you predicted in your logbook.

### Show it

This tab was built for two people. Sit down with whoever fronted the money and
walk them through it: every fronted purchase, every payment, and the balance at
the bottom. If they remember a purchase that's missing, add the row while they
watch — the balance updates in front of both of you, which is worth more than any
amount of explaining.

What you're after isn't the number itself. It's agreement: from today, there is
one number, both of you can see how it's built, and nobody argues from memory
again.

---

## Break it on purpose

Before experimenting, protect the working state: in the File menu, find Version
history and name the current version — the same move this tracker gets before
every experiment.

**Insert a row into the middle of the chain.** Say you discover a forgotten
fronted purchase from months ago. Right-click a row number in the middle of the
ledger and insert a row above it, then type the entry in: date, what, amount
borrowed. Now read the Balance column, top to bottom. Where's the hole? Click the
Balance cell just *below* your new row and read its formula in the formula bar —
which row is it pointing at?

Here's what happened: when rows move, formulas follow the cells they were
pointing at. The old chain didn't break — every old formula still points at the
same neighbors it always did. But your new row was never part of the chain, and
nothing joins it in automatically. The fix is the same move that built the
column: select the last correct Balance cell above the hole and fill down from
there to the bottom. Fill-down rewrites the whole chain, new row included. Check
that the bottom number changed by exactly the new row's amount.

**Delete a payment.** Right-click the row number of a Paid row and delete the
entire row. Watch the Balance column: every balance below jumps back *up* by that
amount. The debt came back — because the ledger only knows what its rows say, and
you just removed a fact. Undo it (Edit menu → Undo, or Ctrl+Z — Cmd+Z on a Mac)
and watch the payment count again.

That's not a flaw. A ledger that recomputes from its rows can always be trusted
to say exactly what the rows say — which is why the rows, not the balance, are
the thing you keep honest.

---

## What just happened

You built a **ledger**: two things stapled together. The first is an append-only
list of facts — rows that get added in date order and never rewritten. The second
is a derived answer — the balance, computed from the facts and never typed by
hand. Keep the facts honest and the answer takes care of itself.

You have seen this exact structure before, even if you've never looked closely: a
bank statement is a list of money events with a running balance down the
right-hand side. That is literally what a bank account *is* — this tab, at scale,
with more zeros. You've now built the thing banks print.

The words for what the tab holds, now that you've seen each one: money owed is a
**debt**. The amount still owed right now is the **balance**. Each **payment**
shrinks it. And paying down a number you can see is a different experience from
paying down a number you remember — the column trending toward zero is visible
progress, and both sides are watching the same column.

One layer deeper on the formulas. Fill-down worked because cell references are
**relative** by default: `E2` inside the row-3 formula doesn't really mean "cell
E2" — it means "column E, one row up from here." That's why every copy pointed at
its own previous row, and it's what you saw when you read the filled-down cells.
Sometimes you need the opposite: a reference that refuses to move when copied. A
dollar sign pins it. For comparison, now that your column works — this formula,
put in E2 and filled all the way down, produces the identical balance:

```
=SUM(C$2:C2)-SUM(D$2:D2)
```

Read it slowly: each range starts at row 2 — pinned there by the `$` — and ends
at the current row, which travels. So every row sums *everything borrowed so far*
minus *everything paid so far*. Two shapes, one truth. The `$` will come back
again and again from here on; today was your first sight of it.

---

## Go further

- Select the Date and Balance columns (click the Date column, then hold Ctrl —
  Cmd on a Mac — and click Balance), then try Insert → Chart. Whatever comes out,
  it's a picture of a debt shrinking — or not — over time. Don't polish it; just
  look at the line and see whether it's heading where you want.
- On a **copy** of the spreadsheet (File → Make a copy — experiments that rewrite
  history belong on copies): what would it mean if whoever fronted the money
  charged **interest** — say, 5% of the outstanding balance, added as a new
  Borrowed row at the end of each month? Build a few months of it and pay it down
  slowly. What happens to the balance when the payments are smaller than the
  interest rows? This is the mechanism inside every loan in the world, and the
  copy is a place to watch it run with nothing at stake.
- Genuinely open: either of you could have just kept the balance in your head.
  Why does both sides trusting *one* number matter more than what the number
  actually is? What breaks between people when there are two numbers — and does
  anything you built today work if only one side believes it?

---

## What you have now

- A Payback tab — Date, What, Borrowed, Paid, Balance — with every fronted
  purchase carried over and every payment recorded
- A running Balance column built on the pattern of each row using the row above,
  filled down, and tested by changing history and watching it recompute
- First contact with absolute references — the `$` that pins part of a reference
  in place — with much more of it to come
- One number that you and whoever fronted the money have agreed on, in front of
  the tab that proves it
