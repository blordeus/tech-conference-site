import Link from 'next/link';
import Image from 'next/image';
import { getFeaturedSpeakers, getTalks, getTrackById } from '../../lib/data';

export default function FeaturedSpeakers() {
  const speakers = getFeaturedSpeakers();
  const allTalks = getTalks();

  const talkBySpeaker = Object.fromEntries(
    allTalks.map((t) => [t.speakerId, t])
  );

  return (
    <section
      className="py-[var(--spacing-600)] border-b border-neutral-600"
      aria-labelledby="featured-speakers-heading"
    >
      <div className="page-container">
        <p
          id="featured-speakers-heading"
          className="font-mono text-[12px] font-bold text-neutral-500 uppercase tracking-[0.5px] mb-[var(--spacing-300)]"
        >
          // Featured_Speakers
        </p>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[var(--spacing-150)] list-none m-0 p-0">
          {speakers.map((speaker) => {
            const talk = talkBySpeaker[speaker.id];
            const track = talk ? getTrackById(talk.trackId) : null;

            return (
              <li key={speaker.id}>
                <Link
                  href={`/speakers?speaker=${speaker.id}`}
                  className="block card-hoverable group focus-visible:outline-none"
                  aria-label={`View ${speaker.name}'s profile`}
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
                    <p className="font-display font-bold text-[14px] text-neutral-100 lowercase">
                      {speaker.name}
                    </p>
                    <p className="font-mono text-[12px] text-neutral-200 mt-[var(--spacing-050)]">
                      {speaker.role} @{speaker.company}
                    </p>
                    {talk && (
                      <p
                        className="font-mono font-bold text-[12px] uppercase tracking-[0.5px] mt-[var(--spacing-150)] leading-[130%]"
                        style={{ color: track?.color ?? 'var(--color-green-200)' }}
                      >
                        {talk.title}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex justify-center mt-[var(--spacing-500)]">
          <Link href="/speakers" className="btn-ghost">
            View All Speakers
          </Link>
        </div>
      </div>
    </section>
  );
}