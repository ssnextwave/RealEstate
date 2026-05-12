import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { locationService } from "@/services";
import { img } from "@/lib/images";

export function Categories() {
  const items = locationService.list();
  return (
    <section className="bg-secondary/40 py-20 lg:py-28">
      <div className="container-x">
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-widest text-muted-foreground">By location</p>
          <h2 className="mt-2 font-display text-4xl text-balance lg:text-5xl">Explore by destination</h2>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {items.map((loc, i) => (
            <motion.div
              key={loc.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
            >
              <Link to="/properties" className="group block overflow-hidden rounded-2xl border border-border bg-card hover-lift">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <img src={img(loc.image)} alt={`${loc.city}, ${loc.country}`} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-white">
                    <p className="font-display text-base">{loc.city}</p>
                    <p className="text-[11px] opacity-80">{loc.count} listings</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
