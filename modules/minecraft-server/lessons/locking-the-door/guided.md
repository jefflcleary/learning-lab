# Deciding who gets in

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your server can be reached from the internet. This session adds the missing
piece: deciding who gets through. It's a short one — one job, done properly —
and by the end your server will be public enough for your friends and provably
closed to everyone else.

The tool is a guest list called the whitelist, and it's simple. What's under it
is not simple, and is worth meeting here, on a server you run, with people you
know: the two questions behind roughly half of all computer security — *who are
you?* and *what are you allowed to do?* Tonight your server asks both, and you
get to watch.

---

## Before you start

You need:

- **A server people can reach from outside your home network.** [Opening the
  door to the internet](../joining-from-outside/guided.md) gets you there. Quick check:
  an outside friend can join your world through whichever route you set up.
- **Your players' exact account names** — the whitelist matches names exactly,
  so collect them spelled precisely. Quick check: each name matches what the
  server log showed when that person last joined.
- **Ideally, a willing volunteer** — proving the lock works means watching it
  refuse someone, and a friend who agrees to be temporarily bounced is the
  cleanest way. An alt account works too.

---

## What you'll have at the end

By the end of this session you will have:

- The whitelist on, with every real player listed
- Watched a non-listed account get refused — from the joiner's screen and from
  the server log
- Found where the guest list actually lives in the server folder, and looked at
  the govern-list next to it
- Two words that describe half of computer security, each attached to
  something you watched happen on your own server

---

## New tools

**The whitelist** is the server's guest list: when it's on, only listed account
names can join. It can be controlled two ways — a key in `server.properties`,
and a family of console commands (`/whitelist` plus a subcommand: turning it on
and off, adding and removing names, listing who's on it). The exact key name
and subcommands are documented on the minecraft.wiki `server.properties` and
commands pages — you've used that wiki for exact syntax before, and that's the
move here too.

**`online-mode`, explained at last.** You met this key when you [read every
line of the settings file](../server-settings/guided.md) and deliberately left it alone.
Here's what it does: with `online-mode=true` — the default — the server checks
every joining account against Mojang's account system before letting the join
proceed. It's proof that the joiner actually owns the name they're presenting.
That check is what makes a list of *names* worth anything: with it on, a name
can't be faked; with it off, anyone can claim any name — including one on your
list — and the guest list becomes decoration. The standing rule that follows:
any server strangers can reach keeps `online-mode=true`. (Later in this module
you'll run a separate practice server that turns the check off for good
technical reasons — the rule for that kind of server is that it never gets
exposed to the internet.)

**Operators, one layer deeper.** You've been op on your own server since early
on. Op is a different kind of power than entry: the whitelist decides who may
*enter* the world, op decides who may *govern* it — kick players, change
rules, run any command. The op list lives in `ops.json` in the server folder,
and ops come in levels of power, documented on the wiki. The house rule,
stated plainly: guests don't get op. It isn't a favor or a rank — it's
administration.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- You're op. You remove *yourself* from the whitelist while it's on. Can you
  still join?
- A friend is online at the moment you remove them from the list. What
  happens — kicked on the spot, or fine until they next try to join?
- Where do you think the guest list is stored? You know by now how this server
  keeps its decisions.

---

## The work

### Turn the guest list on and load it

Goal: whitelist on, every real player added, and the server confirming the
full list back to you. Get the exact syntax from the wiki's commands page.

<details>
<summary>Stuck? Start here</summary>

Two ways exist: a key in `server.properties`, and a console command. One of
those needs a restart to land and one takes effect immediately — you know why
from [the memory-versus-disk story](../server-settings/guided.md). For tonight, the
console is the better tool.

</details>

<details>
<summary>The console route</summary>

In the server console: `/whitelist on` to enable it, `/whitelist add` with each
player's exact account name, and `/whitelist list` to hear the roster read
back. Names must match accounts exactly — the log lines from past joins are a
reliable source of correct spelling.

</details>

### Prove the bounce

A lock that has never been seen to refuse anyone is a hope, not a lock. Goal:
watch a non-listed account fail to get in — from both sides.

Use an alt account if one exists. Otherwise, temporarily remove your willing
volunteer (`/whitelist remove`), have them disconnect and try to rejoin, and
watch two screens at once: what the refusal looks like on their end, and what
the server log says about the attempt. Then add them back and confirm they get
in cleanly.

Notice what you just verified: the server heard the attempt, checked the list,
and said no — and said yes to the same person the moment the list changed.
That's the whole mechanism, observed end to end.

### Read the list itself

You predicted where the guest list is stored — go check. Look in the server
folder for it, and open it in VS Code.

It's a file, of course — this server keeps every decision in a file. The shape
inside is called JSON, and it's a settings format you'll get to know well
later; for now just notice you can read it. While you're there, open
`ops.json` next to it: the govern-list, same idea, shorter — and it should
stay shorter.

---

## Break it on purpose

Cause each one, watch, undo.

**Lock yourself out — maybe.** While op, remove yourself from the whitelist,
disconnect, and try to rejoin. You made a prediction about this; find out.
Whatever happens, you now own a measured fact about how op and the whitelist
interact — the kind of fact worth knowing *before* it matters. To undo, the
console always works: it's on the server, not in the game, so no whitelist can
lock you out of it. Add yourself back.

**Removal timing.** With your volunteer online, remove them from the list and
just watch: kicked immediately, or untouched until their next join? Compare
with your prediction. Then look up `enforce-whitelist` on the wiki's
`server.properties` page, reconcile what you observed with what it says, and
try flipping it to see the other behavior. Re-add your volunteer, and maybe
hand them something nice in-game for their trouble.

Both experiments are the same question in different clothes: *when does the
lock actually bite?* A rule existing and a rule being enforced are different
things, and computers force you to be precise about the difference.

---

## What just happened

Every join attempt tonight got asked two different questions, and they have
names worth keeping.

*Who are you?* — answered by `online-mode`. The server checked the joining
account against Mojang's records, so the presented name provably belongs to
the person presenting it. That's **authentication**: identity, verified.

*What are you allowed?* — answered twice, by two lists. The whitelist answers
"may you enter?" and the ops list answers "may you govern?" That's
**authorization**: permissions, granted.

They're different jobs, and the order matters. Authorization is only as strong
as the authentication underneath it, because permissions attached to a name
mean nothing if names can be faked — a guest list is worthless at a door where
nobody checks faces. That's exactly why `online-mode` stays on for any server
strangers can reach.

Nearly every login screen, permission popup, and "you don't have access"
message you will ever see is one of these two questions being asked or
answered. You now own both words, with a lived example of each, on a server
you run.

---

## Go further

- There's also `/ban`, and a banned-players file near the whitelist. A ban
  list means "everyone except these"; a whitelist means "no one except these."
  When is each the right tool? Which do big public servers use, and why?
- The wiki documents op permission *levels*. What can the lowest level do that
  a regular player can't? What can the highest do that the next one down
  can't? Is there a level you'd be comfortable giving a friend?
- Account names can be changed by their owners. What happens to your whitelist
  when a listed friend renames their account — does the entry follow them or
  break? The contents of `whitelist.json` hold a clue about what's *really*
  stored.
- Your whitelist works because Mojang's account system vouches for names. What
  would it take to build access control that doesn't depend on *any* company
  vouching for identities? People have tried for decades — what exists, and
  why hasn't any of it simply won?

---

## What you have now

- The whitelist is on, `online-mode` is on, your real players are listed, and
  you have *watched* a non-listed account bounce — the door is open with a
  guest list
- You can add and remove people on demand, live, from the console
- You know where the guest list and the govern-list live, and the house rule:
  guests don't get op
- Two words — authentication and authorization — attached to things you
  observed, plus the standing rule: any server strangers can reach keeps
  `online-mode=true`
