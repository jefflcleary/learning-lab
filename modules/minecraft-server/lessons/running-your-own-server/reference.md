# Running your own server — reference

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

Compressed version: commands and decisions only. The teaching version is
[guided.md](guided.md). macOS.

If a learner will do this material later, consider leaving the first run for them —
the server's first-run EULA refusal is the best teaching moment in the lesson.

## Java

- The official server download page states the required Java version — check it
  (search "minecraft server download" → minecraft.net).
- Install that version's Temurin `.pkg` from <https://adoptium.net>.
- Verify in a new terminal: `java --version`

## Server

```
cd ~/projects
mkdir mc-server
cd mc-server
```

- Download `server.jar` from the official page into that folder.
- **Not** in any cloud-synced location (iCloud Desktop/Documents; OneDrive on
  Windows) — sync during writes corrupts region files.

## First run / EULA

```
java -jar server.jar nogui
```

- Exits after writing `eula.txt`. Edit `eula=false` → `eula=true`, run again.
- Up when the log prints the `Done (…)!` line.
- Optional once real people join: `java -Xmx2G -jar server.jar nogui` to cap memory.

## Join / stop

- Join from the same machine: Multiplayer → Add Server → address `localhost`.
- Default port 25565; second instance on the same port fails at startup with a
  bind error.
- Stop by typing `stop` in the console. Never kill the window — hard kills mid-write
  risk inventories and region files.

## Recovery facts

- Damaged `level.dat` → sibling backup `level.dat_old` exists.
- Stale `session.lock` after a crash → delete it while the server is stopped.

## What you have now

- A server that can be started, stopped, and joined at `~/projects/mc-server`
- Files that later lessons touch: `server.properties` (settings lesson), `logs/`
  (data lessons), `world/`
