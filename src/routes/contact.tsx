import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Mail, Phone, MapPin } from "lucide-react";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqService } from "@/services";
import { t } from "@/lib/i18n";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${SITE.name}` },
      { name: "description", content: "Speak with a Maison advisor. We respond within one business day." },
      { property: "og:title", content: `Contact — ${SITE.name}` },
      { property: "og:description", content: "Speak with a Maison advisor. We respond within one business day." },
      { rel: "canonical", href: `${SITE.url}/contact` },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(80),
  email: z.string().trim().email("Valid email required").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a little more").max(1000),
});

function ContactPage() {
  const faqs = faqService.list();
  const [data, setData] = useState({ name: "", email: "", phone: "", message: "" });

  return (
    <div className="container-x pb-24 pt-8 lg:pt-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <header className="mt-6 max-w-2xl">
        <h1 className="font-display text-4xl text-balance lg:text-6xl">Get in touch.</h1>
        <p className="mt-4 text-muted-foreground">Tell us what you're looking for. An advisor responds within one business day.</p>
      </header>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const r = schema.safeParse(data);
            if (!r.success) { toast.error(r.error.issues[0].message); return; }
            toast.success("Thank you — we'll be in touch shortly.");
            setData({ name: "", email: "", phone: "", message: "" });
          }}
          className="space-y-4 rounded-2xl border border-border bg-card p-6 lg:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <Input placeholder="Full name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />
            <Input type="email" placeholder="Email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} />
          </div>
          <Input placeholder="Phone (optional)" value={data.phone} onChange={(e) => setData({ ...data, phone: e.target.value })} />
          <Textarea rows={6} placeholder="What are you looking for?" value={data.message} onChange={(e) => setData({ ...data, message: e.target.value })} />
          <Button type="submit" size="lg" className="w-full rounded-full">Send message</Button>
        </form>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="font-display text-xl">Studio</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-3"><MapPin className="mt-0.5 h-4 w-4" /> {SITE.address}</li>
              <li className="flex items-start gap-3"><Mail className="mt-0.5 h-4 w-4" /> <a href={`mailto:${SITE.email}`} className="hover:text-foreground">{SITE.email}</a></li>
              <li className="flex items-start gap-3"><Phone className="mt-0.5 h-4 w-4" /> <a href={`tel:${SITE.phone}`} className="hover:text-foreground">{SITE.phone}</a></li>
            </ul>
          </div>
          <div className="aspect-square overflow-hidden rounded-2xl border border-border">
            <iframe title="Map" src="https://www.google.com/maps?q=37.7997,-122.4012&z=13&output=embed" className="h-full w-full" loading="lazy" />
          </div>
        </aside>
      </div>

      <section className="mt-20 max-w-3xl">
        <h2 className="font-display text-3xl">Frequently asked</h2>
        <Accordion type="single" collapsible className="mt-6">
          {faqs.map((f) => (
            <AccordionItem key={f.id} value={f.id}>
              <AccordionTrigger className="text-left">{t(f.q)}</AccordionTrigger>
              <AccordionContent>{t(f.a)}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}
