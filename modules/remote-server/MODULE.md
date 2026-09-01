# Module design — Running your server on a rented machine

The arcs, their milestones, the status of every lesson, and this module's own
constraints. This is the authors' map; the learner-facing rendering of the recommended
order is `PATH.md` (this folder). General method and format rules live in
`authoring/PRINCIPLES.md`; this file binds only this module.

Order here is recommended, never enforced. Every lesson must stand alone when read cold.

---

## The design brief

Split out of what was a single 766-line lesson in `modules/minecraft-server/`, which
introduced roughly ten new concepts — SSH, key pairs, root, sudo, apt, a firewall,
rsync, systemd, a billing model — in one sitting. That was too much for one lesson and
the split was overdue.

The founding observation: everything the learner has built so far runs on a computer
that belongs to somebody, sits somewhere, and gets used for other things. Every
improvement to availability up to this point has been a way of working around that one
fact. This module removes the fact instead.

The payoff the whole module drives at, and the closing image: the learner shuts their
laptop, carries it out of the room, and their friends keep playing.

The lesson under the lessons: "the cloud" is a rented computer. Everything here — a
shell on a machine you cannot see, a user that isn't root, a firewall, a service file,
copying files over a network — is what running any internet service consists of,
whether it serves a game, a website, or a bank.

**Minecraft-flavoured on purpose.** An earlier plan made this module theme-neutral, on
the grounds that the skills are general. The decision went the other way: the social
payoff — friends playing on a machine nobody in the house owns — is the motivational
engine, and a generic "run your program on a server" module would have traded it for
nothing the learner needs yet. The skills transfer regardless; the lessons say so where
it matters.

---

## Module-specific constraints

- **Platform scope: macOS deliveries only, for now**, on the learner's own side. The
  rented machine is Linux and platform-neutral. Cores tag platform-specific facts
  `[macos]` / `[windows]`.
- **Never assert a provider's screens, prices, plan names, or menu wording.** Walk the
  decisions, point at the provider's own documentation, use no screenshots. Console
  layouts change and screenshots rot faster than anything else in a lesson.
- **The provisioning contract.** The provider-specific part of this module ends at a
  stated exit condition, given verbatim in the deliveries:

  > You have a machine running Ubuntu LTS, you know its public address, and you can
  > open a terminal on your Mac and get a command prompt on that machine.

  Everything after that is identical on any provider. This is what lets the named
  provider change — it has changed twice already — without touching the rest, and what
  would let a physical machine on a shelf be substituted later.
- **Money is content, not fine print.** What it costs, which billing model it is on,
  and where the off switch lives. Never trimmed for length.
- **The account-holder is not assumed to be the learner** and is never called a parent,
  a household, or anything else. "Someone able to open an account" is the phrasing.
- **Lockout hazards are stated as standing rules before the steps that trigger them**,
  never as warnings afterwards, and the rescue path is rehearsed before it is needed.

---

## Parts

### Part 1 — Getting a machine

| Lesson | Goal | Status |
|---|---|---|
| `renting-a-machine` | A key pair; a rented Ubuntu machine; SSH in and read what you rented; what it costs and where the off switch is | core + guided + reference written |

Payoff: a computer the learner has never seen, in a building they will never enter,
answering when they type at it.

### Part 2 — Making it yours

| Lesson | Goal | Status |
|---|---|---|
| `locking-the-front-door` | A user that isn't root, sudo, password and root logins closed, the strangers in the log read, a firewall — and the provider's rescue console proved before the deliberate lockout | core + guided + reference written |

Payoff is unusual for this lab and worth keeping: the payoff is *seeing something
alarming and understanding why it is fine*. Strangers have been trying to log in since
the machine existed, and the defence was never a wall.

### Part 3 — Moving in

**Milestone: friends outside the house play on a machine nobody in the house owns,
while the learner's own computer is switched off.**

| Lesson | Goal | Status |
|---|---|---|
| `moving-the-server-across` | Java installed; a fresh backup; the server folder copied up with rsync; the port opened; the server started by hand and joined | core + guided + reference written |
| `keeping-it-running` | A systemd unit; enable versus start; the reboot test; the whitelist checked; friends cut over; the laptop shut | core + guided + reference written |

The milestone lands in `keeping-it-running`, and it lands as a gesture rather than a
claim: shut the laptop, carry it out of the room, nothing happens.

---

## Cross-cutting decisions

- **Provider: OVHcloud, with DigitalOcean named as the alternative.** The choice moved
  twice on measured prices; the record, with figures and dates, is kept in
  `lessons/renting-a-machine/core.md` so the next author can see the reasoning rather
  than guess at it. The exit condition above is what made those moves cheap.
- **systemd is explained from nothing.** `modules/minecraft-server/lessons/always-on/`
  is deliberately *not* a prerequisite. For a reader who met launchd there, the parallel
  is drawn as an aside; for one who did not, nothing is missing. This module does answer
  that lesson's closing open question — "what would it take to run this on a machine you
  never see and never log into?" — and may say so in a way that reads cold.
- **Where-to-run labels throughout.** Commands run in two places all module long, so
  every code block carries one, per `authoring/PRINCIPLES.md`. Two place-names, used
  verbatim and nowhere varied: **On your Mac** (local variant) and **On the rented
  machine** (remote variant).
- **Every lesson gets a reference delivery.** The whole module is setup-heavy, and Part
  1 in particular may be executed by an adult days ahead of a learner's session.
- **This module and `modules/server-performance/` are siblings, not sequels.** That
  module cites `renting-a-machine` and `keeping-it-running` as world-conditions; neither
  depends on it.
