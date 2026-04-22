-- Bin Ali Hotel — Booking Status Migration
-- Run this in your Supabase SQL editor

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

-- Auto-generate booking_ref for existing rows that don't have one
UPDATE bookings
SET booking_ref = 'BA-' || TO_CHAR(created_at, 'YYYY') || '-' || LPAD(CAST(ROW_NUMBER() OVER (ORDER BY created_at) AS text), 4, '0')
WHERE booking_ref IS NULL;
