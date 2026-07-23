-- Needed ONLY on installs whose bookings table predates the Google Calendar
-- integration — fresh installs get google_event_id from bookings.sql.
-- Idempotent: safe to re-run in the Supabase SQL editor.
alter table public.bookings add column if not exists google_event_id text;
