# Isolating a problem

Every real diagnosis is the same activity: narrowing. You start with "it doesn't
work," which can't be attacked, and you shrink the territory until the problem has
nowhere left to hide. This page is the map of the territory and the two moves that
shrink it.

## The layers

When one thing talks to another and the result is wrong, the fault lives in one of
a handful of places. Name them explicitly and you can test them separately:

- **Your input** — a typo, a wrong name, a wrong address. Cheapest to check, most
  often guilty. Look character by character; you read what you meant to type, not
  what you typed.
- **Your code or command** — the thing you wrote. Does the smallest piece of it
  work alone?
- **The configuration** — the settings the program actually read, which are not
  always the settings you think you saved. When did the program last read its
  settings? Some only look at startup.
- **The other program** — is it even running? Is it the version you think? Its own
  log usually says what it saw, which may be nothing at all.
- **The connection between programs** — can the two sides reach each other at all?
  A request that arrives and gets refused looks completely different from a
  request that never arrives; learn to tell a fast "no" from silence.
- **The machine** — full disk, missing permission, wrong folder. Rare, but cheap
  to rule out, and it produces the strangest symptoms of the bunch.

The question that drives the whole hunt: *what's the smallest test that would
prove one of these layers innocent?* Each acquittal cuts the territory down.

## Move one: change one thing at a time

If you change three things and it works, you've learned almost nothing — you don't
know which change mattered, and you may have added two new problems that currently
cancel out. One change, one test, one conclusion. It feels slower and is much
faster.

## Move two: cut the space in half

Don't walk the territory — bisect it. Comment out half the code: does the failure
survive? Then it lives in the other half. Substitute a known-good part for a
suspect one — a different client, a different machine, the self-address instead of
the network — and see if the symptom follows the substitution. Each halving is one
test, and ten of them can search a thousand suspects.

## Keep a known-good state nearby

Narrowing works best when you can always return to something that works and step
forward from it one change at a time. This is half of why backups and version
control exist: not just to survive disasters, but to make "get back to working,
then advance carefully" a cheap move instead of a heroic one.
