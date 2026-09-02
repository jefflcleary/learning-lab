# Reading site

Docusaurus site that renders this repo's markdown for comfortable local reading —
sidebar navigation, search-friendly pages, collapsible hints. The markdown files in
the repo are the source of truth; this site is authoring infrastructure and is never
lesson content.

## Run it locally

```
cd site
npm install     # first time only
npm start       # live-reload dev server, opens http://localhost:3002
```

Both `start` and `serve` are pinned to port 3002 in `package.json` rather than
Docusaurus's default 3000, which is usually occupied on the machine this was set up on.
Pass `--port` yourself if you need a different one.

Edit any lesson file and the rendered page updates on save. This is the
render-check step in `authoring/WORKFLOWS.md`: review every content change here
before calling it done.

`npm run build` does a full production build and **fails on any broken link** —
useful as a whole-repo link check.

## Search

Search is provided by `@easyops-cn/docusaurus-search-local`: the index is generated at
build time and shipped as static files, so it works on GitHub Pages with no account,
no crawler, and nothing external to keep running.

**It does not work under `npm start`.** The dev server builds no index, so the search
box either won't appear or won't return anything — that's expected, not a fault. To try
it locally:

```
npm run build
npm run serve
```

That serves on http://localhost:3002 as well.

Its one non-default setting is `docsRouteBasePath: '/'`, because this site serves the
repo root at the site root rather than under `/docs`. If search ever returns nothing in
a real build, that's the first thing to check.

## How it's wired

- `docusaurus.config.js` points the docs plugin at the repo root (`path: '..'`).
  Learner-facing markdown renders; `authoring/`, `CLAUDE.md`, every `core.md`, and
  every `MODULE.md` are excluded from the site (they stay readable in the repo).
- `.md` files are parsed as CommonMark (`markdown.format: 'detect'`), so the same
  files render identically here and on GitHub — HTML comments, `<details>` hint
  blocks, and plain markdown links all work in both. Don't introduce
  generator-specific syntax into content.
- `sidebars.js` is hand-curated: a Welcome section for the lab's own pages, then
  a Modules section with one category per module, lessons in that module's README
  order. Adding a lesson means adding its `guided` doc id there (and `reference`,
  under that module's Quick references, if one exists).
