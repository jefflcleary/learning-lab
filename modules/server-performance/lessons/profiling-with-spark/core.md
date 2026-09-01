# Profiling the server with spark

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** profiling-with-spark
- **Part:** Part 3 — The profiler
- **Scaffolding:** level 2 — third lesson of the measuring skill. Installing a mod is a
  skill the learner already has; reading a profile is the new thing and carries the
  hints.
- **Deliveries:** guided only.
- **Status:** ready

## Goal and payoff

The learner installs a profiler, captures a profile *while something is actually
wrong*, and reads it well enough to name the cause — not "the server is slow" but "this
specific work took this share of the tick".

This is the tool the previous lesson made them want. It answers the two things the
vanilla numbers could not: it reports a distribution rather than an average, so spikes
stop hiding; and it attributes tick time to named work, so cause number nine on the
checklist — mods — stops being a guess.

Payoff: a report with a link that can be shown to somebody else. Performance work is
unusually social — a profile is shareable evidence, and "here is where the time goes"
is a very different conversation from "it feels laggy".

The discipline the lesson is really about: **profile during the problem, not after it.**
A profile of a healthy server is a perfectly accurate answer to a question nobody asked,
and capturing the right sixty seconds is most of the skill.

## Prerequisites

- A Fabric server you can add mods to, and the habit of matching mod versions to the
  server — established by `modules/minecraft-server/lessons/fabric-modded-server/`
- Reasoning in milliseconds per tick, and knowing what a percentile is — established by
  `modules/server-performance/lessons/the-tick-and-its-budget/`
- A way to make the server slow on demand, so there is something to profile: the
  endless-loop demonstration from
  `modules/server-performance/lessons/what-a-busy-computer-is-doing/` will do, and the
  next lesson builds better ones

## Establishes

- The learner can install spark, capture a profile of a real problem, and attribute
  tick time to a named cause — cited as: "the learner can capture and read a profile —
  established by `modules/server-performance/lessons/profiling-with-spark/`."
- Percentile tick times are now available, so later lessons may assume them.
- Vocabulary: profiler, sampling, call tree, self time, total time, attribution,
  threshold.
- The judgement that a profile is only as good as the moment it was taken.

## Facts

### Where commands run

- **In Minecraft's chat box** — every spark command; they can equally be typed at the
  server console without the leading slash [verify per server type as of 2026-09].
- **On the machine running your server** — placing the mod file, and restarting.

### What a profiler is

- A **profiler** watches a running program and records what it is doing. spark is a
  **sampling** profiler: rather than timing every operation, it interrupts many times a
  second and writes down what the program is in the middle of. Over thousands of
  samples, work that takes a large share of the time appears in a large share of the
  samples.
- The consequence worth stating plainly: a profile is a statistical picture, not a
  ledger. It is excellent at "roughly where does the time go" and poor at "exactly how
  many milliseconds did this one thing take". For finding a bottleneck, that trade is
  entirely the right one, and it is why sampling costs so little to run.

### spark

- spark is by lucko. Its documentation is at spark.lucko.me/docs, and it is genuinely
  good — deliveries point at it rather than restating command syntax, which is volatile.
  [volatile as of 2026-09]
- It is the current standard: Paper's own `/timings` was turned off by default and then
  removed, and spark is what replaced it across Paper, Fabric, Forge, and most modpacks.
  Worth telling the learner, because a great deal of writing online still refers to
  timings, and knowing a tool is retired saves an hour of confusion. [volatile as of
  2026-09]
- Installing on Fabric: download the Fabric build matching the server's Minecraft
  version, put the jar in the server's `mods` folder, restart. This is exactly the
  procedure from the Fabric lesson and should be treated as known rather than retaught.
- Commands the lesson uses [volatile as of 2026-09 — point at spark's docs for current
  syntax and have the learner read `/spark` with no arguments]:
  - `/spark tps` — current tick rate and processor use.
  - `/spark health` — a broader report: tick rate, processor, memory, disk. Adding an
    upload flag produces a web link.
  - `/spark profiler start` and `/spark profiler stop` — capture a profile. Stopping
    uploads it and prints a link to a viewer in a browser.
  - `/spark profiler start --timeout <seconds>` — stop automatically, which matters
    because a profiler left running all night is itself a small cost and a large report.
  - `/spark profiler start --only-ticks-over <milliseconds>` — record only ticks that
    blew the budget. This is the single most useful flag in the tool and the lesson
    builds toward it.
  - `/spark tickmonitor --threshold-tick <milliseconds>` — print a line whenever a tick
    exceeds a threshold, live. Useful for catching *when* rather than *what*.
  - `/spark gc` — garbage collection statistics, needed much later and named here only
    so the learner knows it exists.
  - `/spark heapsummary` — what is actually occupying memory.

### Reading a profile

- The report is a **call tree**: work nested inside work, with a share of time against
  each. The top is the whole tick; each level down is a more specific piece.
- The technique, and it is simple once said: start at the top and repeatedly descend
  into the largest child. The path you follow is where the time is going. Stop when the
  names stop meaning anything, and read the last name that did.
- **Total time** includes everything called from within a piece of work; **self time**
  is what that piece did itself. A function with large total and tiny self time is not
  the culprit — it is the road to the culprit.
- Names in the tree map onto things the learner knows: mob movement, block entities,
  chunk loading, network handling. Mod code is usually recognisable by the mod's own
  name appearing in the path, which is the attribution that makes cause nine checkable.
- What a profile does **not** tell you: what to do about it. It says where the time
  went. Deciding what to change is the next lesson's job, and conflating the two is how
  people end up disabling something important because it appeared in a report.

### Percentiles, at last

- spark reports tick durations as a distribution, including the 95th percentile the
  previous lesson defined and could not measure. This is the direct payoff of that
  lesson's limitation and deliveries should connect the two explicitly.

### The discipline

- A profile of a healthy server describes healthy work. It is accurate, complete, and
  useless for finding a problem that was not happening.
- Therefore: capture *during* the complaint. If the problem is intermittent, either sit
  and wait with the profiler ready, or use the threshold flag so only the bad ticks are
  recorded — which is what that flag is for.
- Sixty to a hundred and twenty seconds of a real problem is worth more than an hour of
  a well-behaved server.

## Arc

### Orientation — given plainly

What a profiler is and what sampling means; what spark is, where its documentation
lives, and that it replaced a tool much of the internet still writes about; how to
install it, which the learner has done before; every command listed above; how a call
tree works and the descend-into-the-largest-child technique; the difference between
total and self time; and the honest limit — it tells you where, never what to do.

Framing sentence: the checklist ran out. Everything cheap has been eliminated, and what
is left needs the server itself to say where its time went.

### Predictions to elicit

- A tool is going to tell you where the server's time goes. Before you install it: what
  do you expect the biggest single item to be on a healthy server with two people on it?
  Write down a guess.
- A profiler that recorded absolutely everything would be perfectly accurate. What would
  it cost? What might a tool do instead to be cheap enough to leave running?
- If you profile your server right now, while nothing is wrong, what do you expect the
  report to show — and would it help you with an intermittent problem?

### The work — goals and hint ladders

**1. Install it.** The Fabric build matching the server's Minecraft version, into
`mods`, restart. Confirm with `/spark` on its own, which lists what it can do — and read
that list in full rather than only the parts this lesson uses. Reading the surface of a
new tool is the habit.

**2. Look at a healthy server first.** `/spark tps`, then `/spark health`. Compare
against the baselines from the first two lessons — the same numbers, from a better
instrument. Then find the percentile figures and compare the average with the 95th. On a
quiet server they will be close, and knowing what close looks like is what makes a gap
recognisable later.

**3. Capture a profile of nothing in particular.** Sixty seconds on a healthy server,
then open the link and explore the tree. Goal is not a diagnosis; it is learning to
read.

- Descend into the largest child repeatedly and see where it leads.
- Find something recognisable — mobs, chunks, the network.
- Check the earlier prediction about the biggest item.

**4. Capture a profile of a real problem.** Cause one deliberately, with the endless
loop from the machine lesson or anything else that reliably degrades the server, and
profile *while it is happening*. Then compare the two reports side by side.

- The comparison is the lesson. One profile alone is hard to interpret; two, one healthy
  and one not, make the difference obvious.
- Rung 1 (if the reports look the same): was the problem actually happening during the
  capture window? How would you know? What does the tick rate say for that period?
- Rung 2: the endless-loop problem is outside the server entirely — it takes the
  processor away rather than making the server do more work. What would that look like
  in a profile of the server's own work, and is a profiler even the right instrument for
  it? (Correct answer: largely not, and finding that out is worth more than a tidy
  result. The processor figure in `/spark health` catches it; the call tree does not.)

**5. Profile only the bad ticks.** With `--only-ticks-over` set just above the budget,
run for a few minutes across a period containing both good and bad ticks. The resulting
report contains only the ticks that failed, which removes the noise of ordinary work.

State plainly why this matters: on a server that is fine 95% of the time, a plain
profile is 95% healthy work, and the interesting 5% is buried inside it.

**6. Say what you found, to somebody.** Upload a report and send the link to whoever
complained. The point is partly social — a profile is evidence, and it moves a
conversation from feelings to a shared object — and partly that explaining a finding is
how you discover whether you actually understood it.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Profile the wrong moment.** Deliberately capture sixty seconds of a perfectly
  healthy server and then try to use that report to explain a problem somebody reported
  an hour ago. It cannot be done, and the report is not defective — it is a precise
  answer to a question nobody asked. Teaches the discipline better than any instruction:
  a profiler is a camera, and it photographs whatever is in front of it. Nothing to
  undo.
- **Leave the profiler running far too long.** Start one with no timeout and leave it
  for a long stretch. Notice the size and unwieldiness of the result, and that the
  interesting moments are diluted by everything else. Then do the same period with a
  threshold and compare. Teaches why the flags exist. Undo: stop the profiler.
- **Blame the first name you recognise.** Find a familiar name in the tree with a large
  total time, and declare it the problem — before checking its self time. Then check.
  Often it is a road rather than a destination. Teaches the distinction between total
  and self time as a mistake rather than a definition.

### What just happened — the explanation

The server has been keeping track of where its own time goes the entire time; it simply
had no way to tell you. A profiler is the thing that asks.

Sampling is the trick that makes it cheap. Recording every operation a program performs
would be perfectly accurate and would slow the program so much that the measurement
would change the thing being measured. Interrupting many times a second and noting what
is happening costs almost nothing, and over thousands of samples the arithmetic works
out: whatever takes a lot of time appears in a lot of samples. The result is a
statistical picture rather than a ledger, which is exactly the right trade for finding a
bottleneck and the wrong one for billing somebody by the millisecond. This is how
profilers for every language work, and the reasoning transfers directly.

The call tree is worth recognising for what it is: a picture of work nested inside work.
Reading it by repeatedly descending into the largest child is a technique, not a
Minecraft technique — it works on any profile of any program, and the total-versus-self
distinction is where most beginners go wrong exactly once.

And the discipline underneath all of it: a profile is a photograph. It shows what was
happening while the shutter was open, faithfully and uselessly if the shutter was open
at the wrong time. The threshold flag exists because the interesting moments are rare
and surrounded by ordinary ones, which is true of nearly every intermittent problem in
any system — the hard part is rarely the analysis, it is being pointed at the right
sixty seconds.

One honest limit, worth carrying: this told you where the time went. It did not tell you
what to do, and it never will. Something appearing in a report is not permission to
remove it.

### Go further — open questions

- Run `/spark` with no arguments and read every subcommand, including the ones this
  session never used. What is `heapsummary` for, and what would you learn from it that a
  tick profile cannot show?
- The endless-loop problem barely showed up in the call tree. What other kinds of
  problem would a tick profiler be blind to? Make a list before you need it.
- Profile the same period twice, at the same time, and compare. How similar are the two
  reports? What does the difference tell you about how much precision to claim?
- Genuinely open: profiles are captured by a person who happens to be watching. Almost
  every real problem happens when nobody is. What would a setup look like that captured
  a profile automatically whenever the server had a bad minute — and what would be the
  risks of leaving something like that running? Nobody writing this session knows the
  best design.

## Delivery notes

- **guided:** level 2. Installing the mod is not retaught — the Fabric lesson owns that
  skill and this delivery says so in one line and moves on.
- Do not restate spark's command syntax as fact. Point at spark's documentation, and
  have the learner run `/spark` and read the list. The commands here are for the author.
- The healthy-profile-first ordering is deliberate and must not be reversed for pace.
  A learner who has never seen a normal report cannot recognise an abnormal one, which
  is the same principle as the baseline in the first lesson.
- Step 4's rung 2 is the most valuable moment in the lesson: discovering that a
  profiler is the wrong instrument for an external processor thief. Do not soften it
  into a tidy success — the honest answer is that the tool has a blind spot and knowing
  its shape is part of owning it.
- Connect the percentile figures explicitly back to the previous lesson's stated
  limitation. That lesson deliberately left the gap; this one closes it, and the
  delivery should say so.
- No reference delivery.
