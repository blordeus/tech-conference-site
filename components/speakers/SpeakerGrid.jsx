'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SpeakerModal from './SpeakerModal';

/**
 * SpeakerGrid
 * Props:
 *   speakers      — enriched speaker array ({ ...speaker, talk })
 *   isSaved(id)   — boolean fn
 *   onToggleSave  — (talkId) => void
 *   initialSpeakerId — open this speaker's modal on mount (from URL param)
 */
export default function SpeakerGrid({ speakers, isSaved, onToggleSave, initialSpeakerId }) {
  const [activeSpeaker, setActiveSpeaker] = useState(null);

  // Auto-open modal if ?speaker=sp_X is in URL (linked from home page)
  useEffect(() => {
    if (initialSpeakerId) {
      const found = speakers.find((s) => s.id === initialSpeakerId);
      if (found) setActiveSpeaker(found);
    }
  }, [initialSpeakerId, speakers]);

  return (
    <>
      <ul
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[var(--spacing-150)] list-none m-0 p-0"
        aria-label="Conference speakers"
      >
        {speakers.map((speaker) => (
          <li key={speaker.id}>
            <button
              onClick={() => setActiveSpeaker(speaker)}
              className="w-full text-left card-hoverable group focus-visible:outline-none"
              aria-label={`View ${speaker.name}'s bio and talk`}
            >
              {/* Photo */}
              <div className="relative w-full aspect-[3/4] overflow-hidden bg-neutral-800">
                <Image
                  src={speaker.avatar.replace('./assets', '')}
                  alt=""
                  aria-hidden="true"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </div>

              {/* Info */}
              <div className="p-[var(--spacing-200)] bg-neutral-800">
                <p className="font-display font-bold text-[14px] text-neutral-100 lowercase leading-snug">
                  {speaker.name}
                </p>
                <p className="font-mono text-[12px] text-neutral-200 mt-[var(--spacing-050)]">
                  {speaker.role} @{speaker.company}
                </p>
                {speaker.talk && (
                  <p
                    className="font-mono font-bold text-[12px] uppercase tracking-[0.5px] mt-[var(--spacing-150)] leading-[130%]"
                    style={{ color: speaker.talk.track?.color ?? 'var(--color-green-200)' }}
                  >
                    {speaker.talk.title}
                  </p>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>

      {activeSpeaker && (
        <SpeakerModal
          speaker={activeSpeaker}
          talk={activeSpeaker.talk ?? null}
          isSaved={activeSpeaker.talk ? isSaved(activeSpeaker.talk.id) : false}
          onToggleSave={onToggleSave}
          onClose={() => setActiveSpeaker(null)}
        />
      )}
    </>
  );
}