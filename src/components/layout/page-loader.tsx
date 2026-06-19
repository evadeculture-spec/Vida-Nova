"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EASE = [0.76, 0, 0.24, 1] as const;

/**
 * First-visit loading curtain. Counts to 100, then lifts to reveal the site.
 * Shown once per session; respects reduced motion by exiting instantly.
 */
export function PageLoader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("vn-loaded")) {
      // Skip the curtain on repeat visits — sessionStorage is client-only.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setDone(true);
      return;
    }
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const total = reduced ? 1 : 1600;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      setCount(Math.round(p * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        sessionStorage.setItem("vn-loaded", "1");
        setTimeout(() => setDone(true), 350);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-end justify-between bg-ink p-8 sm:p-12"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <motion.span
            className="font-display text-h3 font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Vida Nova
          </motion.span>
          <span className="font-mono text-h2 font-light tabular-nums">
            {count.toString().padStart(3, "0")}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
