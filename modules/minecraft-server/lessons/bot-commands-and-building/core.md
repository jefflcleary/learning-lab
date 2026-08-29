# Bot chat commands and building with loops

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** bot-commands-and-building
- **Module / Part:** minecraft-server — Part 4 — First programs
- **Scaffolding:** fades within the lesson, tracking skill newness. The dispatcher
  half (work goals 1–5) is at the level 2–3 boundary — third program of the bot
  skill: goals with success criteria, a single collapsed hint per goal (concept +
  doc pointer combined), no wiring shown, no skeletons. The building half (work
  goals 6–11) is level 2 for the loop debut only — loops are a brand-new skill, so
  the first loop goals carry two hints; the later goals (room, spend-the-number)
  thin to one. No worked answers anywhere in this lesson.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

Two arcs joined at one seam. First: turn scattered chat reactions into a command
interface — the bot parses every chat message (split it, compare it, slice it) and
routes commands through an if/else dispatcher: "come", "stay", "say <anything>",
"who", and finally "tower <n>", where the number is parsed from chat but nothing is
built yet. Second: spend that number — an opped bot issuing `/setblock` in loops
turns `tower 30` into a thirty-block pillar, then a nested loop makes a wall, a
conditional inside the loops makes a hollow room. The seam is deliberate: the
dispatcher half ends with the bot understanding an order it can't yet fulfill; the
building half teaches it how.

First real string work, first conditionals-as-structure, first command that carries
a payload — and the for-loop lesson: the moment repetition stops being abstract,
staged as one number changed (`10` → `100`) and a pillar becoming a landmark. This
lesson also carries THE read-the-surface assignment for mineflayer (placed
deliberately after repeated successes): read the entire events list in the docs,
one pass, then wire one chosen event to anything.

Payoff: anyone on the sandbox can command the bot by chat — including ordering up
structures visible from anywhere on the map, made by a sentence typed in chat.

Design decision, encoded here deliberately: the robust primary path is the **opped
bot issuing game commands in a loop** — `bot.chat('/setblock …')` with coordinates
computed from loop variables. This is honest (it is how map-makers' tools actually
work) and it keeps the building half about LOOPS rather than about block-placement
APIs. The physical route — the bot holding blocks, jumping, pillaring under itself
via `placeBlock` — is harder and less reliable [verify feasibility]; it is
positioned as Go further, not the main path.

## Prerequisites

- A bot with events and state — "come"/"stay" following — established by
  `lessons/writing-your-first-bot/` (which carries the sandbox conditions:
  supported version, `online-mode=false`, localhost/LAN only)
- The ability to make accounts operators from the server console — established by
  `lessons/server-settings-and-console/` (the bot is a player; a player can be
  opped)
- A world that can be wrecked — the sandbox is the expendable surface; this lesson
  deliberately makes a mess

Self-checks for delivery: `node bot.js` brings the bot up; saying "come" in chat
makes it walk to you; "stay" stops it; `op <yourname>` in the server console
produces its confirmation.

## Establishes

- A bot with a command dispatcher: a chat handler that parses (trim, split,
  lowercase), routes through if/else, handles commands-with-arguments, guards
  against its own messages, and answers "who" from `bot.players`
- A bot that builds structures on chat command: `tower <n>` with the height parsed
  from chat, plus a nested-loop structure (wall and hollow room)
- The learner has read the complete mineflayer events list once, end to end, and
  wired one self-chosen event
- First deliberate infinite feedback loop, caused, watched, stopped, and guarded
  against; first defensive check for missing input; first runaway loop, killed and
  cleaned up after
- The learner has written a `for` loop, a nested loop, and a conditional inside a
  loop
- Cited by other cores as: "a bot that takes chat commands from anyone and builds
  on command — chat interface, loops, and op powers all proven — established by
  `lessons/bot-commands-and-building/`."

## Facts

Dispatcher half:

- All string work is stable JavaScript — no [verify] needed on the language side:
  - A chat message arrives as a **string**; strings have methods.
  - `message.trim()` — strip leading/trailing spaces.
  - `message.split(' ')` — break into an array of words at spaces.
  - `parts[0]`, `parts.slice(1)`, `parts.slice(1).join(' ')` — first word; the
    rest; the rest re-joined as one string (the payload).
  - `word.toLowerCase()`, `message.startsWith('say ')`, `===` — comparisons.
  - MDN is the authoritative reference for string methods; deliveries may name
    methods (stable) and point at MDN for signatures.
- `if / else if / else` — the dispatcher shape. Order matters; exactly one branch
  runs.
- `bot.players` — object keyed by username. `Object.keys(bot.players)` → array of
  names; `.join(', ')` → one string for chat. [verify: whether the bot's own name
  is included in `bot.players` — likely yes; delivery treats it as a discovery:
  does the bot count itself?]
- Self-guard: `if (username === bot.username) return` — the mineflayer README's own
  example carries this guard [verify README still shows it]; this lesson has the
  learner *earn* it via the break-it rather than cargo-cult it. If the learner's
  file already has the guard (copied from the README in writing-your-first-bot),
  the break-it is "remove it and see what it was protecting you from."
- The `chat` event fires for the bot's own messages too [verify — implied by the
  README guard; the break-it depends on it]. If it turns out not to fire for self
  on some version, the break-it as designed fails safe (no loop) — delivery
  phrasing is "run it and watch what happens," which stays honest either way.
- Infinite-loop break-it mechanics: with no self-guard and a rule that *answers
  every message* (e.g. an unknown-command reply, or an "I heard: <message>" echo),
  the bot's reply triggers its own handler → feedback loop in public chat. Vanilla
  servers may kick clients for chat spam [verify: vanilla spam kick behavior for
  offline-mode clients — do not assert; the delivery says "watch what happens: you
  stop it, or the server does"]. Stopped with Ctrl-C. Fully reversible.
- Missing-argument failure: "say" alone → `parts.slice(1).join(' ')` is `''` —
  `bot.chat('')` sends nothing or errors [verify exact behavior; delivery frames
  as experiment]. Depending on the learner's parsing, could also be `undefined`
  access. Either way: nonsense or crash → the case for checking input before
  using it (`if (parts.length < 2)` → reply with usage).
- Strings are not numbers: a chat message is text, so a number pulled out of it is
  the *characters* `5` and `0`, not fifty. `'50' + 1` is `'501'`. `Number(text)` or
  `parseInt(text)` converts. Named at the friction point (the `tower <n>` parsing
  goal — the dispatcher half's capstone).
- The events list lives in the mineflayer API document in the
  `PrismarineJS/mineflayer` repo — every event, names and arguments [stable
  location as of 2026-07; deliveries name the repo and "API documentation," not a
  deep URL].
- Command set for this lesson: `come`, `stay` (already exist — get re-routed
  through the dispatcher), `say <anything>` (payload command), `who`, `tower <n>`
  (parsed in the dispatcher half, built in the building half), plus `block`,
  `wall`, `room` in the building half. Case-insensitivity is a Go Further, not
  required.

Building half:

- An **operator** (op) can run game commands. Bots are players, so a bot can be
  opped like anyone else: `op <botname>` in the server console (established in
  `lessons/server-settings-and-console/`).
- In mineflayer, `bot.chat(text)` sends chat (established in
  `lessons/writing-your-first-bot/`). A chat message that starts with `/` is
  executed as a command — so an opped bot can run any game command by "saying" it.
  [verify — standard mineflayer behavior; deliveries point at
  PrismarineJS/mineflayer docs/examples rather than asserting]
- `/setblock <x> <y> <z> <block>` places one block at a coordinate. Block names
  look like `minecraft:stone` (plain `stone` is usually accepted). Full current
  syntax: the **Commands** pages on minecraft.wiki — the `/setblock` page
  specifically [volatile as of 2026-07 in detail; point learner at the wiki, don't
  assert].
- `/fill <x1> <y1> <z1> <x2> <y2> <z2> <block>` fills a whole box; filling with
  `air` erases. It has a per-command volume limit [verify current limit — wiki].
  This command is deliberately NOT given in learner text: the break-it cleanup has
  the learner find it on the wiki commands list themselves ("a command that fills
  a region" is their find).
- Coordinates: x and z are horizontal, **y is up**. The debug overlay shows the
  player's position — F3 [macos: on many Mac keyboards, fn+F3]. Relative
  coordinates `~` (with offsets like `~5`) mean "relative to whoever runs the
  command" and are documented on the wiki's coordinate/commands pages — either
  absolute or relative works for this lesson.
- The bot knows where it stands: `bot.entity.position`, with `.x`, `.y`, `.z`
  (fractional — flooring gives block coordinates) [verify property path —
  deliveries point at the mineflayer docs].
- `for` loop anatomy — subject matter, typed by hand, given plainly (underivable):

  ```js
  for (let i = 0; i < 10; i++) {
    // runs once for each value of i: 0, 1, 2, … 9
  }
  ```

  Three parts between the parentheses: where the counter starts; the keep-going
  test, checked before every lap; the step, taken after every lap. `i++` means
  "add 1 to i".
- Template literals — given plainly: backticks instead of quotes, and
  `${expression}` folds a value into the text. `` `/setblock 10 ${y} 20 stone` ``
  produces a different command for each value of `y`.
- The world has a height limit; its value varies by version [volatile]. Commands
  aimed above it fail, each with its own error message. Not asserted in learner
  text — the huge-tower break-it lets the learner meet this empirically.
- What happens when a bot sends tens of thousands of commands as fast as the loop
  runs — server lag, chat flood, a spam kick — varies by server and version
  [verify; do not assert the outcome in learner text; the break-it is a
  measurement].
- Stopping a runaway bot: Ctrl+C in the bot's terminal kills the bot process. The
  server keeps running — the bot and the server are separate programs.

## Arc

### Orientation — given plainly

Dispatcher half: chat is about to become an **interface** — the surface through
which other people operate a program. The bot already reacts to two exact words;
the difference between reacting to words and *taking orders* is parsing: a message
is a string, a string can be taken apart, and the parts can be compared and acted
on. Given plainly: what a string is (you've been using them since `'localhost'`);
that strings come with built-in methods; the names of the handful needed today
(trim, split, toLowerCase, startsWith, slice, join, plus `Object.keys`) with MDN as
the reference for how each works; that an if/else chain runs exactly one branch, in
order. The shape of a command language: first word = the command, rest = the
argument. Also stated plainly: this session restructures the chat handler the
learner already has — rewiring working code into a better shape is normal work, and
the old behavior ("come"/"stay") must survive the rewrite; that's the success
criterion. Typed-by-hand rule restated once.

Building half (delivered as a plain transition inside The work, after the
dispatcher half's cliffhanger — the bot understands `tower 30` but can't build):

1. **Game commands are a programmable surface.** The learner has run commands from
   the console and in chat. A bot's chat is the same chat — so an opped bot can run
   commands. Everything commands can do, code can now do. This is not a trick; it's
   how map-making tools work.
2. **The for loop.** What it is (a statement that runs its body repeatedly,
   counting), the three-part anatomy, the fact that the counter is an ordinary
   variable available inside the body. Typed by hand, never pasted.

Also plain at the transition: `/setblock` exists and where its full syntax lives
(wiki commands pages); op the bot from the console; template literals; y is up; F3
shows coordinates.

### Predictions to elicit

- "say hello there" has to make the bot say "hello there". The handler receives the
  whole message as one string — what has to happen to it before the bot can act?
  Sketch the steps in plain words, no code.
- The bot speaks in the same chat it listens to. Does it hear itself? What could
  that lead to? (Do not resolve; the break-it answers it.)
- When you read the full list of everything a bot can react to: how many events do
  you expect there to be? Write a number.
- How long would placing 100 blocks by hand take — actually estimate it, in
  minutes. Keep the number for the end.
- Before running the first loop: write down every value the counter will take.
  (This is the fencepost inoculation — most people write one too many or one too
  few.)

Staged in the work, not in the Predict section: before changing `10` to `100`, say
out loud exactly what will be different; before running the nested loop, how many
blocks will a 10-wide, 10-tall wall place — two small numbers making a big one is
the surprise.

### The work — goals and hint ladders

Goals 1–5 (dispatcher half): success criteria plus one collapsed hint each, concept
and pointer combined, no wiring. Goals 6–11 (building half): loop debut carries two
hints (first loops lesson); later goals thin to one; the assembled
setblock-in-a-loop line is never shown.

1. **Rebuild the handler as a dispatcher.** Success: one chat handler that splits
   every message into words and routes through an if/else chain; "come" and "stay"
   still work exactly as before. (Re-routing existing behavior through a new
   structure — with no visible change — is the whole point of this goal, and worth
   saying in delivery: refactoring is real work even when the demo looks
   identical.)
   - Hint: `trim` then `split(' ')` turns the message into an array of words;
     the first word is the command, compared branch by branch with
     `if / else if`. MDN documents every string method named here. The old
     "come"/"stay" code becomes the bodies of two branches.
2. **"say <anything>" — a command that carries cargo.** Success: "say hello there"
   makes the bot chat "hello there"; whatever follows "say" comes out intact,
   spaces and all.
   - Hint: the command was word one; the payload is *everything after* word one.
     Arrays have a method to take "everything from position N on," and another to
     glue an array back into one string with a chosen separator — both on MDN.
     Splitting rebuilt the message wrong if "hello there" comes out as
     "hello,there".
3. **"who" — ask the bot who's online.** Success: "who" makes the bot chat the
   names of everyone currently on the server, in one message.
   - Hint: the bot already holds this answer — the same players directory used for
     following. It's an object keyed by name; JavaScript has a built-in that hands
     you an object's keys as an array (MDN: `Object.keys`), and you just used the
     glue-an-array-into-a-string method. Worth noticing in the result: does the
     bot count itself?
4. **Read the entire events list, then wire one.** The assignment: open the
   mineflayer API documentation and read the *complete* list of events — every
   name, one pass, top to bottom. Not to memorize; to know the size of the
   surface. Check the prediction number. Then pick the one event that sounds most
   interesting and make the bot do anything at all when it fires — chat a line, at
   minimum. Success: the learner can say roughly how many events exist, name three
   that surprised them, and demonstrate one they wired themselves.
   - Hint (single, thin): the API document in the mineflayer repo has an events
     section; each entry states the arguments the handler receives. Wiring is the
     same `bot.on(name, handler)` shape used all session. Nothing else withheld —
     the reading *is* the work.
5. **"tower 30" — parse the number.** The dispatcher half's capstone, and the
   lesson's seam. Success: "tower 30" makes the bot reply naming the height it
   understood — as a number it could count with, not as text — and admit it
   doesn't know how to build yet ("a 30-block tower, as soon as I learn how" —
   learner's words). The catch is what kind of thing a word pulled from a message
   is.
   - Hint: print what you extracted and look closely. Then try adding 1 to it.
     Text that looks like a number is still text — `'50' + 1` is not fifty-one.
     Converting text to a number is `Number(text)` (or `parseInt(text)`) — MDN has
     both. Convert it, keep it; the building half spends it.

*Transition (the building half's orientation lands here — see Orientation above):
the bot can take an order it can't fulfill. Game commands as a programmable
surface; op the bot; `/setblock` and the wiki; the for loop, typed by hand;
template literals; y is up; F3.*

6. **One block appears where you say.** First by hand: op yourself, stand
   somewhere, place a block with `/setblock` typed into game chat (learn the
   syntax where the error messages are instant). Then teach the bot a new chat
   command — `block` — that makes the bot place one block near itself.
   - Rung 1: the bot already says things in chat. What happens if the thing it
     says starts with a `/`? (And: did anything happen at all? Who is allowed to
     run commands — and has anyone extended that permission to the bot?)
   - Rung 2: the command needs coordinates. The bot knows where it stands — the
     mineflayer docs list what `bot` carries; look for the bot's own entity. Or:
     the wiki's coordinate pages document a way to say "relative to me."
   - Rung 3: `bot.entity.position` has `.x`, `.y`, `.z` — fractional, so
     `Math.floor()` them. Build the command text with a template literal. (No
     assembled command line given — that's the exercise.)
7. **A column.** The `tower` branch stops apologizing and builds: ten blocks
   stacked straight up from where the bot stands — a fixed ten, ignoring the
   parsed number for now, one thing at a time. This is the loop's debut: the only
   thing that changes from block to block is one number.
   - Rung 1: you placed one block with one line. You could paste that line ten
     times, changing the y each time — and if that thought makes you tired, you
     have understood why loops exist. What varies between the ten lines? Exactly
     one number. The loop's counter *is* a number.
   - Rung 2: put the setblock line in the loop body, and fold the counter into the
     y-coordinate with the template literal. The tower's y values should be "the
     bot's y, plus i".
8. **The edit this lesson exists for.** The tower works at 10. Predict, out loud,
   exactly what changing `10` to `100` will do — then make that one edit, run
   `tower` again, and go look up. The delivery stages this precisely: prediction
   first, one edit, then walk outside and look at the sky. Its own beat, never
   buried mid-paragraph. No hints.
9. **A wall.** Ten wide, ten tall. Before writing anything: predict the block
   count.
   - Rung 1: a loop is a statement, and a loop's body can hold any statements —
     including another loop. Say the shape in words first: "for each column, build
     a tower."
   - Rung 2: two loops need two counter names (`x` steps sideways while `y` climbs
     — or `i` and `j`; names are yours). The inner loop runs completely, from
     start to finish, for every single lap of the outer one. That sentence is why
     the count came out the way it did.
10. **A hollow room.** A square of walls with an empty inside — only place blocks
    at the edges. This puts a decision inside the repetition.
    - Hint (single): the loops visit every position in the square; at each
      position the question is "am I on an edge?" — and edges are exactly where a
      counter is at its first or last value. `if` with `||` (or), comparing the
      counters against their limits — the same comparisons the dispatcher already
      uses. Place the block when the test passes; otherwise place nothing (or
      place air, which makes it a room-carver — worth noticing the difference).
11. **Spend the number.** Success: `tower 50` builds fifty; `tower 12`, twelve —
    the number parsed back at the seam finally arrives at its destination, and the
    whole thing goes public: anyone on the server can order a structure by typing
    a sentence.
    - Hint (single): the converted number from goal 5 becomes the loop's
      keep-going limit. If the tower comes out as text-shaped nonsense, revisit
      what `'50' + 1` taught you.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Let it hear itself.** Add (or expose) a rule that answers *every* message —
  simplest: an `else` branch that replies something like "unknown command" to
  anything that isn't one, with no self-guard (if a guard came along from the
  README example in writing-your-first-bot, comment it out — that's the
  experiment). Then say anything unrecognized in chat and watch what happens. If
  the bot hears its own messages, its reply triggers its own handler, which
  replies, which triggers — a feedback loop, live, in public chat, at machine
  speed. Stop it: Ctrl-C (or watch whether the server stops it first — servers
  defend themselves against chat spam; what yours does is worth knowing). The
  permanent fix, now earned: first line of the handler, if the speaker is the bot
  itself, return. Teaches: a program that reacts to a channel it also writes to
  *will* meet itself; every echo/notification/auto-reply system ever built has
  this failure mode; the guard is one line and now the learner knows exactly what
  it's guarding. Undo: restore guard; keep the else-branch or not (their policy).
- **Give an order with nothing in it.** Say "say" — just the word, no payload.
  Watch: depending on how the parsing was written, the bot chats emptiness, prints
  nonsense, or crashes — read whatever appears. Then try "tower" alone. Teaches:
  input from humans arrives malformed, routinely and innocently; code that reaches
  for "the rest of the message" must first ask whether there *is* a rest. Fix: a
  length check before using the payload, replying with usage ("say what?") — the
  learner's first defensive check, and the difference between code that works when
  used correctly and code that works. Undo: the fix is the undo; "say" alone now
  gets a civil answer.
- **`tower 100000`.** Predict first: what should the bot do with this — and what
  will actually happen? Then say it and watch. (Deliveries must not spoil the
  outcome — some mix of server strain, chat flood, per-command failures near the
  world's ceiling, possibly a kick; the learner measures it.) This is what a
  computer doing *exactly what you said* feels like — no judgment, no fatigue,
  full speed. Recovery, in order: Ctrl+C in the bot's terminal kills the bot (the
  server survives — they are separate programs); the mess gets cleaned either by
  restoring a world copy (if `lessons/worlds-and-backups/` powers are in hand) or
  by finding, on the wiki commands list, a command that fills a whole region with
  air — the find is the learner's. Undo state: world clean, bot restarted.
- **The off-by-one.** Change the tower loop's `<` to `<=`, predict the height,
  run, and count the blocks — deliberately, one by one, like counting fence posts.
  Then start the counter at 1 instead of 0 with `<` back in place, and count
  again. Why 11? Why 9? Boundaries are where bugs live, in every program, forever;
  counting from zero and testing with `<` is the convention that makes the bound
  readable as "the count." Undo: restore `i = 0; i < n`.

### What just happened — the explanation

What the handler now does — read, split, decide, act — is not a bot trick; it is
what *every* program that takes human input does. The terminal the learner has been
typing into all course does exactly this: reads a line, splits off the first word,
finds what that word names, hands the rest over as arguments — that loop was named
all the way back in dev-machine-setup, and today the learner built one of their
own. The server console from `lessons/server-settings-and-console/` — same shape.
Every chat app command, every search box, every shell on every machine: read,
split, decide, act. The if/else chain has a name in this role — a **dispatcher**:
one place where messages arrive and get routed to the code that handles them.

And what the dispatcher routes to, now: loops — the first honest superpower in
programming. The three lines of the tower loop are the same three lines whether
they place 10 blocks or 10,000 — the cost of *more* collapsed to editing one
number, and after goal 11, to changing one word in a chat message. Computers do not
get bored, which quietly changes what "too big" means: before today,
too-big-to-build meant too many hands and hours; now it means nothing at all, and
the real limits turn out to be elsewhere (the world's ceiling, the server's
patience — both met in the break-it). Nested loops multiply: ten by ten is a
hundred, and a third loop would make it a thousand. Two small numbers composing
into a big one is the entire trick behind every "how did they build that" on every
server — every large structure in every world was made by hands or by loops, no
third option. And the conditional inside the room's loops is the other half of
programming folded in: repetition decides *where to go*, conditions decide *what to
do there*.

One layer deeper, twice. First: the bot isn't doing anything a player couldn't. It
types commands into chat, faster than any human — which is honestly what most
map-making tools are underneath. The game gave everyone the same levers; code is
how you pull a lever ten thousand times. Second, planting a seed and not watering
it: seven commands make a fine if/else chain. Imagine forty. The chain gets long,
every command's code lives in one giant function, and adding one means scrolling
through all of them. Feeling *that* — what gets hard as things multiply — is where
the next tier of program structure comes from; there's a shape for it, and it can
wait. Noticing the strain is today's only assignment on this front.

### Go further — open questions

- Should "SAY hello" work? "Come"? Make the command language case-insensitive —
  and decide whether the *payload* of "say" should be case-flattened too (careful:
  those are different questions).
- A "help" command that lists every command the bot knows. When you add a
  command next week, what has to happen so "help" stays truthful? Is there a way
  it *can't* drift?
- The bot built by *commanding*, not by *doing*. Mineflayer can also place blocks
  physically — the bot holding an item, looking at a face, jumping and pillaring
  under itself. The docs and examples at PrismarineJS/mineflayer are the map
  (`placeBlock` is a phrase worth searching) [verify feasibility — genuinely
  harder: inventory, reach, timing]. It is real API archaeology, and the un-opped
  bot that builds anyway is its own kind of trophy.
- A pyramid: each layer is a smaller square than the one below. What has to depend
  on what? A sphere: genuinely hard — worth saying plainly — because "am I inside
  the sphere?" is a distance question asked in three dimensions. Both are the same
  tools this lesson used, aimed harder.
- Could a loop UNBUILD? A shape eraser — `undo` as a command. What would it need
  to remember, and when?
- Genuinely open: friends can command the bot now, and two people will eventually
  give contradictory or simultaneous orders — one says "come", the other
  immediately says "stay"; two people ask for towers at once. Last-word-wins is
  what you built. Is it right? Who *should* the bot obey — the first speaker, the
  last, the nearest, an owner? Could it take requests in order, like a queue at a
  counter? Every multi-user system ever built has had to answer this, and none of
  them agree.

## Delivery notes

- Merged from the former lessons `bot-chat-commands` and `bot-builds` (folders
  retained for history; this core supersedes both). The number-from-chat goal
  moved from the end of the building material to the end of the dispatcher half —
  the seam: parse the number, then spend it.
- **guided:** dispatcher-half hints are single blocks per goal — thinner than the
  first-bot lesson by design; resist expanding them. No code skeletons anywhere in
  this delivery; no worked answers.
- The `10` → `100` edit is the heart. Stage it exactly: working tower, spoken
  prediction, one edit, run, *go outside and look up*. Give it its own beat.
- The events-list reading must be framed as sizing the surface, not hunting an
  answer — and the "pick one and wire it" must stay genuinely free-choice (no
  suggested events; suggesting one defeats the assignment).
- Do not pre-state whether the server's spam defense fires during the loop
  break-it, and do not assert that the bot hears itself in learner text before the
  experiment — "watch what happens" phrasing keeps it honest across versions. Do
  not spoil the `tower 100000` outcome, the nonsense-scale failures near the
  height limit, or the `/fill` discovery — all are the learner's
  measurements/finds.
- The dispatcher rewrite (goal 1) risks feeling like busywork since behavior
  doesn't change; the delivery says out loud why invisible restructuring is real
  work.
- Watch tone in the infinite-loop passage — it's the module's funniest moment and
  the temptation to mug is real; let the event describe itself.
- Loop syntax, template literals, and string-vs-number are orientation
  (underivable); the assembled setblock-in-a-loop line is never shown — that is
  the withheld problem-solving.
- Social payoff phrasing: anyone on the server can type `tower 30` and watch it
  appear. Phrase housemates/friends as option, never assumed.
- Mineflayer API property paths and command syntax: point at
  PrismarineJS/mineflayer docs and the minecraft.wiki commands pages; assert
  nothing version-sensitive.
- Cut in the merge: the standalone "unknown command policy" Go Further item (its
  self-guard caution now lives in the break-it fix); the contested-orders and
  request-queue Go Further items merged into one; the "notice the strain" seed and
  the loops explanation folded into one What-just-happened.
