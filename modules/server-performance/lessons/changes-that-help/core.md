# Changes that help, and proving they did

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** changes-that-help
- **Part:** Part 5 — Changing things
- **Scaffolding:** level 3. Every instrument and the protocol are established; this
  lesson states goals and success criteria and gets out of the way. The exceptions are
  the two places where a genuinely new fact is needed — what each optimisation mod does,
  and how pregeneration works — which are orientation and given plainly.
- **Deliveries:** guided only.
- **Status:** ready

## Goal and payoff

The learner makes their server measurably faster, and can say by how much and because of
what.

The lesson's spine is a refusal. It does not hand over a list of settings. Every change
is measured into place using the protocol from the previous lesson, and changes that
turn out to do nothing on this particular server are recorded as findings rather than
quietly kept. That refusal is most of the module's value: the internet is full of
optimisation lists, they are mostly written for different server software, and pasting
one produces a server that is different in ways nobody can account for.

Payoff people can see: the server is faster, and the learner can show the before and
after. Also, frequently, a social payoff rather than a technical one — several real
causes are fixed by talking to somebody about the farm they built rather than by
changing a setting, and a lesson that pretended otherwise would be lying.

The Paper trap is a first-class teaching goal here, not an aside. Most performance
advice online assumes Paper, and several of its most-cited knobs do not exist on a
Fabric server. Learning to ask "does this advice even apply to my server?" before trying
to follow it is a skill that outlasts every specific setting in this lesson.

## Prerequisites

- A signature table built from causing problems deliberately — established by
  `modules/server-performance/lessons/making-it-slow-on-purpose/`. This lesson is the
  other half of that one: the same protocol, pointed at fixes.
- A profiler, and the ability to attribute tick time — established by
  `modules/server-performance/lessons/profiling-with-spark/`
- A Fabric server the learner can add mods to — established by
  `modules/minecraft-server/lessons/fabric-modded-server/`
- A backup restored from at least once — established by
  `modules/minecraft-server/lessons/worlds-and-backups/`. Pregeneration writes a great
  deal to the world.

## Establishes

- A server that is measurably faster than it was, with a written record of which changes
  produced how much — cited as: "the learner has tuned a server by measurement —
  established by `modules/server-performance/lessons/changes-that-help/`."
- The judgement to check whether advice applies to their server software before
  following it.
- Vocabulary: pregeneration, optimisation mod, tuning, regression.

## Facts

### Where commands run

- **On the machine running your server** — `server.properties`, heap settings, mod
  files, restarts.
- **In Minecraft's chat box** — spark measurements, Chunky's commands.

### The order of changes, and why it is this order

Cheapest and most reversible first; anything that rewrites the world last.

1. **Simulation distance**, then **view distance**. Free, instant, reversible, and the
   biggest single lever. Lower simulation distance first: it costs tick time, which is
   usually the constrained resource, and lowering it leaves players seeing just as far.
   The world is simply only alive closer in.
2. **Heap sizing.** Free and reversible. `-Xmx` meaningfully below the machine's total
   memory. Setting `-Xms` equal to `-Xmx` is the common recommendation, so the runtime
   does not spend time growing and shrinking the heap — worth trying and measuring
   rather than adopting on faith.
3. **Optimisation mods**, one at a time, measured between each. Free, reversible by
   deleting a file.
4. **Fixing what the world actually contains** — the farm, the hopper chain, the
   thousands of items on the floor. Not reversible in the same way, and often social
   rather than technical.
5. **Pregeneration.** Slow, writes a lot to disk, grows the world's size on disk
   considerably. Do it once, with a backup, when the rest is settled.
6. **Garbage collector flags.** Last, and only with evidence.

### Fabric optimisation mods

Each does something specific; deliveries name what, because "install these four" is
exactly the cargo-culting this lesson exists to prevent. All are server-side and
compatible with each other. [volatile as of 2026-09 — deliveries point at each mod's own
page for current versions and claims]

- **Lithium** (https://modrinth.com/mod/lithium) — general optimisation of the game's own
  logic, explicitly without changing behaviour. The broadest win and the usual first
  thing to try.
- **FerriteCore** (https://modrinth.com/mod/ferrite-core) — reduces memory use,
  substantially in some worlds. Helps most where memory is the constraint, which the
  learner can now check rather than assume.
- **Krypton** (https://modrinth.com/mod/krypton) — optimises the networking stack and the
  entity tracker. Helps most where bandwidth or many entities are involved.
- **C2ME** (https://modrinth.com/mod/c2me-fabric) — chunk generation, loading, and
  saving, spread across multiple cores. Helps most with the exploration signature from
  the previous lesson, and is the one case where extra cores genuinely help.

All five are installed as ordinary Fabric mods and deliveries must say so rather than
implying it: jar matching the server's Minecraft version into `mods`, restart. Every URL
above is linked in deliveries, not merely named.

The point deliveries must make: each of these targets a *different* one of the causes
the learner has already caused deliberately. Which of them helps depends on which
problem this server actually has, and the learner is now the only person who knows that.

### Chunky, and pregeneration

- **Chunky** (https://modrinth.com/mod/chunky) is a Fabric mod that generates terrain in
  advance, in bulk, while nobody is playing — so that the expensive work of creating land
  has already happened before a player walks into it. [volatile as of 2026-09]
- **Chunky needs full orientation and an earlier draft did not give it any.** It was
  named in New tools and then the work said "run Chunky for a radius you choose", with no
  statement that it is a mod, no installation, and no commands. That is the central rule
  violated outright. Deliveries must say: it is an ordinary Fabric mod installed like any
  other (jar matching the Minecraft version into `mods`, restart); it is run rather than
  left running; its commands are typed at the console or in chat; and the command list is
  on its own page, which is linked rather than alluded to. The radius is a deliberate
  decision because it determines how much larger the world folder becomes.
- It directly removes the exploration signature: spiky tick times with a healthy
  average.
- Costs: it takes a long time, it works the machine hard while it runs, and it makes the
  world folder much larger on disk. Deliveries must state all three, and must require a
  backup and a check of free disk space first.
- It is run once for a chosen radius, not left on.

### The Paper trap

- A great deal of optimisation advice online is written for Paper, and refers to files
  (`spigot.yml`, `paper-world-defaults.yml`) and settings (entity activation ranges,
  entity limits per type, mob spawn tuning) that **do not exist on a Fabric server**.
- A learner following such a guide will look for files that are not there and conclude
  something is wrong with their setup. Naming this in advance saves that hour.
- The transferable skill, and the reason this is a teaching goal rather than a footnote:
  before following any performance advice, establish what server software it assumes.
  The same reasoning applies to Minecraft version, to modded versus vanilla, and to
  every technical guide the learner will ever read.

### Changes that do nothing

- On any given server most recommended changes will produce no measurable improvement,
  because they target a constraint that server does not have.
- A change that does nothing is not neutral: it is a change that must be maintained,
  understood, and accounted for the next time something goes wrong. The correct response
  to a measured non-improvement is to **undo it and write down that it did nothing
  here**.
- This is the hardest instruction in the lesson to follow, because a change that
  plausibly should help feels like it is helping.

### Regression

- Some changes make things worse, and some make one thing better and another worse — a
  larger heap reducing collection frequency while lengthening each pause is the standard
  example. The protocol catches this; guessing does not.

## Arc

### Orientation — given plainly

The ordered list of changes and why it is ordered that way; what each optimisation mod
actually does; what pregeneration is and what it costs; the Paper trap in full; and the
rule about changes that do nothing. None of this is withheld — these are facts a learner
cannot derive and the lesson is not about discovering them.

Framing sentence: you now know what your server's problem is, which puts you in a very
small minority, and it means the question is no longer "what should I change" but "which
of these targets the thing I actually have".

### Predictions to elicit

- Based on your signature table, which of your server's problems is the real one? Which
  change would you expect to help most? Commit before measuring.
- One of the four optimisation mods targets a problem your server probably doesn't have.
  Which one, and why do you think so?
- Somebody hands you a list of twelve settings that made their server faster. What would
  you want to know about their server before trying any of them?
- If a change makes no measurable difference, what should you do with it?

### The work — goals and hint ladders

Each change runs the protocol from the previous lesson. Deliveries do not restate it.

**1. Find your constraint.** Before changing anything, use the signature table and the
profiler to name the specific problem this server has. Write it down. Everything else is
chosen against this sentence.

**2. Distance.** Lower simulation distance, measure, keep or revert. Then view distance,
measure, keep or revert. The success criterion is not "faster" — it is "faster by a known
amount, at a known cost in what players can see", because this change has a visible price
and the learner has to decide whether it is worth paying.

**3. Heap.** Check `-Xmx` against machine memory. Try setting `-Xms` equal to it, and
measure rather than assuming. Watch for the regression case: fewer collections, longer
pauses.

**4. Optimisation mods, one at a time.** Install one, measure, record, then the next. The
temptation to install all four at once is the whole point of the exercise, and deliveries
should name that temptation out loud.

- Expect at least one to do nothing measurable. Record it and remove it.
- Rung 1 (if nothing seems to change): which cause does this mod target, and does your
  signature table say your server has that problem? A mod that fixes something you don't
  have is working perfectly.

**5. Fix what is actually in the world.** The profile names a farm, a hopper chain, a
pile of items. Go and change the world rather than a setting.

Deliveries must be honest that this is frequently a conversation rather than a command —
somebody built that farm, and the fix involves talking to them. That is a real part of
running a server for other people, and pretending every problem has a technical solution
would be a lie the module cannot afford.

**6. Pregenerate.** Backup first, check disk space, run Chunky for a chosen radius, then
re-run the exploration experiment from the previous lesson and compare. This is the
clearest before-and-after in the module: a problem the learner caused, deliberately
removed, and proved gone by causing it again.

**7. The last resort.** Garbage collector flags, and only now.

- The honest framing, which deliveries must keep: this is twelfth on a list of twelve.
  Most people reach for it first, spend an evening, and change nothing measurable,
  because they never established that collection was their problem in the first place.
- The precondition is evidence: pauses visible in `/spark gc` or in the tick
  distribution, not a suspicion.
- Widely circulated flag sets exist. Try one, measure it, and treat the result as data
  about *this* server. Deliveries must not reproduce a flag set as a recommendation.
- A plausible outcome, which deliveries must permit rather than treat as failure: no
  measurable difference, flags removed, one line in the logbook.

**8. Write the record.** Every change tried, what it did, and whether it was kept. The
kept list is the server's configuration; the discarded list is more valuable, because it
is what stops the same changes being retried every time something feels slow.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Follow an optimisation guide wholesale.** Find one of the many lists online, and
  apply as much of it as you can in one go, without measuring in between. Then measure.
  Two things will have happened: some of it referred to files your server does not have,
  and whatever the result is, you cannot attribute any of it. Then revert everything and
  reintroduce only what you can justify. Teaches the module's central discipline by
  violating it, and teaches the Paper trap by walking into it. Undo: revert all of it and
  re-measure the baseline.
- **Keep a change that did nothing.** Deliberately keep one measured non-improvement,
  and write it in the configuration record as if it helped. Come back to it in the Go
  further questions and consider what it will cost the next person — possibly you in six
  months — to work out why it is there. Teaches that unexplained configuration is a debt.
  Undo: remove it and annotate the record honestly.

### What just happened — the explanation

You made a server faster, and — much more unusually — you can say by how much, and
because of what.

That second part is rarer than it should be. The normal way this goes is that somebody
feels their server is slow, finds a list, applies all of it, and the server feels better
afterwards. They now have a faster server and no knowledge: they cannot say which change
did it, whether some of the changes made things worse while others compensated, or what
to do when it happens again. And they will apply the same list next time, including the
parts that never did anything.

What made the difference here was not any single setting. It was that you knew what your
server's problem was before you started changing things, which meant you were choosing
between targeted fixes rather than trying everything. Each of the mods you tried targets
a different one of the causes you produced deliberately last session — which is why the
right answer for your server is one that nobody on the internet could have given you,
because nobody else measured it.

The changes that did nothing deserve their own note. Undoing them feels wasteful and
isn't. Every setting you keep is a thing that must be understood forever — by you, when
something else goes wrong and you are trying to work out what is unusual about this
server; and by whoever inherits it. Configuration nobody can justify is a debt that gets
paid at the worst possible moment. "I tried it and measured it and it did nothing here"
is one of the most valuable sentences you can write down.

And then there is the Paper trap, which is not really about Paper. Most technical advice
you will ever read assumes a context its author did not think to state. The question
"does this apply to what I actually have?" is the one that separates following
instructions from understanding a system, and it is worth asking about every guide, every
answer, and every set of flags anybody hands you — including this one.

Finally: some of what you fixed was not a setting at all. A farm somebody built, a hopper
chain nobody needed any more, three thousand items on a floor. Running a server for other
people is partly a technical activity and partly a social one, and the profiler pointing
at somebody's build is the beginning of a conversation rather than the end of a
diagnosis.

### Go further — open questions

- Look at the list of changes you discarded. Is there one you'd expect to help if your
  server grew — more players, a bigger world? What would have to change for it to become
  worth revisiting?
- You pregenerated a radius. What happens at the edge of it? Predict, then have your bot
  fly out past the boundary and measure.
- One of the four mods helped most. Read its documentation and find out what it actually
  changed. Does that explanation match the signature you measured?
- Genuinely open: your server is faster now. How long will that last? What would you have
  to watch to know when it stops being true — and would you notice, or would somebody
  have to tell you? That question is the next session.

## Delivery notes

- **guided:** level 3. The protocol is not restated; the learner has run it seven times.
- **Never print a settings list, a flag set, or a "recommended values" block.** This is
  the constraint the whole lesson exists to enforce and the one most likely to erode
  under the pull of being helpful. Name what each thing does and make the learner measure
  their way to a value.
- The garbage collector section must stay positioned as twelfth of twelve and must
  explicitly permit "no measurable difference, removed" as a correct and common outcome.
- The Paper trap is a teaching goal with its own place in the work, not a warning box.
- Step 5 must keep its honesty about the social half. Do not sand it into a purely
  technical instruction.
- Chunky requires a backup and a disk-space check before it runs, stated every time.
- The final Go further question deliberately sets up the next lesson; keep it.
- No reference delivery.
