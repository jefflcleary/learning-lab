# A history for everything you've built

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** git-for-your-server
- **Part:** Part 3 — Infrastructure
- **Scaffolding:** level 1 — first real use of git (installed in dev-machine-setup,
  never touched since); reasoning shown throughout, all hints, rung 4 permitted
- **Deliveries:** guided only (nothing here needs an adult executor; the whole point
  is the learner's own hands on the commands)
- **Status:** ready

## Goal and payoff

Put the hand-made parts of the server folder — settings, datapacks, the backup
script — under version control: `git init`, a reasoned `.gitignore`, a first commit,
then the working loop (change → status → diff → add → commit → log) run on a real
datapack change, and the safety net proven by deliberately trashing a tracked file
and restoring it. Payoff: `git log` shows the story of everything the learner has
built so far, in their own words — and from now on, any experiment on a tracked file
is free.

The lesson under the lesson: the division of labor. Code and configs go in git;
world data goes in backups. That split — version control for what you write, backups
for what accumulates — is how real operations work everywhere, and it should be said
plainly, not discovered.

## Prerequisites

- A computer set up for coding, with git installed — established by
  `modules/dev-machine/lessons/dev-machine-setup/` (git was installed there and has been waiting since)
- A server folder containing things worth tracking: at least one datapack you made —
  established by `lessons/first-datapack/` — and a backup script — established by
  `lessons/backups/`

## Establishes

- The server folder is a git repository with a `.gitignore` separating hand-made
  files from server-generated data; history contains at least three commits in the
  learner's own words
- The learner runs `git status`, `git diff`, `git add`, `git commit -m`, `git log`,
  and `git restore` unprompted, and knows `restore` is the one that destroys
- Cited by other cores as: "your server's code and configs are under version
  control — established by `lessons/git-for-your-server/`."

## Facts

- git is a version recorder for files: it stores snapshots of a folder's files, on
  command, forever, with a message attached to each. Installed in dev-machine-setup;
  `git --version` confirms it's there. This is its first real use.
- First-time setup: every commit is stamped with an author. Without one configured,
  the first commit stops and asks. Set once, globally:
  `git config --global user.name "Name"` and
  `git config --global user.email "email"`. The email is embedded in every commit;
  for a repository that never leaves the machine this is private. (If the history is
  ever pushed to GitHub, GitHub offers a no-reply address — go-further territory,
  don't front-load.)
- `git init` turns the current folder into a repository: it creates a hidden `.git/`
  folder and does nothing else — no files are tracked yet, nothing is recorded
  automatically, ever. git only acts when told. `ls -a` shows hidden entries
  (dotfiles — names starting with `.` are hidden by convention; `-a` is "all").
- `git init` prints a hint about default branch naming on some setups — harmless;
  learner reads output, deliveries don't assert wording.
- The `.git/` folder IS the history — every snapshot lives in there, as files.
  Peek (`ls .git`), don't edit. Delete it and the folder is just a folder again,
  history gone.
- `git status` — the always-safe question: what's tracked, what's changed, what's
  untracked. Never modifies anything.
- `.gitignore` — a settings file (plain text, one pattern per line, `#` comments —
  same family as server.properties) listing what git must never track or mention.
- What to ignore in a server folder, and the reasoning (the learner derives this
  with hints; core records the answer):
  - World data: huge, binary (not human-readable text), and changing constantly
    while the server runs. Exactly the wrong shape for git — and already covered by
    `backup.sh` (../backups/). Code in git, data in backups.
  - `logs/` — the server rewrites these continuously; they're output, not decisions.
  - `libraries/`, `versions/` — folders the modern vanilla server unpacks next to
    itself [verify presence varies by server version — deliveries: drive the list
    from `git status` output, "anything the server generated goes on the list,"
    rather than asserting which folders exist].
  - `backups/` if backups are stored inside the server folder — backups are data.
  - Rule of thumb, stated plainly: **you wrote it → git; the server generated it or
    it's world data → not git.**
- The datapack wrinkle (centerpiece of the .gitignore work): datapacks live in
  `world/datapacks/` (../first-datapack/) — *inside* the ignored world.
  gitignore fact: ignoring a directory itself (`world/`) stops git from ever looking
  inside it, so no later pattern can rescue a subfolder. Ignore the directory's
  *contents* instead, then re-include with a `!` pattern:

  ```
  # world data belongs to backups, not git
  world/*
  !world/datapacks/

  # written by the server, re-creatable
  logs/
  libraries/
  versions/

  # backups are data
  backups/
  ```

  (Trailing patterns only as they exist in the learner's folder.) `!` means "except
  this." Multiple world folders (../worlds-and-copies/) generalize with wildcards
  (`world*/*`, `!world*/datapacks/`) — noted as a pointer, `man gitignore` /
  gitignore docs for pattern rules.
- The working loop, all stable core git:
  - `git add <path>` — stage: mark files/changes to go into the next snapshot.
  - `git commit -m "message"` — record the snapshot with the message.
  - `git diff` — the exact characters changed since the last snapshot, `-` lines
    gone, `+` lines added. (Type-don't-paste's payoff made visible: the diff is
    legible because every character was chosen.)
  - `git log` — the list of snapshots: id, author, date, message. Newest first;
    `q` quits the pager.
- `git restore <path>` — throw away uncommitted changes to a file, returning it to
  the last committed state. **The one command in this lesson that destroys**: the
  discarded edits are not recoverable. (Stable since git 2.23, 2019 — no [verify]
  needed.)
- `git commit -m ""` refuses with a message about the empty commit message —
  deliveries have the learner read git's actual wording, not quote it.
- Committing is safe while the server runs, *because* world data is ignored — git
  never touches the files the server is writing. (Contrast with the copy-during-
  write hazard from backups.)
- This course repository is itself a git repository read on GitHub; its commit
  history is public and readable the same way.
- GitHub: pushing history to the web is the natural next step; account creation and
  authentication flows are volatile [volatile as of 2026-07] — point at GitHub's own
  current docs, never walk the steps.

## Arc

### Orientation — given plainly

What git is (a version recorder for files, snapshot on command, message attached,
nothing automatic), that it's been sitting installed since machine setup and this is
the first time it earns its keep. The division of labor said outright: git for what
you write (configs, datapacks, scripts), backups for what accumulates (the world) —
git is the wrong tool for huge, binary, always-changing data, and that's not a
limitation to work around but a boundary every real operation draws in the same
place. The identity setup given as plain setup. `.gitignore` introduced as another
settings file in a familiar shape. All six commands named up front as the complete
toolkit for this session: status, diff, add, commit, log, restore.

### Predictions to elicit

- git stores every version of every tracked file, forever. Where, physically, do
  you think old versions live? (The folder is all there is.)
- Suppose git *did* track the world while the server runs. Files change every few
  seconds. What would a complete history of that even look like — and how big?
- After `git init`, will git immediately start recording changes, or wait to be
  told? Which would *you* design, and why?

### The work — goals and hint ladders

1. **Introduce yourself, then init.** Set name and email (plain setup, copyable).
   Then, in the server folder, `git init` — type this one — and read everything it
   prints. Check the folder afterwards: `ls`, then `ls -a`. Something appeared that
   plain `ls` doesn't show; that hidden `.git` folder is where every snapshot will
   live. Look at it from outside; don't go rearranging anything in it.
2. **Ask the always-safe question.** `git status`, and read the whole output —
   every section, out loud is allowed. Everything is "untracked": git has recorded
   nothing and will record nothing until told. Check the prediction about whether
   git acts on its own.
3. **Draw the line between code and data.** Goal: a `.gitignore` such that
   `git status` lists only things the learner made. Work from the status output:
   for every entry, one question — *did I write this, or did the server?*
   - Rung 1: three categories are hiding in the status list: files you typed,
     files the server generated (logs, unpacked folders), and the world itself.
     Only one category is yours.
   - Rung 2: `.gitignore` is a plain-text settings file, one pattern per line, `#`
     for comments — same family as server.properties. A folder name with a `/`
     after it ignores the whole folder. Write the obvious lines and re-run
     `git status` after each save — the list shrinking is the feedback loop.
   - Rung 3 (the wrinkle): your datapacks live *inside* `world/`. If `world/` is
     ignored whole, git will never look inside it, and nothing can rescue
     `datapacks` afterwards. The gitignore documentation (`man gitignore`) covers
     two things you need: what `!` does, and why it can't see into an ignored
     directory. The trick is to ignore the world's *contents*, not the world.
   - Rung 4 (worked answer, compare after yours works): the file from Facts, with
     the `world/*` + `!world/datapacks/` pair explained line by line.
4. **The first photograph.** Stage and commit the hand-made files:
   `git add server.properties backup.sh world/datapacks/` (adjust to what exists),
   `git status` to see what's staged, then `git commit -m "..."` with a message
   written for future-you — "what is this snapshot?" Then `git log`: one entry,
   their name, their words.
5. **The loop, on a real change.** Change something small and deliberate in a
   datapack — one value in a function or recipe. Then, in order, reading each:
   `git status` (one file modified), `git diff` (the exact characters — read the
   `-` line and the `+` line; this is the change, nothing else, guaranteed),
   `git add`, `git commit -m`, `git log` (two entries — a history now). Name the
   rhythm: this five-command loop is the whole daily tool.
6. **The safety net.** Goal: prove that damage to a tracked file costs nothing.
   Open a committed datapack file and wreck it — select all, mash the keyboard,
   save. Confirm it's really broken (`git diff` shows the carnage; reloading in
   game fails if you want the full effect). Then bring it back.
   - Rung 1: git holds a photograph of this file from the last commit. You want
     the file returned to the photograph. `git status` output itself mentions the
     command for discarding changes — git has been telling you all along.
   - Rung 2: `git restore <path to the file>`. Open the file: exactly as
     committed. From now on, any experiment on a tracked file is free — this is
     what the whole lesson buys.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Watch restore destroy.** Make a small edit to a tracked file — and this time,
  pretend it's an edit you care about. Don't commit. Run `git restore` on the file.
  Now try to get the edit back. There is no way; it's gone. `restore` answers
  "return to the last photograph" by *throwing away* everything since, and git
  never took a photograph of the uncommitted edit. This is the one command in
  today's toolkit that destroys, met deliberately, on a junk edit. The habit it
  buys: commit *before* experimenting, and `restore` only ever eats experiments.
  Nothing to undo — that's the point; re-make the edit only if it was real.
- **The empty message.** Stage a change, then try `git commit -m ""`. Read git's
  refusal in full. git considers a snapshot without an explanation not worth
  taking — a small, opinionated defense of future-you, who will read `git log`
  looking for *why*. Undo: commit again with words in it.

### What just happened — the explanation

A commit is a photograph of every tracked file at a moment the learner chose,
stapled to a note saying why. The `.git` folder holds all of the photographs —
`ls .git` shows the machinery (objects, HEAD, config); it's just files, which is why
the prediction about where history lives has a mundane answer, and why deleting
`.git` deletes the history. The ignore file drew a line that all real operations
draw: version control for decisions (code, configs), backups for accumulations
(data) — and a side effect of drawing it is that git never touches the files the
server is writing, so committing is safe while the server runs. And this exact tool
is how all software is built: every program on the machine is a pile of commits by
people leaving each other messages, and this module itself reaches the learner as a
git repository — its `git log` is public on GitHub and reads the same way theirs
does. Their own GitHub account, pushing this history to the web, is the natural
next step, deliberately left for go-further because auth flows are volatile.

### Go further — open questions

- Your history is trapped on one machine. GitHub is where git histories go to live
  on the web — a free account plus one push and `git log` becomes a page anyone
  can see. GitHub's own documentation walks through account setup and connecting
  git to it; the steps change often enough that their current docs are the only
  version worth reading. This is the named next step.
- This course is a git repository. Find its page on GitHub and look at the commit
  history — the same `git log` you have, for the lessons themselves. What can you
  learn about how something was made from its history alone?
- Months from now, `git log` will answer "when did I change pvp, and why?" without
  your memory's help. What else could commit messages become on purpose — a
  server diary? A changelog your players can read?
- Genuinely open: git is the wrong tool for the world folder because it's huge,
  binary, and always changing. Could a version-history tool for *worlds* exist —
  commit, diff, restore, but for terrain? What would it have to do differently
  from both git and backup.sh? (People have tried; there is no settled answer.)

## Delivery notes

- **guided:** level 1 throughout — narrate the reasoning, especially in the
  .gitignore derivation and the restore-destroys moment. Rung 4 (the worked
  .gitignore) is justified: first lesson of a genuinely new skill, and the
  negation pattern is syntax-heavy. Keep the six-command toolkit visible early so
  the learner always knows the full size of today's surface.
- The diff-reading moment should explicitly connect to type-don't-paste: the diff
  is the payoff of having chosen every character.
- Do not walk GitHub signup/auth in any delivery — point at GitHub's docs.
- Do not assert which server-generated folders exist (`libraries/`, `versions/`
  vary); drive the ignore list from the learner's own `git status` output.
- Adjust the add/commit file list phrasing to "what exists in your folder" —
  backup.sh location may vary by how backups was done.
