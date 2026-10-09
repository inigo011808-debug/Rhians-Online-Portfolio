"use client";

import Image from "next/image";
import { useState } from "react";

import { SITE } from "@/lib/data";

/**
 * Profile photo in the top-right of the hero.
 *
 * Drop a square picture at `public/images/me.jpg` and it appears on every
 * deploy without touching code. Until then (or if the file is missing) a
 * circle with initials is shown, so the slot never looks broken.
 */
const PHOTO_SRC = "/images/me.jpg";
/** Shown until /images/me.jpg exists — change to taste. */
const INITIALS = "RR";

export function HeroPhoto() {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative size-[72px] shrink-0 overflow-hidden rounded-full border-2 border-brand/60 bg-card/80 shadow-[0_0_24px_-6px_var(--brand-glow)] sm:size-28">
      {/* Placeholder behind the photo */}
      <span className="absolute inset-0 flex items-center justify-center font-mono text-lg font-bold tracking-widest text-brand/80 sm:text-2xl">
        {INITIALS}
      </span>
      {!failed && (
        <Image
          src={PHOTO_SRC}
          alt={`${SITE.name} portrait`}
          fill
          sizes="(min-width: 640px) 112px, 72px"
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
