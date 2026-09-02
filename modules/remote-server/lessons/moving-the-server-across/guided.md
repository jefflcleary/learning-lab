# Moving the server across

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Everything so far has been preparing a machine. This is the session where the thing
people actually care about moves onto it.

You'll install Java on the rented machine, copy your entire server folder up over the
network — world, settings, whitelist and all — open the port, and then start the server
by hand and join it yourself at its new address.

By hand, deliberately. You could automate it in the same session and you're not going to,
because if something's wrong with the copy you want to find out while there's exactly one
thing that could be at fault. Teaching the machine to start the server itself is the next
session, and doing it in that order costs five minutes and buys you a much shorter list of
suspects.

Friends come next session too. This one ends with you standing in your own world, on a
computer in another building.

---

## Before you start

You need:

- **A rented machine with your own user, `sudo`, and a firewall.**
  [Locking the front door](../locking-the-front-door/guided.md) gets you there. Quick
  check: `ssh minecraft@<your address>` works, and `sudo ufw status` says the firewall is
  active.
- **A Minecraft server folder on your own computer you can start, stop, and join.**
  [Running your own server](../../../minecraft-server/lessons/running-your-own-server/guided.md)
  covers it.
- **A backup you have actually restored from, and a way to take a fresh one.**
  [Copying and backing up worlds](../../../minecraft-server/lessons/worlds-and-backups/guided.md)
  covers it. Your world is about to travel across a network for the first time, and you do
  that with a proven safety net or not at all.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- Java installed on the rented machine, using Ubuntu's package manager
- Your world, settings, and whitelist copied up over the network, verified from the far
  side
- The habit of looking at what a copy *would* do before letting it do it
- Minecraft's port open in the firewall
- The server running on the rented machine, and you standing in your own world at an
  address that has nothing to do with your house
- Two failures caused on purpose that make the difference between "the server is running"
  and "people can reach the server" concrete

---

## New tools

**[`apt`](https://documentation.ubuntu.com/server/how-to/software/package-management/)**
is Ubuntu's package manager. It installs software from Ubuntu's own catalogue,
which is exactly the job Homebrew does on your Mac — a different operating system doing
the same thing. `sudo apt update` refreshes the catalogue and `sudo apt install <name>`
installs something from it. `man apt` is on the machine.

That's your second package manager, and two instances is what turns a command you
memorised into an idea you have: operating systems keep a catalogue, and installing
software means asking the catalogue.

**`rsync`** copies files and whole folders, either on one machine or between two machines
over the network. It ships with macOS. `man rsync` is a long page and worth skimming once,
because it has more useful options than almost anything else you'll meet; the
[project's own documentation](https://rsync.samba.org/documentation.html) is the same
material on the web.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Your server folder holds the world, the settings, and the list of who's allowed in. If
  that whole folder appeared on another computer and the server started there, what would
  be different for the people joining? What would be identical?
- The rented machine has never run Minecraft. What does it need that isn't in that folder?
- You're about to copy a world across a network. What could go wrong if the server were
  running while you copied it?
- You'll start the server on the new machine and try to join it. Name every separate thing
  that has to be true for that to work. How many did you get?

---

## The work

### Install Java

The folder you're about to copy has your world and settings in it, but not the program
that runs Java. That has to be installed on the machine itself.

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo apt update
sudo apt install openjdk-<version>-jre-headless
java -version
```

Two things to work out before you run that.

**Which version.**
[Minecraft's own server documentation](https://minecraft.wiki/w/Tutorial:Setting_up_a_Java_Edition_server)
states which Java version the current server needs, and that's the source to check rather
than any page describing it.
If you get it wrong, the server's own error message will name what it wanted — which is
a perfectly respectable way to find out.

**What the two words on the end mean.** **JRE** is the part of Java that runs programs, as
opposed to the kit that also compiles them. **headless** is the build without any
graphical parts, which a machine with no screen has no possible use for.

### Take a backup, then stop the server

Take a fresh backup of your world. Your world is about to travel across a network for the
first time; that's the whole reason.

Then stop the server on your Mac — and before you do, say why in your own words.

<details>
<summary>Why stopping matters</summary>

A world that's being written to while it's being read gives you a copy of a state that
never existed as one piece. Half the files are from before a save and half from after.
It's the same rule you met the first time you made a backup, arriving again with a new
consequence attached.

</details>

### Copy it up

`rsync` sends files between machines over the same encrypted connection you've been using
all along. It has one habit worth using every single time:

<span className="run-where run-where-local">On your Mac</span>

```
rsync -av --dry-run <your server folder>/ minecraft@<the address>:/home/minecraft/server/
```

`--dry-run` copies nothing at all. It prints exactly what it *would* do. Read that output
properly before running the command for real — it's the same discipline as reading an
error message before changing anything, applied one step earlier.

Two things about that command worth understanding rather than copying:

- `-a` means archive: copy the folder and everything in it, keeping timestamps and
  permissions. `-v` means print what you're doing. Add `-z` to compress in transit if your
  upload is slow.
- **The slash on the end of the source is load-bearing.** `folder/` copies the *contents*
  of the folder into the destination. `folder` without the slash copies the folder itself,
  giving you `server/folder` on the far side.

Which of those two do you want? You have a command that shows you which one you're about
to get, without doing it. Use it.

You'll also see `--delete` in most rsync examples online. It makes the destination match
the source exactly, deleting anything at the destination that isn't in the source. You
don't want it here, and it's worth knowing what it does before you meet it somewhere it
matters.

When the real copy finishes, go and look from the other side.

<span className="run-where run-where-remote">On the rented machine</span>

```
ls /home/minecraft/server
```

Find the world. Find `server.properties`. Find `whitelist.json`.

Then open `eula.txt` and read it.

The agreement you accepted the very first time you ever started a server travelled with
the folder. Nothing on this machine has to be set up again — and the friends who were
allowed in are still allowed in, because the list of them is a file, and files copy.

### Open the port

The firewall you put up last session is doing its job: it's allowing SSH and nothing else.
Minecraft listens on port 25565, and right now that's closed.

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo ufw allow 25565
sudo ufw status
```

Read the status output. It's the list of what's now true about this machine.

### Start it by hand, and join

Start the server the way you always have, from inside the server folder, with one
addition:

<span className="run-where run-where-remote">On the rented machine</span>

```
java -Xmx3G -jar server.jar nogui
```

`-Xmx` sets the maximum memory Java will use for your world and everything in it. It has
to be meaningfully **below** the machine's total memory, because Java needs some beyond
that number and the operating system needs its own — roughly 3 GB on a 4 GB machine.

Watch the startup lines go past. They'll be completely familiar. That's the point: same
program, new home.

Now join it, from your own Mac, at the machine's public address.

That's the move, done.

---

## Break it on purpose

**Get the trailing slash wrong, for free.** Run the copy command both ways — with and
without the slash on the source — using `--dry-run` both times, and read both outputs.

One puts your world where you want it. The other makes a folder inside a folder. Nothing
actually happens either way, which is exactly why `--dry-run` is worth the four seconds
every time.

**Join before opening the port.** If you've already opened it, close it again
(`sudo ufw delete allow 25565`), start the server, and try to join.

It times out.

You've met that failure deliberately before, back in the first session of this module —
nothing answered at all. And notice what's true right now: the server is running
perfectly. It's listening. Nothing is wrong with it. The firewall is discarding your
connection before it ever reaches the server.

**"The server is running" and "people can reach the server" are two separate claims**, and
an enormous amount of time gets lost by people who assume they're one. Put the rule back.

**Ask for more memory than the machine has.** Set `-Xmx` above the machine's total memory
and start the server.

Read whichever answer you get. Either it refuses to start and says so plainly, or it
starts and the machine begins using its disk as memory and everything turns to treacle.
Which one you get depends on the machine, and both are worth seeing.

The heap and the machine's memory are two different numbers, and the first has to be
meaningfully smaller than the second. Put it back to a sane value.

---

## What just happened

Your world is somewhere else now. The same folder, the same settings, the same list of
people — copied over a network onto a computer in another building, where the same program
read them and carried on as though nothing had happened.

That last part deserves more attention than it usually gets. Nothing had to be re-entered.
The agreement you accepted months ago on a laptop is accepted on a machine in a data
centre, because accepting it was a line in a file and the file came too. That's what it
means for a program's state to live in files rather than somewhere invisible: the state is
portable, inspectable, and copyable, and moving a service between machines turns out to be
mostly moving a folder. That is very much not a Minecraft fact — it's why the whole
industry cares so much about where state lives.

`rsync` is worth keeping for the rest of your life, and `--dry-run` is worth keeping even
more. Most tools that can destroy something have a way to ask what they *would* do, and
most people find that option immediately after the first time they needed it. You now have
the habit before the incident.

Starting by hand before automating is the other habit, and it cost you five minutes. What
it bought is that when you add a service file next session and something misbehaves, the
copy isn't a suspect. Debugging is mostly the art of arranging to have one suspect at a
time — and the arranging happens before the problem, not after it.

---

## Go further

- `rsync` copied the whole folder. Read `man rsync` and find how to make it copy only what
  has changed since last time. What would that be good for?
- Your world came across — but so did every log file and every temporary file in that
  folder. Is that what you wanted? What would you have left out, and how would you have
  done it?
- You now have the same world on two machines. Which one is the real one, and how would
  anybody be able to tell? What happens if somebody starts the old one by accident?
- Genuinely open: your world folder will keep growing. How large can it get before copying
  it across the network stops being practical, and what would you do then? Find out how
  big it is now, and how much it grew this month.

---

## What you have now

- Java installed on the rented machine, and `apt` used for the first time
- Your world, settings, and whitelist on that machine, verified by looking rather than
  assuming
- The `--dry-run` habit: look at what a copy would do before letting it
- Minecraft's port open in the firewall
- The server running on a machine in another building, with you standing in your own world
- The knowledge that "the server is running" and "people can reach the server" are two
  different claims
