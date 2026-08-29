# Building the ledger: cards, formulas, formatting

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every collector gets asked the same question sooner or later: what's all that
actually worth? Most collectors answer with a shrug, or a number they made up in
the moment. By the end of this session you'll answer it by turning a screen
around — a table of your best cards with a total that is correct right now,
money that reads as money, and a Gain column that colors its own winners green
and losers red.

The tool is Google Sheets, a spreadsheet that runs in your browser.
Spreadsheets run half the world's businesses, and the reason is the thing you'll
see with your own eyes today: a cell in a spreadsheet doesn't have to store a
number — it can *compute* one, from other cells, and recompute the moment those
cells change. A document that does arithmetic for you, forever, is a different
kind of thing from a list on paper. Today it starts doing arithmetic about your
cards — and by the end of the session, the sheet is legible enough that someone
reading over your shoulder can tell your winning cards from your losing ones
without you saying a word.

Along the way you'll also meet the one everyday spreadsheet skill that
regularly destroys real data in the real world — sorting — and cause its
classic disaster yourself, deliberately, on a copy, because seeing that
particular wreck once, safely, is worth more than a hundred warnings about it.

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
- Money columns that read as money, a bold header that stays on screen no
  matter how far you scroll, and a Gain column that colors itself green and
  red — automatically, including for cards you add months from now
- Sorted your real collection best-card-first without breaking anything, and
  filter views for asking "show me only…" questions without rearranging the
  table at all
- Broken the ledger four times on purpose — two loud errors, one silent wrong
  total, and the classic one-column sorting disaster — read every one, and
  fixed everything, with a named safety-net version and a crash-test copy
  behind you

---

## New tools

Nothing installs in this module — everything runs in the browser.

**Google Sheets** is a free spreadsheet at `sheets.google.com`, and it saves
your work to your Google account automatically as you type; there is no save
button, and you'll never need one. A spreadsheet is a grid of cells. Columns
have letters, rows have numbers, and every cell is named by the two together —
`B3` is column B, row 3. Keep an eye on the small box at the left end of the
bar above the grid: it always shows the name of the cell you're standing in.

Three of its features get their first outing in the second half of today:

- **Number formats** control how a value is *displayed* — as currency, as a
  date, as a plain number — without changing the value itself. They live under
  the Format menu, in its Number section.
- **Conditional formatting** is formatting applied by a rule instead of by
  hand: "when a cell satisfies this condition, give it this look." The sheet
  applies and re-applies the rule as values change. Also under the Format menu.
- **Filter views** let you filter and sort what *you* see without changing the
  sheet itself. They live under the Data menu.

Documentation lives in two places you'll use all module: as you type a
formula, the sheet itself pops up a help card explaining the function under
your cursor, and Google's Docs editors help center (support.google.com/docs)
has a full page on every function and feature. One note for the whole session:
menus get rearranged now and then, so if an item isn't exactly where this text
says, it still exists under the same name — look for the name, not the
position.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Later you'll type `=E2-D2` into a cell and press Enter. What will the cell
  show afterwards — the text you typed, or something else?
- Later still, you'll change the number in E2. Will that other cell update on
  its own, or will you have to do something to it?
- Guess the total value of the cards you're about to enter. An actual number —
  the sheet is going to check you.
- After you format the money columns as currency, will the number *stored* in
  each cell be different from before? How could you check?
- Suppose you select only the Value column — nothing else — and sort just that
  selection. What happens to the rest of the table?
- A date, formatted as a plain number, shows some number. What number? Take a
  real guess at what it could even mean.

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

Before going further, give yourself something to fall back to. Sheets has been
quietly keeping every change you've made since the file was created. In the
**File menu**, find **Version history**, and inside it, **Name current
version**. Name it:

```
first working ledger
```

That pins today's working state to the timeline by name. If anything ever goes
truly sideways — today or months from now — **File → Version history → See
version history** shows every past state of this file, and any of them can be
restored. This is the safety net for the entire tracker project, and the habit
that goes with it: **name a version before experimenting.** You'll use it in
every session after this one — starting later today, when this session begins
breaking things on purpose.

The ledger is now *correct*. It is not yet *legible* — the money doesn't look
like money, the headers scroll away, and telling the winning cards from the
losing ones means reading the Gain column number by number. Correct is for
you. Legible is for everyone else: the version of this sheet someone can read
over your shoulder and understand without you saying a word. The rest of the
work makes it legible.

### Money that looks like money

Select columns D through F in one stroke: click column D's letter, hold Shift,
click column F's letter. Then Format menu → Number → Currency.

Cost, Value, and Gain now read as money. Pulled cards' blank Costs stay blank
— there's no value there to dress up.

Now check the prediction you made about this. Click any Value cell and read
the formula bar. The raw number is still there, exactly as you typed it.
Formatting changed what the cell *shows*, not what it *is*. Keep that
distinction — it comes back before the session ends.

### A header that stays put

Two small moves:

- Select row 1 by clicking its row number, and make it bold — Ctrl+B (⌘B on a
  Mac), or the B in the toolbar.
- View menu → Freeze → 1 row.

Scroll down. The data slides under the headers, and the headers stay. Freezing
does one more thing that pays off in a moment: it tells the sheet that row 1
is furniture, not data — the sheet will remember that when you sort.

### Sort the real sheet, safely

Best cards should be at the top. Sorting will do it — and sorting is the one
everyday spreadsheet operation that can silently destroy a table, which is why
it comes with rules. The rules first, the wreckage after: in Break it on
purpose, you'll cause the disaster these rules prevent, on a copy, and see for
yourself why they exist.

First, the habit you just installed: File → Version history → Name current
version — name it `before first sort`. Any experiment on the real sheet gets a
named version first. That's the deal.

Now sort: right-click column E's letter — the Value column — and choose **Sort
sheet Z to A** (find it by name; it may sit in a submenu). "Sort sheet" is the
key phrase: it sorts *entire rows*, keeping each card's facts together, and it
leaves the frozen header row alone.

Your most valuable card is now in row 2. Check a card you know well: its Set,
Date, Cost, and Gain all traveled with it. And glance at your totals in
columns H and I — unmoved and unbothered. They were placed off to the side
earlier for exactly this moment: rows can now be rearranged freely without the
totals ever being caught in the shuffle.

### Explore without rearranging

Sorting the sheet changes the sheet — sometimes you don't want that. "Show me
only cards from one set, ordered by Gain" is a question, and answering a
question shouldn't have to rearrange the furniture.

Data menu → Filter views → Create new filter view. A dark border and banner
appear around the grid: that's the sign you're *inside* a view. In the header
row, each column now has a small filter control. Use the one on Set to show
only one set; use the one on Gain to sort descending. Look around — best and
worst pulls of that set, in order.

Now close the view (the X on the dark banner). Everything is exactly as it was
before. The filter view changed what you *saw*, never what the sheet *is* —
the same distinction as formatting, one level up. This is the tool for every
"just show me…" question from now on.

### Green and red at a glance

The finishing move. The goal: every winning card's Gain sits on green, every
losing card's on red — automatically, forever, including cards you add next
month. No coloring anything by hand.

Work it out with the hints, opened in order.

<details>
<summary>Stuck? Start here</summary>

Coloring cells by hand would rot the moment any value changed — tomorrow's
loser could be sitting on yesterday's green. What you want is formatting the
sheet applies *for* you, by rule. The Format menu has an entry for exactly
this; skim the menu and read the entries' names.

</details>

<details>
<summary>The concept</summary>

Conditional formatting attaches a rule to a range: "when a cell's value
satisfies this condition, wear this look." Configuring one takes three
decisions — which cells, what condition, what look. And you need *two* rules,
because green-when-positive and red-when-negative are two different
conditions.

</details>

<details>
<summary>The pointer</summary>

Format → Conditional formatting opens a panel. Apply it to the range `F2:F` —
open-ended for the same reason your totals were, so future cards are covered.
In the condition dropdown you'll find "Greater than" and "Less than"; the
number both rules compare against is 0. After the first rule, "Add another
rule" gets you the second.

</details>

When both rules are in, stand back and look at your collection. Wins and
losses, visible from across a room, no reading required. This is the moment
the tracker becomes something you can turn around and show: the sheet now
explains itself.

---

## Break it on purpose

Four deliberate breakages. The first two happen on the real sheet — the named
versions and undo make them free. The last two happen on a copy, the other
half of this project's safety net.

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
a formula pointing at one exact cell, the Gain of the card now in row 2. It
dutifully shows a copy of it. Now right-click row 2's row number and choose
**Delete row**. The whole card is gone — and H6 now shows `#REF!`: a reference
to a cell that no longer exists. Read it; hover it. Then look at your totals —
still fine. A range like `F2:F` shrinks when a row inside it dies; a pointer
to one specific cell breaks. Both behaviors make sense, and now you've seen
the difference.

Undo it: Ctrl+Z (⌘Z on a Mac), or the Edit menu → Undo. The row comes back and
the error heals. Undo reaches many steps back — and if it ever isn't enough,
that's what your named versions are for. Clear the scratch cell H6, and you're
whole.

**The one-column sort.** You predicted this one, and it gets its own
expendable surface: File menu → Make a copy, name the copy
`Collection Tracker crash test`. The copy is expendable by construction —
nothing done to it can touch the real tracker, which is the whole reason it
exists.

In the crash-test copy, select column E by its letter — only that column.
Then Data → Sort range, and sort the selection so the biggest values come
first.

Now look at the table.

The values are in beautiful descending order — and every other column stayed
exactly where it was. Find the card you know best: the value sitting in its
row now belongs to some other card. Every single row is now a lie, and not one
error appeared. Nothing warned you, because nothing went wrong as far as the
sheet is concerned: you said "sort these cells," and it did precisely that.
The sheet has never known that a row *means* something — that row 2 is one
card's facts. The meaning lived in your head, and one sorted column just
severed it for the entire table at once.

Remember the first breakage today — the loud error versus the silently wrong
total? This is the biggest silent wrong in spreadsheets, the one that ruins
gradebooks and payrolls in the real world. The rule it buys you: **never sort
a selection smaller than the table.** Sort the sheet, or a range that includes
every column — rows only survive as rows if you treat the table as a unit.

Undo works here (Ctrl+Z / ⌘Z) if you want to watch the wreck reverse. Or
don't bother — it's the crash-test copy. Breaking it was its job.

**Dates unmasked.** Still in the copy: select the Date column, then Format →
Number → Number — the plain-number format. Every date turns into a number in
the tens of thousands. Check your prediction: what is that number? It's a
count of days — each date is stored as "how many days since day zero," a
particular day the spreadsheet counts from. Which day is day zero? You have
everything you need to work it out from the numbers in front of you, or to
look it up at the help center.

Format the column back (Format → Number → Date) and the calendar look
returns, perfectly intact — because the *values* never changed. The dates were
numbers all along, wearing calendar clothes. That's the format-versus-value
idea proven from the other side, and it's also a preview: because dates are
numbers, subtracting two of them will simply work, and "how many days did I
hold this card?" is a formula waiting for a later session.

When you're done, throw the crash-test copy away or keep it as a souvenir —
it's a copy. Deleting copies is free; that's what makes them copies.

---

## What just happened

Three ideas today, and all of them live in the gap between what a cell *is*
and what it *shows* — and in what a row *means*.

First, the live document. A spreadsheet is a machine in which every cell holds
one of two things: a value or a formula. Values sit still. Formulas compute
from other cells — and re-run, automatically, whenever any cell they depend on
changes. That's the entire trick, and it's enormous. Your totals were never
"calculated" in the sense of someone doing a calculation; they are standing
arrangements, promises the sheet keeps continuously. That's the difference
between this ledger and the same numbers written on paper: the paper was
correct once, at the moment of writing. The sheet is correct *now*, whenever
now is. One layer deeper: Sheets maintains, privately, a map of which cells
feed which — F2 depends on E2 and D2; Total Value depends on every cell in
column E. When you changed one card's value, the sheet followed that map and
re-ran exactly the cells downstream of your change, and nothing else. The
`#REF!` you manufactured is what a broken link in that map looks like from the
outside. That map is about to get more interesting: soon, cells in one tab
will feed cells in another, and the map will span them without noticing the
boundary.

Second, format versus value. Every cell carries a value, and separately,
instructions for how to display it. Currency, date formats, bold,
green-on-positive — all of it is costume. The value underneath never changed
once during the formatting work, and the formula bar will always show it to
you naked. That's why the dates survived being displayed as day-counts, and
it's why formatting is always safe to experiment with: the look and the fact
are different layers.

Third, sorting — the opposite kind of operation, because it moves the facts
themselves. A table's rows are records: one row, one card, and the row is the
unit of meaning. Sort whole records and the meaning survives any number of
rearrangements. Hand the sorter less than whole records, and it faithfully,
silently destroys the recordness of every row — because the grid never knew
your rows meant anything. The sheet knows values and cells. *You* know row 2
is a card. Keeping a table truthful means treating it as a unit — and now you
know that not as a rule someone gave you, but as a wreck you caused yourself
and walked away from.

---

## Go further

- How big a collection could this hold? There is a hard limit on how many cells
  one spreadsheet may contain — the Docs editors help center documents current
  limits. Find the number, then work out what it means: at six columns per
  card, how many cards is that, and will you ever hit it?
- Some of your Gain cells are now sitting on red. Look at them for a moment.
  How does seeing it in plain numbers compare to not knowing? Is a ledger that
  tells the truth worth more than one that flatters — and would you want the
  red cards hidden if they could be?
- Number formats are a tiny language you can write yourself: a custom format
  can show cents only when a value has them, so whole dollars stay clean. The
  Docs editors help center documents custom number formats — a small puzzle in
  a small language.
- A genuinely open one — nobody has a settled answer: is a card's "value" even
  one number? There's the price one last sold for, the price sellers are
  asking, what grading would change, what a friend would actually hand you for
  it. If value isn't one number, what would you record instead? Whatever you
  decide, you now own a tool where the design decision is yours to make.
- Another genuinely open one: what actually makes a table "readable"? Find the
  ugliest spreadsheet in the wild — a shared schedule, league standings, a
  price list — and name *precisely* why it hurts to read. Professionals argue
  about this without a settled answer. Having opinions with reasons attached
  is the entire substance of design taste, and you just started collecting
  them.

---

## What you have now

- A spreadsheet named Collection Tracker with a Collection tab — Card, Set,
  Date, Cost, Value, Gain — holding your real best cards, readable at a
  glance: currency columns, a bold frozen header, and a Gain column that
  colors its own winners green and losers red
- One glance answers "what is it all worth?" — and keeps answering it, because
  every total recalculates the moment anything changes
- The working distinction between a cell that stores and a cell that computes,
  plus the fill handle, SUM, and ranges that grow with the table
- The format-versus-value distinction, proven in both directions — and the
  formula bar as the way to see any cell's naked value
- The sorting discipline: rows are records, tables are sorted as units, and a
  named version comes first — plus the one-column disaster seen once, safely,
  so it never happens to data you care about
- Filter views for exploring without rearranging
- Both classic spreadsheet errors — the loud `#VALUE!` and the silent wrong
  total — caused, read, and understood once each
- Both halves of the safety net as habits: named versions ("first working
  ledger," "before first sort") before experiments on the real sheet, and a
  crash-test copy — made, wrecked, and discarded — for everything destructive
