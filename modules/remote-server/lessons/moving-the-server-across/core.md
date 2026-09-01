# Moving the server across

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** moving-the-server-across
- **Part:** Part 3 — Moving in
- **Scaffolding:** level 2 — the mechanics echo skills already held (copying worlds from
  the backups lesson, ports from the friends-joining lesson). Goals plus hints; concepts
  named but not applied for the learner.
- **Deliveries:** guided + reference.
- **Status:** ready

## Goal and payoff

The world stops being on the learner's computer. By the end the server is running on the
rented machine and the learner has joined it, from their own Mac, at an address that has
nothing to do with their house.

The lesson deliberately stops before automating anything. The server is started **by
hand**, once, and joined. If something is wrong with the copy, the learner finds out
while there is exactly one thing that could be at fault — and proving one layer at a time
is the method the whole lab teaches, applied at the moment it pays best.

Payoff: joining your own server at a new address, having watched a familiar startup log
scroll past on a machine two thousand miles away. Same program, new home.

The quiet surprise worth pointing at: `eula.txt` travels with the folder, already
accepted, and so do `whitelist.json` and `ops.json`. Nothing has to be set up again on
the far side. The friends who were allowed in are still allowed in, because the list of
them is a file, and files copy.

## Prerequisites

- A rented machine with a non-root user, `sudo`, and a firewall — established by
  `modules/remote-server/lessons/locking-the-front-door/`
- A Minecraft server folder on your own computer you can start, stop, and join —
  established by `modules/minecraft-server/lessons/running-your-own-server/`
- A backup you have actually restored from, and a way to take a fresh one — established
  by `modules/minecraft-server/lessons/worlds-and-backups/`. The world is about to travel
  across a network for the first time, and that is done with a proven safety net or not
  at all.

## Establishes

- The Minecraft server runs on the rented machine, started by hand, and is joinable at
  its public address — cited as: "the server folder is on the rented machine and runs
  there — established by `modules/remote-server/lessons/moving-the-server-across/`."
- Java installed on the machine; `apt` used for the first time.
- Minecraft's port open in the firewall.
- The learner can copy folders between machines with `rsync`, including the dry-run habit.

## Facts

### Where commands run

- **On your Mac** (local variant) — stopping the local server, and every `rsync` that
  pushes the folder up. rsync is always driven from the Mac, never from the far side.
- **On the rented machine** (remote variant) — `apt`, `ufw`, `ls`, and the hand-run
  server.

### Installing software on Ubuntu

- `apt` is Ubuntu's package manager: it installs software from Ubuntu's own catalogue.
  `sudo apt update` refreshes the catalogue; `sudo apt install <name>` installs. It is
  the same job Homebrew does on a Mac, on a different operating system, and naming that
  equivalence is free — two instances is what turns a memorised command into an idea.
- Java: `sudo apt install openjdk-<N>-jre-headless`. **JRE** is the part that runs Java
  programs, as opposed to the JDK which also compiles them. **headless** is the build
  without graphical components, which a machine with no screen has no use for.
  [volatile as of 2026-09: which Java version the current Minecraft server requires —
  deliveries point at Minecraft's own server requirements, and at the error the server
  itself prints when the version is wrong, which names what it wanted.]
- `which java` prints the absolute path, needed by the unit file in the next lesson.
- Java does **not** travel in the server folder, which is why it is installed first.

### Copying with rsync

- `rsync` copies files and whole folders, locally or between machines over SSH. It ships
  with macOS. [macos]
- Form: `rsync -av --progress <source>/ <user>@<address>:<destination>/`
- `-a` (archive) copies recursively and preserves timestamps and permissions; `-v` is
  verbose; `--progress` shows progress on large files; `-z` compresses in transit, which
  helps on a slow upload.
- **The trailing slash on the source is load-bearing and catches everyone.** `folder/`
  copies the *contents* into the destination; `folder` copies the folder itself,
  producing `destination/folder`. Deliveries must state this and should have the learner
  see both outcomes with `--dry-run`.
- `--dry-run` performs no copying and prints exactly what would happen. It costs nothing,
  and it is the habit worth installing: look before a network copy, every time. It is the
  same discipline as reading an error before changing anything, applied one step earlier.
- `--delete` makes the destination match the source exactly, deleting anything extra at
  the destination. It is not used in this lesson and is named only as a hazard, because
  it appears in nearly every rsync example on the internet.
- **The server must be stopped before the world is copied.** A world being written to
  while it is read produces a copy of a state that never existed as a whole. This is the
  same rule met in `modules/minecraft-server/lessons/worlds-and-backups/`, arriving for
  the second time with a new consequence.
- What travels in the folder, and it is more than people expect: the world,
  `server.properties`, `whitelist.json`, `ops.json`, any datapacks, and `eula.txt` with
  the agreement already accepted.

### The port and the firewall

- Minecraft listens on 25565 by default — a fact already held from
  `modules/minecraft-server/lessons/letting-friends-join/`.
- `sudo ufw allow 25565`, then `sudo ufw status` to read what is now true. The firewall
  itself was set up in the previous lesson; this adds one rule to it.
- Before the rule exists, a connection attempt to the port **times out** — the first of
  the three failure shapes from `renting-a-machine`, now produced by a cause the learner
  controls.

### Running it by hand

- Started from inside the server folder, the same way it has always been started, with
  one addition: `-Xmx<N>G` sets the maximum memory Java will use for the world and
  everything in it.
- `-Xmx` must sit meaningfully **below** the machine's total memory, because the Java
  runtime needs memory beyond the heap and the operating system needs its own. Roughly
  3 GB on a 4 GB machine.
- Set too high, the machine runs out of memory and kills the server — which looks like a
  crash with no explanation anywhere in the server's own log, and is a genuinely
  confusing failure the first time.
- The startup lines will be completely familiar. That is the point: same program, new
  home.
- Joining from the learner's own Mac, at the machine's public address, is where the move
  becomes real. Friends come in the next lesson, once the server survives a reboot.

## Arc

### Orientation — given plainly

What `apt` is and its equivalence to Homebrew; what JRE and headless mean; that Java does
not travel with the folder; what `rsync` is and every flag used; the trailing-slash rule;
`--dry-run` as a habit and `--delete` as a hazard; the stop-before-copying rule and why;
what travels in the folder; the port and the firewall rule; and `-Xmx` with the
consequence of setting it wrong.

Framing sentence: everything up to now has been preparing a machine. This is the session
where the thing people actually care about moves onto it.

### Predictions to elicit

- Your server folder holds the world, the settings, and the list of who's allowed in. If
  that entire folder appeared on another computer and the server started there, what
  would be different for the people joining? What would be identical?
- The rented machine has never run Minecraft. What does it need that isn't in that
  folder?
- You're about to copy a world across a network. What could go wrong if the server were
  running while you copied it?
- You'll start the server on the new machine and try to join. Name every separate thing
  that has to be true for that to work. How many are there?

### The work — goals and hint ladders

**1. Install Java.** `sudo apt update`, then the headless JRE, then `java -version`
printing something. Which version is looked up at Minecraft's own source, not taken from
the lesson. Name the Homebrew equivalence in passing.

**2. Take a fresh backup.** Non-negotiable, one sentence of reason: this is the first
time the world has ever been sent over a network.

**3. Stop the local server.** Have the learner say why in their own words before doing
it. The rule is already held; this is the recall.

**4. Copy it up.**

- `--dry-run` first, and *read the output*. This is the habit being installed.
- Then the real copy.
- The trailing-slash question is asked before it is answered: which of these two commands
  puts the folder where you want it, and how would you find out cheaply? `--dry-run` is
  the answer to "cheaply", which is the point of asking.
- Rung 1 (if the destination looks wrong): you have a command that shows what would
  happen without doing it. Run both forms and compare the output.

**5. Verify from the far side.** `ls` the folder; find the world, `server.properties`,
`whitelist.json`. Then open `eula.txt` and read it: the agreement accepted the first time
the learner ever started a server travelled with the folder. Nothing on this machine has
to be set up again, and the friends who were allowed in are still allowed in, because the
list of them is a file.

**6. Open the port.** One rule added to the firewall that already exists, then read
`ufw status`.

**7. Start it by hand and join.** With `-Xmx` set for this machine's memory. Watch the
startup lines. Then join, from the Mac, at the public address.

Deliveries must say why this is done by hand before automating: if it fails after a
service file is added, there are two suspects instead of one. Proving one layer at a time
is the method.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Get the trailing slash wrong, safely.** Run the copy both ways with `--dry-run` and
  read both outputs. One puts the world where you want it; the other creates a folder
  inside a folder. Nothing happens either way, which is exactly why `--dry-run` is worth
  the four seconds. Undo: nothing.
- **Join before opening the port.** Start the server on the rented machine, then try to
  join *before* adding the firewall rule. It times out — and the learner has met that
  failure shape deliberately already, in `renting-a-machine`, so it should be
  recognisable. Nothing answered. The server is running perfectly and the firewall is
  discarding the connection before it ever reaches it. Teaches that "the server is
  running" and "people can reach the server" are two separate claims. Undo: add the rule.
- **Ask for more memory than the machine has.** Set `-Xmx` above the machine's total
  memory and start the server. Read whichever answer you get: it either refuses to start
  and says so, or it starts and the machine begins swapping and everything becomes
  treacle. Which one depends on the machine. Teaches that the heap and the machine's
  memory are two different numbers and the first has to be meaningfully smaller. Undo:
  set it back to a sane value.

### What just happened — the explanation

The world is somewhere else now. The same folder, the same settings, the same list of
people — copied over a network, onto a computer in another building, where the same
program read them and carried on as though nothing had happened.

That last part is worth noticing rather than passing over. Nothing had to be re-entered.
The agreement accepted months ago on a laptop is accepted on a machine in a data centre,
because acceptance was a line in a file and the file came too. This is what it means for
a program's state to live in files rather than somewhere invisible: the state is portable,
inspectable, and copyable, and moving a service between machines is mostly moving a
folder. That is not a Minecraft fact.

`rsync` is worth keeping. It copies folders between machines over the same encrypted
connection already in use, and its `--dry-run` is the habit to carry into every tool that
has one: look before you leap, when looking is free. Most tools that can destroy
something have a way to ask what they would do, and most people find it after the first
time they need it.

Starting by hand before automating is the other habit. It cost an extra five minutes and
bought a guarantee: when the service file goes on in the next session and something
misbehaves, the copy is not a suspect. Debugging is mostly the art of arranging to have
one suspect at a time, and the arrangement happens before the problem, not after.

And the timeout, if it was met, was the same one from two sessions ago — this time caused
by a rule the learner wrote. "The server is running" and "people can reach the server"
turn out to be two different claims, and the gap between them is where a great deal of
time gets lost by people who assume they are one.

### Go further — open questions

- `rsync` did the whole folder. Read `man rsync` and find how to make it copy only what
  changed since last time. What would that be useful for?
- The world came across, but so did every log file and every temporary file in that
  folder. Is that what you wanted? What would you have excluded, and how?
- You now have the same world on two machines. Which one is the real one, and how would
  anybody know? What happens if somebody starts the old one by accident?
- Genuinely open: your world folder will keep growing. How big can it get before copying
  it over the network stops being practical, and what would you do then? Find out how
  large it is now, and what it grew by this month.

## Delivery notes

- **guided:** level 2. Do not walk the rsync flags line by line — they are in New tools;
  the work states goals.
- The `--dry-run` habit is the thing this lesson installs beyond the immediate task and
  must not be presented as an optional nicety.
- Keep the by-hand-before-automating justification explicit. It is the reason this is a
  separate lesson from the next one, and a delivery that omits it makes the split look
  arbitrary.
- The `eula.txt` observation is small and lands well; keep it as a discovery rather than
  a stated fact.
- Volatile: the Java version. Point at Minecraft's own requirements, and note that the
  server's own error names what it wanted.
- **reference:** the full command sequence, the trailing-slash rule, `--delete` as a
  named hazard, the stop-before-copying rule, the `-Xmx` guidance with the failure it
  produces, and the port rule.
