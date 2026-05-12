import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { testimonialService } from "@/services";
import { t } from "@/lib/i18n";

export function Testimonials() {
  const items = testimonialService.list();
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="max-w-xl">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">Testimonials</p>
        <h2 className="mt-2 font-display text-4xl text-balance lg:text-5xl">Words from our clients.</h2>
      </div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {items.map((it, i) => (
          <motion.figure
            key={it.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <div className="flex gap-0.5 text-brand">
              {Array.from({ length: it.rating }).map((_, k) => (
                <Star key={k} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <blockquote className="mt-4 font-display text-lg leading-snug text-balance">"{t(it.quote)}"</blockquote>
            <figcaption className="mt-6 flex items-center gap-3">
              <img src={it.avatar} alt={it.name} loading="lazy" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium">{it.name}</p>
                <p className="text-xs text-muted-foreground">{t(it.role)}</p>
              </div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
