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
