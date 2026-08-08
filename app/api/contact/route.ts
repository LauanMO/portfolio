import { NextResponse } from "next/server";
import { getSql } from "@/lib/db";

/** postgres.js needs Node APIs — this route cannot run on the Edge runtime. */
export const runtime = "nodejs";

const LIMITS = { name: 120, email: 200, message: 4000 } as const;

/**
 * Best-effort throttle. Each serverless instance has its own map, so this slows
 * a naive flood without pretending to be real rate limiting — that would need
 * shared state. The hard guarantees are the length checks and the column
 * constraints, which no client can bypass.
 */
const recent = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function isFlooding(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(key, hits);

  // Keep the map from growing without bound on a long-lived instance.
  if (recent.size > 500) {
    for (const [k, v] of recent) {
      if (v.every((t) => now - t >= WINDOW_MS)) recent.delete(k);
    }
  }

  return hits.length > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const { name, email, message, website } = (body ?? {}) as Record<string, unknown>;

  // Honeypot: hidden from people, irresistible to bots. Answer 200 so the bot
  // records a success and does not come back to try a different shape.
  if (typeof website === "string" && website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    return NextResponse.json({ error: "Missing fields." }, { status: 400 });
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim();
  const cleanMessage = message.trim();

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
  }

  if (
    cleanName.length > LIMITS.name ||
    cleanEmail.length > LIMITS.email ||
    cleanMessage.length > LIMITS.message
  ) {
    return NextResponse.json({ error: "That is longer than allowed." }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) {
    return NextResponse.json({ error: "That email address looks wrong." }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isFlooding(ip)) {
    return NextResponse.json(
      { error: "Too many messages. Try again in a minute." },
      { status: 429 },
    );
  }

  try {
    const sql = getSql();
    // Tagged template — values are parameterised, never string-concatenated.
    await sql`
      INSERT INTO messages (name, email, message)
      VALUES (${cleanName}, ${cleanEmail}, ${cleanMessage})
    `;
  } catch (error) {
    // Logged server-side only. The connection string can appear in driver
    // errors, so nothing from here is ever returned to the client.
    console.error("[contact] insert failed:", error);
    return NextResponse.json(
      { error: "Could not save your message. Please email me directly." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
