# Keeping it running — reference

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

Compressed version: commands and hazards only. The teaching version is
[guided.md](guided.md).

Goal: the server starts at boot as a systemd service, survives a reboot with nobody logged
in, and friends join at the machine's public address.

If a learner will do this material later, leave them the reboot test, the misspelled
unit-file path, and the final demonstration — those are the teaching moments and the
module's payoff.

## Unit file

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

- `WorkingDirectory` must be absolute — **systemd does not expand `~`** — and decides where
  the server writes everything, same as on the Mac.
- `ExecStart` needs java's absolute path (`which java`).
- `-Xmx` meaningfully below the machine's total memory.

## Running it

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo systemctl daemon-reload
sudo systemctl enable --now minecraft
sudo systemctl status minecraft
sudo journalctl -u minecraft -f
```

- Stop the hand-started server first, or meet the port collision.
- **`start` runs it now; `enable` marks it to start at boot. Neither implies the other.**
  `enable --now` does both.
- No console any more: the server's own words go to `logs/latest.log`; failures *before*
  the server starts (bad path, wrong permissions) go to `journalctl -u minecraft` and
  appear nowhere else.
- Whether `systemctl stop` lets the server save cleanly is checkable, not assumable: stop
  it, then read `logs/latest.log` for the saving lines.
- Reboot test: `sudo reboot`, wait, reconnect, confirm the server came back. No login
  happens on this machine, so there is no human-shaped gap left to close.

## Cutover

- Friends use the machine's public address. No port forwarding, no tunnel, no dynamic DNS
  — none of that applies to a directly reachable machine. The home route stays in place for
  anything still running on the Mac.
- `cat whitelist.json` on the machine to confirm it arrived; don't assume.
- `online-mode=true` in `server.properties`. The port is open to the entire internet, so
  anyone can attempt to connect; the whitelist is what stops them joining.

## What you have now

- A systemd unit starting the server at every boot, proved by a reboot
- Friends playing at the machine's public address with the learner's computer switched off
- `systemctl` and `journalctl` used for real
- A measured answer about whether a service stop saves the world
