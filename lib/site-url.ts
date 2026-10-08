import { SITE } from "@/lib/data";

/**
 * One source of truth for the site's canonical origin, shared by the metadata
 * in app/layout.tsx, app/robots.ts and app/sitemap.ts so a canonical URL can
 * never drift between them.
 *
 * Resolution order:
 *   1. NEXT_PUBLIC_SITE_URL  (set this on Vercel for a custom domain)
 *   2. VERCEL_PROJECT_PRODUCTION_URL  (the URL Vercel assigns automatically)
 *   3. SITE.url from lib/data.ts  (local development)
 */
export function getSiteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const candidate = configured || (vercelUrl ? `https://${vercelUrl}` : "") || SITE.url;

  // A malformed value would otherwise throw inside `new URL(...)` while building
  // metadata and break the whole build. Warn and fall back instead.
  if (!isHttpUrl(candidate)) {
    console.warn(
      `[site-url] Ignoring invalid site URL "${candidate}" — using ${SITE.url}. ` +
        "NEXT_PUBLIC_SITE_URL must be an absolute http(s) URL.",
    );
    return stripTrailingSlash(SITE.url);
  }

  return stripTrailingSlash(candidate);
}

function isHttpUrl(value: string): boolean {
  try {
    const { protocol } = new URL(value);
    return protocol === "http:" || protocol === "https:";
  } catch {
    return false;
  }
}

/** Keeps `${getSiteUrl()}/sitemap.xml` from producing a double slash. */
function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, "");
}
