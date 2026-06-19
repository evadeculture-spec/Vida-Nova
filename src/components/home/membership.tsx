"use client";

import { membershipTiers } from "@/lib/site";
import { Reveal, RevealText } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function Membership() {
  return (
    <section className="section-y gutter">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow mb-6">The VIP Club</p>
        <RevealText
          as="h2"
          className="text-h1 font-display font-light leading-[0.92]"
        >
          Five stages of becoming.
        </RevealText>
        <p className="mx-auto mt-6 max-w-md text-ash">
          Membership is earned, not bought. Each tier unlocks earlier access,
          private drops, and a deeper place in the movement.
        </p>
      </div>

      <div className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius-md)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
        {membershipTiers.map((tier, i) => (
          <Reveal
            key={tier.name}
            delay={i * 0.08}
            className="group relative bg-void p-8 transition-colors duration-500 hover:bg-coal"
          >
            <span className="eyebrow text-[0.6rem]">0{i + 1}</span>
            <h3 className="mt-10 text-h3 font-display font-light leading-none">
              {tier.name}
            </h3>
            <p className="mt-3 text-sm text-ash">{tier.note}</p>
            <p className="mt-10 font-mono text-xs text-ash">
              {tier.points === 0
                ? "Join free"
                : `${tier.points.toLocaleString()} pts`}
            </p>
            <span className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-x-100" />
          </Reveal>
        ))}
      </div>

      <div className="mt-14 flex justify-center">
        <Button href="/account" variant="solid">
          Begin your ascent
        </Button>
      </div>
    </section>
  );
}
