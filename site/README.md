# Reading site

Docusaurus site that renders this repo's markdown for comfortable local reading —
sidebar navigation, search-friendly pages, collapsible hints. The markdown files in
the repo are the source of truth; this site is authoring infrastructure and is never
lesson content.

## Run it locally

```
cd site
npm install     # first time only
npm start       # live-reload dev server, opens http://localhost:3000
```

Edit any lesson file and the rendered page updates on save. This is the
render-check step in `authoring/WORKFLOWS.md`: review every content change here
before calling it done.

`npm run build` does a full production build and **fails on any broken link** —
useful as a whole-repo link check.

## How it's wired

- `docusaurus.config.js` points the docs plugin at the repo root (`path: '..'`).
  Learner-facing markdown renders; `authoring/`, `CLAUDE.md`, every `core.md`, and
  every `CURRICULUM.md` are excluded from the site (they stay readable in the repo).
- `.md` files are parsed as CommonMark (`markdown.format: 'detect'`), so the same
  files render identically here and on GitHub — HTML comments, `<details>` hint
  blocks, and plain markdown links all work in both. Don't introduce
  generator-specific syntax into content.
- `sidebars.js` is hand-curated: lab files first, then each curriculum as a
  category in its PATH.md order. Adding a lesson means adding its `guided` doc id
  there (and `reference`, under Quick references, if one exists).
