"use client";

import { useId, useState } from "react";
import { site } from "@/content/site";

/**
 * GitHub Pages serves static files only, so there is no server to post to.
 * The form writes the email instead: it opens the visitor's own email app,
 * addressed to me, with the subject and message filled in, ready to send.
 * The browser's own validation runs first (required fields, email format).
 */
export function ContactForm() {
  const [opened, setOpened] = useState(false);
  const id = useId();

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Portfolio: message from ${name}`;
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  const field =
    // No `focus:outline-none` here: the global `:focus-visible` ring in
    // globals.css is the accessible indicator. Suppressing it left only the
    // 60%-opacity border, which measured 2.26:1 against the field — under the
    // 3:1 that WCAG 1.4.11 requires. The border tint stays as a second cue.
    "w-full rounded-xl border border-ink-line bg-ink-soft/60 px-4 py-3 text-ink-text placeholder:text-ink-muted/60 transition-colors focus:border-brand/60";

  return (
    <form onSubmit={onSubmit} className="mt-10 flex flex-col gap-4 text-left">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm text-ink-muted">
            Name
          </label>
          <input
            id={`${id}-name`}
            name="name"
            required
            maxLength={120}
            autoComplete="name"
            className={field}
          />
        </div>
        <div>
          <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm text-ink-muted">
            Email
          </label>
          <input
            id={`${id}-email`}
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className={field}
          />
        </div>
      </div>

      <div>
        <label htmlFor={`${id}-message`} className="mb-1.5 block text-sm text-ink-muted">
          Message
        </label>
        {/* Capped below the ~2000 characters some email apps accept in a link. */}
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={5}
          maxLength={1500}
          className={`${field} resize-y`}
        />
      </div>

      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-brand px-7 py-3 text-sm font-medium text-white transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px] hover:shadow-brand/80"
        >
          Send message
          <span aria-hidden="true">→</span>
        </button>

        <p aria-live="polite" className="text-sm text-ink-muted">
          {opened ? (
            <>
              Your email app should open with the message ready to send. If it did not, write to{" "}
              <a href={`mailto:${site.email}`} className="text-brand-bright underline underline-offset-4">
                {site.email}
              </a>
              .
            </>
          ) : (
            "Opens your email app with the message ready to send."
          )}
        </p>
      </div>
    </form>
  );
}
