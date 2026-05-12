import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Breadcrumbs } from "@/components/common/breadcrumbs";
import { blogService } from "@/services";
import { t } from "@/lib/i18n";
import { img } from "@/lib/images";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = blogService.bySlug(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    return {
      meta: [
        { title: `${t(post.title)} — ${SITE.name}` },
        { name: "description", content: t(post.excerpt) },
        { property: "og:title", content: t(post.title) },
        { property: "og:description", content: t(post.excerpt) },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { rel: "canonical", href: `${SITE.url}/blog/${post.slug}` },
      ],
    };
  },
  component: BlogPostPage,
  notFoundComponent: () => (
    <div className="container-x py-24 text-center">
      <h1 className="font-display text-3xl">Article not found</h1>
      <Link to="/blog" className="mt-6 inline-flex rounded-full bg-foreground px-5 py-2.5 text-sm text-background">Back to journal</Link>
    </div>
  ),
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = blogService.related(post);
  return (
    <article className="container-x pb-24 pt-8 lg:pt-12">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Journal", to: "/blog" }, { label: t(post.title) }]} />
      <header className="mx-auto mt-8 max-w-3xl text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground">{post.category} · {post.readMinutes} min read</p>
        <h1 className="mt-3 font-display text-4xl text-balance lg:text-6xl">{t(post.title)}</h1>
        <p className="mt-4 text-muted-foreground">By {post.author} · {new Date(post.date).toLocaleDateString()}</p>
      </header>
      <div className="mx-auto mt-10 aspect-[16/9] max-w-5xl overflow-hidden rounded-3xl">
        <img src={img(post.cover)} alt={t(post.title)} className="h-full w-full object-cover" />
      </div>
      <div className="prose prose-neutral mx-auto mt-12 max-w-2xl dark:prose-invert">
        <p className="lead text-lg text-muted-foreground">{t(post.excerpt)}</p>
        <p>{t(post.content)}</p>
      </div>

      {related.length > 0 && (
        <section className="mx-auto mt-20 max-w-5xl">
          <h2 className="font-display text-2xl">Continue reading</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {related.map((b) => (
              <Link key={b.id} to="/blog/$slug" params={{ slug: b.slug }} className="overflow-hidden rounded-2xl border border-border bg-card hover-lift">
                <div className="aspect-[5/3]"><img src={img(b.cover)} alt={t(b.title)} loading="lazy" className="h-full w-full object-cover" /></div>
                <div className="p-5">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">{b.category}</p>
                  <h3 className="mt-2 font-display text-lg">{t(b.title)}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
