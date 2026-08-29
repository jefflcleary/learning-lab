# Letting friends join your server — reference

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

Goal: people inside and outside the house join the Minecraft server running at
`~/projects/mc-server`, and the door gets a whitelist the same day. All service
and router specifics change without warning — follow the service's own current
docs, not any steps written here.

## Preconditions

- Server startable and joinable at `localhost` (see
  `../running-your-own-server/`)
- Every joining player's client version matches the server version
- Port-forwarding route only: admin access to the home router

## Background (one paragraph)

Each device on the LAN has a router-assigned local address (`192.168.x.x` or
similar); those ranges are private and unroutable on the internet. The home has
one public address; the router NATs it across all devices. Outbound connections
work; unsolicited inbound has no NAT table entry and is dropped — that's why
the server is unreachable from outside by default. Each route below gets around
that a different way.

## LAN join (inside the house)

1. Find the Mac's local address: System Settings → Wi-Fi → details of the
   connected network → the IP address field; or `ipconfig getifaddr en0`
   (interface naming varies — Settings is the reliable route).
2. Second device joins at `<local address>:25565`.
3. macOS may ask whether `java` can accept incoming connections (only if the
   Application Firewall is on) — allow it.
4. Failure triage, useful everywhere: fast refusal = machine reachable, nothing
   listening on that port (wrong port, server down); slow timeout = machine not
   reachable (wrong address, off-network). Joins and disconnects appear in the
   server log.

## Route decision (outside the house)

| | Friends install anything? | Router access needed? | Exposed to strangers? | Depends on |
|---|---|---|---|---|
| **a. Tailscale** (overlay network) | Yes — app + account | No | No — only enrolled machines | Tailscale service |
| **b. playit.gg** (tunnel/relay) | No | No | Yes — public address | playit.gg relay |
| **c. Port forward + dynamic DNS** | No | Yes | Yes — port open to internet | Your router + DDNS provider |

Routes b and c require the whitelist (below) the same day — open Minecraft
ports get found by automated scanning regardless of whether the address is
shared. Route a doesn't expose anything, but do the whitelist anyway.

## Route a — Tailscale

- Install on the server Mac and on each friend's machine; friends need
  accounts. Setup, invites, and network sharing: tailscale.com docs (flows
  change; don't trust older writeups).
- Friends join at `<server machine's Tailscale address>:25565` — the overlay
  address Tailscale displays for the server Mac, not the LAN or public address.
- Tailscale must be running on the server Mac for anyone to join.

## Route b — playit.gg

- Agent runs on the server machine and dials out to their relay; the service
  issues the joinable public address. Signup and agent install: playit.gg docs.
- Friends join the issued address. Nothing router-side to configure.
- The agent is now server infrastructure: no agent, no outside joins. Arrange
  for it to start whenever the server does.

## Route c — Port forwarding + dynamic DNS

1. In the router: reserve a fixed local address for the Mac (DHCP reservation /
   static lease — naming varies by router; check the router's manual, model
   number on the label). Do this first or the forward will silently break when
   the address drifts.
2. Forward TCP 25565 → `<Mac's reserved local address>:25565`. Router UI varies
   completely by model; router docs are the source.
3. Public addresses can be reassigned by the ISP. Set up a dynamic DNS name
   with any current free provider (their docs for the update client), and give
   friends the name, not the raw number.
4. Test from **outside** the network — a phone on cellular data works. Testing
   the public address from inside the LAN fails on many routers even when the
   setup is correct.

## Verify / debug

- Each service documents its own "is it working" check — use it before
  involving the outside player.
- Watch the server log during a join attempt:
  - Line appears in the log → route works; problem (if any) is server-side.
  - Log silent → attempt never reached the server; problem is the path
    (agent/overlay not running, forward wrong, wrong address given out).
- Version mismatch shows as an on-screen client error naming the outdated side.

## Whitelist (same day for routes b and c)

- Exact key and subcommand names: minecraft.wiki `server.properties` and
  commands pages. Console changes apply live, no restart.
- In the server console: `/whitelist on`, then `/whitelist add <name>` per
  player, `/whitelist list` to verify. Names must match accounts exactly — past
  join lines in the log are a reliable spelling source.
- Prove it: have a non-listed account (or a temporarily removed volunteer)
  attempt a join and get refused; re-add and confirm a clean join.
- Keep `online-mode=true` (the default): it verifies each joining account
  against Mojang, which is what makes a name-based whitelist enforceable. Any
  server strangers can reach keeps it on.
- The list lives in `whitelist.json` in the server folder; ops in `ops.json`.
  Don't op guests — the whitelist governs entry, op governs administration.
- `enforce-whitelist` (see the wiki) controls whether removal kicks players
  already online or only blocks the next join.

## Gotchas

- The LAN route keeps working inside the house regardless of route chosen.
- Routes a and b: the overlay/agent process must be running for joins to
  work — treat it like part of the server.
- Route c: the forward + reservation pair is fragile to router resets; recheck
  both after firmware updates or router swaps.
- Whitelist names are exact-match; a renamed account may need re-adding (check
  `whitelist.json` for what's actually stored).

## What you have now

- LAN players can join at `<local address>:25565`; the address is findable on
  demand
- People outside the house can join via one working route (overlay, tunnel, or
  forwarded port); it's known which route and what it depends on
- Whitelist on, `online-mode` on, real players listed, and a non-listed
  account observed to bounce; add/remove works live from the console
- Concepts in play for later lessons: local/public address, NAT, tunnel/relay,
  overlay network, port forwarding, authentication vs authorization
