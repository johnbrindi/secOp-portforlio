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
- Signing in with Okta isn't sufficient on its own. The identity must also be listed in `ADMIN_EMAILS`. An empty allowlist denies everyone (fail closed).
- The Okta access token is never written into the session cookie; sessions expire after 8 hours.

**Input handling**
- Shared server-side validation (`lib/certification.ts`) with length caps and an `http(s)`-only URL allowlist, which blocks `javascript:` / `data:` links.
- The contact endpoint has length limits, strict email validation, a honeypot field, and per-IP rate limiting (`lib/rate-limit.ts`, 5 messages / 10 min). Notification emails HTML-escape user input.

**HTTP headers** (`next.config.ts`)
- CSP with no third-party script origins, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, and `form-action` limited to self + the Okta origin. `unsafe-eval` is only allowed in development.
- HSTS (preload), `X-Frame-Options: DENY`, `nosniff`, strict referrer policy, COOP/COEP, and a locked-down `Permissions-Policy`. The `X-Powered-By` header is removed.
- [`/.well-known/security.txt`](public/.well-known/security.txt) for responsible disclosure.

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev
```

See [`.env.example`](.env.example) for every variable. Only `DATABASE_URL` is needed to browse the public site; the Okta values and `ADMIN_EMAILS` are needed for `/admin`; `RESEND_API_KEY` + `CONTACT_NOTIFY_EMAIL` turn on email alerts for new contact messages.

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
- **Revocation:** under *Directory → People*, suspending or deactivating a user blocks new sign-ins immediately. Removing their email from `ADMIN_EMAILS` and redeploying revokes access in the app as well.
