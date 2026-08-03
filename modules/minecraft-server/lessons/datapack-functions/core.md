# Teaching the server new tricks

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** datapack-functions
- **Part:** Part 1 — The server is yours to change
- **Scaffolding:** level 2 — second datapack lesson. Goals plus hints; concepts named
  but not applied; ladders stop at rung 3 (no worked answers). The learner already
  knows the pack skeleton, JSON, `/reload`, and the wiki-first habit — deliveries
  must not re-teach those, only cite them.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

The learner writes `.mcfunction` files — named lists of console commands the server
runs as one unit — and wires them to run automatically via the load and tick hooks.
Along the way they learn target selectors as a tiny filter language. Main build is
the learner's choice: an always-on visible effect in the world (tick), or a
`/trigger`-powered teleport that *any* player can use without op. Payoff: something
happens in the world automatically, on schedule or on player demand, visible to
everyone online, with nobody at the keyboard.

The lesson under the lesson: the console language the learner already speaks is
scriptable — write the lines down once, and the server replays them forever. This is
the first time the learner automates themselves out of a job, which is most of what
programming is.

## Prerequisites

- You've built and loaded a datapack and can apply changes with `/reload` —
  established by `lessons/first-datapack/`
- You can run console commands and are an operator in your own game — established by
  `lessons/console-commands/`

## Establishes

- A datapack containing hand-written functions, at least one of which runs
  automatically (tick or load) or on player demand (`/trigger`)
- The learner can use target selectors with arguments to aim commands at filtered
  sets of players/entities
- Has felt the cost of a 20-times-per-second hook and knows the tick budget is real
- Cited by other cores as: "you've written server functions that run automatically —
  established by `lessons/datapack-functions/`."

## Facts

- A **function** is a plain text file with the extension `.mcfunction`: one console
  command per line, **no leading slashes**, lines starting with `#` are comments.
  The server runs the whole file as a unit.
- Functions live in the datapack under the learner's namespace, in the functions
  registry folder — named `function` on current versions, `functions` on older ones
  [verify][volatile as of 2026-07]. Deliveries point at the **Function (Java
  Edition)** page on minecraft.wiki (and the Data pack page's structure listing) for
  the exact name, same drill as the recipe folder.
- Run manually with `/function <namespace>:<name>` (op). The id comes from the path,
  exactly like recipes.
- **Function tags** hook functions to events. Two built-in hooks live in the
  `minecraft` namespace of the learner's own pack:
  `data/minecraft/tags/<tag folder>/tick.json` and `load.json` [verify tag folder
  name — `function` vs `functions`, changed alongside the registry folder]
  [volatile as of 2026-07 — wiki **Tag (Java Edition)** page / Data pack page].
  Content shape: `{ "values": ["<namespace>:<name>"] }`.
  - `load` runs when the pack loads: server start and every `/reload` (which makes
    it a perfect checkpoint/heartbeat).
  - `tick` runs **every game tick — 20 times per second**, forever. This number is
    the lesson's safety fact and the break-it fuel.
- Commands in a function run as *the server*, not as any player: no position/rotation
  of their own to speak of, so relative coordinates and "nearest" behave
  surprisingly. `/execute as ... at ...` re-aims a command's context. This lesson
  needs only the existence of `/execute` named plainly, pointed at its wiki page —
  not mastery [verify exact default execution position of tick functions; do not
  assert in delivery — learners observe behavior and are pointed at /execute].
- **Target selectors**: `@a` all players, `@p` nearest player, `@e` all entities,
  `@s` the executor, `@r` one at random. Square-bracket arguments filter:
  `type=`, `distance=..N`, `limit=`, `sort=`, `name=`, `tag=` — e.g.
  `@e[type=minecraft:zombie,distance=..20]`. Full argument list: the target
  selectors section of the **Target selectors** page on minecraft.wiki (read-the-
  surface material). Learner-facing name: "a filter language" — you describe *which
  ones*, the server finds them. (Author note: this is deliberately WHERE/LIMIT/ORDER
  BY without saying SQL; the data arc will collect the foreshadow.)
- `/trigger <objective>` is one of the few commands **every player can run without
  op** — that's its entire reason to exist. Standard pattern: an op creates a
  scoreboard objective with the `trigger` criterion (`scoreboard objectives add
  <name> trigger`); a player's use must be enabled (`scoreboard players enable
  <target> <name>`) and re-enabled after each use; a tick function watches for
  players whose score changed (`@a[scores={<name>=1..}]`), acts, resets, re-enables.
  The **/trigger** page on minecraft.wiki documents the pattern [verify details on
  current version].
- Whether a failed line stops the rest of a function: each line is believed to run
  independently — a mid-file error does not abort the file [verify]. Deliveries must
  not assert; the second break-it has the learner measure it.
- An expensive tick function (e.g. `particle` with large counts, 20/s) visibly lags
  the server; the console complains when the server falls behind (do not assert
  exact wording — learner reads it). Fully reversible: remove the line or the tag
  entry, `/reload`.
- `particle <type> <pos> ...` spawns visual particles; harmless, visible, and
  throttleable — ideal tick-effect material. Particle types and syntax: wiki
  **Commands/particle** page.

## Arc

### Orientation — given plainly

A function is the console language written down: same commands, one per line, no
slashes, run as a unit. Where function files go: same wiki-first drill as recipes
(the registry folder's exact name comes from the wiki for their version). The two
hooks (`load`, `tick`) explained plainly, including the number twenty and what it
implies. Selectors introduced plainly as a filter language with `@a/@p/@e` +
arguments. `/execute` and `/trigger` named as existing, pointed at their pages, not
taught line-by-line — level 2: concepts named, application withheld. Everything
typed by hand.

### Predictions to elicit

- A function file is commands without slashes. Why might the game require the slash
  in chat but reject it in these files? What is the slash actually *for*?
- If one line in the middle of a function fails, what happens to the lines after it?
  (Keep the answer; it gets measured in break-it.)
- `tick` runs your function twenty times per second. What's the most expensive thing
  you could accidentally ask for twenty times a second — and what do you think that
  does to the world?

### The work — goals and hint ladders

1. **First function, one line.** Goal: a function that makes the server say
   something, run by hand with `/function`. Find where function files live in a
   datapack — the wiki's Data pack / Function pages, for your version, same drill
   as the recipe folder — create `<something>.mcfunction` in your existing pack,
   one `say` line, `/reload`, run it.
   - Rung 1: everything about placement works exactly like the recipe did: a
     registry folder under your namespace, exact name from the wiki, id from the
     path.
   - Rung 2: if `/function` can't find it, the same three suspects as last time
     apply — wrong folder name, wrong nesting, or the file extension isn't exactly
     `.mcfunction`. `/reload` first; the tab-completion on `/function` in-game
     shows what the server actually registered, which tells you whether the problem
     is registration or spelling.
2. **The starter kit.** Goal: one function that equips every player currently online
   — a few useful items, a message greeting them — run as a single `/function`
   command while at least one other player (or a second account, or just you) is
   in. This is where selectors begin: the commands must say *who* receives, without
   naming names.
   - Rung 1: you already know `give` and `say` take a target. You've only ever used
     player names. The selector `@a` means "all players" and drops in anywhere a
     name goes.
   - Rung 2: several `give @a ...` lines plus something said — remember lines run
     in order, so decide whether the greeting lands before or after the loot.
3. **Read the surface, then aim.** Two parts. First: open the **Target selectors**
   page on minecraft.wiki and scan the *entire* list of selector arguments — not to
   learn them, to see how precisely "which ones" can be described. Rough count.
   Second, the goal: standing in your world, make every creature within about 15
   blocks of you glow — without affecting anything farther away. (The `glowing`
   effect makes outlines visible through walls; `effect give` applies it. Run it
   from in-game chat so "near" means near *you*.)
   - Rung 1: the target is "entities, but filtered." `@e` selects entities; the
     square brackets after it hold the filters; you just scrolled past the two
     filters you need.
   - Rung 2: the arguments are `distance` (its range syntax `..15` means "up to
     15") and — if you want cows but not dropped items and floating arrows —
     `type`. Combine arguments with commas inside one set of brackets.
4. **A message on every reload.** Goal: your pack announces itself — a line in chat
   every time the pack loads, including every `/reload`. This is the first hook:
   the `load` tag. Get the tag's folder path and file shape from the wiki (Tag
   page / Data pack page — note it lives under the `minecraft` namespace *inside
   your own pack*, which is the interesting part), point it at a small function,
   `/reload`, and see the announcement. From now on every `/reload` proves the
   pack is alive — a heartbeat you built.
   - Rung 1: a tag file is JSON with a single `values` list naming functions by
     their full `namespace:name` id. The wiki shows the shape; you've typed harder
     JSON than this already.
   - Rung 2: it goes under `data/minecraft/tags/...` in *your* pack — you're
     adding an entry to one of the game's own lists. The exact tag folder name for
     your version is on the same wiki page. The file for the load hook is
     `load.json`.
5. **The main build — pick one.** Both are respectable; pick the one your world
   wants. (Doing both is allowed.)
   - **(A) A landmark that never sleeps.** A visible, permanent effect at a spot
     you choose — a column of particles marking spawn, the town square, a grave.
     Mechanism: a function with a `particle` command at fixed coordinates, hooked
     to the `tick` tag. Keep the particle count small — the number twenty is doing
     multiplication behind your back, and break-it will show you what happens when
     you forget that.
     - Rung 1: `tick.json` works exactly like `load.json` — same folder, same
       shape, different file name. The particle command's syntax (which particle,
       where, how many) is on its wiki page; fixed coordinates sidestep the "where
       is the server standing" question entirely.
     - Rung 2: start with a handful of particles and `/reload`; you can tune
       upward. If nothing appears, check the coordinates are somewhere you can
       actually see, and check `tick.json` names your function's full id.
   - **(B) A door anyone can open.** A gathering point any player can teleport to
     by typing one command — no op required. This is what `/trigger` exists for:
     the one door in the permission wall that ordinary players may use, but only
     when an operator has built something behind it.
     - Rung 1: the machinery has three parts: an *objective* (a named counter with
       the special `trigger` criterion) that players are allowed to bump; a *tick
       function* that watches for anyone whose counter was bumped, teleports them,
       and resets the counter; and re-*enabling*, because a trigger locks after
       each use. The **/trigger** page on minecraft.wiki lays out this exact
       pattern — read it before writing anything.
     - Rung 2: the commands involved are `scoreboard objectives add`, `scoreboard
       players enable`, `scoreboard players reset`, `tp`, and — to say "players
       whose counter was bumped" — a selector with a `scores=` argument. The
       enable and the watching happen every tick; the objective is created once,
       by hand.
     - Rung 3: selector shape for "bumped": `@a[scores={<objective>=1..}]`. If
       `/execute as` appears in wiki examples, that's the command that makes a
       line run "as" each selected player — its page explains the two words that
       matter, `as` and `at`.
6. **Show it off.** Whatever you built, get at least one other person (or your
   second device) into the world to see it working with your hands off the
   keyboard: the landmark burning on its own, or a friend typing `/trigger` and
   arriving at the gathering point. The server is doing this, on your
   instructions, unattended.

### Break it on purpose — failures to cause, undo, and read

- **The twenty-times tax.** Take a tick-hooked function (build A, or hook a scratch
  function to `tick` just for this) and make it expensive on purpose: crank the
  particle count to something absurd — tens of thousands. `/reload`. Feel the world
  respond: watch the game stutter, then go read the console, which has opinions
  when the server can't keep up — find them. Then undo (shrink the number or remove
  the tag entry), `/reload`, and feel it recover. Teaches: the tick budget is
  real, one twentieth of a second, and *you* can spend past it from a text file.
  Every automation from here on lives inside that budget.
- **Poison the middle line.** In your starter-kit function, insert a deliberately
  broken line (a misspelled command, a `give` for an item that doesn't exist)
  *between* two working lines. Run the function. The prediction you wrote at the
  start gets settled here: did the lines after the poison run or not? Check the
  evidence (did the second item arrive?), then check where the failure was reported
  — console, log. Remove the line, run again. Teaches: how this particular system
  handles partial failure — measured, not assumed — and that "the file ran" and
  "every line worked" are different claims, the function-shaped cousin of "loaded
  is not correct."

### What just happened — the explanation

Every line in those files is a sentence in the console language from the console
lesson — the same strings, written down instead of typed. That's the whole trick,
and it's enormous: written-down commands can be replayed without you. The tags are
the server offering its own clock and its own lifecycle as hooks — "run this when I
load," "run this twenty times a second" — and from the moment `/reload` returned,
the server was executing your instructions unattended. You automated yourself out of
a job today. Most of programming is exactly that feeling, scaled up.

Selectors deserve their own sentence: `@e[type=minecraft:zombie,distance=..20]`
never names a single zombie — it *describes a set*, and the server finds the members
at the moment the line runs. Saying which things, and letting the machine find them,
is a filter language, and filter languages run a very large share of the world's
software; the shape of that bracket syntax will look familiar the day the module
reaches databases.

Worth saying plainly, since this lesson is the peak of what datapacks alone will do
in this module: functions react to the clock and to `/trigger` — but they can't
read a sentence typed in chat, can't remember yesterday, can't ask the internet
anything. The world's rules are now yours; a *participant* in the world — something
that watches, answers, and acts — takes a different kind of tool, and it's coming.

### Go further — open questions

- Could your pack hand a book of house rules to every player who *joins* the
  server? First problem: does anything in a datapack even fire "when a player
  joins"? Research it — what you find (and don't find) is genuinely instructive.
- Ask the wiki what `/schedule` does. What does that give you that `tick` doesn't —
  and what's still missing versus a real alarm clock?
- Write down three things you *wish* your pack could do but suspect it can't.
  For each: is it truly impossible, or just hard? The wiki and the datapack
  community will settle some of these; keep the list — the unsettled ones are a
  preview of the rest of this module.
- People have built entire games — bosses, minigames, new mechanics — as datapacks
  alone. Find one, install it in a throwaway world, and read its function files.
  How far can this medium be pushed by someone stubborn enough?

## Delivery notes

- **guided:** level 2 — goals and hints, no worked answers anywhere. Do not re-teach
  the pack skeleton, JSON syntax, or `/reload`; cite them as known. Ladders stop at
  rung 3.
- Do not assert the function/tag folder names — wiki-for-your-version drill, same as
  the recipe folder, and say explicitly that it's the same drill.
- Do not spoil: the mid-function failure behavior, the console's falling-behind
  complaints, or whether join-detection exists (go further).
- The number 20 (ticks per second) is given plainly — it's orientation, and the
  break-it depends on the learner holding it.
- SQL is never mentioned in learner text; "filter language" only. The data arc
  collects the foreshadow.
- Build B is meaningfully harder than build A; the delivery presents them as equal
  choices with honest labels (B has more moving parts), never as a ranking.
