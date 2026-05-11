import Link from 'next/link';
import { getTracks } from '../lib/data';

export default async function Footer() {
  const tracks = (await getTracks()).filter((t) => t.name !== 'Keynote');

  return (
    <footer className="border-t border-neutral-600 bg-neutral-900">
      <div className="py-[var(--spacing-800)]">
        <div className="px-[var(--page-padding)] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[var(--spacing-600)]">
          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-display font-bold text-[16px] text-green-200 mb-[var(--spacing-150)]">
              DEVHORIZON_26
            </p>
            <p className="font-mono text-[12px] text-neutral-200 leading-[140%]">
              A three-day conference for engineers who build the interfaces humans use every day.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <p className="font-mono text-[12px] font-bold text-neutral-500 uppercase tracking-[0.5px] mb-[var(--spacing-200)]">
              {'// Navigate'}
            </p>
            <ul className="list-none m-0 p-0 space-y-[var(--spacing-150)]">
              {[['/', 'Home'], ['/schedule', 'Schedule'], ['/speakers', 'Speakers']].map(([href, label]) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-mono text-[12px] text-neutral-200 hover:text-green-200 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tracks */}
          <div>
            <p className="font-mono text-[12px] font-bold text-neutral-500 uppercase tracking-[0.5px] mb-[var(--spacing-200)]">
              {'// Tracks'}
            </p>
            <ul className="list-none m-0 p-0 space-y-[var(--spacing-150)]">
              {tracks.map((track) => (
                <li key={track.id}>
                  <Link
                    href={`/schedule?track=${track.id}`}
                    className="font-mono text-[12px] text-neutral-200 hover:text-green-200 transition-colors"
                  >
                    {track.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Venue */}
          <div>
            <p className="font-mono text-[12px] font-bold text-neutral-500 uppercase tracking-[0.5px] mb-[var(--spacing-200)]">
              {'// Venue'}
            </p>
            <p className="font-mono text-[12px] text-neutral-200 leading-[140%]">
              Pier 70<br />
              San Francisco, CA<br />
              Nov 15–17, 2026
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="px-[var(--page-padding)] border-t border-neutral-600 mt-[var(--spacing-600)] pt-[var(--spacing-300)] flex items-center justify-between">
          <p className="font-mono text-[12px] text-neutral-500 uppercase tracking-[0.5px]">
            © 2026 DevHorizon. All rights reserved.
          </p>
          <a
            href="#main"
            className="font-mono text-[12px] text-neutral-500 uppercase tracking-[0.5px] hover:text-neutral-100 transition-colors"
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}