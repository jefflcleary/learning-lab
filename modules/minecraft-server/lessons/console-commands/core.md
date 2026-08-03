# Talking to a running server

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** console-commands
- **Part:** Part 1 — The server is yours to change
- **Scaffolding:** level 1 — first console work; reasoning shown throughout, all hints
- **Deliveries:** guided only (nothing setup-heavy; no reference audience yet)
- **Status:** ready

## Goal and payoff

The learner discovers the second channel into the server: the console of a *running*
server accepts typed commands, live, no restart. They broadcast messages, control time
and weather, rewrite game rules while people are playing, grant themselves operator
power in-game, and — the deeper discovery — measure which live changes survive a
restart and which don't. Payoff: a thunderstorm on command, midnight at noon, rules
changed under a player's feet while they watch.

The lesson under the lesson: commands are just lines of text the server parses.
Anything that can deliver those lines can command the server — which is the doorway to
bots and remote control later.

## Prerequisites

- A server you can start, stop, and join — established by
  `lessons/running-your-own-server/`
- You've changed server settings and know how to make a change land — established by
  `lessons/server-settings/` (the persistence experiment in this lesson contrasts
  directly with the restart-to-apply rule learned there)

## Establishes

- The learner can run console commands and has operator rights in-game
- Knows the console/in-game distinction (slash, permissions) and that the console's
  power cannot be revoked
- Has measured which live changes survive a restart, and knows game rules live in the
  world's own files while `server.properties` lives with the server
- Cited by other cores as: "you can run console commands and are an operator in your
  own game — established by `lessons/console-commands/`."

## Facts

- The console is the terminal window the server runs in. It doesn't just print — it
  listens. `stop` (from `running-your-own-server`) was the learner's first command.
- Console commands are typed **without** a leading slash. In-game, commands are typed
  into chat and **must** start with `/` (that's how the game distinguishes a command
  from a chat message).
- Commands used in this lesson (all long-stable):
  - `say <message>` — broadcast to every player's chat, shown as coming from the
    server.
  - `time set day|noon|night|midnight` (also accepts numbers).
  - `weather clear|rain|thunder`.
  - `difficulty peaceful|easy|normal|hard` — same setting as the `server.properties`
    key.
  - `gamerule <rule> <true|false>` — examples used: `keepInventory` (default false),
    `doDaylightCycle` (default true), `mobGriefing` (default true). Run with no value
    to print the current value.
  - `tp <target> <destination>` — a player name or coordinates.
  - `give <target> <item> [count]` — e.g. `give <name> minecraft:diamond 64`.
  - `op <player>` / `deop <player>`.
- Operator concept: the console has unlimited permission, always. Players in-game
  have almost none until granted operator ("op") status. A handful of commands are
  usable by everyone (e.g. `/help`); the interesting ones are op-only.
- `op` causes a file to appear/update in the server folder: `ops.json` — the list of
  operators, written down like everything else. Its shape is not `key=value`; it's a
  different settings-file shape the learner will formally meet in the datapack lesson
  (JSON). Connect to "everything is a file": even *who has power* is a file.
- The complete command list: the **Commands** page on minecraft.wiki. Stable as a
  reference to point at; its contents are [volatile as of 2026-07] in detail. Used
  here as a read-the-surface exercise — see the size, don't memorize.
- Persistence (author notes; the delivery must stay empirical — the learner measures):
  - Game rules, time of day, and weather state are stored in the world's own data
    (inside `world/`, in `level.dat`) [verify exact storage detail], so they survive
    a restart.
  - `difficulty` on a dedicated server is re-read from `server.properties` at
    startup; a live `/difficulty` change is believed **not** to persist across
    restart [verify on current release]. This asymmetry is the punchline of the
    persistence experiment — do not spoil either outcome in learner text.
- The refusal message a non-op player gets for an op-only command: do not assert
  exact wording; the learner reads it.
- A misspelled gamerule name produces an error naming the problem; do not assert
  exact wording.

## Arc

### Orientation — given plainly

Two channels into the same running program: `server.properties` is read once at
startup (they know this); the console is live, while it runs. The console listens as
well as prints — `stop` proved it. Slash rule: none in console, required in-game.
Give `say` plainly as the demonstration that the channel exists — the first taste is
orientation, not a puzzle. The wiki **Commands** page named as the complete map.

### Predictions to elicit

- Settings-file changes needed a restart to land. Will console commands need one?
  What's different about how they arrive?
- Commands work from the console. Will they also work typed into the in-game chat —
  and for *anyone* who joins, or only some people?
- If you change the world with live commands and then restart the server, which
  changes will still be there? All, none, some? Write down a guess for each kind of
  change before the experiment at the end.

### The work — goals and hint ladders

1. **Make the server speak.** Join your server, then click into the console and type
   `say` followed by anything. Watch the game: a message in chat that no player
   typed. Notice: no slash in the console, no restart, instant. (Given plainly —
   this is orientation for the whole channel.)
2. **Read the surface.** Open the **Commands** page on minecraft.wiki (search the
   site for "Commands"). Scroll the entire command list top to bottom — not to learn
   it, to see how big it is. Rough count. Mark (mentally or on paper) three commands
   that sound interesting and three that sound incomprehensible. This is the map;
   the rest of the lesson uses maybe six entries from it.
3. **Command the sky and the clock.** Goal: make it the middle of the night, start a
   thunderstorm, then undo both — from the console, while standing in the world
   watching.
   - Rung 1: the plain English words you'd use to describe what you want ("time",
     "weather") are the words the commands use. You saw both on the page you just
     scrolled.
   - Rung 2: the commands are `time set` and `weather`. Each takes one more word
     saying which time / which weather. If unsure what words they accept, the wiki
     page for each command lists them.
   - Rung 3: `time set midnight`, `weather thunder`; undo with `time set day`,
     `weather clear`.
4. **Rewrite a law of physics.** Game rules are standing rules of the world, changed
   with `gamerule`. Three worth knowing today: `keepInventory` (do you drop your
   items when you die?), `doDaylightCycle` (does time advance at all?),
   `mobGriefing` (can creepers destroy blocks?). Goal: pick two, predict exactly
   what will be observably different, change them from the console, verify in-game
   with your own eyes. (`keepInventory` is verified by dying on purpose — the
   learner's own choice, somewhere convenient. `gamerule <rule>` with no value reads
   the current setting — useful before and after.)
5. **Get the power in-game.** Goal: run `time set noon` from *inside the game* (chat,
   with the slash). It will refuse — read the refusal completely, it's telling you
   about a permission system. Then fix it: from the console, grant your player
   operator status, and retry.
   - Rung 1: the console refused you nothing so far. The game did. So the difference
     isn't the command — it's *who's asking*. There's a command that changes who is
     allowed.
   - Rung 2: the concept is "operator" (op). The console has unlimited power;
     players must be granted it. The command is on the wiki page under exactly that
     name.
   - Rung 3: from the console: `op <your-player-name>`. Retry your in-game command.
   - After success: look in the server folder. A file appeared that wasn't there
     before — `ops.json`. Open it in VS Code. Even *who has power* is written in a
     file. Its shape (brackets, quotes, colons) isn't `key=value` — that shape has a
     name, and a later lesson is built around it.
6. **Play god for a minute.** Goals, in-game now that you're op: give yourself a
   stack of diamonds; teleport yourself somewhere far away and back — or better, if
   someone else is online, teleport *them* to you and hand them the diamonds.
   - Rung 1: both commands were in your scroll of the wiki page; both are two-word
     names of what they do.
   - Rung 2: `give` and `tp`. Both start with a *target* — who receives, who moves.
     A player name works.
   - Rung 3: `/give <name> minecraft:diamond 64`, `/tp <them> <you>`.
7. **The persistence experiment.** You've now changed the world live: time, weather,
   game rules — and add one more: change `difficulty` by command instead of by
   settings file. Write each change down in a table with your prediction: survives
   restart, or doesn't? Then `stop`, start again, join, and check every row. The
   result splits — some changes stuck, some snapped back. For each survivor: the
   change lived through a restart, so it must be *written down somewhere*. Where?
   You know where the server keeps things. For each non-survivor: what overwrote it
   at startup, and where does that value live? (Deliveries must not spoil the split;
   the follow-up question — go look in `world/` and in `server.properties` — leads
   them to the two owners of decisions.)

### Break it on purpose — failures to cause, undo, and read

- **Misspell a law.** From the console: `gamerule keepInventry true` (or any
  misspelling). Read the entire response. The server didn't crash, didn't guess,
  didn't do something random — it named the problem. This is the shape of most
  command errors you'll ever see: parse, reject, explain. Nothing to undo.
- **Fire yourself.** In-game, as op: `/deop <your-own-name>`. Now try `/time set
  day` from chat — read the refusal again, this time as an insider who knows exactly
  why. Then recover from the console: `op <your-name>`. The point: in-game power can
  be granted and revoked — it's just a file entry — but the console *cannot be
  deopped*. Whoever sits at the terminal the server runs in holds the root of all
  power. Remember that when other people start joining your server.

### What just happened — the explanation

The server has two channels for decisions. One is the settings file: read once at
startup, which is why it needed restarts. The other is the console: a live line into
the running program, parsed the moment you press return. Same program, two doors —
one for decisions-at-rest, one for decisions-right-now.

And what goes through the live door is nothing but text. `time set midnight` is a
string of characters; the server reads it, matches it against its command grammar,
and acts. Nothing about that requires the text to come from human fingers. Later in
this module, programs you write will compose exactly these strings and send them —
bots that type commands faster and more tirelessly than any operator. Today you
learned the language; later you'll teach it to machines.

The persistence experiment revealed the deeper filing system: game rules, time, and
weather belong to the *world* — they're stored inside `world/`, so they travel with
it (copy the world folder elsewhere and the rules ride along). Other values belong to
the *server* and are re-imposed from `server.properties` at every startup. Two owners
of decisions, two files, and now you know which questions to ask of each.

### Go further — open questions

- The **Game rule** page on minecraft.wiki lists every rule. Find one you've never
  heard anyone mention, predict what changing it does, and test it.
- Some servers show messages in colors with clickable text — plain `say` can't do
  that. Something else can. What?
- The console lives in one terminal window on one machine. Could a server be
  commanded from a *different* window — or a different computer entirely? Find out
  what exists for this. (What you find is a later lesson; arriving early is fine.)
- What command do you *wish* existed that doesn't? Write it down and keep it —
  a surprising amount of this module is about making the server do things it has no
  command for.

## Delivery notes

- **guided:** do not spoil the persistence split, the refusal wording, or the
  misspelled-gamerule response — all three are measurements the learner should own.
- `say` is given plainly on purpose (orientation for the channel itself); the hint
  ladders start with the sky-and-clock goal.
- The `keepInventory` verification involves dying on purpose — frame as the
  learner's own choice, somewhere convenient, with the rule *on* so nothing is lost.
- The tp/give step doubles in payoff with a second player online; phrase as option,
  never as assumed household.
- Do not assert whether `/difficulty` persists — [verify] and keep empirical either
  way; if verification shows it persists on current versions, swap the difficulty
  row's role in the experiment for another `server.properties`-owned value or
  rewrite step 7's punchline.
