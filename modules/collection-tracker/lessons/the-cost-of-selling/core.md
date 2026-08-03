# The cost of selling

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** the-cost-of-selling
- **Module / Part:** collection-tracker — Part 5, The honest numbers
- **Scaffolding:** level 3 — formulas, cross-tab work, and tab design are all
  established skills; the state-transition design is a judgment call. Deliveries
  give goals and success criteria only; no hint ladders.
- **Deliveries:** guided only (per module MODULE.md)
- **Status:** ready

## Goal and payoff

Take the paper-versus-realized seed planted by the snapshots lesson and grow it
to full size: a Sales tab that computes what a sale *actually* earns after
platform fees, shipping, and materials, compared against what the Collection
said the card was "worth." The learner dissects one real sale (or one
realistically simulated on a copy — real preferred, and the material says
honestly which it's asking for), derives the break-even price as algebra in a
cell, and discovers — by formula, not assertion — that cheap cards often cannot
be sold at a profit at all. They also design the state transition for a sold
card themselves: what happens to its Collection row, given that history must
survive.

Payoff, showable: "worth $50" and "gets you $50" become two different sentences
the learner can defend with a formula — and a minimum-price number that tells
them, before listing anything, whether a sale can possibly make money.

## Prerequisites

- A Collection tab with per-card Values — established by `lessons/first-ledger/`
- The paper-versus-realized seed: the learner has seen that the tracker's total
  is what the market *says*, not money in hand — established by
  `lessons/price-snapshots/` (its state-versus-history idea also pays off here)
- At least one card plausibly worth selling (or willingness to simulate a sale
  on a copy of the tracker — the module's expendable surface)

## Establishes

- A Sales tab exists: Date | Card | Sale price | Fees | Shipping | Materials |
  Profit, with Profit as a formula
- The learner has a designed, deliberate state transition for sold cards (the
  Collection keeps its history; the Sales tab holds what actually happened)
- A break-even/minimum-listing-price formula exists, parameterized on a
  referenced fee cell rather than a typed-in number
- The realized-versus-unrealized distinction is fully installed: Collection
  Value is the market's claim, Sales Profit is what happened
- Cited by other cores as: "a Sales tab records real sale outcomes and the
  learner can compute a break-even price — established by
  `lessons/the-cost-of-selling/`."

## Facts

- Sales tab columns (canonical): **Date | Card | Sale price | Fees | Shipping |
  Materials | Profit**. Profit is a formula: Sale price − Fees − Shipping −
  Materials. Nothing else in this lesson needs new functions; it is arithmetic
  plus one comparison against Collection Value.
- **Platform fees** are how selling platforms make money: a percentage of the
  sale (sometimes plus a fixed per-order amount), taken before the seller sees
  anything. Every platform publishes a current fee schedule in its own help or
  seller documentation [volatile as of 2026-08 — percentages and structures
  change; deliveries point the learner at the platform's own docs, searched as
  "<platform name> seller fees," and never assert a number]. Examples of
  platforms with published schedules: eBay, TCGplayer, Mercari — name as places
  to look, not as recommendations.
- **Materials** are the physical costs of one shipped card: penny sleeve,
  toploader (the rigid plastic case), envelope or bubble mailer, label,
  sometimes tape. Bought in bulk they feel free; per sale they are real cents,
  and at volume the cents are dollars. The learner prices one sale's worth
  honestly (bulk price ÷ count is fine).
- **Real versus simulated, said honestly in learner text:** if the learner has
  actually sold a card, use that sale — real numbers beat clean ones. If not,
  simulate one sale realistically on a copy of the tracker (the module's
  expendable surface; experiments on copies are the established habit): pick a
  card, find what it would list for, use the platform's published fees and a
  real shipping price. Either is honest as long as the tracker doesn't record a
  simulation as a real sale — which is exactly why the simulation lives on a
  copy.
- **Fees as a formula input:** fees should be computed from a fee percentage
  held in its own referenced cell (a named input), not typed as a literal into
  each formula. The break-it section makes the difference felt. (This is the
  magic-numbers lesson from programming, wearing spreadsheet clothes; the core
  may say so, learner text says it in plain words.)
- **Break-even algebra:** with fee rate f (as a fraction of sale price P),
  shipping S, materials M: Profit = P − f·P − S − M = P·(1 − f) − (S + M).
  Profit ≥ 0 exactly when **P ≥ (S + M) / (1 − f)**. Consequence the formula
  proves on its own: fixed costs (S + M) set a floor on viable sale price that
  has nothing to do with what a card is worth — so a card valued below its own
  floor cannot be sold at a profit at any price a buyer would accept. Cheap
  cards are often in this trap; nobody has to assert it, the learner's own
  formula demonstrates it when fed cheap-card numbers.
- **The state transition, options with tradeoffs (learner designs; no right
  answer, but one hard requirement — history must survive):**
  - Delete the sold card's Collection row: cleanest current-state view, but
    history is destroyed — snapshots that included that card's value stop being
    explainable, and past gain/loss stories lose their subject. (This is the
    state-versus-history idea from the snapshots lesson, now with money on it.)
  - Mark the row sold (strikethrough, or better a Status/Sold column, possibly
    with a Sold date): history intact, but every value-total formula must now
    exclude sold rows or the "what is it all worth?" number silently counts
    cards that are gone.
  - Move the row's identity to Sales and keep a marked stub (or the full row,
    excluded from totals) in Collection: the fullest record, the most
    bookkeeping.
  - Whatever the choice, the sold card's journey must remain reconstructable:
    what it was bought for (Purchases/Collection), what the market said
    (Value, snapshots), what actually happened (Sales).
- **Realized vs unrealized, the full statement:** Collection Value is
  *unrealized* — the market's current claim about what the card would fetch,
  costless to hold and costless to be wrong about. Sales Profit is *realized* —
  money that exists, after every cost of making it exist. The gap between a
  card's Value and its sale's Profit is the cost of turning paper into pocket:
  fees, shipping, materials, and whatever discount reality applied to the
  listing price.

## Arc

### Orientation — given plainly

Open from the seed: the snapshots lesson left a question deliberately half
answered — the tracker's total is what the market says, not money anyone has.
This session finds out exactly how wide that gap is, in dollars, for one real
card. Explain what selling a card actually involves before any formula: a
platform takes a percentage (their published fee schedule says how much —
point, don't assert), postage costs what it costs, and the card travels in
materials that were bought with real money. Each of those subtracts from the
sale price before anything reaches the seller. State the real-or-simulated
choice honestly and plainly, with real preferred and simulation done on a copy.

New tools: none in the software sense. The platform fee schedule is introduced
as a document to go find (the research habit from earlier modules and the
price-checking habit both apply); materials get priced from whatever the
learner or their household actually uses.

### Predictions to elicit

- Pick the card you'd most plausibly sell. Its Value column says one number.
  How much of that number do you think ends up in your pocket after everything?
  Write the dollar figure.
- What do you think one shipped card's materials — sleeve, toploader, mailer —
  actually cost, in cents?
- Is there a card in your Collection that *cannot* be sold at a profit no
  matter what? What would make that true?

### The work — goals and success criteria (level 3: no hint ladders)

1. **Build the Sales tab.** Goal: a new tab, Date | Card | Sale price | Fees |
   Shipping | Materials | Profit, with Profit as a formula (sale price minus
   the three costs), and the fee percentage held in its own labeled cell that
   the Fees column references — not typed into formulas. Success: changing the
   fee cell changes every row's Fees and Profit.
2. **Dissect one sale.** Goal: one row filled with a real sale if one has
   happened (preferred — real numbers beat clean ones), otherwise one
   realistically simulated sale built on a copy of the tracker: a real listing
   price for the chosen card, the platform's current fee from its published
   schedule (found, not assumed), real postage, materials priced honestly
   (bulk price divided by count is fine). Success: Profit computes, and the
   learner can narrate every subtraction in the row out loud.
3. **Measure the gap.** Goal: set the row's Profit against the card's Value in
   Collection — one cell computing Value − Profit, labeled plainly (the cost of
   turning paper into pocket). Success: the learner's predicted pocket figure
   from the Predict section gets checked against the computed one in the
   logbook.
4. **Design the state transition.** Goal: decide what happens in the tracker
   when a card is sold, under one hard requirement: history must survive — the
   card's whole journey (bought for, valued at, sold for, netted) must remain
   reconstructable. Options and tradeoffs stated plainly (delete the row and
   lose history; mark it sold and teach every total to exclude it; move it to
   Sales with a stub left behind). Success: the transition is implemented for
   the dissected sale (on the copy, if simulating), the "what is it all worth?"
   total is verifiably correct afterwards, and the design is recorded in the
   logbook with reasons.
5. **Solve for break-even.** Goal: a cell that answers "what must the sale
   price be for Profit to reach zero?" for any fees-shipping-materials
   combination — algebra rearranged into a formula, referencing the same fee
   cell. Then feed it a cheap card's numbers. Success: the learner can state,
   from their own formula's output, why some cards cannot be sold profitably
   at any believable price — and name the cheapest card in their Collection
   that clears the bar.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Forget the pennies.** Blank the Materials cell in one row. Profit rises;
  nothing turns red; the row looks *better* while being wrong. This is the
  classic accounting error — the silent omission. A wrong number that looks
  healthy is more dangerous than an error message, because nothing asks you to
  fix it; the defense is knowing the full cost list and checking rows against
  it, which the learner now can. Undo: restore the cell.
- **Bury the fee.** Take one row's Fees formula and replace the fee-cell
  reference with the percentage typed in as a literal number. Now change the
  fee cell (platforms do change their rates). Every row updates except the
  buried one — which now lies quietly, forever, or until someone reads every
  formula. Named plainly: a number typed into a formula is invisible and
  unchangeable from outside; a number in a labeled cell is visible, changeable
  once, and consulted everywhere. (Programmers call the buried kind a magic
  number; the learner has now debugged one.) Undo: restore the reference.

### What just happened — the explanation

Name the frame: this was **unit economics** — the complete cost of one unit of
business, a thing many real businesses never compute honestly. The learner now
has, for one sale: revenue (sale price), variable costs (fees, shipping,
materials), and margin (Profit, and Profit ÷ Sale price if they want the
percentage). Margins are what businesses actually live on — not revenue — and
the learner just watched a healthy-looking sale price shed its costs down to a
much smaller true number.

The realized/unrealized distinction gets its full statement: Collection Value
is the market's claim — unrealized, free to hold, free to be wrong. Sales
Profit is realized — money that exists, after every cost of making it exist.
"Worth $50" and "gets you $50" are different sentences because between them
stand fees, postage, materials, and the discount reality applies. And the
break-even formula is the general tool hiding in the lesson: fixed costs set a
price floor independent of worth, which is why cheap things are so often
unsellable-at-profit everywhere — not just cards — and why bulk lots exist:
bundling spreads one floor across many cards.

### Go further — open questions

- Generalize the break-even cell into a minimum-listing-price formula for
  *any* card given the current fee schedule — then add a column to Collection
  flagging every card that couldn't clear it. How much of your collection is,
  practically speaking, unsellable one at a time?
- Run the whole operation's number: across every sale in the Sales tab, one
  cell — what has selling netted after every cost? Set it beside what the
  Collection's Value column claimed those cards were worth. Which number do
  you trust more now, and for what purpose?
- Sellers bundle cheap cards into lots. Your break-even formula explains why.
  Can it also tell you the minimum lot size that makes a pile of near-worthless
  cards worth shipping?
- Genuinely open, value's last riddle: is a card you would never sell "worth"
  its market price? The market's number assumes a sale you've ruled out; no
  realized value will ever exist to check it. What does Value even measure for
  that card? There is no settled answer — but you now own every concept in the
  question.

## Delivery notes

- **guided:** level 3 discipline — goals and success criteria only. The
  algebra is stated as a goal ("a cell that answers…"), never as a worked
  formula; the rearrangement is the withheld problem-solving.
- Fee numbers are never asserted anywhere in learner text — always "the
  platform's published fee schedule," found by the learner. Platform names
  appear only as places with published schedules, not recommendations.
- The real-versus-simulated choice must be stated in exactly the honest frame:
  real preferred, simulation legitimate on a copy, and the reason the copy
  matters (a simulation recorded as a real sale is a lie in the ledger).
- "Whoever fronted the money" phrasing does not arise naturally here; keep it
  in mind only if a payback linkage gets added later.
- Tone risk in the unit-economics passage: keep it concrete (this row, these
  cents), never business-guru. The margins sentence stays one sentence.
