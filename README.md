# Portfolio

[![CI](https://github.com/LauanMO/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/LauanMO/portfolio/actions/workflows/ci.yml)

Personal portfolio built with Next.js. Static by default — every page is
pre-rendered at build time, so there is no server to keep warm.

## Stack

| Layer     | Choice                                     |
| --------- | ------------------------------------------ |
| Framework | Next.js 16 (App Router)                    |
| Language  | TypeScript                                 |
| Styling   | Tailwind CSS v4 with CSS custom properties |
| Fonts     | Outfit, self-hosted via `next/font`        |
| Hosting   | Vercel                                     |

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in DATABASE_URL
npm run dev
```

Then open <http://localhost:3000>. Everything except the contact form works
without a database.

## Contact form

The form posts to `app/api/contact/route.ts`, which writes to Postgres. It is
the only server-rendered route — everything else is static.

**Setup**

1. Create a Postgres database (Neon or Supabase both work).
2. Run `db/schema.sql` against it.
3. Set `DATABASE_URL` to the **pooled** connection string — Neon's `-pooler`
   host, or Supabase port 6543. The direct port exhausts connections once
   serverless functions start scaling.
4. Add the same variable in Vercel under Settings → Environment Variables.

Never put the connection string in a file that git tracks. `.env*` is ignored;
`.env.example` is the one exception and carries names only.

**Abuse handling**

- A honeypot field, hidden off-screen, that only bots fill in.
- Length limits in the route *and* as `CHECK` constraints on the columns —
  anyone can post straight to the endpoint and skip the route.
- A per-instance throttle: three messages per minute per IP. Serverless
  instances do not share memory, so this slows floods rather than stopping
  them. Real rate limiting would need shared state such as Redis.
- Database errors are logged server-side and never returned to the client;
  driver errors can contain the connection string.

```bash
npm run build   # production build
npm start       # serve the production build
npm run lint    # eslint
```

## Editing content

All copy lives in `content/`, so adding a project never means touching a
component.

- **`content/site.ts`** — name, role, contact links, and the skill groups.
- **`content/projects.ts`** — the project list. Append an object to the
  `projects` array and its detail page, static params, and sitemap entry are
  generated automatically.

A project with no `repo` field renders as *Private repository* instead of a
broken link.

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
| `HeroVisual`         | Floating code window that tilts toward the pointer        |
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
```

## Before deploying

- Set `site.url` in `content/site.ts` to the real domain — canonical URLs, the
  sitemap, and Open Graph tags all read from it.
- Confirm the fields marked `REVIEW` in `content/site.ts`.
- Add `site.linkedin`, or leave it empty to hide the link.
