# Running a modded server with Fabric

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

You've changed the server three ways so far: its settings, its rules (datapacks),
and from the outside, with programs that connect to it. Mods are the fourth way,
and the deepest — new code loaded *into* the server itself, changing what the game
fundamentally is. Everything the community has built that vanilla can't do — new
machines, new world types, performance engines, admin tools — lives here.

This lesson sets up a second server running **Fabric**, a mod loader, alongside
your vanilla one — which stays exactly as it is, because it's the server people
depend on. You'll install real mods, chosen by you, and you'll do it with a
discipline that matters more than any single mod: checking that a mod fits your
version, your loader, and your players before it ever touches the server. By the
end, friends join a modded server *with the unmodified game they already have* —
and when a mod breaks things, you'll know how to read the wreckage.

---

## Before you start

You need:

- **A server you can start, stop, and join.**
  [Running your own server](../running-your-own-server/guided.md) gets you there.
  Quick check: start it, watch for the **Done** line, `stop` it.
- **The version research skill.**
  [Choosing a Minecraft version](../choosing-a-version/guided.md) — you'll use it
  today, because mods care about versions even more than clients do. Quick check:
  you can say from memory why a tool built for one version rejects another.
- **Worlds are folders you can copy.**
  [Copying and backing up worlds](../worlds-and-backups/guided.md). Quick check:
  you can say why the server must be stopped when you copy a world you intend to
  trust.
- **You know two servers can't share a port** — you proved it the day you started
  one server twice.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This lesson leans on real documentation — [Finding the real documentation](../../../../reference/finding-the-docs.md) helps when searching turns up noise.

---

## What you'll have at the end

By the end of this lesson you will have:

- A second server running Fabric, in its own folder, with your vanilla server
  untouched
- At least three mods you chose yourself, installed, verified, and running
- Friends joining a modded server with zero changes on their side
- Two mod failures caused on purpose, diagnosed from the log, and undone —
  so the first accidental one is a known consequence

---

## New tools

**A mod loader** is a modified server program that loads community code — mods —
at startup. The server stops being one program and becomes a platform. Two big
loader families exist as of this writing: Fabric and Forge/NeoForge; which is
thriving is exactly the kind of fact that shifts, and checking the current state
is part of today's work. This module uses **Fabric**: it's lightweight, and it
tracks new Minecraft versions quickly. It comes from
[fabricmc.net](https://fabricmc.net), whose own server instructions are the
authoritative install source — getting it running is part of the work below.

**Fabric API** is a mod that most other Fabric mods depend on — the loader's
standard library, shipped as a mod. You'll install it first, and later you'll
break it on purpose to see what depending on something really means.

**Modrinth** and **CurseForge** are the sites where mods live. Modrinth's filters
are the part that matters today: you can filter by loader, by game version, and by
**environment** — whether a mod runs on the server, the client, or both. Each
mod's own page documents its requirements; that page, not a video or a forum
post, is where a mod's truth lives.

One concept before anything installs, because it decides who can join your server:

**Server-side vs client-side.** Some mods run entirely on the server — performance
engines, admin tools, many gameplay tweaks. Players join with the completely
unmodified game and everything works, because the server owns what's true. Other
mods add things the *client* has to draw — new blocks with new looks — and those
need a matching mod installed in every player's game. Today steers hard toward
server-side mods, because your social loop — friends joining with whatever they
already have — is worth protecting.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- What can't a server-side-only mod do, that a client mod can? Reason it out from
  who owns what.
- You'll copy your vanilla world into the modded server. Will it just open?
  What's your reasoning?
- A mod built for a different Minecraft version lands in the mods folder. What
  happens at startup — refuses to run, runs without the mod, or something else?

---

## The work

### Stand up the Fabric server

Make the folder — `~/projects/fabric-server` — and pause on a real decision:
**which Minecraft version.** You made this call once for the whole family; mods
add a wrinkle, because a mod ecosystem takes time to arrive on each new version.

<details>
<summary>How to decide with data instead of hope</summary>

Before committing, spend two minutes on Modrinth: filter by Fabric and the
version you're considering, and look at how much exists. A version with a thin
mod shelf is a fine reason to pick the previous one — and if you ever want your
bots to visit this server too, the sandbox version from your earlier decision
does double duty.

</details>

Then get Fabric's server for that version from fabricmc.net — follow the site's
current server instructions rather than any steps written here, because the
mechanism moves. You'll end up with a launch jar in your folder; start it the way
you've started every server, and handle what it asks of you on first run (you've
read this story before, and you know where the answer lives).

You're up when the log prints its **Done** line — and notice the log already looks
different from vanilla's: the loader announces itself.

### Bring a world — on your terms

Two honest options, both fine:

- **A fresh world.** Nothing to lose, ever. The modded server is an experiment
  station.
- **A copy of your vanilla world.** Stopped server, the copy command you know,
  and point this server's `level-name` at it. It opens unchanged — vanilla and
  Fabric agree on what a world looks like.

One thing said plainly before any mod touches a world you copied: **this road can
be one-way.** Once mods that add content have written into a world, removing them
leaves holes where their content was. That's exactly why the original world folder
stays where it is, and only copies come here.

### Install Fabric API, then mods you chose

First, Fabric API: find it on Modrinth, matching your Minecraft version and
loader, and put the downloaded `.jar` in the `mods/` folder next to the server
jar. Mods are read at startup — you know what that means by now.

Now the real goal: **three more mods, running, all server-side, chosen by you.**
Not from a list in this lesson — from the filters. Two categories that reliably
have strong server-side options: performance, and admin or utility tools. Pick a
third category yourself.

<details>
<summary>The search discipline</summary>

On Modrinth, set three filters before you look at a single mod: loader (Fabric),
your game version, and server environment. Everything the filters exclude would
have wasted your evening. Then judge candidates the way you judged mineflayer
once: the project's own page, its supported versions, when it was last updated,
whether its issues are being answered.

</details>

<details>
<summary>Verifying a mod actually loaded</summary>

The startup log is the roll call — Fabric reports what it loaded. Find your mods
named there. Then verify in the world where a mod has a visible effect; a
performance mod may only show up as the absence of a problem, which is worth
noticing about performance work in general.

</details>

### Prove the vanilla-client promise

Join from your completely unmodified game. Everything works — that's server-side
modding keeping its promise. If your vanilla server happens to be running at the
same time, notice what had to be different for both to coexist; you learned that
number's name a long time ago.

Then the payoff: anyone in the house joins the modded server exactly the way they
joined the vanilla one. Nothing to install, nothing to explain — the server just
does more than it used to.

---

## Break it on purpose

Cause both, read everything, undo.

**The wrong-version mod.** Deliberately fetch a mod for a *different* Minecraft
version — the filters you just learned, pointed the wrong way — drop it in
`mods/`, and start the server. It won't come up. Read the failure top to bottom:
Fabric's startup errors are among the most explicit you'll meet anywhere — they
name the offending mod, what it wanted, and what it found. Remove the file,
restart, recovered. The compatibility triple isn't advice; it's enforced, loudly,
and the log is the diagnosis.

**Pull the floor out.** Take Fabric API *out* of `mods/` while a mod that needs
it stays. Start, and read a different kind of error: a dependency report, naming
exactly what's missing. Put it back. You've met dependencies before — a folder
full of other people's code arriving on your disk — but this is the other half of
the idea: things that *declare* what they need, and a system that checks before
running. Same concept, enforced at startup instead of install.

---

## What just happened

A loader is a program that runs other people's code inside its own process. That
sentence explains everything else you saw today. It's why compatibility is strict:
mods reach into the game's internals, and the internals shift with every version —
the same reason community tools lag releases, but for code instead of network
messages. It's why dependencies get declared and checked: code built on other code
has to say so. And it's why server-side versus client-side falls exactly along a
line you've known since your first `localhost` join — the server owns what's true,
so truth-side changes need nothing from the players; looks live in the client, so
new looks need both sides.

Your setup now has three tiers of change, from shallow to deep: settings and
datapacks reconfigure the game; bots and scripts act on it from outside; mods
change what it is. Each tier costs more care than the last — today's version
discipline is what that care looks like — and each opens rooms the previous one
can't reach.

---

## Go further

- Find a mod that genuinely requires the client too. Install its server half
  anyway and join vanilla: what exactly breaks, and how does it fail — loudly or
  quietly? (The modded server is the right place to find out.)
- Performance mods promise a lot. How would you *measure* whether one actually
  helped your server, rather than trusting its description? What would you record
  before and after?
- Pick something you built as a datapack. Could a mod do it better? Where exactly
  is the line between the two surfaces worth crossing?
- Genuinely open: loader ecosystems rise and fall. What does the Fabric ecosystem
  look like right now compared to when this lesson was written — and how would
  you even establish that? Whatever you find is dated the day you find it.

When you want the next tier — writing a mod of your own — that's
[Creating your own Fabric mod](../creating-a-fabric-mod/guided.md).

---

## What you have now

- A Fabric server with mods installed, in its own folder, with the vanilla server
  untouched — and the production/development split now physical: two servers,
  two jobs
- The compatibility discipline: loader + version + environment checked before
  anything is installed, from the mod's own page
- Two mod failures you can recognize on sight, because you caused both and read
  the logs that explain them
