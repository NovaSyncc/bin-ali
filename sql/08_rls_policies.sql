-- ============================================================
-- STEP 8: Row Level Security (RLS)
-- Run after all tables are created (steps 2–7).
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE bookings            ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_items         ENABLE ROW LEVEL SECURITY;

-- Public read: only published blog posts visible to everyone
DROP POLICY IF EXISTS "Public read published posts" ON blog_posts;
CREATE POLICY "Public read published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

-- Dashboard full access (anon key) — tighten after adding auth
DROP POLICY IF EXISTS "Anon full access bookings" ON bookings;
CREATE POLICY "Anon full access bookings"
  ON bookings FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anon full access blog_posts" ON blog_posts;
CREATE POLICY "Anon full access blog_posts"
  ON blog_posts FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anon full access contact_submissions" ON contact_submissions;
CREATE POLICY "Anon full access contact_submissions"
  ON contact_submissions FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anon full access media_items" ON media_items;
CREATE POLICY "Anon full access media_items"
  ON media_items FOR ALL USING (true) WITH CHECK (true);
