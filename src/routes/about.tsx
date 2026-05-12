import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { agentService } from "@/services";
import { t } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import interior from "@/assets/interior-1.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${SITE.name}` },
      { name: "description", content: "A boutique team helping discerning clients find homes worth keeping for a generation." },
      { property: "og:title", content: `About — ${SITE.name}` },
      { property: "og:description", content: "A boutique team helping discerning clients find homes worth keeping for a generation." },
      { rel: "canonical", href: `${SITE.url}/about` },
    ],
  }),
  component: AboutPage,
});

const TIMELINE = [
  { year: "2014", text: "Founded as a single-advisor practice in San Francisco." },
  { year: "2017", text: "Opened New York studio; began curating East-coast residences." },
  { year: "2021", text: "Launched cross-border practice across Europe and Latin America." },
  { year: "2025", text: "Twelfth year in business, with $4.2B in lifetime transactions." },
];

function AboutPage() {
  const team = agentService.list();
  return (
    <div className="container-x pb-24 pt-8 lg:pt-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "About" }]} />

      <section className="mt-6 grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">About Maison</p>
          <h1 className="mt-2 font-display text-4xl text-balance lg:text-6xl">A boutique practice for considered buyers.</h1>
          <p className="mt-6 text-muted-foreground">We're a small, independent team of advisors who care more about the right home than the next deal. We work for clients, not for a brand. We take fewer listings, present them better, and stay in touch long after the keys change hands.</p>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="overflow-hidden rounded-3xl">
          <img src={interior} alt="Our office" className="h-full w-full object-cover" />
        </motion.div>
      </section>

      <section className="mt-20 grid gap-10 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-8">
          <h3 className="font-display text-2xl">Our mission</h3>
          <p className="mt-3 text-muted-foreground">To make the search for a remarkable home feel calm, considered, and quietly thrilling.</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-8">
          <h3 className="font-display text-2xl">Our principles</h3>
          <p className="mt-3 text-muted-foreground">Discretion. Patience. Editorial taste. And the discipline to walk away from a listing that doesn't deserve our clients.</p>
        </div>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-3xl">Our story</h2>
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TIMELINE.map((t) => (
            <li key={t.year} className="rounded-2xl border border-border bg-card p-5">
              <p className="font-display text-3xl text-brand">{t.year}</p>
              <p className="mt-2 text-sm text-muted-foreground">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20">
        <h2 className="font-display text-3xl">The team</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((a) => (
            <article key={a.id} className="overflow-hidden rounded-2xl border border-border bg-card hover-lift">
              <img src={a.avatar} alt={a.name} className="h-64 w-full object-cover" />
              <div className="p-5">
                <p className="font-display text-xl">{a.name}</p>
                <p className="text-xs uppercase tracking-widest text-muted-foreground">{t(a.title)}</p>
                <p className="mt-3 text-sm text-muted-foreground">{t(a.bio)}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-20 rounded-3xl bg-foreground px-6 py-14 text-background sm:px-12">
        <div className="grid gap-6 sm:grid-cols-3">
          {[{ k: "$4.2B", v: "Lifetime sales" }, { k: "1,200+", v: "Homes placed" }, { k: "98%", v: "Repeat & referral" }].map((s) => (
            <div key={s.v}><p className="font-display text-4xl">{s.k}</p><p className="text-sm opacity-80">{s.v}</p></div>
          ))}
        </div>
      </section>

      <p className="mt-12 text-center text-sm text-muted-foreground">
        Ready to begin? <Link to="/contact" className="underline underline-offset-4">Talk to an advisor →</Link>
      </p>
    </div>
  );
}
