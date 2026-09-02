# Making the server slow on purpose

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every session so far has built an instrument. This is where instruments become
diagnosis.

You're going to make your own server slow, six different ways, on purpose. Each one hits
a different part of the machine, and each one leaves a different fingerprint across your
measurements. By the end you'll have a table you wrote yourself: for each cause, which
numbers moved, which conspicuously didn't, and what it actually felt like to play.

That table is the thing you'll use for years, and it's the reason this session exists in
this shape rather than as a list you could read. A signature you observed is a thing you
recognise. A signature you read is a thing you half-remember.

The reason it works is that the answers are known in advance. Every problem you've
measured until now had an unknown cause, which means you could never check your
reasoning. These six have causes you chose, which makes them the only situation where
you can find out what a cause *looks like*.

Two of the six use things you've already built. The chunk-generation experiment is a bot
flying in a straight line. The entity experiment is a loop you write. Those skills turn
out to have been instruments all along.

---

## Before you start

You need:

- **A profiler installed, and the ability to read its report.**
  [Profiling the server with spark](../profiling-with-spark/guided.md) covers it.
- **Headroom, percentiles, and the ordered list of causes.**
  [How long a tick takes, and what makes it longer](../the-tick-and-its-budget/guided.md)
  covers it.
- **Reading a machine's four resources.**
  [What a computer is doing while it's busy](../what-a-busy-computer-is-doing/guided.md)
  covers it.
- **A server nobody depends on**, which you can degrade freely and restore. Quick check:
  if this server's world were destroyed this afternoon, would anybody mind? If the
  answer is yes, this is the wrong server.
- **A fresh backup you've restored from before.**
  [Copying and backing up worlds](../../../minecraft-server/lessons/worlds-and-backups/guided.md)
  covers it. Two of these experiments leave thousands of entities in a world.
- **For two of the six only:** writing a bot
  ([Writing your first bot](../../../minecraft-server/lessons/writing-your-first-bot/guided.md))
  and writing a datapack function
  ([Building datapacks](../../../minecraft-server/lessons/building-datapacks/guided.md)).
  Without those you can still do the other four, and still get the point.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- Caused six genuinely different slowdowns, deliberately, and undone each one
- A signature table you wrote: six causes, and for each of them the numbers that moved,
  the numbers that didn't, and how it felt in the world
- Direct experience of the two opposite ways memory can be wrong, which look nothing
  alike
- One slowdown that your profiler could see perfectly and one it was completely blind
  to, caused deliberately so you know the difference
- A protocol you've run seven times, which is the point at which it stops being
  instructions and starts being how you work

---

## New tools

Nothing new. This session uses every instrument you already have — the debug screen,
`/tick query`, the profiler, `htop` and `free -h`, and your logbook — plus two things
you've built before: a bot, and a datapack function.

That's deliberate. There's no new tool because there's nothing left to install; what's
missing is experience of what the instruments say when specific things go wrong.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Which of the six experiments below do you expect to be the worst — the one that
  degrades the server most?
- Which of them do you think is most likely to be the *real* cause on a server like
  yours, in ordinary use?
- Each experiment has its own prediction step, and those matter more than these two.
  Answer them one at a time, immediately before running each experiment, rather than
  reading ahead and answering them all now.

---

## The work

Every experiment runs the same seven steps. Read them once now; they won't be
repeated.

1. **Predict.** Which of the four resources will this hit? Sustained or spiky? Will it
   persist when everybody logs out? Which numbers will *not* move? Write it down first.
2. **Baseline.** Measure with nothing changed: average tick time, the 95th percentile,
   the four machine resources, and how the world feels.
3. **Change exactly one thing.**
4. **Measure the same things, the same way.**
5. **Attribute.** Which numbers moved — and which stayed still. The still ones are half
   the signature.
6. **Undo it.**
7. **Measure again**, and confirm it went back to where it started.

Step 7 isn't optional. A change you didn't undo and re-measure hasn't been shown to
cause anything — something else might have shifted at the same time, and returning to
the start is how you find out.

**The safety rules, which apply to every single experiment:** expendable server only,
fresh backup taken, one experiment at a time and fully undone before the next, and
nobody relying on the server while you work.

### Experiment one: distance

Raise `view-distance` and `simulation-distance` several steps, restart, and run the
protocol.

Then do them **separately** — one, undone, then the other. They cost different
resources, and running them together hides that. Which one moves tick time more? Which
one moves bandwidth more?

### Experiment two: entities

Create thousands of entities in one place. Both mobs and dropped items are worth trying;
they don't behave identically.

<details>
<summary>Stuck? Start here</summary>

You've written datapack functions that run commands. What you need here is either one
command repeated a great many times, or one that runs over and over on its own.

</details>

<details>
<summary>The shape of it</summary>

A function file is just a list of commands, and nothing stops a list being very long.
The more interesting version is a function that gets called repeatedly on a schedule, so
the count keeps climbing while you watch the numbers — which lets you see the
relationship between "how many" and "how slow" rather than just its endpoint.

</details>

When you undo this one, be careful. The command that removes entities takes a target
selector — the same filtering language you used when writing datapacks — and a selector
that matches more than you meant is the fastest way to delete something you wanted to
keep.

That hazard is real, and it's a large part of why this whole session happens on a server
you don't care about.

### Experiment three: chunk generation

Send a bot flying in a straight line into terrain nobody has ever visited.

<details>
<summary>Stuck? Start here</summary>

Your bot already knows how to join a server and how to move. Flying in a straight line
forever is a smaller program than most of the ones you've written.

</details>

<details>
<summary>What matters here</summary>

The goal is to keep entering land that has never been generated, so a straight line away
from spawn matters far more than any clever navigation. Simple and relentless beats
smart.

</details>

Watch the average and the 95th percentile *separately* on this one. Then stop the bot —
and notice what happens, and what doesn't.

### Experiment four: machinery that runs forever

Build a hopper chain, or a redstone clock, and leave it running.

Then run the protocol — and then log out, wait, and measure again with nobody at all on
the server.

### Experiment five: memory, in both directions

First set `-Xmx` far too small for your world. Run the protocol. Look at `/spark gc`
while you're there.

Then undo that, and set `-Xmx` far too large for the machine it's running on — larger
than the machine can comfortably give. Run the protocol again, and watch `free -h` for
swap.

These are two opposite mistakes made from the same instinct, and they produce signatures
that look nothing like each other. Write both rows carefully. This is the experiment
that will save you the most time later.

### Experiment six: the network

Saturate the upload from the machine your server runs on — a large file transfer, or
several at once. Anything that fills the pipe going out.

Pick your own method, and be careful if you're on a connection where data costs money:
this consumes real bandwidth.

Then run the protocol, paying particular attention to what the server's own numbers say
while every player is complaining.

### Write the table

You should now have six rows. Each one wants: the cause, what moved, what didn't, what
it felt like, and how you'd recognise it again in thirty seconds.

Put it in your logbook. This is the thing you're actually taking away.

---

## Break it on purpose

This whole session is deliberate breakage, so this part breaks the *method* instead.

**Change two things at once.** Raise the distance settings and summon a few thousand
entities in the same step. Measure. The server is much slower.

Now say which change did it, and by how much.

You can't — and notice something worse: you could construct a completely plausible story
for either one, and you'd have no way to know you were wrong. That's the actual danger,
and it's why "I changed a few things and it got better" is worth so little. Undo both and
run them separately.

**Skip the undo.** Do an experiment, measure, conclude, and go straight to the next one
without restoring anything. Then do a third.

By now your baseline is meaningless and every measurement you take is contaminated by
two changes you've stopped thinking about. Recover by undoing everything and re-taking
the baseline. That cost you an afternoon here, which is much better than it costing you
a wrong conclusion about a real problem in three months.

**Trust one measurement.** Take a reading the instant you make a change, before anything
settles. Then take another two minutes later.

They may be very different — chunks were still loading, the collector had just run,
somebody moved. One reading is a sample, not a finding.

---

## What just happened

Six causes, six different fingerprints. That's the finding, and it's what makes
diagnosis possible at all. If every cause produced identical evidence, no instrument
would ever help anybody.

The differences are worth naming as a set, because between them they cover most of what
you'll ever meet:

Some causes are **sustained** and some are **spiky**, which is exactly why the average
and the 95th percentile agreed in some of your experiments and disagreed in others. Some
depend on **people being online** and some don't, which is why "it's slow even with
nobody on" is such a useful sentence. And some live **inside the server's own work**,
where the profiler sees them clearly, while others live **outside it**, where the
profiler sees nothing at all and the machine's resource figures see everything.

The numbers that *didn't* move carry as much information as the ones that did. Perfect
tick times during a complaint is not an absence of evidence — it's evidence, and it
points somewhere specific.

The two memory experiments deserve their own note, because they point in opposite
directions from the same instinct. Too little, and the collector runs constantly and the
world stutters permanently. Too much for the machine, and it starts using its disk as
memory and you get long pauses instead. "Just give it more RAM" isn't advice, it's a
coin flip — and now you can tell which side you landed on in about thirty seconds,
because you've seen both.

Underneath all this is something that isn't about Minecraft at all. The reason you can
now diagnose a slowdown you've never seen before is that you spent an afternoon causing
slowdowns whose answers you already knew. That's how anybody becomes able to read a
system — not by memorising a list of causes, but by building a private library of what
causes look like. It works the same way for a game server, a website, a car, or a body:
break something you can afford to break, watch closely, and write down what it looked
like.

---

## Go further

- Two of your six produce a similar-looking tick-time graph. Which two? What's the
  cheapest single measurement that would tell them apart?
- Now that you've done them separately, combine two on purpose. Is the result the sum of
  the two, or worse than the sum? What would it mean if it were worse than the sum?
- Design a seventh experiment for a cause on the checklist you didn't test — the disk, or
  players spread far apart. Predict the signature first, then run it and find out whether
  you were right. Being wrong here is the useful outcome.
- Genuinely open: your table describes your server, on your machine, with your mods. How
  much of it would still hold on a machine twice as fast? On a server with thirty players
  instead of four? Some of these signatures scale and some of them invert, and which is
  which for your setup is not something anyone can tell you in advance.

---

## What you have now

- Six slowdowns caused deliberately and undone, on a server that could afford it
- A signature table in your own words — the deliverable, and the thing you'll actually
  use
- First-hand knowledge that too little memory and too much memory look completely
  different
- One problem your profiler saw perfectly and one it was blind to, both caused on
  purpose
- A protocol run seven times, which is where instructions turn into habit
- The experience of being unable to attribute a change because you made two at once,
  which is the cheapest possible way to learn that lesson
