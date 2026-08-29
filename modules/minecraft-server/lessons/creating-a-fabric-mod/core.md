# Creating your own Fabric mod

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** creating-a-fabric-mod
- **Module / Part:** minecraft-server — Part 4.5, Modding the server
- **Scaffolding:** level 2–3 — Fabric's own developer documentation is the primary
  text (the read-the-docs pattern); but Java is a new language, so language-shape
  orientation is generous and the command registration is a completion problem
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

The learner's own mod — generated from Fabric's template, renamed, built with
Gradle, loaded on their modded server — culminating in a custom command that
players can run from vanilla clients. Payoff: code the learner wrote is running
*inside* the server process, and friends can touch it.

Two payloads under the build:

1. **Java as an additional language.** This module banned Java as a first language
   because of its slow loop — and this lesson has the learner FEEL that loop
   (edit → build → restart → rejoin) and names it as the reason bots came first.
   Full circle, stated in learner text plainly.
2. **Compiled vs interpreted, lived.** Two experiences JS and Python never gave:
   the compiler catching errors BEFORE the program runs, and the stale-build trap
   — the file you edit is NOT the file that runs, the exact inversion of this
   module's zero-toolchain starting point. Both are break-its.

## Prerequisites

- A Fabric server with mods installed — established by
  `modules/minecraft-server/lessons/fabric-modded-server/`
- Real programming fluency: you've written and debugged programs (the bot arc) —
  established by `modules/minecraft-server/lessons/writing-your-first-bot/` and
  `modules/minecraft-server/lessons/bot-commands-and-building/`
- A computer set up for coding — established by
  `modules/dev-machine/lessons/dev-machine-setup/`

## Establishes

- "You've built and loaded a mod of your own — established by
  `modules/minecraft-server/lessons/creating-a-fabric-mod/`."
- The learner has met Java, Gradle, and the compile step, and knows the
  edit-build-restart loop by feel.

## Facts

- Fabric's developer documentation is the primary text
  [volatile as of 2026-08 — lives on the fabricmc.net site's developer section;
  deliveries point at "Fabric's developer documentation, linked from
  fabricmc.net" and never deep-URL].
- Starting a mod: Fabric provides a **template mod generator** (on the Fabric
  site) and/or a template repository on the FabricMC GitHub org [verify current
  mechanism — the generator asks for mod name/id and target version and produces
  a zip/repo]. Choices to make: mod id (lowercase, learner's choice), Minecraft
  version = the modded server's version.
- The template is a **Gradle** project: `gradlew` wrapper scripts ship inside it,
  so Gradle itself needs no separate install. Build: `./gradlew build` from the
  project folder [verify]. FIRST build downloads a great deal (Gradle itself,
  dependencies, game internals) and takes long — stated honestly so nobody thinks
  it hung; later builds are much faster.
- Java: the Temurin package installed for running the server is a full JDK
  (compiler included) [verify — Temurin installers ship the JDK; also verify the
  template's required Java version matches what's installed; if the template
  demands a newer JDK the build error names it, and adoptium.net has it].
- Output: the built mod jar lands in `build/libs/` [verify exact naming —
  `<modid>-<version>.jar`, plus a `-sources` jar to ignore].
- Install cycle: copy the jar into the Fabric server's `mods/`, restart server.
  THE LOOP: edit → `./gradlew build` → copy → restart → rejoin. Minutes, not
  seconds — the fact the whole module was designed around, now lived.
- Project shape facts [verify all against current template]: entry point class
  implementing `ModInitializer` with `onInitialize()`; `fabric.mod.json` as the
  mod's manifest (id, name, entry points — JSON again, fourth appearance);
  logger available for "mod loaded" proof in the server log.
- The visible payoff: registering a server-side **command** via Fabric API's
  command registration callback [verify API name — CommandRegistrationCallback
  and the brigadier builder shape; deliveries give this as a completion problem
  with the load-bearing names blanked and Fabric's docs as the fill-in source].
  A server-side command is visible to vanilla clients — consistent with the
  previous lesson's promise.
- Java shape orientation facts (stable): types written down (`String name`),
  braces and semicolons, classes as the unit of everything, `public static` noise
  acknowledged not explained, compilation to `.class`/jar before running. The
  REPL-less workflow contrast.
- Editor: VS Code works fine for this lesson's scale (no IDE install; Fabric
  docs may recommend IntelliJ [volatile] — noted as the path serious modding
  takes later, not needed today).

## Arc

### Orientation — given plainly

Why Java appears now and not earlier: mods run inside a Java program, so they're
written in Java (or its JVM cousins) — there is no other road to this room. And
the module's oldest design decision gets said out loud: Java's edit-build-restart
loop is slow, which is exactly why the first programs here were bots in
JavaScript with a seconds-long loop. Today the learner is fluent enough to spend
minutes-per-iteration and still come home. Java's shape differences from JS and
Python given as a short field guide (types, braces, classes, the compiler),
framed as "third language: now you can see what's language and what's
programming" — the parallels ARE the lesson.

### Predictions to elicit

- Java has a compile step JS and Python didn't. Predict: when you make a typo,
  WHEN will you find out — and how is that different from the bot?
- The first build downloads "a lot." Guess how much and how long. (Check after.)
- You'll edit your source and restart the server. Predict a way this can go
  wrong that couldn't happen with `node bot.js`.

### The work — goals and success criteria

1. **Generate the template.** Fabric's developer docs → template generator; mod
   id and name chosen; target version = the modded server's. Unzip into
   `~/projects/<modid>`. Tour the shape: `src/`, `fabric.mod.json`,
   `gradlew`. (Read-the-surface lite: skim every file name once.)
2. **First build.** `./gradlew build`, with the honest warning about the first
   run. Success: BUILD SUCCESSFUL, and a jar in `build/libs/`.
3. **Load the unchanged template.** Copy the jar to the Fabric server's `mods/`,
   restart, find the template's init line in the server log. Success: code from
   the learner's folder ran inside the server.
4. **Make it yours.** Change the init message to something unmistakably theirs;
   rebuild; recopy; restart; see it. THE LOOP, counted out loud: this round trip
   is the price of this tier, and they've now paid it twice.
5. **A command friends can run.** Completion problem: register a server-side
   command (name the learner's choice) that replies in chat — structure shown
   with the registration callback and builder names blanked, Fabric's command
   documentation as the fill-in source. Success: a vanilla client runs
   /<their-command> and gets the reply; friends can too.

### Break it on purpose — failures to cause, undo, and read

- **Break the syntax.** Delete a semicolon or brace; run the build. The COMPILER
  refuses — file, line, caret — and no jar is produced. Compare explicitly with
  the bot: JS told you at runtime, mid-flight; Java refuses at the gate. Fix,
  rebuild. Teaches compile-time vs runtime as lived categories, and that the
  compiler is the strictest, fastest documentation there is.
- **The stale build.** Edit the message again — and "forget" the rebuild: copy
  nothing, just restart the server. Old message. The file you edited is NOT the
  file that runs; the jar is. This is the exact inversion of the module's
  starting motto (the bot file WAS the program), and it's the number-one
  confusion of every compiled-language beginner — now a known consequence.
  Rebuild, recopy, restart, current.

### What just happened — the explanation

A compiler translates source into the form the machine (here, the JVM) actually
runs, all at once, before anything executes — which is why it can catch whole
categories of mistakes before runtime, and why there's now a build artifact that
can go stale. Interpreted languages blur those steps into one; neither design is
"better," they trade when-you-find-out against how-fast-you-iterate, and the
learner has now lived both sides of that trade. The template's machinery (Gradle,
the wrapper, the manifest) is the same shape as npm and package.json one tier
heavier — dependencies, build, artifact. And the third-language observation lands:
variables, functions, conditionals, events — all of it transferred; what changed
was costume and ceremony. That transfer is what "knowing how to program" means.

### Go further — open questions

- Add a second command that reports something real about the world — the docs'
  command section shows what a command can reach.
- New items and blocks need the client side too: read the docs' item tutorial and
  work out exactly WHERE the server-only road ends. That boundary is worth
  mapping once.
- Mods on Modrinth started exactly where yours is now. What's actually involved
  in publishing one — and what would yours need to be worth publishing?
- Genuinely open: Kotlin, and the mixin system that lets mods rewrite the game's
  own code at load time, both exist one layer deeper. How far down does this
  staircase go?

## Delivery notes

- **guided:** the Java field-guide section stays SHORT (half a page) — orientation
  for reading the template, not a Java course; the completion problem carries the
  syntax load. Docs-pointing discipline everywhere the template's details might
  drift ([verify] tags above).
- The loop-counting in goal 4 is the emotional center — the module's origin
  decision explained by direct experience; keep it plain, no victory lap.
- Do not name IntelliJ as needed; VS Code + terminal is today's whole toolchain.
