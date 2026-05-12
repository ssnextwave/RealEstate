import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Linkedin, Mail } from "lucide-react";
import { SITE } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary/40">
      <div className="container-x py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-background font-display">M</span>
              <span className="font-display text-xl">{SITE.name}</span>
            </Link>
            <p className="mt-4 max-w-md text-sm text-muted-foreground">{SITE.description}</p>
            <div className="mt-6 flex items-center gap-3">
              <a href={SITE.social.instagram} aria-label="Instagram" className="rounded-full border border-border p-2 hover:bg-background"><Instagram className="h-4 w-4" /></a>
              <a href={SITE.social.twitter} aria-label="Twitter" className="rounded-full border border-border p-2 hover:bg-background"><Twitter className="h-4 w-4" /></a>
              <a href={SITE.social.linkedin} aria-label="LinkedIn" className="rounded-full border border-border p-2 hover:bg-background"><Linkedin className="h-4 w-4" /></a>
              <a href={`mailto:${SITE.email}`} aria-label="Email" className="rounded-full border border-border p-2 hover:bg-background"><Mail className="h-4 w-4" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/properties" className="hover:text-foreground">All properties</Link></li>
              <li><Link to="/properties" className="hover:text-foreground">For rent</Link></li>
              <li><Link to="/blog" className="hover:text-foreground">Journal</Link></li>
              <li><Link to="/about" className="hover:text-foreground">About us</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li>{SITE.address}</li>
              <li><a href={`mailto:${SITE.email}`} className="hover:text-foreground">{SITE.email}</a></li>
              <li><a href={`tel:${SITE.phone.replace(/\s/g, "")}`} className="hover:text-foreground">{SITE.phone}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
