# Running your own server

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every multiplayer Minecraft server you've ever joined is a program running on
somebody's computer. This session puts that program on yours.

The server is the side of Minecraft you don't normally see: it owns the world — holds
the master copy, runs the clock, decides what's true — while each player's game is a
**client** that connects to it and shows a view. Mojang publishes the server program
for free, and it runs happily in a folder on a normal computer. By the end of this
session you'll have one you can start, stop, join, and — starting next lesson — bend
to your will.

Install steps in this lesson are fine to copy and paste. The parts worth typing by
hand are marked by being small.

If you already know your way around a computer — or you're setting this up on a
learner's behalf — there's a [compressed version of this lesson](reference.md)
with just the commands and decisions.

---

## Before you start

You need:

- **A computer set up for coding** — a terminal you can move around in, and a
  `projects` folder. [Setting up a coding machine](../../../dev-machine/lessons/dev-machine-setup/guided.md) gets you
  there. Quick check: open a terminal, run `cd ~/projects`, and if that works you're
  set.
- **Minecraft: Java Edition installed**, with an account that can play it. Quick
  check: you can open the game and load any world.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A Minecraft server of your own, running in a folder you control
- Joined your own server, and watched your join happen from the server's side
- Read a program's startup output closely enough to fix the one thing it refused to
  do — using only what the program itself told you
- A world that exists independent of your game — the real thing, the same kind of
  program the big servers run

---

## New tools

**The Minecraft server** is a separate program from the game. Mojang gives it away on
the official server download page — search **minecraft server download** and take the
minecraft.net result (the exact address moves around; the search is more reliable than
any link written here). The download is a single file called `server.jar`. The page
offers the current version of Minecraft, which is fine for today; choosing a version
on purpose is [its own decision](../choosing-a-version/guided.md), and nothing today locks you
in.

**Java** is the programming language the server is written in — and a program written
in Java needs Java installed to run. That's the only reason it's appearing here: we
install it to run the server, and nothing in this module will ask you to write it.
The server download page states which Java version the current server needs — check
there, then get that version's installer from [adoptium.net](https://adoptium.net)
(the `.pkg` download; Adoptium is a foundation that packages Java for free). Verify in
a new terminal window:

```
java --version
```

**A `.jar` file** — like `server.jar` — is a program packaged for Java. You don't run
it directly; you hand it to Java to run. You're about to do exactly that.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) before running anything:

- The server folder will start with exactly one file in it. How many files and
  folders do you think will be there after the server has run once? Take an actual
  guess at the number.
- Do you think the first run will succeed on the first try? A brand-new program,
  first launch — is there anything it might need from you before it agrees to run?
- When the server *is* running, what will that look like on screen? What does a
  server look like?

---

## The work

### Give the server a home

Make a folder for it inside `projects`, and get the downloaded `server.jar` into it —
by terminal or by Finder, your choice, as long as it ends up at
`~/projects/mc-server/server.jar`.

Two things about the location, both of which matter:

- The server creates every one of its files — the world included — in whatever folder
  it's started from. A tidy folder of its own, or chaos.
- It must not live anywhere that syncs to the cloud. On a Mac that means not on the
  Desktop and not in Documents, which are often synced to iCloud. A sync tool copying
  world files *while the server is writing them* corrupts worlds. Your home directory
  and `~/projects` are safe.

### First run — read everything

In the terminal, get into the server's folder (you know how to check where you are),
then start it:

```
java -jar server.jar nogui
```

The `nogui` part tells the server to skip opening a little monitoring window —
everything it would show appears in the terminal instead.

It will not work. **This is expected, and it's not a mistake you made.** Your entire
task right now: read every line it printed, out loud, before touching anything — and
find the line that tells you what it wants.

<details>
<summary>Stuck? Start here</summary>

One of those lines is not like the others. Most are progress reports; one is about
*permission*. Read them again, slower than feels reasonable.

</details>

<details>
<summary>Second hint</summary>

The server also *did* something: it wrote a new file next to itself, and one of the
printed lines says so. Look at what's in the folder now that wasn't there before.
Programs that need a yes from a human often work exactly this way — write a file,
exit, and wait for the human to edit it.

</details>

<details>
<summary>Third hint</summary>

Open `eula.txt` in VS Code. One of its lines is a question pretending to be a
setting. EULA stands for End User License Agreement — this is the "I agree" checkbox
of the typed world, and the link inside the file is the actual agreement being
agreed to. Change the answer, save, and run the server again.

</details>

### Second run — watch a world get built

Same command. This time it goes very differently: settings load, a world starts
generating, percentages tick past. Read it as it scrolls — it's a live story of a
world being made. The server is up when you see the line that starts with **Done**.

That terminal window is now the server. It stays open; the program is running in it.
This is what a server looks like: not a game window — a log, telling you what it's
doing.

Now check your prediction: open the folder (or `ls` it from a *second* terminal
window) and count what appeared. Three things are worth recognizing today: `world/`
is the world itself, `logs/` is everything the server has said, and
`server.properties` is its settings — which we are deliberately not opening today,
because reading that file and changing what it says is
[the entire next lesson](../server-settings-and-console/guided.md).

### Join your own server

The server is running. Get your game connected to it.

<details>
<summary>Stuck? Start here</summary>

In the game: Multiplayer, then Add Server. It wants an address — which machine to
connect to. Your server is on the *same computer the game is running on*. What
would a computer call itself?

</details>

<details>
<summary>The answer, and the word for it</summary>

The address is `localhost` — a standard name every computer answers to, meaning
"this machine, myself." Add the server with that address and join it.

</details>

The moment you're in, look at the terminal: the server announced your arrival. You're
seeing the same event from both sides — the client's view on your screen, the
server's view in the log. Walk around; this world is real, and it's yours.

### Stop it properly

That terminal window doesn't just print — it listens. Click into it, type `stop`, and
press return. Watch what it does before it exits: saving, saving, saving. That's the
world being written safely to disk.

The rule, and the reason: **always stop the server by typing `stop`, never by closing
the window.** A server killed mid-write can leave a half-written world behind. `stop`
is also, quietly, your first server command — there's a whole console language in
there, and it gets its own lesson.

---

## Break it on purpose

Cause each one, read the message, undo it.

**Un-agree the agreement.** With the server stopped, open `eula.txt` and set it back
to `false`. Start the server. The first-run refusal happens again — identically. Put
it back to `true`, start again, and notice it recover like nothing happened. The
point: that failure is now a *known consequence*. It reproduces on demand and undoes
on demand, which is what makes any failure solvable.

**Start it twice.** With the server running, open a second terminal, go to the same
folder, and run the start command again. The second copy fails. Your task: find the
line in its output that names *the thing two running programs can't share*.

What that's about: the server listens for connections on a numbered **port** — 25565,
unless told otherwise — and a port on a machine can have exactly one program
listening to it. When you joined, `localhost` said *which machine*; the port
(supplied silently by the game) said *which program on it*. One line of error, and
you've met the concept that the entire letting-people-in part of this module is
built on. Nothing to undo — the second copy never got far enough to touch anything.

---

## What just happened

The server turns out to be an ordinary program in an ordinary folder. At startup it
reads its files — settings, then the world. While running it holds the live world in
memory and keeps writing: the log constantly, the world every so often, and
everything, cleanly, when you type `stop`. Every file in that folder was put there by
the server, for a reason you can find out.

When you joined, your game became a **client** of a server on the same machine — the
connection never actually left your computer. `localhost` is the name for that trick,
and every computer honors it.

And one thing you should know about the game you've been playing all along:
singleplayer works this way too. Every time you've loaded a singleplayer world, the
game has quietly started an internal Minecraft server inside itself and connected you
to it. You have been running Minecraft servers for as long as you've been playing
Minecraft. Today one of them just moved into its own window — where you can watch it
work, and where, starting next lesson, you can change what it believes.

---

## Go further

- Everything the server printed today also went into `logs/latest.log`. Open it and
  find your own join. What got logged that never appeared on screen?
- How big is the `world/` folder right now? Play for a bit, walk somewhere you've
  never been, and check again. What do you think makes it grow?
- Could another computer on your wifi join your server using `localhost`? If not —
  what would it need to say instead? You have enough pieces to experiment before any
  lesson covers it.
- You proved one machine can't run two servers *on one port*. So can one machine run
  two servers? What would have to be different between them? Try it — everything in
  this folder can be rebuilt.

---

## What you have now

- A server you can start, stop, and join, living at `~/projects/mc-server`
- The habit this whole module leans on: when a program refuses, the reason is in
  what it printed
- Words that later lessons will use freely: client, server, localhost, port, log
