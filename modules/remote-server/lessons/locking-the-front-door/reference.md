# Locking the front door — reference

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

Compressed version: commands and hazards only. The teaching version is
[guided.md](guided.md).

Goal: a non-root user with `sudo` logging in by key, password and root SSH logins closed,
a firewall allowing SSH, and the provider's rescue console proved.

If a learner will do this material later, leave them the firewall lockout and the log of
login attempts — both are the teaching moments, and the lockout is harmless once the
rescue path below is proved.

**Lockout rule, applies to the SSH config and to the firewall:** keep a second session
open and logged in, and prove a *new* connection works in a third before closing the
first.

## User and key

<span className="run-where run-where-remote">On the rented machine</span>

```
adduser minecraft
usermod -aG sudo minecraft
rsync --archive --chown=minecraft:minecraft ~/.ssh /home/minecraft/
```

- The `rsync` line is the one that catches people: `authorized_keys` must be **owned** by
  the new user or SSH ignores it. Copying alone is not enough.
- Verify in a new terminal: `ssh minecraft@<address>`, then `sudo whoami` → `root`.

## SSH config

- `/etc/ssh/sshd_config`, plus anything in `/etc/ssh/sshd_config.d/`, which **overrides
  it**. Reading only the main file will tell you something untrue.
- Want `PasswordAuthentication no` and `PermitRootLogin no`. **Check first** — current
  Ubuntu images frequently set both already, and that is a good outcome.
- Restart the SSH server after any change, then prove a fresh connection before closing
  the original session.

## Login attempts

Strangers start within minutes of the machine existing and never stop. `journalctl` with
the SSH service named; filter for `invalid user`. With keys only and no password
authentication there is nothing to guess — the door stays open because it has to, and
what changed is what is behind it.

## Rescue path — prove before the firewall

- The provider's browser console is a screen and keyboard for the machine, working even
  when its networking is broken.
- Logging in that way needs something other than the SSH key — usually resetting the root
  password from the panel. Their docs carry the current wording.
- **Log in through it once before touching the firewall.** An untested rescue path is a
  claim, not a capability.

## Firewall

**Allow SSH before enabling.** Enabling `ufw` without allowing SSH disconnects you and
blocks reconnection — the single most common way a rented machine is lost, recoverable
only through the console above.

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

Minecraft's port waits until the next lesson, when something is listening on it.

## What you have now

- A non-root user in the `sudo` group, logging in with the learner's key
- Password and root SSH logins closed
- A firewall permitting SSH
- The provider's rescue console, used once
