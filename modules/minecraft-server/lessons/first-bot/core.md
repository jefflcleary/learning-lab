# A player made of code

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** first-bot
- **Part:** Part 4 — First programs
- **Scaffolding:** level 1 — first program the learner has ever written and run.
  Heaviest new-concept load in the module so far (npm, dependencies, a code file,
  events). Rung 4 permitted: ending with nothing working is worse than ending with
  something compared. Completion problem used for the syntax-heavy moment.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

Write and run the learner's first program: `bot.js`, a mineflayer bot that connects
to the sandbox server and speaks in chat when it spawns. Payoff: a player appears in
the world — visible to anyone on the sandbox — whose every act is a line the learner
typed. Under the surface: npm and dependencies made physical (node_modules counted by
hand after a prediction), the two-programs-two-folders architecture, events as the
shape of this kind of programming, and the sandbox's reason for existing proven by
experiment rather than asserted.

## Prerequisites

- A sandbox server on a version mineflayer supports — the version decision and how
  to verify support are established by `lessons/choosing-a-version/`; how any server
  gets set up (a second server folder with the older jar is just the same steps
  again) is established by `lessons/running-your-own-server/`
- `online-mode=false` set in the sandbox's `server.properties` — editing that file is
  established by `lessons/server-settings/`
- The sandbox reachable at `localhost` — established by
  `lessons/running-your-own-server/`
- Node installed and a `~/projects` folder — established by
  `modules/setup/lessons/dev-machine-setup/`

Self-checks for delivery: sandbox starts and its first lines print the version, which
matches the learner's written note from choosing-a-version; the learner can join it
from their game.

## Establishes

- A project at `~/projects/first-bot` with `package.json`, `node_modules/`,
  `package-lock.json`, and a hand-typed `bot.js` that connects to the sandbox and
  chats on spawn
- The learner has run `npm init` and `npm install`, and has seen (and counted) what a
  dependency tree physically is
- The two-terminal working rhythm: server console in one window, bot in another
- Words later lessons use freely: library, dependency, `require`, event, handler
- Cited by other cores as: "a bot that joins your sandbox and speaks — established by
  `lessons/first-bot/`."

## Facts

- **npm** ships with Node — it was installed, silently, back in dev-machine-setup.
  Verify: `npm --version`. It is Node's package manager: it fetches published
  libraries and records which ones a project uses.
- `npm init -y` creates `package.json` — a settings file describing *this project*
  (name, version, dependencies). The `-y` accepts all defaults without asking.
  `package.json` is JSON: the second settings-file shape the learner has met
  (key=value in `server.properties` was the first; curly braces, quotes, and colons
  here). Datapack lessons also introduce JSON; do not assume the learner has been
  there — describe the shape plainly.
- `npm install mineflayer` does three visible things: creates `node_modules/` (the
  actual downloaded code — mineflayer *and everything mineflayer itself depends on*,
  dozens of folders for one requested library), adds a `dependencies` entry to
  `package.json`, and creates `package-lock.json` (the exact versions of everything
  that arrived, so the same install can be reproduced — name it lightly, one
  sentence, no more).
- Folder count in `node_modules` after installing mineflayer: on the order of a
  hundred [volatile as of 2026-07 — never assert the number; the learner predicts,
  then counts with `ls node_modules` or `ls node_modules | wc -l`].
- Project folder: `~/projects/first-bot`. **Not inside the server folder.** The bot
  and the server are two separate programs in two separate folders; they talk over
  the network, exactly like the game client does.
- mineflayer project: `PrismarineJS/mineflayer` on GitHub. The README's first screen
  contains a complete working example bot [verify current README example shape —
  historically: createBot with host/port/username, a chat-echo handler including a
  self-guard, kicked/error logging]. Deliveries send the learner to read it there;
  they do not reproduce it.
- API shapes (core sketch; deliveries point at the README/docs rather than asserting
  signatures):
  - `const mineflayer = require('mineflayer')` — `require` is how one file pulls in
    installed code; it looks in `node_modules`.
  - `mineflayer.createBot({ host, port, username })` — returns the bot object.
    `version` can also be passed; if omitted, mineflayer detects the server's
    version automatically [verify].
  - `bot.once('spawn', () => { ... })` — run this function one time, when the bot
    spawns into the world. `on` = every time, `once` = first time only.
  - `bot.chat('text')` — say something in game chat.
- Run: `node bot.js`. The process stays alive — the connection is open. Ctrl-C ends
  the bot process; in game, the bot player leaves.
- The bot's `username` should be different from the learner's own player name.
  Joining an offline-mode server with a name already in use kicks the existing
  player [verify exact collision behavior — Go Further material, not asserted].
- The sandbox's port is whatever its `server.properties` `server-port` says (25565
  default). If the sandbox and another server ever run at the same time, their ports
  must differ (the port break-it in running-your-own-server is the proof).
- **Security fact, stated plainly in learner text once:** `online-mode=false` means
  the server does not check joiners against Mojang's account system — anyone can
  connect claiming any name. That is what lets a bot in without an account, and it
  is why the sandbox must never be reachable from the internet. Sandbox stays on
  localhost/LAN.
- Error shapes for break-it:
  - Sandbox stopped → `Error: connect ECONNREFUSED 127.0.0.1:<port>` — the machine
    answered "nothing is listening on that port." Contrast with a *timeout* (nobody
    answered at all) — the learner has met that pair if they did
    `lessons/joining-over-lan/`; reference conditionally.
  - Against an `online-mode=true` server → the connection fails at the
    authentication step [verify exact failure mode and message — mineflayer without
    valid Microsoft auth is refused; delivery frames the whole thing as an
    experiment: run it, read what you get, do not pre-state the message].
  - `version:` set to a deliberately wrong version in createBot → protocol mismatch
    error [verify exact text — may be thrown by mineflayer or refused by the
    server]. Third appearance of the version-mismatch idea: client-side in
    choosing-a-version, now caused from code.

## Arc

### Orientation — given plainly

What a library is (recap from choosing-a-version: mineflayer was named and researched
there; today it gets installed). What npm is and that it's already on the machine.
What `package.json` is; what `npm install` will do; what `node_modules` is. The
two-folders architecture stated as a fact with its reason. The typed-by-hand rule:
setup commands may be copied; `bot.js` is typed, every character. The README's first
example named as the thing to go read — reading real project documentation is the
skill, and the README is where the answer actually lives. The security fact about
online-mode and localhost/LAN. The two-terminal reality: one window is the sandbox's
console, another runs the bot; both talk, about the same events, from opposite sides.

### Predictions to elicit

- `npm install mineflayer` fetches one library. How much do you think arrives —
  how many folders in `node_modules`? Write a number.
- When the bot runs, what will its terminal look like? The server prints a constant
  log — will the bot?
- The moment the bot joins: what do you expect the *server's* console to print? You
  have seen a player join from the server's side before.

### The work — goals and hint ladders

1. **Give the bot a home.** `mkdir ~/projects/first-bot`, `cd` into it,
   `npm init -y`, then open the folder in VS Code and read `package.json` — every
   line of a five-line file. It's JSON: names and values, colons and curly braces —
   a second shape for the same idea `server.properties` expressed as `key=value`.
   No hints needed; this is setup, given plainly.
2. **Install mineflayer — but predict first.** Write down the node_modules
   prediction, run `npm install mineflayer`, then look: `ls node_modules` (count, or
   `ls node_modules | wc -l`). Open `package.json` again — what changed? One
   sentence on `package-lock.json`: the exact inventory of what arrived, kept so the
   install can be repeated identically. The startling count *is* the concept:
   mineflayer needed helpers, the helpers needed helpers. Given plainly; the only
   withheld thing is the number, which the learner measures.
3. **Read the front page.** Go to `PrismarineJS/mineflayer` on GitHub and read the
   README's first screen — the part with the example bot in it. Read the example
   line by line and say what you *think* each line does before writing anything.
   This is orientation delivered by the real project, per the boundary case in
   PRINCIPLES.
4. **Write `bot.js` — typed, not pasted.** Goal: running `node bot.js` makes a
   player appear on the sandbox and say one line in chat, words the learner chose.
   The learner's bot differs from the README example: their sandbox's port, their
   bot's name, and *speaking on arrival* rather than echoing chat.
   - Rung 1: the README example already connects to a server. Three things about it
     are choices you need to make differently: which machine, which door on that
     machine, what name. And yours should do something the example doesn't do the
     moment it arrives in the world.
   - Rung 2: `createBot` takes a settings object — host, port, username — which is
     JSON-shaped for the same reason `package.json` is: names and values. For the
     speaking part: this kind of program is built from *events*. You don't write
     "do this, then this"; you write "when X happens, run this function." The
     event you want fires when the bot spawns into the world, and the docs list
     every event by name. Saying something in chat is one method call on the bot.
   - Rung 3: completion problem — the structure with load-bearing parts blanked:

     ```js
     const mineflayer = require('mineflayer')

     const bot = mineflayer.createBot({
       host: ____,        // which machine? the sandbox is on this one
       port: ____,        // the sandbox's door — its server.properties knows
       username: ____,    // the bot's player name, in quotes
     })

     bot.once('spawn', () => {
       ____               // one method on bot says things in chat — README shows it
     })
     ```

   - Rung 4 (worked answer, framed as comparison once something runs — and if
     nothing runs, as the thing to type, run, and *then* diff against your own
     attempt):

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

     Delivery frames: if this and the README disagree, the README wins — it's
     maintained, this page could have aged.
5. **Run it.** Sandbox running in one terminal; in another, from
   `~/projects/first-bot`: `node bot.js`. Then *look at three places*: the bot's
   terminal (quiet — compare against prediction), the server console (a join line —
   the same announcement the learner's own joins produce), and the game (join the
   sandbox: the bot is standing there, and its greeting is in chat). Name the
   two-terminal reality here. Ctrl-C stops the bot; in game it leaves.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Refuse the connection.** Stop the sandbox (`stop` in its console). Run the bot.
  Read the whole error: `ECONNREFUSED` means the machine answered and said "nothing
  is listening at that port" — a definite no, not silence. (Conditionally: if the
  learner did joining-over-lan, contrast with timeout = silence.) Undo: start the
  sandbox, run the bot, watch it work again. Teaches: the bot needs a listening
  server exactly as the game does, and connection errors name what went wrong.
- **Knock on the family server's door.** Only if a normal `online-mode=true` server
  exists (phrase as option, never assumed): point host/port at it and run the bot.
  It fails — read exactly how [do not pre-state the message; verify flag above].
  This is the experiment that proves *why the sandbox exists*: a normal server
  demands a verified account; the bot has none; `online-mode=false` is the door the
  sandbox deliberately leaves unlocked — which is also exactly why the sandbox stays
  off the internet. Undo: point host/port back at the sandbox.
- **Lie about the version.** Add a `version:` line to createBot with a version far
  from the sandbox's (e.g. `'1.12.2'` against a 1.21-line sandbox) [verify error
  text]. Run, read the refusal, compare it with the mismatch seen from the game
  client in choosing-a-version — same wall, third angle: version mismatch as a
  client-side claim this time, caused by one line of the learner's own code. Undo:
  delete the line (auto-detection returns) [verify auto-detect].

### What just happened — the explanation

The bot is a **client**. The server speaks one network language to everything that
connects; your game speaks it, and now your program speaks it, and the server cannot
tell code from person — the join line in its console is identical. The division of
labor: the library did the protocol (the thousands of message shapes that
choosing-a-version explained community tools must reverse-engineer per release), and
`bot.js` did the intent — eleven lines that say who to be, where to go, and what to
do on arrival. That ratio, huge library beneath small file, is what `node_modules`
is: not bloat, but all the borrowed labor, sitting where `require` can find it.

Events one layer deeper: `bot.once('spawn', ...)` is not "do this now" but "when
this happens, run this." The program mostly *waits*; the library calls your function
at the right moment. Nearly everything interactive — games, apps, servers — is built
this way, and the next lessons live entirely inside that shape.

### Go further — open questions

- The README's first screen shows the bot doing more than speaking. What else is in
  that example, and what happens if your bot does it too? (Deliberately only the
  first screen — the full events list is a later assignment.)
- Could two bots run at once? What would have to be different between them — and
  what happens if it isn't? (Echoes the two-servers question from
  running-your-own-server.)
- What happens if the bot's `username` is the same as the name you join with?
  [Genuinely useful to know; collision behavior left for the learner to measure.]
- `package.json` has fields nobody explained. What is `"main"` for? Does anything
  break if you change `"name"`?

## Delivery notes

- **guided:** the npm-install prediction/count is the emotional center of the
  dependency concept — never state the count, never soften the reveal. Keep the
  README-reading step *before* the write step; the answer living in real docs is the
  design, not a leak.
- The family-server break-it must read as optional ("if a server with online-mode on
  exists on your network or you can make one") — no assumed household.
- Rung 4 code must carry the "README wins if they disagree" framing and the
  port/name comments, so a straight retype still forces two decisions.
- No exclamation marks; the moment the bot appears carries itself.
