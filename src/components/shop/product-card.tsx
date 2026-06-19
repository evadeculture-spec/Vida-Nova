"use client";

import Image from "next/image";
import Link from "next/link";
import { type Product } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { Spark } from "@/components/ui/graphics";

export function ProductCard({
  product,
  index = 0,
}: {
  product: Product;
  index?: number;
}) {
  const soldout = product.status === "soldout";
  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-sm)] bg-coal">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-[1.1s] ease-[var(--ease-luxe)] group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {product.status === "drop" && (
          <span className="glass absolute left-3 top-3 rounded-full px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-bone">
            Drop
          </span>
        )}
        {soldout && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-ash">
            Sold out
          </span>
        )}

        {/* Quick add */}
        {!soldout && (
          <div className="absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-500 ease-[var(--ease-luxe)] group-hover:translate-y-0 group-hover:opacity-100">
            <span className="block w-full rounded-full bg-bone py-3 text-center text-xs uppercase tracking-[0.18em] text-ink">
              Quick add
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="flex items-center gap-1.5 text-sm font-medium leading-tight">
            {product.name}
            <Spark
              size={11}
              className="shrink-0 text-ash transition-colors group-hover:text-bone"
            />
          </h3>
          <p className="mt-1 text-xs text-ash">{product.colorway}</p>
        </div>
        <span className="font-mono text-sm tabular-nums">
          {formatPrice(product.price, product.currency)}
        </span>
      </div>
      <p className="mt-2 font-mono text-[0.6rem] tracking-[0.25em] text-ash/60">
        VN—{product.slug.slice(0, 3).toUpperCase()}—
        {String(product.price).padStart(4, "0")}
      </p>
    </Link>
  );
}
