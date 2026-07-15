import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SiteNav from "@/components/SiteNav";
import { BLOG_POSTS } from "@/components/resources/blogPosts";

export const metadata: Metadata = {
  title: "Blog, Narrations",
  description: "Practical writing on AI systems and narrative work: starting with how to use an LLM to improve your writing.",
};

export default function BlogIndexPage() {
  return (
    <main className="min-h-screen bg-surface">
      <SiteNav theme="light" />

      <div className="mx-auto max-w-[1200px] px-6 py-12 md:py-16">
        <nav
          aria-label="Breadcrumb"
          className="mb-10 flex items-center gap-2 text-sm text-ink-500"
        >
          <Link href="/" className="transition hover:text-ink-900">
            Home
          </Link>
          <span aria-hidden>/</span>
          <Link href="/resources" className="transition hover:text-ink-900">
            Resources
          </Link>
          <span aria-hidden>/</span>
          <span className="font-medium text-ink-900">Blog</span>
        </nav>

        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-green-500">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" aria-hidden />
            Blog
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-ink-900 md:text-[2.75rem]">
            Practical writing on AI and narrative work.
          </h1>
        </div>

        <ul className="mx-auto mt-14 max-w-2xl divide-y divide-line border-y border-line">
          {BLOG_POSTS.map((post) => (
            <li key={post.slug} className="py-7">
              <Link href={`/resources/blog/${post.slug}`} className="group block">
                <p className="text-[13px] text-ink-500">
                  {post.dateLabel} · {post.readTime}
                </p>
                <h2 className="mt-2 text-xl font-semibold text-ink-900 transition-colors group-hover:text-green-600">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-ink-700">{post.dek}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-green-500">
                  Read
                  <ArrowRight
                    size={15}
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
