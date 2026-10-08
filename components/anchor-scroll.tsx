"use client";

import { useEffect } from "react";

/**
 * Makes every in-page anchor (#section) scroll deterministically with the
 * browser scroll API instead of relying on fragment navigation, which behaves
 * differently across browsers/webviews. Placeholder links (href="#") are left
 * untouched.
 */
export function AnchorScroll() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = (event.target as Element | null)?.closest?.(
        'a[href^="#"]',
      );
      const href = anchor?.getAttribute("href");
      if (!anchor || !href || href === "#") return;

      const target = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!target) return;

      event.preventDefault();
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      // scrollIntoView honors each section's scroll-margin-top.
      // "instant" (not "auto") so the CSS smooth-scroll setting is bypassed
      // for users who asked for reduced motion.
      target.scrollIntoView({
        behavior: reduceMotion ? "instant" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", href);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return null;
}
