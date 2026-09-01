# Moving your server to a rented Linux machine

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your server lives on a computer that belongs to someone, sits somewhere, and gets
used for other things. That means the world is available only while that computer is
awake, at home, and not needed elsewhere. Every improvement you have made to
availability so far has been a way of working around that one fact.

This session removes the fact instead. You are going to rent a computer — a real one,
in a data centre, with an operating system and a disk and a public address on the
internet — and move your server onto it. You will never see this computer. It has no
screen, no keyboard, and no mouse. Everything you do to it, you will do by typing at
it from your own machine over the network, which is exactly how the servers behind
every website, app, and game you use are run.

By the end, your friends will be joining at an address that has nothing to do with
your house, and you will be able to shut your laptop, put it in a bag, and walk out
of the building while they keep playing.

Two honest notes before you start. This costs money — a small amount, every month,
for as long as the machine exists — and part of this session is learning exactly what
that amount is and where the off switch lives. And opening the account requires an
identity check and a payment method, so it may not be something you can do yourself.
That part can be done days ahead by whoever holds the account.

If you already know your way around a computer — or you're setting this up on a
learner's behalf — there's a [compressed version of this lesson](reference.md) with
just the commands, decisions, and hazards.

---

## Before you start

You need:

- **A Minecraft server folder on your Mac that you can start, stop, and join.**
  [Running your own server](../running-your-own-server/guided.md) covers it. Quick
  check: start it, watch for the **Done** line, type `stop`, watch it save and exit.
- **People outside your home have joined that server.**
  [Letting friends join your server](../letting-friends-join/guided.md) gets you
  there. Quick check: you can say what address your friends currently type, what a
  port is, and who is on your whitelist.
- **A backup you have actually restored from, and a way to take a fresh one.**
  [Copying and backing up worlds](../worlds-and-backups/guided.md) covers it. Quick
  check: your backup script runs, and you have at least once taken a backup, broken
  something, and brought it back. Your world is about to travel across a network for
  the first time, and you do that with a proven safety net or not at all.
- **Someone able to open an account with a hosting company and take on a small
  monthly charge.** This needs an identity check and a payment method. It does not
  have to be the same person doing the rest of the session, and it can be done in
  advance.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This session sends you to a hosting company's own documentation more than once — [Finding the real documentation](../../../../reference/finding-the-docs.md) helps when searching turns up sales pages instead of instructions.

---

## What you'll have at the end

By the end of this session you will have:

- A Linux computer you rent by the month, which you can log into from anywhere and
  administer entirely by typing
- A key pair you generated — two files, one of which you can safely publish and one
  of which must never leave your Mac — and the understanding of why that is the
  strongest lock available to you
- Your world, your settings, and your whitelist running on that machine, with your
  Mac no longer involved in any way
- A service file you wrote that starts the server whenever the machine boots, proved
  by restarting the machine and finding the server already up with nobody logged in
- Friends playing on an address that has nothing to do with your home network, while
  your own computer is switched off and in another room
- The knowledge of what this costs, where that is displayed, and how to stop it

---

## New tools

Everything here is either already on your Mac or installed on the rented machine
during the work below. Nothing needs installing in advance.

**ssh** is a program that gives you a command line on another computer over the
network. Everything you type and everything that comes back is encrypted along the
way. It ships with macOS and it is how nearly every server on the internet is
administered — not a simplified version of that, the actual thing. `man ssh` is its
manual.

**ssh-keygen** makes key pairs, which are the way you will prove who you are to the
rented machine. It ships with macOS alongside `ssh`. `man ssh-keygen` covers it. You
will run it in the first step below.

**apt** is the package manager on Ubuntu, the flavour of Linux this session uses. It
installs software from Ubuntu's own catalogue. It is the same job Homebrew does on
your Mac, on a different operating system. Ubuntu's own documentation covers it, and
`man apt` is on the machine itself. It is already installed there; you use it in the
work below.

**ufw** is a firewall — a program that decides which ports on a machine accept
connections from the outside. Its name is short for "uncomplicated firewall", which
is a fair description. It is already on the machine; `man ufw` is the reference.

**rsync** copies files and whole folders, either on one machine or between two
machines over the network. It ships with macOS. `man rsync` is a long page, and worth
skimming once. You will use it to move your server across.

**systemd** is Linux's program-starter: the first program the machine runs, which
then starts everything else and keeps it running. Every background program on a
modern Linux machine was started by it. You talk to it with a command called
`systemctl`, and you tell it what to run by writing a small text file called a unit.
`man systemd.service` lists everything a unit file can contain.

**journalctl** reads the log that systemd keeps. When a background program fails
before it can write anything of its own, this is where the complaint went. `man
journalctl` is the reference.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- List everything that has to be switched on, awake, and at home right now for a
  friend to join your server. How many of those things are in one building?
- The machine you are about to rent has no screen, no keyboard, and no mouse, and you
  will never be in the same room as it. How do you think you type commands into it?
- Your server folder holds the world, the settings, and the list of who is allowed
  in. If that entire folder appeared on a different computer and the server started
  there, what would be different for the people joining? What would be identical?
- A brand-new computer appears on the internet with a login prompt open to the whole
  world. How long do you think it takes before a stranger's program tries to log into
  it? Write down a number before you look.
- You are about to pay for this by the hour. What do you think happens to the charge
  if you switch the machine off but don't delete it?

---

## The work

### Make a key pair

Do this before you rent anything, because one of the two files you are about to make
gets pasted into the rental form.

Run:

<span className="run-where run-where-local">On your Mac</span>

```
ssh-keygen -t ed25519
```

It will offer a filename. Accept it. It will offer to set a passphrase — a password
that encrypts the private key file itself, so that a stolen laptop isn't the same as
a stolen key. Setting one is the better choice; your Mac can remember it for you so
you aren't typing it constantly.

Now look at what you made. Both files are in the `.ssh` folder in your home
directory, and the folder name starts with a dot, so `ls -a` is how you see it:

<span className="run-where run-where-local">On your Mac</span>

```
ls -a ~/.ssh
```

There are two. Open both in your editor and read them.

- The one ending in `.pub` is the **public key**. It is short enough to paste into a
  web form. It is safe to hand to anyone, publish on a website, or email. This is not
  a lapse in security; it is the design.
- The other one is the **private key**. It says so at the top. It never leaves this
  Mac. It is never emailed, never pasted anywhere, never copied to the rented machine.

Here is what makes the pair useful: a computer holding a copy of your public key can
let in whoever proves they hold the matching private key — and that proof happens
without the private key ever crossing the network. You are about to give a public key
to a machine you have never seen, over a connection you don't control, and it will
still be a stronger lock than any password you could invent.

Before moving on, say out loud which of those two files you would be relaxed about
posting publicly. If you hesitated, read them again.

### Rent the machine

This section is the only part of the session that depends on which company you rent
from. It ends at a fixed point, and everything after it is the same everywhere:

> **You have a machine running Ubuntu LTS, you know its public address, and you can
> open a terminal on your Mac and get a command prompt on that machine.**

This session uses **OVHcloud**, chosen on price, which isn't close: a 4 GB machine
there costs roughly a fifth of what the better-known providers charge for the same
memory, and it comes with unlimited traffic instead of a monthly transfer allowance.
**DigitalOcean** is the main alternative — several times the price, but it bills by the
second rather than by the month and has a much larger library of tutorials to wander
through. Either way, nothing after this section changes.

One thing about OVHcloud's prices that looks like a trick and isn't: the price on the
product page is the twelve-month rate. Choose "no commitment" in the configurator and
the figure goes up — a six-month term saves 5%, twelve months saves 15%, and the
advertised number assumes you took the twelve. Starting with no commitment costs you
under a dollar a month for the freedom to walk away, which is worth it while you're
finding out whether you like it.

Create the account first. Signing up needs an email address and a payment method, and
is usually immediate. Some providers additionally run an identity check — a photo of an
identity document, or a small verification payment — which can take anywhere from an
hour to a couple of working days. That possibility is why the account is worth creating
several days before you plan to do the rest.

Then create the machine. Different companies call it different things — a VPS, a
Droplet, an instance, a server — and it's the same product. The provider's own
documentation walks the screens, and it's the right place to look because console
layouts change. What matters is the decisions, which are yours:

- **Location.** Data centres exist in several countries. Pick the one closest to the
  people who will actually play. Distance costs time, every packet, forever, and
  nothing you do later fixes it. Name the people first, then pick.

  One thing to check while you're here, because it's aimed squarely at the decision
  you're making: some providers offer extra-low-latency locations that don't include
  everything the ordinary ones do. OVHcloud's are called Local Zones, and its own
  feature list marks several inclusions — automatic daily backups among them — as not
  applying there. The location that's best for latency may quietly be the one that
  drops a feature you wanted. Read what's included **at the location you pick**, not
  for the product in general.
- **Image.** Ubuntu LTS. Ubuntu is a flavour of Linux; LTS stands for Long Term
  Support, meaning a release that keeps getting security updates for years, which is
  what a machine that runs unattended wants. Ubuntu's own releases page says which
  version is current.
- **Size.** Memory is the constraint that decides which machine you need. A small
  vanilla world for a handful of players is comfortable in about 4 GB; larger groups or
  heavy mods want 8 GB. Work from the number of people who will really play, not the
  largest number you can picture.
- **Processor type.** At the same amount of memory you'll usually be offered a cheaper
  and a slightly dearer option — "regular" and "premium", or Intel against AMD against
  ARM. Two things worth knowing. First, the type barely matters for compatibility: a
  Minecraft server is a Java program, and Java programs aren't written for a particular
  processor design, because the Java runtime you install bridges that gap. Second, the
  *speed* does matter, and not in the way you'd guess — Minecraft runs its world on a
  single processor at a time, so how fast one of them is counts for far more than how
  many there are. If a premium option costs a few dollars more for newer, faster cores,
  that is the one worth having, and adding processors is not.
- **The SSH key.** Paste in the contents of the `.pub` file from the last step. This
  is the moment the machine learns to let you in.

Find the price before you click create, on the provider's own pricing page, and say
the monthly figure out loud. When the machine exists, the console shows its public
address. Write it down.

### Get in, and read what you rented

Open a terminal and connect:

<span className="run-where run-where-local">On your Mac</span>

```
ssh root@<the address>
```

The first time, it will print a fingerprint and ask whether you want to continue.
This is the machine identifying *itself* to you — the check running in the other
direction. Your Mac records the answer, and if that fingerprint ever changes on a
later connection, `ssh` will refuse loudly rather than quietly connecting you to
something else.

You are now typing on a computer in another country. Before changing anything, read
it. None of these commands alter a thing:

<span className="run-where run-where-remote">On the rented machine</span>

```
whoami
ls /
df -h
free -h
uname -a
```

Take a minute over that. What you rented is not a Minecraft appliance. It is a
complete general-purpose computer, with an operating system, a disk, a memory budget,
and a list of programs already running — and all of it is now yours to look after.
Leave with `exit`.

<details>
<summary>Stuck? Start here</summary>

If the connection hangs or is refused, three separate things have to be true: the
address is right, the machine has finished starting up, and the machine knows the key
you are offering. Which of those can you check without using `ssh` at all?

</details>

<details>
<summary>The shape of it</summary>

The provider's console tells you whether the machine is running and which key was
attached when it was created — both without needing to connect. On the Mac side,
`ssh -v` prints each step it tries and stops at the one that fails, which usually
names the problem outright.

</details>

### Stop being root

The account you just logged in as is called **root**. It is the administrator account
that exists on every Linux machine, it can do absolutely anything, and nothing warns
it or asks for confirmation. Providers hand you a new machine as root because there
is no other account yet.

Working as root all the time is avoided everywhere, for two reasons worth stating
plainly: a mistyped command has no safety margin, and nothing in the record
distinguishes "I meant to do something administrative" from "I was tidying up". The
convention on every Linux machine in the world is a normal user for ordinary work,
plus a command called `sudo` in front of the individual actions that need
administrative power.

**One rule before you start, and it applies for the rest of this session.** While you
are changing anything that affects how you log in — the SSH configuration here, the
firewall later — keep a second terminal open and already logged in, and do not close
it until you have proved a *brand new* connection works in a third one. A session
already open keeps working no matter what you break. The question is always whether
the next one will.

Your goals for this section:

1. A user called `minecraft`, with a home directory.
2. That user in the `sudo` group, so it can borrow administrative power one command
   at a time.
3. Your key working for that user, so you can log in as them directly.
4. Password logins and root logins over SSH turned off.

For the first two, `adduser` and `usermod` are the commands, and Ubuntu's own
documentation covers both. The third is the interesting one.

<details>
<summary>Stuck? Start here</summary>

Your new user cannot log in with your key yet, but root can. What does root have that
the new user doesn't? Somewhere on this machine there is a file that decides which
keys are allowed to log in as a particular person.

</details>

<details>
<summary>The concept</summary>

Every user has their own `~/.ssh/authorized_keys` — a file listing the public keys
allowed to log in as them. That is the whole mechanism: a line in that file grants
access, and deleting the line takes it away. Root's copy has your key in it, put there
by the provider when the machine was created. Your new user's copy doesn't exist yet.

Copying the file is not quite enough on its own. SSH refuses to trust a key file that
belongs to somebody else, so ownership has to change along with the copy.

</details>

<details>
<summary>The shape of it</summary>

Run this as root. It copies the whole `.ssh` folder and sets the new owner in one
step:

<span className="run-where run-where-remote">On the rented machine</span>

```
rsync --archive --chown=minecraft:minecraft ~/.ssh /home/minecraft/
```

</details>

Prove it before going further. Open a **new** terminal, `ssh minecraft@<the address>`,
and then run `sudo whoami`. The answer comes back `root` — the power, borrowed for
exactly one command and handed straight back.

Now the fourth goal. The settings live in `/etc/ssh/sshd_config`, and the two lines
that matter are the ones about password authentication and about permitting root
login. Before you change either, look at what is already there: current Ubuntu images
often set both the way you want them already, and finding that out is better than
switching off something that was never on. Note that settings can also live in files
under `/etc/ssh/sshd_config.d/`, which override the main file — so read those too
before concluding anything.

If you do change something, restart the SSH server so it re-reads its settings, then
open a third terminal and prove a fresh connection still works. Only then close the
one you started with.

### Read who has been knocking

Your machine has been on the internet with a login prompt open to the world since you
created it. Go and look at what has been trying the handle.

<details>
<summary>Stuck? Start here</summary>

The machine writes down every attempt to log into it. Where does a Linux machine
write things down?

</details>

<details>
<summary>The shape of it</summary>

`journalctl` — the same log you will be reading later when your own server misbehaves
— with the SSH service named. Filtering the output for `invalid user` is a quick way
to see the shape of it.

</details>

Check the number against the prediction you wrote. Most people guess days. The real
answer is usually minutes, and the attempts never stop.

Then the more important half: work out why this is not an emergency. Nothing you have
built is a wall. The front door is open to the entire internet and always will be —
that is what a public address means. What changed is that there is no longer anything
to guess. A password can be tried a million times a night by a program that never
gets bored. A key can't be tried at all, because there is no keyhole for it any more.

### Install Java

The server folder you are about to copy over contains your world and your settings,
but not the program that runs Java. That has to be installed on the machine itself:

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo apt update
sudo apt install openjdk-<version>-jre-headless
```

Two things to work out before you run that. Which version — Minecraft's own server
requirements state which Java version the current server needs, and that is the source
to check rather than any page describing it. And what the two words on the end mean:
**JRE** is the part of Java that runs programs, as opposed to the kit that also
compiles them; **headless** is the build without any graphical parts, which a machine
with no screen has no possible use for.

Confirm it landed with `java -version`.

This is your second package manager. Homebrew installs software on your Mac from a
catalogue; `apt` installs software on Ubuntu from a catalogue. Two instances of a
thing is what turns it from a command you memorised into an idea you have: operating
systems keep a catalogue, and installing software means asking the catalogue.

### Move the server across

Now the move itself.

**Take a fresh backup first.** Your world is about to travel across a network for the
first time. That is the whole reason for the rule.

**Stop the server on your Mac.** Before you do, say why in your own words. A world
that is being written to while it is read produces a copy of a state that never
existed as one piece — the same rule you met when you first started making backups,
arriving again with a new consequence.

Then copy. `rsync` sends files between machines over the same SSH connection you have
been using, and it has one habit worth using every single time:

<span className="run-where run-where-local">On your Mac</span>

```
rsync -av --dry-run <your server folder>/ minecraft@<the address>:/home/minecraft/server/
```

`--dry-run` copies nothing at all. It prints exactly what it *would* do. Read that
output properly before you run the command for real — this is the same discipline as
reading an error message before changing anything, applied one step earlier.

Two things about that command are worth understanding rather than copying:

- `-a` means archive: copy the folder and everything inside it, keeping timestamps and
  permissions. `-v` means print what you're doing. Add `-z` to compress in transit if
  your upload is slow.
- **The slash on the end of the source is load-bearing.** `folder/` copies the
  *contents* of the folder into the destination. `folder` without the slash copies the
  folder itself, giving you `server/folder` on the far side. This catches everyone at
  least once. You have a command that shows you which one you are about to get,
  without doing it — use it.

You will also see `--delete` in most rsync examples on the internet. It makes the
destination match the source exactly, deleting anything at the destination that isn't
in the source. You do not want it here, and it is worth knowing what it does before
you meet it somewhere it matters.

When the real copy finishes, go and look from the other side. `ssh` in, `ls` the
folder, and find the world, `server.properties`, and `whitelist.json`. Then open
`eula.txt` and read it: the agreement you accepted the first time you ever started a
server travelled with the folder. Nothing on this machine has to be set up again. The
friends who were allowed in are still allowed in, because the list of them is a file
and files copy.

### Open the port, and start it by hand

You are going to start the server manually before you automate anything. If something
is wrong with the copy, you want to find out now, while there is exactly one thing
that could be at fault.

First the firewall, because right now the machine will not accept a connection on
Minecraft's port. `ufw` decides which ports are open.

**Allow SSH before you enable the firewall.** Enabling a firewall that hasn't been
told to permit SSH disconnects you and prevents you reconnecting. It is the single
most common way people lose a machine they are paying for. Allow first, enable second,
then read `ufw status` to see what is now true.

Then start the server the way you always have, from inside the server folder, with one
addition: `-Xmx` sets the maximum memory Java will use for your world and everything
in it. It has to be meaningfully *below* the machine's total memory, because Java
needs some beyond that number and the operating system needs its own — roughly 3 GB on
a 4 GB machine. Set it too high and the machine runs out of memory and kills the
server, which looks like a crash with no explanation anywhere in the server's own log.

Watch the startup lines go past. They will be completely familiar. That is the point:
same program, new home.

Now join it, from your own Mac, at the machine's public address. This is the moment
the move becomes real.

### Make it a service

The server is running because you are sitting there. Close that connection and it
stops. What you want is a machine that starts the server itself, at boot, with nobody
logged in — because on this machine, nobody ever is.

That job belongs to systemd, and you tell it what to run by writing a unit file at
`/etc/systemd/system/minecraft.service`. Here is the shape, with the parts only you
can know left blank. Type the values you fill in.

<span className="run-where run-where-remote">On the rented machine</span>

```
[Unit]
Description=Minecraft server
After=network.target

[Service]
User=
WorkingDirectory=
ExecStart=
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Every blank is answerable from something you already know.

- `User=` — which account should this run as? Not root. You made the right one
  earlier, and it owns the folder.
- `WorkingDirectory=` — a Minecraft server creates all of its files in whatever folder
  it starts from. You learned that the first time you ever ran one and the world
  appeared next to the jar. Started by systemd, "the folder it starts from" is whatever
  this line says. It must be an absolute path: systemd does not understand `~`.
- `ExecStart=` — the absolute path to java, then the arguments, exactly as you typed
  them by hand a moment ago. `which java` prints that path.
- `Restart=on-failure` — start it again if it dies unexpectedly.

Look at the file's shape for a moment. It is `key=value` lines, gathered under
headings in square brackets. You have seen `key=value` before, in `server.properties`.
Different program, different machine, recognisably the same idea.

Then, in order: `sudo systemctl daemon-reload` so systemd re-reads the file,
`sudo systemctl enable --now minecraft` to start it and mark it to start at every
boot, `sudo systemctl status minecraft` to see whether it worked, and
`sudo journalctl -u minecraft -f` to watch its output as it starts.

Stop your hand-started copy first, or you will meet a port collision — the same
two-programs-one-port error you met on your Mac, on a machine two thousand miles away,
because it was never about your Mac.

One distinction that confuses nearly everyone, worth getting straight now: `start`
runs something immediately, `enable` marks it to run at every boot, and neither one
implies the other. `enable --now` does both, which is why it is what you used.

**Then the test that matters.** Run `sudo reboot`. Your connection will drop — that is
the machine going down, exactly as it should. Wait. Reconnect. Find the server already
running.

Sit with that for a second. Nobody logged in. There is no login on this machine at
all, and no screen to type one at. The last human-shaped gap in the chain didn't get
closed; it stopped existing.

### Hand it to your friends

Give your friends the new address. Not a tunnel address, not anything to do with your
home network — the machine's own public address on the internet.

Before they try: read `whitelist.json` on the new machine and confirm the names are
there rather than assuming it. Check that `online-mode` is `true` in
`server.properties`, and be able to say why that matters more here than it did at
home. Minecraft's port on this machine is genuinely open to the entire internet, so
anyone at all can attempt to connect. The whitelist is the thing that stops them
joining.

Then the demonstration. With your friends playing, shut your laptop, unplug it, and
carry it into another room. Nothing happens. Nothing at all depends on it any more.

That is the session, performed.

### Know what it costs and how to stop it

Find the billing page in your provider's console. Find what you're being charged and
when. Find the screen where the machine gets cancelled or deleted, and read what the
provider says about when charges actually stop — switching a machine off and getting
rid of it are not the same thing, and only one of them stops the money.

Find out which of two billing models you're on, because they fail differently:

- **A monthly subscription that renews by itself** — OVHcloud works this way. A machine
  you created for an afternoon still costs a month, and if you forget about it, it
  quietly renews until somebody stops it.
- **Per-second or hourly billing, capped at a monthly maximum** — DigitalOcean works
  this way. A machine that exists for an afternoon costs pennies, and one you forget
  about bills continuously.

Do not delete anything. Just be able to point at all three things above and say which
model you're on.

Then answer this out loud: what happens if this machine is forgotten about for a year?
A rented machine is a subscription with a command line attached, and knowing where the
off switch is belongs in the same session as switching it on.

---

## Break it on purpose

**Find the back door before you need it.** This one isn't a failure — it is a
rehearsal, and it comes first because the next exercise depends on it. Your provider's
console includes a browser window that acts as a screen and keyboard plugged directly
into the machine. It works even when the machine's own network settings are broken,
because the provider owns the hardware and can always reach it.

Find it. To log in that way you will need something other than your SSH key, which
usually means resetting the root password from the provider's panel; their docs cover
it. Then actually log in through it once, and look around.

A rescue path you have never used is a rumour. This one is now a fact you have
checked.

**Lock yourself out with the firewall.** Now that the back door is proved, do the
thing you were warned about. Disable the firewall, then re-enable it *without*
allowing SSH first. Your open session survives — sessions already running always do.
Now open a new terminal and try to connect.

Nothing. No error explaining itself, no route in. This is precisely how people lose
machines they are paying for.

Go in through the browser console, allow SSH, and reconnect normally. Then leave the
firewall on.

What that teaches is worth more than the firewall itself: "locked out" is not a
category of disaster, it is a state with an exit — and you found the exit before you
needed it, which is the only reason this cost you four minutes instead of your world.

**Break the path in the unit file.** Open `minecraft.service` and misspell the path to
`server.jar`, or to java. One letter is enough. `daemon-reload`, then restart the
service.

Nothing starts. And this time, nothing appears in `logs/latest.log` either — because
the failure happened before the server existed to write anything down. Your task is to
find where the complaint actually went. `systemctl status minecraft` will tell you it
failed; `journalctl -u minecraft` will tell you what it tried to run and what it
couldn't find.

Then fix the path, reload, restart, and verify.

A background program that fails does not fail *at* you. It fails somewhere, quietly,
and knowing where to look is the first job of running anything.

**Start it twice.** With the service running, start the server by hand in an SSH
session and read the refusal. Then quit it. Two programs, one port — an old error in a
new country.

---

## What just happened

A computer you have never seen, in a building you will never enter, is running your
program. It has no screen. Nobody is logged into it. It came back from a restart on
its own, and it will do that again at three in the morning without telling anyone.

Everything you did to that machine went through a single encrypted connection from a
terminal window on your Mac. That is not a teaching version of server administration.
It is what running an internet service consists of — the same tools, in the same
order, whether the thing being served is a game, a website, or a bank.

"The cloud" can stop being a word now. You rented a share of somebody's computer, by
the hour, in a building designed to keep computers running. The bill arrives monthly.
When you don't want the machine, you delete it and it stops existing.

Your two machines now have different jobs, and the split is physical rather than
notional. One is where things get written and broken. One runs for other people and is
not the place to try things out.

The startup system turned out to be the same idea in a second costume. A Mac calls it
launchd and configures it with XML. Linux calls it systemd and configures it with
`key=value` lines under bracketed headings. Both are the first program the machine
runs, both start everything else, and both are told what to do by a text file sitting
in a known folder. Every service on earth is an ordinary program plus a file like the
one you wrote.

The key pair deserves one more layer than the session strictly needed. You made two
files at once. One can be published on a billboard. The other never moved off your
Mac. And you proved possession of the second one to a computer on another continent
without ever sending it anywhere. That mechanism has a name — public-key cryptography
— and it is the same one working behind the padlock in your browser's address bar
every time you buy something. You have now used it directly.

And the strangers in the log are the honest picture of the internet. A public address
gets scanned constantly by programs that will never know or care what your machine is
for. Your defence was not a wall, and there is no version of this where the door gets
closed. What you did was remove everything guessable from behind it.

One last thing, which is easy to miss because it happened by not happening. There was
no port forwarding in this session. No tunnel. No overlay network, no dynamic DNS, no
router configuration at all. That entire apparatus existed for one reason: home
connections are not reachable from the internet. A rented machine is reachable, and a
large part of what you are paying for each month is exactly that.

---

## Go further

- `systemctl stop` asks your server to quit. Does it save the world properly first?
  You can find out instead of guessing — stop it, then read `logs/latest.log` for the
  saving lines. If the answer is unsatisfying, a better version exists: something that
  types `stop` into the running server the way you used to. What would have to be true
  for a unit file to be able to do that?
- Run `systemctl list-units --type=service` and read every line, top to bottom. Each
  one is a program running for you right now, and each one has a file like the one you
  wrote. How much of this machine turns out to be the same mechanism, repeated?
- Your friends type an address made of numbers. What would it take for them to type a
  name instead — and what is a name, technically, that a number isn't?
- The machine is idle most of the day and charged for anyway. What would it take for
  it to exist only when somebody wants to play, and cost nothing the rest of the time?
  People do build this. Nobody writing this session knows the best way to do it. What
  would have to be true for it to work — and how would a player start a machine that
  isn't running?
- Genuinely open: your world now sits on a disk you do not own, in a building you
  cannot enter, possibly in another country, belonging to a company that could stop
  existing. Who can read it? What does your provider actually promise about it? What
  happens to it if a payment fails? Find their own words rather than assuming, and
  then decide what you want to be true about where your backups live.

---

## What you have now

- A Linux computer you rent by the month, reachable at a public address, which you can
  log into from anywhere and administer entirely by typing
- A key pair you generated yourself, working for a user you created, with password
  logins and root logins over SSH closed off
- Your world, settings, and whitelist running on that machine, with your own computer
  no longer involved in any way
- A service file you wrote, which starts the server at every boot — proved by
  restarting a machine that has no screen and no login and finding the server already
  up
- The ability to install software with `apt`, open and close ports with `ufw`, copy
  folders between machines with `rsync`, and find a background program's complaints
  with `journalctl`
- Friends playing at an address that has nothing to do with your home, while your own
  computer is switched off
- A monthly bill you can find, read, and stop
