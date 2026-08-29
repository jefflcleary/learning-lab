# Copying and backing up worlds

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** worlds-and-backups
- **Part:** Part 3 — Infrastructure
- **Scaffolding:** mixed by half. Level 1 for the file-wrangling (first deliberate
  copying of folders with intent) and for the backup script (the first shell script
  the learner has ever written — completion-problem style, rung 4 permitted). Level 2
  for the hot-backup half (second exercise of both shell scripting and live console
  commands: goals plus hints, concepts named not applied, no rung 4).
- **Deliveries:** guided only (nothing setup-heavy; no reference audience)
- **Status:** ready
- **Merged from:** the former `worlds-and-copies`, `backups`, and
  `backups-without-stopping` lessons (2026-08).

## Goal and payoff

One arc from "the world is a mysterious thing inside the server" to "the world is
protected by scripts I wrote, without kicking anyone off."

Three movements. First, dissolve "the world" into what it is — a folder — by copying
it, switching the server between original and copy, wrecking the copy on purpose,
and generating a new world from a name that doesn't exist. Second, turn the copy
command into the learner's first shell script, producing dated cold backups, and
perform the **restore drill** — deliberately wreck the world, restore it, prove the
wreckage never happened; a backup nobody has restored is a hope, not a backup.
Third, run the copy-a-moving-world gamble, see that the result is unknowable, and
learn the server's own answer: `save-off` → `save-all flush` → copy → `save-on` —
backups while everyone keeps playing — ending at the honest limit that a shell
script cannot type into the console (the gap `lessons/python-logs-and-rcon/`
closes).

Payoff visible to others: switchable worlds, one dramatically destroyed on demand;
everyone's builds protected by a script the learner wrote; backups that no longer
cost anyone their evening.

This is the file-level mechanism under the production/development idea from
`lessons/choosing-a-version/`: the sandbox was a second *server*; this is a second
*world*, one `cp` away.

## Prerequisites

- A server you can start and stop — established by `lessons/running-your-own-server/`
- Terminal basics: knowing where you are (`pwd`), looking around (`ls`), moving
  (`cd`) — established by `modules/dev-machine/lessons/dev-machine-setup/`
- You've changed server settings, know the restart-to-apply rule, and can type
  live commands into the console and read what they answer — established by
  `lessons/server-settings-and-console/`

(Motivation framing, not a prerequisite: backups are a chore when the world is
yours alone and protection the moment other people have built things in it. Phrase
conditionally — no assumed household or journey position.)

## Establishes

- `world-experiments`: a full copy of the world, next to the original, that the
  server can be switched to — expendable by declaration
- The copy-first reflex: destructive experiments happen on copies, never on the
  only copy of anything (wreckage included)
- The learner has switched the server between worlds via `level-name` and generated
  a fresh world from a nonexistent name
- `backup.sh` in the server folder: the learner's first shell script, executable,
  producing `~/backups/world-<date>` on each run; at least one dated backup exists
- A restore performed personally: world destroyed, restored, destruction proven
  never-to-have-happened
- The hot-backup procedure, performed by hand at the console: save-off →
  save-all flush → wait for confirmation → copy → save-on; and `hot-backup.sh`,
  which automates the copy half and walks the human through the console half —
  the script-has-no-hands gap stated and owned
- Cited by other cores as: "worlds are folders you can copy, an experiments world
  the server can be switched to, the copy-first habit, a backup script and a
  restore you've actually performed, and the save-off/save-on hot-backup
  procedure — established by `lessons/worlds-and-backups/`."

## Facts

### Worlds and copies

- The world is the `world/` folder in the server folder. Everything in the game is
  bytes in it:
  - `level.dat` — the world's master record: spawn point, world time, rules, and the
    game version that last saved it
  - `region/` — the terrain itself, in chunky files with the `.mca` extension
  - `playerdata/` — one file per player who has ever joined: inventory, position,
    health. Files are named by player ID (a UUID), not by player name.
  - plus others (`entities/`, `advancements/`, `stats/`, …) — worth seeing, not
    worth cataloguing here
- `level-name` in `server.properties` is the name of the folder the server opens as
  its world, relative to the server folder. Default: `world`. Read at startup
  (restart-to-apply, from `lessons/server-settings-and-console/`).
- If `level-name` names a folder that doesn't exist, the server creates it and
  generates a new world in it on startup. Not an error — this is how the first
  world appeared.
- `cp <from> <to>` copies a file. Bare `cp` on a directory refuses, with an error
  saying the source is a directory and was not copied (shape varies slightly —
  deliveries describe, don't quote). `cp -R` is the recursive form: the folder, the
  folders inside it, all the way down.
- The server must be **stopped** when copying a world you intend to trust. While
  running it writes world files continually (autosaves). The gamble step measures
  what copying a live world gets you; the hot-backup half is the technique that
  lifts the rule.
- `du -sh <folder>` prints a folder's total size, human-readable.
- While a server has a world open, a `session.lock` file sits inside it (recovery
  fact from `lessons/running-your-own-server/`; here just a thing the learner may
  notice in listings).
- Never delete the folder `level-name` currently points at. Check the setting before
  deleting any world folder — habit stated plainly wherever deletion comes up.
- [macos] Singleplayer worlds live at `~/Library/Application Support/minecraft/saves/`,
  one folder per world [verify path against a current install]. The format is the
  same family as a server world folder: copying a singleplayer save into the server
  folder and pointing `level-name` at it produces a working server world on a
  vanilla server [verify — dimension subfolders match on vanilla; modified servers
  differ]. Deliveries phrase this as "look there and check" rather than asserting.
- [macos] `~/Library` is hidden in Finder. Reveal: Finder → Go menu → hold Option and
  Library appears, or Go to Folder (cmd-shift-G) and type the path.
- `level.dat` records the data version that last saved the world. A newer server
  opening an older world **upgrades** it on load. Mojang ships no downgrade path —
  upgrading is one-way by design. Third-party tools claiming to downgrade worlds
  exist [volatile as of 2026-07 — never asserted in deliveries; the go-further has
  the learner investigate on a copy].
- [windows] singleplayer saves live under `%APPDATA%\.minecraft\saves` (for a future
  windows delivery) [verify].

### Backups and the script

- A **backup** is a dated copy in a different place, made to be left alone. The
  distinction against `world-experiments`: a copy *for use* gets played in and
  diverges; a backup *for disaster* is never touched again except to restore.
- A **shell script** is a plain text file of commands, run top to bottom by the
  shell — the same commands typed at a prompt, saved.
- `#!/bin/bash` — the script's first line; tells the operating system which program
  should read and run the rest of the file (here: bash). The `#!` pair is called a
  **shebang**. bash is a shell — same job as the zsh in the terminal [macos default
  shell is zsh], a slightly different dialect; bash is the one scripts
  conventionally declare, and everything in this module's scripts runs the same in
  both.
- `date` prints the current date and time. `date +%Y-%m-%d` prints just the date
  as e.g. `2026-07-31` — the `+…` part is a format: `%Y` year, `%m` month, `%d` day.
- `$(command)` — **command substitution**: the shell runs the inner command first
  and pastes its output into the surrounding line, then runs the line. Explained at
  the friction moment (getting today's date into a folder name without typing it).
- `mkdir -p <path>` — create the folder, creating parents as needed, no complaint
  if it already exists (plain `mkdir` errors on an existing folder).
- `chmod +x <file>` — mark a file executable. Without it, `./backup.sh` is refused
  with a permission error.
- `./backup.sh` — run a script in the current folder. The `./` is required because
  the shell only searches its PATH folders for bare command names (PATH named in
  `modules/dev-machine/lessons/dev-machine-setup/`); `./` says "this one, right here."
- A script runs relative to the **runner's current directory**, not the script's
  own location. `cp -R world …` inside the script works only when run from the
  server folder. (A break-it measures this.)
- `mv <from> <to>` — move/rename. Used in the restore to set the wrecked world
  aside rather than delete it (copy-first reflex applies to wreckage too).
- `echo <text>` — print text; used for the script's progress lines.
- Backup destination: `~/backups/` — outside the server folder. Minimum: a
  different folder. Better: a different disk or machine (go further).
- Restore procedure: stop server → `mv world world-wrecked` (aside, not deleted) →
  `cp -R ~/backups/world-<date> world` → start. **Restore by copying** — the backup
  itself is never moved or touched; a backup consumed by its own restore protects
  nothing next time.
- Wrong-name restore behavior: if nothing sits at the name `level-name` points to,
  the server generates a fresh world there (established earlier in this same
  lesson). Nothing is lost when this happens — the break-it exercises reading that
  situation calmly.
- `cp -R world <dest>` when `<dest>` already exists copies `world` *into* it,
  producing `<dest>/world` nesting — the reason a same-day second run does
  something surprising (left as a go-further observation; do not spoil).
- Cloud-synced folders are fine for `~/backups/` — a finished backup is written
  once and never again — and never for the live server folder (rule from
  `lessons/running-your-own-server/`; the difference is whether anything is
  writing).

### Hot backups

- The problem, honestly: stopping the server for every backup disconnects everyone
  every time; copying a live world risks a torn copy — the learner *measures* that
  uncertainty in the gamble step of this same lesson.
- The server's save-control commands [verify all three names, arguments, and
  confirmation-line wording against the minecraft.wiki Commands pages — deliveries
  have the learner confirm from the wiki, never assert]:
  - `save-off` — the server stops writing world files to disk (automatic saving
    disabled). The world keeps running normally — in memory. Prints a confirmation
    line [verify wording; historically along the lines of "Automatic saving is now
    disabled"].
  - `save-all flush` — everything held in memory is forced to disk now; the `flush`
    variant waits until all pending writes are complete before reporting done
    [verify flush semantics]. Prints a confirmation line when finished [verify
    wording; historically "Saved the game"].
  - `save-on` — automatic saving resumes [verify wording of confirmation].
- The procedure, order load-bearing: `save-off` → `save-all flush` → **wait for the
  confirmation line** → copy the world → `save-on`. Nothing may be writing while
  the copy reads; save-off stops *new* writes, flush completes *pending* ones. Only
  after both is the disk a single consistent instant.
- Nobody is disconnected at any point; players notice nothing [worth having the
  learner verify by asking whoever is online].
- The server also autosaves on its own rhythm when saving is on — interval
  discoverable (go further).
- Evidence trick: file modification times in `world/region/` (visible with
  `ls -l world/region`) stop advancing while saving is off, and move again after
  save-on + a save. `ls -l` = the long listing, which shows sizes and modification
  times (given plainly; first deliberate use of it in this module).
- A shell script cannot type into the server console: the console reads keystrokes
  from its own terminal; a script is a separate program in a separate terminal.
  `echo save-off` in a script prints the words to the script's own output — the
  server never hears them.
- The gap is real and closable: **RCON** — a protocol the server offers that lets
  other programs send console commands over the network. `enable-rcon` sits in
  `server.properties` (the learner read past it once). Closing the gap is
  `lessons/python-logs-and-rcon/`; nothing is enabled in this lesson.
- `read` — a bash builtin that pauses a script until the human presses return.
  Named as a concept for the script extension; level 2, so usage is looked up by
  the learner (`help read` in bash, or any reference).
- Hot copies restore exactly like cold ones; the verification step restores the hot
  copy into the experiments slot (`level-name`, expendable by declaration) and
  joins it.
- Forgetting `save-on` has no time limit: saving stays off until someone turns it
  back on [verify: no reminder is believed to exist — deliveries phrase as "find
  out whether it warns you"].

## Arc

### Orientation — given plainly

The word "world" names a folder. Every build, every chest, every player's position
is a file in `world/` — the server is an ordinary program reading and writing
ordinary files, which the learner half-knows from `running-your-own-server` and now
proves by handling the files directly. `cp` and `-R` introduced (the `-R` at the
friction moment — bare `cp` refuses first); `du -sh` given for measuring; `man`
introduced here as where a command's real documentation lives. The stopped-server
rule stated plainly up front with its reason (the server writes while it runs);
the gamble step measures the consequence of ignoring it, and the hot-backup half is
the technique that lifts the rule. `level-name` is recalled, not introduced.

The backup half's stakes, honestly and conditionally: while a world is one
person's alone, losing it would sting; the moment other people have built things in
it, the machine it lives on is one power cut, one failed disk, one careless command
away from taking all of it. A backup is the difference between a disaster and an
anecdote. Two distinctions given plainly: copy-for-use vs backup-for-disaster
(dated, elsewhere, untouched); and typed-commands vs a script — by then the learner
has typed `cp -R world …` more than once, and a script is those keystrokes saved
into a file, which cannot misremember. Shebang, chmod, `./`, and `date` are all
orientation; the only things withheld are the two blanks in the script.

The hot half's technique, named plainly: the server takes commands that control its
own saving — stop writing, finish everything pending, hold still while the photo is
taken, resume. The three commands are named in orientation, but their exact
behavior and confirmation lines are the wiki's to state — the first hot-half work
item is confirming them at the source (point-don't-assert practice).

### Predictions to elicit

- How big is the whole world — the folder, in megabytes? An actual number before
  measuring.
- After copying the world and joining the copy: where will your player be standing?
  At spawn? Where you last logged out? Somewhere else?
- If this computer died right now, permanently: what exists in the world folder and
  nowhere else on earth? Whose builds are on that list besides yours?
- The backup script will contain the same copy command typed by hand. What can a
  saved file of commands do that your hands can't?
- While saving is off, players keep playing normally. Where do their actions live
  during that window? What would a power cut in that window cost?
- Will the players online notice *anything* during save-off → copy → save-on?

(The what-happens-at-a-nonexistent-`level-name` prediction is elicited inline just
before that step rather than in the Predict section; the save-all vs save-all-flush
question is folded into the confirm-at-the-wiki work item.)

### The work — goals and hint ladders

**Movement one: worlds are folders.** (Level 1.)

1. **Look inside the world.** Server stopped. `ls world/` (or the VS Code sidebar).
   Before being told: guess from the names what each thing holds. Then the map,
   given plainly: `level.dat` the master record, `region/` the terrain,
   `playerdata/` one file per player ever joined — inventory and position, filed by
   player ID rather than name. Measure with `du -sh world` and check the size
   prediction. The point to land: the plaza, the chests, the half-finished builds —
   all of it is *these files*.
2. **Copy the world.** Goal: an exact copy named `world-experiments` next to the
   original. Instruct the learner to try `cp world world-experiments` first and
   read what comes back — the refusal names the problem. Then `-R` explained at the
   friction: recursive — the folder and every folder inside it, all the way down;
   `cp -R world world-experiments`. Verify: `ls` shows both; `du -sh` on each shows
   twins.
3. **Switch the server to the copy.** Goal: make the server open
   `world-experiments` instead of `world`, and prove it.
   - Rung 1: you once read every line of `server.properties` and sorted the keys
     into lists. One key answers "which world does this server open?" Skim your
     lists' left-hand sides.
   - Rung 2: `level-name`. Its value is a folder name, looked up in the server
     folder. Point it at the copy.
   - Rung 3: if you edited it and nothing changed, remember when the server reads
     this file. Restart.
   Proof of twinhood: join — standing exactly where you last logged out, same
   builds, same chest contents, because position and inventory are files and the
   files were copied. Then the ceremony: **do something to this world you would
   never do at home.** Lava across the plaza. A crater where the front door was.
   This is for science — establishing what a copy is. Look at the destruction. Stop
   the server.
4. **Switch back and prove the original never felt it.** `level-name=world`,
   restart, join. Untouched. The destruction still exists — as bytes in the other
   folder, and nowhere else in the universe. Two complete realities, one setting
   choosing between them.
5. **A world from nothing.** Elicit the prediction inline first (refuse to start?
   fall back to `world`? something else?). Set `level-name` to a folder that
   doesn't exist (`world-fresh` or any name). Start, and read the log — the same
   world-generation story as the very first run. Join a world no one has ever stood
   in. Check the listing: the folder now exists, created by the server. Then set
   `level-name` back to `world`.

**Movement two: cold backups and the restore drill.** (Level 1; first-ever shell
script; transition = the copy-for-use vs copy-for-disaster distinction and the
stakes.)

6. **One backup by hand.** Server stopped. `mkdir -p ~/backups`, then
   `cp -R world ~/backups/world-<today's date, typed by hand as YYYY-MM-DD>`.
   Verify with `ls ~/backups`. Then name the flaw out loud: a human typed that
   date. Tomorrow the human mistypes it, or skips the backup because it's a chore.
   Chores that must happen every time are what machines are for.
7. **Teach the machine the date.** Run `date`, then `date +%Y-%m-%d`. Given
   plainly: the `+` part is a format — `%Y` year, `%m` month, `%d` day. The
   question the script hangs on: how do you use one command's *output* inside
   another command?
8. **Write `backup.sh` — the completion problem.** In VS Code, in the server
   folder, a new file `backup.sh` containing the structure with two blanks
   (exactly two — more turns first contact with scripting into a quiz):

   ```bash
   #!/bin/bash

   mkdir -p ~/backups
   cp -R ______ ~/backups/world-______
   echo "Backup finished. Contents of ~/backups:"
   ls ~/backups
   ```

   Shebang explained plainly. The blanks: (a) what to copy, (b) how today's date
   gets into the destination without a human typing it.
   - Rung 1: the first blank is whatever you typed in the by-hand version — the
     script runs from the same folder you did. The second: you have a command that
     *prints* today's date; how can a command's output appear inside another
     command's line?
   - Rung 2: command substitution: `$(some command)` runs the inner command first
     and pastes its output into the line, then the line runs.
   - Rung 3: the second blank is `$(date +%Y-%m-%d)`.
   - Rung 4 (first script ever — comparison after theirs works, or rescue):

     ```bash
     #!/bin/bash

     mkdir -p ~/backups
     cp -R world ~/backups/world-$(date +%Y-%m-%d)
     echo "Backup finished. Contents of ~/backups:"
     ls ~/backups
     ```

9. **Make it runnable.** Try `./backup.sh` → permission denied → `chmod +x
   backup.sh` → run again (server stopped). `./` explained at the friction: the
   shell searches only PATH folders for bare names; `./` means "this folder, this
   file." Verify: today's dated folder in `~/backups`, `du -sh` twin of `world`.
10. **The restore drill — the centerpiece.** Framing stated plainly: **a backup
    nobody has restored is a hope, not a backup.** The drill: destroy the world,
    then prove the destruction never happened.
    - Run the script; confirm today's backup exists (`ls ~/backups`, look inside).
    - Start the server, join, and wreck the world — visibly, painfully. Your own
      things, not anyone else's — the drill needs a loss *you* feel. The honest
      word on which world: doing this to the real world after a fresh backup is
      the braver and better lesson — the drill only proves something if the world
      you resurrect is one you'd mourn. If that's more than today can carry, run
      it on `world-experiments`; the mechanics are identical. The call is the
      learner's — never a dare.
    - Stop the server. Then restore. Goal: make the server open a world where the
      wreckage never happened, while keeping the wreck (copy-first applies to
      wreckage too).
      - Rung 1: the server opens whatever folder `level-name` names — currently
        `world`, which holds a smoking ruin. Two moves exist: change which folder
        the server opens, or change what sits at the name it already opens. The
        standard shape is the second.
      - Rung 2: set the ruin aside with a rename, then **copy** the backup in
        under the expected name. `mv` renames; the backup stays in `~/backups`,
        untouched.
      - Rung 3: `mv world world-wrecked`, then
        `cp -R ~/backups/world-<today> world`, then start.
    - Join. The lava never happened. The learner has moved a world backwards in
      time. Delete `world-wrecked` once satisfied (after the `level-name` glance).

**Movement three: backing up a world that won't sit still.** (Level 2. The
transition *is* the gamble.)

11. **The gamble: copy a moving world.** The bridge stated first: the backups work,
    but every one starts with `stop`, which kicks everyone off — a backup routine
    that ends the evening is a routine that quietly stops getting run. The obvious
    dodge: ignore the stopped-server rule. Run it deliberately: start the server on
    `world`, join, and from a second terminal run `cp -R world world-torn` *while
    playing* — flying, placing blocks. Stop the server and inspect: `du -sh
    world-torn` vs the original; point `level-name` at `world-torn`, start, join,
    look for anything wrong. The delivery must not promise an outcome, because
    there isn't one: the copy might be perfect, might be subtly off, might refuse
    to load — `cp` read the files while the server was writing them, and what
    landed depends on timing nobody can see or reproduce. The honest answer: **you
    can't know**, and a copy you can't trust is worthless exactly when you need
    it. Undo: `level-name` back, delete `world-torn` (after the `level-name`
    glance). Then the relief, plainly: the server itself has commands for exactly
    this problem.
12. **Confirm the tools at the source.** Goal: on the minecraft.wiki pages for the
    save commands (search the wiki for `save-off`, or find the Commands page and
    navigate), pin down all three: what each does, and what line each prints when
    it has worked. Written down — the confirmation line for `save-all flush` is
    the go signal, so its exact wording matters. Fold in the prediction: why would
    both `save-all` and `save-all flush` exist? No hints; this is the research
    skill, already established.
13. **A hot backup by hand.** Goal: with the server running and at least one
    player connected (the learner counts; a friend online makes it a real proof),
    produce a copy of the world there's reason to trust — without stopping the
    server, and with nobody disconnected. Success criteria: the flush confirmation
    line was seen *before* the copy started; `save-on` was issued after it
    finished; whoever was online reports nothing weird.
    - Rung 1: the order is the entire trick — nothing may be writing while the
      copy reads. One command stops *new* writes; one finishes *pending* ones.
      Which has to happen first, and what tells you the second is done?
    - Rung 2: `save-off`, then `save-all flush`, then wait for the exact line the
      wiki told you to expect. Then the copy is just a copy — `backup.sh` already
      does dated copies (run from a second terminal), or `cp -R` by hand. Then
      `save-on`, which is not optional; the break-it is about forgetting it.
14. **Trust, then verify.** Goal: prove the hot copy is a world, not a hope —
    restore it into the experiments slot and walk around in it. Success: joined,
    looked around, recent builds present. Then point the server back at `world`.
    - Rung 1: the experiments slot exists to be overwritten — that's its
      declaration. A restore is a copy plus a name the server opens; both moves
      are established habits from earlier today. Which folder name does the server
      need to find the hot copy under, and which setting says so?
15. **Extend the script — and find its limit.** Goal: `hot-backup.sh`, a script
    for the whole procedure. First, the discovery, framed as a prediction: could
    the script itself run `save-off`? What would `echo save-off` in a script
    actually do? (Answer to arrive at: print the words into the script's own
    output — the server console is a different program's keyboard, and the script
    has no hands.) Let the disappointment land before relieving it. The gap is
    real and closable: RCON — other programs sending console commands over the
    network; `enable-rcon` sits in `server.properties`, read past once. Closing
    it is `lessons/python-logs-and-rcon/`; nothing is enabled today. Today's
    honest version: a script that automates the copy half and walks its human
    through the console half — instructions, pause, copy, instructions. Success:
    `./hot-backup.sh` tells you what to type at the console, waits, makes the
    dated copy, tells you what to type to finish.
    - Rung 1: `backup.sh` already does the middle of the procedure. What must
      happen before its copy line, and after — and which of those can printed
      instructions plus a pause accomplish?
    - Rung 2: `echo` prints the instructions; bash has a builtin called `read`
      that pauses the script until the human presses return. How `read` is used
      is yours to look up — `help read` at a bash prompt, or any reference.

### Break it on purpose — failures to cause, undo, and read

- **Restore to the wrong name.** Repeat the restore, but "fumble" it on purpose:
  set `world` aside, then copy the backup to a typo'd name (`wolrd`, or
  `world-restored`). Start the server and join. A brand-new world — nothing
  familiar anywhere. Read the situation before touching anything, because this
  exact moment, hit by accident at midnight, reads as *everything is gone* — and
  it never is: the real world sits right there under its aside-name, the backup is
  untouched in `~/backups`, and the server did exactly what was established
  earlier today — found nothing at the name `level-name` points to, generated
  fresh. Worlds don't vanish; names miss. Fix: stop, delete the accidental fresh
  world and the typo folder, redo the copy with the right name. Teaches: the calm
  inventory — *what folders actually exist right now* (`ls`) — beats every
  panicked conclusion. Tone: everything is always recoverable; never a data-loss
  scare.
- **Run the script from the wrong folder.** `cd ~`, then `./backup.sh` — refused:
  no such file (the script lives in the server folder). Now run it by full path:
  `~/projects/mc-server/backup.sh` — it runs, and `cp` fails: no `world` here.
  Teaches: a script runs in the *runner's* current folder, not its own — the
  working-directory concept collecting another toll. Undo: nothing; the failed run
  copied nothing. `cd` back.
- **Forget save-on.** Run the hot procedure and deliberately stop before the last
  step — saving stays off. Keep playing: build a pillar, dig a hole, note the
  time. Evidence hunt: `ls -l world/region` — the modification times have stopped
  moving; the diary has stopped being written. Then the reasoning exercise
  (hypothetical only — nobody yanks a power cord; no phrasing may invite
  force-killing the server): if the machine lost power right now, what exists on
  disk? The world as of the flush; the pillar and the hole live in memory and
  nowhere else. No time limit — saving stays off until someone turns it back on;
  find out whether the server ever reminds you [verify: no reminder is believed
  to exist — phrase as "find out whether it warns you"]. Undo: `save-on`, then a
  `save-all` for good measure, then watch the timestamps move again. Teaches:
  some steps come in pairs, and a procedure is a promise that the last step
  happens — why the script walks through *all* the steps, and why real automation
  (`lessons/python-logs-and-rcon/`) is safer than memory.

### What just happened — the explanation

Three layers, told as one story.

**The world is files.** "The world" dissolved into a folder, and the server into a
program that opens whichever folder it's told to. Nothing about the world is
special to the machine — files can be copied, renamed, parked, swapped, kept in
triplicate. Consequence bigger than Minecraft: **experiments on copies are free.**
The production/development idea from `choosing-a-version` now has its mechanism —
a copy costs one command and some disk. And the true story, told generically:
somewhere, someone's singleplayer world became the world of a real multiplayer
server by exactly this move — save folder copied in, `level-name` pointed at it.
Singleplayer saves live in the game's own folder ([macos] under
`~/Library/Application Support/minecraft/saves/` — delivery: go look rather than
trust). The wall between "my little world" and "a real server's world" was never
there.

**Backups move time backwards.** The restore is the lesson: a past state of the
world was parked where nothing could touch it. Why **dated** and **multiple**:
disasters are discovered late — corruption that happened Tuesday and got noticed
Thursday needs Monday's backup, and a single backup taken after the disaster is a
corrupted backup of a corrupted world. Why **elsewhere**: a backup in the server
folder dies with the server folder; different folder is the minimum, different
machine the real answer — and cloud-synced folders are fine *for backups* because
a finished backup is never written again (the never-sync-the-live-folder rule from
`lessons/running-your-own-server/` was always about sync fighting a program
mid-write). And the script: the learner's first time telling the shell a
*procedure* instead of performing one. Anything typed can be saved; anything saved
runs the same every time — eventually with no human present at all (a later
lesson; today's script is the one that grows into it).

**Consistency.** The word for the gamble's problem. A copy of files being written
is a photo of a moving subject — parts of the image from different instants; the
whole may not describe any moment that ever existed. `save-off` plus `save-all
flush` asks the subject to hold still: stop new writes, complete pending ones —
after both, the disk is a single instant, and stays one until `save-on`. The world
never paused because the server runs the live world from memory and treats the
disk as its diary (memory-vs-disk split first met in
`lessons/server-settings-and-console/`) — saving off stops the diary, not the
world. The reach: every database on earth — banks, games, hospitals — has this
exact problem and some version of this exact answer: pause writes, flush,
snapshot, resume. The words out there: *consistent snapshot*. The learner has now
taken one by hand.

### Go further — open questions

- Move a singleplayer world onto the server. **Copy** it in — never move the only
  copy — and point `level-name` at it. What survives the trip? Inventory?
  Position? Pets?
- The version question, and nobody knows the answer: `level.dat` records which
  game version last saved the world, and a newer server *upgrades* an older world
  when it opens it — one-way, by design; Mojang ships nothing that goes back. But
  people have built third-party things that claim to downgrade worlds. On a
  **copy**: investigate what exists and what actually happens to a world pushed
  backwards. The outcome is genuinely unknown from here — and on a copy, finding
  out costs nothing. [genuinely open]
- Open a file from `region/` in VS Code and look at it. What is that? Find out
  what format those files are — a later lesson
  (`lessons/world-data-and-protocol/`) opens them properly; no harm arriving
  early.
- Put a second copy of a backup somewhere that isn't this machine: a USB stick,
  another computer, a cloud-synced folder. Work out why the never-cloud-sync rule
  doesn't apply to `~/backups` — and what the *worst case* still is if the sync
  runs mid-copy.
- Backups get big. `tar -czf` bundles a folder into a single compressed file.
  Investigate: how much smaller does a world get, and what's the cost when you
  need it back in a hurry?
- Run the script twice on the same day and look very closely at what the second
  run created. `cp` has an opinion about copying onto something that already
  exists. How would you change the script so running it twice is always safe?
- The server saves on its own rhythm when saving is on. Find the interval — by
  evidence first (`ls -l` timestamps? the log?), then check your measurement
  against the wiki. And is there any way a player *could* detect, from inside the
  world, that saving was off?
- The Mac's filesystem (APFS) can snapshot an entire disk in effectively an
  instant. If the photo takes no time, does the subject still need to hold still?
  Investigate — the answer is subtler than it looks. [open]
- How many backups should anyone keep, and for how long? Some Minecraft worlds
  have been kept alive for over a decade across server moves, crashes, and
  version upgrades — and big public servers back up worlds thousands of times
  larger than this one, with hundreds of players online, and nobody notices. What
  do the people who do this actually do? Some of it is public — talks, blog
  posts, open-source tooling — and some genuinely isn't. Find what you can.
  [genuinely open]

## Delivery notes

- Merged from three former cores: `worlds-and-copies`, `backups`,
  `backups-without-stopping`. Their cliffhangers are now internal transitions:
  the live-copy gamble bridges the cold-backup half to the hot-backup half, and
  the script-has-no-hands gap points forward to `lessons/python-logs-and-rcon/`.
- **guided:** the gamble must not spoil an outcome — the result is unknowable in
  principle, not just unstated. Resist hedging toward "probably fine" or
  "probably corrupt."
- The destruction step (movement one) must feel ceremonial and *explicitly
  licensed*; that contrast is the emotional core — don't flatten it.
- The real-world-vs-experiments choice in the restore drill must read as honest
  reasoning and a genuinely free choice — never a dare, never a guilt-trip.
- The wrong-name break-it's tone is the whole point: calm inventory over panic.
- Do not spoil the same-day-second-run nesting behavior; go-further observation.
- Keep the completion problem's blanks exactly two.
- The hot half is level 2: do not re-explain script mechanics (shebang, chmod,
  `./`) — reference them as established earlier in the same lesson. The `read`
  builtin is named, never demonstrated.
- All three save-command names and every confirmation line are [verify] — the
  delivery routes the learner through the wiki before use and never quotes an
  output line as gospel.
- The forget-save-on crash is strictly a reasoning exercise; no phrasing may
  invite cutting power or force-killing the server.
- The "script has no hands" discovery lands as a real disappointment before the
  RCON forward-link relieves it — don't defuse it in the same sentence.
- The singleplayer-to-server story stays generic — no named person, no assumed
  household or history.
- State the check-`level-name`-before-deleting habit plainly wherever deletion of
  a world folder is mentioned.
- The backup half's stakes are phrased conditionally ("the moment other people
  have built things in it"), never as an assumed household or journey position.
