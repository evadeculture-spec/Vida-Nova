"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Seal } from "@/components/ui/seal";
import { Spark } from "@/components/ui/graphics";

const EASE = [0.16, 1, 0.3, 1] as const;
const word = {
  hidden: { y: "120%" },
  show: (i: number) => ({
    y: 0,
    transition: { duration: 1.1, ease: EASE, delay: 1.0 + i * 0.12 },
  }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] w-full overflow-hidden"
      aria-label="Vida Nova introduction"
    >
      {/* Cinematic backdrop */}
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=2000"
          alt="Vida Nova campaign — a figure in motion"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/20 to-void" />
        <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-ink/40" />
      </motion.div>

      {/* Eyebrow top */}
      <motion.div
        style={{ opacity }}
        className="gutter absolute top-28 flex w-full items-center justify-between"
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="eyebrow"
        >
          Chapter 01 — Genesis
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="eyebrow hidden sm:block"
        >
          Spring / Summer 26
        </motion.span>
      </motion.div>

      {/* Rotating seal + graphic marks */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 1, ease: EASE }}
        className="absolute right-[6%] top-[34%] hidden text-bone md:block"
      >
        <Seal size={132} />
      </motion.div>
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
      >
        <Spark
          size={22}
          className="absolute left-[10%] top-[42%] hidden text-bone/70 lg:block"
        />
        <Spark
          size={14}
          className="absolute right-[28%] top-[24%] hidden text-bone/50 lg:block"
        />
      </motion.div>

      {/* Headline */}
      <motion.div
        style={{ y: textY, opacity }}
        className="gutter absolute inset-x-0 bottom-28 sm:bottom-32"
      >
        <h1 className="font-display text-[clamp(3.5rem,14vw,16rem)] font-light leading-[0.82] tracking-[-0.03em]">
          {["Vida", "Nova"].map((w, i) => (
            <span key={w} className="block overflow-hidden">
              <motion.span
                custom={i}
                variants={word}
                initial="hidden"
                animate="show"
                className="block"
              >
                {i === 1 ? <span className="italic text-chrome">{w}</span> : w}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="mt-8 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1 }}
            className="max-w-sm text-lead leading-snug text-bone/90"
          >
            Everyone deserves a new beginning.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <Button href="/shop" variant="solid">
              Enter the world
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="eyebrow text-[0.65rem]">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-line-strong">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-bone"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
