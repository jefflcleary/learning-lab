# A world is a folder

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** worlds-and-copies
- **Part:** Part 3 — Infrastructure
- **Scaffolding:** level 1 — first deliberate file-wrangling (copying folders with
  intent, switching a program between data sets); reasoning shown throughout
- **Deliveries:** guided only (nothing setup-heavy; no reference audience)
- **Status:** ready

## Goal and payoff

Dissolve "the world" into what it actually is — a folder of files — by copying it,
switching the server between the original and the copy, wrecking the copy on purpose,
and proving the original never felt it. Then generate a brand-new world by pointing
the server at a folder that doesn't exist. Payoff: an experiments world where breaking
things is officially free, and the reflex that matters for the rest of the course —
copy first, experiment on the copy. Visible to others: two (or three) switchable
worlds, one of them dramatically destroyed, on demand.

This is the file-level mechanism under the production/development idea from
`lessons/choosing-a-version/`: the sandbox was a second *server*; this is a second
*world*, one `cp` away.

## Prerequisites

- A server you can start and stop — established by `lessons/running-your-own-server/`
- Terminal basics: knowing where you are (`pwd`), looking around (`ls`), moving
  (`cd`) — established by `lessons/dev-machine-setup/`
- You've changed server settings and know how to make a change land (the
  restart-to-apply rule) — established by `lessons/server-settings/`

## Leaves behind

- `world-experiments`: a full copy of the world, sitting next to the original, that
  the server can be switched to — expendable by declaration
- The learner has switched the server between worlds via `level-name`, generated a
  fresh world from nothing, and destroyed something on a copy with zero consequence
- The copy-first reflex: destructive experiments happen on copies, never on the only
  copy of anything
- Cited by other cores as: "an experiments world the server can be switched to, and
  the copy-first habit — established by `lessons/worlds-and-copies/`."

## Facts

- The world is the `world/` folder in the server folder. Everything in the game is
  bytes in it:
  - `level.dat` — the world's master record: spawn point, world time, rules, and the
    game version that last saved it
  - `region/` — the terrain itself, in chunky files with the `.mca` extension
  - `playerdata/` — one file per player who has ever joined: inventory, position,
    health. Files are named by player ID (a UUID), not by player name.
  - plus others (`entities/`, `advancements/`, `stats/`, …) — worth seeing, not
    worth cataloguing here
- `level-name` in `server.properties` is the name of the folder the server opens as
  its world, relative to the server folder. Default: `world`. Read at startup like
  everything else in that file (restart-to-apply, from `lessons/server-settings/`).
- If `level-name` names a folder that doesn't exist, the server creates it and
  generates a new world in it on startup. Not an error — this is how the first
  world appeared.
- `cp <from> <to>` copies a file. Bare `cp` on a directory refuses, with an error
  saying the source is a directory and was not copied (shape varies slightly —
  deliveries describe, don't quote). `cp -R` is the recursive form: the folder, the
  folders inside it, all the way down.
- The server must be **stopped** when copying a world you intend to trust. While
  running it writes world files continually (autosaves). The break-it section
  measures what copying a live world gets you.
- `du -sh <folder>` prints a folder's total size, human-readable.
- While a server has a world open, a `session.lock` file sits inside it (recovery
  fact from `lessons/running-your-own-server/`; here it's just a thing the learner
  may notice in listings).
- Never delete the folder `level-name` currently points at. Check the setting before
  deleting any world folder — habit stated plainly.
- [macos] Singleplayer worlds live at `~/Library/Application Support/minecraft/saves/`,
  one folder per world [verify path against a current install]. The format is the
  same family as a server world folder: copying a singleplayer save into the server
  folder and pointing `level-name` at it produces a working server world on a
  vanilla server [verify — dimension subfolders match on vanilla; modified servers
  differ]. Deliveries phrase this as "look there and check" rather than asserting.
- [macos] `~/Library` is hidden in Finder. Reveal: Finder → Go menu → hold Option and
  Library appears, or Go to Folder (cmd-shift-G) and type the path.
- `level.dat` records the data version that last saved the world. A newer server
  opening an older world **upgrades** it on load. Mojang ships no downgrade path —
  upgrading is one-way by design. Third-party tools claiming to downgrade worlds
  exist [volatile as of 2026-07 — never asserted in deliveries; the go-further has
  the learner investigate on a copy].
- [windows] singleplayer saves live under `%APPDATA%\.minecraft\saves` (for a future
  windows delivery) [verify].

## Arc

### Orientation — given plainly

The word "world" names a folder. Every build, every chest, every player's position
is a file in `world/` — the server is an ordinary program reading and writing
ordinary files, which the learner half-knows from `running-your-own-server` and now
proves by handling the files directly. `cp` and `-R` introduced (the `-R` at the
friction moment — bare `cp` refuses first). `du -sh` given for measuring. The
stopped-server rule stated plainly with its reason (the server writes while it
runs); the break-it measures the consequence of ignoring it. `level-name` is
recalled, not introduced — the learner read every line of `server.properties` once.

### Predictions to elicit

- How big is the whole world — the folder, in megabytes? Write an actual number
  before measuring.
- After copying the world and joining the copy: where will your player be standing?
  At spawn? Where you last logged out? Somewhere else?
- When `level-name` names a folder that doesn't exist, what will the server do —
  refuse to start, complain and fall back to `world`, or something else?

### The work — goals and hint ladders

1. **Look inside the world.** Server stopped. `ls world/` (or the VS Code sidebar).
   Before being told: guess from the names what each thing holds. Then the map,
   given plainly: `level.dat` the master record, `region/` the terrain,
   `playerdata/` one file per player ever joined — inventory and position, filed by
   player ID rather than name. Measure with `du -sh world` and check the size
   prediction. The point to land: the plaza, the chests, the half-finished builds —
   all of it is *these files*.
2. **Copy the world.** Goal: an exact copy named `world-experiments` next to the
   original. Instruct the learner to try `cp world world-experiments` first and
   read what comes back — the refusal names the problem. Then `-R` explained at
   the friction: recursive, meaning the folder and every folder inside it, all the
   way down; `cp -R world world-experiments`. Verify: `ls` shows both; `du -sh` on
   each shows twins.
3. **Switch the server to the copy.** Goal: make the server open
   `world-experiments` instead of `world`, and prove it.
   - Rung 1: you once read every line of `server.properties` and sorted the keys
     into lists. One key answers the question "which world does this server open?"
     Skim your lists' left-hand sides.
   - Rung 2: `level-name`. Its value is a folder name, looked up in the server
     folder. Point it at the copy.
   - Rung 3: if you edited it and nothing changed, remember when the server reads
     this file. Restart.
   Proof of twinhood: join — standing exactly where you last logged out, same
   builds, same chest contents, because position and inventory are files and the
   files were copied. Then the ceremony: **do something to this world you would
   never do at home.** Lava across the plaza. A crater where the front door was.
   This is for science — establishing what a copy is. Look at the destruction.
   Stop the server.
4. **Switch back and prove the original never felt it.** `level-name=world`,
   restart, join. Untouched. The destruction still exists — as bytes in the other
   folder, and nowhere else in the universe. Two complete realities, one setting
   choosing between them.
5. **A world from nothing.** Prediction already elicited. Set `level-name` to a
   folder that doesn't exist (`world-fresh` or any name). Start, and read the log —
   the same world-generation story as the very first run, spawn preparation and
   all. Join a world no one has ever stood in. Check the folder listing: the folder
   now exists, created by the server. Then set `level-name` back to `world` — the
   lesson ends with the server pointing at the real world.

### Break it on purpose — failures to cause, undo, and read

- **Copy a moving world.** Start the server on `world`, join, and from a second
  terminal run `cp -R world world-torn` *while playing* — flying, placing blocks.
  Then stop the server and inspect the loot: `du -sh world-torn` versus the
  original; point `level-name` at `world-torn`, start, join, look around for
  anything wrong. The delivery must not promise an outcome, because there isn't
  one: the copy might be perfect, might be subtly off, might refuse to load — `cp`
  read the files while the server was writing them, and what landed in the copy
  depends on timing nobody can see or reproduce. That's the honest answer: **you
  can't know**, and a copy you can't trust is worthless exactly when you need it.
  There is a way to copy a live world safely, and it's a later lesson:
  `lessons/backups-without-stopping/`. Undo: set `level-name` back, delete
  `world-torn` (Finder trash or `rm -r world-torn`) — after checking `level-name`
  doesn't point at it. Deleting copies is free; that's what makes them copies.

### What just happened — the explanation

"The world" dissolved into a folder, and the server into a program that opens
whichever folder it's told to. Nothing about the world is special to the machine —
it's files, and files can be copied, renamed, parked, swapped, kept in triplicate.
That has a consequence bigger than Minecraft: **experiments on copies are free.**
The production/development idea from `choosing-a-version` (never experiment on the
thing people depend on) now has its mechanism — a copy costs one command and some
disk. And a true story, told generically: somewhere, someone's singleplayer world
became the world of a real multiplayer server by exactly this move — the save
folder copied into a server folder, `level-name` pointed at it. Singleplayer saves
live in the game's own folder ([macos] under `~/Library/Application Support/minecraft/saves/`
— delivery: go look rather than trust), and they're the same kind of folder. The
wall between "my little world" and "a real server's world" was never there.

### Go further — open questions

- Move a singleplayer world onto the server. **Copy** it in — never move the only
  copy — and point `level-name` at it. What survives the trip? Inventory? Position?
  Pets?
- The version question, and nobody knows the answer: `level.dat` records which game
  version last saved the world, and a newer server *upgrades* an older world when
  it opens it — one-way, by design; Mojang ships nothing that goes back. But people
  have built third-party things that claim to downgrade worlds. On a **copy**:
  investigate what exists and what actually happens to a world pushed backwards.
  The outcome is genuinely unknown from here — and on a copy, finding out costs
  nothing. [genuinely open]
- Open a file from `region/` in VS Code and look at it. What is that? Find out what
  format those files are — a later lesson (`lessons/world-data/`) opens them
  properly, but there's no harm in arriving early.
- How many worlds could one server folder hold? A seasonal world? A museum of every
  world you've ever made, each one `level-name` away?

## Delivery notes

- **guided:** the live-copy break-it must not spoil an outcome — the entire point is
  that the result is unknowable in principle, not just unstated. Resist hedging
  toward "it will probably be fine" or "it will probably be corrupt."
- The destruction step must feel ceremonial and *explicitly licensed* — the learner
  is doing something forbidden-feeling with official permission, on a copy. That
  contrast is the lesson's emotional core; don't flatten it.
- The singleplayer-to-server story stays generic — no named person, no assumed
  household or history.
- State the check-`level-name`-before-deleting habit plainly wherever deletion of a
  world folder is mentioned.
