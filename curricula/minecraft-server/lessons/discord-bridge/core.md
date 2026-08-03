# Two worlds, one conversation

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** discord-bridge
- **Part:** Part 6 — Beyond the game
- **Scaffolding:** level 3 — a composition project. Every ingredient exists: RCON from
  Python (`../rcon-scripting/`), log tailing and parsing (`../reading-the-logs/`),
  event-driven chat handling and the self-trigger bug (`../bot-chat-commands/`).
  Delivery gives goals and success criteria only; hints are sparse and never
  problem-solving.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

One Python program that bridges a Discord channel and the Minecraft server's chat,
both directions: a message typed in Discord appears in game chat; chat typed in the
game appears in the Discord channel. Payoff: the family Discord and the Minecraft
server become one room — people nowhere near a computer talk with people standing in
the world, and if it runs on the always-on machine it just stays that way.

The real lesson at this level is architecture: this is the most multi-part system in
the course so far (one program, two live connections, plus a file watcher), and the
learner designs it on paper before writing a line.

## Prerequisites

- You can send commands to your server from Python over RCON, and you keep
  credentials in a file the code reads rather than in the code — established by
  `lessons/rcon-scripting/` (Python, pip, and the venv routine also live there and
  in `lessons/reading-the-logs/`; this lesson does not re-teach them)
- You can read `latest.log` from Python, pick out lines that matter, and keep
  reading as new lines arrive — established by `lessons/reading-the-logs/`
  (its go-further question about following a growing file becomes load-bearing here)
- You've written a bot that reacts to chat, and met the bug where a bot triggers
  itself — established by `lessons/bot-chat-commands/`
- A Discord server people in the household actually use. This is a condition of the
  world, not a lesson: anyone can create a Discord server free from inside the
  Discord app, and many households already have one. You need enough authority on
  that server to add a bot to it — either it's yours, or the person who runs it does
  this part with you.
- Your project folder is under version control with a `.gitignore` — established by
  `lessons/git-for-your-server/`
- Helpful for the payoff to persist: a machine where the server stays up —
  `lessons/always-on/`

## Leaves behind

- A bridge program connecting a Discord channel and the server's chat in both
  directions, runnable on the always-on machine
- The learner holds a Discord bot identity and its token, stored outside code and
  outside git — cited by other cores as: "you have a Discord bot with a token kept
  in a gitignored file — established by `lessons/discord-bridge/`."
- Words other lessons can use freely: API, token, intent (Discord's sense), webhook
  (named, not yet used), async / await (met at working depth, not lectured)
- The loop-prevention instinct: any program that both reads and writes the same
  channel of communication can feed itself

## Facts

- **Discord** is a chat service. People gather in "servers" (Discord's word — a
  named space with channels, unrelated to the Minecraft sense of server), and each
  channel is a running conversation. Discord runs on Discord's machines; every phone
  and desktop app is a client. Programs can be clients too, through Discord's public
  API.
- A **bot account** is an identity Discord issues for a program: it appears in the
  member list, can read and post in channels it's been allowed into, and
  authenticates with a **token** — a long generated string that is the bot's entire
  proof of identity. Whoever holds the token *is* the bot. It is a credential with
  the same standing as the RCON password, and stronger handling habits: never in
  code, never in git, revocable at any time from the place that issued it.
- Bot setup happens in Discord's **developer portal** and is documented in Discord's
  own developer documentation. [volatile as of 2026-07 — the portal's click-paths,
  page names, and the exact intent checkboxes change without warning. Deliveries
  never describe portal navigation; they point at Discord's developer docs and have
  the learner follow the current flow.] The shape that has been stable: create an
  application, give it a bot identity, copy the bot's token, generate an invite link
  scoped to the target server, and grant the bot permission to read message content
  (Discord gates this behind a setting it calls an intent — a declared reason to
  receive a category of events). [verify — intent names and which ones are
  "privileged" shift; the library's docs and Discord's docs are the sources.]
- **Library**: the widely cited Python library for Discord bots has long been
  discord.py. [verify / volatile as of 2026-07 — discord.py's history includes a
  maintenance pause in 2021 and several forks (pycord, nextcord, and others);
  which one is currently healthy is exactly the kind of fact that rots. Deliveries
  never assert the choice: the learner evaluates candidates from README and issue
  tracker, the same way mineflayer was evaluated in `../choosing-a-version/`.]
- discord.py working surface, for author reference [verify against the library's
  current docs; as of 2026-07]: `pip install discord.py`, imported as `discord`;
  a client object constructed with declared intents; events are functions declared
  `async def` (`on_ready`, `on_message`); sending is `await channel.send(...)`;
  `client.run(token)` starts the connection and blocks; repeating background work
  goes in the library's scheduled-task helper (`@tasks.loop(seconds=...)` in the
  `discord.ext.tasks` extension) rather than a bare `while True`.
- **Async, learner depth (one honest paragraph, no lecture):** the Discord library
  spends almost all its time waiting — for Discord to say something. Python's
  `async def` and `await` are how a function declares "I wait at these points, and
  while I'm waiting, other code in this program may run." The library requires its
  event handlers declared that way, and its docs show exactly where the words go.
  That's all the learner needs to proceed.
- **Async, author depth (one layer deeper, for hint-writing and troubleshooting):**
  the whole program runs on one event loop. Any ordinary blocking call — `time.sleep`,
  a blocking socket read, an unyielding `while True` — freezes everything, including
  the heartbeat the library sends Discord, and Discord will drop a bot that stops
  heartbeating. This is precisely why the log watcher must be the library's
  scheduled-task mechanism (which awaits between runs) and not a bare loop. If a
  learner's bot mysteriously disconnects after they add the log watcher, this is
  almost certainly why.
- **Discord→game** transport already exists: RCON. `say <text>` posts to game chat
  with a `[Server]` prefix; `tellraw @a <json>` allows custom text and formatting
  [verify tellraw JSON text-component shape against the minecraft.wiki page for the
  server's version — it has changed across versions]. `say` is the honest first
  step; `tellraw` is the formatting upgrade.
- **Game→Discord** transport already exists: `latest.log`. Player chat lands there
  as lines containing `<PlayerName> message text` [verify exact line shape against
  the learner's own log — prefix details vary by version; the learner already
  parsed these lines in `../reading-the-logs/`]. Following a growing file means
  tracking a **file position**: remember where reading stopped, and on each pass
  read from there to the end and update the marker.
- Log rotation: at server restart the log is rotated and `latest.log` starts over.
  A saved position larger than the current file size means the file was replaced —
  reset to the start (or the end, to skip history). Worth one sentence in the
  delivery as a known sharp edge, not a required goal.
- **The echo loop**: Discord message → bridge relays into game → the relayed line
  appears in the server log → log watcher posts it to Discord → the bridge's own
  Discord message triggers the relay again → forever. Two independent guards, and
  either alone suffices:
  - Ignore Discord messages authored by the bot itself (the message's author versus
    the client's own user — the same self-trigger fix from
    `../bot-chat-commands/`).
  - Match only genuine player-chat lines in the log. Text sent via RCON `say` is
    logged differently from player chat [verify by observation — deliveries have
    the learner compare the two log lines in their own file rather than asserting
    the shapes].
  Deliveries let the learner predict the loop before it can bite (they've met
  self-triggering before); if it bites anyway it's reversible — ctrl-C.
- **Secrets handling** (first-class subject here): the token goes in its own file
  next to the script — e.g. `discord_token.txt`, read at startup with a plain
  `open(...).read().strip()` — and that filename goes in `.gitignore` before the
  file is created. Standard-library file reading is entirely sufficient; the course
  adds no dependency for this. [verify — python-dotenv and `.env` files are a
  common convention in the wider world and may come up in the learner's searches;
  fine to acknowledge as "a convention you'll meet," not needed here.]
- **Token regeneration**: the developer portal can regenerate the token at any
  time; the old string stops being valid. What an already-connected bot does at
  that moment — and what a restart with the dead token looks like — is the break-it
  observation. [verify — whether an established gateway session survives until its
  next reconnect is an implementation detail that may change; the delivery has the
  learner observe both the running program and a fresh start, asserting neither.]
- **Channel permission removal**: taking away the bot's ability to speak in the
  channel does not disconnect it. The connection to Discord stays healthy; the
  specific *action* is refused, and the library raises an error naming forbidden
  access [verify exception name — discord.py has historically raised
  `discord.Forbidden`, carrying HTTP status 403]. This is the connected-but-refused
  shape, distinct from can't-connect.
- **Webhooks**: a Discord channel can issue a webhook — a URL such that posting
  data to it makes a message appear in the channel, no bot account, no standing
  connection. The lighter tool when traffic only flows *into* Discord. Named and
  pointed at (Discord's docs cover them); used only in go-further. [verify current
  webhook docs location — point by name, "webhooks" in Discord's developer or
  support docs.]

## Arc

### Orientation — given plainly

Both halves of the bridge already exist in pieces the learner built: Discord→game is
an RCON command; game→Discord is log lines they already know how to parse, posted
somewhere new. What's genuinely new is Discord's side of the handshake — a bot
account, its token, the current setup flow from Discord's own developer docs, a
library chosen by evaluation — and the fact that one program must hold two live
connections and a file watcher at once.

The async paragraph is given here, plainly, at exactly the depth in Facts. The
secrets discipline is given as orientation, not discovery: token in a file, file in
`.gitignore`, gitignore entry written *before* the token file exists.

The architecture step is mandatory and comes before any code: boxes and arrows on
paper. Boxes: the Discord service (their machines), the bridge program (this
machine), the Minecraft server's RCON door, `latest.log`. Every arrow labeled with
what travels and which direction. Then two decisions made on paper: how a bridged
message is formatted on each side (whose name, marked how, so nobody wonders who
said what), and what stops a bridged message from being bridged again.

### Predictions to elicit

- Before writing anything: trace one Discord message around the system on your
  drawing. It gets relayed into the game — does that relayed text then appear in
  `latest.log`? If it does, what does your log watcher do with it? Follow the
  consequence all the way.
- Your program will be waiting on Discord almost all the time. What is it doing
  about the log file during that wait — can one program wait on two things at once,
  and what would have to be true for that to work?
- The bot's token and the RCON password are both secrets your program reads at
  startup. In what ways is the token the more dangerous of the two if it leaks —
  and in what way is it the safer one?

### The work — goals and success criteria (level 3)

0. **Draw the system.** Paper, before code. Done when: every box and arrow is
   labeled with what travels; the message formats for both directions are written
   down; the echo path is either found and a guard chosen, or explicitly declared
   "I don't think there is one" — a prediction the bridge will test.

1. **A bot, online, answering.** Choose the library by evaluation (README + issues,
   the `../choosing-a-version/` method — record what was checked and when). Follow
   Discord's current developer docs to create the bot, invite it to the household
   server, and grant it what it needs to read messages. Token into a gitignored
   file. Then the smallest possible program: connect, and reply to one test message
   (e.g. a message saying `ping` gets a reply). Done when: the bot shows as online
   in the member list; the test message gets its reply in the channel; the token
   appears in exactly one file, and `git status` shows that file untracked-and-
   ignored; the word after `async` in the code can be pointed at and explained in
   one sentence.
   - Sparse hint (rung 1, only if stuck on silence): the bot is online but says
     nothing — is it *receiving* the message at all? Print what arrives. If nothing
     arrives, the gap is permission to see message content; the library's docs and
     Discord's docs both cover it under intents.

2. **Discord→game, live.** Replace the test reply: messages typed in the chosen
   channel get sent into game chat over RCON, carrying the Discord author's name in
   the format designed on paper. Done when: someone typing in Discord is readable,
   attributed, in the game — confirmed by a player standing in the world.

3. **Game→Discord, live.** The log watcher: a repeating task inside the same
   program that reads newly appended lines from `latest.log`, keeps its place with
   a file position, picks out player chat, and posts it to the channel in the
   designed format. Done when: chat typed in the game appears in the Discord
   channel, attributed; it keeps working across many messages, not just the first
   batch. Stretch: it survives a server restart (the log starts over — what should
   the saved position do?).
   - Sparse hint (rung 1): the watcher must not be an ordinary infinite loop — the
     one program is also holding the Discord connection open. The library has a
     mechanism for "run this function every N seconds"; its docs name it.

4. **Prove the loop can't happen.** Try to trip it: type in Discord and watch what
   comes back around; type in game and watch the other direction. Then, if the
   guard held, disable it briefly and deliberately — watch the echo begin, ctrl-C,
   restore the guard. Done when: bridged messages demonstrably do not re-bridge,
   and the learner has seen *why*, not just that.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Kill the key while the engine runs.** With the bridge running and working,
  regenerate the bot's token in the developer portal. Watch the running program: an
  established connection may not die the instant its credential does — observe what
  actually happens, and when. Then stop the bridge and start it again with the old
  token still in the file, and read the startup failure. Undo: paste the new token
  into the token file (and only there), restart. Teaches: tokens are revocable at
  the source, revocation is instant for *new* proof-of-identity even when an old
  session lingers, and recovering from a leaked token is one button plus one file
  edit — which is the entire point of tokens.
- **Take away its voice, not its connection.** In the Discord server's settings,
  remove the bot's permission to send messages in the bridge channel (leave
  everything else). Type something in the game and watch the bridge's terminal: the
  bot is still online, still connected, and the send fails with an error that names
  forbidden access. Undo: restore the permission. Teaches: "can't connect" and
  "connected but refused" are different failures with different fixes — the first
  is about reaching the service, the second about what the identity is allowed to
  do once there. The learner will meet this exact distinction, wearing the number
  403, all over the web.

### What just happened — the explanation

The bridge is one program holding two conversations in two unrelated protocols —
Discord's API on one side, RCON and a log file on the other — and neither system
knows the other exists. Discord thinks it's talking to a bot; the Minecraft server
thinks it's getting console commands and writing its diary. The learner's program is
the only place the two meet. There's a word for software in that position:
infrastructure. Most of what holds the internet together is programs shaped exactly
like this one — small translators standing between systems that never heard of each
other.

Tokens, one layer deeper: a password is one secret for a whole account, held by a
human, changed rarely and painfully. A token is issued *to a program*, scoped to
what that program may do, and revocable in one click without touching anything else
— the break-it proved that recovery costs a button and a file edit. That's why the
industry moved from passwords to tokens for program-to-program identity, and why
"never in code, never in git" is not paranoia but the handling that makes cheap
revocation work: a leaked token in a public repo is found by scanners in minutes.

And the async word the library forced: the program isn't doing three things at
once so much as never wasting a wait. Waiting on Discord, waiting between log
checks — every wait is declared, so the one program can hold all of it. Webhooks,
named in Facts, are the lighter tool for one of these directions; the go-further
puts them to work.

### Go further — open questions

- The log holds more than chat: deaths and advancements have their own line shapes
  (you found some in `../reading-the-logs/`). Bridge them, formatted so Discord
  readers instantly know a death from a chat line. Which events are worth the
  noise?
- Commands from the Discord side: `!who` in the channel answers with who's online
  (RCON has a command that knows). What else should be askable from the couch —
  and should anything *not* be?
- Rebuild the game→Discord direction using a webhook instead of the bot connection
  (Discord's docs cover webhooks). Compare the two honestly: lines of code, what
  had to be waiting, what the failure looks like when the token or the URL leaks.
- Genuinely open: should everything bridge? Game chat was ephemeral — it scrolled
  away; the Discord channel is a persistent, searchable log that people outside the
  game can read forever. Who decides what leaks from a private game into a
  permanent record — and in the other direction, does everything said in the family
  channel belong on a screen in the game? There is no settled answer; write down
  yours.

## Delivery notes

- **guided:** level 3 discipline — goals and done-when lists, no reasoning shown in
  the work section, at most the two sparse hints recorded in the arc. The
  architecture-drawing step is not skippable and the delivery should treat it as
  the first goal, not a preamble.
- Discord's terms of service include a minimum age; the material is written for a
  general reader and assumes nothing about who is reading — this may naturally be a
  lesson done together with whoever administers the household's Discord server.
  Keep any such framing out of learner text per no-personalization rules; the
  prerequisite's "enough authority on that server" phrasing carries the practical
  weight.
- Never describe developer-portal navigation. Point at Discord's developer
  documentation by name and have the learner follow the current flow. Same for
  intents: the delivery may say "permission to read message content, which
  Discord's docs cover under intents" and no more.
- The library is never asserted. discord.py may be named as the candidate the
  learner will encounter most, immediately followed by the evaluate-it-yourself
  instruction with the `../choosing-a-version/` link.
- Do not spoil either break-it observation (session behavior on revocation; the
  exact forbidden error) — both are measurements the learner should own.
- The echo loop: let the prediction section set the trap in the learner's favor.
  If their drawing misses it, goal 4 catches it reversibly. Never pre-sabotage.
- Subject-matter code (the bridge itself) is typed, not pasted; `pip install` and
  `git` lines are copyable.
