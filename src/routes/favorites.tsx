import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { propertyService } from "@/services";
import { useFavorites, useRecent } from "@/hooks/use-favorites";
import { PropertyCard } from "@/components/property/property-card";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/favorites")({
  head: () => ({
    meta: [
      { title: `Saved homes — ${SITE.name}` },
      { name: "description", content: "Homes you've saved and recently viewed." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: FavoritesPage,
});

function FavoritesPage() {
  const { ids } = useFavorites();
  const { ids: recent } = useRecent();
  const all = propertyService.list();
  const favs = all.filter((p) => ids.includes(p.id));
  const recents = all.filter((p) => recent.includes(p.id));
  return (
    <div className="container-x pb-24 pt-8 lg:pt-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Saved" }]} />
      <h1 className="mt-6 font-display text-4xl lg:text-5xl">Your saved homes</h1>

      {favs.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border p-16 text-center">
          <p className="font-display text-2xl">Nothing saved yet.</p>
          <p className="mt-2 text-sm text-muted-foreground">Tap the heart on any listing to add it here.</p>
          <Link to="/properties" className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm text-background">Browse properties</Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {favs.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
        </div>
      )}

      {recents.length > 0 && (
        <section className="mt-20">
          <h2 className="font-display text-3xl">Recently viewed</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recents.map((p, i) => <PropertyCard key={p.id} property={p} index={i} />)}
          </div>
        </section>
      )}
    </div>
  );
}
