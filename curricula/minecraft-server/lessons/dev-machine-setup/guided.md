# Setting up a coding machine

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Before you can write programs, the computer needs three things it probably doesn't have
yet: a proper editor to write code in, a program that can *run* the code you write, and
a tool that keeps the history of your files so you can never truly wreck anything.
This session installs all three on a Mac and teaches you just enough of the terminal —
the typed command window — to move around your own computer without a mouse.

Nothing here is busywork. Every later session leans on what this one sets up, and by
the end of this one you'll have run real JavaScript on your own machine.

One note on copying: normally in these lessons you'll type things by hand. Install
steps are the exception — copying and pasting setup commands is fine, because there's
nothing to learn inside them.

---

## Before you start

You need:

- **A Mac you're allowed to install software on.** If an administrator password gets
  asked for during an install, you need to know it or have someone nearby who does.

That's all. This is a starting-point lesson; it assumes nothing else.

---

## What you'll have at the end

By the end of this session you will have:

- Three tools installed and proven working: VS Code, Node.js, and git
- A `projects` folder where everything you build will live
- The ability to open a terminal, tell where you are, look around, move, and create
  folders
- Run actual JavaScript, live, and watched it answer you

---

## New tools

**The terminal** is a program for running other programs by typing their names instead
of clicking icons. It's older than windows and mice, and it has survived because it's
often the fastest way to tell a computer exactly what to do — and because nearly every
programming tool speaks it. On a Mac it's called **Terminal**: press ⌘–space, type
`terminal`, press return. You'll be using it in every session from now on.

A few commands you'll meet today, so none of them are a surprise:

| Command | What it does |
|---|---|
| `pwd` | prints which folder the terminal is currently "in" |
| `ls` | lists what's in that folder |
| `cd somefolder` | moves the terminal into `somefolder` |
| `mkdir somefolder` | creates a folder called `somefolder` |

**VS Code** is a text editor built for code. Code is plain text — no fonts, no
formatting, just characters in files — and a code editor is a text editor that
understands what the text means: it colors the parts of a program differently, spots
some mistakes as you type, and holds a whole folder of files at once. Install: go to
[code.visualstudio.com](https://code.visualstudio.com), download the Mac version,
unzip it, and drag `Visual Studio Code` into your `Applications` folder. It's free.

**Node.js** is a program that runs JavaScript. JavaScript grew up inside web browsers,
but Node lets it run directly on your computer, like any other program — which is what
makes it possible to write a file of JavaScript and have it *do* things: talk over the
network, read files, and eventually control a character on a Minecraft server. Install:
go to [nodejs.org](https://nodejs.org) and download the installer marked **LTS**, then
run it. LTS stands for Long Term Support — it's the version chosen to be boring and
dependable, which is exactly what you want.

**git** records the history of your files: every version of everything, forever, so
any change can be undone and any old state recovered. It's also the tool this course
itself is delivered with. You don't install git directly on a Mac — it comes with a
package from Apple called the Command Line Tools, and the easiest way to get it is to
ask for git and let the Mac offer to install it. That's part of the work below.

---

## Predict

Write down your answers before touching anything:

- Node isn't installed yet. If you open the terminal right now and type
  `node --version`, what do you think happens?
- After the install, what exactly will be different about your computer that makes the
  same command behave differently?
- When a terminal window opens, it has to be "somewhere" on your disk. Where do you
  guess it starts?

---

## The work

### Find out where you are

Open Terminal. Before installing anything, get your bearings.

Your goal: using only typed commands, work out which folder this terminal window is
sitting in and what's inside that folder — then find the same folder in Finder and
confirm they match.

<details>
<summary>Stuck? Start here</summary>

Two of the commands in the table under New tools answer exactly these questions: one
tells you where you are, one tells you what's here. Run them and read what comes back
— all of it.

</details>

<details>
<summary>What's going on underneath</summary>

The terminal always has a current place, called the **working directory** — every
command you run happens *from* there. `pwd` prints it; `ls` lists what's in it. A
fresh terminal starts in your **home directory**, the folder that holds your
Desktop, Documents, Downloads, and so on. The `~` you may see in the prompt is
shorthand for exactly that folder.

</details>

<details>
<summary>Checking your answer</summary>

`pwd` should print something like `/Users/yourname`. Open a Finder window, click your
home folder (the one with the house icon and your username), and compare what you see
to the output of `ls`. Same contents, two views.

</details>

### Install and verify all three tools

Now check your first prediction: type `node --version` and read what comes back. That
message — `command not found` — is worth a moment. The terminal looked for a program
named `node` and found nothing. Remember what it looks like; you'll cause it on
purpose later.

Then install, in any order:

1. **VS Code** — [code.visualstudio.com](https://code.visualstudio.com), download,
   unzip, drag into `Applications`. Open it once so the Mac stops being suspicious of
   it.
2. **Node.js** — [nodejs.org](https://nodejs.org), the **LTS** installer, run it,
   next-next-finish.
3. **git** — in the terminal, type `git --version`. Either it answers with a version
   (already installed — done), or a window offers to install the Command Line Tools.
   Accept and let it finish.

Then prove each one. **Open a new terminal window** — tools installed while a window
was open sometimes aren't visible to it — and run:

```
node --version
git --version
```

Each should answer with a version number. VS Code proves itself by opening. If
`node --version` still says `command not found` in a brand-new window, the installer
didn't finish — run it again and watch for a step you missed.

### Make a home for projects

Everything you build in this course will live in one folder, and you're going to
create it from the terminal.

Your goal: in your home directory, create a folder called `projects`, move the
terminal into it, and prove you're standing inside it.

One thing to know first: the reason it's going in your home directory and *not* on the
Desktop or in Documents is that Macs often sync those two folders to iCloud. Cloud
sync and programs that write files constantly do not get along — this will matter a
lot when a Minecraft server is writing your world to disk.

<details>
<summary>Stuck? Start here</summary>

Two commands from the table haven't been used yet: one creates a folder, one moves
you into a folder. Make sure you're in your home directory first — you know how to
check.

</details>

<details>
<summary>The commands</summary>

```
mkdir projects
cd projects
```

Proof: `pwd` now ends in `/projects`.

</details>

### Run JavaScript

Your machine can now run JavaScript. Prove it.

In the terminal, type `node` — nothing after it — and press return. The prompt
changes. Your goal: figure out what you've landed in, get it to do some arithmetic,
get it to do something with text — try `"any text you like ".repeat(50)` — and then
find your way back out to the normal terminal.

<details>
<summary>Stuck? Start here</summary>

It's waiting for you to type something — but it no longer speaks terminal commands.
It speaks JavaScript. Try giving it a math problem.

</details>

<details>
<summary>What this thing is</summary>

You're in a **REPL** — read, evaluate, print, loop. It reads what you type, runs it
as JavaScript, prints the result, and waits for more. It's the fastest way to try
one line of code. Type `.exit` (with the dot) to leave, and notice the prompt
change back — that's how you tell who's currently listening.

</details>

---

## Break it on purpose

Cause each of these, read the message, undo it.

**Misspell a command.** Type `nodde --version`. You get `command not found` — the same
error from before Node was installed. Same message, two causes: the shell has no
program by that name, whether because you typed it wrong or because it was never
installed. Now you'll recognize both.

**Go somewhere that doesn't exist.** Type `cd bananas` in a folder with no `bananas`.
Read the error: it names exactly what it looked for and couldn't find. Every error so
far has told you precisely what was missing — this is a pattern worth trusting.

**Speak the wrong language.** Start `node`, then type `ls` inside it. JavaScript has
no idea what `ls` means, and says so. The terminal and the REPL are two different
programs listening for two different languages, and the prompt tells you which one has
the microphone. You will absolutely do this by accident someday; now it's a known
consequence instead of a mystery. `.exit` to leave.

---

## What just happened

The terminal window runs a program called a **shell**, and its whole job is a loop:
read the line you typed, take the first word, find a program with that name, hand it
the rest of the line, run it, print what comes back. `pwd`, `ls`, `node`, `git` —
every one is just a program being found and run. The `--version` habit works because
it's a convention nearly every tool honors: asked that one question, answer and exit.

One layer deeper: the shell finds programs by searching a specific list of folders on
your disk — the list is called the **PATH**. Installing Node put a program file into
one of those folders, which is the entire reason the same typed word failed yesterday
and works today. Nothing magical changed about the word; the search started finding
something.

And your working directory — the "somewhere" the terminal always is — is going to
matter constantly from here on, because programs act *from* it: files get created
where you are, and commands look for things where you are. `pwd` is the "where am I?"
reflex, and it's free.

---

## Go further

- The shell searched "a list of folders" to find `node`. Can you find out what's
  actually on that list, and where on your disk `node` ended up?
- Roughly how many commands does your Mac come with, without installing anything? Can
  you find the folder where the built-in ones live and count?
- `node --version` prints three numbers separated by dots. Watch them across a few
  tools — is there a system to which number changes when?
- Some professionals spend their entire day in a terminal by choice, doing things a
  mouse could do. What would have to be true about the terminal for that to be the
  faster way? Keep the question around as you learn more of it.

---

## What this leaves behind

- VS Code, Node.js, and git installed and verified from the terminal
- A `projects` folder in your home directory, where later sessions will put things
- You can open a terminal, tell where it is, look around, move, and create folders —
  and you know the difference between the shell listening and the Node REPL listening
