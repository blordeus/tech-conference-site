'use client';

import { Suspense } from 'react';
import { useScheduleFilters } from '../../hooks/useScheduleFilters';
import { useSavedTalks } from '../../hooks/useSavedTalks';
import { getEnrichedTalks, getDays, getTracks } from '../../lib/data';
import { downloadICS } from '../../lib/ics';
import ScheduleFilters from '../../components/schedule/ScheduleFilters';
import ScheduleList from '../../components/schedule/ScheduleList';

function SchedulePageInner() {
  const allTalks  = getEnrichedTalks();
  const days      = getDays();                                          // [1, 2, 3]
  const tracks    = getTracks().filter((t) => t.name !== 'Keynote');  // exclude tr_0

  const { filters, setDay, setTrack, setView, setQuery, clearFilters, filterTalks, hasActiveFilter } =
    useScheduleFilters();

  const { savedIds, isSaved, toggleSave } = useSavedTalks();

  const filteredTalks = filterTalks(allTalks, savedIds);

  function handleExport() {
    const saved = allTalks.filter((t) => savedIds.has(t.id));
    downloadICS(saved, 'DevHorizon-26-My-Schedule');
  }

  return (
    <div className="page-container py-[var(--spacing-600)]">
      {/* Page heading */}
      <div className="flex items-start justify-between gap-[var(--spacing-300)] mb-[var(--spacing-400)]">
        <h1 className="font-display font-bold text-[32px] sm:text-[48px] text-neutral-100 leading-[100%]">
          // schedule
        </h1>

        {/* Export to calendar — only shown when saves exist */}
        {savedIds.size > 0 && (
          <button
            onClick={handleExport}
            className="btn-ghost flex-shrink-0 text-green-200 border-green-200"
            aria-label={`Export ${savedIds.size} saved talk${savedIds.size !== 1 ? 's' : ''} to calendar`}
          >
            <svg aria-hidden="true" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <line x1="16" x2="16" y1="2" y2="6" />
              <line x1="8" x2="8" y1="2" y2="6" />
              <line x1="3" x2="21" y1="10" y2="10" />
              <path d="m9 16 2 2 4-4" />
            </svg>
            Export ({savedIds.size})
          </button>
        )}
      </div>

      {/* Filter pills */}
      <div className="mb-[var(--spacing-500)]">
        <ScheduleFilters
          days={days}
          tracks={tracks}
          filters={filters}
          setDay={setDay}
          setTrack={setTrack}
          setView={setView}
          clearFilters={clearFilters}
          savedCount={savedIds.size}
          hasActiveFilter={hasActiveFilter}
        />
      </div>

      {/* Talk list */}
      <ScheduleList
        talks={filteredTalks}
        isSaved={isSaved}
        onToggleSave={toggleSave}
      />
    </div>
  );
}

export default function SchedulePage() {
  return (
    <Suspense fallback={
      <div className="page-container py-[var(--spacing-600)]">
        <p className="font-mono text-neutral-500">Loading schedule…</p>
      </div>
    }>
      <SchedulePageInner />
    </Suspense>
  );
}