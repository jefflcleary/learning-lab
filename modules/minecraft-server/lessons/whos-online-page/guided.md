# A window anyone can open

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Through this whole module, you've been the client. Your game was a client of your
server.
Your scripts were clients of RCON. Your bridge was a client of Discord. Every time,
some other program sat parked on a port, listening, answering — and you were the
one calling.

Today you run the other side. You're going to put up a **web server** — the kind of
server every browser in the world talks to — and serve a page that any phone on
your home wifi can open to see who's on the Minecraft server right now. Names and
a count, live, on the family's phones. It's a small product, but it is genuinely a
product, and it's made out of every arc of this module at once: the ping protocol
you built by hand becomes the data source, the local address you once used to let
a friend join becomes a URL, and the machine that never sleeps keeps it up.

One rule for this session, stated up front because the temptation will come: one
Python file, one page of typed-by-hand markup. No frameworks, no build steps.
The page stays small enough to understand completely.

---

## Before you start

You need:

- **A way to ask your server who's online, from Python.** The Server List Ping
  script from [Speaking the protocol by hand](../server-list-ping/guided.md) is the one
  this lesson assumes — it's yours end to end. (The `list` command over RCON from
  [A remote control for the server](../rcon-scripting/guided.md) works too; if you use it,
  you'll be parsing a line of text instead of reading JSON.)
- **The Python install routine** — pip and a project environment, first met in
  [A remote control for the server](../rcon-scripting/guided.md).
- **A phone or any second device on the home wifi**, and the ability to find your
  Mac's local address on demand — from [The first visitor](../joining-over-lan/guided.md).
- **A Minecraft server that's running** while you work — and if you want the page
  to stay up after today, the machine from
  [A server that's there at seven in the morning](../always-on/guided.md).

Quick checks: your SLP script prints a JSON status when the server is up; you can
say your Mac's local wifi address without looking at this page; a phone on the
same wifi can see your Mac's name in some sharing context or ping it.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. For connection mysteries, start with [Isolating a problem](../../../../reference/isolating-a-problem.md).

---

## What you'll have at the end

By the end of this session you will have:

- A web server of your own, with a route that answers in HTML and a route that
  answers in JSON
- A page, reachable from any device in the house, showing who's on the Minecraft
  server right now
- A deliberate answer — designed by you — for what that page says when the
  Minecraft server is off
- Both sides of the client/server relationship in your own hands, and the words
  for what you built: HTTP, route, request, response, API

---

## New tools

**HTTP** is the protocol browsers speak, and after the ping protocol, you've earned
the plain version: when a browser opens a URL, it connects to the named machine and
port and sends *text* — a request line like `GET /status`, some headers, a blank
line. The server replies with text: a status line carrying a code (`200 OK`,
`404 Not Found`, `403 Forbidden`), headers, a blank line, and then the body — the
page itself. That's the whole shape. The multiplayer screen pings game servers;
the browser pings web servers. Same idea, different vocabulary, and you have
hand-built one of the two, so the other is legible by analogy.

A **route** is the server-side rule that maps a path — `/`, `/status` — to the
code that answers it.

**Flask** is a small Python library that turns Python functions into web
responses: you attach a path to a function, and Flask runs a web server that calls
your function whenever a browser asks for that path. Before installing it, give it
the treatment you gave mineflayer once upon a time: find it, look at its README
and activity, note what else exists (you'll see FastAPI, bigger and shaped for
APIs, and Bottle, smaller and quieter) and satisfy yourself that a small, mature,
boring library is the right size for one page. Then install it into your project
environment with the routine you know, and open **Flask's own quickstart** — it,
not this page, is where you'll confirm how to run the server and what port it
defaults to.

**HTML** is the text format pages are written in — content with labeled structure,
the way JSON is data with labeled structure. You'll see below that it's met, not
lectured.

---

## Predict

Write these in [your logbook](../../../../logbook.md) first:

- When a browser asks a server for a page, what actually travels down the wire?
  You've written one network conversation byte by byte — sketch your guess at this
  one's shape before you look at a real request.
- Will a phone on the wifi be able to open `localhost:5000`? Say exactly why or
  why not. Notice, while you answer, that you *can* answer — there was a time this
  question was a wall.
- What should the page show when the Minecraft server is off? Decide now, before
  it happens on its own.

---

## The work

### A hello route on your own web server

Evaluate and install Flask as above, then use its quickstart to stand up the
smallest possible server: one route at `/`, returning one line of HTML — a heading
that names your server, nothing more. Confirm the run command and the default port
from the quickstart, not from here.

Done when:

- A browser on the same machine shows your words at `localhost` on Flask's port
- view-source in the browser shows *exactly* what your function returned — text
  all the way down, nothing added, nothing hidden
- If the page that answered didn't look like yours — wrong words, an error you
  didn't write — you found out what else was listening on that port before moving
  on. (More than one program can want a port; you've known since the day you
  started a server twice that only one gets it. Picking another port is a
  one-flag fix once you know that's the situation.)

### A `/status` route that answers with data

Wire your SLP function into a second route: `/status` returns JSON — at minimum a
player count and a list of names. Your ping script already extracts these; today
it stops printing them and starts *serving* them.

Done when:

- Visiting `/status` in the browser shows JSON that matches the truth in-game
- Someone joins or leaves, you refresh, and the answer changes

Pause on what you just made: a program that answers questions for other programs.
That's all the word **API** means, and you now own one.

### The page

Now the human-facing side. Two pieces, both typed by hand — this is subject
matter, not setup.

The markup — a page with a heading, a place for the count, a place for the names.
The load-bearing parts of the skeleton are blanked; the ids are the hooks your
script will grab:

```html
<h1>____</h1>
<p>Players online: <span id="count">?</span></p>
<ul id="names"></ul>
```

(A fuller document wraps this in doctype/html/head/body layers — worth adding,
worth knowing, and browsers are forgiving while you get it right.)

The script — JavaScript, back in its homeland. Inside a `<script>` tag: fetch
`/status`, parse the JSON, put the count and the names into the page. One fetch,
one update. You've written far more JavaScript than this.

Done when:

- Opening the page shows who's online, correctly
- Refreshing reflects reality after someone joins or leaves
- You can point at the exact line where the browser asked your API a question

<details>
<summary>Pointers, if the browser side is unfamiliar</summary>

`fetch` is documented on MDN; the response object it gives you has a `.json()`
method; and elements are grabbed with `document.getElementById` using the ids you
wrote into the markup.

</details>

### The unlock: open it from a phone

Flask's server is currently listening on the self-only address — `localhost`,
which you've known since the day you first joined your own server, means "this
machine, myself." A phone can't call your machine's self-only name.

The fix is one setting: bind the server to **all** of the machine's addresses —
the spelling is `0.0.0.0`, which means "listen on every address this machine
has," including the wifi one. Flask's docs name the flag; find it, restart with
it. If macOS asks whether your Python program may accept incoming connections,
that's the same doorbell you met the first time a friend joined your world —
answer for your own program accordingly.

Then, on a phone on the home wifi, open:

`http://<your Mac's local address>:<Flask's port>/`

Read that URL once more before you type it. It's the same address that let a
friend join your Minecraft world, with a different port on the end. Same machine,
different door. That one line is most of this module's networking, collapsed.

Done when: a phone that isn't yours, on the home wifi, shows who's online in the
world — and the number is right.

---

## Break it on purpose

**Rebind to self-only.** Put the binding back to the default, restart, and try
the phone again. Watch how it fails — and watch yourself diagnose it in one
glance. A service reachable from its own machine and invisible to the rest of the
network is precisely the situation you once spent a whole session learning to
see. It would have been an afternoon of confusion once; it's a shrug now. That
distance is measurable growth — measure it. Then bind back to `0.0.0.0`.

**Kill the thing the page depends on.** With the page up on a phone, stop the
Minecraft server. Load the page and read the failure end to end: your SLP call
gets the fast no (connection refused — an old friend), your route raises, the
browser shows a server-error page you never designed.

Now do the real work: you decided in Predict what the page *should* say when the
server is off. Build that. Catch the failure in the route, return a deliberate
answer shaped like `{"online": false}`, and have the page render your chosen
words as a designed state, not an accident. Start the server again and watch the
page come back.

What this teaches is worth saying plainly: an error a user sees is a design
surface. Unhandled is a choice, and so is handled — and you just made your first
deliberate one.

---

## What just happened

Client and server are roles, not identities. Count what your one machine is right
now: a Minecraft server to the players, an RCON server to your own scripts, a web
server to every phone in the house — and a client of Discord, of GitHub, of the
whole web, all in the same evening. Which side you're on is only ever a question
of who listened and who called.

And the pattern you built today — request, response, JSON, a page that fetches
from a route — is not a toy version of something bigger. It *is* the pattern.
Nearly every app on every phone is a pretty client talking to somebody's
`/status` route, with more routes next to it. You've now stood on both sides of
that arrangement, and you hand-built one of the underlying protocols besides. A
URL decomposes entirely into things you own: the machine's name, the port, the
path — machine, door, question.

One layer deeper: Flask's development server is a real server in exactly the way
your Minecraft server is — a program parked on a port, reading requests, writing
responses. The warning it prints about being a development server is about
serving the hostile public internet at scale, not about correctness; the house is
exactly the deployment it's fine for. Bigger leagues exist, and now you know
which league a page like this would be entering — and what it would have to
survive there.

---

## Go further

- The page only tells the truth as of the last refresh. Make it refresh itself —
  the browser has more than one way to do this; find two, compare crude against
  clever.
- You made a map image of your world in [Reading the world itself](../world-data/guided.md).
  Web servers serve files as well as answers — Flask's docs call these static
  files. Put the map on the page. Then decide what else deserves to be there.
- Could someone open this page from *outside* the house? The techniques from
  [Opening the door to the internet](../joining-from-outside/guided.md) were never
  Minecraft-specific — they apply to any port, and realizing that is realizing
  what they actually were. But before you do it: what does this page leak, and to
  whom? Player names. Schedules. Whether anyone's home. Exposure is a decision
  about information, not just about a port.
- Genuinely open: what should a real server dashboard show that this page
  doesn't? Design it on paper — uptime, deaths today, the map, last backup, who
  talked most, whatever you'd actually look at — then rank every idea by effort
  versus joy. Build nothing yet. The ranking is the skill; the building is
  [the open part of the module](../../PATH.md).

---

## What you have now

- You serve a web page other devices in the house can open — live who's-online,
  backed by a JSON route, backed by your own ping code
- Words other lessons can use freely, because you've now lived them: HTTP, route,
  request, response, API, `localhost` versus `0.0.0.0`
- A designed offline state — your first act of error handling as user experience
