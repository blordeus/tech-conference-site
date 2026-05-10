import Link from 'next/link';
import Image from 'next/image';
import { getConferenceInfo, getKeynote, getSpeakerById } from '../../lib/data';

export default function KeynoteHero() {
  const conf = getConferenceInfo();
  const keynote = getKeynote();
  const speaker = keynote ? getSpeakerById(keynote.speakerId) : null;

  return (
    <section aria-labelledby="hero-heading">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[420px]">

        {/* Left — tagline + watermark + date bar */}
        <div
          className="relative flex flex-col justify-between p-[var(--spacing-400)] overflow-hidden"
          style={{ backgroundColor: 'var(--color-neutral-100)' }}
        >
          {/* Watermark */}
          <span
            aria-hidden="true"
            className="absolute bottom-[var(--spacing-600)] left-0 font-display font-bold text-[80px] sm:text-[120px] leading-none select-none pointer-events-none"
            style={{ color: 'rgba(0,21,29,0.06)', whiteSpace: 'nowrap' }}
          >
            HORIZON
          </span>

          {/* Tagline */}
          <div className="relative z-10">
            <h1
              id="hero-heading"
              className="font-display font-bold text-[38px] sm:text-[56px] lg:text-[64px] leading-[100%] tracking-[-2px] text-neutral-900"
            >
              {conf.tagline}
            </h1>
          </div>

          {/* Date + venue bar */}
          <div className="relative z-10 flex items-center justify-between mt-[var(--spacing-600)] pt-[var(--spacing-200)] border-t border-neutral-600">
            <p className="font-mono text-[12px] font-bold text-neutral-900 uppercase tracking-[0.5px]">
              Nov 15–17, 2026
            </p>
            <p className="font-mono text-[12px] font-bold text-neutral-900 uppercase tracking-[0.5px]">
              Pier 70, SF
            </p>
          </div>
        </div>

        {/* Right — keynote speaker card */}
        {keynote && speaker && (
          <div className="bg-neutral-800 flex flex-col justify-between p-[var(--spacing-400)]">
            <p className="font-mono text-[12px] font-bold text-neutral-500 uppercase tracking-[0.5px] mb-[var(--spacing-300)]">
              // Featured Keynote
            </p>

            <div className="flex items-start gap-[var(--spacing-300)]">
              {/* Speaker photo */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 flex-shrink-0 overflow-hidden">
                <Image
                  src={speaker.avatar.replace('./assets', '')}
                  alt={speaker.name}
                  fill
                  className="object-cover object-top"
                  sizes="(max-width: 640px) 112px, 144px"
                  priority
                />
              </div>

              {/* Speaker info */}
              <div>
                <h2 className="font-display font-bold text-[24px] sm:text-[32px] leading-[120%] text-neutral-100">
                  {speaker.name}
                </h2>
                <p className="font-mono text-[12px] text-neutral-200 uppercase tracking-[0.5px] mt-[var(--spacing-050)]">
                  {speaker.role}
                </p>
                <p className="font-mono text-[12px] text-neutral-500 uppercase tracking-[0.5px]">
                  @{speaker.company}
                </p>
              </div>
            </div>

            {/* Talk info */}
            <div className="mt-[var(--spacing-300)]">
              <p className="font-mono font-bold text-[14px] uppercase tracking-[0.5px] text-neutral-100">
                {keynote.title}
              </p>
              <p className="font-mono text-[12px] text-neutral-200 mt-[var(--spacing-100)]">
                Nov 15 / {keynote.startTime} / {keynote.location}
              </p>
            </div>

            <Link
              href="/schedule"
              className="btn-ghost mt-[var(--spacing-300)] self-start"
            >
              View Talk →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}