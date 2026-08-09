import type { NextConfig } from "next";

/**
 * Security headers.
 *
 * Only `strict-transport-security` was arriving in production — Vercel adds it.
 * Everything else was absent, which left the site embeddable in an iframe by
 * any origin: a page could frame it and overlay a fake contact form.
 *
 * `frame-ancestors 'self'` rather than `'none'`: it closes third-party framing,
 * which is the actual risk, while leaving same-origin iframes usable for
 * responsive testing. `X-Frame-Options` repeats it for older browsers that do
 * not read the CSP directive.
 *
 * A full CSP (`script-src` and friends) is deliberately not here. Next.js emits
 * inline bootstrap scripts, so a strict policy needs per-request nonces and
 * middleware — worth doing, but not something to bolt on blind. The XSS surface
 * is small meanwhile: no page renders user-supplied content.
 */
const securityHeaders = [
  { key: "Content-Security-Policy", value: "frame-ancestors 'self'" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
