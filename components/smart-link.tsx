import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SmartLinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
}

/** True for links that leave the site (http/https, including protocol-relative). */
export function isExternalHref(href: string) {
  return /^(https?:)?\/\//i.test(href);
}

/** Schemes a link is allowed to use. */
const SAFE_SCHEME = /^(?:https?|mailto|tel):/i;

/**
 * Refuses anything that is not an in-page anchor, an internal route, a
 * protocol-relative URL, or one of the safe schemes above. That keeps a
 * `javascript:` or `data:` href — from a typo'd entry in lib/data.ts, or from
 * data that later becomes editable — from ever reaching the DOM.
 */
function isSafeHref(href: string) {
  if (!href) return false;
  if (href.startsWith("#")) return true;
  if (isExternalHref(href)) return true;
  if (href.startsWith("/")) return true;
  return SAFE_SCHEME.test(href);
}

/**
 * One link component used everywhere so security attributes can never be
 * forgotten:
 *  - https://… / //host → opens in a new tab with rel="noopener noreferrer"
 *  - /projects/x → internal route, rendered with <Link>
 *  - #section / mailto: / tel: → plain anchor in the same tab
 */
export function SmartLink({ href, children, className, ...props }: SmartLinkProps) {
  if (!isSafeHref(href)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[smart-link] Refused unsafe href: ${JSON.stringify(href)}`);
    }
    return null;
  }

  if (href.startsWith("/") && !isExternalHref(href)) {
    return (
      <Link href={href} className={cn(className)} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      {...(isExternalHref(href)
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={cn(className)}
      {...props}
    >
      {children}
    </a>
  );
}
