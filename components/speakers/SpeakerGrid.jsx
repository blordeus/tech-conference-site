'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SpeakerModal from './SpeakerModal';

const CARD_COLORS = [
  '#B5E9FC',
  '#FEC9C3',
  '#FFE6BA',
  '#CCC4FD',
  '#BBD8FF',
  '#D1FF66',
  '#FEC9C3',
  '#CCC4FD',
  '#B5E9FC',
  '#FFE6BA',
  '#BBD8FF',
  '#FEC9C3',
  '#CCC4FD',
  '#B5E9FC',
  '#D1FF66',
  '#FFE6BA',
  '#BBD8FF',
  '#FEC9C3',
  '#CCC4FD',
  '#B5E9FC',
];

export default function SpeakerGrid({ speakers, isSaved, onToggleSave, initialSpeakerId }) {
  const [activeSpeaker, setActiveSpeaker] = useState(null);

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
        {speakers.map((speaker, i) => {
          const bgColor = CARD_COLORS[i % CARD_COLORS.length];
          return (
            <li key={speaker.id}>
              <button
                onClick={() => setActiveSpeaker(speaker)}
                className="w-full text-left card-hoverable group focus-visible:outline-none"
                aria-label={`View ${speaker.name}'s bio and talk`}
              >
                {/* Photo with colored background */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ backgroundColor: bgColor, aspectRatio: '4/4' }}
                >
                  {speaker.avatar && (
                    <Image
                      src={speaker.avatar}
                      alt=""
                      aria-hidden="true"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  )}
                </div>

                {/* Info */}
                <div className="p-[var(--spacing-100)] bg-neutral-800">
                  <p className="font-display font-bold text-[24px] text-neutral-100 lowercase leading-snug">
                    {speaker.name}
                  </p>
                  <p className="font-mono text-[14px] text-neutral-200 leading-[140%]">
                    {speaker.role} @{speaker.company}
                  </p>
                  {speaker.talk && (
                    <p
                      className="font-mono font-bold text-[14px] uppercase tracking-[0.5px] leading-[130%] text-green-200 mb-[var(--spacing-100)]"
                      style={{
                        borderTop: '1px solid var(--color-neutral-600)',
                        marginTop: 'var(--spacing-150)',
                        paddingTop: 'var(--spacing-150)',
                      }}
                    >
                      {speaker.talk.title}
                    </p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
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