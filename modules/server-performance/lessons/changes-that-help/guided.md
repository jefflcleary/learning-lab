# Changes that help, and proving they did

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

You know what your server's problem is. That puts you in a very small minority, and it
changes the question completely. It's no longer "what should I change" — it's "which of
these targets the thing I actually have".

This session makes your server measurably faster, and leaves you able to say by how much
and because of what.

It will not give you a list of settings to paste in. That's deliberate, and it's most of
the value here. The internet is full of optimisation lists; they're mostly written for
different server software than yours; and applying one produces a server that's different
in ways nobody can account for, including you, six months from now, when something else
goes wrong and you're trying to work out what's unusual about this machine.

Instead, every change gets measured into place using the protocol you've now run seven
times. Some of them will do nothing on your server, and you'll take those back out.
That's not a wasted afternoon — a change that does nothing is a change you have to
maintain and explain forever.

One warning worth having up front: a lot of the advice you'll find assumes a kind of
server you don't have, and will tell you to edit files that don't exist on yours. That's
in here as a thing to learn rather than a thing to avoid.

---

## Before you start

You need:

- **A signature table built by causing problems on purpose.**
  [Making the server slow on purpose](../making-it-slow-on-purpose/guided.md) covers it.
  This session is the other half of that one — same protocol, pointed at fixes.
- **A profiler, and the ability to attribute tick time.**
  [Profiling the server with spark](../profiling-with-spark/guided.md) covers it.
- **A Fabric server you can add mods to.**
  [Running a modded server with Fabric](../../../minecraft-server/lessons/fabric-modded-server/guided.md)
  covers it.
- **A backup you've restored from.**
  [Copying and backing up worlds](../../../minecraft-server/lessons/worlds-and-backups/guided.md)
  covers it. One step in here writes a great deal to your world.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This session has you evaluate other people's advice — [Finding the real documentation](../../../../reference/finding-the-docs.md) is the companion for that.

---

## What you'll have at the end

By the end of this session you will have:

- A server that is faster by an amount you can state, for reasons you can name
- A record of every change you tried, including the ones you removed because they did
  nothing on your server — which is the more useful half of that record
- Terrain generated in advance, and proof it worked, by re-running the experiment that
  used to cause spikes
- At least one problem fixed by changing the world rather than a setting
- The habit of asking what kind of server a piece of advice assumes, before following it

---

## New tools

**Optimisation mods** for Fabric. Four of them, and each does something specific — which
is the point, because "install these four" is exactly the cargo-culting this session
exists to prevent.

- **[Lithium](https://modrinth.com/mod/lithium)** optimises the game's own logic without
  changing how anything behaves. The broadest win, and usually the first thing to try.
- **[FerriteCore](https://modrinth.com/mod/ferrite-core)** reduces memory use,
  substantially in some worlds. Helps most when memory is your constraint — which you
  can now check rather than assume.
- **[Krypton](https://modrinth.com/mod/krypton)** optimises networking and entity
  tracking. Helps most where bandwidth or large numbers of entities are involved.
- **[C2ME](https://modrinth.com/mod/c2me-fabric)** speeds up chunk generation, loading,
  and saving by spreading them across several cores. This is the one place where extra
  cores genuinely help.

Notice that each targets a different one of the problems you caused deliberately last
session. Which one helps *you* depends on which problem your server actually has, and
you're currently the only person who knows that.

All four are ordinary Fabric mods: download the build matching your server's Minecraft
version, drop the jar in the server's `mods` folder, restart. Same procedure and the same
version-matching rule as any mod you've installed before. Each page above carries its own
version requirements and notes.

**[Chunky](https://modrinth.com/mod/chunky)** generates terrain in advance, in bulk,
while nobody is playing — so the expensive work of creating land has already happened
before somebody walks into it. It removes the exploration signature entirely.

It's also a Fabric mod, installed exactly like the four above. Unlike them it isn't
something you leave running quietly in the background: you install it, tell it what area
to generate, start it, and it works through that area while you wait. Its commands are
typed into the server console or chat, and they're listed on its page — read them there
rather than guessing, because there are more of them than you'd expect and a couple are
worth knowing (pausing it, and checking how far along it is).

It costs three things worth knowing before you start it: a long time, a hard-working
machine while it runs, and a considerably larger world folder on disk.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Based on your signature table, which of your server's problems is the real one? Which
  change would you expect to help most? Commit before you measure anything.
- One of those four mods targets a problem your server probably doesn't have. Which one,
  and why do you think so?
- Somebody hands you a list of twelve settings that made their server faster. What would
  you want to know about their server before trying any of them?
- If a change makes no measurable difference, what should you do with it?

---

## The work

Every change here runs the protocol from last session — predict, baseline, one change,
measure, attribute, undo if it didn't help, re-measure. It isn't repeated below. You've
run it seven times.

The order matters, and it's worth being explicit about what decides it, because it isn't
"software before hardware."

For each thing you could change, ask three questions:

- **How likely is it to be the actual cause**, given what you measured?
- **What does it cost** — in money, in your time, and in what somebody has to give up?
- **How reversible is it** if it doesn't help?

Cheap, likely, and reversible go first. That's the whole framework, and the important
word is *cost*, because it includes money and it includes your evening.

This matters more than it sounds. It's tempting to treat spending money as a defeat and
tuning as the virtuous option — but if your machine has 1 GB of memory, no amount of
tuning will turn it into an adequate machine, and an evening spent trying is worth
considerably more than the few dollars a month that would have fixed it outright. Buying
capacity isn't giving up. Sometimes it's the cheapest thing on the list, and refusing to
consider it is just a more expensive way to have the same problem.

The counterweight matters equally: more machine won't help if the bottleneck is one core
running the tick in order, because single-core speed is the thing you mostly *can't* buy
more of. It won't help if the cause is a hopper clock or a mob farm, which will happily
scale up alongside the machine. And it turns a one-off problem into a bill that arrives
every month forever.

Which is why the next step comes first.

### Name your constraint first

Before changing anything, write one sentence: what is actually slow about this server,
and what causes it? Use your signature table and a profile.

Everything below gets chosen against that sentence. If you can't write it yet, go back
and profile during the problem — the rest of this session will otherwise be guessing with
extra steps.

### Is this machine plausibly big enough?

Before you spend an evening tuning, spend a minute on this: look at what the machine
actually has — memory, cores, disk — against what you're asking of it, and ask whether
those numbers are in the same neighbourhood.

You're not looking for precision. You're looking for the obvious case. A machine with
1 GB of memory running a world for six people is not a tuning problem; it's an
undersized machine, and everything below this line will recover a few milliseconds
from something that needs a few hundred. If that's where you are, resize it and come
back — that's the cheapest fix available to you, and it's cheap in the way that counts:
ten minutes and a small monthly difference, instead of an evening and no result.

If the machine is *plausibly* adequate — the specs are in the right range for the number
of people who play — then carry on down the list. Tuning is genuinely where the wins are
in that case, and you'd be paying monthly for something a free change would have fixed.

Write down which of those two you're in and why. It's the fork the rest of this session
hangs on.

### Distance

Lower `simulation-distance` first. It costs tick time, which is usually the constrained
resource, and lowering it leaves players seeing exactly as far as before — the world is
simply only *alive* closer in. Measure. Keep or revert.

Then view distance, separately. Measure. Keep or revert.

The success criterion here isn't "faster". It's **faster by a known amount, at a known
cost in what players can see** — because this change has a visible price, and whether
it's worth paying is a decision rather than a calculation.

### Heap

Check `-Xmx` against the machine's total memory. Then try setting `-Xms` to the same
value as `-Xmx`, so the runtime doesn't spend time growing and shrinking the heap.

Measure it rather than adopting it on faith. And watch for the case where a change makes
one thing better and another worse — a bigger heap can mean fewer collections *and*
longer individual pauses, which is a real trade rather than an improvement.

### Optimisation mods, one at a time

Install one. Measure. Record. Then the next.

You will want to install all four at once. That temptation is the entire exercise —
installing them together tells you your server got faster and nothing else, and you'd
carry all four forever without knowing which one earned its place.

Expect at least one to do nothing measurable.

<details>
<summary>One of them did nothing at all</summary>

Which cause does that mod target? Now check your signature table: does your server
actually have that problem?

A mod that fixes something you don't have is working perfectly. Remove it, and write down
that it did nothing *here* — that sentence is worth more than keeping it would be.

</details>

### Fix what's actually in the world

Your profile named something: a farm, a hopper chain, three thousand items on a floor.
Some problems aren't settings. Go and change the world.

Be ready for this to be a conversation rather than a command. Somebody built that farm,
and they were pleased with it. Running a server for other people is partly technical and
partly social, and a profiler pointing at somebody's build is the beginning of a
discussion, not the end of a diagnosis. Sometimes the right answer is a smaller farm;
sometimes it's a faster machine; sometimes it's that the farm matters more to everyone
than two milliseconds do.

### Pregenerate

Back up first. Check you have the disk space — this makes the world folder much bigger,
and running out part-way through is a bad afternoon.

Install Chunky the way you installed the others: the jar matching your Minecraft version,
into the `mods` folder, restart the server.

Then open its documentation and find the commands. You want to set the area to generate —
a radius, in blocks, centred on your world's spawn — and then start it. Pick a radius
deliberately rather than the largest number you can think of: everything inside it gets
generated and stored, so this is the setting that decides how much bigger your world
folder gets.

Start it, and let it finish. It will take a while, and it will tell you how far along it
is if you ask.

Now the clearest before-and-after in this whole module: re-run the exploration experiment
from last session. Send the bot flying out into that radius and watch the tick
distribution.

The spikes you caused deliberately are gone, and you removed them on purpose, and you
proved it by causing the problem again.

### The one with the worst odds

Garbage collector flags. Now, and not before — though not because they're exotic or
because reaching for them is somehow cheating. It's the expected value: high effort, low
hit rate, and only diagnosable with evidence most people don't have.

Most people reach for it first, spend an evening reading about collectors, apply a set of
flags somebody recommended, and change nothing measurable — because they never
established that collection was their problem to begin with.

The precondition is evidence, not suspicion: actual pauses visible in `/spark gc` or in
your tick distribution. If you don't have that, skip this step entirely and write down
that you skipped it and why.

If you do have it, there are widely circulated flag sets. Try one. Measure it. Treat the
result as data about *your* server and nobody else's.

A perfectly good outcome here — and a common one — is: no measurable difference, flags
removed, one line in the logbook. That's a result.

### The considered purchase

You've tuned. If the server is still short of what you need, the question is no longer
whether to spend money — it's whether *this* gap is worth a recurring charge. And now you
can answer it, because you know which resource is the limit.

Match the measurement to the purchase, and notice that they don't all behave the same
way:

- **Memory saturated, or the machine swapping** → more memory. Usually cheap, and the
  improvement is close to proportional.
- **Disk full, or slow, or the save hitch you found** → more or faster disk. Also usually
  cheap.
- **One core pinned while the others sit idle** → a faster core. **This is the one you
  often can't buy.** Single-thread speed varies far less between machines than memory or
  disk does, so the jump from a small plan to a large one might double your memory and
  barely move the number that's actually hurting you.
- **Upload saturated** → more bandwidth, which may mean a different plan or a different
  provider entirely.

That asymmetry is the reason the whole module spent a session on "which resource is
saturated?" before arriving here. Memory and disk you can buy. Single-core speed mostly
you can't. Get that wrong and you'll pay every month for a machine that isn't any faster
at the thing you cared about.

**Do the arithmetic once, with real numbers.** Look up what the next rung up your
provider's plan costs, subtract what you pay now, and multiply by twelve. Now compare
that to an evening of your time. For most family-scale servers the answer surprises
people, and it's worth having the actual figure rather than a feeling about it.

One thing that makes this easier than it used to be: on a rented machine an upgrade is a
**resize**, not a purchase. A plan change, a reboot, a higher bill — and reversible next
month if it didn't help. You're renting, so you get to be wrong cheaply. Your provider's
documentation covers how theirs works and whether it happens in place.

And the cases where more machine won't help at all, which you should be able to name
before you buy: a tick that has to run in order on one core; a cause that scales with the
machine, like a farm or a redstone clock; and the problem not being the server in the
first place — which is still item one on the list, and still the most common answer.

### Write the record

Every change you tried, what it did, and whether you kept it.

The kept list is your server's configuration. **The discarded list is the more valuable
one**, because it's what stops you retrying the same things every time something feels
slow — including in a year, when you've forgotten you already tested them.

---

## Break it on purpose

**Follow an optimisation guide wholesale.** Go and find one of the many lists online.
Apply as much of it as you can, all at once, without measuring in between. Then measure.

Two things will have happened.

Some of it referred to files your server doesn't have. Guides are overwhelmingly written
for Paper, a different server software, and refer to settings — entity activation ranges,
per-type entity limits, files like `spigot.yml` — that simply don't exist on a Fabric
server. If you went looking for those files and concluded something was wrong with your
setup, that's the trap, and you've now walked into it deliberately and cheaply.

And whatever the result was, you can't attribute any of it. Faster, slower, or unchanged
— you have no idea which part did what, or whether two changes cancelled out.

Revert all of it. Re-measure your baseline. Then reintroduce only what you can justify.

The lasting version of this isn't about Paper. **Almost all technical advice assumes a
context its author never thought to state.** "Does this apply to what I actually have?"
is the question that separates following instructions from understanding a system, and
it's worth asking of every guide, every answer, and every flag set anybody hands you —
including this one.

**Keep a change that did nothing.** Deliberately keep one measured non-improvement, and
write it into your configuration record as though it helped.

Then leave it, and read the Go further questions, and think about what that line will
cost the next person who has to work out why it's there. That person is probably you, in
six months, at the worst possible moment.

Then take it out and annotate the record honestly.

---

## What just happened

You made a server faster, and you can say by how much and because of what. That second
part is much rarer than it should be.

The usual version goes like this: somebody's server feels slow, they find a list, they
apply all of it, and afterwards it feels better. They now have a faster server and no
knowledge. They can't say which change did it, whether some changes made things worse
while others compensated, or what to do when it happens again — and they'll apply the
same list next time, including the parts that never did anything.

What made the difference here wasn't any particular setting. It was knowing what your
server's problem was *before* you started, which turned the job from trying everything
into choosing between targeted fixes. Each of those mods addresses a different one of the
causes you produced deliberately last session, which is why the right answer for your
server is one nobody on the internet could have given you. Nobody else measured it.

The changes that did nothing deserve their own paragraph. Removing them feels wasteful
and isn't. Every setting you keep is something that has to be understood forever — by
you, when something else breaks and you're trying to work out what's unusual here, and by
whoever inherits this server. Configuration that nobody can justify is a debt, and it
gets paid at the worst possible moment. "I tried it, I measured it, it did nothing here"
is one of the most valuable sentences you can write down about a system.

And some of what you fixed wasn't a setting at all. Somebody's farm, a hopper chain
nobody needed any more, a floor covered in dropped items. That part of this work is
social, and any material that pretended every problem has a technical solution would be
lying to you about what running a server for other people is actually like.

---

## Go further

- Look at the changes you discarded. Is there one you'd expect to help if your server
  grew — more players, a bigger world, more mods? What would have to change for it to be
  worth revisiting?
- You pregenerated out to a radius. What happens at the edge of it? Predict first, then
  send your bot out past the boundary and measure.
- One of those four mods helped most. Read its documentation properly and find out what
  it actually changed. Does that explanation match the signature you measured, or did you
  get the right answer for the wrong reason?
- Genuinely open: your server is faster now. How long will that stay true? What would you
  have to watch to know when it stops — and would you notice it yourself, or would
  somebody have to tell you? That question is the next session.

---

## What you have now

- A server measurably faster than it was, with the amount and the reason written down
- A record of every change tried, kept or discarded, with the discarded list annotated
- Terrain generated in advance, and proof it worked, by re-causing the problem it solved
- At least one thing fixed by changing the world instead of a setting
- The knowledge that most optimisation advice online assumes different server software,
  and the habit of checking before following it
- A garbage collector section you either skipped with a reason, or tried and measured —
  either of which is a better outcome than most people manage
