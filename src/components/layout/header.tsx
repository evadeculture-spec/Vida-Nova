"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { primaryNav } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/ui/magnetic";
import { MenuOverlay } from "./menu-overlay";

export function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 40);
    setHidden(y > prev && y > 320 && !open);
  });

  // Lock scroll when menu open.
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: hidden ? -120 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-[150] transition-colors duration-500",
          scrolled && !open
            ? "border-b border-line bg-void/70 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="gutter flex items-center justify-between py-5">
          <Link
            href="/"
            className="font-display text-xl font-light tracking-[0.04em]"
            aria-label="Vida Nova home"
          >
            VIDA<span className="text-ash"> </span>NOVA
          </Link>

          <nav className="hidden items-center gap-10 lg:flex">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative text-sm uppercase tracking-[0.16em] text-bone/80 transition-colors hover:text-bone"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-bone transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:origin-left group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <Link
              href="/cart"
              className="hidden text-sm uppercase tracking-[0.16em] text-bone/80 transition-colors hover:text-bone sm:block"
            >
              Cart <span className="text-ash">(0)</span>
            </Link>
            <Magnetic strength={0.3}>
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-3 text-sm uppercase tracking-[0.16em]"
                aria-label="Open menu"
              >
                <span className="hidden sm:inline">Menu</span>
                <span className="flex flex-col gap-[5px]">
                  <span className="h-px w-6 bg-bone" />
                  <span className="h-px w-6 bg-bone" />
                </span>
              </button>
            </Magnetic>
          </div>
        </div>
      </motion.header>

      <MenuOverlay open={open} onClose={() => setOpen(false)} />
    </>
  );
}
