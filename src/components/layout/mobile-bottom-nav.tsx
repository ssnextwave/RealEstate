import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, Heart, User } from "lucide-react";

const ITEMS = [
  { to: "/", label: "Home", icon: Home },
  { to: "/properties", label: "Browse", icon: Search },
  { to: "/favorites", label: "Saved", icon: Heart },
  { to: "/auth/login", label: "Account", icon: User },
] as const;

export function MobileBottomNav() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-background/90 glass md:hidden">
      {ITEMS.map(({ to, label, icon: Icon }) => {
        const active = to === "/" ? path === "/" : path.startsWith(to);
        return (
          <Link key={to} to={to} className={`flex flex-col items-center gap-1 py-2.5 text-[11px] ${active ? "text-foreground" : "text-muted-foreground"}`}>
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
