# Copying and backing up worlds

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Everything in your Minecraft world — every build, every chest, every player's
exact position and inventory — is a folder of files on your computer, sitting in
your server's folder under the name `world`. That's not a metaphor. The plaza is
bytes. Your friend's house is bytes. You, standing wherever you last logged out,
are bytes in a file.

This lesson takes that fact to its payoff, in three movements. First you prove
it: copy the whole world, switch the server between original and copy, destroy
something magnificent on the copy with a clear conscience, and generate a
brand-new world out of nothing. Then you use it for protection: write your first
**shell script** — a saved file of commands — that makes dated backups, then
deliberately destroy the world and restore it, so your backups are proven rather
than hoped. Finally you solve the problem that every one of those backups starts
with `stop`: the server has commands that let you take a trustworthy copy while
it runs and everyone stays connected — and you teach your script that procedure
too, right up to the one thing a script can't do yet.

The moment other people have built things in your world, none of this is a
chore. A backup is the difference between a disaster and an anecdote.

---

## Before you start

You need:

- **A server you can start and stop.** [Running your own server](../running-your-own-server/guided.md)
  gets you there. Quick check: start it, wait for the **Done** line, type `stop`.
- **A terminal you can move around in.** Set up in
  [Setting up a coding machine](../../../dev-machine/lessons/dev-machine-setup/guided.md). Quick check:
  `cd ~/projects/mc-server`, and `ls` shows the server's files.
- **You've changed server settings and used the live console** — you know edits
  to `server.properties` land on the next start, and you can type a command into
  the running server's terminal and point at the line it printed back. Both from
  [Server settings and console commands](../server-settings-and-console/guided.md).

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A complete second copy of your world the server can switch to, with something
  spectacular destroyed in it — while the original never felt a thing
- Watched the server generate a new world because you named a folder that didn't
  exist
- Written and run your first shell script, `backup.sh`, producing dated backups
  in a separate folder
- Destroyed the world on purpose, restored it from a backup, and proven the
  destruction never happened
- Backed up the world while the server ran and people were on it — nobody
  kicked, nothing noticed — plus `hot-backup.sh`, which walks that procedure
- The habit this whole part of the module is built on: copy first, experiment on
  the copy

---

## New tools

**`cp`** is the terminal's copy command: `cp <from> <to>` copies a file. You'll
discover in a minute that it has an opinion about folders.

**`du -sh <folder>`** prints how much disk space a folder takes, in
human-readable units — `du` is short for disk usage; it's how you'll measure a
world.

Both commands carry their own manuals: `man cp` and `man du` open them (press `q`
to leave). Every terminal command ships a manual page like this — `man` is where
a command's real documentation lives, and it's always exactly right for the
version on your machine.

**A shell script** is a plain text file of terminal commands, which the shell
runs top to bottom. The same commands you'd type, saved — and saved commands
don't get mistyped, don't get skipped because it's late, and run the same on the
hundredth day as the first.

**`date`** prints the current date and time, and can be told the exact format to
print in — you'll use that to put today's date into a folder name.

**`mkdir -p`** is `mkdir` with a manner: create the folder if it's missing, say
nothing if it already exists (plain `mkdir` complains about existing folders).

**`chmod +x <file>`** marks a file as executable — permission for it to be
*run*, not just read. New scripts need it once.

**`mv <from> <to>`** moves or renames — it changes what a thing is called or
where it sits, without copying anything.

**The server's save commands.** The server takes console commands that control
its own saving — one suspends writing world files to disk, one forces everything
held in memory out to disk, one resumes normal saving. Their names are
`save-off`, `save-all` (with a `flush` variant), and `save-on` — but their
precise behavior and, importantly, the exact lines they print when they've
worked are for [minecraft.wiki](https://minecraft.wiki) to tell you, not this
page. Looking them up is one of the work steps below.

**`ls -l`** — the long form of `ls`: one line per file, including when each was
last modified. Your instrument for seeing whether the server is writing or
holding still.

One rule, stated up front: **the server is stopped whenever you copy a world you
intend to trust.** A running server writes its world files continually, and
copying files while they're being written is a gamble. You'll run that gamble on
purpose partway through this lesson — and then learn the technique that lifts
the rule.

Nothing to install today. Everything above ships with the Mac or inside the
server you already run.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- How big is your entire world — the folder, in megabytes? An actual number.
- Suppose you copy the world folder and join the copy. Where will your player be
  standing — at the world spawn, where you last logged out, or somewhere else?
- If this computer died right now, permanently: what exists in the `world`
  folder and nowhere else on earth? Whose builds are on that list besides yours?
- The backup script will contain the same copy command you'll first run by hand.
  What can a saved file of commands do that your hands can't?
- Near the end you'll copy the world while the server keeps running with saving
  switched off. Players keep playing normally during that window — where do
  their actions live? What would a power cut in that window cost?
- Will the players online notice *anything* while a live backup is taken?

---

## The work

### Look inside the world

Stop your server. From the server folder, run `ls world` (or open the `world`
folder in the VS Code sidebar). Before reading on: from the names alone, guess
what each thing in there holds.

Now the map. Three names are worth knowing on sight:

- **`level.dat`** — the world's master record: the spawn point, the world clock,
  the rules, and which version of the game last saved it
- **`region/`** — the terrain itself, every block of every chunk, packed into
  files ending in `.mca`
- **`playerdata/`** — one file per player who has *ever* joined: inventory,
  position, health. Filed by player ID (a long code called a UUID) rather than
  name, which is why none of the filenames look like anybody

Measure it — `du -sh world` — and check your prediction. However many megabytes
that is: that's the whole universe your friends have been living in. These
files. Nothing else.

### Copy the world

Goal: an exact copy named `world-experiments`, next to the original. Try the
obvious thing first, and read what comes back:

```
cp world world-experiments
```

`cp` refuses, and the message says why: you pointed it at a directory, and plain
`cp` copies one file. The fix is the `-R` flag — **recursive** — which tells
`cp` to descend: the folder, the folders inside it, all the way down:

```
cp -R world world-experiments
```

It may take a moment — it's copying a universe. Verify: `ls` shows both, and
`du -sh world world-experiments` shows twins.

### Switch the server to the copy

Goal: make the server open `world-experiments` instead of `world` — and prove it.

<details>
<summary>Stuck? Start here</summary>

You once read every line of `server.properties` and sorted the keys into lists.
One key answers the question "which world does this server open?" Skim the
left-hand sides of your lists with that question in mind.

</details>

<details>
<summary>Naming it</summary>

The key is `level-name`. Its value is a folder name, looked up in the server's
own folder — it has said `world` this whole time. Point it at your copy.

</details>

<details>
<summary>If nothing changed</summary>

Remember when the server reads `server.properties`: at startup. Restart it.

</details>

Join, and check your prediction: you're standing exactly where you last logged
out, with exactly your inventory — because your position is a file in
`playerdata/`, and you copied the file. Same builds, same chests. A perfect twin.

Now the part you'll remember. You are standing in a copy; the real world is safe
in another folder the server isn't even looking at. So: **do something to this
world you would never, ever do at home.** Lava across the plaza. A crater where
your front door was. Something you'd feel in your stomach. This is licensed —
it's for science, and the science is establishing what a copy is.

Look at the destruction for a moment. Then stop the server.

### Switch back, and prove the original never felt it

Set `level-name` back to `world`. Start, join. Untouched. And worth sitting
with: the destruction still *exists* — bytes in `world-experiments`, real every
time the server opens that folder — but it happened in one folder, and this is a
different folder. Two complete realities on one disk, and one line in a settings
file chooses between them.

### A world from nothing

A quick prediction first: if `level-name` names a folder that doesn't exist,
what will the server do — refuse to start, fall back to `world`, or something
else?

Set `level-name` to a folder that doesn't exist — `world-fresh`, say. Start, and
**read the log as it scrolls**: the same story as the very first run — settings
loading, spawn preparing, percentages. The server found nothing at `world-fresh`
and is generating a world in it right now. Join it — nobody has ever stood here.
Then check the server folder: `world-fresh` now exists, created by the server,
exactly the way `world` was created the day you first ran it.

When you've seen enough, stop the server and set `level-name` back to `world`.

### One backup by hand

`world-experiments` is a copy *for use* — you play in it, and it drifts from the
original. A **backup** is a different animal: a dated copy, kept somewhere else,
made to be left alone unless disaster comes. And disaster is real: the machine
your world lives on is one power cut, one failed disk, one careless command away
from taking every build in it — including other people's.

Stop the server. Make the place backups will live — outside the server's
folder — then copy the world into it, with today's date typed by hand in
year-month-day form:

```
mkdir -p ~/backups
cp -R world ~/backups/world-2026-07-31
```

(Your date, not that one.) Check it landed: `ls ~/backups`.

That's a real backup — dated, elsewhere, about to be left alone. Now say the
flaw out loud: a human typed that date. Tomorrow the human mistypes it, or skips
the whole chore. A backup that depends on diligence stops happening. Chores that
must happen the same way every time are what machines are for.

### Teach the machine the date

Run these two, and look at what each prints:

```
date
date +%Y-%m-%d
```

The `+` part is a format — an order slip for exactly what to print: `%Y` the
year, `%m` the month, `%d` the day. The second command prints precisely what you
typed by hand a minute ago. Which leaves one question between you and a script:
how do you use one command's *output* inside another command?

### Write the script

In VS Code, in the server folder, create a new file called `backup.sh` — `.sh`
for shell. Here is the whole script with the two load-bearing pieces blanked
out. Type it — don't paste it — and fill the blanks:

```bash
#!/bin/bash

mkdir -p ~/backups
cp -R ______ ~/backups/world-______
echo "Backup finished. Contents of ~/backups:"
ls ~/backups
```

About that strange first line, because you can't be expected to guess it: `#!`
at the top of a file (the **shebang**) tells the operating system which program
should read and run the rest of the file. This one says: hand me to `bash`.
bash is a shell — the same kind of program as the zsh in your terminal, a
slightly different dialect — and it's the one scripts conventionally declare.
`echo` just prints text, so the script reports what it did.

The blanks: first, what to copy. Second, how today's date gets into that folder
name without any human typing it.

<details>
<summary>Stuck? Start here</summary>

The first blank is exactly what you typed in the by-hand version — the script
will be run from the same folder you were standing in. For the second: you have
a command that *prints* today's date; the question is how a command's printed
output can appear in the middle of another command's line. The shell has a
feature for precisely this.

</details>

<details>
<summary>The concept, named</summary>

It's called **command substitution** and looks like `$(some command)`. The shell
runs the inner command first, takes whatever it printed, pastes it into the line
right there — then runs the line.

</details>

<details>
<summary>The specific piece</summary>

The second blank is `$(date +%Y-%m-%d)`.

</details>

<details>
<summary>The whole script, for comparison</summary>

Once yours runs — or if it won't and you've stared long enough — compare:

```bash
#!/bin/bash

mkdir -p ~/backups
cp -R world ~/backups/world-$(date +%Y-%m-%d)
echo "Backup finished. Contents of ~/backups:"
ls ~/backups
```

If yours differs and still works, yours is also right.

</details>

### Make it run

Server still stopped. From the server folder:

```
./backup.sh
```

Refused — permission denied. New files aren't allowed to *run* until someone
says so; you are the someone:

```
chmod +x backup.sh
./backup.sh
```

About the `./`: for a bare command name, the shell searches only a fixed list of
folders (its PATH — you met the idea when a freshly installed program suddenly
"worked"). Your server folder isn't on that list, and shouldn't be.
`./backup.sh` says: no searching — this folder, this file.

Watch it run. Check `~/backups` for today's dated folder, and `du -sh` it
against `world` — twins. You have written a program. It's four lines and it
protects everything your friends have built.

### The restore drill

Here is the sentence this whole lesson exists for: **a backup nobody has
restored is a hope, not a backup.** Files can copy incompletely; scripts can
have quiet bugs. The only way to know a backup works is to need it and watch it
deliver — so you'll manufacture the need: destroy the world, then restore it so
completely that the destruction never happened.

First, a fresh backup. Run the script; confirm today's folder is in `~/backups`
and look *inside* it — the `region/` folder, the `level.dat`.

Now the destruction, and an honest word about where to do it. You could run the
drill on `world-experiments` — the mechanics are identical. But the drill proves
the most when the world you resurrect is one you'd actually mourn: doing this to
the real world, thirty seconds after backing it up, is the braver and better
lesson, and the fear you feel pouring the lava is exactly the fear the backup
exists to delete. Your call, genuinely. Either way: wreck something of your own,
not a friend's build — the drill needs a loss *you* feel.

Start the server, join, and do it. Lava over your own base. A crater where
something you loved stood. Make it hurt a little. Look at it.

Stop the server. Now: make the server open a world where none of that
happened — while keeping the wreck. Even wreckage doesn't get deleted while it's
the only copy of itself; the copy-first habit doesn't take days off.

<details>
<summary>Stuck? Start here</summary>

The server opens whatever folder `level-name` names — right now that's `world`,
which holds a smoking ruin. Two possible moves: change *which name* the server
opens, or change *what sits at the name* it already opens. Both would work. The
standard shape — the one every server admin on earth uses — is the second.

</details>

<details>
<summary>The shape of it</summary>

Set the ruin aside by renaming it — `mv` does that. Then **copy** the backup in
under the name the server expects. Copy, never move: the backup stays in
`~/backups`, untouched. A restore that consumes its backup has protected you
exactly once — that is, not next time.

</details>

<details>
<summary>The commands</summary>

```
mv world world-wrecked
cp -R ~/backups/world-2026-07-31 world
```

(Your date.) Then start the server.

</details>

Join. Walk to where the lava was. It never happened. The base is whole, the
chests are full, and the world has moved backwards in time because you parked a
copy of the past where nothing could touch it. That feeling is what a working
backup is. When you're satisfied, glance at `level-name` (habit: never delete a
folder the server currently points at), then delete `world-wrecked`.

### The gamble: copy a moving world

Your backups work — you've proven that personally. But every one starts with
`stop`, and `stop` kicks everyone off, every time. A backup routine that ends
the evening for your friends is a routine that quietly stops getting run.

The obvious dodge is to copy the world while the server runs — the very thing
the rule at the top of this lesson forbids. Find out why by breaking the rule
deliberately, with nothing at risk.

Start the server on `world` and join. Open a second terminal, go to the server
folder, and — while flying around, placing blocks, keeping the world busy — run:

```
cp -R world world-torn
```

Stop the server and inspect what you caught: `du -sh world-torn` against the
original; point `level-name` at `world-torn`, start, join, look for anything
wrong.

Whatever you find, here is the honest truth: the copy might be perfect. It might
be subtly wrong in a way you won't notice for a week. It might not load at all.
`cp` was reading the files at the same moment the server was writing them, and
what landed depends on timing nobody can see and nobody can reproduce. Run it
again and you'd get a different answer. **You can't know** — and a copy you
can't trust is worthless on exactly the day you need it.

Clean up: set `level-name` back to `world`, glance at it once more, delete
`world-torn`. Then the good news: the server itself has commands for exactly
this problem.

### Confirm the save commands at the source

On [minecraft.wiki](https://minecraft.wiki), find the documentation for
`save-off`, `save-all`, and `save-on` — search the wiki for `save-off`, or find
the Commands page and work from there.

Pin down, in writing: what each command does, and what line each prints when it
has done it. While you're there, answer this: the wiki lists both `save-all` and
`save-all flush` — why would both exist? What's the difference between
*starting* to save everything and *finishing* saving everything? The
confirmation line for `save-all flush` matters most — in the procedure you're
about to run, that line is the go signal, and you need to recognize it on sight.

### A hot backup, by hand

Goal: with the server **running** and at least one player connected — you count,
though a friend online turns this from a test into a demonstration — produce a
copy of the world you have reason to trust. No `stop`. Nobody disconnected.

You've done it right when: the flush confirmation line appeared *before* you
started copying, `save-on` went in after the copy finished, and whoever was
online reports that nothing happened at all.

<details>
<summary>Stuck? Start here</summary>

The order is the entire trick: nothing may be writing to the world files while
your copy reads them. One of your three commands stops *new* writes from
starting; one forces *pending* writes to finish. Which has to come first — and
what tells you the second one is done?

</details>

<details>
<summary>The procedure</summary>

At the console: `save-off`, then `save-all flush`. Then wait — actually wait —
for the confirmation line you wrote down from the wiki. Only then copy: your
backup script already makes dated copies (run it from a second terminal), or
`cp -R` by hand into `~/backups`. When the copy is done: `save-on`. That last
command is not optional; the break-it section below is about forgetting it.

</details>

While the copy runs, ask whoever is online what they're experiencing. The answer
should be: nothing. The world never stopped — you'll see why at the end.

### Trust, then verify

A hot copy you haven't opened is exactly as trustworthy as `world-torn` was —
unknown. Goal: prove this copy is a world, not a hope, by restoring it into the
experiments slot and walking around in it.

<details>
<summary>Stuck? Start here</summary>

The experiments slot exists to be overwritten — that was its job description
from the moment you made it. A restore is a copy plus a name the server opens:
you know which setting picks the folder, and you know restores copy, never move,
the backup. Which folder name does the hot copy need to sit under for the server
to open it as the experiments world?

</details>

Join it and look around. The builds from today should be there, right up to
roughly the moment of the flush. When you've seen it, point the server back at
`world`.

### Teach the script — and find its limit

Goal: `hot-backup.sh` — the live procedure, as a script.

But before writing anything, a prediction, and it's the interesting part of this
whole section: could the script itself run `save-off`? Suppose a line of the
script said `echo save-off` — what would actually happen?

Think it through, or try it. The answer: the words `save-off` get printed to the
script's own output, and that's all. The server console reads keystrokes from
its own terminal window; your script is a different program in a different
terminal. It can print whatever it likes — the server never hears it. **The
script has no hands.** It cannot type into the console, and right now, nothing
you know can bridge that.

Sit with that for a second, because the gap is real. Then know this: it's
closable. There's a thing called RCON — a way the server lets *other programs*
send it console commands over a network connection. You've even read past its
switch once: `enable-rcon`, sitting quietly in `server.properties`. Wiring it up
belongs to [a later lesson, where Python programs read the server's logs and
send it commands](../python-logs-and-rcon/guided.md) — and the script you're
about to write is the one that gets upgraded there.

Today's honest version: a script that automates what it can (the dated copy — it
already knows how) and walks its human through what it can't — printing
instructions for the console half, and pausing while you carry them out.

<details>
<summary>Stuck? Start here</summary>

Your `backup.sh` already does the middle of the procedure. What has to happen
before its copy line, and what after? Neither is something the script can *do* —
but both are things it could *say*, if it had a way to wait for you in between.

</details>

<details>
<summary>The missing piece, named</summary>

`echo` prints the instructions — that much you have. For the pause, bash has a
builtin command called `read`, whose day job is waiting for the human to type
something and press return. How to use it is yours to look up: `help read` at a
bash prompt, or any bash reference.

</details>

Done when: running `./hot-backup.sh` tells you what to type at the console,
waits while you do it, makes the dated copy, and then tells you what to type to
finish the job.

---

## Break it on purpose

**Restore to the wrong name.** The classic restore fumble, run on purpose so the
real version never scares you. Stop the server, set `world` aside again
(`mv world world-aside`), and this time copy the backup to a typo:

```
cp -R ~/backups/world-2026-07-31 wolrd
```

Start the server and join. A brand-new world — nothing familiar in any
direction. Now read the situation *before* touching anything, because this exact
moment, reached by accident at midnight, reads as **everything is gone** — and
it never is. Run `ls`. The real world sits right there as `world-aside`. The
backup is untouched in `~/backups`. The fresh nothing-world you're standing in
is the server doing exactly what you watched in the world-from-nothing step:
`level-name` pointed at a name where nothing existed, so it generated. Worlds
don't vanish. Names miss. The calm inventory — *what folders actually exist
right now* — beats every panicked conclusion, every time. Fix: stop the server,
delete the accidental fresh world and the typo folder, and put things back
(`mv world-aside world`, or redo the copy properly).

**Run the script from the wrong folder.** Go home — `cd ~` — and try
`./backup.sh`. Refused: no such file here; the script lives in the server
folder. So run it by full path: `~/projects/mc-server/backup.sh`. It starts —
and `cp` fails: there's no `world` *here*. A script runs in the folder **you**
are standing in, not the folder it lives in. That's the working-directory idea
collecting another toll, and this exact confusion is the classic reason
automated scripts fail years into people's careers. Nothing to undo — the failed
run copied nothing. `cd` back.

**Forget save-on.** The hot procedure's last step is the one nothing forces you
to do — so skip it, deliberately. Run the procedure but stop after the copy:
saving stays off. Keep playing — build a pillar, dig a hole, note the time. The
world behaves perfectly, and that's the trap. Go look at the evidence:
`ls -l world/region`, twice, a minute apart. The modification times have stopped
moving. The world is running; its diary has stopped being written.

Now the reasoning exercise — strictly hypothetical, no cords get pulled: if this
machine lost power right now, what exists on disk? The world as of the flush.
The pillar, the hole, and everything anyone has done since live in memory and
nowhere else. And there's no time limit: saving stays off until someone turns it
back on — an hour, a week of play, all of it one crash away from never having
happened. Find out whether the server ever warns you about this state.

Turn it back on: `save-on`, then a `save-all` for good measure, then watch the
timestamps in `world/region` move again. What this teaches is why the procedure
is a *procedure*: some steps come in pairs, and the whole thing is a promise
that the last step happens. Humans forget last steps — which is why your script
walks through all of them in order, and why giving the script real hands, in
[the lesson that closes the gap](../python-logs-and-rcon/guided.md), makes this
safer still.

---

## What just happened

**"The world" dissolved.** It turned out to be a folder, and the server a
program that opens whichever folder it's told to. Nothing about the world is
sacred to the machine — it's files, and files can be copied, renamed, parked,
swapped, kept in triplicate. Which means something bigger than Minecraft:
**experiments on copies are free.** Any question that starts "what would happen
if…" can be answered on a copy for the price of one `cp -R` and some disk. If
you read [the lesson on choosing a version](../choosing-a-version/guided.md),
you've met this as "don't experiment on the thing people depend on" — today it
got its mechanism. One more wall came down quietly: your singleplayer worlds are
the same kind of folder. On a Mac the game keeps them in
`~/Library/Application Support/minecraft/saves/`, one folder per world; go look
(in Finder, the Go menu hides Library until you hold Option — or use Go to
Folder and type the path). It's a true story, generic because it keeps
happening: somewhere, someone's singleplayer world became the world of a real
multiplayer server by exactly the move you learned today. The wall between "my
little world" and "a real server" was never there.

**You moved a world backwards in time.** That's the whole trick of backups, and
having done it once, the design explains itself. Why dated, and why keep
several? Because disasters are discovered late — corruption that happens Tuesday
and gets noticed Thursday needs Monday's backup, and a backup made *after* the
disaster is a corrupted backup of a corrupted world. Why elsewhere? A backup
inside the server folder dies with the server folder — a different folder is the
minimum, a different machine the real answer. And notice something about the
rule from when you first set up the server — never put the live server in a
cloud-synced folder: that rule was always about a sync tool fighting a program
*mid-write*. A finished backup is never written again, so cloud-synced folders
are perfectly fine for `~/backups`. Same facts, opposite conclusions, and now
you can derive both. As for the script: today you told the shell a *procedure*
instead of performing one, for the first time. Anything you can type can be
saved; anything saved runs identically every time — when it's early, when you're
bored, and eventually when no human is present at all. That last part is a later
lesson, and the four-line script you wrote today will grow into it.

**The word for the gamble's problem is consistency.** A copy of files being
written is a photo of a moving subject: different parts of the image come from
different instants, and the whole may not describe any moment that ever actually
existed. That's precisely what was wrong with `world-torn` — not that it was
damaged, but that it was *unknowable*. `save-off` plus `save-all flush` asks the
subject to hold still: the first stops new writes from starting, the second
finishes every write already in flight. After both, the files on disk describe
one single instant — and keep describing it, however long your copy takes, until
`save-on` lets time resume. And the world never paused, because of something
you've known since your first settings change: the server runs the live world
from *memory* and treats the disk as its diary. Saving off doesn't stop the
world — it stops the diary. Here's the reach of that: every database on earth —
under banks, games, hospitals — has this exact problem, data that must be copied
while something is actively changing it, and every one uses some version of this
exact answer: pause writes, flush, take the copy, resume. Out there it's called
taking a *consistent snapshot*. You've now taken one by hand, at a console,
while the people it protects played on without noticing.

---

## Go further

- **Copy** a singleplayer world into the server folder — copy, never move the
  only copy of anything — and point `level-name` at it. What survives the trip?
  Your inventory? Your position? Pets?
- The version question, to which nobody can tell you the answer: `level.dat`
  records which game version last saved the world, and a newer server *upgrades*
  an older world when it opens it — one-way, by design; Mojang ships nothing
  that goes backwards. But people have built third-party tools that claim to
  downgrade worlds. On a **copy**: investigate what exists and what actually
  happens to a world pushed backwards in time. The outcome is genuinely unknown
  from where you're standing — and on a copy, finding out costs nothing.
- Open one of the files in `region/` with VS Code and look at it. What *is*
  that? See what you can find out about the format —
  [a later lesson](../world-data-and-protocol/guided.md) takes those files apart
  properly, but there's no harm in arriving early.
- Put a second copy of a backup somewhere that isn't this machine: a USB stick,
  another computer, a cloud-synced folder. Then work out the remaining risk:
  what's the worst case if a sync runs *while the backup copy is being written*?
- Backups get big. There's a command called `tar` that bundles a whole folder
  into a single compressed file. Investigate `tar -czf`: how much smaller does a
  world get — and what does it cost you on the day you need it back in a hurry?
- Run the backup script twice on the same day and look very closely at what the
  second run created. `cp` has an opinion about copying onto something that
  already exists. How would you change the script so running it twice is always
  safe?
- The server saves on its own rhythm whenever saving is on. Find the interval —
  by evidence first (`ls -l` timestamps? something in the log?), then check your
  measurement against the wiki. And is there any way a player *could* detect,
  from inside the world, that saving was off?
- The Mac's filesystem, APFS, can snapshot an entire disk in effectively an
  instant. If the photo takes no time, does the subject still need to hold
  still? Investigate — the answer is subtler than it looks.
- How many backups should anyone keep, and for how long? Some Minecraft worlds
  have been kept alive for over a decade across machine deaths and version
  upgrades — and the big public servers back up worlds thousands of times larger
  than yours, with hundreds of players online, and nobody ever notices. What do
  the people who do this actually do? Some of it is public — talks, blog posts,
  open-source tools — and some genuinely isn't. Find what you can; there's no
  complete answer waiting anywhere.

---

## What you have now

- `world-experiments` — a full copy of your world the server can be switched to,
  officially expendable: breaking things there is free, forever
- You've switched a server between worlds with `level-name`, generated a world
  from an empty name, and destroyed something on a copy while the original slept
- `backup.sh` — your first shell script, executable, one command to protect
  everything — and at least one dated backup in `~/backups`
- A restore you have personally performed: world destroyed, world resurrected,
  destruction erased — your backups are proven, not hoped
- The hot-backup procedure, performed by hand and understood — save-off, flush,
  wait for the line, copy, save-on — and `hot-backup.sh`, with one precisely
  named gap: scripts can't type into the console *yet*
- The copy-first reflex: experiments happen on copies, and nothing is ever the
  only copy of itself for long
- Words later lessons will use freely: script, shebang, executable, command
  substitution, restore, consistency, flush, snapshot
