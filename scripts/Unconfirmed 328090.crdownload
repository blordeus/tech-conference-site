/**
 * Avatar upload script
 * Uploads speaker avatars from public/images/ to Sanity
 * and patches each speaker document with the image reference.
 *
 * Run from project root (PowerShell):
 *   $env:SANITY_TOKEN="your_token_here"
 *   node scripts/upload-avatars.mjs
 */

import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const client = createClient({
  projectId: 'sxhtw4qw',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// Load data.json to get avatar filenames per speakerId
const data = JSON.parse(
  readFileSync(resolve(__dirname, '../data/data.json'), 'utf-8')
)

// Build map: speakerId → filename (e.g. "avatar-elena-vasquez.webp")
const avatarMap = Object.fromEntries(
  data.speakers.map((s) => [
    s.id,
    s.avatar.replace('./assets/images/', ''),
  ])
)

;(async () => {
  console.log('🖼  Uploading avatars...\n')

  const speakers = await client.fetch(
    `*[_type == "speaker"]{ _id, speakerId, name }`
  )

  for (const speaker of speakers) {
    const filename = avatarMap[speaker.speakerId]

    if (!filename) {
      console.log(`  ⚠ No avatar mapping for ${speaker.name}`)
      continue
    }

    const filepath = resolve(__dirname, '../public/images', filename)

    if (!existsSync(filepath)) {
      console.log(`  ⚠ File not found: public/images/${filename}`)
      continue
    }

    try {
      // Upload image to Sanity asset store
      const asset = await client.assets.upload(
        'image',
        readFileSync(filepath),
        { filename }
      )

      // Patch the speaker document with the asset reference
      await client
        .patch(speaker._id)
        .set({
          avatar: {
            _type: 'image',
            asset: { _type: 'reference', _ref: asset._id },
          },
        })
        .commit()

      console.log(`  ✓ ${speaker.name}`)
    } catch (err) {
      console.log(`  ✗ ${speaker.name} — ${err.message}`)
    }
  }

  console.log('\n✅ Done! Check the Studio to verify avatars on each speaker.')
})()
