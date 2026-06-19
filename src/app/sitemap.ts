import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { products, collections } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    "",
    "/shop",
    "/collections",
    "/drops",
    "/lookbook",
    "/manifesto",
    "/community",
    "/account",
  ].map((path) => ({
    url: `${site.url}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const productRoutes = products.map((p) => ({
    url: `${site.url}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${site.url}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...routes, ...productRoutes, ...collectionRoutes];
}
