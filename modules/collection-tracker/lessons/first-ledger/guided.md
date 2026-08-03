# What is it all worth?

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every collector gets asked the same question sooner or later: what's all that
actually worth? Most collectors answer with a shrug, or a number they made up in
the moment. By the end of this session you'll answer it by turning a screen
around — a table of your best cards with a total at the top that is correct
right now, because it recalculates itself every time anything changes.

The tool is Google Sheets, a spreadsheet that runs in your browser.
Spreadsheets run half the world's businesses, and the reason is the thing you'll
see with your own eyes today: a cell in a spreadsheet doesn't have to store a
number — it can *compute* one, from other cells, and recompute the moment those
cells change. A document that does arithmetic for you, forever, is a different
kind of thing from a list on paper. Today it starts doing arithmetic about your
cards.

---

## Before you start

You need:

- **A web browser and a Google account.** The account is free. If you don't
  have one, it's created from the "Create account" option on any Google sign-in
  screen — the sign-up asks for personal details and a birthdate, and depending
  on your age an adult may need to create it or approve it. Quick check: go to
  `sheets.google.com` and sign in; you should land on a page offering to start
  a spreadsheet.
- **A collection you care about.** Real cards, yours. The tracker is only
  interesting if the data is true.
- **A rough idea of what your cards are worth.** An honest guess per card is
  fine today, and so is a quick search for the ones you're curious about.
  Finding prices properly is its own project, for later. Today, truth-ish
  numbers you believe are plenty.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A spreadsheet named Collection Tracker holding your best cards — name, set,
  what you paid, what each is worth
- A Gain column that computes itself, and totals that answer "what is it all
  worth?" in one glance
- Watched the whole sheet update on its own when you changed one number — the
  thing spreadsheets are actually for
- Broken your ledger twice on purpose, read both errors, and fixed everything —
  with a named safety-net version you can always return to

---

## New tools

**Google Sheets** is a free spreadsheet that runs in the browser — no install.
It lives at `sheets.google.com`, and it saves your work to your Google account
automatically as you type; there is no save button, and you'll never need one.
A spreadsheet is a grid of cells. Columns have letters, rows have numbers, and
every cell is named by the two together — `B3` is column B, row 3. Keep an eye
on the small box at the left end of the bar above the grid: it always shows the
name of the cell you're standing in.

Its documentation lives in two places you'll use all module: as you type a
formula, the sheet itself pops up a help card explaining the function under
your cursor, and Google's Docs editors help center (support.google.com/docs)
has a full page on every function and feature. When a menu item in this lesson
isn't where the text says — menus get rearranged now and then — the item still
exists under the same name; look for the name.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Later you'll type `=E2-D2` into a cell and press Enter. What will the cell
  show afterwards — the text you typed, or something else?
- Later still, you'll change the number in E2. Will that other cell update on
  its own, or will you have to do something to it?
- Guess the total value of the cards you're about to enter. An actual number —
  the sheet is going to check you.
- How many of your cards do you expect are worth *less* than you paid for them?

---

## The work

### A blank sheet with your name on it

Go to `sheets.google.com` and start a blank spreadsheet. Two names to set
before anything else:

- The file's name: at the top left it says "Untitled spreadsheet." Click that
  and name it **Collection Tracker**.
- The tab's name: at the bottom of the screen is a strip of tabs — one so far,
  called Sheet1. A tab is one grid; a spreadsheet file can hold several, which
  will matter a great deal later in this module. Double-click the tab and
  rename it **Collection**.

Now the headers. Type these six words into row 1, one per cell, A1 through F1:

```
Card    Set    Date    Cost    Value    Gain
```

### Your best cards go in

Pick your 10 to 20 best cards — the ones you'd actually want an answer about —
and enter one per row, starting in row 2:

- **Card** — its name.
- **Set** — the set it's from.
- **Date** — when you got it. Approximate is fine; type it like a date and the
  sheet will read it as one.
- **Cost** — what you paid for it. If you pulled it from a pack, **leave Cost
  blank** — the card itself cost you nothing directly. (The pack cost money, of
  course. That truth gets its own table in a later session; today is about the
  cards.)
- **Value** — what it's worth today, by your honest guess or a quick search.
- **Gain** — leave the whole column empty. It's about to be different from
  every other column on the sheet.

One thing worth noticing while you type: numbers and dates snap to the right
side of their cells, words sit on the left. That's not decoration — it's the
sheet telling you what it understood. A "number" hugging the left edge means
the sheet read it as words, which will matter before this session is over.

### A cell that computes

You made a prediction about this. Click cell F2 — the Gain cell for your first
card — and type, exactly:

```
=E2-D2
```

Press Enter and check your prediction. The cell doesn't show what you typed; it
shows the *answer* — that card's value minus its cost. The `=` at the front is
the signal that a cell holds a formula instead of a value. Click F2 again and
look at the bar above the grid: the formula bar shows `=E2-D2`, the cell below
shows the result. Every cell has those two faces — what it *is*, and what it
*shows*.

One Gain down, the rest of the column to go — and you are not going to type
each one. Select F2 and look at its bottom-right corner: there's a small
square. That square is the **fill handle**. Drag it down to your last card's
row and release.

Now click one of the middle Gain cells and read its formula in the formula bar.
It isn't `=E2-D2` — the row numbers moved to match the row it lives in. When a
formula is copied, its cell references shift along with it. That one behavior
is why filling a column takes one drag instead of twenty typings.

Check your pulled cards, the ones with blank Cost: their Gain equals their full
Value. In arithmetic, the sheet treats a blank cell as zero — a card that cost
you nothing is all gain, which is exactly right.

### The totals

Goal: three cells that always answer the big questions. Set up the labels
first — type **Total Cost** in H1, **Total Value** in H2, **Total Gain** in H3.
Your job is to fill I1, I2, and I3 next to them so that each always shows the
total of its column. (Off to the side, not under the table — the card list is
going to grow downward for months, and the totals shouldn't be in its way.)

Work it out with the hints below — open them in order, and stop as soon as
you're unstuck.

<details>
<summary>Stuck? Start here</summary>

Your Gain formula did arithmetic on two cells you named. Now you want "add up
an entire column." Click I2, type `=` and then the letter S, and read what the
sheet starts offering you.

</details>

<details>
<summary>The concept</summary>

That popup is a list of **functions** — named operations you can use in a
formula, each taking its input in parentheses. The one that adds things up is
`SUM`. Its input is a **range**: two cell names joined by a colon, like
`E2:E20`, which means "every cell from here to there."

</details>

<details>
<summary>The pointer</summary>

A range doesn't need a bottom. `E2:E` means "from E2 to the end of the column"
— and it keeps working when you add card number 21 next month. The help card
that appears as you type `=SUM(` documents ranges; so does the SUM page at the
Docs editors help center.

</details>

<details>
<summary>Worked answer — compare after yours works</summary>

```
I1:  =SUM(D2:D)
I2:  =SUM(E2:E)
I3:  =SUM(F2:F)
```

</details>

When the three totals are alive, get your logbook: how close was your guessed
total to I2's answer?

### Watch it live

This is the moment the session exists for.

Pick one card. Suppose its value went up by 10 — a reprint rumor died, a
tournament result, whatever story you like. Before you touch anything, say
exactly which cells on this sheet will change when you type the new value.

Now change it and press Enter.

The card's Gain moved. Total Value moved. Total Gain moved. Total Cost didn't —
no reason it should. You changed one cell, and every number downstream of it
was already correct before your finger left the key. Nobody recalculated
anything; there is no "recalculate." A spreadsheet keeps every derived number
current, always, as a property of what it is.

Set the value back to the truth. The tracker only works if the data is real.

### Name this version

Before this session starts breaking things — and it's about to, on purpose —
give yourself something to fall back to.

Sheets has been quietly keeping every change you've made since the file was
created. In the **File menu**, find **Version history**, and inside it, **Name
current version**. Name it:

```
first working ledger
```

That pins today's working state to the timeline by name. If anything ever goes
truly sideways — today or months from now — **File → Version history → See
version history** shows every past state of this file, and any of them can be
restored. This is the safety net for the entire tracker project, and the habit
that goes with it: **name a version before experimenting.** You'll use it in
every session after this one.

---

## Break it on purpose

Two deliberate breakages. The named version and undo make both of them free —
cause each one, read what happens, undo it.

**Words where numbers go.** Change one card's Cost to the text `about $20` —
type it exactly like that, words and all. First tell: it sits on the left edge
of the cell. Now read carefully — that row's Gain cell, and all three totals.
Two different things happen here, and only one of them announces itself.

The Gain cell shows `#VALUE!` — read the whole error; hover over the cell and
the sheet explains it. Subtraction was handed words and refused, loudly.
But Total Cost shows no error at all. `SUM` silently *skips* cells it can't
add — so the total is simply missing that card's cost, and nothing on the
screen says so. A wrong number that looks fine.

That contrast is worth keeping forever: errors that shout are gifts — they
point at the problem. The failure to fear in a spreadsheet is the number that
whispers, the total that's quietly wrong while looking healthy. When you're
done looking, retype the real cost and watch the error clear.

**Delete the ground under a formula.** Set the stage: in cell H6, type `=F2` —
a formula pointing at one exact cell, your first card's Gain. It dutifully
shows a copy of it. Now right-click row 2's row number and choose **Delete
row**. The whole card is gone — and H6 now shows `#REF!`: a reference to a cell
that no longer exists. Read it; hover it. Then look at your totals — still
fine. A range like `F2:F` shrinks when a row inside it dies; a pointer to one
specific cell breaks. Both behaviors make sense, and now you've seen the
difference.

Undo it: Ctrl+Z (⌘Z on a Mac), or the Edit menu → Undo. The row comes back and
the error heals. Undo reaches many steps back — and if it ever isn't enough,
that's what "first working ledger" is for. Clear the scratch cell H6, and
you're whole.

---

## What just happened

A spreadsheet is a machine in which every cell holds one of two things: a value
or a formula. Values sit still. Formulas compute from other cells — and re-run,
automatically, whenever any cell they depend on changes. That's the entire
trick, and it's enormous. Your totals were never "calculated" in the sense of
someone doing a calculation; they are standing arrangements, promises the sheet
keeps continuously. That's the difference between this ledger and the same
numbers written on paper: the paper was correct once, at the moment of writing.
The sheet is correct *now*, whenever now is.

One layer deeper: Sheets maintains, privately, a map of which cells feed which
— F2 depends on E2 and D2; Total Value depends on every cell in column E. When
you changed one card's value, the sheet followed that map and re-ran exactly
the cells downstream of your change, and nothing else. The `#REF!` you
manufactured is what a broken link in that map looks like from the outside.
That map is about to get more interesting: soon, cells in one tab will feed
cells in another, and the map will span them without noticing the boundary.

---

## Go further

- How big a collection could this hold? There is a hard limit on how many cells
  one spreadsheet may contain — the Docs editors help center documents current
  limits. Find the number, then work out what it means: at six columns per
  card, how many cards is that, and will you ever hit it?
- Some of your Gain cells may already be negative. Look at them for a moment.
  How does seeing it in plain numbers compare to not knowing? Is a ledger that
  tells the truth worth more than one that flatters — and would you want the
  red cards hidden if they could be?
- A genuinely open one — nobody has a settled answer: is a card's "value" even
  one number? There's the price one last sold for, the price sellers are
  asking, what grading would change, what a friend would actually hand you for
  it. If value isn't one number, what would you record instead? Whatever you
  decide, you now own a tool where the design decision is yours to make.

---

## What you have now

- A spreadsheet named Collection Tracker with a Collection tab: Card, Set,
  Date, Cost, Value, Gain — holding your real best cards
- One glance answers "what is it all worth?" — and keeps answering it, because
  every total recalculates the moment anything changes
- The working distinction between a cell that stores and a cell that computes,
  plus the fill handle, SUM, and ranges that grow with the table
- Both classic spreadsheet errors — the loud `#VALUE!` and the silent wrong
  total — caused, read, and understood once each
- A named version, "first working ledger," and the habit that comes with it:
  name a version before experimenting
