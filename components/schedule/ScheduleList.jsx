'use client';

import { useState } from 'react';
import TalkTicket from '../shared/TalkTicket';

export default function ScheduleList({ talks, isSaved, onToggleSave }) {
  const [expandedId, setExpandedId] = useState(null);

  function toggleExpand(id) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  if (talks.length === 0) {
    return (
      <div className="py-[var(--spacing-1000)] text-center">
        <p className="font-display font-bold text-[24px] text-neutral-200">No talks found</p>
        <p className="font-mono text-[14px] text-neutral-500 mt-[var(--spacing-150)]">
          Try adjusting your filters or clearing your search.
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-[var(--spacing-150)] list-none m-0 p-0">
      {talks.map((talk) => (
        <li key={talk.id}>
          <TalkTicket
            talk={talk}
            variant="schedule"
            isSaved={isSaved(talk.id)}
            onToggle={onToggleSave}
            expanded={expandedId === talk.id}
            onExpand={() => toggleExpand(talk.id)}
          />
        </li>
      ))}
    </ul>
  );
}