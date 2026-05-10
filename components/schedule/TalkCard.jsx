'use client';

import { useState } from 'react';

/**
 * TalkCard
 * Expandable talk card with bookmark toggle.
 * Used in ScheduleList on the /schedule page.
 */
export default function TalkCard({ talk, isSaved, onToggleSave }) {
  const [expanded, setExpanded] = useState(false);
  const contentId = `talk-desc-${talk.id}`;

  return (
    <article
      className={`rounded-xl border transition-colors ${
        isSaved
          ? 'border-[var(--color-saved)] bg-[var(--color-surface)]'
          : 'border-[var(--color-border)] bg-[var(--color-surface)]'
      }`}
    >
      <div className="p-4 flex items-start gap-4">
        {/* Time + location */}
        <div className="hidden sm:block flex-shrink-0 text-right w-20">
          <p className="text-sm font-semibold text-[var(--color-text)]">{talk.time}</p>
          {talk.location && (
            <p className="text-xs text-[var(--color-muted)] mt-0.5">{talk.location}</p>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Track pill */}
          {talk.track && (
            <span className="track-pill mb-2 inline-block">{talk.track}</span>
          )}

          {/* Mobile time */}
          <p className="sm:hidden text-xs text-[var(--color-muted)] mb-1">{talk.time}</p>

          <h3 className="text-base font-semibold text-[var(--color-text)] leading-snug">
            {talk.title}
          </h3>

          {talk.speaker && (
            <p className="text-sm text-[var(--color-muted)] mt-0.5">{talk.speaker}</p>
          )}

          {/* Expand button */}
          {talk.description && (
            <button
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
              aria-controls={contentId}
              className="mt-2 text-xs font-medium text-[var(--color-primary)] hover:underline focus:outline-none focus-visible:underline flex items-center gap-1"
            >
              {expanded ? 'Hide details' : 'Show details'}
              <svg
                aria-hidden="true"
                className={`w-3 h-3 transition-transform ${expanded ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </button>
          )}

          {/* Expanded description */}
          {expanded && (
            <div id={contentId} className="mt-3 space-y-1">
              <p className="text-sm text-[var(--color-muted)] leading-relaxed">
                {talk.description}
              </p>
              {talk.location && (
                <p className="text-xs text-[var(--color-muted)]">
                  📍 {talk.location}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Bookmark button */}
        <button
          onClick={() => onToggleSave(talk.id)}
          aria-pressed={isSaved}
          aria-label={isSaved ? `Remove "${talk.title}" from My Schedule` : `Save "${talk.title}" to My Schedule`}
          className="btn-bookmark flex-shrink-0 mt-0.5"
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill={isSaved ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-7-3.5L5 21V5z"
            />
          </svg>
        </button>
      </div>
    </article>
  );
}
