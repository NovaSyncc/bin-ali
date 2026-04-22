-- ============================================================
-- STEP 5: RPC function — increment blog post view count
-- Run after 03_blog_posts.sql
-- ============================================================

CREATE OR REPLACE FUNCTION increment_post_views(post_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE blog_posts SET views = views + 1 WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;
