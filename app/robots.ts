import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/courses", "/course/", "/blog", "/teachers", "/about", "/contact"],
      disallow: ["/dashboard", "/checkout", "/payment-success", "/payment-failure"]
    },
    sitemap: `${siteConfig.url}/sitemap.xml`
  };
}
