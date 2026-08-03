# Opening the door to the internet

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** joining-from-outside
- **Part:** Part 2 — Letting people in
- **Scaffolding:** level 2 — second networking lesson; goals plus hints, concepts
  named but not applied
- **Deliveries:** guided + reference (an adult may execute the route setup so the
  learner's session is the join, not the plumbing)
- **Status:** ready

## Goal and payoff

A friend outside the house joins the learner's server. This is the part's
milestone — and if the learner has built anything custom (a datapack), it's the
moment a real outside audience uses it. The technical substance: private vs public
addresses, NAT as the reason inbound strangers can't reach the house, and three
honest routes through — an overlay network (Tailscale), a tunnel service
(playit.gg), or port forwarding with dynamic DNS. The learner chooses one route
based on their real constraints and executes it against the service's own current
documentation. Payoff: someone in another house is standing in the learner's world.

## Prerequisites

- Someone on your wifi can join your server — established by
  `lessons/joining-over-lan/` (which itself assumes a startable server from
  `lessons/running-your-own-server/`)
- A friend outside the house with Minecraft: Java Edition, matching the server's
  version, reachable by message while you work — the test at the end is a real
  human joining
- For the port-forwarding route only: access to the router's admin page (in
  practice, a parent or whoever runs the home network may need to be involved —
  phrase as fact, not assumed household)

## Leaves behind

- People outside the house can join the learner's server via one working route
  (overlay, tunnel, or forwarded port), and the learner knows which route it is
  and what it depends on
- Cited by other cores as: "people can reach your server from outside your home
  network — established by `lessons/joining-from-outside/`."
- The standing obligation the next lesson discharges: any route reachable by
  strangers needs the whitelist, same day (`lessons/locking-the-door/`)
- Concepts other lessons can use freely: public address, NAT, tunnel/relay,
  overlay network, port forwarding

## Facts

- The house has **one public address**, assigned by the internet provider, shared
  by every device in it. Any "what is my IP address" page shows it; every device
  in the house shows the *same* public number, while each shows a *different*
  local number. This comparison is cheap and is the lesson's opening experiment.
- **NAT** (network address translation), named plainly: the router shares the one
  public address among all devices. For outbound conversations it keeps a table —
  which device started talking to whom — so replies find their way back. An
  unsolicited inbound connection matches nothing in the table, so the router has
  no idea who it's for, and drops it. This is why the server is unreachable from
  outside by default: not a wall someone built for Minecraft's sake, but the
  arithmetic of one address shared by many machines.
- The public address can change over time — internet providers reassign them.
  [verify — provider-dependent; some homes hold one address for months] This is
  what dynamic DNS exists for (route c).
- Minecraft connections are TCP; a forwarded port must forward TCP 25565 (or the
  chosen port). [verify]
- **Route a — Tailscale.** An overlay network: software installed on both ends
  creates a private network carried over encrypted connections across the
  internet. Each enrolled device gets a stable private address that works from
  anywhere. The server machine and each friend's machine install it; the friend
  gets access to the learner's network via invite/sharing. Nothing is exposed to
  the internet at large — only enrolled machines can even see the server. Cost:
  friends must install something and hold an account. Setup flow, sharing
  mechanics, and free-tier shape: [volatile as of 2026-07] — deliveries point at
  tailscale.com's own docs and never assert steps.
- **Route b — playit.gg.** A tunnel service: an agent program runs on the server
  machine and dials *out* to the service's relay; the relay hands out a public
  address/hostname that anyone can join; traffic flows friend → relay → tunnel →
  server. Friends install nothing. Cost: the path depends on a third-party
  company's relay (their uptime, their terms), and the game traffic transits
  their machines. Signup, agent install, and address format: [volatile as of
  2026-07] — point at playit.gg's own docs.
- **Route c — port forwarding + dynamic DNS.** The traditional way: tell the
  router "inbound connections on port 25565, hand them to the Mac." Requirements
  that deliveries must state: (1) the Mac's local address must stop changing —
  routers can reserve a fixed address for a device (often called DHCP reservation
  or static lease [verify — naming varies by router]); (2) friends need the
  *public* address, and since it can change, a dynamic DNS service maps a stable
  name to the current address (several free ones exist [volatile as of 2026-07 —
  point at the chosen service's docs, name none as permanent]). Router admin UIs
  vary completely by model — the router's own manual/docs are the only honest
  source; deliveries must not describe a UI. Cost: the port is open to the entire
  internet, not just friends.
- Safety facts, stated calmly: automated scanning of the whole internet is
  constant background traffic; an open Minecraft port will eventually be found by
  strangers regardless of whether the address is shared. The mitigation is
  access control: `lessons/locking-the-door/` (whitelist, online-mode on), to be
  done the same day as opening route b or c. Route a (overlay) does not expose
  the server to strangers, but the whitelist lesson still applies as hygiene.
- Testing gotcha [verify — router-dependent]: testing a forwarded port from
  *inside* the house (joining your own public address from the LAN) fails on
  many routers. The honest test is from outside — the friend, or a phone on
  cellular data.
- The local-address route from `lessons/joining-over-lan/` keeps working inside
  the house no matter which route is chosen; the routes are additions, not
  replacements.
- Version match still applies: the friend's game and the server must be the same
  version (`lessons/choosing-a-version/`).

## Arc

### Orientation — given plainly

Recap the cliffhanger as fact: the local address names the Mac only inside the
house. Then the two-address reality, demonstrated not asserted (opening
experiment), and NAT named and explained plainly — one public address, a table of
outbound conversations, inbound strangers match nothing. Then the three routes,
each described honestly with what it is, what it costs, and what it depends on:
overlay (both ends install, nothing public), tunnel (server-side agent, public
relay address, friends install nothing), forwarded port (router config, fully
public, nothing installed anywhere). The choice is the learner's, driven by real
constraints: can your friends install things? do you control the router? are you
comfortable depending on a third party's relay? There is no secretly-correct
answer; all three are used seriously in the real world.

### Predictions to elicit

- Two different devices in the house each ask a "what is my IP" page. Same number
  or different?
- The outside friend types the `192.168` local address. Using last lesson's
  fast-no-versus-silence distinction: which failure, and why?
- Before reading the three routes' descriptions: which do you *expect* to pick,
  and after choosing for real: did the constraints change your mind?

### The work — goals and hint ladders

1. **See the two addresses.** Goal: know your public address and prove it's
   shared. Compare the Mac's local address with what a "what is my IP" page
   reports; then run the same page on a second device in the house. Different
   local numbers, same public number — the whole NAT story in one observation.
2. **Prove the outside failure.** Goal: watch the local address fail from outside
   the network, predicted first. A phone on cellular data (wifi off) is an
   "outside" tester sitting in your hand. (Level 2: no ladder — the learner has
   the tools from last lesson.)
3. **Choose your route.** Goal: pick one of the three, out loud, with reasons.
   Constraints worth writing down: whether friends can install software, whether
   you have router access, tolerance for a third-party relay. Deliveries present
   the honest table; the decision is the learner's.
4. **Execute the route.** Goal: the friend, in another house, standing in your
   world. All service specifics come from the service's current docs — the
   deliveries point and do not assert steps. Hints are per-route snags, not
   procedures:
   - Rung 1 (all routes): whichever route you chose, the friend's Add Server
     address is *given to you by the route* — the overlay address, the tunnel's
     address, or your dynamic-DNS name. It is not the `192.168` number, and for
     the tunnel it isn't even your public address.
   - Rung 2 (route-specific snags, given as a set):
     - Tailscale: the server machine and the friend's machine must both be
       enrolled and the friend granted access — the service's docs cover invites
       and sharing; the address the friend joins is the *server machine's
       overlay address*, which Tailscale shows you.
     - playit.gg: the agent must be running on the server machine whenever
       anyone wants to join — it is now part of the server's infrastructure; the
       joinable address is the one the service issues, not anything from your
       router.
     - Port forwarding: forward TCP 25565 to the Mac's local address; reserve
       that local address in the router first so it can't drift; test from
       *outside* the network — testing from inside the house can fail on many
       routers even when the setup is right.
   - Rung 3: each route's own documentation has a "verify it's working" step —
     use the service's checker before burning the friend's patience, and read
     the server log while the friend attempts: a join that reaches the server
     at all leaves a line, which splits "route problem" from "server problem."
5. **The milestone.** When the friend is in: this is the course's promise
   delivered — someone outside the house, in a world you run. If you've made
   anything custom (a crafting recipe or rule from `../first-datapack/`, if
   you've been down that road), have them use it — an audience is what custom
   things are for.
6. **Same day, before the session ends:** if the chosen route gives strangers a
   path (tunnel or forwarded port), do `../locking-the-door/` now. State plainly:
   the internet is continuously scanned by automated tools, an open door will be
   found eventually, and the fix is a guest list. Factual, calm, then move on.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Turn the route off mid-session.** With the friend in the world, disable the
  route: pause/quit Tailscale on the server machine, or stop the tunnel agent,
  or disable the forwarding rule in the router. Watch the friend drop. Then read
  the server log: the server registered a disconnect and is otherwise perfectly
  healthy — it never knew anything was wrong with the world's plumbing. Undo:
  re-enable, friend rejoins. Teaches the load-bearing idea of this lesson's
  second half: the path is now infrastructure. Three things must all be alive
  for an outside visitor — the server, the route, and the friend's client — and
  each fails independently of the others.
- **Diagnose from the log.** While the route is off, have the friend attempt to
  join, and watch the server log: nothing appears. A failed join that leaves no
  server-side trace *never reached the server* — the problem is in the path.
  This one observation is the split between "my server is broken" and "my route
  is broken," and it's the first question to ask forever after.

### What just happened — the explanation

The internet as routers all the way down: the home router passes packets to the
provider's router, which passes to bigger ones, hop by hop, each router reading
the destination address and passing the packet one step closer — the same job the
home router does in the house, repeated across the world. Addresses that mean
something at that scale must be unique, which private ranges aren't — hence the
one public address per home, and NAT sharing it via its table of outbound
conversations.

Why each route works, one layer deep:

- The **overlay** works because both machines *dial out* (outbound always works —
  NAT's table handles it) to coordinate, then carry a whole private network over
  encrypted connections between them. The stable overlay addresses are real
  addresses on a network that exists only among enrolled machines.
- The **tunnel** works for the same reason: the server dials *out* to the relay
  and keeps that connection open. Friends connect to the relay's public address,
  and the relay pours their traffic down the already-open outbound pipe. Nobody
  ever had to accept an inbound stranger at the house.
- **Port forwarding** is the direct approach: standing instructions to the
  router — inbound on this port is *for the Mac*, add it to the table by decree.
  A door cut in the wall, which is why it's the route that needs the guest list
  most urgently.

### Go further — open questions

- `traceroute` (in the terminal, e.g. `traceroute minecraft.wiki`) tries to list
  every router between you and a destination. Run it somewhere. How many hops?
  Do any of them have names that hint where the packet went geographically?
- Log your public address today, and check it again over the coming weeks. Does
  it ever change? What did your dynamic-DNS name (if you made one) do about it?
- Big public servers have addresses that never change and no home router in
  sight. What are they doing differently — what is "hosting," physically? (This
  foreshadows `../always-on/` without requiring it.)
- Genuinely open: a packet crossing fifteen routers owned by a dozen companies
  in three countries arrives in milliseconds, with no one in charge of the whole
  path. How do all those routers know which way to send it? Who decides, when a
  cable is cut, what the new path is?

## Delivery notes

- **guided:** the route choice must read as a real fork with three honest
  options — no steering. The learner's constraints decide. Keep the safety
  framing exactly two beats: risk stated, mitigation named
  (`../locking-the-door/`, same day), move on. No dwelling, no drama.
- **reference:** an adult may execute the route. Keep: the decision table, the
  per-route gotchas (DHCP reservation before forwarding; test from outside;
  agent/overlay must be running for joins to work; whitelist same day for
  public routes), the leaves-behind list. Point at each service's docs — the
  reference asserts no service UI either.
- Never assert signup flows, UI labels, pricing, or router screens — all
  [volatile]/[verify] tagged above; deliveries point at tailscale.com,
  playit.gg, the dynamic-DNS provider's docs, and the router's manual.
- The milestone sentence (someone outside the house, in the learner's world)
  should land plainly and once — no cheerleading.
- The datapack mention must be conditional ("if you've built one") with the
  link, since arrival order isn't guaranteed.
