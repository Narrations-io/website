import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteNav from "@/components/SiteNav";
import { BLOG_POSTS, getBlogPost } from "@/components/resources/blogPosts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return { title: `${post.title}, Narrations`, description: post.dek };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-surface">
      <SiteNav theme="light" />

      <article className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex items-center gap-2 text-sm text-ink-500"
        >
          <Link href="/" className="transition hover:text-ink-900">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/resources/blog" className="transition hover:text-ink-900">
            Blog
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-ink-900">{post.title}</span>
        </nav>

        <div className="mx-auto max-w-2xl">
          <p className="text-[13px] text-ink-500">
            {post.dateLabel} · {post.readTime}
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-lg leading-8 text-ink-500">{post.dek}</p>

          <div className="mt-10 space-y-6">
            {post.body.map((block, i) => {
              if (block.type === "p") {
                return (
                  <p key={i} className="text-base leading-7 text-ink-700">
                    {block.text}
                  </p>
                );
              }
              if (block.type === "h2") {
                return (
                  <h2
                    key={i}
                    className="pt-2 text-xl font-semibold text-ink-900"
                  >
                    {block.text}
                  </h2>
                );
              }
              return (
                <ol key={i} className="space-y-5">
                  {block.items.map((item) => (
                    <li key={item.title}>
                      <h3 className="text-[15px] font-semibold text-ink-900">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-base leading-7 text-ink-700">
                        {item.text}
                      </p>
                    </li>
                  ))}
                </ol>
              );
            })}
          </div>

          <div className="mt-14 border-t border-line pt-8">
            <Link
              href="/resources/blog"
              className="inline-flex items-center gap-2 rounded-pill border border-line bg-paper px-5 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-sunken"
            >
              Back to Blog
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
