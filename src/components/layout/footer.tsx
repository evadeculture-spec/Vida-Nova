import Link from "next/link";
import { footerNav, social, site } from "@/lib/site";
import { Spark } from "@/components/ui/graphics";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="gutter pt-24 pb-10">
        <div className="grid gap-16 lg:grid-cols-[1.4fr_1fr]">
          {/* Statement */}
          <div className="max-w-xl">
            <p className="eyebrow mb-6">Vida Nova — Est. New Beginnings</p>
            <h2 className="text-h2 font-light leading-[0.95]">
              Begin <span className="italic text-ash">again.</span>
            </h2>
            <p className="mt-8 max-w-md text-ash">
              Join the movement. Early access to drops, private collections, and
              the stories behind every garment.
            </p>
            <form className="mt-8 flex max-w-md items-center gap-4 border-b border-line-strong pb-3 focus-within:border-bone">
              <input
                type="email"
                required
                placeholder="Your email"
                aria-label="Email address"
                className="w-full bg-transparent text-bone placeholder:text-ash focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 text-sm uppercase tracking-[0.18em] text-bone transition-colors hover:text-ash"
              >
                Join →
              </button>
            </form>
          </div>

          {/* Nav columns */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {Object.entries(footerNav).map(([title, links]) => (
              <div key={title}>
                <h3 className="eyebrow mb-5 font-mono">{title}</h3>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-ash transition-colors hover:text-bone"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Oversized wordmark */}
        <div className="mt-24 flex select-none items-center gap-[0.1em] leading-[0.8]">
          <span className="text-mega font-display font-light text-chrome opacity-90">
            VIDA
          </span>
          <Spark size={48} className="shrink-0 text-ash" />
          <span className="text-mega font-display font-light text-outline text-outline-ash">
            NOVA
          </span>
        </div>

        <div className="hairline mt-10 flex flex-col items-start justify-between gap-6 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-ash">
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-8">
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
          <div className="flex gap-8">
            <Link href="/privacy" className="text-xs text-ash hover:text-bone">
              Privacy
            </Link>
            <Link href="/terms" className="text-xs text-ash hover:text-bone">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
