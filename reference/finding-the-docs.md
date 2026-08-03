# Finding the real documentation

For any tool, a search returns a pile of pages, and most of them are somebody's
snapshot of somebody else's understanding, taken at some unknown time. One source
is authoritative. This page is about finding it and reading the rest for what
they're worth.

## The ranking

From most trustworthy to least:

1. **The tool's own output.** `--help`, the error text, the startup log. It can't
   be out of date — it shipped with the exact version you're running.
2. **The official documentation** — the project's own manual, README, or reference,
   for *your version*. Found via the project's own site or repository, not via
   whichever tutorial ranked highest.
3. **The project's issue tracker.** More current than the documentation, because
   documentation gets updated when someone remembers and issues get filed the day
   something breaks. Search closed issues for your exact error message — someone
   has usually been here before you.
4. **Tutorials and videos.** Useful for orientation, untrustworthy for specifics:
   each one froze some version's truth at some moment. An undated tutorial is a
   rumor.
5. **Forum answers.** A stranger's guess that worked once on their machine. Read
   them for ideas about *where to look*, never as instructions to follow blind.

## Version is everything

Documentation for a different version doesn't look wrong — it looks exactly right
and then doesn't work, which is the most expensive kind of wrong. Before trusting
any page, answer two questions: what version am I actually running (the tool will
tell you), and what version is this page about (if you can't tell, assume it
isn't yours).

## When the documentation is thin

Some tools are documented by one README and their own behavior. Read the whole
README anyway — knowing everything it covers is worth ten minutes even when it
answers nothing directly. Then look for an examples folder; working examples are
documentation in its most honest form. And the issue tracker still works when
nothing else exists: the questions other people asked *are* the missing manual.
