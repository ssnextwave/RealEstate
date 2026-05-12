import { ShieldCheck, Sparkles, Users, Globe2 } from "lucide-react";

const ITEMS = [
  { icon: Sparkles, title: "Hand-selected", body: "Every listing meets our editorial standard before it reaches our collection." },
  { icon: ShieldCheck, title: "Discreet by default", body: "A third of our inventory is private. We never publish what shouldn't be public." },
  { icon: Globe2, title: "Cross-border", body: "Local advisors in 14 countries handling legal, tax and currency end to end." },
  { icon: Users, title: "Independent", body: "We work for you, not for a chain. The fee structure is transparent at offer." },
];

export function WhyUs() {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
        <div>
          <p className="text-xs uppercase tracking-widest text-muted-foreground">Why Maison</p>
          <h2 className="mt-2 font-display text-4xl text-balance lg:text-5xl">A quieter way to find a remarkable home.</h2>
          <p className="mt-4 text-muted-foreground">Boutique by design. Patient by principle. We're built for the small share of buyers who care about the difference.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          {ITEMS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-border bg-card p-6 hover-lift">
              <Icon className="h-6 w-6 text-brand" />
              <h3 className="mt-4 font-display text-xl">{title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
