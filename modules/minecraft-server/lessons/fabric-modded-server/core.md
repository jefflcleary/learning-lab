# Running a modded server with Fabric

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** fabric-modded-server
- **Module / Part:** minecraft-server — Part 4.5, Modding the server
- **Scaffolding:** level 2 — heavy skill reuse (server setup, versions, copies,
  ports, log reading); the genuinely new material is the loader concept and the
  mod ecosystem's compatibility discipline
- **Deliveries:** guided + reference (setup-heavy; an adult may execute it)
- **Status:** ready

## Goal and payoff

A second server, running Fabric, with real mods installed — while the vanilla
server stays untouched. The learner leaves able to evaluate, install, and debug
mods on their own. Payoff: friends join a server where something visibly
impossible-in-vanilla is happening — and because the lesson steers to server-side
mods, they join with the unmodified game they already have.

The deeper payload: the compatibility discipline. A mod must match the Minecraft
version AND the loader, most mods need Fabric API, and the learner already owns
every skill this takes — the version research from choosing-a-version, the
project-evaluation habit, and crash-log reading.

## Prerequisites

- A server you can start, stop, and join — established by
  `modules/minecraft-server/lessons/running-your-own-server/`
- You know how versions constrain what can connect and how to research current
  support — established by `modules/minecraft-server/lessons/choosing-a-version/`
- Worlds are folders you can copy safely (server stopped) — established by
  `modules/minecraft-server/lessons/worlds-and-backups/`
- You know two servers can't share a port — established by
  `modules/minecraft-server/lessons/running-your-own-server/` (the start-it-twice
  experiment) and `modules/minecraft-server/lessons/server-settings-and-console/`
  (server-port)

## Establishes

- "A Fabric server with mods installed, separate from the vanilla server —
  established by `modules/minecraft-server/lessons/fabric-modded-server/`."
- The learner can evaluate a mod for version/loader/environment fit and diagnose a
  mod crash from the log.

## Facts

- A **mod loader** is a modified server (or client) program that loads community
  code at startup. The two big families: **Fabric** (lightweight, fast to track new
  Minecraft versions) and **Forge/NeoForge** (older, heavier ecosystem)
  [volatile as of 2026-08 — ecosystem shares shift; deliveries present this as
  "the families that exist as of writing," learner verifies currency]. This module
  uses Fabric.
- Fabric's server download: https://fabricmc.net → the server section offers a
  launcher/installer for a chosen Minecraft version [volatile — exact download
  mechanism and filename change; deliveries point at the site's current server
  instructions and never assert filenames]. Result: a launch jar run with
  `java -jar <fabric server jar> nogui` from its folder [verify current invocation
  against the site].
- Fabric the loader loads mods; most gameplay mods ALSO require the **Fabric API**
  mod (the loader's standard library, shipped as a mod). Missing it is the classic
  first failure and its error message names it [verify message shape — delivery
  has the learner read it, not recognize it].
- Mods install by placing `.jar` files in the `mods/` folder next to the server
  jar; removed by removing the file. Read at startup — restart to apply (the
  restart-to-apply rule again).
- Where mods live: **Modrinth** and **CurseForge** [volatile — point at both,
  Modrinth's filters are the teaching surface: filter by loader (Fabric), game
  version, and environment (server)].
- **Server-side vs client-side**: some mods run entirely on the server (vanilla
  clients join unchanged — performance, admin tools, many gameplay tweaks); some
  need matching client mods (new blocks/items with new visuals). This lesson
  steers to server-side mods so the existing social loop keeps working. The
  environment filter on the mod site is how you tell [volatile in UI].
- Compatibility triple: **Minecraft version + loader + (usually) Fabric API
  version**. A mod for the wrong version crashes the server at startup with a log
  that names the mod and the mismatch [verify wording variability — Fabric's
  startup errors are unusually explicit; the break-it exploits this].
- The modded server is a NEW folder (`~/projects/fabric-server`), not a
  modification of `mc-server`. Reasons stated plainly: the vanilla server is what
  friends depend on (production/dev again, third appearance), and a clean modded
  world keeps the one-way risk contained.
- World portability: a vanilla world folder loads under Fabric unchanged (same
  layout). One-way caveat stated plainly: once mods that add content have touched
  a world, removing them leaves that content missing-or-broken in place — so
  experiments happen on a COPY of the vanilla world or a fresh world, never the
  original folder.
- Both servers can run at once if their `server-port` values differ (learner knows
  why); or run one at a time on the default port.
- Java: already installed (the server needed it). Same version constraints as
  vanilla for the matching Minecraft version.

## Arc

### Orientation — given plainly

Datapacks changed the game's rules; bots played the game from outside; mods change
the game's CODE from inside — the deepest of the three surfaces, and the one the
community has built cathedrals on. What a loader is; Fabric named and chosen with
reasons; Fabric API as near-universal dependency; server-side vs client-side as
THE concept that decides whether friends can still join with vanilla clients; the
compatibility triple. The new-folder decision and its production/dev reasoning.
Install steps are the work; New tools orients and defers per the once-only rule.

### Predictions to elicit

- The mod site lets you filter by "server" vs "client." What do you think a mod
  that runs only on the server CAN'T do, that a client mod can?
- You'll copy your world into the modded server. Predict: will it just open?
  What's your reasoning?
- A mod built for a different Minecraft version goes in `mods/`. What happens at
  startup — refuses to start, starts without the mod, or something else?

### The work — goals and hint ladders

1. **Stand up the Fabric server.** New folder `~/projects/fabric-server`; get the
   Fabric server for a chosen Minecraft version from fabricmc.net (current site
   instructions are the source); first run; eula (they've done this — one line);
   `Done` line. Deliberate choice moment: which Minecraft version, using their
   choosing-a-version decision (sandbox version if bots should connect later;
   note mods must exist for it — a quick Modrinth availability check BEFORE
   committing, hint rung on how).
2. **Bring a world (on your terms).** Options given plainly: fresh world, or a
   COPY of the vanilla world (stopped server, `cp -R`, `level-name` — all owned
   skills; the one-way caveat stated here, plainly, before any mod touches it).
3. **Install Fabric API + first mods.** Goal: three mods running, all
   server-side, chosen by the learner from Modrinth with the filters (loader /
   version / server environment). Hint ladder on the search discipline, not on
   clicking. Verify each: startup log names loaded mods [verify phrasing];
   in-game effect observed where the mod has one.
4. **Prove the vanilla-client promise.** Join from the unmodified game — and if
   both servers are up, notice what had to differ (port). Housemates/friends can
   join the modded server with zero changes on their side — the payoff moment.

### Break it on purpose — failures to cause, undo, and read

- **Wrong-version mod.** Deliberately fetch a mod for a different Minecraft
  version, drop it in, start. Read the crash top to bottom: Fabric's startup
  errors name the mod, the version it wants, and the version it found — among the
  most readable errors in this whole module. Remove the file, restart, recovered.
  Teaches: the compatibility triple is enforced, loudly, and the log is the
  diagnosis.
- **Remove Fabric API** (with a mod that needs it still present). Start; read the
  dependency error — it names exactly what's missing and often the version range
  wanted [verify]. Put it back. Teaches: dependencies exist between mods, and the
  loader checks them for you — same concept as npm's node_modules, enforced at
  startup instead of install.

### What just happened — the explanation

A loader is a program that runs other people's code inside its own process — the
server stopped being one program and became a platform. That's why compatibility
is strict: mods compile against the game's internals, and the internals move every
version (the protocol-lag story from choosing-a-version, but for code instead of
messages). Server-side vs client-side falls out of the client/server split the
learner has known since their first `localhost` join: the server owns truth, so
truth-side changes need no client cooperation; new visuals live in the client, so
those need both sides. One layer deeper: this is the same reason some mods can't
ever be server-only, no matter how clever.

### Go further — open questions

- Find a mod that genuinely needs the client too. Install its server half and
  join vanilla — what exactly breaks or degrades? (Do it on the modded server,
  nothing precious there.)
- Performance mods claim big improvements. The profiler question: how would you
  MEASURE whether one helped, instead of trusting the description?
- Datapack vs mod: pick something you built as a datapack — could a mod do it
  better? What's the real tradeoff line between the two surfaces?
- Genuinely open: mod ecosystems rise and fall (loaders, sites, licensing
  disputes). What does the Fabric ecosystem look like RIGHT NOW versus when this
  lesson was written? Your findings are dated the day you make them.

## Delivery notes

- **guided:** the search-discipline hints (goal 3) are the pedagogy heart —
  Modrinth filters as choosing-a-version's skill re-applied; keep mod NAMES out of
  requirements (categories + filters only) so the lesson doesn't rot; a
  performance mod and an admin/utility mod make good suggested categories.
- **reference:** folder setup, fabricmc.net pointer, eula, Fabric API note, mods/
  mechanics, port coexistence, the two recovery moves (remove mod file; read the
  startup log), the one-way world caveat, Establishes list.
- Never assert specific mods' current existence or maintenance in learner text.
- Forward link: `creating-a-fabric-mod` is the natural next step and exists —
  the closing may point at it by title.
