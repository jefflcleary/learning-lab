# A learning lab

This is a collection of hands-on curricula for learning about computers —
programming, networking, operating systems, engineering, and how any of it actually
works. The method is the same everywhere: you learn by doing things to real systems,
and every session ends with something you can see working, and usually something
other people can see too.

This page explains how the repo works. That's all it does.

## Curricula

A **curriculum** is an ordered set of lessons linked by a common theme. Each lives in
its own folder under `curricula/`, with its own front page and its own suggested
path. Current curricula:

- **[Running a Minecraft server](curricula/minecraft-server/README.md)** — from
  changing one settings file to writing bots, reading binary world data, speaking
  network protocols by hand, and putting a live status page on the family's phones.

More will appear. Curricula are independent — start with whichever one is about a
thing you care about.

## How lessons work

Every lesson lives in its own folder inside a curriculum. Inside a lesson folder
you'll find:

- **`guided.md`** — the main version of the lesson. Start here.
- **`reference.md`** — a compressed version with just the commands and decisions. It
  exists for some lessons, mostly ones about installing things. Useful if you already
  know your way around a computer, or for an adult setting things up on a learner's
  behalf.
- **`core.md`** — working notes used to write the lesson. Not part of the course. You
  can read it if you're curious how the lessons are made, but expect spoilers: it
  contains the answers.

Lessons don't have numbers and you don't have to do them in order. Each one starts by
telling you what it assumes — not as "finish lesson three first" but as facts about
your setup, like "you need a server you can start and stop," with a link to the
lesson that gets you there. If the assumptions hold, you can do the lesson, whatever
route you took. Each curriculum has a `PATH.md` with a suggested order for anyone
who'd rather be handed one.

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

## Two other files worth knowing about

- [HOW-TO-LEARN.md](HOW-TO-LEARN.md) — a short set of habits that make everything in
  this repo work better, whatever you're learning. Worth reading before your first
  lesson.
- [walls.md](walls.md) — your log of every wall you hit. What that's for, and why
  it's worth the thirty seconds, is explained inside it.

## Whose repo is this?

Yours. Clone it, write in it, keep your notes and decisions in it. Some lessons will
ask you to record things here — which choices you made and why — because in three
months you will not remember, and written-down reasoning is the difference between a
setup you own and a setup you're afraid to touch.

The `authoring/` folder in the repo is for people writing new lessons and curricula.
It's not part of any course and you can ignore it completely.
