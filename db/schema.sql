-- Run once against your database (Neon or Supabase SQL editor).
-- Length limits are enforced here as well as in the API route: the route can be
-- bypassed by anyone posting straight to the endpoint, the column cannot.

CREATE TABLE IF NOT EXISTS messages (
  id         BIGSERIAL PRIMARY KEY,
  name       TEXT        NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email      TEXT        NOT NULL CHECK (char_length(email) BETWEEN 3 AND 200),
  message    TEXT        NOT NULL CHECK (char_length(message) BETWEEN 1 AND 4000),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- For reading the inbox newest-first.
CREATE INDEX IF NOT EXISTS messages_created_at_idx ON messages (created_at DESC);

-- Supabase only. On Supabase the `public` schema is served over PostgREST, and
-- new tables there start with full privileges for `anon` and `authenticated` —
-- the roles behind the publishable key, which ships in the browser. Without the
-- lines below, anyone holding that key could read every name, email and message.
--
-- Supabase enables RLS on its own, and with no policy that already denies
-- everything. These statements are the second layer: revoking the grant turns a
-- silent empty result into a hard `permission denied`, and means a future
-- permissive policy cannot re-open the table by itself.
--
-- The app connects as `postgres`, which bypasses both, so inserts are unaffected.
-- Harmless to run on plain Postgres (Neon and friends), where the roles simply
-- do not exist — drop these two lines if the roles are missing and it errors.
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON messages FROM anon, authenticated;
