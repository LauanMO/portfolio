# Portfolio

[![CI](https://github.com/LauanMO/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/LauanMO/portfolio/actions/workflows/ci.yml)

Personal portfolio built with Next.js and published on GitHub Pages at
<https://lauanmo.github.io/portfolio>. The whole site is exported as static
files, so there is no server at all.

## Stack

| Layer     | Choice                                                 |
| --------- | ------------------------------------------------------ |
| Framework | Next.js 16 (App Router), static export                 |
| Language  | TypeScript                                             |
| Styling   | Tailwind CSS v4 with CSS custom properties             |
| Fonts     | Outfit, self-hosted via `next/font`                    |
| Hosting   | GitHub Pages, deployed by `.github/workflows/pages.yml` |

## Running locally

```bash
npm install
npm run dev
```

Then open <http://localhost:3000/portfolio/> — the site lives under
`/portfolio` locally too, as it does on GitHub Pages.

```bash
npm run build   # static export to out/
npm run lint    # eslint
```

## Publishing

Every push to `main` runs the Pages workflow: it builds the static export and
publishes `out/`. In the repository settings, **Pages → Source** must be set to
**GitHub Actions** (once).

`next.config.ts` explains what a static export rules out: API routes, the image
optimisation server and custom response headers.

The site used to live at <https://lauanmoreira.vercel.app>. `vercel.json` keeps
that address as a permanent redirect to the same page here, so links already
shared keep working. It deploys there as plain static files
(`"framework": null`) because Vercel's Next.js build skipped the redirects.

## Contact form

GitHub Pages cannot run server code, so the form does not post anywhere: it
opens the visitor's email app with my address, a subject and their message
already filled in. The browser checks the fields first (required, email
format), and the message is capped so the link stays within what email apps
accept.

## Editing content

All copy lives in `content/`, so adding a project never means touching a
component.

- **`content/site.ts`** — name, role, contact links, and the skill groups.
- **`content/projects.ts`** — the project list. Append an object to the
  `projects` array and its detail page, static params, and sitemap entry are
  generated automatically.

A project with no `repo` field renders as *Private repository* instead of a
broken link.

A project with an `image` shows that real screenshot on its card and at the top
of its page, inside a browser window or a phone (`frame`), on a field of its own
colour (`ground`). Screenshots live in `public/images/projects/` as WebP, at most
1600px wide: a static export serves images exactly as they are stored. Projects
without one show their name on the dark gradient instead.

## Design

The page alternates dark and light bands — dark hero, light body, dark footer —
separated by curved SVG dividers. It commits to that single look rather than
following the operating system theme, so the palette in `app/globals.css` is
defined once on `:root`: `ink*` tokens for the dark bands, `paper*` for the
light ones, `brand*` for accents. Tailwind reads them through `@theme inline`,
which is why utilities like `bg-ink` and `text-paper-muted` stay in sync with
the tokens.

## Motion

| Component            | What it does                                             |
| -------------------- | -------------------------------------------------------- |
| `ScrollProgress`     | Top bar tracking scroll depth                             |
| `Reveal`             | Fades children up when they scroll into view              |
| `HeroVisual`         | Code window with real snippets from the projects' repositories; tilts toward the pointer and moves to the next file on its own |
| `CurveDivider`       | The arc between a dark section and a light one            |

Two rules hold throughout:

- **`prefers-reduced-motion` disables everything.** One media query in
  `globals.css` flattens animations and transitions, and the JS components check
  the same query before attaching listeners.
- **Nothing hides without JavaScript.** `Reveal` applies its hiding class in an
  effect after mount, never during render, so a visitor with JS disabled sees
  the content rather than a blank page.

`ScrollProgress` writes transforms straight to the DOM inside a
`requestAnimationFrame` instead of going through React state — a scroll handler
that calls `setState` re-renders on every frame.

## Structure

```
app/
├── layout.tsx              # shell, metadata, fonts, header, footer
├── page.tsx                # home
├── not-found.tsx           # 404
├── robots.ts               # generated robots.txt
├── sitemap.ts              # generated sitemap.xml
└── projects/[slug]/page.tsx
components/                 # presentational, no data fetching
content/                    # all copy and configuration
lib/asset.ts                # prefixes public files with the /portfolio base path
public/images/projects/     # project screenshots
```

## Before deploying

- Keep `site.url` in `content/site.ts` on the published address — canonical
  URLs, the sitemap, and Open Graph tags all read from it.
- Confirm the fields marked `REVIEW` in `content/site.ts`.
- Add `site.linkedin`, or leave it empty to hide the link.

## License

[MIT](LICENSE).
