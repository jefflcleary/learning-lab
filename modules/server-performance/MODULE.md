# Module design — Finding out why a server is slow

The arcs, their milestones, the status of every lesson, and this module's own
constraints. This is the authors' map; the learner-facing rendering of the recommended
order is the lesson list on `README.md` (this folder), which only links to lessons that exist. General
method and format rules live in `authoring/PRINCIPLES.md`; this file binds only this
module.

Order here is recommended, never enforced. Every lesson must stand alone when read cold.

---

## The design brief

The founding observation: people say "the server seems laggy" and cannot say why, and
neither can the person running it. The complaint arrives shaped like weather — a
condition that happens to you, with no handle on it.

The whole module exists to replace that with a number, a cause, and a change that can
be shown to have worked. The disposition payload is the lab's own, in a new place: a
wall — "it's just slow sometimes" — is a door whose handle hasn't been found.

The method the module enforces everywhere, and the actual transferable skill:
**measure, change one thing, measure again.** A change that wasn't measured before and
after didn't teach anything, however plausible it sounded.

The signature move, and the reason this subject suits this lab: the learner **causes**
each problem on purpose before diagnosing it. Elsewhere in the lab, breaking things is
a section at the end of a lesson. Here it is the curriculum. A learner who has made a
server slow six different ways, and watched a different number move each time, can
read an unfamiliar slowdown in a way that no amount of reading achieves.

---

## Module-specific constraints

- **Every load experiment runs on the expendable server.** Deliberately degrading a
  world other people build in is vandalism. This rule is load-bearing here rather than
  decorative, and every lesson that causes load must restate it.
- **One change at a time, measured before and after.** No lesson may change two things
  between measurements, even where it would be faster. The discipline is the subject.
- **No pasted settings lists.** The module never hands over a block of
  `server.properties` values to copy. The internet is full of cargo-cult optimization
  lists, and being the antidote to those is most of this module's value. Every setting
  the learner ends up changing is one they measured their way to.
- **Two machines, both targeted.** Measurements are taken on the learner's own computer
  *and* on the machine the server actually runs on for other people. Numbers do not
  transfer between them, and finding that out is itself a lesson (see cross-cutting
  decisions). Deliveries carry where-to-run labels throughout, per
  `authoring/PRINCIPLES.md`.
- **Fabric, not Paper.** Consistent with the minecraft-server module's existing choice.
  Consequence to teach rather than hide: most optimization advice online assumes Paper,
  and several of the knobs it cites do not exist on a Fabric server.
- **Platform scope: macOS deliveries only, for now**, for the learner's own machine.
  The server-side material is Linux and platform-neutral. Cores tag platform-specific
  facts `[macos]` / `[windows]`.

---

## The ordered causes

The module's central artifact, distributed across its lessons and stated as an ordered
list in the cheap-checks lesson. Ordering principle: **cheapest and most likely first;
the profiler is what you reach for when this list runs out, not before.** "Cheapest"
counts money, time and what somebody gives up — an ordering that treats spending money as
a defeat is an ideology, not an analysis, and on an undersized machine it is an expensive
way to avoid a small recurring cost.

1. **It isn't the server.** The player's own frame rate, or the player's own
   connection. The most common single answer, and free to check. Everything else on
   this list is wasted effort until this is ruled out.
2. **Something else on the machine is taking the processor.** On a personal computer:
   a browser, a game, a backup, a search indexer, a video call. On a rented machine
   running nothing else this is rare — and that contrast is the cleanest available
   proof that the cause was contention rather than the server.
3. **The machine is too small for what is being asked of it.** A mismatch between the
   specification and the job, checkable in a minute from the specs against the player
   count. Cheaper to act on than anything below it when the answer is clearly yes, in
   time as well as money.
4. **The heap is the wrong size.** Too small produces constant garbage collection and
   a permanent stutter. Too large makes the machine swap, or makes individual pauses
   long. This is memory *sizing*, which is early and cheap; it is not flag tuning,
   which is last.
5. **View distance and simulation distance are too high for this machine.** The single
   biggest lever in `server.properties`, and cost rises sharply with each step.
6. **The players are spread out.** Each player loads their own chunks, so four players
   in four places costs far more than four players together. Not a fault — a fact, and
   the explanation for "it's only slow sometimes."
7. **Someone is exploring.** Terrain nobody has visited has to be generated as they
   travel. The spikes are real, self-resolving, and removable in advance by
   pregenerating.
8. **Entities.** Mob farms, animal pens, dropped items, item frames, boats. A world
   people have lived in for months accumulates these without anyone deciding to.
9. **Redstone and hoppers.** Clocks and long hopper chains do work every tick, forever,
   whether or not anyone is nearby.
10. **Mods.** Two distinguishable cases, and a profiler tells them apart: every mod adds
   some per-tick work, so many mods cost more than few; and a single badly-behaved mod
   can dominate a tick on its own. Attribution by mod is exactly what the profiler
   gives, which is why "too many mods" is a hypothesis rather than a conclusion.
11. **The disk.** Saves that hitch every few minutes; a disk that is slow, full, or
    busy with something else.
12. **The network.** A home upload saturated by somebody else's video call shows up as
    rubber-banding for every player while the server's own numbers stay perfect — which
    is exactly why symptom triage is first on this list and not last.
13. **Garbage collector tuning.** Last, and only with evidence of pauses in a profile.
    Reaching for collector flags before the eleven items above is the most common way
    people spend an evening and change nothing.

---

## Parts

### Part 0 — What "slow" means

| Lesson | Goal | Status |
|---|---|---|
| `three-kinds-of-slow` | Frame rate, tick rate, and latency are three unrelated problems that all get called lag; triage between them with the client's own debug screen, the server's "Can't keep up" line, and ping | core + guided written |

Highest value in the module and the cheapest to deliver: no mods, no tools, no rented
machine. Payoff: the learner can answer "is it you, me, or the connection?" for anyone
who complains, which is a thing other people immediately notice.

### Part 1 — Measuring a machine

| Lesson | Goal | Status |
|---|---|---|
| `what-a-busy-computer-is-doing` | Processor, memory, disk, and network as four resources that can each be the bottleneck; reading them live on both machines; the word "bottleneck" earned rather than asserted | core + guided written |

Transferable computing rather than Minecraft, which is why it sits this early. The
same server, the same world, two machines, different numbers — a measurement describes
a *system*, not a program.

### Part 2 — Measuring the server

| Lesson | Goal | Status |
|---|---|---|
| `the-tick-and-its-budget` | Twenty ticks a second, fifty milliseconds each, everything the world does must fit; tick rate as symptom and milliseconds-per-tick as measurement; why the 95th percentile is the honest number and the average lies; then the ordered causes, worked in order | core + guided written |

The concept the whole subject rests on. The ordered-causes list lands here, as work
rather than as a table to read: the learner walks it against their own server.

### Part 3 — The profiler

| Lesson | Goal | Status |
|---|---|---|
| `profiling-with-spark` | Install spark on the Fabric server; capture a profile *during* real slowness; read the report; attribute tick time to a named cause | core + guided written |

Requires the Fabric server established by `modules/minecraft-server/lessons/fabric-modded-server/`.
Deliberately after the cheap checks: a profiler used first is a way of getting a very
precise answer to a question you didn't need to ask.

### Part 4 — The laboratory

**Milestone: the learner causes six different slowdowns on purpose and identifies each
one from its measurements alone.**

| Lesson | Goal | Status |
|---|---|---|
| `making-it-slow-on-purpose` | Predict, baseline, break, measure, attribute, undo — six times, each hitting a different resource | core + guided written |

Candidate experiments, each deliberately hitting a different part of the machine:
crank view and simulation distance (processor and bandwidth); summon thousands of
entities (entity ticking); fly fast into ungenerated terrain (chunk generation
spikes); build a hopper chain or a redstone clock (per-tick work with nobody
present); set the heap far too small, then far too large (collection thrash, then long
pauses); saturate the upload (latency with the server's own numbers untouched).

The load generator is built, not supplied: a mineflayer bot flying in a straight line
is the chunk-generation experiment, and a datapack loop is the entity one. Both skills
already exist by this point in the minecraft-server module, and spending them here is
most of why this lesson works.

### Part 5 — Changing things

| Lesson | Goal | Status |
|---|---|---|
| `changes-that-help` | View and simulation distance, heap sizing, the four Fabric optimisation mods one at a time, pregeneration with Chunky, and fixing what the world actually contains — each arrived at by measurement; garbage collector flags as a closing section, framed as last resort | core + guided written |

The lesson's spine is the refusal: every setting is measured into place, never pasted.
The garbage collector section must be positioned as twelfth on a list of twelve, and
must say plainly that most people reach for it far too early.

### Part 6 — Over time

| Lesson | Goal | Status |
|---|---|---|
| `knowing-before-they-tell-you` | Recording tick rate over time; a graph of a day; the server announcing its own trouble where people will see it | core + guided written |

Reuses the Python and RCON work and the Discord bridge from the minecraft-server
module. Payoff other people can see, which is what closes the module: the complaint
that started it — "seems laggy, not sure why" — arrives as a message from the server
itself, before anybody has to say it.

---

## Cross-cutting decisions

- **Both machines, always.** Every measuring lesson takes its numbers on the learner's
  own computer and on the machine the server runs on for other people. The payload is
  that a benchmark describes a whole system: same world, same settings, different
  processor, different contention, different disk, different answer. This is also why
  the local machine is not treated as a lesser practice environment — it is where the
  contention cause (number 2 on the ordered list) is easiest to see, because a personal
  computer is full of contention and a rented one is not.
- **This is exploration territory by nature.** What is actually slow on a particular
  learner's server is unknown to the authors, permanently. Per the exploration-lessons
  section of `PRINCIPLES.md`: set the finding-out method up honestly, and treat hitting
  a real constraint as a successful outcome to be understood and logged.
- **Volatile by nature.** Tool names, commands, and recommended settings in this
  subject change faster than most. spark is current and Paper's `/timings` is gone
  [volatile as of 2026-09]. Cores record specifics with as-of dates; deliveries point
  at the tool's own documentation.
- **Prerequisites live in another module.** Every lesson here needs a Minecraft server,
  and several need the Fabric server, the bot skills, or the rented Linux machine —
  all established in `modules/minecraft-server/`. Cross-module prerequisites are
  ordinary in this lab (the minecraft-server module already depends on
  `modules/dev-machine/`), but each lesson must name its conditions as world-states
  with links, never as "do that module first."
- **Entity limits and activation ranges are Paper features and do not exist here.**
  Confirmed while writing `changes-that-help`. On Fabric the entity cause is fixed by
  finding the farm, not by tuning a value — and the wider point (most optimisation advice
  online assumes Paper and names files a Fabric server does not have) is a first-class
  teaching goal in that lesson rather than a footnote.
- **No lesson may end with a settings recommendation the learner didn't measure.**
  Stated twice on purpose: it is the constraint most likely to erode under the pressure
  of wanting a lesson to be useful.
