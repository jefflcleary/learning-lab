# Teaching it to take orders

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** bot-chat-commands
- **Part:** Part 4 — First programs
- **Scaffolding:** level 2–3 boundary — third program (third lesson of the bot/
  programming skill). Goals with success criteria; hints thinner than bot-follows
  (single collapsed hint per goal, concept + doc pointer combined; no wiring shown,
  no skeletons).
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

Turn scattered chat reactions into a command interface: the bot parses every chat
message — split it, compare it, slice it — and routes commands through an if/else
dispatcher: "come", "stay", "say <anything>", "who". First real string work, first
conditionals-as-structure, first command that carries a payload. Payoff: anyone on
the sandbox can command the bot by chat — an interface other people can actually
use. This lesson also carries THE read-the-surface assignment for mineflayer
(placed deliberately after two successes): read the entire events list in the docs,
one pass, then wire one chosen event to anything.

## Prerequisites

- A bot with events and state — "come"/"stay" following — established by
  `lessons/bot-follows/` (which carries the sandbox conditions from
  `lessons/first-bot/`: supported version, `online-mode=false`, localhost/LAN only)

Self-checks for delivery: `node bot.js` brings the bot up; saying "come" in chat
makes it walk to you; "stay" stops it.

## Leaves behind

- A bot with a command dispatcher: a chat handler that parses (trim, split,
  lowercase), routes through if/else, handles a command-with-argument, guards
  against its own messages, and answers "who" from `bot.players`
- The learner has read the complete mineflayer events list once, end to end, and
  wired one self-chosen event
- First deliberate infinite feedback loop, caused, watched, stopped, and guarded
  against
- First defensive check for missing input
- Cited by other cores as: "a bot that takes chat commands from anyone —
  established by `lessons/bot-chat-commands/`."

## Facts

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
  file already has the guard (copied from the README in first-bot), the break-it is
  "remove it and see what it was protecting you from."
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
- The events list lives in the mineflayer API document in the
  `PrismarineJS/mineflayer` repo — every event, names and arguments [stable
  location as of 2026-07; deliveries name the repo and "API documentation," not a
  deep URL].
- Command set for this lesson: `come`, `stay` (already exist — get re-routed
  through the dispatcher), `say <anything>` (payload command), `who` (answer with
  who's online). Case-insensitivity is a Go Further, not required.

## Arc

### Orientation — given plainly

Chat is about to become an **interface** — the surface through which other people
operate a program. The bot already reacts to two exact words; the difference
between reacting to words and *taking orders* is parsing: a message is a string, a
string can be taken apart, and the parts can be compared and acted on. Given
plainly: what a string is (you've been using them since `'localhost'`); that
strings come with built-in methods; the names of the handful needed today (trim,
split, toLowerCase, startsWith, slice, join) with MDN as the reference for how each
works; that an if/else chain runs exactly one branch, in order. The shape of a
command language: first word = the command, rest = the argument. Also stated
plainly: this session restructures the chat handler the learner already has —
rewiring working code into a better shape is normal work, and the old behavior
("come"/"stay") must survive the rewrite; that's the success criterion.

### Predictions to elicit

- "say hello there" has to make the bot say "hello there". The handler receives the
  whole message as one string — what has to happen to it before the bot can act?
  Sketch the steps in plain words, no code.
- The bot speaks in the same chat it listens to. Does it hear itself? What could
  that lead to? (Do not resolve; the break-it answers it.)
- When you read the full list of everything a bot can react to: how many events do
  you expect there to be? Write a number.

### The work — goals and hint ladders

Level 2–3: goals with success criteria; one collapsed hint each (concept + pointer
combined, no wiring). The learner has two working programs behind them.

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

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Let it hear itself.** Add (or expose) a rule that answers *every* message —
  simplest: an `else` branch that replies something like "unknown command" to
  anything that isn't one, with no self-guard (if a guard came along from the
  README example in first-bot, comment it out — that's the experiment). Then say
  anything unrecognized in chat and watch what happens. If the bot hears its own
  messages, its reply triggers its own handler, which replies, which triggers — a
  feedback loop, live, in public chat, at machine speed. Stop it: Ctrl-C (or watch
  whether the server stops it first — servers defend themselves against chat
  spam; what yours does is worth knowing). The permanent fix, now earned: first
  line of the handler, if the speaker is the bot itself, return. Teaches: a
  program that reacts to a channel it also writes to *will* meet itself; every
  echo/notification/auto-reply system ever built has this failure mode; the guard
  is one line and now the learner knows exactly what it's guarding. Undo: restore
  guard; keep the else-branch or not (their policy — see Go Further).
- **Give an order with nothing in it.** Say "say" — just the word, no payload.
  Watch: depending on how the parsing was written, the bot chats emptiness, prints
  nonsense, or crashes — read whatever appears. Teaches: input from humans arrives
  malformed, routinely and innocently; code that reaches for "the rest of the
  message" must first ask whether there *is* a rest. Fix: a length check before
  using the payload, replying with usage ("say what?") — the learner's first
  defensive check, and the difference between code that works when used correctly
  and code that works. Undo: the fix is the undo; "say" alone now gets a civil
  answer.

### What just happened — the explanation

What the handler now does — read, split, decide, act — is not a bot trick; it is
what *every* program that takes human input does. The terminal the learner has
been typing into all course does exactly this: reads a line, splits off the first
word, finds what that word names, hands the rest over as arguments — that loop was
named all the way back in dev-machine-setup, and today the learner built one of
their own. The server console from `lessons/console-commands/` — same shape. Every
chat app command, every search box, every shell on every machine: read, split,
decide, act. The if/else chain has a name in this role — a **dispatcher**: one
place where messages arrive and get routed to the code that handles them.

One layer deeper, planting a seed and not watering it: four commands make a fine
if/else chain. Imagine forty. The chain gets long, every command's code lives in
one giant function, and adding one means scrolling through all of them. Feeling
*that* — what gets hard as things multiply — is where the next tier of program
structure comes from; there's a shape for it, and it can wait. Noticing the strain
is today's only assignment on this front.

### Go further — open questions

- Should "SAY hello" work? "Come"? Make the command language case-insensitive —
  and decide whether the *payload* of "say" should be case-flattened too (careful:
  those are different questions).
- A "help" command that lists every command the bot knows. When you add a
  command next week, what has to happen so "help" stays truthful? Is there a way
  it *can't* drift?
- What should happen on an unknown command — silence, a correction, a suggestion?
  There's no right answer; there is *your* answer. Decide the policy, implement
  it, and mind the self-guard while you do (you know why now).
- Genuinely open: two people give contradictory standing orders — one says "come",
  the other immediately says "stay". Last-word-wins is what you built. Is it
  right? Who *should* the bot obey — the first speaker, the last, the nearest, an
  owner? Does a bot need a concept of whose orders rank higher, and what does
  implementing "rank" even look like? Every multi-user system ever built has had
  to answer this, and none of them agree.

## Delivery notes

- **guided:** hints are single blocks per goal here — thinner than bot-follows by
  design; resist expanding them. No code skeletons anywhere in this delivery.
- The events-list reading must be framed as sizing the surface, not hunting an
  answer — and the "pick one and wire it" must stay genuinely free-choice (no
  suggested events; suggesting one defeats the assignment).
- Do not pre-state whether the server's spam defense fires during the loop
  break-it, and do not assert that the bot hears itself in learner text before the
  experiment — "watch what happens" phrasing keeps it honest across versions.
- The dispatcher rewrite (goal 1) risks feeling like busywork since behavior
  doesn't change; the delivery says out loud why invisible restructuring is real
  work.
- Watch tone in the infinite-loop passage — it's the course's funniest moment and
  the temptation to mug is real; let the event describe itself.
