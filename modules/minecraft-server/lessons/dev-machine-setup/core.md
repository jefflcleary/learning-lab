# Setting up a coding machine

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** dev-machine-setup
- **Part:** Part 0 — Setup
- **Scaffolding:** level 1 — first contact with the terminal; reasoning shown throughout
- **Deliveries:** guided (learner doing it themselves, or learning what was done for
  them) + reference (adult executing the setup)
- **Status:** ready

## Goal and payoff

A machine that can write and run code: an editor, a JavaScript runtime, version
control, and enough terminal to move around. Ends with the learner running JavaScript
live in a terminal. Weakest social payoff of any lesson (accepted — it's the floor the
visible payoffs stand on); the guided delivery frames the ending as "this machine can
now run programs you write, and every later lesson cashes that in."

## Prerequisites

- A Mac the learner is allowed to install software on. Nothing else; this is a
  starting-point lesson.

## Establishes

- VS Code, Node.js, and git installed and verified from the terminal
- A `projects` folder in the home directory where all later work lives
- The learner can open a terminal, tell where it is (`pwd`), look around (`ls`), move
  (`cd`), and create folders (`mkdir`)

Other cores may cite: "a computer set up for coding — established by
`lessons/dev-machine-setup/`."

## Facts

- **VS Code** — a text editor built for code. Install [macos]: download from
  https://code.visualstudio.com, unzip, drag `Visual Studio Code.app` into
  `Applications`. Free.
- **Node.js** — a program that runs JavaScript outside a web browser. Install [macos]:
  https://nodejs.org, download the **LTS** installer (.pkg) and run it. Which number
  LTS currently is: [volatile as of 2026-07] — the site labels it; deliveries point,
  never assert a number. "LTS" = Long Term Support, the boring-on-purpose version.
- **git** — records versions of your files so any change can be undone and history
  read. Install [macos]: it ships with Apple's Command Line Tools; running
  `git --version` in a terminal triggers the install offer if missing. Accept it.
- **Terminal** [macos]: `Terminal.app`, in `Applications/Utilities`; fastest launch is
  Spotlight (⌘–space, type `terminal`). VS Code also has one built in (View menu →
  Terminal) — same thing in a different window.
- Shell commands used: `pwd` (print working directory), `ls` (list), `cd <folder>`
  (change directory), `mkdir <name>` (make directory), `node --version`,
  `git --version`, `node` (starts the REPL; leave with `.exit` or Ctrl-D).
- The terminal opens in the **home directory** (`/Users/<name>`), shown as `~`.
- Projects folder: `mkdir projects` in the home directory → `~/projects`. [macos]
  Deliberately *not* on Desktop or in Documents: those two folders are often synced to
  iCloud, and cloud sync fights with programs that write files constantly (this
  matters hard in `running-your-own-server`).
- Error shape: `zsh: command not found: <name>` — the shell searched its list of
  program folders and no program has that name. [windows] — everything above differs;
  Windows facts not yet gathered; a windows delivery needs WSL2 decisions first.

## Arc

### Orientation — given plainly

Three programs, each explained before anything is installed: an editor (code is plain
text; a code editor is a text editor that understands it), Node (JavaScript grew up in
browsers; Node lets it run directly on a computer — later lessons write bots as plain
JavaScript files that Node runs), git (a save-history for files; also how this repo
itself is delivered). The terminal explained as: a program for running other programs
by typing their names — older than windows-and-mouse, still everywhere because it's
faster to automate and every tool speaks it.

Setup commands and downloads are explicitly copy-paste-allowed.

### Predictions to elicit

- Before installing anything: type `node --version` in the terminal. What will happen?
- After watching that fail: what do you think will be different after the install?
- When you open a terminal, it has to be "somewhere" on the disk. Where do you guess
  it starts?

### The work — goals and hint ladders

1. **Find out where you are.** Goal: using only the terminal, work out which folder
   it opened in and what's inside that folder, then find the same folder in Finder.
   - Rung 1: two of the commands listed under New tools tell you where you are and
     what's around you. Try them and read what comes back.
   - Rung 2: the terminal always has a "current place" called the working directory —
     every command you run happens *from* there. `pwd` prints it, `ls` lists it.
   - Rung 3: compare `ls` output to your home folder in Finder. Same items? Note what
     `~` means in the prompt.
2. **Install and verify all three tools.** Plain instructions from Facts; no hints
   needed, not a puzzle. Verification is the lesson: each tool answers `--version`,
   and the prediction from earlier gets checked here.
3. **Make a home for projects.** Goal: from the terminal, create a folder called
   `projects` in your home directory, move into it, and prove you're there.
   - Rung 1: two commands you haven't used yet from the list — one makes a folder,
     one moves you.
   - Rung 2: `mkdir projects` then `cd projects`; proof is `pwd` showing the path
     ending in `/projects`. (Rung 2 gives the answer here — this is setup-adjacent,
     not the lesson's core thinking.)
4. **Run JavaScript.** Goal: type `node` with nothing after it, and find out what
   you've landed in. Try arithmetic. Try `"your text".repeat(50)`. Get back out.
   - Rung 1: it's waiting for you to type something. It speaks JavaScript, not shell.
   - Rung 2: this is called a REPL — read, evaluate, print, loop. `.exit` leaves.

### Break it on purpose — failures to cause, undo, and read

- Misspell a command (`nodde --version`) → `command not found`. Teach: the shell
  matched nothing by that name; this exact error therefore also appears when a real
  program isn't installed — which is why it appeared before Node was installed. Undo:
  spell it right.
- `cd` into a folder that doesn't exist → `no such file or directory`. Teach: the
  error names exactly what it looked for; both errors so far told you precisely what
  was missing.
- In the Node REPL, type a shell command like `ls` → JavaScript error
  (`ls is not defined`). Teach: two different programs, two different languages; the
  prompt tells you who's listening. This confusion (shell vs REPL) is otherwise
  guaranteed to happen by accident later.

### What just happened — the explanation

The terminal runs a program called a shell. Loop: read the line, split off the first
word, look for a program with that name, run it with the rest as instructions, print
whatever comes back. `--version` is a convention nearly every tool honors. One layer
deeper: the shell finds programs by searching a specific list of folders — the list is
called the PATH — which is why installing a program can make a word suddenly "work."
Name PATH, don't drill into editing it; friction will come later and it'll be named
again. Also name: working directory, home directory, and that the REPL and the shell
are two different listeners.

### Go further — open questions

- The shell searched "a list of folders" to find `node`. Can you find out what's on
  that list, and where `node` actually landed on your disk?
- Roughly how many commands does your Mac come with? Can you find where they live?
- `node --version` prints something like three numbers separated by dots. Is there a
  system to how those numbers change? (Points toward semver without naming it.)
- Some people spend their whole workday in a terminal by choice. What would have to
  be true about it for that to be the faster way? (Genuinely open.)

## Delivery notes

- **reference:** downloads, the three verify commands, `mkdir ~/projects`, the iCloud
  warning, done. Include "leaves behind" so state matches guided.
- **guided:** the tone risk is condescension in the terminal sections — an audience
  comfortable with computers-as-games knows what a folder is; the *terminal view* of
  folders is what's new. Keep Finder comparisons brief.
- Don't gate later lessons on VS Code skill — it's an editor, they'll learn it by
  using it. No editor tour.
