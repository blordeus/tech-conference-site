import Link from 'next/link';
import { getTracks } from '../../lib/data';

export default function TracksSection() {
  const tracks = getTracks().filter((t) => t.name !== 'Keynote');

  return (
    <section
      className="py-[var(--spacing-600)] border-b border-neutral-600"
      aria-labelledby="tracks-heading"
    >
      <div className="page-container">
        <p
          id="tracks-heading"
          className="font-mono text-[12px] font-bold text-neutral-500 uppercase tracking-[0.5px] mb-[var(--spacing-300)]"
        >
          // Tracks
        </p>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-150)] list-none m-0 p-0">
          {tracks.map((track) => (
            <li key={track.id}>
              <Link
                href={`/schedule?track=${track.id}`}
                className="block card-hoverable p-[var(--spacing-250)] group focus-visible:outline-none"
              >
                <p className="font-display font-bold text-[16px] text-neutral-100 group-hover:text-green-200 transition-colors lowercase">
                  {track.name}
                </p>
                <p className="font-mono text-[12px] text-neutral-500 mt-[var(--spacing-100)] leading-[140%]">
                  {track.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}