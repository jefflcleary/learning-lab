# Choosing a Minecraft version

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Minecraft gets updated regularly, and each update is given a version number. A server runs
one specific version, and players can only join if their own game is running that same
version. This isn't a setting you can relax — it's built into how Minecraft works.

Most of what you'll do in this lab works the same regardless of which version you pick.
Changing server settings, letting friends in from outside your house, setting up backups,
reading the server's logs — none of that cares about the version.

One category does care: **community tools**. These are programs written by people outside
Mojang that connect to Minecraft servers and do things with them. Because they're not made
by Mojang, they have to be updated by hand every time Minecraft changes, which means they
usually run behind the newest release by weeks or months. If you want to use one, your
server has to run a version that tool understands.

So there's a decision to make, and it's a real tradeoff rather than a right answer. This
session is about making that decision with actual information instead of guessing — and,
more usefully, about learning how to find out the current state of something rather than
trusting what a page like this one tells you.

---

## Before you start

You need:

- **A Minecraft server you can start and stop.** If you don't have one yet, see
  [Running your own server](../running-your-own-server/guided.md).
- **To know which version your friends play on.** Ask them. This matters more than
  anything else on this page.

Quick check that you're ready: start your server, look at the first few lines it prints,
and find the version number in there. If you can do that, you're set.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This lesson leans on real documentation — [Finding the real documentation](../../../../reference/finding-the-docs.md) helps when searching turns up noise.

---

## What you'll have at the end

By the end of this session you will have:

- Found out, from the source, which Minecraft versions a specific community tool currently
  supports
- Seen for yourself what happens when a player's version doesn't match the server's
- Decided which version your server will run, and written down why
- A note in your logbook recording that decision, so future-you knows what past-you
  was thinking

---

## New tools

**mineflayer** is a library — a chunk of code written by someone else that you can use in
your own programs. This particular one lets you write a program that connects to a
Minecraft server and plays as though it were a person: walking around, placing blocks,
talking in chat. Later units use it to build bots that other players can see and interact
with.

You don't need to install it yet. Right now you only need to find out which versions of
Minecraft it can talk to.

**GitHub** is a website where a lot of software is developed in public. Two parts of it
matter here. The **README** is the front page of a project, usually describing what it does
and what it supports. The **issues** are a list of problems people have reported, along with
discussion from the people who maintain it. Issues are frequently more current than the
README, because the README gets updated when someone remembers to, and issues get filed the
day something breaks.

---

## Predict

Before you look anything up, write your answers in [your logbook](../../../../logbook.md):

- If a brand new Minecraft version came out today, how long do you think it would take
  before community tools worked with it? Days? Months?
- Why can't a tool just work with every version automatically?
- What do you think happens if you try to join a server running a different version from
  your game — a clear error, a confusing one, or does it half-work?

---

## The work

### Find out what mineflayer supports

Your goal: determine, from the project itself, which Minecraft versions mineflayer
currently works with — and specifically whether it works with the version your friends
play.

Don't take my word for it, and don't take a tutorial's word for it either. This page could
have been written a year ago. Find the current answer.

<details>
<summary>Stuck? Start here</summary>

Search for the project by name. It's developed in public, and the site it lives on has both
a front page describing the project and a list of reported problems.

The front page will tell you something. The problem list will tell you something more
recent. Look at both.

</details>

<details>
<summary>What you're actually looking for</summary>

Two different things, and they may disagree:

The README usually states a supported version range somewhere near the top — something
like "works with Minecraft 1.8 through 1.21."

The issues will tell you what's happening right now. If a new Minecraft version came out
recently, someone has almost certainly filed an issue about it. Search the issues for the
version number your friends use and read what the maintainers say.

If the two disagree, the issues are more current.

</details>

<details>
<summary>Where to look</summary>

The project is `PrismarineJS/mineflayer` on GitHub. The issue list is at the Issues tab —
and note that GitHub hides closed issues by default, so clear the search filter to see
everything, not just what's still open.

</details>

Write down what you found and the date you found it. Version support changes, and in a
month this answer may be different.

### See a version mismatch for yourself

You're going to make Minecraft refuse to let you in.

Your server is running some version. Change your Minecraft client to a *different* version
and try to join. Most launchers let you switch versions from a dropdown before you hit play.

Read the error carefully. It's more specific than you'd expect. Then switch back.

<details>
<summary>Stuck?</summary>

If you're using a launcher, the version selector is usually near the play button. Pick
anything clearly different from what your server runs — if the server is on a 1.21 release,
try a 1.16 one — and let it download if it needs to.

The error appears after you click to join the server, not before.

</details>

### Make the decision

Now that you know what's actually supported, pick one. All three of these are reasonable.

**Run only the newest version.** Your friends can all join with the game they already have.
You can change server settings, run datapacks, handle backups, let people in from outside
your house, and read your server's logs. What you can't do — until the tools catch up — is
write bots that connect to it.

**Run only an older version.** Bots work. So does everything else. The cost is that
everyone has to switch their game to an older version to play with you, which some people
will find annoying and some won't care about at all.

**Run two servers.** One on the newest version, which is the one people actually play on.
One on an older version, which exists purely for you to experiment with. This costs some
disk space and a little more to keep track of, and it's what most people end up doing.

There's a reason that third option is common, and it's worth thinking about before you
pick: the server people play on is the one where their houses and their stuff live. An
experiment that goes wrong on that server ruins someone's afternoon. An experiment that
goes wrong on a server that exists only for experiments costs nothing.

Professionals build their entire working life around that distinction. It has names —
you'll hear "production" for the thing people depend on and "staging" or "development" for
the place you try things. But the idea came first and the names came later, and you've just
arrived at it on your own.

Write your decision and your reasoning in your logbook. A few sentences. You'll want it in three months when you've forgotten why you set things up this
way.

---

## Break it on purpose

**Point your server at a version that doesn't exist.** In your server folder, temporarily
rename the server file to something else and try to start it. What does the error tell you
it was looking for? Put it back.

This is the same class of error as the version mismatch you just saw, but from the other
direction: the first was two programs disagreeing about what language to speak, this one is
a program not finding a file at all. Both errors name exactly what they wanted. Getting
into the habit of reading the whole message — including the part that names the file or
version it expected — will save you more time than any other single habit.

---

## What just happened

When your game connects to a server, the very first thing it sends is a number saying which
version of Minecraft's network language it speaks. The server compares that to its own
number. If they don't match, it refuses immediately, before you've loaded a single block —
which is why the rejection is instant rather than a slow failure.

That number is called a **protocol version**, and it exists because the two programs need
to agree on the exact format of every message before either can say anything meaningful.
Add a new block to the game and the messages describing blocks change shape. An older
program reading a newer message would misinterpret it, so Minecraft doesn't let it try.

This is also the whole reason community tools lag behind releases. A tool like mineflayer
has to know the exact shape of every message. When Minecraft changes those shapes, someone
has to work out what changed and update the tool by hand. That work takes as long as it
takes, and it's usually done by volunteers.

The thing you looked up today is a snapshot of a moving target. That's normal, and it's why
you checked the source instead of trusting a page.

---

## Go further

- Find out roughly how long mineflayer took to support the last two Minecraft releases.
  Does the gap look consistent, or does it depend on how big the update was?
- Minecraft has snapshot versions released before a full version. Can community tools
  support those? What would make that harder?
- If you run two servers on one computer at the same time, something has to be different
  between them or one won't start. What do you think it is? Try it and find out.
- Is there any way for a player on one version to join a server on another? People have
  built things that attempt this. Find out what they do and what they give up.

---

## What you have now

- A recorded decision about which version, or versions, you're running
- A written note of what mineflayer supported on the date you checked
- Experience finding the current state of a project from its issue tracker rather than its
  documentation
