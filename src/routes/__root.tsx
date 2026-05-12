import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  createRootRouteWithContext,
  HeadContent,
  Scripts,
  useRouterState,
  Link,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { ThemeProvider } from "@/components/common/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { ScrollProgress } from "@/components/common/scroll-progress";
import { BackToTop } from "@/components/common/back-to-top";
import { WhatsAppFab } from "@/components/common/whatsapp-fab";
import { Toaster } from "@/components/ui/sonner";
import { SITE } from "@/lib/site";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-display text-7xl">404</p>
        <h1 className="mt-3 font-display text-2xl">This page has moved on.</h1>
        <p className="mt-2 text-sm text-muted-foreground">The address you visited isn't part of our current collection.</p>
        <Link to="/" className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm text-background">Return home</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 text-center">
      <div>
        <h1 className="font-display text-2xl">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-foreground px-5 py-2.5 text-sm text-background">Try again</button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${SITE.name} — ${SITE.tagline}` },
      { name: "description", content: SITE.description },
      { name: "author", content: SITE.name },
      { name: "theme-color", content: "#f5efe6" },
      { property: "og:site_name", content: SITE.name },
      { property: "og:type", content: "website" },
      { property: "og:title", content: `${SITE.name} — ${SITE.tagline}` },
      { property: "og:description", content: SITE.description },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${SITE.name} — ${SITE.tagline}` },
      { name: "twitter:description", content: SITE.description },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "RealEstateAgent",
          name: SITE.name,
          description: SITE.description,
          url: SITE.url,
          email: SITE.email,
          telephone: SITE.phone,
          address: { "@type": "PostalAddress", streetAddress: SITE.address },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function PageTransition() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div key={path} className="animate-[fade-in_0.4s_ease-out]">
      <Outlet />
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ScrollProgress />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1 pb-20 md:pb-0">
            <PageTransition />
          </main>
          <Footer />
        </div>
        <MobileBottomNav />
        <BackToTop />
        <WhatsAppFab />
        <Toaster position="top-right" />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
