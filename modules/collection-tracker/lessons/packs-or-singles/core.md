# Packs or singles?

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** packs-or-singles
- **Module / Part:** collection-tracker — Part 5, The honest numbers
- **Scaffolding:** level 3 — a composition/analysis project. Every skill it uses
  (SUMIF/COUNTIF, cross-tab references, adding a column, honest data entry) is at
  least a third exposure. Deliveries give goals and success criteria only; no
  hint ladders.
- **Deliveries:** guided only (per module MODULE.md)
- **Status:** ready

## Goal and payoff

Answer the oldest question in collecting — are packs worth it, or should the
money go to singles? — from the learner's own ledger instead of forum lore.
The learner computes what their packs actually cost, what the cards pulled from
those packs are worth now, and the ratio between them: a personal pull rate, and
from it the expected value of a pack *to them*. Along the way they hit a real
data-modeling wall — the Collection never recorded which cards came from packs,
because past-them didn't know the question was coming — and work through it
honestly rather than around it.

Payoff, showable: one number ("on average, a pack has been worth $X to me before
opening") and a defensible answer to the packs-vs-singles argument that every
collector has had. It is the learner's own number, from their own data, and
nobody on a forum has it.

## Prerequisites

- A Purchases tab holding months of real purchase history, including pack
  purchases with costs — established by `lessons/every-pack-you-open/`
- A Collection tab with current Value per card — established by
  `lessons/first-ledger/`
- Stats skills: SUMIF/COUNTIF with criteria, cross-tab references — established
  by `lessons/questions-your-data-can-answer/`

## Establishes

- The Collection tab carries provenance: a From/source column marking (with
  honest confidence) which cards came from packs
- The learner has computed their personal pull rate — value pulled per dollar
  spent on packs — and the expected value of a pack from their own history
- The learner has felt what one outlier does to a small sample and can say why
  the number will drift as data grows
- Cited by other cores as: "the Collection records where cards came from, and
  the learner has computed their own pack expected value — established by
  `lessons/packs-or-singles/`."

## Facts

- Everything numeric here is built from functions already established: SUMIF
  (sum Cost where Type is the pack category), COUNTIF (count pack purchases),
  and arithmetic between cells. Function help: each function's page in Google's
  Sheets function list (the same help center as always — search "SUMIF Google
  Sheets" and land on support.google.com).
- **The provenance gap, stated honestly:** the Collection has no column saying
  where a card came from. Past data cannot be re-collected — the learner either
  reconstructs from memory (honestly, marking guesses as guesses) or restricts
  the analysis to cards they're sure about. Both are legitimate; pretending
  certainty is not. This is the deep lesson and the core names it plainly: data
  collected before a question existed is almost always missing something the
  question needs, and real analysts hit this constantly.
- A "From" (or "Source") column on Collection is the fix going forward: values
  like `Pack`, `Single`, `Trade`, `Gift` — and it should be validated, because
  the learner already knows what unvalidated categories do to SUMIF.
- The three headline numbers:
  - **Total pack spend** = SUMIF over Purchases where Type is the pack category.
  - **Total pulled value** = SUMIF over Collection, summing Value where
    From = Pack.
  - **Pull rate** = pulled value ÷ pack spend (a ratio; 1.0 means packs have
    returned exactly what they cost, on paper).
- **Expected value**, named gently: (total pulled value) ÷ (number of packs
  opened) = what a pack has been worth *on average, before opening* — to this
  learner, from this history. Not the internet's number; theirs. The count of
  packs comes from COUNTIF over Purchases (or an honest manual count if some
  pack purchases were bundled into one row — say so).
- **The singles comparison:** the same money spent on singles buys exactly the
  chosen cards at listed prices — no ratio, no lottery. There is no formula for
  this side; the comparison is the pull-rate ratio against 1.0, plus the
  qualitative difference (choice vs chance). Where singles prices live is the
  learner's established price-checking habit from the first ledger [volatile —
  marketplaces and price sources shift; point, don't assert].
- **What the analysis cannot see, stated in learner text, plainly:** the
  spreadsheet prices the cards, not the opening. Packs are also entertainment —
  the ripping, the maybe, the story of the good pull. The data answers the money
  question and is silent on the joy question. Knowing which questions the data
  answers — and saying so out loud — is the actual skill. (If a "what data can't
  answer" thread exists elsewhere in the module, this echoes it; the point
  stands alone regardless.)
- Outlier/sample-size facts for the break-it and explanation:
  - In a small sample, one lucky pull can carry the whole ratio; removing the
    single best pull and recomputing shows how much of the answer is one card.
  - The pull rate will drift as more packs are opened; the smaller the sample,
    the less the current number predicts the next pack.
  - Selection effect, named: memory keeps the good packs; the ledger keeps all
    of them. This is *why* ledgers beat memory for this question.

## Arc

### Orientation — given plainly

Open with the question itself: every collector has had the packs-or-singles
argument, and it is usually settled with anecdotes — the friend who pulled a
chase card, the box that was all bulk. The learner is in a position almost
nobody arguing on a forum is in: they have a ledger. Every pack purchase is in
Purchases with a cost; every card worth tracking is in Collection with a value.
The argument can be settled with arithmetic — for their packs, their luck,
their money.

Then the honest wrinkle, up front (it shapes the whole session): the Collection
never recorded *where* cards came from. Nothing recorded it, because when those
columns were designed, this question didn't exist yet. That is not a mistake to
be embarrassed about; it is the normal condition of data, and dealing with it
honestly is part of the work.

No new tools. Everything is SUMIF, COUNTIF, and arithmetic — the New tools
section says exactly this and points at the Sheets function help for reference.

### Predictions to elicit

- Before computing anything: do you believe your packs have paid for
  themselves? Commit — yes or no, and by roughly how much.
- What fraction of your total pulled value do you think comes from your single
  best pull?
- If you opened ten more packs tomorrow, would you expect your ratio to go up,
  down, or stay put — and why?

### The work — goals and success criteria (level 3: no hint ladders)

1. **Mark provenance.** Goal: a From column on Collection recording where each
   card came from (Pack, Single, Trade, Gift — validated, for reasons already
   lived). For existing rows: fill from memory where sure; where unsure, either
   mark the guess as a guess (e.g. `Pack?`) and decide whether guesses count, or
   leave it out of the analysis. Success: every card either has a provenance or
   is deliberately excluded, and the learner can say which rule they applied.
   The delivery names the deep fact plainly (orientation, not a puzzle): past
   data didn't record this because past-you didn't know it would matter, and no
   formula can recover what was never written down.
2. **Compute the three numbers.** Goal, on the Stats tab: total pack spend
   (from Purchases), total pulled value (from Collection, From = Pack), and the
   pull rate (their ratio). Success: each number is a formula, not a typed
   total, and recalculates when a row changes.
3. **Name the expected value.** Goal: packs opened (a count, from Purchases)
   and pulled value ÷ packs opened — what a pack has been worth on average,
   before opening, in this learner's hands. Success: one cell, labeled in plain
   language, that the learner can read out loud as a sentence.
4. **Make the comparison honest.** Goal: set the pull rate against the singles
   alternative — the same money at listed prices buys exactly the cards you
   want, ratio 1.0 by construction, no lottery — and write a verdict in the
   logbook: packs, singles, or "packs, but knowingly paying $X per pack for the
   fun." Success criterion: the verdict cites the learner's numbers, and it
   also states what the numbers don't cover — the spreadsheet priced the cards,
   not the opening. Both halves are required; the second is the harder skill.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Delete your luck.** Recompute the pull rate excluding the single best pull
  (temporarily blank its From cell, or subtract its value in a scratch cell —
  the learner picks the mechanism). Watch the ratio swing. In a sample this
  size, one card can *be* the answer. Felt first, then named: outliers own
  small samples, and this is why the number will keep drifting as packs
  accumulate — and why any forum poster quoting a pull rate off twenty packs is
  quoting noise. Undo: restore the cell.

### What just happened — the explanation

Four ideas got used, and they deserve their names. **Expected value**: the
average worth of an uncertain thing, computed from outcomes — the learner's
pack EV is exactly what a casino computes about every bet it offers, from the
other side of the table. **Sample size**: the fewer packs behind the number,
the less it predicts the next pack; the number isn't wrong, it's *early*.
**Outliers**: in small samples, one result carries the average, which the
learner just measured directly. **Selection effects**: memory is a biased
sample — it keeps the packs worth remembering and discards the bulk, which is
why every collector's gut says packs pay better than their ledger says. The
ledger remembers all of them; that is the entire advantage of writing things
down.

And the provenance wall gets its full name: data collected before the question
existed is almost always missing something the question needs. Professionals
hit this every working day — the log that didn't record the one field that now
matters. The fixes are the ones the learner just used: reconstruct honestly,
restrict the analysis to what's solid, and start recording the field now so
future questions land on better data.

### Go further — open questions

- Track the next ten packs with full provenance from the moment of opening —
  every card, every value — and re-run the analysis. Does your ratio move
  toward or away from paying for itself?
- Solve for the pack price: at *your* pull rate, what would a pack have to cost
  for packs to break even? The formula is one division away from what you
  built. Compare it to what packs actually cost near you.
- Your EV number prices the cards. Could you put a number on the opening
  itself — what you'd knowingly pay per pack for the experience? If yes, the
  packs-vs-singles question changes shape. What does it become?
- Genuinely open: casinos and card packs share a shape — a known price, an
  uncertain payout, an EV the house can compute. Where exactly does the analogy
  hold, and where does it break? (Cards keep their value after the reveal; slot
  outcomes don't. Packs have a floor. Is the floor enough to matter?) Nobody
  has a settled answer; argue it from your numbers.

## Delivery notes

- **guided:** level 3 discipline — goals and success criteria, no hint
  ladders, no worked formulas. The named concepts (expected value, sample
  size, outliers, selection effects) appear in "What just happened," after the
  work, not before.
- The provenance discussion is orientation, not a withheld puzzle: state the
  gap and the honest options plainly. What's withheld is only the formula
  construction.
- The joy-vs-money passage must stay plain and unsentimental — one clean
  statement that the data answers the money question and is silent on the fun
  question. No winking, no "of course, fun matters too" filler.
- Keep the forum-lore framing from tipping into contempt; the point is that
  the learner has better data, not that other people are fools.
- Singles price sources are volatile: lean on the learner's established
  price-checking habit rather than naming a marketplace.
