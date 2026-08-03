# Changing the rules of crafting

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** first-datapack
- **Part:** Part 1 — The server is yours to change
- **Scaffolding:** level 1 — first datapack and first JSON; worked-answer/completion
  approach allowed (JSON is brand new; ending with nothing working is worse than
  ending with something completed from a template)
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

The learner builds a datapack from scratch: a folder of plain text files, placed
inside the world, that adds a crafting recipe for an item the game normally refuses
to let anyone craft. Applied live with `/reload`, verified at a crafting table.
Payoff: friends stand at a crafting table and make an item that shouldn't exist —
and the learner can say "I changed what crafting means here."

The lesson under the lesson: where a file sits *is* what it means. No registration
list, no build step — the folder path is the contract. Also the first encounter with
JSON, framed as the second settings-file shape after `key=value`.

## Prerequisites

- A server you can start, stop, and join — established by
  `lessons/running-your-own-server/`
- You can run console commands and are an operator in your own game — established by
  `lessons/console-commands/` (`/reload` and `/datapack` are op commands)
- A code editor you can open folders in — established by `lessons/dev-machine-setup/`

## Establishes

- A working datapack in the world's `datapacks/` folder, built by hand, adding at
  least one custom recipe
- The learner can apply datapack changes with `/reload` and check pack status with
  `/datapack list`
- Has read and written JSON, and has seen both failure modes: a malformed file (loud,
  reported) and a misplaced file (silent, ignored)
- Cited by other cores as: "you've built and loaded a datapack and can apply changes
  with `/reload` — established by `lessons/first-datapack/`."

## Facts

- A **datapack** is a folder of plain text files that changes game content — recipes,
  loot, advancements, world rules, functions. No programming toolchain, no
  compilation: files in, behavior out.
- Datapacks live inside the world: `world/datapacks/<packname>/`. Placement inside
  the world folder is meaningful — a pack modifies *that world*, and travels with it
  when the world is copied. [verify] whether `world/datapacks/` exists by default on
  a fresh dedicated-server world on current versions; if absent it can be created
  with exactly that name.
- Pack skeleton: a `pack.mcmeta` file at the pack root (announces "this folder is a
  datapack" and states the pack format), plus a `data/` folder containing everything
  else.
- `pack.mcmeta` is JSON and contains a `pack_format` number that must match the
  Minecraft version [volatile as of 2026-07 — the number changes constantly across
  releases; deliveries must have the learner get the current value from the wiki, not
  from us]. Source: the **Data pack** page (and its pack-format table) on
  minecraft.wiki.
- Folder layout below `data/`: `data/<namespace>/<registry folder>/<name>.json`. The
  registry folder for recipes is named `recipe` on current versions but was
  `recipes` on older ones [verify][volatile as of 2026-07] — deliveries point the
  learner at the **Data pack** page on minecraft.wiki for their version and have them
  copy the structure from there. Getting this from the source is part of the lesson,
  not a workaround.
- **Namespace**: the folder directly under `data/` — lowercase letters, digits,
  underscores/hyphens only, no spaces or capitals. The learner picks their own (it
  brands everything the pack adds). `minecraft` is the game's own namespace.
- The recipe's **id** is derived from its path: `data/<ns>/recipe/saddle.json`
  becomes `<ns>:saddle`. The path IS the registration.
- **JSON** (JavaScript Object Notation): the second settings-file shape after
  `key=value`. Curly braces group, square brackets list, `"name": value` pairs,
  commas between entries. Punctuation is load-bearing; computers do not guess.
- Recipe JSON: `"type"` of `minecraft:crafting_shaped` (grid pattern matters) or
  `minecraft:crafting_shapeless` (only the set of ingredients matters). Shaped
  recipes use `pattern` (rows of characters), `key` (which character means which
  item), and `result`. Exact field spellings — including whether the result item is
  given under `"id"` or an older field name — changed across versions [verify]
  [volatile as of 2026-07]: the **Recipe** page on minecraft.wiki is authoritative,
  and the delivery's completion template must be cross-checked against it by the
  learner.
- `/reload` (op) re-reads all datapacks from disk into the running server — the live
  channel for file changes; no restart.
- `/datapack list` (op) shows available and enabled packs. New packs dropped into the
  folder are picked up on `/reload` [verify whether auto-enabled or listed as
  available-and-disabled on current versions — delivery has the learner read the
  `/datapack list` output and act on it; `/datapack enable` exists if needed].
- Datapack loading errors are reported in the console and in `logs/latest.log` —
  a malformed file is called out at `/reload` time. Do not assert exact wording.
- A structurally valid pack with a file in the *wrong folder* loads without complaint
  — the misplaced file is silently ignored. "Loaded" and "correct" are different
  claims. (This is the second break-it.)
- Target item: something uncraftable in survival. The saddle is the classic
  candidate [verify — recent versions may have added a vanilla saddle recipe;
  volatile as of 2026-07]. The delivery must have the learner *choose* a target and
  confirm it's uncraftable by checking that item's own minecraft.wiki page (which
  shows crafting recipes when they exist) — that keeps the lesson correct regardless
  of what Mojang adds. Name tag is a fallback candidate [verify].
- Custom recipes may not appear in the in-game recipe book without extra advancement
  plumbing; placing the ingredients directly in the crafting grid works regardless
  [verify]. Delivery phrases this as "if the recipe book doesn't show it, place the
  ingredients by hand."

## Arc

### Orientation — given plainly

What a datapack is; that it lives inside the world and why that placement means
something; the two-part skeleton (`pack.mcmeta` + `data/`); JSON named and explained
plainly as the second settings shape; `/reload` as the live apply; the wiki **Data
pack** page as the blueprint to build from. State plainly: everything in this lesson
is typed by hand — these files are the subject matter, not setup.

### Predictions to elicit

- Settings needed a restart; console commands were instant. Which way will datapack
  changes go — and is there maybe a third answer?
- The pack will be a folder tree several levels deep. What do you think happens if
  one folder name in the chain is wrong — error, warning, or silence?
- Which file do you think tells the server "this folder is a datapack, take it
  seriously"?

### The work — goals and hint ladders

1. **Find where packs live.** Goal: locate the `datapacks` folder inside the world.
   (Plain orientation: it's `world/datapacks/`. If it isn't there, create it with
   exactly that name — and note the suspicion that exact names matter here; the
   break-it section confirms it.)
2. **Get the blueprint from the source.** Open the **Data pack** page on
   minecraft.wiki. Two questions to answer from it, written down: (a) the exact
   folder structure from the pack root down to where a recipe file sits — sketch the
   tree on paper, exact spellings; (b) the current `pack_format` number for the
   Minecraft version the server runs (the learner knows their version; a pack-format
   table on the wiki maps versions to numbers). Not optional, and not a chore: the
   layout has changed across versions, so the wiki-for-your-version is the only
   honest source, and reading structure out of a reference is the skill.
3. **Build the skeleton.** Goal: pack folder with a hand-typed `pack.mcmeta`, the
   `data/<namespace>/` tree per the sketch, no recipe yet — and prove the server
   sees it: `/reload`, then `/datapack list`, and read the output (if the pack shows
   as available but not enabled, the `/datapack` command can enable it — read what
   the list says). JSON introduced here, at the moment of first typing: braces,
   quotes, colons, commas, and the rule that punctuation is load-bearing.
   - Rung 1: the wiki page you're on shows a minimal `pack.mcmeta`. Type it — with
     your own description text and the `pack_format` you looked up.
   - Rung 2: if `/datapack list` doesn't mention your pack at all, the server
     doesn't think the folder is a pack. Three usual suspects: the pack folder isn't
     directly inside `world/datapacks/`, the file isn't named exactly `pack.mcmeta`,
     or the JSON inside it doesn't parse. The console output at `/reload` helps with
     the third.
4. **Choose the impossible item.** Goal: pick an item that cannot be crafted in
   survival and prove it. Candidates worth checking: the saddle, the name tag. The
   proof: the item's own page on minecraft.wiki shows its ways of being obtained —
   if crafting were one of them, a recipe would be right there. (This step exists
   because "what's craftable" shifts across versions; the learner verifies against
   the source rather than trusting this lesson.)
5. **Write the recipe.** Goal: a recipe file in the right folder, typed by hand,
   that crafts the chosen item from ingredients the learner picks. Completion
   problem — the delivery shows a shaped-recipe template with the load-bearing
   parts blanked (pattern rows, key mapping, result), with explanation of what each
   part means, and the standing instruction: cross-check every field name against
   the **Recipe** page on minecraft.wiki for your version — where the wiki and the
   template disagree, the wiki wins. Template (author reference; blanks marked ▢ in
   delivery):

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

   [verify entire shape against current wiki — `key` entry form and `result` field
   names are version-sensitive; older versions used `"item"` instead of `"id"`.]
   File name = recipe name; remind that the path becomes the id.
6. **Craft the uncraftable.** `/reload`, then to a crafting table with the
   ingredients. If the recipe book doesn't show the new recipe, place the
   ingredients in the grid by hand per the pattern. Take the item. Then the real
   payoff: get someone else to a crafting table and let *them* make one.

### Break it on purpose — failures to cause, undo, and read

- **Remove one comma.** Delete a single comma from the recipe JSON, save,
  `/reload`. The game gives little away — so find where the server filed its
  complaint: the console, and `logs/latest.log`. Read the whole report; notice it
  names the file and points at the trouble spot. Restore the comma, `/reload`,
  confirm recovery. Teaches: malformed files fail *loudly* — the error is always
  written down somewhere, and the log is where servers keep their complaints.
- **Rename one folder wrong.** Rename the recipe folder to something slightly off
  (an added `s`, a typo), `/reload`. Now the trap: `/datapack list` still shows the
  pack loaded and enabled — but the recipe is gone from the game. No error
  anywhere. Teaches the sharpest lesson of the day: **loaded is not correct.** The
  server takes what it recognizes and silently ignores what it doesn't; a file in an
  unrecognized location isn't broken, it's *invisible*. Rename back, `/reload`,
  re-verify at the table.

### What just happened — the explanation

Nowhere in the pack is a list saying "here are my recipes." The server walks the
folder tree and the *location* of each file declares what it is: things under the
recipe folder are recipes, full stop. The folder layout is a contract — the server
publishes the shape it expects (that's what the wiki page documents), and anything
matching the shape gets picked up. That's why the wrong folder name failed silently:
the file stopped matching the contract, so it stopped meaning anything. Programmers
would call this layout an interface or an API contract; the point survives without
the vocabulary — *where a file sits is part of what it says*.

And notice what the recipe file contains: no instructions. No "when the player
opens the table, check slot one…" — just a description of a fact: these
ingredients, this shape, that result. The game's own machinery does everything else.
Describing *what should be true* and letting the system work out *how* is called the
declarative style; writing out the steps is the imperative style. The learner has now
done both — console commands were steps, this was a description — and will keep
meeting the pair for the rest of the module.

JSON, meanwhile, joins `key=value` as the second shape settings come in — nested,
punctuation-strict, and everywhere. It will be back.

### Go further — open questions

- Your namespace sat next to one named `minecraft` in the wiki's examples. What
  happens if a datapack puts a file at the same path as one of the game's own
  recipes — could you *replace* how sticks are made, or delete a vanilla recipe
  outright? Find out.
- Recipes are one registry folder among many in the tree. Look at what else the
  **Data pack** page lists — loot tables, for one. Could a zombie drop diamonds?
  What would that take?
- The pack is just a folder. Could a friend drop a copy into *their* world and get
  your recipe? What exactly would you have to send them, and what might be
  different on their end?
- Why might a game distinguish "shaped" from "shapeless" recipes at all — and which
  vanilla recipes would break if everything were shapeless?

## Delivery notes

- **guided:** the wiki-first structure step is the heart of the lesson — the
  delivery must *not* print the folder tree or the pack_format number as fact;
  everything structural is fetched by the learner from the Data pack page for their
  version. The completion template is shown with blanks and an explicit
  "wiki wins over this template" instruction.
- Do not spoil either break-it outcome (where the error appears; the silence of the
  misplaced folder).
- The uncraftable-item check (step 4) must stay, even if it feels like overhead —
  it's the volatile-fact discipline made visible, and it protects the lesson from
  Mojang adding recipes.
- Everything typed by hand; state it plainly at orientation. No copy-paste of
  recipe JSON.
- Tone risk: JSON punctuation pedantry can read as scolding — keep it matter-of-fact
  (computers don't guess; the comma is information).
