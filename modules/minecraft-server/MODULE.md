# Module design — Running a Minecraft server

The arcs, their milestones, the status of every lesson, and this module's own
constraints. This is the authors' map; the learner-facing rendering of the
recommended order is `PATH.md` (this folder), which only ever links to lessons that
exist. General method and format rules live in `authoring/PRINCIPLES.md`; this file
binds only this module.

Order here is recommended, never enforced. Every lesson must stand alone when read cold.

## Module-specific constraints

- **No Java.** The edit-compile-restart-rejoin plugin cycle costs minutes per
  iteration, which is fatal for a beginner. JavaScript on Node, datapacks, and
  Python only.
- **Zero toolchain.** No bundler, no type system, no linter, no build step — the
  file that gets edited is the file that runs. Tools arrive later, one at a time,
  each because a concrete problem demanded it. (Example: Homebrew arrives the first
  time the answer to a question is `brew install` — not before.)
- **Platform scope: macOS deliveries only, for now.** Cores tag platform-specific
  facts `[macos]` / `[windows]` so other platform deliveries can be generated
  without re-research.
- **The sandbox server is the expendable surface.** Breaking it is always free;
  destructive exercises happen there or on copies.

---

## The design brief

The founding observation: the learner's strongest reaction came from discovering that a
system which appeared fixed (`server.properties`) was theirs to change. Every arc aims
at reproducing that feeling on a bigger surface. The social loop — friends and family
who play on the server and react to what appears there — is the motivational engine, so
each part drives toward a payoff other people can see.

---

## Parts

### Part 0 — Setup

Get a machine that can write and run code, and a Minecraft server that can be started
and stopped. Normal lessons like any other; in practice an adult may execute them using
the reference deliveries so a learner's first session isn't plumbing. If so, the guided
deliveries still matter: they're how the learner finds out what was installed and why.

| Lesson | Goal | Status |
|---|---|---|
| `running-your-own-server` | A vanilla server the learner can start, stop, and join | core + guided + reference written |

Machine setup (`dev-machine-setup`) moved to the theme-neutral `dev-machine` module
(`modules/dev-machine/`); this module's PATH still points at it as step one.

### Part 1 — The server is yours to change

Payoff: people in the house play with something the learner changed or invented.

| Lesson | Goal | Status |
|---|---|---|
| `server-settings-and-console` | `server.properties` read and overruled; the console live; which changes persist | merged from server-settings + console-commands |
| `building-datapacks` | Custom recipes (JSON) and functions (mcfunction); tick/load; selectors as a filter language | merged from first-datapack + datapack-functions |

Datapack angle preserved: target selectors are query languages in disguise — sneak
preview of SQL's WHERE/LIMIT (noted in core only).

### Part 2 — Letting people in

**Milestone: friends outside the house join a server the learner runs, and use
something custom the learner made.** Lands here, before any code, because datapacks
deliver "custom and cool" without JavaScript.

| Lesson | Goal | Status |
|---|---|---|
| `letting-friends-join` | LAN → internet (three routes) → whitelist; auth vs authz; the milestone | merged from joining-over-lan + joining-from-outside + locking-the-door (incl. reference) |

### Part 3 — Infrastructure

Placed immediately after other people's builds exist in the world, because backups are
a chore when the world is yours alone and *protection* the moment four other people
have built things in it. Same content, completely different motivation.

| Lesson | Goal | Status |
|---|---|---|
| `worlds-and-backups` | Worlds as folders; copies; cold backups + restore drill; hot backups at the console | merged from worlds-and-copies + backups + backups-without-stopping |
| `always-on` | Sleep prevention, `caffeinate`, launchd plist; server survives a reboot | core + guided + reference written |
| `git-for-your-server` | git properly: init, .gitignore, the status/diff/commit loop, restore | core + guided written |

### Part 4 — First programs

Payoff: friends play something the learner's code is running. JavaScript on Node with
mineflayer. The `choosing-a-version` lesson sits before this part in the recommended
order (bots are the only version-sensitive arc) but can be read any time. Scaffolding
fades across the arc and within each merged lesson (per-section levels in cores).

| Lesson | Goal | Status |
|---|---|---|
| `writing-your-first-bot` | npm/dependencies; bot joins and speaks; events + state; naive following and its limits | merged from first-bot + bot-follows |
| `bot-commands-and-building` | Dispatcher and payload commands; events-list read; loops build towers/walls/rooms | merged from bot-chat-commands + bot-builds |
| `bot-games-and-pathfinding` | mineflayer-pathfinder settles the follow debt; the bot referees hide-and-seek | merged from bot-runs-a-game + bot-pathfinding |

### Part 5 — Data

Python arrives here (justified in-lesson: second language, data-and-scripting niche).

| Lesson | Goal | Status |
|---|---|---|
| `python-logs-and-rcon` | Log parsing → leaderboard; RCON remote control; secrets; four doors, one parser | merged from reading-the-logs + rcon-scripting |
| `world-data-and-protocol` | NBT/gzip world data → the movement map; SLP by hand; layered encodings, twice | merged from world-data + server-list-ping |

### Part 6 — Beyond the game

| Lesson | Goal | Status |
|---|---|---|
| `discord-and-web` | The Discord bridge and the who's-online page; client and server as roles | merged from discord-bridge + whos-online-page |

### Part 7 — Open

The learner's own project. No lesson file; deliberately no card.

---

## Cross-cutting decisions

- **The version fork.** Community tools (mineflayer) lag Minecraft releases, so the
  course presents three legitimate options — newest only, older only, or both a family
  world and an expendable sandbox — and lets the learner choose. `choosing-a-version`
  carries this. The dev/prod distinction is *discovered* there, not asserted.
- **Sandbox server requirements for bot lessons:** a version mineflayer supports, and
  `online-mode=false`. Both are conditions the bot lessons must state.
- **Two machines.** Writing code on one machine that changes a world running on another
  is itself a lesson and is free. Current platform scope for deliveries is macOS.
- **Course tooling is never lesson content.** Whatever machinery renders, publishes,
  or organizes this course (site generators, CI, authoring workflows) is authoring
  infrastructure and stays out of the module entirely. Lessons teach against the
  learner's own server and projects, never against the course's own plumbing.
- **AI assistance** is for authors writing lessons, not for the learner working them —
  revisit once the struggle-based design has done its job.

Raw material and future topics live in `IDEAS.md`.
