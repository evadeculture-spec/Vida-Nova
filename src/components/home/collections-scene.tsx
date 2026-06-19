"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { collections } from "@/lib/products";
import { RevealText } from "@/components/ui/reveal";
import { LinkUnderline } from "@/components/ui/button";

function Card({ index }: { index: number }) {
  const collection = collections[index];
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  // Editorial offset: alternate cards drop down.
  const offset = index % 2 === 1 ? "lg:mt-32" : "";

  return (
    <Link
      ref={ref}
      href={`/collections/${collection.slug}`}
      className={`group block ${offset}`}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-[var(--radius-md)] bg-coal">
        <motion.div style={{ y }} className="absolute inset-[-8%]">
          <Image
            src={collection.image}
            alt={collection.name}
            fill
            sizes="(max-width:1024px) 100vw, 45vw"
            className="object-cover transition-all duration-[1.2s] ease-[var(--ease-luxe)] group-hover:scale-105"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <span className="eyebrow absolute right-5 top-5 text-bone">
          {collection.index}
        </span>
        <div className="absolute inset-x-0 bottom-0 p-7">
          <h3 className="text-h3 font-display font-light">{collection.name}</h3>
          <p className="mt-1 text-sm text-ash">{collection.tagline}</p>
        </div>
        <span className="absolute right-6 top-1/2 flex h-14 w-14 -translate-y-1/2 translate-x-6 items-center justify-center rounded-full bg-bone text-ink opacity-0 transition-all duration-500 ease-[var(--ease-luxe)] group-hover:translate-x-0 group-hover:opacity-100">
          ↗
        </span>
      </div>
    </Link>
  );
}

export function CollectionsScene() {
  return (
    <section className="section-y gutter">
      <div className="mb-16 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow mb-6">The Collections</p>
          <RevealText
            as="h2"
            className="text-h1 font-display font-light leading-[0.9]"
          >
            Four chapters of one story.
          </RevealText>
        </div>
        <LinkUnderline href="/collections" className="text-ash">
          View all
        </LinkUnderline>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:gap-12">
        {collections.map((_, i) => (
          <Card key={i} index={i} />
        ))}
      </div>
    </section>
  );
}
