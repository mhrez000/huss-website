-- LuxeVisuals bookings table — run once in the Supabase SQL editor.
-- (Idempotent: safe to re-run.)
--
-- The EXCLUSION CONSTRAINT below (bookings_no_overlap) is THE atomic
-- double-booking guard: slots overlap by design (120-minute shoots at
-- 90-minute spacing), so guarding identical slot_start values alone is
-- not enough. The gist exclusion rejects any active booking whose
-- [slot_start, slot_end) range overlaps an existing active one — two
-- simultaneous inserts for overlapping (or identical) times -> one
-- succeeds, the other gets a 409/23P01 that the API surfaces as
-- "slot taken". The partial unique index on slot_start is kept as a
-- cheap fast-path for the identical-slot case, but it is NOT the guard.

create extension if not exists btree_gist;

create table if not exists public.bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'confirmed'
    check (status in ('confirmed', 'cancelled')),
  slot_start timestamptz not null,
  slot_end timestamptz not null,
  property_address text not null,
  agent_name text not null,
  agency text,
  email text not null,
  phone text not null,
  property_type text not null,
  bedrooms text not null,
  bathrooms text not null,
  property_size text not null,
  services text[] not null default '{}',
  notes text,
  -- Google Calendar event id, set best-effort after insert when the gcal
  -- integration is enabled. Existing installs: run add-google-calendar.sql.
  google_event_id text
);

-- THE atomic guard: no two active bookings may overlap in time.
-- (Postgres has no "add constraint if not exists", hence the DO block.)
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'bookings_no_overlap'
      and conrelid = 'public.bookings'::regclass
  ) then
    alter table public.bookings
      add constraint bookings_no_overlap
      exclude using gist (tstzrange(slot_start, slot_end) with &&)
      where (status <> 'cancelled');
  end if;
end
$$;

-- Fast-path duplicate guard for the identical-slot case only.
create unique index if not exists bookings_active_slot_start_key
  on public.bookings (slot_start)
  where status <> 'cancelled';

create index if not exists bookings_slot_range_idx
  on public.bookings (slot_start, slot_end)
  where status <> 'cancelled';

-- Private by default: RLS on, no anon policies. The site's API routes
-- use the service-role key, which bypasses RLS on the server only.
alter table public.bookings enable row level security;

-- To cancel a booking (frees the slot immediately):
--   update public.bookings set status = 'cancelled' where id = '<id>';
