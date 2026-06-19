"use client";

import Image from "next/image";
import { Reveal, RevealText } from "@/components/ui/reveal";
import { LinkUnderline } from "@/components/ui/button";

const gallery = [
  "1529626455594-4ff0802cfb7e",
  "1488161628813-04466f872be2",
  "1507003211169-0a1dd7228f2d",
  "1524504388940-b1c1722653e1",
  "1521119989659-a83eee488004",
  "1500648767791-00dcc994a43e",
];

export function Community() {
  return (
    <section className="section-y gutter">
      <div className="mb-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-6">The Movement</p>
          <RevealText
            as="h2"
            className="text-h1 font-display font-light leading-[0.9]"
          >
            Worn by the reborn.
          </RevealText>
        </div>
        <LinkUnderline href="/community" className="text-ash">
          @vidanova
        </LinkUnderline>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
        {gallery.map((id, i) => (
          <Reveal
            key={id}
            delay={i * 0.05}
            className={
              i === 0 || i === 3
                ? "col-span-2 row-span-2 md:col-span-2 md:row-span-2"
                : ""
            }
          >
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="group relative block aspect-square overflow-hidden rounded-[var(--radius-sm)] bg-coal"
            >
              <Image
                src={`https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=700`}
                alt="Community member wearing Vida Nova"
                fill
                sizes="(max-width:768px) 50vw, 18vw"
                className="object-cover transition-transform duration-700 ease-[var(--ease-luxe)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/30" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
