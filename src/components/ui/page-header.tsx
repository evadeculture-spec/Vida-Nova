import { RevealText } from "@/components/ui/reveal";

/** Shared editorial page header used across interior routes. */
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <header className="gutter pt-40 pb-16">
      <p className="eyebrow mb-8">{eyebrow}</p>
      <RevealText
        as="h1"
        className="max-w-5xl text-h1 font-display font-light leading-[0.9]"
      >
        {title}
      </RevealText>
      {description && (
        <p className="mt-8 max-w-xl text-lead leading-snug text-ash">
          {description}
        </p>
      )}
    </header>
  );
}
