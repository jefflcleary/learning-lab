# Speaking the protocol by hand

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** server-list-ping
- **Part:** Part 5 — Data
- **Scaffolding:** level 3 — capstone of the networking thread. The learner has met
  every ingredient: ports and localhost (`running-your-own-server`), the ping promise
  (`server-settings`), protocol versions (`choosing-a-version`), a real protocol
  through a library (`rcon-scripting`, which pointed at sockets and at this lesson),
  Python fluency (`reading-the-logs`, `world-data`). Goals and success criteria only —
  with ONE sanctioned exception: a completion problem for the varint encoder, because
  varints are genuinely fiddly and a wrong encoder fails silently.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

The multiplayer screen's trick — server name, message, player count appearing without
joining — was explained in `server-settings` as "a tiny conversation," and the course
promised the learner would one day speak it by hand. Today. No library: a raw socket,
bytes assembled per the community protocol documentation, and the server answers with
JSON describing itself. Then the same script pointed at a big public server: the same
JSON shape arriving from a stranger's machine across the internet — the learner's own
bytes, speaking to real infrastructure.

This is the central-rule showcase: generous orientation (what a socket is, where the
spec lives, what the packet shape is conceptually), with the actual construction —
especially the varint encoder — withheld as the problem.

Payoff: a script that pings ANY Minecraft server on earth and reports who's home.
Genuinely useful on its own, and it is the engine of `whos-online-page`.

## Prerequisites

- A server you can start and stop on this machine, and the words client, server,
  localhost, port — established by `lessons/running-your-own-server/`
- The idea that the multiplayer screen pings servers and they answer — established by
  `lessons/server-settings/`
- The protocol-version concept (clients announce a protocol version; mismatched joins
  are refused) — established by `lessons/choosing-a-version/`
- Python fluency: scripts, loops, dicts, JSON — established by
  `lessons/reading-the-logs/` and `lessons/world-data/`; talking to a server program
  from Python (via a library) — established by `lessons/rcon-scripting/`

## Leaves behind

- A working `ping.py` (name flexible) that performs a Server List Ping against any
  host:port and prints the parsed status JSON
- The learner has read a real protocol specification and implemented part of it
  (varints) from the description alone, testing the piece standalone before trusting
  it in the whole
- First-hand experience that protocols are exact: field order, framing, and encoding
  all measured by breaking them
- Cited by other cores as: "you can ping any Minecraft server from Python and parse
  the status reply — established by `lessons/server-list-ping/`." (`whos-online-page`
  builds directly on this.)

## Facts

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
  code** — the read-the-surface exercise of this lesson is reading a real protocol
  spec.
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

The promise made in `server-settings` gets recalled: the multiplayer screen's
name/motd/player-count is a tiny conversation, and today the learner speaks it raw.

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
the years and finding its current address is step zero). Assignment before any code:
skim the ENTIRE Server List Ping page, no note-taking required — see the size of it,
notice the packet tables, notice it is finite.

**The shape of the conversation**, conceptually (packets, handshake fields, status
request, JSON reply, strings-as-length-plus-bytes, varints and why they exist) — all
given plainly per Facts. What is withheld: every line of code that implements it.

### Predictions to elicit

- You connect and send nothing. Who is supposed to speak first in this protocol —
  and how long will the other side wait for you? Guess in seconds; you'll measure.
- Estimate the total number of bytes your side must send to get the JSON back.
- Will the server answer a program that isn't Minecraft at all? Does it have any way
  to know?
- The status reply tells you the server's protocol version. Do you think the server
  cares what protocol version YOU claim, when you're only asking for status? (You
  watched it care very much about joins.)

### The work — goals and hint ladders

Level 3: goals and success criteria. No hint ladders except the sanctioned varint
completion problem.

1. **Silence is data.** Connect a raw socket to your own server (localhost:25565)
   and send nothing. Observe. Done when: the learner can say who hung up, and after
   roughly how long (measure it — `time.time()` around the wait, or count).
   Establishes: connecting is not communicating; this protocol is client-speaks-first.

2. **Varints, standalone.** Implement `write_varint` and `read_varint` from the
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

3. **The full ping, against your own server.** Handshake + status request down the
   socket; read the reply; parse the JSON with `json`; print it readably. Done when:
   the learner's own server describes itself — motd (recognizably the one they wrote
   in `server-settings`), version, player count — fetched by their own bytes.
   Success criteria in the delivery include a debugging affordance stated plainly as
   orientation, not hint: print your assembled packet as hex (`.hex()`) before
   sending and compare against the spec's field order by eye; and remember `recv`
   loops until the promised length has arrived.

4. **Across the internet.** Point the same script at a big public server — any
   famous one; its address is published on its own website. Done when: the same JSON
   shape arrives from a stranger's machine — thousands of players online, fetched by
   a script the learner wrote from a spec. This is the chills moment; the delivery
   should let the output speak and keep the prose flat. Note plainly: this is the
   same request the multiplayer screen makes to every server on the list — the
   intended, public interaction.

Then the origin-story passage (delivery: directly after goal 4, before break-it, or
inside what-just-happened — author's call at generation; currently rendered inside
What just happened): the hostname travels in the handshake in plaintext, which is
precisely how shared-address relays and proxies route connections — the machine in
front reads the hostname from the handshake and forwards you to the world you meant.

### Break it on purpose — failures to cause, what each teaches, how to undo

All against the learner's own expendable server; each is one edited value or one
swapped line, then put back. Outcomes deliberately not asserted — the learner
measures. [verify: all three outcomes below are describable ranges, not certainties;
keep deliveries outcome-neutral]

- **Lie about the protocol version in a status ping.** Claim something absurd.
  Does the status reply still come? Contrast with `choosing-a-version`, where
  mismatched joins were refused before anything else — is status more forgiving, and
  why would it have to be? (For the learner to articulate: status exists to be asked
  by clients of ANY version.)
- **Wrong next-state.** Send 2 (login) instead of 1 (status) in the handshake, then
  send the status request as before. What comes back — an error, a disconnect
  message, silence? The server is now interpreting the learner's status-request
  bytes as if they were login packets: same bytes, different meaning, because state
  changed. Teaches: protocols are state machines; meaning depends on where in the
  conversation you are.
- **Fields out of order.** Swap two handshake fields (e.g., encode port before
  address). Silence versus disconnect — either way, nothing self-corrects. Teaches
  what "exact" costs: there is no benefit-of-the-doubt at this layer; the spec is
  not advice, it is the entire shared understanding.

### What just happened — the explanation

Everything above the socket was always just bytes in agreed shapes. RCON: bytes in
an agreed shape (with a password field). Mineflayer: someone's very large Python—no,
JavaScript—implementation of thousands of pages of agreed shapes. HTTP, when the
learner meets it: bytes in an agreed shape. A library is someone who read the spec
so you don't have to — and the learner has now been that someone once, which
permanently changes what a library looks like from the outside.

The layering, drawn as the same diagram as `world-data`: there it was gzip wrapping
NBT wrapping meaning; here it is varint encoding inside packet framing inside JSON
meaning. Encoding, framing, meaning — two different stacks, one idea. Once is a
trick; twice is a pattern; the learner should now expect every format and protocol
they ever meet to decompose this way.

Why varints exist (small numbers are overwhelmingly common; spending 4 bytes on the
number 1 wastes most of them); why length-prefixing exists (a byte pipe has no
boundaries — `recv` proved that — so messages must carry their own edges); why the
handshake carries the hostname (routing at shared addresses — the origin-story
passage lands here if not placed after goal 4).

### Go further — open questions

- Ping a LIST of well-known servers and tabulate: name, players online, protocol
  version. (Their addresses are on their websites.) Which is fullest right now?
- The JSON often includes `favicon` — the little server icon, as text. It is
  base64-encoded PNG (base64: bytes disguised as text so they can ride inside JSON —
  the learner has now seen the reverse of "text disguised as bytes"). Decode it and
  write an actual `.png` file. Python's `base64` module; note the data-URI prefix
  needs stripping. [verify field format]
- Implement the FIRST step of the join handshake (next-state 2, then the login-start
  packet per the spec) and watch what the server sends back: the beginning of
  encryption negotiation. Then stop. That wall — real cryptography, right where the
  course's raw-bytes road ends for now — is worth seeing with your own eyes.
- Genuinely open: your script can ping any server — but how would you DISCOVER
  Minecraft servers you don't already know about? There is no index. People have
  scanned the entire internet's address space for port 25565; projects have done it
  and published results, and server owners have strong feelings about it. Where is
  the line between checking a published address and knocking on every door on earth
  — and should you knock at all? Status is a public endpoint by design; scanning is
  a choice about how to treat other people's machines. No settled answer.

## Delivery notes

- **guided:** the temptation at level 3 is to sneak hints back in — resist. The
  orientation section must carry the load instead: sockets, recv-partial-reads,
  packet shape, and the spec-skim assignment are all stated plainly and generously
  BEFORE the goals. If a reader with all of that still cannot assemble the ping,
  the varint completion problem is the one relief valve.
- Keep the goal-4 prose flat; the JSON from a huge server IS the moment, and
  narrating the chills kills them.
- Never name a specific public server as currently-big in learner text (volatile);
  "its address is on its website" is stable.
- Never assert the spec's URL; the search-and-confirm is step zero and deliberately
  mirrors `choosing-a-version`'s source-finding.
- The unit-testing seed in goal 2 should stay light — one sentence naming the
  practice, no methodology lecture.
- Check at regeneration: [verify] flags in Facts (spec home, ping/pong details,
  status-ignores-protocol-version, idle timeout, favicon format).
