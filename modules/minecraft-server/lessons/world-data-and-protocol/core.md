# Reading world data and speaking the protocol

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** world-data-and-protocol
- **Module / Part:** minecraft-server — Part 5 — Data
- **Scaffolding:** per-section. **Files half** (goals 1–7): level 2 — second lesson
  reading server data with Python (first was the log-reading half of
  `python-logs-and-rcon`), second lesson installing and evaluating a third-party
  library (pip/venv established in `python-logs-and-rcon`; source-evaluation skill
  established in `choosing-a-version`); goals plus hints, concepts named but not
  applied. **Wire half** (goals 8–11): level 3 — capstone of the networking thread;
  goals and success criteria only, with ONE sanctioned exception: a completion
  problem for the varint encoder, because varints are genuinely fiddly and a wrong
  encoder fails silently.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

One lesson, two halves, one idea. The logs were the server's diary; this lesson reads
the server's data where no diary exists — first **at rest** (the world folder's own
binary files), then **in motion** (the bytes of the Server List Ping, spoken by hand
on a raw socket).

Files half: the learner opens `level.dat`, hits gibberish, and learns the honest
truth: not all files are text. This one is NBT (Named Binary Tag, Minecraft's own
structured format) wrapped in gzip compression, and there is a library for each
layer. The work escalates: read `level.dat` and verify excavated facts in-game
(spawn point, time of day, the seed — last seen as a settings key in
`server-settings-and-console`, now dug out of bytes); identify whose `playerdata`
file is whose by matching in-game facts; then the centerpiece — every player's
position becomes a scatter plot: a map of where everyone in the world is, saved as
an image worth posting where the family sees it.

Wire half: the multiplayer screen's trick — server name, message, player count
appearing without joining — was explained in `server-settings-and-console` as "a
tiny conversation," and the module promised the learner would one day speak it by
hand. Today. No library: a raw socket, bytes assembled per the community protocol
documentation, and the server answers with JSON describing itself. Then the same
script pointed at a big public server: the same JSON shape arriving from a
stranger's machine across the internet.

The merged what-just-happened's spine: the two halves decompose identically —
gzip wrapping NBT wrapping meaning; varint encoding inside packet framing inside
JSON meaning. Encoding, framing, meaning: same diagram, two stacks, seen twice in
one lesson. Once is a trick; twice is a pattern.

Payoffs: a map image the family recognizes themselves on, and a script that pings
ANY Minecraft server on earth and reports who's home — the engine of
`discord-and-web`'s status page.

## Prerequisites

- Python scripts you can write and run, with the virtual-environment and pip
  routine, and experience talking to a server program from Python (via a library) —
  established by `lessons/python-logs-and-rcon/`
- The copies reflex: world files get read on copies, or with the server stopped —
  established by `lessons/worlds-and-backups/`
- A server you can start and stop on this machine, with a world that has actually
  been played in (a fresh untouched world has nothing interesting in
  `playerdata/`), and the words client, server, localhost, port — established by
  `lessons/running-your-own-server/`
- Console access for in-game verification, and the idea that the multiplayer screen
  pings servers and they answer — established by
  `lessons/server-settings-and-console/`
- The protocol-version concept (clients announce a protocol version; mismatched
  joins are refused) — established by `lessons/choosing-a-version/`

## Establishes

- The learner has read binary world data (gzip-compressed NBT) from copies, using a
  library they evaluated and installed themselves, and produced a saved map image
  from it
- A working `ping.py` (name flexible) that performs a Server List Ping against any
  host:port and prints the parsed status JSON
- The learner has read a real protocol specification and implemented part of it
  (varints) from the description alone, testing the piece standalone before
  trusting it in the whole
- The layering lens — encoding, framing, meaning — seen in two unrelated stacks
  (file format and wire protocol) in one lesson
- Cited by other cores as: "you've read world data (NBT) from safe copies with
  Python, and you can ping any Minecraft server from Python and parse the status
  reply — established by `lessons/world-data-and-protocol/`." (`discord-and-web`
  builds directly on the ping script.)

## Facts

### World files

- The world folder is the world (`worlds-and-backups` established this). Inside it:
  - `world/level.dat` — global world state: name, spawn, time, seed, gamerules, more.
  - `world/playerdata/<uuid>.dat` — one file per player who has ever joined.
  - `world/region/*.mca` — the terrain itself, in "Anvil" region files, 32×32 chunks
    per file. Substantially more complex than the .dat files (internal offset tables,
    per-chunk compression); deliberately scoped OUT of the required work and into Go
    further. [verify: region parsing depth — treating it as go-further is the honest
    scope either way]
- `level.dat` and `playerdata/*.dat` are **gzip-compressed NBT** (stable fact, format
  documented on minecraft.wiki — pages "NBT format" and "level.dat" name the field
  structure; point learners there rather than asserting field paths).
- **NBT** = Named Binary Tag: Mojang's binary structured format. Named, typed tags
  nested in compounds and lists — a tree, exactly like JSON is a tree, but encoded as
  bytes instead of text.
- **gzip**: a general-purpose compression format (same family as .zip). Compressed
  files begin with the two signature bytes `1f 8b` — a "magic number," which is how
  tools recognize file types without trusting the filename. The learner met
  compression incidentally in `python-logs-and-rcon` (old logs arrive as `.log.gz`);
  this lesson is where it gets named and handled properly. Python ships a `gzip`
  module in the standard library.
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
  (`worlds-and-backups` established those). Reading a live file cannot damage the
  world (reads don't write), but the read itself is unreliable — the break-it section
  measures exactly that. The reflex from `worlds-and-backups` stands.

### The wire

- **Socket:** the operating system handing a program a two-way byte pipe to another
  program, named by address + port. Everything the learner has used sits on sockets —
  RCON, mineflayer, the game client, HTTP. Python: `import socket`;
  `socket.create_connection((host, port), timeout=5)` returns a connected socket;
  `sock.sendall(bytes)` sends; `sock.recv(n)` receives. Standard library, nothing to
  install.
- **`recv(n)` returns AT MOST n bytes — whatever has arrived so far, not what you
  asked for.** To read an exact count, loop until you have it. This is orientation
  (underivable, and the classic first-sockets trap) — given plainly. It is also *why*
  length-prefixing exists: the length tells you when to stop reading.
- **The protocol documentation:** historically the "Server List Ping" page on
  wiki.vg. [verify current home as of delivery regeneration — wiki.vg content was
  reported migrating to minecraft.wiki circa 2024–2025; volatile as of 2026-07. The
  delivery NEVER asserts a URL: the learner searches for the community protocol
  documentation ("Server List Ping" as the search phrase) and confirms they have
  found the page that specifies packets byte-by-byte. Finding the spec's current home
  is part of the lesson.]
- The delivery assigns **skimming the entire Server List Ping page before writing any
  wire code** — the wire half's read-the-surface exercise is reading a real protocol
  spec (the files half's is scrolling the whole printed NBT tree).
- **The modern Server List Ping, conceptually** (author's map; the learner gets the
  concepts plainly but builds from the spec):
  1. Client connects by TCP to the server's port (default 25565).
  2. Everything after that is **packets**: `[length: varint] [packet id: varint]
     [fields...]` — length counts everything after itself.
  3. Client sends a **Handshake** (packet id 0x00): protocol version (varint), server
     address (string), server port (unsigned short, 2 bytes, big-endian), next state
     (varint; 1 = status, 2 = login).
  4. Client sends a **Status Request** (packet id 0x00, no fields — an empty packet).
  5. Server sends a **Status Response**: packet id 0x00 then a string containing
     JSON.
  6. **Strings** on the wire are: varint byte-length, then that many bytes of UTF-8.
  7. Optional ping/pong round (packet id 0x01, 8-byte payload echoed) exists; not
     required for the JSON. [verify against current spec at regeneration]
- **Varint:** an integer encoding that spends bytes only as needed. Seven data bits
  per byte, least-significant group first; the high bit of each byte says "more bytes
  follow." Max 5 bytes for 32-bit values. Negative numbers use the full 5 bytes (32-bit
  two's complement) — irrelevant for this lesson if the learner uses a non-negative
  protocol version.
- **Worked varint logic (author reference — NEVER given whole in the delivery; the
  completion problem blanks the load-bearing lines):**

  ```python
  def write_varint(n):
      out = b""
      while True:
          part = n & 0x7F          # low 7 bits
          n >>= 7
          if n != 0:
              out += bytes([part | 0x80])   # more coming: set high bit
          else:
              out += bytes([part])
              return out

  def read_varint(sock):
      value = 0
      shift = 0
      while True:
          byte = sock.recv(1)[0]
          value |= (byte & 0x7F) << shift
          if (byte & 0x80) == 0:
              return value
          shift += 7
  ```

- **Test vectors** (the spec's own table has these [verify table present on current
  spec page]; independently checkable by hand):
  - 0 → `00` · 1 → `01` · 127 → `7f` · 128 → `80 01` · 255 → `ff 01`
  - 25565 → `dd c7 01` · 2097151 → `ff ff 7f`
- Useful Python for the surrounding assembly: `struct.pack('>H', port)` for the
  unsigned short; `s.encode('utf-8')`; `bytes.hex()` for eyeballing what you built;
  `json.loads` for the reply.
- **Status response JSON shape** [verify fields against spec]: `version` {`name`,
  `protocol`}, `players` {`max`, `online`, sometimes `sample` — a partial list of who
  is on}, `description` (the motd — sometimes a string, sometimes a nested text
  object), often `favicon` (a base64-encoded PNG in a data URI — go-further).
- **Protocol version in a STATUS ping:** widely reported that servers answer status
  regardless of the announced protocol version (status must work for clients of any
  version — that is its job); the response's `version.protocol` tells the client what
  the server speaks. [verify — and the delivery treats it as an experiment either
  way: "does it care? measure." Contrast with `choosing-a-version`, where mismatched
  JOINS were refused instantly.]
- **Connecting and sending nothing:** the server speaks second in this protocol; it
  waits, then times out and closes the connection (commonly ~30 seconds [verify exact
  timeout; delivery has learner measure rather than told]).
- **The origin-story payload, stated generically:** the handshake carries the
  hostname the client typed, in plaintext, to the server. That is how a machine
  receiving connections for MANY servers on one shared address knows which one you
  meant: it reads the hostname out of the handshake and routes the connection.
  Shared-hosting relays and proxy front-ends work exactly this way. Deliver as the
  answer to a long-standing question ("how did a relay ever know which world you
  meant"), phrased so it lands for anyone who has used one and reads fine for anyone
  who hasn't. No assumed journey.
- Public server addresses are public — printed on the servers' own websites
  [volatile: never name one as current in learner text; "any big server's site
  publishes its address" is the stable phrasing]. A status ping against them is
  exactly what the multiplayer screen does to every listed server; it is the intended,
  public interaction. (Distinct from *scanning* — go-further handles that line.)
- `online-mode` / auth is irrelevant to status — status happens before any login.

## Arc

### Orientation — given plainly

**Files half.** The logs were the server's diary — its account of events. The world
folder is not an account of anything; it IS the world. Stop the server, copy the
world folder, and every fact about that world is sitting in the copy, readable by
any program you write.

The catch, met honestly: open `level.dat` in VS Code and it is not text. Not all
files are text. Text files are one kind of file — bytes that happen to encode
characters. This file's bytes encode a structure directly: NBT, Named Binary Tag,
Minecraft's own format, and the whole thing is additionally compressed with gzip.
Neither layer is a secret; both are documented, and there is a Python library for
each (gzip in the standard library; NBT from PyPI — with the learner confirming the
candidate library's current health before installing, the way `choosing-a-version`
taught: README, issues, releases).

UUIDs explained plainly (see Facts). matplotlib introduced plainly as the plotting
library. The copies rule restated once, plainly: the files half happens inside a
copy.

**Wire half.** The promise made in `server-settings-and-console` gets recalled: the
multiplayer screen's name/motd/player-count is a tiny conversation, and today the
learner speaks it raw.

**What a socket is** — plainly, generously: the OS hands your program a two-way byte
pipe to another program, named by address and port. Under RCON was a socket. Under
mineflayer, a socket. Under the game, the browser, everything — sockets. Python's
`socket` module is the standard library's direct handle on it; `create_connection`,
`sendall`, `recv` named with one-line meanings. The `recv` partial-read fact given
plainly (see Facts) with its consequence: length prefixes exist so the reader knows
when to stop.

**Where the truth lives:** the community-maintained protocol documentation — the same
documentation the authors of every library and bot the learner has used were reading.
The learner finds its current home by searching "Server List Ping" (the historical
home was a site called wiki.vg; the delivery says the documentation has moved over
the years and finding its current address is step zero). Assignment before any wire
code: skim the ENTIRE Server List Ping page, no note-taking required — see the size
of it, notice the packet tables, notice it is finite.

**The shape of the conversation**, conceptually (packets, handshake fields, status
request, JSON reply, strings-as-length-plus-bytes, varints and why they exist) — all
given plainly per Facts. What is withheld: every line of code that implements it.

**The merged frame**, stated in the delivery's opening: at rest and in motion, the
data comes apart the same way — layers, each documented, each with a tool. The
delivery does not front-load the full parallel; What just happened draws it as the
spine.

### Predictions to elicit

(Merged from both sources: best five kept. Cut: the byte-count of one playerdata
file; the estimate of total bytes to send; "will the server answer a program that
isn't Minecraft at all" — its theme, correctness as the only membership card, is
stated plainly in the delivery's opening.)

- Before opening anything: list five pieces of information the server must keep
  somewhere for a world to work. (Check the list against the tree at the end.)
- What will you actually see when you open `level.dat` in an editor built for text?
- The playerdata folder has one file per player — how will you tell whose is whose
  when the filenames are just hex?
- You connect a socket to your server and send nothing. Who is supposed to speak
  first in this protocol — and how long will the other side wait for you? Guess in
  seconds; you'll measure.
- The status reply tells you the server's protocol version. Do you think the server
  cares what protocol version YOU claim, when you're only asking for status? (You
  watched it care very much about joins.)

### The work — goals and hint ladders

**Files half — level 2, hints as recorded:**

1. **Take a safe copy.** Server stopped, `cp -r world ~/projects/world-lab/world` (or
   copy out of a dated backup). Copyable setup, no puzzle. Everything in this half
   happens in the copy.

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
   console. The seed closes a loop opened in `server-settings-and-console`, where it
   was a settings key — here it is excavated from bytes.
   - Rung 1: you already scrolled past all three. Scroll again with three words in
     your head: spawn, time, seed.
   - Rung 2: field names are close to English: spawn is three values with an obvious
     prefix; time appears twice under different names (total-age versus
     time-of-day — compare both against `time query daytime` and work out which is
     which); the seed may be nested a level or two deeper than the others.
   - Rung 3: the minecraft.wiki page on `level.dat` documents every field — same
     move as the `server.properties` page in `server-settings-and-console`.

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

7. **The map.** Files-half centerpiece: one image — every player's position as a
   labeled dot, world spawn marked, saved as a PNG. matplotlib installed with pip
   (routine by now). Success: an image file that opens in Preview and means something
   to the people whose dots are on it.
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

**Internal transition** (was the two lessons' seam): the files were the world at
rest; the same server also speaks — the multiplayer screen's tiny conversation, now
by hand. Step zero of the wire half: find the spec's current home and skim the
entire Server List Ping page.

**Wire half — level 3, goals and success criteria only:**

8. **Silence is data.** Connect a raw socket to your own server (localhost:25565)
   and send nothing. Observe. Done when: the learner can say who hung up, and after
   roughly how long (measure it — `time.time()` around the wait, or count).
   Establishes: connecting is not communicating; this protocol is client-speaks-first.

9. **Varints, standalone.** Implement `write_varint` and `read_varint` from the
   spec's description. TEST THEM BY THEMSELVES against the spec's example table
   before any socket touches them — encode the table's numbers, compare hex; feed
   encoded bytes back through the reader, confirm round-trip. Done when: every test
   vector passes both directions. Name the practice lightly in the delivery: testing
   a piece by itself before trusting it inside the whole — the habit that saves hours,
   because a wrong varint inside a full ping fails as pure silence with no error
   message. (Seed of unit testing; the vocabulary "unit test" may be named in
   passing, no ceremony.)
   - **Sanctioned completion problem** (collapsed): skeleton of `write_varint` with
     the load-bearing expressions blanked (`____ & 0x7F`-level blanks: the mask, the
     shift, the continuation-bit set, the loop-exit condition). Presented as "if the
     encoder fights back"; reader is expected to attempt from the spec first.

10. **The full ping, against your own server.** Handshake + status request down the
    socket; read the reply; parse the JSON with `json`; print it readably. Done when:
    the learner's own server describes itself — motd (recognizably the one they wrote
    in `server-settings-and-console`), version, player count — fetched by their own
    bytes. Success criteria in the delivery include a debugging affordance stated
    plainly as orientation, not hint: print your assembled packet as hex (`.hex()`)
    before sending and compare against the spec's field order by eye; and remember
    `recv` loops until the promised length has arrived.

11. **Across the internet.** Point the same script at a big public server — any
    famous one; its address is published on its own website. Done when: the same JSON
    shape arrives from a stranger's machine — thousands of players online, fetched by
    a script the learner wrote from a spec. This is the chills moment; the delivery
    should let the output speak and keep the prose flat. Note plainly: this is the
    same request the multiplayer screen makes to every server on the list — the
    intended, public interaction.

The origin-story passage (hostname travels in the handshake in plaintext; that is
precisely how shared-address relays and proxies route connections) renders inside
What just happened.

### Break it on purpose — failures to cause, what each teaches, how to undo

(Merged: best four kept — two per half. Cut in the merge: fields-out-of-order from
the wire half; its lesson — the spec is the entire shared understanding — is carried
by wrong-next-state and by any accidental mistake along the way.)

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
  `server-settings-and-console`, now seen from the write side). This is WHY copies.
- **Feed bytes to the wrong layer.** First do it right by hand once: use Python's
  `gzip` module to decompress `level.dat` yourself and look at the first bytes of
  what comes out (no longer `1f 8b` — now the NBT layer's own first byte). Then break
  it both directions: hand the still-compressed raw bytes to the NBT-parsing layer,
  and hand the decompressed bytes to `gzip.open`. Read both errors completely.
  [verify exact error texts — likely "Not a gzipped file (b'...')" from gzip and a
  bad-tag/offset complaint from the NBT parser.] Teaches error literacy for binary
  tools: text tools said "line 47"; binary tools say offsets, byte values, and magic
  numbers — same skill, different units. Undo: nothing — these were reads of a copy.
- **Lie about the protocol version in a status ping.** Claim something absurd.
  Does the status reply still come? Contrast with `choosing-a-version`, where
  mismatched joins were refused before anything else — is status more forgiving, and
  why would it have to be? (For the learner to articulate: status exists to be asked
  by clients of ANY version.) Undo: put the real version back. Outcome deliberately
  not asserted — the learner measures. [verify: outcome is a describable range, not
  a certainty; keep deliveries outcome-neutral]
- **Wrong next-state.** Send 2 (login) instead of 1 (status) in the handshake, then
  send the status request as before. What comes back — an error, a disconnect
  message, silence? The server is now interpreting the learner's status-request
  bytes as if they were login packets: same bytes, different meaning, because state
  changed. Teaches: protocols are state machines; meaning depends on where in the
  conversation you are. Undo: put 1 back.

### What just happened — the explanation

The spine: **the same diagram, two stacks.** File formats are contracts. gzip is a
contract about compression; NBT is a contract about structure; the meaning of a
field named `SpawnX` is Minecraft's contract with itself. The file the learner read
is three contracts stacked — gzip wrapping NBT wrapping meaning — and they used one
tool per layer. Then the wire: varint encoding inside packet framing inside JSON
meaning. Encoding, framing, meaning — a file at rest and a conversation in motion,
decomposing identically, in one sitting. Once is a trick; twice is a pattern; the
learner should now expect every format and protocol they ever meet to come apart
this way.

Everything above the socket was always just bytes in agreed shapes. RCON: bytes in
an agreed shape (with a password field). Mineflayer: someone's very large
implementation of thousands of pages of agreed shapes. HTTP, when the learner meets
it: bytes in an agreed shape. A library is someone who read the spec so you don't
have to — and the learner has now been that someone once, which permanently changes
what a library looks like from the outside.

Why the details exist: varints, because small numbers are overwhelmingly common and
spending 4 bytes on the number 1 wastes most of them; length-prefixing, because a
byte pipe has no boundaries — `recv` proved that — so messages must carry their own
edges; the handshake's hostname field, because routing at shared addresses needs it
(the origin-story passage lands here).

Trees as a data shape: NBT is compounds holding tags holding lists — nested, like
JSON's objects holding keys holding arrays. Same shape, different encoding. The
learner has now read the same tree shape in two encodings, which is most of what
there is to know about structured data.

And the payoff shape: data became a picture. The scatter plot is the first time in
the module that bytes turned into something a non-programmer looks at and
immediately understands. That transformation — data, script, image people care
about — is a complete and repeatable move.

### Go further — open questions

(Merged: six kept, both genuinely open questions preserved. Cut in the merge:
map-the-Nether — thin next to the block census; ping-a-list-of-servers table —
superseded by `discord-and-web`'s status page, which puts the ping engine to real
work.)

- The block census. The terrain itself lives in `region/*.mca` — a meaningfully
  deeper format (offset tables inside, per-chunk compression). Candidate libraries
  exist on PyPI (anvil-parser and its forks [volatile as of 2026-07]) — run the same
  evaluation you ran for the NBT library, and try counting every block type in the
  world. How many diamonds does the whole world contain?
- You have dated backups (from `worlds-and-backups`). Each one contains a
  `playerdata/` folder — positions at different moments in time. Realize what that
  archive is: a time series, accumulated by accident. Plot every backup's positions
  on one image. What does the family's movement over weeks look like?
- The JSON often includes `favicon` — the little server icon, as text. It is
  base64-encoded PNG (base64: bytes disguised as text so they can ride inside JSON —
  the learner has now seen the reverse of "text disguised as bytes"). Decode it and
  write an actual `.png` file. Python's `base64` module; note the data-URI prefix
  needs stripping. [verify field format]
- Implement the FIRST step of the join handshake (next-state 2, then the login-start
  packet per the spec) and watch what the server sends back: the beginning of
  encryption negotiation. Then stop. That wall — real cryptography, right where the
  course's raw-bytes road ends for now — is worth seeing with your own eyes.
- Genuinely open: a "wealth map" — where the diamonds are, including inside chests —
  is technically reachable from region data. Whose chests, though? Is reading another
  player's chest contents from the files fair play, when they couldn't see yours
  in-game? There is no settled answer; deciding what data you should read, separate
  from what you can read, is a real question that working with data never stops
  asking.
- Genuinely open: your script can ping any server — but how would you DISCOVER
  Minecraft servers you don't already know about? There is no index. People have
  scanned the entire internet's address space for port 25565; projects have done it
  and published results, and server owners have strong feelings about it. Where is
  the line between checking a published address and knocking on every door on earth
  — and should you knock at all? Status is a public endpoint by design; scanning is
  a choice about how to treat other people's machines. No settled answer.

## Delivery notes

- **Sources:** merged from the former `world-data` and `server-list-ping` lessons
  (their folders retained for history; this core supersedes both). Arc order: files
  first, then wire — the files half is the gentler on-ramp (level 2 with hints) and
  the wire half is the capstone (level 3).
- **guided:** the VS Code gibberish moment is the emotional pivot of the files half —
  let the learner hit it before explaining NBT, but explain immediately after
  (orientation is not withheld; it is sequenced). Do not spoil the live-read break-it
  outcome (stale vs error) — it genuinely varies, and the honest framing is "measure
  and report."
- The wire half's temptation at level 3 is to sneak hints back in — resist. The
  orientation must carry the load: sockets, recv-partial-reads, packet shape, and
  the spec-skim assignment are all stated plainly and generously BEFORE the goals.
  The varint completion problem is the one relief valve.
- Keep the goal-11 prose flat; the JSON from a huge server IS the moment, and
  narrating the chills kills them.
- Never assert nbtlib's or anvil-parser's health in learner text; the evaluation
  against PyPI/GitHub is a required step, linked to `choosing-a-version`. Same for
  the spec's URL: the search-and-confirm is step zero of the wire half.
- Do not assert NBT field paths (especially the seed's nesting) — the learner finds
  them by scrolling the tree; the wiki `level.dat` page is the rung-3 pointer.
- Never name a specific public server as currently-big in learner text (volatile);
  "its address is on its website" is stable.
- Keep matplotlib surface minimal: three function names and a link to its docs. The
  unit-testing seed in goal 9 stays light — one sentence naming the practice.
- The map lands hardest when several people have joined the world; if only one
  player exists, the phrasing should still work (one labeled dot plus spawn is still
  a map). Never assume a household.
- Stuck-sentence clause: this lesson keeps the finding-the-docs clause (carried over
  from the world-data source) — both halves lean on real documentation.
- Merge cuts (recorded above in Arc): two predictions, the fields-out-of-order
  break-it, the Nether map and ping-a-list go-further items.
- Check at regeneration: all [verify] flags in Facts (spec home, ping/pong details,
  status-ignores-protocol-version, idle timeout, favicon format, usercache.json,
  NBT field paths, VS Code notice wording).
