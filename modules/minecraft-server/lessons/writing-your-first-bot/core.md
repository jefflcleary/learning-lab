# Writing your first bot

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** writing-your-first-bot
- **Module / Part:** minecraft-server — Part 4 — First programs
- **Scaffolding:** fades within the lesson. The joining half (work goals 1–5) is
  level 1 — the first program the learner has ever written and run; heaviest
  new-concept load in the module (npm, dependencies, a code file, events); rung 4
  permitted (ending with nothing working is worse than ending with something
  compared); completion problem used for the syntax-heavy moment. The following
  half (work goals 6–9) is level 2 — second program of the skill: goals plus
  hints, concepts named but not applied, ladders stop at rung 3, no skeletons;
  the final goal ("stay") thins to two rungs.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

Write and run the learner's first program: `bot.js`, a mineflayer bot that connects
to the sandbox server, speaks in chat when it spawns — and then grows into a
creature that follows people: chat "come" and it walks to whoever called, "stay"
stops it. Payoff: a player appears in the world — visible to anyone on the sandbox —
whose every act is a line the learner typed, and that anyone can summon by chat.

Under the surface, two arcs in one session. First: npm and dependencies made
physical (node_modules counted by hand after a prediction), the
two-programs-two-folders architecture, events as the shape of this kind of
programming, and the sandbox's reason for existing proven by experiment. Second:
the gap between doing a thing *once* and doing a thing *continuously* — state (a
variable as the program's memory between events) plus a repeating check, arriving
physically before any `for` loop arrives syntactically.

The lesson also carries an honest limitation by design: naive following walks into
walls and off ledges, and the lesson says so plainly. Terrain defeats the simple
approach; real pathfinding exists (`lessons/bot-games-and-pathfinding/`, later)
*because* of exactly this. Ending with an imperfect follower is the intended ending.

## Prerequisites

- A sandbox server on a version mineflayer supports — the version decision and how
  to verify support are established by `lessons/choosing-a-version/`; how any server
  gets set up (a second server folder with the older jar is just the same steps
  again) is established by `lessons/running-your-own-server/`
- `online-mode=false` set in the sandbox's `server.properties` — editing that file
  is established by `lessons/server-settings-and-console/`
- The sandbox reachable at `localhost` — established by
  `lessons/running-your-own-server/`
- Node installed and a `~/projects` folder — established by
  `modules/dev-machine/lessons/dev-machine-setup/`

Self-checks for delivery: sandbox starts and its first lines print the version,
which matches the learner's written note from choosing-a-version; the learner can
join it from their game.

## Establishes

- A project at `~/projects/first-bot` with `package.json`, `node_modules/`,
  `package-lock.json`, and a hand-typed `bot.js` that connects to the sandbox,
  chats on spawn, follows the most recent caller on "come", and stops on "stay"
- The learner has run `npm init` and `npm install`, and has seen (and counted) what
  a dependency tree physically is
- The two-terminal working rhythm (server console in one window, bot in another)
  and the edit → Ctrl-C → rerun habit
- The learner has met: `bot.on` vs `bot.once` in practice, state shared between
  handlers, `setInterval`, reading a runtime crash (property of undefined/null)
- The felt distinction between an action and an ongoing behavior (set-and-forget
  controls; state left on)
- Words later lessons use freely: library, dependency, `require`, event, handler,
  state
- Cited by other cores as: "a bot with events and state — 'come'/'stay' following —
  established by `lessons/writing-your-first-bot/`."

## Facts

Joining half:

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
  they do not reproduce it. The API document in the same repo is the reference for
  the following half.
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
    `lessons/letting-friends-join/`; reference conditionally.
  - Against an `online-mode=true` server → the connection fails at the
    authentication step [verify exact failure mode and message — mineflayer without
    valid Microsoft auth is refused; framed as an experiment: run it, read what you
    get, do not pre-state the message]. Kept as a Go Further experiment in this
    merged lesson (break-it budget), phrased as option — never assumed household.
  - `version:` set to a deliberately wrong version in createBot → protocol mismatch
    error [verify exact text — may be thrown by mineflayer or refused by the
    server]. Third appearance of the version-mismatch idea: client-side in
    choosing-a-version, now caused from code.

Following half:

- Work continues in `~/projects/first-bot/bot.js` (or a copy — copying `bot.js` to
  keep the working greeter is cheap and worth suggesting; `cp bot.js bot-greeter.js`
  keeps the known-good version, learner's choice).
- Restart-to-apply for code: a running `node` process is the old file in memory —
  Ctrl-C and `node bot.js` again after every edit. Same principle the learner met
  with `server.properties` (read at startup); name the rhyme.
- API shapes (core sketch; deliveries point at the mineflayer docs — the API
  document in the `PrismarineJS/mineflayer` repo — rather than asserting
  signatures):
  - `bot.on('chat', (username, message) => { ... })` — fires on every chat message;
    first argument is the speaker's name [verify: also fires for the bot's own
    messages — the README's echo example guards against self, implying it does;
    this lesson's handlers only react to "come"/"stay" so self-triggering is inert
    here; the discovery is deliberately reserved for
    `lessons/bot-commands-and-building/`].
  - `bot.players` — object keyed by username; `bot.players[name]` has an `.entity`
    only while that player is within the bot's view distance, otherwise it is not
    usable [verify: entity is null when out of range].
  - `entity.position` — a Vec3 (x, y, z object); `position.distanceTo(other)`
    returns blocks between two positions [verify Vec3 method name].
  - `bot.entity.position` — the bot's own position.
  - `bot.lookAt(position)` — turns the bot's head to face a point [verify signature;
    verify: aiming at feet vs head — `entity.position` is at the feet; offsetting up
    by eye height looks more natural; do not assert the offset call, let docs/
    experiment decide].
  - `bot.setControlState('forward', true)` / `('forward', false)` — press/release a
    movement control, exactly like holding a key [verify]. Other controls exist
    ('jump', 'sprint') — Go Further, not taught.
- `setInterval(fn, ms)` — plain JavaScript, stable, no verify needed: run `fn`
  every `ms` milliseconds, forever, until stopped. 200 ms is a fine check rate for
  following (~5×/second); the exact number is not load-bearing.
- A top-level variable (e.g. `let target = null`) is visible to every handler in
  the file: handlers write it, the interval reads it. `let` vs `const`: `const`
  from the joining half can't be reassigned; a value that must change over time
  needs `let`. Name this at friction.
- Stopping distance: ~2 blocks works; closer and the bot shoves the player, larger
  and it hangs back. Learner tunes by experiment.
- Crash shape for the out-of-range break-it: `TypeError: Cannot read properties of
  null (reading 'position')` or similar [verify exact wording per Node version —
  delivery has the learner read whatever appears, not match a printed string].
- The naive follower's known failure modes (stated plainly, they are the honest
  limitation): walks straight lines only — into walls, off cliffs, into water;
  cannot detour, cannot jump gaps unless told; loses the target when the player
  leaves view distance. Perfect following is not achievable with today's tools in
  this lesson; `lessons/bot-games-and-pathfinding/` exists because of this.

## Arc

### Orientation — given plainly

Joining half: what a library is (recap from choosing-a-version: mineflayer was
named and researched there; today it gets installed). What npm is and that it's
already on the machine. What `package.json` is; what `npm install` will do; what
`node_modules` is. The two-folders architecture stated as a fact with its reason.
The typed-by-hand rule: setup commands may be copied; `bot.js` is typed, every
character. The README's first example named as the thing to go read — reading real
project documentation is the skill, and the README is where the answer actually
lives. The security fact about online-mode and localhost/LAN. The two-terminal
reality: one window is the sandbox's console, another runs the bot; both talk,
about the same events, from opposite sides.

Following half (delivered as a plain transition inside The work, after the greeter
runs — orientation is given where it's needed, once): the greeter did a thing once,
at one moment. Following is a behavior that has to keep being true as the world
changes. Two new ideas named up front, plainly:

1. **State.** Handlers run and end. For the bot to keep following between events,
   *who to follow* has to live somewhere that outlasts any one function — a
   variable at the top of the file, which every handler can read and write. A
   variable is the program's memory between events. `let` vs `const` named here.
2. **The repeating check.** Something must re-aim the bot as the target moves.
   `setInterval` runs a function on a timer, forever — given plainly with its
   signature, because it's plumbing, not the puzzle.

Also given plainly at the transition: the mineflayer API document location; the
edit → Ctrl-C → rerun rhythm and its rhyme with restart-to-apply from
server-settings; the copy-before-surgery suggestion; the honest limitation, stated
before the following work starts (and once in "What this is"): today's follower
will be defeated by terrain, and that is the expected ending, not a failure.

### Predictions to elicit

- `npm install mineflayer` fetches one library. How much do you think arrives —
  how many folders in `node_modules`? Write a number.
- When the bot runs, what will its terminal look like? The server prints a constant
  log — will the bot?
- The moment the bot joins: what do you expect the *server's* console to print? You
  have seen a player join from the server's side before.
- Walking toward a moving player: how often would a program need to re-check where
  they are? Once? Every second? Every step? What goes wrong at each rate?
- What should the bot do when the person it's following climbs somewhere it can't
  walk to? (No right answer — the point is having expected *something* before
  watching what actually happens.)

(The chat-noticing-shape prediction from the source material presupposed the spawn
handler already existing; in the merged lesson Predict runs cold, so it was cut.)

### The work — goals and hint ladders

Goals 1–5 (joining half, level 1). Goals 6–9 (following half, level 2: hints name
concepts and point at docs, never show the wiring; no skeletons — the learner has a
working file to grow).

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

*Transition (the following half's orientation lands here — see Orientation above):
arriving and speaking are single moments; following has to keep being true while
the world changes. State, `let`, `setInterval`, the edit → Ctrl-C → rerun habit,
the copy suggestion, the API document, the honest limitation.*

6. **Answer the call.** Anyone chats "come" → the bot replies in chat, naming who
   called ("On my way, <name>"). No movement yet.
   - Rung 1: you already handled one event. This is another event, and unlike
     spawn, this one hands your function information — have your greeting prove it
     by using the caller's name.
   - Rung 2: the event is `chat`; the docs show what arguments your function
     receives. Note `on` vs `once` — a follower must hear every message, not the
     first one. Compare the message against the word you're listening for with
     `===`.
   - Rung 3: the `chat` event entry in the mineflayer API document — read the
     argument list there. (Also: chat from *you* in game is what triggers it —
     test by joining the sandbox and talking.)
7. **Turn to face the caller.** On "come", the bot turns to look at whoever said
   it. Movement is one goal away; facing proves you can find a player in the
   bot's world.
   - Rung 1: the bot must be able to answer "where is that player right now?"
     The bot object carries a directory of everyone online, keyed by name — and
     you have the caller's name.
   - Rung 2: from the directory entry you can reach the player's in-world body and
     its position; the bot has a method that turns to face a position. One catch,
     worth knowing early: the bot can only "see" players within its view distance
     — a player's body info is only there while they're near enough.
   - Rung 3: `bot.players`, `.entity`, `.position`, and `bot.lookAt` — read each in
     the API document; the docs state exactly what `bot.players[name]` contains
     and when.
8. **Walk to the caller, and stop when close.** The real thing: "come" makes the
   bot walk to the caller — even while the caller moves — and stop within a couple
   of blocks instead of shoving them.
   - Rung 1: two separate problems, so split them. Problem one: making the bot
     walk at all (it's like holding down a key — and note that a held key stays
     held). Problem two: a player who moves after you aimed. One aim at
     "come"-time goes stale; something has to re-aim, over and over. That's what
     the repeating check from the transition is for.
   - Rung 2: the concepts, named. *State:* store the caller's name in a top-level
     variable when "come" arrives (`let`, because it changes). *The loop:* a
     `setInterval` function that runs several times a second: if nobody's being
     followed, do nothing; otherwise look up the target's current position, face
     it, and set the forward control on or off depending on how far away they
     are. Distance between two positions is one method call — the docs on
     positions have it. Stopping is not "don't press forward," it's "*release*
     forward" — controls stay where you set them.
   - Rung 3: `bot.setControlState('forward', ...)` and the position/distance
     methods, in the API document. A workable check rate is a few times a second
     (e.g. every 200 ms), and a workable stopping distance is around 2 blocks —
     tune both by watching.
9. **"stay" means stay.** Anyone chats "stay" → the bot stops where it is and
   stops caring where people are, until the next "come".
   - Rung 1: you built following out of two pieces — memory and a repeating
     check. "stay" only has to touch the memory... and deal with whatever the
     controls were doing at that instant.
   - Rung 2: clear the state variable (nothing-to-follow is a value too — that's
     what `null` is for) and release the forward control. If the bot slides one
     more step after "stay", work out which of the two you forgot.

### Break it on purpose — failures to cause, what each teaches, how to undo

Four kept (merge budget). The online-mode "knock on a locked door" experiment and
the second-player "someone else says come" mirror moved to Go Further — both were
conditional on people/servers being available, and both survive intact as
experiments there.

- **Refuse the connection.** Stop the sandbox (`stop` in its console). Run the bot.
  Read the whole error: `ECONNREFUSED` means the machine answered and said "nothing
  is listening at that port" — a definite no, not silence. (Conditionally: if the
  learner did letting-friends-join, contrast with timeout = silence.) Undo: start
  the sandbox, run the bot, watch it work again. Teaches: the bot needs a listening
  server exactly as the game does, and connection errors name what went wrong.
- **Lie about the version.** Add a `version:` line to createBot with a version far
  from the sandbox's (e.g. `'1.12.2'` against a 1.21-line sandbox) [verify error
  text]. Run, read the refusal, compare it with the mismatch seen from the game
  client in choosing-a-version — same wall, third angle: version mismatch as a
  client-side claim this time, caused by one line of the learner's own code. Undo:
  delete the line (auto-detection returns) [verify auto-detect].
- **Never let go.** Comment out the line that releases the forward control (the
  one that runs when the target is close). Say "come", let it reach you, and
  watch: it arrives — and keeps walking, into you, past you, into the wall,
  forever, legs churning. Teaches the difference between *doing* and
  *not-stopping*: `setControlState` is a held key, and state you set stays set
  until something clears it. Half the strange behavior in interactive programs is
  state someone forgot to clear. Undo: restore the line, rerun.
- **Walk off its map.** Have the bot follow you, then sprint far away or drop
  behind a hill until you're out of its view distance — and watch the bot's
  terminal. The program crashes; read the whole message. It says it tried to read
  `position` from something that wasn't there: the player directory only holds a
  body for players the bot can currently see, and your code assumed forever what
  was only true sometimes. Fix by checking before touching (if the target has no
  usable entity right now, skip this tick — or stop following; learner's policy
  choice). Teaches: the crash message names exactly what was missing, and
  "sometimes-there" data must be checked every time. Undo: the fix *is* the undo;
  rerun and repeat the sprint to prove it survives.

### What just happened — the explanation

The bot is a **client**. The server speaks one network language to everything that
connects; your game speaks it, and now your program speaks it, and the server cannot
tell code from person — the join line in its console is identical. The division of
labor: the library did the protocol (the thousands of message shapes that
choosing-a-version explained community tools must reverse-engineer per release), and
`bot.js` did the intent — a handful of lines that say who to be, where to go, and
what to do on arrival. That ratio, huge library beneath small file, is what
`node_modules` is: not bloat, but all the borrowed labor, sitting where `require`
can find it.

Events, one layer deeper — and then the layer below that. `bot.once('spawn', ...)`
is not "do this now" but "when this happens, run this." The program mostly *waits*:
an event fires, a handler runs for a millisecond, everything goes quiet again; the
interval ticks, checks, goes quiet. Between those moments, nothing is "running" at
all — the only thing that persists is state: one variable holding a name. Handlers
write it, the tick reads it, and the *behavior* the humans see — "it follows
people" — is nowhere in the code as a single thing. It's an emergent fact of memory
plus a repeating check. Every interactive program — the game itself, phone apps,
the server with its own tick loop deciding mob movement twenty times a second — is
this same shape: wait, react, remember, check again. This is called an event loop,
and Node itself runs one under every program the learner will ever write here.

And the limitation, honestly: the bot walks a straight line at a point, so terrain
beats it — walls, cliffs, water. That is not sloppiness to be fixed with more of
the same; walking *around* things is a genuinely hard problem (searching possible
routes through a world), it has a name — pathfinding — and it's a later lesson
(`lessons/bot-games-and-pathfinding/`) precisely because what was built today isn't
enough. Knowing where the edge of today's tool sits is part of owning it.

### Go further — open questions

- Knock on a locked door: if a server with `online-mode=true` exists on your
  network (a family server, or one you set up to test), point the bot's host/port
  at it and read exactly how the connection fails [verify exact failure mode —
  never pre-stated]. This is the experiment that proves why the sandbox exists: a
  normal server demands a verified account, the bot has none, and
  `online-mode=false` is the door the sandbox deliberately leaves unlocked — which
  is also exactly why the sandbox stays off the internet. Phrased as option, never
  assumed household.
- Could two bots run at once? What would have to be different between them — and
  what happens if it isn't? Related: what happens if the bot's `username` is the
  same as the name you join with? [Collision behavior left for the learner to
  measure.]
- The controls include more than forward — the docs list them. Could the bot
  sprint to a far caller and walk to a near one? Could a well-timed jump get it up
  a one-block step?
- Follow at a respectful distance: keep the bot exactly ~4 blocks away — walking
  backward when you step toward it. What does "exactly" cost you at the check
  rate you chose?
- When a second player is available on the sandbox (a housemate, or you from a
  second machine per `lessons/letting-friends-join/`), have *them* say "come" and
  watch. Did you store *the caller*, or quietly assume the only player who'd ever
  call is you? Programs meet users the author didn't imagine, sooner than
  expected. (Former break-it, moved here in the merge; still worth doing the
  moment a second player exists.)
- Genuinely open: how could a program *tell* it was stuck? To you it's obvious —
  the legs churn, the wall doesn't move. What would the bot have to remember and
  compare, over time, to notice that about itself? (Anything you invent here is a
  real answer; this is a live problem in robotics, not just Minecraft.)

## Delivery notes

- Merged from the former lessons `first-bot` and `bot-follows` (folders retained
  for history; this core supersedes both).
- **guided:** the npm-install prediction/count is the emotional center of the
  dependency concept — never state the count, never soften the reveal. Keep the
  README-reading step *before* the write step; the answer living in real docs is
  the design, not a leak.
- The scaffolding fade is within-lesson: full ladder with completion problem and
  rung 4 in the joining half; concept-plus-pointer ladders, no wiring, no
  skeletons in the following half; "stay" thinnest.
- State the honest limitation in "What this is" and again in "What just happened"
  — the lesson must never read as promising smooth following. The pathfinding link
  (new slug: `bot-games-and-pathfinding`) is a promise that the wall is a later
  door, which is the course's whole disposition.
- Rung 4 code must carry the "README wins if they disagree" framing and the
  port/name comments, so a straight retype still forces two decisions.
- Suggest copying bot.js before the following-half surgery, once, lightly —
  keeping a known-good version is a habit worth seeding before git arrives.
- Cut in the merge: the "knock on the family server's door" and "someone else says
  come" break-its moved to Go Further; the chat-noticing-shape prediction cut
  (presupposed mid-lesson state); the package.json-fields and README-extras Go
  Further items cut as low-value next to the merged list.
- No exclamation marks; the moment the bot appears carries itself.
