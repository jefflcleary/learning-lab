# Workflows

Step-by-step procedures for every kind of authoring task in this repo. Written primarily
for LLM sessions, usable by anyone. `PRINCIPLES.md` governs content; this file governs
process. When they seem to conflict, `PRINCIPLES.md` wins.

There are five workflows:

1. [Capture an idea](#1-capture-an-idea)
2. [Develop module](#2-develop-module)
3. [Create or revise a lesson core](#3-create-or-revise-a-lesson-core)
4. [Generate a delivery](#4-generate-a-delivery)
5. [Add or revise a reference page](#5-add-or-revise-a-reference-page)

A request like "create a lesson on X" usually runs 2 (if X has no home in an existing
arc), then 3, then 4. Never skip 2's check: **no lesson is written before the arc it
belongs to exists.**

---

## 1. Capture an idea

Trigger: someone has a raw idea — a topic, a tool, a "wouldn't it be cool if."

1. Append it to `IDEAS.md` under the current date: one or a few lines, verbatim spirit,
   no structuring.
2. If it obviously connects to an existing part or lesson, add a one-line pointer.
3. Stop. Do not build it, do not reorganize `IDEAS.md`, unless asked.

---

## 2. Develop module

Trigger: a brand-new module is requested ("a module on learning JavaScript"),
an existing one needs a new arc, or a lesson idea has no home.

For a **new module**:

1. Read `PRINCIPLES.md`. Settle with the user: the theme, the intended learner and
   learning style (this may mean new profiles — see `PROFILES.md`), the delivery
   mechanism (what real system the learner acts on), and the module's own
   constraints (languages, platform scope, toolchain stance).
2. Scaffold `modules/<name>/` (kebab-case, no numbers) with three files:
   `README.md` (learner-facing front page), `PATH.md` (suggested order — links only
   to lessons that exist, so it starts nearly empty), and `MODULE.md` (authors'
   design doc: constraints, arcs, milestones, lesson status table).
3. Register the module in the top-level `README.md` modules list.

For **arcs and lessons within a module**:

1. Read `PRINCIPLES.md` and that module's `MODULE.md`.
2. Place the new material: extend an existing part, or add a new part/arc. For a new
   arc, define:
   - The **milestone** — the payoff the arc drives toward, socially visible where
     the module has an audience.
   - The rough lesson sequence as one-line stubs: working name, one-line goal,
     payoff, prerequisites as world-conditions.
   - Where it sits relative to existing parts in the recommended path (or that it's
     a standalone side-arc).
3. Check each stub against the general constraints in `PRINCIPLES.md` and the
   module's own constraints in its `MODULE.md`.
4. Update the module's `MODULE.md`. Update its `PATH.md` only when lessons
   actually exist to link to; the path document never links to lessons that aren't
   written.
5. Stubs are not lessons. Creating the cores is workflow 3, on request.

---

## 3. Create or revise a lesson core

Trigger: a lesson stub is ready to become real, or an existing core needs changes.

1. Read `PRINCIPLES.md` in full, especially the central rule and the failure modes.
   Read the home module's `MODULE.md` (constraints included) and confirm the
   lesson has a home. If not, do workflow 2 first.
2. Confirm every prerequisite is a condition established by a lesson that **exists**.
   If a prerequisite lesson is missing, stop and resolve that first (write it, or
   re-scope this lesson). Dangling references are a known failure mode.
3. Choose the folder name: short, descriptive, kebab-case, **no numbers**.
4. Write `modules/<module>/lessons/<name>/core.md` in the format below.
5. Verify the arc delivers something visible by the end, and that every fact a learner
   couldn't derive is in the facts section (orientation is never withheld).
6. Update the module's `MODULE.md` status for this lesson. Add it to that
   module's `PATH.md` if it's in the recommended path.
7. On revision: after changing a core, regenerate every existing delivery of that
   lesson (workflow 4). A core and its deliveries are never allowed to disagree.

### core.md format

````markdown
# <Working title>

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** <folder name>
- **Module / Part:** <module name> — <part in its MODULE.md>
- **Scaffolding:** level 1 | 2 | 3, and which skill this is the Nth lesson of
- **Deliveries:** which profiles get generated, and why
- **Status:** draft | ready | needs-regeneration

## Goal and payoff

What the learner can do/see at the end, and specifically what other people can see.

## Prerequisites

Conditions of the world, each with the lesson that establishes it:
- <condition> — established by `lessons/<name>/`

## Establishes

The world-state this lesson creates, phrased so other cores can cite it verbatim.
(Renders in deliveries under the heading "What you have now".)

## Facts

Everything simply true: commands, paths, names, settings, URLs. Tag lines with
`[macos]` / `[windows]` where platform-specific and `[volatile as of <date>]` where
it changes without warning (deliveries point at the source instead of asserting).

If the lesson's commands run in more than one place, name those places here in the
exact words the deliveries will use, and record which place each command belongs to.
Deliveries carry where-to-run labels (see PRINCIPLES.md); the core is where the
answer lives, so a regenerated delivery doesn't lose it.

## Arc

### Orientation — given plainly
### Predictions to elicit
### The work — goals and hint ladders (full hint text, all rungs)
### Break it on purpose — failures to cause, what each teaches, how to undo
### What just happened — the explanation, one layer deeper than the learner needs
### Go further — open questions; at least one genuinely open

## Delivery notes

Per-profile guidance: what the reference version keeps, known tone risks, open
questions about this lesson.
````

---

## 4. Generate a delivery

Trigger: a core is ready and a profile needs its rendering, or a core changed.

1. Read the lesson's `core.md`, the profile definition in `PROFILES.md`, and the tone
   and structure sections of `PRINCIPLES.md`.
2. Render the core for the profile. This is a *rendering*, not a rewrite: every fact,
   hint, and explanation comes from the core. If you find yourself inventing content,
   stop and put it in the core first.
3. Put this comment on the line directly below the H1 title (not above it — the
   site extracts page titles from the H1, which must be the file's first line):
   `<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->`
4. If the lesson's commands run in more than one place, label every code block with
   where it runs — a span on its own line directly above the block:

   ```
   <span className="run-where run-where-local">On your Mac</span>
   <span className="run-where run-where-remote">On the rented machine</span>
   ```

   `run-where-local` is the machine the reader is sitting at; `run-where-remote` is
   any other machine. The site renders these as coloured badges; GitHub strips both
   classes and shows the words as ordinary text, so the label is always a readable
   phrase. All-or-nothing per lesson, per the rule in `PRINCIPLES.md`.
5. Run the checklist below. Fix in the core, regenerate, re-check.
6. Set the core's status to `ready`.

### Delivery checklist

- [ ] Orientation complete: every tool named, explained, install stated plainly —
      and stated exactly once (in New tools normally; in The work when installing
      is the work, with New tools deferring explicitly; never both).
      **Check this in both directions.** Forward, from New tools: does each entry say
      what it is, how it is installed, and where its documentation is? Backward, from
      The work: take every command the learner is told to run and confirm each one was
      introduced. The backward pass is the one that catches a tool which is described
      but never installed — it reads as covered going forward, because it is on the
      list. Do it as an enumeration, not an impression: write the commands down.
- [ ] Nothing withheld except problem-solving; nothing given except orientation.
- [ ] Every link resolves to a file that exists in this repo, or to a stable external
      source.
- [ ] Prerequisites are world-conditions with links, plus concrete self-checks.
- [ ] No volatile fact asserted — pointed at source, learner determines current answer.
- [ ] No internal vocabulary (scaffolding, levels, profiles, core, delivery, rungs).
- [ ] No time estimates. No exclamation marks. No assumed learner or journey position.
- [ ] House style holds (PRINCIPLES.md "Voice and style"): no quips, asides, or a
      second authorial voice; excitement only via concrete specifics.
- [ ] "Before you start" ends with the standard stuck-pointer sentence (plus at
      most one lesson-specific reference-page clause).
- [ ] Every "New tools" entry links to that tool's real documentation, or names the
      manual page where that is the authority. Naming a site in prose without linking
      it does not count.
- [ ] Audience separation holds: pages referenced by title, never filename; no
      mention of this project's files, folders, or machinery.
- [ ] Learner work goes to the learner's logbook or their own projects — never into
      this repo. Predict sections prompt the logbook by name.
- [ ] Closing section is titled "What you have now".
- [ ] The guided delivery does not link or refer to the reference version anywhere,
      including its opening paragraphs (PROFILES.md, `reference` profile).
- [ ] Where-to-run labels: if the lesson's commands run in more than one place,
      every code block carries one and the wording matches the core. If they all run
      in one place, there are none.
- [ ] Every pronoun has an unambiguous referent.
- [ ] The title is descriptive: it names the lesson's contents plainly enough to
      predict them from a scanned list (PRINCIPLES "Titles and granularity").
- [ ] Every term defined at first use.
- [ ] Ends with something observable, ideally visible to other people.
- [ ] Hint ladders collapsed, ordered, and consistent with the scaffolding level.
- [ ] Render-checked locally in the site (`site/README.md` has the one command) —
      hint blocks collapse, links resolve, nothing renders oddly. Markdown must stay
      compatible with both the site and GitHub's renderer; don't use
      generator-specific syntax.

---

## 5. Add or revise a reference page

Trigger: a transferable-craft topic (debugging, documentation habits, diagnostic
method) keeps coming up across lessons and has no home.

1. Read the "Reference pages" section of `PRINCIPLES.md`. Confirm the topic is a
   real recurring need, theme-neutral, and about process rather than any module's
   subject matter. If it's module-specific, it belongs in that module's lessons.
2. Write `reference/<name>.md` (kebab-case, no numbers). Short and skimmable;
   house style; nothing withheld; refer to other pages by title.
3. Add the page to the Reference section in `site/sidebars.js`.
4. If an existing lesson's territory makes the new page unusually relevant, add
   the one-clause pointer to that lesson's stuck-sentence — sparingly.

---

## Consistency rules (all workflows)

- Deliveries are regenerated, not hand-forked. It's fine to hand-fix a typo; anything
  substantive goes into the core in the same sitting.
- `.llm/` is historical reference from early design sessions and is gitignored. Where
  it disagrees with `authoring/`, `authoring/` wins.
- Learner-facing top-level files (`README.md`, `HOW-TO-LEARN.md`, `PATH.md`) follow the
  same tone rules and checklist spirit as deliveries.
- When `PRINCIPLES.md` or `PROFILES.md` changes, list the deliveries the change touches
  and regenerate them before ending the session.
