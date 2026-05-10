import { Suspense } from 'react';
import { getEnrichedTalks, getDays, getTracks } from '../../lib/data';
import ScheduleClient from '../../components/schedule/ScheduleClient';

export default async function SchedulePage() {
  const [allTalks, days, allTracks] = await Promise.all([
    getEnrichedTalks(),
    getDays(),
    getTracks(),
  ]);

  const tracks = allTracks.filter((t) => t.name !== 'Keynote');

  return (
    <Suspense fallback={
      <div className="page-container py-[var(--spacing-600)]">
        <p className="font-mono text-neutral-500">Loading schedule…</p>
      </div>
    }>
      <ScheduleClient allTalks={allTalks} days={days} tracks={tracks} />
    </Suspense>
  );
}