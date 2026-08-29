# Writing your first bot

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every player who has ever joined your server was a person at a keyboard. This session
ends that streak. You're going to write a program — a real one, in a file, run from
the terminal — that connects to your server as a player, appears in the world, and
speaks in chat. Then you'll teach it something no greeting can do: a behavior. Chat
"come" and the bot walks to whoever called — even as they move. Chat "stay" and it
stops. Anyone on the server can watch it arrive, and anyone can summon it.

This is the first program you write in this module, which makes it the biggest
session so far in terms of new ideas: a project folder, a package manager, a library,
a code file — and then, once the bot is standing in the world, the two ideas that
turn a program from *doing a thing* into *continuously doing a thing*. Every one of
them gets explained as it appears.

One honest note before you start: the follower you build today will not be graceful.
It walks in straight lines, which means walls stop it, cliffs claim it, and water
confuses it. That's not you doing it wrong — walking *around* things is a genuinely
hard problem with its own name and its own session,
[later in the module](../bot-games-and-pathfinding/guided.md), which exists precisely
because of what you'll watch happen today. A creature that follows people imperfectly
is still a creature that follows people, and it's the intended result.

---

## Before you start

You need:

- **A sandbox server running a version that mineflayer supports.** mineflayer is the
  library this whole session is built on, and it only speaks certain Minecraft
  versions — [Choosing a Minecraft version](../choosing-a-version/guided.md)
  is where you researched what it currently supports and wrote the answer down. If
  your only server runs a version mineflayer doesn't support, set up a second server
  folder with an older jar — it's the same steps as
  [Running your own server](../running-your-own-server/guided.md), just in a new folder, and
  it costs nothing but disk space.
- **`online-mode=false` in that sandbox's `server.properties`.** You met this key in
  [Server settings and console commands](../server-settings-and-console/guided.md) and
  deliberately left it alone; now it matters. Setting it to `false` tells the server
  not to check joiners against Mojang's account system — which is what lets a program
  without a Minecraft account join. It also means anyone who can reach the server can
  claim any name, which is why this rule is not optional: **the sandbox stays on your
  own machine or your own wifi — it is never exposed to the internet.**
- **The sandbox reachable at `localhost`** — where
  [Running your own server](../running-your-own-server/guided.md) left things.
- **Node and a `projects` folder**, from
  [Setting up a coding machine](../../../dev-machine/lessons/dev-machine-setup/guided.md).

Quick checks that you're ready:

- Start the sandbox and read its first few lines: it prints its version, and that
  version matches the note you wrote in choosing-a-version.
- Join it from your game. If you can walk around in it, everything downstream of
  this will work.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This lesson leans on real documentation — [Finding the real documentation](../../../../reference/finding-the-docs.md) helps when searching turns up noise.

---

## What you'll have at the end

By the end of this session you will have:

- A project of your own at `~/projects/first-bot`, with a program in it that you
  typed
- A second player on your sandbox that anyone can summon with the chat message
  "come" — it walks to whoever said it, keeps correcting as they move, and stops
  politely close; "stay" is the off switch
- Installed a library with a package manager, predicted how much code would arrive,
  and counted what actually did
- Broken your program four different ways on purpose, read every error, and watched
  it crash — then fixed the assumption that crashed it
- A working grasp of the two ideas that make ongoing behaviors possible: state, and
  the repeating check

---

## New tools

**mineflayer** is the library you researched in
[choosing a version](../choosing-a-version/guided.md): code written by other people that
knows how to speak Minecraft's network language and play as a player. You found out
then which versions it supports; today you install it and use it. A **library**, as
a reminder, is exactly that — someone else's working code that your program can call
on, so you write the ten lines that are yours instead of the ten thousand that
aren't. Its documentation lives in the `PrismarineJS/mineflayer` repository on
GitHub: the README you'll read today, and an API document listing everything a bot
can know and do, which the second half of this session leans on.

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
- Later today the bot will walk toward a *moving* player. How often should a program
  re-check where they are? Once? Every second? Every step? What would go wrong at
  each rate?
- What should the bot do when the person it's following climbs somewhere it can't
  walk to? Decide what you think *should* happen — then compare with what does.

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
   is your code, and in chat is the line it spoke.

When you're done looking: press Ctrl-C in the bot's terminal. The program ends, and
in the world, the bot leaves. That's the whole lifecycle — `node bot.js` to exist,
Ctrl-C to stop existing.

### From a moment to a behavior

Arriving and speaking are single moments — one event, one action, done. Everything
from here on is categorically different: a behavior that has to *keep being true
while the world changes*. Following someone means re-deciding, constantly, as they
move. Two ideas make that possible, and here they are plainly.

**State.** When someone chats "come", a function of yours will run — and end, a
millisecond later. But the *following* has to go on long after that function is
gone. So the answer to "who is the bot following?" has to live somewhere that
outlasts any single function: a variable at the top of the file, which every part
of the program can read and write. A variable used this way is the program's memory
between events. One wrinkle you'll hit: `const`, which you just used, declares a
name whose value can't be replaced. Memory that must *change* — someone new calls
"come", "stay" wipes it — is declared with `let` instead.

**The repeating check.** The person you're following moves. Whatever aiming you do
at the moment of "come" goes stale a second later, so something has to re-check and
re-aim, over and over, for as long as the program runs. JavaScript has a built-in
for exactly this, and it's plumbing rather than puzzle, so here it is plainly:

```js
setInterval(() => {
  // this runs again and again, forever
}, 200)
```

That runs the function every 200 milliseconds — five times a second — until the
program ends.

**And a habit: edit, Ctrl-C, rerun.** A running `node bot.js` is the file *as it
was when you started it*, held in memory. Edits to the file on disk change nothing
until you stop the process (Ctrl-C) and run it again. You've met this exact
principle before — `server.properties` edits didn't land until a restart, for the
same reason. After every change from here on: Ctrl-C, `node bot.js`, retest.

Your reference for everything bot-shaped from here on is the mineflayer API
documentation — in the `PrismarineJS/mineflayer` repository, alongside the README.
The hints below will name things to look up; the looking-up is yours. And one
suggestion before surgery: your current `bot.js` works. Keeping a copy costs one
command — `cp bot.js bot-greeter.js` from inside the project folder — and means you
can always get back to known-good. Do that or don't, but know it's cheap.

Four goals now, each standing on the last. Test after every one — join the sandbox,
say the words in chat yourself, and watch.

### Answer the call

Goal: anyone chats "come" → the bot replies in chat, addressing the caller by name
— "On my way, Jeff" — but doesn't move yet. The by-name part is the point: it
proves your code knows *who* called.

<details>
<summary>Stuck? Start here</summary>

You've handled one event already. Chat is another event — but unlike spawn, this
one hands your function information when it fires. Your reply should use that
information.

</details>

<details>
<summary>The concepts, named</summary>

The event is called `chat`. Two things to settle from the docs: what arguments your
function receives when it fires, and the difference between `bot.once` and `bot.on`
— a follower needs to hear *every* message, not just the first. To react only to
the right word, compare the message with `===`, which is JavaScript's "exactly
equal" test.

</details>

<details>
<summary>Where to look</summary>

The `chat` event's entry in the mineflayer API document lists exactly what your
function receives. Testing is you: join the sandbox and type "come" in chat.

</details>

### Turn to face the caller

Goal: on "come", the bot turns on the spot to look at whoever said it. Facing is
one step short of walking, and it proves the harder half: that your code can find a
player's location in the bot's world.

<details>
<summary>Stuck? Start here</summary>

The bot has to be able to answer "where is that player *right now*?" The bot
object carries a directory of everyone online, organized by name — and thanks to
the last goal, you have the caller's name.

</details>

<details>
<summary>The concepts, named</summary>

From a player's directory entry you can reach their in-world body, and from the
body, its position. The bot has a method that turns to face a position. One catch
worth knowing now rather than later: the bot can only "see" players within its
view distance — a player's body information is in the directory only while they're
near enough. Remember this; it comes back.

</details>

<details>
<summary>Where to look</summary>

In the API document: `bot.players` (read what a player entry contains, and when),
positions, and `bot.lookAt`.

</details>

### Walk to the caller, and stop when close

Goal: the real thing. "come" makes the bot walk to the caller — correcting course
as they move — and stop a couple of blocks away instead of shoving them.

<details>
<summary>Stuck? Start here</summary>

Two separate problems. Split them.

Making the bot walk at all works like holding down a movement key — and note what
"holding" implies: a held key stays held until something releases it.

The moving target is the problem you made a prediction about: one aim at
"come"-time goes stale immediately. Something has to re-aim and re-decide, over and
over. You were handed the tool for over-and-over a few minutes ago.

</details>

<details>
<summary>The concepts, named</summary>

This is where both new ideas earn their place, together.

*State:* when "come" arrives, don't start walking inside the handler — just record
the caller's name in a top-level variable (`let`, because it changes) and let the
handler end.

*The repeating check:* a `setInterval` function, running several times a second,
that asks: is anyone being followed? If not, do nothing. If so, look up their
current position, face it, and set the forward control on or off depending on how
far away they are. Distance between two positions is a single method call — the
documentation on positions has it.

And stopping: stopping is not "don't press forward." It's "*release* forward" —
controls stay where you set them until you set them back.

</details>

<details>
<summary>Where to look</summary>

In the API document: `bot.setControlState` (read the list of controls and what the
true/false argument means) and the position type's methods for distance. Workable
starting numbers, tune both by watching: check every 200 milliseconds, stop at
about 2 blocks.

</details>

When it works, spend a minute actually playing with it. Walk in circles — it cuts
the corner to chase you. Back away — it keeps coming. Then lead it at a wall, and
watch the honest limitation arrive on schedule: it walks a straight line at you,
and the wall wins. Today that's expected. Later it's a lesson.

### "stay" means stay

Goal: anyone chats "stay" → the bot stops where it is and stops caring where
people are, until the next "come".

<details>
<summary>Stuck? Start here</summary>

Following is two pieces — the memory and the repeating check. "stay" only needs to
touch the memory... plus deal with whatever the controls happened to be doing at
that exact instant.

</details>

<details>
<summary>The concepts, named</summary>

Clear the state variable — "nobody" is a value too, and `null` is JavaScript's
word for it. And release the forward control. If the bot slides one extra step
after "stay", you did one of those and forgot the other — work out which from what
you see.

</details>

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Refuse the connection.** Type `stop` in the sandbox's console so the server shuts
down cleanly. Now run the bot anyway. It fails — read the error, all of it. The
important word in it is `ECONNREFUSED`: connection *refused*. Your machine was
reached and answered plainly that nothing is listening on that port. A refusal is
not silence — it's a definite "no" from a machine that heard the question. (If
you've done [Letting friends join your server](../letting-friends-join/guided.md), you've
met refusal's cousin, the timeout — which is what silence looks like.) Start the
sandbox again, run the bot, and watch it work like nothing happened.

**Lie about the version.** `createBot` accepts one more setting you haven't needed:
`version`. Add it, and claim something far from what your sandbox runs — if the
sandbox is on a 1.21 release, claim `version: '1.12.2'`. Run, and read the refusal.
You have now seen the version wall three times: from the game client in
choosing-a-version, in mineflayer's own supported-versions research, and now caused
by one line of your own code — because the version is a *claim the client makes*,
and you just made a false one. Delete the line; without it, mineflayer works out
the server's version on its own.

**Never let go.** Comment out the line that releases the forward control — the one
that runs when the target is close. (Putting `//` in front of a line turns it into
a comment: still in the file, invisible to Node.) Rerun, say "come", stand still,
and watch it arrive — and keep walking. Into you, past you, into the wall, legs
churning forever. This is the difference between *doing* and *not-stopping*: the
control is a held key, and state you set stays set until something clears it. A
remarkable amount of the strange behavior in all software is exactly this — state
someone set and forgot to clear. Restore the line, rerun.

**Walk it off its map.** Have the bot follow you, then sprint away or drop behind a
hill until you're well out of its view distance — and watch the bot's terminal, not
the game. The program crashes. Read the whole message before touching anything. It
tells you it tried to read `position` from something that wasn't there: the
player directory only holds a body for players the bot can currently see — you
learned that two goals ago — and your repeating check assumed *forever* something
that was only true *sometimes*. The fix is to check before touching: if the
target's body isn't available this tick, skip the tick — or give up following;
your call, it's a policy decision. Make the fix, rerun, sprint away again, and
prove it survives you.

---

## What just happened

Your program is a **client**. That word has been following you since
[Running your own server](../running-your-own-server/guided.md): the game is a client, and
now so is a file of your JavaScript. The server speaks one network language to
everything that connects, and it cannot tell code from person — you saw the proof in
its console, where your bot's join line is indistinguishable from yours.

Here's the division of labor that made that possible. Minecraft's network language
is thousands of precisely-shaped messages — the very thing that, as you learned in
choosing-a-version, volunteers have to re-decode every time Minecraft updates. The
*library* handles all of that. Your *file* supplied only the intent: who to be,
where to go, what to do on arrival, who to follow. Huge library underneath, small
file on top — that ratio is normal, it's what `node_modules` physically is, and it's
why the folder of borrowed code dwarfs the code that's yours. `require('mineflayer')`
is the line where yours reaches into theirs.

Now run the bot and don't say anything in chat. What is the program doing right now?

Almost nothing — and that's the deep fact of the session. `bot.on('chat', ...)`
doesn't mean "do this now"; it means "**when** this happens, run this." An event
fires, a handler runs for a millisecond, everything goes quiet. The interval ticks,
checks, goes quiet again. Between those instants the program isn't "doing" anything
at all. The only thing that carries across the quiet is state — one variable holding
one name. The chat handler writes it; the tick reads it; and the behavior a human
watching the screen would swear they see — "it follows people" — exists *nowhere in
the code as a single thing*. It's what memory plus a repeating check add up to from
the outside.

This shape has a name — the **event loop** — and it is the shape of essentially
every interactive program: games waiting on input, apps waiting on taps, your
Minecraft server itself running its own tick loop twenty times a second to decide
what every mob does next. Node runs an event loop under every program you will
write in this module. You didn't just use one today; you built a creature out of
one.

And the wall, one more time, because it's a real result: your follower is beaten by
terrain, and no amount of polishing *this* approach fixes that. Walking around
obstacles means searching possible routes through the world — a hard problem with a
name, **pathfinding**, and [a session of its own](../bot-games-and-pathfinding/guided.md)
later. Knowing exactly where today's tool stops working isn't a defeat. It's what
owning a tool feels like.

---

## Go further

- Knock on a locked door. If there's a server around with `online-mode=true` — a
  family server, or any normal server on your own network — point the bot's `host`
  and `port` at it, run it, and read exactly how it fails. This is the experiment
  that proves why your sandbox is set up the way it is: a normal server demands a
  verified Minecraft account, your program doesn't have one, and
  `online-mode=false` is the door your sandbox deliberately leaves unlocked for it
  — which is also exactly why that unlocked door stays off the internet.
- Could two bots run at once? What would have to be different between them — and
  what happens if it isn't? Related: what happens if the bot's `username` is the
  same as the name you join with? The sandbox is free — find out.
- The controls include more than forward — the API document lists them all. Could
  the bot sprint when the caller is far and walk when they're near? Could a
  well-timed jump carry it up a one-block step?
- Make it follow at a respectful distance — hold itself exactly four blocks away,
  even backing up when you step toward it. What does "exactly" cost you at the
  check rate you picked?
- When another player is available on your sandbox — a housemate, or you from a
  second machine if you've done
  [Letting friends join your server](../letting-friends-join/guided.md) — have *them* say
  "come", and watch. Did you store *the caller*, or did you quietly assume the only
  person who'd ever call is you? If the bot walks to them, your code was honest.
  If it walks to you, or crashes, go find the assumption — it's in there, written
  down, wearing your name.
- A genuinely open one: how could a program *tell* that it was stuck? Watching the
  bot churn against a wall, you know instantly — but you're using eyes it doesn't
  have. What would the bot have to remember, and compare across time, to notice
  that about itself? Anything you invent here is a real answer; this exact
  question is a live problem in robotics, not just in Minecraft.

---

## What you have now

- A project at `~/projects/first-bot`: `package.json`, `node_modules/`,
  `package-lock.json`, and a hand-typed `bot.js` that joins your sandbox, speaks,
  follows the caller on "come", and stops on "stay" — for anyone on the sandbox
- The two-terminal rhythm — sandbox console in one window, your program in the
  other — and the edit, Ctrl-C, rerun habit
- You've used `on` where `once` won't do, kept memory between events, run a check
  on a timer, and read a real crash message down to the missing thing it named
- The felt difference between an action and an ongoing behavior — and the
  knowledge that controls, once set, stay set
- Words the next lessons use freely: library, dependency, `require`, event,
  handler, state
- A precise map of where naive following fails, which is the reason a pathfinding
  session exists later
