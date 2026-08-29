# Building datapacks: custom recipes and functions

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** building-datapacks
- **Module / Part:** minecraft-server — Part 1 — The server is yours to change
- **Scaffolding:** mixed by section. The recipe arc (work goals 1–5) is level 1 —
  first datapack and first JSON; worked-answer/completion approach allowed (JSON is
  brand new; ending with nothing working is worse than ending with something
  completed from a template). The functions arc (goals 6–11) is level 2 — second
  exercise of the datapack skill within the same lesson: goals plus hints, concepts
  named but not applied, ladders stop at rung 3, and the pack skeleton / JSON /
  `/reload` are cited as established earlier in the lesson, never re-taught.
- **Deliveries:** guided only
- **Status:** ready
- **Merged from:** `first-datapack` and `datapack-functions` (former separate
  lessons; their cores are the sources of every fact and hint here).

## Goal and payoff

The learner builds a datapack from scratch — a folder of plain text files, placed
inside the world — and pushes it through two escalations. First, data: a crafting
recipe for an item the game normally refuses to let anyone craft, applied live with
`/reload`, verified at a crafting table. Then, behavior: `.mcfunction` files —
named lists of console commands the server runs as one unit — wired to run
automatically via the load and tick hooks or on any player's demand via `/trigger`,
aiming commands with target selectors along the way.

Payoff: friends stand at a crafting table and make an item that shouldn't exist,
and something happens in the world automatically — on schedule or on player demand,
visible to everyone online, with nobody at the keyboard.

The lessons under the lesson: (1) where a file sits *is* what it means — no
registration list, no build step; the folder path is the contract; (2) the console
language the learner already speaks is scriptable — write the lines down once and
the server replays them forever, the first time the learner automates themselves
out of a job. The recipe half is the first encounter with JSON (the second
settings-file shape after `key=value`) and with the declarative style; the
functions half is the imperative style written down — the pair is the spine of the
merged what-just-happened.

## Prerequisites

- A server you can start, stop, and join — established by
  `lessons/running-your-own-server/`
- You can run console commands and are an operator in your own game — established
  by `lessons/server-settings-and-console/` (`/reload` and `/datapack` are op
  commands)
- A code editor you can open folders in — established by
  `modules/dev-machine/lessons/dev-machine-setup/`

## Establishes

- A working datapack in the world's `datapacks/` folder, built by hand, adding at
  least one custom recipe and hand-written functions, at least one of which runs
  automatically (tick or load) or on player demand (`/trigger`)
- The learner can apply datapack changes with `/reload` and check pack status with
  `/datapack list`
- Has read and written JSON, and has seen both failure modes: a malformed file
  (loud, reported) and a misplaced file (silent, ignored)
- Can use target selectors with arguments to aim commands at filtered sets of
  players/entities
- Has felt the cost of a 20-times-per-second hook and knows the tick budget is real
- Cited by other cores as: "you've built a datapack with a custom recipe and
  functions that run automatically, and can apply changes with `/reload` —
  established by `lessons/building-datapacks/`."

## Facts

Datapacks and recipes:

- A **datapack** is a folder of plain text files that changes game content —
  recipes, loot, advancements, world rules, functions. No programming toolchain,
  no compilation: files in, behavior out.
- Datapacks live inside the world: `world/datapacks/<packname>/`. Placement inside
  the world folder is meaningful — a pack modifies *that world*, and travels with
  it when the world is copied. [verify] whether `world/datapacks/` exists by
  default on a fresh dedicated-server world on current versions; if absent it can
  be created with exactly that name.
- Pack skeleton: a `pack.mcmeta` file at the pack root (announces "this folder is
  a datapack" and states the pack format), plus a `data/` folder containing
  everything else.
- `pack.mcmeta` is JSON and contains a `pack_format` number that must match the
  Minecraft version [volatile as of 2026-07 — the number changes constantly across
  releases; deliveries must have the learner get the current value from the wiki,
  not from us]. Source: the **Data pack** page (and its pack-format table) on
  minecraft.wiki.
- Folder layout below `data/`: `data/<namespace>/<registry folder>/<name>.json`.
  The registry folder for recipes is named `recipe` on current versions but was
  `recipes` on older ones [verify][volatile as of 2026-07] — deliveries point the
  learner at the **Data pack** page on minecraft.wiki for their version and have
  them copy the structure from there. Getting this from the source is part of the
  lesson, not a workaround.
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
  item), and `result`. Exact field spellings — including whether the result item
  is given under `"id"` or an older field name — changed across versions [verify]
  [volatile as of 2026-07]: the **Recipe** page on minecraft.wiki is
  authoritative, and the delivery's completion template must be cross-checked
  against it by the learner.
- `/reload` (op) re-reads all datapacks from disk into the running server — the
  live channel for file changes; no restart.
- `/datapack list` (op) shows available and enabled packs. New packs dropped into
  the folder are picked up on `/reload` [verify whether auto-enabled or listed as
  available-and-disabled on current versions — delivery has the learner read the
  `/datapack list` output and act on it; `/datapack enable` exists if needed].
- Datapack loading errors are reported in the console and in `logs/latest.log` —
  a malformed file is called out at `/reload` time. Do not assert exact wording.
- A structurally valid pack with a file in the *wrong folder* loads without
  complaint — the misplaced file is silently ignored. "Loaded" and "correct" are
  different claims. (Break-it material.)
- Target item: something uncraftable in survival. The saddle is the classic
  candidate [verify — recent versions may have added a vanilla saddle recipe;
  volatile as of 2026-07]. The delivery must have the learner *choose* a target
  and confirm it's uncraftable by checking that item's own minecraft.wiki page
  (which shows crafting recipes when they exist) — that keeps the lesson correct
  regardless of what Mojang adds. Name tag is a fallback candidate [verify].
- Custom recipes may not appear in the in-game recipe book without extra
  advancement plumbing; placing the ingredients directly in the crafting grid
  works regardless [verify]. Delivery phrases this as "if the recipe book doesn't
  show it, place the ingredients by hand."

Functions, hooks, selectors:

- A **function** is a plain text file with the extension `.mcfunction`: one
  console command per line, **no leading slashes**, lines starting with `#` are
  comments. The server runs the whole file as a unit.
- Functions live in the datapack under the learner's namespace, in the functions
  registry folder — named `function` on current versions, `functions` on older
  ones [verify][volatile as of 2026-07]. Deliveries point at the **Function (Java
  Edition)** page on minecraft.wiki (and the Data pack page's structure listing)
  for the exact name, same drill as the recipe folder.
- Run manually with `/function <namespace>:<name>` (op). The id comes from the
  path, exactly like recipes.
- **Function tags** hook functions to events. Two built-in hooks live in the
  `minecraft` namespace of the learner's own pack:
  `data/minecraft/tags/<tag folder>/tick.json` and `load.json` [verify tag folder
  name — `function` vs `functions`, changed alongside the registry folder]
  [volatile as of 2026-07 — wiki **Tag (Java Edition)** page / Data pack page].
  Content shape: `{ "values": ["<namespace>:<name>"] }`.
  - `load` runs when the pack loads: server start and every `/reload` (which
    makes it a perfect checkpoint/heartbeat).
  - `tick` runs **every game tick — 20 times per second**, forever. This number
    is the lesson's safety fact and the break-it fuel.
- Commands in a function run as *the server*, not as any player: no
  position/rotation of their own to speak of, so relative coordinates and
  "nearest" behave surprisingly. `/execute as ... at ...` re-aims a command's
  context. This lesson needs only the existence of `/execute` named plainly,
  pointed at its wiki page — not mastery [verify exact default execution position
  of tick functions; do not assert in delivery — learners observe behavior and
  are pointed at /execute].
- **Target selectors**: `@a` all players, `@p` nearest player, `@e` all entities,
  `@s` the executor, `@r` one at random. Square-bracket arguments filter:
  `type=`, `distance=..N`, `limit=`, `sort=`, `name=`, `tag=` — e.g.
  `@e[type=minecraft:zombie,distance=..20]`. Full argument list: the target
  selectors section of the **Target selectors** page on minecraft.wiki
  (read-the-surface material). Learner-facing name: "a filter language" — you
  describe *which ones*, the server finds them. (Author note: this is
  deliberately WHERE/LIMIT/ORDER BY without saying SQL; the data arc will collect
  the foreshadow.)
- `/trigger <objective>` is one of the few commands **every player can run
  without op** — that's its entire reason to exist. Standard pattern: an op
  creates a scoreboard objective with the `trigger` criterion (`scoreboard
  objectives add <name> trigger`); a player's use must be enabled (`scoreboard
  players enable <target> <name>`) and re-enabled after each use; a tick function
  watches for players whose score changed (`@a[scores={<name>=1..}]`), acts,
  resets, re-enables. The **/trigger** page on minecraft.wiki documents the
  pattern [verify details on current version].
- Whether a failed line stops the rest of a function: each line is believed to
  run independently — a mid-file error does not abort the file [verify].
  Deliveries must not assert; a break-it has the learner measure it.
- An expensive tick function (e.g. `particle` with large counts, 20/s) visibly
  lags the server; the console complains when the server falls behind (do not
  assert exact wording — learner reads it). Fully reversible: remove the line or
  the tag entry, `/reload`.
- `particle <type> <pos> ...` spawns visual particles; harmless, visible, and
  throttleable — ideal tick-effect material. Particle types and syntax: wiki
  **Commands/particle** page.

## Arc

### Orientation — given plainly

What a datapack is; that it lives inside the world and why that placement means
something; the two-part skeleton (`pack.mcmeta` + `data/`); JSON named and
explained plainly as the second settings shape; `/reload` as the live apply; the
wiki **Data pack** page as the blueprint to build from. State plainly: everything
in this lesson is typed by hand — these files are the subject matter, not setup.

At the transition to functions: a function is the console language written down —
same commands, one per line, no slashes, run as a unit. Where function files go:
same wiki-first drill as recipes. The two hooks (`load`, `tick`) explained plainly,
including the number twenty and what it implies. Selectors introduced plainly as a
filter language with `@a/@p/@e` + arguments. `/execute` and `/trigger` named as
existing, pointed at their pages, not taught line-by-line — concepts named,
application withheld.

### Predictions to elicit

- Settings needed a restart; console commands were instant. Which way will
  datapack changes go — and is there maybe a third answer?
- The pack will be a folder tree several levels deep. What do you think happens if
  one folder name in the chain is wrong — error, warning, or silence?
- Which file do you think tells the server "this folder is a datapack, take it
  seriously"?
- Function files are commands without slashes; chat requires the slash. What is
  the slash actually *for*?
- If one line in the middle of a function fails, what happens to the lines after
  it? (Keep the answer; it gets measured in break-it.)
- `tick` runs a function twenty times per second. What's the most expensive thing
  you could accidentally ask for twenty times a second — and what would that do
  to the world?

### The work — goals and hint ladders

1. **Find where packs live.** Goal: locate the `datapacks` folder inside the
   world. (Plain orientation: it's `world/datapacks/`. If it isn't there, create
   it with exactly that name — and note the suspicion that exact names matter
   here; the break-it section confirms it.)
2. **Get the blueprint from the source, then build the skeleton.** Open the
   **Data pack** page on minecraft.wiki. Two questions to answer from it, written
   down: (a) the exact folder structure from the pack root down to where a recipe
   file sits — sketch the tree on paper, exact spellings, noting which folder
   name is the learner's own namespace to choose; (b) the current `pack_format`
   number for the Minecraft version the server runs (the learner knows their
   version; a pack-format table on the wiki maps versions to numbers). Not
   optional, and not a chore: the layout has changed across versions, so the
   wiki-for-your-version is the only honest source, and reading structure out of
   a reference is the skill. Then build it: pack folder with a hand-typed
   `pack.mcmeta`, the `data/<namespace>/` tree per the sketch, no recipe yet —
   and prove the server sees it: `/reload`, then `/datapack list`, and read the
   output (if the pack shows as available but not enabled, the `/datapack`
   command can enable it — read what the list says). JSON introduced here, at the
   moment of first typing: braces, quotes, colons, commas, and the rule that
   punctuation is load-bearing.
   - Rung 1: the wiki page you're on shows a minimal `pack.mcmeta`. Type it —
     with your own description text and the `pack_format` you looked up.
   - Rung 2: if `/datapack list` doesn't mention your pack at all, the server
     doesn't think the folder is a pack. Three usual suspects: the pack folder
     isn't directly inside `world/datapacks/`, the file isn't named exactly
     `pack.mcmeta`, or the JSON inside it doesn't parse. The console output at
     `/reload` helps with the third.
3. **Choose the impossible item.** Goal: pick an item that cannot be crafted in
   survival and prove it. Candidates worth checking: the saddle, the name tag.
   The proof: the item's own page on minecraft.wiki shows its ways of being
   obtained — if crafting were one of them, a recipe would be right there. (This
   step exists because "what's craftable" shifts across versions; the learner
   verifies against the source rather than trusting this lesson.)
4. **Write the recipe.** Goal: a recipe file in the right folder, typed by hand,
   that crafts the chosen item from ingredients the learner picks. Completion
   problem — the delivery shows a shaped-recipe template with the load-bearing
   parts blanked (pattern rows, key mapping, result), with explanation of what
   each part means, and the standing instruction: cross-check every field name
   against the **Recipe** page on minecraft.wiki for your version — where the
   wiki and the template disagree, the wiki wins. Template (author reference;
   blanks marked ▢ in delivery):

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

   [verify entire shape against current wiki — `key` entry form and `result`
   field names are version-sensitive; older versions used `"item"` instead of
   `"id"`.] File name = recipe name; remind that the path becomes the id.
5. **Craft the uncraftable.** `/reload`, then to a crafting table with the
   ingredients. If the recipe book doesn't show the new recipe, place the
   ingredients in the grid by hand per the pattern. Take the item. Then the first
   payoff: get someone else to a crafting table and let *them* make one.

   *Transition (in-lesson, replaces the old between-lesson cliffhanger):* the
   recipe was data — a fact the game now believes. The same pack can also hold
   *behavior*: the console language, written down and replayed.

6. **First function, one line.** Goal: a function that makes the server say
   something, run by hand with `/function`. Find where function files live in a
   datapack — the wiki's Data pack / Function pages, for your version, same
   drill as the recipe folder — create `<something>.mcfunction` in the existing
   pack, one `say` line, `/reload`, run it.
   - Rung 1: everything about placement works exactly like the recipe did: a
     registry folder under your namespace, exact name from the wiki, id from the
     path.
   - Rung 2: if `/function` can't find it, the same three suspects as before
     apply — wrong folder name, wrong nesting, or the file extension isn't
     exactly `.mcfunction`. `/reload` first; the tab-completion on `/function`
     in-game shows what the server actually registered, which tells you whether
     the problem is registration or spelling.
7. **The starter kit.** Goal: one function that equips every player currently
   online — a few useful items, a message greeting them — run as a single
   `/function` command while at least one other player (or a second account, or
   just you) is in. This is where selectors begin: the commands must say *who*
   receives, without naming names.
   - Rung 1: you already know `give` and `say` take a target. You've only ever
     used player names. The selector `@a` means "all players" and drops in
     anywhere a name goes.
   - Rung 2: several `give @a ...` lines plus something said — remember lines
     run in order, so decide whether the greeting lands before or after the
     loot.
8. **Read the surface, then aim.** Two parts. First: open the **Target
   selectors** page on minecraft.wiki and scan the *entire* list of selector
   arguments — not to learn them, to see how precisely "which ones" can be
   described. Rough count. Second, the goal: standing in your world, make every
   creature within about 15 blocks of you glow — without affecting anything
   farther away. (The `glowing` effect makes outlines visible through walls;
   `effect give` applies it. Run it from in-game chat so "near" means near
   *you*.)
   - Rung 1: the target is "entities, but filtered." `@e` selects entities; the
     square brackets after it hold the filters; you just scrolled past the two
     filters you need.
   - Rung 2: the arguments are `distance` (its range syntax `..15` means "up to
     15") and — if you want cows but not dropped items and floating arrows —
     `type`. Combine arguments with commas inside one set of brackets.
9. **A message on every reload.** Goal: the pack announces itself — a line in
   chat every time the pack loads, including every `/reload`. This is the first
   hook: the `load` tag. Get the tag's folder path and file shape from the wiki
   (Tag page / Data pack page — note it lives under the `minecraft` namespace
   *inside the learner's own pack*, which is the interesting part), point it at
   a small function, `/reload`, and see the announcement. From now on every
   `/reload` proves the pack is alive — a heartbeat the learner built.
   - Rung 1: a tag file is JSON with a single `values` list naming functions by
     their full `namespace:name` id. The wiki shows the shape; you've typed
     harder JSON than this already.
   - Rung 2: it goes under `data/minecraft/tags/...` in *your* pack — you're
     adding an entry to one of the game's own lists. The exact tag folder name
     for your version is on the same wiki page. The file for the load hook is
     `load.json`.
10. **The main build — pick one.** Both are respectable; pick the one your world
    wants. (Doing both is allowed.)
    - **(A) A landmark that never sleeps.** A visible, permanent effect at a
      spot you choose — a column of particles marking spawn, the town square, a
      grave. Mechanism: a function with a `particle` command at fixed
      coordinates, hooked to the `tick` tag. Keep the particle count small — the
      number twenty is doing multiplication behind your back, and break-it will
      show you what happens when you forget that.
      - Rung 1: `tick.json` works exactly like `load.json` — same folder, same
        shape, different file name. The particle command's syntax (which
        particle, where, how many) is on its wiki page; fixed coordinates
        sidestep the "where is the server standing" question entirely.
      - Rung 2: start with a handful of particles and `/reload`; you can tune
        upward. If nothing appears, check the coordinates are somewhere you can
        actually see, and check `tick.json` names your function's full id.
    - **(B) A door anyone can open.** A gathering point any player can teleport
      to by typing one command — no op required. This is what `/trigger` exists
      for: the one door in the permission wall that ordinary players may use,
      but only when an operator has built something behind it.
      - Rung 1: the machinery has three parts: an *objective* (a named counter
        with the special `trigger` criterion) that players are allowed to bump;
        a *tick function* that watches for anyone whose counter was bumped,
        teleports them, and resets the counter; and re-*enabling*, because a
        trigger locks after each use. The **/trigger** page on minecraft.wiki
        lays out this exact pattern — read it before writing anything.
      - Rung 2: the commands involved are `scoreboard objectives add`,
        `scoreboard players enable`, `scoreboard players reset`, `tp`, and — to
        say "players whose counter was bumped" — a selector with a `scores=`
        argument. The enable and the watching happen every tick; the objective
        is created once, by hand.
      - Rung 3: selector shape for "bumped": `@a[scores={<objective>=1..}]`. If
        `/execute as` appears in wiki examples, that's the command that makes a
        line run "as" each selected player — its page explains the two words
        that matter, `as` and `at`.
11. **Show it off.** Whatever you built, get at least one other person (or a
    second device) into the world to see the whole pack working with your hands
    off the keyboard: an impossible item crafted at the table, the landmark
    burning on its own, or a friend typing `/trigger` and arriving at the
    gathering point. The server is doing this, on your instructions, unattended.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Remove one comma.** Delete a single comma from the recipe JSON, save,
  `/reload`. The game gives little away — so find where the server filed its
  complaint: the console, and `logs/latest.log`. Read the whole report; notice it
  names the file and points at the trouble spot. Restore the comma, `/reload`,
  confirm recovery. Teaches: malformed files fail *loudly* — the error is always
  written down somewhere, and the log is where servers keep their complaints.
- **Rename one folder wrong.** Rename the recipe folder to something slightly off
  (an added `s`, a typo), `/reload`. Now the trap: `/datapack list` still shows
  the pack loaded and enabled — but the recipe is gone from the game. No error
  anywhere. Teaches the sharpest lesson of the day: **loaded is not correct.**
  The server takes what it recognizes and silently ignores what it doesn't; a
  file in an unrecognized location isn't broken, it's *invisible*. Rename back,
  `/reload`, re-verify at the table.
- **The twenty-times tax.** Take a tick-hooked function (build A, or hook a
  scratch function to `tick` just for this) and make it expensive on purpose:
  crank the particle count to something absurd — tens of thousands. `/reload`.
  Feel the world respond: watch the game stutter, then go read the console, which
  has opinions when the server can't keep up — find them. Then undo (shrink the
  number or remove the tag entry), `/reload`, and feel it recover. Teaches: the
  tick budget is real, one twentieth of a second, and *you* can spend past it
  from a text file. Every automation from here on lives inside that budget.
- **Poison the middle line.** In the starter-kit function, insert a deliberately
  broken line (a misspelled command, a `give` for an item that doesn't exist)
  *between* two working lines. Run the function. The prediction from the start
  gets settled here: did the lines after the poison run or not? Check the
  evidence (did the second item arrive?), then check where the failure was
  reported — console, log. Remove the line, run again. Teaches: how this
  particular system handles partial failure — measured, not assumed — and that
  "the file ran" and "every line worked" are different claims, the
  function-shaped cousin of "loaded is not correct."

### What just happened — the explanation

The contract: nowhere in the pack is a list saying "here are my recipes" or "here
are my functions." The server walks the folder tree and the *location* of each
file declares what it is. The folder layout is a contract — the server publishes
the shape it expects (that's what the wiki page documents), and anything matching
the shape gets picked up. That's why the wrong folder name failed silently: the
file stopped matching the contract, so it stopped meaning anything. Programmers
would call this an interface or an API contract; the point survives without the
vocabulary — *where a file sits is part of what it says*.

The pair: the recipe file contains no instructions — just a description of a fact
(these ingredients, this shape, that result), with the game's machinery doing
everything else. Describing *what should be true* and letting the system work out
*how* is the declarative style. The function files are the opposite: written-out
steps, one action per line — the imperative style, and specifically the console
language the learner already speaks, written down instead of typed. That's the
whole trick of the functions half, and it's enormous: written-down commands can be
replayed without you. The tags are the server offering its own clock and lifecycle
as hooks, and from the moment `/reload` returned, the server was executing the
learner's instructions unattended. The learner automated themselves out of a job —
most of programming is exactly that feeling, scaled up.

Selectors deserve their own sentence: `@e[type=minecraft:zombie,distance=..20]`
never names a single zombie — it *describes a set*, and the server finds the
members at the moment the line runs. Saying which things, and letting the machine
find them, is a filter language, and filter languages run a very large share of
the world's software; the bracket syntax will look familiar the day the module
reaches databases.

JSON joins `key=value` as the second shape settings come in — nested,
punctuation-strict, and everywhere. It will be back.

Worth saying plainly, since this lesson is the peak of what datapacks alone will
do in this module: functions react to the clock and to `/trigger` — but they can't
read a sentence typed in chat, can't remember yesterday, can't ask the internet
anything. The world's rules are now the learner's; a *participant* in the world —
something that watches, answers, and acts — takes a different kind of tool, and
it's coming.

### Go further — open questions

- Your namespace sat next to one named `minecraft` in the wiki's examples. What
  happens if a datapack puts a file at the same path as one of the game's own
  recipes — could you *replace* how sticks are made, or delete a vanilla recipe
  outright? Find out.
- Recipes and functions are two registry folders among many in the tree. Look at
  what else the **Data pack** page lists — loot tables, for one. Could a zombie
  drop diamonds? What would that take?
- The pack is just a folder. Could a friend drop a copy into *their* world and
  get your recipe and your functions? What exactly would you have to send them,
  and what might be different on their end?
- Could your pack hand a book of house rules to every player who *joins* the
  server? First problem: does anything in a datapack even fire "when a player
  joins"? Research it — what you find (and don't find) is genuinely instructive.
- Ask the wiki what `/schedule` does. What does that give you that `tick`
  doesn't — and what's still missing versus a real alarm clock?
- Write down three things you *wish* your pack could do but suspect it can't. For
  each: is it truly impossible, or just hard? The wiki and the datapack community
  will settle some of these; keep the list — the unsettled ones are a preview of
  the rest of this module. People have built entire games — bosses, minigames,
  new mechanics — as datapacks alone; find one, install it in a throwaway world,
  and read its function files. How far can this medium be pushed by someone
  stubborn enough?

## Delivery notes

- Merged from the former `first-datapack` and `datapack-functions` lessons. The
  declarative-vs-imperative contrast (recipe describes, function instructs) and
  the wiki-as-source-for-current-format discipline are the merged lesson's spine.
- **guided:** the wiki-first structure step is the heart of the recipe half — the
  delivery must *not* print the folder tree or the pack_format number as fact;
  everything structural is fetched by the learner from the Data pack page for
  their version. The completion template is shown with blanks and an explicit
  "wiki wins over this template" instruction.
- Scaffolding shifts mid-lesson: worked answer allowed for the recipe (first
  JSON); the functions half stops at rung 3 and cites the skeleton, JSON, and
  `/reload` as established earlier in the session rather than re-teaching.
- Do not spoil: either recipe break-it outcome (where the error appears; the
  silence of the misplaced folder), the mid-function failure behavior, the
  console's falling-behind complaints, or whether join-detection exists (go
  further).
- Do not assert the function/tag folder names — wiki-for-your-version drill, same
  as the recipe folder, and say explicitly that it's the same drill.
- The uncraftable-item check must stay, even if it feels like overhead — it's the
  volatile-fact discipline made visible, and it protects the lesson from Mojang
  adding recipes.
- Everything typed by hand; state it plainly at orientation. No copy-paste of
  recipe JSON or function lines.
- The number 20 (ticks per second) is given plainly — it's orientation, and the
  break-it depends on the learner holding it.
- SQL is never mentioned in learner text; "filter language" only. The data arc
  collects the foreshadow.
- Build B is meaningfully harder than build A; the delivery presents them as
  equal choices with honest labels (B has more moving parts), never as a ranking.
- Tone risk: JSON punctuation pedantry can read as scolding — keep it
  matter-of-fact (computers don't guess; the comma is information).
