'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getSpeakers, getTalks, getTrackById } from '../../lib/data';
import { useSavedTalks } from '../../hooks/useSavedTalks';
import SpeakerGrid from '../../components/speakers/SpeakerGrid';

function SpeakersPageInner() {
  const searchParams = useSearchParams();
  const initialSpeakerId = searchParams.get('speaker') ?? null;

  const { isSaved, toggleSave } = useSavedTalks();

  // Enrich every speaker with their talk + track
  const allTalks = getTalks();
  const talkBySpeaker = Object.fromEntries(allTalks.map((t) => [t.speakerId, t]));

  const speakers = getSpeakers().map((speaker) => {
    const talk = talkBySpeaker[speaker.id] ?? null;
    return {
      ...speaker,
      talk: talk
        ? { ...talk, track: getTrackById(talk.trackId) }
        : null,
    };
  });

  return (
    <div className="page-container py-[var(--spacing-600)]">
      <h1 className="font-display font-bold text-[32px] sm:text-[48px] text-neutral-100 leading-[100%] mb-[var(--spacing-500)]">
        // speakers
      </h1>

      <SpeakerGrid
        speakers={speakers}
        isSaved={isSaved}
        onToggleSave={(talkId) => toggleSave(talkId)}
        initialSpeakerId={initialSpeakerId}
      />
    </div>
  );
}

export default function SpeakersPage() {
  return (
    <Suspense fallback={
      <div className="page-container py-[var(--spacing-600)]">
        <p className="font-mono text-neutral-500">Loading speakers…</p>
      </div>
    }>
      <SpeakersPageInner />
    </Suspense>
  );
}