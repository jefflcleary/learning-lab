# How this project is put together

This page is for anyone curious about the machinery. Nothing here is needed to do
the lessons.

## Where the material lives

Everything you read on this site is generated from a public git repository of plain
markdown files. The same content is readable directly on GitHub, and you can clone
the repository to read it offline or keep a copy. The repository is the source of
truth; this site is a rendering of it.

The layout, briefly:

- The top-level files are the pages in the Overview section of this site.
- `modules/<name>/` holds one module: its front page (`README.md`), its recommended
  order (`PATH.md`), a design document for the people writing it (`MODULE.md`), and
  a `lessons/` folder.
- Each lesson is a folder. `guided.md` is the main teaching version. `reference.md`,
  where it exists, is the compressed commands-and-decisions version. `core.md` is
  the working document the lesson is written from — it isn't part of the course, and
  it contains the answers, so reading it spoils the lesson.
- `authoring/` holds the rules and procedures used to write new lessons and modules.
- `site/` holds the code that builds this website from the markdown.

## What doesn't live here

Your own work. Your logbook, your notes, your decisions, and everything you build
belong in your own space — a folder on your machine, your own repository, paper.
Lessons never ask you to change files in this project.

## Contributing

New lessons and modules are written against the rules in `authoring/` — start with
the principles document there. The short version: orientation is always given
plainly, only problem-solving is withheld; every lesson must work when read cold;
and lessons are written from a core document so that all versions of a lesson stay
consistent.
