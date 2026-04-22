ALTER TABLE bookings            ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts          ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_items         ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public read published posts"        ON blog_posts;
DROP POLICY IF EXISTS "Anon full access bookings"          ON bookings;
DROP POLICY IF EXISTS "Anon full access blog_posts"        ON blog_posts;
DROP POLICY IF EXISTS "Anon full access contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Anon full access media_items"       ON media_items;

CREATE POLICY "Public read published posts"
  ON blog_posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Anon full access bookings"
  ON bookings FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anon full access blog_posts"
  ON blog_posts FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anon full access contact_submissions"
  ON contact_submissions FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Anon full access media_items"
  ON media_items FOR ALL USING (true) WITH CHECK (true);
