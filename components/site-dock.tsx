"use client";

import { useEffect, useState } from "react";
import {
  CpuIcon,
  FolderKanbanIcon,
  HomeIcon,
  MailIcon,
  UserRoundIcon,
} from "lucide-react";

import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { buttonVariants } from "@/components/ui/button";
import { Dock, DockIcon } from "@/components/ui/dock";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SmartLink } from "@/components/smart-link";
import { NAV_ITEMS, type NavIconKey } from "@/lib/data";
import { cn } from "@/lib/utils";

const NAV_ICONS: Record<NavIconKey, React.ElementType> = {
  home: HomeIcon,
  about: UserRoundIcon,
  projects: FolderKanbanIcon,
  skills: CpuIcon,
  contact: MailIcon,
};

const SECTION_IDS = NAV_ITEMS.map((item) => item.href.replace("#", ""));

/** Tooltips only on devices with a real mouse. On touch they would swallow the first tap. */
function useCanHover() {
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return canHover;
}

/** Highlights the dock icon of the section currently in the middle of the viewport. */
function useActiveSection() {
  const [active, setActive] = useState(SECTION_IDS[0] ?? "");

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return active;
}

export function SiteDock() {
  const canHover = useCanHover();
  const active = useActiveSection();

  return (
    <nav
      aria-label="Primary"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
    >
      <TooltipProvider>
        <Dock
          direction="middle"
          iconSize={40}
          iconMagnification={56}
          className="pointer-events-auto mt-0 max-w-[calc(100vw-2rem)] gap-1 border-border/60 bg-background/75 shadow-[0_18px_50px_-20px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:gap-2"
        >
          {NAV_ITEMS.map((item) => {
            const Icon = NAV_ICONS[item.icon];
            const isActive = active === item.href.replace("#", "");
            const link = (
              <SmartLink
                href={item.href}
                aria-label={item.label}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "size-10 rounded-full transition-colors",
                  isActive
                    ? "bg-brand/10 text-brand hover:bg-brand/15"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-[18px]" />
              </SmartLink>
            );

            return (
              <DockIcon key={item.label}>
                {canHover ? (
                  <Tooltip>
                    <TooltipTrigger render={link} />
                    <TooltipContent>
                      <p>{item.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  link
                )}
              </DockIcon>
            );
          })}

          <Separator orientation="vertical" className="h-8 self-center" />

          <DockIcon>
            <AnimatedThemeToggler
              aria-label="Toggle theme"
              className={cn(
                buttonVariants({ variant: "ghost", size: "icon" }),
                "size-10 rounded-full text-muted-foreground hover:text-foreground [&_svg]:size-[18px]",
              )}
            />
          </DockIcon>
        </Dock>
      </TooltipProvider>
    </nav>
  );
}
