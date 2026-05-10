'use client';

/**
 * ScheduleFilters
 * One row of pills: Day 01, Day 02, Day 03 | Frontend, Performance, A11y, Tooling | My Schedule | Clear
 * All state lives in the URL via useScheduleFilters.
 */
export default function ScheduleFilters({
  days,
  tracks,
  filters,
  setDay,
  setTrack,
  setView,
  clearFilters,
  savedCount,
  hasActiveFilter,
}) {
  // Tracks excludes Keynote (tr_0) — already filtered before being passed in
  return (
    <div
      role="group"
      aria-label="Schedule filters"
      className="flex flex-wrap gap-[var(--spacing-100)]"
    >
      {/* Day pills */}
      {days.map((day) => {
        const active = filters.day === String(day);
        return (
          <button
            key={day}
            onClick={() => setDay(active ? 'all' : String(day))}
            aria-pressed={active}
            className={`filter-pill ${active ? 'filter-pill--active' : ''}`}
          >
            Day {String(day).padStart(2, '0')}
          </button>
        );
      })}

      {/* Divider — visual gap between day and track pills */}
      <span aria-hidden="true" className="w-px bg-neutral-600 self-stretch mx-[var(--spacing-050)]" />

      {/* Track pills */}
      {tracks.map((track) => {
        const active = filters.track === track.id;
        return (
          <button
            key={track.id}
            onClick={() => setTrack(active ? 'all' : track.id)}
            aria-pressed={active}
            className={`filter-pill ${active ? 'filter-pill--active' : ''}`}
          >
            {/* A11y abbreviation for Accessibility */}
            {track.name === 'Accessibility' ? 'A11y' : track.name}
          </button>
        );
      })}

      {/* My Schedule pill — dashed by default, solid when active */}
      <button
        onClick={() => setView(filters.view === 'saved' ? 'all' : 'saved')}
        aria-pressed={filters.view === 'saved'}
        className={`filter-pill filter-pill--saved ${filters.view === 'saved' ? 'filter-pill--active' : ''}`}
      >
        My Schedule
        {savedCount > 0 && (
          <span
            className="ml-[var(--spacing-075)] inline-flex items-center justify-center w-4 h-4 rounded-full bg-neutral-900 text-green-200 font-bold"
            style={{ fontSize: '10px' }}
          >
            {savedCount}
          </span>
        )}
      </button>

      {/* Clear — only shown when any filter is active */}
      {hasActiveFilter && (
        <button
          onClick={clearFilters}
          className="filter-pill filter-pill--clear"
          aria-label="Clear all filters"
        >
          Clear
        </button>
      )}
    </div>
  );
}