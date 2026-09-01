# Renting a machine and getting into it

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your server runs on a computer that belongs to somebody, sits somewhere, and gets used
for other things. That means it's up only while that computer is awake and at home.

The alternative is a computer whose entire job is to be up. Nobody sits at it. It has no
screen, no keyboard and no mouse, and you will never be in the same room as it. You
reach it by typing at it from somewhere else.

This session gets you one. You'll make a key pair, rent a machine, and get a command
prompt on a computer in another state or another country — which is a genuinely strange
moment the first time it happens, and worth sitting with when it does.

Then you'll do one more thing that isn't optional: find out what it costs, which way it
bills, and where the control that stops it lives. A rented machine is a subscription
with a command line attached, and knowing where the off switch is belongs in the same
session as switching it on.

Two honest notes. This costs money, monthly, for as long as the machine exists. And
opening the account needs a payment method, so it may not be something you can do
yourself — that part can be done days ahead by whoever holds it, and doing it early is a
good idea for reasons you'll see below.

If you already know your way around a computer — or you're setting this up on a
learner's behalf — there's a [compressed version of this lesson](reference.md) with just
the commands, decisions, and hazards.

---

## Before you start

You need:

- **A Minecraft server on your own computer that you can start, stop, and join.**
  [Running your own server](../../../minecraft-server/lessons/running-your-own-server/guided.md)
  covers it. It's what you're renting a machine for, and the third lesson in this module
  copies it across. Quick check: start it, watch for the **Done** line, type `stop`.
- **Someone able to open an account with a hosting company and take on a small monthly
  charge.** This needs a payment method, so it doesn't have to be the same person doing
  the rest of this, and it can be done in advance.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This session sends you to a hosting company's own documentation more than once — [Finding the real documentation](../../../../reference/finding-the-docs.md) helps when a search turns up sales pages instead of instructions.

---

## What you'll have at the end

By the end of this session you will have:

- A key pair you generated — two files, one you could safely publish and one that must
  never leave your Mac — and an understanding of why that isn't a contradiction
- A rented Linux machine at a public address on the internet
- A command prompt on a computer you have never seen, reached from your own terminal
- A read of what you actually rented: its disk, its memory, what's already running on it
- Three different connection failures, caused on purpose, so you can tell them apart
- The monthly cost, the billing model, and the location of the off switch

---

## New tools

**ssh** gives you a command line on another computer over the network. Everything you
type and everything that comes back is encrypted along the way. It ships with macOS, and
it's how nearly every server on the internet is administered — not a simplified version
of that, the actual thing. `man ssh` is its manual.

**ssh-keygen** makes key pairs, which are how you'll prove who you are to the rented
machine. It ships alongside `ssh`. `man ssh-keygen` covers it, and you'll run it in the
first step below.

Everything else in this session happens in a web browser, on your provider's site.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- List everything that has to be switched on, awake, and at home right now for a friend
  to join your server. How many of those things are in one building?
- The machine you're about to rent has no screen, no keyboard, and no mouse. How do you
  think you type commands into it?
- You're about to make two files, and you'll be told one of them is safe to publish on
  the internet. How could that possibly be safe?
- You're about to start paying for this. What do you think happens to the charge if you
  switch the machine off but don't delete it?

---

## The work

### Make a key pair

Do this before you rent anything, because one of the two files you're about to make gets
pasted into the rental form.

<span className="run-where run-where-local">On your Mac</span>

```
ssh-keygen -t ed25519
```

It offers a filename — accept it. It offers a passphrase, which encrypts the private key
file itself so that a stolen laptop isn't the same as a stolen key. Setting one is the
better choice; your Mac can remember it so you aren't typing it constantly.

Now look at what you made. Both files are in a folder whose name starts with a dot, so
`ls -a` is how you see it:

<span className="run-where run-where-local">On your Mac</span>

```
ls -a ~/.ssh
```

There are two. Open both in your editor and read them.

- The one ending in `.pub` is the **public key**. It's short enough to paste into a web
  form, and it's safe to hand to anyone, publish on a website, or email. That isn't a
  lapse in security; it's the design.
- The other is the **private key**. It says so at the top. It never leaves this Mac. It
  is never emailed, never pasted anywhere, and never copied to the rented machine.

Here's what makes the pair useful: a computer holding a copy of your public key can let
in whoever proves they hold the matching private key — and that proof happens without
the private key ever crossing the network. You're about to hand a public key to a
machine you've never seen, over a connection you don't control, and it will still be a
stronger lock than any password you could invent.

Before moving on, say out loud which of those two files you'd be relaxed about posting
publicly. If you hesitated, read them again.

### Rent the machine

This section is the only part of this module that depends on which company you rent
from. It ends at a fixed point, and everything after it — in this session and the three
that follow — is the same everywhere:

> **You have a machine running Ubuntu LTS, you know its public address, and you can open
> a terminal on your Mac and get a command prompt on that machine.**

This module uses **OVHcloud**, chosen on price, which isn't close: a 4 GB machine there
costs roughly a fifth of what the better-known providers charge for the same memory, and
it comes with unlimited traffic instead of a monthly transfer allowance. **DigitalOcean**
is the main alternative — several times the price, but billed by the second rather than
by the month, with a much larger library of tutorials to wander through.

Two things that will otherwise cost you an hour:

**The advertised price is usually the long-commitment rate.** Set the configurator to
"no commitment" and the number goes *up*. On OVHcloud a six-month term saves 5% and
twelve months saves 15%, and the price on the product page assumes you took the twelve.
It looks like a bait-and-switch and isn't. Starting with no commitment costs well under
a dollar a month for the freedom to walk away, which is worth it while you're finding
out whether you like this.

**Low-latency locations may not include everything the ordinary ones do.** OVHcloud
markets extra-close locations called Local Zones, and its own feature list marks several
inclusions — automatic daily backups among them — as not applying there. That matters
here because latency is exactly why you'd pick one. Read what's included **at the
location you choose**, not for the product in general.

Create the account first. Signing up needs an email address and a payment method, and is
usually immediate. Some providers additionally run an identity check — a photo of an
identity document, or a small verification payment — which can take an hour or a couple
of working days. That possibility is why the account is worth creating several days
before you plan to do the rest. (Sales tax gets added at checkout in some places. On
these amounts it's pennies; mentioning it so the final figure doesn't surprise you.)

Then create the machine. Different companies call it different things — a VPS, a
Droplet, an instance, a server — and it's the same product. The provider's own
documentation walks the screens, and it's the right place to look because console
layouts change. What matters is the decisions, which are yours:

- **Location.** Pick the one closest to the people who will actually play. Distance costs
  time on every packet, forever, and nothing you do later fixes it. Name the people
  first, then pick.
- **Image.** Ubuntu LTS. Ubuntu is a flavour of Linux; LTS stands for Long Term Support,
  meaning a release that keeps getting security updates for years, which is what a
  machine running unattended wants. Ubuntu's own releases page says which is current.
- **Size.** Memory decides this. A small vanilla world for a handful of players is
  comfortable in about 4 GB; larger groups or heavy mods want 8 GB. Work from the number
  of people who'll really play, not the largest number you can picture.
- **Processor.** At a given price, prefer faster cores over more of them. Minecraft runs
  its world on a single processor at a time, so how fast one of them is counts for far
  more than how many there are. Adding cores is close to useless here; that's worth
  knowing before a comparison table talks you into it.
- **The SSH key.** Paste in the contents of the `.pub` file from the last step. This is
  the moment the machine learns to let you in.

When the machine exists, the console shows its public address. Write it down.

### Get in, and read what you rented

<span className="run-where run-where-local">On your Mac</span>

```
ssh root@<the address>
```

The first time, it prints a fingerprint and asks whether you want to continue. That's
the machine identifying *itself* to you — the same check running in the other direction.
Your Mac records the answer, and if that fingerprint ever changes on a later connection,
`ssh` will refuse loudly rather than quietly connecting you to something else.

You are now typing on a computer in another building. Before changing anything, read it.
None of these alter a thing:

<span className="run-where run-where-remote">On the rented machine</span>

```
whoami
ls /
df -h
free -h
uname -a
```

Take a minute over that. What you rented is not a Minecraft appliance. It's a complete
general-purpose computer, with an operating system, a disk, a memory budget, and a list
of programs already running — and all of it is now yours to look after.

`whoami` will have answered **root**. That's the administrator account that exists on
every Linux machine; it can do anything at all, and nothing warns it. Providers hand you
a machine as root because there's no other account yet. The next session is largely about
fixing that.

Leave with `exit`.

<details>
<summary>Stuck? Start here</summary>

If the connection hangs or is refused, three separate things have to be true: the address
is right, the machine has finished starting up, and the machine knows the key you're
offering. Which of those can you check without using `ssh` at all?

</details>

<details>
<summary>The shape of it</summary>

The provider's console tells you whether the machine is running and which key was
attached when it was created — both without needing to connect. On the Mac side, `ssh -v`
prints each step it tries and stops at the one that fails, which usually names the
problem outright.

</details>

### Know what it costs and how to stop it

Find the billing page in your provider's console. Find what you're being charged and
when. Find the screen where the machine gets cancelled or deleted, and read what the
provider says about when charges actually stop — switching a machine off and getting rid
of it are not the same thing, and only one of them stops the money.

Then work out which of two billing models you're on, because they fail differently:

- **A monthly subscription that renews by itself** — OVHcloud works this way. A machine
  you created for an afternoon still costs a month, and if you forget about it, it
  quietly renews until somebody stops it.
- **Per-second or hourly billing, capped at a monthly maximum** — DigitalOcean works this
  way. A machine that exists for an afternoon costs pennies, and one you forget about
  bills continuously.

Don't delete anything. Just be able to point at all three things above and say which
model you're on.

Then answer this out loud: what happens if this machine is forgotten about for a year?

---

## Break it on purpose

Both of these are free, take a minute, and set up the next session directly.

**Connect to something that isn't there.** Change one digit of the address and try to
connect. Wait for it. Read what you get.

Now try connecting to a port where nothing is listening:

<span className="run-where run-where-local">On your Mac</span>

```
ssh -p 2222 root@<the address>
```

Read that failure too. They're different words for different situations, and the
distinction will make every future connection problem faster to work out:

- A **timeout** means nothing answered at all — wrong address, machine not started, or
  something in between dropping it silently.
- **Connection refused** means something answered and said no — right machine, nothing
  listening on that port.

**Offer a key the machine doesn't know.** Point `ssh` at a file that isn't your key with
the `-i` option, and read what comes back: **Permission denied (publickey)**.

Nothing is wrong with the network here. The connection worked perfectly and the machine
declined you. That's the third failure shape, and it's the one worth recognising fastest
— the next session changes SSH settings, and this is exactly the error a mistake there
produces.

---

## What just happened

A computer in a building you will never enter is now yours, and it answered because you
typed at it.

"The cloud" can stop being a word now. You rented a share of somebody's computer, in a
building designed to keep computers running. The bill arrives monthly, and when you don't
want the machine any more you delete it and it stops existing.

The key pair deserves more than the session strictly needed. You made two files at once.
One could be published on a billboard. The other never left your Mac. And you proved
possession of the second to a computer on another continent without ever sending it
anywhere. That mechanism has a name — public-key cryptography — and it's the same one
working behind the padlock in your browser's address bar every time you buy something.
You've now used it directly, rather than reading about it.

The fingerprint prompt was the same idea pointing the other way: the machine proving to
*you* that it's the same machine as last time. Both directions matter, and most people
only ever think about one of them.

One thing to carry forward. You logged in as root, which can do anything on that machine
with no confirmation and no undo. That's fine for five minutes and a bad way to live, and
it's where the next session starts.

---

## Go further

- Run `ls /` again and pick three folders you don't recognise. What's in them? Every
  Linux machine you ever meet will have the same ones, so this is worth an afternoon
  sometime.
- Your machine has a public address on the internet. What else out there can see it right
  now — and how would you find out?
- `ssh -v` printed a great deal. Read it once, properly, top to bottom. How much of what
  happens in a connection was invisible until you asked?
- Genuinely open: you're renting this by the month. What would it take to run a server
  that exists only when somebody wants to play, and costs nothing the rest of the time?
  People do build this. Nobody writing this session knows the best way — and the hard
  part is the obvious one: how would a player start a machine that isn't running?

---

## What you have now

- A key pair on your Mac, and the understanding of which half is public and why that's
  safe
- A rented Linux machine at a public address, running Ubuntu LTS
- The ability to open a command prompt on a computer you've never seen
- A read of what that machine actually is — disk, memory, and what's already running
- Three connection failures you caused on purpose and can now tell apart: timeout,
  refused, and permission denied
- The monthly cost, which billing model you're on, and where the off switch lives
