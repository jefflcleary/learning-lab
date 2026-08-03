# Reading the world itself

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** world-data
- **Part:** Part 5 — Data
- **Scaffolding:** level 2 — second lesson reading server data with Python (first was
  `reading-the-logs`), second lesson installing and evaluating a third-party library
  (pip/venv established in `rcon-scripting`; source-evaluation skill established in
  `choosing-a-version`). Goals plus hints; concepts named but not applied.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

The logs were the server's diary; the world folder is the thing itself — and it is
readable. The learner opens `level.dat`, hits gibberish, and learns the honest truth:
not all files are text. This one is NBT (Named Binary Tag, Minecraft's own structured
format) wrapped in gzip compression, and there is a library for each layer. The work
escalates: read `level.dat` and verify excavated facts in-game (spawn point, time of
day, the seed — last seen as a settings key in `server-settings`, now dug out of
bytes); identify whose `playerdata` file is whose by matching in-game facts; then the
centerpiece — every player's position becomes a scatter plot: a map of where everyone
in the world is, saved as an image worth posting where the family sees it.

Under the surface: file formats are contracts, layered (gzip wrapping NBT wrapping
meaning); binary trees and JSON text trees are the same idea in different encodings;
and data becomes pictures people care about.

## Prerequisites

- Python scripts you can write and run, with the virtual-environment and pip routine —
  established by `lessons/rcon-scripting/` (Python itself by `lessons/reading-the-logs/`)
- The copies reflex: world files get read on copies, or with the server stopped —
  established by `lessons/worlds-and-copies/`
- A server with a world that has actually been played in (a fresh untouched world has
  nothing interesting in `playerdata/`) — established by `lessons/running-your-own-server/`
- Console access for in-game verification — established by `lessons/console-commands/`

## Leaves behind

- The learner has read binary world data (gzip-compressed NBT) from copies, using a
  library they evaluated and installed themselves, and produced an image from it
- Knows the layering gzip → NBT → meaning and can name which library handled which layer
- Has a saved map image generated from world data
- Cited by other cores as: "you've read world data (NBT) from safe copies with Python —
  established by `lessons/world-data/`."

## Facts

- The world folder is the world (`worlds-and-copies` established this). Inside it:
  - `world/level.dat` — global world state: name, spawn, time, seed, gamerules, more.
  - `world/playerdata/<uuid>.dat` — one file per player who has ever joined.
  - `world/region/*.mca` — the terrain itself, in "Anvil" region files, 32×32 chunks
    per file. Substantially more complex than the .dat files (internal offset tables,
    per-chunk compression); deliberately scoped OUT of the required work and into Go
    further. [verify: region parsing depth — treating it as go-further is the honest
    scope either way]
  - The Nether and End live in `world/DIM-1/` and `world/DIM1/` [verify exact
    subfolder layout on current versions — go-further material only].
- `level.dat` and `playerdata/*.dat` are **gzip-compressed NBT** (stable fact, format
  documented on minecraft.wiki — pages "NBT format" and "level.dat" name the field
  structure; point learners there rather than asserting field paths).
- **NBT** = Named Binary Tag: Mojang's binary structured format. Named, typed tags
  nested in compounds and lists — a tree, exactly like JSON is a tree, but encoded as
  bytes instead of text.
- **gzip**: a general-purpose compression format (same family as .zip). Compressed
  files begin with the two signature bytes `1f 8b` — a "magic number," which is how
  tools recognize file types without trusting the filename. The learner met
  compression incidentally in `reading-the-logs` (old logs arrive as `.log.gz`); this
  lesson is where it gets named and handled properly. Python ships a `gzip` module in
  the standard library.
- The `file` command (ships with macOS [macos]) reports what a file actually is by
  reading its signature bytes: `file level.dat` → reports gzip compressed data.
- VS Code refuses to render binary files as text and says so in a notice ("the file is
  not displayed... because it is either binary or unsupported text encoding" —
  approximate wording [verify exact message text; delivery should say "read what VS
  Code tells you," not quote it]).
- **nbtlib** — Python NBT library on PyPI; loads gzip-compressed NBT transparently
  (`nbtlib.load(path)`), exposes the tree with dict-style access
  (`data['Data']['Time']`) [volatile as of 2026-07: appeared maintained; verify
  maintenance status and exact API before every delivery regeneration — and the
  DELIVERY never asserts it: the learner evaluates the candidate on PyPI/GitHub
  (README, issues, recent releases) exactly as `choosing-a-version` taught. The
  evaluation is part of the lesson, not overhead.]
- **anvil-parser** (and forks like anvil-parser2) — candidate libraries for region
  files [volatile as of 2026-07; verify names/maintenance; go-further only — learner
  runs the same evaluation if they go there].
- `level.dat` structure: everything lives under a root compound `Data`. Fields worth
  excavating and verifying: `LevelName`; `SpawnX`/`SpawnY`/`SpawnZ` (world spawn);
  `Time` (total ticks since world creation) and `DayTime` (time-of-day ticks);
  the seed — on modern versions nested under `Data.WorldGenSettings.seed`, on older
  versions `Data.RandomSeed` [verify path per version — deliveries do NOT assert the
  path; the learner finds it by scrolling the printed tree, which is the
  read-the-surface exercise anyway].
- 20 ticks = 1 second; `DayTime` runs 0–23999 per Minecraft day, 0 = morning [verify
  exact anchor; verification uses matching numbers, not interpreting them].
- In-game verification commands (console): `seed` prints the world seed;
  `time query daytime` prints the time-of-day ticks [verify exact command output
  format]. World spawn is verifiable with a vanilla compass: compasses point to world
  spawn. Player position is on the F3 debug screen (XYZ).
- `playerdata` fields worth finding: `Pos` (list of three doubles: x, y, z),
  `Dimension`, `XpLevel`, `Health`, `Inventory` [verify names by exploration — the
  delivery has the learner scroll the tree rather than trusting a field list].
- **UUID** = universally unique identifier: a 128-bit number written as hex with
  dashes. Player files are keyed by UUID and not by name because names can change
  (Mojang allows renames); the UUID never does. Orientation — given plainly.
- The server keeps `usercache.json` in the server folder, mapping recent player names
  to UUIDs [verify filename/location] — hint-ladder material (rung 3) for the
  whose-file-is-whose goal, not orientation: matching files to players by in-game
  facts first is the exercise.
- **matplotlib** — "the plotting library": the standard Python library for turning
  numbers into charts and images. `pip install matplotlib` in the venv. Minimal
  surface for this lesson: `scatter` (dots at x/y positions), `annotate` or `text`
  (labels), `savefig` (write a PNG). Point at matplotlib's own docs for call details
  — the delivery gives function names (rung 3 style), not usage.
- A top-down Minecraft map plots **x against z**; y is height. Minecraft's z grows
  southward, so a plot without axis-flipping is mirrored north-south versus the
  in-game map — fine for this lesson; noting/fixing it is go-further texture.
- Safety: ALL reads happen on a copy taken with the server stopped (`cp -r world
  <copy>` — copyable setup command), or on files restored from a dated backup
  (`backups` established those). Reading a live file cannot damage the world (reads
  don't write), but the read itself is unreliable — the break-it section measures
  exactly that. The reflex from `worlds-and-copies` stands.

## Arc

### Orientation — given plainly

The logs were the server's diary — its account of events. The world folder is not an
account of anything; it IS the world. Stop the server, copy the world folder, and
every fact about that world is sitting in the copy, readable by any program you
write.

The catch, met honestly: open `level.dat` in VS Code and it is not text. Not all
files are text. Text files are one kind of file — bytes that happen to encode
characters. This file's bytes encode a structure directly: NBT, Named Binary Tag,
Minecraft's own format, and the whole thing is additionally compressed with gzip.
Neither layer is a secret; both are documented, and there is a Python library for
each (gzip in the standard library; NBT from PyPI — with the learner confirming the
candidate library's current health before installing, the way `choosing-a-version`
taught: README, issues, releases).

UUIDs explained plainly (see Facts). matplotlib introduced plainly as the plotting
library. The copies rule restated once, plainly: this whole lesson happens inside a
copy.

### Predictions to elicit

- Before opening anything: list five pieces of information the server must keep
  somewhere for a world to work. (Check the list against the tree at the end.)
- What will you actually see when you open `level.dat` in an editor built for text?
- One player's file: how many bytes? Write a number, check with `ls -l`.
- The playerdata folder has one file per player — how will you tell whose is whose
  when the filenames are just hex?

### The work — goals and hint ladders

1. **Take a safe copy.** Server stopped, `cp -r world ~/projects/world-lab/world` (or
   copy out of a dated backup). Copyable setup, no puzzle. Everything below happens in
   the copy.

2. **Meet a binary file.** Open the copy's `level.dat` in VS Code; read what VS Code
   says about it. Then, in Python, read the first four bytes
   (`open(path, 'rb').read(4)`) and print them; run `file level.dat` in the terminal.
   Goal: connect the three observations — editor notice, `1f 8b` signature bytes,
   `file`'s verdict — into one sentence about what this file is. This is guided
   experience, not a withheld puzzle; the only discovery is that `1f 8b` is gzip's
   signature, which the learner can confirm by searching "gzip magic number."

3. **Choose and install the NBT library.** Goal: an NBT library installed in a venv,
   chosen after checking its current state. nbtlib is named as the leading candidate;
   the learner confirms on PyPI/GitHub: README says what? Last release when? Issues
   alive or abandoned? (Same evaluation loop as `choosing-a-version`; deliveries link
   it.) If the check reveals nbtlib abandoned, picking the successor IS the lesson
   working as designed.
   - Rung 1: you have done exactly this evaluation before, on a different library —
     same three places to look.
   - Rung 2: PyPI search "nbt"; for each plausible candidate: last release date,
     README quality, issue tracker activity. Recent releases and responsive issues
     beat stars.
   - Rung 3: `pip install nbtlib` in the venv once satisfied; the README's first
     example shows how to load a file.

4. **Print the whole tree, then scroll it.** Load `level.dat` with the library and
   print the entire structure once. Read-the-surface: scroll top to bottom, no
   hunting, just seeing how much world state exists. Check the five-item prediction.
   - Rung 1: the library's README shows loading a file in its first example; printing
     the loaded object may be enough, or the README names a prettier way.
   - Rung 2: everything interesting hangs under one root entry — notice its name;
     dict-style access with square brackets walks into it.

5. **Excavate three facts and verify each in-game.** Goal: from the tree, extract the
   world spawn coordinates, the time of day, and the seed — then start the server
   (the real one; the copy stays untouched) and verify each against reality: a
   compass points to world spawn; `time query daytime` in the console; `seed` in the
   console. The seed closes a loop opened in `server-settings`, where it was a
   settings key — here it is excavated from bytes.
   - Rung 1: you already scrolled past all three. Scroll again with three words in
     your head: spawn, time, seed.
   - Rung 2: field names are close to English: spawn is three values with an obvious
     prefix; time appears twice under different names (total-age versus
     time-of-day — compare both against `time query daytime` and work out which is
     which); the seed may be nested a level or two deeper than the others.
   - Rung 3: the minecraft.wiki page on `level.dat` documents every field — same
     move as the `server.properties` page in `server-settings`.

6. **Whose file is whose.** Goal: for each file in `playerdata/`, determine which
   player it belongs to — without asking the internet, by matching facts in the file
   against facts in the game. (UUIDs given plainly in orientation: names change,
   UUIDs don't, so files are keyed by the thing that never changes.)
   - Rung 1: each file records things a player could check about themselves in-game.
     What does the F3 debug screen show that the file must also contain?
   - Rung 2: `Pos` holds three numbers — x, y, z, exactly what F3 shows. Note the
     copy is a snapshot: positions are where players were when the copy was taken,
     not where they are now. Experience level and held items also cross-check.
   - Rung 3: the server keeps its own name-to-UUID notes in a JSON file in the server
     folder — you have read JSON before. Find the file, use it to check your
     matching. [verify usercache.json]
7. **The map.** Centerpiece goal: one image — every player's position as a labeled
   dot, world spawn marked, saved as a PNG. matplotlib installed with pip (routine by
   now). Success: an image file that opens in Preview and means something to the
   people whose dots are on it.
   - Rung 1: a map is a flat, top-down view. `Pos` has three numbers; a top-down view
     uses two of them. Which one is height?
   - Rung 2: x and z. The plotting calls: `scatter` puts dots at coordinate pairs;
     `annotate` (or `text`) puts a name next to a dot; `savefig` writes the image.
     matplotlib's own documentation shows each one's arguments — that lookup is
     yours.
   - Rung 3: loop over the playerdata files, collect (x, z, name) per player, one
     `scatter` call with the collected lists (or one per player), then labels, then
     `savefig('map.png')`. Compare the finished image against the in-game map — if
     north-south looks mirrored, that observation is real, and Go further picks it
     up.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Read a file while its owner is writing it.** The experiment that justifies the
  copies rule with a measurement. On the expendable server (reads cannot damage the
  world — reading never writes — but keep the reflex clean and use the sandbox):
  start the server, then run a small loop that loads the LIVE `world/level.dat` every
  couple of seconds and prints the time field, while in-game time advances. Watch for
  two distinct kinds of wrongness: values that lag reality (stale reads — the server
  keeps the real world in memory and writes to disk only periodically), and, if the
  timing lands mid-write, a parse error from reading half a file. [verify exact
  failure mode — the server may write level.dat via write-then-rename, making clean
  mid-write catches rare; EITHER observed outcome carries the lesson, and the
  delivery frames it as "run it and report what you actually observe."] Undo:
  nothing — stop the loop, stop the server. Teaches: the disk copy of a live world is
  not the world; the memory copy is (the same startup-read/memory-copy story as
  `server-settings`, now seen from the write side). This is WHY copies.
- **Feed bytes to the wrong layer.** First do it right by hand once: use Python's
  `gzip` module to decompress `level.dat` yourself and look at the first bytes of
  what comes out (no longer `1f 8b` — now the NBT layer's own first byte). Then break
  it both directions: hand the still-compressed raw bytes to the NBT-parsing layer,
  and hand the decompressed bytes to `gzip.open`. Read both errors completely.
  [verify exact error texts — likely "Not a gzipped file (b'...')" from gzip and a
  bad-tag/offset complaint from the NBT parser.] Teaches error literacy for binary
  tools: text tools said "line 47"; binary tools say offsets, byte values, and magic
  numbers — same skill, different units. Undo: nothing — these were reads of a copy.

### What just happened — the explanation

File formats are contracts. gzip is a contract about compression; NBT is a contract
about structure; the meaning of a field named `SpawnX` is Minecraft's contract with
itself. The file the learner read is three contracts stacked — gzip wrapping NBT
wrapping meaning — and they used one tool per layer: the gzip module for the outer
layer, the NBT library for the middle, and their own knowledge of the game for the
top. Every "unreadable" file on any computer is this: layers, each documented
somewhere, each with a tool.

Trees as a data shape: NBT is compounds holding tags holding lists — nested, like
JSON's objects holding keys holding arrays. Same shape, different encoding: JSON
spends bytes on human-readable text; NBT spends them on compact binary. The learner
has now read the same tree shape in two encodings, which is most of what there is to
know about structured data.

And the payoff shape: data became a picture. The scatter plot is the first time in
the course that bytes turned into something a non-programmer looks at and immediately
understands. That transformation — data, script, image people care about — is a
complete and repeatable move.

### Go further — open questions

- The block census. The terrain itself lives in `region/*.mca` — a meaningfully
  deeper format (offset tables inside, per-chunk compression). Candidate libraries
  exist on PyPI (anvil-parser and its forks [volatile as of 2026-07]) — run the same
  evaluation you ran for the NBT library, and try counting every block type in the
  world. How many diamonds does the whole world contain?
- You have dated backups (from `backups`). Each one contains a `playerdata/` folder —
  positions at different moments in time. Realize what that archive is: a time
  series, accumulated by accident. Plot every backup's positions on one image. What
  does the family's movement over weeks look like?
- The Nether has its own folders inside the world. Map it.
- Genuinely open: a "wealth map" — where the diamonds are, including inside chests —
  is technically reachable from region data. Whose chests, though? Is reading another
  player's chest contents from the files fair play, when they couldn't see yours
  in-game? There is no settled answer; deciding what data you should read, separate
  from what you can read, is a real question that working with data never stops
  asking.

## Delivery notes

- **guided:** the VS Code gibberish moment is the emotional pivot — let the learner
  hit it before explaining NBT, but explain immediately after (orientation is not
  withheld; it is sequenced). Do not spoil the live-read break-it outcome (stale vs
  error) — it genuinely varies, and the honest framing is "measure and report."
- Never assert nbtlib's or anvil-parser's health in learner text; the evaluation
  against PyPI/GitHub is a required step, linked to `choosing-a-version`.
- Do not assert NBT field paths (especially the seed's nesting) — the learner finds
  them by scrolling the tree; the wiki `level.dat` page is the rung-3 pointer.
- Keep matplotlib surface minimal: three function names and a link to its docs.
  Resist teaching plotting; the lesson is about the data, and the picture is the
  reward.
- The map lands hardest when several people have joined the world; if only one
  player exists, the delivery's phrasing should still work (one labeled dot plus
  spawn is still a map). Never assume a household.
