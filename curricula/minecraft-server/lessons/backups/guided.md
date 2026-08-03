# Protecting other people's things

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

There was a time when losing your world would only have stung you. That time is
over: other people play on your server now, and their builds live in your `world`
folder, on your machine — which is one power cut, one failed disk, one careless
command away from taking all of it with it. When it was just your world, a backup
was a chore. Now it's protection, and the things it protects aren't all yours.

A backup is a dated copy of the world, kept somewhere else, left alone. This
session you'll make one — and then, because typing the same commands every time is
exactly what computers are for, you'll write your first **shell script**: a saved
file of commands that makes the backup for you, the same way, every time.

Then comes the part most people skip, and the reason most people's backups turn
out to be worthless: you will deliberately destroy the world, restore it from your
backup, and watch the destruction never have happened. A backup nobody has
restored is a hope, not a backup. Yours is getting proven today.

---

## Before you start

You need:

- **To know that worlds are folders you can copy** — and to have an experiments
  world sitting next to the real one. [A world is a folder](../worlds-and-copies/guided.md)
  establishes both. Quick check: you can say what `level-name` does, and
  `ls ~/projects/mc-server` shows a `world-experiments` folder.
- **Other people playing on your server** — builds in the world that aren't
  yours. [Joining over LAN](../joining-over-lan/guided.md) is where that starts. Quick
  check: you can walk to something in the world a friend built.
- **A server you can start and stop.**
  [Running your own server](../running-your-own-server/guided.md) gets you there. Quick
  check: start it, wait for the **Done** line, type `stop`.

---

## What you'll have at the end

By the end of this session you will have:

- Written and run your first shell script — a real program file, executable,
  that backs up the world with one command
- A dated backup of the world in a separate folder, made by that script
- Destroyed the world on purpose, restored it from your backup, and proven the
  destruction never happened
- The knowledge — not the belief, the knowledge — that everyone's builds on your
  server can survive a disaster, because you've already run the disaster

---

## New tools

**A shell script** is a plain text file full of terminal commands, which the shell
runs top to bottom. Nothing more mysterious than that: the same commands you'd
type, saved. Saved commands don't get mistyped, don't get skipped because it's
late, and run the same on the hundredth day as the first.

**`date`** is a command that prints the current date and time. It can be told the
exact format to print in — you'll use that to put today's date into a folder name.

**`mkdir -p`** is `mkdir` with a manner: create the folder if it's missing, say
nothing if it already exists (plain `mkdir` complains about existing folders,
which a script run daily would trip over).

**`chmod +x <file>`** marks a file as executable — permission for it to be *run*,
not just read. New scripts need it once.

**`mv <from> <to>`** moves or renames — same command, same idea: it changes what a
thing is called or where it sits, without copying anything.

No installs today. Everything above ships with the Mac.

---

## Predict

Write your answers down first:

- If this computer died right now, permanently: what exists in the `world` folder
  and nowhere else on earth? Whose builds are on that list besides yours?
- The script you're about to write contains the same copy command you've already
  run by hand. What can a saved file of commands do that your hands can't?
- The backup's folder name will include the date. What *should* happen if the
  script runs twice on the same day — and what do you think will actually happen?

---

## The work

### One backup by hand

Stop the server. Make the place backups will live — a separate folder, outside
the server's folder:

```
mkdir -p ~/backups
```

Now copy the world into it, with today's date in the name, typed by hand in
year-month-day form:

```
cp -R world ~/backups/world-2026-07-31
```

(Your date, not that one.) Check it landed: `ls ~/backups`.

That's a real backup — dated, elsewhere, and about to be left alone. Note the
difference from `world-experiments`: that copy is *for use* — you play in it, it
drifts away from the original. A backup is *for disaster* — nothing touches it
again unless the day comes.

Now say the flaw out loud: a human typed that date. Tomorrow the human mistypes
it, or decides the whole thing is a chore and skips it. A backup that depends on
diligence is a backup that stops happening. Chores that must happen the same way
every time are what machines are for.

### Teach the machine the date

Run these two, and look at what each prints:

```
date
date +%Y-%m-%d
```

The `+` part is a format — an order slip for exactly what to print: `%Y` the
year, `%m` the month, `%d` the day. That second command prints precisely the
thing you typed by hand a minute ago.

Which leaves one question standing between you and a script, and it's the only
real puzzle today: how do you use one command's *output* inside another command?

### Write the script

In VS Code, in the server folder, create a new file called `backup.sh` — `.sh`
for shell. Here is the whole script with the two load-bearing pieces blanked out.
Type it — don't paste it — and fill the blanks:

```bash
#!/bin/bash

mkdir -p ~/backups
cp -R ______ ~/backups/world-______
echo "Backup finished. Contents of ~/backups:"
ls ~/backups
```

About that strange first line, because you can't be expected to guess it: `#!` at
the top of a file (people call it the **shebang**) tells the operating system
which program should read and run the rest of the file. This file says: hand me
to `bash`. bash is a shell — the same kind of program as the zsh inside your
terminal, a slightly different dialect of the same language — and it's the one
scripts conventionally declare. `echo` just prints text, so the script reports
what it did.

The blanks: first, what to copy. Second, how today's date gets into that folder
name without any human typing it.

<details>
<summary>Stuck? Start here</summary>

The first blank is exactly what you typed in the by-hand version — the script
will be run from the same folder you were standing in.

For the second: you now have a command that *prints* today's date. The question
is how a command's printed output can appear in the middle of another command's
line. The shell has a feature for precisely this.

</details>

<details>
<summary>The concept, named</summary>

It's called **command substitution** and it looks like `$(some command)`. When
the shell meets it, it runs the inner command first, takes whatever that command
printed, pastes it into the line right there — and then runs the line. The
machinery for "put this command's answer inside that command."

</details>

<details>
<summary>The specific piece</summary>

The second blank is `$(date +%Y-%m-%d)` — the shell runs `date +%Y-%m-%d`, gets
today's date, and pastes it onto the end of `world-`.

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

Refused — permission denied. New files aren't allowed to *run* until someone says
so; that's a safety default, and you are the someone:

```
chmod +x backup.sh
./backup.sh
```

Two small things about `./` while it's in front of you: when you type a bare
command name, the shell searches a fixed list of folders (its PATH — you met the
idea when a program you'd just installed suddenly "worked"). Your server folder
isn't on that list, and shouldn't be. `./backup.sh` says: no searching — this
folder, this file.

Watch it run. Check `~/backups` for today's dated folder, and `du -sh` it against
`world` — twins. You have written a program. It's four lines and it protects
everything your friends have built.

### The restore drill

Here is the sentence this whole session exists for: **a backup nobody has
restored is a hope, not a backup.** Files can copy incompletely. Scripts can have
quiet bugs. The only way to know a backup works is to need it and watch it
deliver — so you're going to manufacture the need.

The drill: destroy the world, then restore it so completely that the destruction
never happened.

First, a fresh backup. Run the script. Look in `~/backups` and confirm today's
folder is there — look *inside* it, see the `region/` folder, the `level.dat`.

Now the destruction, and an honest word about where to do it. You could run this
drill on `world-experiments` — the mechanics are identical, and it proves the
mechanism. But the drill proves the most when the world you resurrect is one
you'd actually mourn: doing this to the real world, thirty seconds after backing
it up, is the braver and better lesson, and the fear you feel pouring the lava is
exactly the fear the backup exists to delete. Your call, genuinely. Either way:
wreck something of your own, not a friend's build — the drill needs a loss *you*
feel.

Start the server, join, and do it. Lava over your own base. A crater where
something you loved stood. Make it hurt a little. Look at it.

Stop the server. Now: make the server open a world where none of that happened —
while keeping the wreck. Even wreckage doesn't get deleted while it's the only
copy of itself; the copy-first habit doesn't take days off.

<details>
<summary>Stuck? Start here</summary>

The server opens whatever folder `level-name` names — right now that's `world`,
which currently holds a smoking ruin. So there are two possible moves: change
*which name* the server opens, or change *what sits at the name* it already
opens. Both would work. The standard shape — the one every server admin on earth
uses — is the second.

</details>

<details>
<summary>The shape of it</summary>

Set the ruin aside by renaming it — `mv` does that. Then **copy** the backup in
under the name the server expects. Copy, never move: the backup itself stays in
`~/backups`, untouched. A restore that consumes its backup has protected you
exactly once, which is to say: not next time.

</details>

<details>
<summary>The commands</summary>

```
mv world world-wrecked
cp -R ~/backups/world-2026-07-31 world
```

(Your date.) Then start the server.

</details>

Join. Walk to where the lava was.

It never happened. The base is whole, the chests are full, and the world has
moved backwards in time because you parked a copy of the past where nothing
could touch it. That feeling is what a working backup is. When you're satisfied,
glance at `level-name` (habit), then delete `world-wrecked`.

---

## Break it on purpose

**Restore to the wrong name.** The classic restore fumble, run on purpose so the
real version never scares you. Stop the server, set `world` aside again
(`mv world world-aside`), and this time copy the backup to a typo:

```
cp -R ~/backups/world-2026-07-31 wolrd
```

Start the server and join. A brand-new world — nothing familiar in any direction.

Now read the situation *before* touching anything, because this exact moment,
reached by accident at midnight, reads as **everything is gone** — and it never
is. Run `ls`. The real world is sitting right there as `world-aside`. The backup
is untouched in `~/backups`. The fresh nothing-world you're standing in is the
server doing exactly what [you watched it do before](../worlds-and-copies/guided.md):
`level-name` pointed at a name where nothing existed, so it generated. Worlds
don't vanish. Names miss. The calm inventory — *what folders actually exist right
now* — beats every panicked conclusion, every time.

Fix it: stop the server, delete the accidental fresh world and the typo folder,
and put things back (`mv world-aside world`, or redo the copy properly).

**Run the script from the wrong folder.** Go home — `cd ~` — and try
`./backup.sh`. Refused: no such file here; the script lives in the server folder.
So run it by its full path: `~/projects/mc-server/backup.sh`. It starts — and
`cp` fails: there's no `world` *here*. A script runs in the folder **you** are
standing in, not the folder the script lives in. That's the working-directory
idea collecting another toll, and it's worth paying now: this exact confusion is
the classic reason automated scripts fail years into people's careers. Nothing to
undo — the failed run copied nothing. `cd` back.

---

## What just happened

You moved a world backwards in time. That's the whole trick of backups, and now
that you've done it once, three design questions answer themselves:

**Why dated?** Because disasters are discovered late. Corruption that happens
Tuesday and gets noticed Thursday needs Monday's backup. A backup made *after*
the disaster is a corrupted backup of a corrupted world, which helps no one —
which is also why you keep several, not one.

**Why elsewhere?** A backup inside the server folder dies with the server folder
— one bad delete, one failed disk, and both copies go together. A different
folder is the minimum. A different machine is the real answer. And notice
something about the rule you learned when you first set up the server — never
put the live server in a cloud-synced folder: that rule was always about a sync
tool fighting a program *mid-write*. A finished backup is never written again,
so cloud-synced folders are perfectly fine for `~/backups`. Same facts, opposite
conclusions, and now you can derive both.

**Why a script?** Because today you told the shell a *procedure* instead of
performing one, for the first time. Anything you can type can be saved; anything
saved runs identically every time — when it's early, when you're bored, and
eventually when no human is present at all. That last one is a later lesson, and
the four-line script you wrote today is the one that will grow into it. For
making backups without shutting the server down on your friends — that's
[its own lesson](../backups-without-stopping/guided.md), and it builds on exactly what
you made today.

---

## Go further

- Put a second copy of a backup somewhere that isn't this machine: a USB stick,
  another computer, a cloud-synced folder. Then work out the remaining risk:
  what's the worst case if a sync runs *while the backup copy is being written*?
- Backups get big. There's a command called `tar` that bundles a whole folder
  into a single file and compresses it. Investigate `tar -czf`: how much smaller
  does a world get — and what does it cost you on the day you need it back in a
  hurry?
- Run the script twice on the same day and look very closely at what the second
  run created. `cp` has an opinion about copying onto something that already
  exists. How would you change the script so that running it twice is always
  safe?
- How many backups should anyone keep, and for how long? Some Minecraft worlds
  have been kept alive for over a decade, across machine deaths and version
  upgrades. What do the people who keep worlds alive that long actually do — and
  is there any backup schedule that survives *every* disaster you can invent?
  Nobody has the complete answer written down anywhere.

---

## What this leaves behind

- `backup.sh` in the server folder — your first shell script, executable, one
  command to protect everything
- At least one dated backup in `~/backups`, outside the server folder
- A restore you have personally performed: world destroyed, world resurrected,
  destruction erased — your backups are proven, not hoped
- Words that later lessons will use freely: script, shebang, executable, command
  substitution, restore
