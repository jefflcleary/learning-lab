# Deciding who gets in

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** locking-the-door
- **Part:** Part 2 — Letting people in
- **Scaffolding:** level 2 — deliberately a short lesson; goals plus hints,
  concepts named but not applied
- **Deliveries:** guided only (short, nothing setup-heavy; the reference reader
  who opened the door in `joining-from-outside/reference.md` is pointed at the
  whitelist there as a same-day obligation and can execute from the wiki)
- **Status:** ready

## Goal and payoff

The server is reachable from the internet; this lesson makes it reachable *by the
right people only*. The learner turns on the whitelist, adds their real friends,
and proves a non-listed account bounces. Under it sits the pair of ideas worth
half of computer security: authentication (who are you, verified) and
authorization (what are you allowed to do), met here with a concrete example of
each. Payoff: an open door with a guest list — public enough for friends, closed
to strangers, provably.

## Prerequisites

- People can reach your server from outside your home network — established by
  `lessons/joining-from-outside/`
- At least one real outside player (their account name spelled exactly), and
  ideally a willing volunteer for the bounce test

## Establishes

- The whitelist is on, `online-mode` is on, real friends are listed, and a
  non-listed account has been *observed* to bounce
- Cited by other cores as: "your server has a whitelist and you know how to add
  and remove people — established by `lessons/locking-the-door/`."
- The words authentication and authorization, attached to a lived example
- The standing rule later arcs rely on: `online-mode=true` on any server
  strangers can reach; a server with it off never gets exposed to the internet

## Facts

- The whitelist is the server's guest list: when it's on, only listed account
  names can join. Controlled by:
  - `white-list=true` in `server.properties` [verify exact key name — deliveries
    point at the minecraft.wiki `server.properties` page rather than asserting]
  - Console commands: `/whitelist on`, `/whitelist off`, `/whitelist add <name>`,
    `/whitelist remove <name>`, `/whitelist list`, `/whitelist reload` [verify
    exact subcommands — point at the wiki's commands page]
  - The list itself lives in `whitelist.json` in the server folder — readable,
    like everything else in there
- `enforce-whitelist` in `server.properties` [verify]: affects *when* removal
  bites — whether players already online who aren't on the list get kicked, or
  only blocked at their next join. Exact behavior is the break-it: the learner
  observes rather than being told.
- Operators: `/op <name>` grants server-admin power; recorded in `ops.json`.
  Ops have levels of power (there is an `op-permission-level` setting [verify])
  — the wiki documents what each level allows. House rule stated plainly: guests
  don't get op. Op is admin of the world — kick, ban, change rules, break
  things; the whitelist decides who may *enter*, op decides who may *govern*.
- Whether ops bypass the whitelist is deliberately not asserted — it's the
  first break-it experiment. [verify — historically vanilla ops can join a
  whitelisted server without being listed; do not spoil in deliveries]
- `online-mode=true` (the default, met by name in `lessons/server-settings/` and
  deliberately left alone there): on every join, the server checks the joining
  account against Mojang's account system — proof the joiner really owns that
  name. With it on, names can't be faked, which is what makes a list of names
  worth anything. With it off, anyone can claim any name — including a listed
  one — and the whitelist becomes decoration.
- Consequence, stated as a standing rule: keep `online-mode=true` on any server
  strangers can reach. A later part of the module sets up a separate practice
  server that turns the check off (bots connect this way) — that server must
  never be exposed to the internet. [core note: this connects forward to
  `lessons/first-bot`, which states `online-mode=false` as a sandbox condition;
  learner-facing text states the rule without naming the unwritten lesson]
- The refusal a non-listed player sees is observed, not quoted [verify wording
  varies by version].
- Whitelist changes via console commands apply live — no restart needed (unlike
  `server.properties` edits). The commands-vs-file split maps onto the
  memory-vs-disk story from `lessons/server-settings/`.

## Arc

### Orientation — given plainly

The situation named: the door to the internet is open; the missing piece is
deciding who gets through it. The whitelist explained as a guest list, with the
console commands and the `server.properties` key both named, and the wiki
(`server.properties` page, commands page) given as the authoritative reference
for exact names — reading a reference for exact syntax is by now an established
move. `online-mode` finally explained properly (it was met and deliberately left
alone in `../server-settings/`): the server checks each joiner against Mojang's
account system, so a name on your list can only be used by the person who owns
it. Ops revisited one layer deeper: entering vs governing, `ops.json`, don't op
guests.

### Predictions to elicit

- You're op. You remove *yourself* from the whitelist while it's on. Can you
  still join?
- A friend is online when you remove them from the list. What happens — kicked
  on the spot, or fine until they next try to join?
- Where do you think the guest list is stored? (You know how this server keeps
  its decisions by now.)

### The work — goals and hint ladders

1. **Turn the guest list on and load it.** Goal: whitelist on, every real
   player listed, verified with `/whitelist list`. Exact command syntax comes
   from the wiki's commands page — finding exact syntax in a reference is the
   established move, not a puzzle.
   - Rung 1: two ways exist — a `server.properties` key and a console command.
     One of them needs a restart and one doesn't; you know why from the
     memory-vs-disk story (`../server-settings/`).
   - Rung 2: the console route: `/whitelist on`, then `/whitelist add` per
     person, `/whitelist list` to verify. Names must match accounts exactly.
2. **Prove the bounce.** Goal: watch a non-listed account fail to get in, from
   both sides — the joiner's screen and the server log. Use an alt account if
   one exists, or temporarily remove a willing volunteer and have them try.
   Restore them after. The proof matters: an access control that's never been
   seen to refuse anyone is a hope, not a lock.
3. **Read the list itself.** Goal: find where the whitelist lives in the server
   folder and open it. It's a file (`whitelist.json` [verify]) — a new shape of
   settings file (JSON) noticed in passing, not taught here. Also open
   `ops.json` while nearby: the govern-list, same idea. Don't op guests: op is
   admin of the world, not a favor.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Lock yourself out — maybe.** While op, `/whitelist remove` yourself,
  disconnect, and try to rejoin. Predicted first. Whatever happens is a
  measured fact about how op and whitelist interact — worth owning before it
  matters. Undo: add yourself back (the console works regardless — it's on the
  server, not in the game).
- **Removal timing.** With a willing volunteer online, remove them from the
  list and watch: kicked now, or fine until next join? Then find
  `enforce-whitelist` on the wiki's `server.properties` page and reconcile what
  you observed with what it says — and try flipping it. Undo: re-add the
  volunteer, apologize with something in-game.
- Both experiments answer "when does the lock actually bite?" — the difference
  between a rule existing and a rule being enforced, which is a distinction
  computers force you to be precise about.

### What just happened — the explanation

Two different questions got answered on every join tonight, and they have
names. *Who are you?* — answered by `online-mode`: the server checked the
joining account against Mojang's records, so the name presented is provably the
account that owns it. That's **authentication**: identity, verified. *What are
you allowed?* — answered by the whitelist (may you enter?) and the ops list
(may you govern?). That's **authorization**: permissions, granted. The two are
different jobs, and the order matters: authorization is only as strong as the
authentication under it, because permissions granted to a name mean nothing if
names can be faked — a guest list is worthless at a door where nobody checks
faces. That's precisely why `online-mode` stays on for any server strangers can
reach, and why, much later, when a practice server turns that check off for
good reasons, the rule is that such a server never gets exposed to the
internet. Nearly every login screen, permission dialog, and "you don't have
access" message in computing is one of these two questions being asked or
answered — the learner now owns both words with a lived example each.

### Go further — open questions

- There's also `/ban` and a banned-players file. A ban list says "everyone
  except these"; a whitelist says "no one except these." When is each the
  right tool? What do big public servers use, and why?
- The wiki documents op permission *levels*. What can a level-1 op do that a
  regular player can't? What can level 4 do that level 3 can't? Is there a
  level you'd be comfortable giving a friend?
- Account names can be changed by their owners. What happens to your whitelist
  when a listed friend renames their account — does the entry follow them or
  break? Look inside `whitelist.json` for a clue about what's *really* stored.
- Genuinely open: your whitelist works because Mojang's account system vouches
  for names. What would it take to build access control that doesn't depend on
  *any* company vouching for identities? People have tried for decades — what
  exists, and why hasn't any of it simply won?

## Delivery notes

- **guided:** deliberately shorter than neighbors — one job, done well, plus
  the two named ideas. Don't pad. The bounce test is the observable payoff;
  make sure the delivery treats "watch it refuse from both sides" as the
  moment.
- Never assert exact command syntax, key names, or refusal wording — point at
  the wiki (`server.properties` page, commands page) and let the learner
  confirm. The command list in facts is for authors.
- Don't spoil either break-it outcome (op-bypasses-whitelist,
  removal-timing/enforce) — both are measurements the learner should own.
- The online-mode-off rule must appear without naming or linking the future
  bot lessons (they may not exist yet when this is read) — state it as a
  standing rule about exposed servers.
- Keep the security framing calm and concrete: a guest list, a face check, no
  drama.
