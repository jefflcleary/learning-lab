# Making it care where you are

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** bot-follows
- **Part:** Part 4 — First programs
- **Scaffolding:** level 2 — second program (second lesson of the bot/programming
  skill). Goals plus hints; concepts named but not applied; no full worked answer
  (ladder stops at rung 3).
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

Turn the greeter bot into a creature that follows people: chat "come" and it walks
to whoever called; "stay" stops it. The real cargo is the gap between doing a thing
*once* and doing a thing *continuously* — the loop concept arriving physically
before any `for` loop arrives syntactically — plus state (a variable as the
program's memory between events). Payoff: a creature that visibly cares where
people are, and that anyone on the sandbox can summon by chat.

The lesson also carries an honest limitation by design: naive following walks into
walls and off ledges, and the lesson says so plainly. Terrain defeats the simple
approach; real pathfinding exists (`lessons/bot-pathfinding/`, later) *because* of
exactly this. Ending with an imperfect follower is the intended ending.

## Prerequisites

- A bot that joins your sandbox and speaks — established by `lessons/first-bot/`
  (which itself requires the sandbox: supported version, `online-mode=false`,
  localhost/LAN only)

Self-checks for delivery: sandbox starts; `node bot.js` in `~/projects/first-bot`
makes the bot appear and greet; Ctrl-C removes it.

## Establishes

- A bot with a chat handler, a state variable, and a repeating check — it follows
  the most recent caller on "come" and stops on "stay"
- The learner has met: `bot.on` vs `bot.once` in practice, state shared between
  handlers, `setInterval`, reading a runtime crash (property of undefined/null)
- The felt distinction between an action and an ongoing behavior (set-and-forget
  controls; state left on)
- Cited by other cores as: "a bot with events and state — established by
  `lessons/bot-follows/`."

## Facts

- Work continues in `~/projects/first-bot/bot.js` (or a copy — copying `bot.js` to
  keep the working greeter is cheap and worth suggesting; `cp bot.js bot-follows.js`
  then `node bot-follows.js`, learner's choice).
- Restart-to-apply for code: a running `node` process is the old file in memory —
  Ctrl-C and `node bot.js` again after every edit. Same principle the learner met
  with `server.properties` (read at startup); name the rhyme.
- API shapes (core sketch; deliveries point at the mineflayer docs — the API
  document in the `PrismarineJS/mineflayer` repo — rather than asserting
  signatures):
  - `bot.on('chat', (username, message) => { ... })` — fires on every chat message;
    first argument is the speaker's name [verify: also fires for the bot's own
    messages — the README's echo example guards against self, implying it does;
    this lesson's handlers only react to "come"/"stay" so self-triggering is inert
    here; the discovery is deliberately reserved for bot-chat-commands].
  - `bot.players` — object keyed by username; `bot.players[name]` has an `.entity`
    only while that player is within the bot's view distance, otherwise it is not
    usable [verify: entity is null when out of range].
  - `entity.position` — a Vec3 (x, y, z object); `position.distanceTo(other)`
    returns blocks between two positions [verify Vec3 method name].
  - `bot.entity.position` — the bot's own position.
  - `bot.lookAt(position)` — turns the bot's head to face a point [verify signature;
    verify: aiming at feet vs head — `entity.position` is at the feet; offsetting up
    by eye height looks more natural; do not assert the offset call, let docs/
    experiment decide].
  - `bot.setControlState('forward', true)` / `('forward', false)` — press/release a
    movement control, exactly like holding a key [verify]. Other controls exist
    ('jump', 'sprint') — Go Further, not taught.
- `setInterval(fn, ms)` — plain JavaScript, stable, no verify needed: run `fn`
  every `ms` milliseconds, forever, until stopped. 200 ms is a fine check rate for
  following (~5×/second); the exact number is not load-bearing.
- A top-level variable (e.g. `let target = null`) is visible to every handler in
  the file: handlers write it, the interval reads it. `let` vs `const`: `const`
  from first-bot can't be reassigned; a value that must change over time needs
  `let`. Name this at friction.
- Stopping distance: ~2 blocks works; closer and the bot shoves the player, larger
  and it hangs back. Learner tunes by experiment.
- Crash shape for the out-of-range break-it: `TypeError: Cannot read properties of
  null (reading 'position')` or similar [verify exact wording per Node version —
  delivery has the learner read whatever appears, not match a printed string].
- The naive follower's known failure modes (stated plainly, they are the honest
  limitation): walks straight lines only — into walls, off cliffs, into water;
  cannot detour, cannot jump gaps unless told; loses the target when the player
  leaves view distance. Perfect following is not achievable with today's tools in
  this lesson; `lessons/bot-pathfinding/` exists because of this.

## Arc

### Orientation — given plainly

The gap this lesson lives in: the greeter did a thing once, at one moment
("when I spawn, say a line"). Following is not one action — it's a behavior that has
to keep being true as the world changes. Two new ideas get named up front, plainly:

1. **State.** Handlers run and end. For the bot to keep following between events,
   *who to follow* has to live somewhere that outlasts any one function — a
   variable at the top of the file, which every handler can read and write. A
   variable is the program's memory between events.
2. **The repeating check.** Something must re-aim the bot as the target moves.
   `setInterval` runs a function on a timer, forever — given plainly with its
   signature, because it's plumbing, not the puzzle.

Also given plainly: the mineflayer docs location (API document in the repo — this
lesson's pointers name things like `bot.players`, `bot.lookAt`,
`bot.setControlState`, and the learner reads the real signatures there); the
edit → Ctrl-C → rerun rhythm and its rhyme with restart-to-apply from
server-settings; the honest limitation, stated before the work starts: today's
follower will be defeated by terrain, and that is the expected ending, not a
failure.

### Predictions to elicit

- The bot needs to notice when someone says "come". Given how spawn worked ("when X
  happens, run this"), what shape do you expect chat-noticing to take?
- Walking toward a moving player: how often does the bot need to re-check where
  they are? Once? Every second? Every step? What goes wrong at each rate?
- What should the bot do when the person it's following climbs somewhere it can't
  walk to? (No right answer — the point is having expected *something* before
  watching what actually happens.)

### The work — goals and hint ladders

Escalating goals; each builds on the last. Level 2: hints name concepts and point
at docs, never show the wiring.

1. **Answer the call.** Anyone chats "come" → the bot replies in chat, naming who
   called ("On my way, <name>"). No movement yet.
   - Rung 1: you already handled one event. This is another event, and unlike
     spawn, this one hands your function information — have your greeting prove it
     by using the caller's name.
   - Rung 2: the event is `chat`; the docs show what arguments your function
     receives. Note `on` vs `once` — a follower must hear every message, not the
     first one. Compare the message against the word you're listening for with
     `===`.
   - Rung 3: the `chat` event entry in the mineflayer API document — read the
     argument list there. (Also: chat from *you* in game is what triggers it —
     test by joining the sandbox and talking.)
2. **Turn to face the caller.** On "come", the bot turns to look at whoever said
   it. Movement is one goal away; facing proves you can find a player in the
   bot's world.
   - Rung 1: the bot must be able to answer "where is that player right now?"
     The bot object carries a directory of everyone online, keyed by name — and
     you have the caller's name.
   - Rung 2: from the directory entry you can reach the player's in-world body and
     its position; the bot has a method that turns to face a position. One catch,
     worth knowing early: the bot can only "see" players within its view distance
     — a player's body info is only there while they're near enough.
   - Rung 3: `bot.players`, `.entity`, `.position`, and `bot.lookAt` — read each in
     the API document; the docs state exactly what `bot.players[name]` contains
     and when.
3. **Walk to the caller, and stop when close.** The real thing: "come" makes the
   bot walk to the caller — even while the caller moves — and stop within a couple
   of blocks instead of shoving them.
   - Rung 1: two separate problems, so split them. Problem one: making the bot
     walk at all (it's like holding down a key — and note that a held key stays
     held). Problem two: a player who moves after you aimed. One aim at
     "come"-time goes stale; something has to re-aim, over and over. That's what
     the repeating check from the orientation is for.
   - Rung 2: the concepts, named. *State:* store the caller's name in a top-level
     variable when "come" arrives (`let`, because it changes). *The loop:* a
     `setInterval` function that runs several times a second: if nobody's being
     followed, do nothing; otherwise look up the target's current position, face
     it, and set the forward control on or off depending on how far away they
     are. Distance between two positions is one method call — the docs on
     positions have it. Stopping is not "don't press forward," it's "*release*
     forward" — controls stay where you set them.
   - Rung 3: `bot.setControlState('forward', ...)` and the position/distance
     methods, in the API document. A workable check rate is a few times a second
     (e.g. every 200 ms), and a workable stopping distance is around 2 blocks —
     tune both by watching.
4. **"stay" means stay.** Anyone chats "stay" → the bot stops where it is and
   stops caring where people are, until the next "come".
   - Rung 1: you built following out of two pieces — memory and a repeating
     check. "stay" only has to touch the memory... and deal with whatever the
     controls were doing at that instant.
   - Rung 2: clear the state variable (nothing-to-follow is a value too — that's
     what `null` is for) and release the forward control. If the bot slides one
     more step after "stay", work out which of the two you forgot.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Never let go.** Comment out the line that releases the forward control (the
  one that runs when the target is close). Say "come", let it reach you, and
  watch: it arrives — and keeps walking, into you, past you, into the wall,
  forever, legs churning. Teaches the difference between *doing* and
  *not-stopping*: `setControlState` is a held key, and state you set stays set
  until something clears it. Half the strange behavior in interactive programs is
  state someone forgot to clear. Undo: restore the line, rerun.
- **Walk off its map.** Have the bot follow you, then sprint far away or drop
  behind a hill until you're out of its view distance — and watch the bot's
  terminal. The program crashes; read the whole message. It says it tried to read
  `position` from something that wasn't there: the player directory only holds a
  body for players the bot can currently see, and your code assumed forever what
  was only true sometimes. Fix by checking before touching (if the target has no
  usable entity right now, skip this tick — or stop following; learner's policy
  choice). Teaches: the crash message names exactly what was missing, and
  "sometimes-there" data must be checked every time. Undo: the fix *is* the undo;
  rerun and repeat the sprint to prove it survives.
- **Someone else says "come".** Recruit a second player on the sandbox (or join
  from a second account/machine per `lessons/joining-over-lan/` if that's been
  done) and have *them* say "come" — optional if no second player is available
  today, but worth doing the moment one is. Whatever happens next is a mirror held
  up to your code: did you store *the caller*, or did you quietly assume the only
  player who'd ever call is you? If the bot follows them, your code was honest; if
  it follows you, or crashes, find the assumption. Teaches: programs meet users
  the author didn't imagine, sooner than expected. Nothing to undo.

### What just happened — the explanation

The program is mostly *waiting* — and that's not an implementation detail, it's the
shape of the whole species. An event fires, a handler runs for a millisecond,
everything goes quiet again; the interval ticks, checks, goes quiet. Between those
moments, nothing is "running" at all — the only thing that persists is state: one
variable holding a name. Handlers write it, the tick reads it, and the *behavior*
the humans see — "it follows people" — is nowhere in the code as a single thing.
It's an emergent fact of memory plus a repeating check. Every interactive program —
the game itself, phone apps, the server with its own tick loop deciding mob
movement twenty times a second — is this same shape: wait, react, remember, check
again. One layer deeper: this is called an event loop, and Node itself runs one
under every program the learner will ever write here.

And the limitation, honestly: the bot walks a straight line at a point, so terrain
beats it — walls, cliffs, water. That is not sloppiness to be fixed with more of
the same; walking *around* things is a genuinely hard problem (searching possible
routes through a world), it has a name — pathfinding — and it's a later lesson
precisely because what was built today isn't enough. Knowing where the edge of
today's tool sits is part of owning it.

### Go further — open questions

- The controls include more than forward — the docs list them. Could the bot
  sprint to a far caller and walk to a near one? Could a well-timed jump get it up
  a one-block step?
- Follow at a respectful distance: keep the bot exactly ~4 blocks away — walking
  backward when you step toward it. What does "exactly" cost you at the check
  rate you chose?
- Two people alternate saying "come". The bot obeys whoever spoke last. Is that
  the right rule? What would "busy — currently following someone" look like?
- Genuinely open: how could a program *tell* it was stuck? To you it's obvious —
  the legs churn, the wall doesn't move. What would the bot have to remember and
  compare, over time, to notice that about itself? (Anything you invent here is a
  real answer; this is a live problem in robotics, not just Minecraft.)

## Delivery notes

- **guided:** state the honest limitation in "What this is" and again in "What just
  happened" — the lesson must never read as promising smooth following. The
  pathfinding link is a promise that the wall is a later door, which is the
  course's whole disposition.
- Level 2 discipline: rung 3 names identifiers and doc locations but never shows a
  line of wiring. The only code-shaped thing in the delivery is nothing — no
  skeletons this time; the learner has a working file to grow.
- The second-player break-it is phrased as option ("when one is available"), never
  assumed household.
- Suggest copying bot.js before surgery, once, lightly — keeping a known-good
  version is a habit worth seeding before git arrives.
