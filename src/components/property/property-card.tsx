import { Link } from "@tanstack/react-router";
import { Heart, BedDouble, Bath, Maximize, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import type { Property } from "@/types";
import { t, formatPrice, formatArea } from "@/lib/i18n";
import { img } from "@/lib/images";
import { useFavorites } from "@/hooks/use-favorites";

export function PropertyCard({ property, index = 0 }: { property: Property; index?: number }) {
  const { has, toggle } = useFavorites();
  const fav = has(property.id);
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="group hover-lift overflow-hidden rounded-2xl border border-border bg-card"
    >
      <Link to="/properties/$slug" params={{ slug: property.slug }} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={img(property.images[0])}
            alt={t(property.title)}
            loading="lazy"
            width={800}
            height={600}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex gap-2">
            <span className="rounded-full bg-background/90 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide">
              {property.status === "for-rent" ? "For rent" : property.status === "sold" ? "Sold" : "For sale"}
            </span>
            {property.featured && (
              <span className="rounded-full bg-brand text-brand-foreground px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide">
                Featured
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); toggle(property.id); }}
            aria-label={fav ? "Remove from favorites" : "Save to favorites"}
            className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-background/90 transition hover:scale-110"
          >
            <Heart className={`h-4 w-4 ${fav ? "fill-destructive stroke-destructive" : ""}`} />
          </button>
        </div>
        <div className="p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl leading-tight text-balance">{t(property.title)}</h3>
            <p className="shrink-0 font-medium">
              {formatPrice(property.price)}
              {property.status === "for-rent" && <span className="text-xs text-muted-foreground">/mo</span>}
            </p>
          </div>
          <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" /> {property.location.city}, {property.location.country}
          </p>
          <div className="mt-4 flex items-center gap-4 border-t border-border pt-4 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><BedDouble className="h-4 w-4" /> {property.bedrooms}</span>
            <span className="inline-flex items-center gap-1.5"><Bath className="h-4 w-4" /> {property.bathrooms}</span>
            <span className="inline-flex items-center gap-1.5"><Maximize className="h-4 w-4" /> {formatArea(property.area)}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

export function PropertyCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      <div className="aspect-[4/3] skeleton" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 skeleton rounded" />
        <div className="h-4 w-1/2 skeleton rounded" />
        <div className="h-4 w-2/3 skeleton rounded" />
      </div>
    </div>
  );
}
