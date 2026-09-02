# A learning lab

This is a collection of hands-on modules for learning about computers — programming,
networking, operating systems, and how any of it actually works. The method is the
same everywhere: you learn by doing things to real systems, and every session ends
with something working that you can see, and usually that other people can see too.

## The modules

A **module** is a set of lessons connected by a theme. Each module has a front page
describing what you'll build and a recommended path through its lessons. Modules are
independent — start with the one about a thing you care about.

- **[Setting up a dev machine](modules/dev-machine/README.md)** — a machine ready to build with: an
  editor, a way to run code, version control, and enough terminal to move around.
  Other modules assume this one.
- **[Running a Minecraft server](modules/minecraft-server/README.md)** — from
  changing one settings file to writing bots, reading the world's raw data, speaking
  a network protocol byte by byte, and putting a live status page on the phones in
  your house.
- **[Building a collection tracker](modules/collection-tracker/README.md)** — from
  a blank Google Sheet to a trading-card tracker that knows what your collection is
  worth, what you owe, and whether packs beat singles — and eventually updates
  itself.
- **[Running your server on a rented machine](modules/remote-server/README.md)** — rent
  a Linux machine you'll never see, lock it down, move a world onto it, and teach it to
  start itself: SSH, keys, users, firewalls, and services.
- **[Finding out why a server is slow](modules/server-performance/README.md)** —
  what "laggy" actually means, how to measure it, and how to find the cause: break a
  server on purpose six ways and identify each one from the numbers, then make it
  faster and prove you did.

## How lessons work

Lessons don't have numbers, and you don't have to do them in order. Each one starts
by telling you what it assumes — not as "finish lesson three first" but as facts
about your setup, like "you need a server you can start and stop," with a link to
the lesson that gets you there. If those facts hold, you can do the lesson, whatever
route you took. Each module's [recommended path](modules/minecraft-server/PATH.md)
is there for anyone who'd rather be handed a sensible order.

Some lessons come in two versions: the main version, which teaches, and a compressed
version with just the commands and decisions. Compressed versions are collected under
Quick references in the module they belong to, for anyone already comfortable with the
material or an adult setting things up on a learner's behalf. Lessons don't link to
them — if you're here to learn the thing, the teaching version is the one to work
through.

## Hints

Inside a lesson, hints look like this:

<details>
<summary>Stuck? Open this</summary>

Hints are collapsed so you can't read them by accident. Open them one at a time, in
order, and only after you've actually tried. The first hint is a nudge; each one
after it gives away more.

</details>

Everything else in a lesson — what a tool is, how to install it, where files go — is
stated plainly. Hints only ever hide the part you're meant to figure out.

## Before your first lesson

Two short pages are worth reading first:

- **[How to learn here](HOW-TO-LEARN.md)** — the habits that make everything in this
  lab work better, whatever you're learning.
- **[Your logbook](logbook.md)** — the one piece of writing you'll keep as you go:
  predictions before you run things, and a record of every wall you hit.

There's also a Reference section — short pages on the craft that transfers
everywhere, starting with [When you're stuck](reference/when-youre-stuck.md).
Lessons point there when their own hints run out; it's worth knowing it exists
before you need it.

## About this project

Curious how this material is made, want to read it offline, or working on the
material yourself? [How this project is put together](about-this-repo.md) covers
the layout, previewing changes locally, and publishing them.
