# Three different things called lag

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** three-kinds-of-slow
- **Part:** Part 0 — What "slow" means
- **Scaffolding:** level 1 — first lesson of the measuring-and-diagnosing skill, and
  the first lesson of this module. Reasoning shown throughout, all hints available.
- **Deliveries:** guided only. Nothing is installed and nothing needs an adult to
  execute ahead of time, so the reference profile has no audience here.
- **Status:** ready

## Goal and payoff

The learner takes the complaint that started this module — "it seems laggy" — and
turns it into a specific, evidenced answer: which of three unrelated problems it
actually is, on whose machine, with a number to back it.

Three separate things get called lag, and they have nothing in common underneath:

- the player's own computer failing to draw the world fast enough,
- the server failing to finish its work in the time it has,
- the connection between them taking too long to carry messages.

Payoff other people can see, and the reason this lesson is first: the learner answers
a real complaint from a real person with a real answer, and about half the time that
answer is "it's your machine, and here is the setting to change" — which fixes
something for someone else, immediately, at no cost.

The second payoff is quieter and matters more for the module: the learner ends with a
**recorded healthy baseline**. Every later lesson compares against it. A measurement
of a server that turns out to be fine is not a wasted measurement; it is the only
thing that makes "bad" recognisable later.

## Prerequisites

- A Minecraft server you can start, stop, and join — established by
  `modules/minecraft-server/lessons/running-your-own-server/`
- At least one other person plays on it, or you can join it from a second device.
  Half of this lesson is comparing what two machines see at the same moment —
  established by `modules/minecraft-server/lessons/letting-friends-join/`

Nothing is installed. No mods, no profiler, no rented machine, no programming. This
is deliberate and is why the lesson is first: it is the highest-value thing in the
module and it costs nothing to reach.

## Establishes

- The learner can tell frame rate, tick rate, and latency apart from symptoms alone,
  and can measure each one — cited by other cores as: "the learner can distinguish
  frame rate, tick rate, and latency, and measure each — established by
  `modules/server-performance/lessons/three-kinds-of-slow/`."
- Vocabulary later lessons may use freely: frame rate, tick, tick rate, milliseconds
  per tick, latency, round trip, client, server, baseline.
- A recorded baseline in the learner's logbook: the three numbers for their own
  server, healthy, with the date and what was happening at the time.
- The method the rest of the module enforces: change one thing, watch one number,
  before concluding anything.

## Facts

### Where commands run

This lesson's commands are typed in two different places, so every code block in
every delivery carries a where-to-run label (rule in `authoring/PRINCIPLES.md`). Both
places are on the reader's own machine, so both take the local variant; the label text
names the interface, which is what actually varies here:

- **In Minecraft's chat box** — `/tick query`.
- **In a terminal on your Mac** — `ping`.

Reading the server's log happens wherever the server runs, which may be the same
machine or another one; the deliveries phrase that as prose rather than as a labelled
block, because the answer differs per learner.

### The three things

- **Frame rate** (frames per second, fps) is how many times per second the player's
  own computer draws the world. It is produced entirely by that computer. The server
  has no involvement in it whatsoever, and cannot affect it.
- **Tick rate** is how many times per second the server updates the world. Minecraft
  targets **20 ticks per second**, which gives each tick **50 milliseconds** to do
  everything the world needs: move every mob, run every furnace, grow every crop, tick
  every hopper. If the work doesn't fit in 50ms, the tick runs long and the rate falls.
- **Latency** (also ping, round trip time) is how long a message takes to get from the
  player's computer to the server and back. Produced by the network between them and
  by nothing else.

These three are independent. A server at a perfect 20 ticks per second can feel awful
to a player whose computer manages 12 frames a second. A player with a flawless frame
rate and a 15ms ping still sees a world in slow motion if the server is behind.

### Telling them apart from symptoms — the lesson's central artifact

| What it looks like | Which one | Whose machine |
|---|---|---|
| The picture stutters. Turning your head is jerky. | Frame rate | The player's own computer |
| Your camera turns smoothly, but the *world* is in slow motion — mobs crawl, furnaces are slow, items take a moment to pick up | Tick rate | The server |
| Everything is smooth, but you run forward and get yanked back; blocks reappear after you break them; hits don't land | Latency | The network between them |

The middle row is the one that does the work, and it is worth stating as a rule of
thumb in its own right: **your camera is drawn by your own computer, and the world is
run by the server.** If your view turns smoothly while a cow walks in slow motion,
your computer is fine and the server is not.

### Reading each one

- [macos] **The debug screen** is opened with F3 — on a Mac, often `fn`+`F3`, because
  the top row is mapped to hardware controls by default [verify current default and
  wording as of 2026-09; deliveries: have the learner try both rather than asserting
  one]. Frame rate is in the top-left block.
- The debug screen shows a great deal more than frame rate. Deliveries should have the
  learner read the whole thing once — the read-the-surface habit — without hunting for
  anything in particular.
- **`/tick query`** is a vanilla command that reports the server's target tick rate and
  how long its ticks are actually taking. It arrived in the 1.20.x series [volatile as
  of 2026-09 — deliveries: point at Minecraft's own command documentation, and have the
  learner try it; a server too old to have it says so]. This matters a lot for this
  module: tick rate is measurable with no mods and no tools at all.
- **The server's own log line.** When a server falls behind it writes a line of the
  form "Can't keep up! Is the server overloaded? Running Nms or N ticks behind" into
  its log and console. It is the single most useful signal available on a plain server,
  and it is written without anyone asking for it. **Its absence is data too** — a log
  with no such line, over a period when someone complained, is evidence that the server
  was not the problem.
- **Latency** appears in two places without any tools: the multiplayer server list
  shows a signal-strength icon per server, with the round trip in milliseconds when
  hovered; and the in-game player list shows a connection indicator per player.
- **`ping <address>`** in a terminal measures the round trip to the server's machine
  independently of Minecraft entirely, which is what makes it useful: it separates "the
  network is slow" from "Minecraft is slow". It ships with macOS. `Ctrl-C` stops it, and
  it prints a summary including packet loss when it does.
- Packet loss is worth naming separately from latency: a connection can be fast on
  average and still drop messages, and dropped messages are what produce the
  yanked-backwards symptom. `ping`'s closing summary reports it as a percentage.

### The confusion that catches everyone

Two different settings are called something like "distance", and they are not the same
thing:

- **Render distance** is a client setting, in the player's own video options. It is how
  far *their computer draws*. Raising it lowers their frame rate and does nothing to
  the server.
- **view-distance** is a server setting, in `server.properties`. It is how far the
  server *sends* world to each player. Raising it costs the server work and bandwidth
  for every player.

The effective distance a player sees is the **smaller of the two**. This is why a
player who raises their render distance and sees no change is not imagining it, and
why "turn your render distance up" is sometimes useless advice. Naming this here saves
confusion in every later lesson, since view-distance is the biggest single lever in the
module.

### Ordering, and why this lesson is first

The cheapest check comes first, and by frequency the most common answer to "the server
is laggy" is that the server is fine. Every other diagnostic effort in this module is
wasted until the three have been told apart. Deliveries should say this plainly rather
than implying it.

### The method being installed

Change one thing, watch one number, then conclude. The lesson exercises it once,
deliberately and visibly, in the frame-rate experiment: one setting moves, one number
moves, nothing else is touched. Later lessons enforce it as a rule; this is where the
learner does it for the first time and sees why it is convincing.

## Arc

### Orientation — given plainly

All of the Facts section. What the three things are, what produces each, that they are
independent, how each is read, and the render-distance/view-distance confusion. None of
this is withheld: a learner cannot derive that the server writes a "Can't keep up"
line, and hiding it would only teach that the material is unhelpful.

The framing sentence: "laggy" is not one problem with several causes. It is three
unrelated problems that happen to feel similar from a chair, and almost all of the
difficulty in fixing lag is that people skip the step of working out which one they
have.

The order of the work is stated up front and justified: learn to read all three
instruments while everything is healthy, because an instrument you first pick up during
an emergency tells you nothing — you have no idea what its normal reading looks like.

### Predictions to elicit

- When somebody says the server is laggy, what do you do about it right now? Write down
  the first thing you would change. Keep it; you will want it at the end.
- Imagine the server is perfectly healthy and one player's computer is struggling. What
  does that player see? What do *you* see, standing next to them in the world?
- Now the reverse: the server is struggling and every player's computer is excellent.
  What does everyone see?
- Your own camera turns smoothly while a cow walks in slow motion. Which computer is
  having trouble — and how do you know?
- Of the three, which do you think is most often the real answer? Commit to one.

### The work — goals and hint ladders

**1. Read your own frame rate, and prove it is yours.** Open the debug screen and find
the frame rate. Then the experiment, which is the first time the module's method is
used: change your render distance — one setting — and watch the number, without
touching anything else.

- Raise it as far as it goes. Watch the frame rate. Lower it to the minimum. Watch it
  again.
- The important observation is not that the number moved. It is that **nothing about
  the server changed while it moved**, and nobody else on the server saw anything at
  all. You changed a number on your own computer, by changing a setting on your own
  computer.
- Read the rest of the debug screen once, top to bottom, without looking for anything.
  Most of it will be meaningless today. Knowing how much is there is the point.
- Rung 1: the debug screen is opened with a function key. On a Mac the top row may
  need `fn` held down.
- Rung 2: frame rate is in the top-left block, on its own line, updating constantly.

**2. Read the server's tick rate.** Two independent ways, and the learner should try
both, because they fail in different circumstances.

- `/tick query` in the chat box. Read the whole response, including the target rate,
  not only the current one.
- The log. Search it for the phrase the server uses when it falls behind. On a healthy
  server it will not be there — and the learner should be told explicitly that finding
  nothing is a successful outcome and worth recording.
- Rung 1 (if `/tick query` is unrecognised): commands arrive in particular Minecraft
  versions, and a server older than the command will say it doesn't know it. What does
  the server's response actually say?
- Rung 2: Minecraft's own command documentation lists which version introduced it. If
  your server predates it, the log line and the symptom table still work, and the later
  lessons in this module will install a tool that reports it on any version.

**3. Read the latency.** Three ways, from crudest to most precise:

- The signal icon in the multiplayer server list, hovered.
- The connection indicator against each player in the in-game player list.
- `ping` in a terminal, against the server's address, which measures the network
  without Minecraft's involvement. Let it run for a while rather than a second, and
  read the summary it prints when stopped — the average, and the packet loss.
- Then a comparison, if it can be arranged: the same measurement from a device on the
  same wifi and from one outside the house. The difference between those two numbers
  is the internet, made visible.

**4. Build the table yourself.** Rather than being handed the symptom table, the
learner assembles it from what they have just seen: three instruments, three readings,
and for each one a sentence in their own words about what it would look like in the
world if that number went bad. Deliveries give the table afterwards, as a comparison
against what the learner wrote — not before.

**5. Take the baseline.** The deliverable. In the logbook: the three numbers for this
server, right now, while it is healthy — frame rate, tick rate and milliseconds per
tick, latency — plus the date, how many people were on, and what they were doing. This
is what every later measurement in this module is compared against.

Deliveries must frame this as a real result rather than housekeeping. Nobody can
recognise an abnormal reading without a normal one, and the most common reason people
cannot diagnose their own server is that they have never once looked at it while it
was fine.

**6. Do a real triage, and tell someone.** Ask the people who play whether they have
seen it slow, and when. Then answer the question with the three instruments.

- If something is genuinely slow, name which of the three it is and say how you know.
- If nothing is slow right now, that is a legitimate and common outcome: record it, and
  arrange to measure *during* the next complaint rather than after it. Half of this
  skill is being ready when it happens.
- If the answer turns out to be a player's own machine — which it often does — tell
  them, and tell them which setting to change. This is the socially visible payoff:
  somebody else's game gets better because of a measurement the learner took.
- Finally, look back at the prediction from the start: the first thing you would have
  changed. Would it have helped?

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Wreck your own frame rate.** Render distance to maximum, every graphics option to
  the most expensive setting available. Watch the frame rate fall until the game is
  visibly unpleasant. Now — with the game feeling terrible — check the server's tick
  rate. It is fine. Nothing is wrong with the server, and nothing was ever wrong with
  the server. This is what most lag complaints actually are, manufactured deliberately
  so it can be recognised later. Undo: put the settings back.
- **Set your render distance higher than the server's view-distance.** Raise render
  distance well above whatever `server.properties` says, and go and look at the edge of
  the world. It does not get further away. The smaller number wins, and the learner has
  now seen it rather than been told it. Teaches why "turn your render distance up" is
  sometimes advice that cannot possibly work. Undo: nothing to undo; put the setting
  back where it was comfortable.
- **Watch a connection die rather than slow down.** With the game open and running,
  turn off the wifi on the machine you are playing on. Watch what happens, and how long
  it takes before the game admits it. Then turn it back on. Teaches the difference
  between a slow connection and an absent one, and — more usefully — that a connection
  problem does not announce itself immediately, so "it froze for a moment" is
  genuinely ambiguous evidence. Undo: reconnect and rejoin.

### What just happened — the explanation

Three numbers, produced by three different computers, describing three unrelated
problems that all arrive in the same sentence: "it's laggy."

The player's computer draws frames. However fast or slow it does that is its own
business; the server neither knows nor cares. The server runs ticks — twenty a second,
fifty milliseconds each — and inside each one it moves every mob, burns every furnace,
pushes every item along every hopper, and grows every crop in every loaded chunk. If
all of that does not fit into fifty milliseconds, the tick runs long, the world falls
behind, and everyone sees it happen in slow motion while their own cameras keep turning
perfectly smoothly. And between those two machines, messages travel, taking however
long the network takes. When they arrive late or not at all, the game guesses where you
are, and then corrects itself — which is the yank backwards.

That is why the middle row of the table is so useful. The camera is local and the world
is remote, so the difference between "my view is stuttering" and "the world is in slow
motion" is the difference between two computers in different buildings.

Two things worth taking out of this lesson beyond Minecraft entirely.

The first is the shape of the tick. A program with a fixed budget, repeated forever, is
how a great deal of software works — game servers, audio software, control systems,
anything that has to keep up with the real world. The budget is the whole story: fifty
milliseconds is not slow or fast in the abstract, it is simply the amount available,
and the only question that matters is whether the work fits.

The second is the method, which you have now used once. You changed one setting and
watched one number, and because you changed nothing else, the number's movement meant
something. Had you changed three settings at once and watched the game feel better, you
would know nothing at all — not which change did it, not whether two of them made
things worse, not whether any of them mattered. Everything else in this module is built
on doing that deliberately, and it is the part that transfers to every problem you will
ever debug.

And the baseline in your logbook is not an administrative chore. It is the reason you
will be able to answer the next complaint in minutes: you will know what this server
looks like when it is well.

### Go further — open questions

- You read the debug screen once. Go back and pick three lines you didn't understand,
  and find out what they mean. Minecraft's wiki documents the screen. How much of what
  the game knows about itself is sitting on that screen all the time?
- `/tick query` is one thing the `/tick` command does. What else can it do? One of its
  abilities lets you freeze time entirely — what would that be useful for when you are
  trying to measure something?
- Does a server that has fallen behind make ping look worse? Predict the answer first,
  then work out a way to test it that would actually distinguish the two.
- Genuinely open: a friend's frame rate is bad and you cannot see their computer. What
  could you ask them to measure that would tell you *which part* of their machine is
  the limit — the graphics, the processor, the memory, something else? Nobody writing
  this lesson knows the best set of questions to ask. Work out yours, use it on a real
  person, and write down what you'd ask differently next time.
- Also genuinely open: everything here measures the server as it is right now. What
  would you have to record, and how often, to be able to answer "was it slow last
  Tuesday evening?" A later lesson in this module builds one answer, but yours does not
  have to match it.

## Delivery notes

- **guided:** level 1 throughout — this is the first lesson of the module and of the
  measuring skill, and reasoning is shown rather than implied. Do not compress the
  three-instruments sequence into a list of commands; the point is that each one is
  picked up while everything is healthy.
- The symptom table is given *after* the learner writes their own version in step 4,
  never before. Presenting it first turns the lesson into a page to memorise.
- No reference delivery. Nothing is installed and nothing needs doing in advance, so
  the reference profile has no reader here. If a later lesson in this module is
  setup-heavy, that one gets a reference; this one does not.
- Volatile: the debug-screen key on macOS, and which Minecraft version introduced
  `/tick query`. Deliveries point at Minecraft's own documentation and have the learner
  try it, and must handle the case of a server too old for the command without treating
  it as a failure.
- The baseline in step 5 must not read as housekeeping. It is the lesson's second
  deliverable and the module's foundation; if a delivery makes it sound optional, that
  is a bug in the delivery.
- The frequency claim — that most lag complaints are the complainer's own machine — is
  stated as the reason for the ordering, not as a statistic. Do not attach a number to
  it.
- **Open question for the labelling primitive:** this lesson's where-to-run labels
  name *interfaces* (a chat box, a terminal) rather than machines, because both places
  are on the reader's own computer. The colour still reads correctly — both are the
  local variant — but the module that motivated the primitive was distinguishing
  machines, and this is a second axis. Worth watching across the next few lessons
  before deciding whether the vocabulary needs a third variant or whether the label
  text carrying the interface is sufficient.
