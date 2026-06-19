"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { RevealText } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export function Philosophy() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section ref={ref} className="relative h-[120svh] overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-[-12%]">
        <Image
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2000"
          alt="Editorial campaign frame"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-ink/55" />
      </motion.div>

      <div className="gutter relative flex h-full flex-col items-center justify-center text-center">
        <p className="eyebrow mb-8">Our Philosophy</p>
        <RevealText
          as="h2"
          stagger={0.06}
          className="max-w-5xl text-h1 font-display font-light leading-[0.95]"
        >
          Luxury is not what you own. It is who you decide to become.
        </RevealText>
        <div className="mt-12">
          <Button href="/manifesto" variant="outline">
            Read the manifesto
          </Button>
        </div>
      </div>
    </section>
  );
}
