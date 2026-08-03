# The first visitor

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your server has had exactly one player so far: you, joining from the same machine
it runs on. This session gets a second person in — someone on another device in the
house, standing in your world while you watch their arrival scroll past in the
server log.

To do it, you'll meet the home network as a real thing for the first time: the box
in the corner called a router, the numbers it hands out to every device in the
house, and why the trick you used to join your own server — `localhost` — cannot
work for anyone else. It's a small amount of new knowledge, and it's the foundation
that everything about letting people in is built on.

---

## Before you start

You need:

- **A server you can start, stop, and join.** [Running your own
  server](../running-your-own-server/guided.md) gets you there. Quick check: start your
  server, watch for the **Done** line, join it from your own game at `localhost`,
  then type `stop` and watch it save and exit.
- **A second device on the same wifi that can run Minecraft: Java Edition** — and
  ideally a second person to drive it. A housemate's computer works, and so does a
  second machine of your own, but a real person makes the payoff better. Quick
  check: the second device can open the game and load a singleplayer world, and
  both devices show the same wifi network name. Its game version should match
  your server's — you'll predict why in a moment, and choosing versions on
  purpose is [its own decision](../choosing-a-version/guided.md).

If you've been through [The server is yours to change](../server-settings/guided.md), you've
already met the `address:port` idea from moving the server's front door — it comes
back today. If you haven't, it gets explained here from scratch.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. For connection mysteries, start with [Isolating a problem](../../../../reference/isolating-a-problem.md).

---

## What you'll have at the end

By the end of this session you will have:

- A second person (or second device) joined to your server across the home network
- Watched a visitor's arrival from the server's side of the conversation
- Found your Mac's address on the home network, and understood who gave it that
  address and why
- Caused the two classic connection failures on purpose — and learned to tell them
  apart by how they fail, a diagnostic you will use forever

---

## New tools

No new software this session. Two new ideas instead, both given straight:

**The router.** The box that runs your home wifi is a computer, and its whole job
is passing messages between the devices in the house — and between them and the
internet. Part of that job is bookkeeping: every device that joins the network asks
the router for an address, and the router assigns one. (The system for this has a
name, DHCP, which you'll mostly never need — but "the router hands out the numbers"
is worth keeping.)

**Local addresses.** The number the router assigns is called a local address (or
private address): four numbers separated by dots, usually starting with `192.168.`,
sometimes `10.` or `172.`. Every device in the house has one. It's how machines on
the same network name each other — which is exactly what `localhost` couldn't do,
because `localhost` is a special name every computer reserves for *itself*.

One more thing worth knowing before it happens: the first time another machine
connects to your server, macOS may show a dialog asking whether `java` may accept
incoming network connections. That's the operating system's firewall checking
before a program opens a door that other machines can knock on — a reasonable thing
to check. The program in question is your server, so allowing it is the right
answer. If the dialog never appears, nothing is wrong; not every Mac has the
firewall turned on.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- The second device adds a server with the address `localhost` and tries to join.
  What happens, and why?
- Will the second device's game need to be the same version as your server? What do
  you think happens if it isn't?
- How many devices do you think are on your home network right now — phones,
  laptops, TVs, everything? Write an actual number.

---

## The work

### Watch localhost fail from the second device

Start your server. Then, on the second device, add a server with the address
`localhost` and try to join it. You predicted this — now watch it.

It fails, and the reason is the whole first idea of this session: `localhost`
means "this machine, myself," on *every* computer. When the second device's game
connected to `localhost`, it knocked on the second device's own front door, found
no server living there, and gave up. Your server never heard a thing — check its
log if you want proof.

To reach your machine, the friend's game needs the name the *network* knows your
machine by. Which is a number, and you're about to go find it.

### Find your Mac's number

On the Mac running the server, open **System Settings**, go to **Wi-Fi**, and open
the details of the network you're connected to. Look for the **IP address** — four
numbers separated by dots. That's your Mac's local address, assigned by the router.

If you want to see the same fact from the terminal, this usually prints it:

```
ipconfig getifaddr en0
```

(`en0` is usually the Wi-Fi connection on a Mac laptop. If the command prints
nothing, trust the Settings screen — same fact, more reliable route.)

Write the number down and look at its shape. Probably `192.168.`-something. Every
device in your house has a number like it, from the same router, and any of them
can use this one to name your Mac.

### Get the visitor in

Your goal: the friend joins your world from their device. Server running first —
if in doubt, verify you can still join from your own game.

<details>
<summary>Stuck? Start here</summary>

The Add Server screen on the friend's device wants an address. You now hold two
numbers: which *machine* on the network — you just wrote it down — and which
*door* on that machine your server listens at, which you've known since the day a
second server refused to start because the first one was holding it.

</details>

<details>
<summary>The syntax</summary>

An address and a port, joined by a colon: `address:port`. It's the same shape as
`localhost:25570` from when you [moved the server's front
door](../server-settings/guided.md) — the address names the machine, the port names the
program's door on it. Which address, and which port, for your server?

</details>

<details>
<summary>The full answer</summary>

`<your Mac's local address>:25565` — for example `192.168.1.23:25565`, but with
the actual number you wrote down. The friend adds that as the server address and
joins. If macOS asks whether `java` may accept incoming connections, that's the
firewall question described earlier — allow it.

</details>

One of your predictions gets settled here. If the two games are different
versions, the join is refused — and the message on screen tells you which side
is behind. The two ends of a connection have to speak the same version of the
game's language, which is part of why
[choosing a version](../choosing-a-version/guided.md) is a real decision rather than a
default.

### See it from the server's side

The moment the friend appears in the world, read your terminal. The server
announced the arrival — the same announcement it made when *you* first joined,
except this time the player is across the room.

Take a minute and actually be two people in one world: stand in front of each
other, place a block, break a block, watch both screens show it. Everything either
of you does is being agreed on by the program running in your terminal. Your world
has its first visitor.

---

## Break it on purpose

Cause each one, watch what happens, undo it.

**Close the world mid-visit.** With the friend standing in your world, type `stop`
in the server terminal. Watch the friend's screen — what does a game show when the
world it was standing in ceases to exist? Then have them try to rejoin while the
server is still down, and notice how quickly that attempt fails. Start the server
back up and let them rejoin. What you saw: the visitor's whole world lives in your
terminal window, and a machine with no server still *answers* — it just says no,
fast.

**Knock on the wrong door.** Have the friend edit their server entry's port to
`25570` — a door nothing is listening at — and try to join. Watch how quickly the
failure comes back, and what kind of message it is. Put `25565` back.

**Knock on the wrong house.** Now have them edit the address itself: change the
last of the four numbers to one no device in your house is likely to own, like
`.250`, and try again. This failure behaves differently. Watch what the game does
*while* it's failing, and roughly how long it takes to give up. Restore the real
address, rejoin, confirm everything still works.

Now compare the two failures, because the difference is the actual lesson. Wrong
door failed **fast**: a real machine received the knock and answered "no program at
that door." Wrong house failed **slow**: nobody answered at all, and the game
waited until it lost hope. A fast no means *reachable, but not listening*. Silence
means *not reachable at all*. Those are different problems with different fixes,
and you can now tell them apart before reading a single error message.

---

## What just happened

Follow one click the whole way. When your friend pressed Join, their game wrapped
"I'd like to connect" in a small parcel of data — a packet — addressed to your
Mac's number and port 25565. Their device radioed it to the router. The router — a
computer doing its one job — read the address and passed the packet to your Mac.
Your Mac looked at the port and handed it to whichever program was listening on
door 25565: your server. Every block placed and every step taken since is more
packets on the same path, in both directions, continuously. When you joined via
`localhost`, the conversation never left your machine; this one crosses the air in
your house twice per message.

Now the fact that sets up everything that comes next. That `192.168` number only
means something *inside* your house. Those address ranges are reserved for private
networks, and the same numbers are in use in millions of homes at once — your
`192.168.1.23` and your neighbor's are different machines with the same name.
That's why the routers that make up the internet refuse to carry those addresses:
there would be no way to know whose was meant. A friend in another house typing
your local address gets nowhere.

Your home shows the internet a different face — one single address for the whole
house. How a visitor gets through *that* is [the next
lesson](../joining-from-outside/guided.md).

---

## Go further

- Your router has an admin page that lists every device it has handed an address
  to. Find it — the router's label or its manual says how, and every model is
  different, so the router's own documentation is the source. How close was your
  device-count prediction, and what's on your network that you forgot existed?
- Does your Mac keep its number forever? What might cause the router to hand it a
  different one someday — and if that happened, what exactly would break? Find out
  whether your router can be told to always give your Mac the same address.
- A phone with wifi turned off isn't on your home network — it's on the cell
  network. Try joining from a phone on cellular data using the same `192.168`
  address. Before you do: you know enough now to predict the failure mode. Fast or
  slow?
- When you visit `minecraft.wiki`, you type a *name*, not four numbers — yet the
  conversation still needs an address. Something, somewhere, translates names into
  numbers. What is it, who runs it, and what would happen if it lied?

---

## What you have now

- Someone on your wifi can join your server by its local address — your world has
  had a real visitor
- You can find your Mac's address on the home network on demand, two ways
- Words later lessons will use freely: router, local address, and the
  fast-no-versus-silence way of telling "not listening" from "not reachable"
- One open question, on purpose: the local address is meaningless outside the
  house — so how does anyone visit from the internet? That's exactly where
  [the next lesson](../joining-from-outside/guided.md) picks up
