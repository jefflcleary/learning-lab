# Profiling the server with spark

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

The checklist ran out. Everything cheap has been eliminated, the server is still slow,
and what's left is a question none of your instruments can answer: *where is the time
actually going?*

A **profiler** answers that. It watches the running server and reports where its time
went — not "the server is slow" but "this specific work took this share of every tick".
It also gives you the thing the last session promised and couldn't deliver: a
distribution rather than an average, so the spikes stop hiding behind a healthy mean.

In this session you'll install one, learn to read its report on a server that's
perfectly fine, then capture one while something is genuinely wrong and compare the two.

The real skill here isn't reading the report — that's mostly a technique you'll have in
twenty minutes. It's knowing *when* to press the button. A profile of a healthy server
is completely accurate and completely useless, and capturing the right sixty seconds is
most of the job.

---

## Before you start

You need:

- **A Fabric server you can add mods to**, and the habit of matching a mod's version to
  your server's.
  [Running a modded server with Fabric](../../../minecraft-server/lessons/fabric-modded-server/guided.md)
  covers both. Quick check: you can name your server's Minecraft version and say where
  its `mods` folder is.
- **Reasoning in milliseconds per tick, and knowing what a percentile is.**
  [How long a tick takes, and what makes it longer](../the-tick-and-its-budget/guided.md)
  covers it.
- **A way to make your server slow on demand**, so there's something to photograph. The
  endless-loop trick from
  [What a computer is doing while it's busy](../what-a-busy-computer-is-doing/guided.md)
  will do for now.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This session sends you to a tool's own documentation rather than quoting it — [Finding the real documentation](../../../../reference/finding-the-docs.md) if the search goes sideways.

---

## What you'll have at the end

By the end of this session you will have:

- A profiler installed on your server, and the ability to read its report
- Two profiles side by side — one of a healthy server, one of a server in trouble — and
  the difference between them explained in your own words
- Percentile tick times, which you wanted last session and couldn't get
- A profile captured of only the ticks that blew the budget, with the ordinary ones
  filtered out
- A shareable link sent to somebody who complained, which turns "it feels laggy" into a
  conversation about evidence
- A clear sense of what this tool is blind to, which matters as much as what it sees

---

## New tools

**spark** is a profiler for Minecraft servers, written by lucko. It works on Fabric,
Forge, and Paper, and its documentation lives at **spark.lucko.me/docs** — which is
where this session will send you rather than quoting commands, because they change.

One piece of history worth having, because it will save you an hour: for years the
standard tool was a built-in feature of Paper called timings, and a great deal of
writing online still tells you to use it. It was switched off by default and then
removed. If you find a guide that opens with `/timings`, it's out of date, and spark is
what replaced it.

Installing it is part of the work below, and it's the same procedure as any other Fabric
mod — you've done this before.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- A tool is about to tell you where your server's time goes. Before you install it:
  what do you think the single biggest item will be, on a healthy server with two people
  on it? Commit to a guess.
- A profiler that recorded every single thing the server did would be perfectly
  accurate. What would that cost? What could a tool do instead, to be cheap enough to
  leave running?
- If you profile your server right now, while nothing at all is wrong, what do you
  expect the report to show? Would it help you with a problem somebody reported
  yesterday?

---

## The work

### Install it, and read its surface

Download the Fabric build that matches your server's Minecraft version, put the jar in
the `mods` folder, and restart. Nothing new here — this is the same thing you did in the
Fabric session, with the same version-matching rule.

Then, in game:

<span className="run-where run-where-local">In Minecraft's chat box</span>

```
/spark
```

With no arguments it lists everything it can do. **Read the whole list**, including the
parts this session never touches. You're going to own this tool for a long time, and
knowing roughly what's in it is worth five minutes now.

### Look at a healthy server first

This ordering is deliberate. You cannot recognise an abnormal report without having seen
a normal one — the same principle as the baseline you took in the first session.

<span className="run-where run-where-local">In Minecraft's chat box</span>

```
/spark tps
/spark health
```

Compare what you see against the baselines in your logbook. Same numbers, better
instrument.

Then find the percentile figures — the ones the last session defined and couldn't
measure. Look at the average tick time next to the 95th percentile. On a quiet server
they'll be close together.

**Write down how close.** That gap is the thing you'll be looking at from now on: when
the average stays put and the 95th percentile pulls away from it, something is spiking
without moving the mean at all.

### Capture a profile of nothing in particular

Start a profiler, let it run for about a minute on your healthy server, and stop it.
It'll give you a link. Open it.

You're not diagnosing anything. You're learning to read.

The report is a **call tree**: work nested inside work, with a share of the time against
each piece. The technique for reading one is simpler than it looks:

**Start at the top and keep descending into the largest child.** The path you follow is
where the time is going. Stop when the names stop meaning anything to you, and read the
last name that did.

Try it. Follow the fattest branch down as far as it makes sense, and see where you land.
Find something you recognise — mobs moving, chunks loading, the network. Then check your
prediction about the biggest item.

One distinction to get straight now, because nearly everybody trips on it exactly once.
**Total time** is everything a piece of work took, including everything it called.
**Self time** is what that piece did itself. A branch with a huge total and a tiny self
time isn't the culprit — it's the road to the culprit. Keep walking.

### Capture a profile of a real problem

Now make the server slow on purpose — the endless loop from the machine session — and
profile it *while it's happening*.

Then open both reports side by side.

<details>
<summary>The two reports look basically the same</summary>

First question: was the problem actually happening during your capture window? Check the
tick rate for that period. It's very easy to start a profiler, get distracted, and
photograph a minute of calm.

</details>

<details>
<summary>You're sure the problem was happening, and the reports still match</summary>

Then you've found something more interesting than a tidy result.

The endless loop doesn't make your server do more work. It takes the processor away from
outside. The server's own work is unchanged — it's just being given fewer chances to do
it. So a profile of the server's work has almost nothing to say about it.

That's a real blind spot, and it's worth knowing the shape of it. The processor figure
in `/spark health` catches this problem immediately. The call tree never will. **A
profiler tells you what your server spent its time on — not what else was happening on
the machine.**

Every tool has an edge like this. Finding yours now is better than trusting it blindly
later.

</details>

### Profile only the bad ticks

Here's the flag that makes this tool genuinely powerful.

If your server is fine 95% of the time, a plain profile is 95% healthy work, and the
interesting 5% is buried somewhere inside it. There's an option that records **only
ticks that went over a threshold** — set it just above the budget, run it for a few
minutes across a period containing both good and bad ticks, and the report contains only
the failures.

spark's documentation has the exact flag and syntax. Find it there rather than being
told it here — that's a skill worth more than the flag.

Compare that report against your earlier one. The noise is gone.

### Tell somebody what you found

Upload a report and send the link to whoever complained.

This is partly practical: a profile is evidence, and it turns "it feels laggy" into a
conversation about a shared object that either supports a claim or doesn't. And it's
partly for you — explaining a finding to another person is the fastest way to discover
whether you actually understood it.

---

## Break it on purpose

**Profile the wrong moment.** Deliberately capture sixty seconds of a completely healthy
server. Now try to use that report to explain a problem somebody reported an hour ago.

You can't, and the report isn't broken. It's a precise, accurate answer to a question
nobody asked. A profiler is a camera: it photographs whatever is in front of it while
the shutter is open, and if the shutter was open at the wrong time you have a perfect
picture of nothing in particular.

**Leave it running far too long.** Start a profiler with no time limit and leave it for
a long stretch. Look at the size of the result, and at how thoroughly the interesting
moments are diluted by everything ordinary that happened around them.

Then capture the same kind of period with a threshold instead, and compare. That's why
the flags exist.

**Blame the first name you recognise.** Find something familiar in the tree with a big
total time and declare it the problem out loud — before looking at its self time.

Now look at the self time.

Often it's a road rather than a destination: it looks enormous because everything
expensive happens somewhere underneath it. This is the mistake to make once, cheaply,
here.

---

## What just happened

Your server has been keeping track of where its own time goes the whole time. It just
had no way to tell you. A profiler is the thing that asks.

Sampling is the trick that makes it affordable. Recording every operation a program
performs would be perfectly accurate and would slow that program down so much that the
measurement would change what it was measuring. Interrupting many times a second and
noting what's happening right then costs almost nothing — and over thousands of samples
the arithmetic works out, because whatever takes a lot of the time turns up in a lot of
the samples. What you get is a statistical picture rather than a ledger. That's exactly
the right trade for finding a bottleneck and completely the wrong one for billing
somebody by the millisecond, and it's how profilers for every programming language work.

The call tree is worth recognising for what it is — a picture of work nested inside
work — because reading one by descending into the largest child isn't a Minecraft
technique. It works on a profile of any program in any language, and the total-versus-
self distinction will trip you exactly once, which you've now had.

The discipline underneath all of it: a profile is a photograph. It's faithful, and it's
useless if the shutter was open at the wrong moment. That's why the threshold flag
exists, and the problem it solves is not really a Minecraft problem — nearly every
intermittent fault in every system is rare and surrounded by ordinary behaviour, and the
hard part is almost never the analysis. It's being pointed at the right sixty seconds.

And one limit worth carrying out of here: this told you where the time went. It did not
tell you what to do about it, and it never will. Something appearing in a report is not
permission to remove it.

---

## Go further

- Run `/spark` with no arguments again and pick a subcommand this session never used.
  What is `heapsummary` for? What would it tell you that a tick profile can't?
- The endless loop barely showed up in the call tree. What other kinds of problem would
  a tick profiler be blind to? Write the list now, while you're thinking about it —
  you'll want it the day something doesn't show up.
- Profile the same period twice, simultaneously, and compare the two reports. How
  similar are they? What does that tell you about how much precision you should claim
  when you show one to somebody?
- Genuinely open: profiles get captured by a person who happens to be watching, and
  almost every real problem happens when nobody is. What would a setup look like that
  captured a profile automatically whenever the server had a bad minute? What could go
  wrong with leaving something like that running? There is no settled best design for
  this.

---

## What you have now

- A profiler on your server, and a technique for reading its reports that works on any
  program in any language
- Percentile tick times, and a recorded sense of how far apart the average and the 95th
  sit when things are healthy
- Two profiles compared — one healthy, one not — and a written explanation of the
  difference
- The ability to capture only the ticks that failed, with the ordinary ones filtered out
- Knowledge of a specific blind spot in your new tool, found by hitting it rather than
  reading about it
- A report link you sent to somebody, which changed the conversation
