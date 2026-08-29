# Reading logs and sending commands with Python

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** python-logs-and-rcon
- **Module / Part:** minecraft-server — Part 5 — Data
- **Scaffolding:** mixed by section, and Python arrives here so the front half
  cannot be thin. **Log-reading half: level 1** — first Python ever (first
  lesson of the Python-for-data skill): reasoning shown throughout, all hint
  rungs including worked answers, completion problems for the syntax-heavy
  moments. **RCON half: level 2** — second exercise of the same skill in the
  same sitting: goals plus hints, concepts named but not applied, no completion
  skeletons except where a single API call's shape can't be derived (pointed at
  the library's README instead).
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

Read the diary, then get a remote control.

First movement: the learner discovers that `logs/latest.log` — plus the
compressed history next to it — is a complete diary of everything the server has
ever done, and writes their first Python program to mine it: count joins, build
a per-player join leaderboard, attempt a death count and collide with the
real-world messiness of string matching. The leaderboard gets announced to
everyone on the server — pasted into `/say` at the console, by hand. That
by-hand is the hinge of the lesson: the script computed a leaderboard it has no
way to announce, because a program can't type into the console.

Second movement closes that gap in the same sitting: enable RCON — the server's
remote-control door — and write Python that sends console commands to the
*running* server: first `/list`, then the leaderboard announcing itself, then a
schedule, then a greeter that watches the log and welcomes each player as they
join. Payoff: the server talks on a schedule and reacts to events with no human
at the keyboard — visibly alive to everyone playing.

The lesson also closes a loop left open elsewhere: the hot-backup dance from
`lessons/worlds-and-backups/` (`save-off`, `save-all flush`, copy, `save-on`)
needed console commands typed at the right moments, and a script couldn't type
them. Now it can (cashed conditionally; scripted end to end in Go further).
And it carries the module's first real **secret**: the RCON password, and the
decision about what to do with a settings file that now contains one.

Secondary goal, stated honestly to the learner: Python is a second programming
language, and meeting one is where you find out which of your skills were
JavaScript and which were programming.

## Prerequisites

- A server that has been played on — established by
  `lessons/running-your-own-server/`. The data gets much more interesting if
  several people have joined over time — `lessons/letting-friends-join/` — but
  one player's history still works.
- A machine set up for coding: terminal, VS Code — established by
  `modules/dev-machine/lessons/dev-machine-setup/`.
- Comfort editing `server.properties` and the restart-to-apply rule, plus `/say`
  at the console — established by `lessons/server-settings-and-console/`.

## Establishes

- Python verified working on the machine (`python3 --version` succeeds)
- A Python script (`log.py`, in the server folder) that opens a file, loops over
  lines, counts matches, tallies per-name counts in a dict, sorts, and prints a
  leaderboard
- RCON enabled on the server (localhost use only), password set
- A virtual environment and an installed RCON library in the learner's project
- Scripts that send commands to the running server: an announcer (leaderboard
  via `/say`), a scheduler (loop + sleep), a log-watching greeter
- A conscious, learner-made decision about the password-in-a-tracked-file
  problem (if they version-control the server)
- Cited by other cores as: "a Python script that reads server data, and a
  script that can send console commands to the running server via RCON —
  established by `lessons/python-logs-and-rcon/`."

## Facts

The log:

- `logs/latest.log` sits in the server folder; the server appends to it
  continuously while running — everything printed to the terminal also lands
  here, plus lines that never reach the screen. Plain text.
- Older logs: at startup/rotation the server compresses the previous log into
  dated files in `logs/`, named like `2026-07-30-1.log.gz` [verify vanilla
  rotation naming — deliveries have the learner look at their own `logs/`
  folder rather than asserting the pattern].
- `.gz` = a gzip-compressed file: same bytes, packed smaller. Double-clicking
  one in Finder expands it to a plain `.log` [macos]. Python's standard library
  can also read them directly (`gzip` module) — go-further territory.
- Log line shape (roughly `[HH:MM:SS] [Server thread/INFO]: message`) and the
  exact wording of join lines ("joined the game") — **never asserted in learner
  text.** The learner opens their own file and reads; formats drift across
  versions and the looking is the pedagogy. Author note: joins also produce a
  separate "logged in with entity id" line; whichever the learner picks is fine.
- Death messages come in dozens of distinct shapes ("fell from a high place",
  "was slain by …", "drowned", "blew up", …). The complete list lives on the
  minecraft.wiki "Death messages" page [volatile in details, stable as a
  reference — point by name].
- Chat lines also land in the log, which means a player *typing* "joined the
  game" in chat can fool a substring counter. True, discoverable, worth an
  authorial note — string matching trusts the text (surfaced only via the
  honest-crudeness paragraph; the fake-a-join go-further from the source was
  cut in the merge).

Python:

- **Python availability:** `python3` is present on macOS once the Xcode Command
  Line Tools are installed, which happened when git was set up in
  dev-machine-setup [verify — CLT does ship a `python3` shim; an un-provisioned
  machine may instead pop a dialog offering to install developer tools].
  [macos] Check first: `python3 --version`. Fallback if genuinely missing: the
  installer from [python.org/downloads](https://www.python.org/downloads/) —
  deliveries point at the page and its current instructions, never at a version
  number.
- `python3` with nothing after it opens a REPL, prompt `>>>` — the deliberate
  parallel to the `node` REPL moment in dev-machine-setup. Leave it with
  `exit()` or Ctrl-D [verify: recent Python versions also accept bare `exit` —
  harmless either way].
- Running a file: `python3 log.py`, run from the folder the script's relative
  paths assume — for this lesson, the server folder, so
  `open("logs/latest.log")` resolves.
- Python syntax needed in the first movement (all of it introduced in the
  lesson, most via completion problems): variables; strings; the `in` operator
  for substring tests; `open(path)` and `with … as f:`; `for line in f:`;
  `if …:`; **indentation is structure** (the blocks are the indenting — no
  braces); `count = count + 1`; dict literals `{}`, `counts[name]`,
  `name in counts`; `line.split()` (chop into words) and indexing, including
  negative indexing (`words[-1]` is the last word);
  `sorted(counts, key=counts.get, reverse=True)`; `print(...)`.
- Wrong working directory ⇒ `FileNotFoundError` naming the *relative* path.
  The path in the script is resolved against the terminal's working directory,
  not against where the script file lives. Relative vs absolute path named
  plainly here — the dev-machine-setup working-directory concept cashing in on
  a real program.
- Regex: the professional tool for matching text by *pattern* rather than exact
  substring. Python's is the `re` module —
  [docs.python.org/3/library/re.html](https://docs.python.org/3/library/re.html).
  Named and pointed at; not required today.
- `/say <message>` at the server console broadcasts to everyone in-game —
  established by `lessons/server-settings-and-console/`.

RCON:

- **RCON** = remote console: a standard way for *other programs* to send
  console commands to a running server over the network, gated by a password.
  Minecraft's implementation is off by default.
- Enabling it, in `server.properties`: `enable-rcon=true`, `rcon.port` (default
  `25575`), `rcon.password` (empty by default; empty means RCON won't work)
  [verify exact key names and defaults against the minecraft.wiki
  `server.properties` page — deliveries have the learner confirm the keys from
  that page rather than trusting a listing here]. Restart to apply — the
  learner knows why from server-settings-and-console.
- **Security, stated plainly and calmly:**
  - The RCON conversation, password included, travels essentially unprotected —
    no encryption [verify protocol detail; the *practice* below is safe to
    state regardless].
  - Therefore: RCON stays on localhost/LAN. Never port-forward the RCON port.
    Never reuse a password that matters anywhere else — invent a throwaway.
  - Anyone who can speak to the RCON port with the password has full console
    power (op-level).
- **The secret-management dilemma** (only applies if the learner did
  `lessons/git-for-your-server/`): `server.properties` is likely tracked, and
  it now contains a password. Honest options: (a) add `server.properties` to
  `.gitignore` and stop tracking it — the file's other settings lose version
  history; (b) accept the tradeoff consciously — fine *only* while the
  repository never leaves this machine, and a decision that must be revisited
  before any push to a hosting service. There is no third option that costs
  nothing. The learner decides, on purpose, and writes the decision down.
- **pip and PyPI:** `pip` is Python's package installer and ships with Python;
  PyPI ([pypi.org](https://pypi.org)) is the public registry it installs from.
  Direct parallel to npm and the npm registry — the dependency concept from
  `lessons/writing-your-first-bot/` transfers whole, but the delivery explains
  it standalone (bot lessons may not have been done; material reads cold).
- **Virtual environments:** modern macOS Pythons may refuse a bare
  `pip install` with an "externally managed environment" error (PEP 668)
  [verify current behavior as of 2026-07 — depends on install source;
  python.org installers historically permissive, Homebrew/system strict]. The
  fix, and standard professional practice anyway: a **venv** — a project-local
  toolbox, so installed libraries belong to this project rather than to the
  whole machine. Commands [verify against docs.python.org/3/library/venv.html]:

  ```
  python3 -m venv .venv
  source .venv/bin/activate
  ```

  Prompt gains a `(.venv)` prefix while active; `deactivate` leaves; the venv
  must be active (or its python used directly) whenever running scripts that
  import the installed library. Delivery keeps this as light as reality
  allows: try the install, read what Python says, reach for the venv when (or
  before) the friction appears.
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

- The reply to any command arrives as a **string** — same text a human would
  see, now in a variable.
- `/say <message>` over RCON: command strings generally work with or without
  the leading slash [verify — learner just tries both].
- **Failure signatures** (the learner measures all of these; do not assert
  exact library exception names):
  - Wrong password → connection opens, then an authentication failure — the
    door answered and rejected the credential.
  - RCON disabled (`enable-rcon=false`) → connection refused — nothing
    listening at that port at all.
  - Wrong port (e.g. one nobody's using) → also connection refused; aimed at
    the *game* port `25565` instead, the connection opens but the conversation
    is in the wrong protocol — hang, garbage, or an error [verify — framed
    strictly as an experiment].
- Scheduling in-process: `import time`, `time.sleep(seconds)`, `while True:`.
  Stopped with Ctrl-C (worth stating; an infinite loop is the learner's first).
- The grown-up scheduler on macOS is `launchd` (and `cron` exists nearly
  everywhere) [macos] — named, pointed at, go-further only.
- Following a growing log from Python: open, jump to the end, then poll —

  ```python
  f.seek(0, 2)     # move to end of file: (offset 0, from the end)
  ```

  then a loop of `f.readline()` / `time.sleep(1)` when empty. `tail -f` in
  Python, hand-rolled. (`tail -f` itself: cut from Go further in the merge;
  the greeter section teaches the same idea by construction.)
- **Four doors, one parser:** the console
  (`lessons/server-settings-and-console/`), an opped player in-game, RCON, and
  datapack functions (`lessons/building-datapacks/`) all feed the same command
  parser the same strings. The console was never special.
- Underneath RCON (and everything else here) is a **socket** — a program-to-
  program connection the library is managing. Named lightly; built by hand in
  `lessons/world-data-and-protocol/`.
- macOS filename-case fact from the source lesson (APFS case-insensitive but
  case-preserving) — the case-mangle break-it was cut in the merge to keep the
  break-it section at four; the fact is retained here only in case a future
  revision wants it back.

## Arc

### Orientation — given plainly

Three honest introductions, then the arc's promise: read the diary, then get a
remote control.

First, the file: everything the server prints also goes into `logs/latest.log`,
and it has been accumulating since the first run — history nobody chose to
record and nobody has read. The `logs/` folder holds the older days, compressed.

Second, the language. Python is a programming language, like JavaScript. It
gets introduced honestly: different tools fit different jobs, and Python is the
language the world reaches for when the job is reading data, scripting, and
gluing things together — the same way JavaScript owns the talking-to-Minecraft
bot niche through mineflayer. And there's a second reason, the bigger one:
meeting a second language is how you discover which of your skills were the
language and which were programming. The ideas (run a file, loop, count, print)
transfer whole; only the spelling changes. `python3` is to Python what `node`
is to JavaScript, and the REPL moment should explicitly mirror the node REPL
moment from dev-machine-setup. Install check first: `python3 --version`; only
install (python.org, current instructions) if it's genuinely absent.

Third, deferred until the hinge but promised up front: RCON, a remote console —
a door into the server built for *programs*, guarded by a password. What it is,
that Minecraft ships it off by default, which settings turn it on (confirmed
from the wiki), and the security posture — all stated plainly at the point of
use, including the fact that this password is the learner's first managed
secret. pip/PyPI/venv given plainly as tools there (this is Python's dependency
moment; npm parallel drawn for those who've built bots, explained standalone
regardless). Library chosen by the learner via PyPI search plus the evaluation
habits from choosing-a-version; usage learned from the library's own README.

### Predictions to elicit

- Before opening the log: list five kinds of events you think got recorded.
- Who has joined the server the most times? Write a ranking — the script will
  grade your guess.
- When a program sends the wrong password: what comes back — silence, an error
  message, a refused connection? What *should* come back?
- The reply to `/list`, delivered to a program — what kind of thing will it be?
- `server.properties` is about to contain a password. Is there anything in your
  setup that could leak it? (Pointed, if they've done git-for-your-server.)

(Cut in the merge: the guess-the-line-count prediction — the five-kinds and
ranking predictions carry the same warm-up.)

### The work — goals and hint ladders

First movement — reading the diary (level 1: full ladders, worked answers,
completion problems):

1. **Read a chunk of the diary raw.** Open `logs/latest.log` in VS Code and
   actually read — beginning, middle, end. Check the five-kinds prediction
   against reality: find a join, a chat line, something that never appeared on
   screen, something inexplicable. Then look at the `logs/` folder itself:
   dated `.gz` files. Name compression plainly (same information, packed
   smaller; double-click expands [macos]). Have them expand one old day and
   skim it — history they didn't know they had. No hints needed; this step is
   reading.
2. **Meet Python in the REPL.** `python3`, prompt `>>>`. Try arithmetic, a
   string, `print`, and the day's workhorse:
   `"joined" in "Alex joined the game"` → `True`. Draw the node parallel
   explicitly — same idea, second language. Exit. No hint ladder; this is
   orientation by keyboard.
3. **Count every join.** Script `log.py` in the server folder: open
   `logs/latest.log`, loop over lines, count the ones marking a join, print the
   count. The exact phrase to match is confirmed from the learner's own file in
   step 1, never given.
   - Completion problem (this is the syntax-heavy moment — blank the
     load-bearing parts, keep the skeleton):

     ```python
     count = 0
     with open("logs/latest.log") as f:
         for line in f:
             if ____ in line:
                 count = ____
     print(count)
     ```
   - Rung 1: the phrase for the blank is in the file you just read. Go copy it
     from a real join line — the middle part, not the timestamp, not the name.
   - Rung 2: `count = ____` must leave count one bigger than before. Say it in
     English first: "count becomes the old count plus one."
   - Rung 3 (structure explained after filling): `with open(...) as f` opens
     the file and guarantees it gets closed; `for line in f` hands you one line
     at a time; the indentation *is* the structure — Python has no braces; the
     `if` body is the indented line under it.
4. **Per-player counts.** Goal: not one number — a number *per name*. Friction:
   a plain counter can't hold that. Name the dict at the moment of friction: a
   **dict** is a table from name to number.
   - Rung 1: two subproblems hiding here — getting the *name* out of the line,
     and keeping a separate count per name. Do them in that order.
   - Rung 2 (extracting the name): `line.split()` chops a line into a list of
     words. In the REPL, paste one real join line into a variable and
     `print(line.split())` — count where the name sits. Counting from the
     *end* is sturdier if the phrase ends the line: `words[-1]` is the last
     word, `words[-2]` the one before.
   - Rung 3 (the dict): `counts = {}` makes an empty one; `counts[name]` reads
     or writes the entry for that name; `name in counts` asks whether the name
     has an entry yet. First time you see a name there's nothing to add one
     to — handle that case.
   - Rung 4 (worked comparison, after something runs):

     ```python
     counts = {}
     with open("logs/latest.log") as f:
         for line in f:
             if "joined the game" in line:   # your phrase, from your file
                 name = line.split()[-4]     # your position, from your counting
                 if name in counts:
                     counts[name] = counts[name] + 1
                 else:
                     counts[name] = 1
     ```
5. **Sort it into a leaderboard.** Goal: print names best-first, count beside
   each.
   - Rung 1: printing everything is a loop over the dict — `for name in
     counts:` works. The missing piece is only the *order*.
   - Rung 2: Python has a built-in `sorted(...)` that takes a collection and
     returns it in order — and it accepts instructions about *what to sort by*
     and *which direction*.
   - Rung 3: the pieces are `sorted(counts, key=counts.get, reverse=True)` —
     read it aloud: sort the names, judging each by its count, biggest first.
     (This one is given nearly whole; it's the day's most idiomatic line and
     inventing it cold is not the lesson.) Compare against the written-down
     prediction ranking.
6. **Now deaths — and the mess.** Same trick, new phrase… except there is no
   one phrase. Send them to their own log and the minecraft.wiki "Death
   messages" page to see the zoo. The honest crude solution: a list of telltale
   substrings (`clues = ["was slain by", "fell from", "drowned", ...]`, built
   from their own log) and a line counts as a death if it contains any clue.
   State the crudeness plainly: this misses shapes not in the list and can
   miscount, and that's what shipping a first version of anything feels like.
   Name regex as the professional tool for exactly this — matching *patterns*
   instead of exact text — and point at the `re` module docs as the door. Not
   required today.
   - Rung 1: start from a copy of the join counter. What has to become plural?
   - Rung 2: `for clue in clues:` inside the line loop works; so does Python's
     `any(...)`. Either is fine — working beats elegant today.

The hinge (internal transition — the old cliffhanger, now the door to the
second movement): run the final leaderboard, then announce it — start the
server if it's stopped, and paste the top three into the console with `/say`
(`lessons/server-settings-and-console/`). Everyone in-game sees history they
didn't know was being kept. Then, stated deliberately: *you* typed that. The
script computed a leaderboard it has no way to announce — a program can't type
into the console. It should feel like a door, and the rest of this lesson walks
through it. (For anyone who did the hot-backup procedure in
`lessons/worlds-and-backups/`: same wall from the other side — a script that
needed `save-off` typed at the right moment. Conditional phrasing; reads cold.)

Second movement — the remote control (level 2: goals plus hints):

7. **Open the door.** Goal: RCON enabled — keys confirmed against the
   minecraft.wiki `server.properties` page (search the page for "rcon"), a
   throwaway password invented, restart, and the server's startup output
   checked for evidence RCON came up.
   - Rung 1: three settings mention rcon on the wiki page. All three matter;
     one of them being left empty is the same as leaving the door locked.
   - Rung 2: the startup log is where the server announces what it's listening
     on. Find the RCON line before writing any Python — proof the door exists.

   Then the secret, before anything else happens: if the server folder is
   under git (`lessons/git-for-your-server/`), run `git status` / check
   whether `server.properties` is tracked. Present the two honest options
   (ignore the file and lose its history, or accept local-only and never push
   without revisiting). The learner decides and writes the decision in a
   comment or README. Deliveries must not decide for them — the deciding is
   the content.
8. **Get the tools.** Goal: an RCON library installed in a project-local venv.
   Learner searches pypi.org for Minecraft RCON libraries and evaluates
   candidates by the choosing-a-version habits (release recency, README, signs
   of tending). Try the install; if Python refuses with an
   externally-managed-environment message, read it — it names the fix. Venv
   explained at that moment as a project-local toolbox; commands per
   docs.python.org (point, don't assert versions of the ritual).
   - Rung 1: pip is to Python what npm is to Node — installer plus registry.
     The registry's search box is the starting point.
   - Rung 2: evaluation checklist, same as sizing up any community tool: when
     was the last release, does the README show Minecraft usage, does the
     project look answered-to.
   - Rung 3: venv ritual and the activation prefix; the rule that the venv
     must be active when running these scripts.
9. **First contact.** Goal: `rcon_test.py` — connect to `127.0.0.1`, send
   `list`, print the reply. Usage comes from the library's README (read the
   whole thing — it's short; that's read-the-surface).
   - Rung 1: the README's first example is almost the whole script. What has
     to change: address, password, port, command.
   - Rung 2: the reply lands in a variable. Print it, then look at what it
     *is* — the same sentence a human sees at the console, now a string a
     program holds. Programs talking to programs.
10. **The announcer.** Goal: the leaderboard script from the first movement
    announces its own top three in-game via `/say`, no human typing.
    - Rung 1: two working programs exist — one computes standings, one sends
      commands. This step is a merge, not new invention.
    - Rung 2: the top three are the first three names `sorted(...)` yields;
      building the message is string assembly; sending it is one
      `command(...)` per line (or one long line — dealer's choice).
11. **On a schedule.** Goal: the announcer repeats forever — every N minutes —
    until stopped with Ctrl-C.
    - Rung 1: a loop that never ends, with a nap in it. `while True:` and
      `time.sleep(seconds)` are the pieces; `import time` first.
    - Rung 2: re-read the log inside the loop, not once before it — otherwise
      the standings never update. Where the `open` sits relative to the
      `while` decides this.
12. **The greeter.** Goal: a script that watches `latest.log` as it grows and,
    when someone joins, greets them by name in-game within a few seconds. A
    working milestone-trigger: log event in, in-game reaction out.
    - Rung 1: the joins problem is solved (this morning) and the speaking
      problem is solved (just now). New piece: reading a file that's still
      being written — start at the *end* and keep asking for new lines.
    - Rung 2: after opening, jump to the end with `f.seek(0, 2)` (seek to
      offset 0, measured from the end). Then loop: `f.readline()` returns the
      next new line, or an empty string when there's nothing yet — sleep a
      second and ask again.
    - Rung 3: have someone join (or join yourself) and watch the greeting
      land. Name extraction is the first movement's `split` trick, unchanged.

    Worth one paragraph in the delivery: for anyone who built a mineflayer
    bot, compare — the bot greets by *being a player in the world*; this
    greeter has no Minecraft account, no body, no presence, and acts through
    the console instead. Two utterly different ways for code to act on the
    same server.

### Break it on purpose — failures to cause, what each teaches, how to undo

Four, curated in the merge (cut: the filename-case experiment and the
garbage-command probe from the sources — the working-directory failure and the
three connection flavors are the load-bearing ones). The three connection
failures are a deliberate failure-signature session: the learner records what
each *looks like* so the errors become distinguishable evidence. Suggest a
table: cause → error seen.

- **Run it from the wrong room.** `cd ~`, then
  `python3 projects/mc-server/log.py` (their real path). It fails — read the
  whole error: `FileNotFoundError`, and the path it names is
  `logs/latest.log`, which *does* exist… relative to the server folder. Name
  it plainly: a **relative path** is directions from wherever you're standing;
  an **absolute path** is a full street address. The script's path is resolved
  from the terminal's working directory, not from where the script file lives.
  This is the working-directory concept from dev-machine-setup cashing in on a
  real program. Undo: `cd` back; nothing was damaged.
- **Wrong password.** Edit the script's password to something wrong; run. The
  connection is made, then rejected — read the exact error. This is the door
  answering and refusing the credential. Undo.
- **Door removed.** Set `enable-rcon=false`, restart, run the (correct)
  script. Different error — connection refused: nothing is listening there at
  all. Distinguish from the last one: refused-at-the-credential vs
  nothing-there. Undo (re-enable, restart).
- **Wrong door.** Point the script at a port where nothing lives (e.g.
  25599) — refused again, same signature as disabled, and that *sameness* is
  the lesson: from outside, "RCON off" and "wrong port" are indistinguishable,
  which is exactly why the startup log check mattered. Then, as an experiment,
  aim at the *game* port 25565: something is listening, but it speaks a
  different protocol — observe what happens [verify behavior; unspoiled,
  framed as experiment]. Undo.

The takeaway named plainly: connection refused, authentication failure, and
wrong-protocol weirdness are three different layers failing, and the learner
can now tell them apart — a diagnostic skill that transfers to every networked
thing they will ever debug.

### What just happened — the explanation

The diary first. The server has been writing it since the day it first ran.
Nobody asked it to be interesting; data was accumulating whether or not anyone
read it, and the questions got answered *retroactively* — the leaderboard
reaches back to before the learner knew they'd want one. That's the general
shape of log data everywhere: record now, ask later. A program that can read
files can answer questions no one thought to ask at the time — and the program
was ~15 lines. Text is the universal interface: the log is just lines, Python
just reads lines, and the identical skill reads a web server's logs, a
printer's logs, any program's logs. Nothing here was Minecraft-specific except
the phrase they copied out of their own file.

The second-language point, retold: everything structural — open, loop, test,
count, sort, print — the learner already knew from JavaScript-land. What was
new was spelling (indentation for braces, `in` for `.includes`). That split —
ideas versus spelling — is the durable discovery, and it's why the third
language costs less than the second.

Then the remote control. What the library performed is a **protocol with
authentication**: open a connection, present a credential, get accepted or
rejected, then request/response in a fixed format. Password-gated
request/response is the skeleton under an enormous amount of the networked
world; RCON is a small, readable specimen of it.

The bigger reframe: the console was never special. Draw the map explicitly —
four doors into the same command parser: the console window
(`lessons/server-settings-and-console/`), an opped player's chat, RCON, and
datapack functions (`lessons/building-datapacks/`). Same strings, same parser,
four entrances with different guards on them. "The console" turns out to be
one chair at a table with several.

And underneath the library: a **socket** — the operating system's primitive
for one program holding a live conversation with another over a network. The
library managed it; in `lessons/world-data-and-protocol/` the learner builds
one by hand, byte by byte. Named lightly, pointed forward, left alone.

The secret, retold one layer deeper: the password was the first credential the
learner has *managed* — chosen, stored in a config file, weighed against
version control. That weighing (convenience vs exposure, and writing the
decision down) is the entire discipline of secret management in miniature; it
never gets more complicated, only bigger.

### Go further — open questions

- The regex door: the `re` module can match "any death message shape" as
  patterns instead of a clue list. Rewrite the death counter with it — the
  docs page is the map.
- What is the oldest log you have? Expand it and reconstruct the server's
  first day — first join ever, first death ever. The `gzip` module even lets
  Python read `.gz` files without expanding them; a script that walks *all*
  the logs is a genuinely better leaderboard.
- If you did the manual hot-backup procedure (`lessons/worlds-and-backups/`):
  the gap it left open is now closed. Script the whole dance — `save-off`,
  `save-all flush`, copy, `save-on` — end to end, no human. That's a
  production-grade tool for your server.
- The scheduling loop dies with the terminal. The grown-up answer is the
  operating system's own scheduler — `launchd` on macOS, `cron` nearly
  everywhere else. Find out how to make the announcer run without a terminal
  open at all.
- The greeter treats every join the same. Could it know a *first-time* joiner
  from a regular and greet them differently? (Everything needed is already in
  the logs.)
- Genuinely open: could you ever enumerate everything the server might write
  to its log — a complete vocabulary? How would you even begin to check?
- Genuinely open: a server that speaks unprompted is delightful right up until
  it's noise. What should an automated server say, how often, and triggered by
  what? Nobody has a general answer; every server that automates chat ends up
  tuning this by feel.

(Cut in the merge: `tail -f` discovery — the greeter hand-builds the same
idea; the fake-a-join probe; racing the RCON greeter against a mineflayer
bot.)

## Delivery notes

- Merged from the cores of `reading-the-logs` ("The server has been keeping a
  diary") and `rcon-scripting` ("A remote control for the server"), 2026-08.
  The old cliffhanger — the script can't announce its own leaderboard — is now
  the internal hinge between the two movements; the delivery must still make
  it land as a felt frustration before resolving it.
- **guided:** the two never-assert rules from the log half are load-bearing —
  no log line formats and no join-phrase wording in learner text, ever; the
  learner copies the phrase from their own file. Same for the rotation naming
  pattern: point, frame as looking. In the RCON half, never assert: exact
  `server.properties` key names (wiki confirms), the current best library
  (PyPI search + evaluation), library API (README), exception names/failure
  text (measured in break-it), PEP 668 behavior (encountered, read, responded
  to).
- The REPL section must land the node parallel explicitly — "you have done
  this before, once, in another language" — because the transfer *is* the
  content.
- Completion problems are typed by hand like all subject-matter code. The
  python.org install path is copyable setup; keep the install conditional
  (check first, install only if missing).
- Scaffolding shifts at the hinge and the delivery's texture should too: full
  reasoning and worked answers in the first movement, goals-plus-hints in the
  second. No internal vocabulary about the shift.
- Security paragraph tone: calm, factual, no scare dressing — rules and
  reasons, then move on. The git dilemma must end with the learner deciding;
  deliveries present the tradeoff and explicitly do not pick.
- Ctrl-C for leaving the infinite loop must be stated before the learner runs
  one (first deliberate infinite loop; do not let it feel like a hang).
- Conditional references ("if you've done X") for the hot-backup gap, git, and
  mineflayer comparisons — those lessons may not have been done; material
  reads cold.
- The lesson ends with the greeter firing while the learner's hands are
  visibly off the keyboard — stage that as the closing beat.
- The stuck-sentence carries the connection-mysteries clause: "For connection
  mysteries, its layer-finding step is the one that pays fastest."
