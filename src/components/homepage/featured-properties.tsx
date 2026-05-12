import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { propertyService } from "@/services";
import { PropertyCard } from "@/components/property/property-card";

export function FeaturedProperties() {
  const items = propertyService.featured();
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="flex items-end justify-between gap-6">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Featured</p>
          <h2 className="mt-2 font-display text-4xl text-balance lg:text-5xl">This week's selection</h2>
        </div>
        <Link to="/properties" className="hidden shrink-0 items-center gap-1 text-sm hover:text-brand sm:inline-flex">
          View all <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
      </div>
    </section>
  );
}
