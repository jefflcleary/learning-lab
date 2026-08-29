# Tracking your server files with git

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your server folder has been accumulating things you made: settings you chose,
datapacks you wrote, a backup script you built. Right now, all of it exists in
exactly one version — the current one. Change a file and the old version is simply
gone. Break a datapack while experimenting and your options are memory, luck, or
digging through a whole world backup for one small file.

This session fixes that with **git**, a tool that has been sitting on your machine
since you set it up for coding, waiting for today. git records versions of files:
snapshots of your folder, taken when you say so, kept forever, each with a note in
your own words about what changed and why. After today, every experiment on a file
you've made is free — because any file can be returned to any snapshot.

One thing said plainly up front, because it shapes the whole session: git is for
what you *write* — settings, datapacks, scripts. It is the wrong tool for the world
folder, which is enormous, not human-readable, and changing every second the server
runs. The world already has its protection: your backups. Code in git, data in
backups — that division isn't a workaround, it's how real server operations are run
everywhere, and today you'll draw the line yourself.

---

## Before you start

You need:

- **A computer set up for coding, with git installed.**
  [Setting up a coding machine](../../../dev-machine/lessons/dev-machine-setup/guided.md) covered it. Quick check:
  `git --version` in a terminal prints a version number.
- **A server folder with things you made in it.** At least one datapack of your own
  — [Building datapacks: custom recipes and functions](../building-datapacks/guided.md) gets you there — and a backup script,
  from [Copying and backing up worlds](../worlds-and-backups/guided.md). Quick check: `ls world/datapacks` in your server
  folder shows a datapack you built, and your backup script exists (for most people
  that's `backup.sh` in the server folder).

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A history for your server folder: snapshots of everything you've made, each one
  labeled in your own words
- A settings file that draws the code-versus-data line, so git tracks what you
  wrote and ignores what the server generates
- Run the daily rhythm real programmers run — change, inspect, record — on a real
  change to a real datapack
- Deliberately destroyed a file you care about and brought it back with one
  command, so you know the safety net holds before you ever need it

---

## New tools

**git** is a version recorder for files. On command — never automatically — it
takes a snapshot of the files you've told it to watch, attaches your name, the
date, and a message you write, and files the snapshot away forever. It was
installed during machine setup and hasn't been touched since; there is nothing more
to install. Its real documentation is built in — `git help <command>` opens the
manual for any command — and the same pages live at
[git-scm.com](https://git-scm.com/docs).

One piece of one-time setup: every snapshot is stamped with an author, and git
refuses to guess. Tell it who you are (these two are fine to copy):

```
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

Use a real name and email you're happy seeing in your own history — the stamp goes
into every snapshot. As long as this history stays on your machine, that's as
private as any other file you own.

Today's complete toolkit is six commands: `git status`, `git diff`, `git add`,
`git commit`, `git log`, `git restore`. That's the whole surface of this session —
when you know those six, you know where you are.

**.gitignore** is a settings file you'll write partway through: plain text, one
entry per line, `#` for comments — the same family as `server.properties`. Its job
is the opposite of everything else in git: it lists what git must *never* track.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- git will keep every version of every file it tracks, forever. Where, physically,
  do you think the old versions are stored? Your folder is all there is — so where
  would they have to live?
- Imagine git *did* track the world folder while the server runs. World files
  change every few seconds. What would a complete history of that even look like,
  and how big would it get?
- After you switch git on in a folder, do you think it starts recording changes
  immediately, or waits to be told? Which way would *you* design it, and why?

---

## The work

### Introduce yourself, then switch it on

If you haven't run the two `git config` lines from the tools section, run them now.

Then, in a terminal, go to your server folder and type — don't paste — the command
that turns a folder into a **repository**, which is git's word for a folder with a
history:

```
git init
```

Read everything it prints. It may mention branch names — read that too; output you
skim today is output you can't remember tomorrow.

Now look at what changed. Run `ls` — nothing new. Run `ls -a` — the `-a` means
*all*, and it reveals entries whose names start with a dot, which the terminal
hides by convention. There it is: a folder called `.git`. Check your first
prediction, because this is the answer: every snapshot you ever take will live
inside that hidden folder, as ordinary files. The `.git` folder *is* the history.
Look at it from the outside for now; rearranging things in there is the one way to
hurt yourself with git.

### Ask the always-safe question

Type:

```
git status
```

This is the question you can ask at any moment, in any state, without changing
anything: *what do you see?* Read the whole answer, every section — out loud is
allowed.

What it shows is a folder full of things git calls **untracked**: files it can see
but has been told nothing about. Notice what this means, and check your prediction
about it: git has recorded nothing. It never records anything on its own. A
version recorder that acted without being told would be a version recorder you
couldn't trust — every snapshot in your history will exist because you asked for
it.

### Draw the line between code and data

That untracked list is a mixture, and sorting it is the real thinking of this
session. Your goal: a `.gitignore` file such that `git status` lists **only things
you made**.

Work directly from the status output. For every entry, ask one question: *did I
write this, or did the server?*

<details>
<summary>Stuck? Start here</summary>

Three categories are hiding in that list:

- Files you typed: `server.properties` (you've edited every interesting line of
  it), your backup script, your datapacks.
- Files the server generated: logs, and any folders the server unpacked next to
  itself when it first ran. If you don't remember creating it, the server did.
- The world itself — which is neither code nor junk. It's *data*, it's huge, and
  it already has a protector: your backup script.

Only the first category belongs in git.

</details>

<details>
<summary>Writing the file</summary>

Create a file named exactly `.gitignore` in the server folder (VS Code is fine;
the leading dot means it'll be hidden from `ls` without `-a`, like `.git`). One
pattern per line; a name ending in `/` ignores a whole folder; `#` starts a
comment.

Write the obvious lines first — the server-generated folders, and `backups/` if
your backups live inside the server folder — saving and re-running `git status`
after each line. Watch the untracked list shrink. That shrinking list is your
feedback loop: you're done when everything left is something you made.

</details>

<details>
<summary>The wrinkle — your datapacks live inside the world</summary>

If you ignored `world/` whole, run `git status` and look closely: your datapacks
vanished from the list too. They live at `world/datapacks/` — inside the very
folder you just told git to never look at. And here's the trap: once a directory
itself is ignored, git doesn't peek inside it at all, so no clever line further
down can rescue a subfolder.

The gitignore rules have two pieces you need: a `!` at the start of a pattern
means *except this*, and exceptions only work if git is still looking inside the
parent folder. So the move is: don't ignore the world — ignore the world's
*contents*. `man gitignore` documents the pattern language if you want the full
rules (and it's worth a skim just to see how small the language is).

</details>

<details>
<summary>A worked answer — compare after yours works</summary>

```
# world data belongs to backups, not git
world/*
!world/datapacks/

# written by the server, re-creatable
logs/
libraries/
versions/

# backups are data
backups/
```

Line by line: `world/*` ignores everything *inside* the world folder — but not
the folder itself, so git still looks in. `!world/datapacks/` then carves out the
exception. The rest only belongs if it exists in *your* folder — the list comes
from your `git status`, not from anyone else's server. And if you someday keep
several world folders side by side, the patterns generalize with wildcards
(`world*/*` and `!world*/datapacks/`).

</details>

One more satisfying detail: run `git status` a final time. `.gitignore` itself
shows up as untracked. Should the file that draws the line be tracked? Yes — it's
a decision you made, written down, which is exactly the category git exists for.

### The first photograph

Time to record. Committing is a two-step: first you **stage** (choose what goes in
the snapshot), then you **commit** (take it, with a message).

Stage the things you made — adjust the list to what actually exists in your
folder:

```
git add .gitignore server.properties backup.sh world/datapacks/
```

Run `git status` again and see how differently it reads: those files are now
listed as ready to be committed. Then take the snapshot, with a message that
answers "what is this?" for a future you who remembers nothing:

```
git commit -m "First snapshot: settings, datapacks, backup script"
```

— in your own words, though; the message is yours. Then look at what you've made:

```
git log
```

One entry: an id, your name, the date, your words. (If the log opens in a pager,
`q` gets you out.) That's the first page of a history.

### The loop, on a real change

Now the rhythm this tool is actually for. Open one of your datapacks and make a
small, deliberate change — one value in a function or a recipe, something you can
name. Save it. Then run these in order, and *read each one before moving on*:

1. `git status` — one file, listed as modified. git noticed, and waited.
2. `git diff` — this is the one to slow down for. What you're looking at is the
   exact difference between your folder and the last snapshot: the old line with a
   `-` in front, the new line with a `+`. Not roughly what changed — *precisely*
   what changed, to the character, guaranteed. You've been typing datapacks by
   hand instead of pasting them since the beginning; this is where that pays off.
   You can read this diff because you chose every character in it.
3. `git add` the changed file.
4. `git commit -m` with a message saying what you changed and why.
5. `git log` — two entries. It's a history now.

That five-step rhythm — change, status, diff, add, commit — is the daily loop of
essentially every programmer on earth. There is no step six. You now know it.

### The safety net

You've been told any experiment on a tracked file is now free. Don't take that on
faith — prove it, on purpose, before you ever need it in anger.

Open a datapack file that's safely committed. Now wreck it: select all, mash the
keyboard, save. Really wreck it. Run `git diff` if you want to see the carnage
itemized — every `-` line is something you just destroyed. (For the full effect,
try reloading it in the game and watch it fail.)

Now bring it back.

<details>
<summary>Stuck? Start here</summary>

git holds a photograph of this file from your last commit, and what you want is
the file returned to the photograph. Here's a habit worth keeping: run
`git status` and *read what it says* — git's output has been quietly naming the
command for discarding changes this whole time.

</details>

<details>
<summary>The command</summary>

```
git restore world/datapacks/path/to/the/file
```

Open the file. It's back — not approximately, *exactly*, to the character, as
committed. That's the safety net, and now you've stood on it.

</details>

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Watch restore destroy.** The safety net has one edge, and you should meet it
today, on your terms. Make a small edit to a tracked file — and this time pretend
it's an edit you care about. Don't commit it. Now run `git restore` on that file,
and then try to get your edit back.

You can't. It's gone — not in the history, not in a trash can, gone. `restore`
means "return to the last photograph," and it gets there by throwing away
everything since — and git never took a photograph of your uncommitted edit.
Every other command you learned today adds to history; `restore` is the one that
destroys, and what it destroys is precisely *work you haven't committed yet*. The
habit this buys is simple: commit before experimenting, and `restore` can only
ever eat experiments. Nothing to undo here — that's the lesson; retype the edit if
it was real.

**The empty message.** Stage any small change, then try:

```
git commit -m ""
```

Read git's refusal in full — the actual words. git will not take a snapshot with
no explanation attached. It's a small, opinionated defense of future-you, who will
one day scroll `git log` looking for *why*, and it tells you what git thinks a
history is for: not the what — the diff already knows the what — the *why*. Commit
again with words in it.

---

## What just happened

A **commit** is a photograph of every tracked file at a moment you chose, stapled
to a note saying why. The hidden `.git` folder holds all the photographs — take
one look inside now, `ls .git`, and see the machinery: folders named `objects`,
files named `HEAD`, `config`. Just files. That's the mundane answer to where
history lives, it's why deleting `.git` would delete the history, and it's why you
look but don't touch.

The line you drew in `.gitignore` is the same line drawn in every serious
operation on earth: version control for *decisions* — code, configs, things a
person wrote — and backups for *data* — the big, opaque, ever-changing stuff that
accumulates. Your setup now has both halves: git watching what you write, your
backup script guarding the world. A quiet bonus of the line: since git never
tracks the files the server is writing, running git commands while the server is
up can't collide with it — the two tools own different territory.

And this same tool is how everything is built. Every piece of software on your
machine is a pile of commits made by people leaving messages for each other and
for their future selves. This lab reaches you the same way — it lives in a public
git repository. The natural next step for *your* history is
the same place: a GitHub account, and a push that puts your `git log` on the web.
That step is left for you below, because it's yours to take.

---

## Go further

- Your history currently lives on one machine — the same machine as the files,
  which a backup-minded person might notice. GitHub is where git histories go to
  live on the web: a free account, one connection, and `git log` becomes a page
  you can show anyone. GitHub's own documentation walks through creating an
  account and connecting git to it — the steps change often enough that their
  current docs are the only version worth following.
- This lab lives in a public git repository —
  [How this project is put together](../../../../about-this-repo.md) says where. Find
  it and read its commit history. What can you learn about how a thing was made
  from nothing but its history?
- Months from now, `git log` will answer "when did I change pvp, and why?" without
  your memory's help — that's automatic. But messages are written on purpose. What
  else could your history become if you wrote for it — a server diary? A changelog
  your players can read?
- Genuinely open: git is the wrong tool for the world folder because worlds are
  huge, binary, and always changing. Could a version-history tool for *worlds*
  exist — commit, diff, restore, but for terrain? What would it have to do
  differently from both git and your backup script? People have tried. Nobody has
  fully cracked it.

---

## What you have now

- Your server folder is a repository: everything you've made is under version
  control, with a `.gitignore` drawing the code-versus-data line
- A history of at least three snapshots in your own words, which `git log` will
  recite on demand — the story so far of everything you've built
- Six commands you've used for real: `status`, `diff`, `add`, `commit`, `log`,
  `restore` — and the knowledge, earned deliberately, that `restore` is the one
  that destroys
- From now on: any experiment on a tracked file is free
