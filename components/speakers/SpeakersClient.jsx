'use client';

import { useSearchParams } from 'next/navigation';
import { useSavedTalks } from '../../hooks/useSavedTalks';
import SpeakerGrid from './SpeakerGrid';

export default function SpeakersClient({ speakers }) {
  const searchParams = useSearchParams();
  const initialSpeakerId = searchParams.get('speaker') ?? null;
  const { isSaved, toggleSave } = useSavedTalks();

  return (
    <div className="px-[var(--page-padding)] py-[var(--spacing-600)]">
      <h1 className="font-display font-bold text-[32px] sm:text-[48px] text-neutral-100 leading-[100%] mb-[var(--spacing-500)]">
        {'// speakers'}
      </h1>

      <SpeakerGrid
        speakers={speakers}
        isSaved={isSaved}
        onToggleSave={toggleSave}
        initialSpeakerId={initialSpeakerId}
      />
    </div>
  );
}