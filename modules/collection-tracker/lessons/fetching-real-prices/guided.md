# Fetching real prices

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every Value in your Collection tab got there the same way: you looked a price up
somewhere and typed it in. The dream is obvious — those cells updating themselves,
from real market data, on their own.

Here is the honest truth about this session, stated up front because it changes
how you should read everything below: **whether that dream is currently possible —
free, allowed, and reliable — is not known. Not by you, and not by the people who
wrote this page.** Price data lives in the world, not in lessons: services appear,
change their terms, start requiring keys, shut down. Any page claiming to know the
current answer is really telling you what was true on the day it was written.

So this session is an expedition. You'll be equipped properly — a script that can
ask the internet questions and read the answers is the new capability, and it's
taught with full confidence because it doesn't rot. Then you'll survey what price
sources exist *right now*, attempt to land one real price for one real card, and
follow the result wherever it leads. Every outcome of that expedition, including
discovering that nothing currently works on acceptable terms, is a finding. This
is what most real technical work looks like: nobody has written down the answer,
and finding out is the job.

---

## Before you start

You need:

- **A tracker that runs scripts on triggers.** You write functions, run them,
  read the executions log, and schedule them — built in
  [Automating the tracker with Apps Script](../apps-script-automation/guided.md) and
  [Automating the tracker with Apps Script](../apps-script-automation/guided.md). Quick check: you can open the
  script editor, name the functions in it, and find last week's runs in the
  executions log.
- **A Collection tab with Card, Set, and Value columns.** There since
  [Building the ledger: cards, formulas, formatting](../building-the-ledger/guided.md). Quick check: pick one card
  you'd most want live prices for — you'll use it today.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This lesson leans on real documentation — [Finding the real documentation](../../../../reference/finding-the-docs.md) helps when searching turns up noise.

---

## What you'll have at the end

By the end of this session you will have:

- A script that fetched a page from the internet and showed you what came back —
  a capability that opens the entire web to your tracker
- A dated survey of what card-price sources currently exist and what each one
  demands
- One of the following, each a completed expedition: a real market price that
  arrived in a cell by script; a documented decision about a source's signup or
  terms; or a dated record of why nothing currently works acceptably
- The difference between a page for humans and an answer for programs — seen for
  yourself, in the wreckage of a parser

---

## New tools

**UrlFetchApp** is the Apps Script service that lets a script request a URL — any
URL — and receive what comes back. This is the same act your browser performs for
every page you visit: ask an address, receive text. With it, your script can ask
questions of anything on the internet. Its reference pages are at Google's Apps
Script developer site
([developers.google.com/apps-script](https://developers.google.com/apps-script)),
under UrlFetchApp.

**Logger.log** is how a script shows you things. Whatever you pass it gets written
into that run's entry in the execution log, where you can read it after the run.
It's the seeing-tool for this whole session: fetch something, log it, look.

**JSON** is a shape data comes in: names and values in curly braces, lists in
square brackets — all as plain text, designed for programs to read.
`JSON.parse(text)` turns JSON text into values your script can reach into. You've
met this shape's family before; settings and data have been arriving in
name-and-value form all module.

**API** — the most useful word of the day, and mostly as a *search term*. It
stands for Application Programming Interface, and it means a service's front door
for programs: the same information the service shows humans on its web pages,
offered in a form built for code. When you search for price sources today, "API"
is the word that separates "site I could look at" from "service my script could
ask."

As always: script code is typed by hand, not pasted.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- How many services do you think currently publish trading-card prices in a form
  programs can read? An actual number.
- What do you expect they want in exchange — nothing, an account, money, limits on
  how often you may ask? Rank these from most to least likely.
- This page told you its authors don't know whether today's goal is achievable.
  Most tutorials don't say that — but they're all written on some date, about
  services that keep changing. What does that mean for how much to trust any
  tutorial's claims about a live service?

---

## The work

### Name a version first

**File → Version history → Name current version** — `before fetching`.

### Prove the capability

First, establish that your script can reach the internet at all — against a target
that can't fail you. The address `https://www.example.com` is reserved by the
internet's standards bodies as a permanent example; it has one job, which is to
exist.

**Goal:** a function that fetches that URL and logs what comes back.

**Done when:**

- The authorization prompt appeared and you read it — connecting to external
  services is a new permission, and by now reading these is habit
- The execution log shows the fetched text
- You've actually read some of that text and can say what kind of thing it is —
  because you'll need that observation later in this session

The pieces: `UrlFetchApp.fetch(url)` returns a response; the response's
`getContentText()` is the text of it; `Logger.log` makes it visible. The exact
signatures are on the UrlFetchApp pages at the developer site — confirming them
there is part of the work.

What you're looking at in that log is a page — the same thing a browser would
render, caught in text form, written for human eyes. Hold that thought.

### The survey

Now the expedition proper. **Goal:** a dated map of what price sources currently
exist for trading cards, each one judged from its own documentation.

Search with intent. Useful phrases: `trading card price API`, or your game's name
plus `card price API` — and follow the names you meet into further searches. You
are hunting for services' own documentation, not blog posts or videos about them;
a tutorial about a service tells you what was true when the tutorial was made,
and you already know what that's worth.

For each candidate you find, answer the questions any project gets asked, from
its own pages:

- Does it exist and look maintained — recent updates, docs that match reality?
- Is a **key** required — an access credential you get by signing up?
- Do its **terms of use** allow what you want to do — personal use, automated
  requests?
- What does it cost — genuinely free, free tier with limits, paid?
- What are its **rate limits** — how often may a program ask?
- How fresh is its data, and where does that data come from?

**Done when:** at least three candidates evaluated this way, and the findings
logged **with today's date** — in your logbook, or in a Sources note in the
tracker. One line of verdict per candidate, defensible from what you read.

Date-stamping isn't fussiness. This survey is a photograph of a moving landscape;
it starts rotting the day you take it. That's not a flaw in your work — it's the
nature of every survey of anything alive, and you now know to expect it.

### The attempt

**Goal:** your most promising source, one real card from your Collection tab, one
price, landed in a cell by your script.

The exact request — what URL to call, where a key goes if there is one, what
shape the answer comes back in — comes from the source's own documentation. That
is the whole discipline of this step: their docs are the authority, and reading
them is the work. If the answer comes back as JSON, `JSON.parse` opens it — and
the sane order of operations is to log the parsed result and *read its shape*
before trying to reach into it for the price. Landing the number can start in a
scratch cell before it touches the real Value column.

**Done when** one of these is true:

- A market price sits in a cell of your tracker, put there by code, and it
  roughly matches what the source's own website shows for that card — sanity
  checked by eye
- Or you stopped for a specific, documented reason — a required key, a terms
  problem, a source that turned out dead — written down while it's fresh, because
  that's the raw material for the next step

### The fork

The world has now answered, one of three ways. All three are real endings; read
yours.

**It works.** A price arrived. Wire up a few more of your most-watched cards —
not the whole collection yet. Before you even think about a trigger, go back and
read the source's rate limits and terms *first*: your script is a guest in
someone else's system, and a guest behaves like one. If automated access is
allowed, a gentle schedule is plenty — weekly, the same rhythm as your
snapshots. Card prices don't move by the minute, and neither should your
requests.

**It needs a key or a signup.** Then the decision is the deliverable. Read the
terms before agreeing — the same habit as reading authorization prompts, aimed at
someone else's rules: what does it cost, what do they collect, what do they
permit? Creating an account may be a step to take with an adult. Whether you
proceed or decline, write the decision and the reasons down. Declining
unacceptable terms is not a failed attempt; it's a judgment call made with real
information, which is the skill.

**Nothing currently works acceptably.** Then document what you found: which
sources exist, what each demands, why each fell short — and as of what date. Do
it thoroughly, because this document is the deliverable, and here is the truth
about it: **this is a complete, successful outcome of an expedition into unknown
territory.** You set out to learn the current state of the world, and you learned
it; that the state is "not yet, not on these terms" makes the knowledge no less
real. Log it as a wall in your logbook — and remember what a dated constraint is:
a fact about *now*, not a verdict about *ever*. Six months from now the survey
can be re-run in an afternoon, because you now own the method.

---

## Break it on purpose

Cause each one, read what happens.

**Fetch a place that doesn't exist.** Point your fetch function at a made-up
domain — something like `https://this-domain-does-not-exist-xyzzy.com` — and run
it. Read the entire failure: what it says, where it appears. This is what "no
such place" looks like from code, and it's a different animal from asking a real
site for a wrong page — if your attempt in the last section ever produced an
error from a real source, compare the two. Address problems and content problems
fail differently, and telling them apart is half of diagnosing any fetch that
ever fails you.

**Parse a page as if it were an answer.** Take your example.com function and add
one line: `JSON.parse` the fetched text. Run it, and read the error — the parser
choking on the very first characters of a perfectly good web page. Now put the
two artifacts side by side in your mind: the HTML that just broke the parser,
built for human eyes, and — if your attempt produced any — the JSON that parsed
cleanly, built for programs. Same internet, same fetch, different intended
reader. That difference is the entire meaning of the word API, and you've now
earned it empirically instead of taking this page's word for it.

---

## What just happened

Stand back and look at the whole arc, because it lands here. This tracker began
as one sheet of typed cells. Then formulas, so the totals computed themselves.
Then tabs that answered questions, charts that showed change, a form so logging
took ten seconds, scripts that did your chores, schedules so nobody had to
remember — and today it asked the internet a question by itself. Every capability
stood on the one before it, and not one of them was magic when it arrived.

One layer deeper on today's mechanics: `UrlFetchApp.fetch` is the same act your
browser performs for every page you have ever visited — ask a URL, receive text.
Pages for humans and answers for programs travel over exactly the same mechanism;
what differs is who the reply was written for, which is precisely what the parse
error showed you.

And the skill you exercised today — *what exists right now, what does it permit,
is it worth it* — is the one that never expires, because its answer never stops
changing. Documentation rots. Tutorials rot. This page rots. The method of
finding out does not, and whatever your expedition found, you now own a dated
piece of knowledge about the world that no page could have handed you.

---

## Go further

- A Sources tab in the tracker: every service you surveyed, its verdict, and the
  date — re-surveyed quarterly. The tracker could track the very ecosystem it
  depends on.
- If a source allows it: price history *per card* — your Snapshots pattern,
  applied one level down. Which single cards would reward watching, and what
  would one card's price chart tell you that the whole-collection chart hides?
- The genuinely open question is the expedition's own: what will this landscape
  look like when you survey it again — and knowing what you know now, what will
  you check first?

---

## What you have now

- A script authorized and able to fetch URLs and parse JSON — the door to the
  entire internet, open from your tracker
- A dated survey of the card-price landscape as you found it, logged where you
  can find it again
- Whichever the world offered: live prices flowing for your first cards on
  respectful terms; a documented signup-or-decline decision; or a dated,
  documented constraint — logged as a wall, understood as a fact about now
- The API distinction, earned: a page for humans and an answer for programs are
  different artifacts, and you have seen a parser prove it
- A survey method that can be re-run against a changed world, any time you want
  the new answer
