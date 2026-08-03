# The server is yours to change

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

In your server's folder sits a file called `server.properties`. It is a list of
decisions: how hard the world is, how many people can join, whether players can hurt
each other, what the server says about itself to anyone who looks at it. Every line
was chosen by someone — and none of the lines are locked.

This session is about reading that entire file, changing pieces of it, and watching
the world obey. It's a small file. The habit it teaches is not small: settings files
like this one are everywhere — nearly every program on your computer keeps one
somewhere — and once you've bent one of them to your will, the rest stop looking like
machinery and start looking like levers.

---

## Before you start

You need:

- **A server you can start and stop.** [Running your own server](../running-your-own-server/guided.md)
  gets you there. Quick check: start your server, watch for the **Done** line, type
  `stop`, watch it save and exit.
- **A code editor.** Set up in [Setting up a coding machine](../dev-machine-setup/guided.md).
  Quick check: you can open your server's folder in VS Code and see its files in the
  sidebar.

---

## What you'll have at the end

By the end of this session you will have:

- Read every setting your server has — all of them — and sorted them into what you
  understand, what you can guess, and what's still a mystery
- Given your server a name and message that anyone in the house can see from their
  multiplayer screen, without even joining
- Changed the rules of the world on purpose and verified the change with your own
  eyes
- Taken one setting you'd never heard of, researched it yourself, predicted what it
  would do, and proven yourself right or wrong

---

## New tools

**A settings file** (also called a config file, short for configuration) is where a
program keeps its decisions written down — so the program can read them, and so you
can. `server.properties` is plain text, one decision per line, in the shape
`key=value`: the name of a setting, an equals sign, and what it's currently set to.
Lines starting with `#` are comments — notes meant for humans, which the server skips.

You already have everything needed to edit it: VS Code opens it like any text file.
The working rhythm for this whole session is **edit → save → restart the server →
check**. Why the restart is in there is something you're about to discover rather
than be told.

**The minecraft.wiki reference.** There is a page on minecraft.wiki called
"server.properties" that documents every key the server understands. It's the
complete map of this file. You'll be told when it's time to open it — the first part
of this session is deliberately done without it.

---

## Predict

Write your answers down first:

- How many settings do you think the server has in this file? An actual number.
- You watched the server create this file on its first run. If you deleted a line
  from it, what do you think would happen on the next start?
- If you could change one thing about your server right now — anything — what would
  it be? Keep the answer; you'll check at the end whether this file could have done
  it.

---

## The work

### Read every line

Stop your server if it's running. Open `server.properties` in VS Code and read the
whole thing, top to bottom. Out loud is allowed and honestly recommended.

No looking anything up — that comes later. Instead, make three lists on paper:

- **Could explain:** you could tell another person what this setting does
- **Could guess:** the name suggests something, but you wouldn't bet on it
- **No idea:** the name means nothing to you yet

Every key goes on exactly one list. Count them while you're at it and check your
prediction. When you're done you'll have something most people who run servers never
make: an honest map of the edge of your own knowledge, with everything past the edge
written down and findable.

### Rename the world's front door

Somewhere in that file is the text your server shows to anyone who sees it in a
multiplayer server list. Your goal: make that screen show words you chose — and
verify it **without joining the server**.

<details>
<summary>Stuck? Start here</summary>

Most keys in the file control how the server *behaves*. You're looking for one
that controls what it *says about itself*. Skim the left-hand sides of your three
lists again with that question.

</details>

<details>
<summary>Naming it — and the real puzzle</summary>

The key is `motd` — "message of the day." Change its value to anything you like and
save.

Now the real puzzle. If your server was running while you edited, look at the
multiplayer screen: nothing changed. The file on disk says one thing, the server is
showing another. When did the server last actually *read* this file?

</details>

<details>
<summary>Making it land</summary>

The server reads `server.properties` once, at startup, and keeps a copy in memory.
Your edit changed the disk; the running server never looked back at it. Restart —
`stop`, then start it again — and refresh the multiplayer screen.

</details>

When it lands, notice what you've done: anyone in the house who opens their
multiplayer screen now sees your words, before they ever join. That's the server
introducing itself the way you told it to.

### Change the rules of reality

Pick one, whichever you can verify today:

- **`difficulty`** — the values it takes are `peaceful`, `easy`, `normal`, `hard`.
  Verifiable alone: switch a night-time world to peaceful and watch what happens to
  the monsters.
- **`pvp`** — whether players can damage each other. Verifiable if someone else can
  join you for two minutes, which also happens to make the demonstration better.

Before you restart: write down exactly what you expect to be different in the world,
specifically enough that you could be wrong. Then restart, join, and check.

### Take one mystery off your list

Now the wiki. Open the **server.properties** page on
[minecraft.wiki](https://minecraft.wiki) — search the site for `server.properties` —
and find your *no idea* list in it.

Pick the key that sounds most interesting. Read what the wiki says it does. Write a
prediction: what will observably change if you alter it? Change it, restart, and go
find out.

Whatever happened, you just ran the loop that works on every program you will ever
meet: unknown setting → find the reference → predict → change → observe. Nobody
showed you this one. That was the point.

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Feed it nonsense.** Stop the server. Set `difficulty=banana`. Start it, and find
out what a server does with a value it can't use — read the log around startup, and
afterwards open `server.properties` again and look closely at that line. Whatever
you find, you now know something you measured yourself: how *this* program treats
bad input. Programs differ on this — some refuse to start, some complain and carry
on, some quietly fix the file. Knowing which kind you're dealing with is always
worth one broken value. Put it back when you're done.

**Move the front door.** Change `server-port` to `25570` and restart. Now try
joining from your saved server entry — it fails, even though the server is running
and healthy. It didn't vanish; it's listening at a different number, and your game
is knocking on the old one. Reach it anyway: edit the server entry's address to
`localhost:25570` — an address and a port, joined by a colon, which is how you name
a *specific program's door* on a machine rather than just the machine. Then change
the port back, because defaults exist so nobody has to remember numbers.

---

## What just happened

Every long-lived program on your computer does what your server just did: keep its
decisions in a file, read the file once at startup, and run from the copy in memory.
That's the whole reason your motd edit didn't land until a restart — the disk
changed, the memory didn't. It's also why "have you tried restarting it?" is a real
diagnostic question and not a joke: a restart forces a program to re-read its
written-down decisions.

`key=value` is one of a small family of shapes settings files come in. You'll meet
the others soon — datapacks will hand you one called JSON — but the idea never
changes: the behavior of a program is data, data lives in files, and files can be
edited.

One more thing worth knowing about the trick you pulled with the motd. Your change
showed up on the multiplayer screen *without anyone joining* because that screen is
not a passive list: the game pings every server on it, and each server answers with
its name, its message, its player count. A question and an answer, over the network,
in a fraction of a second — a complete little conversation between two programs.
Later in this course you'll learn to speak that conversation yourself, byte by byte.
For now it's enough to know that when your words appeared on that screen, it's
because your server *said them* to a program that asked.

---

## Go further

- The wiki page documents more keys than your file contains. Why would a file the
  server itself wrote leave out settings the server understands? What happens if
  you add one of the missing ones yourself?
- `level-seed` only affects terrain that hasn't been generated yet. So what happens
  to a half-explored world if you change the seed and then walk somewhere new? Try
  it on a throwaway world — the result is worth seeing once in your life.
- Some servers on public lists have colored, multi-line messages. The `motd` value
  can clearly encode more than plain text. How?
- Which settings can be changed *without* a restart? For that to work, something
  inside the running server would have to overwrite the copy in memory. Find out
  what exists for this — what you find is the subject of a later lesson, and
  there's no harm in arriving early.

---

## What this leaves behind

- You've read the entire settings surface of your server and hold a three-list map
  of it — including an honest *no idea* list, which is a tool, not a confession
- At least three settings changed deliberately: the motd, one world rule, and one
  you researched yourself
- The edit → save → restart → verify rhythm, and the reason the restart is in it
- A server whose multiplayer-screen message is words you chose — visible to anyone
  in the house who looks
