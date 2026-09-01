# A recommended path

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

Lessons 4 through 7 need things from the
[Running a Minecraft server](../minecraft-server/README.md) module — a server that loads
mods, a machine that runs it for other people, and enough programming to write something
that puts a load on it. Each lesson names exactly what it needs.
