import { cn } from "@/lib/utils";

type IconProps = { className?: string; size?: number };

/** Sharp four-point sparkle — Vida Nova's recurring graphic mark. */
export function Spark({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      aria-hidden
    >
      <path
        d="M12 1C12.6 7.2 16.8 11.4 23 12C16.8 12.6 12.6 16.8 12 23C11.4 16.8 7.2 12.6 1 12C7.2 11.4 11.4 7.2 12 1Z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Outlined cross / plus — nods to the brand's faith motif. */
export function Cross({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <path
        d="M12 2V22M2 12H22"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}

/** Asterisk star — used as marquee + section dividers. */
export function Asterisk({ className, size = 24 }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden
    >
      <g stroke="currentColor" strokeWidth="1.25">
        <path d="M12 2V22M2 12H22M4.9 4.9L19.1 19.1M19.1 4.9L4.9 19.1" />
      </g>
    </svg>
  );
}

/** Generated barcode-style stripes + serial. Streetwear authenticity cue. */
export function Barcode({
  serial = "VN-0000-XX",
  className,
  width = 120,
}: {
  serial?: string;
  className?: string;
  width?: number;
}) {
  // Deterministic stripe widths from the serial string.
  const bars = Array.from(serial.replace(/[^A-Z0-9]/g, "")).map(
    (c) => (c.charCodeAt(0) % 4) + 1,
  );
  return (
    <div className={cn("inline-flex flex-col gap-1", className)} aria-hidden>
      <svg
        width={width}
        height="28"
        viewBox={`0 0 ${bars.reduce((a, b) => a + b + 1, 0)} 28`}
        preserveAspectRatio="none"
        className="text-bone"
      >
        {
          bars.reduce<{ x: number; rects: React.ReactElement[] }>(
            (acc, w, i) => {
              if (i % 2 === 0) {
                acc.rects.push(
                  <rect
                    key={i}
                    x={acc.x}
                    y="0"
                    width={w}
                    height="28"
                    fill="currentColor"
                  />,
                );
              }
              acc.x += w + 1;
              return acc;
            },
            { x: 0, rects: [] },
          ).rects
        }
      </svg>
      <span className="font-mono text-[0.6rem] tracking-[0.3em] text-ash">
        {serial}
      </span>
    </div>
  );
}
