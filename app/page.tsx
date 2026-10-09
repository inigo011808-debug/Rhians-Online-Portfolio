import {
  ArrowDownIcon,
  CodeIcon,
  LayoutGridIcon,
  ServerIcon,
  WrenchIcon,
} from "lucide-react";

import { ContactButton } from "@/components/contact-button";
import { CopyEmailButton } from "@/components/copy-email-button";
import { HeroPhoto } from "@/components/hero-photo";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteDock } from "@/components/site-dock";
import { SiteFooter } from "@/components/site-footer";
import { SmartImage } from "@/components/smart-image";
import { SmartLink } from "@/components/smart-link";
import { SocialLinks } from "@/components/social-links";
import { BlurFade } from "@/components/ui/blur-fade";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { buttonVariants } from "@/components/ui/button";
import { Marquee } from "@/components/ui/marquee";
import {
  ABOUT,
  CONTACT,
  MARQUEE_ITEMS,
  PROJECTS,
  PROJECTS_SECTION,
  SITE,
  SKILLS_SECTION,
  SKILL_CATEGORIES,
} from "@/lib/data";
import { cn } from "@/lib/utils";

/** The About text. Rendered side by side, or next to your photo when SITE.avatar is set. */
function AboutParagraphs({ className }: { className?: string }) {
  return (
    <div className={className}>
      {ABOUT.paragraphs.map((paragraph, index) => (
        <BlurFade inView key={index} delay={0.05 + index * 0.05}>
          <p className="text-base leading-relaxed text-pretty text-muted-foreground sm:text-lg">
            {paragraph}
          </p>
        </BlurFade>
      ))}
    </div>
  );
}

/** Add a key here if you add a skill category in lib/data.ts */
const SKILL_ICONS = {
  code: CodeIcon,
  frontend: LayoutGridIcon,
  backend: ServerIcon,
  tools: WrenchIcon,
} as const;

export default function Home() {
  return (
    <div className="relative isolate min-h-svh overflow-x-clip bg-background">
      <Backdrop />
      <SiteDock />

      {/* ────────────────────────────── Hero ────────────────────────────── */}
      <section
        id="home"
        className="relative flex min-h-svh scroll-mt-16 flex-col justify-center pt-24 pb-16"
      >
        {/* Same width + padding as <main> so hero text lines up with every section below */}
        <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
          <div className="flex flex-col items-start gap-6">
            {/* Role label left, profile photo pinned to the hero's top right */}
            <div className="flex w-full items-center justify-between gap-4">
              <p className="font-mono text-[11px] tracking-[0.28em] text-muted-foreground uppercase">
                {SITE.role}
              </p>
              <HeroPhoto />
            </div>

            <h1 className="text-[clamp(2.75rem,11vw,7rem)] leading-[0.92] font-black tracking-tight">
              {SITE.nameParts.before}
              <span className="bg-gradient-to-r from-brand-soft via-brand to-brand bg-clip-text text-transparent">
                {SITE.nameParts.accent}
              </span>
              {SITE.nameParts.after}
            </h1>

            <p className="max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
              {SITE.tagline.before}
              <span className="font-semibold text-foreground">
                {SITE.tagline.accent}
              </span>
              {SITE.tagline.after}
            </p>

            <p className="inline-flex items-center gap-2.5 rounded-full border border-border/70 bg-card/50 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase backdrop-blur-sm">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              {SITE.status}
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <ContactButton email={SITE.email}>{CONTACT.cta}</ContactButton>
              <SmartLink
                href="#projects"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "h-11 rounded-full px-5 font-semibold tracking-tight",
                )}
              >
                See my work
                <ArrowDownIcon className="size-4" />
              </SmartLink>
            </div>

            <SocialLinks variant="button" className="mt-2" />
          </div>
        </div>
      </section>

      {/* Full-bleed tech strip. The scrolling pills are decorative and repeated
          three times, so screen readers get the same list once instead. */}
      <p className="sr-only">
        Technologies I work with: {MARQUEE_ITEMS.join(", ")}.
      </p>
      <div
        aria-hidden="true"
        className="relative border-y border-border/60 bg-card/30 py-5 backdrop-blur-sm"
      >
        <Marquee pauseOnHover repeat={3} className="[--gap:0.75rem]">
          {MARQUEE_ITEMS.map((item) => (
            <span
              key={item}
              className="rounded-full border border-border/60 bg-background/60 px-4 py-1.5 font-mono text-xs tracking-wider text-muted-foreground uppercase"
            >
              {item}
            </span>
          ))}
        </Marquee>
      </div>

      <main id="main" className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        {/* ───────────────────────────── About ───────────────────────────── */}
        <section id="about" className="scroll-mt-16 py-20 sm:py-28">
          <BlurFade inView className="space-y-6">
            <SectionHeading
              index="01"
              kicker={ABOUT.kicker}
              title={ABOUT.title}
              accent={ABOUT.accent}
            />
            {SITE.avatar ? (
              <div className="grid gap-6 lg:grid-cols-[220px_1fr] lg:items-start lg:gap-10">
                <BlurFade inView>
                  <SmartImage
                    src={SITE.avatar}
                    alt={`${SITE.name} portrait`}
                    width={352}
                    height={352}
                    className="w-40 rounded-2xl border border-border/70 object-cover sm:w-52"
                  />
                </BlurFade>
                <AboutParagraphs className="space-y-4" />
              </div>
            ) : (
              <AboutParagraphs className="grid gap-5 lg:grid-cols-[1.4fr_1fr] lg:gap-10" />
            )}
          </BlurFade>
        </section>

        {/* ──────────────────────────── Projects ─────────────────────────── */}
        <section id="projects" className="scroll-mt-16 py-20 sm:py-28">
          <BlurFade inView>
            <SectionHeading
              index="02"
              kicker={PROJECTS_SECTION.kicker}
              title={PROJECTS_SECTION.title}
              accent={PROJECTS_SECTION.accent}
              description={PROJECTS_SECTION.description}
            />
          </BlurFade>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {PROJECTS.map((project, index) => (
              <BlurFade
                inView
                key={project.slug}
                delay={Math.min(index * 0.04, 0.24)}
                className={cn("h-full", project.featured && "sm:col-span-2")}
              >
                <ProjectCard project={project} index={index} />
              </BlurFade>
            ))}
          </div>
        </section>

        {/* ───────────────────────────── Skills ──────────────────────────── */}
        <section id="skills" className="scroll-mt-16 py-20 sm:py-28">
          <BlurFade inView>
            <SectionHeading
              index="03"
              kicker={SKILLS_SECTION.kicker}
              title={SKILLS_SECTION.title}
              accent={SKILLS_SECTION.accent}
              description={SKILLS_SECTION.description}
            />
          </BlurFade>
          <BlurFade inView delay={0.08} className="mt-10">
            <BentoGrid className="auto-rows-[15rem] sm:auto-rows-[18rem] md:grid-cols-2 md:auto-rows-[20rem]">
              {SKILL_CATEGORIES.map((category) => {
                const Icon = SKILL_ICONS[category.icon as keyof typeof SKILL_ICONS] ?? CodeIcon;
                return (
                  <BentoCard
                    key={category.name}
                    name={category.name}
                    description={category.description}
                    href="#projects"
                    cta="See the work"
                    className="col-span-3 md:col-span-1 border-border/70"
                    Icon={(props: { className?: string }) => (
                      <Icon className={cn(props.className, "text-brand")} />
                    )}
                    background={
                      <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-brand-soft/5" />
                    }
                  />
                );
              })}
            </BentoGrid>
          </BlurFade>
        </section>

        {/* ──────────────────────────── Contact ──────────────────────────── */}
        <section id="contact" className="scroll-mt-16 py-20 sm:py-28">
          <BlurFade inView>
            <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-card/40 px-6 py-14 backdrop-blur-sm sm:px-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--brand-glow),transparent)]"
              />
              <div className="relative flex flex-col items-center gap-8 text-center">
                <SectionHeading
                  index="04"
                  kicker={CONTACT.kicker}
                  title={CONTACT.title}
                  accent={CONTACT.accent}
                  description={CONTACT.body}
                  align="center"
                />
                <p className="font-mono text-sm">
                  <SmartLink
                    href={`mailto:${SITE.email}`}
                    className="text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
                  >
                    {SITE.email}
                  </SmartLink>
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <ContactButton email={SITE.email}>
                    {CONTACT.cta}
                  </ContactButton>
                  <CopyEmailButton email={SITE.email} />
                </div>
                <SocialLinks variant="button" />
              </div>
            </div>
          </BlurFade>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/** Dot-matrix backdrop + two soft brand glows. Purely decorative. */
function Backdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-dot-grid opacity-70 [mask-image:radial-gradient(ellipse_75%_60%_at_50%_15%,black_20%,transparent_100%)]" />
      <div className="absolute -top-32 left-1/2 h-[26rem] w-[min(92vw,48rem)] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--brand-glow),transparent)]" />
      <div className="absolute -right-24 -bottom-40 h-[22rem] w-[32rem] rounded-full bg-[radial-gradient(closest-side,var(--brand-glow),transparent)] opacity-70" />
    </div>
  );
}
