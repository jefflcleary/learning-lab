# Fetching real prices

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** fetching-real-prices
- **Module / Part:** Building a collection tracker — Part 7 — The outside world
- **Scaffolding:** level 3 — third programming lesson in this module: goals and
  success criteria only; no hint ladders. Orientation (UrlFetchApp, JSON, the word
  API, Logger.log) is still given plainly per the central rule — level 3 withholds
  problem-solving support, never orientation.
- **Exploration lesson** per PRINCIPLES: the current state of card-price data
  sources is unknown, **including to the authors of this material**. The delivery
  says this plainly. Every outcome of the expedition — including "nothing
  currently works acceptably" — is pre-legitimized as success. Deliveries must
  never assert that any particular source exists, is free, or works.
- **Deliveries:** guided only (module-wide decision in MODULE.md)
- **Status:** ready

## Goal and payoff

The dream stated concretely: the Value column updating itself from real market
data. The lesson equips an expedition to find out whether that is currently
possible, free, allowed, and reliable — a question about the world, not about this
page. The learner gains the capability (a script that fetches URLs and parses
JSON), runs a dated survey of what price sources currently exist, attempts one
real price for one real card, and lands at whichever fork the world offers.
Payoff: either a price that arrived in a cell from the outside world by itself —
or a dated, documented account of what exists, what it demands, and why the
attempt stopped, which is stated in exactly these terms as a complete, successful
outcome of an expedition into unknown territory.

The lesson under the lesson: "what exists now, what does it permit, is it worth
it" is the one research skill that never expires, because the answer always
changes.

## Prerequisites

- Scripts and triggers: the learner writes functions, runs them, reads the
  executions log, and schedules them — established by `lessons/first-script/` and
  `lessons/on-a-schedule/`
- A Collection tab with Card, Set, and Value columns — established by
  `lessons/first-ledger/`
- The research habit of reading a project's own documentation — reference page
  `reference/finding-the-docs.md`, surfaced via the stuck-sentence clause

## Establishes

- The learner has fetched a URL from a script and seen the response text; the
  script is authorized to connect to external services
- The learner can say what JSON is, open it with `JSON.parse`, and distinguish a
  page for humans from an answer for programs (the API distinction, earned
  empirically)
- A dated survey of the current card-price-source landscape exists in the
  learner's logbook or a Sources note in the tracker
- One of (equally established, world-dependent): live prices flow into the
  tracker for at least one card; or a key/signup decision was made and documented;
  or a dated record documents that nothing currently acceptable exists — a logged
  wall, understood as a dated fact, not a verdict
- Cited by other cores as: "the learner can fetch and parse external data with
  UrlFetchApp and has surveyed the price-source landscape as of a recorded date —
  established by `lessons/fetching-real-prices/`."

## Facts

- `UrlFetchApp.fetch(url)` requests a URL and returns a response object;
  `.getContentText()` yields the body as text [verify]. Documented at the Apps
  Script developer site (developers.google.com/apps-script) under UrlFetchApp.
- First external fetch triggers a new authorization scope — connecting to an
  external service [verify current scope wording — delivery says "read what it
  asks," as established in this module].
- `fetch` throws an exception on failures; behavior on non-existent domains
  (exception before any response) differs from a 404 on a real domain (an error
  response) [verify current behavior — the break-it has the learner observe, and
  deliveries must not assert the exact messages]. `muteHttpExceptions` exists as
  an option [verify — core note only; not needed in the delivery unless the
  learner's chosen source requires it].
- `Logger.log(...)` (and `console.log`) writes to the execution log, visible after
  a run [verify current viewing surface — the editor shows a log per execution].
  This is the seeing-tool for fetched text and is given plainly.
- `JSON.parse(text)` turns JSON text into values a script can index into —
  well-established JavaScript basics; delivery may assert this much and no more.
- JSON described plainly: names and values in braces, lists in square brackets —
  the same shape family as settings files; designed for programs to read.
- `JSON.parse` on non-JSON text (e.g. an HTML page) throws a parse error naming an
  unexpected character [verify wording — learner reads their own].
- `https://www.example.com` is reserved by the internet's standards bodies as a
  permanent example domain — a stable first fetch target that returns a small
  HTML page. Stable by design; safe to name in deliveries.
- The card-price-source landscape [volatile as of 2026-08 — **unknown to the
  authors; deliberately unsurveyed**]. Candidate names that have historically
  existed, for author orientation only, none confirmed current: TCGplayer (API
  historically gated), the Pokémon TCG API (pokemontcg.io), PriceCharting, eBay's
  APIs, Scryfall (Magic, not Pokémon — sometimes useful as an example of a good
  API). **Deliveries never name these**: the survey is the learner's, and naming
  candidates would both rot and pre-empt the expedition.
- Search vocabulary the delivery *does* give plainly (method, not findings):
  "trading card price API", "<game name> card price API", "API" as a word to
  search with — API defined as a service's front door for programs (Application
  Programming Interface), as opposed to its pages for humans.
- Evaluation criteria for any candidate source (the delivery gives these plainly —
  they are method, not answers): its own docs exist and are current? A key
  (an access credential issued on signup) required? Terms of use — is this use
  allowed? Cost? Rate limits (how often a guest may ask)? Freshness of the data?
- Signup/key note: creating accounts may need an adult per module README's
  account stance; terms documents are read before agreeing — consistent with the
  authorization-reading habit.
- Rate-limit conduct: read limits before scheduling anything; a guest in someone
  else's system behaves like one. Any schedule chosen should be gentle (weekly,
  matching the snapshot rhythm) and only if terms allow automated access.
- Survey rot: the survey's own findings are dated facts. The delivery instructs
  date-stamping the survey (logbook or a Sources note in the tracker) and says
  plainly that this survey rots — re-running it later is expected, not failure.

## Arc

### Orientation — given plainly

The dream, concretely: Values updating themselves from real market data. The
honest frame, stated in the open, first: whether this is currently possible,
free, allowed, and reliable is a question about the world, not about this page —
sources appear, change their terms, add keys, and vanish, and the current state is
unknown *including to the people who wrote this lesson*. Finding out is the work,
and every outcome of finding out is a result.

The capability given plainly: `UrlFetchApp` — a script can request any URL and
receive what comes back, which is the door to the entire internet; its docs
pointed at. `Logger.log` as the way to see what came back. JSON named as a data
shape and `JSON.parse` as its opener. API defined plainly as a word to search
with: a service's front door for programs, distinct from its pages for humans.

### Predictions to elicit

- How many services do you expect currently publish trading-card prices in a form
  programs can read? A number.
- What do you expect they want in exchange — nothing, an account, money, limits on
  how often you may ask? Rank the likelihood.
- This page was written on some date in the past. Do you expect its authors knew
  whether this works? (They didn't — and the lesson says so. What does that
  change about how to treat any tutorial's claims about live services?)

### The work — goals and success criteria (level 3: no hint ladders)

0. **Name a version** (`before fetching`).

1. **Prove the capability.** Goal: a function that fetches
   `https://www.example.com` and logs the response text. Success criteria: the
   authorization prompt for external connections was read and granted; the
   execution log shows the fetched text; the learner has looked at that text and
   can say what kind of thing it is (a page meant for humans — this observation is
   banked for the break-it section and the API distinction).

2. **The survey.** Goal: a dated map of what currently exists. Method given
   plainly (it is orientation): search with the given vocabulary; for each
   candidate found, evaluate it the way any project is evaluated — from its own
   documentation, not from tutorials about it: does it exist and look maintained?
   Is a key required? Do its terms allow this use? What does it cost? What are
   its rate limits? How fresh is its data? Success criteria: at least three
   candidates evaluated from their own docs; findings logged **with the date** in
   the logbook or a Sources note in the tracker; for each candidate, a one-line
   verdict the learner could defend. The delivery states plainly that this survey
   itself rots — which the learner, by now, knows to expect.

3. **The attempt.** Goal: the most promising source, one real card from the
   Collection tab, one price, landed in a cell by script. The request's exact
   shape comes from the source's own docs (URL to call, key placement if any,
   response format). Success criteria: either a number in a cell that came from
   the outside world — checked against the source's website by eye for sanity —
   or a documented, specific reason the attempt stopped (which feeds step 4
   honestly). Parsing guidance stays generic: if the response is JSON,
   `JSON.parse` opens it; logging the parsed structure first and reading it
   before reaching into it is the sane order of operations.

4. **The fork.** All outcomes pre-legitimized, in the delivery's own words:
   - **It works.** Wire a few cards, not the whole collection. Before any
     trigger: read the rate limits and terms *first* — a guest in someone else's
     system behaves like one — and if automated access is allowed, a gentle
     schedule (weekly, the snapshot rhythm) is plenty; card prices don't move by
     the minute.
   - **It needs a key or signup.** Read the terms before agreeing (the
     authorization-reading habit, aimed outward). Decide whether the terms are
     acceptable — cost, what's collected, what's permitted — and proceed or
     decline; both are decisions, and the decision gets logged either way.
     Account creation may involve an adult, per the module's account stance.
   - **Nothing currently works acceptably.** Document what was found, as of when,
     and why each candidate fell short — and the delivery says, in exactly these
     words: this is a complete, successful outcome of an expedition into unknown
     territory. The constraint goes in the logbook as a wall, dated — and
     constraints are dated facts, not verdicts; the survey can be re-run in six
     months against a changed world.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Fetch a URL that doesn't exist.** A made-up domain. Read the entire failure —
  what it says, where it appears. Teaches: the failure of "no such place" and
  what a fetch error looks like when the problem is the address rather than the
  content; compare with what a wrong path on a *real* site returns, if the
  learner's chosen source offered any errors during step 3. Nothing to undo.
- **Parse a page for humans as if it were an answer for programs.**
  `JSON.parse` the example.com text from step 1. Read the error. Then look at
  the two artifacts side by side — the HTML that broke the parser, and (if step 3
  produced any) the JSON that didn't — and say the difference out loud. Teaches:
  the API distinction, earned rather than asserted — a page for humans and an
  answer for programs are different artifacts, built for different readers, and
  the parser's failure is the proof. Nothing to undo.

### What just happened — the explanation

The module's whole arc lands here, and the delivery should draw it explicitly but
plainly: the tracker began as typed cells; then formulas that computed instead of
being computed for; then tabs that answered questions; charts; a form; scripts;
schedules — and now it asks the internet questions by itself. Every capability
was layered on the previous one, and none of them was magic when it arrived.

One layer deeper on the mechanics: `UrlFetchApp.fetch` is the same act a browser
performs for every page — ask a URL, receive text — with the human removed. The
web's pages and the web's APIs travel over the same mechanism; what differs is
the *audience of the reply*, which is exactly what the parse error demonstrated.

And the skill exercised today — what exists right now, what does it permit, is it
worth it — is the one that never expires, precisely because its answer always
changes. Documentation rots, tutorials rot, this lesson rots; the method of
finding out does not. Whatever the expedition found, the learner now owns a dated
piece of knowledge about the world that no page could have told them.

### Go further — open questions

- A Sources tab in the tracker: every service surveyed, verdict, and date —
  re-surveyed quarterly. The tracker could track the ecosystem it depends on.
- If any source allows it: price history *per card* — the Snapshots pattern
  applied one level down. Which cards would reward watching, and what would the
  chart of a single card's price say that the whole-collection chart hides?
- The lesson itself is open by construction: everything found today is a dated
  fact about a moving world. The genuinely open question is the expedition's own:
  what will this landscape look like when it's surveyed again — and what, having
  now done it once, would be checked first?

## Delivery notes

- **guided:** the lab's flagship exploration lesson. The honest frame — "the
  authors don't know either" — appears early, in plain words, in What-this-is; it
  is the lesson's spine, not a disclaimer. No hedging tone anywhere else: the
  capability parts (fetch, parse, log) are taught with full confidence because
  they are stable.
- Level 3: no `<details>` blocks. Goals and success criteria carry the work
  sections; orientation stays generous per the central rule.
- Never name candidate price sources in the delivery (core lists some for author
  orientation only). Naming them both rots and pre-empts the survey.
- The nothing-works outcome must be written with genuine, unforced dignity — "a
  complete, successful outcome of an expedition into unknown territory" in
  exactly those words — and must not read as a consolation prize. Wall-logging it
  is part of the outcome, with the framing that constraints are dated facts, not
  verdicts.
- Rate-limit conduct ("a guest in someone else's system behaves like one") is a
  values sentence and stays in.
- example.com is the only URL the delivery may assert as a fetch target.
