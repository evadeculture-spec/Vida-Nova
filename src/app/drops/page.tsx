import type { Metadata } from "next";
import { drops, featuredDrop } from "@/lib/drops";
import { DropHero } from "@/components/drops/drop-hero";
import { DropSchedule } from "@/components/drops/drop-schedule";
import { AccessFlow } from "@/components/drops/access-flow";
import { getProduct } from "@/lib/products";
import { Ticker } from "@/components/ui/ticker";

export const metadata: Metadata = {
  title: "Drops",
  description:
    "VIP launches, virtual queue and limited inventory. Password-protected access to numbered Vida Nova drops.",
};

export default function DropsPage() {
  const coat = getProduct("faith-wool-overcoat");

  return (
    <>
      <DropHero drop={featuredDrop} />

      <div className="border-y border-line">
        <Ticker
          items={["Virtual Queue", "Members First", "Numbered", "Limited"]}
          duration={32}
        />
      </div>

      {/* Access / queue experience */}
      <section id="access" className="gutter section-y scroll-mt-24">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="eyebrow mb-5">The Access</p>
          <h2 className="text-h2 font-display font-light leading-[0.92]">
            One code. One queue. <br className="hidden sm:block" />
            One chance.
          </h2>
          <p className="mx-auto mt-5 max-w-md text-ash">
            Entry is gated and inventory is reserved live. Members move first —
            everyone else waits their turn.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <AccessFlow
            name={featuredDrop.name}
            image={featuredDrop.image}
            accessCode={featuredDrop.accessCode ?? "REBORN26"}
            price={coat?.price ?? 690}
            units={featuredDrop.units}
          />
        </div>
      </section>

      <DropSchedule drops={drops} />

      {/* Notify */}
      <section className="gutter pb-32">
        <div className="rounded-[var(--radius-lg)] border border-line bg-coal p-10 text-center sm:p-16">
          <p className="eyebrow mb-5">Never miss a drop</p>
          <h2 className="mx-auto max-w-2xl text-h2 font-display font-light leading-[0.95]">
            Get the code before everyone else.
          </h2>
          <form className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              placeholder="Email for early access"
              aria-label="Email"
              className="w-full rounded-[var(--radius-pill)] border border-line-strong bg-void/60 px-6 py-4 text-bone placeholder:text-ash focus:border-bone focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-[var(--radius-pill)] bg-bone px-8 py-4 text-sm uppercase tracking-[0.18em] text-ink transition-opacity hover:opacity-90"
            >
              Notify me
            </button>
          </form>
          <p className="mt-4 text-xs text-ash">
            SMS notifications available for Disciple tier and above.
          </p>
        </div>
      </section>
    </>
  );
}
