"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden text-center">
      {/* Ghost numerals */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="pointer-events-none select-none"
      >
        <span className="text-[clamp(8rem,34vw,28rem)] font-display font-light leading-none text-chrome opacity-90">
          404
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="gutter -mt-6"
      >
        <p className="eyebrow mb-6">Lost, but not without purpose</p>
        <h1 className="mx-auto max-w-xl text-h3 font-display font-light leading-tight">
          This page has begun a new life elsewhere.
        </h1>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="solid">
            Return home
          </Button>
          <Link
            href="/shop"
            className="text-sm uppercase tracking-[0.18em] text-ash transition-colors hover:text-bone"
          >
            Explore the shop →
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
