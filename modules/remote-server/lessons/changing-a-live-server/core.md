# Changing a server other people are using

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** changing-a-live-server
- **Part:** Part 4 — How changes travel
- **Scaffolding:** level 2. Every tool is already held — rsync, backups, the expendable
  server, systemd. What is new is conceptual rather than mechanical, so the work states
  goals and the reasoning is carried in orientation.
- **Deliveries:** guided + reference.
- **Status:** ready

## Goal and payoff

Two machines now exist and the learner has to decide, every time they change anything,
which machine is the source of truth for what.

The lesson's spine is an asymmetry:

- **Up (the learner's machine → the rented machine)** — the things they authored:
  datapacks, scripts, `server.properties`, `whitelist.json`. If lost, they could be
  written again.
- **Down (the rented machine → the learner's machine)** — the world. Nobody can rewrite
  the base a friend built. It exists in one place, and that place is the rented machine.

Push the world the wrong way and you delete everything everyone did since you last
copied it. That is the single most expensive mistake available at this point in the
course, and the lesson exists mostly to make it unthinkable rather than merely warned
against.

The payoff is a rehearsal. The learner takes a copy of the real world down to their own
machine, does something to it that cannot be undone — upgrades it to a newer Minecraft
version — looks at what happened, throws the copy away, and *then* decides. Nobody's
afternoon was risked to find out.

Second payoff, quieter and more valuable: a measured rollback. Not "we have backups" but
"I have restored this world, and it took eleven minutes."

## Prerequisites

- The server running on the rented machine as a service — established by
  `modules/remote-server/lessons/keeping-it-running/`
- Copying folders between the two machines with `rsync` — established by
  `modules/remote-server/lessons/moving-the-server-across/`
- A backup you have actually restored from, and the technique for copying a world
  without stopping the server — established by
  `modules/minecraft-server/lessons/worlds-and-backups/`
- A second server that can be broken freely — established by
  `modules/minecraft-server/lessons/choosing-a-version/`, which is where running more
  than one server was decided

## Establishes

- The learner can say, for any file in the server folder, which machine is authoritative
  for it — cited as: "the learner knows which changes travel up and which travel down —
  established by `modules/remote-server/lessons/changing-a-live-server/`."
- A rehearsal habit: irreversible changes are tried on a copy of production first.
- A measured restore time for their own world.
- Backups taken on a schedule on the rented machine, with copies living somewhere else.
- Vocabulary: production, sandbox, rehearsal, rollback, one-way change.

## Facts

### Where commands run

- **On your Mac** (local variant) — every `rsync`, in both directions; running the copy
  of production locally.
- **On the rented machine** (remote variant) — console commands, `systemctl`, the
  backup script, `crontab`.

rsync is always driven from the Mac regardless of which way the files move. Direction is
set by which side of the command the remote address appears on, not by where the command
is typed. Deliveries should say this once, plainly; it is a genuine point of confusion.

### The two flows

- **Authored things travel up.** Datapacks, scripts, `server.properties`,
  `whitelist.json`, `ops.json`. The learner wrote them; the canonical copy is wherever
  they write them; the rented machine gets a copy.
- **The world travels down.** It is written by the server, continuously, as people play.
  The canonical copy is the rented machine, and every other copy is a snapshot of a
  moment.
- The rule in one line: **code goes up, data comes down.** This is the same rule as any
  application with a database, arrived at from a Minecraft world rather than asserted.
- `modules/minecraft-server/lessons/git-for-your-server/` already made the learner draw
  this line on one machine, when its `.gitignore` separated the things worth versioning
  from the world. This lesson cashes that in across two machines.

### The expensive mistake

- Pushing the world up overwrites the live world with an older copy. Everything anybody
  built since that copy was taken is gone, and no error appears — the copy succeeds
  perfectly.
- `rsync --delete` makes it worse by also removing files the source does not have. It is
  in nearly every example online.
- Deliveries demonstrate this with `--dry-run` rather than by doing it. Reading the list
  of files a wrong-direction copy *would* overwrite is the point; causing it is not.

### Copying the world down without stopping the server

- The world can be copied while people are playing using the technique from
  `modules/minecraft-server/lessons/worlds-and-backups/`: `save-off`, `save-all`, copy,
  `save-on`. The server keeps running and stops writing for the duration of the copy.
- Deliveries must remind the learner that `save-on` afterwards is not optional. A server
  left with saving disabled loses everything on the next restart, which is a much worse
  outcome than the one the technique was avoiding.

### Rehearsal, and the vocabulary

Three things exist now, and only one of them is a machine:

- **The learner's own computer** — where things get written.
- **The sandbox server** — an expendable server with its own world. Answers "does this
  work at all?"
- **Production** — the server people play on. Answers nothing; it is what everything
  else exists to protect.

**Rehearsing is a verb, not a fourth machine.** It means running a *copy of production*
temporarily, doing the risky thing to the copy, and deleting it. At this scale it is
literally that: a folder copied down, run for an afternoon, thrown away.

The distinction that does the work, and deliveries must land it rather than assert it:
**the sandbox cannot answer the question.** It has an empty world. It cannot tell the
learner whether an upgrade will eat the chests in the base their friend spent a month
building, because it does not have those chests. Only a copy of the real world can.

### The one-way change

- Upgrading a world to a newer Minecraft version is **one-way by design**. The game's
  upgrader rewrites the world's data to the new format and there is no supported route
  back. [verify current state as of 2026-09 — third-party downgraders exist and their
  reliability is genuinely unknown; deliveries treat this as an honest unknown rather
  than asserting impossibility, consistent with `authoring/PRINCIPLES.md` on exploration]
- This makes it the ideal rehearsal subject: it is genuinely irreversible, the learner
  already met version pinning in
  `modules/minecraft-server/lessons/choosing-a-version/`, and it is exactly the change
  nobody should make live.
- What to look for after upgrading a copy: does the world load at all; do chests still
  contain what they contained; do custom items and datapack content survive; do
  structures render correctly; does anything in the server log complain during
  conversion.

### Rollback

- A backup is not a capability until somebody has restored from it and timed it. "We
  have backups" and "I can have the world back in eleven minutes" are different
  statements, and only the second one is useful when people are waiting.
- The drill runs on the expendable server, never on production.
- The discipline that follows: take a fresh backup immediately before any change to
  production, not on a schedule that happens to be near it.

### Backups on a schedule, off the machine

- The backup script the learner already wrote now needs to run on the rented machine,
  where nobody is watching, which means a scheduler.
- `cron` is the traditional Unix scheduler: a table of "run this command at these times".
  `crontab -e` edits it, `crontab -l` prints it. Five time fields — minute, hour, day of
  month, month, day of week — and famously easy to get wrong. [verify current Ubuntu
  behaviour as of 2026-09; deliveries point at `man 5 crontab`]
- **A scheduled job runs with a different environment and working directory from a
  terminal.** This is the most common reason a script that worked by hand does nothing on
  a schedule, it produces no error anybody sees, and deliveries must warn about it
  plainly: absolute paths everywhere, and send output somewhere readable.
- **A backup that lives only on the machine it is backing up is not a backup.** One
  provider incident, one deleted machine, one failed disk removes both. Copies have to
  reach somewhere else — the learner's own machine is the obvious somewhere.
- The provider's own included backup, where one exists, is a safety net rather than a
  strategy: a rolling 24-hour window will not help with a world that was ruined three
  days ago. Named in `modules/remote-server/lessons/renting-a-machine/`.
- This is a third scheduler if the learner has met launchd and systemd. Worth one
  sentence, not a paragraph.

## Arc

### Orientation — given plainly

The two flows and which is which; the expensive mistake and why it is silent; that rsync
direction is set by argument order rather than where it is typed; the hot-copy technique;
the three things that exist and why rehearsing is a verb; the one-way nature of a version
upgrade; what rollback actually means; `cron` with the environment gotcha; and why a
backup on the same machine is not a backup.

Framing sentence: you now have two machines and a decision to make every time you change
anything — which of them is right about this file? Get it backwards once, in one
direction, and you delete everything everybody built since you last looked.

### Predictions to elicit

- You want to change a setting on the server people play on. What could go wrong? What
  would you do first?
- Your world is on the rented machine, and you also have the copy you made when you moved
  it. Are they the same? What has happened to each since?
- If you upgraded the world to a newer version of Minecraft and hated the result, how
  would you go back? Answer honestly before finding out.
- Where do your backups live right now? Name a single event that would destroy both the
  world and every backup of it.

### The work — goals and hint ladders

**1. Sort the folder.** Before touching anything: list what is in the server folder and
put every item into one of two piles — *I wrote this* and *the server wrote this*. Then
say which machine is authoritative for each pile.

The rule falls out of the sorting rather than being handed over, which is why this is
first and why it is done on paper. Deliveries must not print the answer above the
exercise.

- Rung 1: for each item, ask what would happen if it vanished. Which ones could you
  produce again, and which ones could nobody produce again?

**2. Send an authored change up.** Something small and real — a settings change, a
datapack tweak. `rsync` up, restart the service, verify it took effect. This is the
ordinary loop and should feel unremarkable, which is the point: the common case is safe.

**3. Bring the world down, without kicking anyone off.** `save-off`, `save-all`, copy,
`save-on`. The learner now holds a copy of production on their own machine.

- Deliveries restate that `save-on` afterwards is not optional.

**4. Rehearse the change that cannot be undone.** Run that copy as a server locally.
Upgrade it to a newer Minecraft version. Then go and *look*: load the world, visit the
places people built, open chests, check custom content, read the log for complaints
during conversion.

Then delete the copy.

Production was never touched, and the learner now knows something they could not have
learned any other way — because the sandbox has an empty world and could not have
answered the question.

**5. Decide, and write down why.** Whatever the answer is, it is now evidence-backed. The
logbook entry is the deliverable: what was tried, what happened, what was decided.

**6. Measure a rollback.** On the expendable server: take a backup, make a change, break
something, restore, and **time it**. The number is the point. "We have backups" is a
hope; "eleven minutes" is a plan.

**7. Put backups on a schedule, and get them off the machine.** The existing script, run
by `cron` on the rented machine, with copies pulled down so they do not live only on the
disk they protect.

- Deliveries must include a *confirm it actually ran* step. A scheduled job that silently
  does nothing is the normal outcome of a first attempt.
- Rung 1 (it works by hand and does nothing on a schedule): what is different about how a
  scheduled job runs compared with your terminal?
- Rung 2: different working directory, different environment, often different places it
  looks for programs. Absolute paths everywhere, and send output to a file you can read.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Point the copy the wrong way, safely.** Construct the command that would push the
  local world up to the rented machine — and run it with `--dry-run`. Read the list of
  files it would overwrite. Those are the files containing everything everybody has built
  since that copy was taken, and the copy would have succeeded silently. Nothing happens,
  because `--dry-run`. Teaches the asymmetry as something felt rather than warned about.
  Undo: nothing — and the command is deleted rather than kept in shell history where it
  can be recalled by accident.
- **Let the scheduled backup fail silently.** Rename or move the backup script and leave
  it for a day. Nothing complains. No error appears anywhere. The backups simply stop,
  and everything looks exactly as healthy as it did before. Teaches the failure that
  actually loses people's worlds: not a dramatic crash but a quiet stop that nobody
  notices for six weeks. Undo: fix the path, and work out how you would detect this next
  time.
- **Restore the wrong backup.** On the expendable server, restore from a backup taken
  *before* a change the learner wanted to keep, and watch the wanted change disappear
  along with the unwanted one. Teaches that a rollback is a blunt instrument that returns
  everything to a moment, and that the moment matters — which is the argument for taking
  a fresh backup immediately before a change rather than relying on the nightly one.
  Undo: restore the newer backup.

### What just happened — the explanation

Two machines, and a different one is right about different things. The learner writes
datapacks and settings, so their machine is right about those and the rented machine gets
copies. The world is written by everybody who plays, continuously, so the rented machine
is right about that and every copy elsewhere is a photograph of a moment.

That asymmetry is not a Minecraft fact. Every application with a database has exactly the
same shape: the code is authored somewhere and deployed outward; the data accumulates in
production and is only ever copied back for inspection or recovery. Anybody who has
overwritten a production database with a developer's copy has made precisely the mistake
this lesson spent a session making unthinkable, and they usually only make it once.

The rehearsal is the other transferable half. There is a real difference between "does
this work?" and "will this work on ours?", and only the second question matters when
people are depending on the answer. The sandbox — a server with an empty world — answers
the first perfectly and cannot touch the second. That is why the copy had to come down:
fidelity to production is the whole reason the rehearsal is worth anything, and it is why
professionals go to considerable trouble to make test environments resemble the real one.

The upgrade being one-way is worth naming as a category rather than a fact about
Minecraft. Some changes can be undone and some cannot, and telling them apart *before*
acting is most of what caution actually consists of. A reversible change can be tried; an
irreversible one has to be rehearsed. Almost everything expensive that happens to a
running system happens because somebody treated the second kind as the first.

And the rollback has a number attached to it now. "We have backups" is a sentence people
say to feel better. "I have restored this world and it took eleven minutes" is a
different kind of statement, because it has been tested and it can be planned around.
The backups that reach somewhere other than the machine they protect are the same idea:
a copy that shares a fate with the original is not a copy in any sense that helps.

### Go further — open questions

- What else in your setup is one-way? Go through everything you can change and sort it
  into reversible and not. The list is shorter than you would expect, and worth having
  before you need it.
- Bringing the world down was manual. Could it happen on a schedule too — and would you
  want it to? What would you do with a copy of production that arrived every night?
- What is the longest you would accept the world being down for a restore? Does your
  measured number fit inside that? If not, what would you change first?
- Genuinely open: some changes only break with eight people online. A copy of production
  running alone on your Mac cannot show you that. What could you do instead — and what
  would you be willing to risk to find out?
- Also genuinely open: your copy of production is a photograph of one moment. Between
  taking it and applying the change for real, people played. What might have changed in
  between that would make your rehearsal wrong, and how much does that worry you?

## Delivery notes

- **guided:** level 2. The sorting exercise in step 1 must come before any statement of
  the rule; printing "code goes up, data comes down" above it removes the only thinking
  in the lesson.
- The wrong-direction copy is demonstrated with `--dry-run` and never actually run. Do
  not soften this into an instruction the learner might misread as safe to execute
  without the flag.
- `save-on` after the hot copy is restated every time the technique appears.
- Rehearsing is presented as a verb throughout; never introduce a fourth named machine.
  The sandbox-cannot-answer-this argument is the load-bearing sentence.
- The version upgrade's irreversibility is stated honestly: one-way by design, with
  third-party downgraders an open question rather than a denial.
- The rollback drill's output is a **number**, and the delivery should ask for it in the
  logbook explicitly.
- `cron` is introduced here from nothing.
  `modules/server-performance/lessons/knowing-before-they-tell-you/` also introduces it;
  the modules are independent and neither may assume the other, so the overlap is
  correct rather than a duplication to remove.
- **reference:** both rsync directions with the argument-order note, the hot-copy
  sequence including `save-on`, the crontab entry with the absolute-paths warning, and
  the off-the-machine rule.
