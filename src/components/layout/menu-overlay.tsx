"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { primaryNav, social } from "@/lib/site";

const EASE = [0.76, 0, 0.24, 1] as const;

export function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex flex-col bg-ink"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <div className="gutter flex items-center justify-between py-7">
            <span className="eyebrow">Menu</span>
            <button
              onClick={onClose}
              className="eyebrow transition-colors hover:text-bone"
              aria-label="Close menu"
            >
              Close ✕
            </button>
          </div>

          <nav className="gutter flex flex-1 flex-col justify-center">
            <ul>
              {primaryNav.map((item, i) => (
                <li key={item.href} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{
                      duration: 0.7,
                      ease: EASE,
                      delay: 0.15 + i * 0.06,
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className="group flex items-baseline gap-6 py-1"
                    >
                      <span className="eyebrow w-10 shrink-0 opacity-50">
                        0{i + 1}
                      </span>
                      <span className="font-display text-h1 font-light leading-[0.95] text-bone transition-all duration-500 group-hover:translate-x-4 group-hover:text-ash">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </nav>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="gutter hairline flex flex-wrap items-center justify-between gap-4 py-8"
          >
            <p className="max-w-xs text-sm text-ash">
              Everyone deserves a new beginning.
            </p>
            <div className="flex gap-8">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow transition-colors hover:text-bone"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
