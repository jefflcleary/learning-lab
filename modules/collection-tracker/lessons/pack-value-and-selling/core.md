# Pack value and the cost of selling

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** pack-value-and-selling
- **Module / Part:** collection-tracker — Part 5, The honest numbers
- **Scaffolding:** level 3 throughout — a composition/analysis project. Every
  skill it uses (SUMIF/COUNTIF, cross-tab references, adding a tab or column,
  honest data entry, tab design) is at least a third exposure; the state
  transition is a judgment call. Deliveries give goals and success criteria
  only; no hint ladders.
- **Deliveries:** guided only (per module MODULE.md)
- **Status:** ready

## Goal and payoff

The two honest-numbers questions in one session, sharing a spine: what does
buying really earn, and what does selling really cost?

First half: answer the oldest question in collecting — are packs worth it, or
should the money go to singles? — from the learner's own ledger instead of
forum lore. The learner computes what their packs actually cost, what the
cards pulled from those packs are worth now, and the ratio between them: a
personal pull rate, and from it the expected value of a pack *to them*. Along
the way they hit a real data-modeling wall — the Collection never recorded
which cards came from packs, because past-them didn't know the question was
coming — and work through it honestly rather than around it.

Second half: that pull rate is a paper number on its numerator side, which is
the bridge. A Sales tab computes what a sale *actually* earns after platform
fees, shipping, and materials, compared against what the Collection said the
card was "worth." The learner dissects one real sale (or one realistically
simulated on a copy — real preferred, and the material says honestly which
it's asking for), derives the break-even price as algebra in a cell, and
discovers — by formula, not assertion — that cheap cards often cannot be sold
at a profit at all. They also design the state transition for a sold card
themselves: what happens to its Collection row, given that history must
survive.

Payoff, showable: one number nobody on a forum has ("on average, a pack has
been worth $X to me before opening"), a defensible packs-vs-singles verdict —
and "worth $50" and "gets you $50" as two different sentences the learner can
defend with a formula, plus a minimum-price number that says, before listing
anything, whether a sale can possibly make money.

## Prerequisites

- A Purchases tab holding months of real purchase history, including pack
  purchases with costs — established by `lessons/purchases-and-payback/`
- A Collection tab with current Value per card — established by
  `lessons/building-the-ledger/`
- Stats skills: SUMIF/COUNTIF with criteria, cross-tab references —
  established by `lessons/stats-and-clean-data/`
- The paper-versus-realized seed: the learner has seen that the tracker's
  total is what the market *says*, not money in hand — established by
  `lessons/snapshots-and-logging/` (its state-versus-history idea also pays
  off here)
- At least one card plausibly worth selling (or willingness to simulate a
  sale on a copy of the tracker — the module's expendable surface)

## Establishes

- The Collection tab carries provenance: a From/source column marking (with
  honest confidence) which cards came from packs
- The learner has computed their personal pull rate — value pulled per dollar
  spent on packs — and the expected value of a pack from their own history,
  and has felt what one outlier does to a small sample
- A Sales tab exists: Date | Card | Sale price | Fees | Shipping | Materials |
  Profit, with Profit as a formula
- The learner has a designed, deliberate state transition for sold cards (the
  Collection keeps its history; the Sales tab holds what actually happened)
- A break-even/minimum-listing-price formula exists, parameterized on a
  referenced fee cell rather than a typed-in number
- The realized-versus-unrealized distinction is fully installed: Collection
  Value is the market's claim, Sales Profit is what happened
- Cited by other cores as: "the Collection records provenance, the learner
  has computed their own pack expected value, a Sales tab records real sale
  outcomes, and the learner can compute a break-even price — established by
  `lessons/pack-value-and-selling/`."

## Facts

### Shared spine

- No new functions anywhere in this lesson. Everything numeric is SUMIF (sum
  Cost where Type is the pack category), COUNTIF (count pack purchases),
  arithmetic between cells, and one comparison against Collection Value.
  Function help: each function's page in Google's Sheets function list (the
  same help center as always — search "SUMIF Google Sheets" and land on
  support.google.com).
- **The bridge between halves:** the pull rate's numerator — pulled value —
  is the market's claim, not money. The first half prices what buying earned
  on paper; the second half measures what paper costs to turn into pocket.
  Realized-versus-unrealized is the one idea both halves stand on.

### Pack value

- **The provenance gap, stated honestly:** the Collection has no column
  saying where a card came from. Past data cannot be re-collected — the
  learner either reconstructs from memory (honestly, marking guesses as
  guesses) or restricts the analysis to cards they're sure about. Both are
  legitimate; pretending certainty is not. This is the deep lesson and the
  core names it plainly: data collected before a question existed is almost
  always missing something the question needs, and real analysts hit this
  constantly.
- A "From" (or "Source") column on Collection is the fix going forward:
  values like `Pack`, `Single`, `Trade`, `Gift` — and it should be validated,
  because the learner already knows what unvalidated categories do to SUMIF.
- The three headline numbers:
  - **Total pack spend** = SUMIF over Purchases where Type is the pack
    category.
  - **Total pulled value** = SUMIF over Collection, summing Value where
    From = Pack.
  - **Pull rate** = pulled value ÷ pack spend (a ratio; 1.0 means packs have
    returned exactly what they cost, on paper).
- **Expected value**, named gently: (total pulled value) ÷ (number of packs
  opened) = what a pack has been worth *on average, before opening* — to this
  learner, from this history. Not the internet's number; theirs. The count of
  packs comes from COUNTIF over Purchases (or an honest manual count if some
  pack purchases were bundled into one row — say so).
- **The singles comparison:** the same money spent on singles buys exactly
  the chosen cards at listed prices — no ratio, no lottery. There is no
  formula for this side; the comparison is the pull-rate ratio against 1.0,
  plus the qualitative difference (choice vs chance). Where singles prices
  live is the learner's established price-checking habit from the first
  ledger [volatile — marketplaces and price sources shift; point, don't
  assert].
- **What the analysis cannot see, stated in learner text, plainly:** the
  spreadsheet prices the cards, not the opening. Packs are also
  entertainment — the ripping, the maybe, the story of the good pull. The
  data answers the money question and is silent on the joy question. Knowing
  which questions the data answers — and saying so out loud — is the actual
  skill.
- Outlier/sample-size facts for the break-it and explanation:
  - In a small sample, one lucky pull can carry the whole ratio; removing the
    single best pull and recomputing shows how much of the answer is one card.
  - The pull rate will drift as more packs are opened; the smaller the
    sample, the less the current number predicts the next pack.
  - Selection effect, named: memory keeps the good packs; the ledger keeps
    all of them. This is *why* ledgers beat memory for this question.

### The cost of selling

- Sales tab columns (canonical): **Date | Card | Sale price | Fees |
  Shipping | Materials | Profit**. Profit is a formula: Sale price − Fees −
  Shipping − Materials.
- **Platform fees** are how selling platforms make money: a percentage of the
  sale (sometimes plus a fixed per-order amount), taken before the seller
  sees anything. Every platform publishes a current fee schedule in its own
  help or seller documentation [volatile as of 2026-08 — percentages and
  structures change; deliveries point the learner at the platform's own docs,
  searched as "<platform name> seller fees," and never assert a number].
  Examples of platforms with published schedules: eBay, TCGplayer, Mercari —
  name as places to look, not as recommendations.
- **Materials** are the physical costs of one shipped card: penny sleeve,
  toploader (the rigid plastic case), envelope or bubble mailer, label,
  sometimes tape. Bought in bulk they feel free; per sale they are real
  cents, and at volume the cents are dollars. The learner prices one sale's
  worth honestly (bulk price ÷ count is fine).
- **Real versus simulated, said honestly in learner text:** if the learner
  has actually sold a card, use that sale — real numbers beat clean ones. If
  not, simulate one sale realistically on a copy of the tracker (the module's
  expendable surface; experiments on copies are the established habit): pick
  a card, find what it would list for, use the platform's published fees and
  a real shipping price. Either is honest as long as the tracker doesn't
  record a simulation as a real sale — which is exactly why the simulation
  lives on a copy.
- **Fees as a formula input:** fees should be computed from a fee percentage
  held in its own referenced cell (a named input), not typed as a literal
  into each formula. The break-it section makes the difference felt. (This is
  the magic-numbers lesson from programming, wearing spreadsheet clothes; the
  core may say so, learner text says it in plain words.)
- **Break-even algebra:** with fee rate f (as a fraction of sale price P),
  shipping S, materials M: Profit = P − f·P − S − M = P·(1 − f) − (S + M).
  Profit ≥ 0 exactly when **P ≥ (S + M) / (1 − f)**. Consequence the formula
  proves on its own: fixed costs (S + M) set a floor on viable sale price
  that has nothing to do with what a card is worth — so a card valued below
  its own floor cannot be sold at a profit at any price a buyer would accept.
  Cheap cards are often in this trap; nobody has to assert it, the learner's
  own formula demonstrates it when fed cheap-card numbers.
- **The state transition, options with tradeoffs (learner designs; no right
  answer, but one hard requirement — history must survive):**
  - Delete the sold card's Collection row: cleanest current-state view, but
    history is destroyed — snapshots that included that card's value stop
    being explainable, and past gain/loss stories lose their subject. (This
    is the state-versus-history idea from the snapshots session, now with
    money on it.)
  - Mark the row sold (strikethrough, or better a Status/Sold column,
    possibly with a Sold date): history intact, but every value-total formula
    must now exclude sold rows or the "what is it all worth?" number silently
    counts cards that are gone.
  - Move the row's identity to Sales and keep a marked stub (or the full row,
    excluded from totals) in Collection: the fullest record, the most
    bookkeeping.
  - Whatever the choice, the sold card's journey must remain reconstructable:
    what it was bought for (Purchases/Collection), what the market said
    (Value, snapshots), what actually happened (Sales).
- **Realized vs unrealized, the full statement:** Collection Value is
  *unrealized* — the market's current claim about what the card would fetch,
  costless to hold and costless to be wrong about. Sales Profit is
  *realized* — money that exists, after every cost of making it exist. The
  gap between a card's Value and its sale's Profit is the cost of turning
  paper into pocket: fees, shipping, materials, and whatever discount reality
  applied to the listing price.

## Arc

### Orientation — given plainly

Open with the buying question: every collector has had the packs-or-singles
argument, and it is usually settled with anecdotes — the friend who pulled a
chase card, the box that was all bulk. The learner is in a position almost
nobody arguing on a forum is in: they have a ledger. Every pack purchase is
in Purchases with a cost; every card worth tracking is in Collection with a
value. The argument can be settled with arithmetic — for their packs, their
luck, their money. Then name the session's full shape: buying is half the
honest picture. The other half is what happens when a card leaves — what a
sale actually earns after the platform's cut, postage, and materials. Both
halves, one spine: the honest numbers.

Then the honest wrinkle, up front (it shapes the first half): the Collection
never recorded *where* cards came from. Nothing recorded it, because when
those columns were designed, this question didn't exist yet. That is not a
mistake to be embarrassed about; it is the normal condition of data, and
dealing with it honestly is part of the work.

For the second half, explain what selling a card actually involves before any
formula: a platform takes a percentage (their published fee schedule says how
much — point, don't assert), postage costs what it costs, and the card
travels in materials that were bought with real money. Each of those
subtracts from the sale price before anything reaches the seller. State the
real-or-simulated choice honestly and plainly, with real preferred and
simulation done on a copy.

New tools: none in the software sense — the New tools section says exactly
this and points at the Sheets function help. Two things to go find instead:
the platform fee schedule (a document, searched by name) and the learner's
own materials, priced from whatever they or their household actually use.

### Predictions to elicit

- Before computing anything: do you believe your packs have paid for
  themselves? Commit — yes or no, and by roughly how much.
- What fraction of your total pulled value do you think comes from your
  single best pull?
- Pick the card you'd most plausibly sell. Its Value column says one number.
  How much of that number do you think ends up in your pocket after
  everything? Write the dollar figure.
- What do you think one shipped card's materials — sleeve, toploader,
  mailer — actually cost, in cents?
- Is there a card in your Collection that *cannot* be sold at a profit no
  matter what? What would make that true?

### The work — goals and success criteria (level 3: no hint ladders)

First half — what buying really earns:

1. **Mark provenance.** Goal: a From column on Collection recording where
   each card came from (Pack, Single, Trade, Gift — validated, for reasons
   already lived). For existing rows: fill from memory where sure; where
   unsure, either mark the guess as a guess (e.g. `Pack?`) and decide whether
   guesses count, or leave it out of the analysis. Success: every card either
   has a provenance or is deliberately excluded, and the learner can say
   which rule they applied. The delivery names the deep fact plainly
   (orientation, not a puzzle): past data didn't record this because past-you
   didn't know it would matter, and no formula can recover what was never
   written down.
2. **Compute the three numbers.** Goal, on the Stats tab: total pack spend
   (from Purchases), total pulled value (from Collection, From = Pack), and
   the pull rate (their ratio). Success: each number is a formula, not a
   typed total, and recalculates when a row changes.
3. **Name the expected value.** Goal: packs opened (a count, from Purchases)
   and pulled value ÷ packs opened — what a pack has been worth on average,
   before opening, in this learner's hands. Success: one cell, labeled in
   plain language, that the learner can read out loud as a sentence.
4. **Make the comparison honest.** Goal: set the pull rate against the
   singles alternative — the same money at listed prices buys exactly the
   cards you want, ratio 1.0 by construction, no lottery — and write a
   verdict in the logbook: packs, singles, or "packs, but knowingly paying
   $X per pack for the fun." Success criterion: the verdict cites the
   learner's numbers, and it also states what the numbers don't cover — the
   spreadsheet priced the cards, not the opening. Both halves are required;
   the second is the harder skill.

The internal transition (delivery renders it as connective prose, not a
goal): every number in the verdict has "on paper" hiding in it — the pulled
value is what the market *says*, and the snapshots sessions already planted
the doubt about what that means. The second half measures exactly how wide
the paper-to-pocket gap is, in dollars, for one real card.

Second half — what selling really costs:

5. **Build the Sales tab.** Goal: a new tab, Date | Card | Sale price |
   Fees | Shipping | Materials | Profit, with Profit as a formula (sale price
   minus the three costs), and the fee percentage held in its own labeled
   cell that the Fees column references — not typed into formulas. Success:
   changing the fee cell changes every row's Fees and Profit.
6. **Dissect one sale.** Goal: one row filled with a real sale if one has
   happened (preferred — real numbers beat clean ones), otherwise one
   realistically simulated sale built on a copy of the tracker: a real
   listing price for the chosen card, the platform's current fee from its
   published schedule (found, not assumed), real postage, materials priced
   honestly (bulk price divided by count is fine). Success: Profit computes,
   and the learner can narrate every subtraction in the row out loud.
7. **Measure the gap.** Goal: set the row's Profit against the card's Value
   in Collection — one cell computing Value − Profit, labeled plainly (the
   cost of turning paper into pocket). Success: the learner's predicted
   pocket figure from the Predict section gets checked against the computed
   one in the logbook.
8. **Design the state transition.** Goal: decide what happens in the tracker
   when a card is sold, under one hard requirement: history must survive —
   the card's whole journey (bought for, valued at, sold for, netted) must
   remain reconstructable. Options and tradeoffs stated plainly (delete the
   row and lose history; mark it sold and teach every total to exclude it;
   move it to Sales with a stub left behind). Success: the transition is
   implemented for the dissected sale (on the copy, if simulating), the
   "what is it all worth?" total is verifiably correct afterwards, and the
   design is recorded in the logbook with reasons.
9. **Solve for break-even.** Goal: a cell that answers "what must the sale
   price be for Profit to reach zero?" for any fees-shipping-materials
   combination — algebra rearranged into a formula, referencing the same fee
   cell. Then feed it a cheap card's numbers. Success: the learner can state,
   from their own formula's output, why some cards cannot be sold profitably
   at any believable price — and name the cheapest card in their Collection
   that clears the bar.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Delete your luck.** Recompute the pull rate excluding the single best
  pull (temporarily blank its From cell, or subtract its value in a scratch
  cell — the learner picks the mechanism). Watch the ratio swing. In a sample
  this size, one card can *be* the answer. Felt first, then named: outliers
  own small samples, and this is why the number will keep drifting as packs
  accumulate — and why any forum poster quoting a pull rate off twenty packs
  is quoting noise. Undo: restore the cell.
- **Forget the pennies.** Blank the Materials cell in one row of Sales.
  Profit rises; nothing turns red; the row looks *better* while being wrong.
  This is the classic accounting error — the silent omission. A wrong number
  that looks healthy is more dangerous than an error message, because nothing
  asks you to fix it; the defense is knowing the full cost list and checking
  rows against it, which the learner now can. Undo: restore the cell.
- **Bury the fee.** Take one row's Fees formula and replace the fee-cell
  reference with the percentage typed in as a literal number. Now change the
  fee cell (platforms do change their rates). Every row updates except the
  buried one — which now lies quietly, forever, or until someone reads every
  formula. Named plainly: a number typed into a formula is invisible and
  unchangeable from outside; a number in a labeled cell is visible,
  changeable once, and consulted everywhere. (Programmers call the buried
  kind a magic number; the learner has now debugged one.) Undo: restore the
  reference.

### What just happened — the explanation

The buying half used four ideas that deserve their names. **Expected value**:
the average worth of an uncertain thing, computed from outcomes — the
learner's pack EV is exactly what a casino computes about every bet it
offers, from the other side of the table. **Sample size**: the fewer packs
behind the number, the less it predicts the next pack; the number isn't
wrong, it's *early*. **Outliers**: in small samples, one result carries the
average, which the learner just measured directly. **Selection effects**:
memory is a biased sample — it keeps the packs worth remembering and discards
the bulk, which is why every collector's gut says packs pay better than their
ledger says. The ledger remembers all of them; that is the entire advantage
of writing things down.

The provenance wall gets its full name: data collected before the question
existed is almost always missing something the question needs. Professionals
hit this every working day — the log that didn't record the one field that
now matters. The fixes are the ones the learner just used: reconstruct
honestly, restrict the analysis to what's solid, and start recording the
field now so future questions land on better data.

The selling half was **unit economics** — the complete cost of one unit of
business, a thing many real businesses never compute honestly. The learner
now has, for one sale: revenue (sale price), variable costs (fees, shipping,
materials), and margin (Profit, and Profit ÷ Sale price if they want the
percentage). Margins are what businesses actually live on — not revenue — and
the learner just watched a healthy-looking sale price shed its costs down to
a much smaller true number.

And the idea that held the session together gets its full statement:
Collection Value is *unrealized* — the market's claim, free to hold, free to
be wrong; it is what the pull rate's numerator was made of. Sales Profit is
*realized* — money that exists, after every cost of making it exist. "Worth
$50" and "gets you $50" are different sentences because between them stand
fees, postage, materials, and the discount reality applies. The break-even
formula is the general tool hiding in the lesson: fixed costs set a price
floor independent of worth, which is why cheap things are so often
unsellable-at-profit everywhere — not just cards — and why bulk lots exist:
bundling spreads one floor across many cards.

### Go further — open questions

- Track the next ten packs with full provenance from the moment of opening —
  every card, every value — and re-run the analysis. Does your ratio move
  toward or away from paying for itself? And at your pull rate, what would a
  pack have to cost to break even? Compare it to what packs actually cost
  near you.
- Your EV number prices the cards. Could you put a number on the opening
  itself — what you'd knowingly pay per pack for the experience? If yes, the
  packs-vs-singles question changes shape. What does it become?
- Generalize the break-even cell into a minimum-listing-price formula for
  *any* card given the current fee schedule — then add a column to Collection
  flagging every card that couldn't clear it. How much of your collection is,
  practically speaking, unsellable one at a time?
- Run the whole operation's number: across every sale in the Sales tab, one
  cell — what has selling netted after every cost? Set it beside what the
  Collection's Value column claimed those cards were worth. Which number do
  you trust more now, and for what purpose?
- Genuinely open: casinos and card packs share a shape — a known price, an
  uncertain payout, an EV the house can compute. Where exactly does the
  analogy hold, and where does it break? (Cards keep their value after the
  reveal; slot outcomes don't. Packs have a floor. Is the floor enough to
  matter?) Nobody has a settled answer; argue it from your numbers.
- Genuinely open, value's last riddle: is a card you would never sell
  "worth" its market price? The market's number assumes a sale you've ruled
  out; no realized value will ever exist to check it. What does Value even
  measure for that card? There is no settled answer — but you now own every
  concept in the question.

## Delivery notes

- Merged from the former `packs-or-singles` and `the-cost-of-selling` cores
  (Part 5's two micro-lessons); their folders are superseded by this one.
- **guided:** level 3 discipline — goals and success criteria, no hint
  ladders, no worked formulas. The named concepts (expected value, sample
  size, outliers, selection effects, unit economics, realized/unrealized)
  appear in "What just happened," after the work, not before. The break-even
  algebra is stated as a goal ("a cell that answers…"), never as a worked
  formula; the rearrangement is the withheld problem-solving.
- The internal transition between halves is connective prose after goal 4:
  the pulled value is paper, and the second half prices the paper-to-pocket
  gap. It replaces the old cost-of-selling opener that leaned on the
  snapshots lesson alone; the snapshots seed is still credited in
  orientation and prerequisites.
- The provenance discussion is orientation, not a withheld puzzle: state the
  gap and the honest options plainly. What's withheld is only the formula
  construction.
- The joy-vs-money passage must stay plain and unsentimental — one clean
  statement that the data answers the money question and is silent on the
  fun question. No winking, no "of course, fun matters too" filler.
- Keep the forum-lore framing from tipping into contempt; the point is that
  the learner has better data, not that other people are fools.
- Singles price sources are volatile: lean on the learner's established
  price-checking habit rather than naming a marketplace. Fee numbers are
  never asserted anywhere in learner text — always "the platform's published
  fee schedule," found by the learner; platform names appear only as places
  with published schedules, not recommendations.
- The real-versus-simulated choice must be stated in exactly the honest
  frame: real preferred, simulation legitimate on a copy, and the reason the
  copy matters (a simulation recorded as a real sale is a lie in the ledger).
- Tone risk in the unit-economics passage: keep it concrete (this row, these
  cents), never business-guru. The margins sentence stays one sentence.
