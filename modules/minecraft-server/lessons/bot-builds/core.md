# Building something too big to build by hand

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** bot-builds
- **Part:** Part 4 — First programs
- **Scaffolding:** level 2 — fourth bot lesson, but the FIRST loops lesson. Goals plus
  hints; loop syntax given plainly (underivable orientation); aiming the loop is the
  withheld problem-solving. Hint ladders stop at rung 3, no worked answers.
- **Deliveries:** guided only (nothing setup-heavy)
- **Status:** ready

## Goal and payoff

The for-loop lesson — the moment repetition stops being abstract. The learner writes a
loop that places blocks via game commands, then changes one number (`10` → `100`) and
watches a pillar become a landmark. Escalation: one block → a column (one loop) → a
wall (nested loops, and the multiplicative surprise: two tens make a hundred) → a
hollow room (a conditional inside the loops). The chat-command interface from the
previous lesson wraps it: anyone on the server can type `tower 50` and watch.

Payoff: a structure visible from anywhere on the map, made by a sentence typed in
chat. Friends can request towers by talking to the bot.

Design decision, encoded here deliberately: the robust primary path is the **opped bot
issuing game commands in a loop** — `bot.chat('/setblock …')` with coordinates computed
from loop variables. This is honest (it is how map-makers' tools actually work) and it
keeps the lesson about LOOPS rather than about block-placement APIs. The physical
route — the bot holding blocks, jumping, pillaring under itself via `placeBlock` — is
harder and less reliable [verify feasibility]; it is positioned as Go further, not the
main path.

## Prerequisites

- A bot that joins the sandbox server and responds to chat commands — established by
  `lessons/bot-chat-commands/`
- The ability to make accounts operators from the server console — established by
  `lessons/console-commands/` (the bot is a player; a player can be opped)

## Establishes

- A bot that builds structures on chat command: at minimum a `tower <n>` command with
  the height parsed from chat, plus a nested-loop structure (wall or hollow room)
- The learner has written a `for` loop, a nested loop, and a conditional inside a
  loop, and has cleaned up after a runaway loop
- Cited by other cores as: "a bot that builds on command — chat interface, loops, and
  op powers all proven — established by `lessons/bot-builds/`."

## Facts

- An **operator** (op) can run game commands. Bots are players, so a bot can be opped
  like anyone else: `op <botname>` in the server console (established in
  `lessons/console-commands/`).
- In mineflayer, `bot.chat(text)` sends chat (established in `lessons/first-bot/`). A
  chat message that starts with `/` is executed as a command — so an opped bot can run
  any game command by "saying" it. [verify — standard mineflayer behavior; deliveries
  point at PrismarineJS/mineflayer docs/examples rather than asserting]
- `/setblock <x> <y> <z> <block>` places one block at a coordinate. Block names look
  like `minecraft:stone` (plain `stone` is usually accepted). Full current syntax:
  the **Commands** pages on minecraft.wiki — the `/setblock` page specifically
  [volatile as of 2026-07 in detail; point learner at the wiki, don't assert].
- `/fill <x1> <y1> <z1> <x2> <y2> <z2> <block>` fills a whole box; filling with `air`
  erases. It has a per-command volume limit [verify current limit — wiki]. This
  command is deliberately NOT given in learner text: the break-it cleanup has the
  learner find it on the wiki commands list themselves ("a command that fills a
  region" is their find).
- Coordinates: x and z are horizontal, **y is up**. The debug overlay shows the
  player's position — F3 [macos: on many Mac keyboards, fn+F3]. Relative coordinates
  `~` (with offsets like `~5`) mean "relative to whoever runs the command" and are
  documented on the wiki's coordinate/commands pages — either absolute or relative
  works for this lesson.
- The bot knows where it stands: `bot.entity.position`, with `.x`, `.y`, `.z`
  (fractional — flooring gives block coordinates) [verify property path — deliveries
  point at the mineflayer docs].
- `for` loop anatomy — subject matter, typed by hand, given plainly (underivable):

  ```js
  for (let i = 0; i < 10; i++) {
    // runs once for each value of i: 0, 1, 2, … 9
  }
  ```

  Three parts between the parentheses: where the counter starts; the keep-going test,
  checked before every lap; the step, taken after every lap. `i++` means "add 1 to i".
- Template literals — given plainly: backticks instead of quotes, and `${expression}`
  folds a value into the text. `` `/setblock 10 ${y} 20 stone` `` produces a different
  command for each value of `y`.
- Strings are not numbers: a chat message is text, so a number pulled out of it is the
  *characters* `5` and `0`, not fifty. `'50' + 1` is `'501'`. `Number(text)` or
  `parseInt(text)` converts. Named at the friction point (the `tower 50` goal).
- The world has a height limit; its value varies by version [volatile]. Commands aimed
  above it fail, each with its own error message. Not asserted in learner text — the
  huge-tower break-it lets the learner meet this empirically.
- What happens when a bot sends tens of thousands of commands as fast as the loop
  runs — server lag, chat flood, a spam kick — varies by server and version [verify;
  do not assert the outcome in learner text; the break-it is a measurement].
- Stopping a runaway bot: Ctrl+C in the bot's terminal kills the bot process. The
  server keeps running — the bot and the server are separate programs.

## Arc

### Orientation — given plainly

Two ideas open the lesson, both stated flat:

1. **Game commands are a programmable surface.** The learner has run commands from
   the console and in chat. A bot's chat is the same chat — so an opped bot can run
   commands. Everything commands can do, code can now do. This is not a trick; it's
   how map-making tools work.
2. **The for loop.** What it is (a statement that runs its body repeatedly, counting),
   the three-part anatomy, the fact that the counter is an ordinary variable available
   inside the body. Typed by hand, never pasted.

Also plain: `/setblock` exists and where its full syntax lives (wiki commands pages);
op the bot from the console; template literals; y is up; F3 shows coordinates.

### Predictions to elicit

- How long would placing 100 blocks by hand take — actually estimate it. Keep the
  number for the end.
- Before running the first loop: write down every value the counter will take. (This
  is the fencepost inoculation — most people write one too many or one too few.)
- Staged in the work, the lesson's heart: before changing `10` to `100`, say out loud
  exactly what will be different.
- Before running the nested loop: how many blocks will a 10-wide, 10-tall wall place?
  Write the number down first — two small numbers making a big one is the surprise.

### The work — goals and hint ladders

1. **One block appears where you say.** First by hand: op yourself, stand somewhere,
   place a block with `/setblock` typed into game chat (learn the syntax where the
   error messages are instant). Then teach the bot a new chat command — say `block` —
   that makes the bot place one block near itself.
   - Rung 1: the bot already says things in chat. What happens if the thing it says
     starts with a `/`? (And: did anything happen at all? Who is allowed to run
     commands — and has anyone extended that permission to the bot?)
   - Rung 2: the command needs coordinates. The bot knows where it stands — the
     mineflayer docs list what `bot` carries; look for the bot's own entity. Or: the
     wiki's coordinate pages document a way to say "relative to me."
   - Rung 3: `bot.entity.position` has `.x`, `.y`, `.z` — fractional, so
     `Math.floor()` them. Build the command text with a template literal. (No
     assembled command line given — that's the exercise.)

2. **A column.** New command, `tower`: ten blocks stacked straight up from where the
   bot stands. This is the loop's debut: the only thing that changes from block to
   block is one number.
   - Rung 1: you placed one block with one line. You could paste that line ten times,
     changing the y each time — and if that thought makes you tired, you have
     understood why loops exist. What varies between the ten lines? Exactly one
     number. The loop's counter *is* a number.
   - Rung 2: put the setblock line in the loop body, and fold the counter into the
     y-coordinate with the template literal. The tower's y values should be "the
     bot's y, plus i".
   - (No rung 3. The pieces are all on the table.)

   **Then the edit this lesson exists for.** The tower works at 10. Predict, out
   loud, exactly what changing `10` to `100` will do — then make that one edit, run
   `tower` again, and go look up. The delivery stages this precisely: prediction
   first, one edit, then walk outside and look at the sky.

3. **A wall.** Ten wide, ten tall. Before writing anything: predict the block count.
   - Rung 1: a loop is a statement, and a loop's body can hold any statements —
     including another loop. Say the shape in words first: "for each column, build a
     tower."
   - Rung 2: two loops need two counter names (`x` steps sideways while `y` climbs —
     or `i` and `j`; names are yours). The inner loop runs completely, from start to
     finish, for every single lap of the outer one. That sentence is why the count
     came out the way it did.

4. **A hollow room.** A square of walls with an empty inside — only place blocks at
   the edges. This puts a decision inside the repetition.
   - Rung 1: the loops visit every position in the square. At each position the
     question is "am I on an edge?" — and edges are exactly where a counter is at its
     first or last value.
   - Rung 2: `if` with `||` (or), comparing the counters against their limits — the
     same comparisons the chat-command code already uses. Place the block when the
     test passes; otherwise place nothing (or place air, which makes it a
     room-carver — worth noticing the difference).

5. **`tower 50` — the number comes from chat.** Anyone types `tower 50`, gets a
   50-block tower; `tower 12`, twelve. The bot already pulls words out of messages;
   the catch is what kind of thing a word is.
   - Rung 1: print what you extracted and look closely. Then try adding 1 to it. Text
     that looks like a number is still text — `'50' + 1` is not fifty-one.
   - Rung 2: converting text to a number is `Number(text)` (or `parseInt(text)`).
     Convert first, then hand it to the loop as the keep-going limit.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **`tower 100000`.** Predict first: what should the bot do with this — and what will
  actually happen? Then say it and watch. (Deliveries must not spoil the outcome —
  some mix of server strain, chat flood, per-command failures near the world's
  ceiling, possibly a kick; the learner measures it.) This is what a computer doing
  *exactly what you said* feels like — no judgment, no fatigue, full speed. Recovery,
  in order: Ctrl+C in the bot's terminal kills the bot (the server survives — they
  are separate programs); the mess gets cleaned either by restoring a world copy (if
  `lessons/worlds-and-copies/` powers are in hand) or by finding, on the wiki
  commands list, a command that fills a whole region with air — the find is the
  learner's. Undo state: world clean, bot restarted.
- **The off-by-one.** Change the tower loop's `<` to `<=`, predict the height, run,
  and count the blocks — deliberately, one by one, like counting fence posts. Then
  start the counter at 1 instead of 0 with `<` back in place, and count again. Why 11?
  Why 9? Boundaries are where bugs live, in every program, forever; counting from
  zero and testing with `<` is the convention that makes the bound readable as "the
  count." Undo: restore `i = 0; i < n`.

### What just happened — the explanation

Loops are the first honest superpower in programming. The three lines of the tower
loop are the same three lines whether they place 10 blocks or 10,000 — the cost of
*more* collapsed to editing one number. Computers do not get bored, which quietly
changes what "too big" means: before today, too-big-to-build meant too many hands and
hours; now it means nothing at all, and the real limits turn out to be elsewhere (the
world's ceiling, the server's patience — both met in the break-it).

Nested loops multiply: ten by ten is a hundred, and a third loop would make it a
thousand. Two small numbers composing into a big one is the entire trick behind every
"how did they build that" on every server — every large structure in every world was
made by hands or by loops, no third option. And the conditional inside the room's
loops is the other half of programming folded in: repetition decides *where to go*,
conditions decide *what to do there*.

One layer deeper: the bot isn't doing anything a player couldn't. It types commands
into chat, faster than any human — which is honestly what most map-making tools are
underneath. The game gave everyone the same levers; code is how you pull a lever ten
thousand times.

### Go further — open questions

- The bot built by *commanding*, not by *doing*. Mineflayer can also place blocks
  physically — the bot holding an item, looking at a face, jumping and pillaring
  under itself. The docs and examples at PrismarineJS/mineflayer are the map
  (`placeBlock` is a phrase worth searching) [verify feasibility — genuinely harder:
  inventory, reach, timing]. It is real API archaeology, and the un-opped bot that
  builds anyway is its own kind of trophy.
- A pyramid: each layer is a smaller square than the one below. What has to depend on
  what? A sphere: genuinely hard — worth saying plainly — because "am I inside the
  sphere?" is a distance question asked in three dimensions. Both are the same tools
  this lesson used, aimed harder.
- Could a loop UNBUILD? A shape eraser — `undo` as a command. What would it need to
  remember, and when?
- Friends can ask for towers now. What happens when two people ask at once — and
  could the bot take requests in order?

## Delivery notes

- **guided:** the `10` → `100` edit is the heart. Stage it exactly: working tower,
  spoken prediction, one edit, run, *go outside and look up*. Do not bury it
  mid-paragraph; give it its own beat.
- Do not spoil the `tower 100000` outcome, the nonsense-scale failures near the
  height limit, or the `/fill` discovery — all are the learner's measurements/finds.
- Loop syntax, template literals, and string-vs-number are orientation (underivable);
  the assembled setblock-in-a-loop line is never shown — that is the withheld
  problem-solving. No worked answers anywhere in this lesson.
- Social payoff phrasing: anyone on the server can type `tower 30` and watch it
  appear. Phrase housemates/friends as option, never assumed.
- Mineflayer API property paths and command syntax: point at
  PrismarineJS/mineflayer docs and the minecraft.wiki commands pages; assert nothing
  version-sensitive.
