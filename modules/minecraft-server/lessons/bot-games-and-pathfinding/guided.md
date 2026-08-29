# Bots that referee games and navigate

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

There's a debt to settle. The following bot you built in
[Writing your first bot](../writing-your-first-bot/guided.md) walks into walls. You
built it knowing that: point it at a player, and it marches in a straight line
the world may not honor — off ledges, into fences, against the sides of houses.
It was honest about its limits. Today the limits go: a community library called
**mineflayer-pathfinder** gives a mineflayer bot real navigation — you describe
where to end up, it computes a route over the actual blocks of the world and
walks it.

And then the bot goes to work. In the second half of this session you take
everything it can do — listen to chat, remember state, check conditions, run
commands, and now actually get places — and compose it into one program: a
referee that runs a complete game of hide-and-seek for human players. It
announces the start, counts down in chat, watches the hunt, declares the winner,
and resets for the next round, all without you touching the keyboard. This is a
project, not an exercise: you have every tool it needs, and assembly is what
programming mostly is, once the pieces are in hand. If hide-and-seek isn't your
game, change it — any game with the same shape counts.

---

## Before you start

You need:

- **The naive following bot, and your memory of where it fails.** Built in
  [Writing your first bot](../writing-your-first-bot/guided.md) — including firsthand
  knowledge of a specific wall, cliff, or fence that beat it. You'll want that
  exact spot again today. That lesson also gave you the install routine: a bot
  folder with a `package.json` and a dependency already in it.
- **A bot that takes chat commands and builds on command** — parsing, loops, and
  operator powers all proven, from
  [Bot chat commands and building with loops](../bot-commands-and-building/guided.md). Quick check:
  start the sandbox server and the bot, type `tower 5` in chat, watch it build.
- **At least one other person who can join your sandbox server**, for the payoff
  round. [Letting friends join your server](../letting-friends-join/guided.md) covers getting
  someone in. Two other people make it a real game; one is enough to test every
  phase.

Quick checks: `node bot.js` brings the bot up on your sandbox; your chat
commands work; `npm install` in the bot's folder completes without errors.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This lesson leans on real documentation — [Finding the real documentation](../../../../reference/finding-the-docs.md) helps when searching turns up noise.

---

## What you'll have at the end

By the end of this session you will have:

- A bot that navigates real terrain: to coordinates you call out, after a moving
  player, to whoever says `come` — around, over, or through what's in the way
- Installed a second library and loaded it as a plugin — and read its
  documentation the way working programmers do: whole surface first, details on
  demand
- Watched a bot fail at the same wall twice in this module — and then not
- A bot that referees a full game — announcements, countdown, phases, win
  detection, a winner declared by name — with your hands in your lap
- Caused, watched, and fixed the double-timer bug — the one where a countdown
  keeps counting for a game that no longer exists
- People in your house playing a game your code is running

---

## New tools

**mineflayer-pathfinder** is a library that attaches navigation to a mineflayer
bot. It lives at `PrismarineJS/mineflayer-pathfinder` on GitHub, and its README
is the primary documentation — and also your primary text for the first half of
this session. Every "what's the exact call" question you have today is answered
there, on purpose: working from a library's own README is the skill this lesson
exercises.

Install it in your bot's folder:

```
npm install mineflayer-pathfinder
```

Two facts to orient the reading. First: mineflayer has a **plugin** mechanism —
a way for a library to attach new abilities to your existing bot object rather
than replacing it; the README's first example shows the loading pattern. Second:
the library thinks in **goals** — objects describing where you want to end up.
There's a family of them (near a point, following an entity, and more), and
choosing the right goal type is most of the design work you'll do.

One thing to notice as you install, and then we won't mention it again: it will
feel like nothing. That same act was a whole lesson once.

**Timers.** Two built-in functions, part of Node itself, no install:

- `setTimeout(whatToDo, milliseconds)` — run this once, later.
- `setInterval(whatToDo, milliseconds)` — run this repeatedly, every so often.

Milliseconds, so 1000 is one second. Both hand back a value you can keep;
passing it to `clearTimeout` or `clearInterval` cancels the timer. One property
of timers is worth knowing before you rely on them: a started timer does not
know *why* it was started. It fires when its time comes, whether or not the
reason still applies. Remember that sentence.

**Distance.** To know whether a seeker has found the hider, the bot needs the
distance between two players. Positions are coordinates, and the distance
between two points in 3D is Pythagoras, one dimension deeper:

```
distance = √(dx² + dy² + dz²)
```

In JavaScript that's `Math.sqrt(dx*dx + dy*dy + dz*dz)`, where each `d` is the
difference between the two positions along one axis.

**Where positions come from.** You met `bot.players` when your bot first listed
who was online. Now you need more from it: go to the mineflayer docs at the
PrismarineJS/mineflayer project and read the `bot.players` entry properly — what
an entry contains, and *when* it contains it. Read it with this question in
mind: what does the bot actually know about a player who is far away from it?
The answer matters for `come`, and it will matter again mid-game.

For the victory ceremony, if you want one: `/tp` teleports players, and its
syntax is on the minecraft.wiki commands pages. Your bot has op; it can run it.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- First pathfinding run: you'll send the bot somewhere with a wall in between.
  Predict the route it will take — sketch it if you like. Then compare with what
  it walks.
- What *should* a navigator do about an impossible destination — give up,
  report, or try forever? Write down which you'd design. You'll find out what
  this library's authors chose.
- Which of the old bot's terrain failures do you expect to survive the upgrade,
  if any? Water? Cliffs? Fences?
- List every way a round of hide-and-seek can end. Found is one. What else? The
  list is longer than it first looks, and every entry on it is something your
  program will need to handle.
- What should happen if someone types `start` while a round is already running?
  Decide now — making it consciously is the difference between a rule and an
  accident.
- What does your bot know about a player who is far away from it? Answer from
  the docs, not from hope.

---

## The work

### Read the surface

Before building anything: open the mineflayer-pathfinder README and read it top
to bottom. The loading example, the whole list of goal types, the movements
section, the events. One pass. You're not memorizing — you're sizing the space,
exactly like the events list before. When you're done you should be able to say
how many kinds of goal exist and which two you expect to use today.

### Walk to a called coordinate

Add a chat command — `goto x y z` — that sends the bot to a coordinate anyone
calls out. Parsing numbers out of a chat message is a skill you already own.

Success looks like: the destination is somewhere a straight line *cannot*
reach — behind a wall, across a gully — and the bot arrives anyway. Watching the
route it picks is part of the task, not decoration: it will be visibly
non-obvious. It goes around. Depending on what the movements configuration
allows, it may dig through or bridge across instead — the README's movements
section is where those permissions live.

<details>
<summary>If you're stuck on wiring</summary>

The README's own first example is the loading pattern — the require line and the
loadPlugin line. Reading an example for its skeleton, then swapping in your
specifics, is the skill.

</details>

### Real following

Now settle the debt. Replace the naive follow inside your `come` handling with
the library's way of staying near a moving player.

One line of housekeeping first: keep the old version. If your bot folder is
under git ([Tracking your server files with git](../git-for-your-server/guided.md)), commit before
you start; if not, copy the file. The old code is the before photo.

Success looks like: take the bot to the exact spot where the old follow failed —
the same wall, the same drop — and watch the same scenario end differently. Same
bot, same terrain, different outcome. If the people who watched it faceplant
weeks ago are around, this is the demo.

<details>
<summary>If you're stuck on choosing the approach</summary>

"Get near a player once" and "keep following a player as they move" are
different goals in the README's list. Which one is `come`? Picking the right
goal type is the design decision this step is made of.

</details>

### Come when called

Finish the command: anyone says `come`, and the bot navigates to *the
speaker* — from wherever it is, around whatever is between.

Success looks like: called from out of sight, it arrives. And called by a
different player, it goes to *them* — the goal has to be built from whoever
spoke, not from whoever spoke first today. (If someone far across the world
calls and the bot seems unable to find them, don't fight it silently — your
docs answer from Predict is the explanation, and it's about to matter again.)

### The referee

Your bot can now get anywhere it's asked. Time to give it a job that uses
everything it has.

Here is the reference game, as behavior. Build this, or your variant of equal
shape. Nothing more to install; what follows is a spec, and the work is
assembly.

1. **Someone says `start` in chat.** The bot announces who hides and who
   seeks — the speaker hides, everyone else seeks, or however you decide — and
   counts down in chat while the hider hides. A visible, ticking countdown, not
   one message. During the countdown the seekers are supposed to stand still;
   the bot announces that rule, and notice that announcing is all it can do —
   code cannot freeze humans. Every referee lives with this.
2. **The countdown ends.** The bot announces that the hunt is on.
3. **The hunt.** The bot watches, and when a seeker gets within a few blocks of
   the hider — you pick the threshold — it declares the find, naming names. (A
   simpler variant that is still a real game: players declare "found" in chat
   and the bot verifies before ruling. The distance version is the more
   interesting build.)
4. **The round ends.** Winner announced. For a ceremony, `/tp` the winner
   somewhere ceremonial — or, since your referee can walk now, have it navigate
   to the winner and deliver the verdict in person. And the bot is ready for
   the next `start` — no restart, no help.

Navigation in the game is optional garnish. Every criterion below must hold
with announcements alone.

A sensible order of proving, each step playable before the next: get a
countdown working on its own → get the phases switching on schedule → get
found-detection working with one human helper → run the full round with two.

**Success criteria — the game is done when all of these hold:**

- A full round plays start to finish with two humans and your hands off the
  keyboard. No nudging the bot, no announcing anything yourself, no restart
  between rounds.
- Someone joins mid-game and the game does something *deliberate* — ignores
  them until next round, or drafts them as a seeker. Either is fine; it must be
  chosen, announced, and true.
- The hider disconnects mid-hunt and the round ends cleanly, with an
  announcement — not a bot hunting a ghost forever.
- Someone says `start` during a round and the bot declines politely. One round
  at a time.
- A player wandering far from the bot doesn't silently break the game. (This is
  where your docs answer from Predict earns its keep. How you handle "the bot
  can't see them" is your design — a referee that walks somewhere central is
  one option, not the assigned answer. Handling it is not optional.)

<details>
<summary>If the whole thing feels shapeless</summary>

The entire design hangs on one variable that names what the game is currently
doing — waiting, hiding, seeking. Every chat command, every timer, every check
asks that variable before acting. You've had a variable like this since your
bot first toggled following on and off; this one just has more than two values.

</details>

<details>
<summary>If "keep checking during the hunt" is the sticking point</summary>

Doing something repeatedly, every couple of seconds, is exactly what
`setInterval` is for. And whatever you start must somewhere be stopped — that's
what the handle and `clearInterval` are for.

</details>

When the criteria pass, stage the real thing: two people, a round of
hide-and-seek, you visibly not touching anything. The game runs because you
wrote down its rules in a language a computer executes. Let it run.

---

## Break it on purpose

**The impossible errand.** Seal a small room — or pick any spot with genuinely
no route in — and send the bot there. Check your prediction, then watch: does it
give up, report, or try forever? Whatever it does, the follow-up is the real
task: find, in the README, what the library offers for "couldn't" — the events
or statuses it emits about paths that fail. Real libraries have a vocabulary for
failure, documented right next to the vocabulary for success, and knowing to
look for it is what separates using a library from trusting one. Unseal the
room when you're done.

**Break its legs.** In the movements configuration, forbid digging, and then
give the bot a goal it previously dug through to reach. The same destination
becomes unreachable — not because the world changed, but because the rules did.
"Possible" is always relative to the allowed moves; the map stayed the same, the
move set shrank. Restore the setting afterwards.

**Say `start` twice.** If you already guard against this — the criteria made
you — comment the guard out for a minute, and label it as an experiment. Then
start a round, and start another mid-countdown. Watch the chat. Two countdowns
interleave. Then two hunts fight over one game. Read the transcript like a log:
each timer is faithfully doing exactly what it was told, and neither one knows
the world moved on. This is the double-timer bug, and every real system has met
it — it's the alarm that goes off for a meeting that was cancelled. The fix is
yours, and you already know it. Two fixes exist, actually: the timer's callback
can check the phase before acting, or the phase change can cancel the timer.
Notice that both work and that they're different philosophies — ask before
acting, versus clean up behind yourself. Restore the guard either way, and
confirm one `start` means one round.

---

## What just happened

While the bot walked, the library was running a **search** — considering many
candidate paths at a time, scoring them, extending the promising ones, over the
actual blocks of your world. The algorithm under it has a name, A*, and a
Wikipedia page, and reading it is entirely optional. The point isn't the
algorithm. The point is this: the wall your follow bot hit weeks ago was, at the
time, impossible. Today it was an npm install. Nothing about you changed in
between — what changed is that you reached for a library. Libraries are other
people's solved problems, packaged, and the instinct that your problem
*probably has one* — navigation, parsing text, resizing images, almost anything
with a name — is one of the most professional instincts there is. The companion
instinct came free with today's work: judge a library by its README, and read
its whole surface before you use any of it.

One more layer on that half: `loadPlugin` didn't replace your bot — it attached
new abilities to the object you already had. Your code, your commands, your
guards all kept working, and navigation arrived alongside them. Most large
software is assembled exactly this way: a core, extended by pieces that add
abilities to it.

Then you wrote a program that manages other humans in real time. It announces,
enforces, adjudicates, and concludes — rules as code, running against people who
did not read the code and will do unexpected things anyway. That's why the
criteria pushed on joins, disconnects, and double-starts: the program had to be
right about the world, not just right on the happy path. The phase variable you
built everything around has a name in the trade: a **state machine** — a system
that is always in exactly one state, where the same event means different things
in different states, and where the transitions between states are the real
logic. `start` during waiting begins a game; `start` during seeking is an error
to decline. Games are built this way. So are installers, checkout flows, and
every network connection your computer has ever made. You didn't learn the term
first and apply it — you built the thing and now the term has something to
stick to.

---

## Go further

- Patrol routes: a list of points, visited in order, forever. What happens when
  the list runs out — and is a patrol actually a new idea, or a loop plus goals
  you already have?
- A butler: `fetch` — the bot navigates to a chest, takes an item out, and
  brings it back. Pathfinding plus inventory abilities; the mineflayer
  documentation is the dig site, and no map is provided.
- When is the *naive* movement from the old bot actually better than
  pathfinding? Think about what each one costs, and what "better" means when
  the target is two blocks away on flat ground. Genuinely open.
- Be the algorithm: draw a small maze on paper and find the path the way you
  think the library does. What do you write down? What do you cross out? How do
  you know when you're done? Then, if you're curious, read the A* page and
  compare your notes with fifty years of computer science.
- Scores across rounds are easy while the bot runs — a variable does it. Now
  restart the bot. Gone. Variables live in a program's memory and die with it.
  Where would numbers have to live to survive a restart? Chase that question
  and you arrive at files — which a later part of this module makes real.
  Arriving early is allowed.
- Your bot has perfect information — it always knows exactly where the hider
  is. Should it share any? "Warmer… colder…" changes the game. What makes a
  game *feel* fair versus *be* fair? Genuinely open — referees, game designers,
  and economists all argue about it, and nobody has settled it.

---

## What you have now

- A bot that can navigate to a point or a player across real terrain — `goto`
  for coordinates, `come` for whoever calls — with mineflayer-pathfinder
  installed and loaded as a plugin
- A measured answer to what this library does about impossible goals, and where
  its failure vocabulary is documented
- The library instinct, exercised end to end: suspect a library exists,
  evaluate it, read its whole surface, extend your program with it
- A bot that referees a complete multi-phase game for human players: countdown,
  phases, win detection, announcements, clean reset between rounds
- A program organized as states and transitions — the phase variable pattern,
  plus the guard that makes inputs mean the right thing at the right time
- The double-timer bug: caused, read, and fixed two possible ways
- People playing a game your code runs, start to finish, refereed by a bot that
  can walk to the action — with your hands in your lap
