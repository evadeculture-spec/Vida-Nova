import { Hero } from "@/components/home/hero";
import { Manifesto } from "@/components/home/manifesto";
import { LatestDrop } from "@/components/home/latest-drop";
import { CollectionsScene } from "@/components/home/collections-scene";
import { Lookbook } from "@/components/home/lookbook";
import { Community } from "@/components/home/community";
import { Philosophy } from "@/components/home/philosophy";
import { Membership } from "@/components/home/membership";
import { site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Brand",
  name: site.name,
  slogan: site.tagline,
  description: site.description,
  url: site.url,
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Manifesto />
      <LatestDrop />
      <CollectionsScene />
      <Lookbook />
      <Philosophy />
      <Community />
      <Membership />
    </>
  );
}
