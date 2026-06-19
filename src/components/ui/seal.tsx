import { cn } from "@/lib/utils";

/**
 * Rotating circular seal / stamp — the classic streetwear authenticity mark.
 * Pure SVG, animates via CSS (paused for reduced-motion through globals).
 */
export function Seal({
  text = "VIDA NOVA · A NEW BEGINNING · EST. MMXXVI · ",
  size = 140,
  className,
  reverse = false,
  glyph = "✸",
}: {
  text?: string;
  size?: number;
  className?: string;
  reverse?: boolean;
  glyph?: string;
}) {
  const id = `seal-${text.length}-${size}`;
  return (
    <div
      className={cn("relative", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <svg
        viewBox="0 0 200 200"
        className={reverse ? "spin-slow-rev" : "spin-slow"}
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <path
            id={id}
            d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0"
            fill="none"
          />
        </defs>
        <text
          fill="currentColor"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg">
        {glyph}
      </span>
    </div>
  );
}
