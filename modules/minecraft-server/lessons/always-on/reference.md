# A server that's there at seven in the morning — reference

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

Compressed version: commands and decisions only. The teaching version is
[guided.md](guided.md). macOS.

Goal: server survives sleep, starts itself at login, and returns after a reboot or
power cut with no human intervention.

Scope decision up front: a laptop that leaves the house cannot be a 24/7 server. Any
machine that stays home and plugged in works. If a learner will do this material
later, consider leaving the "watch sleep kill the server" test and the misspelled
plist-path debugging for them — both are the teaching moments.

## Sleep

- A sleeping Mac serves nobody — connections from outside just time out.
- System Settings → search "sleep" → enable the prevent-automatic-sleeping option
  (pane naming varies by macOS release and machine type; the search is the durable
  path).
- Terminal alternative: `caffeinate -i <command>` holds off idle sleep while the
  command runs. Wrapping the server start covers exactly the running window:

  ```
  caffeinate -i java -jar server.jar nogui
  ```

  `man caffeinate` for flags.
- Laptops: closed lid generally sleeps the machine regardless; exceptions
  (external display + power) are documented by Apple — search "use your Mac
  notebook with the lid closed" and confirm for the specific machine.

## Auto-start via launchd

- Per-user agents live in `~/Library/LaunchAgents/`, run **at login** (not boot).
  `mkdir -p ~/Library/LaunchAgents` if absent.
- Template — adjust paths, all absolute (**launchd does not expand `~`**). Confirm
  the java path with `which java`.

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN"
    "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
      <key>Label</key>
      <string>local.mc-server</string>
      <key>ProgramArguments</key>
      <array>
          <string>/usr/bin/java</string>
          <string>-jar</string>
          <string>server.jar</string>
          <string>nogui</string>
      </array>
      <key>WorkingDirectory</key>
      <string>/Users/NAME/projects/mc-server</string>
      <key>RunAtLoad</key>
      <true/>
      <key>StandardOutPath</key>
      <string>/Users/NAME/projects/mc-server/launchd-out.log</string>
      <key>StandardErrorPath</key>
      <string>/Users/NAME/projects/mc-server/launchd-err.log</string>
  </dict>
  </plist>
  ```

  Save as `~/Library/LaunchAgents/local.mc-server.plist` (filename matches label by
  convention).
- `WorkingDirectory` is load-bearing: the server creates world/logs/properties in
  whatever folder it starts from. Wrong value = a second empty world elsewhere, no
  error.
- Sleep + launchd combined: first ProgramArguments string can be caffeinate's
  absolute path (`which caffeinate`), followed by `-i`, then the java path and args.
- **Stop any hand-run server before loading** — RunAtLoad starts immediately and
  collides on port 25565 otherwise.
- Load / unload — check `man launchctl` for which forms the installed macOS
  recommends; both families exist:

  ```
  launchctl bootstrap gui/$UID ~/Library/LaunchAgents/local.mc-server.plist
  launchctl bootout   gui/$UID/local.mc-server
  ```

  or the older `launchctl load` / `launchctl unload <plist-path>`. (`id -u` prints
  the uid if `$UID` is unset.)
- Verify: `launchctl list | grep local.mc-server` — a PID in the first column means
  running; the multiplayer screen; an outside join.

## No console anymore

- A launchd-run server has no terminal to type `stop` into.
- Stop = unload/bootout the job. launchd asks the process to quit (SIGTERM). Whether
  the server saved cleanly is verifiable in `logs/latest.log` (saving lines at the
  end) — check once before trusting it with a world that matters.
- Console needed for a while: unload, run by hand in a terminal, reload after.
- Server output: `logs/latest.log` as always. Pre-server failures (bad jar path,
  bad java path) never reach it — they show up as a nonzero exit status in
  `launchctl list`, in the `StandardErrorPath` file, and in the system log
  (Console.app, or `log show --last 10m` and search for the label).

## Unattended comeback

Chain: power on → boot → login → LaunchAgents → server. Close the gaps:

- **Automatic login** — System Settings, Users & Groups area. Unavailable while
  FileVault is on; a self-decrypting disk would defeat the encryption, so it's an
  either/or. Decide per machine, with its owner: encryption vs unattended restarts.
- **Desktops:** look for the start-up-automatically-after-a-power-failure option in
  the energy settings; without it, a power cut ends at a dark machine.
- Windows note for a future platform: sleep is under Settings > System > Power;
  Windows Update reboots on its own schedule and must be managed for an always-on
  box.

## The power-cut proof

**Expendable setup only, fresh backup first** — cutting power to a running server is
a hard kill mid-write, the exact thing the stop-cleanly rule guards against.

1. Backup (`backup.sh`).
2. Server running via launchd; automatic login on.
3. Desktop: pull the cord. Laptop: hold the power button until it dies (battery
   makes cord-pulling a non-event).
4. Power on, hands off. Machine boots, logs in, server returns. Outside join
   confirms.

## What you have now

- A server that survives sleep and reboots and returns from power loss unattended
- `~/Library/LaunchAgents/local.mc-server.plist` (or equivalent label), which other
  lessons may reference
- The learner (or executor) can start/stop the job with `launchctl` and knows where
  background-program errors land: `launchctl list` exit status, StandardErrorPath
  file, system log
- Third settings-file shape encountered: XML, after key=value and JSON
