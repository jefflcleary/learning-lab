# Letting friends join your server

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your server has had exactly one player so far: you, joining from the same
machine it runs on. This session changes that three times over. First, someone
on your wifi joins — your world's first visitor, and your first meeting with
the home network: the router, the addresses it hands out, and why the
`localhost` trick can never work for anyone else. Then a friend who does not
live with you joins over the internet, once you understand why your house is
unreachable from outside by default and choose one of three honest routes
through. And then, because an open door on the internet gets found, the door
gets a guest list: a whitelist you turn on, load, and watch refuse someone.

By the end, friends in other houses are playing in a world you run, through a
route you built and can explain, past a lock you have proven works.

If you already know your way around a computer — or you're setting this up on a
learner's behalf — there's a [compressed version of this lesson](reference.md)
with just the commands and decisions.

---

## Before you start

You need:

- **A server you can start, stop, and join.** [Running your own
  server](../running-your-own-server/guided.md) gets you there. Quick check:
  start your server, watch for the **Done** line, join from your own game at
  `localhost`, then type `stop` and watch it save and exit.
- **A second device on the same wifi that can run Minecraft: Java Edition** —
  and ideally a second person to drive it. A second machine of your own works
  too, but a real person makes the payoff better. Quick check: the second
  device can open the game and load a singleplayer world, and both devices show
  the same wifi network name.
- **A friend outside the house** with Minecraft: Java Edition matching your
  server's version, who you can message while you work — the big test in the
  middle of this session is a real person joining from another house. Quick
  check: their game's version number matches your server's. (The two ends of a
  connection have to agree on a version — choosing one on purpose is [its own
  decision](../choosing-a-version/guided.md).)
- **For one of the three internet routes only:** access to your home router's
  admin page. If someone else runs the home network, they'll need to be part of
  that route — the other two routes don't touch the router at all.
- **Your players' exact account names**, spelled precisely, for the guest-list
  part at the end — and ideally a willing volunteer for the moment you test the
  lock.

If you've been through [changing your server's settings](../server-settings-and-console/guided.md),
you've already met the `address:port` idea from moving the server's front
door — it comes back today. If you haven't, it gets explained here from scratch.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. For connection mysteries, its layer-finding step is the one that pays fastest.

---

## What you'll have at the end

By the end of this session you will have:

- A visitor on your wifi joined by your Mac's local address — and you'll know
  who gave your Mac that address and why
- A friend in another house standing in your world, through one of three
  real-world routes you chose yourself, based on your actual constraints
- The whitelist on, every real player listed, and a non-listed account
  *watched* getting refused — from both sides of the door
- Two diagnostics you will use forever: telling "not listening" from "not
  reachable" by how a connection fails, and telling "server problem" from
  "path problem" by one glance at the log
- Two words that describe half of computer security, each attached to
  something that happened on your own server

---

## New tools

No new software until you choose an internet route — and that install follows
the route's own documentation, as part of the work below. New ideas first, all
given straight:

**The router and local addresses.** The box that runs your home wifi is a
computer whose whole job is passing messages between the devices in the house,
and between them and the internet. Part of that job is bookkeeping: every
device that joins the network gets assigned an address by the router — a
**local address** (or private address), four numbers separated by dots,
usually starting `192.168.`, sometimes `10.` or `172.`. (The assignment system
has a name, DHCP, which you'll mostly never need — "the router hands out the
numbers" is the part worth keeping.) Local addresses are how machines on the
same network name each other — which is exactly what `localhost` can't do,
because `localhost` is a special name every computer reserves for *itself*.

**The public address.** Your internet provider assigns your home exactly one
address the rest of the internet can reach — one for the whole house. Any
"what is my IP address" page will show it to you (search those words; plenty
of sites do nothing else).

**NAT** — network address translation — is the router's trick for sharing that
one address. When a device in the house starts an outside conversation, the
router notes it in a table: this device is talking to that place. Replies come
back to the house's one address, and the table says which device gets them.
But a stranger connecting *in* matches nothing in the table — the router has
no idea which machine the visitor wants, so it drops the connection. That's
the entire reason your server is unreachable from outside: not a wall built on
purpose, just the arithmetic of many machines behind one address.

**The three routes through.** Each is real, each is used seriously, and each
has a cost. Reading all three before choosing is part of the work.

- **Tailscale** — an overlay network. You and your friends each install it,
  and the enrolled machines join a shared private network carried over
  encrypted connections across the internet. Your server machine gets a stable
  address on that network that works from anywhere. Safest of the three:
  strangers can't even see your server. The cost: every friend has to install
  it and have an account.
- **playit.gg** — a tunnel service. A small agent program runs on your server
  machine and connects *out* to the service's relay; the relay gives you a
  public address anyone can join, and pours visitors' traffic down the tunnel
  to your server. Friends install nothing. The cost: the path runs through a
  third party's machines — their uptime and their terms are now part of your
  server.
- **Port forwarding + dynamic DNS** — the traditional way. You tell your
  router: inbound connections on port 25565 go to my Mac. Friends join your
  public address directly, nothing extra installed anywhere. Two pieces make
  it stick: the router must always give your Mac the same local address
  (routers can reserve one), and because your *public* address can change over
  time, a dynamic DNS service gives you a permanent name that follows it. The
  cost: that port is open to the entire internet, not just your friends.

For all three, the current install and setup instructions live on the
service's own website (for port forwarding, in your router's manual — the
model number is on its label), and they change too often for any lesson to
repeat them honestly. This session tells you what each route *is* and what it
costs; the service's own documentation tells you what to click this month.

**The whitelist** is the server's guest list: when it's on, only listed
account names can join. It can be controlled two ways — a key in
`server.properties`, and a family of console commands (`/whitelist` plus a
subcommand: on, off, add, remove, list). The exact key name and subcommands
are documented on the minecraft.wiki `server.properties` and commands pages —
you've used that wiki for exact syntax before, and that's the move here too.

**`online-mode`, explained at last.** You met this key when you [read every
line of the settings file](../server-settings-and-console/guided.md) and
deliberately left it alone. With `online-mode=true` — the default — the server
checks every joining account against Mojang's account system: proof the joiner
actually owns the name they're presenting. That check is what makes a list of
*names* worth anything; with it off, anyone can claim any name — including one
on your list — and the guest list becomes decoration. The standing rule that
follows: any server strangers can reach keeps `online-mode=true`. (Later in
this module you'll run a separate practice server that turns the check off for
good technical reasons — that kind of server never gets exposed to the
internet.)

**Operators, one layer deeper.** You've been op on your own server since early
on. Op is a different kind of power than entry: the whitelist decides who may
*enter* the world, op decides who may *govern* it — kick players, change
rules, run any command. The op list lives in `ops.json` in the server folder,
and ops come in levels of power, documented on the wiki. The house rule:
guests don't get op. It isn't a favor or a rank — it's administration.

One more thing worth knowing before it happens: the first time another machine
connects to your server, macOS may show a dialog asking whether `java` may
accept incoming network connections. That's the operating system's firewall
checking before a program opens a door other machines can knock on; the
program in question is your server, so allowing it is the right answer. If the
dialog never appears, nothing is wrong — not every Mac has the firewall turned
on.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- The second device adds a server with the address `localhost` and tries to
  join. What happens, and why?
- Two different devices in your house each visit a "what is my IP" page. Same
  number or different numbers?
- A phone with wifi turned off tries to join at your `192.168` address. Does
  the failure come back quickly, or does the game hang and wait?
- Before reading any further about the three routes: which one do you expect
  you'll pick? Keep the answer and see if you still agree after choosing for
  real.
- You're op. You remove *yourself* from the whitelist while it's on. Can you
  still join?
- A friend is online at the moment you remove them from the list. What
  happens — kicked on the spot, or fine until they next try to join?

---

## The work

### Watch localhost fail from the second device

Start your server. Then, on the second device, add a server with the address
`localhost` and try to join it. You predicted this — now watch it.

It fails, and the reason is the first idea of this session: `localhost` means
"this machine, myself," on *every* computer. The second device's game knocked
on its own front door, found no server living there, and gave up. Your server
never heard a thing — check its log if you want proof. To reach your machine,
the friend's game needs the name the *network* knows your machine by. Which is
a number, and you're about to go find it.

### Find your Mac's number

On the Mac running the server, open **System Settings**, go to **Wi-Fi**, and
open the details of the network you're connected to. Look for the **IP
address** — four numbers separated by dots. That's your Mac's local address,
assigned by the router. If you want the same fact from the terminal, this
usually prints it:

```
ipconfig getifaddr en0
```

(`en0` is usually the Wi-Fi connection on a Mac laptop. If the command prints
nothing, trust the Settings screen — same fact, more reliable route.)

Write the number down and look at its shape. Probably `192.168.`-something.
Every device in your house has a number like it, from the same router, and any
of them can use this one to name your Mac.

### Get the visitor in

Your goal: the friend joins your world from their device. Server running
first — if in doubt, verify you can still join from your own game.

<details>
<summary>Stuck? Start here</summary>

The Add Server screen on the friend's device wants an address. You now hold
two numbers: which *machine* on the network — you just wrote it down — and
which *door* on that machine your server listens at, which you've known since
the day a second server refused to start because the first one was holding it.

</details>

<details>
<summary>The syntax</summary>

An address and a port, joined by a colon: `address:port`. It's the same shape
as `localhost:25570` from when you [moved the server's front
door](../server-settings-and-console/guided.md) — the address names the
machine, the port names the program's door on it. Which address, and which
port, for your server?

</details>

<details>
<summary>The full answer</summary>

`<your Mac's local address>:25565` — for example `192.168.1.23:25565`, but
with the actual number you wrote down. The friend adds that as the server
address and joins. If macOS asks whether `java` may accept incoming
connections, that's the firewall question described earlier — allow it.

</details>

If the two games are different versions, the join is refused — and the message
on screen tells you which side is behind. The two ends of a connection have to
speak the same version of the game's language.

### See it from the server's side

The moment the friend appears in the world, read your terminal. The server
announced the arrival — the same announcement it made when *you* first joined,
except this time the player is across the room. Take a minute and actually be
two people in one world: stand in front of each other, place a block, watch
both screens show it. Your world has its first visitor.

Now the fact that sets up everything else. That `192.168` number only means
something *inside* your house: those ranges are reserved for private networks,
reused in millions of homes at once, so the routers that make up the internet
refuse to carry them — there would be no way to know whose `192.168.1.23` was
meant. A friend in another house typing your local address gets nowhere. Your
home shows the internet a different face — one single address for the whole
house — and getting a visitor through *that* is the next stretch of this
session.

### See the two addresses

On the Mac, put two facts side by side: the local address you just wrote down,
and what a "what is my IP" page says. Two different numbers — the name your
house uses for the Mac, and the name the internet uses for your entire house.
Now the interesting half: open the same page on a second device in the house.
Different local addresses, same public address. Every machine in the house,
one face to the world. That one observation is the whole NAT story.

### Prove the outside failure

You predicted what happens when the local address is tried from outside the
network. Test it without leaving the room: a phone with wifi turned off is on
the cell network, which makes it an outside visitor sitting in your hand. Try
joining `<local address>:25565` from it, check the result against your
prediction, and hold on to *how* it failed — quick or slow. That difference
gets dissected properly in Break it on purpose.

### Choose your route

Write down your actual constraints, then choose:

- Can your friends install software and make an account? If no — Tailscale is
  out.
- Do you have access to the router's admin page? If no — port forwarding is
  out.
- Are you comfortable with your game traffic passing through a relay company's
  machines? If no — playit.gg is out.

There is no secretly correct answer. All three routes are used by real servers
run by real people. Say your choice out loud, with the reason — the reason is
what makes it a decision instead of a guess.

### Execute the route

The goal, plainly: your friend, in their house, standing in your world.

Go to your chosen service's own website and follow its current setup
documentation — that's the honest source for this month's steps. For port
forwarding, it's your router's manual.

<details>
<summary>Stuck? Start here</summary>

Whichever route you chose, the address your friend types into Add Server is
*given to you by the route*: the overlay address Tailscale shows for your
server machine, the address the tunnel service issues you, or your dynamic-DNS
name. It is never the `192.168` number — and for the tunnel route it isn't
even your public address.

</details>

<details>
<summary>Route-specific snags</summary>

- **Tailscale:** your server machine and your friend's machine must both be
  enrolled, and your friend needs access to your network — the docs cover
  invites and sharing. The address the friend joins is your *server machine's*
  address on the overlay network, which Tailscale shows you.
- **playit.gg:** the agent has to be running on the server machine whenever
  anyone wants to join — from today it is part of your server's
  infrastructure, like the server program itself. The joinable address is the
  one the service issues; nothing about your router is involved.
- **Port forwarding:** forward TCP port 25565 to your Mac's local address —
  and first, reserve that local address in the router so it can't drift to a
  different machine next week. Then test from *outside* the network (your
  friend, or the cellular-data phone): on many routers, joining your own
  public address from inside the house fails even when the setup is perfect.

</details>

<details>
<summary>Verifying without burning your friend's patience</summary>

Each route's documentation has a way to check the route itself before anyone
tries to join — use it. And when your friend does attempt a join, watch the
server log: an attempt that reaches the server at all leaves a line there. A
line in the log means the route works and any problem is server-side; a silent
log means the attempt never arrived, and the problem is the path.

</details>

### The milestone

When your friend joins, look at the log line, then look at what it means:
someone outside your house is inside a world that runs in your terminal, over
a route you built and can explain. This is the thing this entire stretch of
the module has been aiming at.

If you've built something custom — a crafting recipe or rule of your own from
[your first datapack](../building-datapacks/guided.md), if you've been down
that road — have your friend use it now. An audience is what custom things are
for.

One more stretch before the session ends. If your route was the tunnel or the
forwarded port, your server now has an address strangers can reach — and the
internet is scanned continuously by automated tools, so an open Minecraft port
will eventually be found by someone you didn't invite. The fix is a guest
list, and it's the last part of today's work. (If you chose Tailscale,
strangers can't reach you — but the guest list is still worth having, and
everything below still applies.)

### Turn the guest list on and load it

Goal: whitelist on, every real player added, and the server confirming the
full list back to you. Get the exact syntax from the wiki's commands page.

<details>
<summary>Stuck? Start here</summary>

Two ways exist: a key in `server.properties`, and a console command. One of
those needs a restart to land and one takes effect immediately — you know why
from [the memory-versus-disk story](../server-settings-and-console/guided.md).
For tonight, the console is the better tool.

</details>

<details>
<summary>The console route</summary>

In the server console: `/whitelist on` to enable it, `/whitelist add` with
each player's exact account name, and `/whitelist list` to hear the roster
read back. Names must match accounts exactly — the log lines from past joins
are a reliable source of correct spelling.

</details>

### Prove the bounce

A lock that has never been seen to refuse anyone is a hope, not a lock. Goal:
watch a non-listed account fail to get in — from both sides.

Use an alt account if one exists. Otherwise, temporarily remove your willing
volunteer (`/whitelist remove`), have them disconnect and try to rejoin, and
watch two screens at once: what the refusal looks like on their end, and what
the server log says about the attempt. Then add them back and confirm they get
in cleanly. Notice what you just verified: the server heard the attempt,
checked the list, and said no — and said yes to the same person the moment the
list changed. That's the whole mechanism, observed end to end.

### Read the list itself

Look in the server folder for where the guest list lives, and open it in VS
Code. It's a file, of course — this server keeps every decision in a file. The
shape inside is called JSON, a settings format you'll get to know well later;
for now just notice you can read it. While you're there, open `ops.json` next
to it: the govern-list, same idea, shorter — and it should stay shorter.

---

## Break it on purpose

Cause each one, watch what happens, undo it.

**Knock on the wrong door, then the wrong house.** On the wifi device, edit
the server entry's port to `25570` — a door nothing is listening at — and try
to join. Watch how quickly the failure comes back. Put `25565` back. Now edit
the address instead: change the last of the four numbers to one no device in
your house is likely to own, like `.250`, and try again. Watch what the game
does *while* it's failing, and how long it takes to give up. Restore the real
address. Now compare the two, because the difference is a diagnostic you'll
use forever. Wrong door failed **fast**: a real machine received the knock and
answered "no program at that door." Wrong house failed **slow**: nobody
answered at all, and the game waited until it lost hope. A fast no means
*reachable, but not listening*. Silence means *not reachable at all*. Those
are different problems with different fixes — and now you also know why the
cellular-phone test failed the way it did.

**Turn the route off mid-visit.** With your friend in the world, shut down the
route itself: pause or quit Tailscale on the server machine, or stop the
tunnel agent, or disable the forwarding rule in the router — whichever one is
yours. Watch your friend drop out of the world. Then read the server log: it
recorded a disconnect, and otherwise it's perfectly healthy — the server never
knew the plumbing failed. While the route is off, have your friend try to
join, and watch the log while they do: nothing appears. A failed join that
leaves no trace in the log *never reached the server* — the problem is in the
path. An attempt that shows up in the log but still fails is the server's
problem. From today, three things have to be alive for an outside visitor —
the server, the route, and the friend's game — and that one glance at the log
tells you which one to suspect. Re-enable the route and let your friend
rejoin.

**Lock yourself out — maybe.** While op, remove yourself from the whitelist,
disconnect, and try to rejoin. You made a prediction about this; find out.
Whatever happens, you now own a measured fact about how op and the whitelist
interact — worth knowing *before* it matters. To undo, the console always
works: it's on the server, not in the game, so no whitelist can lock you out
of it. Add yourself back.

**Removal timing.** With your volunteer online, remove them from the list and
just watch: kicked immediately, or untouched until their next join? Compare
with your prediction. Then look up `enforce-whitelist` on the wiki's
`server.properties` page, reconcile what you observed with what it says, and
try flipping it to see the other behavior. Re-add your volunteer, and maybe
hand them something nice in-game for their trouble. Both whitelist experiments
are the same question in different clothes: *when does the lock actually
bite?* A rule existing and a rule being enforced are different things, and
computers force you to be precise about the difference.

---

## What just happened

Follow one click the whole way. When a friend presses Join, their game wraps
"I'd like to connect" in a small parcel of data — a packet — addressed to a
machine and a port. Inside the house, their device radios it to the router,
the router reads the address and passes it to your Mac, and your Mac hands it
to whichever program is listening on door 25565: your server. Across the
internet, it's the same job repeated: home router to provider's router to
bigger ones, hop after hop, each one moving the packet one step closer —
routers all the way down, doing across the planet what your home router does
across the living room. An address that works at that scale must be unique in
the world, and the `192.168` numbers are not — so your house gets one unique
public address, and NAT stretches it across every device you own.

Why each route works, one layer down: the **overlay** works because both
machines dial *out* — and outbound always works, since NAT's table exists
exactly to handle conversations the house starts — then carries a whole
private network over encrypted connections between the enrolled machines. The
**tunnel** works for the same reason: your server dials out to the relay and
keeps the pipe open; friends connect to the relay's public address, and the
relay pours their traffic down that pipe. No stranger ever knocks on your
house directly. **Port forwarding** is the direct approach: a standing
instruction to the router — inbound on this port is for the Mac. A door cut in
the wall, which is why that route, more than the others, needs the guest list.

And the guest list itself: every join attempt got asked two different
questions, and they have names worth keeping. *Who are you?* — answered by
`online-mode`, which checked the joining account against Mojang's records, so
the presented name provably belongs to the person presenting it. That's
**authentication**: identity, verified. *What are you allowed?* — answered by
two lists: the whitelist ("may you enter?") and the ops list ("may you
govern?"). That's **authorization**: permissions, granted.

They're different jobs, and the order matters. Authorization is only as strong
as the authentication underneath it, because permissions attached to a name
mean nothing if names can be faked — a guest list is worthless at a door where
nobody checks faces. That's exactly why `online-mode` stays on for any server
strangers can reach. Nearly every login screen, permission popup, and "you
don't have access" message you will ever see is one of these two questions
being asked or answered. You now own both words, with a lived example of each,
on a server you run.

---

## Go further

- Your router has an admin page that lists every device it has handed an
  address to. Find it — the router's label or manual says how; every model is
  different, so the router's own documentation is the source. What's on your
  network that you forgot existed?
- The terminal command `traceroute` tries to list every router between you and
  a destination — try `traceroute minecraft.wiki`. How many hops? Do any of
  the routers' names hint at where your packet went geographically? And the
  deeper puzzle: a packet crossing fifteen routers owned by a dozen companies
  arrives in milliseconds, and nobody is in charge of the whole path. How do
  all those routers know which way to send it — and when a cable is cut, who
  decides what the new path is?
- Big public servers have addresses that never change, and there's no home
  router anywhere in the story. What are they doing differently — what is
  "hosting," physically? Somewhere, that server is a real machine in a real
  building. What kind of building?
- There's also `/ban`, and a banned-players file near the whitelist. A ban
  list means "everyone except these"; a whitelist means "no one except these."
  When is each the right tool? Which do big public servers use, and why?
- Account names can be changed by their owners. What happens to your whitelist
  when a listed friend renames their account — does the entry follow them or
  break? The contents of `whitelist.json` hold a clue about what's *really*
  stored.
- When you visit `minecraft.wiki`, you type a *name*, not four numbers — yet
  the conversation still needs an address. Something, somewhere, translates
  names into numbers. What is it, who runs it, and what would happen if it
  lied?
- Your whitelist works because Mojang's account system vouches for names. What
  would it take to build access control that doesn't depend on *any* company
  vouching for identities? People have tried for decades — what exists, and
  why hasn't any of it simply won?

---

## What you have now

- Someone on your wifi can join your server by its local address, and you can
  find your Mac's address on demand, two ways
- People outside your house can join too, through a route you chose and can
  explain — overlay, tunnel, or forwarded port — and you know the route is
  infrastructure now: server, route, and client each fail independently, and
  the log tells you which one did
- The whitelist is on, `online-mode` is on, your real players are listed, and
  you have *watched* a non-listed account bounce — the door is open with a
  guest list, and you can add and remove people live from the console
- Diagnostics that outlast Minecraft: fast-no versus silence for "not
  listening" versus "not reachable," and the silent-log test for "path
  problem" versus "server problem"
- Two words — authentication and authorization — attached to things you
  observed, the house rule that guests don't get op, and the standing rule
  that any server strangers can reach keeps `online-mode=true`
