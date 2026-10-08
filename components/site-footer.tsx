import { ArrowUpIcon } from "lucide-react";

import { SmartLink } from "@/components/smart-link";
import { SocialLinks } from "@/components/social-links";
import { FOOTER, NAV_ITEMS, SITE } from "@/lib/data";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/60 bg-card/20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 pt-12 pb-36 sm:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <p className="font-mono text-sm font-semibold tracking-tight">
              {SITE.nameParts.before}
              <span className="text-brand">{SITE.nameParts.accent}</span>
              {SITE.nameParts.after}
            </p>
            <p className="text-sm text-muted-foreground">{FOOTER.credit}</p>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_ITEMS.map((item) => (
              <SmartLink
                key={item.href}
                href={item.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {item.label}
              </SmartLink>
            ))}
          </nav>

          <SocialLinks />
        </div>

        <div className="flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} {SITE.name}
          </p>
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground/70">
            Built with
            {FOOTER.builtWith.map((tool, index) => (
              <span key={tool.label} className="flex items-center gap-2">
                {index > 0 && <span aria-hidden="true">·</span>}
                <SmartLink
                  href={tool.url}
                  className="text-muted-foreground underline-offset-4 transition-colors hover:text-brand hover:underline"
                >
                  {tool.label}
                </SmartLink>
              </span>
            ))}
          </p>
          <SmartLink
            href="#home"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-muted-foreground/70 transition-colors hover:text-brand"
          >
            <ArrowUpIcon className="size-3.5" />
            Back to top
          </SmartLink>
        </div>
      </div>
    </footer>
  );
}
