CREATE TABLE IF NOT EXISTS bookings (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name    TEXT NOT NULL,
  phone            TEXT NOT NULL,
  check_in_date    DATE NOT NULL,
  check_out_date   DATE NOT NULL,
  duration         INTEGER,
  guests           INTEGER DEFAULT 1,
  rooms            TEXT,
  special_requests TEXT,
  language         TEXT DEFAULT 'en',
  created_at       TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
