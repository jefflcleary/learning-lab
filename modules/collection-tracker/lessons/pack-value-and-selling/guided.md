# Pack value and the cost of selling

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every collector has had the argument. Are packs worth it, or should the money
go straight to singles — the exact cards you want, bought outright at listed
prices? It usually gets settled with anecdotes: the friend who pulled a chase
card in their second pack, the box that turned out to be all bulk. Anecdotes
are how the argument stays unsettled forever.

You are in a position almost nobody arguing about this is in: you have a
ledger. Every pack you've bought is in Purchases with a cost next to it.
Every card worth tracking is in Collection with a value. That means the
argument can be settled with arithmetic — not for packs in general, but for
*your* packs, *your* luck, *your* money. The first half of this session
computes what your packs actually cost, what the cards you pulled from them
are worth now, and what that says about the next pack you haven't bought yet.
One honest complication is waiting in the middle of it: your Collection never
recorded which cards came from packs, because when you designed those
columns, this question didn't exist yet. Working through that gap honestly is
part of the session, not a detour from it.

Buying is only half of the honest picture, though — and every number the
first half produces is a *paper* number, what the market says your pulls are
worth. The second half measures what paper costs to turn into money.
Somewhere in your tracker is a card whose Value cell says $50, and between
"worth $50" and "gets you $50" stand three tolls: the selling platform takes
a percentage of every sale, postage costs what it costs, and the card travels
in a sleeve, a toploader, and a mailer that were all bought with real money.
You'll build a Sales tab that computes what a sale actually earns after every
cost, dissect one sale line by line, and turn the arithmetic around into the
more powerful question: what's the *minimum* price at which selling a card
makes any money at all? The answer, which your own formula will prove rather
than this page asserting it, is one of the quiet truths of the hobby: plenty
of cards cannot be sold at a profit at any price a buyer would accept.

---

## Before you start

You need:

- **Months of purchase history, including packs.** A Purchases tab with real
  buys and costs, built in
  [Tracking purchases and money owed](../purchases-and-payback/guided.md).
  Quick check: you can point at several pack purchases with costs filled in.
- **A Collection with values.** Cards and their current worth, begun in
  [Building the ledger](../building-the-ledger/guided.md). Quick check: the
  Value column is filled in and reasonably current, and you can point at the
  card you'd most plausibly sell.
- **Stats skills.** You've written SUMIF and COUNTIF formulas with criteria,
  reaching across tabs, as in
  [Stats with SUMIF and keeping data clean](../stats-and-clean-data/guided.md).
  Quick check: you can explain what the criteria argument in one of your
  existing SUMIF formulas does.
- **The paper-money doubt.** You've seen that the tracker's total is a claim,
  not cash — the seed planted in
  [Value snapshots and logging from your phone](../snapshots-and-logging/guided.md), whose
  state-versus-history idea also returns in this session. Quick check: you
  can say in one sentence why the Collection total isn't money you have.
- **A sale to dissect.** Best case: you've actually sold a card and know the
  numbers. If not, you'll simulate one realistically — on a copy of the
  tracker, the same way all experiments here run on copies.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A From column on Collection recording where each card came from — the
  tracker's first piece of provenance
- Your personal pull rate, and one number nobody on any forum has: what a
  pack is worth on average, before opening, in your hands, from your own
  history — plus a written packs-versus-singles verdict that cites your
  numbers and says plainly what the numbers don't cover
- A Sales tab — Date, Card, Sale price, Fees, Shipping, Materials, Profit —
  where Profit is a formula, not a hope, with one real (or honestly
  simulated) sale dissected down to the cent
- A designed answer to what happens in the tracker when a card is sold — one
  that keeps the card's whole history reconstructable
- A break-even formula that says, for any card, the minimum sale price at
  which selling it makes money — and a proof, from your own numbers, that
  some cards can't reach it

---

## New tools

Nothing to install, and no new functions. Everything numeric in this session
is built from tools you already use — SUMIF, COUNTIF, cross-tab references,
and arithmetic between cells. If you want to check a function's exact
behavior, every Sheets function has its own page in Google's
[Docs editors help center](https://support.google.com/docs) — searching the
function name plus "Google Sheets" lands on it.

Two things to go find instead:

**Your platform's fee schedule.** Selling platforms — eBay, TCGplayer,
Mercari, and others — make their money by taking a percentage of each sale,
sometimes plus a fixed per-order amount. Every one of them publishes its
current rates in its own seller documentation; searching the platform's name
plus "seller fees" finds the page. Rates change, so this page won't quote
any — finding the current number is part of the work, the same way you find
current card prices.

**Your materials, priced.** A penny sleeve, a toploader (the rigid plastic
case), a bubble mailer or envelope, a label. Bought in a bulk pack they feel
free; per sale they are real cents. Bulk price divided by count is an honest
per-sale price.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Before computing anything: do you believe your packs have paid for
  themselves? Commit to yes or no, and roughly by how much.
- What fraction of your total pulled value do you think comes from your
  single best pull? A guess, as a percentage.
- Pick the card you'd most plausibly sell. Its Value cell says one number.
  How much of that do you think actually ends up in your pocket after
  everything? Write the dollar figure — you'll check it against the computed
  one.
- What do you think one shipped card's materials — sleeve, toploader,
  mailer — actually cost, in cents?
- Is there a card in your Collection that could not be sold at a profit no
  matter what? What would have to be true for that to happen?

---

## The work

This is a project: goals and what "done" looks like, and the building is
yours. First, what buying really earns.

### Mark provenance

The Collection needs a **From** column: where each card came from — Pack,
Single, Trade, Gift. Make it a validated list; you already know what
free-typed categories do to a SUMIF.

For the cards already in the Collection, there is no formula that can fill
this in, because the information was never written down. Past-you didn't
record it, because past-you didn't know it would matter — and no one designs
columns for questions they haven't had yet. You have two honest options, and
you may mix them: fill in provenance from memory where you're genuinely sure,
and for the rest, either mark the guess as a guess (something like `Pack?`)
and decide whether guesses count in your analysis, or leave those cards out
of it. What you may not do is guess silently and then treat the result as
certain.

**Done when:** every card either has a provenance or is deliberately
excluded, and you can state in one sentence which rule you applied.

### Compute the three numbers

On your Stats tab, three cells, each one a formula rather than a typed total:

1. **Total pack spend** — everything Purchases says you've spent on packs.
2. **Total pulled value** — the current value of every Collection card that
   came from a pack.
3. **Pull rate** — the second divided by the first.

A pull rate of 1.0 means your packs have returned, on paper, exactly what
they cost. Above it, your packs have beaten their price; below it, they
haven't.

**Done when:** all three recalculate on their own — change a card's value or
add a pack purchase, and the ratio moves without you touching it.

### Name the expected value

Two more cells: a count of the packs you've opened (Purchases knows; if some
rows bundle several packs into one purchase, count honestly and note it), and
your total pulled value divided by that count.

That second number is what a pack has been worth *on average, before
opening* — in your hands, from your history. Label the cell in plain
language.

**Done when:** you can read the cell out loud as a full sentence — "on
average, a pack has been worth ___ to me before I open it" — and the number
behind it is a formula.

### Make the comparison honest

Now the other side of the argument. The same money spent on singles buys
exactly the cards you want, at listed prices — you already have a habit for
checking those. No ratio, no lottery: with singles, a dollar buys a dollar of
chosen card, by construction. Your pull rate is the number that says what a
dollar of packs has bought *you*.

Write the verdict in your logbook, and hold it to two requirements. First, it
cites your numbers — the pull rate, the per-pack expected value, what a pack
costs near you. Second, it states what the numbers don't cover: the
spreadsheet priced the cards, not the opening. Packs are also the ripping,
the maybe, the story of the good pull — and this analysis is silent on all of
that, because no column measures it. The data answers the money question and
only the money question. A verdict like "singles, by the numbers" is honest;
so is "packs, and I now know I'm paying about ___ per pack for the fun."

**Done when:** the verdict is in the logbook with both halves present.

Before moving on, look at the words hiding inside your verdict. "Returned
what they cost, *on paper*." The pull rate's numerator is the Value column —
the market's claim about what your pulls would fetch, not money anyone has.
You've carried that doubt since the snapshots sessions. The rest of this
session finds out exactly how wide the paper-to-pocket gap is, in dollars,
for one real card.

### Build the Sales tab

A new tab named **Sales**, columns **Date | Card | Sale price | Fees |
Shipping | Materials | Profit**. Profit is a formula: sale price minus the
three costs to its left. One design requirement, and it will earn its keep
before the session ends: the fee percentage lives in its own labeled cell,
and the Fees column *references* that cell — the percentage is not typed into
any formula.

**Done when:** changing the fee cell changes every row's Fees and Profit at
once.

### Dissect one sale

Fill one row with a sale you can defend number by number.

If you've really sold a card, use that sale — real numbers beat clean ones,
and the tracker should hold what actually happened. If you haven't, simulate
one honestly, and do it **on a copy of the tracker**: pick your card, find a
realistic listing price the way you always check prices, get the fee from the
platform's published schedule, use a real postage cost, price the materials
from what they actually cost you. The copy matters for a plain reason: a
simulated sale recorded in the real ledger is a lie in the ledger. Either
route is honest; only mixing them isn't.

**Done when:** Profit computes, and you can read the row aloud as a story —
sold for this, platform took this, postage took this, materials took this,
kept this.

### Measure the gap

One more cell: the card's Value (from Collection) minus the sale's Profit,
labeled in plain words — the cost of turning paper into pocket. Then open
your logbook and set the pocket figure you predicted against the one the
tracker just computed.

**Done when:** the gap is a number on the sheet and the prediction check is
in the logbook.

### Design the state transition

A card just left the collection. What happens to its row?

This is yours to design, under one hard requirement: **history must
survive.** The card's whole journey — what it was bought for, what the market
said along the way, what the sale actually netted — must remain
reconstructable afterwards. That requirement rules some designs in and out on
its own:

- **Delete the Collection row** — the current-state view is clean, but
  history is destroyed. Snapshots that counted that card's value stop being
  explainable. This is the state-versus-history tension from the snapshots
  session, now with money on it.
- **Mark the row sold** — strikethrough, or better, a Status column (perhaps
  with a sold date). History survives — but every total that sums Value must
  now exclude sold rows, or "what is it all worth?" silently counts cards you
  no longer own.
- **Move it to Sales, leave a marked stub** — the fullest record and the most
  bookkeeping.

Pick one, implement it for your dissected sale (on the copy, if you're
simulating), and check the tracker's total afterwards with your own eyes.
Record the design and the reasons in your logbook.

**Done when:** the sold card's journey is still fully readable, the "what is
it all worth?" total is verifiably right, and the decision is written down.

### Solve for break-even

Turn the Profit formula around. Build a cell that answers: given the fee
percentage (referenced from the same fee cell), the shipping, and the
materials, **what must the sale price be for Profit to reach zero?** This is
algebra rearranged into a formula — the rearranging is yours to do.

Then feed it a cheap card's numbers and read the result against what that
card is actually worth.

**Done when:** the cell answers for any cost combination, and you can state,
from its output rather than from this page, why some cards cannot be sold at
a profit at any believable price — and name the cheapest card in your
Collection that clears the bar.

---

## Break it on purpose

Cause each one, read the damage, undo it.

**Delete your luck.** Recompute the pull rate with your single best pull
excluded — temporarily blank its From cell, or subtract its value in a
scratch cell, whichever you prefer. Watch what happens to the ratio. For most
collections at this stage, the swing is large — sometimes the whole verdict
flips. Sit with that: one card is carrying a measurable share of your answer.
Now put the cell back and keep the lesson: in a small sample, an outlier
doesn't influence the average, it *owns* it. This is also why your number
will keep drifting as more packs enter the ledger — and why anyone quoting a
pull rate off twenty packs, including you today, is quoting a number that's
still mostly luck.

**Forget the pennies.** Blank the Materials cell in your sale's row. Profit
goes *up*. Nothing turns red, nothing warns — the row looks better while
being wrong. This is the classic accounting error, the silent omission, and
it's more dangerous than any error message precisely because nothing asks you
to fix it. The defense is not a formula; it's knowing the complete cost list
and checking rows against it — which, as of this session, you do. Restore the
cell.

**Bury the fee.** In one row, replace the Fees formula's reference to the fee
cell with the percentage typed directly in as a number. Now change the fee
cell — platforms do change their rates. Watch every row update except the one
you buried, which now lies quietly and will keep lying until someone reads
every formula on the tab. A number typed inside a formula is invisible and
must be hunted; a number in a labeled cell is visible, changed once, and
consulted everywhere. Programmers call the buried kind a magic number, and
what you just did to find it — noticing one row disagreeing with its
neighbors — is what debugging one feels like. Restore the reference.

---

## What just happened

The buying half ran on four ideas with names worth keeping. **Expected
value** — the average worth of an uncertain thing, computed from actual
outcomes. Your per-pack number is exactly what a casino computes about every
bet it offers; you've just done it from the player's side of the table, with
your own money as the data. **Sample size** — the fewer packs behind a
number, the less it predicts the next pack. Your number isn't wrong; it's
*early*, and it will firm up as the ledger grows. **Outliers** — you measured
this one directly: remove one card and the answer swings. Small samples don't
dilute unusual results, they get dominated by them. **Selection effects** —
the packs you remember are the good ones. Memory is a biased sample: it keeps
what's worth retelling and quietly discards the bulk. That is why nearly
every collector's gut says packs pay better than their ledger says — and it
is the entire reason ledgers beat memory for questions like this. The ledger
remembers all of them.

The provenance wall you hit deserves its full name too: **data collected
before the question existed is almost always missing something the question
needs.** People who analyze data for a living hit this constantly — the
record that captured everything except the one field that now matters. The
fixes are the ones you just used: reconstruct honestly, restrict the analysis
to what's solid, and start recording the field now, so the next question
lands on better data than this one did.

The selling half computed what businesses call **unit economics**: the
complete, honest cost of one unit of business. One sale, all its revenue,
every one of its costs, and what's left — the margin. Margins are what
selling actually lives on, and you just watched a healthy-looking sale price
shed fees, postage, and materials down to a much smaller true number. Plenty
of real sellers have never done for their whole business what you just did
for one card.

And the distinction that held the whole session together now has its full
statement. Collection Value is **unrealized** — the market's current claim
about what a card would fetch. It costs nothing to hold and nothing when it's
wrong — and it is what your pull rate's numerator was made of. Sales Profit
is **realized** — money that exists, after every cost of making it exist.
"Worth $50" and "gets you $50" are different sentences because between them
stand the fees, the postage, the materials, and whatever discount reality
applied to the asking price. The break-even cell is a bigger tool than it
looks: fixed costs set a floor under the viable sale price — a floor that has
nothing to do with what the card is worth. When a card's value sits below its
own floor, no price a buyer would accept turns a profit, which your formula
demonstrated without anyone having to claim it. That mechanism runs far
beyond cards — it is why cheap anything is so often unsellable one at a time,
and why bulk lots exist: bundling spreads a single floor across many items.

---

## Go further

- Track your next ten packs with full provenance from the moment of
  opening — every card, every value, From filled in on day one — then re-run
  the whole analysis. Does the ratio move toward paying for itself, or away?
  And at your pull rate, what would a pack have to cost for packs to break
  even? Compare that answer to what packs actually cost near you.
- Your expected value prices the cards. Could you put a number on the opening
  itself — what you would knowingly pay per pack for the experience? If you
  can, the packs-or-singles question changes shape entirely. What does it
  turn into?
- Generalize the break-even cell into a minimum-listing-price formula for any
  card at current fees — then add a column to Collection flagging every card
  that couldn't clear it. How much of your collection is, practically
  speaking, unsellable one card at a time?
- Run the whole operation's number: across every row in Sales, what has
  selling netted after every cost — one cell. Put it beside what Collection
  claimed those cards were worth. Which number do you trust more now, and for
  what?
- Genuinely open: casinos and card packs share a shape — a fixed price in, an
  uncertain payout out, an expected value the house can compute. Where
  exactly does the analogy hold, and where does it break? Cards keep value
  after the reveal; a losing slot ticket keeps none. Packs have a floor. Is
  the floor enough to change the game? Nobody has a settled answer — argue it
  from your numbers.
- Genuinely open — value's last riddle: is a card you would never sell
  "worth" its market price? The market's number assumes a sale you've ruled
  out, so no realized value will ever exist to check it against. What is the
  Value cell measuring for that card? There's no settled answer. You now own
  every concept in the question.

---

## What you have now

- A From column on Collection: the tracker records provenance from here on,
  with honest markings on everything reconstructed from memory
- Your personal pull rate and per-pack expected value, live on the Stats tab,
  recalculating as the ledger grows — plus direct experience of what one
  outlier does to a small sample
- A written packs-or-singles verdict that cites your own data and names what
  the data cannot answer
- A Sales tab — Date, Card, Sale price, Fees, Shipping, Materials, Profit —
  with Profit as a formula and the fee percentage as a single referenced,
  labeled cell, holding one sale dissected to the cent
- A designed state transition for sold cards that keeps every card's full
  journey reconstructable, written up in your logbook
- A break-even formula that gives the minimum viable sale price for any
  card — and firsthand proof that some cards can't be sold profitably at all
