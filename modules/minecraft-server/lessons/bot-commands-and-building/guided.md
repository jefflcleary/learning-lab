# Bot chat commands and building with loops

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your bot reacts to two exact words. That's a trick. This session turns the trick
into an **interface** — a surface through which other people can operate a program
— and then gives that interface something worth operating. By the end, anyone on
your server can command the bot in chat: tell it to come, to stay, to say things,
to report who's online — and to build. `tower 30` in chat, and a thirty-block
pillar assembles itself in about a second.

Two skills carry the session. The first is taking a message apart: a chat message
arrives in your handler as a single string, and once strings can be split,
compared, and sliced, "say hello there" stops being a blob of text and becomes a
command with cargo. The second is the **loop** — the piece of programming that
makes a computer repeat something, as many times as you say, without getting
bored. Every large structure on every server you've ever admired was built by
hands or by loops. There is no third option. Today you get the second one.

This session also includes a reading assignment — the whole map of what a bot can
react to. It's placed here on purpose: you've had successes, and it's time to see
how much surface you haven't touched yet.

As always: this code is typed by hand, not pasted.

---

## Before you start

You need:

- **A bot with events and state** — one that follows you on "come" and stops on
  "stay", running against your sandbox server. That bot is built in
  [Writing your first bot](../writing-your-first-bot/guided.md), which also carries the
  sandbox requirements (a version the library supports, `online-mode=false`, and
  the standing rule: that sandbox never gets exposed to the internet).
- **The ability to make someone an operator from the server console.** Covered in
  [Server settings and console commands](../server-settings-and-console/guided.md).
- **A place you can wreck.** This should be your sandbox server, not a world
  anyone loves. Today involves deliberately making a mess.

Quick checks that you're ready:

- `node bot.js` brings the bot into the world; saying `come` in chat makes it walk
  to you; `stay` stops it.
- In the server console, you can run `op` followed by your own username and see
  the confirmation.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A bot with a real command language — `come`, `stay`, `say <anything>`, `who`,
  `tower <n>` — usable by anyone in the chat, not just you
- Written your first loop — and felt the moment where changing one number turns
  ten blocks into a hundred
- A wall built by a loop inside a loop, and a hollow room built by a decision
  inside a loop
- Caused an infinite feedback loop in public chat on purpose, watched it run away,
  stopped it, and guarded against it forever
- Deliberately unleashed a runaway build, killed it, and cleaned up after it — so
  "the computer did exactly what I said" is something you've felt, not just heard
- Read the complete list of everything a bot can react to, once, end to end, and
  wired up one event you chose yourself

---

## New tools

No new installs today. The new tools are things JavaScript and the game already
had waiting.

**What strings can do.** You've been using strings since `'localhost'` — any text
in quotes is one. What's new is that strings come with built-in abilities: they
can report whether they start with something, hand themselves over in lowercase,
strip stray spaces off their ends, and — the one that matters most today —
**split** themselves into an array of words. Arrays, in turn, can give you
everything-from-position-N onward, and glue themselves back into one string. The
handful you'll want, by name: `trim`, `split`, `toLowerCase`, `startsWith`,
`slice`, `join`, and `Object.keys` (which hands you an object's keys as an array —
remember that the bot keeps a directory of players as an object). The
authoritative reference for what each one takes and returns is
[MDN](https://developer.mozilla.org) — search "MDN" plus the method name. Looking
methods up there is not a fallback; it's how JavaScript is written by everyone.

**The `if / else if / else` chain.** Branches are checked in order, exactly one
runs. A chain of them is how one arriving message gets routed to the right
response — you'll hear the name for this shape at the end.

**Game commands, and where they're documented.** The building half of this session
leans on `/setblock`, which places one block at a coordinate. Its exact syntax,
and the whole catalog of commands, live on the **Commands** pages of
[minecraft.wiki](https://minecraft.wiki) — search the site for `setblock`. That
page is the reference; keep it open. Two things worth knowing before you read it:
in coordinates, x and z are horizontal and **y is up**, and the debug overlay
shows your own position in the world — press F3 (on many Mac keyboards, fn+F3).

**The mineflayer docs**, at the PrismarineJS/mineflayer project on GitHub, list
everything the `bot` object knows and can do — the API document you met last
session. Today it supplies the events list and the answer to "where does the bot
think it's standing?"

The loop itself arrives mid-session, at the moment it's needed — it's the star,
and it gets its own introduction below.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- `say hello there` has to make the bot chat `hello there`. Your handler receives
  the whole message as one string. In plain words — no code — what has to happen
  to that string, step by step, before the bot can act on it?
- The bot speaks into the same chat it listens to. Does it hear itself? What could
  that lead to? Don't look it up — you'll find out the memorable way.
- Later you'll read the complete list of events a bot can react to. How many do
  you think there are? Write an actual number.
- How long would it take you to place 100 blocks by hand — actually estimate it,
  in minutes. Keep the number; you'll want it later.

---

## The work

### Rebuild your handler as one dispatcher

Right now your chat handling grew organically — a check for "come" here, a check
for "stay" there. Rebuild it: **one** chat handler that splits every incoming
message into words and routes it through a single `if / else if / else` chain.

Success looks like: `come` and `stay` work *exactly as before*. Nothing visibly
changes.

That's worth saying plainly: you're going to do real work and the demo will look
identical afterwards. Restructuring working code into a shape that can grow —
without breaking what already works — is a large fraction of what programming
actually is, and "the old behavior survived" is the test that you did it right.

<details>
<summary>Hint</summary>

`trim` the message, then `split(' ')` it — now you have an array of words. The
first word is the command; compare it branch by branch with `if / else if`. The
bodies of your existing "come" and "stay" code become the bodies of two branches.
MDN has the exact behavior of every method named here.

</details>

### `say <anything>` — a command that carries cargo

Add `say`. Success looks like: `say hello there` makes the bot chat `hello there`
— whatever follows the word `say` comes out intact, spaces and all.

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

The bot already holds this answer — the same players directory you used to find
who to follow. It's an object keyed by username; `Object.keys` turns an object's
keys into an array, and you just learned how to glue an array into one string. One
thing worth noticing in the output: does the bot count itself?

</details>

### Read the whole events list, then wire one

Now the reading. Open the mineflayer API documentation — it's in the
`PrismarineJS/mineflayer` repository on GitHub — and find the section listing
**events**. Read the entire list. Every name, one pass, top to bottom.

You are not hunting for anything. You're finding out how big the surface is. Your
bot currently reacts to two or three events out of — well, check your prediction.

Then: pick the one event that sounds most interesting to you — genuinely your pick
— and make the bot do something, anything, when it fires. Chat one line, at
minimum.

Success looks like: you can say roughly how many events exist, name three that
surprised you, and demonstrate the one you wired.

<details>
<summary>Hint</summary>

Each entry in the events section states what arguments your handler receives.
Wiring is the same `bot.on(name, handler)` shape you've used all session. The
reading is the work; there's nothing else to unlock here.

</details>

### `tower 30` — parse the number

One more command for the dispatcher, and it ends this half of the session on a
cliff. Add `tower`. Success looks like: `tower 30` makes the bot reply naming the
height it understood — and admitting it doesn't know how to build yet. Something
like "a 30-block tower, as soon as I learn how" — your words.

The catch, and the reason this is its own goal: your bot already pulls words out
of chat messages. But what kind of thing is a word?

<details>
<summary>Hint</summary>

Print the thing you extracted from the message. Then try adding 1 to it and print
that. Text that looks like a number is still text — `'50' + 1` is not fifty-one.
Converting text to a number is `Number(text)` — `parseInt(text)` also works; both
are on MDN. Convert it and keep it. The rest of the session spends it.

</details>

### Halfway: the order it can't fulfill yet

Your bot now understands `tower 30` and can't do anything about it. Here's the
door that opens, stated plainly.

**Game commands are a programmable surface.** You've run commands in the console
and in chat. Your bot's chat is the same chat. A chat message that starts with `/`
is a command — so a bot that's an **operator** can run any game command by saying
it. Everything commands can do, your code can now do. This is not a trick; it's
honestly how map-making tools work. To make the bot an operator, use the same
console `op` command you'd use for a person; the bot is a player like any other.

**The `for` loop.** A loop is a statement that runs its body over and over,
counting as it goes. This is the shape, and it's worth typing rather than pasting
— the rest of the session lives in this one line:

```js
for (let i = 0; i < 10; i++) {
  // this body runs once for each value of i: 0, 1, 2, … 9
}
```

Three parts between the parentheses, separated by semicolons: where the counter
starts (`let i = 0`), the keep-going test checked before every lap (`i < 10`), and
the step taken after every lap (`i++`, which means "add 1 to `i`"). Inside the
body, `i` is an ordinary variable — you can use its current value for anything.

Before you run any loop today: look at the loop above and write down every value
`i` will take, the complete list, in your logbook. Most people's first list is one
too long or one too short — find out which kind of person you are before it
matters.

**Template literals.** A way to build text with values folded in: use backticks
instead of quotes, and `${ }` drops a value into the middle. For example,
`` `y is now ${y}` `` produces different text for each value of `y`. You'll want
this the moment a command needs to contain a number your code computed.

### One block appears where you say

Start by hand, where the feedback is instant: op yourself, stand somewhere in your
sandbox world, and place a single block with `/setblock` typed into game chat. Use
the wiki page to get the syntax right; let the error messages correct you.

Then move it into code: teach your bot a new chat command — call it `block` — that
places one block right next to the bot.

<details>
<summary>Stuck? Start here</summary>

The bot already says things in chat. What happens if the thing it says starts with
a `/`? And if you tried that and nothing happened at all — think about who is
*allowed* to run commands on this server, and whether anyone has extended that
permission to the bot yet.

</details>

<details>
<summary>The coordinate problem</summary>

`/setblock` needs coordinates, and "next to the bot" means you need to know where
the bot is. The bot knows — the mineflayer docs list everything the `bot` object
carries; look for the bot's own entity. Alternatively, the wiki's pages on
coordinates document a way for a command to say "relative to whoever ran me."

</details>

<details>
<summary>Naming it</summary>

`bot.entity.position` holds the bot's position, with `.x`, `.y`, and `.z`. The
values are fractional — a bot stands at a point, not in a grid cell — so wrap them
in `Math.floor()` to get block coordinates. Build the command text with a template
literal. Assembling the actual line is yours.

</details>

### A column

Now the `tower` branch stops apologizing. Make it build: ten blocks, stacked
straight up from where the bot stands. Ignore the number you parsed for now —
build a fixed ten; one thing at a time, and the number's moment comes at the end.

You could copy your one-block line ten times, editing the y-coordinate in each
copy. Notice how that idea feels. Then notice what actually differs between those
ten lines: exactly one number.

<details>
<summary>Stuck? Start here</summary>

The loop's counter is a number that changes each lap — and a number that changes
each lap is exactly what the ten pasted lines needed. Put your setblock line
inside a loop body, and make the y-coordinate depend on the counter.

</details>

<details>
<summary>One more nudge</summary>

The tower's y values should be "the bot's y, plus `i`" — the template literal is
how a computed value like that gets folded into the command text. That's all the
pieces; the assembly is yours.

</details>

When `tower` works — ten blocks, one command — stop. What comes next deserves its
own moment.

### The edit

Look at your loop. Somewhere in it is the number `10`.

Say out loud, precisely, what will be different if you change it to `100`. Not "a
bigger tower" — how much bigger, how long it will take, what it will look like
from where you're standing.

Now make that one edit. Run `tower`. Then walk your character outside and look up.

That's the lesson. The code didn't get longer, or harder, or slower to write. Ten
blocks and a hundred blocks are the same three lines. Whatever you estimated
earlier for placing 100 blocks by hand — compare it to what you just watched.

### A wall

Next command: `wall`. Ten blocks wide, ten tall.

Before you write a single line: how many blocks will this place? Write the number
down. Then build it.

<details>
<summary>Stuck? Start here</summary>

A loop is a statement, and a loop's body can hold any statements — including
another loop. Say the shape in words before code: "for each column position, build
a tower."

</details>

<details>
<summary>The shape of it</summary>

Two loops need two counter names — one stepping sideways, one climbing. Whatever
you name them, the thing to hold onto is: the inner loop runs *completely*, start
to finish, for every single lap of the outer one. That sentence is also the answer
to why the block count came out the way it did.

</details>

Check your predicted count against what got built. Two small numbers made a big
one. That multiplication is the entire secret behind every megastructure you've
ever seen on a server.

### A hollow room

Now `room`: four walls and an empty inside. Your loops will visit every position
in the square — but they should only place blocks at the edges.

<details>
<summary>Hint</summary>

At each position the loops visit, there's a question to ask: am I on an edge? An
edge is exactly where a counter is at its first or its last value. That's `if`
with `||` (or) — the same comparisons your dispatcher already does, now asked
about the counters. Place the block when the test passes. And notice you have a
choice about the *else*: doing nothing leaves the inside alone, while placing
`air` carves the inside out of whatever was there. Those are different commands —
decide which one `room` means.

</details>

### Spend the number

Last step, and it makes the whole thing public: `tower 50` should build fifty,
`tower 12` twelve. You did the hard part before lunch — the number is already
parsed, converted, and waiting.

<details>
<summary>Hint</summary>

The converted number becomes the loop's keep-going limit. If the tower comes out
wrong in a text-shaped way, revisit what `'50' + 1` taught you.

</details>

When it works, you have the payoff: anyone on your server can type a sentence in
chat and watch a structure appear. If someone else is around, tell them the
command and say nothing else — watching another person order your code around is
worth the wait.

---

## Break it on purpose

Four experiments. Cause each one, read what happens, then fix it properly.

**Let it hear itself.** Give your dispatcher an `else` branch that answers *every*
unrecognized message — something like replying "unknown command" — and make sure
there's no line anywhere that skips messages from the bot itself (if you carried
one in from the library's example code back in your first bot, comment it out —
that line is exactly what's under test). Now say something the bot doesn't
recognize, and watch what happens.

If the bot hears its own chat, then its reply is itself an unrecognized message —
which triggers a reply, which triggers a reply. You'll know it when you see it. It
runs at machine speed, in public, and it does not get bored. Stop it with Ctrl-C
in the bot's terminal — or watch whether the server stops it for you first;
servers have opinions about chat flooding, and what yours does is worth knowing.

The permanent fix, now earned rather than copied: the first line of your handler
checks whether the speaker is the bot itself, and if so, does nothing. One line.
Every echo system, every auto-reply, every notification bot ever built has this
exact failure mode — a program that reacts to a channel it also writes to will
eventually meet itself. You now know precisely what that one line guards.

**Give an order with nothing in it.** Say `say` — just the word. Depending on how
you parsed, the bot chats emptiness, produces nonsense, or crashes. Read whatever
appears, including nothing. Then try `tower` alone.

The lesson: input from humans arrives malformed — routinely, innocently, forever.
Code that reaches for "the rest of the message" has to first ask whether there
*is* a rest. Fix it with a check: if there's no payload, reply with something
civil ("say what?"). That's your first defensive check, and it marks the
difference between code that works when used correctly and code that works.

**`tower 100000`.** First, predict: what *should* the bot do with this request —
and what do you think will actually happen? Then say it in chat and watch. Watch
the game, watch the bot's terminal, watch the server console — there's information
in all three.

When you've seen enough: Ctrl+C in the bot's terminal kills the bot. Notice the
server keeps running — the bot and the server are separate programs, and killing
your own program is always available and always safe. What you just felt is a
computer doing exactly what you said, at full speed, with no judgment and no
fatigue. Nothing malfunctioned. That's what "exactly what you said" means, and
every programmer carries this feeling around ever after.

Now the cleanup, which is a small lesson of its own. Either restore a clean copy
of the world, if you've done [Worlds and backups](../worlds-and-backups/guided.md) — or
go back to the wiki's commands list and find a command that fills an entire
*region* with something. Filling a region with `air` is erasure. Finding that
command is your job, and it's a keeper.

**The off-by-one.** With `tower` working normally, change the loop's `<` to `<=`.
Predict the height, run it, then count the blocks — actually count them, one by
one, like counting fence posts. Then put `<` back and instead start the counter at
`1`. Predict, run, count again.

Why 11? Why 9? Boundaries are where bugs live — in every program, forever, and
this one has a name (the off-by-one) because every programmer meets it monthly.
The convention of starting at 0 and testing with `<` exists because it makes the
bound readable as "the count": `i < 50` runs fifty times. Restore `let i = 0` and
`<` when you're done, and check the tower is exactly as tall as the number in chat
says.

---

## What just happened

What your handler does now — **read, split, decide, act** — is not a bot trick. It
is what every program that takes human input does. The terminal you've typed into
since your first lesson does exactly this: reads your line, splits off the first
word, finds what that word names, hands the rest over as arguments. That loop was
described to you back in
[Setting up a coding machine](../../../dev-machine/lessons/dev-machine-setup/guided.md); today
you built one. The server console you drove in
[Server settings and console commands](../server-settings-and-console/guided.md) — same
shape. Chat app slash-commands, search boxes, every shell on every machine: read,
split, decide, act. The if/else chain playing this role has a name: a
**dispatcher** — the one place where messages arrive and get routed to the code
that handles them.

And what your dispatcher routes to now: loops — the first honest superpower
programming hands you. The three lines of your tower loop are the same three lines
whether they place ten blocks or ten thousand — the cost of *more* collapsed into
editing one number, and by the end of today, into changing one word in a chat
message. Computers don't get bored, and that quietly redefines "too big": before
today it meant too many hours of hands, and now it means almost nothing, with the
real limits living elsewhere — the world's ceiling, the server's patience. You met
both of those in the break-it, which is how limits are best met.

Nested loops multiply. Ten by ten was a hundred; a third loop would make it a
thousand. And the conditional inside your room's loops is the other half of
programming folded into the first: the loops decide *where to go*, the `if`
decides *what to do there*. Most programs you will ever write are those two ideas,
stacked.

One layer deeper, twice. First: your bot did nothing a player couldn't do. It
typed commands into chat — just faster than any human ever could. That's honestly
what most professional map-making tools are underneath: the same levers the game
gives everyone, pulled ten thousand times by code. You didn't find a loophole
today. You found out what the loophole always was. Second, a thing to merely
notice, not solve: seven commands make a tidy chain. Imagine forty. The chain gets
long, every command's code lives inside one giant function, and adding anything
means scrolling past everything. You don't have that problem yet — but feel where
it would come from. Noticing what gets hard as things multiply is where the next
tier of program structure comes from, and it can wait until it's needed.

---

## Go further

- Should `SAY hello` work? Should `Come`? Make the command language
  case-insensitive — and then decide separately whether the *payload* of `say`
  should be case-flattened too. Those are different questions; be sure you're
  answering both on purpose.
- Add a `help` command that lists every command the bot knows. When you add a new
  command next month, what has to happen for `help` to stay truthful? Is there a
  way to build it so it *can't* drift?
- Your bot built by *commanding*. Mineflayer can also place blocks physically —
  the bot holding an item in its hand, looking at a block face, even jumping and
  pillaring up under itself. The docs and examples at the PrismarineJS/mineflayer
  project are the map, and `placeBlock` is a phrase worth searching for. Fair
  warning: this is genuinely harder — inventory, reach, timing — and that's the
  point. A bot that builds without op powers is its own kind of trophy.
- A pyramid is a stack of squares, each smaller than the one below. What has to
  depend on what? And a sphere is genuinely hard — worth knowing in advance —
  because "is this position inside the sphere?" is a distance question asked in
  three dimensions. Same tools, aimed harder.
- Could a loop *unbuild*? An `undo` command — what would the bot need to remember,
  and at what moment would it need to remember it?
- Genuinely open: people can command the bot now, which means two people will
  eventually give it contradictory or simultaneous orders — one says `come`, the
  other immediately says `stay`; two people ask for towers at once. What you built
  is last-word-wins. Is that right? Should the bot obey the first speaker, the
  last, the nearest, an owner? Could it take requests in order, like a queue at a
  counter? Every multi-user system ever built has had to answer this, and none of
  them agree.

---

## What you have now

- A bot with a command dispatcher anyone in chat can use: `come`, `stay`,
  `say <anything>`, `who`, `tower <n>` — parsing, routing, payload commands, a
  self-guard, and a defensive check for missing input
- A bot that builds on demand: `tower <n>` with the height parsed from the
  message, plus a wall and a hollow room built by nested loops — chat interface,
  loops, and op powers all proven
- Your first loop, your first loop-inside-a-loop, and your first
  decision-inside-a-loop — the shapes most future code is made of
- You've read the complete mineflayer events list once, end to end, and wired one
  event you chose yourself
- You've caused, watched, stopped, and permanently guarded against an infinite
  feedback loop — and separately killed a runaway build and cleaned up after it,
  knowing your program and the server die separately
- A structure on the sandbox server visible from anywhere, that anyone can ask
  for more of by typing a sentence
