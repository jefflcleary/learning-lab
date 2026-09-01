# How long a tick takes, and what makes it longer

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** the-tick-and-its-budget
- **Part:** Part 2 — Measuring the server
- **Scaffolding:** level 2 — second lesson of the measuring skill. Goals plus hints;
  concepts named but not applied for the learner.
- **Deliveries:** guided only. Nothing installed.
- **Status:** ready

## Goal and payoff

The concept the whole subject rests on, and the checklist that turns it into action.

Two halves. First: the server's time budget, and why the number everybody quotes is
the wrong one. Ticks per second is pass or fail — it sits at 20 until things are
already bad, then falls. Milliseconds per tick is the **margin**, and a server at a
perfect 20 ticks per second using 45 of its 50 milliseconds is one player away from
trouble while one using 8 is fine. Those two servers look identical on every status
page ever made.

Second: the ordered list of what actually makes ticks longer, worked against the
learner's own server, cheapest and most likely first.

Payoff: the learner can say not just "the server is fine" but "the server is fine, and
here is how much room it has left" — a prediction rather than a status. And they end
holding a written, ordered checklist they walked themselves, most of whose entries will
have come back "not this one", which is what a real diagnosis looks like.

## Prerequisites

- Being able to read the server's tick rate — established by
  `modules/server-performance/lessons/three-kinds-of-slow/`
- A recorded healthy baseline for the server — established by the same lesson. Half of
  this lesson is comparison, and there is nothing to compare against without it.
- Knowing which of a machine's four resources is the limit — established by
  `modules/server-performance/lessons/what-a-busy-computer-is-doing/`. Several entries
  on the checklist are resolved by looking at the machine rather than the game.

## Establishes

- The learner reasons in milliseconds per tick rather than ticks per second, and can
  state their server's current headroom — cited as: "the learner can measure and
  interpret milliseconds per tick, including headroom — established by
  `modules/server-performance/lessons/the-tick-and-its-budget/`."
- Vocabulary: budget, headroom, percentile, spike, sustained load, average versus
  distribution.
- A written checklist of causes, in order, with each one marked checked or not for
  their own server on a given date.
- The habit of asking "how much room is left?" rather than "is it OK?"

## Facts

### Where commands run

Two places, both labelled in deliveries:

- **In Minecraft's chat box** — `/tick query`, and any settings changes made from the
  in-game console.
- **On the machine running your server** — reading `server.properties`, reading the
  log, restarting the server.

### The budget

- The server aims for **20 ticks per second**. Each tick therefore has **50
  milliseconds**. Inside one tick the server moves every mob, runs every furnace,
  advances every hopper, grows every crop, and applies every rule, in every chunk that
  is currently loaded.
- If the work fits inside 50ms, the tick finishes and the server waits out the
  remainder. The waiting is not waste — it is **headroom**, the entire margin the
  server has for anything unexpected.
- If the work does not fit, the tick runs long. The next tick starts late. The world
  falls behind real time, which is what everybody sees as slow motion.

### Why ticks per second is the wrong number to reason with

- Ticks per second **cannot exceed 20**. A server doing its work in 5ms and a server
  doing it in 49ms both report 20. The measurement saturates, and it saturates across
  the entire range where you could still do something about the problem.
- By the time ticks per second has fallen, the server is already failing. It is a
  symptom, not a warning.
- Milliseconds per tick is the number with information in it, because it says how much
  of the budget is used and therefore how much is left. **Headroom is the useful
  quantity**, and it is what lets a measurement become a prediction: a server at 45ms
  will fall over when two more people join, and you can say so before they do.

### Averages, spikes, and percentiles

- An average hides exactly the thing people feel. A server whose ticks take 10ms on
  average, but where one tick in twenty takes 120ms, has a fine average and a visible
  stutter several times a second.
- A **percentile** is a way of describing a whole distribution rather than its middle.
  The 95th percentile is the value that 95% of measurements came in under — so if the
  95th percentile of tick time is 60ms, then one tick in twenty took longer than 60ms.
  Define this plainly at first use in every delivery; it is the least familiar idea in
  the module and everything downstream depends on it.
- The honest question is therefore not "what is the average tick time" but "what does
  the worst one tick in twenty look like". Sustained overload and periodic spikes are
  different problems with different causes, and only a distribution tells them apart.
- Vanilla reports an average. Getting percentiles needs the profiler installed in the
  next lesson — which is a legitimate reason to want it, arrived at rather than
  asserted.

### Where the numbers come from, without any tools

- `/tick query` reports the target rate and the average time ticks are taking [volatile
  as of 2026-09 — deliveries point at Minecraft's command documentation and have the
  learner read the actual response].
- The server's log line, written unprompted when it falls behind: "Can't keep up! Is
  the server overloaded? Running Nms or N ticks behind". Its absence over a complaint
  window is evidence.
- Both of these are averages or thresholds. Neither shows a distribution. That
  limitation is worth naming out loud rather than discovering later.

### The ordered causes

The module's central checklist. Ordering principle, which deliveries must state as the
reason rather than leaving implicit: **cheapest and most likely first; the profiler is
what you reach for when this list runs out, not before.**

1. **It isn't the server.** The player's own frame rate, or their own connection.
   Checked with the previous lesson's three instruments. Free, and most often the
   answer. Nothing below this line is worth doing until it is ruled out.
2. **Something else on the machine is taking the processor.** Checked by looking at
   what is running. On a personal computer: a browser, a backup, an indexer, a video
   call, a game. On a machine that runs nothing else, rare — and that contrast is the
   cleanest proof available that contention was the cause.
3. **The heap is the wrong size.** Too small produces constant garbage collection and a
   permanent stutter; too large makes the machine swap or makes individual pauses long.
   Checked by comparing `-Xmx` against the machine's total memory and looking for swap
   use. This is memory *sizing* — early and cheap. It is not collector tuning, which is
   last and mostly a distraction.
4. **View distance and simulation distance are too high for this machine.** The biggest
   single lever available. Cost rises sharply with each step, because each step adds a
   ring of chunks around every player. Checked by reading `server.properties`.
5. **The players are spread out.** Each player loads chunks around themselves, so four
   players in four places cost far more than four players standing together. Not a
   fault — a fact, and the explanation for "it's only slow sometimes". Checked by
   asking where everybody is.
6. **Somebody is exploring.** Terrain nobody has visited must be generated as they
   travel, which is expensive and produces spikes rather than sustained load. Self
   resolving, and removable in advance by pregenerating. Checked by asking whether
   anyone is somewhere new.
7. **Entities.** Mob farms, animal pens, dropped items, item frames, boats, minecarts.
   A world people have lived in for months accumulates these without anybody deciding
   to. Checked crudely by counting; properly with the profiler.
8. **Redstone and hoppers.** Clocks and long hopper chains do work every tick, forever,
   whether or not anyone is nearby. Checked by knowing what has been built.
9. **Mods.** Two distinguishable cases: every mod adds some per-tick work, so many mods
   cost more than few; and one badly-behaved mod can dominate a tick by itself. A
   profiler attributes time by mod, which is the only way to tell them apart — so "too
   many mods" is a hypothesis, never a conclusion.
10. **The disk.** Saves that hitch every few minutes; a disk that is slow, full, or
    busy with something else. Checked with `df -h` and the input/output wait figure.
11. **The network.** A home upload saturated by somebody else's video call shows up as
    rubber-banding for every player while the server's own numbers stay perfect —
    which is why item 1 is item 1.
12. **Garbage collector tuning.** Last. Only with evidence of pauses in a profile.
    Reaching for collector flags before the eleven items above is the most common way
    to spend an evening and change nothing.

### The distinction that arrives here

- **view-distance** is how far the server *sends* world to each player.
- **simulation-distance** is how far the server *ticks* the world around each player —
  where mobs move, crops grow, and hoppers run.

They are separate settings and they cost differently: view distance costs bandwidth and
chunk loading, simulation distance costs tick time. A server short of tick time can
often lower simulation distance and leave the view alone, so players see just as far and
the world still runs. This is the most useful single fact in the module's tuning half
and it is introduced here because the checklist needs it.

## Arc

### Orientation — given plainly

The budget, the saturation problem with ticks per second, headroom, percentiles
defined from nothing, where the numbers come from without tools, the limitation of
those sources, the two distances, and the full checklist with its ordering principle.

Framing sentence: everybody asks whether the server is OK, which is a question with two
answers and no information in it. The useful question is how much room it has left,
which is a number, and which lets you say what will happen before it happens.

### Predictions to elicit

- Two servers both report 20 ticks per second. One is using 8 milliseconds of its 50,
  the other 45. What is different about them, and what would happen to each if four
  more people joined?
- Your server's ticks average 10 milliseconds and it feels like it stutters several
  times a second. How can both of those be true at once?
- Before you look at the list: what would *you* check first when somebody says the
  server is slow? Write it down and compare it with the list's order afterwards.
- Which do you think costs the server more — a player seeing further, or the world
  being alive further away?

### The work — goals and hint ladders

**1. Find your headroom.** Measure the current tick time, subtract it from 50, and
write the answer down as a percentage of the budget used. Then do the arithmetic that
turns it into a prediction: at this cost per player, how many more players before the
budget is gone? State the assumption that makes that arithmetic wrong (cost is not
perfectly linear) and keep the estimate anyway — a rough prediction that can be checked
is worth more than no prediction.

- Rung 1: you have a number for how long a tick takes and a number for how long it is
  allowed to take. The interesting quantity is the difference.

**2. Measure the cost of one player.** With the server otherwise empty, record tick
time. Have somebody join and stand still; record again. Have them walk around; record
again. Three numbers, one variable changed at a time.

This is the method from the previous two lessons, applied to something that matters, and
it produces the number the prediction above needs.

**3. Prove the lever exists.** Change `simulation-distance` by a small amount — two
steps down — restart, and measure the same way. Then put it back and measure again to
confirm it returns. Small on purpose: this is a demonstration that the setting moves the
number, not an attempt to tune anything. Tuning comes later, after the causes are
understood.

- Deliveries must insist on the return-to-baseline measurement. A change that was not
  undone and re-measured has not been shown to be the cause of anything.

**4. Walk the checklist.** Against the learner's own server, in order, writing down for
each item what was checked, what was found, and how long it took. Most entries will come
back "not this one".

Deliveries must frame that explicitly as success. A checklist that eliminates nine
possibilities in ten minutes has done its job, and the experience of ruling things out
methodically — rather than guessing and changing — is the actual skill. The list is also
the artifact: it goes in the logbook, dated, ready to be walked again next time.

**5. Say what you would do next.** Given where the checklist stopped, name the next
move. If it ran to the end without finding anything, the honest answer is that the cheap
methods are exhausted and a profiler is the next step — which is what the following
lesson installs. Arriving at that conclusion is better than being handed it.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Trust the average.** Take a tick-time reading during a period when the server is
  visibly stuttering. The average may look completely fine. Sit with the contradiction
  between a healthy number and an unhealthy world, and write down what you would need to
  measure instead. This is the motivation for the profiler, felt rather than asserted.
  Nothing to undo.
- **Check the list backwards.** Deliberately start at the bottom: spend ten minutes
  reading about garbage collector flags for your server. Then check item 1. Notice how
  long the wrong order cost, and that item 1 would have answered it. Teaches the
  ordering principle by violating it cheaply, which is the only way it ever really
  lands. Undo: change no flags.

### What just happened — the explanation

A server is a loop with a deadline. Twenty times a second it must do everything the
world requires, and it has fifty milliseconds to do it. That is the whole model, and
almost everything in this subject follows from it.

Which is why ticks per second is such a poor thing to look at. It is a pass mark, and it
reads "pass" across the entire range in which you could still act. It goes wrong only
once the server has already failed, at which point it tells you what everybody in the
world could already see. The number underneath — how much of the fifty milliseconds is
actually used — is the one that turns a measurement into a prediction. That difference,
between reporting a state and predicting a state, is most of what separates somebody
watching a dashboard from somebody operating a service.

The average hiding the spikes is the same lesson from a different angle. What people
feel is not the middle of a distribution, it is the bad end of it. One tick in twenty
running four times over budget is a visible stutter several times a second and a
completely healthy average. This is not a Minecraft quirk; it is why serious measurement
of anything — web requests, frame times, disk latency — is reported in percentiles, and
why an average response time on its own should always make you suspicious.

And the checklist is not a list of fixes. It is an order of elimination, arranged by how
cheap each check is and how often it turns out to be the answer. Most of it will not
apply on any given day, and working through it and finding nothing is not a wasted
afternoon — it is the same afternoon as finding something, minus the luck. The
alternative, which is what most people do, is to change three settings that somebody
recommended and see whether it feels better afterwards, which produces no knowledge at
all.

### Go further — open questions

- The checklist is ordered by cost and likelihood *in general*. On your server, with
  your world and your friends, is that the right order? Reorder it for your situation
  and write down why each thing moved.
- Simulation distance and view distance cost different resources. Design a measurement
  that would tell you which of the two your server is more sensitive to — then run it.
- If one tick in twenty is slow, is it the same one in twenty every time, or random?
  What would each answer imply about the cause? How would you find out with the tools
  you have right now?
- Genuinely open: your server's tick time is fine on average, fine at the 95th
  percentile, and every player says it feels bad at exactly the same moment each
  evening. Nothing you have measured so far would catch that. What would you record,
  and how often, to find it? Nobody writing this lesson knows the best answer.

## Delivery notes

- **guided:** level 2. The percentile explanation is the exception and must be given at
  level 1 depth — defined from nothing, with a worked example — because everything in
  the following lessons rests on it and it is the least familiar idea here.
- The checklist is walked, not read. A delivery that presents it as a table to skim has
  failed; step 4 is the lesson.
- "Most entries come back not-this-one" must be framed as success in the delivery text
  itself, not only in this core. The instinct to treat an unproductive check as a
  failure is exactly what stops people diagnosing anything.
- The frequency claim about item 1 is stated as a reason for the ordering, never with a
  number attached to it.
- Do not preempt the profiler. Step 5's conclusion — that the cheap methods are
  exhausted — has to be reachable by the learner, and the next lesson is better for it.
- Volatile: `/tick query`'s exact output. Point at Minecraft's own documentation.
- No reference delivery: nothing to install.
