import postgres from "postgres";

/**
 * One client per warm serverless instance. `max: 1` matters: each Vercel
 * function is its own process, so a pool per instance multiplies connections
 * until Postgres refuses them. Point DATABASE_URL at a pooled endpoint —
 * Neon's `-pooler` host, or Supabase port 6543.
 */
declare global {
  var __sql: ReturnType<typeof postgres> | undefined;
}

export function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");

  globalThis.__sql ??= postgres(url, {
    max: 1,
    idle_timeout: 20,
    connect_timeout: 10,
    prepare: false,
  });

  return globalThis.__sql;
}
