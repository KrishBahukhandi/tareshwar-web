import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { getBlogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Exam Preparation Blog for JEE, NEET and Board Exams",
  description:
    "Read exam preparation articles on JEE, NEET, and board exams designed to attract organic traffic and help students study more effectively.",
  keywords: [
    "exam preparation blog",
    "jee preparation articles",
    "neet preparation blog",
    "board exam tips",
    "organic study content"
  ],
  path: "/blog"
});

export default function BlogListPage() {
  const posts = getBlogPosts();

  return (
    <PageContainer as="section" className="py-20">
      <div className="max-w-4xl">
        <span className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
          Exam Prep Blog
        </span>
        <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight text-ink">
          SEO-focused exam preparation content that helps students study smarter and discover the right coaching support.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate">
          Explore articles built around the questions students actually search for, from JEE study plans and NEET biology revision to board exam time management.
        </p>
      </div>

      <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <article
            key={post.slug}
            className="overflow-hidden rounded-4xl border border-ink/10 bg-white shadow-glow"
          >
            <div className="aspect-[16/10] overflow-hidden bg-sand">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={800}
                height={500}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">{post.category}</p>
              <h2 className="mt-4 font-heading text-2xl font-semibold text-ink">{post.title}</h2>
              <p className="mt-4 text-base leading-7 text-slate">{post.excerpt}</p>
              <div className="mt-6 flex items-center justify-between gap-4 text-sm text-slate">
                <div>
                  <p>{post.author}</p>
                  <p>{new Date(post.publishDate).toLocaleDateString("en-IN", { dateStyle: "medium" })}</p>
                </div>
                <Link href={`/blog/${post.slug}`} className="font-semibold text-coral">
                  Read article
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </PageContainer>
  );
}
