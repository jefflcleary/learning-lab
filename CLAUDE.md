# Guide for LLM sessions working in this repo

This repo is a general-purpose, self-directed learning lab: hands-on curricula that
teach computing (programming, networking, operating systems, engineering) by doing
things to real systems. Learner-facing material is markdown, readable both rendered
by the site in `site/` and directly on GitHub. Content is written and maintained
with LLM assistance in sessions like the one you are in now.

A **curriculum** is an ordered set of lessons linked by a theme, under
`curricula/<name>/`. The first is `minecraft-server`; others (different topics,
different students, different learning styles) are expected. Everything about *how*
material gets written is encoded in `authoring/`. Read the relevant docs there
before producing or changing any content.

## Map

| Path | What it is | Audience |
|---|---|---|
| `README.md`, `HOW-TO-LEARN.md`, `walls.md` | Lab-wide top-level files | Learner |
| `curricula/<name>/README.md` | The curriculum's front page | Learner |
| `curricula/<name>/PATH.md` | That curriculum's suggested order | Learner |
| `curricula/<name>/CURRICULUM.md` | That curriculum's design: arcs, milestones, lesson status, curriculum-specific constraints | Authors |
| `curricula/<name>/lessons/<slug>/core.md` | Lesson core: all substance + internal notes | Authors |
| `curricula/<name>/lessons/<slug>/guided.md`, `reference.md`, … | Deliveries generated from the core | Learner |
| `authoring/PRINCIPLES.md` | The general teaching philosophy, format rules, failure modes | Authors |
| `authoring/WORKFLOWS.md` | Step-by-step procedures for every authoring task | Authors |
| `authoring/PROFILES.md` | Delivery profile definitions | Authors |
| `authoring/IDEAS.md` | Holding ground for raw ideas, unstructured | Authors |
| `site/` | Docusaurus site for reading the content locally (see `site/README.md`) | Authors/infra |
| `.llm/` | Gitignored. Historical context from early sessions. Reference only — committed docs are authoritative where they differ. | — |

## Routing: what the user asks for → what you do

- **"Here's an idea for something to teach"** → append it to `authoring/IDEAS.md`
  (idea-capture workflow). Do not structure it or build it unless asked.
- **"Create a curriculum on X"** → curriculum workflow in `authoring/WORKFLOWS.md`:
  creates `curricula/<name>/` with README, PATH, CURRICULUM, then lesson cores on
  request.
- **"Create a lesson on X"** → find its home curriculum (extend or create one via
  the curriculum workflow if needed — never write a lesson before the arc it
  belongs to exists), then lesson-core workflow, then delivery workflow.
- **"Generate / regenerate the guided (or other) version of X"** → delivery
  workflow.
- **"Change how lessons are written"** → update `authoring/PRINCIPLES.md` or
  `PROFILES.md`, then regenerate every affected delivery.

## Ground rules (summary — `authoring/PRINCIPLES.md` is authoritative)

- Orientation is given plainly; only problem-solving is withheld. Getting this
  backwards is the number-one historical failure mode.
- Deliveries are **generated from `core.md`**, never authored independently. A fix
  worth making in a delivery is a fix to make in the core, then regenerate.
- Never reference a lesson, tool, or setup step that doesn't exist yet.
- No numbers in filenames. No time estimates. No personalization — no assumed
  learner, household, or position in a journey. Material must work read cold.
- Internal vocabulary (scaffolding levels, profile names, "core", "delivery") never
  appears in learner-facing text.
- Curriculum-specific constraints (language choices, platform scope, toolchain
  stance) live in that curriculum's `CURRICULUM.md`, not in global docs.
- **Course tooling is never lesson content.** The site, CI, and authoring machinery
  stay out of curricula entirely.
- Render-check content changes locally with the site (`site/README.md`) before
  calling them done; markdown must render correctly both there and on GitHub.
- Decisions are only ever the current contents of these committed docs. Do not
  treat earlier drafts, `.llm/` files, or past conversation turns as binding
  precedent — when the user revises a decision, update the docs and move on.
