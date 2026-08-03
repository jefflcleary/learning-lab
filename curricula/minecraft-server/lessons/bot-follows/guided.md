# Making it care where you are

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your bot can arrive and speak. Both of those are single moments — one event, one
action, done. This session is about something categorically different: a behavior
that has to *keep being true while the world changes*. Chat "come" and the bot walks
to whoever called — even as they move. Chat "stay" and it stops. That word,
"continuously," is the entire lesson, and getting a program from *doing a thing* to
*continuously doing a thing* turns out to be where two of programming's biggest
ideas live.

One honest note before you start: today's follower will not be graceful. It walks in
straight lines, which means walls stop it, cliffs claim it, and water confuses it.
That's not you doing it wrong — walking *around* things is a genuinely hard problem
with its own name and its own session, [later in the course](../bot-pathfinding/guided.md),
which exists precisely because of what you'll watch happen today. A creature that
follows people imperfectly is still a creature that follows people, and it's the
intended result.

---

## Before you start

You need:

- **A bot that joins your sandbox and speaks** — built in
  [A player made of code](../first-bot/guided.md). Everything that lesson required still
  holds, including the standing rule: the sandbox stays on your own machine or your
  own wifi, never the internet.

Quick checks that you're ready:

- Start the sandbox; it comes up to its **Done** line.
- In `~/projects/first-bot`, run `node bot.js`: the bot appears in the world and
  says its line.
- Ctrl-C in the bot's terminal makes it leave.

One suggestion before surgery: your current `bot.js` works, and you're about to
operate on it. Keeping a copy of the working version costs one command —
`cp bot.js bot-greeter.js` from inside the project folder — and means you can always
get back to known-good. Do that or don't, but know it's cheap.

---

## What you'll have at the end

By the end of this session you will have:

- A bot that anyone on the sandbox can summon with the chat message "come" — it
  walks to whoever said it, keeps correcting as they move, and stops politely close
- "stay" as the off switch, also for anyone
- Watched your program crash, read the crash message top to bottom, and fixed the
  assumption that caused it
- A working grasp of the two ideas that make ongoing behaviors possible: state, and
  the repeating check

---

## New tools

Nothing to install today. Two ideas arrive instead, and one habit.

**State.** When someone chats "come", a function of yours will run — and end, a
millisecond later. But the *following* has to go on long after that function is
gone. So the answer to "who is the bot following?" has to live somewhere that
outlasts any single function: a variable at the top of the file, which every part
of the program can read and write. A variable used this way is the program's memory
between events. One wrinkle you'll hit: `const`, which you used in first-bot,
declares a name whose value can't be replaced. Memory that must *change* — someone
new calls "come", "stay" wipes it — is declared with `let` instead.

**The repeating check.** The person you're following moves. Whatever aiming you do
at the moment of "come" goes stale a second later, so something has to re-check and
re-aim, over and over, for as long as the program runs. JavaScript has a built-in
for exactly this, and it's plumbing rather than puzzle, so here it is plainly:

```js
setInterval(() => {
  // this runs again and again, forever
}, 200)
```

That runs the function every 200 milliseconds — five times a second — until the
program ends.

**The habit: edit, Ctrl-C, rerun.** A running `node bot.js` is the file *as it was
when you started it*, held in memory. Edits to the file on disk change nothing
until you stop the process (Ctrl-C) and run it again. You've met this exact
principle before — `server.properties` edits didn't land until a restart, for the
same reason. After every change today: Ctrl-C, `node bot.js`, retest.

Your reference for everything bot-shaped today is the mineflayer API documentation
— in the `PrismarineJS/mineflayer` repository on GitHub, alongside the README
you've already read. The hints below will name things to look up; the looking-up is
yours.

---

## Predict

Write your answers down first:

- The bot needs to notice when someone says "come". Given how spawn worked — "when
  X happens, run this function" — what shape do you expect chat-noticing to take?
- Walking toward a *moving* player: how often should the bot re-check where they
  are? Once? Every second? Every step? What would go wrong at each rate?
- What should the bot do when the person it's following climbs somewhere it can't
  walk to? Decide what you think *should* happen — then compare with what does.

---

## The work

Four goals, each standing on the last. Test after every one — join the sandbox, say
the words in chat yourself, and watch.

### Answer the call

Goal: anyone chats "come" → the bot replies in chat, addressing the caller by name
— "On my way, Jeff" — but doesn't move yet. The by-name part is the point: it
proves your code knows *who* called.

<details>
<summary>Stuck? Start here</summary>

You've handled one event already. Chat is another event — but unlike spawn, this
one hands your function information when it fires. Your reply should use that
information.

</details>

<details>
<summary>The concepts, named</summary>

The event is called `chat`. Two things to settle from the docs: what arguments your
function receives when it fires, and the difference between `bot.once` and `bot.on`
— a follower needs to hear *every* message, not just the first. To react only to
the right word, compare the message with `===`, which is JavaScript's "exactly
equal" test.

</details>

<details>
<summary>Where to look</summary>

The `chat` event's entry in the mineflayer API document lists exactly what your
function receives. Testing is you: join the sandbox and type "come" in chat.

</details>

### Turn to face the caller

Goal: on "come", the bot turns on the spot to look at whoever said it. Facing is
one step short of walking, and it proves the harder half: that your code can find a
player's location in the bot's world.

<details>
<summary>Stuck? Start here</summary>

The bot has to be able to answer "where is that player *right now*?" The bot
object carries a directory of everyone online, organized by name — and thanks to
the last goal, you have the caller's name.

</details>

<details>
<summary>The concepts, named</summary>

From a player's directory entry you can reach their in-world body, and from the
body, its position. The bot has a method that turns to face a position. One catch
worth knowing now rather than later: the bot can only "see" players within its
view distance — a player's body information is in the directory only while they're
near enough. Remember this; it comes back.

</details>

<details>
<summary>Where to look</summary>

In the API document: `bot.players` (read what a player entry contains, and when),
positions, and `bot.lookAt`.

</details>

### Walk to the caller, and stop when close

Goal: the real thing. "come" makes the bot walk to the caller — correcting course
as they move — and stop a couple of blocks away instead of shoving them.

<details>
<summary>Stuck? Start here</summary>

Two separate problems. Split them.

Making the bot walk at all works like holding down a movement key — and note what
"holding" implies: a held key stays held until something releases it.

The moving target is the problem you made a prediction about: one aim at
"come"-time goes stale immediately. Something has to re-aim and re-decide, over and
over. You were handed the tool for over-and-over in New tools.

</details>

<details>
<summary>The concepts, named</summary>

This is where both new ideas earn their place, together.

*State:* when "come" arrives, don't start walking inside the handler — just record
the caller's name in a top-level variable (`let`, because it changes) and let the
handler end.

*The repeating check:* a `setInterval` function, running several times a second,
that asks: is anyone being followed? If not, do nothing. If so, look up their
current position, face it, and set the forward control on or off depending on how
far away they are. Distance between two positions is a single method call — the
documentation on positions has it.

And stopping: stopping is not "don't press forward." It's "*release* forward" —
controls stay where you set them until you set them back.

</details>

<details>
<summary>Where to look</summary>

In the API document: `bot.setControlState` (read the list of controls and what the
true/false argument means) and the position type's methods for distance. Workable
starting numbers, tune both by watching: check every 200 milliseconds, stop at
about 2 blocks.

</details>

When it works, spend a minute actually playing with it. Walk in circles — it cuts
the corner to chase you. Back away — it keeps coming. Then lead it at a wall, and
watch the honest limitation arrive on schedule: it walks a straight line at you,
and the wall wins. Today that's expected. Later it's a lesson.

### "stay" means stay

Goal: anyone chats "stay" → the bot stops where it is and stops caring where
people are, until the next "come".

<details>
<summary>Stuck? Start here</summary>

Following is two pieces — the memory and the repeating check. "stay" only needs to
touch the memory... plus deal with whatever the controls happened to be doing at
that exact instant.

</details>

<details>
<summary>The concepts, named</summary>

Clear the state variable — "nobody" is a value too, and `null` is JavaScript's
word for it. And release the forward control. If the bot slides one extra step
after "stay", you did one of those and forgot the other — work out which from what
you see.

</details>

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Never let go.** Comment out the line that releases the forward control — the one
that runs when the target is close. (Putting `//` in front of a line turns it into
a comment: still in the file, invisible to Node.) Rerun, say "come", stand still,
and watch it arrive — and keep walking. Into you, past you, into the wall, legs
churning forever. This is the difference between *doing* and *not-stopping*: the
control is a held key, and state you set stays set until something clears it. A
remarkable amount of the strange behavior in all software is exactly this — state
someone set and forgot to clear. Restore the line, rerun.

**Walk it off its map.** Have the bot follow you, then sprint away or drop behind a
hill until you're well out of its view distance — and watch the bot's terminal, not
the game. The program crashes. Read the whole message before touching anything. It
tells you it tried to read `position` from something that wasn't there: the
player directory only holds a body for players the bot can currently see — you
learned that two goals ago — and your repeating check assumed *forever* something
that was only true *sometimes*. The fix is to check before touching: if the
target's body isn't available this tick, skip the tick — or give up following;
your call, it's a policy decision. Make the fix, rerun, sprint away again, and
prove it survives you.

**Let someone else say "come".** When another player is available on your sandbox —
a housemate, or you from a second machine if you've done
[Joining over LAN](../joining-over-lan/guided.md) — have *them* say "come", and watch.
Whatever happens is a mirror held up to your code: did you store *the caller*, or
did you quietly assume the only person who'd ever call is you? If the bot walks to
them, your code was honest. If it walks to you, or crashes, go find the assumption
— it's in there, written down, wearing your name. Programs meet users their author
didn't imagine, always sooner than expected. Nothing to undo either way.

---

## What just happened

Run the bot and don't say anything in chat. What is the program doing right now?

Almost nothing — and that's the deep fact of the session. An event fires, a handler
runs for a millisecond, everything goes quiet. The interval ticks, checks, goes
quiet again. Between those instants the program isn't "doing" anything at all. The
only thing that carries across the quiet is state — one variable holding one name.
The chat handler writes it; the tick reads it; and the behavior a human watching
the screen would swear they see — "it follows people" — exists *nowhere in the
code as a single thing*. It's what memory plus a repeating check add up to from
the outside.

This shape has a name — the **event loop** — and it is the shape of essentially
every interactive program: games waiting on input, apps waiting on taps, your
Minecraft server itself running its own tick loop twenty times a second to decide
what every mob does next. Node runs an event loop under every program you will
write in this course. You didn't just use one today; you built a creature out of
one.

And the wall, one more time, because it's a real result: your follower is beaten by
terrain, and no amount of polishing *this* approach fixes that. Walking around
obstacles means searching possible routes through the world — a hard problem with a
name, **pathfinding**, and [a session of its own](../bot-pathfinding/guided.md) later.
Knowing exactly where today's tool stops working isn't a defeat. It's what owning a
tool feels like.

---

## Go further

- The controls include more than forward — the API document lists them all. Could
  the bot sprint when the caller is far and walk when they're near? Could a
  well-timed jump carry it up a one-block step?
- Make it follow at a respectful distance — hold itself exactly four blocks away,
  even backing up when you step toward it. What does "exactly" cost you at the
  check rate you picked?
- Two people alternate saying "come" and the bot obeys whoever spoke last. Is that
  the right rule? Design a better one — maybe the bot announces "currently
  following someone" — and decide who, if anyone, can override.
- A genuinely open one: how could a program *tell* that it was stuck? Watching the
  bot churn against a wall, you know instantly — but you're using eyes it doesn't
  have. What would the bot have to remember, and compare across time, to notice
  that about itself? Anything you invent here is a real answer; this exact
  question is a live problem in robotics, not just in Minecraft.

---

## What this leaves behind

- A bot with a chat handler, a state variable, and a repeating check: "come" makes
  it follow the caller, "stay" makes it stop — for anyone on the sandbox
- You've used `on` where `once` won't do, kept memory between events, run a check
  on a timer, and read a real crash message down to the missing thing it named
- The felt difference between an action and an ongoing behavior — and the
  knowledge that controls, once set, stay set
- A precise map of where naive following fails, which is the reason a pathfinding
  session exists later
