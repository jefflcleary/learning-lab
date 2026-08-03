# Choosing which Minecraft version your server runs

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** choosing-a-version
- **Part:** cross-cutting; recommended before Part 4 (bots), readable any time
- **Scaffolding:** level 1 for the research skill (first source-checking lesson)
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

A deliberate, written-down decision about which version(s) the learner's server runs,
made from current information the learner gathered at the source. Two payloads under
the surface: (1) the research skill — finding the present state of a project from its
README *and* issue tracker rather than trusting a page; (2) the dev/prod distinction,
*discovered* as the natural answer to "but I want the newest version," never
asserted up front.

## Prerequisites

- A server you can start and stop — established by
  `lessons/running-your-own-server/`
- Knowing which version their friends play on (ask them — matters more than
  anything else)

## Establishes

- A recorded decision (with reasoning) about which version(s) run, in the learner's logbook
- A written note of what mineflayer supported on the date checked
- Experience reading an issue tracker as the more-current source
- Cited by other cores as: "you've decided your version setup — established by
  `lessons/choosing-a-version/`."

## Facts

- Version compatibility is strict: client version must match server version. Not
  relaxable; enforced at connection.
- Nearly all of this module is version-independent (settings, console, networking,
  backups, logs, dashboards). **Community tools are the exception** — they speak the
  protocol by hand and must be updated per release, so they lag.
- **mineflayer**: library that connects to a server and plays as a programmable
  player; the centerpiece of the bot arc. Project: `PrismarineJS/mineflayer` on
  GitHub. Supported range [volatile as of 2026-07: 1.8–1.21.11, rejects 26.x] —
  deliveries never assert this; the learner determines it from README + issues.
- GitHub orientation facts: README = front page, issues = reported problems +
  maintainer discussion, issues more current than README; GitHub hides closed
  issues by default — clear the `is:open` filter to see everything.
- Protocol version: first thing a client sends; mismatch → instant refusal before
  any world data. New blocks/entities change message shapes; old code would
  misread new messages, so it isn't allowed to try. This is *why* tools lag: shape
  changes must be reverse-engineered per release, usually by volunteers.
- The three legitimate setups: newest-only (no bots until tools catch up),
  older-only (bots now; everyone downgrades to join), both (family world on
  newest + expendable sandbox on a supported older version). The third is what
  most people do; its reasoning is the dev/prod payload.
- Launchers can switch client versions from a version selector near the play
  button (older versions download on demand).
- For the later bot arc, the sandbox additionally needs `online-mode=false`
  (bots skip Microsoft auth) — deliberately NOT part of this lesson; recorded here
  so the first bot lesson states it as a condition.

## Arc

### Orientation — given plainly

Versions and the match requirement; what community tools are and why they exist
outside Mojang; mineflayer named, described, explicitly *not* installed yet; GitHub,
README, and issues explained plainly. The framing sentence of the whole lesson: this
is about making the decision with current information — and about not trusting this
page, which could have been written a year ago.

### Predictions to elicit

- How long after a new Minecraft release before community tools support it? Days?
  Months?
- Why can't a tool just work with every version automatically?
- What does joining a mismatched server actually look like — clear error, confusing
  error, or half-working?

### The work — goals and hint ladders

1. **Find out what mineflayer supports, from the source.** Goal: the current
   supported range, and specifically whether it covers the version the learner's
   friends play.
   - Rung 1: search the project by name; it's developed in public; the site has a
     front page and a problem list — look at both.
   - Rung 2: README states a range near the top; issues say what's happening right
     now; if they disagree, issues win. Search issues for the friends' version
     number and read the maintainers.
   - Rung 3: `PrismarineJS/mineflayer`, Issues tab, clear the default search
     filter to include closed issues.
   - Record answer + date; the answer rots.
2. **See a version mismatch.** Goal: switch the client to a deliberately wrong
   version, attempt to join, read the refusal carefully, switch back.
   - Rung 1: version selector near the play button; pick something clearly far
     from the server's version; the error appears on join-attempt, not before.
3. **Make the decision.** All three setups presented as legitimate with honest
   costs (given plainly — this is orientation about the option space, not a
   puzzle). The dev/prod passage: surface the "experiments on the thing people
   depend on" reasoning *as a thing worth thinking about before picking*, then
   name production/development as the words professionals use for the idea the
   learner just arrived at. Decision + reasoning written into the logbook.

### Break it on purpose — failures to cause, undo, and read

- Rename the server jar, try to start it, read the error naming what it looked
  for; rename back. Pairing: the mismatch was two programs disagreeing on a
  language; this is a program not finding a file at all; both errors name exactly
  what they wanted — the read-the-whole-message habit generalizes.

### What just happened — the explanation

Protocol version handshake (why refusal is instant); message shapes changing with
content updates; why the lag is structural and volunteer-paced; today's lookup is a
snapshot of a moving target, which is why the source beats any page — including
this one.

### Go further — open questions

- How long did mineflayer take to support the last two releases — is the gap
  consistent, or update-size-dependent?
- Can community tools support snapshot versions? What makes that harder?
- Two servers on one computer at once: something must differ or one won't start —
  what? (Cross-seeded with `running-your-own-server`'s port break-it; a learner
  arriving from there already knows and gets the connection reward.)
- Cross-version joining: things exist that attempt it. What do they do, what do
  they give up? [Genuinely open — current state unknown to the authors too.]

## Delivery notes

- **guided:** flagged, unresolved: does the dev/prod naming passage ("the idea came
  first, the names came later, and you've just arrived at it on your own") read as
  talking down? Watch for reader reaction; candidate softening is to trim the last
  clause.
- The mismatch experiment needs a second bullet in Before-you-start if the learner
  arrived cold: any launcher with a version selector qualifies; keep as-is
  otherwise.
- Keep "don't take my word for it" phrasing — it's the lesson's spine.
