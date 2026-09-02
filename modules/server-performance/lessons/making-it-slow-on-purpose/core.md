# Making the server slow on purpose

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** making-it-slow-on-purpose
- **Part:** Part 4 — The laboratory
- **Scaffolding:** level 3 for the experiments themselves — goals and success criteria
  only, because by this point every instrument has been used twice and the learner
  should be running the protocol without being walked through it. Level 2 for the two
  experiments that need something built (the bot and the entity loop), where the
  building is briefly supported.
- **Deliveries:** guided only.
- **Status:** ready

## Goal and payoff

**The module's milestone: the learner causes six different slowdowns on purpose and
identifies each one from its measurements alone.**

Every earlier lesson built an instrument. This one is where instruments become
diagnosis, and it works because the answer is known in advance. A learner who has made a
server slow six ways, and watched a *different* number move each time, can recognise an
unfamiliar slowdown in a way no amount of reading achieves — because the six experiments
leave behind six signatures.

The deliverable is a signature table, written by the learner: for each cause, which
numbers moved, which conspicuously did not, and what it felt like in the world. That
table is the thing they will actually use for the rest of their life with this server,
and it cannot be handed over, because a signature that was read rather than observed
does not stick.

The load generators are built rather than supplied. The chunk-generation experiment is a
mineflayer bot flying in a straight line; the entity experiment is a loop the learner
writes. Both skills already exist from the minecraft-server module, and spending them
here is most of why this lesson works — the tools of the earlier arcs turn out to be
instruments.

## Prerequisites

- A profiler installed, and the ability to read a report — established by
  `modules/server-performance/lessons/profiling-with-spark/`
- Headroom, percentiles, and the ordered causes — established by
  `modules/server-performance/lessons/the-tick-and-its-budget/`
- Reading a machine's four resources — established by
  `modules/server-performance/lessons/what-a-busy-computer-is-doing/`
- A server nobody depends on, which can be degraded freely and restored. The
  expendable-server arrangement from
  `modules/minecraft-server/lessons/choosing-a-version/` is exactly this.
- A recent backup that has been restored from at least once — established by
  `modules/minecraft-server/lessons/worlds-and-backups/`. Two of these experiments
  create large numbers of entities and change world state.
- For two experiments only: writing a bot, and writing a datapack function —
  established by `modules/minecraft-server/lessons/writing-your-first-bot/` and
  `modules/minecraft-server/lessons/building-datapacks/`. A learner without those can do
  the other four.

## Establishes

- A written signature table: six causes, each with the numbers that moved and the
  numbers that did not — cited as: "the learner has caused and identified six distinct
  slowdowns — established by
  `modules/server-performance/lessons/making-it-slow-on-purpose/`."
- The experimental protocol as a habit: predict, baseline, one change, measure,
  attribute, undo, re-measure.
- First-hand knowledge that different causes produce genuinely different evidence, which
  is what makes diagnosis possible at all.

## Facts

### Where commands run

Three places, all labelled in deliveries:

- **In Minecraft's chat box** — spark commands, `/summon`, datapack function calls.
- **On the machine running your server** — `server.properties` edits, heap settings,
  restarts, resource readings.
- **In a terminal on your Mac** — running the bot.

### The protocol

Every experiment follows the same seven steps, and deliveries must present it once, up
front, and then not repeat it:

1. **Predict.** Which of the four resources will this hit? Which numbers will move?
   Write it down before touching anything.
2. **Baseline.** Measure with nothing changed. Tick time average and 95th percentile,
   the four machine resources, and how it feels in the world.
3. **Change one thing.** Exactly one.
4. **Measure the same things**, the same way.
5. **Attribute.** Which numbers moved, and — equally important — which did not. The
   ones that stayed still are half the signature.
6. **Undo.**
7. **Measure again**, to confirm it returned. A change that was not undone and
   re-measured has not been shown to cause anything.

### Safety, restated at every experiment

- Expendable server only. Two of these experiments leave thousands of entities in a
  world, and one deliberately misconfigures memory.
- Fresh backup first.
- One experiment at a time, fully undone before the next begins.
- Nobody else should be relying on the server while this happens.

### The six experiments

**1. Distance.** Raise `view-distance` and `simulation-distance` several steps.
Signature: sustained tick-time increase that scales with player count; processor busy on
one core; upload bandwidth up; the profile shows chunk and entity work spread across the
tree rather than concentrated. Undo by restoring both values. Teaching point: these two
settings cost differently, and running the experiment on each *separately* is what shows
it — view distance moves bandwidth more, simulation distance moves tick time more.

**2. Entities.** Create thousands of entities in one place. Two routes: a datapack
function containing a `summon` repeated many times, or a repeating function call. Items
and mobs behave differently and both are worth trying. Signature: sustained tick-time
increase, concentrated in a single identifiable branch of the profile; the increase is
present even when nobody is nearby if the chunks stay loaded; memory rises. Undo with a
`kill` targeting the summoned entities, which is also a lesson in target selectors and
in how easy it is to write a `kill` that removes more than intended. [verify current
selector syntax as of 2026-09 — deliveries point at Minecraft's command documentation]

**3. Chunk generation.** A mineflayer bot flying in a straight line into terrain nobody
has visited. Signature: *spikes* rather than sustained load — a jagged 95th percentile
with a normal average, which is precisely the case the percentile lesson described and
the average lesson could not see. Processor busy across several cores rather than one,
because generation is not confined to the tick thread. Self-resolving the moment the bot
stops. Undo: stop the bot; the generated chunks remain, which is itself worth noticing
and is the reason pregeneration works.

**4. Per-tick machinery.** A hopper chain, or a redstone clock, built and left running.
Signature: a small, absolutely constant tick-time increase that does not depend on
anybody being online, and that persists after every player logs out — as long as the
chunk stays loaded. This is the experiment that teaches that a world can be slow with
nobody in it. Undo: break the circuit.

**5. Memory, in both directions.** First `-Xmx` far too small: signature is a permanent
stutter, a sawtooth in tick times, and garbage collection visible in `/spark gc`. Then
`-Xmx` far too large relative to the machine: signature is swap use, and pauses that are
long and infrequent rather than short and constant. Two opposite misconfigurations with
two distinguishable signatures is the point — this is why "give it more memory" is not
automatically good advice, and it is where cause 3 on the checklist becomes concrete.
Undo: restore the original value.

**6. Network.** Saturate the upload from the machine the server runs on — a large
upload, or many simultaneous transfers. Signature: every player sees rubber-banding
while the server's own tick numbers stay perfect. The profile shows nothing wrong,
because nothing is wrong with the server. This closes the loop on the very first lesson:
it is the third kind of slow, caused deliberately. [verify a safe, cheap method per
platform as of 2026-09 — deliveries should let the learner choose a method rather than
prescribing one, and must warn that this consumes real bandwidth on a metered
connection]

### Why the six were chosen

Each hits a different resource or a different *shape*: sustained versus spiky, dependent
on players versus independent of them, inside the server's own work versus outside it.
That variety is the curriculum. Six experiments that all produced the same signature
would teach nothing.

## Arc

### Orientation — given plainly

The protocol; the safety rules; what each of the six experiments is and how to perform
it; and, crucially, **not** the signatures. The signature of each cause is what the
learner is here to observe, and giving it in advance turns the lesson into a
confirmation exercise.

Framing sentence: every measurement so far has been of a problem whose cause was
unknown. These six have known causes, which is the only situation in which you can find
out what a cause looks like.

### Predictions to elicit

Per experiment, before each one, and this is the lesson's engine rather than a warm-up:

- Which of the four resources will this hit?
- Will it be sustained or spiky?
- Will it still be there when everybody logs out?
- Which numbers will *not* move?

And once, before starting anything: which of the six do you expect to be the worst? And
which do you think is most likely to be the real cause on a server like yours?

### The work — goals and hint ladders

Six experiments, each run to the protocol, each ending with a row added to the signature
table. Deliveries state the goal and the success criterion and otherwise stay out of the
way — by this point the learner has every instrument and every method.

Hints exist only where something is built:

- **The entity loop.** Rung 1: you have written datapack functions that run commands;
  what you need is one command repeated a great many times, or one that runs repeatedly.
  Rung 2: a function file is a list of commands, and nothing stops a list being long;
  the harder version is a function that calls itself on a schedule, which is the one to
  reach for if you want the count to keep climbing while you watch.
- **Undoing the entity loop.** Rung 1: there is a command that removes entities, and it
  takes a target selector — the same filtering language you used for datapacks. Rung 2:
  write the selector to match only what you summoned. A selector that matches more than
  you meant is the fastest way to delete something you wanted, which is exactly why this
  is happening on the expendable server.
- **The bot.** Rung 1: your bot already knows how to join and to move. Flying in a
  straight line indefinitely is a smaller program than the ones you have written. Rung
  2: the goal is to keep entering terrain that has never been visited, so a straight
  line away from spawn matters more than any clever pathfinding.

The signature table is built row by row as the experiments complete, never at the end
from memory.

### Break it on purpose — failures to cause, what each teaches, how to undo

The whole lesson is deliberate breakage, so this section does the opposite: it breaks
the *method* rather than the server.

- **Change two things at once.** Deliberately raise the distance settings and summon
  entities in the same step, then measure. The server is slower. Now try to say which
  change did it, and by how much. You cannot — and notice that you could construct a
  plausible story for either one, which is the dangerous part. Then undo both and do
  them separately. This is the discipline the whole module rests on, felt as a failure
  instead of stated as a rule.
- **Skip the undo.** Run an experiment, measure, conclude, and move to the next without
  restoring the first. Two experiments later, the baseline is meaningless and every
  subsequent measurement is contaminated. Recover by undoing everything and re-taking
  the baseline. Teaches why step 7 exists, at the cost of one wasted afternoon rather
  than a wrong conclusion about a real problem later.
- **Trust a single measurement.** Take one reading immediately after a change, before
  anything settles. Then take another two minutes later. They may differ substantially —
  chunks are still loading, the collector has just run, a player moved. Teaches that a
  measurement is a sample and that one on its own establishes nothing.

### What just happened — the explanation

Six causes, six different fingerprints. That is the finding, and it is what makes
diagnosis possible at all — if every cause produced identical evidence, no amount of
instrumentation would help anybody.

The differences are worth naming as a set. Some causes are sustained and some are spiky,
which is why the average and the 95th percentile disagree in one case and agree in
another. Some depend on people being online and some do not, which is why "it's slow
even with nobody on" is such a useful thing to know. Some live inside the server's own
work, where a profiler sees them clearly, and some live outside it entirely, where a
profiler sees nothing at all and the machine's resource figures see everything. And the
numbers that *didn't* move turn out to carry as much information as the ones that did:
perfect tick times during a complaint is not the absence of evidence, it is evidence.

The two memory experiments deserve a note of their own, because they point in opposite
directions from the same instinct. Too little memory and the collector runs constantly,
producing a permanent stutter. Too much, relative to the machine, and the machine starts
using its disk as memory, producing long pauses. "Give it more memory" is therefore not
advice, it is a coin flip — and the difference between the two outcomes is visible in
about thirty seconds if you know which two numbers to look at.

Something bigger is underneath this lesson, and it is not about Minecraft. The reason
you can now diagnose a slowdown you have never seen is that you spent an afternoon
causing slowdowns whose answers you already knew. That is how a person becomes able to
read a system: not by memorising causes, but by building a private library of what
causes look like. It works for a game server, a website, a car, or a body, and the
method is always the same — break something you can afford to break, watch carefully,
and write down what it looked like.

### Go further — open questions

- Two of these six produce a similar-looking tick-time graph. Which two, and what is the
  cheapest measurement that would tell them apart?
- Combine two experiments on purpose, having done them separately first. Is the result
  the sum of the two, or worse than the sum? What would it mean if it were worse?
- Design a seventh experiment for a cause on the checklist you did not test — the disk,
  or players spread out. Predict its signature, then run it and find out whether you
  were right.
- Genuinely open: your signature table describes your server, on your machine, with your
  mods. How much of it would still hold on a machine twice as fast — and how much on a
  server with thirty players instead of four? Some of these signatures scale and some
  invert, and nobody writing this lesson knows which is which for your setup.

## Delivery notes

- **guided:** level 3 for the experiments. Resist the pull to walk each one — the
  learner has all the instruments, and being handed the procedure would remove the only
  thing this lesson does. Support only the two builds.
- **The signatures are never given in advance.** This is the single most important
  constraint on this delivery. A table of expected results turns the milestone into a
  confirmation exercise and destroys the lesson. The learner's own table, built row by
  row, is the deliverable.
- Safety framing is restated at every experiment, not once at the top. Two of these
  create thousands of entities and one deliberately misconfigures memory.
- The network experiment must warn about metered connections and must let the learner
  pick a method rather than prescribing one that may cost them money.
- The `kill` selector is a genuine hazard and the delivery should say so plainly: it is
  the moment a learner can delete something they wanted. It happens on the expendable
  server for exactly this reason, and that connection should be drawn.
- Experiments 2 and 3 need skills from the bot and datapack lessons. State that as a
  condition, and say plainly that the other four stand alone — a learner who has not
  done those arcs is not blocked from the milestone, only from two of its six parts.
- No reference delivery.
