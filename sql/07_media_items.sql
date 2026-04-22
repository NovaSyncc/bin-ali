-- ============================================================
-- STEP 7: Media items table (gallery images + hero video)
-- ============================================================

CREATE TABLE IF NOT EXISTS media_items (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type       TEXT NOT NULL,
  category   TEXT NOT NULL,
  url        TEXT NOT NULL,
  filename   TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
