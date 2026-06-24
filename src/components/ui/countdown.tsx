"use client";

import { useCountdown } from "@/lib/use-countdown";
import { cn } from "@/lib/utils";

function Unit({
  value,
  label,
  size,
}: {
  value: number;
  label: string;
  size: string;
}) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={cn("font-display font-light tabular-nums leading-none", size)}
      >
        {value.toString().padStart(2, "0")}
      </span>
      <span className="eyebrow mt-3 text-[0.6rem]">{label}</span>
    </div>
  );
}

export function Countdown({
  target,
  className,
  size = "text-[clamp(2.5rem,7vw,5rem)]",
}: {
  target: number;
  className?: string;
  size?: string;
}) {
  const t = useCountdown(target);
  if (!t) return <div className={cn("h-[5rem]", className)} aria-hidden />;
  return (
    <div className={cn("flex gap-8 sm:gap-12", className)}>
      <Unit value={t.d} label="Days" size={size} />
      <Unit value={t.h} label="Hrs" size={size} />
      <Unit value={t.m} label="Min" size={size} />
      <Unit value={t.s} label="Sec" size={size} />
    </div>
  );
}
