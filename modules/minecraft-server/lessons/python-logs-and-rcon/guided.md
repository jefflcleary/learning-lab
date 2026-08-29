# Reading logs and sending commands with Python

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Since the first time your server ran, it has been writing down everything that
happens — every join, every chat message, every death, every warning — into a
file called `logs/latest.log`, with older days compressed and filed beside it.
Nobody asked it to. Nobody has read it. It's a complete diary of your world,
accumulating quietly in a folder you already own.

This session is in two movements. First you read that diary with a program:
you'll write your first Python — a second programming language, introduced on
purpose and explained below — and use it to answer questions the diary has been
waiting to answer, ending with a join leaderboard computed from real history.
Then you'll hit a wall: the script can compute the standings but has no way to
announce them, because a program can't type into the server's console window.
The second movement knocks that wall down with **RCON** — the server's
remote-control door — and by the end your server talks on a schedule and greets
players by name the moment they join, with nobody at the keyboard.

Install steps in this lesson are fine to copy and paste. The programs
themselves you type by hand.

---

## Before you start

You need:

- **A server that has been played on.** [Running your own
  server](../running-your-own-server/guided.md) gets you the server; the more it's
  been played, the better the data. If several people have joined over time —
  [Letting friends join](../letting-friends-join/guided.md) — the results get much
  more interesting, but one player's history still works. Quick check:
  `ls logs` inside your server folder shows `latest.log` and at least a few
  other files.
- **A machine set up for coding** — terminal and VS Code, from [Setting up a
  coding machine](../../../dev-machine/lessons/dev-machine-setup/guided.md). Quick check:
  you can `cd` into your server folder in the terminal and open that folder in
  VS Code.
- **Comfort editing `server.properties`**, including why changes need a restart
  to land, and the `/say` console command — both from [Server settings and
  console commands](../server-settings-and-console/guided.md). Quick check: you can
  say, without looking it up, why an edit to a running server's settings file
  does nothing until the next start.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. For connection mysteries, its layer-finding step is the one that pays fastest.

---

## What you'll have at the end

By the end of this session you will have:

- Read your server's diary raw and found things in it that never appeared on
  screen
- Written and run your first Python program: a script that reads the entire
  log and prints a leaderboard of who has joined your server the most
- Collided with a genuinely messy real-world problem — counting deaths — and
  shipped an honest first solution anyway
- RCON enabled on your server, with a password you chose and a conscious
  decision about where that password lives
- Your first installed Python library, in a project-local toolbox you made
- The leaderboard announcing its own top three in-game, on a repeating
  schedule, no human involved
- A greeter that watches the log and welcomes each player by name, seconds
  after they join
- A written record of what three different connection failures look like — a
  diagnostic skill that outlives Minecraft

---

## New tools

**Python** is a programming language, like JavaScript. It's appearing now for
two honest reasons. First: different tools fit different jobs. Python is the
language the world reaches for when the job is reading data, scripting, and
gluing programs together — it owns that territory the way JavaScript owns
talking to Minecraft through bots. The work in this part of the module is data
work, so we use the data language. Second, and bigger: meeting a second
language is how you find out which of your skills were JavaScript and which
were *programming*. You're about to discover that almost everything transfers.

Check whether you already have it. In a terminal:

```
python3 --version
```

If that prints a version number, you're done — skip the install. If it instead
says the command wasn't found, or your Mac pops up a dialog offering to install
developer tools, go to [python.org/downloads](https://www.python.org/downloads/)
and follow the current instructions for the macOS installer, then open a
**new** terminal window and run the check again.

`python3` is to Python exactly what `node` is to JavaScript: the program that
runs your programs. Typed alone, it opens a conversation; handed a filename, it
runs the file.

**`logs/latest.log`** is a plain text file in your server folder. Everything
the server prints to its terminal also gets written here — plus things that
never reach the screen. The older files next to it, ending in **`.gz`**, are
previous days: `.gz` means the file is **compressed** — the same information,
packed smaller to save space. Double-clicking one in Finder expands it back
into a readable `.log` file.

**RCON** (remote console) is a small network service built into the Minecraft
server, switched off by default. When enabled, a program that knows the
password can connect to it and send any console command — the same commands
you've typed by hand — and receives the server's reply back as text. It's the
console, offered to software. Three settings in `server.properties` control
it: one that turns it on, one that sets which port it listens on, and one that
sets the password. Rather than trusting a lesson to spell them correctly
forever, you'll confirm the exact key names from the `server.properties` page
on [minecraft.wiki](https://minecraft.wiki) — search the page for "rcon".

**The security posture, stated plainly.** The RCON conversation — password
included — travels over the network essentially unprotected. So three rules,
all boring and all firm: RCON stays on your own machine or home network, its
port never gets forwarded to the internet, and its password is a throwaway
invented for this and used for nothing else. Anyone who can reach the port
with the password can do anything the console can do. Follow the three rules
and this stays a non-event.

**pip and PyPI.** Python programs lean on published libraries, the way bots
lean on mineflayer if you've been through [Writing your first
bot](../writing-your-first-bot/guided.md) — and if you haven't, here's the idea
standalone: rather than everyone writing everything, people publish reusable
code to a public registry, and an installer fetches it into your project.
Python's registry is PyPI ([pypi.org](https://pypi.org)); the installer is
`pip`, which came with Python. Speaking RCON's exact byte format is a solved
problem, so you'll install a library that solves it.

**A virtual environment (venv)** is a project-local toolbox: a folder holding
a private copy of Python's tooling, so libraries you install belong to *this
project* instead of the whole machine. Modern Pythons on macOS may actually
refuse to install libraries machine-wide and tell you so — you'll meet that
message in the work below if your setup produces it. The how-to lives at
[docs.python.org](https://docs.python.org/3/library/venv.html); the short
version appears at the moment you need it.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- The server has been recording events since its first run. List five kinds of
  events you expect to find in the log.
- Who has joined your server the most times? Write an actual ranking — first,
  second, third. Your script is going to grade this guess.
- A program connects to RCON and sends the wrong password. What comes back —
  silence, an error message, a refused connection? What *should* come back, if
  you were designing it?
- Your script sends `/list` and the server replies. What kind of thing arrives
  in your program — and what will you be able to do with it?
- `server.properties` is about to contain a password. Is there anything in how
  you manage that folder that could expose it to anyone else?

---

## The work

### Read a chunk of the diary raw

Open `logs/latest.log` in VS Code and read — not skim, read. The beginning,
some of the middle, the end.

Check your five-kinds prediction against reality. Specifically hunt down: your
own most recent join, a chat message, a line that never appeared on the
server's screen while you were watching, and one line you cannot explain at
all. While you're there, study the *shape* of the lines — what comes first,
what the brackets contain, where the actual event text starts. You're going to
need one phrase from this file later, so notice exactly how the server words
it when someone joins.

Then look at the `logs/` folder itself. Those dated `.gz` files are your
server's previous days. Expand one of the oldest ones (double-click in Finder)
and skim it: history you didn't know you had.

### Meet Python

In the terminal, type `python3` — nothing after it — and press return. The
prompt changes to `>>>`.

You have been in this exact situation before: this is a **REPL** — read,
evaluate, print, loop — the same kind of conversation you had with `node` back
when you set up this machine. Same idea, second language. Try things:

```
2 + 2
"diary" + " " + "reader"
print("the server kept receipts")
```

And one more, because it's the workhorse of today:

```
"joined" in "Alex joined the game"
```

That `in` asks a question — is this text inside that text? — and answers
`True` or `False`. Try one that comes back `False` so you've seen both.

Leave with `exit()` or Ctrl-D. Notice the shape of what just happened: prompt,
type, answer — the same as node, down to the muscle memory. The ideas are
shared; only the spelling differs. That keeps being the point all session.

### Count every join

Now a program in a file. In VS Code, create `log.py` **in your server folder**
(next to `server.jar`), and build a script that opens `logs/latest.log`, looks
at every line, counts the ones that mark a player joining, and prints the
count.

Here is the skeleton, with the two load-bearing pieces blanked out. Type it by
hand — the typing is where the reading happens — and fill in the blanks:

```python
count = 0
with open("logs/latest.log") as f:
    for line in f:
        if ____ in line:
            count = ____
print(count)
```

One rule about the shape before you run it: in Python, **the indentation is
the structure**. There are no braces marking blocks like in JavaScript — the
lines indented under `for` are the loop body, the line indented under `if` is
what happens on a match. Get the indents wrong and Python will refuse, by
name.

<details>
<summary>Stuck on the first blank?</summary>

The phrase to match is not something to guess — it's in the file you just
read. Go back to a real join line in `latest.log` and copy the exact wording
the server uses. Not the timestamp, not the player name: the part that would
be identical for *every* player's join.

</details>

<details>
<summary>Stuck on the second blank?</summary>

After a match, `count` should be one bigger than it was. Say it in English:
"count becomes the old count plus one." Now write exactly that, with `count`
on both sides of the `=`.

</details>

Run it from the server folder:

```
python3 log.py
```

A number comes out. Before moving on, read the skeleton back with full
understanding: `with open(...) as f:` opens the file (and guarantees it gets
closed when the block ends); `for line in f:` hands you the file one line at a
time; the `if` keeps only the lines you care about. Fifteen seconds of
program, the whole diary read.

### Count per player

One number is a fact. What you want is a *leaderboard* — a separate count for
every player. A single counter variable can't hold that, and the thing that
can is worth meeting properly: a **dict** — a table from name to number. You
look things up in it by name, like a real table: `counts["Alex"]`.

Your goal: after the loop, a dict where every player who ever joined has an
entry holding their join count. There are two sub-problems, and it pays to
solve them in order: first get the *name* out of a join line, then keep a
count per name.

<details>
<summary>Getting the name out of the line</summary>

Every string in Python knows how to chop itself into a list of words:
`line.split()`. Investigate on a real line — open the REPL, paste one actual
join line from your file into a variable, and look at what split produces:

```python
line = "...paste a real join line here..."
print(line.split())
```

Count where the name sits in that list. You can index from the front
(`words[0]` is the first word) or from the end (`words[-1]` is the last,
`words[-2]` one before that). If the join phrase ends the line, counting from
the end is sturdier — the front of the line has timestamps that might vary in
shape, the back is always the same phrase.

</details>

<details>
<summary>Keeping a count per name</summary>

- `counts = {}` makes an empty dict — do it once, before the loop.
- `counts[name] = ...` writes the entry for that name; `counts[name]` reads it.
- `name in counts` asks whether the name has an entry yet.

The catch worth thinking through: the *first* time you meet a name, there's no
entry to add one to. Handle the two cases — seen before, brand new — with an
`if` and an `else`.

</details>

<details>
<summary>Worked version — compare after yours runs</summary>

```python
counts = {}
with open("logs/latest.log") as f:
    for line in f:
        if "joined the game" in line:   # your phrase, copied from your file
            name = line.split()[-4]     # your position, from your own counting
            if name in counts:
                counts[name] = counts[name] + 1
            else:
                counts[name] = 1
print(counts)
```

The phrase and the position in the comments are *examples* — yours came from
your own file, which is the only place they can correctly come from.

</details>

Print the dict and look at it. Real names, real numbers, out of a file nobody
was keeping on purpose.

### Sort it into a leaderboard

A dict prints in whatever order it pleases. A leaderboard is best-first. Your
goal: print one line per player — count and name — biggest count at the top.

<details>
<summary>Stuck? Start here</summary>

You can already loop over the names: `for name in counts:` visits each one,
and inside the loop `counts[name]` is that player's number. The only missing
piece is the *order* the loop visits them in.

</details>

<details>
<summary>The sorting piece</summary>

Python has a built-in `sorted(...)` that takes a collection and hands it back
in order — and it accepts instructions about what to sort *by* and in which
direction. The line, since inventing it cold is nobody's first Python lesson:

```python
for name in sorted(counts, key=counts.get, reverse=True):
    print(counts[name], name)
```

Read it aloud: sort the names, judging each one by its count, biggest first.

</details>

Run it. Then pull out the prediction you wrote at the start and grade
yourself. If several people play on this server, this is the moment the data
gets social — somebody at the top of that list is going to be pleased.

### Now deaths — and the mess

Same trick again: count deaths per player. Go find the phrase to match.

Except — go look. Find a few death lines in your log. Then search
minecraft.wiki for its **death messages** page and see the full zoo: fell from
a high place, was slain by, drowned, blew up, and dozens more. There is no one
phrase. This is a real string-matching problem, and it's not a Minecraft
quirk — real data is like this everywhere.

The honest first solution: a list of telltale substrings, built from *your*
log —

```python
clues = ["was slain by", "fell from", "drowned"]
```

— and a line counts as a death if it contains any clue. Extend your script to
build a death leaderboard this way.

<details>
<summary>Stuck? Start here</summary>

Start from a copy of your join counter. What was singular there — one phrase —
is now plural. A loop over `clues` inside your line loop works fine: check
each clue against the line, and if any of them hits, it's a death.

</details>

Be clear-eyed about what you built: it misses any death shape not in your
list, and a weird chat message could fool it. That's not failure — that's what
version one of real software looks like, and knowing exactly *how* your
program is wrong is a skill in itself. The professional tool for this
problem — matching text by *pattern* instead of by exact wording — is called a
**regular expression**, regex for short. Python's regex toolbox is the `re`
module, documented at
[docs.python.org/3/library/re.html](https://docs.python.org/3/library/re.html).
It is not required today. It is where this door leads.

### Announce it — and hit the wall

Run the final leaderboard one more time. Start the server if it's stopped, and
in the server console, use `/say` — from [Server settings and console
commands](../server-settings-and-console/guided.md) — to broadcast the top three to
everyone in-game. Everyone playing just saw standings computed from history
they didn't know was being kept.

Now look at what actually happened: the *script* computed the leaderboard, but
*you* typed the announcement. Your program can read everything the server
writes — and has no way to say anything back. A program can't type into the
console window. (If you've done the [hot-backup
procedure](../worlds-and-backups/guided.md), you've hit this same wall from the
other side: a backup script that needed `save-off` and `save-on` typed at
exactly the right moments, and couldn't type them.)

Both walls are the same wall, and the server ships a door through it: RCON.
The rest of this session opens it.

### Open the door

On the minecraft.wiki `server.properties` page, find every setting that
mentions rcon — there are three that matter, and one of them left empty is the
same as leaving the door locked. Stop your server, set all three (invent a
throwaway password), start it again.

Before writing any Python, prove the door exists: the startup output is where
the server announces what it's listening on. Find the line about RCON. If it's
not there, the settings didn't land — you know the drill.

**Now the password itself, before anything else happens.** This is the first
secret you've managed, and secrets have one rule: know where every copy lives.
Right now there's one copy, in `server.properties`. If you've put your server
folder under version control ([Git for your
server](../git-for-your-server/guided.md)), stop and check whether
`server.properties` is tracked — because if it is, the password is now in your
history. You have exactly two honest options:

- Tell git to ignore `server.properties`. The password stays out — and you
  lose version history for every *other* setting in that file.
- Keep tracking it, knowingly. Defensible only while this repository never
  leaves your machine — and it's a decision you must revisit before ever
  pushing this repo anywhere.

Neither is free. Pick one on purpose, and write your choice and reasoning in a
comment or your notes. Choosing consciously is the entire skill; it never gets
more complicated than this, only bigger.

If you're not using git for the server folder, note the lesson anyway: a
settings file with a password in it has quietly become a different kind of
file.

### Get the tools

Your goal: an RCON library installed and importable.

First, choose one. Go to [pypi.org](https://pypi.org) and search for Minecraft
RCON libraries. Several exist. Evaluate them the way you learned to size up
any community tool in [Choosing a version](../choosing-a-version/guided.md): when
was the most recent release, does the README actually show Minecraft usage,
does the project look tended or abandoned. Pick the one the evidence favors.

Then install it. From your server folder, try:

```
pip install <the-library-you-chose>
```

Read whatever comes back in full. Two outcomes are possible, and both are
fine: it installs cleanly (done — though the toolbox below is still worth
building, because it's standard practice), or Python refuses, mentioning an
**externally managed environment**. That's your Mac's Python protecting itself
from machine-wide changes, and the refusal message itself points at the fix: a
virtual environment.

The venv ritual, run from your server folder:

```
python3 -m venv .venv
source .venv/bin/activate
```

The first command builds the toolbox (a folder called `.venv`); the second
steps into it — your prompt grows a `(.venv)` prefix while you're in. Now
`pip install` your chosen library again, inside. The one habit that matters
from here on: **be in the venv whenever you run this session's scripts** — if
the prefix is gone (new terminal window, next week), run the `source` line
again. `deactivate` steps back out. Exact details of the ritual are on the
[venv documentation page](https://docs.python.org/3/library/venv.html) if
yours behaves differently.

### First contact

Your goal: a script `rcon_test.py` that connects to RCON on your own machine,
sends the `list` command, and prints the reply.

How to use the library comes from the library itself: open its README (its
PyPI page links there) and read the whole thing — it's short, and the habit of
reading a library's entire front page is one of the quietly powerful ones. Its
first example is most of your script.

<details>
<summary>Stuck? Start here</summary>

Four things in the README's example need to become *yours*: the address (your
server is on this machine — `127.0.0.1`, which is `localhost` as a number),
the password (the one in `server.properties`), the port (the one you set), and
the command (`list` — with or without the leading slash; try both and see if
the server cares).

</details>

Run it with the server up. Look hard at what printed: that's the same sentence
you'd see typing `list` into the console yourself — except it arrived inside
your program, as a **string**, in a variable. A program asked; a program
answered; the reply is data now. Everything else today is built on that.

### The announcer

Your goal: the leaderboard script announces its own top three in-game via
`/say` — the thing it couldn't do an hour ago.

You have two working programs: `log.py` computes standings, `rcon_test.py`
sends commands. This step is a merge, not an invention.

<details>
<summary>Stuck? Start here</summary>

The top three are the first three names your `sorted(...)` line yields.
Building the announcement is string assembly — names and counts glued into a
message. Saying it is one `command(...)` call per line, or one long line; your
choice. The joining of the two scripts: the counting part runs first, the
sending part uses its results.

</details>

Run it with someone in the world — or join yourself and watch. The standings
just appeared in-game and no human typed them. The wall from the middle of
this session is down.

### On a schedule

Your goal: the announcer repeats — say every ten minutes — until you stop it.

One thing to know before you run it, because this is your first deliberately
infinite program: it will not exit on its own, and that's correct. **Ctrl-C in
the terminal stops it.** That's not a crash; it's the off switch.

<details>
<summary>Stuck? Start here</summary>

The pieces are a loop that never ends and a nap inside it: `while True:` and
`time.sleep(seconds)` — the latter needs `import time` at the top. One design
decision hides here: if the log-reading happens *once, before* the loop, the
standings never update no matter how long it runs. Where your file-reading
sits relative to the `while` decides whether the announcer stays current.

</details>

Let it run through two or three announcements while you're in the world, then
Ctrl-C. The grown-up version — where the operating system itself runs your
script on a schedule with no terminal open — is waiting in Go further.

### The greeter

The finale. Your goal: a script that watches `latest.log` *as it grows* and,
when someone joins, greets them by name in-game within a few seconds.

Two of the three problems are already solved: you can spot join lines and
extract names (this session's first movement), and you can speak in-game
(just now). The new problem is reading a file that's still being written —
your old script read the whole file once and stopped; this one must start at
the end and keep asking for more.

<details>
<summary>Stuck? Start here</summary>

The shape: open the file, jump to the end (skip everything historical), then
loop forever — try to read one new line; if there is one, check it and maybe
greet; if there isn't, sleep for a second and try again.

</details>

<details>
<summary>The two pieces of syntax you can't guess</summary>

Jumping to the end of an open file: `f.seek(0, 2)` — seek to offset 0,
measured from the end. Reading one line if available: `f.readline()`, which
returns the next new line, or an empty string when there's nothing new yet —
the empty string is your cue to sleep and retry.

</details>

Start the greeter, then take your hands off the keyboard and have someone
join — or join yourself. Watch the greeting arrive.

If you've built a [mineflayer bot](../writing-your-first-bot/guided.md), compare
what just happened with how the bot would do it. The bot greets by *being a
player* — it has an account, a body, a place in the world. Your greeter has
none of that. No account, no presence — it acts through the console's remote
door, from outside the game entirely. Two utterly different ways for code to
act on the same server, and you've now built both.

---

## Break it on purpose

Cause each one, read what happens, undo it. For the three connection
failures, write down what each one *looks like* — a two-column table, what I
did / what I saw — because the whole value is in telling them apart later.

**Run it from the wrong room.** Go home first — `cd ~` — then run the script
by its full path, something like:

```
python3 projects/mc-server/log.py
```

It fails. Read the whole error before touching anything. The last line names
the problem — `FileNotFoundError` — and names a file that *definitely exists*:
`logs/latest.log`. Except that path is a **relative path** — directions from
wherever you're currently standing, not a full address. Your script says "in
the `logs` folder here", and standing in your home folder, there is no `logs`
folder here. The terminal's current place — its working directory, the concept
you met when [setting up this
machine](../../../dev-machine/lessons/dev-machine-setup/guided.md) — just changed what
your program means. A path starting from `/`, spelling out the full route, is
an **absolute path** and means the same thing from anywhere. `cd` back and
confirm the script works again. Nothing was damaged; the program just looked
in the wrong place.

**Wrong password.** Change the password in your RCON script to something wrong
and run it. Read the error completely. Notice what kind of failure this is:
the connection *worked* — the server answered, examined your credential, and
said no. Fix the password; confirm it works again.

**Door removed.** Set `enable-rcon=false`, restart the server, run your
correct script. A different error this time — connection refused. Nothing
examined your password; nothing was listening at all. Compare the two errors
side by side: rejected-at-the-door versus no-door-there. Re-enable and
restart.

**Wrong door.** Point your script at a port where nothing lives — 25599, say.
Refused again — and notice it's the *same signature* as RCON-disabled. From
the outside, "the feature is off" and "I knocked on the wrong port" are
indistinguishable, which is exactly why you checked the startup log for the
RCON line before writing any code. Then one more experiment: aim the script at
25565 — the *game* port, where something IS listening, but something that
speaks a different protocol. Predict, run, observe. Put the right port back.

What you now own: connection refused, authentication failure, and
wrong-protocol confusion are three different *layers* failing, and you can
tell them apart on sight. That skill transfers to every networked thing you
will ever debug — websites, databases, printers, all of it.

---

## What just happened

The server has been keeping its diary since the day it first ran. Nobody asked
it to be interesting. The data accumulated whether or not anyone read it — and
that meant your questions got answered *retroactively*: tonight's leaderboard
reaches back to before you knew you'd want one. That's the shape of log data
everywhere in computing: record now, ask later. And the asking took about
fifteen lines. Because the log is plain text, the same fifteen-line shape
reads a web server's logs, a printer's logs, any program's logs — text is the
universal interface between programs and the people investigating them.
Nothing you wrote was Minecraft-specific except one phrase, and you copied
that out of your own file.

The second-language point, now that you can check it against experience:
everything structural today — open a file, loop, test, count, sort, print —
you already knew. What was actually new was spelling: indentation instead of
braces, `in` instead of a method with a longer name. That split — the ideas
versus the spelling — is a durable discovery, and it's why your third
language, whenever it comes, will cost less than your second did.

Then the remote control. What your library performed on every connection is a
**protocol with authentication**: open a connection, present a credential, get
accepted or rejected, then exchange requests and replies in an agreed format.
That skeleton — credential first, then request/response — is under an enormous
amount of the networked world; logging into almost anything is a dressed-up
version of what you watched happen in plain sight today.

The bigger reframe is about the console. It was never special. Count the doors
into your server's command parser now: the console window ([Server settings
and console commands](../server-settings-and-console/guided.md)), an opped player
typing in-game, RCON, and [datapack functions](../building-datapacks/guided.md).
Four doors, different guards on each — but the same strings going to the same
parser. The console you met early in this module turned out to be one chair at
a table with several, and today you took a second one.

Underneath everything — the thing your library was managing while you called
pleasant functions — is a **socket**: the operating system's primitive for one
program holding a live conversation with another across a network. You didn't
touch it directly, and that's fine for now. In [a later
lesson](../world-data-and-protocol/guided.md) you build one by hand, byte by byte,
and talk to the server with no library at all.

And the password. That was the first credential you've *managed* — invented,
stored in a file, weighed against your version control, decision written down.
That weighing is the entire discipline of secret management in miniature. It
never gets conceptually harder than what you did today; it only ever gets
bigger.

---

## Go further

- Open the regex door: rewrite the death counter with the `re` module so it
  matches death *patterns* instead of a clue list. The docs page is the map.
- What's the oldest log you have? Expand it and reconstruct your server's
  first day — the first join ever, the first death ever. Better: Python's
  standard library has a `gzip` module that reads `.gz` files without
  expanding them, and a script that walks *every* log in the folder is a
  genuinely superior leaderboard.
- If you've done the [manual hot-backup
  procedure](../worlds-and-backups/guided.md), the gap it left open is now
  closed: a script can type into the console. Script the whole dance —
  `save-off`, `save-all flush`, copy, `save-on` — end to end with no human.
  That's a genuinely production-grade tool for your server.
- The scheduled announcer dies when its terminal closes. The grown-up answer
  is the operating system's own scheduler — on macOS it's called `launchd`
  (elsewhere, `cron`). Find out what it takes to run the announcer with no
  terminal open at all.
- The greeter treats every join identically. Could it tell a *first-time*
  joiner from a regular, and greet them differently? Everything it would need
  is already in the logs.
- Could you ever list everything the server might possibly write to its log —
  a complete vocabulary of the diary? How would you even begin to check?
  Nobody has a full answer to this one.
- A server that speaks unprompted is delightful — right up until it's noise.
  What should an automated server say, how often, triggered by what? Nobody
  has a general answer to this; every server that automates chat ends up
  tuning it by feel, and yours is now one of them.

---

## What you have now

- Python installed and proven working — `python3 --version` answers
- `log.py` in your server folder: opens a file, loops over lines, counts
  matches, tallies per name in a dict, sorts, prints a leaderboard
- The relative-vs-absolute path distinction, learned from a real failure you
  caused on purpose
- RCON enabled on your server — localhost only, throwaway password, port never
  forwarded — and a conscious, written-down decision about where that password
  lives relative to version control
- A virtual environment in your server project and your first installed Python
  library
- Scripts that act on the running server from outside: an announcer, a
  scheduled announcer, a join-greeter
- The failure-signature table: refused vs rejected vs wrong-protocol, told
  apart on sight
- A server that talks on a schedule and reacts to events with nobody at the
  keyboard — and everyone who plays on it can tell
