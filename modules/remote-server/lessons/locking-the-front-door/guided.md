# Locking the front door

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

The machine you rented arrived with one account. That account can do anything at all —
delete the operating system, empty the disk — and nothing warns it or asks whether you
meant it. And its front door is open to the entire internet, because that's what a public
address is.

Two of those three things are about to change. The third can't change and doesn't need
to, and understanding why is most of this session.

You'll make an account that's yours, learn to borrow administrative power one command at
a time instead of living in it, and close off the ways in that don't involve your key.
Then you'll go and look at how many strangers have tried to get in since you created the
machine — which is a genuinely startling number, and which turns out to be fine.

And you'll lock yourself out of a machine you're paying for, on purpose, and get back in.
That's not a stunt. It's the last thing in this session, it happens only after you've
proved the way back works, and it's the part you'll still remember in a year.

If you already know your way around a computer — or you're setting this up on a learner's
behalf — there's a [compressed version of this lesson](reference.md) with just the
commands and hazards.

---

## Before you start

You need:

- **A rented Ubuntu machine you can reach as root over SSH, and its address.**
  [Renting a machine and getting into it](../renting-a-machine/guided.md) gets you there.
  Quick check: `ssh root@<your address>` returns a prompt.
- **Access to that machine's control panel** on your provider's website. The way back in,
  when you lock yourself out, lives there.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- An account on the machine that's yours, which borrows administrative power one command
  at a time rather than holding it permanently
- Password logins and root logins over SSH closed off, so the only way in is a key you
  hold
- Read the log of strangers trying to get into your machine, and be able to explain why
  it isn't an emergency
- Used your provider's rescue console once, deliberately, while nothing was wrong
- Locked yourself out with the firewall and got back in

---

## New tools

**`adduser` and `usermod`** create a user account on Linux and add it to a group.
Ubuntu's own documentation covers both; `man adduser` is on the machine.

**`sudo`** runs a single command with administrative power, then hands it straight back.
It's the convention on every Linux machine in the world, and `man sudo` explains it.

**`ufw`** is a firewall — a program that decides which ports on a machine will accept
connections from outside. The name is short for "uncomplicated firewall", which is fair.
It's already installed; `man ufw` is the reference.

**`journalctl`** reads the log that the system keeps of what its programs have been
doing. You'll use it to read the login attempts, and you'll use it again in a later
session when your own server misbehaves. `man journalctl` covers it.

**Your provider's browser console** is a keyboard and screen for the machine, in a web
page. It works even when the machine's own network settings are broken, because the
provider owns the hardware. It's in their control panel, and finding it is part of the
work below.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- A brand-new computer appears on the internet with a login prompt open to the world. How
  long do you think it takes before a stranger's program tries to log into it? Commit to a
  number.
- You're about to create a second account and stop using the first. What could that
  protect you from that simply being careful wouldn't?
- You're about to turn off password logins entirely. What happens to somebody — including
  you — who has the password but not the key?
- If you locked yourself out of this machine right now, what would you do? Answer before
  reading on. You'll find out whether you were right.

---

## The work

### The rule, before anything else

This applies for the rest of this session, and it is not advice:

> **While you're changing anything that affects how you log in — the SSH settings here, or
> the firewall later — keep a second terminal open and already logged in, and don't close
> it until you've proved a brand new connection works in a third one.**

A session that's already open keeps working no matter what you break. The question is
always whether the *next* one will, and the only way to know is to open one.

Open two terminals now. Log in as root in both. Leave one of them alone.

### Make an account that's yours

You're currently root: the administrator account that exists on every Linux machine. It
can do anything, with no confirmation and no undo. Your provider handed you the machine
as root because there was no other account yet.

Nobody runs a machine this way, for two reasons worth saying plainly. A mistyped command
has no safety margin — there's nothing between you and the consequence. And nothing in the
record distinguishes "I meant to do something administrative" from "I was tidying up".

The convention everywhere is a normal account for ordinary work, plus `sudo` in front of
the individual commands that need more.

<span className="run-where run-where-remote">On the rented machine</span>

```
adduser minecraft
usermod -aG sudo minecraft
```

The second line puts your new user in the `sudo` group, which is what actually grants the
privilege.

### Get your key across

Your new user can't log in yet. Work out why before reading the hints.

<details>
<summary>Stuck? Start here</summary>

Root can log in with your key. Your new user can't. What does root have that the new user
doesn't? Somewhere on this machine there's a file that decides which keys are allowed to
log in as a particular person.

</details>

<details>
<summary>The concept</summary>

Every user has their own `~/.ssh/authorized_keys` — a file listing the public keys allowed
to log in as them. That's the entire mechanism: a line in that file grants access,
deleting the line takes it away. Root's copy has your key in it, put there by your
provider when the machine was created. Your new user's doesn't exist yet.

Copying the file isn't quite enough. SSH refuses to trust a key file that belongs to
somebody else, so the ownership has to change along with the copy.

</details>

<details>
<summary>The shape of it</summary>

Run this as root. It copies the whole `.ssh` folder and sets the new owner in one step:

<span className="run-where run-where-remote">On the rented machine</span>

```
rsync --archive --chown=minecraft:minecraft ~/.ssh /home/minecraft/
```

</details>

Now prove it, in a **new** terminal:

<span className="run-where run-where-local">On your Mac</span>

```
ssh minecraft@<the address>
```

And then, once you're in:

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo whoami
```

It answers `root`. That's the whole idea in one line: the power, borrowed for exactly one
command, and handed straight back.

### Close the doors you're not using

There are two ways into this machine you don't want: logging in with a password, and
logging in as root.

The settings live in `/etc/ssh/sshd_config`. **Before you change either, look at what's
already there.** Current Ubuntu images often set both the way you want them already, and
finding that out is a better outcome than switching off something that was never on.

Check `/etc/ssh/sshd_config.d/` too — files in there override the main file, and reading
only the main one will tell you something that isn't true.

The two settings are the one about password authentication and the one about permitting
root login. If you do change something, restart the SSH server so it re-reads its
settings, then open a **third** terminal and prove a fresh connection still works.

Only then close the terminal you started with.

### Read who has been knocking

Your machine has been sitting on the internet with a login prompt open since the moment
you created it. Go and look at what's been trying the handle.

<details>
<summary>Stuck? Start here</summary>

The machine writes down every attempt to log into it. Where does a Linux machine write
things down?

</details>

<details>
<summary>The shape of it</summary>

`journalctl`, with the SSH service named. Filtering the output for `invalid user` is a
quick way to see the shape of it.

</details>

Check the number against the prediction you wrote. Most people guess days. The real answer
is usually minutes, and it never stops.

Now the more important half: work out why this isn't an emergency.

Nothing you've built is a wall. The front door is open to the entire internet and always
will be — the machine *has* to answer, because answering is what it's for. What changed is
that there's nothing behind the door that can be guessed. A password can be tried a
million times a night by a program that never gets bored. A key can't be tried at all,
because there's no keyhole for one any more.

### Find the back door before you need it

Your provider's control panel includes a browser window that acts as a screen and keyboard
plugged directly into your machine. It works even when the machine's own network settings
are broken, because the provider owns the hardware and can always reach it.

Find it. To log in that way you'll need something other than your SSH key, which usually
means resetting the root password from the panel; their documentation covers it. Then
actually log in through it once, and look around.

Do this now, while nothing is wrong. The next step needs it, and there's a general
principle here worth more than the firewall: **a rescue path you have never used is a
rumour.**

### Put up the firewall

Right now the machine will accept a connection on any port where something is listening.
A firewall decides which ports are open.

The lockout rule from the top of this session applies here more than anywhere.

**Allow SSH before you enable the firewall.** Enabling a firewall that hasn't been told to
permit SSH disconnects you and prevents you reconnecting. It is the single most common way
people lose a machine they're paying for.

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

Read the status output rather than skimming it. It's the list of what is now true about
this machine.

Minecraft's port stays closed for now — there's nothing listening on it yet. You'll open
it in the next session, when there is.

---

## Break it on purpose

**Lock yourself out with the firewall.** You've proved the back door works, so now do the
thing you were warned about.

Disable the firewall, then re-enable it *without* allowing SSH first. Your open session
survives — sessions already running always do. Now open a new terminal and try to connect.

Nothing. No error that explains itself, no route in. This is exactly how people lose
machines they're paying for.

Go in through the browser console, allow SSH, and reconnect normally. Leave the firewall
on.

What that teaches is worth more than the firewall itself: **"locked out" is not a category
of disaster, it's a state with an exit** — and it cost you four minutes instead of your
world because you found the exit before you needed it.

**Break the ownership of your key file.** As root, change the owner of the `minecraft`
user's `~/.ssh/authorized_keys` to root, then try to log in as `minecraft` from a new
terminal.

Permission denied — the same failure you caused deliberately last session, except now you
know exactly what caused it. The file is present. It's correct. It's readable. And SSH
won't touch it, because it belongs to the wrong person.

Change the owner back and verify you can log in again.

---

## What just happened

Your machine arrived with one account that could do anything, and now it has your account,
which asks for permission a command at a time. That convention isn't caution for its own
sake. It means a mistyped command has a floor under it, and it means the record of what
happened tells deliberate administrative acts apart from ordinary work. Every serious
Linux machine in the world is set up the way yours now is.

The ownership of that key file mattering is worth pausing on, because it looks like
fussiness and isn't. SSH won't trust a file listing who may log in as you if that file
belongs to somebody else — because if it did, anybody who could write to that file could
add themselves to it. The rule closes a hole rather than enforcing tidiness, which turns
out to be true of most permission rules that look arbitrary at first.

Then the strangers, which are the honest picture of the internet. A public address gets
scanned constantly by programs that will never know or care what your machine is for.
There is no version of this where the door gets closed. What you did instead was remove
everything guessable from behind it, which is a completely different kind of defence and a
much better one.

And then the part that isn't really about servers at all. You locked yourself out of a
machine you're paying for, deliberately, and got back in — because you'd found the exit
before you needed it. Most people meet that situation for the first time during an
emergency, discover the rescue path exists while panicking, and remember mostly the
panic. You have it the other way round.

The general form is worth keeping, because it's much bigger than this: **a recovery path
you have never used is a rumour.** That applies to backups, to fire escapes, and to every
"don't worry, we can always restore from…" that anybody will ever tell you.

---

## Go further

- Read the whole of `/etc/ssh/sshd_config` once — every line, including the commented-out
  ones. It's the complete list of decisions somebody made about how this machine lets
  people in. How many of them had you never thought about?
- Run `sudo ufw status verbose`. What's the default for connections you haven't mentioned
  at all? Is that the default you'd have picked?
- The strangers try common usernames. Skim a few hundred lines of the log — what names do
  they try, and what does that tell you about what they expect to find out there?
- Genuinely open: your key lives on exactly one Mac. What happens if that Mac is lost,
  stolen, or dropped in a bath? Work out what you'd do, then decide whether to set it up
  now rather than later. There are several answers and they trade off against each other
  differently; nobody writing this session knows which is right for you.

---

## What you have now

- An account on the machine that's yours, in the `sudo` group, logging in with your key
- Password logins and root logins over SSH closed off
- A firewall, allowing SSH and nothing else yet
- Read evidence of strangers trying to get into your machine, and an explanation of why
  that's fine
- Your provider's rescue console, used once while nothing was wrong
- Direct experience of being locked out of a machine you pay for, and of getting back in
