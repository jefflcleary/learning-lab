# Building something too big to build by hand

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your bot can already talk and listen. This session it learns to build — and not at
your speed. By the end, anyone on your server can type `tower 30` in chat and watch a
thirty-block pillar assemble itself in about a second, and you'll have built a wall
and a hollow room the same way.

The real subject is not blocks. It's the **loop** — the piece of programming that
makes a computer repeat something, as many times as you say, without getting bored.
Every large structure on every server you've ever admired was built by hands or by
loops. There is no third option. Today you get the second one.

---

## Before you start

You need:

- **A bot that joins your sandbox server and responds to chat commands.**
  [Teaching the bot to listen](../bot-chat-commands/guided.md) gets you there. Quick check:
  start your sandbox server, start your bot, type one of its commands in game chat,
  and see it respond.
- **The ability to make someone an operator from the server console.** Covered in
  [Speaking the console's language](../console-commands/guided.md). Quick check: in the server
  console, you can run `op` followed by your own username and see the confirmation.
- **A place you can wreck.** This should be your sandbox server, not a world anyone
  loves. Today involves deliberately making a mess.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- Written your first loop — and felt the moment where changing one number turns ten
  blocks into a hundred
- A bot that builds a tower of any height when anyone asks in chat: `tower 50`
- A wall built by a loop inside a loop, and a hollow room built by a decision inside
  a loop
- Deliberately unleashed a runaway loop, killed it, and cleaned up after it — so
  "the computer did exactly what I said" is something you've felt, not just heard

---

## New tools

**Game commands, run by code.** You've run commands in the console and in chat. Here
is the door that opens: your bot's chat is the same chat. A chat message that starts
with `/` is a command — so a bot that's an **operator** can run any game command by
saying it. Everything commands can do, your code can now do. To make the bot an
operator, use the same console `op` command you'd use for a person; the bot is a
player like any other.

The command this session leans on is `/setblock`, which places one block at a
coordinate. Its exact syntax, and the whole catalog of commands, live on the
**Commands** pages of [minecraft.wiki](https://minecraft.wiki) — search the site for
`setblock`. That page is the reference; keep it open. One thing worth knowing before
you read it: in coordinates, x and z are horizontal and **y is up**. The debug
overlay shows your own position in the world — press F3 (on many Mac keyboards,
fn+F3).

**The `for` loop.** A loop is a statement that runs its body over and over, counting
as it goes. This is the shape, and it's worth typing rather than pasting — today's
whole subject lives in this one line:

```js
for (let i = 0; i < 10; i++) {
  // this body runs once for each value of i: 0, 1, 2, … 9
}
```

Three parts between the parentheses, separated by semicolons: where the counter
starts (`let i = 0`), the keep-going test checked before every lap (`i < 10`), and
the step taken after every lap (`i++`, which means "add 1 to `i`"). Inside the body,
`i` is an ordinary variable — you can use its current value for anything.

**Template literals.** A way to build text with values folded in: use backticks
instead of quotes, and `${ }` drops a value into the middle. For example,
`` `y is now ${y}` `` produces different text for each value of `y`. You'll want this
the moment a command needs to contain a number your code computed.

**The mineflayer docs**, at the PrismarineJS/mineflayer project on GitHub, list
everything the `bot` object knows and can do. One of this session's goals will send
you there to find out what the bot knows about its own position.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- How long would it take you to place 100 blocks by hand — actually estimate it, in
  minutes. Keep the number; you'll want it later.
- Look at the loop above and write down every value `i` will take, the complete list.
  Most people's first list is one too long or one too short — find out which kind of
  person you are before it matters.

---

## The work

### One block appears where you say

Start by hand, where the feedback is instant: op yourself, stand somewhere in your
sandbox world, and place a single block with `/setblock` typed into game chat. Use
the wiki page to get the syntax right; let the error messages correct you.

Then move it into code: teach your bot a new chat command — call it `block` — that
places one block right next to the bot.

<details>
<summary>Stuck? Start here</summary>

The bot already says things in chat. What happens if the thing it says starts with a
`/`? And if you tried that and nothing happened at all — think about who is
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

New command: `tower`. Ten blocks, stacked straight up from where the bot stands.

You could copy your one-block line ten times, editing the y-coordinate in each copy.
Notice how that idea feels. Then notice what actually differs between those ten
lines: exactly one number.

<details>
<summary>Stuck? Start here</summary>

The loop's counter is a number that changes each lap — and a number that changes
each lap is exactly what the ten pasted lines needed. Put your setblock line inside
a loop body, and make the y-coordinate depend on the counter.

</details>

<details>
<summary>One more nudge</summary>

The tower's y values should be "the bot's y, plus `i`" — the template literal is how
a computed value like that gets folded into the command text. That's all the pieces;
the assembly is yours.

</details>

When `tower` works — ten blocks, one command — stop. What comes next deserves its own
moment.

### The edit

Look at your loop. Somewhere in it is the number `10`.

Say out loud, precisely, what will be different if you change it to `100`. Not "a
bigger tower" — how much bigger, how long it will take, what it will look like from
where you're standing.

Now make that one edit. Run `tower`. Then walk your character outside and look up.

That's the lesson. The code didn't get longer, or harder, or slower to write. Ten
blocks and a hundred blocks are the same three lines. Whatever you estimated earlier
for placing 100 blocks by hand — compare it to what you just watched.

### A wall

Next command: `wall`. Ten blocks wide, ten tall.

Before you write a single line: how many blocks will this place? Write the number
down. Then build it.

<details>
<summary>Stuck? Start here</summary>

A loop is a statement, and a loop's body can hold any statements — including another
loop. Say the shape in words before code: "for each column position, build a tower."

</details>

<details>
<summary>The shape of it</summary>

Two loops need two counter names — one stepping sideways, one climbing. Whatever you
name them, the thing to hold onto is: the inner loop runs *completely*, start to
finish, for every single lap of the outer one. That sentence is also the answer to
why the block count came out the way it did.

</details>

Check your predicted count against what got built. Two small numbers made a big one.
That multiplication is the entire secret behind every megastructure you've ever seen
on a server.

### A hollow room

Now `room`: four walls and an empty inside. Your loops will visit every position in
the square — but they should only place blocks at the edges.

<details>
<summary>Stuck? Start here</summary>

At each position the loops visit, there's a question to ask: am I on an edge? An
edge is exactly where a counter is at its first or its last value.

</details>

<details>
<summary>The tools you already own</summary>

This is `if` with `||` (or) — the same comparisons your chat-command code already
does, now asked about the counters. Place the block when the test passes. And notice
you have a choice about the *else*: doing nothing leaves the inside alone, while
placing `air` carves the inside out of whatever was there. Those are different
commands — decide which one `room` means.

</details>

### The number comes from chat

Last step, and it makes the whole thing public: `tower 50` should build fifty,
`tower 12` twelve. Your bot already pulls words out of chat messages. The catch is
what kind of thing a word is.

<details>
<summary>Stuck? Start here</summary>

Print the thing you extracted from the message. Then try adding 1 to it and print
that. Text that looks like a number is still text — `'50' + 1` is not fifty-one.
Look closely at what it actually is.

</details>

<details>
<summary>Naming it</summary>

Converting text to a number is `Number(text)` — `parseInt(text)` also works. Convert
first, then hand the result to your loop as its keep-going limit.

</details>

When it works, you have the payoff: anyone on your server can type a sentence in chat
and watch a structure appear. If someone else is around, tell them the command and
say nothing else — watching another person order your code around is worth the wait.

---

## Break it on purpose

Cause each one, read what happens, undo it.

**`tower 100000`.** First, predict: what *should* the bot do with this request — and
what do you think will actually happen? Then say it in chat and watch. Watch the
game, watch the bot's terminal, watch the server console — there's information in
all three.

When you've seen enough: Ctrl+C in the bot's terminal kills the bot. Notice the
server keeps running — the bot and the server are separate programs, and killing your
own program is always available and always safe. What you just felt is a computer
doing exactly what you said, at full speed, with no judgment and no fatigue. Nothing
malfunctioned. That's what "exactly what you said" means, and every programmer
carries this feeling around ever after.

Now the cleanup, which is a small lesson of its own. Either restore a clean copy of
the world, if you've done [Worlds and copies](../worlds-and-copies/guided.md) — or go back to
the wiki's commands list and find a command that fills an entire *region* with
something. Filling a region with `air` is erasure. Finding that command is your job,
and it's a keeper.

**The off-by-one.** With `tower` working normally, change the loop's `<` to `<=`.
Predict the height, run it, then count the blocks — actually count them, one by one,
like counting fence posts. Then put `<` back and instead start the counter at `1`.
Predict, run, count again.

Why 11? Why 9? Boundaries are where bugs live — in every program, forever, and this
one has a name (the off-by-one) because every programmer meets it monthly. The
convention of starting at 0 and testing with `<` exists because it makes the bound
readable as "the count": `i < 50` runs fifty times. Restore `let i = 0` and `<` when
you're done, and check the tower is exactly as tall as the number in chat says.

---

## What just happened

Loops are the first honest superpower programming hands you. The three lines of your
tower loop are the same three lines whether they place ten blocks or ten thousand —
the cost of *more* collapsed into editing one number. Computers don't get bored, and
that quietly redefines "too big": before today it meant too many hours of hands, and
now it means almost nothing, with the real limits living elsewhere — the world's
ceiling, the server's patience. You met both of those in the break-it, which is how
limits are best met.

Nested loops multiply. Ten by ten was a hundred; a third loop would make it a
thousand. And the conditional inside your room's loops is the other half of
programming folded into the first: the loops decide *where to go*, the `if` decides
*what to do there*. Most programs you will ever write are those two ideas, stacked.

One layer deeper: your bot did nothing a player couldn't do. It typed commands into
chat — just faster than any human ever could. That's honestly what most professional
map-making tools are underneath: the same levers the game gives everyone, pulled ten
thousand times by code. You didn't find a loophole today. You found out what the
loophole always was.

---

## Go further

- Your bot built by *commanding*. Mineflayer can also place blocks physically — the
  bot holding an item in its hand, looking at a block face, even jumping and
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
- People can request towers now. What happens if two people ask at the same time?
  Could the bot take requests in order, like a queue at a counter?

---

## What you have now

- A bot that builds on demand from chat: `tower <n>` with the height parsed from the
  message, plus a wall and a hollow room built by nested loops
- Your first loop, your first loop-inside-a-loop, and your first decision-inside-a-
  loop — the shapes most future code is made of
- The runaway-loop experience: caused on purpose, killed with Ctrl+C, cleaned up
  after — and the knowledge that your program and the server die separately
- A structure on the sandbox server visible from anywhere, that anyone can ask for
  more of by typing a sentence
