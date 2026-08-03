# Running your own server

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** running-your-own-server
- **Part:** Part 0 — Setup
- **Scaffolding:** level 1 — first contact with running a real service; reasoning shown
- **Deliveries:** guided + reference (setup-heavy; an adult may execute this)
- **Status:** ready

## Goal and payoff

A vanilla Minecraft server running in a folder the learner controls: start it, join
it, stop it, and know which files are whose. Payoff: a world that exists independent
of the game — a real server, the same kind of thing big multiplayer servers are, on
the learner's own machine. The first-run EULA failure is the lesson's centerpiece:
the program states its own fix, and reading output becomes a habit with an immediate
reward.

## Prerequisites

- A computer set up for coding — established by `modules/dev-machine/lessons/dev-machine-setup/`
  (specifically: a terminal you can navigate, and a `~/projects` folder)
- Minecraft (Java Edition) installed with an account that can play it

## Establishes

- A server the learner can start, stop, and join, in a known folder
  (`~/projects/mc-server`)
- Experience reading a program's startup output, including one failure the program
  itself explained
- Cited by other cores as: "a server you can start and stop — established by
  `lessons/running-your-own-server/`."

## Facts

- A Minecraft **server** is a separate program from the game — Mojang publishes it
  free. Download: the official server download page on minecraft.net (search
  "minecraft server download"; the exact URL moves). File arrives as `server.jar`.
- The download page offers the **current release** [volatile]. This lesson works on
  any recent version. Which version to *choose* (and why it can matter) is its own
  lesson: `lessons/choosing-a-version/` — a pointer, not a prerequisite.
- The server is written in **Java**, so the machine needs Java installed. Which Java
  version a given Minecraft version requires: stated on the server download page /
  minecraft.wiki [volatile as of 2026-07]. Install [macos]: https://adoptium.net —
  Temurin `.pkg` installer for the required version. Verify: `java --version`.
- A `.jar` is a program packaged for Java; Java runs it, it isn't run directly.
- Server folder: `~/projects/mc-server`. Everything the server creates lands in the
  **working directory it was started from** — running it from the wrong folder
  scatters files there (this is the working-directory concept cashing in).
- Never in a cloud-synced folder: [macos] Desktop/Documents under iCloud; [windows]
  OneDrive. Sync during writes corrupts region files.
- Run: `java -jar server.jar nogui` from inside the server folder. `nogui` skips a
  small monitoring window; the terminal shows the same information.
- Optional memory flag once things are real: `java -Xmx2G -jar server.jar nogui`
  (caps the server at 2 GB). Not needed for first runs.
- **First run exits on purpose**: writes `eula.txt` and stops, output says why.
  Fix: edit `eula.txt`, `eula=false` → `eula=true` (agreeing to Mojang's End User
  License Agreement, linked in the file).
- Second run generates the world; ready when the log prints a `Done (…s)!` line.
- Files created: `eula.txt`, `server.properties` (settings — covered by
  `lessons/server-settings/`), `logs/` (`latest.log` is the current one), `world/`
  (the world itself), plus libraries/version bookkeeping.
- Join from the same machine: Multiplayer → Add Server → address `localhost`.
  `localhost` = the standard name every computer has for itself.
- Default port 25565; a second server on the same port fails to start with an error
  naming the problem. (Break-it uses this; exact message text varies by version —
  deliveries must not assert it verbatim.)
- Stop: type `stop` into the server console. **Never** kill the window/process as a
  habit — a hard kill mid-write risks player inventories and truncated region files.
- Recovery facts (worth knowing exist, not drilling): a damaged `level.dat` has a
  sibling backup `level.dat_old`; a stale `session.lock` left by a crash can be
  deleted while the server is stopped.
- [windows] (for a future windows delivery): launcher script is `start.bat`; turn on
  file-extension display in Explorer first or you get `start.bat.txt`; disable sleep —
  the real risk is Windows Update rebooting an idle machine mid-write.
- Fact for What-just-happened: singleplayer Minecraft runs an internal server inside
  the game process; "Saving world" messages on the singleplayer pause screen are it.

## Arc

### Orientation — given plainly

What a server is: the program that owns the world — holds the master copy, runs the
clock, decides what's true — while each player's game is a **client** that connects
and shows a view of it. Multiplayer servers are this program running on someone's
machine; today it's the learner's machine. Java explained as: the language the server
happens to be written in; we install it to *run* the server, and nothing in this
course writes it. Download and install steps stated plainly, copy-paste allowed.

### Predictions to elicit

- The server folder has exactly one file in it before the first run. How many
  files/folders do you think are there after the server has run once? After it's
  fully up?
- Do you think the first run will work on the first try? What might a brand-new
  program need to know before it agrees to run?
- When it *is* running — what do you expect to see on screen? What does a server
  look like?

### The work — goals and hint ladders

1. **Install Java and verify.** Orientation, not a puzzle: find the required Java
   version on the server download page, install that from adoptium.net, prove with
   `java --version`.
2. **Make the folder and put the server in it.** `mkdir mc-server` inside
   `~/projects`, get the downloaded `server.jar` into it. State why the folder
   matters: the server unpacks its whole world *where it's started* — first working-
   directory payoff.
3. **First run — and read everything.** Goal: from inside the folder, run
   `java -jar server.jar nogui`. It will not work, this is expected and normal, and
   the whole task is: read every line it printed before touching anything, and find
   the line that says what it wants.
   - Rung 1: one of those lines is not like the others — it's about permission, not
     progress. Read them again, slower.
   - Rung 2: the server wrote a new file next to itself and told you so. Programs
     that need a yes-from-a-human often work this way: write a file, exit, let the
     human edit it. Look at what's new in the folder.
   - Rung 3: open `eula.txt` in VS Code. One line is a question pretending to be a
     setting. (EULA = End User License Agreement — the "I agree" checkbox of the
     typed world; the link inside the file is what's being agreed to.)
4. **Second run — watch a world get built.** Run the same command; this time read
   the output as a live progress story: loading properties, preparing spawn area,
   percentages — until the `Done` line. Then look at the folder again (prediction
   check) and identify: `world/`, `logs/`, `server.properties`. Don't tour
   `server.properties` here — that's the entire next lesson, say so.
5. **Join your own server.** Goal: get your game connected to it.
   - Rung 1: the game's Multiplayer screen wants an address. Your server is on the
     same computer the game is on — what would a computer call itself?
   - Rung 2: `localhost` — the standard name every computer answers to for itself.
     Add Server, address `localhost`, join. The console logs the join as it happens
     — watch your own arrival from the server's side.
6. **Stop it properly.** The console takes typed commands; `stop` shuts down
   cleanly (watch the saving messages). Rule stated plainly with its reason: always
   `stop`, never closing the window — a kill mid-write can corrupt the world. This
   is the first server *command* — a preview of the console lesson to come.

### Break it on purpose — failures to cause, undo, and read

- **Un-agree the EULA.** Stop the server, set `eula=false`, start. Same refusal as
  the first run — now a known consequence, not a rite of passage. Undo, start,
  confirm recovery. Teaches: failures reproduce; that's what makes them solvable.
- **Start it twice.** With the server running, open a second terminal in the same
  folder and run the start command again. It fails; the task is finding the line
  that names *the thing two programs can't share*. Teaches, one layer: the server
  listens on a numbered **port** (25565 unless changed), one listener per port per
  machine — the address said *which machine*, the port says *which program*. Big
  foreshadow of the letting-people-in arc. Undo: nothing needed; the second copy
  never started.

### What just happened — the explanation

The server is an ordinary program in an ordinary folder: reads files at startup
(settings, the world), holds the live world in memory, writes files as it goes (logs
continuously, world periodically, everything on `stop`). Joining via `localhost`
made the game a client of a server on the same machine — the connection never left
the computer. The reveal: singleplayer has *always* worked this way — the game
quietly runs an internal server and connects you to it; the learner has run a
Minecraft server every time they've played. Today it just moved into its own window
where it can be seen — and where, next lesson, it can be changed.

### Go further — open questions

- The server prints its startup story into `logs/latest.log` too. Find your own
  join line from today. What else got logged that you didn't see happen?
- How big is the `world/` folder right now? Play for a while, walk somewhere new,
  check again. What do you think makes it grow?
- Someone else's computer on your wifi — could they join with `localhost`? What
  would they need instead? (Door to the letting-people-in arc; genuinely worth
  attempting before that lesson exists.)
- You proved one machine can't run two servers on one port. So *can* one machine
  run two servers? What would have to be different? (Seeds the sandbox-server idea
  used in `lessons/choosing-a-version/`.)

## Delivery notes

- **reference:** Java install + verify, folder placement rule (no cloud sync),
  eula flow, start/stop commands, localhost join, port fact, recovery facts
  (`level.dat_old`, `session.lock`), leaves-behind list. An adult doing this on the
  learner's behalf should still leave the first-run EULA failure for the learner if
  possible — it's the best two minutes in the lesson; note this in the reference.
- **guided:** do not warn about the EULA before step 3 — the predictions section
  legitimately primes "might not work first try" without giving it away. The line
  between honest orientation and spoiling the one discoverable is exactly here;
  the program's own output is the orientation.
- Exact log lines vary by version — describe shapes ("a Done line"), never quote
  full messages as gospel.
