# Keeping it running

<!-- Generated from core.md. Substantive fixes belong in core.md; regenerate rather than fork. -->

## What this is

Your server is running because you're sitting there. Close that connection and it stops.

What you want is a machine that starts the server itself — at boot, with nobody logged
in, because on this machine nobody ever is. That's this session, and it ends the module.

You'll write a small file that tells the machine what to run, prove it by restarting a
computer you can't see, and then hand the new address to your friends.

And then the last thing, which is the point of everything since you first opened a
terminal on a machine in another building: with your friends playing, you'll shut your
laptop, unplug it, and carry it into another room. Nothing will happen. Nothing depends on
it any more.

---

## Before you start

You need:

- **The server folder on the rented machine, running when you start it by hand, with the
  port open.**
  [Moving the server across](../moving-the-server-across/guided.md) gets you there. Quick
  check: start it by hand and join it from your Mac at its public address.
- **People outside your home have joined a server of yours before.**
  [Letting friends join your server](../../../minecraft-server/lessons/letting-friends-join/guided.md)
  covers it. Quick check: you can say what address your friends currently type and who is
  on your whitelist.

If you get stuck beyond what the hints cover, [When you're stuck](../../../../reference/when-youre-stuck.md) is the toolkit.

---

## What you'll have at the end

By the end of this session you will have:

- A file you wrote that tells the machine to start your server at boot
- Proof it works, by restarting a computer that has no screen and nobody logged into it
- Your friends playing at an address that has nothing to do with your home network
- The knowledge of where a background program's complaints go when it has no window to
  print them in
- Your own computer switched off, in another room, while the world carries on

---

## New tools

**systemd** is Linux's program-starter: the first program the machine runs, which starts
everything else and keeps it running. Every background program on a modern Linux machine
was started by it, and it's been running on yours since before you ever logged in.

You tell it what to run by writing a small text file called a **unit**. Units for services
live in `/etc/systemd/system/`. `man systemd.service` lists everything one can contain, and
[systemd's own documentation](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html)
is the same page on the web.

**`systemctl`** is the command you use to talk to systemd — start something, stop it, mark
it to run at boot, ask how it's doing. `man systemctl` is the authority.

**`journalctl`** reads the log systemd keeps. You met it reading login attempts; here it's
where your server's failures go when the server fails *before* it can write to its own
log. `man journalctl` covers it.

If you've set up something similar on a Mac, this is the same job launchd does there, with
a different file format. If you haven't, nothing is missing — none of that is assumed
below.

---

## Predict

Write your answers in [your logbook](../../../../logbook.md) first:

- The server is running in your SSH session right now. What do you think happens to it
  when you close that window? What would have to be true for it *not* to stop?
- On your own computer, some things come back after a restart and some don't. Something
  must hold the list of what comes back. Where do you think that list lives on this
  machine?
- Once the server has no console window, where do its words go? And where do the
  complaints go from a failure that happens *before* the server exists at all?
- Your friends currently type an address to join. What has to change, and what doesn't?

---

## The work

### Write the unit

Create a file at `/etc/systemd/system/minecraft.service`. Here's the shape, with the parts
only you can know left blank. Type the values you fill in.

<span className="run-where run-where-remote">On the rented machine</span>

```
[Unit]
Description=Minecraft server
After=network.target

[Service]
User=
WorkingDirectory=
ExecStart=
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

Every blank is answerable from something you already know.

- **`User=`** — which account should this run as? Not root. You made the right one two
  sessions ago, and it owns the folder.
- **`WorkingDirectory=`** — a Minecraft server creates all of its files in whatever folder
  it starts from. You learned that the first time you ever ran one and the world appeared
  next to the jar. Started by systemd, "the folder it starts from" is whatever this line
  says. It must be an absolute path: **systemd does not understand `~`**.
- **`ExecStart=`** — the absolute path to java, then the arguments, exactly as you typed
  them by hand last session. `which java` prints that path.
- **`Restart=on-failure`** — start it again if it dies unexpectedly.

Look at the file's shape for a moment before you move on. It's `key=value` lines, gathered
under headings in square brackets. You've seen `key=value` before, in `server.properties`.
Different program, different machine, recognisably the same idea.

### Load it and start it

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo systemctl daemon-reload
sudo systemctl enable --now minecraft
sudo systemctl status minecraft
sudo journalctl -u minecraft -f
```

`daemon-reload` makes systemd re-read the file. The last line follows the server's output
as it starts, and `Ctrl-C` stops watching without stopping the server.

Stop your hand-started copy first, or you'll meet a port collision — the same
two-programs-one-port error you met on your Mac, on a machine two thousand miles away,
because it was never about your Mac.

One distinction that confuses nearly everybody, worth getting straight now: **`start` runs
something immediately. `enable` marks it to run at every boot. Neither one implies the
other.** `enable --now` does both, which is why it's what you used.

### The test that matters

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo reboot
```

Your connection will drop. That's the machine going down, exactly as it should.

Wait. Reconnect. Find the server already running.

Sit with that for a second, because it's the whole point of the last four sessions.

Nobody logged in. And more than that — **there is no login on this machine at all.** No
screen, no keyboard, no account for a person to sign into in the morning. The last
human-shaped gap in the chain didn't get closed. It stopped existing.

### Hand it to your friends

Give your friends the new address. Not a tunnel address, not anything to do with your home
network — the machine's own public address on the internet.

Before they try, two things to check rather than assume:

<span className="run-where run-where-remote">On the rented machine</span>

```
cat /home/minecraft/server/whitelist.json
```

Read it. Confirm the names are actually there. Assuming is the failure mode this whole
module has been arguing against.

Then check that `online-mode` is `true` in `server.properties`, and be able to say why it
matters more here than it did at home. Minecraft's port on this machine is open to the
entire internet, so anyone at all can attempt to connect. The whitelist is the thing that
stops them joining.

Then have a whitelisted friend join.

### The demonstration

With your friends playing, shut your laptop. Unplug it. Carry it into another room.

Nothing happens.

Nothing at all depends on it any more. That's the module, performed rather than described.

### Learn to stop what you can't see

There's no console window now. Stop the service, then go and find out whether it saved
properly:

<span className="run-where run-where-remote">On the rented machine</span>

```
sudo systemctl stop minecraft
```

Then read `logs/latest.log` in the server folder and look for the saving lines.

Whatever you find is a fact you measured rather than a promise you were given, and it
decides how much you trust a service stop with a world you care about. Start it again when
you're done.

---

## Break it on purpose

**Break the path in the unit file.** Open `minecraft.service` and misspell the path to
`server.jar`, or to java. One letter is enough. Run `daemon-reload`, then restart the
service.

Nothing starts. And this time, nothing appears in `logs/latest.log` either — because the
failure happened before the server existed to write anything down.

Your task is to find where the complaint actually went. `systemctl status minecraft` will
tell you it failed. `journalctl -u minecraft` will tell you what it tried to run and what
it couldn't find.

Then fix the path, reload, restart, and verify.

A background program that fails doesn't fail *at* you. It fails somewhere, quietly, and
knowing where to look is the first job of running anything.

**Start it twice.** With the service running, start the server by hand in an SSH session
and read the refusal. Then quit it.

Two programs, one port — an old error in a new country.

---

## What just happened

A computer nobody is sitting at, that nobody is logged into, in a building you will never
enter, starts your server when it boots. It will do that again at three in the morning
without telling anyone.

"Services" and "programs you run" turn out to be the same species. The only difference is
who types the start command: you, or a program whose job is starting programs. Every server
on earth — every website, every big Minecraft server, every service behind every app on
your phone — is an ordinary program that some machine's startup system launches at boot,
watches while it runs, and stops at shutdown. On Linux that's systemd. A Mac calls it
launchd and configures it with a different file format. The names change; the idea doesn't.
And you've now written one of those files.

Your collection of settings files is longer than you might notice: `key=value` in
`server.properties`, JSON in your datapacks and your whitelist, and now `key=value` under
bracketed headings in a unit file. Different costumes, same idea every time — a program's
behaviour is data, data lives in files, and files can be edited by you.

You also gave something up, and it's worth naming: the console window. When the server
became a service, its interface moved. Starting and stopping belong to `systemctl` now.
The server's own voice lives in `logs/latest.log`. And complaints from *before the server
even exists* — a bad path, a missing program — live in the journal, because a program that
never started can't very well write to its own log. Knowing which of those places to check,
and when, is most of what "operating a server" means.

And here's the thing that quietly disappeared across this whole module. There was no port
forwarding. No tunnel. No overlay network, no dynamic DNS, no router configuration at all.
That entire apparatus existed for one reason: home connections aren't reachable from the
internet. A rented machine is reachable, and a large part of what you're paying for each
month is exactly that.

---

## Go further

- `systemctl stop` asks your server to quit, and you found out whether it saved properly
  rather than guessing. If the answer was unsatisfying, a better version exists: something
  that types `stop` into the running server the way you used to. What would have to be true
  for a unit file to be able to do that? `man systemd.service` is the surface to read.
- Run `systemctl list-units --type=service` and read every line, top to bottom. Each one is
  a program running for you right now, and each has a file like the one you wrote. How much
  of this machine turns out to be the same mechanism, repeated?
- `Restart=on-failure` restarts a server that dies. What happens if it dies *instantly*,
  every single time it starts? What would that look like from the outside, and what would
  you want systemd to do instead?
- Your friends type an address made of numbers. What would it take for them to type a name
  instead — and what is a name, technically, that a number isn't?
- Genuinely open: your world now sits on a disk you don't own, in a building you can't
  enter, belonging to a company that could stop existing. Who can read it? What does your
  provider actually promise about it? What happens if a payment fails? Find their own words
  rather than assuming, and then decide what you want to be true about where your backups
  live.

---

## What you have now

- A service file you wrote, starting your server at every boot
- Proof it works, from restarting a machine with no screen and no login
- Friends playing at an address unrelated to your home, while your own computer is off
- The ability to find a background program's complaints when it has no window to print in
- A measured answer, not a promise, about whether a service stop saves your world
- A server that no longer depends on anything in your house
