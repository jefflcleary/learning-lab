# What a computer is doing while it's busy

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

A computer has exactly four things it can run out of: processor, memory, disk, and
network. Whenever anything is slow — a server, a website, a video export, a phone — one
of those four has run out and the other three are sitting there doing nothing much.

The name for the one that ran out is the **bottleneck**, and the word earns its place
because of what it implies. Improving any of the other three changes nothing at all.
More memory does not help a machine that has run out of processor. That is the single
most common way people spend money and an evening on a slow server and end up exactly
where they started.

In this session you'll learn to see all four, on your own computer and on the machine
your server runs on for other people. Then you'll cause a bottleneck deliberately: with
a program that has never heard of Minecraft, you'll take the processor away from your
server, watch the world go into slow motion, and give it back.

That last part matters more than it sounds. It's the second item on the list of things
to check when a server is slow, and by the end of this session it won't be something
you read — it'll be something you did.

---

## Before you start

You need:

- **A Minecraft server you can start, stop, and join.**
  [Running your own server](../../../minecraft-server/lessons/running-your-own-server/guided.md)
  covers it.
- **Being able to read the server's tick rate.**
  [Three different things called lag](../three-kinds-of-slow/guided.md) covers it.
  Quick check: you can say what the server's tick rate is right now, and where you'd
  look to find out.
- **For the second half only: a Linux machine you can log into that runs your server
  for other people.**
  [Keeping it running](../../../remote-server/lessons/keeping-it-running/guided.md)
  gets you one. The first half works entirely on your own computer, so if you don't
  have a second machine yet you can do everything here except the comparison.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. Its layer-finding step is the one that pays here, because this whole session is about deciding which layer to look at.

---

## What you'll have at the end

By the end of this session you will have:

- Read all four resources on your own machine and on the machine your server runs on
- Worked out, by experiment rather than by being told, whether your tools report "100%"
  as one core or as the whole machine
- Seen the same server, with the same world and the same settings, produce different
  numbers on two different machines
- Deliberately starved your server of processor time with a program unrelated to
  Minecraft, watched the world crawl, and stopped it again
- A second baseline in your logbook: four numbers for each machine, while everything
  is healthy

---

## New tools

**Activity Monitor** is already on your Mac, in Applications under Utilities. It has
tabs for CPU, Memory, Disk, and Network — the same four things this session is about,
in a window.

**`top`** is the terminal version, and it ships with macOS and with Ubuntu both.
Confusingly, those two versions have different flags and different columns, which is
worth knowing now because it's the first time in this module the same command behaves
differently on two machines. `man top` on each machine is the authority for that
machine. `q` quits.

**`htop`** is `top` with colour, a bar per core, and arrow keys that work. It's not
installed by default; installing it is part of the work below.

**`free -h`**, **`df -h`**, and **`uptime`** are three small Linux commands that report
memory, disk space, and how busy the machine has been. All three are already there.
Their manuals are `man free`, `man df`, `man uptime`.

**`yes`** is a tiny program whose entire job is to print the word "yes" forever. Sent
somewhere that discards it, it becomes a perfect load generator: it occupies one core
completely, uses no memory, writes nothing to disk, and stops the instant you press
`Ctrl-C`. You'll use it to take the processor away from your own server on purpose.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Your server is running and people are playing. Of the four — processor, memory, disk,
  network — which do you think is working hardest? Commit to one.
- Your machine has several cores. If Minecraft can only use one of them to run the
  world, what would "the processor is full" look like on a graph showing all of them at
  once?
- If a machine ran out of memory, what would you expect to happen? Now imagine that
  instead of failing outright, it quietly started using the disk as extra memory — what
  would that feel like to play on?
- What do you think this same server looks like on the other machine — better, worse,
  or identical? Why?

---

## The work

One fact before you interpret any number, because it changes how all of them read.

**Minecraft runs the world on a single thread.** Everything in a tick — every mob,
every furnace, every hopper, every crop — happens one after another, in order, on one
core. Some other work does get its own thread, chunk generation and networking among
them, but the world itself does not.

Three consequences worth having in your head:

- A four-core machine sitting at 25% total may be *completely full* as far as your
  server is concerned. One core is pinned and the other three cannot help it.
- Buying more cores does not make a tick finish faster. A faster single core does.
- The headline percentage is therefore the wrong number to look at first. The per-core
  view is the right one.

### Learn what quiet looks like

Stop your server. Open Activity Monitor, and `top` in a terminal, and just read them
with nothing much happening.

<span className="run-where run-where-local">In a terminal on your Mac</span>

```
top
```

Then work out something the tools won't tell you directly: when your tool says 100%,
does it mean one core is full, or the whole machine is?

<details>
<summary>Stuck? Start here</summary>

You have a program whose only job is to fill exactly one core. Start one and watch what
the number does. Then start a second one in another terminal and watch again. The way
the total moves tells you which convention you're reading.

</details>

<details>
<summary>The shape of it</summary>

`yes > /dev/null` occupies one core and prints nothing. `Ctrl-C` stops it. If one copy
takes the figure to 100% and two copies take it to 200%, the tool counts each core
separately. If two copies take it to 50% on a four-core machine, it's reporting the
whole machine.

</details>

### Watch your machine with the server running

Start the server. Join it. Watch all four resources while you do ordinary things — walk
around, break some blocks, let a furnace run.

Then have somebody else join, and watch again. Write down which numbers moved and which
didn't. Both halves are data.

### Do the same on the machine that runs your server

Log into it and install the friendlier tool:

<span className="run-where run-where-remote">On the machine running your server</span>

```
sudo apt update
sudo apt install htop
```

Then take all four readings there: `htop` for the processor and its per-core bars,
`free -h` for memory, `df -h` for disk space, `uptime` for the load average.

Two of those need a word of explanation, because they're easy to misread.

**`free -h` has a column called "available", and that's the one that matters.** A
healthy Linux machine shows almost no "free" memory, because it uses whatever is spare
as a disk cache and hands it back the moment something needs it. Almost-no-free is
normal. Almost-no-available is not.

**`free -h` also shows swap.** Swap is disk space being used as overflow memory, and a
machine that is swapping is reading memory off a disk — slower by a factor of
thousands. On a machine running a game server, any swap use at all is a finding worth
writing down.

Now the comparison this session exists for. You have two sets of four numbers, for the
same world, with the same settings, running the same server software. They are
different.

They're different because the processors are different, the disks are different, and
one of those machines is also running a browser, a chat app, and whatever else you had
open. **A measurement describes a whole system, not a program.** This is why a number
somebody posts about their server tells you almost nothing about yours, and why
everything in this module gets measured on your own machines.

### Take the processor away on purpose

Now cause the bottleneck. Do this on the expendable server, not on a world people are
building in — you are about to make it genuinely unpleasant.

Have the tick rate where you can see it. Then, on the machine running the server:

<span className="run-where run-where-remote">On the machine running your server</span>

```
yes > /dev/null
```

Watch the processor figure. Watch the tick rate. With one loop running you may see very
little, and that's informative — think about why before reading on.

<details>
<summary>Why one loop might not be enough</summary>

One loop occupies one core. If the machine has four, the server can simply be given a
different one. To make the server actually compete for processor time, every core has
to be occupied — so start as many loops as the machine has cores, each in its own SSH
session or backgrounded.

</details>

With every core busy, go and look at the world. Mobs crawl. Furnaces take forever.
Items hang in the air before you pick them up. Your camera, meanwhile, turns perfectly
smoothly — which, from the previous session, tells you exactly where the problem is.

Now stop them all with `Ctrl-C`, and watch it recover.

Sit with what just happened. Nothing was wrong with Minecraft. Nothing was wrong with
your world, your settings, or your mods. A program that has never heard of Minecraft
took the processor, and the symptom was completely indistinguishable from a badly
configured server. That's the second thing to check when somebody says the server is
slow — and it costs one glance at a list of running programs.

### Record the second baseline

Four numbers for each machine, while everything is healthy, with the date and a note of
what was running at the time. Put them in your logbook next to the three from the last
session.

---

## Break it on purpose

**Give the server more memory than the machine has.** Find what `free -h` reports as
total memory, then set the server's `-Xmx` above it and start the server.

Read whichever answer you get. Either it refuses to start and says so plainly, or it
starts and the machine begins swapping and everything turns to treacle. Both are worth
seeing, and which one you get depends on your machine.

What this teaches is that the heap and the machine's memory are two different numbers,
and the first has to be meaningfully smaller than the second — the Java runtime needs
memory beyond the heap, and the operating system needs its own. Put it back to a sane
value and restart.

**Read the wrong percentage on purpose.** Look at the headline processor figure on a
four-core machine showing 25%, and conclude out loud that the processor is fine.

Now open the per-core view. One core pinned, three idle.

You were looking at a true number and drawing a false conclusion from it, which is a
much more dangerous failure than reading a wrong number. Nothing to undo here — the
misreading is the lesson.

---

## What just happened

Four resources, and one of them is always the limit. That isn't a Minecraft fact, it's
what "slow" means for any program on any computer. Something is always waiting: on the
processor, on memory, on a disk, or on a network. Making anything faster begins by
finding out which — and the reason that step gets skipped is that guessing feels
quicker, right up until the new memory arrives and nothing improves.

The single-thread fact is the one to carry furthest. Minecraft runs its world in one
sequence, on one core, fifty milliseconds at a time. That's why a machine that looks a
quarter busy can be completely full, why "more cores" is so rarely the answer, and why
the interesting question about a processor is how fast one of its cores is rather than
how many it has. A lot of software is like this, for the same reason: some work simply
has to happen in order, and no amount of parallel hardware changes that.

The demonstration was the point of the session. An endless loop that knows nothing about
Minecraft made your world crawl, and stopping it fixed everything, and at no moment was
anything wrong with the server. Every server administrator eventually meets a version
of this — a backup running at midnight, a search indexer, someone else's program on a
shared machine — and having caused it once, you'll recognise it.

And your two machines disagreed about the same world. There is no such thing as how
fast this server is. There is only how fast it is on this machine, with these other
things running, on this disk, today.

---

## Go further

- Read the whole of `top` once, every column, with `man top` open next to it. How much
  of what your machine is doing has been visible the entire time?
- Sort by processor use and look at the top ten programs on your own machine. You
  started perhaps two of them. What are the rest, and what would happen if you stopped
  one?
- Your endless loop occupied a core doing nothing. Could you write one that occupies
  memory instead? Or the disk? What would each look like in your tools, and which of
  the four numbers would move?
- Genuinely open: your server's tick rate is fine, every resource on both machines
  looks healthy, and one player still complains constantly. What would you measure
  next? There is no settled answer — and notice that the honest first move might be to
  measure something on *their* machine rather than either of yours.

---

## What you have now

- The ability to read processor, memory, disk, and network on macOS and on Linux, and
  to say which one is the limit
- The word bottleneck, and the reason it matters: fixing the other three changes
  nothing
- The knowledge that Minecraft's world runs on one thread, and what that does to every
  percentage you'll ever read about it
- First-hand experience of an unrelated program making your server crawl, and of
  stopping it
- A second baseline in your logbook — four numbers per machine, healthy, dated
