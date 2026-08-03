# The server has been keeping a diary

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** reading-the-logs
- **Part:** Part 5 — Data
- **Scaffolding:** level 1 — first Python lesson ever (first lesson of the
  Python-for-data skill). Reasoning shown throughout, all hint rungs including
  worked answers, and completion problems for the syntax-heavy moments.
- **Deliveries:** guided only (nothing setup-heavy enough to need a reference)
- **Status:** ready

## Goal and payoff

The learner discovers that `logs/latest.log` — plus the compressed history next to
it — is a complete diary of everything the server has ever done, and writes their
first Python program to mine it: count joins, build a per-player join leaderboard,
attempt a death count and collide with the real-world messiness of string matching.

Payoff: a leaderboard computed from real history, announced to everyone on the
server (pasted into `/say` at the console). The lesson ends on a deliberate open
gap: the script computed the leaderboard but a human had to type the announcement —
the script has no way to talk to the server. The next lesson (rcon-scripting)
closes that gap; this core is the setup and must not resolve it.

Secondary goal, stated honestly to the learner: this is a second programming
language, and meeting one is where you find out which of your skills were
JavaScript and which were programming.

## Prerequisites

- A server that has been played on — established by
  `lessons/running-your-own-server/`. The data gets much more interesting if
  several people have joined over time — `lessons/joining-over-lan/` — but one
  player's history still works.
- A machine set up for coding: terminal, VS Code — established by
  `modules/dev-machine/lessons/dev-machine-setup/`.

## Establishes

- Python verified working on the machine (`python3 --version` succeeds)
- A Python script (`log.py`, in the server folder) that opens a file, loops over
  lines, counts matches, tallies per-name counts in a dict, sorts, and prints a
  leaderboard
- Cited by other cores as: "a Python script that reads server data — established
  by `lessons/reading-the-logs/`."
- An open loop other cores may cash: the script cannot announce its own results;
  a human typed the `/say`. `lessons/rcon-scripting/` closes this.

## Facts

- `logs/latest.log` sits in the server folder; the server appends to it
  continuously while running — everything printed to the terminal also lands
  here, plus lines that never reach the screen. Plain text.
- Older logs: at startup/rotation the server compresses the previous log into
  dated files in `logs/`, named like `2026-07-30-1.log.gz` [verify vanilla
  rotation naming — deliveries have the learner look at their own `logs/` folder
  rather than asserting the pattern].
- `.gz` = a gzip-compressed file: same bytes, packed smaller. Double-clicking one
  in Finder expands it to a plain `.log` [macos]. Python's standard library can
  also read them directly (`gzip` module) — go-further territory.
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
  game" in chat can fool a substring counter. True, discoverable, and worth
  surfacing (go-further) — string matching trusts the text.
- **Python availability:** `python3` is present on macOS once the Xcode Command
  Line Tools are installed, which happened when git was set up in
  dev-machine-setup [verify — CLT does ship a `python3` shim; an un-provisioned
  machine may instead pop a dialog offering to install developer tools]. [macos]
  Check first: `python3 --version`. Fallback if genuinely missing: the installer
  from [python.org/downloads](https://www.python.org/downloads/) — deliveries
  point at the page and its current instructions, never at a version number.
- `python3` with nothing after it opens a REPL, prompt `>>>` — the deliberate
  parallel to the `node` REPL moment in dev-machine-setup. Leave it with
  `exit()` or Ctrl-D [verify: recent Python versions also accept bare `exit` —
  harmless either way].
- Running a file: `python3 log.py`, run from the folder the script's relative
  paths assume — for this lesson, the server folder, so `open("logs/latest.log")`
  resolves.
- Python syntax needed today (all of it introduced in the lesson, most of it via
  completion problems): variables; strings; the `in` operator for substring
  tests; `open(path)` and `with … as f:`; `for line in f:`; `if …:`;
  **indentation is structure** (the blocks are the indenting — no braces);
  `count = count + 1`; dict literals `{}`, `counts[name]`, `name in counts`;
  `line.split()` (chop into words) and indexing, including negative indexing
  (`words[-1]` is the last word); `sorted(counts, key=counts.get, reverse=True)`;
  `print(...)`.
- Wrong working directory ⇒ `FileNotFoundError` naming the *relative* path. The
  path in the script is resolved against the terminal's working directory, not
  against where the script file lives. Relative vs absolute path named plainly
  here — this is the dev-machine-setup working-directory concept cashing in on a
  real program.
- macOS's default filesystem treats filenames case-insensitively but preserves
  case (so `open("logs/Latest.log")` likely *works* on the learner's Mac and
  would fail on a Linux server) [verify — APFS default is case-insensitive;
  deliveries frame this strictly as an experiment with an unspoiled outcome].
- Regex: the professional tool for matching text by *pattern* rather than exact
  substring. Python's is the `re` module —
  [docs.python.org/3/library/re.html](https://docs.python.org/3/library/re.html).
  Named and pointed at; not required today.
- `tail -f logs/latest.log` follows a file as it grows — go-further, learner
  discovers/looks it up.
- `/say <message>` at the server console broadcasts to everyone in-game —
  established by `lessons/console-commands/`.

## Arc

### Orientation — given plainly

Two honest introductions. First, the file: everything the server prints also goes
into `logs/latest.log`, and it has been accumulating since the first run —
history nobody chose to record and nobody has read. The `logs/` folder holds the
older days, compressed.

Second, the language. Python is a programming language, like JavaScript. It gets
introduced here honestly: different tools fit different jobs, and Python is the
language the world reaches for when the job is reading data, scripting, and
gluing things together — the same way JavaScript owns the talking-to-Minecraft
bot niche through mineflayer. And there's a second reason, the bigger one:
meeting a second language is how you discover which of your skills were the
language and which were programming. The ideas (run a file, loop, count, print)
transfer whole; only the spelling changes. `python3` is to Python what `node` is
to JavaScript, and the REPL moment should explicitly mirror the node REPL moment
from dev-machine-setup.

Install check comes first: `python3 --version`; only install (python.org, current
instructions) if it's genuinely absent.

### Predictions to elicit

- Before opening the log: list five kinds of events you think got recorded.
- Guess the number of lines in `latest.log`. And how many old log files exist.
- Who has joined the server the most times? Write a ranking — the script will
  grade your guess at the end.

### The work — goals and hint ladders

1. **Read a chunk of the diary raw.** Open `logs/latest.log` in VS Code and
   actually read — beginning, middle, end. Check the five-kinds prediction
   against reality: find a join, a chat line, something that never appeared on
   screen, something inexplicable. Then look at the `logs/` folder itself: dated
   `.gz` files. Name compression plainly (same information, packed smaller;
   double-click expands [macos]). Have them expand one old day and skim it —
   history they didn't know they had. No hints needed; this step is reading.
2. **Meet Python in the REPL.** `python3`, prompt `>>>`. Try arithmetic, a
   string, `print`, and the day's workhorse: `"joined" in "Alex joined the game"`
   → `True`. Draw the node parallel explicitly — same idea, second language.
   Exit. No hint ladder; this is orientation by keyboard.
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
   - Rung 3 (structure explained after filling): `with open(...) as f` opens the
     file and guarantees it gets closed; `for line in f` hands you one line at a
     time; the indentation *is* the structure — Python has no braces; the `if`
     body is the indented line under it.
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
     has an entry yet. First time you see a name there's nothing to add one to —
     handle that case.
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
   - Rung 1: printing everything is a loop over the dict — `for name in counts:`
     works. The missing piece is only the *order*.
   - Rung 2: Python has a built-in `sorted(...)` that takes a collection and
     returns it in order — and it accepts instructions about *what to sort by*
     and *which direction*.
   - Rung 3: the pieces are `sorted(counts, key=counts.get, reverse=True)` —
     read it aloud: sort the names, judging each by its count, biggest first.
     (This one is given nearly whole; it's the day's most idiomatic line and
     inventing it cold is not the lesson.) Compare against the written-down
     prediction ranking.
6. **Now deaths — and the mess.** Same trick, new phrase… except there is no one
   phrase. Send them to their own log and the minecraft.wiki "Death messages"
   page to see the zoo. The honest crude solution: a list of telltale substrings
   (`clues = ["was slain by", "fell from", "drowned", ...]`, built from their own
   log) and a line counts as a death if it contains any clue. State the
   crudeness plainly: this misses shapes not in the list and can miscount, and
   that's what shipping a first version of anything feels like. Name regex as
   the professional tool for exactly this — matching *patterns* instead of exact
   text — and point at the `re` module docs as the door. Not required today.
   - Rung 1: start from a copy of the join counter. What has to become plural?
   - Rung 2: `for clue in clues:` inside the line loop works; so does Python's
     `any(...)`. Either is fine — working beats elegant today.

Finish: run the final leaderboard, then announce it — start the server if it's
stopped, and paste the top three into the console with `/say`
(../console-commands/). Everyone in-game sees history they didn't know was being
kept. Then the gap, stated deliberately: *you* typed that. The script computed a
leaderboard it has no way to announce — a program can't type into the console.
Leave it open; it's the next lesson's front door.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Run it from the wrong room.** `cd ~`, then `python3 projects/mc-server/log.py`
  (their real path). It fails — read the whole error: `FileNotFoundError`, and
  the path it names is `logs/latest.log`, which *does* exist… relative to the
  server folder. Name it plainly: a **relative path** is directions from
  wherever you're standing; an **absolute path** is a full street address. The
  script's path is resolved from the terminal's working directory, not from
  where the script file lives. This is the working-directory concept from
  dev-machine-setup cashing in on a real program. Undo: `cd` back; nothing was
  damaged.
- **Mangle the filename's case.** Change the script to open `logs/Latest.log`
  and predict: capital L, no such file — surely the same error? Run it. Frame
  strictly as an experiment; do not spoil the outcome in learner text [verify —
  macOS default filesystem is case-insensitive, so this likely *works*, which is
  the surprise]. The follow-up question carries the lesson: if this exact script
  moved to a Linux machine (most rented servers), would it still run? Filename
  case is one of the quiet ways "works on my machine" happens. Undo the edit.

### What just happened — the explanation

The server has been writing this diary since the day it first ran. Nobody asked
it to be interesting; data was accumulating whether or not anyone read it, and
the questions got answered *retroactively* — the leaderboard reaches back to
before the learner knew they'd want one. That's the general shape of log data
everywhere: record now, ask later.

A program that can read files can answer questions no one thought to ask at the
time — and the program was ~15 lines. Text is the universal interface: the log
is just lines, Python just reads lines, and the identical skill reads a web
server's logs, a printer's logs, any program's logs. Nothing today was
Minecraft-specific except the phrase they copied out of their own file.

And the second-language point, retold: everything structural — open, loop, test,
count, sort, print — the learner already knew from JavaScript-land. What was new
was spelling (indentation for braces, `in` for `.includes`). That split — ideas
versus spelling — is the durable discovery, and it's why the third language costs
less than the second.

### Go further — open questions

- The regex door: the `re` module can match "any death message shape" as
  patterns instead of a clue list. Rewrite the death counter with it — the docs
  page is the map.
- The log grows while the server runs. There's a terminal command whose whole
  job is to watch a file grow and print new lines as they arrive — find it, aim
  it at `latest.log`, and have someone join. (It's `tail -f`; the learner
  discovers it.)
- Your counter trusts the text. Could a player *fake* a join — type something in
  chat that your script would count? Test it. What would fixing that take?
- What is the oldest log you have? Expand it and reconstruct the server's first
  day — first join ever, first death ever. The `gzip` module even lets Python
  read `.gz` files without expanding them; a script that walks *all* the logs is
  a genuinely better leaderboard.
- Genuinely open: could you ever enumerate everything the server might write to
  its log — a complete vocabulary? How would you even begin to check?

## Delivery notes

- **guided:** the two never-assert rules are the load-bearing ones — no log line
  formats and no join-phrase wording in learner text, ever; the learner copies
  the phrase from their own file. Same for the case-sensitivity outcome and the
  rotation naming pattern: point, frame as looking/experiment.
- The REPL section must land the node parallel explicitly — "you have done this
  before, once, in another language" — because the transfer *is* the content.
- Completion problems are typed by hand like all subject-matter code. The
  python.org install path is copyable setup; keep the install conditional
  (check first, install only if missing).
- Do not resolve the announcement gap. The last note of the lesson is the
  script's silence, and it should feel like a door, not a failure.
