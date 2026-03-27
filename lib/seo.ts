import type { Metadata } from "next";

export const siteConfig = {
  name: "Tareshwar Tutorials",
  url: "https://tareshwartutorials.com",
  description:
    "Tareshwar Tutorials is an online coaching platform for exam preparation, offering courses, live classes, and study resources for JEE, NEET, and board exams."
};

type BuildMetadataInput = {
  title: string;
  description: string;
  keywords?: string[];
  path?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  keywords = [],
  path = "/",
  image = "/og-default.png"
}: BuildMetadataInput): Metadata {
  const absoluteUrl = new URL(path, siteConfig.url).toString();
  const imageUrl = image.startsWith("http") ? image : new URL(image, siteConfig.url).toString();

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: absoluteUrl
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    }
  };
}
