/**
 * ────────────────────────────────────────────────────────────────────────────
 *  CONTENT + LINKS LIVE HERE. This is the only file you need to edit.
 *
 *  1. LINES: replace each `url: "#"` below with your real link
 *     (e.g. "https://github.com/you"). External links automatically open in a
 *     new tab with safe rel attributes.
 *
 *  2. PICTURES: put image files in /public/logos/ for project logos and in
 *     /public/images/ for your own photo, then set the matching `logo:` or
 *     `avatar:` line below. Both folders have a README with the steps.
 * ────────────────────────────────────────────────────────────────────────────
 */

import { gmailComposeUrl } from "@/lib/utils";

export type NavIconKey = "home" | "about" | "projects" | "skills" | "contact";
export type SocialIconKey = "github" | "linkedin" | "discord" | "email";

export interface NavItem {
  /** In-page anchor, e.g. "#about". Must match the section id in app/page.tsx */
  href: string;
  label: string;
  icon: NavIconKey;
}

export interface SocialLink {
  label: string;
  /** Paste your profile URL here. External links get target=_blank + rel=noopener. */
  url: string;
  icon: SocialIconKey;
}

export interface Project {
  /** URL id, used for the future /projects/[slug] case study pages */
  slug: string;
  title: string;
  description: string;
  tech: string[];
  status: "Live" | "In Progress" | "Coming Soon";
  /** Where "View project" points. Leave "#" while there is no link yet. */
  link: string;
  /**
   * Optional picture. Save a file in /public/logos/ then use e.g.
   * `logo: "/logos/dicet.png"`. No logo means the card shows the initials.
   */
  logo?: string;
  /** Renders as the wide highlighted card in the grid */
  featured?: boolean;
}

export interface SkillCategory {
  /** Maps to an icon in app/page.tsx (code | frontend | backend | tools) */
  icon: string;
  name: string;
  description: string;
}

export interface SectionCopy {
  /** Small mono label above the heading, e.g. "projects" */
  kicker: string;
  title: string;
  /**
   * Optional tail of the heading, shown in the red gradient.
   * Example: title: "Projects", accent: "and more."
   */
  accent?: string;
  description?: string;
}

export interface AboutCopy {
  kicker: string;
  title: string;
  accent?: string;
  paragraphs: string[];
}

export interface ContactCopy {
  kicker: string;
  title: string;
  /** Optional tail of the heading, shown in the red gradient */
  accent?: string;
  body: string;
  cta: string;
  copyLabel: string;
  copiedLabel: string;
}

/* ────────────────────────────── Identity ────────────────────────────── */

export const SITE = {
  /** The hero name is split so "red" can glow in the accent color */
  nameParts: { before: "code", accent: "red", after: "exter" },
  name: "coderedexter",
  role: "Developer & builder",
  status: "Open to new projects",
  description:
    "Projects, skills, and contact: the personal portfolio of coderedexter.",
  /** Used for metadata/OG when NEXT_PUBLIC_SITE_URL is not set */
  url: "https://coderedexter.vercel.app",
  /** ↓↓↓ CHANGE THIS to your real email. It powers every mailto: link ↓↓↓ */
  email: "theregisway@gmail.com",
  /**
   * Your photo in the About section. Save a picture in /public/images/ then
   * write e.g. avatar: "/images/me.jpg". Leave "" to show no photo.
   */
  avatar: "",
  tagline: {
    before: "I build ",
    accent: "useful things",
    after: " for the web: apps, tools, and automation.",
  },
};

/* ─────────────────────────── Navigation dock ─────────────────────────── */

export const NAV_ITEMS: NavItem[] = [
  { href: "#home", label: "Home", icon: "home" },
  { href: "#about", label: "About", icon: "about" },
  { href: "#projects", label: "Projects", icon: "projects" },
  { href: "#skills", label: "Skills", icon: "skills" },
  { href: "#contact", label: "Contact", icon: "contact" },
];

/* ─────────────────── Social / contact links (you edit these) ─────────────────── */

export const SOCIALS: SocialLink[] = [
  { label: "GitHub", icon: "github", url: "https://github.com/inigo011808-debug" },
  { label: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/rhian-inigo-r-regis-bb1b71310" },
  { label: "Discord", icon: "discord", url: "https://discord.com/users/446605345305919488" },
  { label: "Email", icon: "email", url: gmailComposeUrl(SITE.email) }, // Gmail compose, same as Contact me
];

/* ─────────────────────────────── Sections ─────────────────────────────── */

export const ABOUT: AboutCopy = {
  kicker: "about",
  title: "About",
  paragraphs: [
    "I'm a self-taught developer doing this for fun. I've always liked learning and using software and hardware, and decided I could actually use those skills for something useful.",
    "I plan to go deeper into economics and finance, but I also have a wide range of skills in this area, and I'm willing to work together with anyone who has a plan and a vision.",
  ],
};

export const PROJECTS_SECTION: SectionCopy = {
  kicker: "projects",
  title: "Projects",
  description: "Featured work: each one gets its own case study page.",
};

export const SKILLS_SECTION: SectionCopy = {
  kicker: "skills",
  title: "Skills",
  description: "Tools and technologies I work with, grouped by category.",
};

export const CONTACT: ContactCopy = {
  kicker: "contact",
  title: "Contact",
  body: "Have a project in mind or just want to say hi? My inbox is always open.",
  cta: "Contact me",
  copyLabel: "Copy email",
  copiedLabel: "Copied!",
};

export const FOOTER = {
  credit: "Crafted with ❤️ by coderedexter",
  builtWith: [
    { label: "Next.js", url: "https://nextjs.org" },
    { label: "Tailwind CSS", url: "https://tailwindcss.com" },
    { label: "shadcn/ui", url: "https://ui.shadcn.com" },
  ],
};

/* ──────────────────────────────── Projects ──────────────────────────────── */

export const PROJECTS: Project[] = [
  {
    slug: "coderedexterportfolio",
    title: "coderedexterportfolio",
    description:
      "My personal portfolio using Next.js with a macOS-style dock, Magic UI animations, and case study pages for each project.",
    tech: ["Next.js", "shadcn/ui", "Tailwind CSS"],
    status: "In Progress",
    link: "#",
    featured: true,
  },
  {
    slug: "dicet",
    title: "Dicet",
    description:
      "A small dice rolling RNG test. Getting an update pass to make it presentable.",
    tech: [],
    status: "In Progress",
    link: "#",
  },
  {
    slug: "brainz-gain",
    title: "brainz-gain",
    description: "Assistance system for students, currently in progress.",
    tech: [],
    status: "In Progress",
    link: "#",
  },
  {
    slug: "flying-cash-detective",
    title: "Flying cash detective",
    description:
      "Guam-only airplane price detector. Still testing the feasibility of available flight data.",
    tech: [],
    status: "Coming Soon",
    link: "#",
  },
  {
    slug: "project-jarvis",
    title: "project-jarvis",
    description: "The project I'm working on right now.",
    tech: [],
    status: "In Progress",
    link: "#",
  },
  {
    slug: "travada",
    title: "Travada",
    description:
      "A stock research dashboard: watchlists with TradingView charts, indicators, a trade journal with performance analytics, and a FastAPI backend that proxies Yahoo, SEC and news data with caching.",
    tech: ["FastAPI", "Python", "Supabase", "Vercel"],
    status: "Live",
    link: "https://travada.vercel.app",
  },
  {
    slug: "daily-haven",
    title: "Daily Haven",
    description:
      "A 3-page Flask website for a local coffee shop: hero homepage, menu grouped by category, and a validated contact form that sends mail over SMTP.",
    tech: ["Flask", "Python", "SMTP", "HTML & CSS"],
    status: "Live",
    link: "https://github.com/inigo011808-debug/Daily-Haven",
  },
  {
    slug: "github-trending",
    title: "github-trending",
    description: "CLI for browsing GitHub trending repositories from the terminal.",
    tech: [],
    status: "Coming Soon",
    link: "#",
  },
];

/* ───────────────────────────────── Skills ───────────────────────────────── */

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    icon: "code",
    name: "Languages",
    description: "Python, JavaScript, HTML & CSS",
  },
  {
    icon: "frontend",
    name: "Frontend",
    description: "Next.js, React, Tailwind CSS, shadcn/ui",
  },
  {
    icon: "backend",
    name: "Backend & Automation",
    description: "Flask, SMTP, REST APIs",
  },
  {
    icon: "tools",
    name: "Tools",
    description: "Git, Docker, GitHub, VS Code",
  },
];

/** Pills shown scrolling in the marquee strip */
export const MARQUEE_ITEMS = [
  "Next.js",
  "React",
  "JavaScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Python",
  "Flask",
  "SMTP",
  "Docker",
  "Git",
  "GitHub",
  "VS Code",
];
