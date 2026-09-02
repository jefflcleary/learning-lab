# How this project is put together

This page is for anyone curious about the machinery. Nothing here is needed to do
the lessons.

## Where the material lives

Everything you read on this site is generated from a public git repository of plain
markdown files. The same content is readable directly on GitHub, and you can clone
the repository to read it offline or keep a copy. The repository is the source of
truth; this site is a rendering of it.

The layout, briefly:

- The top-level files are the pages in the Welcome section of this site.
- `modules/<name>/` holds one module: its front page (`README.md`), its recommended
  order, a design document for the people writing it (`MODULE.md`), and
  a `lessons/` folder.
- Each lesson is a folder. `guided.md` is the main teaching version. `reference.md`,
  where it exists, is the compressed commands-and-decisions version. `core.md` is
  the working document the lesson is written from — it isn't part of the course, and
  it contains the answers, so reading it spoils the lesson.
- `reference/` holds the Reference section: short theme-neutral pages on
  transferable craft, like getting unstuck.
- `authoring/` holds the rules and procedures used to write new lessons and modules.
- `site/` holds the code that builds this website from the markdown.

## What doesn't live here

Your own work. Your logbook, your notes, your decisions, and everything you build
belong in your own space — a folder on your machine, your own repository, paper.
Lessons never ask you to change files in this project.

## Working on the material locally

To see changes rendered as you edit (first time only, run the `npm install`):

```
cd site
npm install
npm start -- --port 3002
```

That starts a live-reload preview at `http://localhost:3002` — save any markdown
file and the page updates. Pick a different port if that one is busy.

Before calling a change done, run the full build, which fails on any broken link:

```
cd site
npm run build
```

## Publishing changes

```
git add -A
git commit -m "describe the change"
git push
```

The push triggers the site's deploy workflow on GitHub automatically; the public
site updates a couple of minutes later (the Actions tab shows progress, or
`gh run watch` from a terminal). GitHub's own rendering of the markdown updates
instantly on push.

## Contributing

New lessons and modules are written against the rules in `authoring/` — start with
the principles document there. The short version: orientation is always given
plainly, only problem-solving is withheld; every lesson must work when read cold;
and lessons are written from a core document so that all versions of a lesson stay
consistent.
