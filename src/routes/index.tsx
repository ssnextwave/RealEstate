import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/homepage/hero";
import { FeaturedProperties } from "@/components/homepage/featured-properties";
import { Categories } from "@/components/homepage/categories";
import { Partners, CtaBanner, Newsletter } from "@/components/homepage/sections";
import { WhyUs } from "@/components/homepage/why-us";
import { Stats } from "@/components/homepage/stats";
import { Testimonials } from "@/components/homepage/testimonials";
import { LatestBlogs } from "@/components/homepage/latest-blogs";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${SITE.name} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { property: "og:title", content: `${SITE.name} — ${SITE.tagline}` },
      { property: "og:description", content: SITE.description },
      { rel: "canonical", href: SITE.url },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Hero />
      <Partners />
      <FeaturedProperties />
      <Categories />
      <Stats />
      <WhyUs />
      <Testimonials />
      <LatestBlogs />
      <CtaBanner />
      <Newsletter />
    </>
  );
}
