# A window anyone can open

Internal lesson core. Not learner-facing. Deliveries are generated from this file —
see authoring/WORKFLOWS.md.

## Meta

- **Slug:** whos-online-page
- **Part:** Part 6 — Beyond the game
- **Scaffolding:** level 3 — a composition project closing the networking story. The
  data path (SLP or RCON) is theirs already; sockets, ports, addresses, and
  local-network reachability are all established. Flask and HTTP are new but enter
  as plain orientation. Delivery gives goals and success criteria only; hints
  sparse.
- **Deliveries:** guided only
- **Status:** ready

## Goal and payoff

A web page, served from the learner's machine, that any phone on the home wifi can
open to see who's on the Minecraft server right now — names and a count, live.
Payoff: a real product, small but genuinely deployed (on the always-on machine),
made of every prior arc at once: the SLP protocol they built by hand becomes an API,
the LAN address from letting a friend join becomes a URL, and the learner runs a
server of a second kind.

The under-the-surface lesson: the learner has been a *client* of many servers all
course — Minecraft's, RCON's, Discord's. Today they stand on the other side, and
discover client and server are roles, not identities.

## Prerequisites

- A way to ask the server who's online, from Python. Preferred: the Server List
  Ping script — established by `lessons/server-list-ping/` (it's theirs end to
  end). Also fine: RCON's `list` command from Python — established by
  `lessons/rcon-scripting/`. The core accepts both; deliveries lead with SLP and
  name the RCON path once.
- The Python + pip + venv routine — established by `lessons/rcon-scripting/`
  (first met there); not re-taught.
- A phone (or any second device) on the home wifi, and the ability to find the
  Mac's local address on demand — established by `lessons/joining-over-lan/`
- A server that's running while the page is up — `lessons/running-your-own-server/`;
  for the payoff to persist, `lessons/always-on/`

## Establishes

- A who's-online web page reachable from any device on the home wifi — cited by
  other cores as: "you serve a web page other devices in the house can open —
  established by `lessons/whos-online-page/`."
- The learner has run a web server, written a route returning JSON, and made a
  browser fetch it — words other lessons can use freely: HTTP, route, request,
  response, JSON endpoint / API, `0.0.0.0` vs `localhost` binding
- First deliberate error-handling-as-UX decision (the designed "server offline"
  state)

## Facts

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
  learner has hand-built one protocol already, so this one is legible by analogy.
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
  raw output in `../server-list-ping/` and should trust that over any page.]
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
  in `../joining-over-lan/`, different port. The delivery must contain the sentence
  drawing that equivalence explicitly (it collapses months of concepts into one
  line).
- macOS may show the firewall dialog when Python first accepts connections from
  another machine — same event as in `../joining-over-lan/`, same meaning, allow it
  for your own program. [macos] [verify — only if Application Firewall enabled;
  "may appear," never promised.]
- When the Minecraft server is down, the SLP call fails (connection refused —
  the fast no, met in `../joining-over-lan/`). An uncaught exception in a route
  makes Flask return a 500-class error page. The break-it turns this into a
  designed state instead: catch the failure, return something like
  `{"online": false}`, and have the page render "server offline" deliberately.

## Arc

### Orientation — given plainly

The framing: all module long the learner has been the client — of Minecraft's
server, of RCON, of Discord. Today they run the other side: a web server, the kind
every browser in the world talks to. HTTP is given plainly (request line, routes,
response, codes) with the explicit SLP analogy. Flask is introduced as what it is —
a small library that turns Python functions into web responses — with a light
evaluate-it-yourself pass before installing. HTML named as another text format.
The zero-toolchain stance is absolute here (author note): no framework, no build
step, no npm — one Python file and one HTML page's worth of markup, on principle;
the temptation to reach for a frontend framework must not leak into the delivery
even as an aside.

### Predictions to elicit

- When a browser asks a server for a page, what actually travels down the wire?
  You've built one network protocol by hand — write down your guess at this one's
  shape before you look.
- Will a phone on the wifi be able to open `localhost:5000`? Say exactly why or why
  not. (They should be able to answer this instantly now — the delivery has them
  notice that they can, and remember when they couldn't.)
- What *should* the page show when the Minecraft server is off? Decide before it
  happens.

### The work — goals and success criteria (level 3)

1. **A hello route on your own web server.** Light library evaluation
   (`../choosing-a-version/` method), install into the project venv, then Flask's
   own quickstart for the run command and default port — confirm both from the
   docs, not from here. One route returning one line of HTML. Done when: a browser
   on the same machine shows the words; view-source shows *exactly* what the
   function returned — text, all the way down; and if the page that answered
   didn't look like yours, you found out what else was listening on that port
   before moving on.
2. **A `/status` route that answers with data.** Wire the SLP function (or RCON
   `list`) into a second route returning JSON: at minimum a count and a list of
   names. Done when: visiting `/status` in the browser shows JSON matching the
   truth; someone joins or leaves the game, refresh, the answer changes. This is
   the sentence landing concretely: an API is a program answering questions for
   other programs.
3. **The page.** The HTML skeleton (completion problem) plus the smallest honest
   script: one `fetch` of `/status`, one update of the page with count and names.
   Typed by hand — it's subject matter. Done when: opening the page shows who's
   online; refresh reflects reality; the learner can point at the line where the
   browser asked their API a question.
   - Sparse hint (rung 3 pointer): `fetch` is documented on MDN; the response has
     a `.json()`; elements are grabbed by the ids you gave them.
4. **The unlock: open it from a phone.** Bind the server to all of the machine's
   addresses instead of the self-only one — Flask's docs name the flag; the idea
   is the fact given plainly: `localhost` was the self-only address, `0.0.0.0`
   means "every address this machine has." Then, on a phone on the home wifi:
   `http://<the Mac's local address>:5000/`. The delivery states it in one line:
   the same address that let a friend join your world, with a different port on
   the end. Done when: a phone that isn't yours, on the home wifi, shows who's
   online in the world — and the number is right.

### Break it on purpose — failures to cause, what each teaches, how to undo

- **Rebind to self-only.** Put the binding back to the default, restart Flask, and
  try the phone again. Watch how it fails, and notice how fast *you* diagnose it.
  This exact failure — a service reachable from its own machine and invisible to
  the network — was once a wall (`../joining-over-lan/` was built on it). Measure
  the growth out loud: the delivery should have the learner notice that what would
  once have been an afternoon of confusion is now a one-glance diagnosis. Undo:
  bind to `0.0.0.0` again.
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

Client and server are roles, not identities. One laptop is now, simultaneously: a
Minecraft server (to the players), an RCON server (to its own scripts), a web
server (to every phone in the house), and a client of Discord. The same machine,
the same evening, both sides of four conversations — which side you're on is just a
question of who listened and who called.

The request/response/JSON pattern on display here is not a toy version of anything
— it is the actual pattern nearly every app on every phone uses against some
backend: the app is a pretty client, the backend is a `/status` route with more
routes next to it. The learner has now stood on both sides of that pattern,
and hand-built one of the protocols besides. A browser URL decomposes with what
they already own: name of the machine, port, path — machine, door, question.

One layer deeper on the web server itself: Flask's development server is a real
server the same way the Minecraft server is — a program parked on a port, reading
requests, writing responses. The "development server" warning it prints is about
scale and hardening for the public internet, not correctness; the house is exactly
the deployment it's fine for. The bigger leagues exist, and the learner now knows
what league they'd be entering.

### Go further — open questions

- The page only tells the truth as of the last refresh. Make it refresh itself —
  the browser has more than one way; compare crude and clever.
- You made a map image of your world in `../world-data/`. Web servers can serve
  files as well as answers — Flask's docs call these static files. Put the map on
  the page. What else deserves to be there?
- Could someone open this page from *outside* the house? The techniques from
  `../joining-from-outside/` were never Minecraft-specific — they apply to any
  port, and realizing that is realizing what they actually were. But before you
  do: what does this page leak, and to whom? Player names, house schedules,
  whether anyone's home. Exposure is a decision about information, not just a
  port-forward.
- Genuinely open: what should a server dashboard show that this page doesn't?
  Design it on paper — uptime, deaths today, the map, last backup, who talked
  most — then rank every idea by effort versus joy. Build nothing yet. The
  ranking, not the building, is the skill; the building is
  [the open part of the module](../../PATH.md).

## Delivery notes

- **guided:** level 3 discipline — goals with done-when lists; the only hint block
  is the rung-3 pointer on goal 3. The HTTP/SLP analogy and the binding
  explanation are orientation and stay plain and generous.
- Lead with the SLP data path (it's theirs end to end); the RCON `list`
  alternative gets exactly one sentence so the lesson doesn't fork.
- Never assert Flask's current run command, default port, or host flag — quickstart
  is pointed at; the learner confirms. The AirPlay/port-5000 gotcha is armed as a
  diagnostic ("what else could be listening?"), never asserted as fate.
- The one-line collapse sentence (same address as joining-over-lan, different
  port) is mandatory in the delivery — it is the emotional payload of goal 4.
- Zero toolchain on principle: no framework, no build step, no npm anywhere in
  learner text, not even as a teaser. The go-further dashboard stays paper-only.
- The offline-state break-it must end with the learner *choosing* the wording their
  page shows — the design decision is the lesson, so the delivery must not supply
  the wording.
