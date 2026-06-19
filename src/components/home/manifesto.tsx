"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Marquee } from "@/components/ui/marquee";

const lines = [
  "We do not make clothing.",
  "We make evidence of change.",
  "Every thread, a decision.",
  "Every garment, a beginning.",
];

function ManifestoLine({
  text,
  progress,
  range,
}: {
  text: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.p
      style={{ opacity }}
      className="font-display text-h2 font-light leading-[1.05]"
    >
      {text}
    </motion.p>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.4"],
  });

  return (
    <section className="section-y relative overflow-hidden">
      <div className="border-y border-line py-6">
        <Marquee
          items={["Purpose", "Identity", "Faith", "Resilience", "Transformation"]}
          duration={36}
        />
      </div>

      <div
        ref={ref}
        className="gutter mx-auto max-w-6xl pt-[clamp(5rem,12vw,12rem)]"
      >
        <p className="eyebrow mb-12">The Manifesto</p>
        {lines.map((line, i) => {
          const start = i / lines.length;
          const end = (i + 1) / lines.length;
          return (
            <ManifestoLine
              key={line}
              text={line}
              progress={scrollYProgress}
              range={[start, end]}
            />
          );
        })}
      </div>
    </section>
  );
}
