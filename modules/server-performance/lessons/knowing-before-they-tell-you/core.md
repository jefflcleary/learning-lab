# Watching performance over time

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** knowing-before-they-tell-you
- **Part:** Part 6 — Over time
- **Scaffolding:** level 3 for the recording and the schedule (Python, RCON, and a
  scheduled job are all established skills). Level 2 for the two genuinely new ideas —
  choosing a sampling interval, and choosing a threshold — which are judgement calls
  rather than techniques and are supported accordingly.
- **Deliveries:** guided only.
- **Status:** ready

## Goal and payoff

Everything in this module so far measures the present. A person has to be watching, and
almost every real problem happens when nobody is.

This lesson closes the module by removing the person. The learner writes something that
records the server's performance continuously, keeps the history, and speaks up when the
numbers go bad — so the complaint that started this whole module arrives from the server
itself, before anybody has to say anything.

Payoff other people can see, and it is the module's closing image: a message appears
where the household already talks, saying the server has been struggling for the last ten
minutes, and somebody reads it before they would otherwise have noticed. The learner
built the thing that noticed.

The intellectual payload is the difference between a **snapshot** and a **time series**.
Every measurement so far answered "how is it now". None of them can answer "was it slow
last Tuesday evening", and no amount of cleverness recovers data that was never recorded.
That asymmetry — you can analyse recorded data any way you like later, and you can never
go back and record it — is one of the most useful things anybody learns about operating
systems of any kind.

## Prerequisites

- A server that is measurably tuned, and a signature table — established by
  `modules/server-performance/lessons/changes-that-help/` and
  `modules/server-performance/lessons/making-it-slow-on-purpose/`. Thresholds are chosen
  against known-bad numbers, so the experiments have to have happened.
- Python, and sending commands to a running server with RCON — established by
  `modules/minecraft-server/lessons/python-logs-and-rcon/`
- A Discord bridge, or another place messages already land where people look —
  established by `modules/minecraft-server/lessons/discord-and-web/`
- A machine that stays on, where a scheduled job can run — established by
  `modules/minecraft-server/lessons/rented-linux-machine/`. A recorder that only runs
  while a laptop is open records exactly the hours when nothing was wrong.

## Establishes

- A recorded performance history for the server, and something that raises an alarm
  against it — cited as: "the learner records server performance over time and is
  alerted to degradation — established by
  `modules/server-performance/lessons/knowing-before-they-tell-you/`."
- Vocabulary: time series, sampling interval, threshold, false alarm, missed detection,
  observer cost.
- `cron` as a third scheduling system, next to launchd and systemd.

## Facts

### Where commands run

- **In a terminal on your Mac** — writing and testing the recorder.
- **On the machine running your server** — running it for real, the scheduled job, and
  the file the history accumulates in.

### Snapshot and time series

- Every measurement in this module so far is a **snapshot**: true at the moment it was
  taken and gone afterwards.
- A **time series** is the same measurement repeated on a schedule and kept, with a
  timestamp against each reading. It answers a category of question a snapshot cannot
  touch: was it slow last Tuesday, is it worse than last month, does it get bad at the
  same time every evening, did that change actually help over weeks rather than minutes.
- The asymmetry worth stating outright: recorded data can be analysed any way you like
  afterwards, and data never recorded is gone permanently. This is why people instrument
  things before they have a problem.

### Recording

- The simplest useful recorder: ask the server for its numbers on a schedule, append one
  line per reading to a file, with a timestamp.
- **RCON** is the route, and the learner already has it: a script connects, sends the
  command that reports tick time, reads the reply, and writes a line. Where spark is
  installed, its tick command reports the distribution rather than just an average, which
  is worth recording in full.
- One line per reading, with a timestamp first, is the whole format. Comma-separated is
  enough. Deliveries must resist proposing a database; the point is the history existing,
  not its storage.
- Parsing the reply is the fiddly part and is genuinely the learner's problem to solve —
  it is the same log-parsing skill from the Python lesson, applied to a command's output
  instead of a log line. [volatile as of 2026-09: the exact text of both `/tick query`
  and spark's output. Deliveries must not print a regular expression to copy; the
  learner reads their own server's actual reply and writes a parser for it, which is the
  durable version of the skill.]

### The sampling interval

- Too long, and short problems fall between readings entirely. A ninety-second spike is
  invisible to a recorder that samples every five minutes, and worse than invisible — the
  history will positively assert that nothing happened.
- Too short, and the recorder itself costs something: an RCON connection, a command, and
  a write, over and over, forever. Small, but not nothing, and a monitoring system that
  degrades the thing it monitors is a genuine and common failure.
- **Observer cost** is the name for that, and it deserves naming: measuring a system
  changes it, and the only question is by how much.
- There is no correct interval, only a trade the learner has to make knowingly against
  the shape of the problems in their own signature table. That is why this is a judgement
  call and gets support rather than an answer.

### Scheduling

- **`cron`** is the traditional Unix scheduler: a table of "run this command at these
  times". `crontab -e` edits it, `crontab -l` prints it. The time format is five fields —
  minute, hour, day of month, month, day of week — and is famously easy to get wrong.
  [verify current Ubuntu behaviour as of 2026-09; deliveries point at `man 5 crontab`]
- This is the learner's third scheduler, after launchd on macOS and systemd on Linux.
  Deliveries should name that explicitly: the same idea in a third costume, and systemd
  can also do this job with a timer — worth knowing that two mechanisms on the same
  machine overlap.
- A scheduled job runs with a different environment and a different working directory
  from a terminal. This is the single most common reason a script that worked by hand
  does nothing on a schedule, it produces no error anybody sees, and deliveries must warn
  about it plainly — absolute paths everywhere, and send the output somewhere readable.

### Alerting

- An alert is a threshold plus a message. Both halves are decisions.
- **False alarm** and **missed detection** are the two failure modes, and they trade
  against each other. A threshold tight enough to catch everything cries wolf; one loose
  enough never to cry wolf misses things.
- The failure that actually kills monitoring systems is the first one: people stop
  reading alerts that are usually wrong, and then the real one arrives and nobody looks.
  Deliveries must state this, because the instinct is always to set the threshold tight.
- Practical mitigations, all of which the learner can implement: alert on a *sustained*
  condition rather than a single reading; alert once per episode rather than once per
  sample; include the numbers in the message so a human can judge it in one glance.
- Thresholds are chosen against the signature table: the learner already knows what
  numbers this server produces when specific things are wrong, which is exactly the
  information a threshold needs and which almost nobody has.

### Reading the history

- A file of readings is not insight until it is looked at. A graph over a day or a week
  is where daily patterns become visible — the evening peak, the backup at 3 a.m., the
  slow drift as a world grows.
- Deliberately open about tooling: a spreadsheet is a completely legitimate answer, and
  so is a Python plotting library. The lesson is the looking, not the tool.

## Arc

### Orientation — given plainly

Snapshot versus time series and why the asymmetry matters; RCON as the route to the
numbers; the one-line-per-reading format; `cron` and its relationship to the two
schedulers already met; the environment gotcha; observer cost; and the two failure modes
of alerting with the warning that false alarms are the ones that kill a monitoring
system.

Framing sentence: every measurement so far required somebody to be watching, and nobody
is watching at three in the morning, or during dinner, or on the Tuesday when it actually
happened.

### Predictions to elicit

- Somebody says the server was terrible last Tuesday evening. With everything you have
  built so far, can you find out whether they were right? What exactly stops you?
- You are going to record a number every few minutes forever. What could go wrong with
  measuring too often? What could go wrong with measuring too rarely?
- If your recorder sends a message every time a single reading looks bad, what happens
  after two weeks?
- Look at your signature table. Which of your six causes would a reading every five
  minutes definitely catch? Which would it definitely miss?

### The work — goals and hint ladders

**1. Record one reading.** A script that connects over RCON, asks for the numbers, and
prints them. Nothing scheduled, nothing stored. Establish that the connection and the
parsing work before adding anything.

- The parsing is the learner's problem, and deliveries must not hand over a pattern to
  copy. Rung 1: you have parsed lines of text out of a log before; a command's reply is
  a line of text. Rung 2: print the raw reply first and read it character by character
  before writing anything that pulls it apart — what you assume it looks like and what it
  looks like are frequently different.

**2. Append it to a file, with a timestamp.** One line per reading. Run it a few times by
hand and look at the file.

**3. Choose an interval, with a reason.** Against the signature table: which of the six
causes produces something long enough to be caught at the interval chosen, and which
would slip through? Write the reasoning down next to the number. The reasoning is the
deliverable, not the number.

**4. Put it on a schedule.** `cron` on the machine that stays on. Then the step
deliveries must insist on: **confirm it actually ran**, by looking at the file rather
than assuming. A scheduled job that silently does nothing is the normal outcome of the
first attempt, and the causes are nearly always the environment or a relative path.

- Rung 1: it worked when you ran it and does nothing on a schedule. What is different
  about how a scheduled job runs compared with your terminal?
- Rung 2: different working directory, different environment, often a different set of
  places it looks for programs. Absolute paths everywhere, and send the output to a file
  you can read afterwards.

**5. Look at a day.** Once there is enough history, graph it. Find something you did not
know: an evening peak, a nightly job, a slow drift. Deliveries should treat "I found
nothing interesting" as an acceptable outcome and note that a week will show more than a
day.

**6. Alert.** A sustained bad condition sends a message where people already look.

- The threshold comes from the signature table.
- Sustained, not single-reading. Once per episode, not once per sample. Numbers included
  in the message.
- Then test it by causing a problem on purpose — one of the six, on the expendable
  server — and watching the message arrive. An alerting system that has never fired is a
  guess.

**7. Wait for it to be right.** The lesson does not end at the last commit. It ends the
first time the server tells somebody about a problem before a person did, and that will
happen days or weeks later. Deliveries must say so, and must ask the learner to write
that moment down in the logbook when it comes.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Set the threshold far too tight.** Choose a value that ordinary evening load will
  cross, and leave it for a day. Read the messages. Notice how quickly you stop reading
  them properly — that is the failure mode, felt on a scale of hours instead of months.
  Undo: set it against the signature table instead.
- **Set the interval far too long.** One reading an hour, then cause a two-minute problem
  from the previous lesson. The history will show a completely healthy server across the
  window in which the server was unusable. Teaches that a recorded "nothing happened" is
  only as strong as the interval that produced it, and that absence of evidence in a time
  series is a much weaker claim than it looks. Undo: restore the interval.
- **Break the schedule without noticing.** Rename or move the script, and leave it for a
  day. Nothing complains. The file simply stops growing, and the alerting stays quiet —
  which reads exactly like a healthy server. Teaches the hardest thing about monitoring:
  a silent monitor and a healthy system are indistinguishable unless something checks
  that the monitor is alive. Undo: fix the path, and think about how you would detect
  this next time.

### What just happened — the explanation

You removed the person from the loop, which is the last thing standing between measuring
and operating.

The difference between a snapshot and a time series is not a matter of degree. A snapshot
answers how things are; a time series answers how things have been, and that second
category contains almost every interesting question about a system that runs
continuously. Is it worse than last month. Does it happen at the same time every day. Did
that change help over weeks, or did it just happen to be quiet on the afternoon you
tested it. And the asymmetry is total: recorded data can be interrogated any way you like
later, and data you did not record is gone forever. Which is why people instrument
systems before they have a problem — not because they are organised, but because the
alternative is being unable to answer anything on the day it matters.

The sampling interval is the first real trade in this module with no correct answer.
Sample too rarely and you miss things, and worse, your history confidently reports that
nothing happened. Sample too often and the monitoring itself becomes a cost — and a
monitor that degrades what it monitors is a genuine and embarrassing failure mode with a
long history. What made your choice defensible was not cleverness; it was that you had a
table of what your server's actual problems look like, so you could reason about which
ones would fall between readings.

The alerting trade is the same shape and higher stakes. A threshold tight enough to catch
everything cries wolf, and the thing that kills a monitoring system is never a missed
alert — it is a hundred false ones, after which nobody reads any of them and the real one
arrives to an empty room. That is a human failure and it has to be designed around, which
is why the alert waits for a sustained condition, fires once per episode, and carries its
numbers with it.

And the third scheduler is worth noticing. launchd on the Mac, systemd on Linux, now
cron. Three mechanisms, three file formats, one idea: something has to be told to run
things at times, and it is configured with text. You have now met the same concept three
times in three costumes, which is roughly the point at which it stops being a tool and
becomes something you expect to find on any machine you meet.

### Go further — open questions

- Your monitor watches the server. What watches the monitor? Design something that would
  notice the recorder had stopped, and consider why that thing has the same problem.
- You record tick time. What else, from earlier in this module, would be worth recording
  next to it — and would any of it explain a bad evening that tick time alone cannot?
- Graph a whole week rather than a day. Is there a pattern you could have predicted, and
  one you could not?
- Genuinely open: alerts wake people up. What belongs in a message that arrives at three
  in the morning, and what would make it worth being woken for? Nobody writing this
  lesson knows the right answer, and every organisation that runs systems for a living
  has a different one and argues about it constantly.
- Also genuinely open: your server will get slower as the world grows, permanently and
  gradually. A threshold catches sudden problems and is blind to slow drift. What would
  detect the drift, and how would you tell a real trend from an ordinary quiet month?

## Delivery notes

- **guided:** level 3 for the code and the schedule; level 2 for the interval and
  threshold decisions, which are judgement and get supported reasoning rather than
  answers.
- **Never print a parsing pattern to copy.** The learner reads their own server's actual
  reply and writes a parser for it. Both the output formats involved are volatile, and
  the parsing is the transferable half of the skill.
- Do not propose a database, a metrics stack, or a dashboard product. One line per
  reading in a file is the correct scope, and reaching for infrastructure here would
  bury the idea under tooling.
- The "confirm it actually ran" step is not optional and must be its own instruction.
  Silent failure is the normal first outcome of a scheduled job.
- Step 7 must be kept: the lesson's real ending happens days later, and the delivery
  should ask for it to be recorded when it does.
- The third-scheduler observation is a genuine payoff of the module's position in the
  lab. Keep it, and keep it short.
- No reference delivery.
