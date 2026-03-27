import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { PageContainer } from "@/components/layout/page-container";
import { getBlogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Study Tips & Exam Guides for Class 8 to 12 Students",
  description:
    "Read practical study guides and exam tips for Class 8, 9, 10, 11, and 12 students — covering board preparation, subject strategies, and parenting advice.",
  keywords: [
    "class 10 board exam tips",
    "class 12 study tips",
    "cbse exam preparation blog",
    "school coaching articles",
    "board exam preparation guide"
  ],
  path: "/blog"
});

export default function BlogListPage() {
  const posts = getBlogPosts();

  return (
    <PageContainer as="section" className="py-20">
      <div className="max-w-4xl">
        <span className="inline-flex rounded-full bg-coral/10 px-4 py-2 text-sm font-semibold text-coral">
          Study & Exam Blog
        </span>
        <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight text-ink">
          Guides for Class 8 to 12 students — from building strong basics to acing your board exams.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate">
          Practical articles on study habits, subject strategies, revision planning, and how parents can help — written by Tareshwar Tutorials faculty.
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
