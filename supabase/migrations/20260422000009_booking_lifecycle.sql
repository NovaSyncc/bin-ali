-- Migration: Add Booking Lifecycle and Financial Columns
-- Path: supabase/migrations/20260422000009_booking_lifecycle.sql

-- 1. Update the bookings table with new management columns
ALTER TABLE bookings
  ADD COLUMN IF NOT EXISTS status          text    NOT NULL DEFAULT 'pending'
                                           CHECK (status IN ('pending','confirmed','checked_in','checked_out')),
  ADD COLUMN IF NOT EXISTS booking_ref     text,
  ADD COLUMN IF NOT EXISTS room_number     text,
  ADD COLUMN IF NOT EXISTS total_amount    numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS amount_paid     numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS confirmed_at    timestamptz,
  ADD COLUMN IF NOT EXISTS checked_in_at  timestamptz,
  ADD COLUMN IF NOT EXISTS checked_out_at timestamptz,
  ADD COLUMN IF NOT EXISTS receptionist_note text;

-- 2. Create an index on booking_ref for faster lookups
CREATE INDEX IF NOT EXISTS idx_bookings_ref ON bookings(booking_ref);

-- 3. Backfill booking_ref for any existing records
-- Format: BA-YYYY-[Sequential Number]
DO $$
BEGIN
    UPDATE bookings
    SET booking_ref = 'BA-' || TO_CHAR(created_at, 'YYYY') || '-' || LPAD(CAST(rn AS text), 4, '0')
    FROM (
        SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) as rn
        FROM bookings
        WHERE booking_ref IS NULL
    ) as sub
    WHERE bookings.id = sub.id;
END $$;
