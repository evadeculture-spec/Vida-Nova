import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/page-header";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Manifesto",
  description:
    "Everyone deserves a new beginning. The philosophy behind Vida Nova — transformation, purpose, identity, faith and resilience.",
};

const verses = [
  {
    n: "I",
    title: "On beginnings",
    body: "Every life contains a before and an after. Vida Nova exists in the space between — the moment a person decides they will not stay the same. We dress that moment.",
  },
  {
    n: "II",
    title: "On material",
    body: "We choose weight over volume, permanence over trend. A garment should outlast the season that made it, and the self that bought it. Quality is a form of respect.",
  },
  {
    n: "III",
    title: "On restraint",
    body: "Luxury is not noise. It is the confidence to remove. We design to the edge of nothing, then stop one decision early.",
  },
  {
    n: "IV",
    title: "On the movement",
    body: "We are not a label. We are evidence that change is possible — worn on the backs of people who chose it. The clothes are symbols. The movement is the point.",
  },
];

export default function ManifestoPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Manifesto"
        title="Everyone deserves a new beginning."
        description="Vida Nova is not clothing. It is transformation made visible."
      />

      <div className="gutter mx-auto max-w-3xl pb-32">
        {verses.map((v) => (
          <Reveal key={v.n} className="hairline grid gap-6 py-14 sm:grid-cols-[auto_1fr]">
            <span className="font-display text-h3 font-light text-ash">
              {v.n}
            </span>
            <div>
              <h2 className="text-h3 font-display font-light">{v.title}</h2>
              <p className="mt-5 text-lead leading-relaxed text-ash">{v.body}</p>
            </div>
          </Reveal>
        ))}

        <div className="mt-16 flex justify-center">
          <Button href="/shop" variant="outline">
            Begin
          </Button>
        </div>
      </div>
    </>
  );
}
