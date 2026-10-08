import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

/** Everything on the site is public and indexable. */
export default function robots(): MetadataRoute.Robots {
  const base = getSiteUrl();

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
