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

Machine setup (`dev-machine-setup`) moved to the theme-neutral `setup` module
(`modules/setup/`); this module's PATH still points at it as step one.

### Part 1 — The server is yours to change

Payoff: people in the house play with something the learner changed or invented.

| Lesson | Goal | Status |
|---|---|---|
| `server-settings` | Read every line of `server.properties`; change settings; see them land | core + guided written |
| `console-commands` | The server console live: commands, game rules, operators; which changes persist | core + guided written |
| `first-datapack` | First datapack: a custom recipe; JSON; folder-path-as-registration | core + guided written |
| `datapack-functions` | mcfunction files; tick/load hooks; `/trigger`; selectors as a filter language | core + guided written |

Datapack angle preserved in `datapack-functions`: target selectors like
`@e[type=zombie,distance=..10]` are query languages in disguise — sneak preview of
SQL's WHERE/LIMIT (noted in core only).

### Part 2 — Letting people in

**Milestone: friends outside the house join a server the learner runs, and use
something custom the learner made.** Lands here, before any code, because datapacks
deliver "custom and cool" without JavaScript.

| Lesson | Goal | Status |
|---|---|---|
| `joining-over-lan` | Local addresses; someone on the wifi joins; refused-vs-timeout diagnostics | core + guided written |
| `joining-from-outside` | Public vs private addresses, NAT; Tailscale / playit.gg / port-forward+DDNS; the milestone | core + guided + reference written |
| `locking-the-door` | Whitelist, operators, online-mode; authentication vs authorization | core + guided written |

### Part 3 — Infrastructure

Placed immediately after other people's builds exist in the world, because backups are
a chore when the world is yours alone and *protection* the moment four other people
have built things in it. Same content, completely different motivation.

| Lesson | Goal | Status |
|---|---|---|
| `worlds-and-copies` | The world is a folder; copy, switch, keep several; downgrade experiment as open Go Further | core + guided written |
| `backups` | First shell script; dated cold backups; the mandatory restore drill | core + guided written |
| `backups-without-stopping` | `save-off` / `save-all flush` / copy / `save-on`; leaves the automation gap open for RCON | core + guided written |
| `always-on` | Sleep prevention, `caffeinate`, launchd plist; server survives a reboot | core + guided + reference written |
| `git-for-your-server` | git properly: init, .gitignore, the status/diff/commit loop, restore | core + guided written |

### Part 4 — First programs

Payoff: friends play something the learner's code is running. JavaScript on Node with
mineflayer. The `choosing-a-version` lesson sits before this part in the recommended
order (bots are the only version-sensitive arc) but can be read any time. Scaffolding
fades across the arc: full support in `first-bot`, goals-and-criteria only by
`bot-runs-a-game`.

| Lesson | Goal | Status |
|---|---|---|
| `first-bot` | npm and dependencies; a bot joins the sandbox and speaks | core + guided written |
| `bot-follows` | Events and state; continuous action; honest terrain limits | core + guided written |
| `bot-chat-commands` | Parsing, dispatcher, payload commands; the full events-list read; the self-echo loop | core + guided written |
| `bot-builds` | Loops made physical: `i < 10` → `i < 100`; nested loops; op'd bot issuing commands | core + guided written |
| `bot-runs-a-game` | Composition: the bot referees hide-and-seek; phases/state machine lite | core + guided written |
| `bot-pathfinding` | mineflayer-pathfinder; plugin loading; the follow-me debt settled | core + guided written |

### Part 5 — Data

Python arrives here (justified in-lesson: second language, data-and-scripting niche).

| Lesson | Goal | Status |
|---|---|---|
| `reading-the-logs` | First Python; parse `latest.log` into a leaderboard; stdlib only | core + guided written |
| `rcon-scripting` | RCON from Python; closes the hot-backup and announce-the-leaderboard gaps; secrets | core + guided written |
| `world-data` | Binary formats: NBT, gzip; playerdata positions → the family movement map image | core + guided written |
| `server-list-ping` | SLP by hand: sockets, varints, framing; the relay-routing origin-story payload | core + guided written |

### Part 6 — Beyond the game

| Lesson | Goal | Status |
|---|---|---|
| `discord-bridge` | One program bridging two protocols; tokens and secrets; loop prevention | core + guided written |
| `whos-online-page` | Flask; HTTP at last; a JSON route; the page on the family's phones | core + guided written |

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
