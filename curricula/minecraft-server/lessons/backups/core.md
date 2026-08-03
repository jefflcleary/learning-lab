# Protecting other people's things

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** backups
- **Part:** Part 3 — Infrastructure
- **Scaffolding:** level 1 for shell scripting — the first script the learner has
  ever written. Completion-problem style is the primary device (script structure
  shown with load-bearing parts blanked); rung 4 permitted (first lesson of a
  genuinely new skill).
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

A backup script the learner wrote — their first shell script — producing dated
copies of the world in a separate place, and, as the centerpiece, a **performed
restore**: the learner deliberately wrecks the world, restores from backup, and
proves the wreckage never happened. Payoff: everyone's builds are now protected by
a script the learner wrote, and the learner has personally resurrected a destroyed
world — which is the only thing that makes a backup real.

Motivation framing (use it): backups are a chore when the world is yours alone and
protection the moment other people have built things in it. By this point in the
recommended path, friends play on this server.

## Prerequisites

- Worlds are folders you can copy, an experiments world exists, and the copy-first
  habit — established by `lessons/worlds-and-copies/`
- Other people play on your server and have built things in it — established by
  `lessons/joining-over-lan/` (or beyond)
- A server you can start and stop — established by `lessons/running-your-own-server/`

## Leaves behind

- `backup.sh` in the server folder: the learner's first shell script, executable,
  producing `~/backups/world-<date>` on each run (server stopped)
- At least one dated backup in `~/backups/`
- A restore performed personally: world destroyed, world restored, destruction
  proven never-to-have-happened
- Cited by other cores as: "a backup script and a restore you've actually
  performed — established by `lessons/backups/`."

## Facts

- A **backup** is a dated copy in a different place, made to be left alone. The
  distinction against `world-experiments`: a copy *for use* gets played in and
  diverges; a backup *for disaster* is never touched again except to restore.
- A **shell script** is a plain text file of commands, run top to bottom by the
  shell — the same commands typed at a prompt, saved.
- `#!/bin/bash` — the first line of the script; tells the operating system which
  program should read and run the rest of the file (here: bash). The `#!` pair is
  called a **shebang**. bash is a shell — same job as the zsh in the terminal
  [macos default shell is zsh], a slightly different dialect; bash is the one
  scripts conventionally declare, and everything in this course's scripts runs
  the same in both.
- `date` prints the current date and time. `date +%Y-%m-%d` prints just the date
  as e.g. `2026-07-31` — the `+…` part is a format: `%Y` year, `%m` month, `%d`
  day.
- `$(command)` — **command substitution**: the shell runs the inner command first
  and pastes its output into the surrounding line, then runs the line. Explained
  at the friction moment (getting today's date into a folder name without typing
  it).
- `mkdir -p <path>` — create the folder, creating parents as needed, no complaint
  if it already exists (plain `mkdir` errors on an existing folder).
- `chmod +x <file>` — mark a file executable. Without it, `./backup.sh` is refused
  with a permission error.
- `./backup.sh` — run a script in the current folder. The `./` is required because
  the shell only searches its PATH folders for bare command names (PATH named in
  `lessons/dev-machine-setup/`); `./` says "this one, right here."
- A script runs relative to the **runner's current directory**, not the script's
  own location. `cp -R world …` inside the script works only when run from the
  server folder. (Second break-it measures this.)
- `mv <from> <to>` — move/rename. Used in the restore to set the wrecked world
  aside rather than delete it (copy-first reflex applies to wreckage too).
- `echo <text>` — print text; used for the script's progress line.
- Backup destination: `~/backups/` — outside the server folder. Minimum: a
  different folder. Better: a different disk or machine (go further).
- This lesson's backups are **cold backups**: server stopped, because a running
  server writes world files mid-copy (measured in `lessons/worlds-and-copies/`).
  Hot backups without kicking anyone: `lessons/backups-without-stopping/`.
- Restore procedure: stop server → `mv world world-wrecked` (aside, not deleted) →
  `cp -R ~/backups/world-<date> world` → start. **Restore by copying** — the
  backup itself is never moved or touched; a backup consumed by its own restore
  protects nothing next time.
- Wrong-name restore behavior: if nothing sits at the name `level-name` points to,
  the server generates a fresh world there (fact established in
  `lessons/worlds-and-copies/`). Nothing is lost when this happens — the break-it
  exercises reading that situation calmly.
- `cp -R world <dest>` when `<dest>` already exists copies `world` *into* it,
  producing `<dest>/world` nesting — the reason a same-day second run does
  something surprising (left as a go-further observation).
- Cloud-synced folders are fine for `~/backups/` — a finished backup is written
  once and never again — and never for the live server folder (rule from
  `lessons/running-your-own-server/`; the difference is whether anything is
  writing).

## Arc

### Orientation — given plainly

The stakes, honestly: while the world was the learner's alone, losing it would
sting; now other people's builds live in it, and the machine it lives on is one
power cut, one failed disk, one careless command away from taking all of it. A
backup is the difference between a disaster and an anecdote. Then the two
distinctions: copy-for-use vs backup-for-disaster (dated, elsewhere, untouched);
and typed-commands vs a script — the learner has now typed `cp -R world …` more
than once, and a script is those keystrokes saved into a file, which cannot
misremember. Shebang, chmod, `./`, and the date command are all orientation, given
plainly; the only things withheld are the two blanks in the script.

### Predictions to elicit

- If this computer died right now, permanently: what exists in the world folder
  and nowhere else on earth? Whose builds are on that list besides yours?
- The script will contain the same copy command you've run by hand. What can a
  saved file of commands do that your hands can't?
- The backup folder's name will contain the date. What should happen when the
  script runs twice on the same day — and what do you think `cp` will actually do?

### The work — goals and hint ladders

1. **One backup by hand.** Server stopped. `mkdir -p ~/backups`, then
   `cp -R world ~/backups/world-<today's date, typed by hand as YYYY-MM-DD>`.
   Verify with `ls ~/backups`. Then name the flaw out loud: a human typed that
   date. Tomorrow the human mistypes it, or skips the backup because it's a chore.
   Chores that must happen every time are what machines are for.
2. **Teach the machine the date.** Run `date`. Then run `date +%Y-%m-%d`. Given
   plainly: the `+` part is a format — `%Y` year, `%m` month, `%d` day. Now the
   question the script hangs on: how do you use one command's *output* inside
   another command?
3. **Write `backup.sh` — the completion problem.** In VS Code, in the server
   folder, a new file `backup.sh` containing the structure with two blanks:

   ```bash
   #!/bin/bash

   mkdir -p ~/backups
   cp -R ______ ~/backups/world-______
   echo "Backup finished. Contents of ~/backups:"
   ls ~/backups
   ```

   First line explained plainly (shebang: which program reads this file). The
   blanks: (a) what to copy, (b) how today's date gets into the destination
   without a human typing it.
   - Rung 1: the first blank is whatever you typed in the by-hand version — the
     script will run from the same folder you did. The second blank: you have a
     command that *prints* today's date; the question is how a command's output
     can appear inside another command's line.
   - Rung 2: the shell has a feature for exactly this, called command
     substitution: `$(some command)` runs the inner command first and pastes its
     output into the line, then the line runs.
   - Rung 3: the second blank is `$(date +%Y-%m-%d)`.
   - Rung 4 (first script ever — comparison after theirs works, or rescue if it
     doesn't):

     ```bash
     #!/bin/bash

     mkdir -p ~/backups
     cp -R world ~/backups/world-$(date +%Y-%m-%d)
     echo "Backup finished. Contents of ~/backups:"
     ls ~/backups
     ```

4. **Make it runnable.** Try `./backup.sh` → permission denied → `chmod +x
   backup.sh` → run again (server stopped). `./` explained at the friction: the
   shell searches only PATH folders for bare names; `./` means "this folder, this
   file." Verify: today's dated folder in `~/backups`, `du -sh` twin of `world`.
5. **The restore drill — the centerpiece.** Framing stated plainly: **a backup
   nobody has restored is a hope, not a backup.** The drill: destroy the world,
   then prove the destruction never happened.
   - Run the script; confirm today's backup exists (`ls ~/backups`, look inside).
   - Start the server, join, and wreck the world — visibly, painfully. Lava over
     your own base; a crater at spawn. Your own things, not your friends' — the
     drill needs a loss *you* feel. The honest word on which world: doing this to
     the real world after a fresh backup is the braver and better lesson — the
     drill only proves something if the world you resurrect is one you'd mourn.
     If that's more than today can carry, run the drill on `world-experiments`
     instead; the mechanics are identical. The call is the learner's.
   - Stop the server. Then restore. Goal given as: make the server open a world
     where the wreckage never happened, while keeping the wreck (copy-first
     applies to wreckage too — never delete the only copy of anything, even a
     ruin).
     - Rung 1: the server opens whatever folder `level-name` names — currently
       `world`, which holds a smoking ruin. Two moves exist: change which folder
       the server opens, or change what sits at the name it already opens. The
       standard shape is the second.
     - Rung 2: set the ruin aside with a rename, then **copy** the backup in
       under the expected name. `mv` renames; the backup itself stays in
       `~/backups`, untouched — a restore that consumes the backup protects
       nothing next time.
     - Rung 3: `mv world world-wrecked`, then
       `cp -R ~/backups/world-<today> world`, then start.
   - Join. The lava never happened. The learner has moved a world backwards in
     time. Delete `world-wrecked` once satisfied (after the `level-name` glance).

### Break it on purpose — failures to cause, undo, and read

- **Restore to the wrong name.** Repeat the restore, but "fumble" it on purpose:
  set `world` aside, then copy the backup to a typo'd name (`wolrd`, or
  `world-restored`). Start the server and join. A brand-new world — nothing
  familiar anywhere. Read the situation before touching anything, because this
  exact moment, hit by accident at midnight, reads as *everything is gone* — and
  it never is: the real world sits right there under its aside-name, the backup
  is untouched in `~/backups`, and the server did exactly what
  `lessons/worlds-and-copies/` established — found nothing at the name
  `level-name` points to, generated fresh. Worlds don't vanish; names miss. Fix:
  stop, delete the accidental fresh world and the typo folder, redo the copy with
  the right name. Teaches: the calm inventory — *what folders actually exist
  right now* (`ls`) — beats every panicked conclusion.
- **Run the script from the wrong folder.** `cd ~`, then `./backup.sh` — refused:
  no such file (the script lives in the server folder). Now run it by full path:
  `~/projects/mc-server/backup.sh` — it runs, and `cp` fails: no `world` here.
  Teaches: a script runs in the *runner's* current folder, not its own — the
  working-directory concept collecting another toll. Undo: nothing; the failed
  run copied nothing. `cd` back.

### What just happened — the explanation

The restore is the lesson: the arrow of time in that folder points backwards now,
on demand, because a past state of the world was parked where nothing could touch
it. Why **dated** and **multiple**: disasters are discovered late — corruption
that happened Tuesday and got noticed Thursday needs Monday's backup, and a single
backup taken after the disaster is a corrupted backup of a corrupted world, which
helps no one. Why **elsewhere**: a backup in the server folder dies with the
server folder — one bad `rm`, one failed disk, both copies gone; different folder
is the minimum, different machine is the real answer, and cloud-synced folders
are fine *for backups* precisely because a finished backup is never written
again — the never-sync-the-live-folder rule (from
`lessons/running-your-own-server/`) was always about sync fighting a program
mid-write, and backups have no mid-write. And the script: the learner's first
time telling the shell a procedure instead of performing one. Anything typed can
be saved; anything saved runs the same way every time, including at 7 a.m.,
including when bored, including — eventually — when no human is present at all
(that's a later lesson, and the script written today is the one that will grow
into it).

### Go further — open questions

- Put a second copy somewhere that isn't this machine: a USB stick, another
  computer, a cloud-synced folder. Work out for yourself why the
  never-cloud-sync rule from setting up the server doesn't apply to `~/backups`
  — and what the *worst case* still is if the sync runs mid-copy.
- Backups get big. There's a command called `tar` that bundles a folder into a
  single file and compresses it. Investigate `tar -czf` — how much smaller does
  a world get, and what's the cost when you need it back in a hurry?
- Run the script twice on the same day and look very closely at what the second
  run created. `cp` has an opinion about copying onto something that already
  exists. How would you change the script so running it twice is always safe?
- How many backups should anyone keep, and for how long? Some Minecraft worlds
  have been kept alive for over a decade across server moves, crashes, and
  version upgrades. What do the people who keep worlds alive that long actually
  do — and is there any schedule that survives every disaster you can invent? No
  one has the full answer written down. [genuinely open]

## Delivery notes

- **guided:** the real-world-vs-experiments choice in the restore drill must read
  as honest reasoning and a genuinely free choice — never a dare, never a
  guilt-trip. State why braver is better, then hand over the call in one clean
  sentence.
- The wrong-name break-it's tone is the whole point: calm inventory over panic.
  Do not let it read as a data-loss scare; everything is always recoverable in
  it, and the text should feel that way.
- Do not spoil the same-day-second-run nesting behavior; it's a go-further
  observation.
- Keep the completion problem's blanks exactly two; more blanks turns first
  contact with scripting into a quiz.
