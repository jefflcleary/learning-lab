# Delivery profiles

A profile describes an audience and a style. A delivery is a lesson core rendered for
one profile. Profiles are defined here, once, so that every lesson's deliveries mean the
same thing.

Profile names are internal vocabulary and never appear inside learner-facing text (the
filename is the only place a learner sees them).

---

## Dimensions

Every delivery is the product of two dimensions:

- **Style** — who is reading and how much support they want. Defined below.
- **Platform** — which operating system the instructions assume, where it matters.
  Each curriculum's `CURRICULUM.md` states its current platform scope (the
  minecraft-server curriculum: macOS only, for now). Lesson cores tag
  platform-specific facts (`[macos]`, `[windows]`) so other platforms can be
  generated later without re-research. When a second platform is generated, the
  naming convention will be decided then (likely `guided.windows.md`); do not
  invent one ad hoc.

Profiles are lab-wide definitions, but curricula choose which they use — and a new
curriculum aimed at a different student or learning style may define new profiles
here (per the curriculum workflow in `WORKFLOWS.md`) rather than bending `guided`
to fit.

---

## Style: `guided`

**File:** `guided.md` — this delivery always exists for every lesson.

**Audience:** someone new to programming and to computing fundamentals, working through
the material on their own. Fast learner, unfamiliar with the invisible basics (working
directory, file types, PATH, dependencies). Assume intelligence and assume
unfamiliarity.

**Rendering rules:**

- Full section structure from `PRINCIPLES.md` ("Learner-facing lesson structure").
- Hint ladders rendered as collapsed `<details>` blocks, in rung order.
- The amount of visible reasoning follows the scaffolding level recorded in the core:
  level 1 shows reasoning throughout, level 2 gives goals plus hints, level 3 gives
  goals and success criteria only.
- Concepts named at the moment of friction, one layer deeper than strictly required.
- Volatile facts pointed at, never asserted.
- Tone per `PRINCIPLES.md`: generous, unhurried, no cheerleading.

## Style: `reference`

**File:** `reference.md` — generated for lessons where someone experienced needs to
execute the same material, typically anything setup-heavy. Not every lesson has one.

**Audience:** an adult comfortable with computers and the command line, doing the work
themselves — often so a learner doesn't have to sit through plumbing. Wants commands,
paths, decisions, and gotchas. Does not want pedagogy.

**Rendering rules:**

- Terse. Bullets and code blocks over prose. No predict sections, no hint ladders, no
  break-it-on-purpose.
- Still states *what* each step does in a line — terse is not cryptic.
- Includes every gotcha and safety fact from the core (the reference reader hits the
  same landmines).
- Includes the "what this leaves behind" list, so the state matches what other lessons
  expect regardless of which delivery was followed.
- Volatile facts: same rule as everywhere — point at the source.

---

## Adding a profile

Add profiles only when a real reader wants one — never speculatively. To add one: define
it here (audience, file name, rendering rules), then generate it per the delivery
workflow for whichever lessons need it. A profile nobody reads is maintenance debt.

Candidate profiles discussed but deliberately not built yet: a Windows-platform variant
of each style; a "already knows another language" style for a learner arriving with
Python or similar.
