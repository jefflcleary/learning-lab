# Setting up a coding machine — reference

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

Compressed version: commands and decisions only. The teaching version is
[guided.md](guided.md). macOS.

## Install

- **VS Code** — download from <https://code.visualstudio.com>, unzip, drag to
  `/Applications`. Open once to clear Gatekeeper.
- **Node.js** — download the **LTS** `.pkg` from <https://nodejs.org> and run it.
  (Whichever version the site currently labels LTS — don't trust a written-down
  number.)
- **git** — run `git --version` in Terminal; accept the Command Line Tools install
  prompt if offered.

## Verify (in a NEW terminal window)

```
node --version
git --version
```

Both must answer with a version number. VS Code verifies by launching.

## Projects folder

```
cd ~
mkdir projects
```

Home directory on purpose — **not** Desktop or Documents, which are commonly
iCloud-synced. Cloud sync corrupts things that write files continuously (a Minecraft
server, later, is exactly that).

## What this leaves behind

- VS Code, Node.js, git installed and verified from the terminal
- `~/projects` exists; all later lessons put work there
- If a learner will use this machine: the guided version additionally teaches
  terminal basics (`pwd` / `ls` / `cd` / `mkdir`, shell vs REPL). Doing the install
  for them covers the tools, not that.
