import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Search } from "lucide-react";
import heroImg from "@/assets/hero-villa.jpg";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroImg} alt="Cliffside villa at sunset" width={1920} height={1280} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-background" />
      </div>

      <div className="container-x flex min-h-[88vh] flex-col justify-end pb-16 pt-32 lg:pb-24 lg:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-white"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs uppercase tracking-widest backdrop-blur">
            New Collection · Winter 2026
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-balance sm:text-6xl lg:text-[88px]">
            Curated homes for considered living.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/85">
            A boutique selection of residences from the world's most desirable destinations — quietly sourced, beautifully presented.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="rounded-full bg-white text-foreground hover:bg-white/90">
              <Link to="/properties">Browse collection <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-white/40 bg-transparent text-white hover:bg-white/10 hover:text-white">
              <Link to="/contact">Speak with an advisor</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-12 rounded-2xl border border-white/15 bg-background/80 p-3 shadow-elevated backdrop-blur-xl lg:p-4"
        >
          <SearchBar />
        </motion.div>
      </div>
    </section>
  );
}

function SearchBar() {
  return (
    <form
      action="/properties"
      className="grid grid-cols-2 gap-2 md:grid-cols-[1.4fr_1fr_1fr_auto]"
    >
      <label className="col-span-2 flex flex-col px-3 py-1.5 md:col-span-1 md:border-r md:border-border">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Location</span>
        <input name="q" placeholder="City, region or country" className="bg-transparent text-sm outline-none placeholder:text-muted-foreground/70" />
      </label>
      <label className="flex flex-col px-3 py-1.5 md:border-r md:border-border">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Type</span>
        <select name="type" className="bg-transparent text-sm outline-none">
          <option value="">Any</option>
          <option>Villa</option>
          <option>Apartment</option>
          <option>House</option>
          <option>Penthouse</option>
        </select>
      </label>
      <label className="flex flex-col px-3 py-1.5">
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Price up to</span>
        <select name="max" className="bg-transparent text-sm outline-none">
          <option value="">No limit</option>
          <option value="1000000">$1M</option>
          <option value="3000000">$3M</option>
          <option value="10000000">$10M</option>
          <option value="20000000">$20M</option>
        </select>
      </label>
      <Button type="submit" className="col-span-2 rounded-xl md:col-span-1" size="lg">
        <Search className="mr-1 h-4 w-4" /> Search
      </Button>
    </form>
  );
}
