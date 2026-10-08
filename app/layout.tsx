import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";
import { AnchorScroll } from "@/components/anchor-scroll";
import { SITE } from "@/lib/data";
import { getSiteUrl } from "@/lib/site-url";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Shared with robots.ts and sitemap.ts so the canonical URL can't drift. */
const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${SITE.name} | Developer Portfolio`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    "coderedexter",
    "developer portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "web developer",
  ],
  authors: [{ name: SITE.name, url: siteUrl }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: SITE.name,
    title: `${SITE.name} | Developer Portfolio`,
    description: SITE.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} | Developer Portfolio`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfdfd" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
};

// Applies the saved theme (defaults to dark) before paint to avoid a flash of the wrong theme.
const themeInit = `
(function () {
  try {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className="flex min-h-full flex-col">
        {/*
          Lets keyboard users past the fixed dock instead of tabbing through it.
          Uses plain `focus:` rather than `focus-visible:` so the link is always
          on screen while it holds focus, including restored keyboard focus.
        */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-60 focus:rounded-full focus:border focus:border-border focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-foreground focus:outline-2 focus:outline-offset-2 focus:outline-brand"
        >
          Skip to content
        </a>
        <AnchorScroll />
        {children}
      </body>
    </html>
  );
}
