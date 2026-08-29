# Server settings and console commands

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your server takes instructions through two doors, and this session opens both.

The first is a file. In your server's folder sits `server.properties` — a list of
decisions: how hard the world is, how many people can join, whether players can
hurt each other, what the server says about itself. Every line was chosen by
someone, and none of the lines are locked. You'll read that entire file, change
pieces of it, and watch the world obey.

The second door is live. The terminal window a running server lives in doesn't
just print — it listens. You've used that once already: `stop` is a command,
typed into a running server, obeyed immediately. It turns out `stop` has hundreds
of siblings: a whole language for talking to a server *while it runs* — change
the time of day, summon a storm, rewrite the rules of the world under a player's
feet. By the end you'll speak enough of it to run your world like someone who
owns it — and you'll know which kinds of change go through which door, and why.

---

## Before you start

You need:

- **A server you can start, stop, and join.**
  [Running your own server](../running-your-own-server/guided.md) gets you there.
  Quick check: start your server, wait for the **Done** line, join it from your
  game, then type `stop` in the terminal and watch it save and exit.
- **A code editor.** Set up in
  [Setting up a coding machine](../../../dev-machine/lessons/dev-machine-setup/guided.md).
  Quick check: you can open your server's folder in VS Code and see its files in
  the sidebar.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- Read every setting your server has and sorted them into what you understand,
  what you can guess, and what's still a mystery
- Given your server a name and message that anyone in the house can see from
  their multiplayer screen, without even joining
- Controlled time, weather, and the rules of the world from the console, live,
  while standing in the world watching it happen
- Made yourself an **operator** — able to run commands from inside the game — and
  found the file where that power is written down
- Run an experiment that reveals which live changes survive a restart and which
  quietly snap back, and why

---

## New tools

**A settings file** (also called a config file, short for configuration) is where
a program keeps its decisions written down — so the program can read them, and so
you can. `server.properties` is plain text, one decision per line, in the shape
`key=value`: the name of a setting, an equals sign, and what it's currently set
to. Lines starting with `#` are comments — notes meant for humans, which the
server skips. VS Code opens it like any text file. The working rhythm for the
first half of this session is **edit → save → restart the server → check** — why
the restart is in there is something you're about to discover rather than be
told. The complete map of the file is the **server.properties** page on
[minecraft.wiki](https://minecraft.wiki); you'll be told when it's time to open
it, because the first part of this session is deliberately done without it.

**The console** is not a new window — it's the terminal your server already runs
in. What's new is knowing that it listens. Anything you type there while the
server is running gets read as a **command**: a line of text the server parses
and acts on. In the console, commands are typed bare: `stop`, not `/stop`. Inside
the game, commands go into the chat window and must start with `/` — that's how
the game tells a command apart from something you're saying to other players. The
complete map of this language is the **Commands** page on minecraft.wiki, and
you'll open it partway through.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- How many settings do you think the server has in its file? An actual number.
- You watched the server create `server.properties` on its first run. If you
  deleted a line from it, what happens on the next start?
- If you could change one thing about your server right now — anything — what
  would it be? Keep the answer; check at the end whether this session could have
  done it.
- This session changes the server two ways: by editing a file, and by typing
  commands at a running server. Will both take effect immediately? If not, which
  — and what's different about how they reach the server?
- Will commands work typed into the in-game chat as well as the console? For
  *anyone* who joins your server, or only for some people?
- Near the end you'll change the world in several ways — time, weather, world
  rules — and then restart the server. Which changes will still be there
  afterwards? All? None? A guess for each kind of change.

---

## The work

### Read every line

Stop your server if it's running. Open `server.properties` in VS Code and read
the whole thing, top to bottom. Out loud is allowed and honestly recommended.

No looking anything up — that comes later. Instead, make three lists on paper:

- **Could explain:** you could tell another person what this setting does
- **Could guess:** the name suggests something, but you wouldn't bet on it
- **No idea:** the name means nothing to you yet

Every key goes on exactly one list. Count them while you're at it and check your
prediction. When you're done you'll have something most people who run servers
never make: an honest map of the edge of your own knowledge.

### Rename the world's front door

Somewhere in that file is the text your server shows to anyone who sees it in a
multiplayer server list. Your goal: make that screen show words you chose — and
verify it **without joining the server**.

<details>
<summary>Stuck? Start here</summary>

Most keys in the file control how the server *behaves*. You're looking for one
that controls what it *says about itself*. Skim the left-hand sides of your
three lists again with that question.

</details>

<details>
<summary>Naming it — and the real puzzle</summary>

The key is `motd` — "message of the day." Change its value to anything you like
and save.

Now the real puzzle. If your server was running while you edited, look at the
multiplayer screen: nothing changed. The file on disk says one thing, the
server is showing another. When did the server last actually *read* this file?

</details>

<details>
<summary>Making it land</summary>

The server reads `server.properties` once, at startup, and keeps a copy in
memory. Your edit changed the disk; the running server never looked back at it.
Restart — `stop`, then start it again — and refresh the multiplayer screen.

</details>

When it lands, notice what you've done: anyone in the house who opens their
multiplayer screen now sees your words, before they ever join.

### Change the rules of reality

Pick one, whichever you can verify today:

- **`difficulty`** — the values it takes are `peaceful`, `easy`, `normal`,
  `hard`. Verifiable alone: switch a night-time world to peaceful and watch what
  happens to the monsters.
- **`pvp`** — whether players can damage each other. Verifiable if someone else
  can join you for two minutes, which also makes the demonstration better.

Before you restart: write down exactly what you expect to be different in the
world, specifically enough that you could be wrong. Then restart, join, and
check.

### Take one mystery off your list

Now the wiki. Open the **server.properties** page on
[minecraft.wiki](https://minecraft.wiki) — search the site for
`server.properties` — and find your *no idea* list in it.

Pick the key that sounds most interesting. Read what the wiki says it does. Write
a prediction: what will observably change if you alter it? Change it, restart,
and go find out.

Whatever happened, you just ran the loop that works on every program you will
ever meet: unknown setting → find the reference → predict → change → observe.
Nobody showed you this one. That was the point.

And notice the tax you've paid four times now: every single change needed a
restart. The server has a second door that doesn't.

### Make the server speak

Start your server and join it. Arrange things so you can see both the game and
the terminal — side by side, or a housemate's screen and yours.

Click into the console and type:

```
say hello from the machine
```

Look at the game. A message just appeared in chat that no player typed — the
server said it. Notice three things: no slash, no restart, and no delay. This is
the live channel, and the rest of this session goes through it.

### Read the surface

Before using more of the language, see how big it is. Open
[minecraft.wiki](https://minecraft.wiki) and search the site for its **Commands**
page. Scroll the full list of commands, top to bottom. You are not memorizing
anything — you're taking the measure of the space. Roughly how many are there?
Note three that sound interesting and three whose names mean nothing to you.

Today uses about six entries from that list. The rest will still be there
whenever you want them, and now you know where they live.

### Command the sky and the clock

Your goal: from the console, make it the middle of the night, then start a
thunderstorm — while you stand in the world and watch both happen. Then put the
sky back the way it was.

<details>
<summary>Stuck? Start here</summary>

The plain English words you'd use to describe what you want — the *time*, the
*weather* — are the words the commands use. You scrolled past both a few
minutes ago.

</details>

<details>
<summary>Naming them</summary>

The commands are `time set` and `weather`. Each takes one more word saying
*which* time or *which* weather. If you're not sure what words they accept,
each command has its own page on the wiki listing exactly that.

</details>

<details>
<summary>The full commands</summary>

```
time set midnight
weather thunder
```

And to undo: `time set day` and `weather clear`.

</details>

Watch it land from inside the world. The sun obeys you now.

### Rewrite a law of physics

Some of the world's deepest behaviors are standing rules called **game rules**,
changed with the `gamerule` command. Three worth meeting today:

- `keepInventory` — when you die, do you drop everything you're carrying?
  (Normally yes: the rule starts out `false`.)
- `doDaylightCycle` — does time advance at all? (Normally `true`.)
- `mobGriefing` — can creepers destroy blocks, can endermen steal them?
  (Normally `true`.)

Useful to know: `gamerule` with a rule name and *no* value makes the server tell
you the current setting — worth doing before and after any change.

Your goal: pick two of the three. For each, write down exactly what will be
observably different — specifically enough that you could be wrong. Change them
from the console, then verify with your own eyes. For `keepInventory`,
verification means dying on purpose: your call, somewhere convenient, and with
the rule turned on you'll lose nothing. You just changed what death means in
your world, with one line of text, while the world was running.

### Get the power in-game

Everything so far went through the console. Now try the game side: open chat
in-game and type `/time set noon` — with the slash.

It refuses. Read the refusal completely — it's short, and it's telling you
something true: the server has a permission system, and you just met it. The
console is allowed everything, always. Players are allowed almost nothing until
someone grants it. Your goal: make your own player able to run these commands
from inside the game.

<details>
<summary>Stuck? Start here</summary>

The console has refused you nothing today. The game just did. So the difference
isn't the command — it's *who's asking*. Somewhere in the command list is the
command that changes who is allowed to ask.

</details>

<details>
<summary>The concept, named</summary>

The word is **operator** — "op" for short. An operator is a player the server
trusts with command power. The console grants it, and the command is named
exactly what it does. Find it on the Commands page.

</details>

<details>
<summary>The command</summary>

From the console:

```
op your-player-name
```

Then go back into the game and retry `/time set noon`.

</details>

When it works, one more thing. Look at your server's folder in VS Code: a file
is there that wasn't before — `ops.json`. Open it. That's the list of operators;
your name is in it. Even *who has power* is written down in a file. And notice
its shape — brackets, quotes, colons. Not the `key=value` shape you now know
well: a second shape settings come in, and a later session is built around it.

### Play god for a minute

You're an operator standing inside your own world. Two goals, from in-game chat:

- Give yourself a stack of 64 diamonds out of thin air.
- Teleport yourself somewhere far away, then back — or, if someone else is
  online, teleport *them* to you and hand them the diamonds. Watching a friend
  get yanked across the map into a pile of free diamonds is the better version
  of this exercise.

<details>
<summary>Naming them</summary>

`give` and `tp` (teleport) — both were in your scroll of the Commands page, and
both are short names for exactly what they do. Both start with a *target*: who
receives the items, who gets moved. A player's name works as a target.

</details>

<details>
<summary>The full commands</summary>

```
/give your-player-name minecraft:diamond 64
/tp their-name your-player-name
```

</details>

### The persistence experiment

Here's where the two halves of this session collide.

You've changed the world live in several ways today. Make one more change: set
the world's `difficulty` — but this time by command, not by editing the settings
file. (You know the command exists; you've seen the setting before.)

Now make a table. One row per change you've made — time, weather, each game
rule, difficulty — and next to each, your prediction: **survives a restart** or
**doesn't**. Then run the experiment: `stop` the server, start it again, join,
and check every row. Read the current values rather than guessing — remember
`gamerule` with no value, and look at the sky.

The result will split — and the split is the interesting part. For every change
that survived: it lived through a restart, so it must be *written down*
somewhere on disk. Where? You know where the server keeps things — go look until
you can point at the place. For every change that snapped back: something
overwrote it during startup. What file does the server read at startup, and what
does it say? Sit with this until you can explain the split out loud. It's the
real lesson of the day.

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Feed it nonsense.** Stop the server. Set `difficulty=banana` in the settings
file. Start it, and find out what a server does with a value it can't use — read
the log around startup, and afterwards open `server.properties` again and look
closely at that line. Whatever you find, you measured it yourself: how *this*
program treats bad input. Programs differ on this — some refuse to start, some
complain and carry on, some quietly fix the file — and knowing which kind you're
dealing with is always worth one broken value. Put it back when you're done.

**Move the front door.** Change `server-port` to `25570` and restart. Now try
joining from your saved server entry — it fails, even though the server is
running and healthy. It didn't vanish; it's listening at a different number, and
your game is knocking on the old one. Reach it anyway: edit the server entry's
address to `localhost:25570` — an address and a port, joined by a colon, which is
how you name a *specific program's door* on a machine rather than just the
machine. Then change the port back, because defaults exist so nobody has to
remember numbers.

**Misspell a law.** From the console, type a gamerule command with the rule name
deliberately wrong — `gamerule keepInventry true`, say. Read the entire response.
The server didn't crash, didn't guess what you meant, didn't do something random
— it refused and named the problem. This is the shape of almost every command
error you will ever see: the server parses your text, rejects what it can't
understand, and explains. Nothing to undo; nothing happened.

**Fire yourself.** In-game, as an operator, run `/deop` on your own name. Now try
`/time set day` from chat and read the refusal again — this time as someone who
knows exactly what it means. Then recover: go to the console and `op` yourself
back. Notice what this proves. In-game power is just an entry in `ops.json` —
grantable, revocable, editable. But the console cannot be deopped. Whoever sits
at the terminal the server runs in holds the root of all power on that server.
Worth remembering when other people start joining your world.

---

## What just happened

Your server has two doors for decisions. One is the settings file: read once at
startup into a copy in memory, which is why every change there needed a restart —
the disk changed, the memory didn't. It's also why "have you tried restarting
it?" is a real diagnostic question and not a joke: a restart forces a program to
re-read its written-down decisions. The other door is the console: a live line
into the running program, parsed the instant you press return. Same program, two
channels — one for decisions-at-rest, one for decisions-right-now.

Nearly every long-lived program on your computer works the settings-file way, and
`key=value` is one of a small family of shapes those files come in. You'll meet
the others soon — datapacks will hand you one called JSON — but the idea never
changes: the behavior of a program is data, data lives in files, and files can be
edited.

Two smaller reveals are worth keeping. Your motd appeared on the multiplayer
screen *without anyone joining* because that screen is not a passive list: the
game pings every server on it, and each server answers with its name, its
message, its player count — a complete little conversation between two programs,
over the network, in a fraction of a second. Later in this module you'll learn to
speak that conversation yourself, byte by byte. And look at what actually travels
through the live door: text. `time set midnight` is a string of characters; the
server reads it, matches it against its grammar, and acts. Nothing in that story
requires the characters to come from human fingers. Later you'll write programs
that compose exactly these strings and send them — tireless operators that never
typo. Today you learned the language. Later, you'll teach it to machines.

Finally, the persistence experiment exposed the server's filing system. Some
decisions belong to the *world* — stored inside the `world/` folder, so they
travel with it; copy that folder to another server and those rules ride along.
Other decisions belong to the *server* and get re-imposed from
`server.properties` at every startup, stamping over whatever you set live. Two
owners of decisions, two places on disk — and now you know which questions to
ask of each.

---

## Go further

- The wiki page documents more keys than your file contains. Why would a file
  the server itself wrote leave out settings the server understands? What
  happens if you add one of the missing ones yourself?
- `level-seed` only affects terrain that hasn't been generated yet. So what
  happens to a half-explored world if you change the seed and then walk
  somewhere new? Try it on a throwaway world — the result is worth seeing once.
- Some servers show colored, multi-line messages in the server list, and chat
  messages in colors with text you can click. Plain `motd` text and plain `say`
  can't do either — something can. What?
- The **Game rule** page on minecraft.wiki lists every rule that exists. Find
  one you've never heard anyone mention, predict what changing it does, and
  test it.
- The console lives in one terminal window on one machine. Could a server be
  commanded from a *different* window — or from a different computer entirely?
  Find out what exists for this. What you find is the subject of a later
  session, and there's no harm in arriving early.
- What command do you *wish* existed that doesn't? Write it down and keep the
  note. A surprising amount of what's ahead is about making the server do
  things it has no command for.

---

## What you have now

- You've read the entire settings surface of your server and hold a three-list
  map of it — including an honest *no idea* list, which is a tool, not a
  confession
- At least three settings changed deliberately — the motd, one world rule, and
  one you researched yourself — plus the edit → save → restart → verify rhythm
  and the reason the restart is in it
- You can talk to a running server: broadcast, time, weather, game rules,
  teleport, give — live, no restart
- Your player is an operator, and you know where that fact is written down
  (`ops.json`) and who can never lose power (the console)
- You've measured which live changes survive a restart and can explain the
  split: world-owned decisions versus server-owned decisions
- A server whose multiplayer-screen message is words you chose, and whose rules
  — death, daylight, weather — are whatever you last said they were, visible to
  anyone who joins
