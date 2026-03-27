import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageContainer } from "@/components/layout/page-container";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { buildMetadata } from "@/lib/seo";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Blog Post Not Found | Tareshwar Tutorials"
    };
  }

  return {
    ...buildMetadata({
      title: post.seoTitle,
      description: post.seoDescription,
      keywords: post.keywords,
      path: `/blog/${post.slug}`,
      image: post.coverImage
    }),
    authors: [{ name: post.author }]
  };
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.seoDescription,
    author: {
      "@type": "Person",
      name: post.author
    },
    datePublished: post.publishDate,
    image: post.coverImage,
    keywords: post.keywords.join(", ")
  };

  return (
    <PageContainer as="article" className="py-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="overflow-hidden rounded-[2.75rem] bg-hero-grid text-white shadow-glow">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="px-8 py-10 lg:px-12 lg:py-14">
            <span className="inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold">
              {post.category}
            </span>
            <h1 className="mt-6 font-heading text-5xl font-bold tracking-tight">{post.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-white/80">{post.seoDescription}</p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/75">
              <span>By {post.author}</span>
              <span>{new Date(post.publishDate).toLocaleDateString("en-IN", { dateStyle: "long" })}</span>
            </div>
          </div>
          <div className="aspect-[16/11] overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1000}
              height={700}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
          {post.content.map((section) => (
            <section key={section.heading} className="mt-10 first:mt-0">
              <h2 className="font-heading text-3xl font-bold text-ink">{section.heading}</h2>
              <div className="mt-5 space-y-5 text-base leading-8 text-slate">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <aside className="space-y-8">
          <div className="rounded-4xl border border-ink/10 bg-white p-8 shadow-glow">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-teal">SEO Focus</p>
            <h2 className="mt-4 font-heading text-2xl font-bold text-ink">Target search topics</h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {post.keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="rounded-full border border-ink/10 bg-cream px-4 py-2 text-sm text-slate"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-4xl bg-ink p-8 text-cream shadow-glow">
            <h2 className="font-heading text-2xl font-bold">Turn reading into results</h2>
            <p className="mt-4 text-base leading-8 text-cream/80">
              Explore guided courses and live classes designed for Class 8 to 12 CBSE and state board preparation.
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href="/courses"
                className="inline-flex justify-center rounded-full bg-coral px-6 py-3 font-semibold text-white transition hover:bg-coral/90"
              >
                Explore Courses
              </Link>
              <Link
                href="/blog"
                className="inline-flex justify-center rounded-full border border-white/15 px-6 py-3 font-semibold text-cream transition hover:bg-white/5"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
