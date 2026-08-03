# A player made of code

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every player who has ever joined your server was a person at a keyboard. This session
ends that streak. You're going to write a program — a real one, in a file, run from
the terminal — that connects to your server as a player, appears in the world, and
speaks in chat. Anyone standing nearby will see it arrive and see what it says. What
it says will be words you typed into a file.

This is the first program you write in this module, which makes it the biggest
session so far in terms of new ideas: a project folder, a package manager, a library,
a code file. Every one of them gets explained as it appears. The program itself, when
you get there, is around ten lines.

---

## Before you start

You need:

- **A sandbox server running a version that mineflayer supports.** mineflayer is the
  library this whole session is built on, and it only speaks certain Minecraft
  versions — [Choosing which Minecraft version your server runs](../choosing-a-version/guided.md)
  is where you researched what it currently supports and wrote the answer down. If
  your only server runs a version mineflayer doesn't support, set up a second server
  folder with an older jar — it's the same steps as
  [Running your own server](../running-your-own-server/guided.md), just in a new folder, and
  it costs nothing but disk space.
- **`online-mode=false` in that sandbox's `server.properties`.** You met this key in
  [The server is yours to change](../server-settings/guided.md) and deliberately left it
  alone; now it matters. Setting it to `false` tells the server not to check joiners
  against Mojang's account system — which is what lets a program without a Minecraft
  account join. It also means anyone who can reach the server can claim any name,
  which is why this rule is not optional: **the sandbox stays on your own machine or
  your own wifi — it is never exposed to the internet.**
- **The sandbox reachable at `localhost`** — where
  [Running your own server](../running-your-own-server/guided.md) left things.
- **Node and a `projects` folder**, from
  [Setting up a coding machine](../../../setup/lessons/dev-machine-setup/guided.md).

Quick checks that you're ready:

- Start the sandbox and read its first few lines: it prints its version, and that
  version matches the note you wrote in choosing-a-version.
- Join it from your game. If you can walk around in it, everything downstream of
  this will work.

---

## What you'll have at the end

By the end of this session you will have:

- A project of your own at `~/projects/first-bot`, with a program in it that you
  typed
- A second player on your sandbox — one that appears when you run a command and says
  what you told it to say — visible to anyone who joins
- Installed a library with a package manager, predicted how much code would arrive,
  and counted what actually did
- Broken the connection three different ways on purpose and read every error

---

## New tools

**mineflayer** is the library you researched in
[choosing a version](../choosing-a-version/guided.md): code written by other people that
knows how to speak Minecraft's network language and play as a player. You found out
then which versions it supports; today you install it and use it. A **library**, as
a reminder, is exactly that — someone else's working code that your program can call
on, so you write the ten lines that are yours instead of the ten thousand that
aren't.

**npm** is Node's package manager — the tool that fetches published libraries and
keeps track of which ones your project uses. You already have it: it came along
silently when Node was installed. Check, in any terminal:

```
npm --version
```

A version number means you're set.

**A project folder.** Your bot will live at `~/projects/first-bot` — and pointedly
*not* inside the server's folder. The bot and the server are two separate programs.
They will talk to each other over the network, exactly the way your game talks to
the server. Two programs, two folders.

**Two terminals.** From today on, your working setup is one terminal window running
the sandbox (its console, printing its log) and a second terminal window where you
run your own program. Both windows will have things to say about the same events,
from opposite sides.

One rule for this session and every programming session after it: **setup commands
may be copied and pasted, but the program itself is typed by hand.** Typing forces
you to read every character, and reading every character is where the learning is.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- `npm install mineflayer` fetches one library. How much code do you think arrives —
  as in, how many folders will appear? Write an actual number.
- The server prints a constant stream of log lines while it runs. When your bot
  program runs, what will *its* terminal window show?
- The moment the bot joins, what do you expect the *server's* console to print?
  You've watched yourself join from the server's side before.

---

## The work

### Give the bot a home

In a terminal:

```
mkdir ~/projects/first-bot
cd ~/projects/first-bot
npm init -y
```

`npm init` creates a new file, `package.json` — a settings file describing *your
project*: its name, its version, and eventually which libraries it depends on. The
`-y` accepts all the default answers instead of asking questions.

Open the folder in VS Code and read `package.json` — all of it; it's short. Notice
the shape it's written in: names and values, like `server.properties`, but dressed
differently — curly braces around the whole thing, quotes around the names, colons
instead of equals signs. This shape is called **JSON**, and it's one of the small
family of shapes settings files come in. You'll be seeing it everywhere for the rest
of your computing life.

### Install mineflayer — but predict first

You wrote down a number in the Predict section. Look at it once more. Then:

```
npm install mineflayer
```

When it finishes, look at what happened to the folder:

```
ls node_modules
```

Count the folders (or let the machine count:
`ls node_modules | wc -l`). Compare that with your prediction.

You asked for one library. Everything else in there is what that library needs to do
its job — and what *those* need, and so on down. This is what a **dependency** is:
code your code depends on, which has dependencies of its own. `node_modules` is the
whole tree, downloaded and sitting on your disk, which is why the folder for a
ten-line project is about to be the biggest thing you own. Every Node project in the
world has one of these folders and nobody is embarrassed about it.

Two smaller things also happened. Open `package.json` again — mineflayer is now
listed in it, under `dependencies`: your project's settings file records what it
uses. And a new file, `package-lock.json`, appeared — an exact inventory of
everything that just arrived and its versions, kept so this same install can be
reproduced identically later. You don't need to do anything with it; just know what
it is.

### Read the front page

Before writing anything, go read the real documentation. Open the mineflayer project
on GitHub — `PrismarineJS/mineflayer`, the same page you visited in
choosing-a-version — and read the first screen of the README, the part with a
complete example bot in it.

Read the example line by line, and for each line, say out loud what you think it
does. You won't be sure about all of them. That's fine — you're not memorizing it,
you're meeting it. This README is the authoritative source for everything in this
session: where this page and that one disagree, the README wins, because it's
maintained and this page could have been written a year ago.

### Write bot.js — typed, not pasted

In VS Code, create a new file in `~/projects/first-bot` named `bot.js`.

Your goal: running the file makes a player appear on your sandbox and say one line
in chat — words you chose.

Your bot is not quite the README's bot. You have decisions to make that the example
made differently: which machine to connect to, which port, what the bot is called
(pick a name that isn't yours), and what it does the moment it arrives. Type every
character yourself.

<details>
<summary>Stuck? Start here</summary>

The README example already connects to a server — that part of its shape is exactly
what you need. Three of its values are choices, and yours differ: which machine the
sandbox is on (you've used the name for "this machine, myself" before), which door
on that machine (your sandbox's `server.properties` knows its port), and the bot's
name.

Then there's the part the example doesn't do: yours should say something the moment
it arrives in the world.

</details>

<details>
<summary>The concepts, named</summary>

`createBot` takes a settings object — host, port, username, inside curly braces. It
looks JSON-ish for the same reason `package.json` does: it's names and values.

For the speaking part: programs like this one are built from **events**. You don't
write "do this, then this, then this." You write "**when** this happens, run this
function." The bot object announces events by name — there's one that fires when the
bot spawns into the world, and the README's example and the docs both use events, so
you've already seen the shape. Saying something in chat is a single method call on
the bot.

</details>

<details>
<summary>The structure, with the load-bearing parts missing</summary>

```js
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: ____,        // which machine? the sandbox is on this one
  port: ____,        // the sandbox's door — its server.properties knows
  username: ____,    // the bot's player name, in quotes
})

bot.once('spawn', () => {
  ____               // one method on bot says things in chat — the README shows it
})
```

The first line is how a file uses installed code: `require('mineflayer')` reaches
into `node_modules` and hands you the library. `bot.once('spawn', ...)` means "the
first time the spawn event happens, run this function" — `once` fires a single
time, where `on` would fire every time.

</details>

<details>
<summary>A complete version, to compare against</summary>

If your bot is working: read this against your file and note any differences —
different is not wrong, but every difference should be explainable.

If your bot is not working and the hints above didn't unstick it: type this in, get
it running, and *then* find what was different in your earlier attempt. Finishing
with a working bot you can study beats finishing with a broken one you can't.

```js
const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 25565,          // use your sandbox's port if it differs
  username: 'Robby',    // any name that isn't yours
})

bot.once('spawn', () => {
  bot.chat('I am made of code.')
})
```

And once more: if this and the mineflayer README disagree about anything, the
README wins.

</details>

### Run it

Sandbox running in one terminal. In your second terminal:

```
cd ~/projects/first-bot
node bot.js
```

Now look in three places, in order:

1. **The bot's terminal.** Check it against your prediction. It doesn't print a log
   the way the server does — it just sits there, running. Quiet is what success
   looks like here.
2. **The server's console.** There's a new line in it: a player joined. It is the
   same announcement your own joins produce. Read it closely — nothing about it
   says "program."
3. **The game.** Join the sandbox yourself. Standing in the world is a player that
   is your code, and in chat is the line it spoke. Anyone who joins this server
   sees exactly what you're seeing.

When you're done looking: press Ctrl-C in the bot's terminal. The program ends, and
in the world, the bot leaves. That's the whole lifecycle — `node bot.js` to exist,
Ctrl-C to stop existing.

---

## Break it on purpose

Cause each one, read the whole message, undo it.

**Refuse the connection.** Type `stop` in the sandbox's console so the server shuts
down cleanly. Now run the bot anyway. It fails — read the error, all of it. The
important word in it is `ECONNREFUSED`: connection *refused*. Your machine was
reached and answered plainly that nothing is listening on that port. A refusal is
not silence — it's a definite "no" from a machine that heard the question. (If
you've done [Joining over LAN](../joining-over-lan/guided.md), you've met refusal's cousin,
the timeout — which is what silence looks like.) Start the sandbox again, run the
bot, and watch it work like nothing happened.

**Knock on a locked door.** If there's a server around with `online-mode=true` — a
family server, or any normal server on your own network — try pointing the bot at
it: change `host` and `port` to reach it, and run. Read what happens. This is the
experiment that proves why your sandbox is set up the way it is: a normal server
demands a verified Minecraft account, your program doesn't have one, and
`online-mode=false` is the door your sandbox deliberately leaves unlocked for it.
It's also exactly why that unlocked door stays off the internet. Point `host` and
`port` back at the sandbox afterwards. (No server like that handy? Skip this one —
you'll see the same wall the first time you ever aim a bot at a normal server by
accident.)

**Lie about the version.** `createBot` accepts one more setting you haven't needed:
`version`. Add it, and claim something far from what your sandbox runs — if the
sandbox is on a 1.21 release, claim `version: '1.12.2'`. Run, and read the refusal.
You have now seen the version wall three times: from the game client in
choosing-a-version, in mineflayer's own supported-versions research, and now caused
by one line of your own code — because the version is a *claim the client makes*,
and you just made a false one. Delete the line; without it, mineflayer works out
the server's version on its own.

---

## What just happened

Your program is a **client**. That word has been following you since
[Running your own server](../running-your-own-server/guided.md): the game is a client, and
now so is eleven lines of your JavaScript. The server speaks one network language to
everything that connects, and it cannot tell code from person — you saw the proof in
its console, where your bot's join line is indistinguishable from yours.

Here's the division of labor that made that possible. Minecraft's network language
is thousands of precisely-shaped messages — the very thing that, as you learned in
choosing-a-version, volunteers have to re-decode every time Minecraft updates. The
*library* handles all of that. Your *file* supplied only the intent: who to be,
where to go, what to do on arrival. Huge library underneath, small file on top —
that ratio is normal, it's what `node_modules` physically is, and it's why the
folder of borrowed code dwarfs the code that's yours. `require('mineflayer')` is the
line where yours reaches into theirs.

And one idea from today matters more than the rest, because the next several
sessions live inside it: `bot.once('spawn', ...)` doesn't mean "do this now." It
means "**when** this happens, run this." Your program spends nearly all its time
waiting — the library watches the connection, and when the right thing happens, it
calls the function you handed it. Programs built this way are called
**event-driven**, and almost everything interactive works like this: games waiting
on keypresses, apps waiting on taps, servers waiting on connections. You've written
your first one.

---

## Go further

- The README's first-screen example does more than connect. What else does it do,
  and what happens if you type that ability into your bot? (The full list of
  everything a bot can react to is long, and it's a later session's assignment — for
  now, just the first screen.)
- Could two bots run at once? What would have to be different between them — and
  what happens if it isn't? You have the pieces to guess and the sandbox to check.
- What happens if the bot's `username` is the same as the name you join with? The
  sandbox is free — find out.
- `package.json` has fields nobody explained today. What is `"main"` for? Does
  anything break if you change `"name"`?

---

## What you have now

- A project at `~/projects/first-bot`: `package.json`, `node_modules/`,
  `package-lock.json`, and a hand-typed `bot.js` that joins your sandbox and speaks
- A bot that anyone on the sandbox can watch arrive — run `node bot.js` and it
  exists, Ctrl-C and it doesn't
- The two-terminal rhythm: sandbox console in one window, your program in the other
- Words the next lessons use freely: library, dependency, `require`, event, handler
