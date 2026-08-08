"use client";

import { useId, useRef, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const id = useId();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setError("");

    const data = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          website: data.get("website"),
        }),
      });

      const payload = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(payload.error ?? "Something went wrong.");
        setStatus("error");
        return;
      }

      formRef.current?.reset();
      setStatus("sent");
    } catch {
      setError("Network error. Check your connection and try again.");
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-ink-line bg-ink-soft/60 px-4 py-3 text-ink-text placeholder:text-ink-muted/60 transition-colors focus:border-brand/60 focus:outline-none";

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="mt-10 flex flex-col gap-4 text-left">
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
        <textarea
          id={`${id}-message`}
          name="message"
          required
          rows={5}
          maxLength={4000}
          className={`${field} resize-y`}
        />
      </div>

      {/* Honeypot: off-screen rather than display:none, which some bots skip.
          aria-hidden and tabIndex keep it away from people entirely. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={`${id}-website`}>Leave this empty</label>
        <input id={`${id}-website`} name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-xl bg-brand px-7 py-3 text-sm font-medium text-white transition-[transform,box-shadow,opacity] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-10px_rgb(43_108_255/0.8)] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 disabled:hover:shadow-none"
        >
          {status === "sending" ? "Sending…" : "Send message"}
        </button>

        {/* One live region for both outcomes, so a screen reader announces
            whichever arrives without the other stealing the update. */}
        <p aria-live="polite" className="text-sm">
          {status === "sent" && (
            <span className="text-emerald-400">Thanks — I&rsquo;ll get back to you.</span>
          )}
          {status === "error" && <span className="text-red-400">{error}</span>}
        </p>
      </div>
    </form>
  );
}
