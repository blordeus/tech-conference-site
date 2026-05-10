// lib/data.js
// Single source of truth for all data access.
// If you switch to a CMS, this is the only file you change.

import data from '../data/data.json';

// ── Conference ──────────────────────────────────────────────
export function getConferenceInfo() {
  return data.conference;
}

// ── Tracks ──────────────────────────────────────────────────
export function getTracks() {
  return data.tracks ?? [];
}

export function getTrackById(id) {
  return data.tracks.find((t) => t.id === id) ?? null;
}

// ── Speakers ────────────────────────────────────────────────
export function getSpeakers() {
  return data.speakers ?? [];
}

export function getFeaturedSpeakers() {
  return data.speakers.filter((s) => s.featured);
}

export function getSpeakerById(id) {
  return data.speakers.find((s) => s.id === id) ?? null;
}

// ── Talks ───────────────────────────────────────────────────
export function getTalks() {
  return data.talks ?? [];
}

export function getTalkById(id) {
  return data.talks.find((t) => t.id === id) ?? null;
}

/** Keynote = the talk in the Keynote track (tr_0) */
export function getKeynote() {
  const keynoteTrack = data.tracks.find((t) => t.name === 'Keynote');
  if (!keynoteTrack) return null;
  return data.talks.find((t) => t.trackId === keynoteTrack.id) ?? null;
}

/** Talks marked highlighted: true — used for schedule highlights on home page */
export function getHighlightedTalks() {
  return data.talks.filter((t) => t.highlighted);
}

/** All unique day numbers, sorted */
export function getDays() {
  return [...new Set(data.talks.map((t) => t.day))].sort((a, b) => a - b);
}

/**
 * Enrich a talk with its speaker and track objects.
 * Returns { ...talk, speaker, track }
 */
export function enrichTalk(talk) {
  return {
    ...talk,
    speaker: getSpeakerById(talk.speakerId),
    track: getTrackById(talk.trackId),
  };
}

export function getEnrichedTalks() {
  return getTalks().map(enrichTalk);
}

export function getEnrichedHighlightedTalks() {
  return getHighlightedTalks().map(enrichTalk);
}