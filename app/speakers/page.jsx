import { Suspense } from 'react';
import { getEnrichedSpeakers } from '../../lib/data';
import SpeakersClient from '../../components/speakers/SpeakersClient';

export default async function SpeakersPage() {
  const speakers = await getEnrichedSpeakers();

  return (
    <Suspense fallback={
      <div className="page-container py-[var(--spacing-600)]">
        <p className="font-mono text-neutral-500">Loading speakers…</p>
      </div>
    }>
      <SpeakersClient speakers={speakers} />
    </Suspense>
  );
}