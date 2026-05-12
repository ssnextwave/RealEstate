import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { blogService } from "@/services";
import { t } from "@/lib/i18n";
import { img } from "@/lib/images";

export function LatestBlogs() {
  const items = blogService.list();
  return (
    <section className="bg-secondary/40 py-20 lg:py-28">
      <div className="container-x">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Journal</p>
            <h2 className="mt-2 font-display text-4xl text-balance lg:text-5xl">Latest writing.</h2>
          </div>
          <Link to="/blog" className="hidden shrink-0 items-center gap-1 text-sm hover:text-brand sm:inline-flex">
            All articles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((b) => (
            <Link key={b.id} to="/blog/$slug" params={{ slug: b.slug }} className="group overflow-hidden rounded-2xl border border-border bg-card hover-lift">
              <div className="aspect-[5/3] overflow-hidden">
                <img src={img(b.cover)} alt={t(b.title)} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{b.category} · {b.readMinutes} min</p>
                <h3 className="mt-2 font-display text-xl text-balance">{t(b.title)}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{t(b.excerpt)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
