# Principles

How material in this lab is written. This file is about the method, not about any
particular learner or any particular point in a course.

---

## What this lab is

A general-purpose learning lab: modules of self-contained lessons that teach
computing — programming, networking, operating systems, engineering — by doing things
to real systems. Each module picks a delivery mechanism the learner already cares
about (the first: a Minecraft server, which supplies both a living system and an
audience of friends and family who see the results). Different modules may serve
different learners and different learning styles; what they share is the method in
this file.

The subject is computing. The objective is a disposition — that a wall is a door whose
handle hasn't been found yet, and that "I don't know how" is a starting position rather
than a verdict.

Two consequences of that objective shape everything:

- **Modify before you create.** Lessons start from something that already works; the
  first move is to change it and watch the change land. Building from an empty file
  comes later. Discovering that an existing system will do what you tell it is a
  stronger motivator than building from scratch.
- **Something visible every session.** The social loop — friends and family seeing what
  the learner made — does much of the motivational work. No lesson ends with nothing
  to show.

---

## The central rule

**Orientation and setup are stated plainly. Only the problem-solving is withheld.**

Given, always, without hints or ceremony:

- What a tool is and what it does
- Why it's being used here
- How to install it
- Where files go and what things are called
- Any fact the learner could not reasonably derive

Withheld, behind progressive hints:

- How to combine those things to reach the goal
- Which function to call and how to structure the solution
- The specific answer to the problem posed

Getting this backwards produces material that reads as obstructive rather than
challenging. No real documentation hides its install command. Hiding orientation doesn't
build self-reliance; it builds distrust of the material.

A useful boundary case: when a program's own output states what to do next (a first-run
message, a clear error), the lesson may direct the learner to *read the output* rather
than pre-empting it. The orientation is still given — by the system itself — and reading
it is the skill being built.

---

## The core/delivery model

Each lesson is a folder under `lessons/`. Inside it:

- **`core.md`** holds everything: the goal, prerequisites, facts, the full problem arc
  including hint content and explanations, and internal authoring notes. It is written
  for authors and is the single source of truth.
- **Delivery files** (`guided.md`, `reference.md`, …) are *renderings* of the core for a
  specific audience, defined in `PROFILES.md`. They are generated, and regenerated when
  the core changes. A substantive fix discovered while editing a delivery belongs in the
  core.

This is what prevents the guided and terse versions from drifting apart, and means a
changed command is changed in one place. The format of `core.md` is specified in
`WORKFLOWS.md`.

---

## Learner-facing lesson structure

The `guided` delivery uses these sections, in this order, with these plain-language
headings. Other profiles adapt per `PROFILES.md`.

**What this is** — One or two paragraphs. What gets built and why anyone would want it.
Written for someone who arrived here directly, with no prior context.

**Before you start** — Conditions of the world, not lessons completed. "You need a server
you can start and stop" rather than "you must have finished lesson three." Each condition
links to a lesson where it's established, for anyone arriving cold. Include two or three
concrete self-checks: run this, expect this.

**What you'll have at the end** — Phrased as "by the end of this session you will have…"
Observable, and where possible visible to other people.

**New tools** — Anything unfamiliar named and explained plainly: what it is, what it
does, how to install it. Never withheld. Never behind a hint.

**Predict** — Specific questions to answer before running anything.

**The work** — Goals stated clearly. Explanation is generous; the answer is not given.
Hints in collapsed `<details>` blocks, revealed in order.

**Break it on purpose** — Deliberate failures the learner causes and then undoes, with an
explanation of what each error means in general and what causes it.

**What just happened** — The explanation, delivered after success rather than before.

**Go further** — Open-ended questions with no solutions provided. At least one that has
no known answer.

**What you have now** — The state this puts the world in, so other lessons can name
it as a condition. (Always this heading — never "what this leaves behind" or similar;
"leave behind" reads as loss.)

---

## The hint ladder

Collapsed sections, opened in order:

1. A nudge toward the right surface, using no new vocabulary
2. The concept, named and explained
3. The specific pointer — a documentation page or a function name, without showing usage
4. A worked answer, framed as comparison after something is already working

Rung 4 is used sparingly: the first lesson of a genuinely new skill, where ending with
nothing working is worse than ending with something copied. Once a skill is established,
the ladder stops at rung 3.

For syntax-heavy moments, a **completion problem** works better than a hint ladder — show
the structure with the load-bearing parts blanked out. It removes blank-page paralysis
while preserving the thinking that matters.

---

## Scaffolding levels

Internal planning vocabulary. **Never appears in learner-facing text.**

- **Level 1** — reasoning shown throughout, all hints available
- **Level 2** — goals plus hints, concepts named but not applied
- **Level 3** — goals and success criteria only

Roughly: the first lesson exercising a new skill is level 1, the second level 2, the
third level 3. The level is recorded in the lesson core, because reducing support is
exactly what doesn't happen by default — when someone is stuck and the author is tired,
the author helps.

---

## Learning techniques to build in

**The logbook.** The learner keeps a logbook — wherever they choose (paper, a notes
app, a text file); explicitly not in this repo. Two things get recorded in it, and
lessons prompt for both by name: **predictions** (one line before running something
new) and **walls** (the four-line stuck template: what stopped me / what I guessed /
what I tried / what it actually was). Months in, it becomes the learner's own data
that stuck things come unstuck — the belief the whole lab exists to install. The
learner-facing explanation lives on the "Your logbook" page.

**Predict before you run.** Before executing anything, state what you expect — in the
logbook. The point isn't accuracy, it's manufacturing surprise: without a prediction,
an unexpected result is noise; with one, it's evidence that a specific belief is
wrong. Nearly all durable learning enters this way.

**Read the whole error.** Every error, out loud, completely, before changing anything.

**Break it on purpose.** Have the learner cause common failures deliberately on working
code, then restore it. This makes each error a known consequence rather than a mystery,
proves failures are reversible, and builds the "what did I change?" instinct while the
answer is still obvious. Never ship pre-sabotaged files as a hidden trap — that reads as
the material lying. Explicit, clearly labeled debugging challenges are fine later.

**Read the surface.** Regularly assign scanning an entire reference — every event a
library exposes, every line of a config file — not hunting for an answer, just seeing
the size of the space. This is the load-bearing mechanism of self-reliance and it
transfers to every tool the learner will ever encounter.

**Type it, don't paste it.** Setup commands may be copied — they teach nothing. Subject
matter is typed by hand, because typing forces reading every character.

**Retell one layer deeper.** After each success, explain what happened slightly more
accurately than last time. The same story at increasing resolution across the whole
course.

**Hand questions back as predictions.** When asked how something works, answer with
"what would have to be true for that to work, and how could we find out?"

**Name concepts at the moment of friction.** No upfront lessons on how computers work.
When an invisible fundamental (working directory, file extensions, PATH, dependencies)
causes friction, name it right there and go one layer deeper than the moment strictly
requires.

---

## Non-linear by default

Learners arrive at lessons out of order, in the middle, from a search result. The
material supports this.

- Prerequisites are conditions of the world, each with a link to where it's established.
- No numbers in filenames. Numbering encodes an order into the file system, which then
  fights every insertion and reordering.
- The recommended sequence lives in a single path document that anyone can ignore.
- Every lesson opens with enough orientation to be read cold.

---

## Volatile facts

Anything that changes without warning — which Minecraft versions a community tool
supports, what the current release is — should not be asserted in a delivery. Point the
learner at the authoritative source and have them determine the current answer.

In lesson cores, volatile facts *are* recorded (authors need them), but always tagged
`[volatile]` with an as-of date, and the delivery instruction is "point, don't assert."

This keeps material from rotting, and doubles as practice at the most useful research
skill there is: finding out the present state of something rather than trusting a
description of it.

---

## Constraints

General constraints, binding for every module:

- **Something visible every session.** No lesson ends with nothing to show; where the
  module has a social audience, prefer results other people can see.
- **Just-in-time installation.** Nothing is installed before the moment it's needed,
  so the purpose of every tool is obvious.
- **Experiments run where breaking things is free.** Every module names its
  expendable surface (a sandbox server, a scratch project, a copy) and keeps
  destructive exercises there.
- **Course tooling is never lesson content.** The machinery that renders, publishes,
  or organizes this lab stays out of every module.

Module-specific constraints — language choices, platform scope, toolchain stance,
pacing — live in that module's `MODULE.md` and bind only its own lessons.

---

## Voice and style

One house style governs **all** learner-facing text — lesson deliveries, module front
pages, path pages, and the lab's top-level pages alike. The only sanctioned deviations
are delivery profiles, whose style differences are defined in `PROFILES.md` on
purpose; within any one page or section, the style never wavers.

The style: write like a good tutorial — clear, complete, unhurried, in plain
sentences. Explain generously. Assume intelligence and assume unfamiliarity — those
are not in tension. Vivid and concrete is welcome; clever is not.

- No cheerleading, no exclamation marks, no manufactured enthusiasm.
- No knowing asides, quips, winks, or self-referential jokes. Sentences like "That's
  all it does," jokey sign-offs, and cute parentheticals are the failure mode: they
  read as a second voice intruding. Say the thing plainly and stop.
- Excitement is built with concrete specifics (what the learner will actually make
  and who will see it), never with tone.
- No time estimates anywhere. They create pressure and they're wrong.
- No internal methodology vocabulary in learner-facing text.
- No assumed shared context, no references to a conversation the reader wasn't in.
- Define every term at first use, including ones that feel too basic to define.

## Audience separation

Learner-facing pages are written for a learner reading the rendered site. They
describe **pages and sections, never files and folders**:

- Refer to other pages by their titles, as links — "see [A recommended path]", never
  "see PATH.md". Filenames, folder layout, the core/delivery mechanism, and anything
  else about how this project is built are internals.
- Exactly one page is exempt: the top-level "How this project is put together" page,
  which exists to explain the repo itself (file layout, what a lesson folder
  contains, how to read offline). All internals live there and nowhere else.
- Lessons freely name files and paths in the **learner's own systems** — their
  server folder, their scripts, their projects directory. The rule is about this
  project's internals, not about files in general.
- The learner's own work product (logbook, notes, decisions, code) lives in the
  learner's own space — their projects folder, their notebook — never in this
  repo. No lesson may ask the learner to edit or commit files in this project.

---

## Known failure modes

Observed in earlier drafts. Check against these before shipping any delivery.

- Withholding orientation instead of withholding the answer.
- Terseness read as deliberate unhelpfulness. Brevity is not a virtue here.
- Pronouns without referents — "it," "the server," "something else" — where the reader
  has no way to resolve them.
- Referencing lessons, tools, or setup steps that don't exist yet.
- Internal vocabulary leaking into learner text.
- Assuming a specific learner, a specific household, or a specific point in a journey.
- Writing lessons before the arc they belong to exists.
- Asserting a volatile fact instead of pointing at its source.
- Referring to this project's files, folders, or generation machinery in learner
  text (belongs only on the "How this project is put together" page).
- Style drift: quips, knowing asides, or a second authorial voice appearing in any
  learner-facing page.
- Asking the learner to write into this repo instead of their own logbook or
  projects.
