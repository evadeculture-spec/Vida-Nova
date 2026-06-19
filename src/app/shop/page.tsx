import type { Metadata } from "next";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/shop/product-card";
import { PageHeader } from "@/components/ui/page-header";

export const metadata: Metadata = {
  title: "Shop",
  description:
    "The full Vida Nova catalogue. Heavyweight construction, considered basics, and numbered archive pieces.",
};

const filters = ["All", "Outerwear", "Knitwear", "Tops", "Bottoms", "Accessories"];

export default function ShopPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Archive — 8 pieces"
        title="Every garment, a beginning."
      />

      <div className="gutter">
        {/* Filter rail (visual — interactivity is a later phase) */}
        <div className="no-scrollbar mb-12 flex gap-3 overflow-x-auto border-y border-line py-5">
          {filters.map((f, i) => (
            <span
              key={f}
              className={`shrink-0 rounded-full border px-5 py-2 text-xs uppercase tracking-[0.16em] transition-colors ${
                i === 0
                  ? "border-bone bg-bone text-ink"
                  : "border-line text-ash hover:border-line-strong hover:text-bone"
              }`}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-x-5 gap-y-12 pb-32 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>
      </div>
    </>
  );
}
