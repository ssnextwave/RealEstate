import { createFileRoute, Link } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { blogService } from "@/services";
import { t } from "@/lib/i18n";
import { img } from "@/lib/images";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: `Journal — ${SITE.name}` },
      { name: "description", content: "Essays and dispatches on markets, design, and the homes we love." },
      { property: "og:title", content: `Journal — ${SITE.name}` },
      { property: "og:description", content: "Essays and dispatches on markets, design, and the homes we love." },
      { rel: "canonical", href: `${SITE.url}/blog` },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const items = blogService.list();
  return (
    <div className="container-x pb-24 pt-8 lg:pt-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Journal" }]} />
      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl text-balance lg:text-6xl">The Journal.</h1>
        <p className="mt-4 text-muted-foreground">Slow-paced writing on the homes, places and markets we follow.</p>
      </header>
      <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {items.map((b) => (
          <Link key={b.id} to="/blog/$slug" params={{ slug: b.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card hover-lift">
            <div className="aspect-[5/3] overflow-hidden">
              <img src={img(b.cover)} alt={t(b.title)} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">{b.category} · {b.readMinutes} min read</p>
              <h2 className="mt-2 font-display text-xl text-balance">{t(b.title)}</h2>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{t(b.excerpt)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
