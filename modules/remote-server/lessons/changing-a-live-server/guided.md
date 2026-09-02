# Changing a server other people are using

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

You have two machines now, and every time you change anything you're making a decision
you might not have noticed you were making: **which of these two is right about this
file?**

For most things it doesn't matter much. For one thing it matters enormously, and getting
it backwards deletes everything everybody has built since the last time you looked — with
no error message, because the copy will have worked perfectly.

This session is about that decision. You'll work out which way each kind of change
travels and why, send a real change up the safe way, and then do the thing this whole
setup makes possible: bring a copy of the real world down to your own machine, do
something to it that **cannot be undone**, look at what happened, and throw the copy away.
Then decide, knowing rather than hoping.

You'll also find out how long it actually takes you to put the world back after something
goes wrong. Not "we have backups" — a number, measured, that you can plan around.

---

## Before you start

You need:

- **The server running on the rented machine as a service.**
  [Keeping it running](../keeping-it-running/guided.md) gets you there.
- **Being able to copy folders between the two machines with `rsync`.**
  [Moving the server across](../moving-the-server-across/guided.md) covers it.
- **A backup you have actually restored from, and the trick for copying a world without
  stopping the server.**
  [Copying and backing up worlds](../../../minecraft-server/lessons/worlds-and-backups/guided.md)
  covers both. Quick check: you can say what `save-off` does and why you'd use it.
- **A second server you can break freely** — not the one people play on.
  [Choosing a Minecraft version](../../../minecraft-server/lessons/choosing-a-version/guided.md)
  is where running more than one server got decided.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A written rule for which machine is right about which files, worked out rather than
  handed to you
- One real change sent up to the live server, the ordinary way
- A copy of the real world on your own machine, taken without kicking anybody off
- An irreversible change tried on that copy, inspected, and thrown away — with the live
  world never touched
- A measured restore time for your own world, in minutes
- Backups running on a schedule on the rented machine, with copies that don't live only
  on the machine they're protecting

---

## New tools

**`cron`** is the traditional Unix scheduler: a table of "run this command at these
times". `crontab -e` edits it and `crontab -l` prints it. Its time format is five fields
— minute, hour, day of month, month, day of week — and it's famously easy to get wrong.
`man 5 crontab` is the authority.

Everything else you already have: `rsync`, your backup script, and the server console.

One thing about `rsync` worth stating plainly before you use it in anger. **You always
run it from your own Mac, whichever way the files are going.** The direction isn't set by
where you type the command — it's set by which side of the command the remote address
appears on. Source first, destination second. That trips people, and it's about to matter
a great deal.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- You want to change a setting on the server people play on. What could go wrong? What
  would you do first?
- Your world is on the rented machine, and you also still have the copy you made when you
  moved it across. Are they the same? What's happened to each since?
- If you upgraded the world to a newer version of Minecraft and hated the result, how
  would you go back? Answer honestly before you find out.
- Where do your backups live right now? Name a single event that would destroy both the
  world and every backup of it.

---

## The work

### Sort the folder

Before touching anything, do this on paper.

List what's in your server folder. For every item, put it in one of two piles:

- **I wrote this.**
- **The server wrote this.**

Then, for each pile, answer one question: **if it vanished, could anybody produce it
again?**

Now say which machine is authoritative for each pile — that is, which one is *right* when
the two disagree.

<details>
<summary>Once you've written both piles</summary>

The two piles almost certainly came out like this:

- Things you wrote: datapacks, scripts, `server.properties`, `whitelist.json`,
  `ops.json`. You could write them again. Losing them costs an evening.
- Things the server wrote: the world. It's produced continuously by everybody who plays.
  Nobody can rewrite the base your friend spent a month on — not you, not them, not
  Mojang.

So the rule falls out on its own: **the things you author travel up to the rented
machine, and the world travels down from it.** Your machine is right about the first
pile. The rented machine is right about the second, and every copy of the world you hold
anywhere else is a photograph of a moment.

There's a short version worth remembering: **code goes up, data comes down.**

</details>

### Send an authored change up

Pick something small and real — a settings tweak, a datapack change. Make it on your Mac,
send it up, restart the service, and check it took effect.

<span className="run-where run-where-local">On your Mac</span>

```
rsync -av --dry-run <the file or folder> minecraft@<the address>:/home/minecraft/server/
```

Read the dry run, then do it for real, then restart the service on the rented machine and
verify.

That should have felt unremarkable, and that's the point. The common case is safe. It's
the other direction that needs care.

### Bring the world down without kicking anyone off

You want a copy of the *real* world — the one with everybody's builds in it — on your own
machine.

You could stop the server to take it, and everybody would get disconnected. You don't
have to. You already know the trick: tell the server to stop writing, flush what it has,
copy, then tell it to start writing again.

<span className="run-where run-where-remote">In the server console</span>

```
save-off
save-all
```

Then, from your Mac — note that the remote address is now on the *left*, because the
files are coming the other way:

<span className="run-where run-where-local">On your Mac</span>

```
rsync -av --progress minecraft@<the address>:/home/minecraft/server/world/ ~/prod-world-copy/
```

And when the copy finishes, back in the console:

<span className="run-where run-where-remote">In the server console</span>

```
save-on
```

**`save-on` is not optional.** A server left with saving switched off loses everything
since you switched it off, the next time it restarts — which is a far worse outcome than
the disconnection you were avoiding. Do it as soon as the copy finishes, every time.

### Rehearse the change that can't be undone

Now the part this whole setup exists to make possible.

Take that copy, run it as a server on your own Mac, and **upgrade it to a newer version of
Minecraft.**

Upgrading a world is one-way. The game rewrites the world's data into the new format and
there's no supported route back — people have built third-party tools that claim
otherwise, and how well they work is genuinely an open question, but you should assume
you're not coming back.

Then go and look. Properly, not a glance:

- Does the world load at all?
- Go to the places people actually built. Is everything there?
- Open chests. Is what was in them still in them?
- Check anything custom — datapack content, named items, anything unusual.
- Read the server log for complaints during the conversion.

Then delete the copy.

Whatever you just learned, you learned it without risking anybody's afternoon. And notice
what your sandbox server could *not* have told you: it has an empty world. It can tell you
whether an upgrade works. It cannot tell you whether an upgrade will eat the contents of
the chests in your friend's base, because it doesn't have that base in it.

That's the whole reason the copy had to come down.

### Decide, and write down why

Whatever you've decided — upgrade, don't upgrade, wait for a mod to catch up — it's now
backed by something you saw rather than something you feared.

Put it in your logbook: what you tried, what happened, what you decided. In three months
you'll want to know why the server is on the version it's on.

### Measure a rollback

Do this on the expendable server, never on the one people play on.

Take a backup. Make a change. Break something badly. Then restore from the backup — and
**time it**.

The number is the deliverable. "We have backups" is a hope. "I can have the world back in
eleven minutes" is a plan, and it's the difference between a calm evening and a bad one.
Write the number down.

### Put backups on a schedule, and get them off the machine

Your backup script needs to run on the rented machine now, where nobody is watching.

<span className="run-where run-where-remote">On the rented machine</span>

```
crontab -e
```

Then — a separate step, not an afterthought — **confirm it actually ran**, by looking for
the backup it should have made.

<details>
<summary>It works when I run it and does nothing on a schedule</summary>

This is the normal outcome of a first attempt, and it produces no error that anybody
sees.

What's different about how a scheduled job runs, compared with you running it in a
terminal?

</details>

<details>
<summary>What's different</summary>

A scheduled job starts in a different working directory, with a different environment,
and often looks for programs in different places than your shell does. A relative path
that worked for you resolves to nothing, and the failure is silent.

Absolute paths everywhere — to the script, to the folders, to anything it calls. And send
the job's output to a file you can read, so the next failure tells you something.

</details>

Then the part people skip: **a backup that lives only on the machine it's backing up is
not a backup.** One deleted machine, one failed disk, one billing problem, and you lose
the world and every copy of it in the same instant. Pull copies down to your own machine,
or somewhere else — anywhere that doesn't share a fate with the original.

If your provider includes its own backups, that's a safety net rather than a strategy. A
rolling 24-hour window won't help you with a world that was ruined three days ago.

---

## Break it on purpose

**Point the copy the wrong way — safely.** Write the command that would push your local
copy of the world *up* to the rented machine. Don't run it. Run it with `--dry-run`.

Read the list of files it says it would overwrite.

That list is everything everybody has built since you took that copy. The command would
have succeeded perfectly, printed no error, and told you nothing was wrong. This is the
single most expensive mistake available to you right now, and it is completely silent.

Nothing happened, because of the flag. Now delete that command rather than leaving it
sitting in your shell history where an up-arrow can find it.

**Let the scheduled backup fail silently.** Rename or move your backup script and leave it
for a day.

Nothing complains. No error appears anywhere. The backups just stop, and everything looks
exactly as healthy as it did the day before.

That's the failure that actually loses people's worlds — not a dramatic crash, but a quiet
stop that nobody notices for six weeks, discovered on the one day it mattered. Fix the
path, and then think about how you'd catch that next time.

**Restore the wrong backup.** On the expendable server, restore from a backup taken
*before* a change you wanted to keep. Watch the good change disappear along with the bad
one.

A rollback is a blunt instrument: it returns everything to a moment, and the moment
matters. That's the argument for taking a fresh backup immediately before you change
anything, rather than trusting that last night's will be close enough.

---

## What just happened

Two machines, and a different one is right about different things.

You write datapacks and settings, so your machine is right about those and the rented
machine gets copies. The world is written by everybody who plays, continuously, so the
rented machine is right about that — and every copy of it you hold anywhere else is a
photograph of a moment that has already passed.

That asymmetry isn't a Minecraft fact. Every application with a database has exactly this
shape: code is authored somewhere and pushed outward, data accumulates in production and
is only ever copied back to look at or to recover from. Anybody who has overwritten a
live database with a copy from their own laptop has made precisely the mistake you spent
this session making unthinkable. They generally only make it once, and they remember it
for a long time.

The rehearsal is the other half worth keeping. There's a real difference between "does
this work?" and "will this work on *ours*?", and only the second question matters when
people are depending on the answer. Your sandbox answers the first one perfectly and
can't touch the second, because its world is empty. That's why the copy had to come down,
and it's why professionals go to a surprising amount of trouble to make their test
environments resemble the real thing.

The upgrade being one-way is worth remembering as a *category* rather than a fact about
Minecraft. Some changes can be undone and some can't, and telling those apart before you
act is most of what caution actually is. A reversible change can just be tried. An
irreversible one has to be rehearsed. Almost everything expensive that happens to a
running system happens because somebody treated the second kind as the first.

And your rollback has a number attached to it now. That's a genuinely different thing
from having backups. One is a feeling; the other has been tested and can be planned
around — and the copies that live somewhere other than the machine they protect are the
same idea again. A copy that shares a fate with the original was never really a copy.

---

## Go further

- What else in your setup is one-way? Go through everything you can change and sort it
  into reversible and not. The list is shorter than you'd expect, and it's worth having
  before you need it rather than during.
- Bringing the world down was manual. Could that happen on a schedule too — and would you
  want it to? What would you do with a copy of production that showed up every night?
- What's the longest you'd accept the world being down for a restore? Does the number you
  measured fit inside that? If it doesn't, what would you change first?
- Genuinely open: some changes only break when eight people are online. A copy of
  production running alone on your Mac can't show you that. What could you do instead —
  and what would you be willing to risk to find out?
- Also genuinely open: your copy of production is a photograph of one moment, and between
  taking it and doing the real thing, people played. What might have changed in between
  that would make your rehearsal wrong? How much should that worry you?

---

## What you have now

- A written rule for which machine is right about which files, and the reason behind it
- A change sent up to the live server the ordinary way
- The ability to copy the real world down without disconnecting anybody
- An irreversible change rehearsed on a copy and decided on evidence, with the live world
  never touched
- A measured restore time for your own world
- Backups running on a schedule, with copies that don't share a fate with the original
- First-hand knowledge of what the most expensive mistake here would look like — which is
  nothing at all, until you went looking
