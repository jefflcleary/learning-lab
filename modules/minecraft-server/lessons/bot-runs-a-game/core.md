# The bot becomes the referee

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** bot-runs-a-game
- **Part:** Part 4 — First programs
- **Scaffolding:** level 3 — fifth bot lesson; every individual tool (events, state,
  chat parsing, loops, op commands) is already proven. Goals and success criteria
  only; new concepts (timers, distance) named, never applied; no hint ladders beyond
  one or two thin concept-naming details blocks.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

A complete project, not a technique: the bot referees a full game of hide-and-seek
(or the learner's variant) for human players — announces the start, counts down in
chat, enforces phases, detects "found" by checking distances, declares a winner,
maybe teleports the winner somewhere ceremonial. Deliberately small new-concept load
(timers, distance from coordinates); the real content is COMPOSITION — everything
from the previous four bot lessons assembled into one program with a phase variable
at its heart.

Payoff: THE Part 4 milestone. Friends play a game, start to finish, that the
learner's code runs — rules enforced by a program the learner wrote, with no human
referee stepping in.

## Prerequisites

- A bot that builds on command — chat interface, loops, and op powers all proven —
  established by `lessons/bot-builds/`
- At least one other person who can join the sandbox server, for the payoff round —
  established by `lessons/joining-over-lan/` (two others make the real game; one is
  enough to test every phase)

## Establishes

- A bot that referees a complete game with human players: phases, countdowns,
  win detection, announcements — a program with a state machine, though the learner
  will know it as "the phase variable"
- The learner has composed timers, events, state, parsing, and distance math into
  one working system, and fixed a double-timer bug by guarding on state
- Cited by other cores as: "a bot that runs a multi-phase game for human players —
  established by `lessons/bot-runs-a-game/`."

## Facts

- **Timers** — stable Node built-ins, given plainly as orientation:
  - `setTimeout(whatToDo, milliseconds)` — run this once, later.
  - `setInterval(whatToDo, milliseconds)` — run this repeatedly, every so often.
  - Both hand back a handle; `clearTimeout(handle)` / `clearInterval(handle)` cancel.
  - Milliseconds: 1000 to a second.
  - A started timer does not know or care whether the reason it was started still
    applies — it fires regardless. (This fact is the seed of the break-it.)
- `bot.players` — an object with an entry per online player, keyed by username;
  each entry carries the player's username and (when conditions allow) an `entity`
  with a `.position` [verify exact shape — deliveries point at PrismarineJS/mineflayer
  docs; learner listed players from it in `lessons/bot-chat-commands/`].
- **Range caveat** [verify]: a player's `entity` is typically only present when that
  player is near enough to the bot (within view distance); far players have no
  entity/position to read, and the failure is quiet (undefined), not loud. Deliveries
  do NOT pre-solve this — it is listed among edge cases the success criteria force
  ("someone is far from the bot"); the practical mitigations (park the referee
  centrally, keep the arena reasonable, treat "can't see" explicitly) are the
  learner's design problem. Core records it so authors know it's coming.
- Distance between two positions: 3D Pythagoras —
  `Math.sqrt(dx*dx + dy*dy + dz*dz)`. Mineflayer positions may also offer a distance
  method [verify — point at docs; either route is fine].
- Phase variable: one variable naming what the game is currently doing (e.g.
  `'waiting'`, `'hiding'`, `'seeking'`); every event handler and timer callback
  checks it before acting. The learner has kept state in a variable since
  `lessons/bot-follows/`; the step up is *every input consults it*.
- Events in play — `'chat'` plus whatever join/leave events the learner found when
  they read the full events list in `lessons/bot-chat-commands/` [verify names —
  the events list at PrismarineJS/mineflayer docs is the reference; deliveries send
  the learner back to it rather than asserting].
- `/tp` teleports players — ceremonial winner treatment; syntax on the minecraft.wiki
  commands pages [volatile in detail; point, don't assert]. The bot has op from
  `lessons/bot-builds/`.
- Reference design (hide-and-seek), sketched for the author; the learner may vary:
  - `waiting` — no game. Someone says `start` (or `hide`): the speaker (or a chosen
    player) becomes the hider, everyone else seekers.
  - `hiding` — hider hides; seekers stand still by agreement (the bot announces the
    rule — code can't freeze humans, and noticing that is part of the fun); bot
    counts down in chat via repeated timer.
  - `seeking` — bot announces the hunt; on an interval, checks seeker–hider
    distances; within a threshold (learner picks, e.g. 2–3 blocks) = found.
  - over — winner announced, optional `/tp` ceremony, phase back to `waiting`.
  - Legitimate simpler variant: "found" declared by humans in chat and only
    *verified* by the bot — still a real game; distance detection is the more
    interesting build.

## Arc

### Orientation — given plainly

This is a project session, and the delivery says so in plain words: nothing new to
install, one small pair of tools to meet (timers), and a design to compose out of
parts the learner already owns. The full behavior spec of the reference game is
given up front — hiding rules, phases, countdown, found-detection, ceremony — because
a spec is orientation, not answer. What is withheld is all structure: no code shapes,
no "first write the…", no decomposition. The learner has every tool; the work is
assembly.

Timers explained plainly (see Facts). Distance = 3D Pythagoras, formula given
(math is orientation). For player positions: sent to the mineflayer docs entry on
`bot.players` — read what's actually there, including what's there when a player is
far away.

### Predictions to elicit

- Before writing anything: list every way a round can end. (Found, but what else?
  The list is longer than it first appears, and each entry is code they'll need.)
- What should happen if someone types `start` while a round is already running?
  Decide *before* coding — this is a design decision, and making it consciously is
  the difference between a rule and an accident.
- When the bot checks who's near whom: what does the bot actually know about a
  player who is far away from it? (Points the docs-reading at the right question
  before the quiet failure bites mid-game.)

### The work — goals and success criteria

Presented as a build spec with criteria, per level 3. Suggested order of proving
(each step playable before the next): countdown alone → phases switch on schedule →
found-detection with one human → full round with two.

**The game, minimum spec (or the learner's own variant of equal shape):**

1. Someone says `start` in chat → the bot announces who hides and who seeks, and
   counts down in chat (visibly ticking, not one dump).
2. Countdown ends → bot announces the hunt is on.
3. While the hunt runs, the bot detects when a seeker gets within a chosen distance
   of the hider and declares the find — or accepts a human declaration it verifies.
4. Round ends → winner announced by name; optionally `/tp` the winner somewhere
   ceremonial; the bot is ready for a new `start` without being restarted.

**Success criteria — behavioral, all must hold:**

- A full round plays start to finish with two humans and the learner's hands off the
  keyboard — no nudging the bot, no manual announcements, no restart between rounds.
- Someone joins mid-game: the game does something *deliberate* (ignores them till
  next round, or drafts them as a seeker — either, but chosen, announced, and true).
- The hider disconnects mid-hunt: the round ends cleanly with an announcement, not a
  bot that hunts a ghost forever.
- Someone says `start` during a round: the bot declines politely; one round runs.
- A player being far from the bot doesn't silently break the game (the docs-reading
  from Predict pays off here; how the learner handles "can't see" is theirs).

Thin concept-naming hints only (no application):

- <details>: the whole design hangs on one variable that names what the game is
  currently doing; every event handler and every timer callback asks it first.
  They've had a variable like that since the follow toggle — this one just has more
  than two values.
- <details>: for "check distances every couple of seconds while seeking," that is
  what `setInterval` is for — and remember what starts must somewhere be stopped.

### Break it on purpose — failures to cause, what each teaches, how to undo

Level 3 — lighter, still present:

- **Say `start` twice.** If the guard already exists, comment it out first (label
  the experiment; put it back after). Two countdowns interleave in chat, then two
  hunts fight over one phase variable. Read the chat transcript like a log: two
  timers, each faithfully doing what it was told, neither aware the world moved on.
  This is the double-timer bug every real system has — the alarm that fires for a
  meeting that was cancelled. The fix is the learner's, and they already know it:
  the callback checks the phase before acting (or the timer is cancelled at phase
  change — both work, and noticing there are two fixes is worth a sentence in the
  delivery). Undo: restore the guard.
- Optional second: disconnect the hider mid-hunt *before* handling it, and watch
  what the naive version does — then make the criteria pass. (Only if the learner
  built past it without noticing; otherwise the criteria already forced it.)

### What just happened — brief, per level 3

The learner wrote a program that manages other humans in real time — announces,
enforces, adjudicates, concludes. Rules as code. The phase variable has a name in
the trade: a state machine — a system that is always in exactly one state, where
events mean different things depending on the state, and where changes of state are
the real logic. Same event, different phase, different meaning: `start` during
`waiting` begins a game; `start` during `seeking` is an error to decline. Games,
installers, checkout flows, and network connections are all structured this way —
states and transitions. The learner has now built one on purpose and debugged the
classic failure (an input the current state wasn't expecting — the second `start`,
the vanished hider).

### Go further — open questions

- Scores across rounds. Easy while the bot runs — a variable. But restart the bot
  and the scores are gone, because variables live in the program's memory and die
  with it. Where would numbers have to live to survive a restart? (Files. The data
  arc makes this real; arriving early is allowed.)
- A second game mode — tag, say. What changes: the phases? what distance *means*?
  How much of the hide-and-seek code survives contact with a different game?
- The bot has perfect information — it always knows where the hider is. Should it
  share any? ("Warmer… colder…") What makes a game *feel* fair versus *be* fair —
  genuinely open; referees, game designers, and economists all argue about it.
- What would "spectator" mean? Someone who's connected but in no round — is that a
  fourth phase, or a property of a player? (Quietly: state can live on more than
  one thing.)

## Delivery notes

- **guided:** level 3 — the spec and criteria ARE the delivery; resist all urge to
  decompose the build for the learner. Two thin details blocks maximum, concept
  names only.
- The milestone tone: this is the payoff the whole part points at. The last line of
  the work section should put the learner's hands in their lap while other people
  play. No cheering, no exclamation marks — let the criteria carry the weight.
- Do not assert `bot.players` shape or event names — send the learner to the docs
  and their own events-list read from bot-chat-commands. The far-player quiet
  failure must NOT be pre-solved in learner text; Predict aims their reading at it.
- "Seekers stand still during hiding" is a rule the bot *announces* but cannot
  enforce — keep that observation in the delivery; code meeting the limits of code
  is worth one plain sentence.
