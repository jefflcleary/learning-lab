# Three different things called lag

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Somebody says the server seems laggy. You ask what they mean and they shrug, because
the word covers three completely different problems that happen to feel similar from a
chair:

- their own computer can't draw the world fast enough,
- the server can't finish its work in the time it has,
- or the messages between the two are taking too long to arrive.

These have nothing in common underneath. They happen on different computers, for
different reasons, and the fix for one does nothing for the other two. Almost all of
the difficulty in fixing lag is that people skip the step of working out which one
they actually have.

This session is that step. You'll learn to read one measurement for each of the three,
tell them apart from symptoms alone, and answer a real complaint from a real person
with an actual answer instead of a guess. A good share of the time that answer turns
out to be "it's your machine, and here's the setting to change" — which fixes
something for somebody else in about a minute.

You'll also take something less dramatic and more useful: a record of what your server
looks like while it's healthy. Nobody can recognise a bad reading without having seen
a normal one, and the most common reason people can't diagnose their own server is
that they have never once looked at it while nothing was wrong.

Nothing gets installed here. No mods, no tools, no extra machine. Everything you need
is already in the game and already on your computer, which is exactly why this comes
first.

---

## Before you start

You need:

- **A Minecraft server you can start, stop, and join.**
  [Running your own server](../../../minecraft-server/lessons/running-your-own-server/guided.md)
  covers it. Quick check: start it, join it, and find the file it writes its log into.
- **Somebody else who plays on it, or a second device you can join from.** Half of
  this session is comparing what two machines see at the same moment, which needs two
  machines.
  [Letting friends join your server](../../../minecraft-server/lessons/letting-friends-join/guided.md)
  gets you there.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This session leans on the game's own documentation more than most — [Finding the real documentation](../../../../reference/finding-the-docs.md) helps when a search turns up twenty opinion posts instead of the one page that answers the question.

---

## What you'll have at the end

By the end of this session you will have:

- Read all three measurements on your own server — frame rate, tick rate, and latency
  — and know which computer produces each one
- Made your own frame rate visibly terrible on purpose, and confirmed from the numbers
  that the server was fine the entire time
- A symptom table you wrote yourself, that turns "it feels laggy" into "it's the
  server" or "it's your machine" or "it's the connection"
- A recorded baseline for your server while it's healthy, which every measurement you
  take from now on gets compared against
- An answer given to a real person about a real complaint, with a reason behind it

---

## New tools

Nothing to install. These are things you already have and probably haven't looked at.

**The debug screen** is built into Minecraft. It's the wall of text that appears over
your view when you press a function key, and it shows what the game knows about itself
right now — including your frame rate. Minecraft's own wiki documents every line of
it, and it's worth knowing that page exists, because there is a lot on that screen.

**`/tick query`** is a command you type into Minecraft's chat box. It reports how fast
the server is meant to be running and how long its work is actually taking. It's part
of the game, not an add-on. Minecraft's command documentation is where its exact
behaviour lives, and it arrived in a particular version — so if your server is older,
it will tell you it doesn't recognise it, and that's a fine outcome rather than a
problem.

**Your server's log** is the file the server writes everything into, including a
specific complaint it makes when it is falling behind. You already know where it is:
it's the same file you've read whenever the server had something to say.

**`ping`** is a small program that ships with macOS. It sends a message to another
computer and times how long the reply takes, over and over. It has nothing to do with
Minecraft, which is exactly what makes it useful here: it measures the network on its
own, with the game taken out of the picture. `man ping` is its manual.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first. The first one
matters most — keep it, because you'll come back to it at the end.

- When somebody says the server is laggy, what do you do right now? Write down the
  very first thing you would change.
- Imagine the server is perfectly healthy and one player's computer is struggling.
  What does that player see? And what do *you* see, standing right next to them in the
  world?
- Now the reverse. The server is struggling and everyone's computers are excellent.
  What does everybody see?
- Your own camera turns smoothly while a cow walks past in slow motion. Which computer
  is having trouble — and how would you know?
- Of the three problems, which do you think is most often the real answer? Commit to
  one before you find out.

---

## The work

An order worth noticing: you are going to learn all three instruments while everything
is healthy. An instrument you pick up for the first time during an emergency tells you
nothing, because you have no idea what its normal reading looks like.

### Read your own frame rate, and prove that it's yours

Join your server and open the debug screen. Find the frame rate — it updates
constantly, several times a second.

<details>
<summary>Stuck? Start here</summary>

The debug screen is opened with a function key along the top row of the keyboard. On a
Mac those keys are usually mapped to hardware controls like brightness and volume, so
you may need to hold `fn` at the same time to send the actual function key.

</details>

<details>
<summary>Where the number is</summary>

It's in the block of text at the top left, on its own line, with "fps" next to it. The
number moves around constantly — that's normal, and the range matters more than any
single reading.

</details>

Now the experiment, and it's the first time you'll use the method that runs through
this entire module. **Change one thing. Watch one number. Touch nothing else.**

Open your video settings and find render distance. Raise it as far as it will go, and
watch the frame rate. Then take it to the minimum, and watch again.

The interesting part isn't that the number moved. It's this: while it moved, *nothing
about the server changed*. Nobody else on the server saw anything happen. You changed a
setting on your own computer, and a number on your own computer changed in response.
That number belongs to your machine and no other.

Before you close the debug screen, read the whole thing once, top to bottom. Don't hunt
for anything. Most of it will mean nothing to you today. Knowing roughly how much is
there — and that it has been there the whole time — is the point.

### Read the server's tick rate

The server is trying to update the world **twenty times a second**. Each of those
updates is called a **tick**, and each one gets **fifty milliseconds** to do everything
the world needs doing: move every mob, burn every furnace, push every item along every
hopper, grow every crop, in every chunk that's loaded. If all of that doesn't fit into
fifty milliseconds, the tick runs long and the world starts falling behind.

There are two ways to see how that's going, and you should try both, because they fail
in different situations.

**The command.** In Minecraft's chat box:

<span className="run-where run-where-local">In Minecraft's chat box</span>

```
/tick query
```

Read the whole response, not just the first number. It tells you the rate the server is
*aiming* for as well as how long its ticks are actually taking.

<details>
<summary>It says it doesn't recognise the command</summary>

Commands arrive in particular versions of Minecraft, and a server older than a command
will say so rather than guess. Read exactly what it said. Minecraft's own command
documentation lists which version introduced this one — check yours against it.

If your server predates it, nothing here is wasted: the log line below works on every
version, the symptom table works regardless, and a later session in this module
installs a tool that reports tick rate on any server at all.

</details>

**The log.** When a server falls behind, it says so, without anyone asking. Open your
server's log and search it for the word "overloaded".

On a healthy server you will find nothing. **That is a result, not a failure.** A log
with no such line, covering a period when somebody complained, is real evidence that
the server was not the problem. Write down that you looked and found nothing — it
counts.

### Read the latency

Latency is how long a message takes to get from a player's computer to the server and
back again. It's produced by the network in between and by nothing else. Three ways to
see it, from crudest to most precise:

**In the multiplayer server list**, each server has a signal-strength icon on the
right. Hover over it and you get the round trip in milliseconds.

**In the in-game player list** — the one you hold a key to see — there's a connection
indicator next to each player. That one is per-person, which is what you want when one
player is complaining and nobody else is.

**In a terminal**, measured without Minecraft involved at all:

<span className="run-where run-where-local">In a terminal on your Mac</span>

```
ping <your server's address>
```

Let it run for a while — thirty seconds, not one — then stop it with `Ctrl-C`. It
prints a summary when it stops. Two numbers there matter: the average round trip, and
the **packet loss** percentage. Those are different problems. A connection can be quick
on average and still drop messages, and dropped messages are what produce the feeling of
running forward and being yanked back.

If you can arrange it, measure twice: once from a device on the same wifi as the
server, and once from outside the house. The difference between those two numbers is
the internet, and it is worth seeing as a number rather than as an idea.

### Write the table yourself

You now have three instruments and three readings. Before being shown anything, write
down — in your own words, in your logbook — what each one would look like *in the
world* if it went bad. Three rows:

- If a player's **frame rate** collapsed, what would they see?
- If the server's **tick rate** collapsed, what would everybody see?
- If **latency** got bad, what would that look like?

Write all three before reading on.

<details>
<summary>Compare against this once you've written yours</summary>

| What it looks like | Which one | Whose machine |
|---|---|---|
| The picture stutters. Turning your head is jerky. | Frame rate | The player's own computer |
| Your camera turns smoothly, but the *world* is in slow motion — mobs crawl, furnaces are slow, items take a moment to pick up | Tick rate | The server |
| Everything is smooth, but you run forward and get yanked back; blocks reappear after you break them; hits don't land | Latency | The network between them |

The middle row does most of the work, and it's worth remembering on its own: **your
camera is drawn by your own computer, and the world is run by the server.** If your
view turns smoothly while a cow walks in slow motion, your computer is fine and the
server is not.

</details>

### Take the baseline

This is the part that looks like paperwork and isn't.

In your logbook, write down all three numbers for your server, right now, while it's
healthy: your frame rate, the tick rate and how long the ticks are taking, and the
latency. Add the date, how many people were online, and roughly what they were doing.

That record is what every measurement you take for the rest of this module gets
compared against. You cannot recognise an abnormal reading without a normal one, and
the reason most people can't diagnose their own server is that they have only ever
looked at it while it was misbehaving.

### Do a real triage, and tell somebody

Ask the people who play on your server whether they've seen it slow, and when. Then
answer the question properly.

- If something is genuinely slow right now, name which of the three it is, and say how
  you know. The evidence is the point, not the verdict.
- If nothing is slow — which is likely, and fine — then the outcome is that you're
  ready. Say so, and arrange to take the measurements *during* the next complaint
  rather than after it. Being ready when it happens is half of this skill.
- If it turns out to be somebody's own machine, tell them, and tell them which setting
  to change. Their game gets better because you measured something.

Then go back to the very first thing you wrote in your logbook: the change you would
have made before you knew any of this. Would it have helped?

---

## Break it on purpose

**Wreck your own frame rate.** Render distance to maximum. Every graphics option you
can find turned to its most expensive setting. Watch the frame rate fall until the game
is genuinely unpleasant to play.

Now, while it feels terrible, go and check the server's tick rate.

It's fine. It was fine the whole time, and nothing you did touched it. What you have
just manufactured is what a great many lag complaints actually are — and you'll
recognise it instantly the next time somebody describes it, because you've now felt it
on purpose. Put your settings back.

**Set your render distance higher than the server's view-distance.** These are two
different settings with confusingly similar names. **Render distance** is yours, in
your video options: how far *your computer draws*. **view-distance** is the server's,
in `server.properties`: how far the server *sends world* to each player. What you
actually see is the smaller of the two.

Prove it. Check what `server.properties` says for view-distance, then set your render
distance well above it, and go look at the edge of the world. It doesn't move.

That's why "just turn your render distance up" is sometimes advice that cannot possibly
work, and it's worth having seen rather than been told, because view-distance turns out
to be the biggest single lever in this whole subject.

**Watch a connection die rather than slow down.** With the game open and you standing
in the world, turn the wifi off on the machine you're playing on. Watch what happens —
and time how long it takes before the game admits anything is wrong.

Turn it back on and rejoin. What that teaches is the difference between a slow
connection and an absent one, and something more useful: a connection problem does not
announce itself immediately. "It froze for a second" is genuinely ambiguous evidence,
and now you know why.

---

## What just happened

Three numbers, produced by three different computers, describing three unrelated
problems that all arrive in the same sentence.

The player's computer draws frames. How fast it manages that is its own business — the
server neither knows nor cares, and cannot affect it. The server runs ticks: twenty a
second, fifty milliseconds each, and inside every one of them it moves every mob, burns
every furnace, pushes every item along every hopper, and grows every crop in every
loaded chunk. When all of that doesn't fit into fifty milliseconds, the tick runs long,
the world falls behind, and everybody watches it happen in slow motion while their own
cameras keep turning perfectly smoothly. And between those two machines, messages
travel and take however long the network takes. When they arrive late, or don't arrive,
the game guesses where you are and then corrects itself. That correction is the yank
backwards.

Which is why the middle row of that table is so useful. Your camera is local and the
world is remote. The difference between "my view is stuttering" and "the world is in
slow motion" is the difference between two computers in two different buildings.

Two things here are much bigger than Minecraft.

The first is the shape of a tick. A program with a fixed budget, repeated forever, is
how an enormous amount of software works — game servers, audio software, control
systems, anything that has to keep pace with the real world. The budget is the whole
story. Fifty milliseconds isn't fast or slow in the abstract; it's simply the amount
available, and the only question that ever matters is whether the work fits inside it.

The second is the method, which you have now used once deliberately. You changed one
setting and watched one number, and because you changed nothing else, the movement of
that number meant something. If you had changed three settings at once and the game had
felt better afterwards, you would know nothing at all — not which change did it, not
whether two of them made things worse, not whether any of them mattered. Everything
else in this module is built on doing that on purpose, and it is the part that
transfers to every problem you will ever have to debug, in any system, for the rest of
your life.

And the baseline sitting in your logbook isn't housekeeping. It's the reason the next
complaint will take you minutes instead of an evening: you now know what this server
looks like when it's well.

---

## Go further

- You read the debug screen once and most of it meant nothing. Go back, pick three
  lines you didn't understand, and find out what they are. Minecraft's wiki documents
  the screen line by line. How much of what the game knows about itself has been
  sitting there the whole time?
- `/tick query` is one thing the `/tick` command does. What else can it do? One of its
  abilities freezes time completely — think about why that would be useful to somebody
  who is trying to measure something.
- Does a server that has fallen behind make ping look worse? Predict the answer first,
  and then work out a test that would actually tell the two apart rather than one that
  just seems to.
- Genuinely open: a friend's frame rate is bad and you can't see their computer. What
  could you ask them to measure that would tell you *which part* of their machine is
  the limit — the graphics, the processor, the memory, something else entirely? Nobody
  writing this session knows the best set of questions. Work out yours, try it on a
  real person, and write down what you'd ask differently next time.
- Also genuinely open: everything here measures the server as it is right now. What
  would you have to record, and how often, to be able to answer "was it slow last
  Tuesday evening?" There's an answer later in this module, but it doesn't have to be
  the same as yours.

---

## What you have now

- Three measurements you can take on demand — frame rate, tick rate, latency — and the
  knowledge of which computer produces each one
- A symptom table in your own words that turns a shrug into a diagnosis
- Direct experience of a terrible frame rate on a perfectly healthy server, which is
  what most lag complaints turn out to be
- The knowledge that render distance and view-distance are different settings, and
  that the smaller one wins
- A recorded baseline for your server while it's healthy, with a date against it
- One real question answered for a real person, with evidence behind the answer
- A working method: change one thing, watch one number, then conclude
