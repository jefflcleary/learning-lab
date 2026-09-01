# Keeping it running

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** keeping-it-running
- **Part:** Part 3 — Moving in
- **Scaffolding:** level 2, with the unit file delivered as a completion problem rather
  than a hint ladder — it is syntax-heavy and every blank is answerable from something
  the learner already knows.
- **Deliveries:** guided + reference.
- **Status:** ready

## Goal and payoff

**The module's milestone: friends outside the house play on a machine nobody in the
house owns, while the learner's own computer is switched off.**

The server currently runs because a person is sitting in an SSH session. Close it and the
server stops. This lesson hands the job to the machine: a service file, started at boot,
on a computer where nobody ever logs in.

Two payoffs, and the second is the module's closing image.

The first is the reboot test. `sudo reboot`, the connection drops, and a minute later the
server is already running. Nobody logged in — and more than that, **there is no login on
this machine at all**. The last human-shaped gap in the chain did not get closed; it
stopped existing. For a reader who met launchd on a Mac, that is the difference worth
noticing: there, automatic login had to be arranged and traded against disk encryption.
Here the question does not arise.

The second is the demonstration. With friends playing, the learner shuts their laptop,
unplugs it, and carries it into another room. Nothing happens. Nothing depends on it any
more. That is the whole module, performed rather than claimed.

## Prerequisites

- The server folder on the rented machine, running when started by hand, with the port
  open — established by `modules/remote-server/lessons/moving-the-server-across/`
- People outside the house have joined the learner's server before, so an address, a
  port, and a whitelist are familiar things — established by
  `modules/minecraft-server/lessons/letting-friends-join/`

Deliberately **not** a prerequisite: `modules/minecraft-server/lessons/always-on/`.
systemd is explained from nothing. For a reader who met launchd there, the parallel is
drawn where it helps; for one who did not, nothing is missing.

## Establishes

- The Minecraft server starts itself when the machine boots and survives a reboot with
  nobody logged in — cited as: "the server runs as a systemd service on the rented
  machine and survives reboots — established by
  `modules/remote-server/lessons/keeping-it-running/`."
- Friends join at the machine's public address; the learner's own computer is no longer
  involved.
- The learner can write a systemd unit, use `systemctl`, and find a background program's
  complaints with `journalctl`.

## Facts

### Where commands run

- **On the rented machine** (remote variant) — the unit file, every `systemctl` and
  `journalctl`, and reading `whitelist.json` and `server.properties`.
- **On your Mac** (local variant) — joining the server, and nothing else this lesson.

### systemd

- **systemd** is Linux's program-starter: the first program the machine runs, which starts
  everything else and keeps it running. Every background program on a modern Linux machine
  was started by it. This is the same job macOS's launchd does; the names and file formats
  differ, the idea does not.
- Configured with **unit files**. A service unit lives at
  `/etc/systemd/system/<name>.service` and is `key=value` lines grouped under bracketed
  section headings — recognisably the same shape as `server.properties`, with sections
  added.
- The keys this lesson uses:
  - `[Unit]` — `Description=` a human-readable name; `After=network.target`, meaning do
    not start this until the network is up.
  - `[Service]` — `User=` which account the program runs as (not root);
    `WorkingDirectory=` the absolute path to the server folder; `ExecStart=` the absolute
    path to java followed by its arguments; `Restart=on-failure` to start it again if it
    dies unexpectedly.
  - `[Install]` — `WantedBy=multi-user.target`, which is what makes "enable" mean "start
    at boot".
- `WorkingDirectory` matters for exactly the reason established in
  `modules/minecraft-server/lessons/running-your-own-server/`: a Minecraft server creates
  its files in whatever folder it starts from. Started by systemd, that folder is whatever
  the unit says. **systemd does not expand `~`** — absolute paths only.
- Commands: `sudo systemctl daemon-reload` after editing a unit file;
  `sudo systemctl start|stop|restart <name>`; `sudo systemctl enable <name>`;
  `sudo systemctl status <name>`; `sudo journalctl -u <name> -f` to follow its output.
- **`start` and `enable` are different things and the distinction confuses everyone:**
  `start` runs it now, `enable` marks it to run at every boot, and neither implies the
  other. `enable --now` does both.
- **There is no console window any more.** Two consequences, the same pair as any service:
  the server's own words still go to `logs/latest.log` inside the server folder, and
  failures that happen *before the server starts* — wrong path to java, wrong folder,
  wrong permissions — never reach that file and land in systemd's journal instead.
  `journalctl -u <name>` is where they are.
- `systemctl stop` asks the program to quit. Whether the Minecraft server saves the world
  cleanly when asked this way is **checkable rather than assertable**: stop it, then read
  `logs/latest.log` for the saving lines. Deliveries must have the learner check. Doing
  better than this — actually typing `stop` into the server — is left as a Go further
  question.
- A machine is restarted with `sudo reboot`. The SSH connection drops; a new one works
  once the machine is up.
- Starting a second copy by hand while the service runs produces a port collision — the
  same two-programs-one-port error already met on the learner's own computer.

### The cutover

- The address friends use is the machine's public address. Nothing about the learner's
  home network is involved: no port forwarding, no tunnel, no overlay network. Those
  existed to work around the fact that home connections are not reachable from the
  internet; a rented machine is reachable, and a large part of what the monthly charge
  buys is exactly that.
- The route built in `modules/minecraft-server/lessons/letting-friends-join/` is not
  removed — the server still on the learner's own computer may still use it.
- `online-mode=true` in `server.properties` on any machine reachable by strangers.
- `whitelist.json` came across with the folder, so the whitelist is already populated.
  Deliveries must have the learner *read it* rather than assume it arrived.
- Minecraft's port on this machine is genuinely open to the whole internet, so anyone can
  attempt to connect. The whitelist is what stops them joining. Worth stating plainly
  rather than leaving implied.

## Arc

### Orientation — given plainly

What systemd is and that it is the same idea as launchd in a different costume; where
unit files live and every key used; the `start`/`enable` distinction; that `~` is not
expanded; the no-console consequence and where the two kinds of failure go; how to reboot;
the port collision; and the whole cutover — address, whitelist, `online-mode`.

Framing sentence: the server is running because you are sitting there. Close the
connection and it stops. What you want is a machine that starts the server itself, with
nobody logged in — because on this machine, nobody ever is.

### Predictions to elicit

- The server is running in your SSH session right now. What do you think happens to it
  when you close that window? What would have to be true for it not to stop?
- On your own computer, some things come back after a restart and some don't. Something
  must hold the list of what comes back. Where do you think that list lives on this
  machine?
- Once the server has no console window, where do its words go? And where do the
  complaints go from a failure that happens *before* the server exists?
- Your friends currently type an address to join. What has to change, and what does not?

### The work — goals and hint ladders

**1. Write the unit.** A completion problem: the structure is given with the load-bearing
values blanked — `User`, `WorkingDirectory`, `ExecStart`, `Restart`. Every blank is
answerable from something already known:

- `User=` — which account owns the folder. Not root.
- `WorkingDirectory=` — a Minecraft server creates all its files in whatever folder it
  starts from, learned the first time the world appeared next to the jar. Started by
  systemd, that folder is whatever this line says. Absolute path: systemd does not
  understand `~`.
- `ExecStart=` — the absolute path to java (`which java`), then the arguments exactly as
  typed by hand last session.
- `Restart=on-failure`.

Deliveries should have the learner notice the file's shape: `key=value` under bracketed
headings, recognisably the same idea as `server.properties`.

**2. Load and start it.** `daemon-reload`, then `enable --now`, then `status`, then
`journalctl -u minecraft -f` to watch it start. Stop the hand-run copy first or meet the
port collision.

The `start` versus `enable` distinction is stated here, plainly, because nearly everybody
gets it wrong once.

**3. The reboot test.** `sudo reboot`. Watch the connection die — that is the machine
going down, exactly as it should. Wait. Reconnect. Find the server already running.

Deliveries must give this its moment. Nobody logged in; there is no login on this machine
at all. The last human-shaped gap did not get closed, it stopped existing.

**4. Hand it to friends.**

- Give them the new address. Not a tunnel address, not anything to do with the home
  network.
- **Read `whitelist.json` on the machine** rather than assuming it arrived.
- Check `online-mode` is `true` and be able to say why it matters more here than at home.
- Have a whitelisted friend join.

**5. The demonstration.** With friends playing, shut the laptop, unplug it, carry it into
another room. Nothing happens.

**6. Learn to stop what you cannot see.** `systemctl stop`, then read `logs/latest.log`
for the saving lines. Whatever is found is a fact the learner measured, and it decides
how much they trust a service stop with a world they care about.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Break the path in the unit file.** Misspell the path to `server.jar`, or to java. One
  letter is enough. `daemon-reload`, restart the service. Nothing starts — and nothing
  appears in `logs/latest.log` either, because the failure happened before the server
  existed to write anything down. The task is to find where the complaint actually went:
  `systemctl status` says it failed; `journalctl -u minecraft` says what it tried to run
  and what it could not find. Teaches the durable skill — a background program's errors
  always go somewhere, and knowing where is the first job of running anything. Undo: fix
  the path, `daemon-reload`, restart, verify.
- **Start it twice.** With the service running, start the server by hand in an SSH session
  and read the refusal. The port collision is an old friend from the learner's own
  computer, and meeting it here proves the error was never about that machine. Undo: quit
  the hand-started one.

### What just happened — the explanation

A computer nobody is sitting at, that nobody is logged into, in a building the learner
will never enter, starts their server when it boots and will do it again at three in the
morning without telling anyone.

"Services" and "programs you run" turn out to be the same species. The only difference is
who types the start command: you, or a program whose job is starting programs. Every
server on earth — every website, every game server, every service behind every app on a
phone — is an ordinary program that some machine's startup system launches at boot,
watches while it runs, and stops at shutdown. On Linux that system is systemd; a Mac calls
it launchd and configures it with XML instead. The names change, the idea does not, and
the learner has now written one of those files.

The settings-file collection is longer than it looks by now: `key=value` in
`server.properties`, JSON in datapacks and the whitelist, and now `key=value` under
bracketed headings in a unit file. Different costumes, same idea every time — a program's
behaviour is data, data lives in files, and files can be edited.

Something was given up, and it is worth naming: the console window. When the server became
a service its interface moved. Starting and stopping belong to `systemctl` now, the
server's own voice lives in `logs/latest.log`, and complaints from before the server even
exists — a bad path, a missing program — live in the journal, because a program that never
started cannot write to its own log. Knowing which of those places to look in, and when,
is most of what operating a server means.

And the thing that quietly disappeared across this whole module: NAT, tunnels, port
forwarding, the entire apparatus from letting friends in. None of it was needed. All of it
existed to work around home connections not being reachable from the internet — and a
large part of what the monthly charge buys is a machine that simply is.

### Go further — open questions

- `systemctl stop` asks the server to quit. Did it save properly first? You found out
  rather than guessing. If the answer was unsatisfying, a better version exists: something
  that types `stop` into the running server the way you used to. What would have to be
  true for a unit file to do that? `man systemd.service` is the surface to read.
- Run `systemctl list-units --type=service` and read every line. Each one is a program
  running for you right now, each with a file like the one you wrote. How much of this
  machine turns out to be the same mechanism repeated?
- `Restart=on-failure` restarts a server that dies. What happens if it dies *instantly*,
  every single time it starts? What would that look like, and what would you want systemd
  to do instead?
- Your friends type an address made of numbers. What would it take for them to type a name
  instead — and what is a name, technically, that a number isn't?
- Genuinely open: your world now sits on a disk you do not own, in a building you cannot
  enter, belonging to a company that could stop existing. Who can read it? What does your
  provider actually promise about it? What happens if a payment fails? Find their own
  words rather than assuming, and then decide what you want to be true about where your
  backups live.

## Delivery notes

- **guided:** level 2. The unit file is a completion problem, not a hint ladder — the
  structure is given and the load-bearing values are blanked.
- The reboot test must be given its moment rather than listed as a step. It is the
  emotional centre of the lesson, and the "there is no login on this machine at all"
  observation is the payload.
- Do not assume `modules/minecraft-server/lessons/always-on/` has been done. systemd is
  explained from nothing; the launchd parallel is an aside for those who have it, never a
  dependency. This module does answer that lesson's closing open question, and "What just
  happened" may say so — but only in a way that reads cold to someone who never saw it.
- The demonstration at the end is the module's milestone and must not be trimmed or
  reduced to a sentence.
- Have the learner read `whitelist.json` rather than assume it arrived. Assuming is the
  failure mode this whole module argues against.
- Do not assert what the server does when systemd stops it; the learner measures it.
- **reference:** the complete unit file, the command sequence, `enable` versus `start`, no
  `~` in unit files, the heap reminder, where the two kinds of failure go, and the cutover
  checklist.
