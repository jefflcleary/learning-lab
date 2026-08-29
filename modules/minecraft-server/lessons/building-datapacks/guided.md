# Building datapacks: custom recipes and functions

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Crafting looks like one of the game's fixed laws: these ingredients, in this shape,
make that item, and some items simply cannot be made at all. It isn't a law. It's
data — and the server will accept new data from you.

This session is about **datapacks**: folders of plain text files, placed inside
your world, that change what the game considers true. You'll build one from
scratch, by hand, and push it further in two stages. First, data: a crafting
recipe for an item the game refuses to let anyone craft, so that anyone at a
crafting table in your world can make an item that shouldn't exist. Then,
behavior: **functions** — files of console commands the server runs as a single
unit, on demand or all by itself — every time the pack loads, twenty times a
second, or the moment a player asks. By the end, your server will be doing things
in front of other people with your hands nowhere near the keyboard.

No programming toolchain, no build tools, nothing to install. You write files,
tell the server to re-read them, and the game is different.

---

## Before you start

You need:

- **A server you can start, stop, and join.**
  [Running your own server](../running-your-own-server/guided.md) gets you there.
  Quick check: start it, join it, `stop` it.
- **Console commands, and operator status in-game.**
  [Server settings and console commands](../server-settings-and-console/guided.md)
  covers both. Quick check: you can run `/gamerule doDaylightCycle` from in-game
  chat and get an answer instead of a refusal.
- **A code editor.** Set up in
  [Setting up a coding machine](../../../dev-machine/lessons/dev-machine-setup/guided.md).
  Quick check: you can open your server's folder in VS Code and create files and
  folders from its sidebar.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This lesson leans on real documentation — [Finding the real documentation](../../../../reference/finding-the-docs.md) helps when searching turns up noise.

---

## What you'll have at the end

By the end of this session you will have:

- Built a datapack by hand — every folder, every file, typed by you — and read and
  written **JSON**, the second great shape of settings files
- Added a crafting recipe for an item that has no recipe, and put that item in a
  friend's hands at a crafting table
- Written functions and aimed their commands with **target selectors** — "whoever's
  online," "everything within 15 blocks" — instead of names
- Hooked a function to the server's own clock, and built one of two showpieces: a
  landmark effect that burns day and night on its own, or a teleport any player
  can use with no operator powers
- Broken your pack four ways on purpose — loudly, silently, expensively, and
  partially — and learned to tell "loaded" from "correct"

One warning about method, stated up front: in this session, the files are the
whole point. Nothing gets copy-pasted. You'll type every character, because typing
is what forces you to read them.

---

## New tools

**A datapack** is a folder of plain text files that changes game content. It lives
*inside the world* — in `world/datapacks/` in your server's folder — and that
placement means something: a datapack changes that particular world, and if the
world folder is ever copied somewhere else, the pack travels with it. A pack has
two parts: a small file at its root that announces "this folder is a datapack,"
and a `data/` folder holding the actual content.

**JSON** (JavaScript Object Notation) is the shape those files are written in.
You've seen it once already without the name — `ops.json`, when you made yourself
an operator. Where `server.properties` was flat `key=value` lines, JSON nests:
curly braces `{ }` group things, square brackets `[ ]` make lists, and entries
look like `"name": value` with commas between them. One rule to hold onto: the
punctuation is load-bearing. Every brace, quote, and comma is information, and
computers do not guess. You'll feel this rule personally before the session ends —
on purpose.

**Two console commands.** `/reload` makes the running server re-read every
datapack from disk — the live apply channel for files. `/datapack list` shows
which packs the server knows about and whether they're enabled. Both need operator
status, which you have.

**A function** is a file with the extension `.mcfunction`: one console command per
line, written *without* the leading slash — the console's own dialect, not chat's.
Lines starting with `#` are comments. The server runs the file top to bottom as a
unit; you run one with `/function`. **Function tags** wire a function to an event
instead of your keyboard — two matter today: `load.json`, which runs its functions
every time the pack loads, and `tick.json`, which runs them **every game tick,
twenty times per second**, forever. Hold onto that number; it's the most important
safety fact of the day, and you'll test it deliberately.

**Target selectors** are a small filter language for saying *which* players or
creatures a command applies to, without naming anyone. `@a` means all players,
`@p` the nearest player, `@e` all entities (every creature, item, and arrow in the
world), `@s` whoever is running the command. Square brackets add filters:
`@e[type=minecraft:zombie,distance=..20]` reads as "entities, but only zombies,
but only within 20 blocks." You describe the set; the server finds the members.

**Two commands to know exist.** `/execute` can re-aim a command — run it *as*
someone else, *at* somewhere else; its wiki page explains those two words when you
need them. `/trigger` is stranger: one of the very few commands *every* player can
use without op — a single door in the permission wall, which does nothing until an
operator builds machinery behind it. One of today's showpieces is that machinery.

**The Data pack page on minecraft.wiki** is the blueprint you'll build from — it
documents the exact folder structure and file contents a pack needs, and the
**Function**, **Tag**, **Recipe**, and **Target selectors** pages cover the rest.
It matters that you take structure from those pages and not from this lesson: the
layout has changed between Minecraft versions, so the wiki *for your version* is
the only source guaranteed right for your server.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Settings-file changes needed a restart. Console commands were instant. Which way
  will datapack files go — or is there a third answer?
- Your pack will be a tree of folders several levels deep. If one folder name in
  the chain is slightly wrong, what do you expect: an error, a warning, or nothing
  at all?
- Which file, do you think, is the one that tells the server "this folder is a
  datapack, take it seriously"?
- Chat requires the slash; function files reject it. What is the slash actually
  *for* — and why would a file of nothing-but-commands not need it?
- If a line in the middle of a function fails — a typo, an item that doesn't
  exist — what happens to the lines after it? Keep this one; you'll measure it
  before the end.
- Your function, twenty times per second: what's the most expensive thing you
  could accidentally ask for at that rate, and what would it do to the world?

---

## The work

### Get the blueprint from the source

Open your server's folder in VS Code and look inside `world/` for a folder called
`datapacks`. If it's there, that's home. If it isn't, create it — named exactly
`datapacks` — and file away the suspicion that exact names matter around here.
That suspicion gets confirmed later today.

Then open [minecraft.wiki](https://minecraft.wiki) and find its **Data pack**
page. You know which Minecraft version your server runs — you chose it. Two things
to extract from the page, written down on paper:

1. **The folder structure**, from the pack's root folder all the way down to where
   a *recipe* file sits. Sketch the tree — every level, exact spellings. Note
   which folder name is your own to choose (the wiki calls it the **namespace** —
   the folder that brands everything your pack adds; yours to name, lowercase, no
   spaces) and which names must match the wiki exactly.
2. **The current `pack_format` number** for your version. The wiki keeps a table
   mapping Minecraft versions to pack format numbers — a version stamp that goes
   in the announcement file so the server knows the pack speaks its dialect.

This step is not overhead. Reading structure out of a reference page, for your
exact version, is most of what this session teaches — and it's the reason your
pack will work while a copied-from-somewhere pack often doesn't.

### Build the skeleton

Now build what you sketched, in VS Code, inside `world/datapacks/`: your pack's
folder (name it whatever you like), the `pack.mcmeta` file at its root, and the
`data/` tree down to — but not yet including — a recipe file. Type `pack.mcmeta`
yourself, from the example on the wiki page, with your own description text and
the `pack_format` you looked up. This is your first hand-written JSON: watch every
brace, quote, and comma as you type it.

Then prove the server sees your pack before writing any content. In-game:
`/reload`, then `/datapack list`, and read the output carefully — it tells you
what the server found and what state it's in. Your pack's name should be in there.
If the list shows your pack as available but not switched on, the `/datapack`
command has a way to enable it — the list output and the wiki's `/datapack`
command page will get you there.

<details>
<summary>The pack isn't in the list at all</summary>

Then the server doesn't believe your folder is a datapack. Three usual suspects,
in order of likelihood: your pack's folder isn't sitting *directly* inside
`world/datapacks/`; the announcement file isn't named exactly `pack.mcmeta`; or
the JSON inside it doesn't parse — a missing quote or comma. For the third
suspect, the console output from the moment you ran `/reload` has something to
say. Read it.

</details>

A pack that loads while completely empty of content is a real checkpoint — you now
know the skeleton is right, so anything that goes wrong later is in the content,
not the frame.

### Choose the impossible item

Pick your target: an item that cannot be crafted in survival play. Two candidates
with a long history of being uncraftable are the **saddle** and the **name tag** —
but don't take this lesson's word for it, because the list of craftable things
shifts between versions. Prove it: look up your candidate item's own page on
minecraft.wiki. An item's page shows every way of obtaining it — if crafting were
one of them, the recipe would be printed right there. No recipe on the page means
you've found your impossible item.

Then decide what it should cost: which ingredients, arranged how, in the crafting
grid. Your recipe, your economics — just make it something you can actually gather
today to test with.

### Write the recipe

Create the recipe file where your sketch says recipe files live, inside your
namespace. The file's name matters more than it looks: the path is the recipe's
identity — a file called `saddle.json` in *your* namespace's recipe folder becomes
known to the game as `yournamespace:saddle`.

Here is the shape of a **shaped** recipe — one where the arrangement in the grid
matters — with the load-bearing parts blanked out. The `pattern` is the grid drawn
as rows of characters, spaces meaning empty slots; the `key` says which character
stands for which item; the `result` is what falls out.

```json
{
  "type": "minecraft:crafting_shaped",
  "pattern": [
    "▢▢▢",
    "▢ ▢",
    "▢▢▢"
  ],
  "key": {
    "▢": { "id": "minecraft:▢" }
  },
  "result": { "id": "minecraft:▢", "count": ▢ }
}
```

Two standing instructions. First: before trusting this template, open the
**Recipe** page on minecraft.wiki for your version and check the field names
against a real example there — recipe fields have been renamed across versions,
and where this template and the wiki disagree, **the wiki wins**. Second: type it.
Every character.

Fill in your pattern, your key (one entry per character you used), and your
result. Item ids are the `minecraft:something` names you already know from the
`give` command.

<details>
<summary>Worked example, for comparison after yours works — or if you're truly stuck</summary>

A saddle costing leather and iron, verified against the wiki's current recipe
format before use:

```json
{
  "type": "minecraft:crafting_shaped",
  "pattern": [
    "LLL",
    "L L",
    "III"
  ],
  "key": {
    "L": { "id": "minecraft:leather" },
    "I": { "id": "minecraft:iron_ingot" }
  },
  "result": { "id": "minecraft:saddle", "count": 1 }
}
```

Three rows of three characters each: a top row of leather, leather at the two
middle edges with a hole in the center, iron across the bottom. `L` and `I` mean
nothing by themselves — the `key` gives them meaning.

</details>

### Craft the uncraftable

`/reload`. Then gather your ingredients and get to a crafting table. One honest
note: custom recipes don't always show up in the recipe book on the left of the
crafting screen — if yours doesn't, place the ingredients into the grid by hand,
matching your pattern. The result slot fills.

Take the item. As of a few minutes ago, that object could not be made in this
world. Now get someone else to a crafting table, give them the ingredients, tell
them the shape, and let *them* pull an impossible item out of the grid.

What you changed so far is data — a fact the game now believes. The same pack can
hold *behavior* too: the console language you already speak, written down and
replayed. That's the rest of the session, and it assumes the moves you just made —
the skeleton, the JSON, the `/reload` — without re-explaining them.

### First function, one line

Goal: a function that makes the server say something, run by hand with
`/function`.

Find where function files live in a datapack — the wiki's Data pack and Function
pages, your version, exact spelling; same drill as the recipe folder, for the same
reason — then create a `.mcfunction` file in your pack with a single `say` line.
`/reload`, then run it from in-game chat with `/function yournamespace:name`.

<details>
<summary>Hint</summary>

Placement works exactly like the recipe did: a registry folder under your
namespace, exact name from the wiki, id from the path. Nothing else is new.

</details>

<details>
<summary>If /function can't find it</summary>

Same three suspects as before: folder name, folder nesting, or the extension
isn't exactly `.mcfunction`. `/reload` first — the server only knows what it
read last. Then try typing `/function ` in chat and looking at the completions
it offers: that's the list of what actually got registered, which tells you
whether your problem is registration or spelling.

</details>

### The starter kit

Goal: one function that equips **every player currently online** — a few useful
items and a greeting — run as a single command. Test it with someone else in, a
second account, or just yourself; the point is that the function must not contain
anybody's name.

<details>
<summary>Hint</summary>

`give` and `say` take a target, and you've only ever fed them player names. `@a`
— all players — drops in anywhere a name goes.

</details>

<details>
<summary>Second hint</summary>

Several `give @a ...` lines plus a greeting. Lines run in order — decide whether
the greeting arrives before the loot or after, and make it so.

</details>

One command, everyone provisioned. Worth pausing on.

### Read the surface, then aim

First, the survey: open the **Target selectors** page on minecraft.wiki and scan
the *entire* list of selector arguments, top to bottom. Not to learn them — to see
how precisely "which ones" can be said. Rough count. Note two arguments that sound
useful and one that sounds baffling.

Then the goal: standing in your world, make **every creature within about 15
blocks of you glow** — and nothing farther away. The `glowing` effect draws an
outline visible even through walls, and `effect give` applies it. Run the command
from in-game chat, so that "near" means near *you*.

<details>
<summary>Hint</summary>

The target is "entities, but filtered." `@e` selects entities; the square
brackets hold the filters; you scrolled past the two you need a minute ago.

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
full `namespace:name` id. You've typed harder JSON than this today.

</details>

<details>
<summary>Second hint</summary>

It lives under `data/minecraft/tags/...` in your pack — you are adding an entry
to one of the game's own lists, which is why the game's namespace appears in
your folder. The exact tag-folder spelling for your version is on the wiki page
you're already on. The load hook's file is `load.json`.

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
file name. The `particle` command's syntax (which particle, where, how many) is
on its wiki page. Fixed coordinates neatly sidestep the question of where the
server "is standing" when it runs your file.

</details>

<details>
<summary>If nothing appears</summary>

Check that the coordinates are somewhere you can actually see, and check that
`tick.json` names your function's full `namespace:name` id. And `/reload` — the
server only knows what it read last.

</details>

**(B) A door anyone can open.** A gathering point that any player — op or not —
can teleport to by typing one `/trigger` command. This is the
machinery-behind-the-door build: `/trigger` does nothing until you make it mean
something.

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
tick — `scoreboard players enable`, the teleport, and `scoreboard players
reset`. "Anyone whose counter got bumped" is a selector job: there's a `scores=`
argument for exactly this.

</details>

<details>
<summary>Third hint</summary>

The selector shape is `@a[scores={yourobjective=1..}]`. And when the wiki's
examples use `/execute as`, that's the command that runs a line "as" each
selected player — its page explains the two words that matter, `as` and `at`.

</details>

### Show it off

Get at least one other person into the world — or your own second account — and
let them see the whole pack at work: an impossible item pulled out of a crafting
grid, the landmark burning with nobody at the keyboard, or a friend typing
`/trigger` and arriving at the gathering point under their own power.

Step back from the keyboard while they watch. That's the demonstration. The server
is executing your written instructions, unattended, in front of witnesses.

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Remove one comma.** Open your recipe file, delete a single comma, save, and
`/reload`. In the game, very little seems to happen — so your task is to find
where the server filed its complaint. You know the server talks in two places: the
console window, and its written record in `logs/latest.log`. Find the complaint
and read the whole thing, out loud — notice that it names your file, and notice
how precisely it points at the trouble. Then put the comma back, `/reload`, and
confirm the recipe works again. What this teaches: a *malformed* file fails
loudly. The error is always written down somewhere, and now you know where servers
keep their complaints.

**Rename one folder wrong.** Now the more dangerous failure. Take the folder your
recipe file sits in and rename it slightly wrong — add an `s`, or drop a letter.
`/reload`, then check `/datapack list` — and then check the crafting table.

Sit with what you find. The pack still loads. Nothing complains. The recipe is
simply *gone*. That's the sharpest lesson of the day: **loaded is not correct.**
The server takes what it recognizes and silently ignores what it doesn't — a file
in an unrecognized place isn't broken, it's invisible. Your prediction at the
start offered three options for a wrong folder name: error, warning, or nothing.
Now you've measured it. Rename the folder back, `/reload`, and verify at the table
one more time.

**The twenty-times tax.** Take a tick-hooked function — build A, or hook a scratch
function to `tick` just for this — and make it expensive on purpose: raise the
particle count to something absurd. Tens of thousands. `/reload`, and pay
attention in this order: feel the game respond, then go read the console, which
has opinions when the server can't keep up — find them. Then undo it — shrink the
number or pull the entry out of `tick.json` — `/reload`, and feel the world
recover. What this teaches: the tick budget is real. Your function has one
twentieth of a second, and a text file you wrote can overspend it. Every
automation you build from here on lives inside that budget.

**Poison the middle line.** In your starter-kit function, insert a deliberately
broken line *between* two working lines — a misspelled command, a `give` for an
item that doesn't exist. Run the function. Now settle the prediction you wrote at
the start: did the lines after the poison run? Check the evidence — did the second
item arrive? — and then find where the failure was reported; you know the server's
two mouths by now. Remove the bad line, run it once more clean. What this teaches:
you now know, because you measured it, how this system handles a partial failure —
and that "the file ran" and "every line worked" are different claims, the
function-shaped cousin of "loaded is not correct."

---

## What just happened

Search your pack for the place where you told the server "here are my recipes" or
"here are my functions." There isn't one. The server walked your folder tree, and
the *location* of each file declared what it was: files in the recipe folder are
recipes, files in the function folder are functions, full stop. The folder layout
is a contract — the wiki documents the shape the server expects, and anything
matching that shape gets picked up automatically. That's exactly why the misnamed
folder failed silently: the file stopped matching the contract, so it stopped
meaning anything at all. Where a file sits is part of what it says. That idea has
a fancy name in programming — an interface, a contract — but you've now touched
the real thing, which matters more than the name.

Now put your two creations side by side, because they're opposites. The recipe
file contains no instructions — no "when a player opens a table, check the top
row…" — just a description of a fact: these ingredients, this shape, that result.
The game's machinery did all the doing. Writing down what should be true and
letting the system work out how is called **declarative**. Your function files are
the other thing entirely: written-out steps, one action per line — **imperative**
— and specifically the console language you already spoke, the same strings,
written down instead of typed. That last part is the enormous trick of the day:
typed commands need your fingers; written ones can be replayed without you. The
tags are the server offering its own lifecycle as hooks — *run this when I load,
run this twenty times a second* — and from the moment `/reload` returned, it was
executing your instructions unattended. You automated yourself out of a job today.
A very large fraction of all programming is exactly that move, scaled up.

Selectors deserve one more sentence. `@e[type=minecraft:zombie,distance=..20]`
never names a zombie. It *describes a set*, and the server finds the members at
the instant the line runs — ask again a second later, different zombies.
Describing which things and letting the machine find them is a filter language,
and filter languages quietly run a very large share of the world's software. The
shape of that bracket syntax will look oddly familiar to you one day, in a session
about data.

JSON, meanwhile, is now yours: the second shape settings come in, after
`key=value` — nested, strict about punctuation, and absolutely everywhere. It will
be back.

And it's worth saying plainly, because today is the peak of what datapacks alone
can do in this module: your functions can react to the clock and to `/trigger` —
but they cannot read a sentence someone types in chat, cannot remember what
happened yesterday, cannot ask the internet anything. The world's *rules* are now
fully yours. A *participant* in the world — something that watches, understands,
and acts — takes a different kind of tool. It's coming.

---

## Go further

- The game's own content lives under a namespace too — `minecraft`. What happens
  if your datapack puts a recipe file at the same path as one of the game's own
  recipes? Could you change how sticks are made — or make something
  *uncraftable*? Find out.
- Recipes and functions are two kinds of content in the `data/` tree. Go back to
  the Data pack page and read what else can live there. Loot tables control what
  things drop when they die or break — could a zombie drop diamonds? What would
  it take to find out?
- Your pack is just a folder. Could a friend drop a copy into their own world and
  get your recipe and your functions? What exactly would you send them — and what
  on their end might make it behave differently?
- Could your pack hand a book of house rules to every player who *joins* the
  server? First question first: does anything in a datapack even fire "when a
  player joins"? Research it. What you find — and what you don't — is genuinely
  instructive.
- Ask the wiki what `/schedule` does. What does it give you that `tick` doesn't —
  and what's still missing compared to a real alarm clock?
- Write down three things you wish your pack could do but suspect it can't. For
  each: truly impossible, or just hard? The wiki and the datapack community will
  settle some of them; keep the list — the unsettled ones are a preview of the
  rest of this module. And people have built entire games — bosses, minigames,
  whole new mechanics — as datapacks alone. Find one, install it in a throwaway
  world, and read its function files like you'd read anyone's writing. How far
  can this medium be pushed by someone stubborn enough?

---

## What you have now

- A working datapack in `world/datapacks/`, built entirely by hand: at least one
  recipe of your own design, and hand-written functions — at least one running
  with nobody at the keyboard, on the server's clock or at any player's request
- You can apply datapack changes live with `/reload`, read pack status with
  `/datapack list`, and aim commands with selectors and their filters instead of
  names
- You've written JSON and been burned by its punctuation on purpose, once, in a
  controlled fire
- You've seen both failure modes — loud (malformed file, complaint in the log)
  and silent (misplaced file, ignored) — and measured how a function handles a
  failing line, instead of assuming
- You know the tick budget is real because you overspent it on purpose and read
  the server's complaint
- An impossible item in circulation in your world, craftable by anyone you teach —
  and something that happens by itself, in front of other people, because you
  wrote it down
