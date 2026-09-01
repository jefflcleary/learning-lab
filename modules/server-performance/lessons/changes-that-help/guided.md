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

- **Lithium** optimises the game's own logic without changing how anything behaves. The
  broadest win, and usually the first thing to try.
- **FerriteCore** reduces memory use, substantially in some worlds. Helps most when
  memory is your constraint — which you can now check rather than assume.
- **Krypton** optimises networking and entity tracking. Helps most where bandwidth or
  large numbers of entities are involved.
- **C2ME** speeds up chunk generation, loading, and saving by spreading them across
  several cores. This is the one place where extra cores genuinely help.

Notice that each targets a different one of the problems you caused deliberately last
session. Which one helps *you* depends on which problem your server actually has, and
you're currently the only person who knows that.

Each has its own page with installation instructions and version requirements — the same
version-matching rule as any Fabric mod.

**Chunky** generates terrain in advance, in bulk, while nobody is playing, so the
expensive work of creating land has already happened before somebody walks into it. It
removes the exploration signature entirely. It costs time, works the machine hard while
it runs, and makes your world folder considerably larger on disk. Its own documentation
covers its commands.

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

The order matters: cheapest and most reversible first, anything that rewrites the world
last.

### Name your constraint first

Before changing anything, write one sentence: what is actually slow about this server,
and what causes it? Use your signature table and a profile.

Everything below gets chosen against that sentence. If you can't write it yet, go back
and profile during the problem — the rest of this session will otherwise be guessing with
extra steps.

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

Back up first. Check you have the disk space — this makes the world folder much bigger.

Then run Chunky for a radius you choose, and let it finish.

Now the clearest before-and-after in this whole module: re-run the exploration experiment
from last session. Send the bot flying out into that radius and watch the tick
distribution.

The spikes you caused deliberately are gone, and you removed them on purpose, and you
proved it by causing the problem again.

### The last resort

Garbage collector flags. Now, and not before.

This is twelfth on a list of twelve. Most people reach for it first, spend an evening
reading about collectors, apply a set of flags somebody recommended, and change nothing
measurable — because they never established that collection was their problem to begin
with.

The precondition is evidence, not suspicion: actual pauses visible in `/spark gc` or in
your tick distribution. If you don't have that, skip this step entirely and write down
that you skipped it and why.

If you do have it, there are widely circulated flag sets. Try one. Measure it. Treat the
result as data about *your* server and nobody else's.

A perfectly good outcome here — and a common one — is: no measurable difference, flags
removed, one line in the logbook. That's a result.

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
