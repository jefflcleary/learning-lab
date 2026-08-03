# A remote control for the server

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** rcon-scripting
- **Part:** Part 5 — Data
- **Scaffolding:** level 2 — second Python lesson (Python-for-data skill, lesson
  two). Goals plus hints; concepts named but not applied; no completion skeletons
  except where a single API call's shape can't be derived (pointed at the
  library's README instead).
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

Enable RCON — the server's remote-control door — and write Python that sends
console commands to the *running* server: first `/list`, then automatic
announcements, then a greeter that watches the log and welcomes each player as
they join. Payoff: the server talks on a schedule and reacts to events with no
human at the keyboard — visibly alive to everyone playing.

This lesson deliberately closes two loops left open elsewhere, and the delivery
cashes both explicitly:

1. `lessons/backups-without-stopping/` left a gap — the hot-backup dance
   (`save-off`, `save-all flush`, copy, `save-on`) needs console commands typed
   at the right moments, and a script couldn't type into the console.
2. `lessons/reading-the-logs/` ended with a leaderboard the script computed but
   could not announce. Now it announces itself.

It also carries the module's first real **secret**: the RCON password, and the
decision about what to do with a settings file that now contains one.

## Prerequisites

- A Python script that reads server data — established by
  `lessons/reading-the-logs/`
- Comfort editing `server.properties` and the restart-to-apply rule — established
  by `lessons/server-settings/`

## Establishes

- RCON enabled on the server (localhost use only), password set
- A virtual environment and an installed RCON library in the learner's project
- Scripts that send commands to the running server: an announcer (leaderboard via
  `/say`), a scheduler (loop + sleep), a log-watching greeter
- A conscious, learner-made decision about the password-in-a-tracked-file problem
  (if they version-control the server)
- Cited by other cores as: "a script can send console commands to the running
  server via RCON — established by `lessons/rcon-scripting/`."

## Facts

- **RCON** = remote console: a standard way for *other programs* to send console
  commands to a running server over the network, gated by a password. Minecraft's
  implementation is off by default.
- Enabling it, in `server.properties`: `enable-rcon=true`, `rcon.port` (default
  `25575`), `rcon.password` (empty by default; empty means RCON won't work)
  [verify exact key names and defaults against the minecraft.wiki
  `server.properties` page — deliveries have the learner confirm the keys from
  that page rather than trusting a listing here]. Restart to apply — the learner
  knows why from server-settings.
- **Security, stated plainly and calmly:**
  - The RCON conversation, password included, travels essentially unprotected —
    no encryption [verify protocol detail; the *practice* below is safe to state
    regardless].
  - Therefore: RCON stays on localhost/LAN. Never port-forward the RCON port.
    Never reuse a password that matters anywhere else — invent a throwaway.
  - Anyone who can speak to the RCON port with the password has full console
    power (op-level).
- **The secret-management dilemma** (only applies if the learner did
  `lessons/git-for-your-server/`): `server.properties` is likely tracked, and it
  now contains a password. Honest options: (a) add `server.properties` to
  `.gitignore` and stop tracking it — the file's other settings lose version
  history; (b) accept the tradeoff consciously — fine *only* while the
  repository never leaves this machine, and a decision that must be revisited
  before any push to a hosting service. There is no third option that costs
  nothing. The learner decides, on purpose, and writes the decision down.
- **pip and PyPI:** `pip` is Python's package installer and ships with Python;
  PyPI ([pypi.org](https://pypi.org)) is the public registry it installs from.
  Direct parallel to npm and the npm registry — the dependency concept from
  `lessons/first-bot/` transfers whole, but the delivery explains it standalone
  (bot lessons may not have been done; material reads cold).
- **Virtual environments:** modern macOS Pythons may refuse a bare
  `pip install` with an "externally managed environment" error (PEP 668)
  [verify current behavior as of 2026-07 — depends on install source; python.org
  installers historically permissive, Homebrew/system strict]. The fix, and
  standard professional practice anyway: a **venv** — a project-local toolbox,
  so installed libraries belong to this project rather than to the whole
  machine. Commands [verify against docs.python.org/3/library/venv.html]:

  ```
  python3 -m venv .venv
  source .venv/bin/activate
  ```

  Prompt gains a `(.venv)` prefix while active; `deactivate` leaves; the venv
  must be active (or its python used directly) whenever running scripts that
  import the installed library. Delivery keeps this as light as reality allows:
  try the install, read what Python says, reach for the venv when (or before)
  the friction appears.
- **Library choice** [volatile as of 2026-07]: `mcrcon` is the historically
  common pick for Minecraft RCON from Python; alternatives exist (`rcon`,
  others). Deliveries never assert the current best: the learner searches
  pypi.org, and *evaluates* — most recent release date, does the README mention
  Minecraft, does the project look tended — the exact evaluation skill from
  `lessons/choosing-a-version/`, and the delivery says so.
- **Library usage:** taken from the chosen library's own README, never asserted
  in learner text (APIs drift; README-reading is the read-the-surface skill).
  Author reference for mcrcon's historical shape [volatile]:

  ```python
  from mcrcon import MCRcon
  with MCRcon("127.0.0.1", "yourpassword", port=25575) as mcr:
      resp = mcr.command("list")
      print(resp)
  ```

- The reply to any command arrives as a **string** — same text a human would see,
  now in a variable.
- `/say <message>` broadcasts; command strings over RCON generally work with or
  without the leading slash [verify — learner just tries both].
- **Failure signatures** (the learner measures all of these; do not assert exact
  library exception names):
  - Wrong password → connection opens, then an authentication failure — the door
    answered and rejected the credential.
  - RCON disabled (`enable-rcon=false`) → connection refused — nothing listening
    at that port at all.
  - Wrong port (e.g. one nobody's using) → also connection refused; aimed at the
    *game* port `25565` instead, the connection opens but the conversation is in
    the wrong protocol — hang, garbage, or an error [verify — framed strictly as
    an experiment].
- Scheduling in-process: `import time`, `time.sleep(seconds)`, `while True:`.
  Stopped with Ctrl-C (worth stating; an infinite loop is the learner's first).
- The grown-up scheduler on macOS is `launchd` (and `cron` exists nearly
  everywhere) [macos] — named, pointed at, go-further only.
- Following a growing log from Python: open, jump to the end, then poll —

  ```python
  f.seek(0, 2)     # move to end of file: (offset 0, from the end)
  ```

  then a loop of `f.readline()` / `time.sleep(1)` when empty. `tail -f` in
  Python, hand-rolled.
- **Four doors, one parser:** the console (`lessons/console-commands/`), an
  opped player in-game, RCON, and datapack functions
  (`lessons/datapack-functions/`) all feed the same command parser the same
  strings. The console was never special.
- Underneath RCON (and everything else here) is a **socket** — a program-to-
  program connection the library is managing. Named lightly; built by hand in
  `lessons/server-list-ping/`.

## Arc

### Orientation — given plainly

Open by cashing the two loops: the leaderboard script that couldn't speak, and —
for anyone who has done the hot-backup procedure — the step where a human had to
type `save-off` because a script can't reach the console. Both are the same
missing capability, and it has a standard answer: RCON, a remote console — a
door into the server built for *programs*, guarded by a password. What it is,
that Minecraft ships it off by default, which settings turn it on (confirmed
from the wiki), and the security posture — all stated plainly up front,
including the fact that this password is the learner's first managed secret.

pip/PyPI/venv given plainly as tools (this is Python's dependency moment; npm
parallel drawn for those who've built bots, explained standalone regardless).
Library chosen by the learner via PyPI search plus the evaluation habits from
choosing-a-version; usage learned from the library's own README.

### Predictions to elicit

- When a program sends the wrong password: what comes back — silence, an error
  message, a refused connection? What *should* come back?
- The reply to `/list`, delivered to a program — what kind of thing will it be?
- `server.properties` is about to contain a password. Is there anything in your
  setup that could leak it? (Pointed, if they've done git-for-your-server.)

### The work — goals and hint ladders

1. **Open the door.** Goal: RCON enabled — keys confirmed against the
   minecraft.wiki `server.properties` page (search the page for "rcon"), a
   throwaway password invented, restart, and the server's startup output checked
   for evidence RCON came up.
   - Rung 1: three settings mention rcon on the wiki page. All three matter;
     one of them being left empty is the same as leaving the door locked.
   - Rung 2: the startup log is where the server announces what it's listening
     on. Find the RCON line before writing any Python — proof the door exists.

   Then the secret, before anything else happens: if the server folder is under
   git (`lessons/git-for-your-server/`), run `git status` / check whether
   `server.properties` is tracked. Present the two honest options (ignore the
   file and lose its history, or accept local-only and never push without
   revisiting). The learner decides and writes the decision in a comment or
   README. Deliveries must not decide for them — the deciding is the content.
2. **Get the tools.** Goal: an RCON library installed in a project-local venv.
   Learner searches pypi.org for Minecraft RCON libraries and evaluates
   candidates by the choosing-a-version habits (release recency, README,
   signs of tending). Try the install; if Python refuses with an
   externally-managed-environment message, read it — it names the fix. Venv
   explained at that moment as a project-local toolbox; commands per
   docs.python.org (point, don't assert versions of the ritual).
   - Rung 1: pip is to Python what npm is to Node — installer plus registry.
     The registry's search box is the starting point.
   - Rung 2: evaluation checklist, same as sizing up any community tool: when
     was the last release, does the README show Minecraft usage, does the
     project look answered-to.
   - Rung 3: venv ritual and the activation prefix; the rule that the venv must
     be active when running these scripts.
3. **First contact.** Goal: `rcon_test.py` — connect to `127.0.0.1`, send
   `list`, print the reply. Usage comes from the library's README (read the
   whole thing — it's short; that's read-the-surface).
   - Rung 1: the README's first example is almost the whole script. What has to
     change: address, password, port, command.
   - Rung 2: the reply lands in a variable. Print it, then look at what it *is*
     — the same sentence a human sees at the console, now a string a program
     holds. Programs talking to programs.
4. **The announcer.** Goal: the leaderboard script from reading-the-logs
   announces its own top three in-game via `/say`, no human typing.
   - Rung 1: two working programs exist — one computes standings, one sends
     commands. This step is a merge, not new invention.
   - Rung 2: the top three are the first three names `sorted(...)` yields;
     building the message is string assembly; sending it is one `command(...)`
     per line (or one long line — dealer's choice).
5. **On a schedule.** Goal: the announcer repeats forever — every N minutes —
   until stopped with Ctrl-C.
   - Rung 1: a loop that never ends, with a nap in it. `while True:` and
     `time.sleep(seconds)` are the pieces; `import time` first.
   - Rung 2: re-read the log inside the loop, not once before it — otherwise
     the standings never update. Where the `open` sits relative to the `while`
     decides this.
6. **The greeter.** Goal: a script that watches `latest.log` as it grows and,
   when someone joins, greets them by name in-game within a few seconds. A
   working milestone-trigger: log event in, in-game reaction out.
   - Rung 1: the joins problem is solved (last lesson) and the speaking problem
     is solved (today). New piece: reading a file that's still being written —
     start at the *end* and keep asking for new lines.
   - Rung 2: after opening, jump to the end with `f.seek(0, 2)` (seek to offset
     0, measured from the end). Then loop: `f.readline()` returns the next new
     line, or an empty string when there's nothing yet — sleep a second and ask
     again.
   - Rung 3: have someone join (or join yourself) and watch the greeting land.
     Name extraction is last lesson's `split` trick, unchanged.

   Worth one paragraph in the delivery: for anyone who built a mineflayer bot,
   compare — the bot greets by *being a player in the world*; this greeter has
   no Minecraft account, no body, no presence, and acts through the console
   instead. Two utterly different ways for code to act on the same server.

### Break it on purpose — failures to cause, what each teaches, how to undo

A deliberate failure-signature session: three (plus one) causes, and the learner
records what each *looks like* so the errors become distinguishable evidence.
Suggest a table: cause → error seen.

- **Wrong password.** Edit the script's password to something wrong; run. The
  connection is made, then rejected — read the exact error. This is the door
  answering and refusing the credential. Undo.
- **Door removed.** Set `enable-rcon=false`, restart, run the (correct) script.
  Different error — connection refused: nothing is listening there at all.
  Distinguish from the last one: refused-at-the-credential vs nothing-there.
  Undo (re-enable, restart).
- **Wrong door.** Point the script at a port where nothing lives (e.g. 25599) —
  refused again, same signature as disabled, and that *sameness* is the lesson:
  from outside, "RCON off" and "wrong port" are indistinguishable, which is
  exactly why the startup log check in step 1 matters. Then, as an experiment,
  aim at the *game* port 25565: something is listening, but it speaks a
  different protocol — observe what happens [verify behavior; unspoiled,
  framed as experiment]. Undo.
- **Garbage command.** Correct connection; send nonsense (`frobnicate the
  chickens`). Read what comes back — the server answers a program the way it
  answers a human: with text, not with a crash. Error messages are replies too.

The takeaway named plainly: connection refused, authentication failure, and
wrong-protocol weirdness are three different layers failing, and the learner
can now tell them apart — a diagnostic skill that transfers to every networked
thing they will ever debug.

### What just happened — the explanation

What the library performed is a **protocol with authentication**: open a
connection, present a credential, get accepted or rejected, then
request/response in a fixed format. Password-gated request/response is the
skeleton under an enormous amount of the networked world; RCON is a small,
readable specimen of it.

The bigger reframe: the console was never special. Draw the map explicitly —
four doors into the same command parser: the console window
(`lessons/console-commands/`), an opped player's chat, RCON, and datapack
functions (`lessons/datapack-functions/`). Same strings, same parser, four
entrances with different guards on them. "The console" turns out to be one
chair at a table with several.

And underneath the library: a **socket** — the operating system's primitive for
one program holding a live conversation with another over a network. The
library managed it; in `lessons/server-list-ping/` the learner builds one by
hand, byte by byte. Named lightly, pointed forward, left alone.

The secret, retold one layer deeper: the password was the first credential the
learner has *managed* — chosen, stored in a config file, weighed against
version control. That weighing (convenience vs exposure, and writing the
decision down) is the entire discipline of secret management in miniature; it
never gets more complicated, only bigger.

### Go further — open questions

- If you did the manual hot-backup procedure
  (`lessons/backups-without-stopping/`): the gap it left open is now closed.
  Script the whole dance — `save-off`, `save-all flush`, copy, `save-on` —
  end to end, no human. That's a production-grade tool for your server.
- The scheduling loop dies with the terminal. The grown-up answer is the
  operating system's own scheduler — `launchd` on macOS, `cron` nearly
  everywhere else. Find out how to make the announcer run without a terminal
  open at all.
- If you built a mineflayer bot: race the two approaches. Which can greet a
  joining player faster — the bot in the world, or the log-watching RCON
  greeter? Why?
- The greeter treats every join the same. Could it know a *first-time* joiner
  from a regular and greet them differently? (Everything needed is already in
  the logs.)
- Genuinely open: a server that speaks unprompted is delightful right up until
  it's noise. What should an automated server say, how often, and triggered by
  what? Nobody has a general answer; every server that automates chat ends up
  tuning this by feel.

## Delivery notes

- **guided:** open with both cashed loops by name — the mute leaderboard and
  (conditionally phrased) the hot-backup gap. The "conditional" phrasing
  matters: bot lessons and backup lessons may not have been done; material
  reads cold, so every such reference is "if you've done X" with the link.
- Never assert: exact `server.properties` key names (wiki confirms), the
  current best library (PyPI search + evaluation), library API (README),
  exception names/failure text (measured in break-it), PEP 668 behavior
  (encountered, read, responded to).
- Security paragraph tone: calm, factual, no scare dressing — rules and
  reasons, then move on. The git dilemma must end with the learner deciding;
  deliveries present the tradeoff and explicitly do not pick.
- Ctrl-C for leaving the infinite loop must be stated before the learner runs
  one (first deliberate infinite loop; do not let it feel like a hang).
- The lesson ends with the greeter firing while the learner's hands are
  visibly off the keyboard — stage that as the closing beat.
