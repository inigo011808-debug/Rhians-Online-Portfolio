import { ArrowUpRightIcon } from "lucide-react";

import { SmartImage } from "@/components/smart-image";
import { SmartLink } from "@/components/smart-link";
import type { Project } from "@/lib/data";
import { cn } from "@/lib/utils";

const STATUS_STYLES: Record<string, { dot: string; text: string }> = {
  Live: { dot: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400" },
  "In Progress": { dot: "bg-amber-500", text: "text-amber-600 dark:text-amber-400" },
  "Coming Soon": { dot: "bg-sky-500", text: "text-sky-600 dark:text-sky-400" },
};

/** Turns a title into the id shape used by project slugs. */
function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Initials used when a project has no logo file yet (e.g. "GitHub Trending" → GT). */
function initialsOf(title: string) {
  return title
    .split(/[\s/]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function ProjectLogo({ project }: { project: Project }) {
  if (project.logo) {
    return (
      <SmartImage
        src={project.logo}
        alt=""
        width={44}
        height={44}
        className="size-11 shrink-0 rounded-xl border border-border/60 bg-background object-cover"
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-brand/25 bg-gradient-to-br from-brand/15 to-brand-soft/5 font-mono text-sm font-bold text-brand"
    >
      {initialsOf(project.title)}
    </span>
  );
}

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  /** Zero-based position, rendered as the mono "P-01" label. */
  index: number;
}) {
  const status = STATUS_STYLES[project.status] ?? {
    dot: "bg-muted-foreground",
    text: "text-muted-foreground",
  };

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border/70 bg-card/50 p-5 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300",
        "hover:-translate-y-1 hover:border-brand/50 hover:shadow-[0_10px_40px_-16px_var(--brand)]",
        "focus-within:border-brand/50",
        project.featured && "sm:col-span-2 sm:p-7",
      )}
    >
      {/* Accent hairline that lights up on hover */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-80"
      />

      <div className="flex items-start gap-4">
        <ProjectLogo project={project} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <h3 className="text-lg font-semibold tracking-tight">
              {project.title}
            </h3>
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border border-border/60 px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase",
                status.text,
              )}
            >
              <span aria-hidden="true" className={cn("size-1.5 rounded-full", status.dot)} />
              {project.status}
            </span>
          </div>
          <p className="mt-1 font-mono text-[11px] tracking-[0.18em] text-muted-foreground/60 uppercase">
            P-{String(index + 1).padStart(2, "0")}
            {slugify(project.title) === project.slug ? null : ` · ${project.slug}`}
          </p>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-pretty text-muted-foreground">
        {project.description}
      </p>

      {project.tech.length > 0 && (
        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border/60 bg-background/50 px-2 py-1 font-mono text-[11px] text-muted-foreground"
            >
              {tech}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-5">
        {project.link !== "#" ? (
          <SmartLink
            href={project.link}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            View project
            <ArrowUpRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </SmartLink>
        ) : (
          <span className="font-mono text-[11px] tracking-[0.18em] text-muted-foreground/60 uppercase">
            Case study coming soon
          </span>
        )}
      </div>
    </article>
  );
}
