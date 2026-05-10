'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import TalkTicket from '../shared/TalkTicket';

export default function SpeakerModal({ speaker, talk, isSaved, onToggleSave, onClose }) {
  const dialogRef = useRef(null);
  const closeRef  = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    closeRef.current?.focus();

    const focusable = dialog.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    function onKeyDown(e) {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault(); first.focus();
        }
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-start justify-center p-[var(--spacing-300)] bg-neutral-900/80 overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Dialog */}
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-speaker-name"
        className="relative w-full max-w-xl bg-neutral-800 border border-neutral-600 my-auto"
      >
        {/* Close button — top-right */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close speaker modal"
          className="absolute top-[var(--spacing-200)] right-[var(--spacing-200)] w-10 h-10 border border-neutral-600 flex items-center justify-center text-neutral-200 hover:border-green-200 hover:text-green-200 transition-colors focus-visible:outline-none focus-visible:border-green-200"
        >
          <svg aria-hidden="true" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="p-[var(--spacing-400)]">
          {/* Speaker header: photo + name/role */}
          <div className="flex items-start gap-[var(--spacing-300)] pr-[var(--spacing-500)]">
            <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex-shrink-0 overflow-hidden">
              <Image
                src={speaker.avatar.replace('./assets', '')}
                alt=""
                aria-hidden="true"
                fill
                className="object-cover object-top"
                sizes="128px"
              />
            </div>
            <div className="pt-[var(--spacing-100)]">
              <h2
                id="modal-speaker-name"
                className="font-display font-bold text-[24px] sm:text-[32px] text-neutral-100 leading-[110%] lowercase"
              >
                {speaker.name}
              </h2>
              <p className="font-mono text-[12px] text-neutral-200 uppercase tracking-[0.5px] mt-[var(--spacing-075)]">
                {speaker.role} @{speaker.company}
              </p>
            </div>
          </div>

          {/* Divider */}
          <hr className="border-neutral-600 my-[var(--spacing-300)]" />

          {/* Bio */}
          {speaker.bio && (
            <p className="font-mono text-[14px] text-neutral-200 leading-[140%]">
              {speaker.bio}
            </p>
          )}

          {/* Divider */}
          <hr className="border-neutral-600 my-[var(--spacing-300)]" />

          {/* Talk section */}
          {talk && (
            <>
              <p className="font-mono text-[12px] font-bold text-neutral-500 uppercase tracking-[0.5px] mb-[var(--spacing-200)]">
                // Talk
              </p>
              <TalkTicket
                talk={talk}
                variant="modal"
                isSaved={isSaved}
                onToggle={onToggleSave}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}