import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content Security Policy for the whole site.
 *
 * The portfolio is a single static page that loads nothing from a third party
 * (next/font self-hosts the fonts), so every source can be locked to 'self'.
 * `script-src` still needs 'unsafe-inline': Next renders the app shell with
 * inline bootstrap scripts, and allowing them by nonce requires middleware and
 * forces every page to render dynamically. Locking down img/connect/frame/
 * object/base/form instead is what stops an injected script from exfiltrating
 * data or rewriting the page, and costs nothing at build time.
 *
 * 'unsafe-eval' and the websocket origin are development-only: React uses eval
 * for better error stacks and the dev server talks over ws. Neither is needed
 * in production, so the shipped policy is stricter than the local one.
 */
function contentSecurityPolicy(): string {
  return [
    "default-src 'self'",
    `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
    // Tailwind injects a style tag and the theme script sets inline styles.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' blob: data:",
    "font-src 'self'",
    `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
    "media-src 'self'",
    "manifest-src 'self'",
    "object-src 'none'",
    // No <base> element is used; blocking it prevents a base-tag injection.
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    isDev ? "" : "upgrade-insecure-requests",
  ]
    .filter(Boolean)
    .join("; ");
}

/** Baseline hardening applied to every route (works on Vercel out of the box). */
const securityHeaders = [
  // Never let browsers sniff a different content type than we declare.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // The portfolio should never be framed by another site (clickjacking).
  // frame-ancestors in the CSP covers modern browsers; this covers old ones.
  { key: "X-Frame-Options", value: "DENY" },
  // Don't leak full URLs (with query strings) to other origins.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // No site feature needs these APIs.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  // Isolate the browsing context from cross-origin openers.
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  // Don't let other origins embed our assets (hotlinking / data probing).
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
];

const nextConfig: NextConfig = {
  // Don't advertise the framework version (small info-leak reduction).
  poweredByHeader: false,
  async headers() {
    const headers = [
      ...securityHeaders,
      { key: "Content-Security-Policy", value: contentSecurityPolicy() },
    ];

    // Only meaningful over HTTPS. localhost is http, and sending HSTS there
    // teaches the browser to force https for localhost in other projects.
    if (!isDev) {
      headers.push({
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains",
      });
    }

    return [{ source: "/(.*)", headers }];
  },
};

export default nextConfig;
