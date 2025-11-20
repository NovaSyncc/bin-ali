CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image TEXT,
  author TEXT DEFAULT 'Bin Ali Hotel',
  status TEXT DEFAULT 'draft',
  category TEXT,
  tags TEXT[],
  meta_title TEXT,
  meta_description TEXT,
  views INTEGER DEFAULT 0,
  language TEXT DEFAULT 'en',
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);