# A server that's there at seven in the morning

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** always-on
- **Part:** Part 3 — Infrastructure
- **Scaffolding:** level 2 — second lesson of the operating-a-real-service skill
  (backups was the first); goals plus hints, concepts named but not applied
- **Deliveries:** guided + reference (setup-heavy; an adult may execute the plumbing)
- **Status:** ready

## Goal and payoff

Turn a server-you-start into a server-that's-just-there: defeat sleep, teach the
machine to start the server itself at login via launchd, and prove the whole chain by
rebooting — and finally by cutting power — and watching the server come back with
nobody touching anything. Payoff: a friend can join at seven in the morning while the
learner is still asleep, and the blackout drill is a demonstration worth showing off.

The lesson under the lesson: "services" are not a different kind of thing from
programs. Every server on earth is an ordinary program that some machine's startup
system launches, and the startup system is configured with files — a third settings
file shape (XML), same idea as the first two.

## Prerequisites

- People connect to your server from outside your home — established by
  `lessons/joining-from-outside/` (this is the moment availability starts to matter)
- A server you can start, stop, and join — established by
  `lessons/running-your-own-server/`
- A backup you have actually restored from — established by `lessons/backups/`
  (required for the power-cut drill at the end)

## Establishes

- The server survives sleep, survives a reboot, and comes back without a human —
  cited by other cores as: "the server starts itself when the machine starts —
  established by `lessons/always-on/`."
- The learner can start and stop a background program with `launchctl` and knows
  where a program with no window sends its complaints.
- A `.plist` in `~/Library/LaunchAgents/` that other lessons may reference.

## Facts

- A sleeping computer runs no programs and answers no network traffic. To anyone
  connecting from outside, a sleeping Mac's server is indistinguishable from a
  stopped one: the connection times out. [macos] [windows-same-principle]
- [macos] Display sleep and machine sleep are separate. A dark screen does not
  necessarily mean a sleeping machine — but default settings do eventually idle-sleep
  the machine itself.
- [macos] Sleep settings live in System Settings; the pane name and wording differ by
  macOS release and machine type (a Battery pane on laptops, an Energy/Energy Saver
  pane on desktops) [verify as of 2026-07 — deliveries: have the learner search
  Settings for "sleep" and look for wording along the lines of "Prevent automatic
  sleeping when the display is off" rather than naming a pane].
- [macos] Sleep timers in Settings can be shortened — useful for *manufacturing* the
  failure quickly instead of waiting for it.
- [macos] `caffeinate` ships with macOS. `caffeinate -i <command>` prevents idle
  sleep for as long as `<command>` runs, then lets go. Flags (`-d` display, `-s`
  while on AC power, `-i` idle) are in `man caffeinate`. The elegant use: wrap the
  server start itself — `caffeinate -i java -jar server.jar nogui`.
- [macos] Laptop lid: closing the lid puts the machine to sleep regardless of
  idle-sleep settings, with exceptions (external display + power — "closed-clamshell
  mode") [verify current rules as of 2026-07 — deliveries: point the learner at
  Apple's support page, findable by searching "use your Mac notebook with the lid
  closed"; never assert the rules].
- [windows] Sleep is disabled under Settings > System > Power (& battery).
- [windows] Windows Update can restart the machine on its own schedule. An always-on
  Windows server needs update settings / active hours attended to, or the server
  dies overnight to an automatic reboot.
- [macos] **launchd** is the Mac's program-starter: the first program macOS starts,
  which then starts everything else. Every background program on the machine is
  started, watched, and stopped by launchd. It is configured with `.plist` files.
- A `.plist` ("property list") is a settings file in XML — angle-bracket tags
  wrapping values. Third config-file shape in the module: `key=value`
  (server.properties), JSON (datapacks), now XML. Same idea every time: a program's
  decisions, written in a file, editable.
- [macos] `~/Library/LaunchAgents/` holds per-user jobs: launchd runs them **when
  that user logs in**. `/Library/LaunchDaemons/` holds system jobs run at boot as
  the system — not used here (needs admin rights; a server run as you belongs in
  your LaunchAgents). `~/Library` is hidden in Finder by default; the folder
  `LaunchAgents` may not exist yet — `mkdir -p ~/Library/LaunchAgents` is safe
  either way.
- Plist keys this lesson uses:
  - `Label` — a unique name for the job; convention is dotted-reverse-name style,
    e.g. `local.mc-server`; the filename conventionally matches
    (`local.mc-server.plist`).
  - `ProgramArguments` — an array of strings: absolute path to the program, then
    each argument as its own `<string>`. `which java` prints the absolute path to
    java.
  - `WorkingDirectory` — the folder the program starts in. Matters enormously here:
    the server creates every file in whatever folder it starts from
    (running-your-own-server). Must be absolute — **launchd does not expand `~`**;
    spell out `/Users/<name>/...`.
  - `RunAtLoad` — `<true/>` starts the job as soon as it's loaded (and at each
    login).
  - `StandardOutPath` / `StandardErrorPath` — absolute file paths where the
    program's output goes. A launchd-started program has no terminal window; without
    these keys its output goes nowhere you can read.
  - `KeepAlive` — restart the program if it dies. Deliberately left as go-further.
- [macos] `launchctl` is the command-line control for launchd. Modern verbs:
  `launchctl bootstrap gui/<uid> <path-to-plist>` to load,
  `launchctl bootout gui/<uid>/<label>` to unload/stop; older `launchctl load` /
  `launchctl unload <path>` still widely documented [verify as of 2026-07 which
  forms `man launchctl` currently recommends vs marks legacy — deliveries: the
  learner reads `man launchctl` and uses what their machine's manual says].
  `id -u` prints the user id (`501` for the first account on most Macs).
- [macos] `launchctl list` prints every loaded job for the current user: PID (or `-`
  if not running), last exit status, label. Filtering with `grep <label>` is the
  quick health check.
- Loading a `RunAtLoad` job starts it **immediately**. If a hand-started server is
  already running, the launchd copy collides with it on the port — the same
  two-programs-one-port failure met in running-your-own-server. Stop the hand-run
  server before loading.
- A launchd-run server has no console to type `stop` into. Two consequences:
  - The server's own words still land in `logs/latest.log` regardless.
  - Failures that happen *before the server exists* (wrong path to the jar, wrong
    path to java) never reach `latest.log`. They land in launchd's world: the exit
    status column of `launchctl list`, the `StandardErrorPath` file, and the
    system log — readable in the **Console.app** application or with the `log show`
    command [verify exact `log show` predicate syntax as of 2026-07 — deliveries:
    have the learner explore Console.app's search and `log show --last`, not a
    canned predicate]. Finding where a background program's errors go IS the skill.
- Stopping cleanly without a console: `launchctl bootout` (or `unload`) stops the
  job — launchd asks the program to quit (a quit signal, SIGTERM), and force-kills
  it only if it lingers [verify default grace period / ExitTimeOut behavior as of
  2026-07]. Whether the Minecraft server saves cleanly when asked to quit this way
  is **empirically checkable**: after stopping, `logs/latest.log` either shows the
  saving lines or it doesn't. Deliveries must have the learner check, never assert.
- The full auto-return chain after power loss: power on → macOS boots → user logs in
  → LaunchAgents run → server starts. Two settings close the human-shaped gaps:
  - [macos] **Automatic login** (System Settings, in the Users & Groups area
    [verify exact location/wording as of 2026-07]) logs the account in at boot. It
    is unavailable while FileVault (macOS disk encryption) is turned on [verify
    current rule — deliveries: learner discovers what their own Settings offers and
    checks Apple's docs; an encrypted disk that auto-unlocks would defeat the
    encryption, which is *why* this restriction exists and is worth saying].
  - [macos] Desktop Macs have a "start up automatically after a power failure"
    energy option [verify availability and wording per model as of 2026-07 —
    deliveries: learner looks for it, treats absence as an answer]. Laptops don't
    need it: the battery rides out the outage, and a forced shutdown (holding the
    power button) simulates power loss for the drill.
- Honest scope: a laptop that leaves the house cannot be a 24/7 server — when it's
  at school, the server is down. A machine that stays home and stays plugged in
  (a desktop, an old laptop retired to a shelf) can be. This lesson doesn't change
  which machine is available; it makes whatever machine is used come back on its
  own.
- The stop-cleanly tension, stated plainly: an auto-started server plus a machine
  losing power is a hard kill mid-write — exactly what the never-close-the-window
  rule protects against. At minimum the learner must *know* this; the mitigation is
  backups (../backups/), and the drill is run on the expendable setup with a fresh
  backup taken first. Whether launchd can be told to stop a program gracefully at
  shutdown is left as go-further.

## Arc

### Orientation — given plainly

The problem: joining-from-outside made other people depend on the server being up,
and the server is only up while a human remembers it. Two separate enemies: sleep
(the machine stops mid-run) and reboots (the machine forgets what it was running).
Named tools, all given: System Settings sleep options (found by searching, since
naming shifts), `caffeinate` (what it is, that `man caffeinate` is the reference,
the wrap-the-command idea), launchd ("the Mac's program-starter — the first program,
which starts everything else"), plists as launchd's settings files and the third
config shape (key=value → JSON → XML, arc made explicit), `launchctl` as the control
command with `man launchctl` as the authority, and the no-console consequence.
Honest scope note about laptops that leave the house. The double-start port hazard
warned plainly.

### Predictions to elicit

- A friend outside tries to join while the Mac is asleep. What exactly do they see
  on their screen? How would you find out for sure?
- After a restart, some things come back on their own (the menu bar, wifi) and some
  don't (your server). Something must hold the list of what comes back. Where do you
  think that list lives?
- Write down the chain that starts your server today: you → terminal → java →
  server. For a machine to do it alone, what has to be the first link — and what
  starts *that*?

### The work — goals and hint ladders

1. **Watch sleep kill the server.** Manufacture the failure before fixing it: in
   System Settings, search "sleep" and shorten the timers as far as they go. Start
   the server the usual way, leave the Mac untouched past its sleep timer, then try
   to join from another device (or have the outside friend try). Observe the
   timeout. Undo nothing yet — this is the enemy, seen clearly.
   - Rung 1: to *see* the failure fast, make sleep happen fast. Settings has search.
   - Rung 2: sleep timers are settings like any other; set them to the minimum,
     watch the machine sleep, test from a second device. The dark screen and the
     dead server arrive together.
2. **Defeat sleep, two ways.**
   - The settings way: in the same Settings area, find the option whose wording is
     about *preventing automatic sleeping*. (Learner finds the wording; deliveries
     never name the pane.) Turn it on, test again.
   - The terminal way: `caffeinate` runs a command and keeps the Mac awake exactly
     as long as the command runs. Goal: start the server so that the act of running
     it *is* the thing keeping the machine awake.
     - Rung 1: `man caffeinate`, the part about running a "utility" (a command).
     - Rung 2: `caffeinate -i <command>` — and the command can be the whole
       `java -jar server.jar nogui` line.
   - Laptop owners: with sleep prevented, does closing the lid still sleep the
     machine? Apple documents lid behavior — search their support site for using a
     Mac notebook with the lid closed and find out what your machine will do. (The
     answer decides whether your laptop can serve with the lid shut.)
3. **Teach the machine to start the server itself.** Goal: a plist in
   `~/Library/LaunchAgents/` that starts the server at login, loaded with
   `launchctl`. Delivered as a completion problem — structure given, load-bearing
   values blanked: Label, the absolute path to java (`which java`), the
   WorkingDirectory, output file paths. The learner knows *why* WorkingDirectory
   matters from running-your-own-server; the hint ladder reminds rather than tells:
   - Rung 1 (WorkingDirectory): first run of the server ever — where did the world
     folder appear, and what decided that?
   - Rung 2: the server creates everything in the folder it starts from. Started by
     launchd, "the folder it starts from" is whatever the plist says. Absolute path,
     no `~` — launchd doesn't expand it.
   - Loading: `man launchctl` — find the subcommand for loading an agent; the man
     page on *your* machine is the authority on `bootstrap` vs `load` wording. Stop
     the hand-run server first (port collision otherwise — a known error).
   - Verify: `launchctl list` filtered to the label; the multiplayer screen; a
     friend outside.
   - Optional elegance hint: the plist runs java directly, but sleep is still a
     threat if the settings toggle is off. You know a program whose whole job is
     keeping the Mac awake while another program runs — can the plist start *that*,
     and let it start java? (ProgramArguments: caffeinate's absolute path first.)
4. **The reboot test.** Restart the Mac. Log in. Do not touch anything else. Verify
   the server came back (multiplayer screen, `launchctl list`, `logs/latest.log`
   timestamps). Then close the last human gap: agents run *at login* — for a machine
   that comes back with nobody home, the machine must log itself in. Find what your
   System Settings offers for automatic login (Users & Groups area), and if it's
   grayed out or missing, find out why — the answer involves FileVault, macOS's disk
   encryption, and the reason is worth understanding: a disk that decrypts itself
   without a password isn't encrypted in any way that matters. Decide (with the
   machine's owner, if that's not you) which matters more on this particular
   machine: encryption or unattended comebacks.
5. **Learn to stop what you can't see.** There is no console window now. Goal: stop
   the launchd-run server cleanly and *prove* it was clean.
   - Rung 1: the same tool that loaded the job can unload it — `man launchctl`
     again.
   - Rung 2: unloading (`bootout` / `unload`) stops the job; launchd asks the
     program to quit. Whether the server treated that as a clean `stop` is written
     where the server writes everything — `logs/latest.log`. Look for the saving
     lines. Whatever you find is a fact you measured, and it decides how much you
     trust launchctl-stops with a world you care about.
6. **The blackout drill.** The payoff, on the expendable setup only, with a fresh
   backup taken first (backup.sh exists for exactly this). Server running via
   launchd, automatic login on. Cut the power: desktop — pull the cord (and first
   find whether your desktop's energy settings offer start-up-after-power-failure);
   laptop — hold the power button until it dies (the battery makes a pulled cord a
   non-event on a laptop; the long-press is the honest equivalent). This is a real
   hard kill — the thing the stop-cleanly rule exists to prevent — which is why it's
   the expendable world and why the backup came first. Power back on. Touch nothing.
   Watch the machine boot, log itself in, start the server. Have someone join. That
   chain — power, boot, login, launchd, server — is what "always on" is made of.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Reboot with the safety net off.** Unload the plist (`bootout`/`unload`), reboot,
  log in. The server is down and stays down — nothing anywhere is bringing it back.
  This is every machine's default state: forget everything on power-off, start only
  what a file somewhere says to start. Feel the default, then re-load the plist.
  Teaches: nothing is automatic unless something makes it so, and now the learner
  knows exactly which file is the something. Undo: load the plist again.
- **Break the plist's path.** Unload, misspell the path to `server.jar` (or java)
  inside the plist, load again. Silence — no window, no error dialog, no server.
  Task: find where launchd complains. Places to look, in rising order of depth:
  `launchctl list` (the exit-status column), the `StandardErrorPath` file, and the
  system log via Console.app or `log show --last` (searching for the label).
  Teaches the actual skill: a background program's errors always go *somewhere*,
  and an operator's first job is knowing where. Undo: fix the path, reload, verify.

### What just happened — the explanation

"Services" and "programs you run" are the same species. The only difference is who
types the start command: you, or a program whose job is starting programs. Every
server on earth — every website, every game server, every service behind an app —
is an ordinary program that some machine's startup system launches when the machine
boots, restarts when it dies, and stops when the machine shuts down. macOS's startup
system is launchd, and its entire configuration is files in folders — the learner
has now written one. Linux machines have an equivalent (systemd, mostly), Windows
has its own; the names change, the idea never does. And the settings-file arc is now
three shapes long: `key=value` in server.properties, JSON in datapacks, XML in
plists — different costumes, same idea: behavior is data, data lives in files, files
can be edited. What was given up: the console window. The server became a service,
and the interface moved — starting and stopping belong to `launchctl`, the server's
voice lives in `logs/latest.log`, and errors from before-the-server-exists live in
launchd's log. (A way to talk *to* a running server without a console exists, and a
later lesson builds it.)

### Go further — open questions

- When the machine shuts down normally while the server is running, what does
  launchd do to it — and can launchd be told how to stop a program *gracefully*?
  `man launchd.plist` is the surface to read; `logs/latest.log` after a normal
  reboot is the evidence either way.
- `KeepAlive` promises to restart a program that dies. What would happen if the
  server crashed at 3 a.m. today? What would happen after you add the key? What's
  the failure mode if the server crashes *instantly* every time it starts?
- Run `launchctl list` and just read it — every line is a background program running
  for you right now, each one a plist somewhere. Skim `ls /Library/LaunchDaemons`
  too. How much of your Mac turns out to be this one mechanism?
- Genuinely open: this lesson still assumes a machine in your house with a screen
  and a login. What would it take to run this server on a machine you never see and
  never log into — no screen at all? People do this every day; what are they doing
  differently?

## Delivery notes

- **guided:** level 2 — goals and hint ladders, concepts named but not applied;
  do not walk the plist reasoning inline the way server-settings walks
  key=value. The completion problem carries the middle of the lesson. Keep the
  manufactured-sleep-failure first: the lesson lands harder when the enemy is seen
  before the weapons. The FileVault/automatic-login trade-off must be framed as a
  decision made with the machine's owner, never assumed to be the learner's call.
  Never name Settings panes — searching Settings is the durable instruction.
- **reference:** full plist example is appropriate here (reference gives answers).
  Must carry every gotcha: no `~` expansion, double-start port collision, no
  console, FileVault vs automatic login, hard-kill risk of the blackout drill and
  the fresh-backup-first rule, laptop lid behavior pointer.
- The blackout drill needs the expendable-setup framing preserved in every
  delivery; on a family world this drill is vandalism.
- Do not assert what the server does on SIGTERM; the learner measures it in step 5.
