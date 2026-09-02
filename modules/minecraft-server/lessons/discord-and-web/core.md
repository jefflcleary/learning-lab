# Bridging to Discord and building a status page

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** discord-and-web
- **Module / Part:** minecraft-server — Part 6 — Beyond the game
- **Scaffolding:** level 3 throughout — two composition projects in one arc, the
  module's capstone tier. Every ingredient exists: RCON from Python and log
  tailing/parsing (`python-logs-and-rcon`), event-driven chat handling and the
  self-trigger bug (`bot-commands-and-building`), the Server List Ping script
  (`world-data-and-protocol`), sockets/ports/addresses and local-network
  reachability (`running-your-own-server`, `letting-friends-join`). Delivery gives
  goals and success criteria only; hints are sparse and never problem-solving.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

Two builds, one arc: the learner's one machine becomes the household's connection
to the server, without launching the game.

**The bridge.** One Python program that bridges a Discord channel and the Minecraft
server's chat, both directions: a message typed in Discord appears in game chat;
chat typed in the game appears in the Discord channel. The family Discord and the
Minecraft server become one room — people nowhere near a computer talk with people
standing in the world, and if it runs on the always-on machine it just stays that
way.

**The status page.** A web page, served from the learner's machine, that any phone
on the home wifi can open to see who's on the Minecraft server right now — names
and a count, live. The SLP script from `world-data-and-protocol` becomes an API,
the LAN address from `letting-friends-join` becomes a URL, and the learner runs a
server of a second kind.

The real lesson at this level is architecture: these are the most multi-part
systems in the module (one program, two live connections, plus a file watcher; then
a second server with routes), and the learner designs on paper before writing a
line — one drawing that grows to cover both builds. The under-the-surface reveal,
saved for What just happened: the learner has been a *client* of many servers all
course — Minecraft's, RCON's, Discord's. By the end of this arc they stand on the
other side too, and discover client and server are roles, not identities. The
"count what your one machine now is" passage lands at the very end.

## Prerequisites

- You can send commands to your server from Python over RCON, keep credentials in a
  file the code reads rather than in the code, and you can read `latest.log` from
  Python, pick out lines that matter, and keep reading as new lines arrive —
  established by `lessons/python-logs-and-rcon/` (Python, pip, and the venv routine
  also live there; this lesson does not re-teach them. Its go-further question about
  following a growing file becomes load-bearing here.)
- You've written a bot that reacts to chat, and met the bug where a bot triggers
  itself — established by `lessons/bot-commands-and-building/`
- A way to ask the server who's online, from Python. Preferred: the Server List
  Ping script — established by `lessons/world-data-and-protocol/` (it's theirs end
  to end). Also fine: RCON's `list` command from Python — established by
  `lessons/python-logs-and-rcon/`. The core accepts both; deliveries lead with SLP
  and name the RCON path once.
- A Discord server people in the household actually use. This is a condition of the
  world, not a lesson: anyone can create a Discord server free from inside the
  Discord app, and many households already have one. You need enough authority on
  that server to add a bot to it — either it's yours, or the person who runs it does
  this part with you.
- Your project folder is under version control with a `.gitignore` — established by
  `lessons/git-for-your-server/`
- A phone (or any second device) on the home wifi, and the ability to find the
  Mac's local address on demand — established by `lessons/letting-friends-join/`
- A server that's running while you work — `lessons/running-your-own-server/`;
  helpful for both payoffs to persist: a machine where the server stays up —
  `lessons/always-on/`

## Establishes

- A bridge program connecting a Discord channel and the server's chat in both
  directions, runnable on the always-on machine
- The learner holds a Discord bot identity and its token, stored outside code and
  outside git — cited by other cores as: "you have a Discord bot with a token kept
  in a gitignored file — established by `lessons/discord-and-web/`."
- A who's-online web page reachable from any device on the home wifi — cited by
  other cores as: "you serve a web page other devices in the house can open —
  established by `lessons/discord-and-web/`."
- Words other lessons can use freely: API, token, intent (Discord's sense), webhook
  (named, not yet used), async / await (met at working depth, not lectured), HTTP,
  route, request, response, JSON endpoint, `0.0.0.0` vs `localhost` binding
- The loop-prevention instinct: any program that both reads and writes the same
  channel of communication can feed itself
- First deliberate error-handling-as-UX decision (the designed "server offline"
  state)

## Facts

### Discord and the bridge

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
  parsed these lines in `../python-logs-and-rcon/`]. Following a growing file means
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
    `../bot-commands-and-building/`).
  - Match only genuine player-chat lines in the log. Text sent via RCON `say` is
    logged differently from player chat [verify by observation — deliveries have
    the learner compare the two log lines in their own file rather than asserting
    the shapes].
  Deliveries let the learner predict the loop before it can bite (they've met
  self-triggering before); if it bites anyway it's reversible — ctrl-C.
- **Secrets handling** (first-class subject here): the token goes in its own file
  next to the script — e.g. `discord_token.txt`, read at startup with a plain
  `open(...).read().strip()` — and that filename goes in `.gitignore` before the
  file is created. Standard-library file reading is entirely sufficient; the module
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

### The web page

- **Flask** is a small Python library that turns Python functions into web
  responses: decorate a function with a path, and Flask runs a web server that
  calls the function whenever a browser asks for that path. Install is the known
  pip routine. [verify / volatile as of 2026-07 — Flask remains the sane minimal
  choice for a first web server in Python; the visible alternatives are FastAPI
  (larger, API-framework-shaped) and Bottle (smaller, quieter development).
  Deliveries have the learner do a light evaluation per the
  `../choosing-a-version/` method rather than take this page's word.]
- Minimal Flask shape, author reference [verify against Flask's current quickstart;
  as of 2026-07]: `app = Flask(__name__)`; `@app.route("/")` on a function whose
  return value becomes the response body; run with the `flask run` command (which
  may need to be told the filename via `--app` unless the file is `app.py`) or
  `app.run()` in the script. Development server defaults: port `5000`, bound to
  `127.0.0.1`. [verify port and flags — deliveries point at the quickstart and have
  the learner confirm the current run command and default port from it.]
- macOS gotcha [macos] [verify as of 2026-07]: recent macOS versions ship an
  AirPlay Receiver service that listens on port 5000; a browser hitting port 5000
  may get an answer from *it* (typically an empty 403 response) instead of Flask.
  Deliveries do not assert this; they arm the diagnostic — "if the page that
  answers doesn't look like yours, ask what else could be listening on that port"
  — and note that choosing a different port is a one-flag fix.
- Flask prints a warning that its built-in server is a development server [verify
  wording — do not quote]. Honest framing: that warning is about serving the
  public internet at scale; for a page served to the household it is fine, and the
  warning is the industry reminding you that "deployed" has bigger leagues.
- **HTTP**, given plainly at last: when a browser opens a URL, it connects to the
  named machine and port and sends *text* — a request line like `GET /status`,
  then headers, then a blank line. The server replies with text: a status line, a
  code (200 OK, 404 Not Found, 403 Forbidden), headers, a blank line, and the body.
  A **route** is the server-side rule mapping a path to the function that answers
  it. The delivery draws the explicit analogy: the multiplayer screen pings game
  servers, the browser pings web servers — same shape, different protocol, and the
  learner has hand-built one protocol already (`../world-data-and-protocol/`), so
  this one is legible by analogy.
- **HTML** met as another text format (the module's line: behavior and content are
  data, data is text). view-source in the browser shows exactly what the route
  returned. A tiny page is a completion problem, not a lecture:

  ```html
  <h1>____ server</h1>
  <p>Players online: <span id="count">?</span></p>
  <ul id="names"></ul>
  ```

  (Skeleton with a heading, an element to hold the count, an element to hold the
  list; ids are the hooks the script will grab. Full-document boilerplate —
  doctype/html/head/body — is fine to show; browsers are famously forgiving, which
  is worth one sentence.)
- Returning JSON from Flask: returning a Python dict from a route sends it as JSON
  [verify — long-standing Flask behavior; `jsonify` is the explicit spelling if the
  dict form has changed].
- The SLP status answer includes player count, max, and a *sample* of player names.
  [verify — the sample can be capped or empty depending on server settings (e.g.
  `hide-online-players`) and player count; the learner has seen their own script's
  raw output in `../world-data-and-protocol/` and should trust that over any page.]
  RCON `list` returns a human-readable line to parse — the learner has parsed
  worse.
- Browser-side fetch [stable]: inside a `<script>` tag,
  `fetch("/status")` returns a promise; `.json()` on the response parses the body;
  update the page via `document.getElementById(...).textContent` (and create list
  items for names). One fetch, one DOM update — deliberately the smallest honest
  JavaScript-in-the-browser moment. JavaScript itself is not new (the bot arc);
  the browser as its home is.
- Binding: `127.0.0.1` / `localhost` means "listen only on the self-only address —
  reachable from this machine alone." `0.0.0.0` means "listen on all of this
  machine's addresses," including the LAN one. Flask's dev server takes a host
  flag/argument for this [verify spelling: `flask run --host=0.0.0.0` /
  `app.run(host="0.0.0.0")` — point at docs].
- Phone URL shape: `http://<the Mac's local address>:5000/` — the same address used
  in `../letting-friends-join/`, different port. The delivery must contain the
  sentence drawing that equivalence explicitly (it collapses months of concepts
  into one line).
- macOS may show the firewall dialog when Python first accepts connections from
  another machine — same event as in `../letting-friends-join/`, same meaning,
  allow it for your own program. [macos] [verify — only if Application Firewall
  enabled; "may appear," never promised.]
- When the Minecraft server is down, the SLP call fails (connection refused —
  the fast no, met in `../letting-friends-join/`). An uncaught exception in a route
  makes Flask return a 500-class error page. The break-it turns this into a
  designed state instead: catch the failure, return something like
  `{"online": false}`, and have the page render "server offline" deliberately.
- Zero-toolchain stance is absolute for the page (author note): no framework, no
  build step, no npm — one Python file and one HTML page's worth of markup, on
  principle; the temptation to reach for a frontend framework must not leak into
  the delivery even as an aside.

## Arc

### Orientation — given plainly

**The bridge.** Both halves of the bridge already exist in pieces the learner
built: Discord→game is an RCON command; game→Discord is log lines they already know
how to parse, posted somewhere new. What's genuinely new is Discord's side of the
handshake — a bot account, its token, the current setup flow from Discord's own
developer docs, a library chosen by evaluation — and the fact that one program must
hold two live connections and a file watcher at once.

The async paragraph is given here, plainly, at exactly the depth in Facts. The
secrets discipline is given as orientation, not discovery: token in a file, file in
`.gitignore`, gitignore entry written *before* the token file exists.

The architecture step is mandatory and comes before any code: boxes and arrows on
paper. Boxes: the Discord service (their machines), the bridge program (this
machine), the Minecraft server's RCON door, `latest.log`. Every arrow labeled with
what travels and which direction. Then two decisions made on paper: how a bridged
message is formatted on each side (whose name, marked how, so nobody wonders who
said what), and what stops a bridged message from being bridged again. The drawing
is not a bridge-only artifact: it expands when the page half begins (new boxes: the
web server, the phones; new arrows: `/status` requests, SLP to the game server).

**The page.** HTTP is given plainly (request line, routes, response, codes) with
the explicit SLP analogy. Flask is introduced as what it is — a small library that
turns Python functions into web responses — with a light evaluate-it-yourself pass
before installing. HTML named as another text format. The client/server-roles
framing is *saved* for What just happened; the delivery's page-half opening may
note "you have been the caller all module; now you park a program on a port" but
the full count lands at the end.

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
- When a browser asks a server for a page, what actually travels down the wire?
  You've built one network protocol by hand — write down your guess at this one's
  shape before you look.
- Will a phone on the wifi be able to open `localhost:5000`? Say exactly why or why
  not. (They should be able to answer this instantly now — the delivery has them
  notice that they can, and remember when they couldn't.)
- What *should* the page show when the Minecraft server is off? Decide before it
  happens.

### The work — goals and success criteria (level 3)

**The bridge:**

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

**Internal transition** (was the two lessons' seam): the bridge put the server in
the family's Discord; the page puts it on their phones' browsers — and this time
the learner runs the server side. First move: back to the drawing — add the new
boxes and arrows (web server on this machine, phones on the wifi, the `/status`
question, the SLP arrow to the game server) so the whole evening's system is one
picture.

**The page:**

5. **A hello route on your own web server.** Light library evaluation
   (`../choosing-a-version/` method), install into the project venv, then Flask's
   own quickstart for the run command and default port — confirm both from the
   docs, not from here. One route returning one line of HTML. Done when: a browser
   on the same machine shows the words; view-source shows *exactly* what the
   function returned — text, all the way down; and if the page that answered
   didn't look like yours, you found out what else was listening on that port
   before moving on.

6. **A `/status` route that answers with data.** Wire the SLP function (or RCON
   `list`) into a second route returning JSON: at minimum a count and a list of
   names. Done when: visiting `/status` in the browser shows JSON matching the
   truth; someone joins or leaves the game, refresh, the answer changes. This is
   the sentence landing concretely: an API is a program answering questions for
   other programs.

7. **The page.** The HTML skeleton (completion problem) plus the smallest honest
   script: one `fetch` of `/status`, one update of the page with count and names.
   Typed by hand — it's subject matter. Done when: opening the page shows who's
   online; refresh reflects reality; the learner can point at the line where the
   browser asked their API a question.
   - Sparse hint (rung 3 pointer): `fetch` is documented on MDN; the response has
     a `.json()`; elements are grabbed by the ids you gave them.

8. **The unlock: open it from a phone.** Bind the server to all of the machine's
   addresses instead of the self-only one — Flask's docs name the flag; the idea
   is the fact given plainly: `localhost` was the self-only address, `0.0.0.0`
   means "every address this machine has." Then, on a phone on the home wifi:
   `http://<the Mac's local address>:5000/`. The delivery states it in one line:
   the same address that let a friend join your world, with a different port on
   the end. Done when: a phone that isn't yours, on the home wifi, shows who's
   online in the world — and the number is right.

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
- **Rebind to self-only.** Put the binding back to the default, restart Flask, and
  try the phone again. Watch how it fails, and notice how fast *you* diagnose it.
  This exact failure — a service reachable from its own machine and invisible to
  the network — was once a wall (`../letting-friends-join/` was built on it).
  Measure the growth out loud: the delivery should have the learner notice that
  what would once have been an afternoon of confusion is now a one-glance
  diagnosis. Undo: bind to `0.0.0.0` again.
- **Kill the thing the page depends on.** With the page up on a phone, stop the
  Minecraft server. Load the page again and read what happens end to end — the SLP
  connection is refused (the fast no), the route raises, the browser shows a
  server-error response. Then the real work: decide what the page *should* say,
  and build it — catch the failure in the route, return a deliberate
  `{"online": false}`-shaped answer, render "server offline" as a designed state.
  Undo: start the server, watch the page come back. Teaches: an error a user sees
  is a design surface; unhandled is a choice, and so is handled. This is the
  learner's first act of error-handling as user experience.

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

The async word the library forced: the program isn't doing three things at once so
much as never wasting a wait. Waiting on Discord, waiting between log checks —
every wait is declared, so the one program can hold all of it. Webhooks, named in
Facts, are the lighter tool for one of these directions; the go-further puts them
to work.

The request/response/JSON pattern of the page is not a toy version of anything —
it is the actual pattern nearly every app on every phone uses against some
backend: the app is a pretty client, the backend is a `/status` route with more
routes next to it. The learner has now stood on both sides of that pattern, and
hand-built one of the protocols besides. A browser URL decomposes with what they
already own: name of the machine, port, path — machine, door, question. One layer
deeper on the web server itself: Flask's development server is a real server the
same way the Minecraft server is — a program parked on a port, reading requests,
writing responses. The "development server" warning it prints is about scale and
hardening for the public internet, not correctness; the house is exactly the
deployment it's fine for.

**The spine, landing last:** client and server are roles, not identities. Count
what the one laptop now is, simultaneously: a Minecraft server (to the players), an
RCON server (to its own scripts), a web server (to every phone in the house), and a
client of Discord. The same machine, the same evening, both sides of four
conversations — which side you're on is just a question of who listened and who
called.

### Go further — open questions

(Merged: six kept, both genuinely open questions preserved. Cut in the merge:
`!who` from Discord — superseded by the status page, which answers who's-online for
the whole household; the page-refreshes-itself item — the thinnest of the eight.)

- The log holds more than chat: deaths and advancements have their own line shapes
  (you found some in `../python-logs-and-rcon/`). Bridge them, formatted so Discord
  readers instantly know a death from a chat line. Which events are worth the
  noise?
- Rebuild the game→Discord direction using a webhook instead of the bot connection
  (Discord's docs cover webhooks). Compare the two honestly: lines of code, what
  had to be waiting, what the failure looks like when the token or the URL leaks.
- You made a map image of your world in `../world-data-and-protocol/`. Web servers
  can serve files as well as answers — Flask's docs call these static files. Put
  the map on the page. What else deserves to be there?
- Could someone open this page from *outside* the house? The techniques from
  `../letting-friends-join/` were never Minecraft-specific — they apply to any
  port, and realizing that is realizing what they actually were. But before you
  do: what does this page leak, and to whom? Player names, house schedules,
  whether anyone's home. Exposure is a decision about information, not just a
  port-forward.
- Genuinely open: should everything bridge? Game chat was ephemeral — it scrolled
  away; the Discord channel is a persistent, searchable log that people outside the
  game can read forever. Who decides what leaks from a private game into a
  permanent record — and in the other direction, does everything said in the family
  channel belong on a screen in the game? There is no settled answer; write down
  yours.
- Genuinely open: what should a server dashboard show that this page doesn't?
  Design it on paper — uptime, deaths today, the map, last backup, who talked
  most — then rank every idea by effort versus joy. Build nothing yet. The
  ranking, not the building, is the skill; the building is
  [the open part of the module](../../README.md).

## Delivery notes

- **Sources:** merged from the former `discord-bridge` and `whos-online-page`
  lessons (their folders retained for history; this core supersedes both).
- **Order: bridge first, then page.** Justification: (1) the page's spine passage —
  the count of what one machine now is — needs "client of Discord" already true,
  so it can only land after the bridge; (2) the drawing starts with the bridge (the
  more multi-part build, where the loop hazard lives) and expands naturally to
  cover the page; (3) prerequisites permit either order, so the seam is placed
  where the payoffs stack rather than where dependencies force it.
- **guided:** level 3 discipline — goals and done-when lists, no reasoning shown in
  the work section, at most the three sparse hints recorded in the arc. The
  architecture-drawing step is not skippable and the delivery treats it as the
  first goal, not a preamble; the drawing-expansion sentence at the seam is
  mandatory.
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
- Neither library is asserted. discord.py may be named as the candidate the
  learner will encounter most, immediately followed by the evaluate-it-yourself
  instruction with the `../choosing-a-version/` link; Flask likewise, with FastAPI
  and Bottle named as the visible alternatives.
- Do not spoil the break-it observations (session behavior on token revocation; the
  exact forbidden error) — both are measurements the learner should own.
- The echo loop: let the prediction section set the trap in the learner's favor.
  If their drawing misses it, the prove-it goal catches it reversibly. Never
  pre-sabotage.
- Lead with the SLP data path (it's theirs end to end); the RCON `list`
  alternative gets exactly one sentence so the lesson doesn't fork.
- Never assert Flask's current run command, default port, or host flag — quickstart
  is pointed at; the learner confirms. The AirPlay/port-5000 gotcha is armed as a
  diagnostic ("what else could be listening?"), never asserted as fate.
- The one-line collapse sentence (same address as `letting-friends-join`, different
  port) is mandatory in the delivery — it is the emotional payload of the phone
  unlock.
- Zero toolchain on principle for the page: no framework, no build step, no npm
  anywhere in learner text, not even as a teaser. The go-further dashboard stays
  paper-only.
- The offline-state break-it must end with the learner *choosing* the wording their
  page shows — the design decision is the lesson, so the delivery must not supply
  the wording.
- Subject-matter code (the bridge, the page markup and script) is typed, not
  pasted; `pip install` and `git` lines are copyable.
- Stuck-sentence clause: this lesson keeps the connection-mysteries clause (both
  sources carried it).
- Merge cuts (recorded above in Arc): the `!who` and self-refresh go-further items.
- Check at regeneration: all [verify] flags in Facts (intents, library health,
  tellraw shape, log line shapes, token-revocation behavior, Forbidden exception,
  webhook docs, Flask quickstart/port/host flag, AirPlay gotcha, dict-as-JSON,
  SLP sample field, firewall dialog).
