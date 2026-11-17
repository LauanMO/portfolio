/**
 * A file from `public/`, under the base path the site is served from
 * (`/portfolio` on GitHub Pages). Links get the base path from next/link;
 * a plain `src` string does not, so images go through this.
 */
export function asset(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
