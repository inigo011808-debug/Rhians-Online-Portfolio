# coderedexter portfolio

Single-page personal portfolio. Next.js (App Router), Tailwind CSS v4, shadcn/ui and Magic UI.
Dark by default with a light-mode toggle. Deploy target: Vercel.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (this is what Vercel runs)
npm run typecheck  # tsc --noEmit
npm run verify     # lint + typecheck + build, all three at once
```

## Where to edit things

Almost everything is in **`lib/data.ts`**:

| What you want to change | Where |
| --- | --- |
| Name, role, status pill, hero tagline | `SITE` |
| **Email address** (powers every mail button) | `SITE.email` |
| **Social links** (GitHub, LinkedIn, X) | `SOCIALS`, replace each `url: "#"` |
| Projects: title, text, tech list, status | `PROJECTS` |
| Project logo | add `logo: "/logos/dicet.png"` to that project |
| Your photo (About section) | add `avatar: "/images/me.jpg"` to `SITE` |
| Skills cards and marquee pills | `SKILL_CATEGORIES`, `MARQUEE_ITEMS` |
| Section titles and about text | `ABOUT`, `PROJECTS_SECTION`, `SKILLS_SECTION`, `CONTACT` |
| Footer credit | `FOOTER` |
| Brand colours (code red) | `--brand`, `--brand-soft` in `app/globals.css` |
| Layout and section order | `app/page.tsx` |

Links look after themselves: any `https://` URL opens in a new tab with
`rel="noopener noreferrer"`, handled in `components/smart-link.tsx`.

## Pictures and logos

Every picture lives in `/public` and is referenced from `lib/data.ts`:

| Picture | File goes in | Code |
| --- | --- | --- |
| Project logo (one per project) | `public/logos/` | `logo: "/logos/dicet.png"` inside `PROJECTS` |
| Your photo in the About section | `public/images/` | `avatar: "/images/me.jpg"` on `SITE` |
| Browser tab icon | `app/icon.svg` | edit the SVG file directly |
| iOS / home screen icon | `app/apple-icon.tsx` | edit the code (PNG generated at build) |
| Link preview card (Open Graph) | `app/opengraph-image.tsx` | edit the code, or delete it and add `app/opengraph-image.png` |

PNG, JPG and SVG all work. Square images look best for logos and the avatar.
A project without a logo shows its initials automatically, so nothing looks broken.

## Deploying to Vercel

1. Push the repo to GitHub and import it on vercel.com. The framework is detected automatically.
2. Optional: set `NEXT_PUBLIC_SITE_URL=https://your-domain` in Vercel under
   Settings, Environment Variables. Without it, the production URL Vercel assigns
   is used for the canonical and Open Graph tags.

## Security and quality

**Headers** (`next.config.ts`) apply to every route, in production and locally:

| Header | Value |
| --- | --- |
| `Content-Security-Policy` | Everything locked to `'self'`, `object-src 'none'`, `base-uri 'none'`, `form-action 'self'`, `frame-ancestors 'none'` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains` (production only) |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microphone, geolocation, browsing-topics all off |
| `Cross-Origin-Opener-Policy` | `same-origin` |
| `Cross-Origin-Resource-Policy` | `same-origin` |

`script-src` still allows `'unsafe-inline'` because Next renders the app shell
with inline bootstrap scripts. Allowing them by nonce requires middleware and
forces every page to render dynamically, which a static portfolio should not
pay for. Every other source is locked down, so an injected script still cannot
load, call out, or be framed. `'unsafe-eval'` and websocket origins are added in
development only.

**Other:** `X-Powered-By` is off. Every `https://` link goes through
`components/smart-link.tsx`, which adds `rel="noopener noreferrer"` and refuses
hrefs outside http(s)/mailto/tel so a `javascript:` URL can never reach the DOM.
`app/robots.ts` and `app/sitemap.ts` derive from `lib/site-url.ts`, the same
resolver the metadata uses, so the canonical URL cannot drift between them.

**Dependencies:** `next` is pinned to `^16.3.8` — earlier 16.3.x releases carry a
remote-code-execution advisory in `next/og`, which this site uses for its Open
Graph image. `overrides` hold `source-map-js` at `^1.2.2` (the patched release)
and `braces` at `^3.0.3`, and `npm audit --omit=dev` reports **0
vulnerabilities**. `shadcn` sits in `devDependencies` because only its Tailwind
CSS is used, at build time.

Known leftover: a full `npm audit` (development dependencies included) still
flags `braces`, which ships inside the `shadcn` CLI. Every published `braces`
release is affected, so the `overrides` entry only prevents an accidental
downgrade — it cannot clear the advisory, and the package never reaches the
deployed site.
