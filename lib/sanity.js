import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? '2024-01-01',
  useCdn: true, // false in dev if you need fresh data immediately
})

// ── Queries ─────────────────────────────────────────────────

export async function getConferenceInfo() {
  return client.fetch(`*[_type == "conference"][0]{
    name, brandCode, tagline, startDate, endDate,
    venue, city, cityAbbreviation, state
  }`)
}

export async function getTracks() {
  return client.fetch(`*[_type == "track"] | order(trackId asc) {
    "id": trackId, name, description, color
  }`)
}

export async function getSpeakers() {
  return client.fetch(`*[_type == "speaker"] | order(speakerId asc) {
    "id": speakerId, name, role, company, bio, featured,
    "avatar": avatar.asset->url
  }`)
}

export async function getFeaturedSpeakers() {
  return client.fetch(`*[_type == "speaker" && featured == true] | order(speakerId asc) {
    "id": speakerId, name, role, company, bio,
    "avatar": avatar.asset->url
  }`)
}

export async function getSpeakerById(speakerId) {
  return client.fetch(`*[_type == "speaker" && speakerId == $speakerId][0]{
    "id": speakerId, name, role, company, bio,
    "avatar": avatar.asset->url
  }`, { speakerId })
}

export async function getTalks() {
  return client.fetch(`*[_type == "talk"] | order(day asc, startTime asc) {
    "id": talkId,
    title, day, startTime, endTime, location, description, highlighted,
    "speakerId": speaker->speakerId,
    "trackId": track->trackId,
  }`)
}

export async function getEnrichedTalks() {
  return client.fetch(`*[_type == "talk"] | order(day asc, startTime asc) {
    "id": talkId,
    title, day, startTime, endTime, location, description, highlighted,
    "speaker": speaker->{
      "id": speakerId, name, role, company,
      "avatar": avatar.asset->url
    },
    "track": track->{
      "id": trackId, name, color
    },
    "speakerId": speaker->speakerId,
    "trackId": track->trackId,
  }`)
}

export async function getEnrichedHighlightedTalks() {
  return client.fetch(`*[_type == "talk" && highlighted == true] | order(day asc, startTime asc) {
    "id": talkId,
    title, day, startTime, endTime, location, description,
    "speaker": speaker->{
      "id": speakerId, name, role, company,
      "avatar": avatar.asset->url
    },
    "track": track->{
      "id": trackId, name, color
    },
    "speakerId": speaker->speakerId,
    "trackId": track->trackId,
  }`)
}

export async function getKeynote() {
  return client.fetch(`*[_type == "talk" && track->name == "Keynote"][0]{
    "id": talkId,
    title, day, startTime, endTime, location, description,
    "speaker": speaker->{
      "id": speakerId, name, role, company,
      "avatar": avatar.asset->url
    },
    "track": track->{ "id": trackId, name, color },
    "speakerId": speaker->speakerId,
    "trackId": track->trackId,
  }`)
}

export async function getDays() {
  const talks = await client.fetch(`*[_type == "talk"]{ day }`)
  return [...new Set(talks.map((t) => t.day))].sort((a, b) => a - b)
}

export async function getEnrichedSpeakers() {
  // Each speaker with their talk joined
  return client.fetch(`*[_type == "speaker"] | order(speakerId asc) {
    "id": speakerId, name, role, company, bio, featured,
    "avatar": avatar.asset->url,
    "talk": *[_type == "talk" && references(^._id)][0]{
      "id": talkId,
      title, day, startTime, endTime, location, description,
      "track": track->{ "id": trackId, name, color },
      "trackId": track->trackId,
    }
  }`)
}
