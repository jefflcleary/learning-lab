# Finding out why a server is slow

Somebody says the server seems laggy. Ask them what they mean and you get a shrug,
because "laggy" is where several completely different problems end up once nobody can
tell them apart. Their own computer struggling to draw the world, the server failing
to keep up with itself, and a slow connection between the two all feel roughly the
same from a chair, and they have nothing in common underneath.

This module is about turning that shrug into a number, a cause, and a change you can
prove worked.

You'll learn what a computer is actually doing when it's busy — which of its
processor, memory, disk, and network is the one running out — and how that shows up in
a Minecraft server specifically. You'll learn the one measurement the whole subject
rests on: a server gets fifty milliseconds to do everything the world needs, twenty
times a second, and when it can't finish in time, that's what people are feeling.

Then you'll learn to find the cause, in the order worth checking things: the cheap and
likely explanations first, a profiler only when those run out, and the exotic answers
that people reach for far too early left where they belong, at the bottom.

The part that makes it stick is that you'll break it yourself. You'll make your own
server slow six different ways on purpose — too much view distance, too many entities,
terrain being generated as somebody explores, a hopper chain running forever, a memory
setting that's wrong in each direction — and each time, work out which one it was from
the measurements alone. It is much easier to recognise a problem you have personally
caused.

Two rules run through everything here. Every experiment happens on a server nobody
depends on, because deliberately making a world slow while people are building in it
is not an experiment. And nothing counts as a fix unless you measured before and after
— which turns out to rule out most of what the internet will tell you to do.

Everything in this module needs a Minecraft server to measure. If you don't have one
yet, the [Running a Minecraft server](../minecraft-server/README.md) module builds
one, and several lessons here also use things it sets up: a server that loads mods, a
machine that runs the server for other people, and enough programming to write
something that puts a load on it.

## The lessons

Each lesson builds an instrument, and the later ones use all of them. Read in order if
you have no reason not to — but each states its own conditions, so you can start
anywhere they hold.

1. **[Three different things called lag](lessons/three-kinds-of-slow/guided.md)** —
   frame rate, tick rate, and latency are three unrelated problems that all get called
   the same thing. Read one measurement for each, tell them apart from symptoms alone,
   and record what your server looks like while it's healthy. Nothing to install.
2. **[What a computer is doing while it's busy](lessons/what-a-busy-computer-is-doing/guided.md)**
   — processor, memory, disk, and network, on both your own machine and the one your
   server runs on. Ends by taking the processor away from your own server on purpose and
   watching the world crawl.
3. **[How long a tick takes, and what makes it longer](lessons/the-tick-and-its-budget/guided.md)**
   — the measurement the whole subject rests on, why the number everybody quotes is the
   wrong one, and an ordered list of causes walked against your own server.
4. **[Profiling the server with spark](lessons/profiling-with-spark/guided.md)** — when
   the cheap explanations run out, a tool that says where the time actually went. Also
   where you find out what it's blind to.
5. **[Making the server slow on purpose](lessons/making-it-slow-on-purpose/guided.md)** —
   six deliberate slowdowns, each identified from its measurements alone. The signature
   table you write here is what you'll use for years.
6. **[Changes that help, and proving they did](lessons/changes-that-help/guided.md)** —
   make it faster, and be able to say by how much and because of what. No lists to paste.
7. **[Watching performance over time](lessons/knowing-before-they-tell-you/guided.md)** —
   record it continuously, graph a day, and have the server tell somebody it's struggling
   before anybody has to say so.

Lessons 4 through 7 are the ones that need the things listed above. Each names exactly
what it needs.
