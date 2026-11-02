# Mazwewoh John Brindi — Portfolio

Personal portfolio of **Mazwewoh John Brindi N.**: network & infrastructure engineer, security lead, and founder of [ZIGEX](https://zigexconnect.com/).

**Live:** https://mazwewohjohnbrindi.vercel.app · **LinkedIn:** [mazwewohjohnbrindi](https://www.linkedin.com/in/mazwewohjohnbrindi/) · **GitHub:** [johnbrindi](https://github.com/johnbrindi)

The site itself is a security project. It has an Okta-protected admin console with server-side authorization on every mutation, a hardened HTTP header set, and an abuse-resistant contact pipeline.

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack), React 19, TypeScript |
| Styling | Tailwind CSS 4 + design tokens in `app/globals.css` |
| Data | Neon Postgres via Prisma 7 (admin content, contact messages) |
| Auth | NextAuth + Okta (OIDC), email allowlist |
| Hosting | Vercel |

Public pages (projects, blog, certifications, skills) are statically generated from typed data files in the repo, so they're fast, indexable, and keep working if the database or CMS is down.

## Security design

**Identity & access**
- `/admin` is gated three times: `proxy.ts` blocks navigation, `app/admin/layout.tsx` re-checks the session on the server, and every Server Action and mutating API route calls `requireAdmin()` / `adminGuard()` from `lib/auth.ts`. Server Actions are reachable by direct POST, so page-level checks alone aren't enough.
- Admins are the accounts in the `admin_users` database table. Sign in at `/login` with email + password, or with Okta (the Okta email must also have an `admin_users` row). No rows denies everyone (fail closed).
- Passwords are stored only as scrypt hashes. Five failed attempts lock the account for 15 minutes (stored in the database, so it holds across serverless instances). Change your password on `/admin/account`; create an account or reset a forgotten password with `npm run admin:set-password -- you@example.com '<password>'`.
- The Okta access token is never written into the session cookie; sessions expire after 8 hours.

**Input handling**
- Shared server-side validation (`lib/certification.ts`) with length caps and an `http(s)`-only URL allowlist, which blocks `javascript:` / `data:` links.
- The contact endpoint has length limits, strict email validation, a honeypot field, and per-IP rate limiting (`lib/rate-limit.ts`, 5 messages / 10 min). Notification emails HTML-escape user input.

**HTTP headers** (`next.config.ts`)
- CSP with no third-party script origins, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, and `form-action` limited to self + the Okta origin. `unsafe-eval` is only allowed in development.
- HSTS (preload), `X-Frame-Options: DENY`, `nosniff`, strict referrer policy, COOP/COEP, and a locked-down `Permissions-Policy`. The `X-Powered-By` header is removed.
- [`/.well-known/security.txt`](public/.well-known/security.txt) for responsible disclosure.

## SEO

Built to Google Search Central's guidance: helpful content, unique titles and descriptions, canonical URLs, structured data, and accurate sitemaps. No keyword stuffing; Google ignores the meta keywords tag.

| What | Where |
| --- | --- |
| Identity (name, roles, profiles), keywords | `lib/site.ts` |
| Per-page title / description / canonical / OG helpers, JSON-LD builders | `lib/seo.tsx` |
| Verified public sources ("Around the web" on /about) | `lib/footprint.ts` |
| Entity graph on every page: `Person` + `WebSite` + `Organization` (ZIGEX) | `app/layout.tsx` |
| Page schemas: `ProfilePage`, `ItemList`, `Blog`, `BlogPosting`, `AboutPage`, `BreadcrumbList` | each page |
| Sitemap (accurate `lastmod`; blog posts added automatically) | `app/sitemap.ts` |
| RSS feed generated from posts | `app/feed.xml/route.ts` |
| Social card, favicon, Apple icon, web manifest | `app/opengraph-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx`, `app/manifest.ts` |

**Automation** (`.github/workflows/seo.yml`)
- After every successful Vercel production deploy, `scripts/indexnow.mjs` submits recently changed sitemap URLs to IndexNow (Bing, Yandex, Seznam, Naver). Google doesn't support IndexNow and retired sitemap pings in 2023; it re-reads the sitemap submitted in Search Console.
- The same workflow, plus every Monday, runs `scripts/seo-audit.mjs` (status codes, unique titles and descriptions, canonicals, one `<h1>`, OG tags, valid JSON-LD, image alt text) and Lighthouse (SEO score ≥ 95). The job fails if SEO regresses.
- Run locally: `npm run seo:audit -- http://localhost:3000` · `npm run seo:indexnow -- --dry-run`

**When you publish or change content:** add the post to `app/blog/posts.ts` (the sitemap and feed update themselves), or bump that page's date in `app/sitemap.ts`. The next deploy notifies search engines.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

See [`.env.example`](.env.example) for every variable. Only `DATABASE_URL` is needed to browse the public site; an `admin_users` account (see above) is needed for `/admin`; `RESEND_API_KEY` + `CONTACT_NOTIFY_EMAIL` turn on email alerts for new contact messages.

| Script | Purpose |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run seed` | Seed the database |

CI (`.github/workflows/ci.yml`) runs the type check, lint, build, and a dependency audit on every push and pull request.

## Editing content

| Content | File |
| --- | --- |
| Projects / case studies | `app/projects/page.tsx` |
| Blog posts | `app/blog/posts.ts` |
| Certifications | `app/certifications/certificationsData.ts` |
| Home-page expertise | `app/components/skillsData.ts` |
| SEO, structured data | `app/layout.tsx`, `app/sitemap.ts` |

## Okta administration

All identity management happens in the **Okta Admin Console**:

- **Assignment:** under *Applications → your app → Assignments*, assign yourself (explicit assignment), or make sure the sign-on policy has an *Allow* rule (federation broker mode).
- **MFA:** under *Security → Authentication Policies*, require *Any 2 factor types* for the app.
- **Revocation:** under *Directory → People*, suspending or deactivating a user blocks new sign-ins immediately. Deleting their `admin_users` row revokes access in the app as well, effective on their next request.

## Daily opportunity digests

`app/api/cron/opportunities` runs every day at 06:00 Cameroon time (Vercel Cron, `vercel.json`)
and sends two separate emails, each only when there is something new:

- **Opportunity Digest**: networking, cybersecurity and web-dev jobs, internships, events and
  training. Cameroon first, then Africa/remote, then international; grouped by type.
- **Master's Scholarship Watch**: funded Master's study abroad, grouped by fit (your fields,
  STEM & engineering, open to all fields) and by fully funded vs partial funding.

Relevance rules live in `lib/opportunities/profile.ts`, sources in `sources.ts`, ranking in
`score.ts`, email templates in `email.ts`, and the pipeline in `run.ts`. Everything sent is
stored in the `opportunities` table (never emailed twice) and each run in `opportunity_runs`.

**Dashboard:** `/admin/opportunities` (behind the admin login) has four tabs: Opportunities and
Scholarships (cards with the same details and links as the emails, last 30 days), Visitors, and
Status (run health, source health, run history). "Run now & email" triggers a run on demand.

## Logo and icons

The brand logo is `public/brand/logo.svg` (512×512 viewBox). Every icon (favicon, Apple icon, admin
app icons, maskable icon, notification badge from `public/brand/logo-badge.svg`) is generated from
it: replace the SVG and run `npm run icons`.

## PWA and push notifications

Only the admin dashboard is installable ("JB Admin", opens `/admin/opportunities`): the manifest
`/admin-app.webmanifest` is linked from admin pages only, so the public portfolio never offers an
install. The service worker `public/sw.js` is registered with scope `/admin/`, handles push only and
caches nothing. Install from the "Install app" button on `/admin/opportunities`.

Web push goes only to the admin's devices: enable it per device with "Enable on this device" on
`/admin/opportunities` (on iPhone, add the site to the Home Screen first). You get a notification
for each new opportunity / scholarship batch and for new portfolio visitors. Visits are reported
once per browser session by `app/components/VisitBeacon.tsx` to `/api/visit`, which ignores bots and
the admin, stores the IP only as a salted hash, notifies at most once per visitor per 30 minutes
and caps visitor notifications at 30 per hour.

Sources: LinkedIn Jobs (Cameroon), ReliefWeb Cameroon, Google News (EN + FR), Opportunity Desk,
Opportunities For Africans, Opportunities Corners, Scholarship Region, Scholars4Dev,
Scholarship Union, Scholarships Corner, Opportunities Circle, CTFtime, Remotive, Jobicy,
We Work Remotely — plus LinkedIn posts, Facebook and X when `SERPER_API_KEY` is set.

Environment variables (Vercel → Project → Settings → Environment Variables):

| Variable | Purpose |
| --- | --- |
| `CRON_SECRET` | Random string; Vercel sends it to the cron route. `openssl rand -hex 32` |
| `GMAIL_USER` | Gmail address that sends the digests |
| `GMAIL_APP_PASSWORD` | Gmail App Password (Google Account → Security → 2-Step Verification → App passwords) |
| `OPPORTUNITY_EMAIL_TO` | Optional, recipient, defaults to johnbrindi4@gmail.com |
| `SERPER_API_KEY` | Optional, from serper.dev — adds LinkedIn posts / Facebook / X |
| `VAPID_PUBLIC_KEY` / `VAPID_PRIVATE_KEY` | Web push keys: `npx web-push generate-vapid-keys` |
| `VAPID_SUBJECT` | `mailto:` contact for push services, e.g. `mailto:you@example.com` |
| `VISIT_HASH_SALT` | Random string used to hash visitor IPs. `openssl rand -hex 24` |

Preview without sending: `curl -H "Authorization: Bearer $CRON_SECRET" "https://<site>/api/cron/opportunities?dry=1"`
Run it for real: same URL without `?dry=1`.

On a slow local connection, start the dev server with
`NODE_OPTIONS="--network-family-autoselection-attempt-timeout=3000" npm run dev`.
