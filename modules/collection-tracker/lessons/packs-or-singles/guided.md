# Packs or singles?

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every collector has had this argument. Are packs worth it, or should the money
go straight to singles — the exact cards you want, bought outright at listed
prices? It usually gets settled with anecdotes: the friend who pulled a chase
card in their second pack, the box that turned out to be all bulk. Anecdotes are
how the argument stays unsettled forever.

You are in a position almost nobody arguing about this is in: you have a ledger.
Every pack you've bought is in Purchases with a cost next to it. Every card
worth tracking is in Collection with a value. That means the argument can be
settled with arithmetic — not for packs in general, but for *your* packs, *your*
luck, *your* money, which is the only version of the question that was ever
about you. This session computes what your packs actually cost, what the cards
you pulled from them are worth now, and what that says about the next pack you
haven't bought yet.

One honest complication is waiting in the middle of it, and it's the most
valuable thing here: your Collection never recorded which cards came from packs.
Nothing recorded it — because when you designed those columns, this question
didn't exist yet. Working through that gap honestly is part of the session, not
a detour from it.

---

## Before you start

You need:

- **Months of purchase history, including packs.** A Purchases tab with real
  buys and costs, built in [Every pack you open](../every-pack-you-open/guided.md).
  Quick check: you can point at several pack purchases with costs filled in.
- **A Collection with values.** Cards and their current worth, begun in
  [What is it all worth?](../first-ledger/guided.md). Quick check: the Value
  column is filled in and reasonably current.
- **Stats skills.** You've written SUMIF and COUNTIF formulas with criteria,
  reaching across tabs, as in
  [Questions your data can answer](../questions-your-data-can-answer/guided.md).
  Quick check: you can explain what the criteria argument in one of your
  existing SUMIF formulas does.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A From column on Collection recording where each card came from — the
  tracker's first piece of provenance
- Three live numbers: what your packs cost in total, what the cards pulled from
  them are worth now, and the ratio between the two — your personal pull rate
- One number nobody on any forum has: what a pack is worth on average, before
  opening, in your hands, from your own history
- A written verdict on packs versus singles that cites your numbers — and says
  plainly what the numbers don't cover

---

## New tools

None. Everything in this session is built from tools you already use — SUMIF,
COUNTIF, cross-tab references, and arithmetic between cells. If you want to
check a function's exact behavior, every Sheets function has its own page in
Google's [Docs editors help center](https://support.google.com/docs) — searching
the function name plus "Google Sheets" lands on it.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Before computing anything: do you believe your packs have paid for
  themselves? Commit to yes or no, and roughly by how much.
- What fraction of your total pulled value do you think comes from your single
  best pull? A guess, as a percentage.
- If you opened ten more packs tomorrow, would you expect your answer to
  improve, get worse, or hold steady — and why?

---

## The work

This is a project: goals and what "done" looks like, and the building is yours.

### Mark provenance

The Collection needs a **From** column: where each card came from — Pack,
Single, Trade, Gift. Make it a validated list; you already know what free-typed
categories do to a SUMIF.

For the cards already in the Collection, there is no formula that can fill this
in, because the information was never written down. Past-you didn't record it,
because past-you didn't know it would matter — and no one designs columns for
questions they haven't had yet. You have two honest options, and you may mix
them: fill in provenance from memory where you're genuinely sure, and for the
rest, either mark the guess as a guess (something like `Pack?`) and decide
whether guesses count in your analysis, or leave those cards out of it. What
you may not do is guess silently and then treat the result as certain.

**Done when:** every card either has a provenance or is deliberately excluded,
and you can state in one sentence which rule you applied.

### Compute the three numbers

On your Stats tab, three cells, each one a formula rather than a typed total:

1. **Total pack spend** — everything Purchases says you've spent on packs.
2. **Total pulled value** — the current value of every Collection card that
   came from a pack.
3. **Pull rate** — the second divided by the first.

A pull rate of 1.0 means your packs have returned, on paper, exactly what they
cost. Above it, your packs have beaten their price; below it, they haven't.

**Done when:** all three recalculate on their own — change a card's value or
add a pack purchase, and the ratio moves without you touching it.

### Name the expected value

Two more cells: a count of the packs you've opened (Purchases knows; if some
rows bundle several packs into one purchase, count honestly and note it), and
your total pulled value divided by that count.

That second number is what a pack has been worth *on average, before opening* —
in your hands, from your history. Label the cell in plain language.

**Done when:** you can read the cell out loud as a full sentence — "on average,
a pack has been worth ___ to me before I open it" — and the number behind it is
a formula.

### Make the comparison honest

Now the other side of the argument. The same money spent on singles buys
exactly the cards you want, at listed prices — you already have a habit for
checking those. No ratio, no lottery: with singles, a dollar buys a dollar of
chosen card, by construction. Your pull rate is the number that says what a
dollar of packs has bought *you*.

Write the verdict in your logbook, and hold it to two requirements. First, it
cites your numbers — the pull rate, the per-pack expected value, what a pack
costs near you. Second, it states what the numbers don't cover: the spreadsheet
priced the cards, not the opening. Packs are also the ripping, the maybe, the
story of the good pull — and this analysis is silent on all of that, because no
column measures it. The data answers the money question and only the money
question. A verdict like "singles, by the numbers" is honest; so is "packs, and
I now know I'm paying about ___ per pack for the fun." Knowing exactly which
question your data answered — and saying so — is the skill this whole session
was for.

**Done when:** the verdict is in the logbook with both halves present.

---

## Break it on purpose

**Delete your luck.** Recompute the pull rate with your single best pull
excluded — temporarily blank its From cell, or subtract its value in a scratch
cell, whichever you prefer. Watch what happens to the ratio.

For most collections at this stage, the swing is large — sometimes the whole
verdict flips. Sit with that: one card is carrying a measurable share of your
answer. Now put the cell back and keep the lesson: in a small sample, an
outlier doesn't influence the average, it *owns* it. This is also why your
number will keep drifting as more packs enter the ledger — and why anyone
quoting a pull rate off twenty packs, including you today, is quoting a number
that's still mostly luck.

---

## What just happened

Four ideas did the work in this session, and they have names worth keeping.

**Expected value** — the average worth of an uncertain thing, computed from
actual outcomes. Your per-pack number is exactly what a casino computes about
every bet it offers; you've just done it from the player's side of the table,
with your own money as the data.

**Sample size** — the fewer packs behind a number, the less it predicts the
next pack. Your number isn't wrong; it's *early*. It will firm up as the ledger
grows, and knowing that is part of owning it.

**Outliers** — you measured this one directly: remove one card and the answer
swings. Small samples don't dilute unusual results, they get dominated by them.

**Selection effects** — the packs you remember are the good ones. Memory is a
biased sample: it keeps what's worth retelling and quietly discards the bulk.
That is why nearly every collector's gut says packs pay better than their
ledger says — and it is the entire reason ledgers beat memory for questions
like this. The ledger remembers all of them.

And the provenance wall you hit deserves its full name too: **data collected
before the question existed is almost always missing something the question
needs.** People who analyze data for a living hit this constantly — the record
that captured everything except the one field that now matters. The fixes are
the ones you just used: reconstruct honestly, restrict the analysis to what's
solid, and start recording the field now, so the next question lands on better
data than this one did.

---

## Go further

- Track your next ten packs with full provenance from the moment of opening —
  every card, every value, From filled in on day one — then re-run the whole
  analysis. Does the ratio move toward paying for itself, or away?
- Solve for the pack price: at your pull rate, what would a pack have to cost
  for packs to break even? The formula is one division away from what you
  already built. Compare the answer to what packs actually cost near you.
- Your expected value prices the cards. Could you put a number on the opening
  itself — what you would knowingly pay per pack for the experience? If you
  can, the packs-or-singles question changes shape entirely. What does it turn
  into?
- Genuinely open: casinos and card packs share a shape — a fixed price in, an
  uncertain payout out, an expected value the house can compute. Where exactly
  does the analogy hold, and where does it break? Cards keep value after the
  reveal; a losing slot ticket keeps none. Packs have a floor. Is the floor
  enough to change the game? Nobody has a settled answer — argue it from your
  numbers.

---

## What you have now

- A From column on Collection: the tracker records provenance from here on,
  with honest markings on everything reconstructed from memory
- Your personal pull rate and per-pack expected value, live on the Stats tab,
  recalculating as the ledger grows
- Direct experience of what one outlier does to a small sample — and the reason
  your number will drift as data accumulates
- A written packs-or-singles verdict that cites your own data and names what
  the data cannot answer
