/**
 * Migration script — imports data.json into Sanity
 *
 * Run from project root:
 *   SANITY_TOKEN=your_token node scripts/migrate-to-sanity.mjs
 *
 * Get a token from sanity.io/manage → your project → API → Tokens → Add token (Editor role)
 */

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const data = JSON.parse(
  readFileSync(resolve(__dirname, '../data/data.json'), 'utf-8')
)

const client = createClient({
  projectId: 'sxhtw4qw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

async function migrate() {
  console.log('🚀 Starting migration...\n')

  // ── 1. Conference ──────────────────────────────────────────
  console.log('📋 Importing conference info...')
  await client.createOrReplace({
    _type: 'conference',
    _id: 'conference-singleton',
    name:             data.conference.name,
    brandCode:        data.conference.brandCode,
    tagline:          data.conference.tagline,
    startDate:        data.conference.startDate,
    endDate:          data.conference.endDate,
    venue:            data.conference.location.venue,
    city:             data.conference.location.city,
    cityAbbreviation: data.conference.location.cityAbbreviation,
    state:            data.conference.location.state,
  })
  console.log('  ✓ Conference imported\n')

  // ── 2. Tracks ──────────────────────────────────────────────
  console.log('🏷  Importing tracks...')
  for (const track of data.tracks) {
    await client.createOrReplace({
      _type: 'track',
      _id:   `track-${track.id}`,
      trackId:     track.id,
      name:        track.name,
      description: track.description,
      color:       track.color,
    })
    console.log(`  ✓ ${track.name}`)
  }
  console.log()

  // ── 3. Speakers ────────────────────────────────────────────
  console.log('👤 Importing speakers...')
  for (const speaker of data.speakers) {
    await client.createOrReplace({
      _type: 'speaker',
      _id:   `speaker-${speaker.id}`,
      speakerId: speaker.id,
      name:      speaker.name,
      role:      speaker.role,
      company:   speaker.company,
      bio:       speaker.bio,
      featured:  speaker.featured,
      // Avatar images: upload separately or leave blank for now
      // The avatar field will show as empty in the Studio
    })
    console.log(`  ✓ ${speaker.name}`)
  }
  console.log()

  // ── 4. Talks ───────────────────────────────────────────────
  console.log('🎤 Importing talks...')
  for (const talk of data.talks) {
    await client.createOrReplace({
      _type: 'talk',
      _id:   `talk-${talk.id}`,
      talkId:      talk.id,
      title:       talk.title,
      day:         talk.day,
      startTime:   talk.startTime,
      endTime:     talk.endTime,
      location:    talk.location,
      description: talk.description,
      highlighted: talk.highlighted,
      speaker: {
        _type: 'reference',
        _ref:  `speaker-${talk.speakerId}`,
      },
      track: {
        _type: 'reference',
        _ref:  `track-${talk.trackId}`,
      },
    })
    console.log(`  ✓ ${talk.title}`)
  }
  console.log()

  console.log('✅ Migration complete!')
  console.log('   Open sanity.io/manage to verify your data.')
  console.log('   Upload speaker avatars manually in the Studio under each speaker.')
}

migrate().catch((err) => {
  console.error('Migration failed:', err.message)
  process.exit(1)
})
