import Image from "next/image";
import { type Drop, type DropStatus } from "@/lib/drops";
import { Reveal } from "@/components/ui/reveal";

const statusLabel: Record<DropStatus, string> = {
  live: "● Live now",
  upcoming: "Upcoming",
  soldout: "Sold out",
  archive: "Archive",
};

export function DropSchedule({ drops }: { drops: Drop[] }) {
  return (
    <section className="gutter section-y">
      <div className="mb-12 flex items-end justify-between">
        <h2 className="text-h2 font-display font-light leading-[0.9]">
          The schedule.
        </h2>
        <span className="eyebrow hidden sm:block">All drops</span>
      </div>

      <ul className="border-t border-line">
        {drops.map((drop, i) => (
          <Reveal key={drop.id} delay={i * 0.05}>
            <li className="group grid grid-cols-[auto_1fr_auto] items-center gap-6 border-b border-line py-6 transition-colors hover:bg-coal/40 sm:gap-10 sm:py-8">
              <div className="relative hidden h-16 w-14 shrink-0 overflow-hidden rounded-[var(--radius-xs)] bg-coal sm:block">
                <Image
                  src={drop.image}
                  alt={drop.name}
                  fill
                  sizes="56px"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              <div className="flex items-baseline gap-4">
                <span className="eyebrow hidden text-[0.6rem] sm:block">
                  {drop.index}
                </span>
                <div>
                  <h3 className="text-h3 font-display font-light leading-none">
                    {drop.name}
                  </h3>
                  <p className="mt-1 text-xs text-ash">{drop.collection}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-right">
                <span
                  className={
                    drop.status === "soldout" || drop.status === "archive"
                      ? "text-xs uppercase tracking-[0.2em] text-ash"
                      : "text-xs uppercase tracking-[0.2em] text-bone"
                  }
                >
                  {statusLabel[drop.status]}
                </span>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}
