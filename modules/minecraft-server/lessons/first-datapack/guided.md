# Changing the rules of crafting

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Crafting looks like one of the game's fixed laws: these ingredients, in this shape,
make that item, and some items simply cannot be made at all. It isn't a law. It's
data — and the server will accept new data from you.

This session is about **datapacks**: folders of plain text files, placed inside your
world, that change what the game considers true. Recipes, drops, rules — no
programming language, no build tools, nothing to install. You write files, tell the
server to re-read them, and the game is different.

You'll build one from scratch, by hand, and use it to do something quietly
outrageous: add a crafting recipe for an item the game refuses to let anyone craft.
When you're done, anyone at a crafting table in your world can make an item that
shouldn't exist — and you'll know exactly which file made it so.

---

## Before you start

You need:

- **A server you can start, stop, and join.**
  [Running your own server](../running-your-own-server/guided.md) gets you there. Quick
  check: start it, join it, `stop` it.
- **Console commands, and operator status in-game.**
  [Talking to a running server](../console-commands/guided.md) covers both. Quick check: you
  can run `/gamerule doDaylightCycle` from in-game chat and get an answer instead of
  a refusal.
- **A code editor.** Set up in
  [Setting up a coding machine](../dev-machine-setup/guided.md). Quick check: you can open
  your server's folder in VS Code and create files and folders from its sidebar.

---

## What you'll have at the end

By the end of this session you will have:

- Built a datapack by hand — every folder, every file, typed by you
- Read and written **JSON**, the second great shape of settings files
- Added a crafting recipe for an item that has no recipe, and crafted it
- Broken your pack twice on purpose — once loudly, once silently — and learned to
  tell the difference between "loaded" and "correct"
- An item in a friend's hands that they made at a crafting table, which the game was
  never supposed to allow

One warning about method, stated up front: in this session, the files are the whole
point. Nothing gets copy-pasted. You'll type every character, because typing is what
forces you to read them.

---

## New tools

**A datapack** is a folder of plain text files that changes game content. It lives
*inside the world* — in `world/datapacks/` in your server's folder — and that
placement means something: a datapack changes that particular world, and if the
world folder is ever copied somewhere else, the pack travels with it. A pack has two
parts: a small file at its root that announces "this folder is a datapack," and a
`data/` folder holding the actual content.

**JSON** (JavaScript Object Notation) is the shape those files are written in. You've
seen it once already without the name — `ops.json`, when you made yourself an
operator. Where `server.properties` was flat `key=value` lines, JSON nests: curly
braces `{ }` group things, square brackets `[ ]` make lists, and entries look like
`"name": value` with commas between them. One rule to hold onto: the punctuation is
load-bearing. Every brace, quote, and comma is information, and computers do not
guess. You'll feel this rule personally before the session ends — on purpose.

**Two console commands.** `/reload` makes the running server re-read every datapack
from disk — it's the live apply channel, like the console commands were for rules.
`/datapack list` shows which packs the server knows about and whether they're
enabled. Both need operator status, which you have.

**The Data pack page on minecraft.wiki** is the blueprint you'll build from — it
documents the exact folder structure and file contents a pack needs. It matters that
you take the structure from that page and not from this lesson: the layout has
changed between Minecraft versions, so the wiki page *for your version* is the only
source that's guaranteed right for your server.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Settings-file changes needed a restart. Console commands were instant. Which way
  will datapack files go — or is there a third answer?
- Your pack will be a tree of folders several levels deep. If one folder name in the
  chain is slightly wrong, what do you expect: an error, a warning, or nothing at
  all?
- Which file, do you think, is the one that tells the server "this folder is a
  datapack, take it seriously"?

---

## The work

### Find where packs live

Open your server's folder in VS Code and look inside `world/` for a folder called
`datapacks`. If it's there, that's home. If it isn't, create it — named exactly
`datapacks` — and file away the suspicion that exact names matter around here. That
suspicion gets confirmed later today.

### Get the blueprint from the source

Open [minecraft.wiki](https://minecraft.wiki) and find its **Data pack** page. You
know which Minecraft version your server runs — you chose it. Two things to extract
from the page, written down on paper:

1. **The folder structure**, from the pack's root folder all the way down to where a
   *recipe* file sits. Sketch the tree — every level, exact spellings. Note which
   folder name is your own to choose (the wiki calls it the **namespace** — the
   folder that brands everything your pack adds; yours to name, lowercase, no
   spaces) and which names must match the wiki exactly.
2. **The current `pack_format` number** for your version. The wiki keeps a table
   mapping Minecraft versions to pack format numbers — a little version stamp that
   goes in the announcement file so the server knows the pack speaks its dialect.

This step is not overhead. Reading structure out of a reference page, for your exact
version, is most of what this session teaches — and it's the reason your pack will
work while a copied-from-somewhere pack often doesn't.

### Build the skeleton

Now build what you sketched, in VS Code, inside `world/datapacks/`: your pack's
folder (name it whatever you like), the `pack.mcmeta` file at its root, and the
`data/` tree down to — but not yet including — a recipe file. Type `pack.mcmeta`
yourself, from the example on the wiki page, with your own description text and the
`pack_format` you looked up. This is your first hand-written JSON: watch every brace,
quote, and comma as you type it.

Then prove the server sees your pack before writing any content. In-game: `/reload`,
then `/datapack list`, and read the output carefully — it tells you what the server
found and what state it's in. Your pack's name should be in there. If the list shows
your pack as available but not switched on, the `/datapack` command has a way to
enable it — the list output and the wiki's `/datapack` command page will get you
there.

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
know the skeleton is right, so anything that goes wrong later is in the content, not
the frame.

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

Two standing instructions. First: before trusting this template, open the **Recipe**
page on minecraft.wiki for your version and check the field names against a real
example there — recipe fields have been renamed across versions, and where this
template and the wiki disagree, **the wiki wins**. Second: type it. Every character.

Fill in your pattern, your key (one entry per character you used), and your result.
Item ids are the `minecraft:something` names you already know from the `give`
command.

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

Take the item. Look at it for a second — as of a few minutes ago, that object could
not be made in this world.

Now the actual payoff: get someone else to a crafting table. Give them the
ingredients, tell them the shape, and let *them* pull an impossible item out of the
grid. Your world now has crafting rules of your own design, and other people can use
them without you touching anything.

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Remove one comma.** Open your recipe file, delete a single comma, save, and
`/reload`. In the game, very little seems to happen — so your task is to find where
the server filed its complaint. You know the server talks in two places: the console
window, and its written record in `logs/latest.log`. Find the complaint and read the
whole thing, out loud — notice that it names your file, and notice how precisely it
points at the trouble. Then put the comma back, `/reload`, and confirm the recipe
works again. What this teaches: a *malformed* file fails loudly. The error is always
written down somewhere, and now you know where servers keep their complaints.

**Rename one folder wrong.** Now the more dangerous failure. Take the folder your
recipe file sits in and rename it slightly wrong — add an `s`, or drop a letter.
`/reload`, then check: `/datapack list` — and then check the crafting table.

Sit with what you find. The pack still loads. Nothing complains. The recipe is
simply *gone*. That's the sharpest lesson of the day: **loaded is not correct.** The
server takes what it recognizes and silently ignores what it doesn't — a file in an
unrecognized place isn't broken, it's invisible. Your prediction at the start of
this session offered three options for a wrong folder name: error, warning, or
nothing. Now you've measured it. Rename the folder back, `/reload`, and verify at
the table one more time.

---

## What just happened

Search your pack for the place where you told the server "here is my list of
recipes." There isn't one. The server walked your folder tree, and the *location* of
each file declared what it was: files in the recipe folder are recipes, full stop.
The folder layout is a contract — the wiki page documents the shape the server
expects, and anything matching that shape gets picked up automatically. That's also
exactly why the misnamed folder failed silently: the file stopped matching the
contract, so it stopped meaning anything at all. Where a file sits is part of what
it says. That idea has a fancy name in programming — an interface, a contract — but
you've now touched the real thing, which matters more than the name.

Notice, too, what your recipe file *doesn't* contain: instructions. No "when a
player opens a table, check the top row…" — you wrote a description of a fact, and
the game's machinery did all the doing. There's a word for each side of that line.
Writing out steps to follow — like your console commands, one action per line — is
called **imperative**. Writing down what should be true and letting the system work
out how — like your recipe — is called **declarative**. You've now done both, and
you'll keep meeting the pair for as long as you do this.

And JSON is now yours: the second shape settings come in, after `key=value` — nested,
strict about punctuation, and absolutely everywhere. This won't be the last file of
it you write. It won't even be the last one this week.

---

## Go further

- The game's own content lives under a namespace too — `minecraft`. What happens if
  your datapack puts a recipe file at the same path as one of the game's own
  recipes? Could you change how sticks are made — or make something *uncraftable*?
  Find out.
- Recipes are one kind of content in the `data/` tree. Go back to the Data pack page
  and read what else can live there. Loot tables control what things drop when they
  die or break — could a zombie drop diamonds? What would it take to find out?
- Your pack is just a folder. Could a friend drop a copy into their own world and
  get your recipe? What exactly would you send them — and what on their end might
  make it behave differently?
- Why would a game bother distinguishing shaped from shapeless recipes at all?
  Which vanilla recipes would collide with each other if every recipe were
  shapeless?

---

## What you have now

- A working datapack in `world/datapacks/`, built entirely by hand, adding at least
  one recipe of your own design
- You can apply datapack changes live with `/reload` and read pack status with
  `/datapack list`
- You've written JSON and been burned by its punctuation on purpose, once, in a
  controlled fire
- You've seen both failure modes — loud (malformed file, complaint in the log) and
  silent (misplaced file, ignored) — and know that "loaded" and "correct" are
  different claims
- An impossible item in circulation in your world, craftable by anyone you teach
