# Talking to a running server

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

When you changed your server's settings, every change followed the same rhythm: edit
the file, restart, check. The restart was mandatory because the server reads its
settings file exactly once, at startup.

This session is about the server's other door. The terminal window a running server
lives in doesn't just print — it listens. You've used that once already: `stop` is a
command, typed into a running server, obeyed immediately. It turns out `stop` has
hundreds of siblings. There is a whole language for talking to a server *while it
runs*: change the time of day, summon a storm, rewrite the rules of the world under a
player's feet — no restart, no waiting, live.

By the end you'll speak enough of that language to run your world like someone who
owns it, because you do.

---

## Before you start

You need:

- **A server you can start, stop, and join.**
  [Running your own server](../running-your-own-server/guided.md) gets you there. Quick
  check: start your server, wait for the **Done** line, join it from your game, then
  type `stop` in the terminal and watch it save and exit.
- **You've changed server settings and know how to make a change land.**
  [The server is yours to change](../server-settings/guided.md) covers it. Quick check: you
  can say from memory why editing `server.properties` does nothing until a restart.

---

## What you'll have at the end

By the end of this session you will have:

- Made the server itself speak into every player's chat
- Controlled time, weather, and the rules of the world from the console, live,
  while standing in the world watching it happen
- Made yourself an **operator** — able to run these commands from inside the game —
  and found the file where that power is written down
- Run an experiment that reveals which live changes survive a restart and which
  quietly snap back, and why

---

## New tools

**The console** is not a new window — it's the terminal your server already runs in.
What's new is knowing that it listens. Anything you type there while the server is
running gets read as a **command**: a line of text the server parses and acts on. In
the console, commands are typed bare: `stop`, not `/stop`. Inside the game, commands
go into the chat window and must start with `/` — that's how the game tells a command
apart from something you're saying to other players.

**The Commands page on minecraft.wiki** documents every command the server
understands — what each one is called, what it takes, what it does. It's the complete
map of this language, and you'll open it early in this session. Everything else you
need is already installed.

---

## Predict

Write your answers down first:

- Changing `server.properties` required a restart. Will console commands require one
  too? If not — what's different about how the two kinds of change reach the server?
- Will commands work typed into the in-game chat as well as the console? For
  *anyone* who joins your server, or only for some people?
- At the end of this session you'll change the world in several ways — time,
  weather, world rules — and then restart the server. Which of those changes do you
  expect to still be there afterwards? All of them? None? Write down a guess now;
  you'll check it against reality later.

---

## The work

### Make the server speak

Start your server and join it. Arrange things so you can see both the game and the
terminal — side by side, or a housemate's screen and yours.

Click into the console and type:

```
say hello from the machine
```

Look at the game. A message just appeared in chat that no player typed — the server
said it. Notice three things: no slash, no restart, and no delay. This is the live
channel, and everything in this session goes through it.

### Read the surface

Before using more of the language, see how big it is. Open
[minecraft.wiki](https://minecraft.wiki) and search the site for its **Commands**
page. Scroll the full list of commands, top to bottom. You are not memorizing
anything — you're taking the measure of the space. Roughly how many are there? Note
three that sound interesting and three whose names mean nothing to you.

Today uses about six entries from that list. The other several hundred will still be
there whenever you want them, and now you know where they live.

### Command the sky and the clock

Your goal: from the console, make it the middle of the night, then start a
thunderstorm — while you stand in the world and watch both happen. Then put the sky
back the way it was.

<details>
<summary>Stuck? Start here</summary>

The plain English words you'd use to describe what you want — the *time*, the
*weather* — are the words the commands use. You scrolled past both a few minutes
ago.

</details>

<details>
<summary>Naming them</summary>

The commands are `time set` and `weather`. Each takes one more word saying *which*
time or *which* weather. If you're not sure what words they accept, each command
has its own page on the wiki listing exactly that.

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

- `keepInventory` — when you die, do you drop everything you're carrying? (Normally
  yes: the rule starts out `false`.)
- `doDaylightCycle` — does time advance at all? (Normally `true`.)
- `mobGriefing` — can creepers destroy blocks, can endermen steal them? (Normally
  `true`.)

Useful to know: typing `gamerule` with a rule name and *no* value makes the server
tell you the current setting — worth doing before and after any change.

Your goal: pick two of the three. For each, write down exactly what will be
observably different in the world — specifically enough that you could be wrong.
Change them from the console, then verify with your own eyes. For `keepInventory`,
verification means dying on purpose: your call, somewhere convenient, and with the
rule turned on you'll lose nothing.

You just changed what death means in your world, with one line of text, while the
world was running.

### Get the power in-game

Everything so far went through the console. Now try the game side: open chat in-game
and type `/time set noon` — with the slash.

It refuses. Read the refusal completely — it's short, and it's telling you something
true: the server has a permission system, and you just met it. The console is allowed
everything, always. Players are allowed almost nothing until someone grants it. Your
goal: grant it — make your own player able to run these commands from inside the
game.

<details>
<summary>Stuck? Start here</summary>

The console has refused you nothing today. The game just did. So the difference
isn't the command — it's *who's asking*. Somewhere in the command list is the
command that changes who is allowed to ask.

</details>

<details>
<summary>The concept, named</summary>

The word is **operator** — "op" for short. An operator is a player the server
trusts with command power. The console grants it, and the command is named exactly
what it does. Find it on the Commands page.

</details>

<details>
<summary>The command</summary>

From the console:

```
op your-player-name
```

Then go back into the game and retry `/time set noon`.

</details>

When it works, one more thing. Look at your server's folder in VS Code: a file is
there that wasn't before — `ops.json`. Open it. That's the list of operators; your
name is in it. Even *who has power* on this server is written down in a file. And
notice its shape — brackets, quotes, colons. That's not the `key=value` shape you
know from `server.properties`. It's a second shape settings come in, it has a name,
and a later session is built around it.

### Play god for a minute

You're an operator standing inside your own world. Two goals, from in-game chat:

- Give yourself a stack of 64 diamonds out of thin air.
- Teleport yourself somewhere far away, then back — or, if someone else is online,
  teleport *them* to you and hand them the diamonds. Watching a friend get yanked
  across the map into a pile of free diamonds is the better version of this
  exercise.

<details>
<summary>Stuck? Start here</summary>

Both commands were in your scroll of the Commands page, and both are short names
for exactly what they do.

</details>

<details>
<summary>Naming them</summary>

`give` and `tp` (teleport). Both start with a *target* — who receives the items,
who gets moved. A player's name works as a target.

</details>

<details>
<summary>The full commands</summary>

```
/give your-player-name minecraft:diamond 64
/tp their-name your-player-name
```

</details>

### The persistence experiment

Here's where this session and the settings-file session collide.

You've changed the world live in several ways today. Make one more change: set the
world's `difficulty` — but this time by command, not by editing `server.properties`.
(You know the command exists; you've seen the setting before.)

Now make a table. One row per change you've made — time, weather, each game rule,
difficulty — and next to each, your prediction: **survives a restart** or **doesn't**.

Then run the experiment: `stop` the server, start it again, join, and check every
row. Read the current values rather than guessing — remember `gamerule` with no
value, and look at the sky.

The result will split — and the split is the interesting part. For every change that
survived: it lived through a restart, which means it must be *written down*
somewhere on disk. Where? You know where the server keeps things — go look until you
can point at the place. For every change that snapped back: something overwrote it
during startup. What file does the server read at startup, and what does it say?

Sit with this until you can explain the split out loud. It's the real lesson of the
day.

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Misspell a law.** From the console, type a gamerule command with the rule name
deliberately wrong — `gamerule keepInventry true`, say. Read the entire response.
The server didn't crash, didn't guess what you meant, didn't do something random —
it refused and named the problem. This is the shape of almost every command error
you will ever see: the server parses your text, rejects what it can't understand,
and explains. Nothing to undo; nothing happened.

**Fire yourself.** In-game, as an operator, run `/deop` on your own name. Now try
`/time set day` from chat and read the refusal again — this time as someone who
knows exactly what it means. Then recover: go to the console and `op` yourself back.
Notice what this proves. In-game power is just an entry in `ops.json` — grantable,
revocable, editable. But the console cannot be deopped. Whoever sits at the terminal
the server runs in holds the root of all power on that server. Worth remembering
when other people start joining your world.

---

## What just happened

Your server has two doors for decisions. One is the settings file: read once at
startup, which is why every change there needed a restart. The other is the console:
a live line into the running program, parsed the instant you press return. Same
program, two channels — one for decisions-at-rest, one for decisions-right-now.

And look at what actually travels through the live door: text. `time set midnight`
is a string of characters. The server reads it, matches it against its grammar, and
acts. Nothing in that story requires the characters to come from human fingers.
Later in this course you'll write programs that compose exactly these strings and
send them to the server themselves — tireless operators that never typo. Today you
learned the language. Later, you'll teach it to machines.

The persistence experiment exposed the server's filing system. Some decisions belong
to the *world* — they're stored inside the `world/` folder and travel with it; copy
that folder to another server and those rules ride along. Other decisions belong to
the *server* and get re-imposed from `server.properties` at every startup, stamping
over whatever you set live. Two owners of decisions, two places on disk — and now
you know which questions to ask of each.

---

## Go further

- The **Game rule** page on minecraft.wiki lists every rule that exists. Find one
  you've never heard anyone mention, predict what changing it does, and test it.
- Some servers you've seen show chat messages in colors, with text you can click.
  Plain `say` can't do that — something else can. What?
- The console lives in one terminal window on one machine. Could a server be
  commanded from a *different* window — or from a different computer entirely? Find
  out what exists for this. What you find is the subject of a later session, and
  there's no harm in arriving early.
- What command do you *wish* existed that doesn't? Write it down and keep the note.
  A surprising amount of what's ahead is about making the server do things it has no
  command for.

---

## What this leaves behind

- You can talk to a running server: broadcast, time, weather, game rules, teleport,
  give — live, no restart
- Your player is an operator, and you know where that fact is written down
  (`ops.json`) and who can never lose power (the console)
- You've measured which live changes survive a restart and can explain the split:
  world-owned decisions versus server-owned decisions
- A world whose rules — death, daylight, weather — are whatever you last said they
  were, visible to anyone who joins
