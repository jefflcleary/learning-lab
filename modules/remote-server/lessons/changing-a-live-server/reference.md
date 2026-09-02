# Changing a server other people are using — reference

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

Compressed version: commands and hazards only. The teaching version is
[guided.md](guided.md).

Goal: know which machine is authoritative for what, rehearse irreversible changes on a
copy of production, have a measured restore time, and back up on a schedule to somewhere
other than the machine being backed up.

## The two directions

- **Authored things go up**: datapacks, scripts, `server.properties`, `whitelist.json`,
  `ops.json`. Your machine is authoritative.
- **The world comes down**: written continuously by everyone playing. The rented machine
  is authoritative; every other copy is a snapshot.
- **Code goes up, data comes down.**
- `rsync` is always run from your Mac either way. Direction is set by argument order —
  source first, destination second — not by where you type it.

## Up

<span className="run-where run-where-local">On your Mac</span>

```
rsync -av --dry-run <file or folder> minecraft@<address>:/home/minecraft/server/
rsync -av <file or folder> minecraft@<address>:/home/minecraft/server/
```

Restart the service afterwards and verify.

## Down, without disconnecting anyone

<span className="run-where run-where-remote">In the server console</span>

```
save-off
save-all
```

<span className="run-where run-where-local">On your Mac</span>

```
rsync -av --progress minecraft@<address>:/home/minecraft/server/world/ ~/prod-world-copy/
```

<span className="run-where run-where-remote">In the server console</span>

```
save-on
```

**`save-on` is not optional.** A server left with saving off loses everything since it
was switched off, at the next restart.

## The expensive mistake

Pushing the world *up* overwrites the live world with an older snapshot, silently and
successfully. `--delete` additionally removes files the source lacks, and appears in most
examples online.

Demonstrate with `--dry-run` and read the file list. Never run it without the flag; don't
leave the command in shell history.

## Rehearsing

- Run the downloaded copy locally, apply the irreversible change, inspect, delete the
  copy.
- Version upgrades are one-way by design — third-party downgraders exist and their
  reliability is an open question. Assume no route back.
- After upgrading a copy, check: world loads; built areas intact; chest contents intact;
  custom/datapack content survives; log complaints during conversion.
- The sandbox cannot answer this — it has an empty world. Fidelity to production is the
  entire point of the copy.

## Rollback

- On the expendable server: back up, change, break, restore, **and time it**. The number
  is the deliverable.
- Take a fresh backup immediately before any production change; a rollback returns
  everything to a moment, so the moment matters.

## Scheduled backups

<span className="run-where run-where-remote">On the rented machine</span>

```
crontab -e
crontab -l
```

- `man 5 crontab` for the five time fields.
- **Absolute paths everywhere**, and send output to a readable file. A scheduled job runs
  with a different working directory and environment; a relative path that worked by hand
  resolves to nothing and fails silently.
- **Confirm it actually ran** by looking for the backup, not by assuming.
- **A backup that lives only on the machine it protects is not a backup.** Pull copies
  down. A provider's included backup is a safety net, not a strategy — a rolling 24-hour
  window will not recover a world ruined three days ago.

## What you have now

- A stated rule for which machine is authoritative for which files
- The hot-copy sequence for pulling the world down without disconnecting players
- An irreversible change rehearsed on a copy, decided on evidence
- A measured restore time
- Scheduled backups with copies held off the machine
