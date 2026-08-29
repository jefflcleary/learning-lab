# Server settings and console commands

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** server-settings-and-console
- **Module / Part:** minecraft-server — Part 1 — The server is yours to change
- **Scaffolding:** level 1 throughout — first config file and first console work;
  reasoning shown, all hints. Per-section: the settings-file arc (work goals 1–4) is
  the first lesson of the config-file skill; the console arc (goals 5–11) is the
  first lesson of the command skill. `say` is given plainly (orientation for the
  channel); hint ladders run on motd, sky-and-clock, op, and give/tp.
- **Deliveries:** guided only (nothing setup-heavy; no reference audience yet)
- **Status:** ready
- **Merged from:** `server-settings` and `console-commands` (former separate
  lessons; their cores are the sources of every fact and hint here).

## Goal and payoff

The learner discovers the server's two channels for decisions and uses both. First
the settings file: read every line of `server.properties`, change the server's name,
its rules, and one setting researched independently — and internalize that every
behavior of the server is a written-down decision the learner is allowed to
overwrite. Then the console of the *running* server: broadcast messages, control
time and weather, rewrite game rules live, grant operator power in-game — and, the
deeper discovery, measure which live changes survive a restart and which snap back.

Payoff: a message of the day visible to anyone in the house who opens the
multiplayer screen, a thunderstorm on command, midnight at noon, and rules changed
under a player's feet while they watch.

Two lessons under the lesson: (1) config files are everywhere and none of their
lines are locked; (2) commands are just lines of text the server parses — anything
that can deliver those lines can command the server, which is the doorway to bots
and remote control later.

## Prerequisites

- A server you can start, stop, and join — established by
  `lessons/running-your-own-server/`
- A code editor you can open folders in — established by
  `modules/dev-machine/lessons/dev-machine-setup/`

## Establishes

- The learner has read the entire settings surface of the server and changed at
  least three settings deliberately, including one they researched themselves;
  knows the restart-to-apply rule and *why* (startup read into memory)
- The learner can run console commands and has operator rights in-game; knows the
  console/in-game distinction (slash, permissions) and that the console's power
  cannot be revoked
- Has measured which live changes survive a restart, and knows game rules live in
  the world's own files while `server.properties` lives with the server
- Cited by other cores as: "you've changed server settings and can run console
  commands as an operator in your own game — established by
  `lessons/server-settings-and-console/`."

## Facts

Settings file:

- `server.properties` lives in the server folder; created by the server on first
  run. Plain text: one `key=value` per line; lines starting with `#` are comments
  (notes for humans, ignored by the server).
- The server reads the file **once, at startup**. Changes on disk do nothing to a
  running server; they land on the next start. (Some values can also be changed
  live from the console — this lesson's second half.)
- The server rewrites the file at startup (reordering keys, refreshing the `#`
  timestamp) — observable, and proof the server actively owns this file.
- The complete key list with meanings: the `server.properties` page on
  minecraft.wiki [volatile as of 2026-07 in details, stable as a reference — point
  learners at it by name].
- Keys used in this lesson:
  - `motd` — "message of the day," the text shown next to the server in the
    multiplayer list. Visible without joining.
  - `difficulty` — peaceful / easy / normal / hard.
  - `pvp` — whether players can damage each other.
  - `max-players` — connection cap.
  - `server-port` — where the server listens (default 25565). Client address syntax
    for a non-default port: `localhost:25570`.
  - `level-seed` — only consulted when generating *new* terrain; changing it on an
    existing world affects only not-yet-generated chunks (source of the classic
    chunk-border landscape seam — good Go Further).
  - `online-mode` — whether the server checks joiners against Mojang's account
    system. Exists; matters a great deal later (bots); deliberately not changed in
    this lesson.
- The multiplayer screen shows motd/player-count because the game *pings* each
  listed server and the server answers — a tiny network conversation that happens
  without joining. (Preview of the Server List Ping thread in the data arc.)
- Invalid values: behavior varies by key (fall back to default, log a warning,
  rewrite the file). Do not assert specifics — the break-it section has the learner
  find out empirically.

Console:

- The console is the terminal window the server runs in. It doesn't just print — it
  listens. `stop` (from `running-your-own-server`) was the learner's first command.
- Console commands are typed **without** a leading slash. In-game, commands are
  typed into chat and **must** start with `/` (that's how the game distinguishes a
  command from a chat message).
- Commands used in this lesson (all long-stable):
  - `say <message>` — broadcast to every player's chat, shown as coming from the
    server.
  - `time set day|noon|night|midnight` (also accepts numbers).
  - `weather clear|rain|thunder`.
  - `difficulty peaceful|easy|normal|hard` — same setting as the
    `server.properties` key.
  - `gamerule <rule> <true|false>` — examples used: `keepInventory` (default
    false), `doDaylightCycle` (default true), `mobGriefing` (default true). Run
    with no value to print the current value.
  - `tp <target> <destination>` — a player name or coordinates.
  - `give <target> <item> [count]` — e.g. `give <name> minecraft:diamond 64`.
  - `op <player>` / `deop <player>`.
- Operator concept: the console has unlimited permission, always. Players in-game
  have almost none until granted operator ("op") status. A handful of commands are
  usable by everyone (e.g. `/help`); the interesting ones are op-only.
- `op` causes a file to appear/update in the server folder: `ops.json` — the list
  of operators, written down like everything else. Its shape is not `key=value`;
  it's a different settings-file shape the learner will formally meet in the
  datapack lesson (JSON). Connect to "everything is a file": even *who has power*
  is a file.
- The complete command list: the **Commands** page on minecraft.wiki. Stable as a
  reference to point at; its contents are [volatile as of 2026-07] in detail. Used
  here as a read-the-surface exercise — see the size, don't memorize.
- Persistence (author notes; the delivery must stay empirical — the learner
  measures):
  - Game rules, time of day, and weather state are stored in the world's own data
    (inside `world/`, in `level.dat`) [verify exact storage detail], so they
    survive a restart.
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

What a settings file (config file) is: a program's decisions, written down where
the program can read them — and where you can. `key=value` explained. The wiki
`server.properties` page named as the complete map of the file. Editing happens in
VS Code; the workflow is edit → save → restart server → verify (why the restart is
needed is discovered, not pre-announced).

At the transition to the console: two channels into the same running program —
the settings file is read once at startup (just proven); the console is live, while
it runs. The console listens as well as prints — `stop` proved it. Slash rule: none
in console, required in-game. Give `say` plainly as the demonstration that the
channel exists — the first taste is orientation, not a puzzle. The wiki **Commands**
page named as the complete map of the command language.

### Predictions to elicit

- Before opening the file: how many settings do you think the server has? Write a
  number.
- The file was in the folder after first run. Who wrote it — and if you delete a
  line, what happens on the next start?
- Pick, in advance: what's one thing about the server you'd change right now if you
  could? (Odds are decent the file has a key for it — check at the end.)
- This session changes the server two ways: by editing a file, and by typing
  commands at a running server. Will both kinds of change take effect immediately?
  If not, which — and what's different about how they reach the server?
- Will commands work typed into the in-game chat as well as the console — and for
  *anyone* who joins, or only some people?
- If you change the world with live commands and then restart the server, which
  changes will still be there? All, none, some? A guess for each kind of change,
  before the experiment at the end.

### The work — goals and hint ladders

1. **Read every line.** The whole file, top to bottom, out loud is allowed. Three
   lists on paper: *could explain to someone else* / *could half-guess* / *no
   idea*. No looking things up yet — the point is seeing the size of the space and
   an honest map of the edge of your knowledge. Also: count the settings and check
   the prediction.
2. **Rename the world's front door.** Goal: make the multiplayer screen show a
   message you wrote, next to your server. Constraint: verify *without joining*.
   - Rung 1: one key on your lists is about what the server *says about itself*,
     not how it behaves. Skim the left-hand sides again.
   - Rung 2: `motd` — "message of the day." Change the value. Now make the change
     actually land — if you edited while the server was running and nothing
     happened, that's the real puzzle: when did the server last *read* this file?
   - Rung 3: programs read settings at startup and keep a copy in memory. Your
     edit changed the disk, not the memory. Restart the server (`stop`, start
     again) and refresh the multiplayer screen.
3. **Change the rules of reality.** Pick `difficulty` or `pvp`. Predict what will
   be observably different in the world, restart, join, verify with your own eyes
   (peaceful visibly empties the night; pvp needs a second account or a housemate
   — pick the one you can verify today).
4. **Take one mystery off your list.** From the *no idea* list, pick a key that
   sounds interesting. Find it on the minecraft.wiki `server.properties` page.
   Predict what changing it will do. Change it, restart, observe. This step is half
   the lesson: unknown setting → reference → prediction → experiment is a loop that
   works on every program you'll ever meet, and you just ran it solo.

   *Transition (in-lesson, replaces the old between-lesson cliffhanger):* every
   change so far needed a restart. The server has a second door that doesn't.

5. **Make the server speak.** Join your server, then click into the console and
   type `say` followed by anything. Watch the game: a message in chat that no
   player typed. Notice: no slash in the console, no restart, instant. (Given
   plainly — this is orientation for the whole channel.)
6. **Read the surface.** Open the **Commands** page on minecraft.wiki (search the
   site for "Commands"). Scroll the entire command list top to bottom — not to
   learn it, to see how big it is. Rough count. Mark three commands that sound
   interesting and three that sound incomprehensible. This is the map; the rest of
   the lesson uses maybe six entries from it.
7. **Command the sky and the clock.** Goal: make it the middle of the night, start
   a thunderstorm, then undo both — from the console, while standing in the world
   watching.
   - Rung 1: the plain English words you'd use to describe what you want ("time",
     "weather") are the words the commands use. You saw both on the page you just
     scrolled.
   - Rung 2: the commands are `time set` and `weather`. Each takes one more word
     saying which time / which weather. If unsure what words they accept, the wiki
     page for each command lists them.
   - Rung 3: `time set midnight`, `weather thunder`; undo with `time set day`,
     `weather clear`.
8. **Rewrite a law of physics.** Game rules are standing rules of the world,
   changed with `gamerule`. Three worth knowing today: `keepInventory` (do you
   drop your items when you die?), `doDaylightCycle` (does time advance at all?),
   `mobGriefing` (can creepers destroy blocks?). Goal: pick two, predict exactly
   what will be observably different, change them from the console, verify in-game
   with your own eyes. (`keepInventory` is verified by dying on purpose — the
   learner's own choice, somewhere convenient. `gamerule <rule>` with no value
   reads the current setting — useful before and after.)
9. **Get the power in-game.** Goal: run `time set noon` from *inside the game*
   (chat, with the slash). It will refuse — read the refusal completely, it's
   telling you about a permission system. Then fix it: from the console, grant
   your player operator status, and retry.
   - Rung 1: the console refused you nothing so far. The game did. So the
     difference isn't the command — it's *who's asking*. There's a command that
     changes who is allowed.
   - Rung 2: the concept is "operator" (op). The console has unlimited power;
     players must be granted it. The command is on the wiki page under exactly
     that name.
   - Rung 3: from the console: `op <your-player-name>`. Retry your in-game
     command.
   - After success: look in the server folder. A file appeared that wasn't there
     before — `ops.json`. Open it in VS Code. Even *who has power* is written in a
     file. Its shape (brackets, quotes, colons) isn't `key=value` — that shape has
     a name, and a later lesson is built around it.
10. **Play god for a minute.** Goals, in-game now that you're op: give yourself a
    stack of diamonds; teleport yourself somewhere far away and back — or better,
    if someone else is online, teleport *them* to you and hand them the diamonds.
    - Rung 1: both commands were in your scroll of the wiki page; both are short
      names of what they do.
    - Rung 2: `give` and `tp`. Both start with a *target* — who receives, who
      moves. A player name works.
    - Rung 3: `/give <name> minecraft:diamond 64`, `/tp <them> <you>`.
11. **The persistence experiment.** You've now changed the world live: time,
    weather, game rules — and add one more: change `difficulty` by command instead
    of by settings file. Write each change down in a table with your prediction:
    survives restart, or doesn't? Then `stop`, start again, join, and check every
    row. The result splits — some changes stuck, some snapped back. For each
    survivor: the change lived through a restart, so it must be *written down
    somewhere*. Where? You know where the server keeps things. For each
    non-survivor: what overwrote it at startup, and where does that value live?
    (Deliveries must not spoil the split; the follow-up question — go look in
    `world/` and in `server.properties` — leads them to the two owners of
    decisions.)

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Feed it nonsense.** Stop the server. Set `difficulty=banana`. Start, and find
  out what the server does with a value it can't use — read the log, then open the
  file again afterwards and look closely at that line. (Deliveries must not spoil
  the outcome; the interesting part is that the answer is discoverable and that
  the learner now owns a fact they measured.) Undo.
- **Move the front door.** Change `server-port` to `25570`. Restart. The saved
  entry in your game's server list now fails to reach it — the server didn't
  vanish, it's listening at a different number. Reach it anyway: address syntax
  `localhost:25570`. Then revert, because default ports exist so nobody has to
  remember numbers. Teaches: the address names the machine, the port names the
  program's door, and both halves are just settings someone chose.
- **Misspell a law.** From the console: `gamerule keepInventry true` (or any
  misspelling). Read the entire response. The server didn't crash, didn't guess,
  didn't do something random — it named the problem. This is the shape of most
  command errors: parse, reject, explain. Nothing to undo.
- **Fire yourself.** In-game, as op: `/deop <your-own-name>`. Now try `/time set
  day` from chat — read the refusal again, this time as an insider who knows
  exactly why. Then recover from the console: `op <your-name>`. The point: in-game
  power can be granted and revoked — it's just a file entry — but the console
  *cannot be deopped*. Whoever sits at the terminal the server runs in holds the
  root of all power. Remember that when other people start joining your server.

### What just happened — the explanation

The spine: the server has two channels for decisions. One is the settings file —
read once at startup into memory, run from the memory copy, which is why every
change there needed a restart, and why "have you tried restarting it" is a real
diagnostic question: restarts force a re-read of the world's written-down
decisions. The other is the console — a live line into the running program, parsed
the moment you press return. Same program, two doors: one for decisions-at-rest,
one for decisions-right-now.

Config files are everywhere (nearly every app on the machine has one somewhere);
`key=value` is one of a small family of shapes they come in, and the learner will
meet the others (JSON next, in datapacks). The motd trick worked without joining
because the multiplayer screen pings every server on the list and each one answers
with its name, message, and player count — a complete little network conversation
the learner will later speak by hand.

And what goes through the live door is nothing but text. `time set midnight` is a
string of characters; the server reads it, matches it against its command grammar,
and acts. Nothing about that requires the text to come from human fingers. Later in
this module, programs the learner writes will compose exactly these strings and
send them — bots that type commands faster and more tirelessly than any operator.

The persistence experiment revealed the deeper filing system: game rules, time, and
weather belong to the *world* — stored inside `world/`, so they travel with it.
Other values belong to the *server* and are re-imposed from `server.properties` at
every startup. Two owners of decisions, two files, and now the learner knows which
questions to ask of each.

### Go further — open questions

- The wiki page lists far more keys than the file contains. Why would a file the
  server itself wrote be missing settings the server understands? What happens if
  you add one?
- `level-seed` only applies to terrain that doesn't exist yet. What happens to a
  world that's half-generated with one seed if you change the seed and go
  exploring? Try it on a throwaway world — the border is worth seeing once.
- Some servers show colored, multi-line messages in the server list, and colored
  clickable text in chat. Plain `motd` text and plain `say` can't do either —
  something can. What?
- The **Game rule** page on minecraft.wiki lists every rule. Find one you've never
  heard anyone mention, predict what changing it does, and test it.
- The console lives in one terminal window on one machine. Could a server be
  commanded from a *different* window — or a different computer entirely? Find out
  what exists for this. (What you find is a later lesson; arriving early is fine.)
- What command do you *wish* existed that doesn't? Write it down and keep it — a
  surprising amount of this module is about making the server do things it has no
  command for.

## Delivery notes

- Merged from the former `server-settings` and `console-commands` lessons; the
  file-vs-live contrast (two channels into one program) is the spine of the merged
  what-just-happened and must stay front and center.
- **guided:** the origin-feeling matters most in the settings half: the file should
  feel like a found key ring, not a chore list. Keep the read-the-surface step
  truly lookup-free; the wiki enters only at the take-one-mystery step.
- Do not spoil: the nonsense-value outcome, the rewrite-on-start behavior, the
  persistence split, the refusal wording, or the misspelled-gamerule response —
  all measurements the learner should own.
- `say` is given plainly on purpose (orientation for the channel itself); the
  console hint ladders start with the sky-and-clock goal.
- The `keepInventory` verification involves dying on purpose — frame as the
  learner's own choice, somewhere convenient, with the rule *on* so nothing is
  lost.
- The pvp and tp/give steps double in payoff with a second player online; phrase
  as option, never as assumed household.
- Do not assert whether `/difficulty` persists — [verify] and keep empirical
  either way; if verification shows it persists on current versions, swap the
  difficulty row's role in the experiment for another `server.properties`-owned
  value or rewrite the persistence-experiment punchline.
