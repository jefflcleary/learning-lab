# Delivery profiles

A profile describes an audience and a style. A delivery is a lesson core rendered for
one profile. Profiles are defined here, once, so that every lesson's deliveries mean the
same thing.

Profiles are archetypes, never real people. They describe a *kind* of reader — their
familiarity, their wants — and no profile is tied to, named for, or maintained in
sync with any actual human. Different modules may serve the same profile to entirely
different learners.

Profile names are internal vocabulary and never appear inside learner-facing text (the
filename is the only place a learner sees them).

Profiles are also the **only** sanctioned mechanism for style variation. The house
style in `PRINCIPLES.md` ("Voice and style") governs everything; a profile may define
deliberate deviations (the `reference` profile's terseness is one), and any such
deviation is written down here, not improvised per page.

---

## Dimensions

Every delivery is the product of two dimensions:

- **Style** — who is reading and how much support they want. Defined below.
- **Platform** — which operating system the instructions assume, where it matters.
  Each module's `MODULE.md` states its current platform scope (the
  minecraft-server module: macOS only, for now). Lesson cores tag
  platform-specific facts (`[macos]`, `[windows]`) so other platforms can be
  generated later without re-research. When a second platform is generated, the
  naming convention will be decided then (likely `guided.windows.md`); do not
  invent one ad hoc.

Profiles are lab-wide definitions, but modules choose which they use — and a new
module aimed at a different student or learning style may define new profiles
here (per the module workflow in `WORKFLOWS.md`) rather than bending `guided`
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
- Includes the "What you have now" list, so the state matches what other lessons
  expect regardless of which delivery was followed.
- Volatile facts: same rule as everywhere — point at the source.
- **The `guided` delivery never links to, advertises, or mentions the `reference`
  version.** Offering a shortcut in the opening paragraphs of a lesson invites a reader
  to skip the thing they came for, and it did exactly that in an earlier draft where
  every setup-heavy lesson opened with the offer. Reference deliveries are discoverable
  where they belong — the Quick references section of the module — and the reader who
  needs one is by definition not the reader being taught. The link the other way, from
  a reference back to its teaching version, is fine and should stay.

---

## Adding a profile

Add profiles only when a real reader wants one — never speculatively. To add one: define
it here (audience, file name, rendering rules), then generate it per the delivery
workflow for whichever lessons need it. A profile nobody reads is maintenance debt.

Candidate profiles discussed but deliberately not built yet: a Windows-platform variant
of each style; a "already knows another language" style for a learner arriving with
Python or similar.
