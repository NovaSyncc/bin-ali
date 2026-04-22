CREATE TABLE IF NOT EXISTS media_items (
  id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type       TEXT NOT NULL,
  category   TEXT NOT NULL,
  url        TEXT NOT NULL,
  filename   TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
