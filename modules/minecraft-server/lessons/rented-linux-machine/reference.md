# Moving your server to a rented Linux machine — reference

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

Compressed version: commands and decisions only. The teaching version is
[guided.md](guided.md). Your own machine: macOS. The rented machine: Ubuntu LTS.

Goal: the Minecraft server moves off the learner's computer onto a rented Linux
machine, runs under systemd, survives reboots, and is reachable at a public address
with nothing in the home involved.

Two things worth doing days ahead, and both stand alone: **Rent the machine** (account
signup can block on an identity check) and **Billing** (know the cost before
committing). If a learner will do this material later, leave them the firewall lockout
and the misspelled unit-file path — both are the teaching moments, and both are
harmless once the rescue path below is proved.

Costs real money, monthly, for as long as the machine exists.

## Key pair

Do this before renting: the public key gets pasted into the creation form.

<span className="run-where run-where-local">On your Mac</span>

```
ssh-keygen -t ed25519
ls -a ~/.ssh
```

- Accept the default filename. Set a passphrase; the macOS keychain can hold it.
- `.pub` is public — safe to paste, publish, email. The other file never leaves the
  Mac.

## Rent the machine

Default provider: OVHcloud — roughly a fifth the price of the better-known providers at
the same memory, unlimited traffic. Alternative: DigitalOcean, several times dearer but
billed per second and with a bigger tutorial library. Everything after this section is
provider-independent.

Two OVHcloud specifics: advertised prices are the 12-month rate (no commitment costs
more; 6 months saves 5%, 12 saves 15%), and Local Zone locations exclude some
inclusions — automatic daily backup among them — so check what's included at the
location you pick.

Exit condition for this section, and the reason it can be done by anyone in advance:

> Ubuntu LTS running, public address known, `ssh` from the Mac reaches a prompt.

- **Signup** needs an email and a payment method; usually immediate on OVHcloud and
  DigitalOcean. Some providers (Hetzner) add a risk-based identity check that can take a
  couple of working days. Do it days ahead regardless.
- **Payment** — OVHcloud US and DigitalOcean bill in US dollars; Hetzner in euros, so a
  non-euro card may add a foreign-transaction fee. Sales tax is added at checkout in
  some jurisdictions.
- **Location** — nearest to the players. Cannot be fixed later.
- **Image** — Ubuntu LTS. Current release from Ubuntu's own releases page.
- **Size** — memory is the constraint. ~4 GB for a small vanilla world and a handful
  of players; 8 GB for larger groups or mods.
- **Processor** — type barely matters for compatibility (Java bridges it; vanilla has
  no processor-specific parts). Speed does: Minecraft runs the world on one thread, so
  single-core speed beats core count. Take the premium tier over the cheapest at the
  same memory; don't pay for extra cores.
- **SSH key** — paste the `.pub` contents at creation.
- Console layouts change: use the provider's own docs for the screens, and their
  pricing page for the price. Note the public address when the machine exists.

## First login and lockdown

<span className="run-where run-where-local">On your Mac</span>

```
ssh root@<address>
```

Accept the host fingerprint on first connect (recorded in `~/.ssh/known_hosts`; a
later change makes `ssh` refuse, and rebuilding a machine at the same address is the
usual cause).

**Lockout rule, applies here and to the firewall:** while changing anything affecting
login, keep a second session open and logged in, and prove a *new* connection works in
a third before closing the first.

<span className="run-where run-where-remote">On the rented machine</span>

```
adduser minecraft
usermod -aG sudo minecraft
rsync --archive --chown=minecraft:minecraft ~/.ssh /home/minecraft/
```

- The `rsync` line is the one that catches people: `authorized_keys` must be *owned*
  by the new user or SSH ignores it. Copying alone is not enough.
- Verify in a new terminal: `ssh minecraft@<address>` then `sudo whoami` → `root`.
- SSH config: `/etc/ssh/sshd_config`, plus anything in `/etc/ssh/sshd_config.d/`,
  which overrides it. Want `PasswordAuthentication no` and `PermitRootLogin no`.
  **Check first** — current Ubuntu images frequently set both already.
- Restart the SSH server after any change, then prove a fresh connection before
  closing the original session.

Login attempts from strangers start within minutes of the machine existing and never
stop. `journalctl` with the SSH service named shows them. With keys only and no
password authentication, there is nothing to guess.

## Java

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo apt update
sudo apt install openjdk-<version>-jre-headless
java -version
```

Version required: check Minecraft's own server requirements. JRE runs Java programs
(the JDK also compiles); headless omits graphical components. `which java` gives the
absolute path needed by the unit file below.

## Copy the server across

- **Fresh backup first.** First time the world crosses a network.
- **Stop the server on the Mac** before copying. A world read while being written
  produces a copy of a state that never existed whole.

<span className="run-where run-where-local">On your Mac</span>

```
rsync -av --dry-run <server folder>/ minecraft@<address>:/home/minecraft/server/
rsync -av --progress <server folder>/ minecraft@<address>:/home/minecraft/server/
```

- **Trailing slash on the source is load-bearing.** `folder/` copies the contents;
  `folder` copies the folder itself into the destination. `--dry-run` shows which one
  you are about to get, for free.
- Add `-z` for a slow upload.
- **Do not use `--delete`** here. It makes the destination match the source exactly,
  removing anything else at the destination. It appears in most examples online.
- Travels with the folder: world, `server.properties`, `whitelist.json`, `ops.json`,
  datapacks, and `eula.txt` with the agreement already accepted. Nothing needs setting
  up again on the far side.
- Does not travel: Java. That is why it is installed first.

## Firewall and first run by hand

**Allow SSH before enabling the firewall.** Enabling `ufw` without allowing SSH
disconnects you and blocks reconnection — the single most common way a rented machine
is lost. Recoverable only through the provider's browser console (see Rescue path).

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo ufw allow OpenSSH
sudo ufw allow 25565
sudo ufw enable
sudo ufw status
```

Then start by hand once, before automating, so a failure has one suspect instead of
two:

<span className="run-where run-where-remote">On the rented machine</span>

```
java -Xmx3G -jar server.jar nogui
```

`-Xmx` must sit meaningfully below the machine's total memory — the JVM needs more
than the heap and the OS needs its own. Roughly 3G on a 4 GB machine. Set too high,
the machine runs out of memory and kills the server, with no explanation in the
server's own log.

Join from the Mac at the public address to confirm the copy worked.

## systemd unit

`/etc/systemd/system/minecraft.service`:

<span className="run-where run-where-remote">On the rented machine</span>

```
[Unit]
Description=Minecraft server
After=network.target

[Service]
User=minecraft
WorkingDirectory=/home/minecraft/server
ExecStart=/usr/bin/java -Xmx3G -jar server.jar nogui
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo systemctl daemon-reload
sudo systemctl enable --now minecraft
sudo systemctl status minecraft
sudo journalctl -u minecraft -f
```

- Stop the hand-started server first, or meet the port collision.
- **`start` runs it now; `enable` marks it to start at boot. Neither implies the
  other.** `enable --now` does both.
- `WorkingDirectory` must be absolute — **systemd does not expand `~`** — and decides
  where the server writes everything, same as on the Mac.
- `ExecStart` needs java's absolute path (`which java`).
- No console any more: the server's own words still go to `logs/latest.log`; failures
  *before* the server starts (bad path, wrong permissions) go to `journalctl -u
  minecraft` and appear nowhere else.
- Whether `systemctl stop` lets the server save cleanly is checkable, not assumable:
  stop it, then read `logs/latest.log` for the saving lines.
- Reboot test: `sudo reboot`, wait, reconnect, confirm the server came back. No login
  happens on this machine, so there is no human-shaped gap left to close.

## Cutover

- Friends use the machine's public address. No port forwarding, no tunnel, no dynamic
  DNS — none of that apparatus applies to a machine that is directly reachable. The
  home route stays in place for anything still running on the Mac.
- Read `whitelist.json` on the new machine to confirm it arrived; don't assume.
- `online-mode=true` in `server.properties`. The Minecraft port is open to the entire
  internet here, so anyone can attempt to connect; the whitelist is what stops them
  joining.

## Rescue path

Prove this **before** touching the firewall, not after.

- The provider's console includes a browser window acting as screen and keyboard for
  the machine, working even when its network settings are broken.
- Logging in that way needs something other than the SSH key — on both providers,
  resetting the root password from the panel. DigitalOcean calls the browser terminal
  the Droplet Console. Their docs cover the current wording.
- Log in through it once and look around. A rescue path that has never been used is a
  rumour.

## Billing

- Two models, and they fail differently. **Monthly subscription, auto-renewing**
  (OVHcloud): an afternoon's machine still costs a month, and a forgotten one renews
  itself. **Per-second, capped monthly** (DigitalOcean): an afternoon costs pennies, a
  forgotten one bills continuously.
- **Powering a machine off does not necessarily stop the charge; cancelling or deleting
  it does.** Read the provider's own statement rather than trusting any number here.
- Find, before committing: the billing page, what is being charged and when, and the
  screen where a machine is cancelled or deleted.

## What you have now

- A rented Linux machine, reachable at a public address, administered over SSH
- A key pair, a non-root user with `sudo`, and password and root SSH logins closed off
- The world, settings, and whitelist running there; the learner's own computer no
  longer involved
- A systemd unit that starts the server at every boot, proved by a reboot
- `apt`, `ufw`, `rsync`, and `journalctl` used for real
- Friends playing at an address unrelated to the home network, with the learner's
  computer switched off
- A monthly bill that can be found, read, and stopped
