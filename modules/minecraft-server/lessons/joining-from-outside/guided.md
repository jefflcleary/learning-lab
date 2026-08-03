# Opening the door to the internet

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Someone on your wifi can join your server. Someone in another house cannot — the
`192.168` address that works across the living room means nothing out there, and
this session is about why, and about fixing it.

The why is one idea: your whole home shares a single public address, and the
router that shares it has no way of knowing which machine an uninvited visitor is
looking for. The fix is a choice among three honest routes — a private network
that spans houses, a tunnel through a relay, or a door cut directly through the
router — and by the end of the session, a friend who does not live with you will
be standing in your world. If you've built anything custom, this is the day it
gets a real audience.

If you already know your way around a computer — or you're setting this up on a
learner's behalf — there's a [compressed version of this lesson](reference.md)
with just the commands and decisions.

---

## Before you start

You need:

- **Someone on your wifi can join your server.** [The first
  visitor](../joining-over-lan/guided.md) gets you there. Quick check: you can find your
  Mac's local address on demand, and a second device in the house can join at
  `<that address>:25565`.
- **A friend outside the house** with Minecraft: Java Edition matching your
  server's version — versions are [their own decision](../choosing-a-version/guided.md),
  and the two ends of a connection have to agree — who you can message while
  you work, because the test at the end of this session is a real person
  joining. Quick check: they can tell you their game's version number and it
  matches your server's.
- **For one of the three routes only:** access to your home router's admin page.
  If someone else runs the home network, they'll need to be part of that route —
  the other two routes don't touch the router at all.

---

## What you'll have at the end

By the end of this session you will have:

- Seen your home's one public address, and proven that every device in the house
  shares it
- Chosen one of three real-world routes for letting outside players in — chosen
  it yourself, based on your actual constraints
- A friend in another house standing in your world — the thing this whole
  stretch of lessons has been building toward
- Broken the route on purpose while someone was connected, and learned to tell
  "the server is down" from "the path is down" by reading the log

---

## New tools

**The public address.** Your internet provider assigns your home exactly one
address that the rest of the internet can reach — one for the whole house, no
matter how many devices are inside. Any "what is my IP address" page will show it
to you (search those words; plenty of sites do nothing else). You'll compare it
to your local address in a minute.

**NAT** — network address translation — is the router's trick for sharing that
one address. When a device in the house starts a conversation with the outside
world, the router notes it in a table: this device is talking to that place.
Replies come back to the house's one address, the router checks the table, and
passes them to the right device. But a stranger connecting *in* from the internet
matches nothing in the table — the router has no idea which of a dozen machines
the visitor wants, so it drops the connection. That's the entire reason your
server is unreachable from outside. Not a wall built on purpose — just the
arithmetic of many machines behind one address.

**The three routes through.** Each is real, each is used seriously, and each has
a cost. Reading all three before choosing is part of the work.

- **Tailscale** — an overlay network. You and your friends each install it, and
  all the enrolled machines join a shared private network carried over encrypted
  connections across the internet. Your server machine gets a stable address on
  that network that works from anywhere. Safest of the three: strangers can't
  even see your server, because only enrolled machines are on the network. The
  cost: every friend has to install it and have an account.
- **playit.gg** — a tunnel service. A small agent program runs on your server
  machine and connects *out* to the service's relay; the relay gives you a
  public address anyone can join, and pours visitors' traffic down the tunnel to
  your server. Friends install nothing. The cost: the path runs through a third
  party's machines — their uptime and their terms are now part of your server.
- **Port forwarding + dynamic DNS** — the traditional way. You tell your router:
  inbound connections on port 25565 go to my Mac. Friends join your public
  address directly, with nothing extra installed anywhere. Two extra pieces make
  it stick: the router must always give your Mac the same local address (routers
  can reserve one), and because your *public* address can change over time, a
  dynamic DNS service gives you a permanent name that follows it. The cost: that
  port is now open to the entire internet, not just your friends.

For all three: the services' own websites carry the current install and setup
instructions, and those instructions change too often for any lesson to repeat
them honestly. This session tells you what each route *is* and what it costs;
the service's own documentation tells you what to click this month.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Two different devices in your house each visit a "what is my IP" page. Same
  number or different numbers?
- Your outside friend types your `192.168` local address into Add Server. You
  learned the fast-no-versus-silence distinction last time — which failure will
  they see, and why?
- Before reading any further: which of the three routes do you expect you'll
  pick? Keep the answer and see if you still agree after choosing for real.

---

## The work

### See the two addresses

On the Mac, put two facts side by side: the local address you learned to find in
[the last lesson](../joining-over-lan/guided.md), and what a "what is my IP" page says.
Two different numbers — the name your house uses for the Mac, and the name the
internet uses for your entire house.

Now the interesting half: open the same "what is my IP" page on a second device
in the house. Different local addresses, same public address. Every machine in
the house, one face to the world. That one observation is the whole reason this
lesson exists.

### Prove the outside failure

You predicted what happens when the local address is tried from outside the
network. Test it without leaving the room: a phone with wifi turned off is on
the cell network, which makes it an outside visitor sitting in your hand. Try
joining `<local address>:25565` from it and watch which failure you get — and
check it against your prediction.

### Choose your route

Write down your actual constraints, then choose:

- Can your friends install software and make an account? If no — Tailscale is
  out.
- Do you have access to the router's admin page? If no — port forwarding is out.
- Are you comfortable with your game traffic passing through a relay company's
  machines? If no — playit.gg is out.

There is no secretly correct answer. All three routes are used by real servers
run by real people. Say your choice out loud, with the reason — the reason is
what makes it a decision instead of a guess.

### Execute the route

The goal, plainly: your friend, in their house, standing in your world.

Go to your chosen service's own website and follow its current setup
documentation — that's the honest source for this month's steps. For port
forwarding, the honest source is your router's manual (the model number is on
the router's label; search for its documentation).

<details>
<summary>Stuck? Start here</summary>

Whichever route you chose, the address your friend types into Add Server is
*given to you by the route*: the overlay address Tailscale shows for your server
machine, the address the tunnel service issues you, or your dynamic-DNS name.
It is never the `192.168` number — and for the tunnel route it isn't even your
public address.

</details>

<details>
<summary>Route-specific snags</summary>

- **Tailscale:** your server machine and your friend's machine must both be
  enrolled, and your friend needs access to your network — the docs cover
  invites and sharing. The address the friend joins is your *server machine's*
  address on the overlay network, which Tailscale shows you.
- **playit.gg:** the agent has to be running on the server machine whenever
  anyone wants to join — from today it is part of your server's infrastructure,
  like the server program itself. The joinable address is the one the service
  issues; nothing about your router is involved.
- **Port forwarding:** forward TCP port 25565 to your Mac's local address — and
  first, reserve that local address in the router so it can't drift to a
  different machine next week. Then test from *outside* the network (your
  friend, or the cellular-data phone): on many routers, joining your own public
  address from inside the house fails even when the setup is perfect.

</details>

<details>
<summary>Verifying without burning your friend's patience</summary>

Each route's documentation has a way to check the route itself before anyone
tries to join — use it. And when your friend does attempt a join, watch the
server log: an attempt that reaches the server at all leaves a line there. A
line in the log means the route works and any problem is server-side; a silent
log means the attempt never arrived, and the problem is the path.

</details>

### The moment

When your friend joins, look at the log line, then look at what it means:
someone outside your house is inside a world that runs in your terminal, over a
route you built and can explain. This is the thing this entire stretch of the
module has been aiming at.

If you've built something custom — a crafting recipe or rule of your own from
[your first datapack](../first-datapack/guided.md), if you've been down that road — have
your friend use it now. An audience is what custom things are for.

### Before this session ends

If your route was the tunnel or the forwarded port, your server now has an
address strangers can reach. One fact, calmly: the internet is scanned
continuously by automated tools, and an open Minecraft port will eventually be
found by someone you didn't invite. The fix is a guest list, and it's a short
lesson: [Deciding who gets in](../locking-the-door/guided.md). Do it today, while the
door is new. (If you chose Tailscale, strangers can't reach you — but the guest
list is still worth having, and the lesson still applies.)

---

## Break it on purpose

Cause it, watch it, undo it.

**Turn the route off mid-visit.** With your friend in the world, shut down the
route itself: pause or quit Tailscale on the server machine, or stop the tunnel
agent, or disable the forwarding rule in the router — whichever one is yours.
Watch your friend drop out of the world. Then read the server log: it recorded
a disconnect, and otherwise it's perfectly healthy — the server never knew the
plumbing failed. Re-enable the route and let your friend rejoin.

While the route is off, have your friend try to join, and watch the log while
they do: nothing appears. Hold on to that. A failed join that leaves no trace
in the log *never reached the server* — the problem is in the path. A join
attempt that shows up in the log but still fails is the server's problem. From
today, three things have to be alive for an outside visitor — the server, the
route, and the friend's game — and that one glance at the log tells you which
one to suspect.

---

## What just happened

The internet is routers all the way down. Your home router passes a packet to
your provider's router, which passes it to a bigger one, hop after hop, each
router reading the destination address and moving the packet one step closer —
the same job your home router does across the living room, repeated across the
planet. An address that works at that scale has to be unique in the world, and
the `192.168` numbers — reused in every house on earth — are not. So your house
gets one unique public address, and NAT stretches it across every device you
own.

Why each route works, one layer down:

- The **overlay** works because both machines dial *out* — and outbound always
  works, since NAT's table exists exactly to handle conversations the house
  starts. The software then carries a whole private network over encrypted
  connections between the enrolled machines, with its own stable addresses that
  work from anywhere.
- The **tunnel** works for the same reason: your server dials out to the relay
  and keeps the connection open. Friends connect to the relay's public address,
  and the relay pours their traffic down the pipe your server already opened.
  No stranger ever knocks on your house directly.
- **Port forwarding** is the direct approach: a standing instruction to the
  router — inbound on this port is for the Mac, no table lookup needed. A door
  cut in the wall. Which is why that route, more than the others, needs the
  guest list.

---

## Go further

- The terminal command `traceroute` tries to list every router between you and
  a destination — try `traceroute minecraft.wiki`. How many hops? Do any of the
  routers' names hint at where your packet went geographically?
- Write down your public address today, and check it again over the coming
  weeks. Does it change? If you set up a dynamic DNS name, what did it do when
  the number moved?
- Big public servers have addresses that never change, and there's no home
  router anywhere in the story. What are they doing differently — what is
  "hosting," physically? Somewhere, that server is a real machine in a real
  building. What kind of building?
- A packet crossing fifteen routers owned by a dozen companies in three
  countries arrives in milliseconds, and nobody is in charge of the whole path.
  How do all those routers know which way to send it — and when a cable is cut
  somewhere, who decides what the new path is?

---

## What you have now

- People outside your house can join your server, through a route you chose and
  can explain: overlay, tunnel, or forwarded port
- You know what the route depends on — and that it's infrastructure now: server,
  route, and client each fail independently, and the log tells you which one did
- Your home's public address, NAT, and the reason outbound always works but
  inbound needs arranging
- An obligation, if your route is reachable by strangers: the guest list in
  [Deciding who gets in](../locking-the-door/guided.md), done the same day
