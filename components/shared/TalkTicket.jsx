'use client';

/**
 * TalkTicket — shared ticket-style card
 * variant: 'schedule' | 'highlight' | 'modal'
 */
export default function TalkTicket({
  talk,
  isSaved = false,
  onToggle,
  expanded = false,
  onExpand,
  variant = 'schedule',
}) {
  const trackColor = talk.track?.color ?? '#C2C5C2';
  const trackName = talk.track?.name ?? '';
  const contentId = `talk-desc-${talk.id}`;

  const Barcode = () => (
    <svg aria-hidden="true" width="56" height="36" viewBox="0 0 56 36">
      {[2,4,7,9,13,15,17,21,23,26,29,31,35,37,40,42,46,48,51,53].map((x, i) => (
        <rect key={i} x={x} y="0" width={i % 4 === 0 ? 2 : 1} height="36" fill="currentColor" />
      ))}
    </svg>
  );

  const StarBtn = () => (
    <button
      onClick={() => onToggle?.(talk.id)}
      aria-pressed={isSaved}
      aria-label={
        isSaved
          ? `Remove "${talk.title}" from My Schedule`
          : `Save "${talk.title}" to My Schedule`
      }
      className="btn-star"
    >
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill={isSaved ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  );

  /* ── Modal variant ── */
  if (variant === 'modal') {
    return (
      <div className="flex overflow-hidden border" style={{ borderColor: trackColor }}>
        {/* Track strip */}
        <div
          className="flex-shrink-0 w-8 flex items-center justify-center"
          style={{ backgroundColor: trackColor }}
          aria-hidden="true"
        >
          <span
            className="font-mono font-bold text-[10px] uppercase tracking-[0.5px] text-neutral-900 whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            {trackName}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 p-[var(--spacing-200)]" style={{ backgroundColor: trackColor }}>
          <h3 className="font-display font-bold text-[20px] sm:text-[24px] text-neutral-900 leading-[110%] mb-[var(--spacing-100)]">
            {talk.title}
          </h3>
          <p className="font-mono font-bold text-[12px] uppercase tracking-[0.5px] text-neutral-900">
            {talk.speaker?.name} // {talk.speaker?.company}
          </p>
        </div>

        {/* Right panel */}
        <div
          className="flex-shrink-0 flex flex-col items-center justify-between p-[var(--spacing-150)] border-l-2 border-dashed bg-neutral-900"
          style={{ borderColor: `${trackColor}60` }}
        >
          <div className="text-center">
            <p className="font-mono font-bold text-[16px] text-neutral-100">{talk.startTime}</p>
            <p className="font-mono text-[12px] text-neutral-500">{talk.endTime}</p>
          </div>
          <div className="text-neutral-500 my-[var(--spacing-100)]">
            <Barcode />
          </div>
          {onToggle && <StarBtn />}
        </div>
      </div>
    );
  }

  /* ── Schedule + Highlight variants ── */
  return (
    <article className="flex overflow-hidden" style={{ backgroundColor: trackColor }}>
      {/* Track strip — rotated label */}
      <div
        className="flex-shrink-0 w-8 flex items-center justify-center"
        style={{ backgroundColor: `${trackColor}cc` }}
        aria-hidden="true"
      >
        <span
          className="font-mono font-bold text-[10px] uppercase tracking-[0.5px] text-neutral-900 whitespace-nowrap"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {trackName}
        </span>
      </div>

      {/* Main content */}
      <div className="flex-1 p-[var(--spacing-250)] min-w-0">
        <h3 className="font-display font-bold text-[20px] sm:text-[24px] text-neutral-900 leading-[110%]">
          {talk.title}
        </h3>
        <p className="font-mono font-bold text-[12px] uppercase tracking-[0.5px] text-neutral-900 mt-[var(--spacing-100)]">
          {talk.speaker?.name} // {talk.speaker?.company}
        </p>

        {/* Expand toggle */}
        {onExpand && (
          <>
            <button
              onClick={onExpand}
              aria-expanded={expanded}
              aria-controls={contentId}
              className="font-mono text-[12px] font-bold text-neutral-900 mt-[var(--spacing-150)] flex items-center gap-[var(--spacing-050)] hover:underline focus-visible:underline focus-visible:outline-none"
            >
              {expanded ? '— Hide Details' : '+ Show Details'}
            </button>

            {expanded && (
              <div id={contentId} className="mt-[var(--spacing-200)] space-y-[var(--spacing-100)]">
                <p className="font-mono text-[14px] text-neutral-900 leading-[140%]">
                  {talk.description}
                </p>
                {talk.location && variant === 'schedule' && (
                  <p className="font-mono font-bold text-[12px] uppercase tracking-[0.5px] text-neutral-900">
                    Location: {talk.location}
                  </p>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {/* Right panel: time + barcode + bookmark/day */}
      <div
        className="flex-shrink-0 flex flex-col items-center justify-between px-[var(--spacing-200)] py-[var(--spacing-250)] border-l-2 border-dashed"
        style={{ borderColor: `${trackColor}80`, backgroundColor: `${trackColor}cc` }}
      >
        <div className="text-center">
          <p className="font-mono font-bold text-[20px] text-neutral-900">{talk.startTime}</p>
          <p className="font-mono text-[12px] text-neutral-900 opacity-60">{talk.endTime}</p>
        </div>

        <div className="text-neutral-900 opacity-40 my-[var(--spacing-100)]">
          <Barcode />
        </div>

        {variant === 'highlight' && (
          <p className="font-mono font-bold text-[12px] uppercase tracking-[0.5px] text-neutral-900 opacity-60">
            Day {talk.day}
          </p>
        )}

        {variant === 'schedule' && onToggle && <StarBtn />}
      </div>
    </article>
  );
}