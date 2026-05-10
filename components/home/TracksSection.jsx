import Link from 'next/link';

export default function TracksSection({ tracks = [] }) {
  const filtered = tracks.filter((t) => t.name !== 'Keynote');

  return (
    <section
      className="py-[var(--spacing-500)] border-b border-neutral-600"
      aria-labelledby="tracks-heading"
    >
      <div className="px-[var(--page-padding)]">
        <p
          id="tracks-heading"
          className="font-mono text-[12px] font-bold text-[var(--color-primary)] uppercase tracking-[0.5px] mb-[var(--spacing-300)]"
        >
          // Tracks
        </p>

        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-200)] list-none m-0 p-0">
          {filtered.map((track) => (
            <li key={track.id}>
              <Link
                href={`/schedule?track=${track.id}`}
                className="block p-[var(--spacing-250)] group focus-visible:outline-none transition-all hover:brightness-110"
                style={{
                  backgroundColor: `${track.color}18`,
                  borderTop: `1px solid ${track.color}60`,
                  borderLeft: `1px solid ${track.color}60`,
                  borderBottom: `3px solid ${track.color}`,
                  borderRight: `3px solid ${track.color}`,
                }}
              >
                <p className="font-display font-bold text-[16px] lowercase leading-snug"
                  style={{ color: track.color }}
                >
                  {track.name}
                </p>
                <p className="font-mono text-[12px] mt-[var(--spacing-075)] leading-[140%] text-neutral-200">
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