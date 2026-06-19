"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Seal } from "@/components/ui/seal";
import { Asterisk, Barcode, Cross, Spark } from "@/components/ui/graphics";
import { Ticker } from "@/components/ui/ticker";

const stack = ["MADE", "TO", "OUTLIVE"];

export function Symbols() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["8%", "-8%"]);

  return (
    <section ref={ref} className="crosshairs relative overflow-hidden bg-ink">
      <div className="border-y border-line">
        <Ticker
          items={["Authentic", "Numbered", "Reborn", "Limited", "Worldwide"]}
          duration={34}
        />
      </div>

      {/* Scattered graphic motifs */}
      <Spark
        size={26}
        className="absolute left-[8%] top-[22%] text-ash/60"
      />
      <Cross size={30} className="absolute right-[12%] top-[28%] text-ash/40" />
      <Asterisk
        size={34}
        className="absolute bottom-[18%] left-[16%] text-ash/40"
      />
      <Spark
        size={18}
        className="absolute right-[22%] bottom-[26%] text-ash/60"
      />

      <div className="gutter relative flex flex-col items-center py-[clamp(5rem,12vw,11rem)]">
        <p className="eyebrow mb-12">Brand DNA — Fig. 01</p>

        {/* Kinetic outline stack with overlapping seal */}
        <div className="relative flex w-full flex-col items-center">
          <motion.h2
            style={{ x: x1 }}
            className="text-[clamp(3.5rem,15vw,13rem)] font-display font-light uppercase leading-[0.82]"
          >
            {stack[0]}
          </motion.h2>
          <motion.h2
            style={{ x: x2 }}
            className="text-outline text-[clamp(3.5rem,15vw,13rem)] font-display font-light uppercase leading-[0.82]"
          >
            {stack[1]}
          </motion.h2>
          <motion.h2
            style={{ x: x1 }}
            className="text-[clamp(3.5rem,15vw,13rem)] font-display font-light uppercase leading-[0.82]"
          >
            {stack[2]}
          </motion.h2>

          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-bone md:block">
            <Seal size={168} />
          </div>
        </div>

        <p className="mt-16 max-w-md text-center text-ash">
          Every Vida Nova piece carries a serial, a seal, and a story. Numbered
          against its run, made to be inherited — never replaced.
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-10">
          <Barcode serial="VN-2026-RB" />
          <div className="text-bone md:hidden">
            <Seal size={120} />
          </div>
          <div className="flex flex-col items-start gap-1 border-l border-line pl-6">
            <span className="eyebrow text-[0.6rem]">Run</span>
            <span className="font-mono text-sm">No. 047 / 200</span>
          </div>
        </div>
      </div>
    </section>
  );
}
