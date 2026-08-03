# The first visitor

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** joining-over-lan
- **Part:** Part 2 — Letting people in
- **Scaffolding:** level 1 — first real networking lesson; reasoning shown throughout
- **Deliveries:** guided only (nothing here is setup-heavy enough for a reference
  audience; the whole lesson is one join)
- **Status:** ready

## Goal and payoff

A second person, on a second device, joins the learner's server across the home
network — the first time the server has ever had a visitor. Along the way the learner
meets the home network as a real thing: the router, the addresses it hands out, and
the difference between "myself" and "my machine as others see it." Payoff: another
human being is standing in the learner's world, and the learner watched the join
arrive in the server log.

## Prerequisites

- A server you can start, stop, and join — established by
  `lessons/running-your-own-server/`
- A second device on the same wifi that can run Minecraft: Java Edition, and ideally
  a second person to drive it (a housemate's computer, a sibling's laptop). One
  person with two machines also works; two people is better because the payoff is
  social.
- Helpful but not required: having changed server settings and met the
  `address:port` syntax — established by `lessons/server-settings/` (the
  move-the-front-door break-it). This core re-teaches the syntax briefly for cold
  readers.

## Establishes

- Someone on the same wifi can join the learner's server by its local address —
  cited by other cores as: "someone on your wifi can join your server — established
  by `lessons/joining-over-lan/`."
- The learner can find their Mac's local address on demand
- Words other lessons can use freely: router, local address (private address),
  DHCP (named once, lightly), timeout vs refused
- The standing question the next lesson answers: why the 192.168 number is
  unreachable from outside the house

## Facts

- `localhost` always means "the machine you typed it on." On the friend's device it
  points at the friend's device. It is a loopback name — traffic to it never leaves
  the machine.
- Every device on a home network has a **local address** (also called a private
  address), handed out by the **router**. The router is a computer whose whole job
  is passing messages between the devices in the house, and between them and the
  internet. The system it uses to hand out addresses is called **DHCP** — a device
  joins the network, asks for a number, and the router assigns one.
- Local addresses usually start with `192.168.`, sometimes `10.` or `172.` — four
  numbers separated by dots. These ranges are reserved for private networks; every
  house on earth reuses them. Internet routers refuse to carry them — which is
  exactly why they work as a preview of the next lesson's problem.
- Finding the Mac's local address [macos]:
  - Primary: System Settings → Wi-Fi → the **Details…** button next to the
    connected network → the IP address field. [verify — exact pane and label names
    shift between macOS versions; deliveries phrase it as "look for the IP
    address" rather than asserting the precise label]
  - Terminal alternative: `ipconfig getifaddr en0`. [verify — `en0` is usually the
    Wi-Fi interface on modern Mac laptops but interface naming varies; offer the
    Settings route as primary and this as the quick check]
- Join syntax from the second device: `<local address>:25565`. The game assumes
  `25565` when the port is omitted, so the bare address also works; teach the full
  form because the two halves (which machine, which door) are the point.
- macOS may show a firewall dialog the first time the server accepts connections
  from another machine — asking whether `java` may accept incoming network
  connections. This is the operating system checking before a program opens a door
  other machines can knock on. Allowing it is correct here: the program in question
  is the learner's own server. [macos] [verify — the dialog appears only when the
  Application Firewall is enabled, which is not the default on every Mac; deliveries
  say "may appear" and explain, never promise it]
- Client and server must speak the same protocol version: a mismatched join fails
  with an on-screen message naming which side is out of date. [verify exact wording
  — deliveries have the learner observe the message, never quote it. Ties to
  `lessons/choosing-a-version/`.]
- Failure signatures, the load-bearing pair of this lesson's break-it:
  - Right machine, wrong port → the machine answers "nothing is listening there"
    and the failure comes back **fast** (a refused connection).
  - Wrong machine (an address nobody owns) → nobody answers at all, the game waits,
    and the failure arrives **slow** (a timeout).
  - Deliveries must not assert the exact on-screen wording of either — client
    versions phrase it differently. The learner observes the difference in *speed
    and kind*, which is stable.
- The server logs every join and leave; the visit is visible from the server's side
  in the terminal.

## Arc

### Orientation — given plainly

`localhost` got the learner into their own server; this lesson explains why that
name can never work for anyone else — it means "myself," and on the friend's device
"myself" is the friend's device. The fix is the machine's real name on the home
network: a local address, handed out by the router. Router and DHCP are named here,
at the friction moment, one layer deep: the router is a computer whose job is
passing messages between devices, and part of that job is assigning each device a
number. The Settings path (and the terminal one-liner) for finding the Mac's
address is given plainly — it's a fact, not a puzzle. The firewall dialog is
explained before it can appear, so it reads as expected rather than alarming.
`address:port` is re-stated briefly with a link back to server-settings for anyone
who moved the front door there.

### Predictions to elicit

- The friend adds a server with the address `localhost` and tries to join. What
  happens, and why? (Have them actually run this one — it's cheap and the failure
  is the lesson.)
- Will the friend's game need to be the same version as your server? What do you
  think happens if it isn't? (Ties forward to `lessons/choosing-a-version/`.)
- How many devices do you think are on your home network right now? Write a
  number. (Paid off in Go Further via the router's device list.)

### The work — goals and hint ladders

1. **Watch `localhost` fail from the second device.** Predict first, then have the
   friend add a server at `localhost` and try it. Observe the failure. Then the
   explanation, given plainly (level 1, reasoning shown): `localhost` is a name
   every computer reserves for itself. The friend's game knocked on the friend's
   own machine, found no server, and gave up. To reach *your* machine, the friend
   needs the name the network knows it by.
2. **Find your Mac's number.** Orientation, not a puzzle: System Settings → Wi-Fi →
   details of the connected network → the IP address. Cross-check with
   `ipconfig getifaddr en0` in the terminal if desired — same number from two
   directions. Look at its shape: four numbers, dots, probably starting `192.168.`.
   That number was assigned by the router, and every other device in the house has
   one like it.
3. **Get the visitor in.** Goal: the friend joins your world from their device.
   Server running first; verify from your own game if in doubt.
   - Rung 1: the friend's Add Server screen wants an address. You now hold two
     numbers: which *machine* on the network, and — from the moment a server was
     started twice, or the front door was moved — which *door* on that machine the
     server listens at.
   - Rung 2: the syntax joins them with a colon: `address:port`, the same shape as
     `localhost:25570` from the settings lesson (`../server-settings/`). Which
     address, and which port, for this server?
   - Rung 3: `<your Mac's local address>:25565` — for example `192.168.1.23:25565`,
     with your actual number. If macOS asks whether `java` may accept incoming
     connections, that's the firewall question from the orientation — allow it.
4. **See it from the server's side.** The moment the friend is in, read the
   terminal: the server announced the arrival, exactly as it announced yours in
   `../running-your-own-server/` — except this time the client is across the room.
   Do something both screens can see: place a block, break a block, stand in front
   of each other. Two views of one world, held by the program in your terminal.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Close the world mid-visit.** With the friend standing in the world, type `stop`
  in the server terminal. Watch the friend's screen — what does the game show when
  the world it was standing in ceases to exist? Then have them try to rejoin while
  the server is still down, and notice how that failure comes back. Undo: start the
  server, friend rejoins. Teaches: the visitor's world lives entirely in your
  terminal window, and a stopped server refuses fast — the machine is still there
  to say no.
- **Knock on the wrong door.** Friend edits the server entry to port `25570`
  (nothing is listening there). Try to join. Observe how quickly the failure
  arrives and what kind of message it is. Undo: put `25565` back.
- **Knock on the wrong house.** Friend edits the address itself — change the last
  number to one no device likely owns, such as `.250`. Try to join. This failure
  behaves differently: notice what the game does *while* failing, and how long it
  takes. Undo: restore the real address.
- **The comparison is the lesson** (deliveries must draw it explicitly but not
  assert wording): wrong door fails fast, because a real machine answered "no
  program at that door." Wrong house fails slow, because nobody answered and the
  game waited until it gave up hope. Fast-no versus silence is a diagnostic pair
  the learner will use for the rest of their life: it separates "reachable but not
  listening" from "not reachable at all."

### What just happened — the explanation

The journey of one click, one layer deeper than needed: the friend's game wrapped
"I'd like to join" in a packet addressed to `192.168.x.x:25565`, the friend's
device radioed it to the router, the router — a computer doing its one job — read
the address and passed it to your Mac, and your Mac handed it to whichever program
was listening on door 25565: the server. Every block placed, every step taken, is
more packets on the same path, both directions, continuously. `localhost` never
left the machine; this conversation crosses the air in the house twice per message.

Then the cliffhanger, stated as fact: the `192.168` number only means something
*inside* the house. Those ranges are reserved for private networks; the same
numbers exist in millions of homes at once, so internet routers refuse to carry
them — there'd be no way to know whose `192.168.1.23` was meant. A friend outside
the house typing this address gets nowhere, or worse, some stranger's network. The
house has a different face it shows the internet — one address for the whole home —
and getting a visitor through *that* is the next lesson
(`../joining-from-outside/`).

### Go further — open questions

- Your router has an admin page listing every device it has given an address to.
  Find it (the router's label or its manual says how — router UIs vary, so the
  router's own docs are the source). How close was your device-count prediction,
  and what's on your network that you forgot existed?
- Does your Mac keep its number forever? What might cause the router to hand it a
  different one someday — and what would that break? Find out whether your router
  can be told to always give the Mac the same address.
- A phone with wifi off is not on the home network — it's on the cell network.
  With the server running, try joining from a phone on cellular data using the
  same `192.168` address. You already know enough to predict the failure mode —
  fast or slow?
- Genuinely open: when you visit `minecraft.wiki`, you type a *name*, not four
  numbers — yet the conversation still needs an address. Something, somewhere,
  translates names into numbers. What is it, who runs it, and what would happen if
  it lied?

## Delivery notes

- **guided:** the emotional peak is the join line appearing in the server log — a
  second human in a world the learner runs. Let that land before moving to
  break-it. If the second "person" is the learner on a second device, everything
  still works; phrase the two-person version as the better option, never as
  assumed.
- Never assert the exact wording of the timeout/refused/mismatch messages — speed
  and kind are the observables, wording varies by client version.
- The firewall paragraph must read as calm anticipation ("may appear, here is what
  it means"), not warning.
- Keep DHCP to exactly one layer: named, one sentence, done. The learner needs
  "router hands out numbers," not a protocol description.
