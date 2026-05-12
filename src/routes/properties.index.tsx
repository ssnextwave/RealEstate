import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { LayoutGrid, List as ListIcon, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { propertyService } from "@/services";
import { PropertyCard, PropertyCardSkeleton } from "@/components/property/property-card";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { t, formatPrice, formatArea } from "@/lib/i18n";
import { img } from "@/lib/images";
import { SITE } from "@/lib/site";
import type { Property, PropertyType, ListingStatus } from "@/types";

export const Route = createFileRoute("/properties/")({
  head: () => ({
    meta: [
      { title: `Properties for sale & rent — ${SITE.name}` },
      { name: "description", content: "Browse curated luxury homes, villas, and apartments. Filter by location, price, type, and amenities." },
      { property: "og:title", content: `Properties — ${SITE.name}` },
      { property: "og:description", content: "Browse curated luxury homes, villas, and apartments." },
      { rel: "canonical", href: `${SITE.url}/properties` },
    ],
  }),
  component: PropertiesPage,
});

const PAGE_SIZE = 6;
const TYPES: (PropertyType | "any")[] = ["any", "villa", "apartment", "house", "penthouse", "townhouse", "chalet"];
const STATUSES: (ListingStatus | "any")[] = ["any", "for-sale", "for-rent"];

function PropertiesPage() {
  const all = propertyService.list();
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("any");
  const [status, setStatus] = useState<string>("any");
  const [beds, setBeds] = useState<string>("any");
  const [price, setPrice] = useState<[number, number]>([0, 15000000]);
  const [sort, setSort] = useState("newest");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let res = all.filter((p) => {
      if (q && !`${t(p.title)} ${p.location.city} ${p.location.country}`.toLowerCase().includes(q.toLowerCase())) return false;
      if (type !== "any" && p.type !== type) return false;
      if (status !== "any" && p.status !== status) return false;
      if (beds !== "any" && p.bedrooms < Number(beds)) return false;
      if (p.price < price[0] || p.price > price[1]) return false;
      return true;
    });
    if (sort === "price-asc") res = [...res].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") res = [...res].sort((a, b) => b.price - a.price);
    if (sort === "newest") res = [...res].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
    return res;
  }, [all, q, type, status, beds, price, sort]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const items = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const filtersUI = (
    <div className="space-y-6">
      <div>
        <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Search</p>
        <Input placeholder="City, region..." value={q} onChange={(e) => { setQ(e.target.value); setPage(1); }} />
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Status</p>
        <Select value={status} onValueChange={(v) => { setStatus(v); setPage(1); }}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{STATUSES.map((s) => <SelectItem key={s} value={s}>{s === "any" ? "Any" : s.replace("-", " ")}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Type</p>
        <Select value={type} onValueChange={(v) => { setType(v); setPage(1); }}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>{TYPES.map((s) => <SelectItem key={s} value={s}>{s === "any" ? "Any" : s}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div>
        <p className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">Bedrooms (min)</p>
        <Select value={beds} onValueChange={(v) => { setBeds(v); setPage(1); }}>
          <SelectTrigger><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="any">Any</SelectItem>
            {[1,2,3,4,5,6].map((n) => <SelectItem key={n} value={String(n)}>{n}+</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
      <div>
        <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
          <span>Price</span><span className="font-mono normal-case tracking-normal">{formatPrice(price[0])} – {formatPrice(price[1])}</span>
        </div>
        <Slider value={price} onValueChange={(v) => { setPrice(v as [number, number]); setPage(1); }} min={0} max={15000000} step={100000} />
      </div>
    </div>
  );

  return (
    <div className="container-x pb-24 pt-8 lg:pt-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Properties" }]} />
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-balance lg:text-5xl">Our collection</h1>
          <p className="mt-1 text-sm text-muted-foreground">{filtered.length} {filtered.length === 1 ? "result" : "results"}</p>
        </div>
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden gap-2"><SlidersHorizontal className="h-4 w-4" /> Filters</Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 overflow-y-auto p-6">
              <h3 className="font-display text-xl">Filters</h3>
              <div className="mt-6">{filtersUI}</div>
            </SheetContent>
          </Sheet>
          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-asc">Price: low to high</SelectItem>
              <SelectItem value="price-desc">Price: high to low</SelectItem>
            </SelectContent>
          </Select>
          <div className="hidden rounded-full border border-border p-1 sm:flex">
            <button onClick={() => setView("grid")} aria-label="Grid view" className={`rounded-full p-1.5 ${view === "grid" ? "bg-foreground text-background" : ""}`}><LayoutGrid className="h-4 w-4" /></button>
            <button onClick={() => setView("list")} aria-label="List view" className={`rounded-full p-1.5 ${view === "list" ? "bg-foreground text-background" : ""}`}><ListIcon className="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[280px_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-lg">Filters</h2>
            <div className="mt-5">{filtersUI}</div>
          </div>
        </aside>

        <div>
          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2">{Array.from({ length: 4 }).map((_, i) => <PropertyCardSkeleton key={i} />)}</div>
          ) : items.length === 0 ? (
            <EmptyState />
          ) : view === "grid" ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {items.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
            </div>
          ) : (
            <div className="space-y-4">{items.map((p) => <ListRow key={p.id} property={p} />)}</div>
          )}

          {pages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-1">
              {Array.from({ length: pages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setPage(i + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                  className={`h-9 min-w-9 rounded-full px-3 text-sm transition ${page === i + 1 ? "bg-foreground text-background" : "border border-border hover:bg-muted"}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ListRow({ property }: { property: Property }) {
  return (
    <Link to="/properties/$slug" params={{ slug: property.slug }} className="grid gap-4 overflow-hidden rounded-2xl border border-border bg-card p-3 hover-lift sm:grid-cols-[260px_1fr]">
      <div className="aspect-[4/3] overflow-hidden rounded-xl bg-muted sm:aspect-auto">
        <img src={img(property.images[0])} alt={t(property.title)} loading="lazy" className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-col justify-between p-2">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">{property.type} · {property.location.city}</p>
          <h3 className="mt-1 font-display text-2xl text-balance">{t(property.title)}</h3>
          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{t(property.description)}</p>
        </div>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex gap-4 text-muted-foreground">
            <span>{property.bedrooms} bd</span><span>{property.bathrooms} ba</span><span>{formatArea(property.area)}</span>
          </div>
          <p className="text-lg font-medium">{formatPrice(property.price)}{property.status === "for-rent" && <span className="text-xs text-muted-foreground">/mo</span>}</p>
        </div>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed border-border p-16 text-center">
      <p className="font-display text-2xl">No homes match those filters.</p>
      <p className="mt-2 text-sm text-muted-foreground">Try widening the price range or clearing a filter.</p>
    </div>
  );
}
