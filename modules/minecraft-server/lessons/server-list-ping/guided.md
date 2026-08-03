# Speaking the protocol by hand

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

When you changed your server's message of the day, it appeared on the multiplayer
screen without anyone joining — and you were told why: the game pings every server
on the list, and each server answers with its name, message, and player count. A
tiny conversation between two programs. You were also told that one day you'd speak
that conversation yourself, byte by byte.

Today. No library — a raw socket and bytes you assemble by hand, following the same
protocol documentation that the authors of every Minecraft library and bot were
reading when they built the tools you've used. At the end, your script asks your own
server to describe itself and prints the answer — and then asks one of the biggest
public servers on the internet the same question, and gets the same kind of answer,
because your bytes are correct and correctness is the only membership card this
conversation checks.

Everything here is stuff you've already met from one side or another: ports,
protocol versions, JSON, talking to a server from Python. This session connects
them at the bottom, where it's all just bytes.

---

## Before you start

You need:

- **A server of your own that you can start and stop**, and comfort with the words
  client, server, localhost, and port. Established in
  [Running your own server](../running-your-own-server/guided.md). Quick check: your server
  is running and shows up on your multiplayer screen with the message you gave it in
  [The server is yours to change](../server-settings/guided.md).
- **The protocol-version idea** — clients announce a protocol version, and a
  mismatched join is refused before anything else happens. Established in
  [Choosing a version](../choosing-a-version/guided.md). Quick check: you can say in one
  sentence why community tools lag behind new Minecraft releases.
- **Python fluency** — writing scripts, loops, dictionaries, parsing JSON, and
  talking to a server program from code. Established across
  [Reading the logs](../reading-the-logs/guided.md), [RCON scripting](../rcon-scripting/guided.md),
  and [Reading the world itself](../world-data/guided.md). Quick check: you could write a
  script that loads a JSON file and prints one field of it without looking anything
  up.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. For connection mysteries, its layer-finding step is the one that pays fastest.

---

## What you'll have at the end

By the end of this session you will have:

- Read a real protocol specification — the actual document the tool authors read —
  and implemented a piece of it from the description alone
- A script that performs the Server List Ping with nothing but a socket: your own
  bytes out, a server's JSON self-description back
- Pointed that script at a major public server and received the same answer shape
  from a machine on the other side of the internet
- A measured, first-hand sense of what "protocols are exact" costs — from breaking
  yours three ways and reading what came back

---

## New tools

**A socket** is the operating system handing your program a two-way byte pipe to
another program, named by an address and a port. That's the whole definition. When
you joined your server, the game opened a socket to it. When your RCON script sent
commands, the library underneath opened a socket. Mineflayer: sockets. Web browsers:
sockets. Everything you have ever done between two programs sat on one of these
pipes; today you hold the pipe directly.

Python's `socket` module is in the standard library — nothing to install. Three
calls carry this whole session:

- `socket.create_connection((host, port), timeout=5)` — connect, get a socket back
- `sock.sendall(data)` — push bytes in
- `sock.recv(n)` — pull bytes out

One fact about `recv` that you could not guess and that has burned every person who
ever touched sockets: **`recv(n)` returns at most n bytes — whatever has arrived so
far, not what you asked for.** If you need an exact number of bytes, you loop until
you have them. Hold onto that; you'll see shortly that the protocol is designed
around it.

**The protocol documentation.** The Minecraft protocol is documented, in exact
byte-by-byte detail, by the community — this documentation is what every library
you've used was built from. It has lived at more than one address over the years
(its historical home was a site called wiki.vg), so step zero is finding its current
one: search for **Server List Ping** and confirm you've landed on the page that
specifies the ping packet by packet, with field tables. That page is your reference
for everything below.

**The shape of the conversation**, so the spec reads as confirmation rather than
mystery. After you connect, everything both sides say is **packets**, and every
packet has the same frame: a length, then a packet id, then the fields. Your side
sends two packets — a **handshake** (protocol version, the hostname you're
connecting to, the port, and a "next state" value where 1 means "I'm here for
status") and then an empty **status request**. The server sends back one packet
containing a string of JSON. Strings on the wire are a byte-length followed by that
many bytes of UTF-8 — the length prefix is what tells the reader when to stop, which
is exactly the problem `recv` just told you about.

The lengths and ids in all of the above are encoded as **varints**: a way of writing
integers that spends bytes only as needed — seven bits of the number per byte,
lowest bits first, with the high bit of each byte flagging "more bytes follow."
Small numbers cost one byte instead of four. The spec describes this precisely, and
implementing it is your first goal below.

Two small Python conveniences, given now so the spec is the only puzzle:
`struct.pack('>H', port)` produces the two-byte big-endian unsigned short the
handshake wants for the port, and calling `.hex()` on any bytes you've built lets
you eyeball them against the spec's tables.

Before writing any code: **skim the entire Server List Ping page.** Not studying —
skimming, top to bottom, once. See how big it actually is, notice the packet tables,
notice that it ends. You have read the surface of a config file and of a library's
event list; this is the same move on a real protocol spec, and it's the last new
kind of surface this module has to show you.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- You connect and send nothing at all. Who is supposed to speak first in this
  protocol — and how long will the other side wait for you? Guess in seconds.
- Estimate the total number of bytes your side has to send to get the JSON back.
- Will the server answer a program that isn't Minecraft at all? Does it have any
  way of knowing what's on your end of the pipe?
- The status reply includes the server's protocol version. Do you think the server
  cares what protocol version *you* claim when you're only asking for status? You
  have watched it care intensely about this for joins.

---

## The work

Four goals. Each has its success criteria; the assembling is yours.

### Goal 1 — Silence is data

Connect a raw socket to your own running server at `localhost:25565` and send
nothing. Watch what happens.

Done when you can answer, from observation: who closed the connection, and after
roughly how long? (`recv` returning empty bytes — `b''` — is how a socket tells you
the other side hung up. Measure the wait; `time.time()` before and after is
enough.)

What this establishes: connecting is not communicating. The server accepted the
pipe, then waited for you to speak first, then gave up on you. Every result in this
session, including nothing happening, is information.

### Goal 2 — Varints, tested alone

Implement two functions from the spec's description of varints: `write_varint(n)`
returning bytes, and `read_varint(sock)` reading one varint off a socket.

Then — before any socket touches them — test them by themselves. The spec's page
includes a table of example values with their exact encodings. Done when:

- `write_varint` reproduces every example in the table (compare with `.hex()`)
- feeding `write_varint`'s output back through your reader returns the original
  number, for every example (reading from bytes instead of a socket is fine for the
  test — or connect to your server and ignore what you receive)

Testing a piece by itself before trusting it inside the whole has a name — a unit
test — and this is the situation that justifies the habit: a wrong varint encoder
inside a full ping doesn't produce an error message. It produces silence, with
nothing pointing at which of your forty lines is wrong. Ten minutes of table
checking is the difference between debugging one function and debugging everything
at once.

<details>
<summary>If the encoder fights back</summary>

Attempt it from the spec first — the description is complete. If you're going in
circles, here is the encoder's skeleton with the load-bearing parts blanked. Each
blank is a small expression; the spec's description names every piece.

```python
def write_varint(n):
    out = b""
    while True:
        part = n & ____        # keep only the low 7 bits
        n = n >> ____          # drop the bits just taken
        if n != 0:
            out += bytes([part | ____])   # flag: more bytes follow
        else:
            out += bytes([part])
            return out
```

The reader is the same logic mirrored: take a byte, keep its low 7 bits, shift
them into place, and stop when the flag bit is clear.

</details>

### Goal 3 — The full ping, against your own server

Assemble the handshake and the status request per the spec, send them, read the
reply, and parse it.

Done when: your script prints your own server's status — the motd you wrote, the
version, the player count — parsed from JSON with the `json` module, formatted so a
person can read it. Two working practices, stated plainly because they are the
difference between debugging and despair:

- Before sending, print your assembled packets with `.hex()` and check them against
  the spec's field tables by eye, field by field.
- The reply's JSON string announces its own length. `recv` gives you what has
  arrived, not what was promised — loop until you hold every promised byte, then
  parse.

If the server answers with silence, that is goal 1's lesson pointing at you: some
byte of yours broke the agreement, and the server owes you nothing. Hex out, spec
open, field by field.

### Goal 4 — Across the internet

Point the same script at a big public server. Pick any famous one — the large
public servers publish their addresses on their own websites (the default port is
25565 when none is given).

Done when: the same JSON shape arrives from a machine you've never seen, run by
strangers, with — depending on the server — thousands of players online right now,
fetched by a script you wrote from a specification.

For the record: this request is exactly what the multiplayer screen sends to every
server on its list. Asking a server for its status is the intended, public way to
talk to it.

---

## Break it on purpose

All three against your own server. Each is one changed value or one swapped line;
change it back after. Predict the outcome before each one — the outcomes are yours
to measure, and one of them answers a prediction you already wrote down.

**Lie about the protocol version.** In the handshake, claim something absurd —
a protocol version no client has ever had. Send the status request as usual. Does
the reply still come? You watched the server refuse mismatched *joins* instantly in
[Choosing a version](../choosing-a-version/guided.md) — if status behaves differently,
articulate why it would have to. (Consider what the status reply is *for*, and who
has to be able to ask for it.)

**Wrong next state.** Send 2 instead of 1 as the handshake's next-state field, then
send your status request exactly as before. Read what comes back — an error, a
disconnect message, nothing? Whatever it is, here's what's happening: 2 means "I'm
here to log in," so the server is now interpreting your status-request bytes *as if
they were login packets*. Same bytes, different meaning, because the conversation is
in a different state. Protocols aren't just formats — they're agreements about where
you are in a conversation.

**Fields out of order.** Encode the handshake with two fields swapped — port before
address, say. Send it. Silence or disconnect, nothing self-correcting either way.
This is what "exact" costs: at this layer there is no benefit of the doubt, no
guessing what you meant. The spec isn't advice. It's the entire shared
understanding, and you just measured what's left without it.

---

## What just happened

Everything above the socket was always just bytes in agreed shapes. RCON — bytes in
an agreed shape, with a password field. Mineflayer — a very large pile of code
implementing thousands of pages of agreed shapes, so that you could write
`bot.chat()` instead of this. The web — bytes in an agreed shape called HTTP. A
library is someone who read the spec so you don't have to, and you have now been
that someone once. Every library you use from here on looks different: not magic,
just somebody's hours.

Look at the layering of what you built: varint encoding, inside packet framing,
inside JSON meaning. Now recall the world files: gzip compression, wrapping NBT
structure, wrapping meaning. Encoding, framing, meaning — two different stacks,
same picture. Once is a trick; twice is a pattern. Expect every format and every
protocol you meet from now on to come apart into layers like this, because they
all do.

And the details you fought with all exist for reasons you've now touched. Varints,
because small numbers are overwhelmingly common and spending four bytes on the
number 1 wastes three. Length prefixes, because a byte pipe has no boundaries —
`recv` taught you that — so every message must carry its own edges. And the
handshake's hostname field: notice that the name you typed travels to the server in
plaintext, readable by whatever machine answers. That is precisely how one machine
at one shared address can host or front many servers at once — it reads the
hostname out of each arriving handshake and routes the connection to the world that
name means. If you have ever used a hosting service or relay where many servers
share one address and wondered how it knew which world was yours: it read the
answer out of these exact bytes.

---

## Go further

- Ping a list of well-known servers — their addresses are on their websites — and
  print a table: name, players online, protocol version. Which is fullest right
  now?
- The status JSON often includes a `favicon` field: the little server icon,
  travelling as text. It's a PNG encoded in base64 — bytes disguised as text so
  they can ride inside JSON. Python's `base64` module will give you the bytes back
  (there's a prefix to strip first — look at the field's value and you'll see it).
  Turn a famous server's icon into an actual `.png` file on your disk.
- Implement the first step of *joining*: next-state 2, then the login-start packet
  as the spec describes it, and read what the server sends back — the opening move
  of encryption negotiation. Then stop there. That wall is real cryptography, and
  it's worth seeing exactly where it stands with your own eyes.
- Genuinely open: your script can ping any Minecraft server on earth — but how
  would you *discover* servers you don't already know about? There's no index.
  People have scanned the entire internet's address space for port 25565 — whole
  projects have done it and published the results, and server owners have strong
  feelings about being found that way. Asking a published address for status is the
  intended use; knocking on every door on earth is something else. Where's the
  line, and who gets to draw it? There is no settled answer.

---

## What you have now

- A script that pings any Minecraft server by address and prints its parsed status
  — the engine that a later dashboard can be built around
- `write_varint` and `read_varint`, implemented from a spec and tested standalone —
  and the tested-alone habit itself
- First-hand knowledge of what a protocol is, what a library is, and what exactness
  costs — measured, not asserted
- The layering lens: encoding, framing, meaning — now seen in two unrelated stacks
