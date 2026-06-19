"use client";

import { cn } from "@/lib/utils";
import { Spark } from "./graphics";

/**
 * Thin scrolling ticker bar — alternating solid / outline display words,
 * separated by sparks. A high-impact streetwear divider.
 */
export function Ticker({
  items,
  className,
  duration = 30,
  reverse = false,
  outline = true,
}: {
  items: string[];
  className?: string;
  duration?: number;
  reverse?: boolean;
  outline?: boolean;
}) {
  const sequence = [...items, ...items, ...items, ...items];
  return (
    <div
      className={cn("relative flex overflow-hidden py-4", className)}
      aria-hidden
    >
      <div
        className="flex shrink-0 items-center gap-8 pr-8"
        style={{
          animation: `ticker ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {sequence.map((item, i) => (
          <span key={i} className="flex items-center gap-8 whitespace-nowrap">
            <span
              className={cn(
                "font-display text-[clamp(1.75rem,4vw,3.5rem)] font-light uppercase leading-none",
                outline && i % 2 === 1 && "text-outline",
              )}
            >
              {item}
            </span>
            <Spark size={18} className="shrink-0 text-ash" />
          </span>
        ))}
      </div>

      <style jsx>{`
        @keyframes ticker {
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}
