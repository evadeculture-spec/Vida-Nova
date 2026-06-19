import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/shop/product-card";
import { Seal } from "@/components/ui/seal";
import { Barcode } from "@/components/ui/graphics";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.story,
    openGraph: { images: [product.image] },
  };
}

const sizes = ["XS", "S", "M", "L", "XL"];

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.collection === product.collection && p.slug !== slug)
    .slice(0, 4);

  const details = [
    { label: "Materials", value: product.materials.join(" · ") },
    { label: "Fit", value: product.fit },
    { label: "Weight", value: product.weight },
    { label: "Care", value: product.care },
    { label: "Sustainability", value: product.sustainability },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.story,
    image: product.image,
    brand: { "@type": "Brand", name: "Vida Nova" },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability:
        product.status === "soldout"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="gutter pt-32">
        <nav className="mb-10 flex gap-2 text-xs text-ash">
          <Link href="/shop" className="hover:text-bone">
            Shop
          </Link>
          <span>/</span>
          <span className="text-bone">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-md)] bg-coal">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <div className="relative hidden aspect-[16/10] overflow-hidden rounded-[var(--radius-md)] bg-coal sm:block">
              <Image
                src={product.image}
                alt={`${product.name} detail`}
                fill
                sizes="(max-width:1024px) 100vw, 55vw"
                className="scale-[1.6] object-cover"
              />
            </div>
          </div>

          {/* Info — sticky */}
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="eyebrow mb-4">{product.collection}</p>
            <h1 className="text-h2 font-display font-light leading-[0.95]">
              {product.name}
            </h1>
            <p className="mt-4 font-mono text-lead">
              {formatPrice(product.price, product.currency)}
            </p>

            <p className="mt-8 max-w-md leading-relaxed text-ash">
              {product.story}
            </p>

            {/* Size */}
            <div className="mt-10">
              <div className="mb-4 flex items-center justify-between">
                <span className="eyebrow">Size</span>
                <span className="text-xs text-ash underline-offset-4 hover:underline">
                  Size guide · AI fit finder
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    className="rounded-[var(--radius-xs)] border border-line py-3 text-sm transition-colors hover:border-bone disabled:cursor-not-allowed disabled:text-ash/40"
                    disabled={product.status === "soldout"}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 flex flex-col gap-3">
              <Button
                variant="solid"
                magnetic={false}
                className="w-full justify-center"
              >
                {product.status === "soldout" ? "Notify me" : "Add to bag"}
              </Button>
              <button className="text-sm text-ash transition-colors hover:text-bone">
                ♡ Save to wishlist
              </button>
            </div>

            {/* Delivery */}
            <div className="mt-8 rounded-[var(--radius-sm)] border border-line p-5 text-sm text-ash">
              <p>
                <span className="text-bone">Carbon-neutral delivery</span> in
                2–4 days. Free returns within 30 days. Every order ships in
                signature Vida Nova packaging.
              </p>
            </div>

            {/* Authenticity strip */}
            <div className="mt-8 flex items-center justify-between gap-4 rounded-[var(--radius-sm)] border border-line p-5">
              <Barcode
                serial={`VN-${product.slug.slice(0, 4).toUpperCase()}-26`}
                width={110}
              />
              <div className="hidden flex-col items-start gap-1 border-l border-line pl-4 sm:flex">
                <span className="eyebrow text-[0.6rem]">Numbered</span>
                <span className="font-mono text-sm">No. 047 / 200</span>
              </div>
              <div className="shrink-0 text-bone">
                <Seal
                  size={84}
                  text="AUTHENTIC · VIDA NOVA · "
                  glyph="✸"
                />
              </div>
            </div>

            {/* Details accordion (static, expanded) */}
            <dl className="mt-8 divide-y divide-line border-t border-line">
              {details.map((d) => (
                <div key={d.label} className="py-5">
                  <dt className="eyebrow mb-2">{d.label}</dt>
                  <dd className="text-sm text-bone/90">{d.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>

      {/* Complete the look */}
      {related.length > 0 && (
        <section className="section-y gutter">
          <h2 className="mb-12 text-h3 font-display font-light">
            Complete the look
          </h2>
          <div className="grid grid-cols-2 gap-x-5 gap-y-12 md:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
