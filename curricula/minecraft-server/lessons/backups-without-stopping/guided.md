# Backing up a world that won't sit still

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your backups work — you've proven that personally, by destroying a world and
bringing it back. But every one of them starts with `stop`, and `stop` kicks
everyone off the server, every time. A backup routine that ends the evening for
your friends is a backup routine that quietly stops getting run.

The obvious dodge — just copy the world while the server runs — is one you've
already tested. You copied a moving world once, on purpose, and the honest
result was that you can't know what you got: the server was writing the files
while `cp` was reading them, and a copy like that is a photo of a moving
subject. Useless exactly when you'd need it.

This session is the real answer, and it's built into the server: commands that
tell it to stop writing the world to disk, finish everything it was in the
middle of, hold still while you take the copy, and then carry on — all while
everyone stays connected and nobody notices a thing. You'll do it by hand at
the console, prove the copy is trustworthy, and then teach your backup script
the procedure — right up to the point where you discover the one thing a script
can't do yet.

---

## Before you start

You need:

- **A backup script, and a restore you've actually performed.**
  [Protecting other people's things](../backups/guided.md) is where both happen. Quick
  check: `./backup.sh` from the server folder produces a dated copy in
  `~/backups`, and you can describe the restore procedure from memory.
- **A console you can type live commands into**, and the habit of reading what
  it answers — established in [Console commands](../console-commands/guided.md). Quick
  check: with the server running, you can type a command into its terminal and
  point at the line it printed back.
- **An experiments world slot** the server can be switched to, from
  [A world is a folder](../worlds-and-copies/guided.md). Quick check: you can say what
  `level-name` does and what `world-experiments` is for.

---

## What you'll have at the end

By the end of this session you will have:

- Backed up the world while the server was running and people were on it —
  nobody kicked, nobody interrupted, nothing noticed
- Proven the copy by restoring it and walking around inside it
- A second script, `hot-backup.sh`, that walks you through the live procedure
  and does the copying itself
- Met — by name, with your own hands — the consistency problem that every
  database on earth shares with your Minecraft server

---

## New tools

**The server's save commands.** The server takes console commands that control
its own saving — one that suspends writing world files to disk, one that forces
everything currently held in memory out to disk, and one that resumes normal
saving. Their names are `save-off`, `save-all` (with a `flush` variant), and
`save-on` — but the precise behavior and, importantly, the exact lines they
print when they've worked are for the wiki to tell you, not this page. That's
your first task below.

**`ls -l`** — the long form of `ls`: one line per file, including size and the
time each file was last modified. Today it's your instrument for seeing whether
the server is writing or holding still.

Nothing to install. The whole technique ships inside the server you already
run.

---

## Predict

Write your answers down first:

- While saving is off, your friends keep playing normally. Where do their
  actions live during that window? What would a power cut during that window
  cost?
- Will the players online notice anything at all during the procedure?
- The wiki lists both `save-all` and `save-all flush`. Why would both exist —
  what's the difference between *starting* to save everything and *finishing*
  saving everything?

---

## The work

### Confirm the tools at the source

On [minecraft.wiki](https://minecraft.wiki), find the documentation for
`save-off`, `save-all`, and `save-on` — search the wiki for `save-off`, or find
the Commands page and work from there.

Pin down, in writing: what each command does, and what line each prints when it
has done it. The confirmation line for `save-all flush` matters most — in the
procedure you're about to run, that line is the go signal, and you need to
recognize it on sight.

### A hot backup, by hand

Goal: with the server **running** and at least one player connected — you
count, though a friend online turns this from a test into a demonstration —
produce a copy of the world you have reason to trust. No `stop`. Nobody
disconnected.

You'll know you've done it right when: the flush confirmation line appeared
*before* you started copying, `save-on` went in after the copy finished, and
whoever was online reports that nothing happened at all.

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
backup script already makes dated copies, or `cp -R` by hand into `~/backups`
from a second terminal. When the copy is done: `save-on`. That last command is
not optional, and the break-it section below is about what happens when it's
forgotten.

</details>

While the copy runs, ask whoever is online what they're experiencing. The
answer should be: nothing. The world never stopped — you'll see why in a
moment.

### Trust, then verify

A hot copy you haven't opened is exactly as trustworthy as the torn copy from
your live-copy experiment — which is to say, unknown. Goal: prove this copy is
a world, not a hope, by restoring it into the experiments slot and walking
around in it.

<details>
<summary>Stuck? Start here</summary>

The experiments slot exists to be overwritten — that was its job description
from the day you made it. A restore is a copy plus a name the server opens: you
know which setting picks the folder, and you know restores are done by copying,
never by moving the backup. Which folder name does the hot copy need to sit
under for the server to open it as the experiments world?

</details>

Join it and look around. The builds from today should be there, right up to
roughly the moment of the flush. When you've seen it, point the server back at
`world`.

### Teach the script — and find its limit

Goal: `hot-backup.sh` — the live procedure, as a script.

But before writing anything, a prediction, and it's the interesting part of
this whole section: could the script itself run `save-off`? Suppose a line of
the script said `echo save-off` — what would actually happen?

Think it through, or try it. The answer: the words `save-off` get printed to
the script's own output, and that's all. The server console reads keystrokes
from its own terminal window; your script is a different program running in a
different terminal. It can print whatever it likes — the server never hears
it. **The script has no hands.** It cannot type into the console, and right
now, nothing you know can bridge that.

Sit with that for a second, because the gap is real. Then know this: it's
closable. There's a thing called RCON — a way the server lets *other programs*
send it console commands over a network connection. You've even read past its
switch once: `enable-rcon`, sitting quietly in `server.properties`. Wiring
that up is [its own lesson](../rcon-scripting/guided.md), and the script you're about
to write is the one that gets upgraded there.

Today's honest version: a script that automates what it can (the dated copy —
it already knows how) and walks its human through what it can't — printing
instructions for the console half, and pausing while you carry them out.

<details>
<summary>Stuck? Start here</summary>

Your `backup.sh` already does the middle of the procedure. What has to happen
before its copy line, and what has to happen after? Neither is something the
script can *do* — but both are things it could *say*, if it had a way to wait
for you in between.

</details>

<details>
<summary>The missing piece, named</summary>

`echo` prints the instructions — that much you have. For the pause, bash has a
builtin command called `read`, whose day job is waiting for the human to type
something and press return. How to use it is yours to look up: type
`help read` at a bash prompt, or find any bash reference. That's the whole
missing piece — instructions, pause, copy, instructions.

</details>

Done when: running `./hot-backup.sh` tells you what to type at the console,
waits while you do it, makes the dated copy, and then tells you what to type
to finish the job.

---

## Break it on purpose

**Forget save-on.** The procedure's last step is the one nothing forces you to
do — so skip it, deliberately, and find out what that world feels like.

Run the procedure but stop after the copy: saving stays off. Now keep playing.
Build a pillar, dig a hole, note the time. The world behaves perfectly — and
that's the trap. Go look at the evidence: `ls -l world/region`, twice, a minute
apart. The modification times have stopped moving. The world is running; its
diary has stopped being written.

Now the reasoning exercise — strictly hypothetical, no cords get pulled: if
this machine lost power right now, what exists on disk? The world as of the
flush. The pillar, the hole, and everything anyone has done since live in
memory and nowhere else. And notice there's no time limit on this: saving
stays off until someone turns it back on — an hour, a day, a week of play,
all of it one crash away from never having happened. Find out whether the
server ever warns you about this state. Read what you find carefully.

Turn it back on: `save-on`, then a `save-all` for good measure, then watch the
timestamps in `world/region` start moving again.

What this teaches is why the procedure is a *procedure*: some steps come in
pairs, and the whole thing is a promise that the last step happens. Humans
forget last steps — which is why your script walks through all of them in
order, and why giving the script real hands
([the RCON lesson](../rcon-scripting/guided.md)) makes this safer still.

---

## What just happened

The word for today's problem is **consistency**.

A copy of files that are being written is a photo of a moving subject: different
parts of the image come from different instants, and the whole may not describe
any moment that ever actually existed. That's precisely what was wrong with the
live copy you took in the moving-world experiment — not that it was damaged,
but that it was *unknowable*.

`save-off` plus `save-all flush` is asking the subject to hold still. The first
stops new writes from starting; the second finishes every write already in
flight. After both, the files on disk describe one single instant — and they
keep describing it, however long your copy takes, until `save-on` lets time
resume.

And the world never paused, because of something you've known since your first
settings change: the server runs the live world from *memory* and treats the
disk as its diary. Saving off doesn't stop the world — it stops the diary.
Your friends kept playing inside the memory copy the entire time.

Here's the reach of what you just did: every database on earth — the ones under
banks, games, hospitals, everything — has this exact problem. Data that must
be copied while something is actively changing it. And every one of them uses
some version of this exact answer: pause writes, flush, take the copy, resume.
Out there it's called taking a *consistent snapshot*. You've now taken one by
hand, at a console, while the people it protects played on without noticing.

---

## Go further

- The server saves on its own rhythm whenever saving is on. Find the interval —
  by evidence first (`ls -l` timestamps? something in the log?), then check
  your measurement against the wiki.
- Did whoever was online notice anything at all? Is there any way a player
  *could* detect, from inside the world, that saving was off?
- The Mac's filesystem, APFS, can snapshot an entire disk in effectively an
  instant. If the photo takes no time, does the subject still need to hold
  still? Investigate — the answer is subtler than it looks.
- The big public servers back up worlds thousands of times larger than yours,
  with hundreds of players online, and nobody ever notices. What do they
  actually do? Some of it is public — conference talks, blog posts,
  open-source tools — and some genuinely isn't. Find what you can; there's no
  complete answer waiting for you anywhere.

---

## What this leaves behind

- The hot-backup procedure, performed by hand and understood: save-off, flush,
  wait for the line, copy, save-on
- `hot-backup.sh` — the copy automated, the console half walked through, and a
  precisely named gap: scripts can't type into the console *yet*, and
  [the RCON lesson](../rcon-scripting/guided.md) is where they learn to
- Backups that no longer cost your friends anything: the world gets protected
  while they keep playing, which is the whole point
- Words that later lessons will use freely: consistency, flush, snapshot
