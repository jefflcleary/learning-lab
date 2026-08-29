# Letting friends join your server

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** letting-friends-join
- **Module / Part:** minecraft-server — Part 2 — Letting people in
- **Scaffolding:** level 1 opening into level 2 — the module's first networking
  material. Reasoning is shown throughout the same-wifi stage (first exposure);
  the internet and guest-list stages run goals-plus-hints, concepts named but not
  applied.
- **Deliveries:** guided + reference. The reference exists so an adult can execute
  the whole open-the-door-safely procedure (LAN address, route setup, whitelist)
  in one pass while the learner's session stays the join itself.
- **Status:** ready
- **Merged from:** `joining-over-lan`, `joining-from-outside`, and
  `locking-the-door` — one arc: same wifi → the internet → the guest list. The
  old "192.168 means nothing outside the house" cliffhanger and the "whitelist
  the same day" obligation are now internal transitions.

## Goal and payoff

Three visitors, each harder-won than the last. First a person on the home wifi
joins by the Mac's local address — the server's first-ever visitor, and the
learner's first meeting with the router and the addresses it hands out. Then a
friend in another house joins over the internet — the part's milestone, reached
by understanding NAT and choosing one of three honest routes (overlay, tunnel,
or forwarded port). Then the door gets a guest list: whitelist on, online-mode
understood, a non-listed account observed to bounce — and the pair of ideas
under half of computer security (authentication, authorization) named from
lived experience. Payoff: friends outside the house play in the learner's world,
through a route the learner built, past a lock the learner proved works.

## Prerequisites

- A server you can start, stop, and join — established by
  `lessons/running-your-own-server/`
- A second device on the same wifi that can run Minecraft: Java Edition, and
  ideally a second person to drive it. One person with two machines works; two
  people is better because the payoff is social.
- A friend outside the house with Minecraft: Java Edition matching the server's
  version, reachable by message while the learner works — the milestone test is
  a real human joining. (Version choice: `lessons/choosing-a-version/`.)
- For the port-forwarding route only: access to the home router's admin page (in
  practice whoever runs the home network may need to be involved — phrase as
  fact, not assumed household).
- Players' exact account names, spelled precisely, for the guest-list stage —
  and ideally a willing volunteer for the bounce test.
- Helpful but not required: having changed server settings and met the
  `address:port` syntax — established by `lessons/server-settings-and-console/`.
  This core re-teaches the syntax briefly for cold readers.

## Establishes

- Someone on the learner's wifi can join the server by its local address, and
  the learner can find the Mac's local address on demand — cited by other cores
  as: "someone on your wifi can join your server — established by
  `lessons/letting-friends-join/`."
- People outside the house can join via one working route (overlay, tunnel, or
  forwarded port), and the learner knows which route it is and what it depends
  on — cited by other cores as: "people can reach your server from outside your
  home network — established by `lessons/letting-friends-join/`."
- The whitelist is on, `online-mode` is on, real friends are listed, and a
  non-listed account has been *observed* to bounce — cited by other cores as:
  "your server has a whitelist and you know how to add and remove people —
  established by `lessons/letting-friends-join/`."
- The standing rule later arcs rely on: `online-mode=true` on any server
  strangers can reach; a server with it off never gets exposed to the internet.
- Words other lessons can use freely: router, local address, DHCP (lightly),
  public address, NAT, tunnel/relay, overlay network, port forwarding, timeout
  vs refused, authentication, authorization.

## Facts

### Same wifi

- `localhost` always means "the machine you typed it on." On the friend's device
  it points at the friend's device. It is a loopback name — traffic to it never
  leaves the machine.
- Every device on a home network has a **local address** (private address),
  handed out by the **router** — a computer whose whole job is passing messages
  between the devices in the house, and between them and the internet. The
  assignment system is **DHCP**: a device joins, asks for a number, the router
  assigns one. Keep DHCP to one layer: named, one sentence, done.
- Local addresses usually start `192.168.`, sometimes `10.` or `172.` — four
  numbers separated by dots. These ranges are reserved for private networks;
  every house on earth reuses them, so internet routers refuse to carry them.
- Finding the Mac's local address [macos]:
  - Primary: System Settings → Wi-Fi → the **Details…** button next to the
    connected network → the IP address field. [verify — exact pane and label
    names shift between macOS versions; deliveries phrase it as "look for the
    IP address" rather than asserting the precise label]
  - Terminal alternative: `ipconfig getifaddr en0`. [verify — `en0` is usually
    the Wi-Fi interface on modern Mac laptops but interface naming varies;
    Settings route is primary]
- Join syntax from the second device: `<local address>:25565`. The game assumes
  `25565` when the port is omitted; teach the full form because the two halves
  (which machine, which door) are the point.
- macOS may show a firewall dialog the first time the server accepts a
  connection from another machine — asking whether `java` may accept incoming
  network connections. Allowing it is correct: the program is the learner's own
  server. [macos] [verify — dialog appears only when the Application Firewall is
  enabled, which is not the default on every Mac; deliveries say "may appear"]
- Client and server must speak the same protocol version: a mismatched join
  fails with an on-screen message naming which side is out of date. [verify
  exact wording — deliveries have the learner observe the message, never quote
  it. Ties to `lessons/choosing-a-version/`.]
- Failure signatures, the load-bearing diagnostic pair:
  - Right machine, wrong port → a real machine answers "nothing is listening
    there" and the failure comes back **fast** (refused).
  - Wrong machine (an address nobody owns) → nobody answers, the game waits,
    the failure arrives **slow** (timeout).
  - Deliveries must not assert exact on-screen wording of either — the learner
    observes the difference in *speed and kind*, which is stable.
- The server logs every join and leave; visits are visible from the server's
  side in the terminal.

### The internet

- The house has **one public address**, assigned by the internet provider,
  shared by every device in it. Any "what is my IP address" page shows it; every
  device in the house shows the *same* public number while each shows a
  *different* local number — a cheap comparison that is the stage's opening
  experiment.
- **NAT** (network address translation): the router shares the one public
  address. For outbound conversations it keeps a table — which device started
  talking to whom — so replies find their way back. An unsolicited inbound
  connection matches nothing in the table, so the router drops it. Not a wall
  built for Minecraft's sake; the arithmetic of one address shared by many
  machines.
- The public address can change over time — providers reassign them. [verify —
  provider-dependent; some homes hold one for months] This is what dynamic DNS
  exists for (route c).
- Minecraft connections are TCP; a forwarded port must forward TCP 25565 (or
  the chosen port). [verify]
- **Route a — Tailscale.** Overlay network: software on both ends creates a
  private network carried over encrypted connections. Each enrolled device gets
  a stable private address that works from anywhere; the friend gets access via
  invite/sharing. Nothing is exposed to the internet at large. Cost: friends
  must install something and hold an account. Setup flow, sharing mechanics,
  free-tier shape: [volatile as of 2026-07] — point at tailscale.com's docs,
  never assert steps.
- **Route b — playit.gg.** Tunnel service: an agent on the server machine dials
  *out* to the service's relay; the relay hands out a public address/hostname
  anyone can join; traffic flows friend → relay → tunnel → server. Friends
  install nothing. Cost: the path depends on a third party's relay (uptime,
  terms) and game traffic transits their machines. Signup, agent install,
  address format: [volatile as of 2026-07] — point at playit.gg's docs.
- **Route c — port forwarding + dynamic DNS.** Tell the router "inbound on port
  25565 goes to the Mac." Requirements deliveries must state: (1) the Mac's
  local address must stop changing — routers can reserve a fixed address (often
  called DHCP reservation or static lease [verify — naming varies by router]);
  (2) friends need the *public* address, and since it can change, a dynamic DNS
  service maps a stable name to it (several free ones exist [volatile as of
  2026-07 — point at the chosen service's docs, name none as permanent]).
  Router admin UIs vary completely by model — the router's own manual is the
  only honest source; deliveries must not describe a UI. Cost: the port is open
  to the entire internet.
- Safety facts, stated calmly: automated scanning of the whole internet is
  constant background traffic; an open Minecraft port will eventually be found
  by strangers regardless of whether the address is shared. The mitigation is
  the guest-list stage of this same lesson, done before the session ends for
  routes b and c. Route a does not expose the server to strangers, but the
  whitelist still applies as hygiene.
- Testing gotcha [verify — router-dependent]: testing a forwarded port from
  *inside* the house (joining your own public address from the LAN) fails on
  many routers. The honest test is from outside — the friend, or a phone on
  cellular data.
- The local-address route keeps working inside the house no matter which route
  is chosen; the routes are additions, not replacements.

### The guest list

- The whitelist is the server's guest list: when it's on, only listed account
  names can join. Controlled by:
  - `white-list=true` in `server.properties` [verify exact key name — point at
    the minecraft.wiki `server.properties` page rather than asserting]
  - Console commands: `/whitelist on`, `/whitelist off`, `/whitelist add
    <name>`, `/whitelist remove <name>`, `/whitelist list`, `/whitelist reload`
    [verify exact subcommands — point at the wiki's commands page]
  - The list lives in `whitelist.json` in the server folder — readable, like
    everything else in there.
- `enforce-whitelist` in `server.properties` [verify]: affects *when* removal
  bites — whether non-listed players already online get kicked, or only blocked
  at next join. Exact behavior is a break-it: observed, not told.
- Operators: `/op <name>` grants server-admin power; recorded in `ops.json`.
  Ops have levels (`op-permission-level` setting [verify]) — the wiki documents
  what each allows. House rule stated plainly: guests don't get op. The
  whitelist decides who may *enter*; op decides who may *govern*.
- Whether ops bypass the whitelist is deliberately not asserted — it's a
  break-it experiment. [verify — historically vanilla ops can join a
  whitelisted server without being listed; do not spoil in deliveries]
- `online-mode=true` (the default, met by name in
  `lessons/server-settings-and-console/` and deliberately left alone there): on
  every join the server checks the joining account against Mojang's account
  system — proof the joiner owns that name. With it on, names can't be faked,
  which is what makes a list of names worth anything. With it off, anyone can
  claim any name — including a listed one — and the whitelist becomes
  decoration.
- Consequence, a standing rule: keep `online-mode=true` on any server strangers
  can reach. A later part of the module sets up a separate practice server that
  turns the check off (bots connect that way) — that server must never be
  exposed to the internet. [core note: connects forward to
  `lessons/writing-your-first-bot/`, which states `online-mode=false` as a
  sandbox condition; learner-facing text states the rule without naming the
  lesson]
- The refusal a non-listed player sees is observed, not quoted. [verify —
  wording varies by version]
- Whitelist changes via console commands apply live — no restart (unlike
  `server.properties` edits). Maps onto the memory-vs-disk story from
  `lessons/server-settings-and-console/`.

## Arc

### Orientation — given plainly

Three stages, one arc: the person across the room, the friend across town, the
guest list that makes the open door safe.

Stage 1: `localhost` got the learner into their own server; it can never work
for anyone else because it means "myself," and on the friend's device "myself"
is the friend's device. The fix is the machine's real name on the home network —
a local address, handed out by the router. Router and DHCP named at the friction
moment, one layer deep. The Settings path (and terminal one-liner) for the Mac's
address is given plainly. The firewall dialog is explained before it can appear.
`address:port` re-stated briefly with a link back to
`../server-settings-and-console/` for anyone who moved the front door there.

Transition (old cliffhanger, now internal): the `192.168` number only means
something inside the house — reserved ranges, reused in millions of homes,
refused by internet routers. The house shows the internet one address for the
whole home.

Stage 2: the two-address reality demonstrated, not asserted (the what-is-my-IP
comparison), NAT named and explained plainly. Then the three routes, each
described honestly — what it is, what it costs, what it depends on: overlay
(both ends install, nothing public), tunnel (server-side agent, public relay
address, friends install nothing), forwarded port (router config, fully public,
nothing installed anywhere). The choice is the learner's, driven by real
constraints; there is no secretly-correct answer. All service specifics are
volatile: deliveries point at each service's current docs and the router's
manual.

Transition (old same-day obligation, now internal): if the chosen route gives
strangers a path, the door needs its guest list before the session ends — the
internet is continuously scanned, an open door will be found. Factual, calm,
then straight into stage 3.

Stage 3: the whitelist explained as a guest list, console commands and the
`server.properties` key both named, the wiki given as the authoritative source
for exact syntax — reading a reference for exact names is an established move.
`online-mode` finally explained properly. Ops revisited one layer deeper:
entering vs governing, `ops.json`, don't op guests.

### Predictions to elicit

- The second device adds a server with the address `localhost` and tries to
  join. What happens, and why? (Have them actually run this one — the failure
  is the lesson.)
- Two different devices in the house each ask a "what is my IP" page. Same
  number or different?
- A phone on cellular data (wifi off) tries the `192.168` local address. Does
  the failure come back quickly, or does the game hang and wait?
- Before reading the three routes' descriptions: which do you *expect* to
  pick — and after choosing for real, did the constraints change your mind?
- You're op. You remove *yourself* from the whitelist while it's on. Can you
  still join?
- A friend is online at the moment you remove them from the list. Kicked on the
  spot, or fine until they next try to join?

### The work — goals and hint ladders

**Stage 1 — someone on your wifi (level 1, reasoning shown):**

1. **Watch `localhost` fail from the second device.** Predict first, then run
   it. Then the explanation, given plainly: `localhost` is a name every
   computer reserves for itself; the friend's game knocked on the friend's own
   machine, found no server, gave up. The learner's server never heard a thing
   (check the log for proof).
2. **Find your Mac's number.** Orientation, not a puzzle: System Settings →
   Wi-Fi → details of the connected network → the IP address; cross-check with
   `ipconfig getifaddr en0`. Look at its shape — four numbers, dots, probably
   `192.168.` — assigned by the router, like every device in the house.
3. **Get the visitor in.** Goal: the friend joins from their device. Server
   running first.
   - Rung 1: the Add Server screen wants an address. You hold two numbers:
     which *machine*, and which *door* the server listens at.
   - Rung 2: the syntax joins them with a colon: `address:port`, the same
     shape as `localhost:25570` from the settings lesson
     (`../server-settings-and-console/`). Which address, which port?
   - Rung 3: `<your Mac's local address>:25565` — with your actual number. If
     macOS asks whether `java` may accept incoming connections, that's the
     firewall question from the orientation — allow it.
   - Version-mismatch note lands here if the two games differ: the refusal
     names which side is behind (`../choosing-a-version/`).
4. **See it from the server's side.** Read the terminal the moment the friend
   is in: the same arrival announcement as the learner's own first join, except
   the client is across the room. Do something both screens can see. Let the
   moment land, then the transition: that address means nothing outside the
   house.

**Stage 2 — the internet (level 2, goals plus hints):**

5. **See the two addresses.** Compare the Mac's local address with a
   what-is-my-IP page; run the same page on a second device. Different local
   numbers, same public number — the whole NAT story in one observation.
6. **Prove the outside failure.** A phone on cellular data is an outside tester
   in your hand. Try the local address from it; check the prediction. Note the
   *kind* of failure — it gets dissected in break-it.
7. **Choose your route.** Constraints written down, choice said out loud with
   reasons: can friends install software? router access? tolerance for a
   third-party relay? Honest table, learner decides.
8. **Execute the route.** Goal: the friend, in another house, standing in the
   world. All specifics from the service's current docs; hints are per-route
   snags, not procedures:
   - Rung 1 (all routes): the friend's Add Server address is *given to you by
     the route* — overlay address, tunnel's issued address, or dynamic-DNS
     name. Never the `192.168` number; for the tunnel, not even your public
     address.
   - Rung 2 (route-specific snags): Tailscale — both machines enrolled, friend
     granted access, the joinable address is the server machine's overlay
     address. playit.gg — the agent must be running whenever anyone wants to
     join; it is server infrastructure now. Port forwarding — reserve the
     Mac's local address first so it can't drift, forward TCP 25565, test from
     *outside* the network.
   - Rung 3: use each service's own "verify it's working" check before burning
     the friend's patience, and read the server log while the friend attempts:
     a join that reaches the server at all leaves a line — the split between
     route problem and server problem.
9. **The milestone.** Someone outside the house, in a world the learner runs —
   the module's promise delivered. If anything custom exists (a recipe from
   `../building-datapacks/`, conditional "if you've been down that road"), have
   the friend use it — an audience is what custom things are for. Then the
   transition, plainly: if the route is tunnel or forwarded port, strangers
   have a path too; the guest list happens now, before the session ends.

**Stage 3 — the guest list (level 2):**

10. **Turn the guest list on and load it.** Goal: whitelist on, every real
    player listed, verified with `/whitelist list`. Exact syntax from the
    wiki's commands page.
    - Rung 1: two ways exist — a `server.properties` key and a console
      command. One needs a restart and one doesn't; you know why from the
      memory-vs-disk story (`../server-settings-and-console/`).
    - Rung 2: the console route: `/whitelist on`, `/whitelist add` per person,
      `/whitelist list` to verify. Names must match exactly — past join lines
      in the log are a reliable source of spelling.
11. **Prove the bounce.** Watch a non-listed account fail from both sides —
    joiner's screen and server log. Alt account, or temporarily remove the
    willing volunteer; restore after. An access control never seen to refuse
    anyone is a hope, not a lock.
12. **Read the list itself.** Find where the whitelist lives in the server
    folder and open it — `whitelist.json`, a new shape of settings file (JSON)
    noticed in passing, not taught. Open `ops.json` while nearby: the
    govern-list, same idea, shorter — and it should stay shorter.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Wrong door, wrong house.** From the second device on the wifi: edit the
  server entry's port to `25570` (nothing listening) and try; then restore the
  port and change the address's last number to one no device likely owns
  (`.250`) and try. Undo: restore both. The comparison is the lesson
  (deliveries draw it explicitly, never assert wording): wrong door fails
  **fast** — a real machine answered "no program at that door"; wrong house
  fails **slow** — nobody answered and the game waited until it gave up. Fast-no
  versus silence separates "reachable but not listening" from "not reachable at
  all" — a diagnostic pair for life, and the explanation of the cellular-phone
  test from the work.
- **Turn the route off mid-visit.** With the friend in the world, disable the
  route: pause/quit Tailscale, stop the tunnel agent, or disable the forwarding
  rule. Watch the friend drop; read the log — a disconnect recorded, server
  otherwise perfectly healthy. While the route is off, have the friend attempt
  a join and watch the log: nothing appears. A failed join that leaves no
  server-side trace *never reached the server* — the problem is in the path.
  Undo: re-enable, friend rejoins. Teaches: the path is infrastructure now —
  server, route, and client each fail independently, and the log glance says
  which to suspect.
- **Lock yourself out — maybe.** While op, `/whitelist remove` yourself,
  disconnect, try to rejoin. Predicted first. Whatever happens is a measured
  fact about how op and whitelist interact. Undo: add yourself back — the
  console works regardless; it's on the server, not in the game.
- **Removal timing.** With a willing volunteer online, remove them and watch:
  kicked now, or fine until next join? Then find `enforce-whitelist` on the
  wiki's `server.properties` page, reconcile observation with documentation,
  try flipping it. Undo: re-add the volunteer, apologize with something
  in-game. Both whitelist experiments answer "when does the lock actually
  bite?" — the difference between a rule existing and a rule being enforced.

### What just happened — the explanation

One click, the whole way: the friend's game wraps "I'd like to join" in a
packet addressed to `<address>:25565`; the device radios it to the router; the
router reads the address and passes it on; the destination machine hands it to
whichever program listens on door 25565. Inside the house that's one hop across
the air. Across the internet it's the same job repeated: home router to
provider's router to bigger ones, hop by hop, each reading the destination and
passing the packet one step closer — routers all the way down. Addresses at
that scale must be unique, which private ranges aren't — hence one public
address per home, and NAT sharing it via its table of outbound conversations.

Why each route works, one layer deep: the **overlay** works because both
machines dial *out* (outbound always works — NAT's table exists for it), then
carry a private network over encrypted connections between enrolled machines.
The **tunnel** works the same way: the server dials out to the relay and keeps
the pipe open; friends connect to the relay, which pours their traffic down the
already-open pipe. **Port forwarding** is the direct approach: a standing
instruction adding a table entry by decree — a door cut in the wall, which is
why it needs the guest list most urgently.

And the guest list itself: two different questions got answered on every join,
and they have names. *Who are you?* — answered by `online-mode` checking the
account against Mojang's records: **authentication**, identity verified. *What
are you allowed?* — answered by the whitelist (may you enter?) and the ops list
(may you govern?): **authorization**, permissions granted. The order matters:
authorization is only as strong as the authentication under it, because
permissions granted to a name mean nothing if names can be faked — a guest list
is worthless at a door where nobody checks faces. That is why `online-mode`
stays on for any server strangers can reach, and why a practice server that
turns the check off (for good reasons, later) never gets exposed to the
internet. Nearly every login screen and "you don't have access" message in
computing is one of these two questions.

### Go further — open questions

- Your router's admin page lists every device it has handed an address to
  (the router's label or manual says how — router docs are the source). What's
  on your network that you forgot existed?
- `traceroute` (e.g. `traceroute minecraft.wiki`) tries to list every router
  between you and a destination. How many hops? Do any names hint where the
  packet went geographically? And the genuinely open half: a packet crossing
  fifteen routers owned by a dozen companies arrives in milliseconds with no
  one in charge of the whole path — how do the routers know which way, and who
  decides the new path when a cable is cut?
- Log your public address today and check it over the coming weeks. Does it
  change? What did your dynamic-DNS name (if you made one) do about it?
- Big public servers have addresses that never change and no home router in
  sight. What is "hosting," physically? (Foreshadows `../always-on/` without
  requiring it.)
- There's also `/ban` and a banned-players file. A ban list says "everyone
  except these"; a whitelist says "no one except these." When is each the
  right tool, and what do big public servers use?
- Account names can be changed by their owners. Does your whitelist entry
  follow a renamed friend or break? `whitelist.json` holds a clue about what's
  *really* stored.
- Genuinely open: when you visit `minecraft.wiki` you type a *name*, not four
  numbers — something translates names into numbers. What is it, who runs it,
  and what would happen if it lied?
- Genuinely open: your whitelist works because Mojang's account system vouches
  for names. What would access control look like that depends on *no* company
  vouching for identities? People have tried for decades — what exists, and why
  hasn't any of it won?

## Delivery notes

- Merged from `joining-over-lan` (LAN stage), `joining-from-outside` (internet
  stage, incl. its reference delivery), `locking-the-door` (guest-list stage).
- **guided:** two emotional peaks, in order — the first join line in the log (a
  second human in a world the learner runs; let it land before moving on), and
  the milestone (someone outside the house; state it plainly, once, no
  cheerleading). The route choice must read as a real fork with three honest
  options — no steering. Safety framing exactly two beats: risk stated,
  mitigation is the next stage of this same lesson, move on. The bounce test is
  the guest-list stage's observable payoff — watch it refuse from both sides.
  If the second "person" is the learner on a second device, everything works;
  phrase two people as the better option, never as assumed.
- Never assert: timeout/refused/mismatch/refusal wording (speed and kind are
  the observables); service signup flows, UI labels, pricing; router screens;
  exact whitelist key/subcommand names (point at the wiki). All tagged above.
- The firewall paragraph reads as calm anticipation, not warning. DHCP stays at
  one layer. Don't spoil either whitelist break-it outcome (op-bypass,
  removal-timing). The online-mode-off rule appears without naming the bot
  lessons. The datapack mention is conditional with the link
  (`../building-datapacks/`), since arrival order isn't guaranteed.
- **reference:** the full open-the-door-safely procedure on one page: find the
  Mac's local address and LAN join line, the route decision table, per-route
  gotchas (DHCP reservation before forwarding; test from outside; agent/overlay
  must be running; whitelist same day for public routes), the whitelist
  essentials (commands per wiki, online-mode stays true, don't op guests), and
  the what-you-have-now list. Points at each service's docs — the reference
  asserts no service UI either.
