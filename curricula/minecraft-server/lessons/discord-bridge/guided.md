# Two worlds, one conversation

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Right now there are two conversations in the house that can't hear each other. One
happens in Minecraft chat, among the people standing in your world. The other happens
in a Discord channel, among people on phones and laptops who may be nowhere near the
game. This session builds a bridge: one Python program that relays messages both
ways, so a message typed in Discord appears in game chat, and chat typed in the game
appears in the channel.

Almost every piece of this already exists in things you've built. Sending text into
the game from Python is a command over RCON. Getting chat *out* of the game is lines
in `latest.log`, which you already know how to read and pick apart. The genuinely new
part is Discord's side of the handshake — and the fact that one program has to hold
all of it at once. That last part is the real subject here: this is the most
multi-part system you've built, and it gets designed on paper before it gets typed.

---

## Before you start

You need:

- **RCON from Python.** You can send your server a command from a Python script, and
  you keep the RCON password in a file your code reads, not in the code itself.
  [Talking to the server from Python](../rcon-scripting/guided.md) established this. Quick
  check: run your RCON script and make something happen in the game.
- **Log reading from Python.** You can open `latest.log`, pick out the lines that
  matter, and you've thought about how a program keeps up with a file that's still
  growing. [Reading the logs](../reading-the-logs/guided.md) established this. Quick check:
  run a script that prints every chat line from today's log.
- **The self-triggering bug, already survived once.** You've written a bot that
  reacts to chat and seen what happens when a bot can hear itself.
  [Bot chat commands](../bot-chat-commands/guided.md) established this.
- **A Discord server people actually use.** Not a lesson — a condition of the world.
  Anyone can create a Discord server free from inside the Discord app, and many
  households already have one. You need enough authority on that server to add a bot
  to it: either the server is yours, or you do this part together with the person
  who runs it.
- **Version control with a `.gitignore`.** [Git for your server](../git-for-your-server/guided.md)
  established this. Quick check: `git status` in your project folder runs clean.
- Helpful, for the payoff to outlast the session: a machine where things
  [stay running](../always-on/guided.md).

---

## What you'll have at the end

By the end of this session you will have:

- A bot of your own, online in the household's Discord server, with its credential
  stored the way credentials should be stored
- One program bridging two systems that have never heard of each other: Discord
  messages appearing in game chat, game chat appearing in Discord
- Proof — because you tried to break it — that the bridge cannot echo its own
  messages forever
- A drawing of the whole system that was right before the code existed

---

## New tools

**Discord's API and bot accounts.** Discord runs on Discord's computers; every phone
and desktop app is a client. Programs can be clients too, through Discord's public
API — and Discord issues them their own kind of identity, called a bot account. A bot
appears in the member list, can read and post in channels it's been allowed into, and
proves who it is with a **token**: a long generated string that is the bot's entire
identity. Whoever holds the token is the bot. Treat it like the RCON password, but
more so: it never goes in code, it never goes in git, and it can be revoked and
reissued at any time from the place that created it. You'll feel why that last
property matters before this session ends.

**Where the setup instructions live: Discord's own developer documentation.** The
flow for creating a bot — an application in Discord's developer portal, a bot
identity inside it, a token to copy, an invite link to add it to a server, and
permission for it to read message content — changes often enough that no description
written here would stay true. Discord's developer docs are the source; search for
Discord's documentation on creating a bot and follow the current flow. One thing to
know going in: Discord gates a bot's ability to read what people type behind a
setting its docs call an *intent* — a declared reason to receive that category of
information. When your bot can connect but seems deaf, that setting is the first
place to look.

**A Python library for Discord.** Speaking Discord's API by hand is possible but not
today's work; a library does the protocol so your code can say "when a message
arrives, run this function." The name you'll see cited most is **discord.py** — but
its ecosystem has history, including pauses and forks, so don't take any page's word
for what's healthy now, including this one. Evaluate it the way you
[evaluated mineflayer](../choosing-a-version/guided.md): the project's README, then its issue
tracker, then a decision you write down with the date. Install the winner into your
project's environment with `pip` as usual.

**`async` and `await`, exactly one paragraph's worth.** The Discord library spends
almost all its time waiting for Discord to say something. Python's `async def` and
`await` are how a function declares "I wait at these points — and while I'm waiting,
other code in this program is free to run." The library requires its event-handling
functions to be declared that way, and its documentation shows exactly where the
words go. That is genuinely all you need today; the deeper story can wait until you
need it.

---

## Predict

Write your answers down first:

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

---

## The work

The goals below come with what "done" looks like, and not much else. You have built
every ingredient before; the work is the composition.

### Draw the system first

On paper: every box, every arrow. The boxes are the Discord service (their machines),
your bridge program, your server's RCON door, and `latest.log`. Label every arrow
with what travels along it and in which direction.

Then make two decisions in writing while it's still cheap to change your mind:

- **Format:** when a message crosses the bridge, how is it marked on the other side
  so nobody wonders who said it, or from where?
- **The loop:** find the path on your drawing where a message could go around more
  than once. Choose what stops it. If you're convinced no such path exists, write
  that down too — it's a prediction, and the bridge will test it.

Done when every arrow is labeled, both formats are written down, and the loop
question has a written answer either way.

### A bot, online, answering

Follow Discord's developer docs through the current bot-creation flow and invite the
bot into the household server. Before the token exists anywhere on disk: add its
future filename to `.gitignore`. Then put the token in that file — its own file, for
example `discord_token.txt`, which your code reads at startup the same way it reads
the RCON password file.

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

Replace the test reply with the real thing: messages typed in your chosen channel go
into game chat over RCON, carrying the Discord author's name in the format you
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

Now test the prediction from your drawing. Type in Discord and watch what comes back
around. Type in game and watch the other direction. If your guard held: disable it,
briefly and on purpose, and watch what begins — then ctrl-C, restore the guard, and
run again.

Done when bridged messages demonstrably do not re-bridge, and you have seen *why*
they don't, not just that they don't. You met this bug once before, in
[a smaller room](../bot-chat-commands/guided.md). This is the same bug on a bigger stage, and
it will be waiting in every system you ever build that both reads and writes the
same channel.

---

## Break it on purpose

Cause each one, read what happens, undo it.

**Kill the key while the engine runs.** With the bridge running and working, go to
the developer portal and regenerate the bot's token. Now watch the running program —
does an established connection die the moment its credential does? Whatever you
observe, keep watching until something changes. Then stop the bridge and start it
again with the old token still in the file, and read that failure too. To recover:
new token into the token file — nowhere else — and restart. Notice the price of
recovery: one button, one file edit. That is the entire argument for keeping secrets
in exactly one place.

**Take away its voice, not its connection.** In the Discord server's settings,
remove the bot's permission to send messages in the bridge channel — nothing else.
Type something in the game and watch the bridge's terminal. The bot is still online,
still connected, and yet the send fails; read the error and note what it accuses you
of. Restore the permission. You have just seen the difference between *can't
connect* and *connected but refused* — different failures, different fixes, and the
second one wears the number 403 all over the web, where you will meet it again.

---

## What just happened

Your bridge is one program holding two conversations in two unrelated protocols —
Discord's API on one side, RCON and a log file on the other — and neither system has
any idea the other exists. Discord believes it's talking to a bot. The Minecraft
server believes it's taking console commands and writing its diary. Your program is
the only place in the universe where those two meet. There's a word for software in
that position: infrastructure. A surprising amount of what holds the internet
together is programs shaped exactly like yours — small translators standing between
systems that never heard of each other.

About tokens, one layer deeper than you needed today. A password is one secret for a
whole account, held by a human, changed rarely and painfully. A token is issued *to
a program*, limited to what that program may do, and revocable in one click without
touching anything else — you proved that when regenerating it cost you a button and
a file edit. That's why program-to-program identity moved from passwords to tokens
across the whole industry, and why "never in code, never in git" isn't paranoia:
cheap revocation only helps if you notice the leak, and tokens committed to public
repositories get found by automated scanners in minutes.

And the `async` the library made you write: your program was never doing three
things at once so much as never wasting a wait. Waiting on Discord, waiting between
looks at the log — every wait declared, so one program could hold all of it. One
more name worth keeping from today: a **webhook** is a URL a Discord channel can
issue, where posting data to the URL makes a message appear in the channel — no bot
account, no standing connection. It's the lighter tool when messages only flow *in*.
You didn't need it today; the last section offers a reason to try it.

---

## Go further

- The log holds more than chat — deaths and advancements have their own line shapes,
  some of which you found in [Reading the logs](../reading-the-logs/guided.md). Bridge them,
  formatted so a Discord reader instantly knows a death from a chat line. Which
  events are worth the noise, and who gets tired of them first?
- Commands from the couch: make `!who` typed in Discord answer with who's online —
  RCON has a command that knows. What else should be askable from outside the game?
  Should anything *not* be?
- Rebuild the game→Discord direction using a webhook instead of the bot connection —
  Discord's docs cover webhooks. Then compare honestly: lines of code, what had to
  stay running, and what the failure looks like if the token leaks versus if the
  URL does.
- Genuinely open: should everything bridge? Game chat used to scroll away and be
  gone; the Discord channel is a permanent, searchable record that people outside
  the game can read forever. Who decides what leaks from a private game into a
  persistent log — and in the other direction, does everything said in the family
  channel belong on a screen inside the game? Nobody has settled this. Write down
  where you land.

---

## What this leaves behind

- A bridge program connecting a Discord channel and your server's chat in both
  directions — and if it lives on the [always-on machine](../always-on/guided.md), the family
  Discord and the Minecraft server are now one room, permanently
- A Discord bot identity of your own, its token in a gitignored file and nowhere
  else
- Words you now own from use, not definition: API, token, intent, webhook, async
- An instinct that transfers everywhere: any program that both reads and writes the
  same channel can feed itself — and the fix is designed in, on paper, before the
  first line of code
