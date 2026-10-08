import { MailIcon } from "lucide-react";

import { GithubIcon, LinkedinIcon, DiscordIcon } from "@/components/icons";
import { SmartLink } from "@/components/smart-link";
import { SOCIALS } from "@/lib/data";
import { cn } from "@/lib/utils";

const SOCIAL_ICONS = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  discord: DiscordIcon,
  email: MailIcon,
} as const;

interface SocialLinksProps {
  className?: string;
  /** "button" = bordered pills (hero / contact), "plain" = inline icons (footer) */
  variant?: "button" | "plain";
}

/** Renders every entry of SOCIALS in lib/data.ts. Edit links there, not here. */
export function SocialLinks({ className, variant = "plain" }: SocialLinksProps) {
  return (
    <ul className={cn("flex flex-wrap items-center gap-2", className)}>
      {SOCIALS.map((social) => {
        const Icon = SOCIAL_ICONS[social.icon];
        return (
          <li key={social.label}>
            <SmartLink
              href={social.url}
              aria-label={social.label}
              className={cn(
                "inline-flex items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-brand/60 hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand",
                variant === "button"
                  ? "size-11 bg-card/50 backdrop-blur-sm"
                  : "size-9",
              )}
            >
              <Icon className="size-[18px]" />
            </SmartLink>
          </li>
        );
      })}
    </ul>
  );
}
