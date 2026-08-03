# The server has been keeping a diary

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Since the first time your server ran, it has been writing down everything that
happens — every join, every chat message, every death, every warning — into a file
called `logs/latest.log`, with older days compressed and filed beside it. Nobody
asked it to. Nobody has read it. It's a complete diary of your world, accumulating
quietly in a folder you already own.

This session is about reading that diary with a program. You'll write your first
Python — a second programming language, introduced on purpose and explained below —
and use it to answer questions the diary has been waiting to answer: who has joined
the most, who dies the most, what actually happened on day one. By the end, a
leaderboard computed from real history goes up in front of everyone who plays on
your server.

Install steps in this lesson are fine to copy and paste. The program itself you
type by hand.

---

## Before you start

You need:

- **A server that has been played on.** [Running your own
  server](../running-your-own-server/guided.md) gets you the server; the more it's been
  played, the better the data. If several people have joined over time —
  [Joining over LAN](../joining-over-lan/guided.md) — the results get much more
  interesting, but one player's history still works. Quick check: `ls logs`
  inside your server folder shows `latest.log` and at least a few other files.
- **A machine set up for coding** — terminal and VS Code, from [Setting up a
  coding machine](../dev-machine-setup/guided.md). Quick check: you can `cd` into your
  server folder in the terminal and open that folder in VS Code.

---

## What you'll have at the end

By the end of this session you will have:

- Read your server's diary raw and found things in it that never appeared on
  screen
- Written and run your first Python program
- A script that reads the entire log and prints a leaderboard: who has joined
  your server the most, ranked
- Collided with a genuinely messy real-world problem — counting deaths — and
  shipped an honest first solution anyway
- Announced the leaderboard to everyone in-game

---

## New tools

**Python** is a programming language, like JavaScript. It's appearing now for two
honest reasons. First: different tools fit different jobs. Python is the language
the world reaches for when the job is reading data, scripting, and gluing programs
together — it owns that territory the way JavaScript owns talking to Minecraft
through bots. The work in this part of the course is data work, so we use the data
language. Second, and bigger: meeting a second language is how you find out which
of your skills were JavaScript and which were *programming*. You're about to
discover that almost everything transfers.

Check whether you already have it. In a terminal:

```
python3 --version
```

If that prints a version number, you're done — skip the install. If it instead
says the command wasn't found, or your Mac pops up a dialog offering to install
developer tools, go to [python.org/downloads](https://www.python.org/downloads/)
and follow the current instructions for the macOS installer, then open a **new**
terminal window and run the check again.

`python3` is to Python exactly what `node` is to JavaScript: the program that runs
your programs. Typed alone, it opens a conversation; handed a filename, it runs
the file.

**`logs/latest.log`** is a plain text file in your server folder. Everything the
server prints to its terminal also gets written here — plus things that never
reach the screen. The older files next to it, ending in **`.gz`**, are previous
days: `.gz` means the file is **compressed** — the same information, packed
smaller to save space. Double-clicking one in Finder expands it back into a
readable `.log` file.

---

## Predict

Write your answers down first:

- The server has been recording events since its first run. List five kinds of
  events you expect to find in the log.
- Guess how many lines are in `latest.log` right now. And how many old log files
  are sitting in `logs/`.
- Who has joined your server the most times? Write an actual ranking — first,
  second, third. Your script is going to grade this guess.

---

## The work

### Read a chunk of the diary raw

Open `logs/latest.log` in VS Code and read — not skim, read. The beginning, some
of the middle, the end.

Check your five-kinds prediction against reality. Specifically hunt down:

- Your own most recent join
- A chat message
- A line that never appeared on the server's screen while you were watching
- One line you cannot explain at all

While you're there, study the *shape* of the lines — what comes first, what the
brackets contain, where the actual event text starts. You're going to need one
phrase from this file later, so notice exactly how the server words it when
someone joins.

Then look at the `logs/` folder itself. Those dated `.gz` files are your server's
previous days. Expand one of the oldest ones (double-click in Finder) and skim it:
that's history you didn't know you had, and later in this session it becomes
useful.

### Meet Python

In the terminal, type `python3` — nothing after it — and press return. The prompt
changes to `>>>`.

You have been in this exact situation before: this is a **REPL** — read,
evaluate, print, loop — the same kind of conversation you had with `node` back
when you set up this machine. Same idea, second language. Try things:

```
2 + 2
"diary" + " " + "reader"
print("the server kept receipts")
```

And one more, because it's the workhorse of today:

```
"joined" in "Alex joined the game"
```

That `in` asks a question — is this text inside that text? — and answers `True`
or `False`. Try one that comes back `False` so you've seen both.

Leave with `exit()` or Ctrl-D. Notice the shape of what just happened: prompt,
type, answer — the same as node, down to the muscle memory. The ideas are shared;
only the spelling differs. That's the whole point of a second language, and it
keeps being the point all session.

### Count every join

Now a program in a file. In VS Code, create `log.py` **in your server folder**
(next to `server.jar`), and build a script that opens `logs/latest.log`, looks at
every line, counts the ones that mark a player joining, and prints the count.

Here is the skeleton, with the two load-bearing pieces blanked out. Type it by
hand — the typing is where the reading happens — and fill in the blanks:

```python
count = 0
with open("logs/latest.log") as f:
    for line in f:
        if ____ in line:
            count = ____
print(count)
```

One rule about the shape before you run it: in Python, **the indentation is the
structure**. There are no braces marking blocks like in JavaScript — the lines
indented under `for` are the loop body, the line indented under `if` is what
happens on a match. Get the indents wrong and Python will refuse, by name.

<details>
<summary>Stuck on the first blank?</summary>

The phrase to match is not something to guess — it's in the file you just read.
Go back to a real join line in `latest.log` and copy the exact wording the server
uses. Not the timestamp, not the player name: the part that would be identical
for *every* player's join.

</details>

<details>
<summary>Stuck on the second blank?</summary>

After a match, `count` should be one bigger than it was. Say it in English:
"count becomes the old count plus one." Now write exactly that, with `count` on
both sides of the `=`.

</details>

Run it from the server folder:

```
python3 log.py
```

A number comes out. Before moving on, read the skeleton back with full
understanding: `with open(...) as f:` opens the file (and guarantees it gets
closed when the block ends); `for line in f:` hands you the file one line at a
time; the `if` keeps only the lines you care about. Fifteen seconds of program,
the whole diary read.

### Count per player

One number is a fact. What you want is a *leaderboard* — a separate count for
every player. A single counter variable can't hold that, and the thing that can
is worth meeting properly: a **dict** — a table from name to number. You look
things up in it by name, like a real table: `counts["Alex"]`.

Your goal: after the loop, a dict where every player who ever joined has an entry
holding their join count.

There are two sub-problems, and it pays to solve them in order: first get the
*name* out of a join line, then keep a count per name.

<details>
<summary>Getting the name out of the line</summary>

Every string in Python knows how to chop itself into a list of words:
`line.split()`. Investigate on a real line — open the REPL, paste one actual join
line from your file into a variable, and look at what split produces:

```python
line = "...paste a real join line here..."
print(line.split())
```

Count where the name sits in that list. You can index from the front
(`words[0]` is the first word) or from the end (`words[-1]` is the last,
`words[-2]` one before that). If the join phrase ends the line, counting from
the end is sturdier — the front of the line has timestamps that might vary in
shape, the back is always the same phrase.

</details>

<details>
<summary>Keeping a count per name</summary>

- `counts = {}` makes an empty dict — do it once, before the loop.
- `counts[name] = ...` writes the entry for that name; `counts[name]` reads it.
- `name in counts` asks whether the name has an entry yet.

The catch worth thinking through: the *first* time you meet a name, there's no
entry to add one to. Handle the two cases — seen before, brand new — with an
`if` and an `else`.

</details>

<details>
<summary>Worked version — compare after yours runs</summary>

```python
counts = {}
with open("logs/latest.log") as f:
    for line in f:
        if "joined the game" in line:   # your phrase, copied from your file
            name = line.split()[-4]     # your position, from your own counting
            if name in counts:
                counts[name] = counts[name] + 1
            else:
                counts[name] = 1
print(counts)
```

The phrase and the position in the comments are *examples* — yours came from
your own file, which is the only place they can correctly come from.

</details>

Print the dict and look at it. Real names, real numbers, out of a file nobody
was keeping on purpose.

### Sort it into a leaderboard

A dict prints in whatever order it pleases. A leaderboard is best-first. Your
goal: print one line per player — count and name — biggest count at the top.

<details>
<summary>Stuck? Start here</summary>

You can already loop over the names: `for name in counts:` visits each one, and
inside the loop `counts[name]` is that player's number. The only missing piece
is the *order* the loop visits them in.

</details>

<details>
<summary>The sorting piece</summary>

Python has a built-in `sorted(...)` that takes a collection and hands it back in
order — and it accepts instructions about what to sort *by* and in which
direction. The line, since inventing it cold is nobody's first Python lesson:

```python
for name in sorted(counts, key=counts.get, reverse=True):
    print(counts[name], name)
```

Read it aloud: sort the names, judging each one by its count, biggest first.

</details>

Run it. Then pull out the prediction you wrote at the start and grade yourself.
If several people play on this server, this is the moment the data gets social —
somebody at the top of that list is going to be pleased.

### Now deaths — and the mess

Same trick again: count deaths per player. Go find the phrase to match.

Except — go look. Find a few death lines in your log. Then search minecraft.wiki
for its **death messages** page and see the full zoo: fell from a high place,
was slain by, drowned, blew up, hit the ground too hard, and dozens more. There
is no one phrase. This is a real string-matching problem, and it's not a
Minecraft quirk — real data is like this everywhere.

The honest first solution: a list of telltale substrings, built from *your* log —

```python
clues = ["was slain by", "fell from", "drowned"]
```

— and a line counts as a death if it contains any clue. Extend your script to
build a death leaderboard this way.

<details>
<summary>Stuck? Start here</summary>

Start from a copy of your join counter. What was singular there — one phrase —
is now plural. A loop over `clues` inside your line loop works fine: check each
clue against the line, and if any of them hits, it's a death.

</details>

Be clear-eyed about what you built: it misses any death shape not in your list,
and a weird chat message could fool it. That's not failure — that's what version
one of real software looks like, and knowing exactly *how* your program is wrong
is a skill in itself.

The professional tool for exactly this problem — matching text by *pattern*
instead of by exact wording — is called a **regular expression**, regex for
short. Python's regex toolbox is the `re` module, documented at
[docs.python.org/3/library/re.html](https://docs.python.org/3/library/re.html).
It is not required today. It is where this door leads.

### Announce it

Run the final leaderboard one more time. Start the server if it's stopped, and
in the server console, use `/say` — from [Talking to the server
console](../console-commands/guided.md) — to broadcast the top three to everyone in-game.

Everyone playing just saw standings computed from history they didn't know was
being kept.

One more thing, and it's deliberate. Look at what just happened: the *script*
computed the leaderboard, but *you* typed the announcement. Your program can
read everything the server writes — and has no way to say anything back. A
program can't type into the console window. Sit with how close that is to being
great, because closing exactly that gap is what
[the next lesson](../rcon-scripting/guided.md) is about.

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Run it from the wrong room.** Go home first — `cd ~` — then run the script by
its full path, something like:

```
python3 projects/mc-server/log.py
```

It fails. Read the whole error before touching anything. The last line names the
problem — `FileNotFoundError` — and names a file that *definitely exists*:
`logs/latest.log`. Except that path is a **relative path** — directions from
wherever you're currently standing, not a full address. Your script says "in the
`logs` folder here", and standing in your home folder, there is no `logs` folder
here. The terminal's current place — its working directory, the concept you met
when [setting up this machine](../dev-machine-setup/guided.md) — just changed what your
program means. A path starting from `/`, spelling out the full route, is an
**absolute path** and means the same thing from anywhere. `cd` back to the server
folder and confirm the script works again. Nothing was damaged; the program just
looked in the wrong place.

**Mangle the filename's case.** In `log.py`, change the filename to
`logs/Latest.log` — capital L. Predict first: there's no file named exactly
that, so presumably the same error as before. Run it. Whatever happened, you
just measured a real property of your Mac's disk, not of Python — and here's
the question that makes it matter: most rented servers run Linux, which treats
`Latest.log` and `latest.log` as two different names. Would this exact script,
working on your machine, survive the move? Filename case is one of the quiet
ways "works on my machine" happens to people. Put the lowercase name back.

---

## What just happened

The server has been keeping this diary since the day it first ran. Nobody asked
it to be interesting. The data accumulated whether or not anyone read it — and
that meant your questions got answered *retroactively*: tonight's leaderboard
reaches back to before you knew you'd want one. That's the shape of log data
everywhere in computing: record now, ask later.

And the asking took about fifteen lines. A program that can read files can
answer questions nobody thought to ask at the time — and because the log is
plain text, the same fifteen-line shape reads a web server's logs, a printer's
logs, any program's logs. Text is the universal interface between programs and
the people investigating them. Nothing you wrote today was Minecraft-specific
except one phrase, and you copied that out of your own file.

Last, the second-language point, now that you can check it against experience.
Everything structural today — open a file, loop, test, count, sort, print — you
already knew. What was actually new was spelling: indentation instead of braces,
`in` instead of a method with a longer name. That split — the ideas versus the
spelling — is the durable discovery of this session, and it's why your third
language, whenever it comes, will cost less than your second did.

---

## Go further

- Open the regex door: rewrite the death counter with the `re` module so it
  matches death *patterns* instead of a clue list. The docs page is the map.
- The log grows while the server runs. There is a terminal command whose entire
  job is to watch a file grow and print each new line as it arrives. Find it,
  point it at `latest.log`, and have someone join while you watch.
- Your counter trusts the text. Could a player *fake* a join — type something
  in chat that your script would count? Test it on your own server. What would
  fixing it take?
- What's the oldest log you have? Expand it and reconstruct your server's first
  day — the first join ever, the first death ever. Better: Python's standard
  library has a `gzip` module that reads `.gz` files without expanding them,
  and a script that walks *every* log in the folder is a genuinely superior
  leaderboard.
- Could you ever list everything the server might possibly write to its log — a
  complete vocabulary of the diary? How would you even begin to check? Nobody
  has a full answer to this one.

---

## What this leaves behind

- Python installed and proven working — `python3 --version` answers
- `log.py` in your server folder: opens a file, loops over lines, counts
  matches, tallies per name in a dict, sorts, prints a leaderboard
- The relative-vs-absolute path distinction, learned from a real failure you
  caused on purpose
- A leaderboard announced in-game, computed from your server's real history
- One open gap, on purpose: the script can read the server's diary but cannot
  speak to the server. The next lesson gives it a voice.
