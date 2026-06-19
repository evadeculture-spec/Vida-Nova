"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

type Variant = "solid" | "outline" | "ghost";

const base =
  "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-[var(--radius-pill)] px-8 py-4 text-sm uppercase tracking-[0.18em] transition-colors duration-500 will-change-transform";

const variants: Record<Variant, string> = {
  solid: "bg-bone text-ink hover:text-bone",
  outline:
    "border border-line-strong text-bone hover:border-bone hover:text-ink",
  ghost: "text-bone hover:text-ash",
};

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      {/* sliding fill */}
      <span
        aria-hidden
        className="absolute inset-0 -z-0 translate-y-full bg-bone transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:translate-y-0"
      />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </>
  );
}

export function Button({
  href,
  children,
  variant = "solid",
  className,
  magnetic = true,
  ...props
}: {
  href?: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  magnetic?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const cls = cn(base, variants[variant], className);

  const content =
    variant === "outline" ? <Inner>{children}</Inner> : (
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    );

  const node = href ? (
    <Link href={href} className={cls}>
      {content}
    </Link>
  ) : (
    <button className={cls} {...props}>
      {content}
    </button>
  );

  return magnetic ? <Magnetic strength={0.35}>{node}</Magnetic> : node;
}

/** Minimal text link with an animated underline. */
export function LinkUnderline({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-block text-sm uppercase tracking-[0.18em]",
        className,
      )}
    >
      <span>{children}</span>
      <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-0 bg-current transition-transform duration-500 ease-[var(--ease-luxe)] group-hover:origin-left group-hover:scale-x-100" />
    </Link>
  );
}
