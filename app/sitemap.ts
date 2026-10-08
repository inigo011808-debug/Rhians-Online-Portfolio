import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

/**
 * One page, one entry. `lastModified` is deliberately omitted: it would change
 * on every deploy and tell crawlers to re-index a page whose text did not.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${getSiteUrl()}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
