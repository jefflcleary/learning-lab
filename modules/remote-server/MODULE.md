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

### Part 4 — How changes travel (planned, not written)

**This was designed in detail and has not been built. It was recorded in
`modules/minecraft-server/MODULE.md` and was deleted by accident during the module
split; it is restored here, where it now belongs.**

| Lesson | Goal | Status |
|---|---|---|
| *(unnamed)* | The two flows; staging as a rehearsal; an irreversible change tried on a copy of production first; a rollback drill; backups running off the box on a schedule | designed, not written |

The spine is an asymmetry that the git lesson already half-draws:

- **Up (your machine → production)** — the things the learner authored: datapacks,
  scripts, `server.properties`, `whitelist.json`. If lost, they can be written again.
  There is a canonical copy somewhere and production gets a copy of it.
- **Down (production → your machine)** — the world. Nobody can rewrite the base a
  friend built. It exists in one place, and that place is production.

"Code goes up, data comes down" is the same rule as every web application with a
database, arrived at from a Minecraft world rather than asserted. It composes with
`modules/minecraft-server/lessons/git-for-your-server/`, whose "Draw the line between
code and data" section already makes the learner write that line into a `.gitignore` on
one machine; this lesson cashes it in across two.

**The vocabulary, settled in design and written nowhere yet.** Three nouns and one verb,
and the distinction that matters is fidelity to production:

| | What it is | World | Lifespan | Answers |
|---|---|---|---|---|
| dev machine | a computer | — | — | where things get written |
| sandbox | an expendable server | empty, its own | permanent | "does my thing work at all?" |
| production | the family server | the real one | forever | — |

**Staging is a verb, not a fourth noun.** "Rehearse it on a copy of production first."
At family scale that is literally what it is: a copy run locally for an afternoon and
deleted. Naming a permanent fourth box would teach a ceremony nobody at this scale
performs. The load-bearing point: a sandbox cannot tell you whether a version upgrade
will eat the chests in the family base, because it does not have those chests. Only a
copy can.

**The intended irreversible change is a Minecraft version upgrade** — genuinely one-way
by design, already familiar from `modules/minecraft-server/lessons/choosing-a-version/`,
and exactly the change nobody should make live. Shape: copy production's world down,
upgrade the copy, look at what happened, throw the copy away, then decide with evidence.
This is also the lesson's break-it-on-purpose section, and it is the first time breaking
something on purpose *requires* a copy rather than the expendable server — which is the
sandbox-versus-staging distinction landing on its own instead of being asserted.

## Open decisions this module has not resolved

- **The git remote.** The steady-state loop is edit → commit → push → ssh → pull →
  restart, and there is nowhere to push: `git-for-your-server` is deliberately local-only
  and puts GitHub in its Go further section. Three ways out, with the recommendation
  recorded at the time: **(a)** promote GitHub to required — the standard shape, gets an
  off-site copy of everything authored, and reuses the SSH keys made in
  `renting-a-machine` the same day; **(b)** make the box itself the remote via a bare
  repo and a `post-receive` hook — no third party, but push-shaped and a shape the
  learner would have to unlearn; **(c)** drop git from the deploy and rsync the code like
  the world — simplest, but the box then has no history and no way to answer "what
  version is running?". **(a) was the recommendation, with (b) as a Go further.** Also
  undecided: whether `git-for-your-server` grows a required GitHub section, or the new
  lesson declares it a prerequisite. The former was preferred, since that lesson already
  closes on "your history is trapped on one machine".
- **A wording collision to resolve when the lesson is written.**
  `modules/minecraft-server/lessons/choosing-a-version/` currently lumps "staging or
  development" together as one loose phrase for "the place you try things". That is
  honest where it sits — everything is on one machine at that point — but it collides
  with giving staging a precise meaning. Cheapest fix is trimming that line to
  "development"; do not touch it until the new lesson's wording exists.
- **An inconsistent rule in `git-for-your-server`'s core**: "Do not walk GitHub
  signup/auth in any delivery." This module walks provider signup, so the rule as
  written is inconsistent across the lab. It should probably become "don't reproduce
  screenshots or exact click paths for signup flows; walk the decisions and point at the
  vendor's docs" — a rule both lessons can follow.

---

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
