// @ts-check
// Site config for the learning lab. Content lives in the repo root; this site is
// authoring infrastructure only (see authoring/WORKFLOWS.md — course tooling is
// never lesson content).

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Learning Lab',
  tagline: 'Learn by doing things to real systems',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  // Local-first defaults; the GitHub Pages workflow (.github/workflows/deploy-site.yml)
  // overrides these via env so the published site gets the right URL and base path.
  url: process.env.DOCUSAURUS_URL ?? 'http://localhost',
  baseUrl: process.env.DOCUSAURUS_BASE_URL ?? '/',

  onBrokenLinks: 'throw',

  markdown: {
    // .md files render as CommonMark (GitHub-compatible: HTML comments,
    // <details> blocks, raw HTML all pass through). Only .mdx files get MDX.
    format: 'detect',
    hooks: {onBrokenMarkdownLinks: 'throw'},
  },

  i18n: {defaultLocale: 'en', locales: ['en']},

  plugins: [
    // The docs tree is the repo root, so webpack's watch context is huge.
    // Keep the watcher off the giant/irrelevant trees (EMFILE prevention).
    () => ({
      name: 'watch-ignore',
      configureWebpack: () => ({
        watchOptions: {
          ignored: ['**/node_modules/**', '**/.git/**', '**/site/build/**', '**/.docusaurus/**'],
        },
      }),
    }),
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          // Serve the repo root as the docs tree.
          path: '..',
          routeBasePath: '/',
          sidebarPath: './sidebars.js',
          exclude: [
            'site/**',
            'authoring/**',
            'CLAUDE.md',
            '**/core.md',
            '**/MODULE.md',
            '**/node_modules/**',
          ],
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Learning Lab',
        items: [],
      },
      footer: {
        style: 'dark',
        copyright: 'Rendered from the markdown in this repo — the files are the source of truth.',
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
