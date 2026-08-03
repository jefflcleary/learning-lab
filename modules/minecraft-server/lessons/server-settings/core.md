# The server is yours to change

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** server-settings
- **Part:** Part 1 — The server is yours to change
- **Scaffolding:** level 1 — first config file; reasoning shown throughout
- **Deliveries:** guided only (nothing setup-heavy; no reference audience yet)
- **Status:** ready

## Goal and payoff

Read every line of `server.properties`, change the server's name, its rules, and one
setting researched independently — and internalize the lesson under the lesson: every
behavior of the server is a written-down decision, and the learner is allowed to
overwrite it. Payoff: the message of the day is visible to anyone in the house who
opens the multiplayer screen, and a rule change (pvp, difficulty) that players feel.

This lesson is the module's origin story generalized: one file, dozens of levers,
none of them locked.

## Prerequisites

- A server you can start and stop — established by
  `lessons/running-your-own-server/` (also assumes VS Code from
  `lessons/dev-machine-setup/`)

## Establishes

- The learner has read the entire settings surface of the server and changed at
  least three settings deliberately, including one they researched themselves
- Knows the restart-to-apply rule and *why* (startup read into memory)
- Cited by other cores as: "you've changed server settings and know how to make a
  change land — established by `lessons/server-settings/`."

## Facts

- `server.properties` lives in the server folder; created by the server on first
  run. Plain text: one `key=value` per line; lines starting with `#` are comments
  (notes for humans, ignored by the server).
- The server reads the file **once, at startup**. Changes on disk do nothing to a
  running server; they land on the next start. (Some rules can also be changed live
  from the console — future console lesson; not needed here.)
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

## Arc

### Orientation — given plainly

What a settings file (config file) is: a program's decisions, written down where the
program can read them — and where you can. `key=value` explained. The wiki reference
named as the complete map. Editing happens in VS Code; the workflow is edit → save →
restart server → verify.

### Predictions to elicit

- Before opening the file: how many settings do you think the server has? Write a
  number.
- The file was in the folder after first run. Who do you think wrote it — and if
  you delete a line, what do you think happens on the next start?
- Pick, in advance: what's one thing about the server you'd change right now if you
  could? (Odds are decent the file has a key for it — check at the end.)

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
   Predict what changing it will do. Change it, restart, observe. This step is the
   lesson: unknown setting → reference → prediction → experiment is a loop that
   works on every program you'll ever meet, and you just ran it solo.

### Break it on purpose — failures to cause, undo, and read

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

### What just happened — the explanation

Every long-lived program does what this server does: keep its decisions in a file,
read the file at startup into memory, run from the memory copy. That's why the
restart was needed, and it's why "have you tried restarting it" is a real question
and not a joke — restarts force a re-read of the world's written-down decisions.
Config files are everywhere (nearly every app on the machine has one somewhere);
`key=value` is one of a small family of shapes they come in, and the learner will
meet the others (JSON next, in datapacks). The motd trick worked without joining
because the multiplayer screen pings every server on the list and each one answers
with its name, message, and player count — a complete little network conversation,
and later in the module the learner will speak it by hand.

### Go further — open questions

- The wiki page lists far more keys than the file contains. Why would a file the
  server itself wrote be missing settings the server understands? What happens if
  you add one?
- `level-seed` only applies to terrain that doesn't exist yet. What happens to a
  world that's half-generated with one seed if you change the seed and go
  exploring? Try it on a throwaway world — the border is worth seeing once.
- Some servers show colored, multi-line messages in the server list. The `motd`
  value can apparently encode more than plain text — how?
- Which settings, if any, can be changed *without* a restart? Something inside the
  running server would have to overwrite the memory copy. Find out what exists.

## Delivery notes

- **guided:** the origin-feeling matters more here than anywhere: the tone should
  make the file feel like a found key ring, not a chore list. Keep step 1
  (read-the-surface) truly lookup-free; the wiki enters only at step 4.
- Do not spoil the nonsense-value outcome or the rewrite-on-start behavior in
  learner text — both are measurements the learner should own.
- If a housemate can be recruited for the pvp/difficulty verification, the social
  payoff doubles; phrase as option, never as assumed household.
