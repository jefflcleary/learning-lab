# Teaching it to walk

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

There's a debt to settle. The following bot you built in
[Making it care where you are](../bot-follows/guided.md) walks into walls. You built it
knowing that: point it at a player, and it marches in a straight line the world may
not honor — off ledges, into fences, against the sides of houses. It was honest
about its limits. Today the limits go.

The tool is a community library called **mineflayer-pathfinder**, which gives a
mineflayer bot real navigation: you describe where to end up, it computes a route
over the actual blocks of the world and walks it. By the end of this session your
bot will come when called — from out of sight, around obstacles, across terrain —
to whoever asked.

One thing to notice as you start, and then we won't mention it again: the first
thing you'll do is `npm install` a library, and it will feel like nothing. That same
act was a whole lesson once.

---

## Before you start

You need:

- **The naive following bot, and your memory of where it fails.** Built in
  [Making it care where you are](../bot-follows/guided.md) — including firsthand knowledge of
  a specific wall, cliff, or fence that beat it. You'll want that exact spot again
  today.
- **The install routine.** A bot folder with a `package.json` and a dependency
  already in it, from [A player made of code](../first-bot/guided.md).
- **A bot that takes chat commands**, from
  [Teaching it to take orders](../bot-chat-commands/guided.md) — today's goals are issued by
  chat.

Quick checks: `node bot.js` brings the bot up on your sandbox; `come` and `stay`
work; `npm install` in the bot's folder completes without errors.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This lesson leans on real documentation — [Finding the real documentation](../../../../reference/finding-the-docs.md) helps when searching turns up noise.

---

## What you'll have at the end

By the end of this session you will have:

- A bot that navigates real terrain: to coordinates you call out, after a moving
  player, to whoever says `come` — around, over, or through what's in the way
- Installed a second library and loaded it as a plugin — and read its documentation
  the way working programmers do: whole surface first, details on demand
- Watched a bot fail at the same wall twice in this module — and then not
- An answer, measured yourself, to what a navigator does when you ask for the
  impossible

---

## New tools

**mineflayer-pathfinder** is a library that attaches navigation to a mineflayer
bot. It lives at `PrismarineJS/mineflayer-pathfinder` on GitHub, and its README is
the primary documentation — and also your primary text for this session. Every
"what's the exact call" question you have today is answered there, on purpose:
working from a library's own README is the skill this lesson exercises.

Install it in your bot's folder:

```
npm install mineflayer-pathfinder
```

Two facts to orient the reading. First: mineflayer has a **plugin** mechanism —
a way for a library to attach new abilities to your existing bot object rather than
replacing it; the README's first example shows the loading pattern. Second: the
library thinks in **goals** — objects describing where you want to end up. There's
a family of them (near a point, following an entity, and more), and choosing the
right goal type is most of the design work you'll do today.

---

## Predict

Write these in [your logbook](../../../../logbook.md) as you go — each one right before the run it belongs to:

- First run: you'll send the bot somewhere with a wall in between. Predict the
  route it will take — sketch it if you like. Then compare with what it walks.
- Before the break-it: what *should* a navigator do about an impossible
  destination — give up, report, or try forever? Write down which you'd design.
  You'll find out what this library's authors chose.
- Before upgrading the follow: which of the old bot's terrain failures do you
  expect to survive the upgrade, if any? Water? Cliffs? Fences?

---

## The work

### Read the surface

Before building anything: open the mineflayer-pathfinder README and read it top to
bottom. The loading example, the whole list of goal types, the movements section,
the events. One pass. You're not memorizing — you're sizing the space, exactly like
the events list before. When you're done you should be able to say how many kinds
of goal exist and which two you expect to use today.

### Walk to a called coordinate

Add a chat command — `goto x y z` — that sends the bot to a coordinate anyone calls
out. Parsing numbers out of a chat message is a skill you already own.

Success looks like: the destination is somewhere a straight line *cannot* reach —
behind a wall, across a gully — and the bot arrives anyway. Watching the route it
picks is part of the task, not decoration: it will be visibly non-obvious. It goes
around. Depending on what the movements configuration allows, it may dig through or
bridge across instead — the README's movements section is where those permissions
live.

<details>
<summary>If you're stuck on wiring</summary>

The README's own first example is the loading pattern — the require line and the
loadPlugin line. Reading an example for its skeleton, then swapping in your
specifics, is the skill.

</details>

### Real following

Now settle the debt. Replace the naive follow inside your `come` handling with the
library's way of staying near a moving player.

One line of housekeeping first: keep the old version. If your bot folder is under
git, commit before you start; if not, copy the file. The old code is the before
photo.

Success looks like: take the bot to the exact spot where the old follow failed —
the same wall, the same drop — and watch the same scenario end differently. Same
bot, same terrain, different outcome. If the people who watched it faceplant weeks
ago are around, this is the demo.

<details>
<summary>If you're stuck on choosing the approach</summary>

"Get near a player once" and "keep following a player as they move" are different
goals in the README's list. Which one is `come`? Picking the right goal type is the
design decision this step is made of.

</details>

### Come when called

Finish the command: anyone says `come`, and the bot navigates to *the speaker* —
from wherever it is, around whatever is between.

Success looks like: called from out of sight, it arrives. And called by a
different player, it goes to *them* — the goal has to be built from whoever spoke,
not from whoever spoke first today. (If someone far across the world calls and the
bot seems unable to find them, don't fight it silently — note what the bot can and
can't know about distant players, and see the last Go Further question.)

---

## Break it on purpose

**The impossible errand.** Seal a small room — or pick any spot with genuinely no
route in — and send the bot there. Check your prediction, then watch: does it give
up, report, or try forever?

Whatever it does, the follow-up is the real task: find, in the README, what the
library offers for "couldn't" — the events or statuses it emits about paths that
fail. Real libraries have a vocabulary for failure, documented right next to the
vocabulary for success, and knowing to look for it is what separates using a
library from trusting one. Unseal the room when you're done.

**Break its legs.** In the movements configuration, forbid digging, and then give
the bot a goal it previously dug through to reach. The same destination becomes
unreachable — not because the world changed, but because the rules did. "Possible"
is always relative to the allowed moves; the map stayed the same, the move set
shrank. Restore the setting afterwards.

---

## What just happened

While the bot walked, the library was running a **search** — considering many
candidate paths at a time, scoring them, extending the promising ones, over the
actual blocks of your world. The algorithm under it has a name, A*, and a Wikipedia
page, and reading it is entirely optional. The point today isn't the algorithm.

The point is this: the wall your follow bot hit weeks ago was, at the time,
impossible. Today it was an npm install. Nothing about you changed in between —
what changed is that you reached for a library. Libraries are other people's solved
problems, packaged, and the instinct that your problem *probably has one* —
navigation, parsing text, resizing images, almost anything with a name — is one of
the most professional instincts there is. The companion instinct came free with
today's work: judge a library by its README, and read its whole surface before you
use any of it.

One more layer: `loadPlugin` didn't replace your bot — it attached new abilities to
the object you already had. Your code, your commands, your guards all kept working,
and navigation arrived alongside them. Most large software is assembled exactly
this way: a core, extended by pieces that add abilities to it.

---

## Go further

- Patrol routes: a list of points, visited in order, forever. What happens when the
  list runs out — and is a patrol actually a new idea, or a loop plus goals you
  already have?
- A butler: `fetch` — the bot navigates to a chest, takes an item out, and brings
  it back. Pathfinding plus inventory abilities; the mineflayer documentation is
  the dig site, and no map is provided.
- When is the *naive* movement from the old bot actually better than pathfinding?
  Think about what each one costs, and what "better" means when the target is two
  blocks away on flat ground. Genuinely open.
- Be the algorithm: draw a small maze on paper and find the path the way you think
  the library does. What do you write down? What do you cross out? How do you know
  when you're done? Then, if you're curious, read the A* page and compare your
  notes with fifty years of computer science.

---

## What you have now

- A bot that can navigate to a point or a player across real terrain — `goto` for
  coordinates, `come` for whoever calls — with mineflayer-pathfinder installed and
  loaded as a plugin
- A measured answer to what this library does about impossible goals, and
  where its failure vocabulary is documented
- The library instinct, exercised end to end: suspect a library exists, evaluate
  it, read its whole surface, extend your program with it
