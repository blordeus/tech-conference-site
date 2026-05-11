import Link from "next/link";
import Image from "next/image";

export default function KeynoteHero({ conf, keynote }) {
  const speaker = keynote?.speaker ?? null;

  return (
    <section aria-labelledby="hero-heading">
      <div
        className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] px-[var(--page-padding)] gap-[var(--spacing-400)]"
        style={{ minHeight: "480px" }}
      >
        {/* Left — tagline + watermark + date bar */}
        <div
          className="relative flex flex-col justify-between overflow-hidden"
          style={{
            backgroundColor: "var(--color-neutral-100)",
            padding: "var(--spacing-400)",
          }}
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center font-display font-bold leading-none select-none pointer-events-none"
            style={{
              fontSize: "clamp(60px, 10vw, 180px)",
              letterSpacing: "-4px",
              WebkitTextStroke: "1px rgba(0,21,29,0.15)",
              color: "transparent",
            }}
          >
            HORIZON
          </span>

          <h1
            id="hero-heading"
            className="relative z-10 font-display font-bold leading-[100%] tracking-[-2px] text-neutral-900"
            style={{ fontSize: "clamp(38px, 5vw, 72px)" }}
          >
            {conf?.tagline ?? "where code meets the machine_"}
          </h1>

          <div
            className="relative z-10 flex items-center justify-between pt-[var(--spacing-200)] border-t border-neutral-600"
            style={{ marginTop: "var(--spacing-800)" }}
          >
            <p className="font-mono text-[12px] font-bold text-neutral-900 uppercase tracking-[0.5px]">
              Nov 15–17, 2026
            </p>
            <p className="font-mono text-[12px] font-bold text-neutral-900 uppercase tracking-[0.5px]">
              Pier 70, SF
            </p>
          </div>
        </div>

        {/* Right — solid cyan bg, info left, photo right */}
        {keynote && speaker && (
          <div
            className="relative flex overflow-hidden"
            style={{ minHeight: "480px", backgroundColor: "#B5E9FC" }}
          >
            {/* Left side — speaker info */}
            <div
              className="flex flex-col justify-between z-10 flex-1"
              style={{ padding: "var(--spacing-400)" }}
            >
              <p
                className="font-mono text-[12px] font-bold uppercase tracking-[0.5px]"
                style={{ color: "rgba(0,21,29,0.5)" }}
              >
                // Featured Keynote
              </p>

              <div>
                <h2
                  className="font-display font-bold text-neutral-900 lowercase leading-[110%]"
                  style={{ fontSize: "clamp(24px, 2.5vw, 36px)" }}
                >
                  {speaker.name}
                </h2>
                <p
                  className="font-mono text-[12px] uppercase tracking-[0.5px] mt-[var(--spacing-100)]"
                  style={{ color: "rgba(0,21,29,0.6)" }}
                >
                  {speaker.role}
                </p>
                <p
                  className="font-mono text-[12px] uppercase tracking-[0.5px]"
                  style={{ color: "rgba(0,21,29,0.4)" }}
                >
                  @{speaker.company}
                </p>

                <p className="font-mono font-bold text-[14px] uppercase tracking-[0.5px] text-neutral-900 mt-[var(--spacing-300)]">
                  {keynote.title}
                </p>
                <p
                  className="font-mono text-[12px] mt-[var(--spacing-075)]"
                  style={{ color: "rgba(0,21,29,0.6)" }}
                >
                  Nov 15 / {keynote.startTime} / {keynote.location}
                </p>

                <Link
                  href="/schedule"
                  className="btn-ghost mt-[var(--spacing-300)] inline-flex"
                  style={{
                    borderColor: "var(--color-neutral-900)",
                    color: "var(--color-neutral-900)",
                  }}
                >
                  View Talk →
                </Link>
              </div>
            </div>

            {/* Right side — photo flush to right edge */}
            {speaker.avatar && (
              <div className="relative flex-shrink-0" style={{ width: "67%" }}>
                <Image
                  src={speaker.avatar}
                  alt={speaker.name}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  priority
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
