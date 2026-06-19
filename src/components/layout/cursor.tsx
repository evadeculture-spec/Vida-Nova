"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Smooth trailing cursor. A small ring that lerps toward the pointer and
 * expands over interactive elements. Hidden on touch + reduced motion.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduced) return;
    // Gated on browser-only media queries — must run after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(
        !!target.closest("a, button, [data-cursor='hover'], input, textarea"),
      );
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[10000] hidden md:block"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="rounded-full border border-bone/70 mix-blend-difference"
        animate={{
          width: hovering ? 56 : 14,
          height: hovering ? 56 : 14,
          x: hovering ? -28 : -7,
          y: hovering ? -28 : -7,
          backgroundColor: hovering
            ? "rgba(245,245,245,0.0)"
            : "rgba(245,245,245,1)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
}
