# Workflows

Step-by-step procedures for every kind of authoring task in this repo. Written primarily
for LLM sessions, usable by anyone. `PRINCIPLES.md` governs content; this file governs
process. When they seem to conflict, `PRINCIPLES.md` wins.

There are four workflows:

1. [Capture an idea](#1-capture-an-idea)
2. [Develop curriculum](#2-develop-curriculum)
3. [Create or revise a lesson core](#3-create-or-revise-a-lesson-core)
4. [Generate a delivery](#4-generate-a-delivery)

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

## 2. Develop curriculum

Trigger: a brand-new curriculum is requested ("a curriculum on learning JavaScript"),
an existing one needs a new arc, or a lesson idea has no home.

For a **new curriculum**:

1. Read `PRINCIPLES.md`. Settle with the user: the theme, the intended learner and
   learning style (this may mean new profiles — see `PROFILES.md`), the delivery
   mechanism (what real system the learner acts on), and the curriculum's own
   constraints (languages, platform scope, toolchain stance).
2. Scaffold `curricula/<name>/` (kebab-case, no numbers) with three files:
   `README.md` (learner-facing front page), `PATH.md` (suggested order — links only
   to lessons that exist, so it starts nearly empty), and `CURRICULUM.md` (authors'
   design doc: constraints, arcs, milestones, lesson status table).
3. Register the curriculum in the top-level `README.md` curricula list.

For **arcs and lessons within a curriculum**:

1. Read `PRINCIPLES.md` and that curriculum's `CURRICULUM.md`.
2. Place the new material: extend an existing part, or add a new part/arc. For a new
   arc, define:
   - The **milestone** — the payoff the arc drives toward, socially visible where
     the curriculum has an audience.
   - The rough lesson sequence as one-line stubs: working name, one-line goal,
     payoff, prerequisites as world-conditions.
   - Where it sits relative to existing parts in the recommended path (or that it's
     a standalone side-arc).
3. Check each stub against the general constraints in `PRINCIPLES.md` and the
   curriculum's own constraints in its `CURRICULUM.md`.
4. Update the curriculum's `CURRICULUM.md`. Update its `PATH.md` only when lessons
   actually exist to link to; the path document never links to lessons that aren't
   written.
5. Stubs are not lessons. Creating the cores is workflow 3, on request.

---

## 3. Create or revise a lesson core

Trigger: a lesson stub is ready to become real, or an existing core needs changes.

1. Read `PRINCIPLES.md` in full, especially the central rule and the failure modes.
   Read the home curriculum's `CURRICULUM.md` (constraints included) and confirm the
   lesson has a home. If not, do workflow 2 first.
2. Confirm every prerequisite is a condition established by a lesson that **exists**.
   If a prerequisite lesson is missing, stop and resolve that first (write it, or
   re-scope this lesson). Dangling references are a known failure mode.
3. Choose the folder name: short, descriptive, kebab-case, **no numbers**.
4. Write `curricula/<curriculum>/lessons/<name>/core.md` in the format below.
5. Verify the arc delivers something visible by the end, and that every fact a learner
   couldn't derive is in the facts section (orientation is never withheld).
6. Update the curriculum's `CURRICULUM.md` status for this lesson. Add it to that
   curriculum's `PATH.md` if it's in the recommended path.
7. On revision: after changing a core, regenerate every existing delivery of that
   lesson (workflow 4). A core and its deliveries are never allowed to disagree.

### core.md format

````markdown
# <Working title>

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** <folder name>
- **Curriculum / Part:** <curriculum name> — <part in its CURRICULUM.md>
- **Scaffolding:** level 1 | 2 | 3, and which skill this is the Nth lesson of
- **Deliveries:** which profiles get generated, and why
- **Status:** draft | ready | needs-regeneration

## Goal and payoff

What the learner can do/see at the end, and specifically what other people can see.

## Prerequisites

Conditions of the world, each with the lesson that establishes it:
- <condition> — established by `lessons/<name>/`

## Leaves behind

The world-state this lesson creates, phrased so other cores can cite it verbatim.

## Facts

Everything simply true: commands, paths, names, settings, URLs. Tag lines with
`[macos]` / `[windows]` where platform-specific and `[volatile as of <date>]` where
it changes without warning (deliveries point at the source instead of asserting).

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
4. Run the checklist below. Fix in the core, regenerate, re-check.
5. Set the core's status to `ready`.

### Delivery checklist

- [ ] Orientation complete: every tool named, explained, install stated plainly.
- [ ] Nothing withheld except problem-solving; nothing given except orientation.
- [ ] Every link resolves to a file that exists in this repo, or to a stable external
      source.
- [ ] Prerequisites are world-conditions with links, plus concrete self-checks.
- [ ] No volatile fact asserted — pointed at source, learner determines current answer.
- [ ] No internal vocabulary (scaffolding, levels, profiles, core, delivery, rungs).
- [ ] No time estimates. No exclamation marks. No assumed learner or journey position.
- [ ] Every pronoun has an unambiguous referent.
- [ ] Every term defined at first use.
- [ ] Ends with something observable, ideally visible to other people.
- [ ] Hint ladders collapsed, ordered, and consistent with the scaffolding level.
- [ ] Render-checked locally in the site (`site/README.md` has the one command) —
      hint blocks collapse, links resolve, nothing renders oddly. Markdown must stay
      compatible with both the site and GitHub's renderer; don't use
      generator-specific syntax.

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
