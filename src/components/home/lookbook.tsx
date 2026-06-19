"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const looks = [
  {
    title: "Look 01",
    note: "Reborn — Washed Black",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1100",
  },
  {
    title: "Look 02",
    note: "Faith — Charcoal Wool",
    image:
      "https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&q=80&w=1100",
  },
  {
    title: "Look 03",
    note: "Essentials — Bone",
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=1100",
  },
  {
    title: "Look 04",
    note: "Legacy — Stone",
    image:
      "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?auto=format&fit=crop&q=80&w=1100",
  },
  {
    title: "Look 05",
    note: "Reborn — Obsidian",
    image:
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=1100",
  },
];

export function Lookbook() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Slide the track horizontally across the pinned viewport.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-72%"]);

  return (
    <section ref={ref} className="relative h-[320vh] bg-ink">
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="gutter flex items-end justify-between pt-28">
          <div>
            <p className="eyebrow mb-4">The Lookbook</p>
            <h2 className="text-h2 font-display font-light leading-[0.9]">
              In motion.
            </h2>
          </div>
          <span className="eyebrow hidden lg:block">SS26 — Scroll →</span>
        </div>

        <motion.div
          style={{ x }}
          className="mt-auto flex gap-6 pb-24 pl-[clamp(1.25rem,3vw,5rem)] will-change-transform"
        >
          {looks.map((look, i) => (
            <figure
              key={look.title}
              className="group relative h-[56vh] w-[78vw] shrink-0 overflow-hidden rounded-[var(--radius-md)] sm:w-[46vw] lg:w-[34vw]"
            >
              <Image
                src={look.image}
                alt={look.note}
                fill
                sizes="(max-width:640px) 78vw, (max-width:1024px) 46vw, 34vw"
                className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                <span className="font-display text-h3 font-light">
                  {look.title}
                </span>
                <span className="eyebrow text-bone">{look.note}</span>
              </figcaption>
              <span className="absolute left-6 top-6 eyebrow text-bone/70">
                0{i + 1} / 0{looks.length}
              </span>
            </figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
