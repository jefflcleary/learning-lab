# A server that's there at seven in the morning

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your server has a weakness: it only exists while you remember it. If your Mac falls
asleep, the server stops answering. If the machine reboots — an update, a power
blip, someone borrowing the charger — the server is gone until you notice and start
it again. That was fine when the only player was you. It stopped being fine the day
people outside your house started depending on it.

This session closes both gaps. First you'll defeat sleep. Then you'll teach the
machine itself to start the server — so that after any reboot, even one nobody saw,
the server climbs back up on its own. At the end you'll prove it the honest way: cut
the power and watch everything come back without a single key pressed.

One honest limit before you start: a laptop that leaves the house can't be a server
that's always there — when it's at school, the world is down. A machine that stays
home and stays plugged in, whether that's a desktop or an old laptop retired to a
shelf, can be. This session doesn't change which machine you have; it makes whatever
machine you use come back on its own.

---

## Before you start

You need:

- **A server people connect to from outside your home.**
  [Letting friends in from anywhere](../joining-from-outside/guided.md) gets you there. Quick
  check: someone outside your wifi has joined your server, or you can join it
  yourself over the outside route.
- **A server you can start, stop, and join.**
  [Running your own server](../running-your-own-server/guided.md) covers it. Quick check:
  start it, watch for the **Done** line, type `stop`, watch it save and exit.
- **A backup you've actually restored from.** [Backups](../backups/guided.md) covers it.
  Quick check: your backup script runs, and you have at least once taken a backup,
  broken something, and brought it back. The last part of this session cuts the
  power to a running machine, and you only do that with a proven safety net.

---

## What you'll have at the end

By the end of this session you will have:

- Watched sleep kill your server, on purpose, and then taken sleep off the table
  two different ways
- A settings file that tells your Mac to start the server itself, every time you
  log in — written by you, in a third settings-file shape you haven't met yet
- Restarted the machine and watched the server come back with no help
- Cut the power entirely and watched the machine boot, log in, and bring the server
  up — a chain with no human in it, which someone outside your house can verify by
  simply joining

---

## New tools

**caffeinate** is a small program that ships with every Mac. Its job is to keep the
machine awake. Its best trick: give it a command, and it keeps the Mac awake exactly
as long as that command runs, then lets go. It's already installed; `man caffeinate`
in a terminal shows everything it can do. (`man` is the manual — the built-in
reference pages for command-line programs. `q` quits the viewer.)

**launchd** is the Mac's program-starter: the very first program macOS starts when
it boots, which then starts everything else. Every background program on your Mac —
and there are dozens running right now — was started by launchd and is watched by
launchd. It's already running; it has been since before you logged in.

**.plist files** are launchd's settings files. "Plist" is short for property list,
and the format is XML: values wrapped in angle-bracket tags, like
`<string>hello</string>`. This is the third settings-file shape you've met. The
server gave you `key=value`. Datapacks gave you JSON. Now XML. Three costumes, one
idea: a program's decisions, written in a file you can edit.

**launchctl** is the command you use to talk to launchd — load a job, unload it,
list what's running. `man launchctl` is the authority on it, and this session will
send you there rather than quote it, because its wording is exactly the kind of
thing worth reading at the source.

**Console.app and `log show`** are two views of the same thing: the system log,
where macOS and its background programs write their complaints. Console is an app
(in Applications, under Utilities); `log show` is the terminal version. You'll need
one of them before this session is over, for a reason that will be obvious when it
happens.

---

## Predict

Write your answers down first:

- A friend outside your house tries to join while your Mac is asleep. What exactly
  appears on *their* screen? How could you find out for certain?
- After a restart, some things come back on their own — the menu bar, wifi — and
  some things don't, like your server. Something must hold the list of what comes
  back. Where do you think that list lives?
- Write out the chain that starts your server today: you → terminal → java → server.
  If a machine had to do it with no human in the chain, what would the first link
  be? And what starts *that*?

---

## The work

### Watch sleep kill the server

Before fixing the enemy, see it clearly. Your goal: make the Mac fall asleep while
the server is running, and observe from a second device what that does to players.

Sleep normally takes a while to arrive, so make it arrive fast: open System
Settings and search for **sleep**. You'll find timers. Shorten them as far as they
go. Then start your server the usual way, leave the Mac completely untouched until
it sleeps, and try to join from another device — another computer in the house, or
the friend from outside.

Watch what joining looks like. That's what your server's downtime looks like to
everyone else: not an error message that explains anything, just an address that
stopped answering. Check it against your first prediction.

Don't fix anything yet.

### Defeat sleep, two ways

**The settings way.** In the same part of System Settings, there is an option whose
wording is about *preventing automatic sleeping*. The exact name and location shift
between macOS versions, which is why the durable instruction is: search Settings for
"sleep" and read what your machine offers until you find that wording. Turn it on.
Run the sleep test again and confirm the server now survives being ignored.

**The terminal way.** Settings toggles are machine-wide and easy to forget about.
There's a more surgical option: `caffeinate` can keep the Mac awake *only while a
particular command is running*. Your goal: start the server so that running it is
itself the thing holding the machine awake.

<details>
<summary>Stuck? Start here</summary>

`man caffeinate`. Read the whole page — it's short. You're looking for the part
about what happens when caffeinate is given a command (the page calls it a
"utility") to run.

</details>

<details>
<summary>The shape of it</summary>

`caffeinate -i <command>` runs the command and prevents idle sleep until the
command exits. The command can be anything — including the entire
`java -jar server.jar nogui` line you've been typing since your first server
session. One program wrapping another.

</details>

**If your server machine is a laptop:** one more question before moving on. With
automatic sleep prevented, does *closing the lid* still put the machine to sleep?
Apple documents lid behavior — search their support site for using a Mac notebook
with the lid closed, and find out what your machine will actually do. The answer
decides whether your laptop can serve with the lid shut, and it's worth knowing
before the first overnight test rather than after.

### Teach the machine to start the server itself

Sleep is handled. The other enemy is reboots: today, if the machine restarts, the
server stays down until a human remembers. The fix is to hand your start command to
launchd.

launchd reads its per-user instructions from `.plist` files in a specific folder:
`~/Library/LaunchAgents/`. Jobs in that folder run **when you log in**. Two
practical notes: `~/Library` is hidden in Finder (the terminal sees it fine), and
the `LaunchAgents` folder may not exist yet — `mkdir -p ~/Library/LaunchAgents`
creates it if needed and does nothing if it's already there.

Here is the plist, with the parts only you can know left blank. Create it in VS
Code and save it into `~/Library/LaunchAgents/` — the convention is that the
filename matches the label, so a job labeled `local.mc-server` lives in
`local.mc-server.plist`. Type the values you fill in; the boilerplate around them
can be copied.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
  "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>FILL IN: a unique name for this job</string>

    <key>ProgramArguments</key>
    <array>
        <string>FILL IN: the absolute path to the java program</string>
        <string>-jar</string>
        <string>server.jar</string>
        <string>nogui</string>
    </array>

    <key>WorkingDirectory</key>
    <string>FILL IN: which folder, and why this one</string>

    <key>RunAtLoad</key>
    <true/>

    <key>StandardOutPath</key>
    <string>FILL IN: an absolute path to a file for normal output</string>

    <key>StandardErrorPath</key>
    <string>FILL IN: an absolute path to a file for errors</string>
</dict>
</plist>
```

What each key means: `Label` is the job's unique name (dotted style like
`local.mc-server` is the convention). `ProgramArguments` is the start command,
split into pieces — the program first, as an absolute path, then every argument as
its own `<string>`. `RunAtLoad` means "start this as soon as it's loaded, and at
every login." `StandardOutPath` and `StandardErrorPath` answer a question you
haven't had to ask before: a program started by launchd has **no terminal window**,
so where does everything it prints go? Wherever these two keys say — name two files
you'll be able to find later.

Two of the blanks deserve thought:

<details>
<summary>The path to java</summary>

launchd needs the absolute path to the java program — it won't go looking the way
your terminal does. Your terminal knows where java lives: `which java` prints the
full path of the program a command name refers to.

</details>

<details>
<summary>WorkingDirectory — and why it matters more than any other line</summary>

Think back to your very first server run: the world folder, the logs, the settings
file all appeared *somewhere*. What decided where? The server creates everything in
the folder it is started from. When launchd is doing the starting, "the folder it's
started from" is whatever this key says — and if it says the wrong thing, the
server won't fail; it will cheerfully build a second, empty world in the wrong
place. One more rule: the path must be written out in full, starting with
`/Users/...`. launchd does not understand `~`.

</details>

**Before loading it: stop your hand-run server** if it's running. Loading this job
starts the server immediately, and you already know from firsthand experience what
happens when two servers fight over one port.

Now load it. The loading command belongs to `launchctl`, and this is a
read-the-manual moment: open `man launchctl` and find the subcommand for loading an
agent. The manual on *your* machine is the authority — launchctl's commands have
been renamed over the years, and your man page says which form your macOS wants.
(You may find both an older and a newer name for the same act; the man page says
which it prefers. A detail you may need: the newer forms identify you by user id,
and `id -u` prints yours.)

Verify from three angles: `launchctl list` and look for your label in the output
(a process number next to it means it's running); the multiplayer screen; and if
the friend from outside is around, their join is the verdict that counts.

<details>
<summary>Optional, for the elegant version</summary>

Your plist starts java directly, so it's relying on the Settings toggle to hold
sleep off. But you now know a program whose entire job is keeping the Mac awake
while another program runs. Could the plist start *that* program, and let it start
java? `ProgramArguments` is just a list — think about what would have to come
first, and remember launchd wants absolute paths (`which caffeinate`).

</details>

### The reboot test

Restart the Mac — the real thing, Apple menu, Restart. Log in when it comes back.
Touch nothing else.

Then check: is the server up? `launchctl list`, the multiplayer screen,
`logs/latest.log` with fresh timestamps. If it is, something real just changed: for
the first time, this server was started by no one.

One gap remains. Jobs in `~/Library/LaunchAgents` run at **login** — so if the
machine reboots while nobody's home, it sits at the login screen, serverless,
waiting. For a truly unattended comeback, the machine has to log itself in. Open
System Settings and find what it offers for **automatic login** (look around the
Users & Groups area). If you find the option grayed out or missing, that's not a
dead end — it's information. Find out why: the answer involves FileVault, macOS's
built-in disk encryption, and the reason is worth understanding — a disk that
decrypts itself without a password isn't really encrypted at all, so macOS makes
you choose. Encryption or unattended comebacks: which matters more for this
particular machine is a real decision, and if the machine isn't yours, it belongs
to whoever owns it. Make the call together.

### Learn to stop what you can't see

There's no console window anymore. The server is running, but nowhere on your
screen is there a place to type `stop`. So: how do you stop it — and how would you
know the stop was *clean*?

<details>
<summary>Stuck? Start here</summary>

The tool that loaded the job can also unload it. `man launchctl` again — you're
looking for the counterpart of the subcommand you used to load.

</details>

<details>
<summary>What unloading does — and the question it leaves open</summary>

Unloading the job stops the program: launchd asks it to quit. But "asks it to
quit" is not the same as typing `stop` and watching the saving lines scroll by —
or is it? You can't see the console, but the server still writes everything it
says to `logs/latest.log`. Stop the server your new way, then open the end of that
log. Either the saving lines are there or they aren't. Whichever you find, you now
know — from evidence, not hope — how much to trust this way of stopping a server
whose world you care about.

</details>

When you want the old console back — for a session of commands, say — the recipe
is: unload the job, run the server by hand in a terminal like always, and load the
job again when you're done. (There are also ways to talk to a running server
without a console at all; a later lesson builds one.)

### The blackout drill

Everything above, proven at once — **on your expendable setup, never a world people
care about,** because what you're about to do is a hard kill: the exact thing the
stop-cleanly rule exists to prevent. That's also why the first step is:

1. Take a fresh backup. This is what your backup script is for.
2. Confirm the server is running via launchd, and automatic login is on.
3. Cut the power. On a desktop: pull the cord — and before you do, check whether
   your desktop's energy settings offer starting up automatically after a power
   failure, because that setting is what turns "power came back" into "machine came
   back." On a laptop: pulling the cord is a non-event — the battery shrugs — so
   hold the power button down until the machine dies. Same effect, honestly
   arrived at.
4. Power back on. Then put your hands behind your back.

Watch the chain run: machine boots, logs itself in, launchd wakes up, reads your
plist, starts the server. Have someone join. Nobody touched anything but the power.

That chain — power, boot, login, launchd, server — is the whole anatomy of "always
on," and every link in it is now something you configured on purpose. (If the world
took damage from the hard kill, this is the moment your fresh backup earns its
keep — and either way you've now seen exactly what a real power cut does.)

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Reboot with the safety net off.** Unload your plist, reboot, log in. The server
is down, and it stays down — nothing anywhere is bringing it back. Sit with that
for a second, because this is every computer's default state: forget everything on
power-off, start only what some file somewhere says to start. Yesterday you didn't
know which file. Now you are the person who wrote it. Load the plist again and
watch the default get overridden.

**Break the plist's path.** Unload the job. Open the plist and misspell the path to
`server.jar` — one letter is enough. Load it again. Notice what you get: nothing.
No window, no error dialog, no server. A background program that fails does not
fail *at* you — it fails somewhere, quietly, and the skill you're about to practice
is finding where. Three places to look, in rising order of depth: the output of
`launchctl list` (there's a column showing how each job last exited — a number
other than zero is a program complaining); the file you named in
`StandardErrorPath`; and the system log itself, in Console.app or with
`log show --last` and a search for your label. Find the complaint in at least one
of them. Then fix the path, reload, and verify the server is back. Every background
program's errors go *somewhere* — an operator's first job is knowing where.

---

## What just happened

"Services" and "programs you run" turn out to be the same species. The only
difference is who types the start command: you, or a program whose job is starting
programs. Every server on earth — every website, every big Minecraft server, every
service behind every app on your phone — is an ordinary program that some machine's
startup system launches at boot, watches while it runs, and stops at shutdown. On a
Mac that startup system is launchd; Linux machines have an equivalent, Windows has
its own. The names change; the idea doesn't. And the whole thing is configured with
files in folders — you've now written one of them.

Your settings-file collection is three shapes long now: `key=value` in
server.properties, JSON in datapacks, XML in your plist. Different costumes, same
idea every time — the behavior of a program is data, data lives in files, and files
can be edited by you.

You also gave something up, and it's worth naming: the console window. When the
server became a service, its interface moved. Starting and stopping now belong to
`launchctl`; the server's voice lives in `logs/latest.log`; and complaints from
*before the server even exists* — a bad path, a missing program — live in launchd's
log, because a program that never started can't very well write to its own. Knowing
which of those places to check, and when, is most of what "operating" a server
means.

---

## Go further

- When the machine shuts down normally while the server is running, what does
  launchd actually do to your server — and can launchd be told how to stop a
  program *gracefully*? `man launchd.plist` is the full list of every key a plist
  can hold; read the surface and see what's in there. `logs/latest.log` after a
  normal reboot holds the evidence of what happened last time.
- One key you'll meet in that man page is `KeepAlive`. What would happen today if
  the server crashed at three in the morning? What would happen after you add that
  key? And what's the failure mode if a broken server crashes *instantly*, every
  time it starts — what does a restarter do with that?
- Run `launchctl list` and just read it, top to bottom. Every line is a background
  program running for you right now, and every one of them is a plist somewhere.
  Skim `ls /Library/LaunchDaemons` too. How much of your Mac turns out to be this
  one mechanism, used over and over?
- Genuinely open: this whole session assumed a machine in your house, with a screen
  and a login. What would it take to run your server on a machine you never see and
  never log into — no screen at all? People do this every day. What are they doing
  differently?

---

## What this leaves behind

- A server that survives sleep, survives reboots, and comes back from a power cut
  with no human in the chain — which people outside your house can verify any
  morning they like
- A plist in `~/Library/LaunchAgents/` that you wrote, and the knowledge that it —
  not habit, not luck — is what brings the server back
- The ability to start and stop a background program with `launchctl`, and to find
  where a program with no window sends its complaints
- A third settings-file shape, XML, next to `key=value` and JSON
