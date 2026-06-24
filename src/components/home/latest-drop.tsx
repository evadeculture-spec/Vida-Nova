"use client";

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal, RevealText } from "@/components/ui/reveal";
import { useCountdown } from "@/lib/use-countdown";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-display text-[clamp(2.5rem,7vw,5rem)] font-light tabular-nums leading-none">
        {value.toString().padStart(2, "0")}
      </span>
      <span className="eyebrow mt-3 text-[0.6rem]">{label}</span>
    </div>
  );
}

export function LatestDrop() {
  const [target] = useState(() => Date.now() + 9 * 86400000 + 3600000 * 7);
  const time = useCountdown(target);

  return (
    <section className="section-y relative overflow-hidden bg-ink">
      <div className="gutter grid items-center gap-16 lg:grid-cols-2">
        {/* Visual */}
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)]">
            <Image
              src="https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=1200"
              alt="Reborn drop preview"
              fill
              sizes="(max-width:1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
            <div className="glass absolute left-5 top-5 rounded-full px-4 py-2">
              <span className="eyebrow text-[0.6rem] text-bone">
                ● Live — Limited to 200 units
              </span>
            </div>
          </div>
        </Reveal>

        {/* Content */}
        <div className="order-1 lg:order-2">
          <p className="eyebrow mb-6">Drop 04 — The Reborn Coat</p>
          <RevealText
            as="h2"
            className="text-h1 font-display font-light leading-[0.9]"
          >
            Access opens soon.
          </RevealText>
          <p className="mt-6 max-w-md text-ash">
            A numbered run of the Faith Wool Overcoat. Password-protected entry,
            virtual queue, and inventory reserved for members first.
          </p>

          {/* Countdown */}
          <div className="mt-12 flex gap-8 border-y border-line py-8 sm:gap-12">
            {time ? (
              <>
                <Unit value={time.d} label="Days" />
                <Unit value={time.h} label="Hrs" />
                <Unit value={time.m} label="Min" />
                <Unit value={time.s} label="Sec" />
              </>
            ) : (
              <div className="h-[5rem]" />
            )}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Button href="/drops" variant="solid">
              Get early access
            </Button>
            <Button href="/drops" variant="ghost">
              Notify me →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
