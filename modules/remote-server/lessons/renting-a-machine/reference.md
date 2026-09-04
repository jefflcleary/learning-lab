# Renting a machine and getting into it — reference

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

Compressed version: commands, decisions, and hazards only. The teaching version is
[guided.md](guided.md). Your machine: macOS. The rented machine: Ubuntu LTS.

Goal: a rented Linux machine at a known public address, reachable over SSH with a key,
and a clear picture of what it costs and how to stop paying.

**Worth doing days ahead of a learner's session** — account signup can block, and this
lesson stands alone. If a learner will do the rest later, leave them the two deliberate
connection failures; both are teaching moments and cost nothing.

Costs real money, monthly, for as long as the machine exists.

## Key pair

Do this before renting: the public half gets pasted into the creation form.

<span className="run-where run-where-local">On your Mac</span>

```
ssh-keygen -t ed25519
ls -a ~/.ssh
```

- Accept the default filename. Set a passphrase; the macOS keychain can hold it.
- `.pub` is public — safe to paste, publish, email. The other file never leaves the Mac
  and is never copied to the server.

## Rent

Default: OVHcloud, on price (~1/5 of the better-known providers at 4 GB, unlimited
traffic). Alternative: DigitalOcean — several times dearer, billed per second, larger
tutorial library.

Exit condition for this section, and the reason it is provider-independent from here on:

> Ubuntu LTS running, public address known, `ssh` from the Mac reaches a prompt.

- **Advertised price is the 12-month rate.** No commitment costs more (OVHcloud: 6
  months −5%, 12 months −15%). Looks like a bait-and-switch; isn't.
- **Local Zones exclude some inclusions** (automatic daily backup, anti-DDoS among
  them). Low latency is exactly why you'd pick one, so check what's included at the
  location, not for the product.
- **Signup** needs email and a payment method; usually immediate on OVHcloud and
  DigitalOcean. Some providers (Hetzner) add a risk-based identity check taking up to a
  couple of working days.
- **Sales tax** added at checkout in some jurisdictions. Pennies at this scale.
- **Location** — nearest the players. Cannot be fixed later.
- **Image** — Ubuntu LTS, current release from Ubuntu's releases page.
- **Size** — memory decides: ~4 GB for a small vanilla world and a few players, 8 GB for
  larger groups or mods.
- **Processor** — prefer faster cores over more of them. Minecraft runs the world on one
  thread; core count barely matters.
- **SSH key** — paste the `.pub` contents at creation.
- Console layouts change: use the provider's own docs for the screens. Note the public
  address when the machine exists.

## First login

<span className="run-where run-where-local">On your Mac</span>

```
ssh <username>@<address>
```

The username comes from the provider, in the console or the delivery email — **not
necessarily `root`**. OVHcloud creates a named account (`ubuntu` on Ubuntu) and disables
the administrator account; other providers hand you `root` directly. Some also email a
temporary password and force a change on first login.

Accept the host fingerprint on first connect (recorded in `~/.ssh/known_hosts`; a later
change makes `ssh` refuse — rebuilding a machine at the same address is the usual
cause).

<span className="run-where run-where-remote">On the rented machine</span>

```
whoami
ls /
df -h
free -h
uname -a
```

Check what `whoami` returns. Either you are `root` (all power, no warnings) or an
ordinary account with sudo available. Which one decides where the next lesson starts.

Diagnosing a failed connection: `ssh -v` prints each step and stops at the failure. The
provider's console shows whether the machine is running and which key was attached.

Three failure shapes, worth being able to name apart:

- **timeout** — nothing answered (wrong address, machine not up, silently dropped)
- **connection refused** — something answered and said no (nothing listening on that
  port)
- **Permission denied (publickey)** — connection fine, key declined. Not a network
  problem. This is the one a mistake in the next lesson produces.

## Billing

- Two models. **Monthly auto-renewing subscription** (OVHcloud): an afternoon's machine
  costs a month, and a forgotten one renews itself. **Per-second, capped monthly**
  (DigitalOcean): an afternoon costs pennies, a forgotten one bills continuously.
- **Powering off does not necessarily stop the charge; cancelling or deleting does.**
  Read the provider's own statement.
- Find before committing: the billing page, what is charged and when, and the screen
  where the machine is cancelled or deleted.

## What you have now

- An SSH key pair, with the public half installed on a rented machine
- A rented Ubuntu LTS machine at a known public address, reachable over SSH as the
  account the provider set up
- A read of the machine: disk, memory, kernel, what is running
- The monthly cost, the billing model, and the location of the off switch
