import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, BedDouble, Bath, Maximize, MapPin, Calendar, Heart, Phone, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { z } from "zod";
import { propertyService, agentService } from "@/services";
import { PropertyCard } from "@/components/property/property-card";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { t, formatPrice, formatArea } from "@/lib/i18n";
import { img } from "@/lib/images";
import { useFavorites, useRecent } from "@/hooks/use-favorites";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/properties/$slug")({
  loader: ({ params }) => {
    const property = propertyService.bySlug(params.slug);
    if (!property) throw notFound();
    return { property };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { property } = loaderData;
    const title = `${t(property.title)} — ${property.location.city} · ${SITE.name}`;
    const desc = t(property.description).slice(0, 160);
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: desc },
        { rel: "canonical", href: `${SITE.url}/properties/${property.slug}` },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "RealEstateListing",
            name: t(property.title),
            description: t(property.description),
            url: `${SITE.url}/properties/${property.slug}`,
            offers: { "@type": "Offer", price: property.price, priceCurrency: property.currency },
            address: {
              "@type": "PostalAddress",
              streetAddress: property.location.address,
              addressLocality: property.location.city,
              addressRegion: property.location.region,
              addressCountry: property.location.country,
            },
            numberOfRooms: property.bedrooms,
            floorSize: { "@type": "QuantitativeValue", value: property.area, unitCode: "FTK" },
          }),
        },
      ],
    };
  },
  component: PropertyDetail,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-4xl">Listing not found</h1>
      <Link to="/properties" className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm text-background">Browse all properties</Link>
    </div>
  ),
});

function PropertyDetail() {
  const { property } = Route.useLoaderData();
  const agent = agentService.byId(property.agentId);
  const similar = propertyService.similar(property);
  const { has, toggle } = useFavorites();
  const { push } = useRecent();
  const [idx, setIdx] = useState(0);

  useEffect(() => { push(property.id); }, [property.id, push]);

  return (
    <div className="container-x pb-24 pt-8 lg:pt-12">
      <Breadcrumbs items={[
        { label: "Home", to: "/" },
        { label: "Properties", to: "/properties" },
        { label: t(property.title) },
      ]} />

      <header className="mt-6 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{property.type} · Built {property.yearBuilt}</p>
          <h1 className="mt-1 font-display text-4xl text-balance lg:text-5xl">{t(property.title)}</h1>
          <p className="mt-2 inline-flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-4 w-4" /> {property.location.address}, {property.location.city}, {property.location.country}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="icon" onClick={() => toggle(property.id)} aria-label="Save">
            <Heart className={`h-4 w-4 ${has(property.id) ? "fill-destructive stroke-destructive" : ""}`} />
          </Button>
          <div className="text-right">
            <p className="font-display text-3xl">{formatPrice(property.price)}{property.status === "for-rent" && <span className="text-base text-muted-foreground">/mo</span>}</p>
            <p className="text-xs text-muted-foreground">{property.status === "for-rent" ? "For rent" : "For sale"}</p>
          </div>
        </div>
      </header>

      {/* Gallery */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-8 grid gap-3 lg:grid-cols-[2fr_1fr]">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted">
          <img src={img(property.images[idx])} alt={t(property.title)} className="h-full w-full object-cover" />
          <button onClick={() => setIdx((i) => (i - 1 + property.images.length) % property.images.length)} aria-label="Previous" className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 hover:scale-110 transition"><ChevronLeft className="h-4 w-4" /></button>
          <button onClick={() => setIdx((i) => (i + 1) % property.images.length)} aria-label="Next" className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-background/90 p-2 hover:scale-110 transition"><ChevronRight className="h-4 w-4" /></button>
        </div>
        <div className="hidden grid-cols-2 gap-3 lg:grid">
          {property.images.slice(0, 4).map((src: string, i: number) => (
            <button key={i} onClick={() => setIdx(i)} className={`aspect-[4/3] overflow-hidden rounded-xl bg-muted transition ${idx === i ? "ring-2 ring-brand" : ""}`}>
              <img src={img(src)} alt="" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </motion.section>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 rounded-2xl border border-border bg-card p-5 sm:grid-cols-4">
        {[
          { icon: BedDouble, label: "Bedrooms", value: property.bedrooms },
          { icon: Bath, label: "Bathrooms", value: property.bathrooms },
          { icon: Maximize, label: "Area", value: formatArea(property.area) },
          { icon: Calendar, label: "Year built", value: property.yearBuilt },
        ].map(({ icon: Icon, label, value }) => (
          <div key={label} className="flex items-center gap-3">
            <div className="rounded-full bg-secondary p-2.5"><Icon className="h-4 w-4" /></div>
            <div><p className="text-xs text-muted-foreground">{label}</p><p className="font-medium">{value}</p></div>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-12">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="floor">Floor plan</TabsTrigger>
              <TabsTrigger value="map">Map</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="prose prose-neutral mt-6 max-w-none dark:prose-invert">
              <h2 className="font-display text-2xl">About this home</h2>
              <p className="text-muted-foreground">{t(property.description)}</p>
              <h3 className="mt-6 font-display text-lg">Nearby</h3>
              <ul className="text-sm text-muted-foreground">
                <li>School district within 5 minutes</li>
                <li>Boutique grocery & cafés on the next block</li>
                <li>Major airport approx. 35 minutes</li>
              </ul>
            </TabsContent>
            <TabsContent value="amenities" className="mt-6">
              <ul className="grid gap-3 sm:grid-cols-2">
                {property.amenities.map((a: string) => (
                  <li key={a} className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm">
                    <Check className="h-4 w-4 text-brand" /> {a}
                  </li>
                ))}
              </ul>
            </TabsContent>
            <TabsContent value="floor" className="mt-6">
              <div className="rounded-2xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
                Floor plan available on request — contact the advisor.
              </div>
            </TabsContent>
            <TabsContent value="map" className="mt-6">
              <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-border">
                <iframe
                  title="Map"
                  src={`https://www.google.com/maps?q=${property.location.lat},${property.location.lng}&z=13&output=embed`}
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
            </TabsContent>
          </Tabs>

          <MortgageCalculator price={property.price} />
        </div>

        {/* Sticky sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            {agent && (
              <div className="flex items-center gap-3">
                <img src={agent.avatar} alt={agent.name} className="h-12 w-12 rounded-full object-cover" />
                <div>
                  <p className="font-medium">{agent.name}</p>
                  <p className="text-xs text-muted-foreground">{t(agent.title)}</p>
                </div>
              </div>
            )}
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href={`tel:${agent?.phone}`} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border py-2 text-sm hover:bg-muted"><Phone className="h-3.5 w-3.5" /> Call</a>
              <a href={`mailto:${agent?.email}`} className="inline-flex items-center justify-center gap-1.5 rounded-full border border-border py-2 text-sm hover:bg-muted"><Mail className="h-3.5 w-3.5" /> Email</a>
            </div>
            <InquiryForm propertyTitle={t(property.title)} />
          </div>
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl">Similar properties</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}

const inquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Valid email required").max(255),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

function InquiryForm({ propertyTitle }: { propertyTitle: string }) {
  const [data, setData] = useState({ name: "", email: "", message: `I'm interested in ${propertyTitle}.` });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const r = inquirySchema.safeParse(data);
        if (!r.success) { toast.error(r.error.issues[0].message); return; }
        toast.success("Inquiry sent — an advisor will be in touch shortly.");
      }}
      className="mt-6 space-y-3"
    >
      <Input placeholder="Full name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
      <Input type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
      <Textarea rows={4} value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} />
      <Button type="submit" className="w-full rounded-full">Request a viewing</Button>
    </form>
  );
}

function MortgageCalculator({ price }: { price: number }) {
  const [down, setDown] = useState(20);
  const [years, setYears] = useState(30);
  const [rate, setRate] = useState(6.5);
  const principal = price * (1 - down / 100);
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly = r > 0 ? (principal * r) / (1 - Math.pow(1 + r, -n)) : principal / n;
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h2 className="font-display text-2xl">Mortgage calculator</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <label className="block text-sm">
          <span className="text-muted-foreground">Down payment %</span>
          <Input type="number" min={0} max={100} value={down} onChange={(e) => setDown(Number(e.target.value))} className="mt-1" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Term (years)</span>
          <Input type="number" min={5} max={40} value={years} onChange={(e) => setYears(Number(e.target.value))} className="mt-1" />
        </label>
        <label className="block text-sm">
          <span className="text-muted-foreground">Interest %</span>
          <Input type="number" min={0} max={20} step={0.1} value={rate} onChange={(e) => setRate(Number(e.target.value))} className="mt-1" />
        </label>
      </div>
      <div className="mt-6 flex items-end justify-between rounded-xl bg-secondary p-5">
        <p className="text-sm text-muted-foreground">Estimated monthly</p>
        <p className="font-display text-3xl">{formatPrice(Math.round(monthly))}</p>
      </div>
    </div>
  );
}
