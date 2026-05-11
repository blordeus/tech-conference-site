import Link from "next/link";
import Image from "next/image";

// Matches the Figma card background colors
const CARD_COLORS = [
  "#B5E9FC", // cyan
  "#FEC9C3", // red/pink
  "#FFE6BA", // yellow
  "#CCC4FD", // purple
  "#BBD8FF", // blue
  "#D1FF66", // green
  "#FEC9C3", // pink
  "#CCC4FD", // purple
];

export default function FeaturedSpeakers({ speakers = [] }) {
  return (
    <section
      className="py-[var(--spacing-600)] border-b border-neutral-600"
      aria-labelledby="featured-speakers-heading"
    >
      <div className="px-[var(--page-padding)]">
        <p
          id="featured-speakers-heading"
          className="font-mono text-[12px] font-bold text-[var--color-primary] uppercase tracking-[0.5px] mb-[var(--spacing-300)]"
        >
          // Featured_Speakers
        </p>

        <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[var(--spacing-150)] list-none m-0 p-0">
          {speakers.map((speaker, i) => {
            const bgColor = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <li key={speaker.id}>
                <Link
                  href={`/speakers?speaker=${speaker.id}`}
                  className="block card-hoverable group focus-visible:outline-none"
                  aria-label={`View ${speaker.name}'s profile`}
                >
                  {/* Photo with colored background */}
                  <div
                    className="relative w-full overflow-hidden"
                    style={{ backgroundColor: bgColor, aspectRatio: "4/4" }}
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
                  <div
                    className="p-[var(--spacing-200)] bg-neutral-800"
                    style={{ borderTop: "none" }}
                  >
                    <p className="font-display font-medium text-[24px] text-neutral-100 lowercase leading-snug">
                      {speaker.name}
                    </p>
                    <p className="font-mono text-[14px] text-neutral-200 leading-[140%] mb-[var(--spacing-300)]">
                      {speaker.role} @{speaker.company}
                    </p>
                    {speaker.talk && (
                      <p 
                      className="font-mono font-medium text-[14px] uppercase tracking-[2px] mt-[var(--spacing-200)] mb-[var(--spacing-100)] leading-[130%] text-green-200" 
                      style={{ borderTop: '1px solid var(--color-neutral-600)', paddingTop: 'var(--spacing-150)', marginTop: 'var(--spacing-150)' }}>
                        {speaker.talk.title}
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
