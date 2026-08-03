# The cost of selling

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Somewhere in your tracker is a card whose Value cell says $50, and somewhere in
the back of your mind is the thought that you could turn it into $50. You
can't. Between "worth $50" and "gets you $50" stand three tolls: the selling
platform takes a percentage of every sale, postage costs what it costs, and the
card travels in a sleeve, a toploader, and a mailer that were all bought with
real money. The price-snapshots session planted this doubt — the tracker's
total is what the market *says*, not money anyone has. This session measures
the gap exactly, in dollars, for one real card.

You'll build a Sales tab that computes what a sale actually earns after every
cost, dissect one sale line by line, and then turn the arithmetic around into
the more powerful question: given the fees and the fixed costs, what's the
*minimum* price at which selling a card makes any money at all? The answer,
which your own formula will prove rather than this page asserting it, is one of
the quiet truths of the hobby: plenty of cards cannot be sold at a profit at
any price a buyer would accept.

---

## Before you start

You need:

- **A Collection with values.** Cards and their current worth, begun in
  [What is it all worth?](../first-ledger/guided.md). Quick check: you can point
  at the card you'd most plausibly sell and its Value.
- **The paper-money doubt.** You've seen that the tracker's total is a claim,
  not cash — the seed planted in [Price snapshots](../price-snapshots/guided.md),
  whose state-versus-history idea also returns in this session. Quick check:
  you can say in one sentence why the Collection total isn't money you have.
- **A sale to dissect.** Best case: you've actually sold a card and know the
  numbers. If not, you'll simulate one realistically — on a copy of the
  tracker, the same way all experiments here run on copies.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A Sales tab — Date, Card, Sale price, Fees, Shipping, Materials, Profit —
  where Profit is a formula, not a hope
- One real (or honestly simulated) sale dissected down to the cent, and the
  measured gap between what the card was "worth" and what the sale put in a
  pocket
- A designed answer to what happens in the tracker when a card is sold — one
  that keeps the card's whole history reconstructable
- A break-even formula that says, for any card, the minimum sale price at which
  selling it makes money — and a proof, from your own numbers, that some cards
  can't reach it

---

## New tools

Nothing to install. Two things to go find:

**Your platform's fee schedule.** Selling platforms — eBay, TCGplayer, Mercari,
and others — make their money by taking a percentage of each sale, sometimes
plus a fixed per-order amount. Every one of them publishes its current rates in
its own seller documentation; searching the platform's name plus "seller fees"
finds the page. Rates change, so this page won't quote any — finding the
current number is part of the work, the same way you find current card prices.

**Your materials, priced.** A penny sleeve, a toploader (the rigid plastic
case), a bubble mailer or envelope, a label. Bought in a bulk pack they feel
free; per sale they are real cents. Bulk price divided by count is an honest
per-sale price.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Pick the card you'd most plausibly sell. Its Value cell says one number. How
  much of that do you think actually ends up in your pocket after everything?
  Write the dollar figure — you'll check it against the computed one.
- What do you think one shipped card's materials — sleeve, toploader, mailer —
  actually cost, in cents?
- Is there a card in your Collection that could not be sold at a profit no
  matter what? What would have to be true for that to happen?

---

## The work

This is a build with five goals. What "done" looks like is stated for each; the
building is yours.

### Build the Sales tab

A new tab named **Sales**, columns **Date | Card | Sale price | Fees |
Shipping | Materials | Profit**. Profit is a formula: sale price minus the
three costs to its left. One design requirement, and it will earn its keep
before the session ends: the fee percentage lives in its own labeled cell, and
the Fees column *references* that cell — the percentage is not typed into any
formula.

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
labeled in plain words — the cost of turning paper into pocket. Then open your
logbook and set the pocket figure you predicted against the one the tracker
just computed.

**Done when:** the gap is a number on the sheet and the prediction check is in
the logbook.

### Design the state transition

A card just left the collection. What happens to its row?

This is yours to design, under one hard requirement: **history must survive.**
The card's whole journey — what it was bought for, what the market said along
the way, what the sale actually netted — must remain reconstructable
afterwards. That requirement rules some designs in and out on its own:

- **Delete the Collection row** — the current-state view is clean, but history
  is destroyed. Snapshots that counted that card's value stop being
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

Then feed it a cheap card's numbers and read the result against what that card
is actually worth.

**Done when:** the cell answers for any cost combination, and you can state,
from its output rather than from this page, why some cards cannot be sold at
a profit at any believable price — and name the cheapest card in your
Collection that clears the bar.

---

## Break it on purpose

Cause both, read the damage, undo.

**Forget the pennies.** Blank the Materials cell in your sale's row. Profit
goes *up*. Nothing turns red, nothing warns — the row looks better while being
wrong. This is the classic accounting error, the silent omission, and it's
more dangerous than any error message precisely because nothing asks you to
fix it. The defense is not a formula; it's knowing the complete cost list and
checking rows against it — which, as of this session, you do. Restore the
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

You computed what businesses call **unit economics**: the complete, honest
cost of one unit of business. One sale, all its revenue, every one of its
costs, and what's left — the margin. Margins are what selling actually lives
on, and you just watched a healthy-looking sale price shed fees, postage, and
materials down to a much smaller true number. Plenty of real sellers have
never done for their whole business what you just did for one card.

The distinction underneath it now has its full statement. Collection Value is
**unrealized** — the market's current claim about what a card would fetch.
It costs nothing to hold and nothing when it's wrong. Sales Profit is
**realized** — money that exists, after every cost of making it exist. "Worth
$50" and "gets you $50" are different sentences because between them stand
the fees, the postage, the materials, and whatever discount reality applied
to the asking price.

And the break-even cell is a bigger tool than it looks. Fixed costs set a
floor under the viable sale price — a floor that has nothing to do with what
the card is worth. When a card's value sits below its own floor, no price a
buyer would accept turns a profit, which your formula demonstrated without
anyone having to claim it. That mechanism runs far beyond cards — it is why
cheap anything is so often unsellable one at a time, and why bulk lots exist:
bundling spreads a single floor across many items.

---

## Go further

- Generalize the break-even cell into a minimum-listing-price formula for any
  card at current fees — then add a column to Collection flagging every card
  that couldn't clear it. How much of your collection is, practically
  speaking, unsellable one card at a time?
- Run the whole operation's number: across every row in Sales, what has
  selling netted after every cost — one cell. Put it beside what Collection
  claimed those cards were worth. Which number do you trust more now, and for
  what?
- Sellers bundle cheap cards into lots, and your break-even formula explains
  why. Can it also tell you the minimum lot size that makes a pile of
  near-worthless cards worth shipping?
- Genuinely open — value's last riddle: is a card you would never sell
  "worth" its market price? The market's number assumes a sale you've ruled
  out, so no realized value will ever exist to check it against. What is the
  Value cell measuring for that card? There's no settled answer. You now own
  every concept in the question.

---

## What you have now

- A Sales tab — Date, Card, Sale price, Fees, Shipping, Materials, Profit —
  with Profit as a formula and the fee percentage as a single referenced,
  labeled cell
- One sale dissected to the cent, and the measured gap between the card's
  paper Value and the sale's realized Profit
- A designed state transition for sold cards that keeps every card's full
  journey reconstructable, written up in your logbook
- A break-even formula that gives the minimum viable sale price for any card —
  and firsthand proof that some cards can't be sold profitably at all
