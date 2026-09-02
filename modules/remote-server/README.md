# Running your server on a rented machine

Your Minecraft server lives on a computer that belongs to somebody, sits somewhere, and
gets used for other things. That means the world is available only while that computer
is awake, at home, and not needed elsewhere. Every improvement you have made to keeping
it running has been a way of working around that one fact.

This module removes the fact instead.

You are going to rent a computer — a real one, in a data centre, with an operating
system and a disk and a public address on the internet — and move your server onto it.
You will never see this computer. It has no screen, no keyboard, and no mouse.
Everything you do to it, you will do by typing at it from your own machine over the
network, which is exactly how the servers behind every website, app, and game you use
are run. Not a simplified version of that: the actual thing.

Along the way you'll meet the parts of that job that nobody can skip. How to prove who
you are to a machine without ever sending it a password. Why nobody sensible works as
the administrator account, and what they do instead. What a firewall is for, and the
one mistake with it that locks you out of a machine you're paying for — which you'll
make deliberately, once, after you've proved you can get back in. How to make a program
start itself when a machine boots, on a computer where nobody ever logs in.

There's a gesture in the middle of it rather than a claim: with your friends playing, you
shut your laptop, unplug it, and carry it into another room. Nothing happens. Nothing
depends on it any more.

And then a last lesson about what changes once that's true. When people are depending on
a server, changing it stops being free — so you'll learn which changes travel up to it
and which travel down from it, how to try something that can't be undone on a copy of the
real world rather than the real one, and how long it actually takes you to put things
back when something goes wrong.

Two things to know before you start. This costs money — a small amount, every month,
for as long as the machine exists — and one of these lessons is about finding out
exactly how much and where the off switch is. And opening the account needs a payment
method, so it may not be something you can do yourself; that part can be done days
ahead by whoever holds it.

Everything here needs a Minecraft server you can already start, stop, and join. If you
don't have one, the [Running a Minecraft server](../minecraft-server/README.md) module
builds one.

## The lessons

These five lessons are meant to be done in order: each one leaves the machine in the
state the next one expects. Every lesson states its own conditions at the top, so you can
check where you stand rather than take it on trust.

1. **[Renting a machine and getting into it](lessons/renting-a-machine/guided.md)** —
   make a key pair, rent an Ubuntu machine, and get a command prompt on a computer you
   have never seen. Ends with what it costs and where the off switch is.
2. **[Locking the front door](lessons/locking-the-front-door/guided.md)** — stop being
   the administrator account, close off password logins, read the strangers who have
   been trying the handle since the machine existed, and put up a firewall. Includes
   locking yourself out on purpose, after proving you can get back in.
3. **[Moving the server across](lessons/moving-the-server-across/guided.md)** — install
   Java, copy your world and settings up over the network, open the port, and join your
   own server at its new address.
4. **[Keeping it running](lessons/keeping-it-running/guided.md)** — teach the machine to
   start the server itself, prove it by restarting a computer nobody is logged into,
   hand the new address to your friends, and then shut your laptop and walk away.
5. **[Changing a server other people are using](lessons/changing-a-live-server/guided.md)**
   — now that people depend on it: which changes travel up to the server and which travel
   down from it, how to try something irreversible on a copy of the real world instead of
   the real one, and how long it actually takes you to put things back.

Lesson one is worth doing days ahead of the rest, because opening an account can take
longer than you expect.
