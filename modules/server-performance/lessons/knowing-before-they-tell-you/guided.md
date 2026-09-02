# Watching performance over time

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every measurement you've taken in this module needed you to be there. And nobody is
there at three in the morning, or during dinner, or on the Tuesday evening when it
actually happened.

This session removes you from the loop. You'll build something that records your
server's performance continuously, keeps the history, and speaks up when the numbers go
bad — so the complaint that started this whole module arrives from the server itself,
before anybody has to say anything.

Underneath it is an idea worth more than the script: the difference between a
**snapshot** and a **time series**. Everything so far answers "how is it right now".
None of it can answer "was it slow last Tuesday", and no amount of cleverness recovers
data that was never recorded. Recorded data can be examined any way you like afterwards.
Data you didn't record is gone permanently.

That asymmetry is why people instrument systems *before* they have a problem. Not
because they're organised — because the alternative is being unable to answer anything
on the day it matters.

---

## Before you start

You need:

- **A tuned server and a signature table.**
  [Making the server slow on purpose](../making-it-slow-on-purpose/guided.md) and
  [Changes that help, and proving they did](../changes-that-help/guided.md) cover them.
  You'll choose your alert thresholds against numbers you've actually seen this server
  produce when specific things were wrong.
- **Python, and sending commands to a running server with RCON.**
  [Reading logs and sending commands with Python](../../../minecraft-server/lessons/python-logs-and-rcon/guided.md)
  covers both.
- **Somewhere messages already land where people look.**
  [Bridging to Discord and building a status page](../../../minecraft-server/lessons/discord-and-web/guided.md)
  covers it.
- **A machine that stays on.**
  [Keeping it running](../../../remote-server/lessons/keeping-it-running/guided.md)
  covers it. A recorder that only runs while your laptop is open records precisely the
  hours when nothing was wrong.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A history of your server's performance, one line per reading, accumulating on its own
- A sampling interval you chose for a written reason rather than a round number
- A graph of a day, and at least one thing in it you didn't know
- An alert that fires on a sustained problem, into a place people already look — tested
  by causing a real problem and watching the message arrive
- Three schedulers met, in three costumes, which is about the point at which the idea
  stops being a tool

---

## New tools

**`cron`** is the traditional Unix scheduler: a table of "run this command at these
times". You edit it with `crontab -e` and print it with `crontab -l`. Its time format is
five fields — minute, hour, day of month, month, day of week — and it is famously easy to
get wrong. `man 5 crontab` on the machine is the authority; Ubuntu's
[cron how-to](https://help.ubuntu.com/community/CronHowto) is a gentler introduction.

This is your third scheduler. launchd starts things on your Mac, systemd starts things on
your Linux machine, and now cron runs things on a timetable. Same idea, third costume,
configured with text every time. (systemd can do this job too, with timers — two
mechanisms on the same machine that overlap, which is normal and worth knowing.)

Everything else here you already have: Python, RCON, your profiler, and somewhere to send
a message.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Somebody says the server was terrible last Tuesday evening. With everything you've
  built so far, can you find out whether they were right? What exactly stops you?
- You're about to record a number every few minutes, forever. What could go wrong with
  measuring too often? What could go wrong with measuring too rarely?
- If your recorder sends a message every time a single reading looks bad, what happens
  after two weeks?
- Look at your signature table. Which of your six causes would a reading every five
  minutes definitely catch? Which would it definitely miss?

---

## The work

### Get one reading

A script that connects over RCON, asks the server for its numbers, and prints them.
Nothing scheduled, nothing saved. Prove the connection and the parsing work before adding
anything on top.

<details>
<summary>Stuck on pulling the numbers out of the reply</summary>

You've done this before — you parsed lines out of a log file with Python. A command's
reply is a line of text like any other.

</details>

<details>
<summary>The move that saves the most time</summary>

Print the raw reply first and read it, character by character, before you write anything
that takes it apart. What you assume the output looks like and what it actually looks
like are different surprisingly often, and every minute spent here saves ten later.

</details>

### Append it to a file

One line per reading, timestamp first. Comma-separated is plenty — resist building
anything more elaborate, because the point is that the history exists, not how it's
stored.

Run it by hand a few times and look at the file.

### Choose an interval, and write down why

This is the first genuine trade in this module with no correct answer.

Sample too rarely and short problems fall between readings entirely — and it's worse than
missing them, because your history will positively assert that nothing happened. Sample
too often and the recorder itself starts costing something: a connection, a command, and
a write, over and over, forever. It's small. It isn't nothing, and a monitoring system
that degrades the thing it monitors is a real and well-documented way to embarrass
yourself.

That cost has a name — **observer cost** — and it's general: measuring a system changes
it, and the only question is by how much.

So make the decision against your signature table. Which of your six causes lasts long
enough to be caught at the interval you're considering? Which would slip through
completely?

**Write the reasoning next to the number.** The reasoning is the deliverable here; the
number is just its consequence.

### Put it on a schedule

`cron`, on the machine that stays on.

<span className="run-where run-where-remote">On the machine running your server</span>

```
crontab -e
```

Then — and this is a separate step, not an afterthought — **confirm it actually ran**, by
looking at the file. Don't assume.

<details>
<summary>It worked when I ran it and does nothing on a schedule</summary>

This is the normal outcome of a first attempt, and it produces no error that anybody
sees.

What's different about how a scheduled job runs, compared with running it yourself in a
terminal?

</details>

<details>
<summary>What's different</summary>

A scheduled job starts in a different working directory, with a different environment,
and often looks for programs in different places than your shell does. So a relative path
that worked for you resolves to nothing, and the failure is silent.

Absolute paths everywhere — to Python, to your script, to the output file. And send the
job's output to a file you can read, so next time it fails you find out why instead of
guessing.

</details>

### Look at a day

Once there's enough history, graph it. A spreadsheet is a completely legitimate answer
here, and so is a Python plotting library — the lesson is the looking, not the tool.

Then go hunting for something you didn't know. An evening peak. Something at 3 a.m. A
slow drift upward across the week.

If you find nothing interesting, that's fine and worth writing down. A week will show you
more than a day, and the file keeps growing whether or not you're looking at it.

### Alert

An alert is a threshold plus a message, and both halves are decisions rather than
settings.

The threshold comes from your signature table — you already know what this server's
numbers look like when specific things are wrong, which is exactly the information a
threshold needs and which almost nobody has when they set one.

Three design rules, and each one exists because of a specific failure:

- **Fire on a sustained condition, not a single reading.** One bad sample is noise.
- **Once per episode, not once per sample.** Otherwise a bad evening produces forty
  messages and everybody mutes the channel.
- **Put the numbers in the message.** Somebody should be able to judge it at a glance
  without going and looking.

Then test it. Cause one of your six problems deliberately, on the expendable server, and
watch the message arrive. **An alerting system that has never fired is a guess** — you do
not know it works, you only know it hasn't complained.

### Wait for it to be right

This session doesn't end when the code works. It ends the first time your server tells
somebody about a problem before a person noticed it, and that will happen days or weeks
from now.

When it does, write it in your logbook. That's the actual finish line of this module.

---

## Break it on purpose

**Set the threshold far too tight.** Pick a value that ordinary evening load will cross,
and leave it running for a day.

Read the messages as they come. Then notice how quickly you stop reading them properly.

That's the failure mode that actually kills monitoring systems, and you've just
experienced it on a scale of hours instead of months. It's never the missed alert that
does the damage — it's a hundred false ones, after which nobody reads any of them and the
real one arrives to an empty room. Set it against your signature table instead.

**Set the interval far too long.** One reading an hour. Then cause a two-minute problem
from last session.

Now look at your history. It shows a perfectly healthy server across the exact window in
which the server was unusable.

That's worth sitting with. A recorded "nothing happened" is only ever as strong as the
interval that produced it, and absence of evidence in a time series is a much weaker claim
than it looks like. Restore your interval.

**Break the schedule without noticing.** Rename or move your script, and leave it for a
day.

Nothing complains. The file simply stops growing and the alerts stay quiet — which is
exactly what a healthy server looks like.

This is the hardest thing about monitoring anything: **a silent monitor and a healthy
system are indistinguishable**, unless something is checking that the monitor is alive.
Fix the path, and then think about how you'd catch that next time.

---

## What just happened

You took yourself out of the loop, which is the last thing standing between measuring a
system and operating one.

The difference between a snapshot and a time series isn't a matter of degree. A snapshot
answers how things are. A time series answers how things have *been* — and that second
category holds nearly every interesting question about anything that runs continuously.
Is it worse than last month. Does it happen at the same time every evening. Did that
change actually help over weeks, or was the afternoon you tested it just quiet? And the
asymmetry is total: recorded data can be interrogated any way you like later, and data
you didn't record is gone.

The sampling interval was the first decision in this module with no right answer, and
what made your choice defensible wasn't cleverness — it was that you had a table of what
your server's real problems look like, so you could reason about which of them would fall
between readings. Most people pick five minutes because it's a round number.

The alerting trade has the same shape and higher stakes, and it's a human problem rather
than a technical one. A threshold tight enough to catch everything cries wolf, and the
thing that destroys a monitoring system is never the alert that didn't fire. It's the
hundred that fired wrongly, after which nobody believes any of them. That has to be
designed around, which is why yours waits for a sustained condition, fires once per
episode, and carries its numbers with it.

And notice the third scheduler. launchd on the Mac, systemd on Linux, now cron. Three
mechanisms, three file formats, one idea — something has to be told to run things at
certain times, and it's always configured with text in a file. Meeting the same concept
three times in three costumes is roughly the point at which it stops being a tool you
learned and becomes something you simply expect to find on any machine you're handed.

---

## Go further

- Your monitor watches the server. What watches the monitor? Design something that would
  notice the recorder had stopped — then notice that your new thing has exactly the same
  problem.
- You're recording tick time. What else from earlier in this module would be worth
  recording next to it? Would any of it explain a bad evening that tick time alone can't?
- Graph a whole week instead of a day. Is there a pattern you could have predicted? Is
  there one you couldn't?
- Genuinely open: alerts wake people up. What belongs in a message that arrives at three
  in the morning, and what would make it worth being woken for? There is no settled
  answer — every organisation that runs systems for a living has a different one, and
  they argue about it constantly.
- Also genuinely open: your server will get slower as the world grows — gradually,
  permanently, and without ever crossing a threshold on any particular day. A threshold
  catches sudden problems and is blind to slow drift. What would detect the drift? And
  how would you tell a real trend from an ordinary quiet month?

---

## What you have now

- A performance history for your server, accumulating on its own, on a machine that stays
  on
- A sampling interval chosen for a written reason, against the real shape of your
  server's problems
- A graph of a day, and something in it you didn't know before
- An alert that fires on sustained trouble, into a place people already look — and that
  you have watched fire, on purpose
- Three schedulers, and the recognition that they're one idea in three costumes
- The knowledge that a silent monitor looks exactly like a healthy server, which is the
  thing to design against next
