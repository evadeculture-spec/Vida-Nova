"use client";

import { useRef, type ElementType, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Line-by-line text reveal using mask animation — each line rises from
 * behind an invisible clip. The hallmark editorial entrance.
 */
export function RevealText({
  children,
  as: Tag = "span",
  className,
  delay = 0,
  stagger = 0.08,
}: {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const words = children.split(" ");

  return (
    <Tag ref={ref} className={className} aria-label={children}>
      {words.map((word, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden align-top"
          style={{ paddingBottom: "0.12em", marginBottom: "-0.12em" }}
        >
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : { y: "110%" }}
            transition={{
              duration: 0.9,
              ease: EASE,
              delay: delay + i * stagger,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/**
 * Generic in-view reveal for blocks (images, cards, paragraphs).
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 40,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Image reveal with a sliding mask + slow scale settle.
 */
export function RevealImage({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden" }}>
      <motion.div
        initial={{ clipPath: "inset(100% 0 0 0)" }}
        animate={
          inView
            ? { clipPath: "inset(0% 0 0 0)" }
            : { clipPath: "inset(100% 0 0 0)" }
        }
        transition={{ duration: 1.2, ease: EASE, delay }}
        className="h-full w-full"
      >
        <motion.div
          initial={{ scale: 1.25 }}
          animate={inView ? { scale: 1 } : { scale: 1.25 }}
          transition={{ duration: 1.5, ease: EASE, delay }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
