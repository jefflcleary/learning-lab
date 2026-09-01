# What a computer is doing while it's busy

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** what-a-busy-computer-is-doing
- **Part:** Part 1 — Measuring a machine
- **Scaffolding:** level 1 — first lesson of the reading-a-machine skill. Reasoning
  shown throughout.
- **Deliveries:** guided only. One small install, no plumbing an adult needs to do
  ahead of a session.
- **Status:** ready

## Goal and payoff

A computer has four things it can run out of — processor, memory, disk, and network —
and "slow" always means one of them is the limit. This lesson makes those four
visible, on both the learner's own machine and the machine the server runs on for other
people, and produces the word that organises the rest of the module: **bottleneck**,
the one resource that has run out, while the other three sit idle.

The lesson's demonstration, and the payoff worth showing: the learner deliberately
starves the server of processor time using a program that has nothing to do with
Minecraft, watches the world go into slow motion, and stops it again. Cause number two
on the module's list — something else on the machine is taking the processor — turns
from a claim into something they made happen.

The quieter payload, and the reason both machines are measured: the same server, the
same world, and the same settings produce different numbers on different machines. A
measurement describes a whole system, not a program.

## Prerequisites

- A Minecraft server you can start, stop, and join — established by
  `modules/minecraft-server/lessons/running-your-own-server/`
- Being able to tell frame rate, tick rate, and latency apart — established by
  `modules/server-performance/lessons/three-kinds-of-slow/`. The tick rate is the
  number this lesson watches while it interferes with the machine.
- For the second half only: a Linux machine you can log into that runs the server for
  other people — established by
  `modules/remote-server/lessons/keeping-it-running/`. The first half works
  entirely on the learner's own computer, and a learner without a second machine can
  do everything except the comparison.

## Establishes

- The learner can read processor, memory, disk, and network use on macOS and on Linux,
  and can say which of the four is the limit — cited as: "the learner can find a
  machine's bottleneck — established by
  `modules/server-performance/lessons/what-a-busy-computer-is-doing/`."
- Vocabulary later lessons use freely: bottleneck, core, thread, load average, swap,
  heap, input/output wait, saturation.
- The knowledge that Minecraft's world runs on one thread, so a machine with idle cores
  can still be out of processor as far as the server is concerned.
- A second baseline in the logbook: the four resource readings for both machines, while
  healthy.

## Facts

### Where commands run

Commands run in two places, so every code block carries a where-to-run label:

- **In a terminal on your Mac** — `top`, and Activity Monitor as its window-shaped
  equivalent.
- **On the machine running your server** — the same measurements in Linux form,
  reached over SSH. Where that machine *is* the learner's Mac, both labels describe the
  same computer and the lesson says so rather than pretending otherwise.

### The four things a computer runs out of

- **Processor** — how much computing it can do per second. Runs out when work arrives
  faster than it can be finished.
- **Memory** — how much can be held at once. Runs out either by refusing to allocate,
  or, worse, by pushing memory onto the disk, which is thousands of times slower.
- **Disk** — both space and speed. Runs out of space obviously and loudly; runs out of
  speed quietly, as pauses whenever something is written.
- **Network** — how much can be sent and received per second. On a server the limit
  that matters is nearly always **upload**, because a server mostly sends.

**Bottleneck** is the name for whichever one has run out. The word earns its place
because of what it implies: improving any of the other three changes nothing at all.
More memory does not help a machine that is out of processor, and this is the single
most common way people waste money and an afternoon on a slow server.

### Processor, and the fact that catches everyone

- A **core** is one processing unit; a modern machine has several and can genuinely do
  that many things at once. A **thread** is one sequence of work; each core runs one
  thread at a time.
- Percentage figures are reported in two different conventions, and confusing them is
  the standard mistake: some tools show 100% as "one core fully busy" (so 400% is
  possible on a four-core machine), and others show 100% as "the whole machine".
  Deliveries must have the learner determine which convention their tool uses rather
  than assert one, because it differs between `top`, Activity Monitor, and Linux
  builds. [verify per tool as of 2026-09]
- **Minecraft runs the world on a single thread.** Everything in a tick — mobs,
  furnaces, hoppers, crops — happens in sequence on one core. Consequences that must
  be stated plainly, because a learner cannot derive them:
  - A four-core machine showing 25% total processor use may be completely saturated as
    far as the server is concerned. One core is at its limit and the other three cannot
    help.
  - Buying more cores does not make ticks finish faster. Single-core speed does.
  - Some work does happen on other threads — chunk generation and network handling
    among them — which is why the total is not always meaningless.
- [linux] **Load average** (in `uptime` and at the top of `top`) is roughly how many
  threads wanted to run, averaged over one, five, and fifteen minutes. Compared against
  the number of cores: a load average near the core count means fully occupied, well
  above it means work is queuing.

### Memory

- [linux] `free -h` shows total, used, free, and **available**. Available is the number
  that matters: it counts memory currently used as disk cache, which the system will
  hand back on demand. A machine showing almost no "free" memory is normal and healthy.
- **Swap** is disk space used as overflow memory. A machine that is swapping is
  reading memory from a disk, which is slower by a factor of thousands. For a server
  this is not "a bit slower"; it is the difference between working and not working.
  Any swap use on a machine running a game server is a finding.
- The **heap** is the memory the Java runtime has been told it may use for the world
  and everything in it, set with `-Xmx`. Two separate numbers exist and get confused:
  the heap the server is allowed, and the memory the machine actually has. The first
  must be meaningfully smaller than the second — the Java runtime needs memory beyond
  the heap, and the operating system needs its own.

### Disk

- Space: `df -h`. A full disk stops a server writing its world, which fails in
  confusing ways rather than saying "disk full".
- Speed: the symptom is a hitch every few minutes, when the server saves. Named here
  and diagnosed properly with a profiler later. [linux] `iostat` and the `wa`
  (input/output wait) figure in `top` are where it shows up — a machine with high wait
  is not busy computing, it is waiting for a disk.

### Network

- A server sends far more than it receives: world data out to every player, several
  times a second. The constraint is upload, and on a home connection upload is usually
  a fraction of download.
- Server-side bandwidth cost rises with the number of players **and** with
  `view-distance`, because both multiply how much world is being sent.
- A saturated upload produces latency symptoms — the yanked-backwards feeling from the
  previous lesson — while the server's own tick numbers stay perfect. This is exactly
  why the previous lesson comes first.

### The tools

- [macos] **Activity Monitor** is in Applications, under Utilities. Tabs for CPU,
  Memory, Energy, Disk, Network. It is the same information as the terminal tools in a
  window.
- [macos] **`top`** ships with macOS. It sorts by processor use with `o cpu` and quits
  with `q`. Its column meanings are in `man top`, and macOS's version differs from
  Linux's in both flags and layout — worth saying out loud, because it is the first
  time in this module the same command name behaves differently on two machines.
- [linux] **`top`** ships with Ubuntu. **`htop`** is the friendlier version, with
  colour, per-core bars, and arrow-key scrolling; it is installed with
  `sudo apt install htop`. This is the lesson's only install.
- [linux] **`free -h`**, **`df -h`**, **`uptime`** — memory, disk space, load average.
  All present by default.
- A load generator that has nothing to do with Minecraft, for the demonstration: an
  endless loop that does nothing but occupy a core. `yes > /dev/null` is the shortest
  form and works on both machines; `Ctrl-C` stops it. It is harmless, uses no memory,
  writes nothing, and stops the instant it is told to.

## Arc

### Orientation — given plainly

All of the above. The four resources, what each means, what saturation looks like for
each, the tools on both operating systems, and the single-thread fact, which is the one
piece a learner genuinely cannot work out for themselves and which changes how every
later number is read.

Framing sentence: every slow computer is slow because it ran out of exactly one thing,
and the entire job is finding out which.

### Predictions to elicit

- Your server is running and people are playing. Of the four — processor, memory, disk,
  network — which do you think is working hardest? Commit before measuring.
- Your machine has several cores. If Minecraft can only use one of them for the world,
  what does "the processor is full" look like on a graph of all of them?
- If a machine ran out of memory, what would you expect to happen? Now: what if instead
  of failing, it quietly started using the disk as memory — what would that feel like?
- What do you think this same server looks like on the other machine — better, worse,
  or identical? Why?

### The work — goals and hint ladders

**1. Watch your own machine while nothing is happening.** Open Activity Monitor and
`top` side by side and read them with the server stopped. Establish what quiet looks
like. Note which convention the percentages use — is 100% one core or the whole
machine? Work it out by running the load generator and watching what the number does.

- Rung 1: start one endless loop and watch the number. Then start a second one. What
  happens to the total tells you which convention you are reading.

**2. Watch it while the server runs.** Start the server, join it, and watch all four
resources. Then have somebody else join, and watch again. Record which numbers move and
which do not.

**3. Do the same on the machine that runs the server for other people.** Install
`htop`, then take the same four readings there. Then the comparison that carries the
lesson: same world, same settings, two machines, different numbers. Write down both
sets and the difference.

- The explanation, given rather than hinted: different processors, different amounts of
  contention, different disks. A measurement is about a system, not a program, which is
  why a benchmark from somebody else's machine tells you almost nothing about yours.

**4. Cause a bottleneck deliberately.** The demonstration. On the machine running the
server, with players' tick rate visible:

- Start one endless loop. Watch the processor figure. Watch the tick rate.
- Start as many loops as the machine has cores. Now the server is genuinely competing
  for the processor, and the world will go into slow motion.
- Stop them all. Watch it recover.

What this proves: nothing was wrong with Minecraft, the world, or the settings. A
completely unrelated program took the processor, and the symptom was indistinguishable
from "the server is badly configured". This is cause number two on the module's list,
manufactured on purpose.

- Deliveries must state where this is safe: the expendable server, and not while
  people are playing on a world they care about.
- Rung 1 (if the tick rate barely moves with one loop): how many cores does the machine
  have, and how many are now occupied? What would it take to occupy all of them?

**5. Record the second baseline.** Four readings for each machine, healthy, with the
date and what was running. Together with the first lesson's baseline, this is what
every later measurement is compared against.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Fill the memory instead of the processor.** Give the server a heap larger than the
  machine's memory — set `-Xmx` above what `free -h` reports as total — and start it.
  Watch what happens: either it refuses to start, saying so clearly, or it starts and
  the machine begins swapping and everything becomes treacle. Read whichever answer you
  get. Teaches the heap-versus-machine-memory distinction as an event rather than a
  warning. Undo: set the heap back to a sane value and restart.
- **Read the wrong percentage.** Deliberately conclude, from a four-core machine
  sitting at 25%, that the processor is fine. Then look at the per-core view. Three
  cores idle, one pinned. Teaches why the single-thread fact matters and why the
  headline number lies. Nothing to undo — the point is the misreading.

### What just happened — the explanation

Four resources, one of which is always the limit. That is not a Minecraft fact; it is
what "slow" means for any program on any computer. A web server, a video export, a
phone app — each is at any moment waiting on the processor, the memory, the disk, or
the network, and the work of making anything faster starts by finding out which.

The single-thread fact is the one worth carrying furthest. Minecraft runs its world in
one sequence, on one core, fifty milliseconds at a time. That is why a machine that
looks a quarter busy can be completely full as far as the game is concerned, why the
answer to a slow server is rarely "more cores", and why the interesting number is how
fast one core is rather than how many there are. Plenty of software is like this, for
the same reason: some work simply has to happen in order.

The demonstration was the important part. An endless loop that knows nothing about
Minecraft made the world run in slow motion, and stopping it fixed everything. Nothing
about the server was ever wrong. When somebody says a server is badly configured, this
is one of the things they might actually be looking at — and it is the second thing to
check, before anything expensive, because it costs one glance at a list of running
programs.

And the two machines gave different answers for the same world. There is no such thing
as how fast this server is; there is only how fast it is on this machine, with these
other things running, on this disk. Which is why every measurement in this module is
taken twice, and why numbers copied from somebody else's server are worth very little.

### Go further — open questions

- Read the whole of `top` once — every column. `man top` explains them. How much of
  what your machine is doing has been visible this whole time?
- Your machine is running dozens of programs you did not start. Sort by processor use
  and look at the top ten. What are they, and what would happen if you stopped one?
- The endless loop occupied a core doing nothing useful. Could you write one that
  occupies memory instead, or the disk? What would each look like in your tools?
- Genuinely open: your server's tick rate is fine but one player complains constantly.
  You have four resources on two machines and a network in between, and none of the
  numbers you can see look wrong. What would you measure next? Nobody writing this
  lesson knows the best answer, and the honest first move may be to measure something
  on *their* machine rather than yours.

## Delivery notes

- **guided:** level 1. The single-thread fact is orientation and must be given plainly,
  early, before any percentage is interpreted — a learner who reads a headline
  processor figure without it will reach a confident wrong conclusion.
- The endless-loop demonstration must carry the expendable-server framing every time it
  appears. Deliberately starving a server that people are playing on is not an
  experiment.
- Do not assert which percentage convention a tool uses. The learner determines it by
  running two loops, which is a better lesson anyway.
- The second machine is optional in the sense that the first half stands alone; say so,
  so a learner without one is not blocked. Do not imply their measurements are lesser —
  a personal computer is where contention is easiest to see, because it is full of it.
- Volatile: tool flags and column layouts differ between macOS and Linux and between
  versions. Point at `man`, always.
- No reference delivery: one install, no plumbing to hand to an adult.
