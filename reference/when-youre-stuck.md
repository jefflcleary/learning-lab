# When you're stuck

Stuck is a normal working state, not an emergency. This page is the sequence to run
when the hints in a lesson don't cover what's happening. The moves are ordered —
most problems die at the first three, and each later move works better because of
the ones before it.

## 1. Read the whole error, again, slower

Every word, including the parts that look like noise — file paths, line numbers,
the thing it says it expected. Errors name their causes far more often than people
notice, because almost nobody reads past the first line.

If there's no error — it just silently does the wrong thing or nothing — that's
information too: you're looking for a different kind of problem than a crash.

## 2. Ask "what changed?"

It worked before, or it never worked. If it worked before: something changed — a
file you edited, a setting, an update, a different machine or network. List what
actually changed since it last worked; the list is usually short and the culprit is
usually on it. If it never worked: stop debugging and re-read the instructions for
the step you're on — a missed step looks exactly like a mystery.

## 3. Make it fail on demand

Find the shortest path to the failure and run it twice. A problem you can cause
whenever you want is half solved: every idea you have can now be tested in seconds.
A problem you *can't* reproduce turns the question into a better one — what's
different between the time it fails and the time it doesn't?

From here on, one rule for every test: **change one thing at a time.** If you
change three things and it works, you don't know which change mattered — and two of
them may be new problems that currently cancel out. One change, one test, one
conclusion.

## 4. Shrink it

Cut things away until the smallest thing that still fails is in front of you — and
cut in halves, not slivers. Comment out half the code: does the failure survive?
Then it lives in the other half. Test one command instead of the script, one file
instead of the folder. Each halving is a single test, ten of them can search a
thousand suspects, and small failures have small explanations.

## 5. Find the layer

"It doesn't work" is too big to attack. When one thing talks to another and the
result is wrong, the fault lives in one of a handful of places — name them, and you
can test them separately:

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

Two questions do the work here. *What's the smallest test that would prove one of
these layers innocent?* — each acquittal shrinks the territory. And *can I swap a
suspect part for a known-good one?* — a different client, a different machine, the
self-address instead of the network. If the symptom follows the substitution,
you've found your layer.

## 6. Go to the source

Once you know roughly where the problem lives, read what's authoritative about that
piece — which is usually not the first search result.
[Finding the real documentation](finding-the-docs.md) is the guide.

## 7. Search the exact message

Put the error's distinctive phrase in quotes, leaving out parts specific to you
(your file paths, your names). Read results to understand what the error *means*,
not to find a command to paste — a fix you don't understand is a loan, not a
repair, and it usually comes due.

## 8. Write the wall entry and step away

If you're still stuck, you've earned a wall entry in
[your logbook](../logbook.md): what stopped me, what I guessed, what I tried.
Writing it forces the story straight, and half the time the act of explaining
reveals the hole. Then genuinely step away. Distance is a real debugging tool —
the answer that wouldn't come at the desk routinely arrives on the walk.

And when you do get through — however long it takes — finish the entry. "What it
actually was" is the most valuable line in your logbook.

## The habit that makes all of this cheaper

Every step above works better when you can always return to a state that works and
step forward from it, one change at a time. That's half of why backups and version
control exist: not just to survive disasters, but to make "get back to known-good,
then advance carefully" an everyday move instead of a heroic one.
