# Google Calendar sync — owner setup (about 10 minutes)

This connects the website's booking diary to your Google Calendar, both ways:

- Every confirmed website booking appears in your calendar automatically.
- Anything you put in your calendar (personal appointments, holidays, other
  jobs) blocks those times on the website, so nobody can book over them.

You will do four things: create a "service account" (a robot Google identity
the website uses), share your calendar with it, paste two settings into
Vercel, and — for existing installs only — run one line in Supabase.

## Step A — Google Cloud console: create the robot account

1. Go to [console.cloud.google.com](https://console.cloud.google.com) and
   sign in with your Google account.
2. Click the project picker (top left) -> **New project** -> name it
   **LuxeVisuals Bookings** -> **Create**, then make sure it is selected.
3. Open the menu -> **APIs & Services** -> **Library** -> search for
   **Google Calendar API** -> open it -> **Enable**.
4. Go to **APIs & Services** -> **Credentials** -> **Create credentials** ->
   **Service account**. Any name is fine (e.g. "bookings"). Skip the
   optional role and access steps — no roles are needed. Click **Done**.
5. Back on the Credentials page, click the service account you just
   created -> **Keys** tab -> **Add key** -> **Create new key** ->
   **JSON** -> **Create**. A `.json` file downloads to your computer —
   keep it, you will paste its contents in Step C.
6. Copy the service account's **email address** (it ends in
   `@...iam.gserviceaccount.com`) — it is shown on the service account's
   details page and in the Credentials list. You need it in Step B.

## Step B — Google Calendar: share your calendar with the robot

1. Go to [calendar.google.com](https://calendar.google.com), signed in as
   the photographer's account (the calendar the site should use).
2. Click the gear icon (top right) -> **Settings**.
3. In the left sidebar under **Settings for my calendars**, click your
   main calendar (the one with your name).
4. Scroll to **Share with specific people or groups** -> **Add people
   and groups**.
5. Paste the service-account email from Step A6.
6. Set the permission to **Make changes to events**.
7. Click **Send**.

## Step C — Vercel: give the website the two settings

1. Open the project on [vercel.com](https://vercel.com) -> **Settings** ->
   **Environment Variables**.
2. Add `GOOGLE_SERVICE_ACCOUNT_JSON` = the **entire contents** of the
   `.json` file downloaded in Step A5. Open the file in any text editor,
   select all, copy, and paste it in as-is.
3. Add `GOOGLE_CALENDAR_ID` = the photographer's Gmail address (the
   calendar you shared in Step B).
4. For both variables, tick **Production** and **Preview**.
5. Redeploy the site (**Deployments** -> "…" menu on the latest ->
   **Redeploy**). The sync is live from that deploy.

## Step D — Supabase (existing installs only)

If the site is already running with a Supabase bookings database that was
created before the calendar sync existed: open your Supabase project ->
**SQL Editor** -> run the one line from `supabase/add-google-calendar.sql`
(in this repository). It is harmless to re-run.

## How it behaves

- New website bookings appear in your calendar within seconds, titled
  "Photo shoot — <property address>" ("Twilight shoot — …" for twilight
  sessions), with all the agent's details in the event description.
- Anything you add to your calendar blocks those times on the website
  within a minute. There is no caching layer — every availability request
  checks your calendar live.
- ⚠️ **All-day events (holidays, leave) need one extra click.** Google
  marks all-day events as "Free" by default, and free time does NOT block
  bookings. When you add a holiday or a full day off, open the event and
  change **Busy/Free** (under the time fields) to **Busy** — otherwise
  clients can still book that day. Normal timed events are Busy by
  default and need nothing special.
- To **cancel** a booking, do BOTH: delete the event in Google Calendar
  AND set the booking row's `status` to `cancelled` in Supabase (Table
  Editor -> `bookings`). Either one alone keeps the time blocked — that
  is deliberate (fail-safe): a half-cancelled booking can never be resold.
- If Google is briefly unreachable, the site keeps taking bookings using
  its own database and flags availability as approximate. No booking is
  ever lost because of a Google outage.

## Security

The downloaded `.json` key is a password to your calendar. Only ever
paste it into Vercel's environment variables — never email it, commit it
to the code, or share it in chat. If it ever leaks, open the service
account's **Keys** tab, delete the key, and create a new one.
