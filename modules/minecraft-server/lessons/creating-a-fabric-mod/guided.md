# Creating your own Fabric mod

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Every mod you installed last lesson started as a folder on somebody's computer.
This lesson makes that folder yours: you'll generate a mod project from Fabric's
own template, build it, load it into your server, and finish with a custom
command any player can run — your code, running inside the server process itself.

There's a language matter to say plainly first. Mods are written in **Java**,
because the server is a Java program and mod code runs inside it — there is no
other road into this room. This module kept Java away from you until now, on
purpose: its working loop is edit, build, restart, rejoin — minutes per attempt,
where your bot gave you seconds. That loop is fatal to a first programmer and
merely annoying to a fluent one. You're fluent now. Today you'll pay the toll,
feel exactly why the bots came first, and discover how much of what you know
walks straight across: your third language is where you find out that variables,
conditionals, and events were never JavaScript or Python — they were programming.

---

## Before you start

You need:

- **A Fabric server with mods installed.**
  [Running a modded server with Fabric](../fabric-modded-server/guided.md) gets
  you there. Quick check: your Fabric server starts, and its log lists the mods
  it loaded.
- **Real programming behind you** — you've written and debugged programs, from
  [Writing your first bot](../writing-your-first-bot/guided.md) onward. Quick
  check: you can explain what an event handler is without looking it up.
- **A computer set up for coding** —
  [Setting up a coding machine](../../../dev-machine/lessons/dev-machine-setup/guided.md).
  The Java you installed to run servers includes the developer half you'll need
  today; the build will tell you loudly if your version is too old, and the same
  site that provided it has newer ones.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. This lesson leans on real documentation — [Finding the real documentation](../../../../reference/finding-the-docs.md) helps when searching turns up noise.

---

## What you'll have at the end

By the end of this lesson you will have:

- A mod project of your own, generated from Fabric's template, that builds to a
  real mod jar
- Your code announcing itself in the server log, and a custom command that
  players on vanilla clients can run
- The compile step and the build artifact in your hands — including the two
  classic ways they surprise people, both caused on purpose
- A third language met, and an honest measurement of how much of your skill
  transferred

---

## New tools

**Java, as a thing to read.** You don't need a Java course today — the template
gives you working code to modify — but you need a field guide for what you'll
see. Java writes types down (`String name` where JavaScript said `let name`);
statements end in semicolons; braces are load-bearing; everything lives inside a
class, which for today you can read as "a file with a formal opening ceremony."
There's boilerplate the template writes for you — words like `public` and
`@Override` — that you should read past today the way you once read past
`package-lock.json`.

**A compiler.** JavaScript and Python ran your files directly. Java *compiles*
first: a build step translates all your source into the form the machine runs,
and only then can anything execute. You'll meet both consequences of this today,
one pleasant, one treacherous.

**Gradle** is the build tool that orchestrates it — Java's counterpart to npm,
one size heavier. You don't install it: the template ships a wrapper script
(`gradlew`) that fetches the right version itself.

**Fabric's developer documentation** — linked from
[fabricmc.net](https://fabricmc.net) — is today's primary text. The template, the
project layout, and the command system are all documented there, and where this
lesson leaves a blank, that documentation is where the answer lives.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- When you make a typo in Java, *when* will you find out — and how is that
  different from the moment the bot told you?
- The first build "downloads a lot." Write a guess for how long it takes and
  check it afterward.
- You'll edit your source and restart the server to see the change. Predict one
  way that can go wrong today that could never happen with `node bot.js`.

---

## The work

### Generate the template

In Fabric's developer documentation, find the **template mod generator**. It asks
for a few decisions: a mod name, a mod id (lowercase — choose something yours),
and a Minecraft version — which must be your Fabric server's version, for reasons
you can now recite. Generate it, and unpack the result into
`~/projects/<your-mod-id>`.

Before touching anything, walk the shape once — every folder, every file name,
one pass: `src/` holds the code; `fabric.mod.json` is the mod's manifest (your
fourth meeting with JSON — id, name, and where the code starts, all declared);
`gradlew` is the build wrapper. Find the entry point class inside `src/` — the
one whose method runs when the mod initializes — and read it. It's shorter than
your bot.

### First build

From the project folder:

```
./gradlew build
```

Now the honest warning: the first build downloads Gradle itself, the
dependencies, and a working copy of the game's internals. It takes a long time
and prints a great deal — this is normal, not a hang. Check your logbook guess
when it finishes.

Success looks like **BUILD SUCCESSFUL**, and — go look — a jar with your mod id
on it in `build/libs/`. That file is your mod, in the same form as every mod you
installed last lesson.

### Load the unchanged template

Copy that jar into your Fabric server's `mods/` folder and restart the server.
Find the template's initialization line in the startup log, sitting among the
mods you installed from the internet.

Stop and give that its due: code from a folder you generated an hour ago is
running inside the Minecraft server.

### Make it yours — and count the loop

Change the initialization message in the entry point class to something
unmistakably yours. Then get it into the server. All four steps, out loud this
time: **edit — build — copy — restart.** Rejoin, check the log.

That round trip is the toll at this tier. Your bot's loop was
save-and-rerun, seconds; this one is minutes. You've now felt, directly, the
oldest design decision in this module — and also proven it's a toll a fluent
programmer can simply pay.

### A command friends can run

The finale: a server-side command — `/yourword`, whatever you choose — that
replies in chat, works from vanilla clients, and therefore works for every friend
on your server.

Here's the structure with the load-bearing names blanked. Fabric's developer
documentation has a page on commands; everything blank is on it:

```java
______.EVENT.register((dispatcher, registryAccess, environment) -> {
    dispatcher.register(______.literal("yourword")
        .executes(context -> {
            context.getSource().______(() -> Text.literal("your reply"), false);
            return 1;
        }));
});
```

This goes in your entry point's initialize method — and yes, the arrow shape in
the middle is an old friend with a new accent.

Done when: you rebuild, reload, rejoin, type your command, and the server
answers — then someone else does it from their unmodified game.

---

## Break it on purpose

Two experiments, both aimed at the compile step.

**Break the syntax.** Delete a semicolon or a closing brace. Run the build. The
compiler refuses — naming the file, the line, and pointing at the spot — and no
jar is produced at all. Compare this with every bug the bot ever gave you:
JavaScript let the program *run* until the broken line's moment came; Java won't
let a broken program exist. You've just seen the trade compiled languages make —
they spend your time up front to catch whole categories of mistakes before
runtime. Fix it; rebuild.

**The stale build.** Change your message again — and this time "forget" on
purpose: don't build, don't copy, just restart the server. Old message. Sit with
why: **the file you edit is not the file that runs.** The jar is. Since your
first lesson here, the module's quiet motto was the opposite — `bot.js` *was*
the program — and that directness was chosen precisely so you'd learn to program
before meeting this trap. It is the single most common confusion in every
compiled language, and it is now a known consequence with a known fix: build,
copy, restart, current.

---

## What just happened

A compiler translates all your source, up front, into the artifact the machine
actually runs. Everything you met today falls out of that one sentence: errors
caught before anything executes, a build step that costs minutes, and an artifact
that goes stale the moment you edit the source behind it. Interpreted languages
collapse those steps so the file *is* the program — faster to iterate, later to
find out. Neither side of the trade is better; they're tuned for different
moments, and you have now lived both.

The machinery around it should have felt familiar at one size heavier: Gradle is
to Java roughly what npm was to your bot — dependencies declared, fetched, and
assembled into something runnable — and `fabric.mod.json` is a manifest the way
`package.json` was. Ecosystems rhyme.

And the largest thing: count what transferred. Variables, conditionals,
functions, events, reading errors, reading documentation, the debugging sequence
— all of it crossed three languages untouched. The costume changed; the
programming didn't. That's what the third language is for: proving to you that
what you've built these past months isn't JavaScript or Python knowledge. It's
the durable thing underneath.

---

## Go further

- Add a second command that reports something true about the world — the
  documentation's command pages show what a command can reach from the server
  side.
- New items and blocks need the client too. Read the documentation's item
  tutorial far enough to find exactly *where* the server-only road ends — that
  boundary is worth mapping once, deliberately.
- Every mod on Modrinth started exactly where yours is tonight. Find out what
  publishing actually involves — and what yours would need to become before
  you'd put your name on it there.
- Genuinely open: one layer down live Kotlin (another JVM language mods can use)
  and the mixin system, which lets mods rewrite the game's own code as it loads.
  How far down does this staircase go — and which step would you take next?

---

## What you have now

- A mod project that builds to a jar, loaded on your server, with your initials
  all over its log line — and a custom command that any player, on any vanilla
  client, can run
- The compile step in your hands: the strict gate, the build artifact, the stale
  trap, and the four-step loop, all met on purpose
- A third language — and the measured discovery of how much of your skill was
  never about the language at all
