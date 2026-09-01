# Renting a machine and getting into it

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** renting-a-machine
- **Part:** Part 1 — Getting a machine
- **Scaffolding:** level 1 — first lesson of the remote-machine skill and of this
  module. Reasoning shown throughout, all hints available.
- **Deliveries:** guided + reference. Account-heavy; an adult may execute the whole
  lesson from the reference days ahead of a learner's session.
- **Status:** ready

## Goal and payoff

A computer the learner has never seen, in a building they will never enter, answering
when they type at it.

The lesson does three things and stops: makes a key pair, rents an Ubuntu machine, and
gets a command prompt on it. Then it does one more thing that is not optional — finds
out what the machine costs, which billing model it is on, and where the control that
stops it lives.

Payoff: `ssh root@<address>` returns a prompt on a machine in another state or another
country. That is a genuinely startling moment the first time and the lesson should not
rush past it.

The second payload is the read-the-surface pass. What was rented is not a Minecraft
appliance; it is a complete general-purpose computer with an operating system, a disk,
a memory budget, and programs already running — and all of it is now the learner's to
look after.

## Prerequisites

- A Minecraft server on your own computer that you can start, stop, and join —
  established by `modules/minecraft-server/lessons/running-your-own-server/`. It is what
  the machine is being rented for, and lesson three of this module copies it across.
- Someone able to open an account with a hosting company and take on a small recurring
  charge. This needs a payment method, so it may not be the person doing the rest of the
  lesson. It can be done days in advance, and the reference delivery exists so that it
  can be.

## Establishes

- A key pair on the learner's own machine, and the understanding of which half may be
  published — cited as: "the learner has an SSH key pair and can log into a remote
  machine — established by `modules/remote-server/lessons/renting-a-machine/`."
- A rented Ubuntu LTS machine at a known public address, reachable as root over SSH.
- The learner can read a machine they have just met: `whoami`, `ls /`, `df -h`,
  `free -h`, `uname -a`.
- Knowledge of what the machine costs, which billing model it is on, and where it gets
  cancelled or deleted.

## Facts

### Where commands run

Two places, so every code block in every delivery carries a where-to-run label (rule in
`authoring/PRINCIPLES.md`). The place-names, used verbatim across this whole module:

- **On your Mac** (local variant) — `ssh-keygen`, reading `~/.ssh`, and the outgoing
  `ssh` connection itself.
- **On the rented machine** (remote variant) — everything typed once an `ssh` session
  is open.

### SSH and key pairs

- **SSH** ("secure shell") is a program that gives you a command line on another
  computer over the network. Everything typed and everything printed is encrypted in
  transit. It is how essentially every server on the internet is administered.
- The `ssh` command ships with macOS. [macos] Ubuntu runs the matching server program by
  default, which is why a brand-new machine is reachable immediately.
- Form: `ssh <user>@<address>`. Leave with `exit`, or Control-D.
- SSH normally listens on **port 22** — the same kind of number as Minecraft's 25565,
  and worth naming as such, because the port concept is already held from
  `modules/minecraft-server/lessons/letting-friends-join/`.
- A **key pair** is two files generated together:
  - a **private key** (`~/.ssh/id_ed25519`), which never leaves the computer that made
    it and is never sent anywhere;
  - a **public key** (`~/.ssh/id_ed25519.pub`), safe to hand to anyone, paste into a web
    form, or publish.
  A machine holding a copy of the public key will let in whoever can prove they hold the
  matching private key, and the proof happens without the private key crossing the
  network.
- Generated with `ssh-keygen -t ed25519`. It offers a default filename (accept it) and
  an optional **passphrase**, which encrypts the private key file itself so that
  stealing the file is not enough. [macos] macOS can remember the passphrase in the
  keychain.
- Why this beats a password: a password is short enough to guess and gets typed
  repeatedly; a key is long, random, and never transmitted.
- **The host key prompt.** The first connection prints a fingerprint and asks whether to
  continue. This is the machine identifying *itself* — the check running in the other
  direction. The answer is recorded in `~/.ssh/known_hosts`, and if it ever changes,
  SSH refuses loudly. Rebuilding a machine at the same address is the ordinary cause;
  SSH's own error explains the fix.

### Two failure shapes worth distinguishing

- A **timeout** means nothing answered: wrong address, machine not started, or something
  in between dropping the connection.
- **Connection refused** means something answered and said no: right machine, nothing
  listening on that port.
- **Permission denied (publickey)** means the machine answered, the connection worked,
  and the key was not accepted. Nothing is wrong with the network.
  These three are the whole vocabulary of "it didn't connect", and the learner meets all
  three deliberately in this lesson so they are recognisable in the next one, where
  changing SSH settings can produce the third for real.

### The provider

- A **cloud server** (also "instance", "VPS", "virtual private server") is a share of a
  real computer in a data centre. It arrives with an operating system installed and
  nothing else on it, and has a public address on the internet from the moment it
  exists.
- This module's default provider is **OVHcloud** (us.ovhcloud.com). Chosen on price,
  which is not close: a 4 GB machine costs roughly a fifth of the equivalent elsewhere,
  with unlimited traffic rather than a transfer cap. [volatile as of 2026-09]
- Named alternative, for anyone who wants per-second billing or a larger tutorial
  library: **DigitalOcean**. [volatile as of 2026-09]
- **Price check performed 2026-09-01. It moved this module's default twice, and the
  record is kept so the next author can see the reasoning rather than guess at it.** An
  early draft chose Hetzner on the claim that it cost roughly a fifth of the
  alternatives — true of an older Hetzner lineup, false of the current one. A later
  draft chose DigitalOcean on the belief that OVHcloud's price required a twelve-month
  prepay; it does not. Measured on the providers' own pages that day:
  - **OVHcloud VPS-1** — 2 vCore / 4 GB / 40 GB NVMe / unlimited traffic —
    **$5.35/month with no commitment**, $4.54 on a 12-month term.
  - **OVHcloud VPS-2** — 4 vCore / 8 GB / 75 GB / unlimited traffic — **$10.00/month
    with no commitment**, $8.50 on a 12-month term.
  - DigitalOcean Basic — 2 vCPU / 4 GB / 80 GiB / 4,000 GiB transfer — $24/month, or $28
    for the Premium variants. 8 GB is $48.
  - Hetzner CPX21 — 3 vCPU / 4 GB / 80 GB — €32.49/month in US locations, 2 TB traffic.
    CPX22 at €19.99 is EU-only.
  Deliveries: point at the pricing pages, never print a price.
- [volatile as of 2026-09] OVHcloud commitment discounts: 5% for six months, 15% for
  twelve. Advertised "starting at" prices are the twelve-month figures, which is why a
  configurator set to no commitment shows a *higher* number than the product page. Say
  so: it looks like a bait-and-switch and isn't.
- **The Local Zones trap [verify as of 2026-09].** OVHcloud markets lower-latency "Local
  Zone" locations — attractive here precisely because latency to players is the location
  decision this lesson cares about. Its own feature table marks several inclusions as
  excluding Local Zones, daily automatic backup and anti-DDoS among them. Deliveries:
  have the learner check what is included at the location they choose, not for the
  product in general.
- **Sizing.** Memory decides which machine is needed: about 4 GB for a small vanilla
  world and a handful of players, 8 GB for larger groups or mods. At a given price prefer
  faster cores over more of them — Minecraft's world runs on a single thread, so
  single-core speed is what moves tick times and core count barely matters.
- **Open question, honestly unresolved [verify].** Budget providers reach these prices
  partly through oversubscription, and single-core speed under contention is exactly the
  metric a Minecraft server lives on. OVHcloud is an established provider rather than a
  bargain-bin one, and unlike some competitors does not describe its cheap tiers as
  being for workloads where processor speed does not matter. But this has not been
  measured. It is measurable by the learner with the tools in
  `modules/server-performance/`, and a delivery may say so.
- [volatile as of 2026-09] Locations include sites in the United States, Canada, Europe,
  and Asia-Pacific. The one decision that matters: pick the location closest to the
  people who will play. Distance costs time on every packet, forever, and nothing later
  fixes it.
- [volatile as of 2026-09] Signup needs an email address and a payment method, and on
  OVHcloud and DigitalOcean is usually immediate. Some providers — Hetzner among them —
  run a risk-based identity check that can take an hour to a couple of working days.
  Deliveries: say plainly that account creation can block, and that this is why it is
  worth doing days ahead.
- [volatile as of 2026-09] OVHcloud's US site and DigitalOcean bill in US dollars;
  Hetzner in euros. Sales tax is added at checkout in some jurisdictions. Mention tax
  once, in passing — on these amounts it is a rounding error, and dwelling on it beside
  a fivefold price difference misleads about what matters.
- [volatile as of 2026-09] **Billing model**, which the learner must identify: a
  **monthly subscription that auto-renews** (OVHcloud) or **per-second billing capped at
  a monthly maximum** (DigitalOcean). Either way a machine that exists costs money
  whether or not anyone plays, and powering it off does not necessarily stop that — only
  cancelling or deleting does.
- [volatile as of 2026-09] Creating the machine: choose location, image (Ubuntu LTS),
  size, and an SSH key, then create. The console shows the public address. Providers use
  different words for the machine — VPS, Droplet, instance, server. Deliveries: walk the
  *decisions*, point at the provider's documentation for the screens, and use no
  screenshots.

### The exit condition for provisioning

Everything after this point is identical on every provider, so the provider-specific
section ends at a stated contract, given verbatim in deliveries:

> You have a machine running Ubuntu LTS, you know its public address, and you can open a
> terminal on your Mac and get a command prompt on that machine.

This phrasing is what lets a different provider — or one day a physical machine on a
shelf — be substituted without touching the rest of the module. It has already earned
its keep twice.

### The machine

- **Ubuntu** is a Linux distribution. **LTS** means Long Term Support: a release
  supported with security updates for years, which is what a machine running unattended
  wants. [volatile as of 2026-09: which release is current — point at Ubuntu's releases
  page]
- **root** is the administrator account that exists on every Linux machine. It can do
  anything, including irreversibly destroy the system, and nothing warns it. Providers
  hand over a new machine as root because there is no other account yet. The next lesson
  fixes that; this one names it.
- Reading a machine you have just met, none of which changes anything: `whoami`,
  `ls /`, `df -h` (disk), `free -h` (memory), `uname -a` (kernel and processor).

## Arc

### Orientation — given plainly

All of the Facts. What SSH is, how a key pair works and which half is public, the host
key prompt, the three failure shapes, what a rented machine is, the provisioning
decisions, the exit condition, what root is, and the billing model with the off switch.
Nothing here is withheld; none of it is derivable.

Framing sentence: the server runs on a computer that belongs to somebody and is used
for other things, so it is up only while that computer is awake and at home. The
alternative is a computer whose entire job is to be up — one nobody sits at, with no
screen, reached only by typing at it from somewhere else.

### Predictions to elicit

- List everything that has to be switched on, awake, and at home right now for a friend
  to join your server. How many of those are in one building?
- The machine you are about to rent has no screen, no keyboard and no mouse, and you
  will never be in the same room as it. How do you think you type commands into it?
- You are about to make two files, and you will be told one of them is safe to publish
  on the internet. How could that possibly be safe?
- You are about to start paying for this. What do you think happens to the charge if you
  switch the machine off but do not delete it?

### The work — goals and hint ladders

**1. Make a key pair.** Before renting anything, because the public half gets pasted
into the rental form. `ssh-keygen -t ed25519`, default filename, passphrase set. Then
open both files and read them. The thing to do rather than read: notice that one is
short enough to paste into a web form and the other says at the top that it is private.
Given plainly, not hinted — this is a tool, not a puzzle. Close with a check: say aloud
which of the two you would be relaxed about posting publicly.

**2. Rent the machine.** Goal is the exit condition. Real decisions to reason through
rather than click past: location (nearest the people who will play — name the people
first), image (Ubuntu LTS), size (from the number who will really play), processor
(faster cores over more of them, and why), the SSH key pasted from the `.pub` file.

Deliveries also carry, because each costs an hour otherwise: that advertised prices may
be the long-commitment rate so a no-commitment configurator shows more; and that
low-latency locations may exclude inclusions the ordinary ones have.

**3. Get in.** `ssh root@<address>`, answer the host key prompt having understood what
it asks, arrive at a prompt. Then the read-the-surface pass, changing nothing. The point
is the realisation that this is an entire general-purpose computer.

- Rung 1: three things must be true — right address, machine finished starting, key the
  machine knows. Which can you check without SSH?
- Rung 2: the provider's console shows whether the machine is running and which key was
  attached at creation. `ssh -v` prints each step it tries and stops at the one that
  fails.

**4. Know what it costs and how to stop it.** Not optional and not trimmed. Find the
billing page, find what is charged and when, find where the machine is cancelled or
deleted, and identify which of the two billing models applies. Delete nothing. Then say
aloud what happens if this machine is forgotten about for a year.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Connect to something that isn't there.** Mistype the address — change one digit —
  and wait. Read the failure. Then try connecting to a port nothing is listening on
  (`ssh -p 2222 root@<address>`) and read *that* failure. The two are different words
  for different situations: a timeout means nothing answered at all, a refusal means
  something answered and said no. Teaches the distinction that makes every future
  connection problem faster to diagnose. Undo: nothing.
- **Offer a key the machine doesn't know.** `ssh -i` pointing at a file that isn't the
  right key. Read "Permission denied (publickey)". Nothing is wrong with the network —
  the connection worked perfectly and the machine declined. Teaches the third failure
  shape, and it is the one that matters most, because the next lesson changes SSH
  settings and this is the error a mistake there produces. Undo: nothing.

### What just happened — the explanation

A computer in a building the learner will never enter is now theirs, and it answered
because they typed at it.

"The cloud" can be retired as a word here. It is renting a share of somebody's computer,
in a building designed to keep computers running. The bill arrives monthly and the
machine goes away when it is deleted.

The key pair deserves a layer deeper than the lesson strictly needed. Two files made
together. One can be published on a billboard, and the other never moves. Possession of
the second can be proven to a computer on another continent without ever sending it
anywhere. That mechanism is called public-key cryptography, and it is the same one
working behind the padlock in a browser's address bar. The learner has now used it
directly.

And the machine's own identity check, in the other direction, is the same idea again.
The fingerprint prompt is the machine proving it is the same machine as last time.

### Go further — open questions

- Run `ls /` and pick three folders you do not recognise. What is in them? Every Linux
  machine you ever meet will have the same ones.
- Your machine has a public address. What else on the internet can see it right now, and
  how would you find out?
- `ssh -v` printed a great deal. Read it once, properly. How much of what happens in a
  connection was invisible until you asked?
- Genuinely open: you rented this by the month. What would it take to run a server that
  exists only when somebody wants to play, and costs nothing the rest of the time?
  People build this; nobody writing this lesson knows the best way. How would a player
  start a machine that isn't running?

## Delivery notes

- **guided:** level 1 throughout. The key-pair section shows its reasoning; do not
  compress it into two commands.
- Never assert a provider screen, price, plan name, or menu wording. Walk the decisions,
  point at the provider's documentation, no screenshots. State the exit condition
  verbatim — it is what keeps the rest of the module provider-independent.
- Money is content. Step 4 is not optional and must not be trimmed for length.
- The account-holder is not assumed to be the learner and is never called a parent or a
  household.
- The two deliberate connection failures are cheap and set up the next lesson directly;
  keep both.
- **reference:** the whole lesson stands alone and in order, because this is the one an
  adult is most likely to execute days ahead. Carries the provisioning decisions, the
  commitment-pricing and Local Zones gotchas, the key-pair commands, and the billing
  checklist.
