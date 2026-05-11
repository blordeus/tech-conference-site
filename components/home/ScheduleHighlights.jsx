'use client';

import { useState } from 'react';
import Link from 'next/link';
import TalkTicket from '../shared/TalkTicket';

export default function ScheduleHighlights({ talks = [] }) {
  const [expandedId, setExpandedId] = useState(null);

  return (
    <section className="py-[var(--spacing-600)]" aria-labelledby="highlights-heading">
      <div className="px-[var(--page-padding)]">
        <p
          id="highlights-heading"
          className="font-mono text-[12px] font-bold text-[var(--color-primary)] uppercase tracking-[0.5px] mb-[var(--spacing-300)]"
        >
          {'// Schedule_Highlights'}
        </p>

        <ul className="space-y-[var(--spacing-150)] list-none m-0 p-0">
          {talks.map((talk) => (
            <li key={talk.id}>
              <TalkTicket
                talk={talk}
                variant="highlight"
                expanded={expandedId === talk.id}
                onExpand={() => setExpandedId((prev) => prev === talk.id ? null : talk.id)}
              />
            </li>
          ))}
        </ul>

        <div className="flex justify-center mt-[var(--spacing-500)]">
          <Link href="/schedule" className="btn-ghost">
            View Full Schedule
          </Link>
        </div>
      </div>
    </section>
  );
}