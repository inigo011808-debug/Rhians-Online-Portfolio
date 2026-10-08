"use client";

import type { ReactNode } from "react";

import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

/**
 * Copies the given email to the clipboard, then falls back to opening a
 * mailto: link if the clipboard API is unavailable (e.g. plain http).
 *
 * Magic UI ShimmerButton can only render a <button>, so the action happens
 * in onClick. Keyboard users get the same behavior via Enter/Space.
 */
export function ContactButton({
  email,
  children,
  className,
  ...props
}: {
  email: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  async function handleContact() {
    // Try the modern clipboard API first.
    let copied = false;
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(email);
        copied = true;
      }
    } catch {
      // Clipboard blocked or unavailable — fall back to mailto.
    }

    // If we couldn't copy, open the default mail client as a last resort.
    if (!copied) {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <ShimmerButton
      type="button"
      background="#c81e2b"
      shimmerColor="#fecaca"
      className={cn(
        "h-11 px-6 text-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className,
      )}
      onClick={handleContact}
      {...props}
    >
      {children}
    </ShimmerButton>
  );
}
