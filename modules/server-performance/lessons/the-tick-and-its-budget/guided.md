# How long a tick takes, and what makes it longer

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Everybody asks the same question about a server: is it OK? That question has two
possible answers and almost no information in either of them.

The useful question is **how much room is left**. A server can be running perfectly and
be one player away from falling over, and it will report itself as healthy right up
until the moment it isn't. Room-left is a number, and a number lets you say what will
happen *before* it happens.

This session is in two halves. First, the measurement the whole subject rests on: a
server gets fifty milliseconds, twenty times a second, to do everything the world needs
— and how much of that it's actually using is the number worth knowing. You'll find out
why the figure everybody quotes instead is nearly useless, and why an average can be
completely healthy on a server that visibly stutters.

Second, the list. When something *is* slow, there's an order worth checking things in —
cheapest and most likely first — and you'll walk it against your own server. Most of it
will come back "not this one". That's what a real diagnosis looks like, and it's the
half people skip.

---

## Before you start

You need:

- **Being able to read your server's tick rate.**
  [Three different things called lag](../three-kinds-of-slow/guided.md) covers it.
- **A recorded baseline for your server while it's healthy.** Same session. Quick
  check: you can open your logbook and read the three numbers you wrote down, with a
  date next to them. Half of this session is comparison, and there's nothing to compare
  against without it.
- **Being able to tell which of a machine's four resources is the limit.**
  [What a computer is doing while it's busy](../what-a-busy-computer-is-doing/guided.md)
  covers it. Several items on the list are answered by looking at the machine rather
  than the game.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A headroom figure for your own server — how much of its budget is used, and how much
  is spare
- A measured cost per player, and a rough prediction of how many more your server would
  take
- Proof, by changing one setting and putting it back, that you can move the number
- An ordered checklist of causes, walked against your own server, with each entry marked
  and dated in your logbook
- A specific answer to "what would I do next?", arrived at rather than handed to you

---

## New tools

Nothing new to install. This session uses `/tick query` and your server's log, both of
which you met in
[Three different things called lag](../three-kinds-of-slow/guided.md), and
`server.properties`, which you have been editing since your very first server session.

One new idea rather than a new tool: the **percentile**, explained in the work below
where it's needed.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Two servers both report 20 ticks per second. One is using 8 milliseconds of its 50;
  the other is using 45. What's different about them? What happens to each if four more
  people join?
- Your server's ticks average 10 milliseconds, and the world visibly stutters several
  times a second. How can both of those be true at once?
- Before you see the list: what would *you* check first when somebody says the server is
  slow? Write it down. You'll compare it against the order later.
- Which do you think costs a server more — a player being able to *see* further, or the
  world being *alive* further away?

---

## The work

### The budget, and the number everybody quotes instead

Your server is trying to update the world twenty times a second. Each of those updates
is a tick, and each tick has **fifty milliseconds**. Inside one tick, the server moves
every mob, runs every furnace, advances every hopper, and grows every crop, in every
chunk currently loaded.

If that work fits inside fifty milliseconds, the tick finishes and the server waits out
the rest. That waiting isn't waste — it's **headroom**, and it's the entire margin the
server has for anything unexpected.

Which is why ticks per second is such a poor thing to reason with. **It can't go above
20.** A server finishing its work in 5 milliseconds and one finishing in 49 both report
exactly 20. The measurement is flat across the whole range where you could still do
something, and it only starts moving once the server has already failed — at which
point it's telling you what every player could already see.

So: measure the milliseconds, and work out what's left.

<span className="run-where run-where-local">In Minecraft's chat box</span>

```
/tick query
```

Take the average tick time, subtract it from 50, and write down both numbers and the
percentage of the budget you're using.

Now turn that into a prediction. You'll need one more measurement first.

### Measure what a player costs

Three readings, one variable changed at a time — the method from the last two sessions,
applied to something that matters.

1. Server empty. Record the tick time.
2. One person joins and stands still. Record again.
3. That person walks around. Record again.

The difference between the first two is roughly what a person costs just by existing in
the world. The difference between the second and third is what they cost by *doing*
things, which is usually the bigger number.

Now the prediction: at that cost per player, how many more people could join before the
fifty milliseconds are gone?

That arithmetic assumes each player costs the same as the last, and they don't quite —
spread-out players cost more than clustered ones, and the cost isn't perfectly straight.
Make the estimate anyway, and write down that you know it's rough. A prediction you can
check later is worth far more than no prediction, and being wrong about it in a
measurable way is how you find out what you didn't know.

### The average is hiding something

Here's the problem with every number you've taken so far.

Imagine a server whose ticks take 10 milliseconds on average, but where one tick in
twenty takes 120. The average is excellent. The experience is a visible stutter, several
times a second, all evening.

What people feel isn't the middle of the range — it's the bad end of it. So the useful
question isn't "what's the average tick time", it's "what does the worst one tick in
twenty look like".

The tool for that is a **percentile**. The 95th percentile is simply the value that 95%
of your measurements came in under. If the 95th percentile of your tick time is 60
milliseconds, then one tick in twenty took longer than 60 — which means one tick in
twenty blew the budget, whatever the average says.

Here's the catch, and it's worth noticing rather than being told: `/tick query` gives
you an average. So does the log line. **Neither of them can show you a distribution.**
Hold onto that — it's going to be the reason you want the tool in the next session.

### Prove that you can move the number

Before diagnosing anything, confirm the instrument responds.

Two settings in `server.properties` sound similar and are not the same thing:

- **view-distance** is how far the server *sends* the world to each player. It costs
  bandwidth and chunk loading.
- **simulation-distance** is how far the server *ticks* the world around each player —
  where mobs actually move, crops actually grow, hoppers actually run. It costs tick
  time.

That distinction is the most useful single fact in this module's second half, because a
server short of tick time can often lower simulation distance and leave the view alone.
Players see just as far; the world is simply only alive closer in.

Lower `simulation-distance` by two, restart, and measure the same way you did before.
Then put it back, restart, and measure again.

That second measurement isn't optional. **A change you didn't undo and re-measure hasn't
been shown to cause anything** — something else might have changed at the same time, and
returning to the original value is how you find out.

This is a demonstration, not tuning. Tuning comes after the causes are understood.

### Walk the list

When something is slow, this is the order worth checking, and the ordering is the point:
cheapest and most likely first. The profiler in the next session is what you reach for
when this list runs out — not before.

Go through it against your own server, now, while things are calm. For each one write
down what you checked, what you found, and how long it took.

1. **It isn't the server.** The player's own frame rate, or their own connection. You
   have three instruments for this from the first session. Nothing below this line is
   worth doing until it's ruled out.
2. **Something else on the machine is taking the processor.** A browser, a backup, an
   indexer, a video call, a game. You did this on purpose last session.
3. **The heap is the wrong size.** Too small means constant garbage collection and a
   permanent stutter; too large means the machine swaps or pauses get long. Compare
   `-Xmx` against total memory and look for swap use.
4. **View distance and simulation distance are too high for this machine.** The biggest
   single lever. Each step up adds a whole ring of chunks around every player.
5. **The players are spread out.** Everyone loads chunks around themselves, so four
   people in four places costs far more than four people standing together. Not a fault
   — and it's the explanation for "it's only slow sometimes".
6. **Somebody is exploring.** Land nobody has visited has to be generated as they travel.
   Expensive, spiky rather than sustained, and it fixes itself once they stop.
7. **Entities.** Mob farms, animal pens, dropped items, item frames, boats, minecarts. A
   world people have lived in for months accumulates these without anyone deciding to.
8. **Redstone and hoppers.** Clocks and long hopper chains do work every tick, forever,
   whether or not anyone is nearby.
9. **Mods.** Two different problems: many mods each adding a little, or one badly-behaved
   mod eating a tick by itself. You can't tell those apart by counting — which is why
   "too many mods" is a guess until something attributes the time.
10. **The disk.** A hitch every few minutes when the server saves; a disk that's slow,
    full, or busy with something else.
11. **The network.** Somebody else's video call saturating the upload looks like lag to
    every player while the server's own numbers stay perfect. Which is why item 1 is item
    1.
12. **Garbage collector tuning.** Last. Only with evidence of actual pauses. Reaching for
    this before the eleven above is the most common way to spend an evening and change
    nothing.

Most of those will come back "not this one".

**That is the correct outcome, and it is what success looks like.** A checklist that
eliminates nine possibilities in ten minutes has done exactly its job. The instinct to
feel that a check which found nothing was wasted is the single thing that stops people
from ever diagnosing anything — because the alternative is changing three settings
somebody recommended and seeing whether it feels better, which teaches you nothing at
all.

Put the walked list in your logbook with today's date. You'll walk it again.

### Say what you'd do next

Given where your checklist stopped, name your next move.

If it ran all the way to the bottom without finding anything, then the honest conclusion
is that the cheap methods are exhausted and you need something that can attribute tick
time to a specific cause. That's the next session — and arriving at that conclusion
yourself is worth more than being told it.

---

## Break it on purpose

**Trust the average.** Wait until the server is visibly stuttering — or make it stutter
using the endless-loop trick from last session — and then take a tick-time reading.

The average may look completely fine.

Sit with that contradiction for a moment: a healthy number and an unhealthy world, at
the same time, both true. Write down what you'd need to measure instead. You now want
something specific, and you know why you want it.

**Check the list backwards.** Deliberately start at the bottom. Spend ten minutes
reading about garbage collector flags for your server — genuinely read them, don't skim.

Then check item 1.

Notice what the wrong order cost you, and that item 1 would probably have answered it in
thirty seconds. This is the only way the ordering principle ever really lands, and it's
cheap to learn here rather than on an evening when people are actually complaining.
Don't change any flags.

---

## What just happened

A server is a loop with a deadline. Twenty times a second it has to do everything the
world requires, in fifty milliseconds. Almost everything in this subject follows from
that one sentence.

Which is why ticks per second reads as a pass mark and behaves like one. It says "pass"
across the entire range in which you could still act, and only starts moving once the
server has already failed. The number underneath — how much of the fifty milliseconds is
actually being used — is what turns a measurement into a prediction. That difference,
between reporting a state and predicting one, is most of what separates watching a
dashboard from operating a service.

The average hiding the spikes is the same lesson from another angle, and it goes far
beyond Minecraft. What anybody experiences is not the middle of a distribution but the
bad end of it, which is why serious measurement of anything — web requests, frame times,
disk latency, how long a page takes to load — gets reported in percentiles. An average
response time quoted on its own should now make you slightly suspicious, wherever you
meet one.

And the list isn't a list of fixes. It's an order of elimination, arranged by how cheap
each check is and how often it turns out to be the answer. Working through it and
finding nothing is not a wasted afternoon; it's the same afternoon as finding something,
minus the luck. What you were doing was narrowing, which is a completely different
activity from guessing, even though from the outside they can look similar.

---

## Go further

- The list is ordered by cost and likelihood in general. On *your* server, with your
  world and your friends, is that the right order? Reorder it for your situation, and
  write down why each thing moved.
- Simulation distance and view distance cost different resources. Design a measurement
  that would tell you which of the two your server is more sensitive to. Then run it.
- If one tick in twenty is slow, is it the *same* one in twenty every time, or random?
  What would each answer imply about the cause? Can you find out with the tools you have
  right now, or do you need something you don't have yet?
- Genuinely open: your server's tick time is fine on average, fine at the 95th
  percentile, and every player insists it feels bad at the same time each evening.
  Nothing you've measured would catch that. What would you record, and how often, to
  find it? Nobody writing this session knows the best answer.

---

## What you have now

- A headroom figure for your server, and a rough prediction of how many more players it
  would take
- A measured cost per player, taken by changing one variable at a time
- The knowledge that ticks per second saturates, and that milliseconds per tick is the
  number with information in it
- Percentiles, and the reason an average is the wrong summary of anything people feel
- The difference between view distance and simulation distance, and which resource each
  one costs
- An ordered checklist, walked against your own server and dated in your logbook, ready
  to walk again
- A specific reason to want a profiler
