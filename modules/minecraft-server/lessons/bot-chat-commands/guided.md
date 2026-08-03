# Teaching it to take orders

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your bot reacts to two exact words. That's a trick. This session turns the trick into
an **interface** — a surface through which other people can operate a program. By the
end, anyone on your server can command the bot in chat: tell it to come, to stay, to
say things, to report who's online — and the difference between those two states is
one skill: taking a message apart.

A chat message arrives in your handler as a single string. Strings can be split,
compared, and sliced, and once they can, "say hello there" stops being a blob of text
and becomes a command with cargo. That's the work today. It's the same work every
program that listens to humans does, and by the end you'll know that in a specific,
earned way.

This session also includes a reading assignment — the whole map of what a bot can
react to. It's placed here on purpose: you've had two successes, and it's time to see
how much surface you haven't touched yet.

As always: this code is typed by hand, not pasted.

---

## Before you start

You need:

- **A bot with events and state** — one that follows you on "come" and stops on
  "stay", running against your sandbox server. That bot is built in
  [Making it care where you are](../bot-follows/guided.md), which also carries the sandbox
  requirements (a version the library supports, `online-mode=false`, and the standing
  rule: that sandbox never gets exposed to the internet).

Quick checks: `node bot.js` brings the bot into the world; saying `come` in chat
makes it walk to you; `stay` stops it.

---

## What you'll have at the end

By the end of this session you will have:

- A bot with a real command language — `come`, `stay`, `say <anything>`, `who` —
  usable by anyone in the chat, not just you
- Caused an infinite feedback loop in public chat on purpose, watched it run away,
  stopped it, and guarded against it forever
- Written your first defensive check — code that survives being used wrong
- Read the complete list of everything a bot can react to, once, end to end, and
  wired up one event you chose yourself

---

## New tools

No new installs today. The new tool is what strings can do.

You've been using strings since `'localhost'` — any text in quotes is one. What's new
is that strings come with built-in abilities: they can report whether they start with
something, hand themselves over in lowercase, strip stray spaces off their ends, and
— the one that matters most today — **split** themselves into an array of words.
Arrays, in turn, can give you everything-from-position-N onward, and glue themselves
back into one string.

The handful you'll want today, by name: `trim`, `split`, `toLowerCase`,
`startsWith`, `slice`, `join`, and `Object.keys` (which hands you an object's keys as
an array — remember that the bot keeps a directory of players as an object). The
authoritative reference for what each one takes and returns is
[MDN](https://developer.mozilla.org) — search "MDN" plus the method name. Looking
methods up there is not a fallback; it's how JavaScript is written by everyone.

One structure completes the kit: the `if / else if / else` chain. Branches are
checked in order, exactly one runs. A chain of them is how one arriving message gets
routed to the right response — you'll hear the name for this shape at the end.

---

## Predict

Write these in [your logbook](../../../../logbook.md) first:

- `say hello there` has to make the bot chat `hello there`. Your handler receives
  the whole message as one string. In plain words — no code — what has to happen to
  that string, step by step, before the bot can act on it?
- The bot speaks into the same chat it listens to. Does it hear itself? What could
  that lead to? Don't look it up — you'll find out the memorable way.
- Later you'll read the complete list of events a bot can react to. How many do you
  think there are? Write an actual number.

---

## The work

### Rebuild your handler as one dispatcher

Right now your chat handling grew organically — a check for "come" here, a check for
"stay" there. Rebuild it: **one** chat handler that splits every incoming message
into words and routes it through a single `if / else if / else` chain.

Success looks like: `come` and `stay` work *exactly as before*. Nothing visibly
changes.

That's worth saying plainly: you're going to do real work and the demo will look
identical afterwards. Restructuring working code into a shape that can grow — without
breaking what already works — is a large fraction of what programming actually is,
and "the old behavior survived" is the test that you did it right.

<details>
<summary>Hint</summary>

`trim` the message, then `split(' ')` it — now you have an array of words. The first
word is the command; compare it branch by branch with `if / else if`. The bodies of
your existing "come" and "stay" code become the bodies of two branches. MDN has the
exact behavior of every method named here.

</details>

### `say <anything>` — a command that carries cargo

Add `say`. Success looks like: `say hello there` makes the bot chat `hello there` —
whatever follows the word `say` comes out intact, spaces and all.

This is the step up from everything before it: the command is no longer the whole
message. Word one says *what to do*; everything after it is *what to do it with*.

<details>
<summary>Hint</summary>

The payload is everything after word one. Arrays have a method that gives you
"everything from position N on," and another that glues an array back into one
string using a separator you choose — both on MDN. If `hello there` comes out as
`hello,there`, you glued it back with the wrong separator.

</details>

### `who` — ask the bot who's online

Add `who`. Success looks like: anyone says `who`, and the bot chats the names of
everyone currently on the server, in one message.

<details>
<summary>Hint</summary>

The bot already holds this answer — the same players directory you used to find who
to follow. It's an object keyed by username; `Object.keys` turns an object's keys
into an array, and you just learned how to glue an array into one string. One thing
worth noticing in the output: does the bot count itself?

</details>

### Read the whole events list, then wire one

Now the reading. Open the mineflayer API documentation — it's in the
`PrismarineJS/mineflayer` repository on GitHub — and find the section listing
**events**. Read the entire list. Every name, one pass, top to bottom.

You are not hunting for anything. You're finding out how big the surface is. Your
bot currently reacts to two or three events out of — well, check your prediction.

Then: pick the one event that sounds most interesting to you — genuinely your pick —
and make the bot do something, anything, when it fires. Chat one line, at minimum.

Success looks like: you can say roughly how many events exist, name three that
surprised you, and demonstrate the one you wired.

<details>
<summary>Hint</summary>

Each entry in the events section states what arguments your handler receives.
Wiring is the same `bot.on(name, handler)` shape you've used all session. The
reading is the work; there's nothing else to unlock here.

</details>

---

## Break it on purpose

Two experiments. Cause each one, read what happens, then fix it properly.

**Let it hear itself.** Give your dispatcher an `else` branch that answers *every*
unrecognized message — something like replying "unknown command" — and make sure
there's no line anywhere that skips messages from the bot itself (if you carried one
in from the library's example code back in your first bot, comment it out — that
line is exactly what's under test). Now say something the bot doesn't recognize, and
watch what happens.

If the bot hears its own chat, then its reply is itself an unrecognized message —
which triggers a reply, which triggers a reply. You'll know it when you see it. It
runs at machine speed, in public, and it does not get bored. Stop it with Ctrl-C in
the bot's terminal — or watch whether the server stops it for you first; servers
have opinions about chat flooding, and what yours does is worth knowing.

The permanent fix, now earned rather than copied: the first line of your handler
checks whether the speaker is the bot itself, and if so, does nothing. One line.
Every echo system, every auto-reply, every notification bot ever built has this
exact failure mode — a program that reacts to a channel it also writes to will
eventually meet itself. You now know precisely what that one line guards.

**Give an order with nothing in it.** Say `say` — just the word. Depending on how
you parsed, the bot chats emptiness, produces nonsense, or crashes. Read whatever
appears, including nothing.

The lesson: input from humans arrives malformed — routinely, innocently, forever.
Code that reaches for "the rest of the message" has to first ask whether there *is*
a rest. Fix it with a check: if there's no payload, reply with something civil
("say what?"). That's your first defensive check, and it marks the difference
between code that works when used correctly and code that works.

---

## What just happened

What your handler does now — **read, split, decide, act** — is not a bot trick. It
is what every program that takes human input does. The terminal you've typed into
since your first lesson does exactly this: reads your line, splits off the first
word, finds what
that word names, hands the rest over as arguments. That loop was described to you
back in [Setting up a coding machine](../../../setup/lessons/dev-machine-setup/guided.md); today you built one.
The server console you drove in [Talking to a running server](../console-commands/guided.md)
— same shape. Chat app slash-commands, search boxes, every shell on every machine:
read, split, decide, act.

The if/else chain playing this role has a name: a **dispatcher** — the one place
where messages arrive and get routed to the code that handles them.

And one thing to merely notice, not solve: four commands make a tidy chain. Imagine
forty. The chain gets long, every command's code lives inside one giant function,
and adding anything means scrolling past everything. You don't have that problem yet
— but feel where it would come from. Noticing what gets hard as things multiply is
where the next tier of program structure comes from, and it can wait until it's
needed.

---

## Go further

- Should `SAY hello` work? Should `Come`? Make the command language
  case-insensitive — and then decide separately whether the *payload* of `say`
  should be case-flattened too. Those are different questions; be sure you're
  answering both on purpose.
- Add a `help` command that lists every command the bot knows. When you add a new
  command next month, what has to happen for `help` to stay truthful? Is there a
  way to build it so it *can't* drift?
- What should happen on an unknown command — silence, a correction, a suggestion?
  There's no right answer; there's your answer. Decide the policy and implement it.
  Mind the self-guard while you do — you know why now.
- Genuinely open: two people give contradictory orders — one says `come`, the other
  immediately says `stay`. What you built is last-word-wins. Is that right? Should
  the bot obey the first speaker, the last, the nearest, an owner? What would
  "rank" even look like in code? Every multi-user system ever built has had to
  answer this, and none of them agree.

---

## What you have now

- A bot with a command dispatcher anyone in chat can use: `come`, `stay`,
  `say <anything>`, `who` — parsing, routing, a payload command, a self-guard, and
  a defensive check for missing input
- You've read the complete mineflayer events list once, end to end, and wired one
  event you chose yourself
- You've caused, watched, stopped, and permanently guarded against an infinite
  feedback loop — the classic failure of any program that listens where it speaks
