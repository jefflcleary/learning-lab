# Bots that referee games and navigate

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** bot-games-and-pathfinding
- **Module / Part:** minecraft-server — Part 4 — First programs
- **Scaffolding:** level 3 throughout — this is the closing lesson of the bot
  skill; every individual tool (events, state, chat parsing, loops, op commands,
  the npm routine) is already proven. Per-section: the **pathfinding half** is
  level 3 with the mineflayer-pathfinder README assigned as the primary text
  (second read-the-whole-reference assignment; minimal hints, concept names
  only); the **game half** is level 3 pure composition — spec and behavioral
  success criteria only, new concepts (timers, distance) named but never
  applied, no decomposition offered.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

Two movements, one session, ending at the Part 4 milestone.

First, a debt gets settled: the following bot from `lessons/writing-your-first-bot/`
still walks into walls — its naive movement was honestly diagnosed there as
terrain-blind. The learner installs mineflayer-pathfinder (a second npm install —
noting how unremarkable the dependency routine feels the second time is itself
content: that's what learning a workflow is), loads it as a plugin, and replaces
naive movement with real navigation: the bot walks to called coordinates around
obstacles, follows for real across terrain, and comes to a named player on command.

Then, composition: the bot — which can now actually get places — referees a full
game of hide-and-seek (or the learner's variant) for human players. It announces
the start, counts down in chat, enforces phases, detects "found" by checking
distances, declares a winner, resets for the next round. Deliberately small
new-concept load (timers, distance from coordinates); the real content is
COMPOSITION — everything from the earlier bot lessons assembled into one program
with a phase variable at its heart. Navigation is available to the referee design
(walk to the winner for the ceremony, walk to the find to declare it) but never
required — the game must work with announcements alone.

Payoff: THE Part 4 milestone. Friends watch the bot navigate the family's actual
builds to reach whoever calls it — the follow-me from weeks ago, finally real,
demonstrable to the same people who watched the old bot faceplant into a wall —
and then play a game, start to finish, that the learner's code runs, rules
enforced by a program with no human referee stepping in.

Deeper lessons, stated in what-just-happened: yesterday's impossible became
today's npm install (libraries are other people's solved problems, and sensing
that a problem PROBABLY HAS a library is a professional instinct worth naming);
and the phase variable is a state machine, the shape most real software takes.

## Prerequisites

- A bot that follows a player naively — and firsthand memory of where that
  movement fails (walls, cliffs, water) — plus the npm install routine: a bot
  folder with a `package.json` and one dependency already installed there —
  established by `lessons/writing-your-first-bot/`
- A bot that takes chat commands and builds on command — chat interface, parsing,
  loops, and op powers all proven — established by
  `lessons/bot-commands-and-building/`
- At least one other person who can join the sandbox server, for the payoff
  round — established by `lessons/letting-friends-join/` (two others make the
  real game; one is enough to test every phase)

## Establishes

- A bot with mineflayer-pathfinder installed and loaded that navigates real
  terrain: to coordinates, after a moving player, to a named caller
- A bot that referees a complete multi-phase game for human players: phases,
  countdowns, win detection, announcements — a program with a state machine,
  though the learner will know it as "the phase variable"
- The learner has installed a second dependency, loaded a plugin, worked from a
  library README as primary documentation, composed timers, events, state,
  parsing, and distance math into one working system, and fixed a double-timer
  bug by guarding on state
- Cited by other cores as: "a bot that can navigate to a point or a player
  across real terrain, and referee a multi-phase game for human players —
  established by `lessons/bot-games-and-pathfinding/`."

## Facts

Pathfinding:

- **mineflayer-pathfinder** — a community library that gives a mineflayer bot
  real navigation: give it a goal, it computes and walks a route. Project:
  `PrismarineJS/mineflayer-pathfinder` on GitHub. The README there is the primary
  documentation and THE assigned text of the first half of this lesson [volatile
  in API detail as of 2026-07 — deliveries point at the README for every
  signature, assert none].
- Install: `npm install mineflayer-pathfinder` in the bot's folder (same routine
  as `lessons/writing-your-first-bot/`; copyable).
- Plugin pattern: mineflayer supports plugins — code that attaches new abilities
  to an existing bot object. Loading is via `bot.loadPlugin(...)` [verify —
  README shows the exact require/load lines; deliveries send the learner there].
- Goals are objects describing where to end up; the README documents a family —
  names like `GoalNear` (get within a radius of a point), `GoalFollow` (keep near
  an entity), `GoalBlock` / `GoalXZ` and others [verify names against README —
  learner reads the full goal list as the read-the-surface assignment].
- A goal is set via the pathfinder's set-goal call [verify exact call — README];
  following-type goals can be dynamic (recomputed as the target moves) [verify].
- **Movements configuration**: an object controlling what the bot is allowed to
  do while pathing — dig through blocks, place scaffolding blocks, etc. [verify
  property names — README]. With permissions granted (and materials, for
  placing), the pathfinder can dig through and bridge across obstacles [verify
  capabilities].
- Unreachable goals: what the library does (give up, emit a status, retry) is NOT
  asserted — the break-it has the learner find out empirically, then read the
  README for events/status reporting (path events with success/failure statuses
  exist [verify names]).
- Optional continuity: if `lessons/git-for-your-server/` was done, commit the
  naive follow before replacing it; otherwise a copy of the file does the same
  job. Light touch, one line in delivery.
- A* — the algorithm family under the hood; named in ONE sentence in
  what-just-happened as "an algorithm with a name and a Wikipedia page,"
  explicitly optional depth. No further algorithm content in learner text.

The game:

- **Timers** — stable Node built-ins, given plainly as orientation:
  - `setTimeout(whatToDo, milliseconds)` — run this once, later.
  - `setInterval(whatToDo, milliseconds)` — run this repeatedly, every so often.
  - Both hand back a handle; `clearTimeout(handle)` / `clearInterval(handle)`
    cancel.
  - Milliseconds: 1000 to a second.
  - A started timer does not know or care whether the reason it was started
    still applies — it fires regardless. (This fact is the seed of the
    double-start break-it.)
- `bot.players` — an object with an entry per online player, keyed by username;
  each entry carries the player's username and (when conditions allow) an
  `entity` with a `.position` [verify exact shape — deliveries point at
  PrismarineJS/mineflayer docs; learner listed players from it in
  `lessons/bot-commands-and-building/`].
- **Range caveat** [verify]: a player's `entity` is typically only present when
  that player is near enough to the bot (within view distance); far players have
  no entity/position to read, and the failure is quiet (undefined), not loud.
  This bites both halves: "come to me from anywhere" in practice means "from
  anywhere the bot can currently know about you," and mid-game a far player has
  no readable position. Deliveries do NOT pre-solve it — it is listed among edge
  cases the game's success criteria force ("someone is far from the bot"); the
  practical mitigations (park the referee centrally, keep the arena reasonable,
  treat "can't see" explicitly) are the learner's design problem. Core records
  it so authors know it's coming.
- Distance between two positions: 3D Pythagoras —
  `Math.sqrt(dx*dx + dy*dy + dz*dz)`. Mineflayer positions may also offer a
  distance method [verify — point at docs; either route is fine].
- Phase variable: one variable naming what the game is currently doing (e.g.
  `'waiting'`, `'hiding'`, `'seeking'`); every event handler and timer callback
  checks it before acting. The learner has kept state in a variable since the
  follow toggle; the step up is *every input consults it*.
- Events in play — `'chat'` plus whatever join/leave events the learner found
  when they read the full events list in `lessons/bot-commands-and-building/`
  [verify names — the events list at PrismarineJS/mineflayer docs is the
  reference; deliveries send the learner back to it rather than asserting].
- `/tp` teleports players — ceremonial winner treatment; syntax on the
  minecraft.wiki commands pages [volatile in detail; point, don't assert]. The
  bot has op from `lessons/bot-commands-and-building/`. With pathfinding loaded,
  walking to the winner is a legitimate alternative ceremony — the referee
  arrives on foot.
- Reference design (hide-and-seek), sketched for the author; the learner may
  vary:
  - `waiting` — no game. Someone says `start` (or `hide`): the speaker (or a
    chosen player) becomes the hider, everyone else seekers.
  - `hiding` — hider hides; seekers stand still by agreement (the bot announces
    the rule — code can't freeze humans, and noticing that is part of the fun);
    bot counts down in chat via repeated timer.
  - `seeking` — bot announces the hunt; on an interval, checks seeker–hider
    distances; within a threshold (learner picks, e.g. 2–3 blocks) = found.
  - over — winner announced, optional ceremony (`/tp` the winner somewhere, or
    the bot navigates to them to award it in person), phase back to `waiting`.
  - Legitimate simpler variant: "found" declared by humans in chat and only
    *verified* by the bot — still a real game; distance detection is the more
    interesting build.

## Arc

### Orientation — given plainly

Open on the debt, by name: the follow bot walks into walls; it was built knowing
that; today it stops — and then the upgraded bot goes to work as a referee. Two
movements, stated up front.

For the first: the plain facts — what mineflayer-pathfinder is, where it lives,
that its README is the primary text of this half, the install command, and that
mineflayer has a plugin mechanism the README will demonstrate. The assignment
pattern is explicit and familiar: like the events list before, the first task is
to read the whole surface — every goal type the library offers — before building
anything. Also plainly: the second-install observation. The delivery says, in
one sentence, that the learner should notice how routine `npm install` feels
this time — the same act that was a whole lesson once. That noticing is the
meta-lesson.

For the second: this is a project, and the delivery says so in plain words —
nothing more to install, one small pair of tools to meet (timers), and a design
to compose out of parts the learner already owns. The full behavior spec of the
reference game is given up front — hiding rules, phases, countdown,
found-detection, ceremony — because a spec is orientation, not answer. What is
withheld is all structure: no code shapes, no "first write the…", no
decomposition. Timers explained plainly (see Facts). Distance = 3D Pythagoras,
formula given (math is orientation). For player positions: sent to the
mineflayer docs entry on `bot.players` — read what's actually there, including
what's there when a player is far away.

### Predictions to elicit

- Before the first pathfinding run: place a wall between the bot and a target,
  predict the route it will pick — then compare against what it actually walks.
- Before the pathfinding break-it: what SHOULD a navigator do about an
  impossible destination? Write down which of give-up / report / try-forever
  you'd design, then find out what this library chose.
- Before replacing the follow: which of the terrain failures from the old bot
  do you expect to survive the upgrade, if any? (Water? Cliffs? Fences?)
- Before writing any game code: list every way a round can end. (Found, but
  what else? The list is longer than it first appears, and each entry is code
  they'll need.)
- What should happen if someone types `start` while a round is already running?
  Decide *before* coding — a design decision made consciously is the difference
  between a rule and an accident.
- When the bot checks who's near whom: what does the bot actually know about a
  player who is far away from it? (Points the docs-reading at the right question
  before the quiet failure bites mid-game — and it already matters for `come`.)

### The work — goals and success criteria

Per level 3 throughout: goals and criteria; the README and the mineflayer docs
supply every signature.

First movement — teaching it to walk:

0. **Read the surface.** Install the library, open the README top to bottom: the
   loading example, every goal type, the movements section, the events. Not
   memorizing — sizing the space. (Same assignment shape as the events list.)

1. **Walk to a called coordinate.** Chat command (e.g. `goto x y z`) sends the
   bot there. Criteria: numbers parsed from chat (proven skill); the destination
   is somewhere a straight line CANNOT reach — behind a wall, across a gully;
   the bot arrives anyway. Watch the route: it is visibly non-obvious — it goes
   around, and (depending on the movements settings) may dig through or bridge
   across. Watching the route it picks IS part of the task.

2. **Real following.** Replace the naive follow with a following goal. Criteria:
   take the bot to the exact spot where the old follow failed — the wall it hit,
   the terrain that beat it — and watch the same scenario succeed. (One line:
   preserving the old code first is worth it — commit if git is in use from
   `lessons/git-for-your-server/`, copy the file if not. The old version is the
   before photo.)

3. **Come when called.** Command: anyone says `come`, the bot navigates to the
   speaker, from wherever it is, around whatever is between. Criteria: called
   from out of sight, arrives; called by a different player, goes to THEM (not
   the first speaker — the goal must be built from whoever spoke).

Transition (internal, replaces the old lesson boundary): the bot can now get
anywhere it's asked. Time to give it a job that uses everything it has —
including, if the learner wants, the legs.

Second movement — the referee. Presented as a build spec with criteria.
Suggested order of proving (each step playable before the next): countdown
alone → phases switch on schedule → found-detection with one human → full round
with two.

**The game, minimum spec (or the learner's own variant of equal shape):**

4. Someone says `start` in chat → the bot announces who hides and who seeks, and
   counts down in chat (visibly ticking, not one dump).
5. Countdown ends → bot announces the hunt is on.
6. While the hunt runs, the bot detects when a seeker gets within a chosen
   distance of the hider and declares the find — or accepts a human declaration
   it verifies.
7. Round ends → winner announced by name; optionally a ceremony — `/tp` the
   winner somewhere ceremonial, or (navigation is loaded now) the bot walks to
   the winner and says it to their face; the bot is ready for a new `start`
   without being restarted. Navigation in the game is optional garnish — every
   criterion below must hold with announcements alone.

**Success criteria — behavioral, all must hold:**

- A full round plays start to finish with two humans and the learner's hands off
  the keyboard — no nudging the bot, no manual announcements, no restart between
  rounds.
- Someone joins mid-game: the game does something *deliberate* (ignores them
  till next round, or drafts them as a seeker — either, but chosen, announced,
  and true).
- The hider disconnects mid-hunt: the round ends cleanly with an announcement,
  not a bot that hunts a ghost forever.
- Someone says `start` during a round: the bot declines politely; one round runs.
- A player being far from the bot doesn't silently break the game (the
  docs-reading from Predict pays off here; how the learner handles "can't see"
  is theirs — and note the referee can now *walk* somewhere more central, which
  is a design option, not the assigned answer).

Thin hints, concept-name only, max two per movement:

- <details> (pathfinding): the README's own first example is the loading
  pattern — the require line, the loadPlugin line. Reading examples for their
  skeleton is the skill.
- <details> (pathfinding): "get near a player" and "keep following a player" are
  different goals in the README's list; picking the right goal type is the
  design decision.
- <details> (game): the whole design hangs on one variable that names what the
  game is currently doing; every event handler and every timer callback asks it
  first. They've had a variable like that since the follow toggle — this one
  just has more than two values.
- <details> (game): for "check distances every couple of seconds while seeking,"
  that is what `setInterval` is for — and remember what starts must somewhere be
  stopped.

### Break it on purpose — failures to cause, what each teaches, how to undo

Level 3 — lighter, still present. Three, curated from the sources:

- **The impossible errand.** Seal a small room (or pick a spot with no route).
  Send the bot there. First predict (see above), then observe: does it give up,
  report, or try forever? Whatever it does, the follow-up is the real task:
  find in the README what the library offers for "couldn't" — events, statuses,
  timeouts [verify names — the finding is the learner's]. Teaches: real
  libraries have a vocabulary for failure, and it's documented where success
  is. Undo: unseal the room / clear the goal.
- **Break its legs.** In the movements configuration, forbid digging [verify
  property — README], and give the bot a goal it previously dug through. The
  same destination becomes unreachable — not because the world changed, but
  because the rules did. Teaches: "possible" is relative to allowed moves — the
  map didn't change, the move set did (this idea returns if the learner ever
  meets search problems again). Undo: restore the setting.
- **Say `start` twice.** If the guard already exists, comment it out first
  (label the experiment; put it back after). Two countdowns interleave in chat,
  then two hunts fight over one phase variable. Read the chat transcript like a
  log: two timers, each faithfully doing what it was told, neither aware the
  world moved on. This is the double-timer bug every real system has — the
  alarm that fires for a meeting that was cancelled. The fix is the learner's,
  and they already know it: the callback checks the phase before acting (or the
  timer is cancelled at phase change — both work, and noticing there are two
  fixes is worth a sentence in the delivery). Undo: restore the guard.

(Dropped from the sources: the optional hider-disconnect replay — the game's
success criteria already force it.)

### What just happened — the explanation

Gently, the algorithm reveal: while the bot walked, the library was running a
search — considering many candidate paths per tick, scoring them, extending the
promising ones, over the actual blocks of the world. The algorithm has a name,
A*, and a Wikipedia page, and reading it is entirely optional — the point is not
the algorithm but the fact that it was *available*. The wall the follow bot hit
weeks ago was, at the time, impossible. Today it was an npm install. Nothing
about the learner changed in between — what changed is that they reached for a
library. Libraries are other people's solved problems, packaged; the instinct
that a given problem PROBABLY HAS one — navigation, parsing, image resizing,
almost anything with a name — is one of the most professional instincts there
is. The follow-up instinct came free: judge a library by its README, and read
the whole surface before using any of it. And the plugin idea, one layer deep:
`loadPlugin` attached new abilities to an existing object at runtime; the bot
didn't get replaced, it got extended. Most big software is assembled exactly
this way.

Then the referee: the learner wrote a program that manages other humans in real
time — announces, enforces, adjudicates, concludes. Rules as code, running
against people who did not read the code and will do unexpected things anyway
(that's why the criteria pushed on joins, disconnects, double-starts). The
phase variable has a name in the trade: a state machine — a system that is
always in exactly one state, where events mean different things depending on
the state, and where changes of state are the real logic. Same event, different
phase, different meaning: `start` during `waiting` begins a game; `start`
during `seeking` is an error to decline. Games, installers, checkout flows, and
network connections are all structured this way. The learner built one on
purpose and debugged the classic failure (an input the current state wasn't
expecting).

### Go further — open questions

- Patrol routes: a list of points, visited in order, forever. What happens at
  list's end — and is a patrol a new idea, or a loop plus goals?
- A butler: `fetch` — the bot navigates to a chest, takes an item, brings it
  back. Pathfinding plus inventory APIs; the mineflayer docs are the dig site.
  Real archaeology, no map provided.
- When is the naive movement from the old follow actually BETTER than
  pathfinding? Genuinely open — think about what each costs, and what "better"
  means when the target is two blocks away on flat ground.
- Be the algorithm: draw a small maze on paper, put the bot at one end by hand,
  and find the path the way you think the library does — what do you write
  down, what do you cross out, when do you know you're done? (Then, if curious,
  the A* page — compare notes with fifty years of computer science.)
- Scores across rounds. Easy while the bot runs — a variable. But restart the
  bot and the scores are gone, because variables live in the program's memory
  and die with it. Where would numbers have to live to survive a restart?
  (Files. The data arc makes this real; arriving early is allowed.)
- The bot has perfect information — it always knows where the hider is. Should
  it share any? ("Warmer… colder…") What makes a game *feel* fair versus *be*
  fair — genuinely open; referees, game designers, and economists all argue
  about it.

(Dropped from the sources: the second-game-mode question and the spectator
question — the curated list keeps the two genuinely open ones plus the four
that extend what this lesson actually built.)

## Delivery notes

- Merged from the cores of `bot-pathfinding` ("Teaching it to walk") and
  `bot-runs-a-game` ("The bot becomes the referee"), 2026-08. Order deliberately
  inverted from the old recommended path: pathfinding first (it settles the
  follow-me debt and upgrades movement), then the game, which may lean on
  navigation but must not require it.
- **guided:** level 3 throughout. In the pathfinding half the README is the
  delivery's co-author — every API surface question in learner text is answered
  with "the README shows this," never with an asserted signature. Assert only:
  the library's existence and purpose, the install command, that a plugin
  mechanism exists. In the game half the spec and criteria ARE the delivery;
  resist all urge to decompose the build. Two thin details blocks per movement,
  concept names only.
- The rematch staging in the following goal matters: same bot, same wall,
  different outcome — that's the social demo too (same audience who saw it
  faceplant).
- The milestone tone: the game is the payoff the whole part points at. The last
  line of the work section should put the learner's hands in their lap while
  other people play. No cheering, no exclamation marks — let the criteria carry
  the weight.
- Do not assert what pathfinder does with unreachable goals, exact goal-class
  names, movements property names, `bot.players` shape, or event names —
  [verify]-tagged above; discovery is routed through the README and the
  mineflayer docs. The far-player quiet failure must NOT be pre-solved in
  learner text; Predict aims the reading at it.
- The second-install noticing should be exactly one sentence in the delivery —
  underlining it harder would turn it into cheerleading.
- "Seekers stand still during hiding" is a rule the bot *announces* but cannot
  enforce — keep that observation; code meeting the limits of code is worth one
  plain sentence.
- No version assertions anywhere (mineflayer support range was the learner's
  own research in `lessons/choosing-a-version/`).
