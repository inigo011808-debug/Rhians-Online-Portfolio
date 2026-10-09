"use client";

import type { ReactNode } from "react";

import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

/**
 * Opens Gmail's compose window in a new tab with this address already in the
 * To field — a visible, unmistakable result instead of a silent clipboard write.
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
  function handleContact() {
    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
    // Popup blockers allow window.open inside a real click handler; fall back
    // to navigating this tab only if the new tab was still refused.
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    if (!opened) {
      window.location.href = url;
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
