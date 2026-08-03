# Opening the door to the internet — reference

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

Goal: someone outside the home network joins the Minecraft server running at
`~/projects/mc-server`. Three routes; pick one. All service specifics change
without warning — follow the service's own current docs, not any steps written
here.

## Preconditions

- Server joinable over LAN at `<local address>:25565`
  (see `../joining-over-lan/`)
- Outside player's client version matches the server version
- Route c only: admin access to the home router

## Background (one paragraph)

The home has one public address; the router NATs it across all devices. Outbound
connections work; unsolicited inbound has no NAT table entry and is dropped —
that's why the server is unreachable from outside by default. Each route below
gets around that a different way.

## Route decision

| | Friends install anything? | Router access needed? | Exposed to strangers? | Depends on |
|---|---|---|---|---|
| **a. Tailscale** (overlay network) | Yes — app + account | No | No — only enrolled machines | Tailscale service |
| **b. playit.gg** (tunnel/relay) | No | No | Yes — public address | playit.gg relay |
| **c. Port forward + dynamic DNS** | No | Yes | Yes — port open to internet | Your router + DDNS provider |

Routes b and c require the whitelist (`../locking-the-door/`) the same day —
open Minecraft ports get found by automated scanning regardless of whether the
address is shared. Route a doesn't expose anything, but do the whitelist anyway.

## Route a — Tailscale

- Install on the server Mac and on each friend's machine; friends need accounts.
  Setup, invites, and network sharing: tailscale.com docs (flows change; don't
  trust older writeups).
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
3. Public addresses can be reassigned by the ISP. Set up a dynamic DNS name with
   any current free provider (their docs for the update client), and give
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

## Gotchas

- The LAN route keeps working inside the house regardless of route chosen.
- Keep `online-mode=true` — the whitelist in `../locking-the-door/` depends on
  verified names.
- Routes a and b: the overlay/agent process must be running for joins to work —
  treat it like part of the server.
- Route c: the forward + reservation pair is fragile to router resets; recheck
  both after firmware updates or router swaps.

## Leaves behind

- People outside the house can join via one working route (overlay, tunnel, or
  forwarded port); the learner knows which route and what it depends on
- Whitelist obligation (`../locking-the-door/`) discharged the same day for
  routes b and c
- Concepts in play for later lessons: public address, NAT, tunnel/relay,
  overlay network, port forwarding
