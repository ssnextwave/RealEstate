import { createFileRoute } from "@tanstack/react-router";
import { propertyService, blogService } from "@/services";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = [
          "", "/properties", "/about", "/blog", "/contact",
          ...propertyService.list().map((p) => `/properties/${p.slug}`),
          ...blogService.list().map((b) => `/blog/${b.slug}`),
        ];
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `<url><loc>${SITE.url}${u}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(body, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
