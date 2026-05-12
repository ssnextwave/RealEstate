import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useState } from "react";
import { Link } from "@tanstack/react-router";

const PARTNERS = ["SOTHEBY'S", "FORBES", "ARCHITECTURAL DIGEST", "BLOOMBERG", "MONOCLE", "WALLPAPER*"];

export function Partners() {
  return (
    <section className="border-y border-border py-10">
      <div className="container-x grid grid-cols-3 items-center gap-6 sm:grid-cols-6">
        {PARTNERS.map((p) => (
          <p key={p} className="text-center text-xs tracking-[0.2em] text-muted-foreground/80">{p}</p>
        ))}
      </div>
    </section>
  );
}

export function CtaBanner() {
  return (
    <section className="container-x py-20 lg:py-24">
      <div className="relative overflow-hidden rounded-3xl bg-foreground px-6 py-16 text-background sm:px-12 lg:px-16">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-brand/40 blur-3xl" />
        <div className="relative max-w-2xl">
          <h2 className="font-display text-4xl text-balance lg:text-5xl">Looking for something off-market?</h2>
          <p className="mt-4 text-background/80">Tell us what you're seeking. We'll send a private shortlist within 48 hours — discreet, no obligation.</p>
          <Button asChild size="lg" className="mt-8 rounded-full bg-background text-foreground hover:bg-background/90">
            <Link to="/contact">Request a private shortlist</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

const emailSchema = z.string().trim().email("Enter a valid email").max(255);

export function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="container-x pb-24">
      <div className="rounded-3xl border border-border bg-card p-8 sm:p-12">
        <div className="grid items-center gap-6 sm:grid-cols-[1.4fr_1fr]">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl">Subscribe to The Brief.</h3>
            <p className="mt-2 text-sm text-muted-foreground">A monthly note on markets, design and the homes we love. No more than once a month.</p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const r = emailSchema.safeParse(email);
              if (!r.success) { toast.error(r.error.issues[0].message); return; }
              toast.success("You're subscribed. Welcome.");
              setEmail("");
            }}
            className="flex gap-2"
          >
            <Input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" className="rounded-full" />
            <Button type="submit" className="rounded-full">Subscribe</Button>
          </form>
        </div>
      </div>
    </section>
  );
}
