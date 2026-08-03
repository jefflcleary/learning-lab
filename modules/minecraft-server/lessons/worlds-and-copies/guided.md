# A world is a folder

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Everything in your Minecraft world — every build, every chest, every player's exact
position and inventory — is a folder of files on your computer, sitting in your
server's folder under the name `world`. That's not a metaphor. The plaza is bytes.
Your friend's house is bytes. You, standing wherever you last logged out, are bytes
in a file with your name on it (almost).

This session is about proving that, by handling the files directly: you'll copy the
whole world, switch the server between the original and the copy, destroy something
magnificent on the copy with a completely clear conscience, and then generate a
brand-new world out of nothing. By the end, "the world" stops being a precious,
mysterious thing inside the server and becomes what it always was — a folder you can
copy, park, swap, and keep in triplicate. That change of view is what makes
everything in the next few lessons possible.

---

## Before you start

You need:

- **A server you can start and stop.** [Running your own server](../running-your-own-server/guided.md)
  gets you there. Quick check: start your server, wait for the **Done** line, type
  `stop`, watch it save and exit.
- **A terminal you can move around in.** Set up in
  [Setting up a coding machine](../dev-machine-setup/guided.md). Quick check: open a
  terminal, `cd ~/projects/mc-server`, and `ls` shows the server's files.
- **You've changed server settings before** and know that edits land on the next
  start, not while the server runs. That's from
  [The server is yours to change](../server-settings/guided.md). Quick check: you can say
  from memory why editing `server.properties` while the server is running changes
  nothing.

---

## What you'll have at the end

By the end of this session you will have:

- Opened the world folder and seen what a world is actually made of
- A complete second copy of your world, and a server you can switch between the two
  at will
- Destroyed something on the copy — deliberately, spectacularly — and then proven
  the original never felt a thing
- Watched the server generate an entirely new world because you named a folder that
  didn't exist
- The habit this whole part of the module is built on: copy first, experiment on
  the copy

---

## New tools

**`cp`** is the terminal's copy command: `cp <from> <to>` copies a file. You'll
discover in a minute that it has an opinion about folders, and what to do about it.

**`du -sh <folder>`** prints how much disk space a folder takes, in human-readable
units — `du` is short for disk usage, and it's how you'll measure a world.

One rule for today, stated up front: **the server is stopped whenever you copy a
world you intend to trust.** A running server writes to its world files
continually, and copying files while they're being written is a gamble — you'll
run that gamble on purpose at the end of this session and see for yourself.

Nothing to install today. The whole lesson is one command, one setting, and a
change of worldview.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- How big is your entire world — the folder, in megabytes? An actual number.
- Suppose you copy the world folder and join the copy. Where will your player be
  standing — at the world spawn, where you last logged out, or somewhere else?
- Later you'll point the server at a world folder that doesn't exist. What will it
  do — refuse to start, complain and fall back to the real world, or something
  else?

---

## The work

### Look inside the world

Stop your server. In the terminal, from the server folder, run:

```
ls world
```

(Or open the `world` folder in the VS Code sidebar — same view, different window.)

Before reading on: from the names alone, guess what each thing in there holds.

Now the map. Three of those names are worth knowing on sight:

- **`level.dat`** — the world's master record: the spawn point, the world clock,
  the rules, and which version of the game last saved it
- **`region/`** — the terrain itself. Every block of every chunk, packed into
  files ending in `.mca`
- **`playerdata/`** — one file per player who has *ever* joined: their inventory,
  their position, their health. Filed by player ID (a long code called a UUID)
  rather than by name, which is why none of the filenames look like anybody

Measure it — `du -sh world` — and check your prediction. However many megabytes
that is: that's the whole universe your friends have been living in. The plaza,
the chests, the half-finished builds. These files. Nothing else.

### Copy the world

Goal: an exact copy of the world named `world-experiments`, sitting right next to
the original.

Start by trying the obvious thing, and read what comes back:

```
cp world world-experiments
```

`cp` refuses, and the message says why: the thing you pointed it at is a
directory, and plain `cp` doesn't do directories. It copies one file; a folder is
a whole tree of them. The fix is the `-R` flag — **recursive** — which tells `cp`
to descend: the folder, the folders inside it, all the way down:

```
cp -R world world-experiments
```

It may take a moment — it's copying a universe. Verify: `ls` shows both folders,
and `du -sh world world-experiments` shows twins.

### Switch the server to the copy

Goal: make the server open `world-experiments` instead of `world` — and prove it
worked.

<details>
<summary>Stuck? Start here</summary>

You once read every line of `server.properties` and sorted the keys into lists.
Somewhere in there is a key that answers the question "which world does this
server open?" Skim the left-hand sides of your lists again with that question in
mind.

</details>

<details>
<summary>Naming it</summary>

The key is `level-name`. Its value is a folder name, which the server looks up in
its own folder — it has said `world` this whole time, which is why the server has
been opening `world`. Point it at your copy.

</details>

<details>
<summary>If nothing changed</summary>

You edited the file while remembering nothing about when the server reads it —
which happens to everyone once. The server reads `server.properties` at startup.
Restart it.

</details>

Now join, and check your prediction: you're standing exactly where you last logged
out, with exactly your inventory — because your position is a file in
`playerdata/`, and you copied the file. Same builds, same chests. A perfect twin.

Now the part of this session you'll remember. You are standing in a copy. The real
world is safe in another folder, and the server isn't even looking at it. So: **do
something to this world you would never, ever do at home.** Pour lava across the
plaza. Put a crater where your front door was. Something you'd feel in your
stomach. This is licensed — it's for science, and the science is establishing what
a copy is.

Look at the destruction for a moment. Then stop the server.

### Switch back, and prove the original never felt it

Set `level-name` back to `world`. Start the server. Join.

Untouched. The plaza is fine. The door is fine. And here's the thing worth sitting
with: the destruction still *exists* — it's bytes in `world-experiments`, and it's
real every time the server opens that folder — but it happened in one folder, and
this is a different folder. Two complete realities on one disk, and one line in a
settings file chooses between them.

### A world from nothing

You made a prediction about this one. Set `level-name` to a folder that doesn't
exist — `world-fresh`, say. Start the server, and this time **read the log as it
scrolls**: you've seen this story once before, on the very first run — settings
loading, spawn preparing, percentages. The server looked for `world-fresh`, found
nothing, and is generating a world in it right now.

Join it. Nobody has ever stood here. Then look at the server folder: `world-fresh`
now exists, created by the server, exactly the way `world` was created the day you
first ran it — which is the answer to where your world came from in the first
place.

When you've seen enough, stop the server and set `level-name` back to `world`.
This session ends with the server pointing at the real world and two spare worlds
parked beside it.

---

## Break it on purpose

**Copy a moving world.** You've been told the server must be stopped when you copy.
Find out why by ignoring it — deliberately, on a copy-to-be, with nothing at risk.

Start the server on `world` and join it. Now open a second terminal, go to the
server folder, and — while flying around, placing blocks, keeping the world busy —
run:

```
cp -R world world-torn
```

Then stop the server and inspect what you caught. Compare `du -sh world-torn`
against the original. Point `level-name` at `world-torn`, start, join, and look
around for anything wrong.

Whatever you find, here is the honest truth about it: the copy might be perfect.
It might be subtly wrong in a way you won't notice for a week. It might not load
at all. `cp` was reading the files at the same moment the server was writing
them, and what landed in the copy depends on timing nobody can see and nobody can
reproduce. Run it again and you'd get a different answer. **You can't know** — and
a copy you can't trust is worthless on exactly the day you need it. That
unfixable uncertainty is the entire reason a later lesson exists:
[backing up a world that won't sit still](../backups-without-stopping/guided.md) is about
getting a trustworthy copy *without* stopping the server.

Undo: set `level-name` back to `world`, then delete `world-torn` — drag it to the
Trash, or `rm -r world-torn` in the terminal. One habit to install right here:
before deleting any world folder, glance at `level-name` and make sure it isn't
the folder the server is currently using. Then delete freely — it's a copy, and
deleting copies is free. That's what makes them copies.

---

## What just happened

"The world" dissolved today. It turned out to be a folder, and the server turned
out to be a program that opens whichever folder it's told to. Nothing about the
world is sacred to the machine — it's files, and files can be copied, renamed,
parked, swapped, kept in triplicate. Which means something bigger than Minecraft:
**experiments on copies are free.** Any question that starts "what would happen
if…" can be answered on a copy for the price of one `cp -R` and some disk space,
with zero consequence for the world people care about. If you read
[the lesson on choosing a version](../choosing-a-version/guided.md), you've met this idea
as "don't experiment on the thing people depend on" — today it got its mechanism.

One more wall came down today, quietly. Your singleplayer worlds — the ones from
before you ever ran a server — are the same kind of folder. On a Mac the game
keeps them in `~/Library/Application Support/minecraft/saves/`, one folder per
world; go look (in Finder, the Go menu hides Library until you hold Option — or
use Go to Folder and type the path). Inside each one: a `level.dat`, a `region/`
folder. And this is a true story, generic because it keeps happening: somewhere,
someone's singleplayer world became the world of a real multiplayer server by
exactly the move you learned today — copy the folder in, point `level-name` at it.
The wall between "my little world" and "a real server" was never there.

---

## Go further

- Try that last idea. **Copy** a singleplayer world into the server folder — copy,
  never move the only copy of anything — and point `level-name` at it. What
  survives the trip? Your inventory? Your position? Pets?
- The version question, to which nobody can tell you the answer: `level.dat`
  records which game version last saved the world, and a newer server *upgrades*
  an older world when it opens it — one-way, by design; Mojang ships nothing that
  goes backwards. But people have built third-party tools that claim to downgrade
  worlds. On a **copy**: investigate what exists and what actually happens to a
  world pushed backwards in time. The outcome is genuinely unknown from where
  you're standing — and on a copy, finding out costs nothing.
- Open one of the files in `region/` with VS Code and look at it. What *is* that?
  See what you can find out about the format — a later lesson takes those files
  apart properly, but there's no harm in arriving early.
- How many worlds could one server folder hold? A winter world? A creative world?
  A museum of every world you've ever made, each one a `level-name` edit away?

---

## What you have now

- `world-experiments` — a full copy of your world that the server can be switched
  to, officially expendable: breaking things there is free, forever
- You've switched a server between worlds with `level-name`, generated a world
  from an empty name, and destroyed something on a copy while the original slept
  untouched
- The copy-first reflex: experiments happen on copies, and nothing is ever the
  only copy of itself for long
- One measured fact you own: what you get when you copy a world the server is
  writing — and why the answer is "you can't know"
