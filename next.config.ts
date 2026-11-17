import type { NextConfig } from "next";

/**
 * Published on GitHub Pages as a project site: the whole site is exported as
 * static files to `out/` and served under https://lauanmo.github.io/portfolio.
 *
 * What a static export rules out, and what replaced it:
 * - No server, so no API route: the contact form opens the visitor's email app
 *   with the message filled in instead of posting to a database.
 * - No image optimisation server: screenshots are stored already sized, as WebP,
 *   and served as they are.
 * - No custom response headers: GitHub Pages does not let a site set them, so
 *   the security headers that Vercel sent (frame-ancestors, nosniff, …) are gone.
 *   No page renders user-supplied content, which keeps that risk small.
 */
const basePath = "/portfolio";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  // `projects/mandarim/index.html` instead of `projects/mandarim.html`, which
  // every static host serves for `/projects/mandarim/` without configuration.
  trailingSlash: true,
  images: { unoptimized: true },
  // next/image does not add the base path to a `src` string; lib/asset.ts does.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
