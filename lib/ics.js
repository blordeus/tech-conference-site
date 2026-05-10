/**
 * lib/ics.js
 * Generates a valid .ics (iCalendar) file from a list of saved talks.
 * Works in-browser — no dependencies required.
 *
 * Usage:
 *   import { downloadICS } from '../lib/ics';
 *   downloadICS(savedTalks, 'TechConf-2025-My-Schedule');
 */

/**
 * Format a date + time string into iCal DTSTART/DTEND format.
 * Expects date = "2025-10-01" and time = "09:00" (24h) or "09:00 AM".
 * Returns "20251001T090000" (local time, no timezone suffix).
 */
function formatICSDate(date, time) {
  if (!date || !time) return null;

  // Normalise time to 24h
  let [h, m] = time.replace(/\s*(AM|PM)/i, '').split(':').map(Number);
  const isPM = /PM/i.test(time);
  if (isPM && h !== 12) h += 12;
  if (!isPM && h === 12) h = 0;

  const d = date.replace(/-/g, '');
  const hh = String(h).padStart(2, '0');
  const mm = String(m ?? 0).padStart(2, '0');

  return `${d}T${hh}${mm}00`;
}

/**
 * Estimate end time = start + 50 minutes (standard conference slot).
 * Returns an iCal date string.
 */
function addMinutes(icsDate, minutes = 50) {
  if (!icsDate) return null;
  const year = parseInt(icsDate.slice(0, 4));
  const month = parseInt(icsDate.slice(4, 6)) - 1;
  const day = parseInt(icsDate.slice(6, 8));
  const h = parseInt(icsDate.slice(9, 11));
  const m = parseInt(icsDate.slice(11, 13));

  const d = new Date(year, month, day, h, m + minutes);
  const pad = (n) => String(n).padStart(2, '0');

  return [
    d.getFullYear(),
    pad(d.getMonth() + 1),
    pad(d.getDate()),
    'T',
    pad(d.getHours()),
    pad(d.getMinutes()),
    '00',
  ].join('');
}

/** Escape special characters per iCal spec */
function escapeICS(str = '') {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

/** Build a single VEVENT block from a talk object */
function buildEvent(talk) {
  const uid = `${talk.id}@techconf2025`;
  const dtstart = formatICSDate(talk.date, talk.time);
  const dtend = addMinutes(dtstart, 50);
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

  const lines = [
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    dtstart ? `DTSTART:${dtstart}` : null,
    dtend ? `DTEND:${dtend}` : null,
    `SUMMARY:${escapeICS(talk.title)}`,
    talk.speaker ? `DESCRIPTION:${escapeICS(`Speaker: ${talk.speaker}${talk.description ? '\n\n' + talk.description : ''}`)}` : null,
    talk.location ? `LOCATION:${escapeICS(talk.location)}` : null,
    'END:VEVENT',
  ].filter(Boolean);

  return lines.join('\r\n');
}

/**
 * Build and trigger a .ics file download in the browser.
 * @param {Array} talks — array of talk objects (with date, time, title, etc.)
 * @param {string} filename — without extension
 */
export function downloadICS(talks, filename = 'My-TechConf-Schedule') {
  if (!talks.length) return;

  const events = talks.map(buildEvent).join('\r\n');

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//TechConf 2025//My Schedule//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    events,
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.ics`;
  a.click();

  URL.revokeObjectURL(url);
}
