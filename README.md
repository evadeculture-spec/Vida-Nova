# VIDA NOVA

> Everyone deserves a new beginning.

A luxury digital experience for VIDA NOVA — built as a cinematic, editorial
flagship rather than a conventional storefront. Dark, restrained, motion-led.

## Stack

- **Next.js 16** (App Router, React 19, RSC)
- **TypeScript**
- **Tailwind CSS v4** — token-driven design system
- **Framer Motion** — reveals, parallax, magnetic interactions
- **Lenis** — momentum smooth scrolling
- Editorial typography: **Fraunces** (display) · **Geist** (sans) · **Geist Mono** (labels)

## Design system

All tokens live in `src/app/globals.css` under `@theme` — colour, fluid type
scale (`clamp()`), spacing rhythm, motion easings, radii. The palette is an
intentionally narrow monochrome:

| Token | Value | Role |
| --- | --- | --- |
| `--color-void` | `#080808` | background |
| `--color-ink` | `#050505` | primary surface |
| `--color-coal` | `#111111` | secondary surface |
| `--color-bone` | `#f5f5f5` | text |
| `--color-ash` | `#999999` | muted |
| `--color-chrome` | `#ffffff` | accent |

## Architecture

```
src/
  app/                 # routes (home, shop, shop/[slug], manifesto, 404, sitemap, robots)
  components/
    home/              # homepage "scenes"
    layout/            # header, footer, menu, cursor, loader
    providers/         # smooth-scroll
    shop/              # product card
    ui/                # reusable motion + interaction primitives
  lib/                 # site config, product data, utils
```

## Homepage scenes

Built as a sequence of scenes, not sections: cinematic hero → scroll-driven
manifesto → live drop countdown → editorial collection cards → pinned
horizontal lookbook → philosophy → community grid → VIP membership tiers.

## Quality

- Accessibility: skip link, reduced-motion handling throughout, semantic
  landmarks, focus-visible rings, ARIA on decorative motion.
- SEO: per-route metadata, OpenGraph/Twitter, JSON-LD (Brand + Product),
  `sitemap.xml`, `robots.txt`.
- Performance: RSC by default, image optimization (AVIF/WebP), font display
  swap, GPU-friendly transforms.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Roadmap

Foundation + cinematic homepage + shop/product/manifesto are complete.
Next phases: commerce backend (Stripe), auth & account, CMS & admin,
WebGL product viewer (R3F), and the full drops/queue system.
