import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden bg-ink">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 size-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-6xl px-6 sm:px-8">
        <p className="animate-rise font-mono text-sm text-brand-bright">404</p>
        <h1 className="animate-rise mt-4 text-5xl font-semibold tracking-tight text-ink-text [animation-delay:100ms] sm:text-6xl">
          Page not found
        </h1>
        <p className="animate-rise mt-5 max-w-md text-lg leading-relaxed text-ink-muted [animation-delay:200ms]">
          That page does not exist. It may have been renamed, or the link that
          brought you here was wrong.
        </p>
        <Link
          href="/"
          className="animate-rise mt-10 inline-flex rounded-xl bg-brand px-6 py-3 text-sm font-medium text-white transition-[transform,box-shadow] duration-300 [animation-delay:300ms] hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px] hover:shadow-brand/80"
        >
          Back home
        </Link>
      </div>
    </section>
  );
}
