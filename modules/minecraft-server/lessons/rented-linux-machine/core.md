# Moving your server to a rented Linux machine

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** rented-linux-machine
- **Part:** Part 3 — Infrastructure
- **Scaffolding:** mixed, recorded per section. Level 1 for the remote-machine
  material (SSH, key pairs, users, sudo, firewall) — this is the first lesson of a
  genuinely new skill, and the failure mode is being locked out of a machine you are
  paying for, which is a bad place to be stuck. Level 2 for the parts that echo
  skills already held: copying folders (worlds-and-backups), a program-starter
  configured by a file (always-on), ports and whitelists (letting-friends-join).
- **Deliveries:** guided + reference. Setup-heavy and account-heavy; an adult may
  execute the provisioning from the reference delivery while the learner does the
  rest.
- **Status:** ready

## Goal and payoff

The server stops living on the learner's own computer and moves to a Linux machine
rented by the month, which the learner administers entirely over the network. By the
end there is a computer they have never seen, in a building they will never visit,
with no screen and nobody logged into it, running their world — and it came back from
a reboot on its own.

Payoff other people can see: friends join at an address that has nothing to do with
the learner's house, and keep playing after the learner shuts their laptop and walks
away with it. That last demonstration is the whole lesson in one gesture.

The lesson under the lesson: "the cloud" is a rented computer. Every skill in this
lesson — a shell on a remote machine, a user that isn't root, a firewall, a service
file, copying files over the network — is what running any internet service consists
of, whether it serves a game, a website, or a bank.

## Prerequisites

Conditions of the world:

- A Minecraft server folder on your own computer that you can start, stop, and join —
  established by `lessons/running-your-own-server/`
- People outside your home have joined that server, so an address, a port, and a
  whitelist are familiar things — established by `lessons/letting-friends-join/`
- A backup you have actually restored from, and a way to take a fresh one — established
  by `lessons/worlds-and-backups/`. The world is about to be copied across a network;
  a current backup is the condition for doing that calmly.
- Someone able to open an account with a hosting company and take on a small recurring
  charge. This involves an identity check and a payment method, so it may not be the
  person doing the rest of the lesson. It can be done days in advance, and the
  reference delivery exists so that it can be.

Deliberately **not** a prerequisite: `lessons/always-on/`. The startup system here is
explained from nothing. For a reader who has met launchd, the parallel is drawn where
it helps; for a reader who hasn't, nothing is missing.

## Establishes

- A rented Linux machine the learner can log into over the network and administer —
  cited by other cores as: "a Linux server the learner controls, reachable at a public
  address — established by `lessons/rented-linux-machine/`."
- The Minecraft server runs there, starts itself when the machine boots, and is
  reachable without anything in the learner's home being switched on.
- The learner can: generate and use an SSH key pair; log into a remote machine; create
  a user and grant it `sudo`; install software with `apt`; open and close ports with a
  firewall; write a `systemd` unit; copy folders between machines with `rsync`; read a
  background program's logs with `journalctl`; and destroy a rented machine to stop
  paying for it.
- Two machines with different jobs: one where things get built and broken, one where
  things run for other people. The words for that split were named in
  `lessons/choosing-a-version/`; from here the split is physical.

## Facts

### Where commands run

This lesson's commands run in two places, so every code block in every delivery
carries a where-to-run label (the rule is in `PRINCIPLES.md`). The two place-names,
to be used verbatim and nowhere varied:

- **On your Mac** (the local variant) — `ssh-keygen`, reading `~/.ssh`, the outgoing
  `ssh` connection itself, and every `rsync` that pushes the server folder up. rsync
  is always driven from the Mac, never from the far side.
- **On the rented machine** (the remote variant) — everything typed after an `ssh`
  session opens:
  `adduser`/`usermod`, copying the key into the new user's home, `apt`, `ufw`, the
  hand-run server, the unit file, and every `systemctl` and `journalctl`.

The unit file is a file rather than a command and takes a label all the same: the
question a reader has about it is identical.

### The provider

- A **cloud server** (also "instance", "VPS", "virtual private server") is a share of a
  real computer in a data centre, rented by the hour. It arrives with an operating
  system installed and nothing else on it. It has a public address on the internet from
  the moment it exists.
- This lesson's default provider is **OVHcloud** (us.ovhcloud.com). Chosen on price,
  which is not close: a 4 GB machine costs roughly a fifth of the equivalent elsewhere,
  with unlimited traffic rather than a transfer cap. [volatile as of 2026-09]
- Named alternative, for anyone who wants per-second billing or a larger tutorial
  library to wander through: **DigitalOcean**. Everything in this lesson after the
  machine exists is identical on any provider. [volatile as of 2026-09]
- **Price check performed 2026-09-01. It moved this lesson's default twice, and the
  record is kept so the next author can see the reasoning rather than guess at it.**
  An early draft chose Hetzner on the claim that it cost roughly a fifth of the
  alternatives — true of an older Hetzner lineup, false of the current one. Measured on
  the providers' own pages that day:
  - **OVHcloud VPS-1** — 2 vCore / 4 GB / 40 GB NVMe / unlimited traffic —
    **$5.35/month with no commitment**, $4.54 on a 12-month term.
  - **OVHcloud VPS-2** — 4 vCore / 8 GB / 75 GB / unlimited traffic — **$10.00/month
    with no commitment**, $8.50 on a 12-month term.
  - DigitalOcean Basic — 2 vCPU / 4 GB / 80 GiB / 4,000 GiB transfer — $24/month, or
    $28 for the Premium Intel or AMD variant. 8 GB is $48.
  - Hetzner CPX21 — 3 vCPU / 4 GB / 80 GB — €32.49/month in US locations, 2 TB traffic.
    CPX22 at €19.99 is EU-only.
  Deliveries: point at the pricing pages, never print a price.
- **The billing model differs from the other two and the lesson must say so.** OVHcloud
  VPS is a **monthly subscription that auto-renews**, not per-second billing. A machine
  created and deleted the same afternoon still costs a month. Two consequences: the
  lesson cannot claim an experiment machine costs pennies, and knowing where the cancel
  control lives matters *more* here, not less — a forgotten hourly machine is a slow
  leak, a forgotten subscription renews on its own until somebody stops it.
- [volatile as of 2026-09] OVHcloud commitment discounts: 5% for six months, 15% for
  twelve. Advertised "starting at" prices are the twelve-month figures, which is why a
  configurator set to no commitment shows a higher number than the product page. Worth
  knowing because it looks like a bait-and-switch and isn't.
- **The Local Zones trap [verify as of 2026-09].** OVHcloud markets lower-latency
  "Local Zone" locations — attractive here precisely because latency to players is the
  location decision this lesson cares about. Its own feature table marks several
  inclusions as excluding Local Zones, daily automatic backup and anti-DDoS among them.
  Deliveries: have the learner check what is included at the location they choose,
  rather than for the product in general.
- **Recommended size, and the reason:** at a given price, prefer faster cores over more
  of them. Minecraft's world runs on a single thread, so single-core speed is what moves
  tick times and core count barely matters. This is orientation; the decision stays the
  learner's.
- **Open question, honestly unresolved [verify].** Budget providers reach these prices
  partly through oversubscription — more virtual machines per physical core — and
  single-core speed under contention is exactly the metric a Minecraft server lives on.
  OVHcloud is an established provider rather than a bargain-bin one, and unlike some
  competitors does not describe its cheap tiers as being for workloads where processor
  speed does not matter. But this has not been measured. It is measurable, by the
  learner, with the tools in `modules/server-performance/`, and a delivery may say so.
- [volatile as of 2026-09] OVHcloud locations include sites in the United States,
  Canada, Europe, and Asia-Pacific. The one decision that matters: pick the location
  closest to the people who will play, because distance costs time and nothing fixes it
  later.
- [volatile as of 2026-09] Signup requires an email address and a payment method, and
  on OVHcloud and DigitalOcean is usually immediate. Some providers — Hetzner among them
  — additionally run a risk-based identity check, which can take anywhere from an hour to
  a couple of working days. Deliveries: say plainly that account creation can block, and
  that this is why the account is worth creating days before the rest of the lesson.
- [volatile as of 2026-09] OVHcloud's US site and DigitalOcean both bill in US dollars.
  Hetzner bills in euros, so a card issued elsewhere may add a foreign-transaction fee.
  Sales tax is added at checkout in some jurisdictions. Deliveries: mention tax once, in
  passing — on these amounts it is a rounding error, and dwelling on it next to a
  five-fold price difference misleads about what matters.
- [volatile as of 2026-09] Billing model varies and the learner must find out which one
  they are on: a **monthly subscription that auto-renews** (OVHcloud) or **per-second
  billing capped at a monthly maximum** (DigitalOcean). Either way a machine that exists
  is costing money whether or not anyone is playing, and powering it off does not
  necessarily stop that — only cancelling or deleting does. Deliveries: have the learner
  find their provider's own statement rather than trusting a description here.
- [volatile as of 2026-09] Creating the machine: choose location, image (Ubuntu LTS),
  machine size, and an SSH key, then create. The console shows the new machine's public
  address. DigitalOcean calls the machine a Droplet; Hetzner calls it a Server. The
  steps are the same shape on both. Deliveries: walk the *decisions*, point at the
  provider's own documentation for the exact screens, and use no screenshots — console
  layouts change and screenshots rot faster than anything else in a lesson.
- **The provider's web console** is a back door: a keyboard and screen for the machine,
  in a browser, that works even when the network configuration on the machine is
  broken. It exists because the provider owns the hardware. Reaching it needs a way to
  log in that isn't the SSH key — on both providers, resetting the root password from
  the panel. DigitalOcean calls its browser terminal the Droplet Console and offers a
  password reset alongside it; Hetzner's equivalent sits in the server's own panel.
  [verify current wording and location on the chosen provider as of 2026-09] This is the
  rescue path
  for the firewall exercise below, and it must be found and tested *before* it is
  needed.

### The exit condition for provisioning

Everything after this point is identical on every provider, so the provider-specific
section ends at a stated contract, and deliveries must state it in exactly these terms:

> You have a machine running Ubuntu LTS, you know its public address, and you can open
> a terminal on your own computer and get a command prompt on that machine.

How that contract is met is the provider's business. This phrasing is also what lets a
different provider — or one day a physical computer on a shelf — be substituted without
touching the rest of the lesson.

### SSH

- **SSH** ("secure shell") is a program that gives you a command line on another
  computer over the network. Everything typed and everything printed is encrypted in
  transit. It is how essentially every server on the internet is administered.
- The `ssh` command ships with macOS. [macos] On the far end, Ubuntu runs the matching
  server program by default, which is why a brand-new machine is reachable immediately.
- Form: `ssh <user>@<address>`. Leaving with `exit`, or Control-D.
- SSH normally listens on **port 22** — the same kind of number as Minecraft's 25565,
  and worth naming as such, because the port concept is already held.
- A **key pair** is two files generated together:
  - a **private key** (`~/.ssh/id_ed25519`), which never leaves the computer that made
    it and is never sent anywhere, ever;
  - a **public key** (`~/.ssh/id_ed25519.pub`), which is safe to hand to anyone, paste
    into a web form, or publish.
  A machine holding a copy of the public key will let in whoever can prove they hold
  the matching private key. The proof happens without the private key crossing the
  network.
- Generated with `ssh-keygen -t ed25519`. It offers a default filename (accept it) and
  an optional **passphrase**, which encrypts the private key file itself so that
  stealing the file isn't enough. [macos] macOS can remember the passphrase in the
  keychain so it isn't typed every time.
- On the remote machine, the accepted public keys for a user live in one file:
  `~/.ssh/authorized_keys`. This is the entire mechanism. Adding a line to that file
  grants access; removing it revokes access.
- Why this beats a password: a password is short enough to guess and gets typed
  repeatedly; a key is long, random, and never transmitted. Machines exposed to the
  internet are guessed at constantly (see below), and a key means there is nothing to
  guess.
- **The host key prompt.** The first connection to a machine prints a fingerprint and
  asks whether to continue. This is the machine identifying *itself* — the reverse
  direction of the check. The answer is recorded in `~/.ssh/known_hosts`, and if it
  ever changes on a later connection, SSH refuses loudly. Rebuilding a machine at the
  same address is the ordinary cause; the fix is removing the stale line, which SSH's
  own error message explains how to do.
- A public machine is scanned continuously by automated programs looking for login
  prompts. The first attempts to log in as `root` typically arrive within minutes of a
  machine appearing. This is background noise of the internet, not a targeted attack,
  and it is visible in the machine's own logs. [verify current Ubuntu location as of
  2026-09: `journalctl -u ssh` versus `/var/log/auth.log`]

### The machine

- **Ubuntu** is a Linux distribution. **LTS** means Long Term Support: a release
  supported with security updates for years, which is what a server wants. [volatile as
  of 2026-09: which release is current — deliveries point at Ubuntu's releases page]
- **root** is the administrator account that exists on every Linux machine. It can do
  anything, including irreversibly destroy the system, and nothing stops it or asks for
  confirmation. Providers hand over a new machine as root because there is no other
  account yet.
- Working as root all the time is avoided for two reasons worth stating plainly: a
  mistyped command has no safety margin, and there is no record distinguishing
  "administrative act" from "ordinary work". The convention everywhere is: a normal user
  for daily work, and `sudo` in front of the individual commands that need
  administrative power.
- `adduser <name>` creates a user with a home directory at `/home/<name>`.
  `usermod -aG sudo <name>` puts that user in the `sudo` group, which is what grants
  the privilege. [verify group name is `sudo` on current Ubuntu as of 2026-09]
- A new user's `~/.ssh/authorized_keys` starts empty, so a freshly created user cannot
  be logged into with the key that works for root until the file is copied across —
  with the ownership set to the new user, or SSH ignores it. The standard one-liner,
  run as root: `rsync --archive --chown=<name>:<name> ~/.ssh /home/<name>/`
- Password-based SSH login is turned off in `/etc/ssh/sshd_config` with
  `PasswordAuthentication no`, and root login with `PermitRootLogin no`, after which
  the SSH server is restarted. [verify as of 2026-09: current Ubuntu cloud images
  frequently set these already, and settings may live in files under
  `/etc/ssh/sshd_config.d/` that override the main file — deliveries have the learner
  check what is already true before changing anything]
- **The lockout rule, non-negotiable and stated plainly every time it applies:** while
  changing anything that affects how you log in — SSH configuration or the firewall —
  keep a second terminal open and already logged in, and do not close it until a *new*
  connection has been proved to work in a third one. A session already open keeps
  working; the question is always whether the next one will.
- `apt` is Ubuntu's package manager: it installs software from Ubuntu's own catalogue.
  `sudo apt update` refreshes the catalogue; `sudo apt install <name>` installs. It is
  the same job Homebrew does on a Mac, and naming that equivalence is free.
- Java on Ubuntu: `sudo apt install openjdk-<N>-jre-headless`. **JRE** is the part that
  runs Java programs (as opposed to the JDK, which also compiles them). **headless**
  means the version without graphical components, which a machine with no screen has no
  use for. [volatile as of 2026-09: which Java version the current Minecraft server
  requires — deliveries point at Minecraft's own server requirements, and at the error
  the server itself prints when the version is wrong, which names what it wanted]
- `which java` prints the absolute path to the installed Java, needed later by the
  service file.
- Useful commands for reading a machine you have just met: `whoami`, `ls /`, `df -h`
  (disk space), `free -h` (memory), `uname -a` (kernel and processor), `htop` or `top`
  (running programs). None of these change anything.

### The firewall

- `ufw` ("uncomplicated firewall") is Ubuntu's front end for the firewall built into
  Linux. A firewall decides which ports accept connections from outside.
- `sudo ufw allow OpenSSH` (or `allow 22`), `sudo ufw allow 25565`, `sudo ufw enable`,
  `sudo ufw status`.
- **Enabling the firewall without first allowing SSH disconnects you and prevents
  reconnection.** This is the single most common way people lose a rented machine. It
  is also completely recoverable through the provider's web console, which is why that
  console gets found and tested before this step happens.
- The firewall is deliberately used *on the machine* rather than through the provider's
  own firewall product, for two reasons: it is identical on every Linux machine
  anywhere, and it keeps the lesson free of a second provider-specific screen.

### Copying the server across

- `rsync` copies files and folders, locally or between machines over SSH. It ships with
  macOS. [macos]
- Form: `rsync -av --progress <source>/ <user>@<address>:<destination>/`
- `-a` (archive) copies recursively and preserves timestamps and permissions; `-v` is
  verbose; `--progress` shows progress on large files; `-z` compresses in transit,
  which helps on a slow upload.
- **The trailing slash on the source is load-bearing and catches everyone:**
  `folder/` copies the *contents* of the folder into the destination; `folder` copies
  the folder itself, producing `destination/folder`. Deliveries must state this and
  should have the learner see both outcomes.
- `--dry-run` performs no copying and prints exactly what would happen. It costs
  nothing and it is the habit worth installing: look before a network copy, every time.
- `--delete` makes the destination match the source exactly, deleting anything extra at
  the destination. It is not used in this lesson and is named only as a hazard, because
  it appears in every rsync example on the internet.
- **The server must be stopped before the world is copied.** A world being written to
  while it is read produces a copy of a state that never existed as a whole. This is the
  same rule met in `lessons/worlds-and-backups/`, arriving for the second time with a
  new consequence.
- What travels in the folder, and is worth listing explicitly because it is more than
  people expect: the world, `server.properties`, `whitelist.json`, `ops.json`, any
  datapacks, and `eula.txt` with the agreement already accepted. Nothing has to be set
  up again on the far side. The friends who were allowed in are still allowed in.
- What does *not* travel: anything the learner installed on their own computer. Java in
  particular is not in the folder — it is installed separately on the new machine,
  which is why that step comes first.

### The startup system

- **systemd** is Linux's program-starter: the first program the machine runs, which
  starts everything else and keeps it running. Every background program on a modern
  Linux machine is started by it. This is the same job macOS's launchd does; the names
  and file formats differ, the idea does not.
- systemd is configured with **unit files**. A service unit lives at
  `/etc/systemd/system/<name>.service` and is `key=value` lines grouped under
  bracketed section headings — recognisably the same shape as `server.properties`, with
  sections added.
- The keys this lesson uses:
  - `[Unit]` — `Description=` a human-readable name; `After=network.target` meaning
    don't start this until the network is up.
  - `[Service]` — `User=` which user the program runs as (not root);
    `WorkingDirectory=` the absolute path to the server folder; `ExecStart=` the
    absolute path to java followed by its arguments; `Restart=on-failure` to start it
    again if it crashes.
  - `[Install]` — `WantedBy=multi-user.target`, which is what makes "enable" mean
    "start at boot".
- `WorkingDirectory` matters for exactly the reason established in
  `lessons/running-your-own-server/`: a Minecraft server creates its files in whatever
  folder it starts from. Started by systemd, that folder is whatever the unit says it
  is. **systemd does not expand `~`** — absolute paths only.
- Commands: `sudo systemctl daemon-reload` after editing a unit file;
  `sudo systemctl start|stop|restart <name>`; `sudo systemctl enable <name>`;
  `sudo systemctl status <name>`; `sudo journalctl -u <name> -f` to follow its output.
- **`start` and `enable` are different things and the distinction confuses everyone:**
  `start` runs it now, `enable` makes it run at every boot, and neither implies the
  other. `enable --now` does both.
- The Java heap: `-Xmx<N>G` sets the maximum memory the Java program will use for the
  world and its contents. It must be meaningfully *below* the machine's total memory,
  because the Java runtime needs memory beyond the heap and the operating system needs
  its own. Roughly 3 GB on a 4 GB machine. A number set too high produces a machine that
  runs out of memory and kills the server, which looks like a crash with no explanation
  in the server's own log.
- **There is no console window any more.** Two consequences, the same pair as any
  service: the server's own words still go to `logs/latest.log` inside the server
  folder, and failures that happen *before the server starts* — wrong path to java,
  wrong folder, wrong permissions — never reach that file and land in systemd's journal
  instead. `journalctl -u <name>` is where they are.
- `systemctl stop` asks the program to quit. Whether the Minecraft server saves the
  world cleanly when asked this way is **checkable rather than assertable**: stop it,
  then read `logs/latest.log` for the saving lines. Deliveries must have the learner
  check. Doing better than this — actually typing `stop` into the server — is left as a
  Go further question.
- A machine can be restarted with `sudo reboot`. The SSH connection drops; a new one
  works again once the machine is up.

### Joining the moved server

- The address friends use is now the machine's public address. Nothing about the
  learner's home network is involved: no port forwarding, no tunnel, no overlay
  network. Those existed to work around the fact that home connections are not
  reachable from the internet; a rented machine is reachable, and that is a substantial
  part of what the monthly charge buys.
- The route built in `lessons/letting-friends-join/` is not removed — the server still
  on the learner's own computer may still use it.
- `online-mode=true` in `server.properties` on any machine reachable by strangers.
  `whitelist.json` came across with the folder, so the whitelist is already populated,
  and `enforce-whitelist` behaves as it did before.
- Minecraft's port on this machine is genuinely open to the whole internet, which means
  anyone can *attempt* to connect. The whitelist is what stops them joining. This is
  worth stating plainly rather than leaving implied.

## Arc

### Orientation — given plainly

Everything in Facts is orientation and none of it is withheld: what a rented machine
is; that it costs money every hour it exists and how to stop that; what SSH is and how
a key pair works; what root is and why a normal user with `sudo` is the convention;
what `apt`, `ufw`, `rsync`, and `systemd` are and what each is for; the exit condition
for the provisioning section; and the two lockout hazards, stated as rules before the
steps that could trigger them rather than as warnings afterwards.

The framing sentence for the lesson: the server has been running on a computer that
belongs to someone in the house, which means it is up only while that computer is awake
and at home. The alternative is a computer whose entire job is to be up — one that
nobody sits at, that has no screen, and that is reached only by typing at it from
somewhere else.

For a reader who has met launchd, systemd is named as the same idea. For a reader who
has not, systemd is explained from nothing and nothing is missing.

### Predictions to elicit

- List everything that has to be switched on, awake, and at home right now for a friend
  to join your server. How many of those things are in one building?
- The machine you are about to rent has no screen, no keyboard, and no mouse, and you
  will never be in the same room as it. How do you think you type commands into it?
- Your server folder holds the world, the settings, and the list of who is allowed in.
  If that entire folder appeared on a different computer and the server started there,
  what would be different for the people joining — and what would be identical?
- A brand-new machine appears on the internet with a login prompt open to the world.
  How long do you think it takes before a stranger's program tries to log into it?
  Write down a number before you look.
- You are about to pay for this by the hour. What do you think happens to the charge if
  you turn the machine off but don't delete it?

### The work — goals and hint ladders

**1. Make a key pair.** *(level 1)* Before anything is rented, because the public key
gets pasted into the provider's form during creation. Goal: `ssh-keygen -t ed25519` on
the learner's own computer, accepting the default filename; then look at both files
that appeared, and be able to say which one may be given away and which must never be.
Given plainly, not hinted — this is a tool, not a puzzle. The one thing to make them do
rather than read: open both files and see that one is short enough to paste into a web
form and the other says at the top that it is private.

**2. Rent the machine.** *(level 1; may be executed by an adult from the reference
delivery)* Goal is the stated exit condition — Ubuntu LTS, a public address, and a
command prompt. Real decisions to reason through rather than click past:

- Location: nearest to the people who will play. Have them name the people first and
  the location second.
- Size: from the number of people who will actually play, not the largest number
  imaginable. Memory is the constraint.
- Image: Ubuntu LTS, current release found on Ubuntu's own page.
- The SSH key: pasted from the `.pub` file made in step 1.

Deliveries point at the provider's documentation for the screens. The section closes by
restating the exit condition, so it is obvious whether it has been met.

**3. Get in, and read what you rented.** *(level 1)* Goal: `ssh root@<address>`, answer
the host key prompt having understood what it is asking, and arrive at a prompt. Then a
read-the-surface pass, changing nothing: `whoami`, `ls /`, `df -h`, `free -h`,
`uname -a`. The point of the pass is the realisation that this is not a Minecraft
appliance but an entire general-purpose computer with an operating system, a disk, and
a list of running programs — one they are now responsible for.

- Rung 1 (if the connection is refused or hangs): three things have to be true — right
  address, machine finished starting, key the machine actually knows. Which of those
  can you check without SSH?
- Rung 2: the provider's console shows whether the machine is running and which key was
  attached at creation. `ssh -v` prints what it tries and where it stops.

**4. Stop being root.** *(level 1 — the most unforgiving section in the lesson)* Goal: a
user called `minecraft` that can log in with the same key and use `sudo`, followed by
turning off password logins and root logins over SSH. State the lockout rule before the
first command, not after.

- Create the user, add it to the `sudo` group.
- Get the key across. Hint ladder:
  - Rung 1: the new user can't log in with your key yet. Root can. What does root have
    that the new user doesn't — and where does SSH look to decide who may log in as
    someone?
  - Rung 2: it is one file, `~/.ssh/authorized_keys`, in that user's own home folder.
    Copying it is not enough on its own: the file has to *belong* to the new user, or
    SSH refuses to trust it.
  - Rung 3: `rsync --archive --chown=<name>:<name> ~/.ssh /home/<name>/`, run as root.
- Prove it: a **new** terminal, `ssh minecraft@<address>`, then `sudo whoami`, which
  answers `root` — the one-command version of the power, borrowed and handed back.
- Then the SSH configuration. Have them first look at what is already set, because
  current Ubuntu images often set both already and discovering that is better than
  changing something that was never on. Restart the SSH server; prove a new connection
  works *before* the original session is closed.

**5. Read who has been knocking.** *(level 2)* Goal: find the record of login attempts
on this machine and read it. The strangers are already there, and they arrived while
the learner was reading step 3. Have them check the prediction they wrote. Then the
important half: work out why this is not an emergency. Nothing here is a wall keeping
attackers out — the front door is wide open and always will be. What changed is that
there is no longer anything to guess.

- Rung 1: the machine writes down every attempt to log into it. Where does a Linux
  machine write things down?
- Rung 2: the same journal that will hold the Minecraft server's startup failures later
  — `journalctl` — with the SSH service named. Filtering for "invalid user" is a fast
  way to see the shape of it.

**6. Install Java.** *(level 2)* Goal: `sudo apt update`, then the headless JRE, then
`java -version` printing something. The version needed is looked up at Minecraft's own
source, not taken from the lesson. Name the equivalence with Homebrew in passing —
second package manager, same job, and now the concept has two instances, which is what
makes it a concept.

**7. Move the server across.** *(level 2 — the mechanics echo the backups lesson)*
Goal: the server folder, whole, on the new machine.

- Take a fresh backup first. Non-negotiable, and the reason is one sentence: this is the
  first time the world has ever been sent over a network.
- Stop the local server. State why in the learner's own words before doing it.
- `--dry-run` first, and *read the output* — this is the habit being installed, and it
  is the same habit as reading an error before changing anything.
- Then the real copy, and the trailing-slash question is asked before it is answered:
  which of these two commands puts the folder where you want it, and how would you find
  out cheaply? (`--dry-run` is the answer to "cheaply".)
- Verify from the far side: `ls` the folder, find the world, find `server.properties`,
  find `eula.txt` and check it already says the agreement is accepted. That last one is
  a small, good surprise and worth pointing at.

**8. Open the port and start it by hand.** *(level 2)* Deliberately by hand before
automating, because proving one layer at a time is the whole method: if it fails after
the service file is added, there are two suspects instead of one.

- Firewall first, with the lockout rule restated: allow SSH, allow 25565, *then*
  enable, then `status` to read what is now true.
- Start the server the way it has always been started, with `-Xmx` set for this
  machine's memory. Watch the log lines go past. They will be familiar, which is the
  point — same program, new home.
- Join it, from the learner's own computer, at the new address. This is the first
  moment the move is real.

**9. Make it a service.** *(level 2; delivered as a completion problem)* Goal: a unit
file at `/etc/systemd/system/minecraft.service`, enabled, surviving a reboot. Structure
given with the load-bearing values blanked: `User`, `WorkingDirectory`, `ExecStart`,
`Restart`.

- The blanks are answerable from things already known: which user owns the folder,
  which folder the server must start in and why, and where java actually is
  (`which java`).
- `daemon-reload`, then `enable --now`, then `status`, then `journalctl -u minecraft -f`
  to watch it start. Stop the hand-run copy first, or meet the port collision — the same
  two-programs-one-port error already met on the learner's own computer.
- **The reboot test, which is the payoff of the section:** `sudo reboot`, watch the SSH
  connection die, wait, reconnect, and find the server already running. Nobody logged
  in. There is no login on this machine at all. That gap — the human step that a
  desktop machine still needs — simply does not exist here.

**10. Hand it to your friends.** *(level 2)* Goal: someone outside the house playing on
the new machine.

- The new address, given to friends. Not a tunnel address, not a home address.
- Confirm the whitelist arrived intact rather than assuming it: read `whitelist.json`
  on the new machine, and have a whitelisted friend join.
- Check `online-mode` is `true` and be able to say why it matters more here than it did
  at home.
- **The demonstration:** with friends playing, shut the laptop and take it out of the
  room. Nothing happens. Nothing depends on it any more. That is the lesson, performed.

**11. Know what it costs and how to stop it.** *(level 1 — this is orientation, not a
puzzle)* Goal: find the provider's billing page, find the current running total, find
where a machine is deleted, and read the provider's own words on what stops the charge.
Do not delete anything. Have them say out loud what would happen if this machine were
forgotten about for a year. A rented machine is a subscription with a command line
attached, and knowing where the off switch is belongs in the same session as switching
it on.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Find the back door before you need it.** Not a failure — a rehearsal, and it comes
  first because the next exercise needs it. In the provider's panel, find the browser
  console that acts as a screen and keyboard for the machine, arrange a way to log in
  through it (on both providers, resetting the root password from the panel), and actually log
  in that way once. Teaches the general lesson that a rescue path is only real if it has
  been used, and the specific one that the provider can always reach the hardware
  because the provider owns it. [verify the chosen provider's current wording and
  location as of 2026-09]
- **Lock yourself out with the firewall.** Now that the rescue path is proved: disable
  the firewall, then re-enable it *without* allowing SSH first. The session in progress
  survives; the next connection does not. Reconnect through the browser console, allow
  SSH, and reconnect normally. Teaches the most common way a rented machine is lost, at
  a moment when losing it costs nothing — and teaches that "locked out" is a state with
  an exit, which is the disposition this whole lab is for. Undo: allow SSH, verify a
  normal connection, and leave the firewall on.
- **Break the path in the unit file.** Misspell the path to `server.jar` or to java,
  `daemon-reload`, restart the service. Nothing starts, and nothing appears in
  `logs/latest.log` — because the failure happened before the server existed to write
  anything. The task is to find where the complaint actually went. `systemctl status`
  says it failed; `journalctl -u minecraft` says what it tried and what it couldn't
  find. Teaches the durable skill: a background program's errors always go somewhere,
  and knowing where is the first job of running anything. This is the same lesson as
  the launchd equivalent, on a different system, which is exactly why it transfers.
  Undo: fix the path, `daemon-reload`, restart, verify.
- **Start it twice.** With the service running, start the server by hand in an SSH
  session. Read the refusal. The port collision is an old friend from the learner's own
  computer, and meeting it here proves the error was never about that machine. Undo:
  quit the hand-started one.

### What just happened — the explanation

A computer that the learner has never seen, in a building they will never enter, is
running their program. It has no screen and no one is logged into it. It came back from
a restart on its own. Everything done to it went through a single encrypted connection
from a terminal window, which is exactly how the servers behind every website, app, and
game are administered — not a simplified version of it, the actual thing.

"The cloud" can be retired as a word here: it is renting a share of someone else's
computer by the hour. The bill arrives monthly, and the machine is deleted when it isn't
wanted.

The two-machine split has become physical. One computer is where things get written and
broken. Another runs for other people and is not the place to try things. The names for
that split were met earlier as words; they are now two addresses.

The startup system is the same idea in a second costume. macOS calls it launchd and
configures it with XML; Linux calls it systemd and configures it with sections of
`key=value`. Both are the first program the machine runs, both start everything else,
and both are told what to do by a text file in a known folder. Every "service" on
earth is an ordinary program plus a file like that one. This is the third or fourth
settings file the module has produced, and the shapes keep changing while the idea never
does: behaviour is data, data lives in files, files can be edited.

The key pair deserves one layer deeper than the lesson strictly required. Two files
made together, one of which can be handed to anyone and published, and one of which
never moves — and possession of the private one can be proven to a machine on the other
side of the world without ever sending it. That is the same mechanism underneath the
padlock in a browser's address bar. The learner has now used public-key cryptography,
which is worth naming, because it will keep turning up for the rest of their life.

And the strangers in the logs are the honest picture of the internet: a public address
is scanned constantly by programs that will never know or care what this machine is for.
The defence was not a wall. The front door is still open and always will be. What
changed is that the lock takes a key nobody can guess, and there is no keyhole for a
password.

Finally, the thing that quietly disappeared: NAT, tunnels, port forwarding, the whole
apparatus from letting friends in. None of it is needed here. All of it existed to work
around home connections not being reachable from the internet — and a large part of what
the monthly charge buys is a machine that simply is.

### Go further — open questions

- `systemctl stop` asks the server to quit. Does it save the world properly first?
  You can find out rather than guess — stop it, then read `logs/latest.log`. If the
  answer is unsatisfying, the better version exists: something that types `stop` into
  the running server the way you used to. What would have to be true for a unit file to
  do that?
- Run `systemctl list-units --type=service` and read every line. Each one is a program
  running for you right now, each with a file like the one you wrote. How much of this
  machine turns out to be the same mechanism repeated?
- Your friends type an address made of numbers. What would it take for them to type a
  name instead — and what is a name, technically, that a number isn't?
- The machine is idle most of the day and charged for anyway. What would it take for it
  to exist only when someone wants to play, and cost nothing the rest of the time?
  People do build this; nobody writing this lesson knows the best way to do it. What
  would have to be true for it to work, and how would a player start a machine that
  isn't running?
- Genuinely open: your world now sits on a disk you don't own, in a building you can't
  enter, possibly in another country, belonging to a company that could stop existing.
  Who can read it? What does your provider actually promise about it? What happens to it
  if the payment fails? Find their own words rather than assuming, and then decide what
  you want to be true about your backups.

## Delivery notes

- **guided:** the split scaffolding matters — do not flatten it. The SSH, key, user, and
  firewall material is level 1 and should show its reasoning throughout; the copy, the
  service file, and the cutover are level 2, resting on the backups and startup-system
  work already done. The unit file is a completion problem, not a hint ladder.
- Both lockout rules appear *before* the steps that can trigger them, phrased as
  standing rules rather than warnings, and the rescue rehearsal precedes the firewall
  exercise. Never present the lockout as a thing to be careful about; present it as a
  thing with a known exit that gets tested first.
- Never assert any provider screen, price, plan name, or menu wording. Walk the
  decisions, point at the provider's own documentation, and use no screenshots. State
  the provisioning exit condition verbatim, because it is what keeps the rest of the
  lesson provider-independent — and what will let a physical machine be substituted
  later without a rewrite.
- Money is content, not fine print: what it costs, which billing model it is on, and where the
  off switch is. Step 11 is not optional and must not be trimmed for length.
- The account-holder is not assumed to be the learner and is never called a parent, a
  household, or anything else. "Someone able to open an account" is the phrasing.
- **New tools** gives the what/why/where-the-documentation-lives for ssh, ssh-keygen,
  apt, ufw, rsync, systemd, and journalctl, and defers the installing and running to
  The work with a plain pointer — this is a setup-flavoured lesson and the two sections
  must not repeat each other.
- Do not assume `lessons/always-on/` has been done. systemd is explained from nothing;
  the launchd parallel is drawn as an aside for those who have it, never as a
  dependency. This lesson does answer that lesson's final open question, and the
  answer may be named as such in "What just happened" — but only in a way that reads
  cold to someone who never saw the question.
- **reference:** carries the complete unit file, the full command sequence in order, and
  every hazard in one place — trailing slash, `--delete`, the two lockout rules and the
  rescue path, `enable` versus `start`, no `~` in unit files, heap size below machine
  memory, stop-the-server-before-copying. The reference delivery is also what an adult
  executes for steps 1, 2, and 11 ahead of a learner's session, so those three must
  stand alone and in order.
- Where-to-run labels are required in every delivery of this lesson, on every code
  block, using the two place-names recorded in Facts. This is the first lesson in the
  lab whose commands run in more than one place, so it is also the first to carry
  them; do not drop them on regeneration, and do not label only the remote blocks —
  the blocks on the learner's own machine are the ones that get assumed.
- Open question for review: step 4 (users, sudo, SSH configuration) is the densest
  passage in the module so far and may want splitting into two goals in the guided
  delivery — creating the user, then closing the door — with the read-who-is-knocking
  step between them as a breather. Flagged, unresolved; decide against the drafted
  delivery rather than in advance.
- Not yet in `PATH.md`: that page only links to lessons whose guided delivery exists.
  It gets its entry when the guided delivery is generated, after step 8
  (`lessons/git-for-your-server/`).
