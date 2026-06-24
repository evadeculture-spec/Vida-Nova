"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ProductViewer } from "./product-viewer";

type View = "photo" | "detail" | "3d";

export function ProductGallery({
  image,
  name,
}: {
  image: string;
  name: string;
}) {
  const [view, setView] = useState<View>("photo");

  const tabs: { id: View; label: string }[] = [
    { id: "photo", label: "Photo" },
    { id: "detail", label: "Fabric" },
    { id: "3d", label: "3D" },
  ];

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] bg-coal">
        <AnimatePresence mode="wait">
          {view === "3d" ? (
            <motion.div
              key="3d"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <ProductViewer />
            </motion.div>
          ) : (
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={view === "detail" ? `${name} fabric detail` : name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 55vw"
                className={cn(
                  "object-cover transition-transform duration-700",
                  view === "detail" && "scale-[1.8]",
                )}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* View switcher */}
      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setView(t.id)}
            className={cn(
              "flex-1 rounded-[var(--radius-xs)] border py-3 text-xs uppercase tracking-[0.16em] transition-colors",
              view === t.id
                ? "border-bone bg-bone text-ink"
                : "border-line text-ash hover:border-line-strong hover:text-bone",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
