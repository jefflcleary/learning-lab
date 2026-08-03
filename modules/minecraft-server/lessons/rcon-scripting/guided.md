# A remote control for the server

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

If you built the join leaderboard in [The server has been keeping a
diary](../reading-the-logs/guided.md), you ended on a deliberate frustration: your script
computed the standings, and then a human had to type the announcement, because a
program has no way to type into the server's console window. And if you've done
the [hot-backup procedure](../backups-without-stopping/guided.md), you hit the same wall
from the other side: a backup script that needed console commands typed at
exactly the right moments, and couldn't type them.

Both walls are the same wall, and it has a standard door built into the server:
**RCON** — remote console — a way for other *programs* to send console commands
to the running server over the network, guarded by a password. This session
turns it on, connects Python to it, and puts your server to work talking on its
own: announcing the leaderboard by itself, repeating on a schedule, and greeting
players by name the moment they join — with nobody at the keyboard.

Along the way you'll handle your first real secret, install your first Python
library, and learn to tell three different kinds of network failure apart by
sight.

---

## Before you start

You need:

- **A Python script that reads server data.** [The server has been keeping a
  diary](../reading-the-logs/guided.md) builds exactly the one this session extends.
  Quick check: from your server folder, `python3 log.py` prints a leaderboard.
- **Comfort editing `server.properties`**, including why changes need a restart
  to land — from [The server is yours to change](../server-settings/guided.md). Quick
  check: you can say, without looking it up, why an edit to a running server's
  settings file does nothing until the next start.
- **A server you can start and stop**, as always. Quick check: start it, watch
  for **Done**, type `stop`.

---

## What you'll have at the end

By the end of this session you will have:

- RCON enabled on your server, with a password you chose and a conscious
  decision about where that password lives
- Your first installed Python library, in a project-local toolbox you made
- A script that sends `/list` to the running server and holds the reply in a
  variable
- The leaderboard announcing its own top three in-game, on a repeating
  schedule, no human involved
- A greeter that watches the log and welcomes each player by name, seconds
  after they join
- A written record of what three different connection failures look like — a
  diagnostic skill that outlives Minecraft

---

## New tools

**RCON** (remote console) is a small network service built into the Minecraft
server, switched off by default. When enabled, a program that knows the
password can connect to it and send any console command — the same commands
you've typed by hand — and receives the server's reply back as text. It's the
console, offered to software.

Three settings in `server.properties` control it: one that turns it on, one
that sets which port it listens on, and one that sets the password. Rather
than trusting a lesson to spell them correctly forever, you'll confirm the
exact key names from the `server.properties` page on
[minecraft.wiki](https://minecraft.wiki) — search the page for "rcon".

**The security posture, stated plainly.** The RCON conversation — password
included — travels over the network essentially unprotected. So three rules,
all boring and all firm: RCON stays on your own machine or home network, its
port never gets forwarded to the internet, and its password is a throwaway
invented for this and used for nothing else. Anyone who can reach the port
with the password can do anything the console can do. Follow the three rules
and this stays a non-event.

**pip and PyPI.** Python programs lean on published libraries, the way bots
lean on mineflayer if you've been through [First bot](../first-bot/guided.md) — and if
you haven't, here's the idea standalone: rather than everyone writing
everything, people publish reusable code to a public registry, and an
installer fetches it into your project. Python's registry is PyPI
([pypi.org](https://pypi.org)); the installer is `pip`, which came with
Python. Speaking RCON's exact byte format is a solved problem, so you'll
install a library that solves it.

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

- A program connects to RCON and sends the wrong password. What comes back —
  silence, an error message, a refused connection? What *should* come back,
  if you were designing it?
- Your script sends `/list` and the server replies. What kind of thing arrives
  in your program — and what will you be able to do with it?
- `server.properties` is about to contain a password. Is there anything in
  how you manage that folder that could expose it to anyone else?

---

## The work

### Open the door

On the minecraft.wiki `server.properties` page, find every setting that
mentions rcon — there are three that matter, and one of them left empty is the
same as leaving the door locked. Stop your server, set all three (invent a
throwaway password), start it again.

Before writing any Python, prove the door exists: the startup output is where
the server announces what it's listening on. Find the line about RCON. If it's
not there, the settings didn't land — you know the drill from
[server-settings](../server-settings/guided.md).

**Now the password itself, before anything else happens.** This is the first
secret you've managed, and secrets have one rule: know where every copy lives.
Right now there's one copy, in `server.properties`. If you've put your server
folder under version control ([Git for your server](../git-for-your-server/guided.md)),
stop and check whether `server.properties` is tracked — because if it is, the
password is now in your history. You have exactly two honest options:

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
any community tool in [Choosing a version](../choosing-a-version/guided.md): when was
the most recent release, does the README actually show Minecraft usage, does
the project look tended or abandoned. Pick the one the evidence favors.

Then install it. From your server folder, try:

```
pip install <the-library-you-chose>
```

Read whatever comes back in full. Two outcomes are possible, and both are
fine:

- It installs cleanly. Done — though the toolbox below is still worth building,
  because it's standard practice.
- Python refuses, mentioning an **externally managed environment**. This is
  your Mac's Python protecting itself from machine-wide changes, and the
  refusal message itself points at the fix: a virtual environment.

The venv ritual, run from your server folder:

```
python3 -m venv .venv
source .venv/bin/activate
```

The first command builds the toolbox (a folder called `.venv`); the second
steps into it — your prompt grows a `(.venv)` prefix while you're in. Now
`pip install` your chosen library again, inside. The one habit that matters
from here on: **be in the venv whenever you run this session's scripts** —
if the prefix is gone (new terminal window, next week), run the `source` line
again. `deactivate` steps back out. Exact details of the ritual are on the
[venv documentation page](https://docs.python.org/3/library/venv.html) if
yours behaves differently.

### First contact

Your goal: a script `rcon_test.py` that connects to RCON on your own machine,
sends the `list` command, and prints the reply.

How to use the library comes from the library itself: open its README (its
PyPI page links there) and read the whole thing — it's short, and the habit
of reading a library's entire front page is one of the quietly powerful ones.
Its first example is most of your script.

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
`/say` — the thing it couldn't do at the end of last lesson.

You have two working programs: `log.py` computes standings, `rcon_test.py`
sends commands. This step is a merge, not an invention.

<details>
<summary>Stuck? Start here</summary>

The top three are the first three names your `sorted(...)` line yields.
Building the announcement is string assembly — names and counts glued into a
message. Saying it is one `command(...)` call per line, or one long line;
your choice. The joining of the two scripts: the counting part runs first,
the sending part uses its results.

</details>

Run it with someone in the world — or join yourself and watch. The standings
just appeared in-game and no human typed them. That closes the loop from
last lesson.

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
script on a schedule with no terminal open — is called `launchd` on macOS, and
it's waiting in Go further.

### The greeter

The finale. Your goal: a script that watches `latest.log` *as it grows* and,
when someone joins, greets them by name in-game within a few seconds.

Two of the three problems are already solved: you can spot join lines and
extract names (last lesson), and you can speak in-game (today). The new
problem is reading a file that's still being written — your old script read
the whole file once and stopped; this one must start at the end and keep
asking for more.

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

Start the greeter, then take your hands off the keyboard and have someone join
— or join yourself. Watch the greeting arrive.

If you've built a [mineflayer bot](../first-bot/guided.md), compare what just happened
with how the bot would do it. The bot greets by *being a player* — it has an
account, a body, a place in the world. Your greeter has none of that. No
account, no presence — it acts through the console's remote door, from
outside the game entirely. Two utterly different ways for code to act on the
same server, and you've now built both.

---

## Break it on purpose

This one is a laboratory session. You're going to cause four different
failures on purpose and write down what each one *looks like*, because the
whole value is in telling them apart later. A two-column table — what I did /
what I saw — is worth keeping.

**Wrong password.** Change the password in your script to something wrong and
run it. Read the error completely. Notice what kind of failure this is: the
connection *worked* — the server answered, examined your credential, and said
no. Fix the password; confirm it works again.

**Door removed.** Set `enable-rcon=false`, restart the server, run your
correct script. A different error this time — connection refused. Nothing
examined your password; nothing was listening at all. Compare the two errors
side by side: rejected-at-the-door versus no-door-there. Re-enable and
restart.

**Wrong door.** Point your script at a port where nothing lives — 25599, say.
Refused again — and notice it's the *same signature* as RCON-disabled. From
the outside, "the feature is off" and "I knocked on the wrong port" are
indistinguishable, which is exactly why you checked the startup log for the
RCON line before writing any code. Then one more experiment: aim the script
at 25565 — the *game* port, where something IS listening, but something that
speaks a different protocol. Predict, run, observe. Put the right port back.

**Garbage command.** Correct connection, nonsense payload: send something like
`frobnicate the chickens` and print the reply. The server answers a program
exactly the way it answers a confused human — with text explaining the
problem, not with a crash. Error messages are just replies too, and your
program could read them and react.

What you now own: connection refused, authentication failure, and
wrong-protocol confusion are three different *layers* failing, and you can
tell them apart on sight. That skill transfers to every networked thing you
will ever debug — websites, databases, printers, all of it.

---

## What just happened

What your library performed on every connection is a **protocol with
authentication**: open a connection, present a credential, get accepted or
rejected, then exchange requests and replies in an agreed format. That
skeleton — credential first, then request/response — is under an enormous
amount of the networked world; logging into almost anything is a dressed-up
version of what you watched happen in plain sight today.

The bigger reframe is about the console. It was never special. Count the
doors into your server's command parser now: the console window
([console commands](../console-commands/guided.md)), an opped player typing in-game,
RCON, and [datapack functions](../datapack-functions/guided.md). Four doors, different
guards on each — but the same strings going to the same parser. The console
you met early in this module turned out to be one chair at a table with
several, and today you took a second one.

Underneath everything today — the thing your library was managing while you
called pleasant functions — is a **socket**: the operating system's primitive
for one program holding a live conversation with another across a network.
You didn't touch it directly, and that's fine for now. In
[a later lesson](../server-list-ping/guided.md) you build one by hand, byte by byte,
and talk to the server with no library at all.

And the password. That was the first credential you've *managed* — invented,
stored in a file, weighed against your version control, decision written
down. That weighing is the entire discipline of secret management in
miniature. It never gets conceptually harder than what you did today; it only
ever gets bigger.

---

## Go further

- If you've done the [manual hot-backup procedure](../backups-without-stopping/guided.md),
  the gap it left open is now closed: a script can type into the console.
  Script the whole dance — `save-off`, `save-all flush`, copy, `save-on` —
  end to end with no human. That's a genuinely production-grade tool for your
  server.
- The scheduled announcer dies when its terminal closes. The grown-up answer
  is the operating system's own scheduler — on macOS it's called `launchd`
  (elsewhere, `cron`). Find out what it takes to run the announcer with no
  terminal open at all.
- If you've built a [mineflayer bot](../first-bot/guided.md): race the two greeters.
  Which welcomes a joining player faster — the bot living in the world, or
  the log-watching RCON script? Form a theory about why before you measure.
- The greeter treats every join identically. Could it tell a *first-time*
  joiner from a regular, and greet them differently? Everything it would need
  is already in the logs.
- A server that speaks unprompted is delightful — right up until it's noise.
  What should an automated server say, how often, triggered by what? Nobody
  has a general answer to this; every server that automates chat ends up
  tuning it by feel, and yours is now one of them.

---

## What you have now

- RCON enabled on your server — localhost only, throwaway password, port never
  forwarded
- A conscious, written-down decision about where that password lives relative
  to version control
- A virtual environment in your server project and your first installed
  Python library
- Scripts that act on the running server from outside: an announcer, a
  scheduled announcer, a join-greeter
- The failure-signature table: refused vs rejected vs wrong-protocol, told
  apart on sight
- A server that talks on a schedule and reacts to events with nobody at the
  keyboard — and everyone who plays on it can tell
