import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Link from "next/link";
import { ScrollProgress } from "@/components/ScrollProgress";
import { site } from "@/content/site";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.intro,
  authors: [{ name: site.name, url: site.github }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.intro,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.role}`,
    description: site.intro,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={outfit.variable}>
      <body className="bg-paper font-sans antialiased">
        <ScrollProgress />

        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-60 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>

        {/* Assumes every page opens with a dark band — the header text is light. */}
        <header className="absolute inset-x-0 top-0 z-40">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 sm:px-8">
            <Link
              href="/"
              className="text-base font-semibold tracking-tight text-ink-text transition-colors hover:text-brand-bright"
            >
              {site.name}
            </Link>
            <nav aria-label="Main">
              <ul className="flex items-center gap-6 text-sm text-ink-muted">
                <li>
                  <Link href="/#work" className="transition-colors hover:text-ink-text">
                    Work
                  </Link>
                </li>
                <li className="hidden sm:block">
                  <Link href="/#stack" className="transition-colors hover:text-ink-text">
                    Stack
                  </Link>
                </li>
                <li>
                  <a
                    href={site.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="transition-colors hover:text-ink-text"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main id="main">{children}</main>

        <footer className="bg-ink">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-12 text-sm text-ink-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <p>
              © {new Date().getFullYear()} {site.name}
            </p>
            <div className="flex items-center gap-6">
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-ink-text"
              >
                Email
              </a>
              <a
                href={site.github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-ink-text"
              >
                GitHub
              </a>
              {site.linkedin && (
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-ink-text"
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
