/**
 * lib/data.js
 * All data now comes from Sanity.
 * Function signatures are identical to the old JSON version
 * so no page or component imports need to change.
 *
 * All functions are async — pages that call them must be async too.
 * Server Components handle this naturally.
 * Client Components that need data should receive it as props.
 */

import {
  getConferenceInfo as _getConferenceInfo,
  getTracks        as _getTracks,
  getSpeakers      as _getSpeakers,
  getFeaturedSpeakers as _getFeaturedSpeakers,
  getSpeakerById   as _getSpeakerById,
  getTalks         as _getTalks,
  getEnrichedTalks as _getEnrichedTalks,
  getEnrichedHighlightedTalks as _getEnrichedHighlightedTalks,
  getKeynote       as _getKeynote,
  getDays          as _getDays,
  getEnrichedSpeakers as _getEnrichedSpeakers,
} from './sanity.js'

// ── Conference ──────────────────────────────────────────────
export async function getConferenceInfo() {
  return _getConferenceInfo()
}

// ── Tracks ──────────────────────────────────────────────────
export async function getTracks() {
  return _getTracks()
}

export async function getTrackById(id) {
  const tracks = await _getTracks()
  return tracks.find((t) => t.id === id) ?? null
}

// ── Speakers ────────────────────────────────────────────────
export async function getSpeakers() {
  return _getSpeakers()
}

export async function getFeaturedSpeakers() {
  return _getFeaturedSpeakers()
}

export async function getSpeakerById(id) {
  return _getSpeakerById(id)
}

// ── Talks ───────────────────────────────────────────────────
export async function getTalks() {
  return _getTalks()
}

export async function getEnrichedTalks() {
  return _getEnrichedTalks()
}

export async function getEnrichedHighlightedTalks() {
  return _getEnrichedHighlightedTalks()
}

export async function getKeynote() {
  return _getKeynote()
}

export async function getDays() {
  return _getDays()
}

export async function getEnrichedSpeakers() {
  return _getEnrichedSpeakers()
}