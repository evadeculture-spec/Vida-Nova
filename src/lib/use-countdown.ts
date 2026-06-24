"use client";

import { useEffect, useState } from "react";

export type TimeLeft = { d: number; h: number; m: number; s: number; done: boolean };

/**
 * Live countdown to a target timestamp. Returns null until mounted to avoid
 * hydration mismatch, then ticks every second.
 */
export function useCountdown(target: number): TimeLeft | null {
  const [time, setTime] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      setTime({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
        done: diff <= 0,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return time;
}
