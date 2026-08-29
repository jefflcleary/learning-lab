# Running a modded server with Fabric — reference

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

Compressed version: commands and decisions only. The teaching version is
[guided.md](guided.md).

## Setup

```
cd ~/projects
mkdir fabric-server
cd fabric-server
```

- Get the Fabric server for your chosen Minecraft version from
  <https://fabricmc.net> — follow the site's current server instructions (the
  download mechanism changes; the site is the source).
- Pick the version deliberately: check mod availability on Modrinth (filter
  Fabric + version) before committing. If bots should connect later, use the
  mineflayer-compatible sandbox version.
- First run exits on the EULA as usual; `eula=true`, run again, wait for `Done`.
- Java is already installed (vanilla server uses it).

## World

- Fresh world: nothing to do.
- Copy of the vanilla world: server stopped, `cp -R` the world folder in, point
  `level-name` at it. Loads unchanged.
- **One-way caveat:** once content-adding mods write into a world, removing them
  breaks that content in place. Only copies come here; the vanilla original stays
  put.

## Mods

- Install = drop the mod `.jar` into `mods/` next to the server jar; remove =
  delete the file. Read at startup; restart to apply.
- Install **Fabric API** first — most mods depend on it.
- Selection filters on Modrinth, always three: loader (Fabric), game version,
  **server** environment. Server-side mods keep vanilla clients joinable.
- Verify: the startup log lists loaded mods.

## Coexistence and recovery

- Both servers at once: different `server-port` values (or run one at a time).
- Crash at startup after adding a mod: read the log — Fabric names the offending
  mod and the version or dependency problem. Remove that mod's file, restart.
- Missing-dependency errors name what's missing (usually Fabric API or a library
  mod); install the named thing for your version.

## What this establishes

- A Fabric server with mods installed, separate from the untouched vanilla
  server, at `~/projects/fabric-server`
- If a learner will use this setup: the guided version additionally teaches the
  mod-evaluation discipline and the two failure drills — worth not skipping.
