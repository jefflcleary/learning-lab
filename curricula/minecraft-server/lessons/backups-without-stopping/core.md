# Backing up a world that won't sit still

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** backups-without-stopping
- **Part:** Part 3 — Infrastructure
- **Scaffolding:** level 2 — second lesson exercising both the shell-script skill
  (from `lessons/backups/`) and console commands (from `lessons/console-commands/`).
  Goals plus hints; concepts named but not applied; no rung-4 worked answers.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

Back up the world while the server runs and friends stay connected, using the
server's own save-control commands: pause writing, force everything to disk, copy,
resume. Then extend the backup script into a hot-backup version — and discover its
honest limit: a shell script has no way to type into the server console. Payoff:
backups now happen while everyone keeps playing, uninterrupted — and the learner
has met, by name, the consistency problem every database on earth shares.

## Prerequisites

- A backup script and a restore you've actually performed — established by
  `lessons/backups/`
- A console you can type live commands into, and the habit of reading what they
  answer — established by `lessons/console-commands/`
- An experiments world slot the server can be switched to — established by
  `lessons/worlds-and-copies/`

## Leaves behind

- The hot-backup procedure, performed by hand at the console: save-off →
  save-all flush → wait for confirmation → copy → save-on
- `hot-backup.sh`: the copy half automated, the console half walked through by the
  script (instructions plus a pause), because a script cannot yet speak to the
  running server — that gap stated as real and owned
- Cited by other cores as: "you can back up a live server without kicking anyone,
  and you know the save-off/save-on procedure — established by
  `lessons/backups-without-stopping/`."

## Facts

- The problem, honestly: stopping the server for every backup disconnects everyone
  every time; copying a live world risks a torn copy — the learner *measured* that
  uncertainty in the break-it of `lessons/worlds-and-copies/`.
- The server's save-control commands [verify all three names, arguments, and
  confirmation-line wording against the minecraft.wiki Commands pages —
  deliveries have the learner confirm from the wiki, never assert]:
  - `save-off` — the server stops writing world files to disk (automatic saving
    disabled). The world keeps running normally — in memory. Prints a
    confirmation line [verify wording; historically along the lines of
    "Automatic saving is now disabled"].
  - `save-all flush` — everything held in memory is forced to disk now; the
    `flush` variant waits until all pending writes are complete before reporting
    done [verify flush semantics]. Prints a confirmation line when finished
    [verify wording; historically "Saved the game"].
  - `save-on` — automatic saving resumes [verify wording of confirmation].
- The procedure, order load-bearing: `save-off` → `save-all flush` → **wait for
  the confirmation line** → copy the world → `save-on`. Nothing may be writing
  while the copy reads; save-off stops *new* writes, flush completes *pending*
  ones. Only after both is the disk a single consistent instant.
- Nobody is disconnected at any point; players notice nothing [worth having the
  learner verify by asking whoever is online].
- The server also autosaves on its own rhythm when saving is on — interval
  discoverable (go further).
- Evidence trick: file modification times in `world/region/` (visible with
  `ls -l world/region`) stop advancing while saving is off, and move again after
  save-on + a save. `ls -l` = the long listing, which shows sizes and
  modification times (given plainly; first deliberate use of it in this course).
- A shell script cannot type into the server console: the console reads
  keystrokes from its own terminal; a script is a separate program in a separate
  terminal. `echo save-off` in a script prints the words to the script's own
  output — the server never hears them.
- The gap is real and closable: **RCON** — a protocol the server offers that lets
  other programs send console commands over the network. `enable-rcon` sits in
  `server.properties` (the learner read past it once). Closing the gap is
  `lessons/rcon-scripting/`; nothing is enabled in this lesson.
- `read` — a bash builtin that pauses a script until the human presses return.
  Named as a concept for the script extension; level 2, so usage is looked up by
  the learner (`help read` in bash, or any reference).
- Hot copies restore exactly like cold ones; the verification step restores the
  hot copy into the experiments slot (`level-name`, expendable by declaration)
  and joins it.

## Arc

### Orientation — given plainly

The problem stated with both horns: cold backups work — proven personally — but
every one of them kicks everyone off; and the alternative, copying a live world,
was measured in `worlds-and-copies` and the honest answer was "you can't know
what you got." A copy of files being written is a photo of a moving subject. The
technique, named plainly: the server takes commands that control its own saving —
stop writing, finish everything pending, hold still while the photo is taken,
resume. The three commands are named in orientation, but their exact behavior and
confirmation lines are the wiki's to state — the first work item is confirming
them at the source (this doubles as point-don't-assert practice from
`lessons/choosing-a-version/`).

### Predictions to elicit

- While saving is off, players keep playing normally. Where do their actions
  live during that window? What would a power cut in that window cost?
- Will the players online notice *anything* during save-off → copy → save-on?
- The wiki lists both `save-all` and `save-all flush`. Why would both exist —
  what's the difference between *starting* to save everything and *finishing*
  saving everything?

### The work — goals and hint ladders (level 2: goals plus hints, concepts named not applied)

1. **Confirm the tools at the source.** Goal: on the minecraft.wiki pages for the
   save commands (search the wiki for `save-off`, or find the Commands page and
   navigate), pin down all three: what each does, and what line each prints when
   it has worked. Written down — the confirmation line for `save-all flush` is
   the go signal in the procedure, so its exact wording matters. No hints; this
   is the research skill, already established.
2. **A hot backup by hand.** Goal: with the server running and at least one
   player connected (the learner counts; a friend online makes it a real proof),
   produce a copy of the world there's reason to trust — without stopping the
   server, and with nobody disconnected. Success criteria: the flush
   confirmation line was seen *before* the copy started; `save-on` was issued
   after it finished; whoever was online reports nothing weird.
   - Rung 1: the order is the entire trick — nothing may be writing while the
     copy reads. One command stops *new* writes; one finishes *pending* ones.
     Which has to happen first, and what tells you the second is done?
   - Rung 2: `save-off`, then `save-all flush`, then wait for the exact line the
     wiki told you to expect. Then the copy is just a copy — the backup script
     already does dated copies, or `cp -R` by hand into `~/backups`. Then
     `save-on`, which is not optional; the break-it is about forgetting it.
3. **Trust, then verify.** Goal: prove the hot copy is a world, not a hope —
   restore it into the experiments slot and walk around in it. Success: joined,
   looked around, recent builds present.
   - Rung 1: the experiments slot exists to be overwritten — that's its
     declaration. A restore is a copy plus a name the server opens; both moves
     are established habits (`lessons/worlds-and-copies/`,
     `lessons/backups/`). Which folder name does the server need to find the
     hot copy under, and which setting says so?
4. **Extend the script — and find its limit.** Goal: `hot-backup.sh`, a script
   for the whole procedure. First, the discovery, framed as a prediction: could
   the script itself run `save-off`? What would `echo save-off` in a script
   actually do? (Answer to arrive at: print the words into the script's own
   output — the server console is a different program's keyboard, and the script
   has no hands.) The gap stated as real: scripts *will* get a way to send
   commands to a running server — that's RCON, and it's
   `lessons/rcon-scripting/`. Today's honest version: a script that walks its
   human through the console half and automates the copy half. Success: running
   `./hot-backup.sh` tells you what to type at the console, waits for you, makes
   the dated copy, then tells you what to type to finish.
   - Rung 1: `backup.sh` already does the middle of the procedure. What must
     happen before its copy line, and after — and which of those can printed
     instructions plus a pause accomplish?
   - Rung 2: `echo` prints the instructions; bash has a builtin called `read`
     that pauses the script until the human presses return. How `read` is used
     is yours to look up — `help read` at a bash prompt, or any reference.

### Break it on purpose — failures to cause, undo, and read

- **Forget save-on.** Run the procedure and deliberately stop before the last
  step — saving stays off. Keep playing: build a pillar, dig a hole, note the
  time. Evidence hunt: `ls -l world/region` — the modification times have
  stopped moving; the diary has stopped being written. Now the reasoning
  exercise (hypothetical only — nobody yanks a power cord): if the machine lost
  power right now, what exists on disk? The world as of the flush; the pillar
  and the hole live in memory and nowhere else. And there's no time limit —
  saving stays off until someone turns it back on; find out whether the server
  ever reminds you [verify: no reminder is believed to exist — deliveries phrase
  as "find out whether it warns you"]. Undo: `save-on`, then a `save-all` for
  good measure, then watch the timestamps move again. Teaches: some steps come
  in pairs, and a procedure is a promise that the last step happens — which is
  why the script walks through *all* the steps, and why real automation
  (`lessons/rcon-scripting/`) is safer than memory.

### What just happened — the explanation

The word for today's problem is **consistency**. A copy of files being written is
a photo of a moving subject — parts of the image from different instants, and the
whole may not describe any moment that ever existed. That's what "torn" meant in
the live-copy experiment. `save-off` plus `save-all flush` is asking the subject
to hold still: stop new writes, complete pending ones — after both, the disk is a
single instant, and stays one until `save-on`. Meanwhile the world never paused,
because the server has always run the live world from memory and treated the disk
as its diary (the memory-vs-disk split first met in `lessons/server-settings/`) —
saving off doesn't stop the world, only the diary. And the reach of this: every
database on earth — banks, games, hospitals — has this exact problem, copying
data that something is actively changing, and some version of this exact answer:
pause writes, flush, snapshot, resume. The words the learner will meet out there:
*consistent snapshot*. They've now taken one by hand.

### Go further — open questions

- The server saves on its own rhythm when saving is on. Find the interval — by
  evidence first (`ls -l` timestamps? the log?), then check your measurement
  against the wiki.
- Did whoever was online notice anything at all? Is there any way a player
  *could* detect, from inside the world, that saving was off?
- The Mac's filesystem (APFS) can snapshot an entire disk in effectively an
  instant. If the photo takes no time, does the subject still need to hold
  still? Investigate — the answer is subtler than it looks. [open]
- Big public servers back up worlds thousands of times larger than this one,
  with hundreds of players online, and nobody notices. What do they actually
  do? Some of it is public — talks, blog posts, open-source tooling — and some
  genuinely isn't. Find what you can. [genuinely open]

## Delivery notes

- **guided:** level 2 — resist re-explaining script mechanics from
  `lessons/backups/` (shebang, chmod, `./`); reference them as established. The
  `read` builtin is named, never demonstrated.
- All three command names and every confirmation line are [verify] — the
  delivery must route the learner through the wiki before use and must not
  quote any output line as gospel.
- The break-it's crash is strictly a reasoning exercise; make sure no phrasing
  invites actually cutting power or force-killing the server.
- The "script has no hands" discovery should be allowed to land as a real
  disappointment before the RCON forward-link relieves it — don't defuse it in
  the same sentence.
