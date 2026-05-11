# DevHorizon 26

A multi-page tech conference site built with Next.js 16, Sanity CMS, NextAuth, and Neon (Postgres).

Live: [coming soon]

---

## What it does

- Browse speakers, filter the schedule by day and track, and save talks to a personal schedule
- Saved talks persist to a Postgres database when signed in, localStorage when not
- Export saved talks as a `.ics` file for Google Calendar or iCal
- Filter state syncs to the URL — shareable links work out of the box
- Content is managed through an embedded Sanity Studio at `/sanity`

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 16 (App Router) |
| Styling | Tailwind CSS 4 |
| CMS | Sanity v3 |
| Auth | NextAuth.js (GitHub OAuth) |
| Database | Neon (Postgres) |
| Deployment | Vercel |

---

## Pages

- `/` — Home: keynote hero, tracks, featured speakers, schedule highlights
- `/schedule` — Full schedule with day/track/saved filters and .ics export
- `/speakers` — Speaker grid with modal bio and talk save
- `/sanity` — Embedded Sanity Studio

---

## Local setup

**1. Clone and install**

```bash
git clone https://github.com/blordeus/tech-conference-site
cd tech-conference-site
npm install
```

**2. Environment variables**

Create `.env.local` in the project root:

```dotenv
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Neon
DATABASE_URL=your_neon_connection_string

# NextAuth
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

**3. Run**

```bash
npm run dev
```

Open `http://localhost:3000`.

---

## Database

One table in Neon:

```sql
CREATE TABLE saved_talks (
  id SERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  talk_id TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, talk_id)
);
```

---

## Content

Content is managed in Sanity. Four document types: `conference`, `track`, `speaker`, `talk`.

To access the Studio locally: `http://localhost:3000/sanity`

To migrate content from `data.json`:

```bash
$env:SANITY_TOKEN="your_token"
node scripts/migrate-to-sanity.mjs
```

To upload speaker avatars:

```bash
$env:SANITY_TOKEN="your_token"
node scripts/upload-avatars.mjs
```

---

## Project structure

```
app/
  page.jsx              ← Home
  schedule/page.jsx     ← Schedule
  speakers/page.jsx     ← Speakers
  sanity/[[...tool]]/   ← Embedded Studio
  api/
    auth/[...nextauth]/ ← NextAuth
    saves/              ← Save/unsave talks
components/
  home/                 ← KeynoteHero, TracksSection, FeaturedSpeakers, ScheduleHighlights
  schedule/             ← ScheduleClient, ScheduleFilters, ScheduleList
  speakers/             ← SpeakersClient, SpeakerGrid, SpeakerModal
  shared/               ← TalkTicket (used across all three pages)
hooks/
  useSavedTalks.js      ← DB when signed in, localStorage when not
  useScheduleFilters.js ← Filter state synced to URL
lib/
  sanity.js             ← Sanity client + GROQ queries
  data.js               ← Data access layer (wraps sanity.js)
  db.js                 ← Neon connection
  savedTalks.js         ← DB queries for saved talks
  ics.js                ← .ics export
scripts/
  migrate-to-sanity.mjs ← One-time data migration
  upload-avatars.mjs    ← One-time avatar upload
```
