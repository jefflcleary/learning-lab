# Teaching it to walk

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** bot-pathfinding
- **Part:** Part 4 — First programs
- **Scaffolding:** level 3 — sixth bot lesson; second npm install, second
  read-the-whole-reference assignment. Goals and success criteria; the
  mineflayer-pathfinder README is assigned as the primary text (the way
  bot-chat-commands assigned the events list). Minimal hints, concept names only.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

The lesson opens by naming a debt: the following bot from `lessons/bot-follows/`
still walks into walls — its naive movement was honestly diagnosed there as
terrain-blind. Today it stops. The learner installs mineflayer-pathfinder (a second
npm install — noting how unremarkable the dependency routine feels the second time
is itself content: that's what learning a workflow is), loads it as a plugin, and
replaces naive movement with real navigation: the bot walks to called coordinates
around obstacles, follows for real across terrain, and comes to a named player on
command.

Payoff: the bot navigates the family's actual builds to reach anyone who calls it —
the follow-me from weeks ago, finally real, demonstrable to the same people who
watched the old bot faceplant into a wall.

Deeper lesson, stated in what-just-happened: yesterday's impossible became today's
npm install. Libraries are other people's solved problems, and sensing that a
problem PROBABLY HAS a library is a professional instinct worth naming.

## Prerequisites

- A bot that follows a player naively — and firsthand memory of where that movement
  fails (walls, cliffs, water) — established by `lessons/bot-follows/`
- The npm install routine: a bot folder with a `package.json`, and one dependency
  already installed there — established by `lessons/first-bot/`
- A bot that takes chat commands — established by `lessons/bot-chat-commands/`
  (the goals here are issued by chat)

## Establishes

- A bot with mineflayer-pathfinder installed and loaded, that navigates real
  terrain: to coordinates, after a moving player, to a named caller
- The learner has installed a second dependency, loaded a plugin, and worked from a
  library README as primary documentation
- Cited by other cores as: "a bot that can navigate to a point or a player across
  real terrain — established by `lessons/bot-pathfinding/`."

## Facts

- **mineflayer-pathfinder** — a community library that gives a mineflayer bot real
  navigation: give it a goal, it computes and walks a route. Project:
  `PrismarineJS/mineflayer-pathfinder` on GitHub. The README there is the primary
  documentation and THE assigned text of this lesson [volatile in API detail as of
  2026-07 — deliveries point at the README for every signature, assert none].
- Install: `npm install mineflayer-pathfinder` in the bot's folder (same routine as
  `lessons/first-bot/`; copyable).
- Plugin pattern: mineflayer supports plugins — code that attaches new abilities to
  an existing bot object. Loading is via `bot.loadPlugin(...)` [verify — README
  shows the exact require/load lines; deliveries send the learner there].
- Goals are objects describing where to end up; the README documents a family —
  names like `GoalNear` (get within a radius of a point), `GoalFollow` (keep near
  an entity), `GoalBlock` / `GoalXZ` and others [verify names against README —
  learner reads the full goal list as the read-the-surface assignment].
- A goal is set via the pathfinder's set-goal call [verify exact call — README];
  following-type goals can be dynamic (recomputed as the target moves) [verify].
- **Movements configuration**: an object controlling what the bot is allowed to do
  while pathing — dig through blocks, place scaffolding blocks, etc. [verify
  property names — README]. With permissions granted (and materials, for placing),
  the pathfinder can dig through and bridge across obstacles [verify capabilities].
- Unreachable goals: what the library does (give up, emit a status, retry) is NOT
  asserted — the break-it has the learner find out empirically, then read the README
  for events/status reporting (path events with success/failure statuses exist
  [verify names]).
- Range caveat carried from `lessons/bot-runs-a-game/` facts: a distant player may
  have no readable entity [verify]; "come to me from anywhere" in practice means
  "from anywhere the bot can currently know about you" — a real limit the learner
  may hit; deliveries don't pre-solve, the go-further can probe it.
- Optional continuity: if `lessons/git-for-your-server/` was done, commit the naive
  follow before replacing it; otherwise a copy of the file does the same job. Light
  touch, one line in delivery.
- A* — the algorithm family under the hood; named in ONE sentence in
  what-just-happened as "an algorithm with a name and a Wikipedia page," explicitly
  optional depth. No further algorithm content in learner text.

## Arc

### Orientation — given plainly

Open on the debt, by name: the follow bot walks into walls; it was built knowing
that; today it stops. Then the plain facts: what mineflayer-pathfinder is, where it
lives, that its README is today's primary text, the install command, and that
mineflayer has a plugin mechanism the README will demonstrate. The assignment
pattern is explicit and familiar: like the events list before, the first task is to
read the whole surface — every goal type the library offers — before building
anything.

Also plainly: the second-install observation. The delivery says, in one sentence,
that the learner should notice how routine `npm install` feels this time — the same
act that was a whole lesson once. That noticing is the meta-lesson.

### Predictions to elicit

- Before the first pathfinding run: place a wall between the bot and a target,
  predict the route it will pick — then compare against what it actually walks.
- Before the break-it: what SHOULD a navigator do about an impossible destination?
  Write down which of give-up / report / try-forever you'd design, then find out
  what this library chose.
- Before replacing the follow: which of the terrain failures from the old bot do
  you expect to survive the upgrade, if any? (Water? Cliffs? Fences?)

### The work — goals and success criteria

Per level 3: goals and criteria; the README supplies every signature.

0. **Read the surface.** Install the library, open the README top to bottom: the
   loading example, every goal type, the movements section, the events. Not
   memorizing — sizing the space. (Same assignment shape as the events list in
   `lessons/bot-chat-commands/`.)

1. **Walk to a called coordinate.** Chat command (e.g. `goto x y z`) sends the bot
   there. Criteria: numbers parsed from chat (proven skill); the destination is
   somewhere a straight line CANNOT reach — behind a wall, across a gully; the bot
   arrives anyway. Watch the route: it is visibly non-obvious — it goes around, and
   (depending on the movements settings) may dig through or bridge across. Watching
   the route it picks IS part of the task.

2. **Real following.** Replace the naive follow with a following goal. Criteria:
   take the bot to the exact spot where the old follow failed — the wall it hit,
   the terrain that beat it — and watch the same scenario succeed. (One line:
   preserving the old code first is worth it — commit if git is in use from
   `lessons/git-for-your-server/`, copy the file if not. The old version is the
   before photo.)

3. **Come when called.** Command: anyone says `come`, the bot navigates to the
   speaker, from wherever it is, around whatever is between. Criteria: called from
   out of sight, arrives; called by a different player, goes to THEM (not the
   first speaker — the goal must be built from whoever spoke).

Thin hints, concept-name only, max two:

- <details>: the README's own first example is the loading pattern — the require
  line, the loadPlugin line. Reading examples for their skeleton is the skill.
- <details>: "get near a player" and "keep following a player" are different goals
  in the README's list; picking the right goal type is the design decision.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **The impossible errand.** Seal a small room (or pick a spot with no route). Send
  the bot there. First predict (see above), then observe: does it give up, report,
  or try forever? Whatever it does, the follow-up is the real task: find in the
  README what the library offers for "couldn't" — events, statuses, timeouts
  [verify names — the finding is the learner's]. Teaches: real libraries have a
  vocabulary for failure, and it's documented where success is. Undo: unseal the
  room / clear the goal.
- **Break its legs.** In the movements configuration, forbid digging [verify
  property — README], and give the bot a goal it previously dug through. The same
  destination becomes unreachable — not because the world changed, but because the
  rules did. Teaches: "possible" is relative to allowed moves — the map didn't
  change, the move set did (this idea returns if the learner ever meets search
  problems again). Undo: restore the setting.

### What just happened — the explanation

Gently, the algorithm reveal: while the bot walked, the library was running a
search — considering many candidate paths per tick, scoring them, extending the
promising ones, over the actual blocks of the world. The algorithm has a name, A*,
and a Wikipedia page, and reading it is entirely optional — the point today is not
the algorithm but the fact that it was *available*.

Then the deeper lesson, stated flat: the wall the follow bot hit weeks ago was, at
the time, impossible. Today it was an npm install. Nothing about the learner
changed in between — what changed is that they reached for a library. Libraries are
other people's solved problems, packaged; the instinct that a given problem
PROBABLY HAS one — navigation, parsing, image resizing, almost anything with a
name — is one of the most professional instincts there is. The follow-up instinct
came free with today's workflow: judge a library by its README, and read the whole
surface before using any of it.

And the plugin idea, one layer deep: `loadPlugin` attached new abilities to an
existing object at runtime. The bot the learner built didn't get replaced; it got
extended. Most big software is assembled exactly this way.

### Go further — open questions

- Patrol routes: a list of points, visited in order, forever. What happens at list's
  end — and is a patrol a new idea, or a loop plus goals?
- A butler: `fetch` — the bot navigates to a chest, takes an item, brings it back.
  Pathfinding plus inventory APIs; the mineflayer docs are the dig site. Real
  archaeology, no map provided.
- When is the naive movement from `lessons/bot-follows/` actually BETTER than
  pathfinding? Genuinely open — think about what each costs, and what "better"
  means when the target is two blocks away on flat ground.
- Be the algorithm: draw a small maze on paper, put the bot at one end by hand, and
  find the path the way you think the library does — what do you write down, what
  do you cross out, when do you know you're done? (Then, if curious, the A* page —
  compare notes with fifty years of computer science.)

## Delivery notes

- **guided:** level 3. The README is the delivery's co-author — every API surface
  question in learner text is answered with "the README shows this," never with an
  asserted signature. Assert only: the library's existence and purpose, the install
  command, that a plugin mechanism exists.
- The rematch staging in goal 2 matters: same bot, same wall, different outcome —
  that's the social demo too (same audience who saw it faceplant).
- Do not assert what pathfinder does with unreachable goals, exact goal-class
  names, or movements property names — [verify]-tagged above; all discovery is
  routed through the README.
- The second-install noticing should be exactly one sentence in the delivery —
  underlining it harder would turn it into cheerleading.
- No version assertions anywhere (mineflayer support range was the learner's own
  research in `lessons/choosing-a-version/`).
