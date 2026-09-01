# Locking the front door

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** locking-the-front-door
- **Part:** Part 2 — Making it yours
- **Scaffolding:** level 1 — the most unforgiving material in the module. The failure
  mode is losing access to a machine that is being paid for, so reasoning is shown
  throughout and every hazard is a stated rule before the step that triggers it.
- **Deliveries:** guided + reference. The reference is genuinely useful here: an
  experienced adult wants the command sequence and every hazard in one place.
- **Status:** ready

## Goal and payoff

The machine stops being a thing handed over by a provider and becomes the learner's: a
user that isn't root, administrative power borrowed one command at a time, password and
root logins closed off, and a firewall.

The payoff is unusual for this lab and worth keeping exactly as it is: **it is seeing
something alarming and understanding why it is fine.** Strangers' programs have been
trying to log into this machine since the moment it existed, and the learner reads the
evidence. The defence was never a wall — the front door is open to the entire internet
and always will be. What changed is that there is nothing left to guess.

The second payoff is a disposition rather than a skill. The learner deliberately locks
themselves out of a machine they are paying for, and gets back in, because they proved
the rescue path first. "Locked out" stops being a category of disaster and becomes a
state with a known exit, which is the thing this whole lab exists to install.

## Prerequisites

- A rented Ubuntu machine you can reach as root over SSH, and its public address —
  established by `modules/remote-server/lessons/renting-a-machine/`
- Access to the provider's control panel for that machine, which is where the rescue
  path lives. Same lesson.

## Establishes

- A non-root user with `sudo`, logging in with the learner's key; password and root SSH
  logins closed; a firewall permitting SSH — cited as: "the machine has a non-root user
  with sudo and a firewall — established by
  `modules/remote-server/lessons/locking-the-front-door/`."
- The learner has used the provider's browser console and knows it exists.
- Vocabulary later lessons use freely: root, sudo, group, firewall, port, the lockout
  rule.

## Facts

### Where commands run

- **On your Mac** (local variant) — opening the SSH sessions themselves.
- **On the rented machine** (remote variant) — everything else.

### root and sudo

- **root** is the administrator account on every Linux machine. It can do anything,
  including irreversibly destroy the system, and nothing warns it or asks for
  confirmation. A new machine arrives as root because there is no other account yet.
- Working as root all the time is avoided everywhere, for two reasons worth stating
  plainly: a mistyped command has no safety margin, and nothing in the record
  distinguishes "I meant to do something administrative" from "I was tidying up".
- The convention on every Linux machine in the world: a normal user for daily work, plus
  `sudo` in front of the individual commands that need administrative power.
- `adduser <name>` creates a user with a home directory at `/home/<name>`.
  `usermod -aG sudo <name>` puts that user in the `sudo` group, which is what grants the
  privilege. [verify group name is `sudo` on current Ubuntu as of 2026-09]
- A new user's `~/.ssh/authorized_keys` starts empty, so a freshly created user cannot be
  logged into with the key that works for root until the file is copied across — **with
  ownership set to the new user, or SSH ignores it**. The standard one-liner, run as
  root: `rsync --archive --chown=<name>:<name> ~/.ssh /home/<name>/`
- `sudo whoami` answering `root` is the neat one-command demonstration: the power,
  borrowed for exactly one command and handed straight back.

### SSH configuration

- Password-based SSH login is turned off in `/etc/ssh/sshd_config` with
  `PasswordAuthentication no`, and root login with `PermitRootLogin no`, after which the
  SSH server is restarted.
- [verify as of 2026-09] Current Ubuntu cloud images frequently set both already, and
  settings may live in files under `/etc/ssh/sshd_config.d/` that override the main file.
  Deliveries must have the learner **check what is already true before changing
  anything** — discovering a setting is already correct is a better outcome than
  switching off something that was never on.

### The lockout rule

Non-negotiable, stated as a standing rule before the first command that could trigger
it, and restated before the firewall:

> While changing anything that affects how you log in — SSH configuration or the
> firewall — keep a second terminal open and already logged in, and do not close it until
> a *new* connection has been proved to work in a third one.

A session already open keeps working no matter what is broken. The question is always
whether the next one will.

### The strangers

- A machine with a public address is scanned continuously by automated programs looking
  for login prompts. The first attempts to log in as `root` typically arrive within
  minutes of a machine appearing. This is background noise of the internet, not a
  targeted attack.
- Visible in the machine's own logs. [verify current Ubuntu location as of 2026-09:
  `journalctl -u ssh` versus `/var/log/auth.log`.] Filtering for `invalid user` shows the
  shape of it quickly.
- Why it is not an emergency, and this is the half that matters: nothing here is a wall.
  The front door is open to the entire internet and always will be — that is what a
  public address means. What changed is that a password can be tried a million times a
  night by a program that never gets bored, and a key cannot be tried at all, because
  there is no keyhole for one.

### The firewall

- `ufw` ("uncomplicated firewall") is Ubuntu's front end for the firewall built into
  Linux. It decides which ports accept connections from outside.
- `sudo ufw allow OpenSSH` (or `allow 22`), `sudo ufw enable`, `sudo ufw status`.
  Minecraft's port is opened in the next lesson, when there is something listening on it.
- **Enabling the firewall without first allowing SSH disconnects you and prevents
  reconnection.** The single most common way people lose a rented machine.
- Used on the machine rather than through the provider's own firewall product, for two
  reasons: it is identical on every Linux machine anywhere, and it keeps the lesson free
  of a second provider-specific screen.

### The rescue path

- **The provider's web console** is a back door: a keyboard and screen for the machine,
  in a browser, that works even when the machine's network configuration is broken. It
  exists because the provider owns the hardware.
- Reaching it needs a way to log in that is not the SSH key — on the providers this
  module names, resetting the root password from the panel. [verify current wording and
  location on the chosen provider as of 2026-09]
- **It is rehearsed before it is needed.** A rescue path that has never been used is a
  rumour. This ordering is not a suggestion; the firewall exercise depends on it.

## Arc

### Orientation — given plainly

All of the Facts. What root is and why nobody works as it, what `sudo` does, how
`authorized_keys` decides who may log in, where the SSH settings live and that they may
already be set, what a firewall is, what the provider's console is and why it exists,
and the strangers. The lockout rule is stated before the first command it applies to.

Framing sentence: the machine as handed over has one account, it can do anything, and
its front door is open to the entire internet. All three of those are about to change,
except the last one, which cannot change and does not need to.

### Predictions to elicit

- A brand-new computer appears on the internet with a login prompt open to the world. How
  long do you think it takes before a stranger's program tries to log into it? Write down
  a number before you look.
- You are about to create a second account and stop using the first. What could that
  protect you from that being careful would not?
- You are about to turn off password logins entirely. What happens to somebody — including
  you — who has the password but not the key?
- If you locked yourself out of this machine right now, what would you do? Answer before
  reading on; you will find out whether you were right.

### The work — goals and hint ladders

**1. Make a user that isn't root.** `adduser`, then `usermod -aG sudo`. Both are
documented by Ubuntu and given plainly.

**2. Get your key across.** The interesting step.

- Rung 1: your new user cannot log in with your key yet, but root can. What does root
  have that the new user doesn't? Somewhere on this machine there is a file that decides
  which keys may log in as a particular person.
- Rung 2: every user has their own `~/.ssh/authorized_keys` — a file listing the public
  keys allowed to log in as them. That is the whole mechanism: a line in that file grants
  access, deleting it revokes access. Root's copy has your key in it, put there by the
  provider at creation. Your new user's doesn't exist yet. Copying it is not quite
  enough: SSH refuses to trust a key file owned by somebody else, so ownership has to
  change with the copy.
- Rung 3: `rsync --archive --chown=minecraft:minecraft ~/.ssh /home/minecraft/`, run as
  root.

**3. Prove it, then borrow power.** A **new** terminal, `ssh minecraft@<address>`, then
`sudo whoami` answering `root`.

**4. Close the doors.** `/etc/ssh/sshd_config`, plus anything under
`/etc/ssh/sshd_config.d/` that overrides it. Check what is already set before changing
anything. Restart the SSH server, prove a fresh connection works in a third terminal,
and only then close the original.

The lockout rule is restated here as the operating procedure rather than a warning.

**5. Read who has been knocking.** The machine has been on the internet with a login
prompt open since it was created. Go and look.

- Rung 1: the machine writes down every attempt to log into it. Where does a Linux
  machine write things down?
- Rung 2: `journalctl` with the SSH service named. Filtering for `invalid user` shows the
  shape of it fast.

Check the prediction. Then the important half: work out why this is not an emergency.

**6. Find the back door before you need it.** In the provider's panel, find the browser
console that acts as screen and keyboard for the machine, arrange a way to log in through
it, and actually log in that way once. Deliveries must place this **before** the firewall
work, and must say why in one line.

**7. Put up the firewall.** Allow SSH first, then enable, then read `ufw status`. The
lockout rule applies and is restated.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Lock yourself out with the firewall.** The rescue path is proved, so now do the thing
  that was warned about: disable the firewall, then re-enable it *without* allowing SSH
  first. The session in progress survives; the next connection does not. Reconnect through
  the browser console, allow SSH, reconnect normally, and leave the firewall on. Teaches
  the most common way a rented machine is lost, at a moment when losing it costs nothing —
  and teaches that "locked out" is a state with an exit, which is the disposition the whole
  lab is for. Undo: allow SSH, verify a normal connection, leave the firewall enabled.
- **Break the ownership of `authorized_keys`.** As root, `chown root:root` the new user's
  `~/.ssh/authorized_keys`, then try to log in as that user from a new terminal.
  Permission denied — the same failure shape met deliberately in the previous lesson, now
  with a cause the learner created. The file is present and correct and readable and SSH
  will not touch it, because it belongs to the wrong person. Teaches that a key file's
  ownership is part of the mechanism rather than housekeeping. Undo: `chown` it back to
  the user and verify.

### What just happened — the explanation

The machine arrived with one account that could do anything, and now it has a person's
account that asks for permission a command at a time. That convention is not caution for
its own sake. It means a mistyped command has a floor under it, and it means the record
of what happened distinguishes deliberate administrative acts from ordinary work. Every
serious Linux machine in the world is set up the way this one now is.

The key file's ownership mattering is worth pausing on, because it looks like fussiness
and isn't. SSH will not trust a file listing who may log in as you if that file belongs
to somebody else — because if it did, anybody who could write to that file could add
themselves. The rule closes a hole rather than enforcing tidiness, which is true of most
permission rules that look arbitrary.

Then the strangers, which are the honest picture of the internet. A public address gets
scanned constantly by programs that will never know or care what this machine is for.
The defence was not a wall, and there is no version of this where the door gets closed:
the machine has to answer, because answering is what it is for. What changed is that
there is nothing behind the door that can be guessed. A password can be attempted a
million times a night. A key cannot be attempted at all.

And then the thing that is not really about servers. You locked yourself out of a machine
you are paying for, on purpose, and got back in — because you found the exit before you
needed it. Most people meet that situation for the first time in an emergency, discover
the rescue path exists while panicking, and remember the panic. You have it the other way
round now, and the general form of it is worth keeping: **a recovery path you have never
used is a rumour.** That applies to backups, to fire escapes, and to every "we can always
restore from…" anybody ever tells you.

### Go further — open questions

- Read the whole of `/etc/ssh/sshd_config` once — every line, including the commented
  ones. It is the complete list of decisions somebody made about how this machine lets
  people in. How many of them had you never considered?
- Run `sudo ufw status verbose`. What is the default for connections you have not
  mentioned at all, and is that the default you would have chosen?
- The strangers try common usernames. Skim a few hundred lines of the log: what names do
  they try, and what does that tell you about what they expect to find?
- Genuinely open: your key lives on one Mac. What happens if that Mac is lost, stolen, or
  dropped in a bath? Work out what you would do, then decide whether to set it up now.
  There are several answers and they trade off differently; nobody writing this lesson
  knows which is right for you.

## Delivery notes

- **guided:** level 1 throughout. This is the densest and least forgiving material in the
  module and the delivery should not hurry.
- **The rescue rehearsal comes before the firewall exercise, always.** Deliberately
  locking a learner out of a machine they are paying for without a proved way back is
  irresponsible, and the ordering is what makes the exercise good rather than reckless.
- The lockout rule appears twice — before the SSH configuration and before the firewall —
  phrased as a standing procedure, never as a warning box.
- Have the learner check the existing SSH settings before changing them. "It was already
  correct" is a good outcome and should be framed as one.
- The strangers section must carry both halves: the alarming observation and the
  explanation of why it is fine. The first without the second is just frightening.
- Do not attach a number to how quickly the scans arrive; have the learner look.
- **reference:** the full command sequence in order, both lockout rules, the ownership
  requirement on `authorized_keys`, the rescue path with its
  prove-it-first instruction, and the note that current Ubuntu images may already have
  the SSH settings right.
