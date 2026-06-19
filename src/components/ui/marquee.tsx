"use client";

import { cn } from "@/lib/utils";

/**
 * Seamless infinite marquee. Pure CSS transform loop — cheap and smooth.
 */
export function Marquee({
  items,
  className,
  duration = 28,
  reverse = false,
}: {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
}) {
  const sequence = [...items, ...items];
  return (
    <div className={cn("relative flex overflow-hidden", className)}>
      <div
        className="flex shrink-0 items-center gap-12 pr-12"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {sequence.map((item, i) => (
          <span key={i} className="flex items-center gap-12 whitespace-nowrap">
            <span className="font-display text-h2 font-light">{item}</span>
            <span className="text-ash">✦</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes marquee {
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
