"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { type Drop } from "@/lib/drops";
import { Countdown } from "@/components/ui/countdown";
import { Seal } from "@/components/ui/seal";
import { RevealText } from "@/components/ui/reveal";

export function DropHero({ drop }: { drop: Drop }) {
  // Derive a stable launch time from the offset on first mount.
  const [target] = useState(() => Date.now() + drop.offsetMs);
  const [early] = useState(() =>
    drop.earlyAccessMs ? Date.now() + drop.offsetMs - drop.earlyAccessMs : 0,
  );

  return (
    <section className="gutter relative pt-36 pb-10">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="mb-6 flex items-center gap-4">
            <span className="eyebrow">Drop {drop.index}</span>
            <span className="h-px w-10 bg-line-strong" />
            <span className="eyebrow text-bone">● Upcoming</span>
          </div>

          <RevealText
            as="h1"
            className="text-h1 font-display font-light leading-[0.88]"
          >
            {drop.name}
          </RevealText>

          <p className="mt-6 max-w-md text-lead leading-snug text-ash">
            {drop.blurb}
          </p>

          <div className="mt-10 border-y border-line py-8">
            <Countdown target={target} />
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-4 text-sm">
            <div>
              <p className="eyebrow text-[0.6rem]">Limited to</p>
              <p className="font-mono">{drop.units} units</p>
            </div>
            {early > 0 && (
              <div>
                <p className="eyebrow text-[0.6rem]">VIP early access</p>
                <p className="font-mono">2h before public</p>
              </div>
            )}
            <a
              href="#access"
              className="text-sm uppercase tracking-[0.18em] text-bone underline-offset-4 hover:underline"
            >
              Enter the queue ↓
            </a>
          </div>
        </div>

        {/* Visual */}
        <motion.div
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0% 0 0 0)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] bg-coal"
        >
          <Image
            src={drop.image}
            alt={drop.name}
            fill
            priority
            sizes="(max-width:1024px) 100vw, 45vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          <div className="absolute right-5 top-5 text-bone">
            <Seal size={92} text="LIMITED · NUMBERED · REBORN · " />
          </div>
          <span className="glass absolute bottom-5 left-5 rounded-full px-4 py-2 text-[0.6rem] uppercase tracking-[0.2em] text-bone">
            No. 001 — {drop.units} / {drop.collection}
          </span>
        </motion.div>
      </div>
    </section>
  );
}
