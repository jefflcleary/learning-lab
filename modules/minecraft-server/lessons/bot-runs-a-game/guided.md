# The bot becomes the referee

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every session so far taught your bot a skill. This one is different: nothing new to
install, almost nothing new to learn. Instead you're going to take everything the bot
can already do — listen to chat, remember state, check conditions, run commands — and
compose it into one program: a referee that runs a complete game of hide-and-seek for
human players. It announces the start, counts down in chat, watches the hunt, declares
the winner, and resets for the next round, all without you touching the keyboard.

This is a project, not an exercise. You have every tool it needs. The work is
assembly — and assembly is what programming mostly is, once the pieces are in hand.

If hide-and-seek isn't your game, change it. The spec below is a reference design;
any game with the same shape — phases, a countdown, a win condition the bot can
detect or verify — counts.

---

## Before you start

You need:

- **A bot that builds on command** — which means its chat interface, your loops, and
  its operator powers are all proven. [Building something too big to build by
  hand](../bot-builds/guided.md) gets you there. Quick check: start the sandbox server and
  the bot, type `tower 5` in chat, watch it build.
- **At least one other person who can join your sandbox server**, for the payoff
  round. [Joining over LAN](../joining-over-lan/guided.md) covers getting someone in. Two
  other people make it a real game; one is enough to test every phase. Quick check:
  a second account or housemate has joined your sandbox server before.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A bot that referees a full game — announcements, countdown, phases, win detection,
  a winner declared by name — with your hands in your lap
- A program organized around a single variable that names what the game is currently
  doing, which turns out to be how most real software is organized
- Caused, watched, and fixed the double-timer bug — the one where a countdown keeps
  counting for a game that no longer exists
- People in your house playing a game your code is running

---

## New tools

**Timers.** Two built-in functions, part of Node itself, no install:

- `setTimeout(whatToDo, milliseconds)` — run this once, later.
- `setInterval(whatToDo, milliseconds)` — run this repeatedly, every so often.

Milliseconds, so 1000 is one second. Both hand back a value you can keep; passing it
to `clearTimeout` or `clearInterval` cancels the timer. One property of timers is
worth knowing before you rely on them: a started timer does not know *why* it was
started. It fires when its time comes, whether or not the reason still applies.
Remember that sentence.

**Distance.** To know whether a seeker has found the hider, the bot needs the
distance between two players. Positions are coordinates, and the distance between
two points in 3D is Pythagoras, one dimension deeper:

```
distance = √(dx² + dy² + dz²)
```

In JavaScript that's `Math.sqrt(dx*dx + dy*dy + dz*dz)`, where each `d` is the
difference between the two positions along one axis.

**Where positions come from.** You met `bot.players` when your bot first listed who
was online. Now you need more from it: go to the mineflayer docs at the
PrismarineJS/mineflayer project and read the `bot.players` entry properly — what an
entry contains, and *when* it contains it. Read it with this question in mind: what
does the bot actually know about a player who is far away from it? The answer will
matter mid-game, and it's better found in the docs than discovered on game night.

For the victory ceremony, if you want one: `/tp` teleports players, and its syntax is
on the minecraft.wiki commands pages. Your bot has op; it can run it.

---

## Predict

Write these in [your logbook](../../../../logbook.md) before writing any code — they are design decisions, and making
them consciously is the difference between a rule and an accident:

- List every way a round can end. Found is one. What else? The list is longer than
  it first looks, and every entry on it is something your program will need to
  handle.
- What should happen if someone types `start` while a round is already running?
  Decide now.
- What does your bot know about a player who is far away from it? Answer from the
  docs, not from hope.

---

## The work

Here is the reference game, as behavior. Build this, or your variant of equal shape.

1. **Someone says `start` in chat.** The bot announces who hides and who seeks —
   the speaker hides, everyone else seeks, or however you decide — and counts down
   in chat while the hider hides. A visible, ticking countdown, not one message.
   During the countdown the seekers are supposed to stand still; the bot announces
   that rule, and notice that announcing is all it can do — code cannot freeze
   humans. Every referee lives with this.
2. **The countdown ends.** The bot announces that the hunt is on.
3. **The hunt.** The bot watches, and when a seeker gets within a few blocks of the
   hider — you pick the threshold — it declares the find, naming names. (A simpler
   variant that is still a real game: players declare "found" in chat and the bot
   verifies before ruling. The distance version is the more interesting build.)
4. **The round ends.** Winner announced. Optionally, `/tp` the winner somewhere
   ceremonial. And the bot is ready for the next `start` — no restart, no help.

A sensible order of proving, each step playable before the next: get a countdown
working on its own → get the phases switching on schedule → get found-detection
working with one human helper → run the full round with two.

**Success criteria — the game is done when all of these hold:**

- A full round plays start to finish with two humans and your hands off the
  keyboard. No nudging the bot, no announcing anything yourself, no restart between
  rounds.
- Someone joins mid-game and the game does something *deliberate* — ignores them
  until next round, or drafts them as a seeker. Either is fine; it must be chosen,
  announced, and true.
- The hider disconnects mid-hunt and the round ends cleanly, with an announcement —
  not a bot hunting a ghost forever.
- Someone says `start` during a round and the bot declines politely. One round at a
  time.
- A player wandering far from the bot doesn't silently break the game. (This is
  where your docs answer from Predict earns its keep. How you handle "the bot can't
  see them" is your design — handling it is not optional.)

<details>
<summary>If the whole thing feels shapeless</summary>

The entire design hangs on one variable that names what the game is currently
doing — waiting, hiding, seeking. Every chat command, every timer, every check asks
that variable before acting. You've had a variable like this since your bot first
toggled following on and off; this one just has more than two values.

</details>

<details>
<summary>If "keep checking during the hunt" is the sticking point</summary>

Doing something repeatedly, every couple of seconds, is exactly what `setInterval`
is for. And whatever you start must somewhere be stopped — that's what the handle
and `clearInterval` are for.

</details>

When the criteria pass, stage the real thing: two people, a round of hide-and-seek,
you visibly not touching anything. The game runs because you wrote down its rules in
a language a computer executes. Let it run.

---

## Break it on purpose

One deliberate failure this time, and it's a classic.

**Say `start` twice.** If you already guard against this — the criteria made you —
comment the guard out for a minute, and label it as an experiment. Then start a
round, and start another mid-countdown.

Watch the chat. Two countdowns interleave. Then two hunts fight over one game. Read
the transcript like a log: each timer is faithfully doing exactly what it was told,
and neither one knows the world moved on. This is the double-timer bug, and every
real system has met it — it's the alarm that goes off for a meeting that was
cancelled.

The fix is yours, and you already know it. Two fixes exist, actually: the timer's
callback can check the phase before acting, or the phase change can cancel the
timer. Notice that both work and that they're different philosophies — ask before
acting, versus clean up behind yourself. Restore the guard either way, and confirm
one `start` means one round.

---

## What just happened

You wrote a program that manages other humans in real time. It announces, enforces,
adjudicates, and concludes — rules as code, running against people who did not read
the code and will do unexpected things anyway. That's why the criteria pushed on
joins, disconnects, and double-starts: the program had to be right about the world,
not just right on the happy path.

The phase variable you built everything around has a name in the trade: a **state
machine** — a system that is always in exactly one state, where the same event means
different things in different states, and where the transitions between states are
the real logic. `start` during waiting begins a game; `start` during seeking is an
error to decline. Games are built this way. So are installers, checkout flows, and
every network connection your computer has ever made. You didn't learn the term
first and apply it — you built the thing and now the term has something to stick to.

---

## Go further

- Scores across rounds are easy while the bot runs — a variable does it. Now restart
  the bot. Gone. Variables live in a program's memory and die with it. Where would
  numbers have to live to survive a restart? Chase that question and you arrive at
  files — which a later part of this module makes real. Arriving early is allowed.
- A second game mode: tag. What actually changes — the phases? what distance
  *means*? How much of your hide-and-seek code survives contact with a different
  game? The answer says a lot about how you structured it.
- Your bot has perfect information — it always knows exactly where the hider is.
  Should it share any? "Warmer… colder…" changes the game. What makes a game *feel*
  fair versus *be* fair? Genuinely open — referees, game designers, and economists
  all argue about it, and nobody has settled it.
- What would a spectator be — someone connected but in no round? Is that a fourth
  phase, or a property of a player? Sit with why those are different answers.

---

## What you have now

- A bot that referees a complete multi-phase game for human players: countdown,
  phases, win detection, announcements, clean reset between rounds
- A program organized as states and transitions — the phase variable pattern, plus
  the guard that makes inputs mean the right thing at the right time
- The double-timer bug: caused, read, and fixed two possible ways
- The Part 4 milestone: people playing a game your code runs, start to finish,
  with your hands in your lap
