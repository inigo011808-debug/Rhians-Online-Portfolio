import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Two-digit section number, e.g. "01" */
  index: string;
  kicker: string;
  title: string;
  /** Highlighted tail of the heading, rendered in the accent color */
  accent?: string;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  index,
  kicker,
  title,
  accent,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        centered && "items-center text-center",
        className,
      )}
    >
      <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.28em] text-brand uppercase">
        <span className="text-muted-foreground/60">[{index}]</span>
        {kicker}
        <span
          aria-hidden="true"
          className="h-px w-10 bg-gradient-to-r from-brand/70 to-transparent"
        />
      </p>
      <h2 className="max-w-3xl text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
        {accent ? (
          <>
            {" "}
            <span className="bg-gradient-to-r from-brand-soft to-brand bg-clip-text text-transparent">
              {accent}
            </span>
          </>
        ) : null}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
