# Bridging to Discord and building a status page

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Right now there are two conversations in the house that can't hear each other. One
happens in Minecraft chat, among the people standing in your world. The other
happens in a Discord channel, among people on phones and laptops who may be nowhere
near the game. And there's a third group with no window at all: anyone who just
wants to know who's playing right now, without launching anything.

This session builds for all of them, in two parts. First, a bridge: one Python
program that relays messages both ways, so a message typed in Discord appears in
game chat, and chat typed in the game appears in the channel. Then, a status page:
a **web server** of your own, serving a page any phone on the home wifi can open to
see who's on the Minecraft server right now — names and a count, live.

Almost every piece of this already exists in things you've built. Sending text into
the game from Python is a command over RCON. Getting chat *out* of the game is
lines in `latest.log`, which you already know how to read and pick apart. Asking
who's online is the ping script you wrote byte by byte. The genuinely new parts are
Discord's side of the handshake and running a web server yourself — and the fact
that one program has to hold several live connections at once. That last part is
the real subject here: these are the most multi-part systems you've built, and they
get designed on paper before they get typed.

One rule for the page half, stated up front because the temptation will come: one
Python file, one page of typed-by-hand markup. No frameworks, no build steps. The
page stays small enough to understand completely.

---

## Before you start

You need:

- **RCON and log reading from Python.** You can send your server a command from a
  Python script, you keep the RCON password in a file your code reads rather than
  in the code, and you can open `latest.log`, pick out the lines that matter, and
  think about how a program keeps up with a file that's still growing.
  [Reading logs and sending commands with Python](../python-logs-and-rcon/guided.md)
  established all of it. Quick checks: run your RCON script and make something
  happen in the game; run a script that prints every chat line from today's log.
- **The self-triggering bug, already survived once.** You've written a bot that
  reacts to chat and seen what happens when a bot can hear itself.
  [Bot chat commands and building with loops](../bot-commands-and-building/guided.md) established
  this.
- **A way to ask your server who's online, from Python.** The Server List Ping
  script from
  [Reading world data and speaking the protocol](../world-data-and-protocol/guided.md)
  is the one this lesson assumes — it's yours end to end. (The `list` command over
  RCON works too; if you use it, you'll be parsing a line of text instead of
  reading JSON.) Quick check: your ping script prints a JSON status when the
  server is up.
- **A Discord server people actually use.** Not a lesson — a condition of the
  world. Anyone can create a Discord server free from inside the Discord app, and
  many households already have one. You need enough authority on that server to
  add a bot to it: either the server is yours, or you do this part together with
  the person who runs it.
- **Version control with a `.gitignore`.**
  [Tracking your server files with git](../git-for-your-server/guided.md) established this. Quick
  check: `git status` in your project folder runs clean.
- **A phone or any second device on the home wifi**, and the ability to find your
  Mac's local address on demand — from
  [Letting friends join your server](../letting-friends-join/guided.md). Quick
  check: you can say your Mac's local wifi address without looking it up twice.
- **A Minecraft server that's running** while you work —
  [Running your own server](../running-your-own-server/guided.md). And for both
  payoffs to outlast the session: a machine where things
  [stay running](../always-on/guided.md).

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit. For connection mysteries, its layer-finding step is the one that pays fastest.

---

## What you'll have at the end

By the end of this session you will have:

- A bot of your own, online in the household's Discord server, with its credential
  stored the way credentials should be stored
- One program bridging two systems that have never heard of each other: Discord
  messages appearing in game chat, game chat appearing in Discord
- Proof — because you tried to break it — that the bridge cannot echo its own
  messages forever
- A web server of your own, with a route that answers in HTML and a route that
  answers in JSON
- A page, reachable from any device in the house, showing who's on the Minecraft
  server right now
- A deliberate answer — designed by you — for what that page says when the
  Minecraft server is off
- A drawing of the whole system that was right before the code existed

---

## New tools

**Discord's API and bot accounts.** Discord runs on Discord's computers; every
phone and desktop app is a client. Programs can be clients too, through Discord's
public API — and Discord issues them their own kind of identity, called a bot
account. A bot appears in the member list, can read and post in channels it's been
allowed into, and proves who it is with a **token**: a long generated string that
is the bot's entire identity. Whoever holds the token is the bot. Treat it like the
RCON password, but more so: it never goes in code, it never goes in git, and it can
be revoked and reissued at any time from the place that created it. You'll feel why
that last property matters before this session ends.

**Where the setup instructions live: Discord's own developer documentation.** The
flow for creating a bot — an application in Discord's developer portal, a bot
identity inside it, a token to copy, an invite link to add it to a server, and
permission for it to read message content — changes often enough that no
description written here would stay true. Discord's developer docs are the source;
search for Discord's documentation on creating a bot and follow the current flow.
One thing to know going in: Discord gates a bot's ability to read what people type
behind a setting its docs call an *intent* — a declared reason to receive that
category of information. When your bot can connect but seems deaf, that setting is
the first place to look.

**A Python library for Discord.** Speaking Discord's API by hand is possible but
not today's work; a library does the protocol so your code can say "when a message
arrives, run this function." The name you'll see cited most is **discord.py** — but
its ecosystem has history, including pauses and forks, so don't take any page's
word for what's healthy now, including this one. Evaluate it the way you
[evaluated mineflayer](../choosing-a-version/guided.md): the project's README, then
its issue tracker, then a decision you write down with the date. Install the winner
into your project's environment with `pip` as usual.

**`async` and `await`, exactly one paragraph's worth.** The Discord library spends
almost all its time waiting for Discord to say something. Python's `async def` and
`await` are how a function declares "I wait at these points — and while I'm
waiting, other code in this program is free to run." The library requires its
event-handling functions to be declared that way, and its documentation shows
exactly where the words go. That is genuinely all you need today; the deeper story
can wait until you need it.

**HTTP** is the protocol browsers speak, and after the ping protocol, you've earned
the plain version: when a browser opens a URL, it connects to the named machine and
port and sends *text* — a request line like `GET /status`, some headers, a blank
line. The server replies with text: a status line carrying a code (`200 OK`,
`404 Not Found`, `403 Forbidden`), headers, a blank line, and then the body — the
page itself. That's the whole shape. The multiplayer screen pings game servers; the
browser pings web servers. Same idea, different vocabulary, and you have hand-built
one of the two, so the other is legible by analogy.

A **route** is the server-side rule that maps a path — `/`, `/status` — to the code
that answers it.

**Flask** is a small Python library that turns Python functions into web responses:
you attach a path to a function, and Flask runs a web server that calls your
function whenever a browser asks for that path. Before installing it, give it the
same treatment as the Discord library: find it, look at its README and activity,
note what else exists (you'll see FastAPI, bigger and shaped for APIs, and Bottle,
smaller and quieter) and satisfy yourself that a small, mature, boring library is
the right size for one page. Then install it into your project environment with the
routine you know, and open **Flask's own quickstart** — it, not this page, is where
you'll confirm how to run the server and what port it defaults to.

**HTML** is the text format pages are written in — content with labeled structure,
the way JSON is data with labeled structure. You'll see below that it's met, not
lectured.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- Trace one message all the way around, before any code exists: someone types in
  Discord, your bridge relays it into the game. Does that relayed text then show up
  in `latest.log`? If it does — what will your log watcher do with it? Follow the
  consequence as far as it goes.
- Your program will spend nearly all its time waiting on Discord. What is it doing
  about the log file during that wait? Can one program wait on two things at once —
  what would have to be true for that to work?
- The bot token and the RCON password are both secrets your program reads at
  startup. If each one leaked, which leak is worse — and which one is easier to
  recover from?
- When a browser asks a server for a page, what actually travels down the wire?
  You've written one network conversation byte by byte — sketch your guess at this
  one's shape before you look at a real request.
- Will a phone on the wifi be able to open `localhost:5000`? Say exactly why or why
  not. Notice, while you answer, that you *can* answer — there was a time this
  question was a wall.
- What should the page show when the Minecraft server is off? Decide now, before it
  happens on its own.

---

## The work

The goals below come with what "done" looks like, and not much else. You have built
every ingredient before; the work is the composition.

### Draw the system first

On paper: every box, every arrow. The boxes are the Discord service (their
machines), your bridge program, your server's RCON door, and `latest.log`. Label
every arrow with what travels along it and in which direction. This drawing isn't
just for the bridge — it will grow again before the session ends.

Then make two decisions in writing while it's still cheap to change your mind:

- **Format:** when a message crosses the bridge, how is it marked on the other side
  so nobody wonders who said it, or from where?
- **The loop:** find the path on your drawing where a message could go around more
  than once. Choose what stops it. If you're convinced no such path exists, write
  that down too — it's a prediction, and the bridge will test it.

Done when every arrow is labeled, both formats are written down, and the loop
question has a written answer either way.

### A bot, online, answering

Follow Discord's developer docs through the current bot-creation flow and invite
the bot into the household server. Before the token exists anywhere on disk: add
its future filename to `.gitignore`. Then put the token in that file — its own
file, for example `discord_token.txt`, which your code reads at startup the same
way it reads the RCON password file.

Now the smallest program that proves the whole channel works: connect, and reply to
one test message — a message saying `ping` gets an answer.

Done when:

- The bot shows as online in the server's member list
- Typing the test message in the channel gets the bot's reply
- The token exists in exactly one file, `git status` shows that file ignored, and
  the token appears nowhere in your code
- You can point at the word `async` in your program and say in one sentence why the
  library wants it there

<details>
<summary>If the bot is online but silent</summary>

Is it *receiving* the message at all? Print whatever arrives. If nothing arrives,
the gap is almost certainly permission to see message content — the intent setting
from the orientation. Both Discord's docs and your library's docs cover it.

</details>

### Discord to game, live

Replace the test reply with the real thing: messages typed in your chosen channel
go into game chat over RCON, carrying the Discord author's name in the format you
designed on paper.

Done when someone typing in Discord is readable in the game, correctly attributed —
confirmed by a player standing in the world, not just by your terminal.

### Game to Discord, live

The other direction: a watcher inside the same program that notices new lines
appended to `latest.log`, keeps its place between looks, picks out player chat, and
posts it to the channel in your format. Keeping its place means a file position:
remember where you stopped reading, read from there to the end next time, move the
marker.

Done when:

- Chat typed in the game appears in the Discord channel, attributed
- It keeps working across many messages, not just the first batch
- Stretch: it survives a server restart. The log starts over when the server does —
  what should your saved position do when the file is suddenly shorter than it?

<details>
<summary>If the bot goes quiet or drops when you add the watcher</summary>

The watcher cannot be an ordinary infinite loop — this one program is also holding
the Discord connection open, and a loop that never yields starves everything else.
Your library has a mechanism built for "run this function every few seconds";
search its documentation for scheduled or repeating tasks.

</details>

### Prove the loop can't happen

Now test the prediction from your drawing. Type in Discord and watch what comes
back around. Type in game and watch the other direction. If your guard held:
disable it, briefly and on purpose, and watch what begins — then ctrl-C, restore
the guard, and run again.

Done when bridged messages demonstrably do not re-bridge, and you have seen *why*
they don't, not just that they don't. You met this bug once before, in
[a smaller room](../bot-commands-and-building/guided.md). This is the same bug on a
bigger stage, and it will be waiting in every system you ever build that both reads
and writes the same channel.

### Back to paper: the system grows

The bridge put the server in the family's Discord. The rest of this session puts it
on their phones' browsers — and this time you run the server side.

First move: take out the drawing and expand it. New boxes: a web server (on this
machine), the phones on the home wifi. New arrows: the phones asking your web
server a question, and your web server asking the Minecraft server who's online —
that last arrow is your ping script, about to get a new job. When the drawing shows
the whole evening's system in one picture, go on.

### A hello route on your own web server

Evaluate and install Flask as above, then use its quickstart to stand up the
smallest possible server: one route at `/`, returning one line of HTML — a heading
that names your server, nothing more. Confirm the run command and the default port
from the quickstart, not from here.

Done when:

- A browser on the same machine shows your words at `localhost` on Flask's port
- view-source in the browser shows *exactly* what your function returned — text all
  the way down, nothing added, nothing hidden
- If the page that answered didn't look like yours — wrong words, an error you
  didn't write — you found out what else was listening on that port before moving
  on. (More than one program can want a port; you've known since the day you
  started a server twice that only one gets it. Picking another port is a one-flag
  fix once you know that's the situation.)

### A `/status` route that answers with data

Wire your SLP function into a second route: `/status` returns JSON — at minimum a
player count and a list of names. Your ping script already extracts these; today it
stops printing them and starts *serving* them.

Done when:

- Visiting `/status` in the browser shows JSON that matches the truth in-game
- Someone joins or leaves, you refresh, and the answer changes

Pause on what you just made: a program that answers questions for other programs.
That's all the word **API** means, and you now own one.

### The page

Now the human-facing side. Two pieces, both typed by hand — this is subject matter,
not setup.

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

Flask's server is currently listening on the self-only address — `localhost`, which
you've known since the day you first joined your own server, means "this machine,
myself." A phone can't call your machine's self-only name.

The fix is one setting: bind the server to **all** of the machine's addresses — the
spelling is `0.0.0.0`, which means "listen on every address this machine has,"
including the wifi one. Flask's docs name the flag; find it, restart with it. If
macOS asks whether your Python program may accept incoming connections, that's the
same doorbell you met the first time a friend joined your world — answer for your
own program accordingly.

Then, on a phone on the home wifi, open:

`http://<your Mac's local address>:<Flask's port>/`

Read that URL once more before you type it. It's the same address that let a friend
join your Minecraft world, with a different port on the end. Same machine,
different door. That one line is most of this module's networking, collapsed.

Done when: a phone that isn't yours, on the home wifi, shows who's online in the
world — and the number is right.

---

## Break it on purpose

Four experiments — two on the bridge, two on the page. Cause each one, read what
happens, undo it.

**Kill the key while the engine runs.** With the bridge running and working, go to
the developer portal and regenerate the bot's token. Now watch the running program
— does an established connection die the moment its credential does? Whatever you
observe, keep watching until something changes. Then stop the bridge and start it
again with the old token still in the file, and read that failure too. To recover:
new token into the token file — nowhere else — and restart. Notice the price of
recovery: one button, one file edit. That is the entire argument for keeping
secrets in exactly one place.

**Take away its voice, not its connection.** In the Discord server's settings,
remove the bot's permission to send messages in the bridge channel — nothing else.
Type something in the game and watch the bridge's terminal. The bot is still
online, still connected, and yet the send fails; read the error and note what it
accuses you of. Restore the permission. You have just seen the difference between
*can't connect* and *connected but refused* — different failures, different fixes,
and the second one wears the number 403 all over the web, where you will meet it
again.

**Rebind to self-only.** Put the page's binding back to the default, restart, and
try the phone again. Watch how it fails — and watch yourself diagnose it in one
glance. A service reachable from its own machine and invisible to the rest of the
network is precisely the situation you once spent a whole session learning to see.
It would have been an afternoon of confusion once; it's a shrug now. That distance
is measurable growth — measure it. Then bind back to `0.0.0.0`.

**Kill the thing the page depends on.** With the page up on a phone, stop the
Minecraft server. Load the page and read the failure end to end: your SLP call gets
the fast no (connection refused — an old friend), your route raises, the browser
shows a server-error page you never designed.

Now do the real work: you decided in Predict what the page *should* say when the
server is off. Build that. Catch the failure in the route, return a deliberate
answer shaped like `{"online": false}`, and have the page render your chosen words
as a designed state, not an accident. Start the server again and watch the page
come back.

What this teaches is worth saying plainly: an error a user sees is a design
surface. Unhandled is a choice, and so is handled — and you just made your first
deliberate one.

---

## What just happened

Your bridge is one program holding two conversations in two unrelated protocols —
Discord's API on one side, RCON and a log file on the other — and neither system
has any idea the other exists. Discord believes it's talking to a bot. The
Minecraft server believes it's taking console commands and writing its diary. Your
program is the only place in the universe where those two meet. There's a word for
software in that position: infrastructure. A surprising amount of what holds the
internet together is programs shaped exactly like yours — small translators
standing between systems that never heard of each other.

About tokens, one layer deeper than you needed today. A password is one secret for
a whole account, held by a human, changed rarely and painfully. A token is issued
*to a program*, limited to what that program may do, and revocable in one click
without touching anything else — you proved that when regenerating it cost you a
button and a file edit. That's why program-to-program identity moved from passwords
to tokens across the whole industry, and why "never in code, never in git" isn't
paranoia: cheap revocation only helps if you notice the leak, and tokens committed
to public repositories get found by automated scanners in minutes.

The `async` the library made you write: your program was never doing three things
at once so much as never wasting a wait. Waiting on Discord, waiting between looks
at the log — every wait declared, so one program could hold all of it. One more
name worth keeping: a **webhook** is a URL a Discord channel can issue, where
posting data to the URL makes a message appear in the channel — no bot account, no
standing connection. It's the lighter tool when messages only flow *in*. You didn't
need it today; the last section offers a reason to try it.

And the pattern you built on the page — request, response, JSON, a page that
fetches from a route — is not a toy version of something bigger. It *is* the
pattern. Nearly every app on every phone is a pretty client talking to somebody's
`/status` route, with more routes next to it. You've now stood on both sides of
that arrangement, and you hand-built one of the underlying protocols besides. A URL
decomposes entirely into things you own: the machine's name, the port, the path —
machine, door, question. And Flask's development server is a real server in exactly
the way your Minecraft server is — a program parked on a port, reading requests,
writing responses. The warning it prints about being a development server is about
serving the hostile public internet at scale, not about correctness; the house is
exactly the deployment it's fine for.

Which leaves the real lesson of the evening. Client and server are roles, not
identities. Count what your one machine is right now: a Minecraft server to the
players, an RCON server to its own scripts, a web server to every phone in the
house — and a client of Discord. The same machine, the same evening, both sides of
four conversations. Which side you're on is only ever a question of who listened
and who called.

---

## Go further

- The log holds more than chat — deaths and advancements have their own line
  shapes, some of which you found in
  [Reading logs and sending commands with Python](../python-logs-and-rcon/guided.md).
  Bridge them, formatted so a Discord reader instantly knows a death from a chat
  line. Which events are worth the noise, and who gets tired of them first?
- Rebuild the game→Discord direction using a webhook instead of the bot connection
  — Discord's docs cover webhooks. Then compare honestly: lines of code, what had
  to stay running, and what the failure looks like if the token leaks versus if the
  URL does.
- You made a map image of your world in
  [Reading world data and speaking the protocol](../world-data-and-protocol/guided.md).
  Web servers serve files as well as answers — Flask's docs call these static
  files. Put the map on the page. Then decide what else deserves to be there.
- Could someone open this page from *outside* the house? The techniques from
  [Letting friends join your server](../letting-friends-join/guided.md) were never
  Minecraft-specific — they apply to any port, and realizing that is realizing what
  they actually were. But before you do it: what does this page leak, and to whom?
  Player names. Schedules. Whether anyone's home. Exposure is a decision about
  information, not just about a port.
- Genuinely open: should everything bridge? Game chat used to scroll away and be
  gone; the Discord channel is a permanent, searchable record that people outside
  the game can read forever. Who decides what leaks from a private game into a
  persistent log — and in the other direction, does everything said in the family
  channel belong on a screen inside the game? Nobody has settled this. Write down
  where you land.
- Genuinely open: what should a real server dashboard show that this page doesn't?
  Design it on paper — uptime, deaths today, the map, last backup, who talked most,
  whatever you'd actually look at — then rank every idea by effort versus joy.
  Build nothing yet. The ranking is the skill; the building is
  [the open part of the module](../../PATH.md).

---

## What you have now

- A bridge program connecting a Discord channel and your server's chat in both
  directions — and if it lives on the [always-on machine](../always-on/guided.md),
  the family Discord and the Minecraft server are now one room, permanently
- A Discord bot identity of your own, its token in a gitignored file and nowhere
  else
- You serve a web page other devices in the house can open — live who's-online,
  backed by a JSON route, backed by your own ping code
- A designed offline state — your first act of error handling as user experience
- Words you now own from use, not definition: API, token, intent, webhook, async,
  HTTP, route, request, response, `localhost` versus `0.0.0.0`
- An instinct that transfers everywhere: any program that both reads and writes the
  same channel can feed itself — and the fix is designed in, on paper, before the
  first line of code
