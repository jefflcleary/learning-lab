# Teaching the server new tricks

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

You speak the server's command language, and you've changed its data with a
datapack. This session joins the two: **functions** — plain text files of console
commands that the server runs as a single unit, on demand, or all by itself.

Written-down commands change everything. Typed commands need you at the keyboard;
written ones can be replayed forever — every time the pack loads, or twenty times a
second, or the moment a player asks. By the end of this session your server will be
doing things in front of other people with your hands nowhere near the keyboard.

This one assumes more and explains less than the datapack session did — you've built
a pack before, and the moves are the same moves.

---

## Before you start

You need:

- **A datapack you built and can reload.**
  [Changing the rules of crafting](../first-datapack/guided.md) gets you there. Quick check:
  `/reload` runs without complaint, and `/datapack list` shows a pack of yours
  enabled.
- **Console commands, and operator status in-game.**
  [Talking to a running server](../console-commands/guided.md) covers both. Quick check:
  `/give` yourself something from in-game chat and it arrives.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This lesson leans on real documentation — [Finding the real documentation](../../../../reference/finding-the-docs.md) helps when searching turns up noise.

---

## What you'll have at the end

By the end of this session you will have:

- Written functions — files of commands the server runs as one unit
- Used **target selectors** to aim commands at "whoever's online" or "everything
  within 15 blocks" instead of at names
- Hooked a function to the server's own clock so it runs with nobody at the
  keyboard
- Built one of two showpieces: a landmark effect that burns day and night on its
  own, or a teleport that any player can use — no operator powers required
- Deliberately overspent the server's time budget, watched it complain, and fixed it

---

## New tools

**A function** is a file with the extension `.mcfunction`: one console command per
line, written *without* the leading slash — the console's own dialect, not chat's.
Lines starting with `#` are comments. The server runs the file top to bottom as a
unit. Functions live inside your existing datapack, under your namespace, in a
registry folder whose exact name you'll get from the wiki — same drill as the recipe
folder, and for the same reason: the name has changed across versions, so the **Data
pack** and **Function** pages on minecraft.wiki, for your version, are the source.
You run one with `/function yournamespace:name` — the id comes from the file's path,
exactly like your recipe's did.

**Function tags** are how a function gets wired to an event instead of to your
keyboard. Two hooks matter today, and both are files you add to your own pack under
the game's `minecraft` namespace: `load.json` — runs its functions every time the
pack loads, including every `/reload` — and `tick.json` — runs its functions **every
game tick, which is twenty times per second**, forever. Hold onto that number. It's
the most important safety fact of the day, and you'll test it on purpose later.

**Target selectors** are a small filter language for saying *which* players or
creatures a command applies to, without naming anyone. `@a` means all players, `@p`
the nearest player, `@e` all entities (every creature, item, and arrow in the
world), `@s` whoever is running the command. Square brackets add filters:
`@e[type=minecraft:zombie,distance=..20]` reads as "entities, but only zombies, but
only within 20 blocks." You describe the set; the server finds the members.

**Two commands to know exist.** `/execute` can re-aim a command — run it *as*
someone else, *at* somewhere else; its wiki page explains those two words when you
need them. `/trigger` is stranger and more interesting: it's one of the very few
commands *every* player can use without op — a single door in the permission wall,
which does nothing until an operator builds machinery behind it. One of today's two
showpieces is exactly that machinery.

As always: the files are the subject matter. Type them.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Chat requires the slash; function files reject it. What is the slash actually
  *for* — and why would a file of nothing-but-commands not need it?
- If a line in the middle of a function fails — a typo, an item that doesn't exist
  — what happens to the lines after it? Keep this one; you'll measure it before
  the end.
- Your function, twenty times per second: what's the most expensive thing you could
  accidentally ask for at that rate, and what would it do to the world?

---

## The work

### First function, one line

Goal: a function that makes the server say something, run by hand with `/function`.

Find where function files live in a datapack — wiki, your version, exact spelling —
then create a `.mcfunction` file in your pack with a single `say` line. `/reload`,
then run it from in-game chat.

<details>
<summary>Hint</summary>

Placement works exactly like the recipe did: a registry folder under your
namespace, exact name from the wiki, id from the path. Nothing else is new.

</details>

<details>
<summary>If /function can't find it</summary>

Same three suspects as last time: folder name, folder nesting, or the extension
isn't exactly `.mcfunction`. `/reload` first — the server only knows what it read
last. Then try typing `/function ` in chat and looking at the completions it
offers: that's the list of what actually got registered, which tells you whether
your problem is registration or spelling.

</details>

### The starter kit

Goal: one function that equips **every player currently online** — a few useful
items and a greeting — run as a single command. Test it with someone else in, a
second account, or just yourself; the point is that the function must not contain
anybody's name.

<details>
<summary>Hint</summary>

`give` and `say` take a target, and you've only ever fed them player names. `@a` —
all players — drops in anywhere a name goes.

</details>

<details>
<summary>Second hint</summary>

Several `give @a ...` lines plus a greeting. Lines run in order — decide whether
the greeting arrives before the loot or after, and make it so.

</details>

One command, everyone provisioned. Worth pausing on.

### Read the surface, then aim

First, the survey: open the **Target selectors** page on minecraft.wiki and scan the
*entire* list of selector arguments, top to bottom. Not to learn them — to see how
precisely "which ones" can be said. Rough count. Note two arguments that sound
useful and one that sounds baffling.

Then the goal: standing in your world, make **every creature within about 15 blocks
of you glow** — and nothing farther away. The `glowing` effect draws an outline
visible even through walls, and `effect give` applies it. Run the command from
in-game chat, so that "near" means near *you*.

<details>
<summary>Hint</summary>

The target is "entities, but filtered." `@e` selects entities; the square brackets
hold the filters; you scrolled past the two you need a minute ago.

</details>

<details>
<summary>Second hint</summary>

The arguments are `distance` — whose range syntax `..15` means "up to 15" — and,
if you'd rather outline cows but not dropped items and stray arrows, `type`.
Multiple arguments go in one set of brackets, separated by commas.

</details>

Look around. Every filtered thing is lit. You didn't name a single one of them —
you described a set, and the server found its members.

### A message on every reload

Goal: your pack announces itself in chat every time it loads — including every
`/reload`. This is your first hook: the `load` tag.

Get the tag file's location and shape from the wiki (the **Tag** page, or the Data
pack page's structure listing — note that this file goes under the `minecraft`
namespace *inside your own pack*, which is worth a raised eyebrow), point it at a
small function of yours, `/reload`.

<details>
<summary>Hint</summary>

A tag file is JSON with a single list called `values`, naming functions by their
full `namespace:name` id. You've typed harder JSON than this.

</details>

<details>
<summary>Second hint</summary>

It lives under `data/minecraft/tags/...` in your pack — you are adding an entry to
one of the game's own lists, which is why the game's namespace appears in your
folder. The exact tag-folder spelling for your version is on the wiki page you're
already on. The load hook's file is `load.json`.

</details>

From now on, every `/reload` answers back. You've built a heartbeat — and cheap
proof, forever, that the pack is alive.

### The main build — pick one

Two showpieces. Both respectable; the second has more moving parts. Pick the one
your world wants — or do both.

**(A) A landmark that never sleeps.** A permanent, visible effect at a spot you
choose: a column of particles marking spawn, the town square, a monument. The
mechanism is a function containing a `particle` command at fixed coordinates,
hooked to the `tick` tag. Start with a *small* particle count — the number twenty
is doing multiplication behind your back.

<details>
<summary>Hint</summary>

`tick.json` works exactly like `load.json` — same folder, same shape, different
file name. The `particle` command's syntax (which particle, where, how many) is on
its wiki page. Fixed coordinates neatly sidestep the question of where the server
"is standing" when it runs your file.

</details>

<details>
<summary>If nothing appears</summary>

Check that the coordinates are somewhere you can actually see, and check that
`tick.json` names your function's full `namespace:name` id. And `/reload` — the
server only knows what it read last.

</details>

**(B) A door anyone can open.** A gathering point that any player — op or not —
can teleport to by typing one `/trigger` command. This is the machinery-behind-the-
door build: `/trigger` does nothing until you make it mean something.

<details>
<summary>Hint</summary>

Three parts: an **objective** — a named counter with the special `trigger`
criterion — that ordinary players are allowed to bump; a **tick function** that
watches for anyone whose counter got bumped, teleports them, and resets the
counter; and **re-enabling**, because a trigger locks itself after each use. The
**/trigger** page on minecraft.wiki lays out this exact pattern. Read it before
writing anything.

</details>

<details>
<summary>Second hint</summary>

The commands involved: `scoreboard objectives add` (once, by hand), and — every
tick — `scoreboard players enable`, the teleport, and `scoreboard players reset`.
"Anyone whose counter got bumped" is a selector job: there's a `scores=` argument
for exactly this.

</details>

<details>
<summary>Third hint</summary>

The selector shape is `@a[scores={yourobjective=1..}]`. And when the wiki's
examples use `/execute as`, that's the command that runs a line "as" each selected
player — its page explains the two words that matter, `as` and `at`.

</details>

### Show it off

Get at least one other person into the world — or your own second account — and let
them see it: the landmark burning with nobody online but them, or a friend typing
`/trigger` and arriving at the gathering point under their own power.

Step back from the keyboard while they watch. That's the demonstration. The server
is executing your written instructions, unattended, in front of witnesses.

---

## Break it on purpose

Cause each one, read what happens, undo it.

**The twenty-times tax.** Take a tick-hooked function — build A, or hook a scratch
function to `tick` just for this — and make it expensive on purpose: raise the
particle count to something absurd. Tens of thousands. `/reload`, and pay attention
in this order: feel the game respond, then go read the console, which has opinions
when the server can't keep up — find them. Then undo it — shrink the number or pull
the entry out of `tick.json` — `/reload`, and feel the world recover. What this
teaches: the tick budget is real. Your function has one twentieth of a second, and a
text file you wrote can overspend it. Every automation you build from here on lives
inside that budget.

**Poison the middle line.** In your starter-kit function, insert a deliberately
broken line *between* two working lines — a misspelled command, a `give` for an
item that doesn't exist. Run the function. Now settle the prediction you wrote at
the start: did the lines after the poison run? Check the evidence — did the second
item arrive? — and then find where the failure was reported; you know the server's
two mouths by now. Remove the bad line, run it once more clean. What this teaches:
you now know, because you measured it, how this system handles a partial failure —
and that "the file ran" and "every line worked" are different claims. You've met
that idea before, wearing a different folder.

---

## What just happened

Every line in those files is a sentence from the console language you already spoke
— the same strings, written down instead of typed. That's the entire trick, and it's
enormous. Typed commands need your fingers; written ones can be replayed without
you. The tags are the server offering its own lifecycle as hooks — *run this when I
load, run this twenty times a second* — and from the moment `/reload` returned, it
was executing your instructions unattended. You automated yourself out of a job
today. A very large fraction of all programming is exactly that move, scaled up.

Selectors deserve one more sentence. `@e[type=minecraft:zombie,distance=..20]`
never names a zombie. It *describes a set*, and the server finds the members at the
instant the line runs — ask again a second later, different zombies. Describing
which things and letting the machine find them is a filter language, and filter
languages quietly run a very large share of the world's software. The shape of that
bracket syntax will look oddly familiar to you one day, in a session about data.

And it's worth saying plainly, because today is the peak of what datapacks alone
can do in this module: your functions can react to the clock and to `/trigger` —
but they cannot read a sentence someone types in chat, cannot remember what
happened yesterday, cannot ask the internet anything. The world's *rules* are now
fully yours. A *participant* in the world — something that watches, understands,
and acts — takes a different kind of tool. It's coming.

---

## Go further

- Could your pack hand a book of house rules to every player who *joins* the
  server? First question first: does anything in a datapack even fire "when a
  player joins"? Research it. What you find — and what you don't — is genuinely
  instructive.
- Ask the wiki what `/schedule` does. What does it give you that `tick` doesn't —
  and what's still missing compared to a real alarm clock?
- Write down three things you wish your pack could do but suspect it can't. For
  each: truly impossible, or just hard? The wiki and the datapack community will
  settle some of them. Keep the list — the unsettled ones are a preview of the rest
  of this module.
- People have built entire games — bosses, minigames, whole new mechanics — as
  datapacks alone. Find one, install it in a throwaway world, and read its function
  files like you'd read anyone's writing. How far can this medium be pushed by
  someone stubborn enough?

---

## What you have now

- A datapack containing hand-written functions, at least one running with nobody at
  the keyboard — on the server's clock, or at any player's request
- You can aim commands with selectors and their filters instead of names
- You know the tick budget is real because you overspent it on purpose and read the
  server's complaint
- You've measured how a function handles a failing line, instead of assuming
- Something in your world that happens by itself, in front of other people, because
  you wrote it down
