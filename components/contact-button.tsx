"use client";

import type { ReactNode } from "react";

import { ShimmerButton } from "@/components/ui/shimmer-button";
import { cn } from "@/lib/utils";

interface ContactButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  "aria-label"?: string;
}

/**
 * Magic UI ShimmerButton can only render a <button>, so navigation happens in
 * onClick. Keyboard users get the same behavior via Enter/Space.
 */
export function ContactButton({
  href,
  children,
  className,
  ...props
}: ContactButtonProps) {
  return (
    <ShimmerButton
      type="button"
      background="#c81e2b"
      shimmerColor="#fecaca"
      className={cn(
        "h-11 px-6 text-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
        className,
      )}
      onClick={() => {
        window.location.href = href;
      }}
      {...props}
    >
      {children}
    </ShimmerButton>
  );
}
