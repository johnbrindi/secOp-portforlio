# SecOps Portfolio

A professional cybersecurity portfolio demonstrating practical security engineering, SOC analytics, and Identity & Access Management (IAM) built with Next.js, Prisma, and Okta.

---

## 🔒 Identity and Access Management (IAM) Manual

This project implements an **Enterprise-Grade Identity and Access Management (IAM)** system to protect the `/admin` dashboard, delegating all authentication to **Okta** (an industry-leading Identity Provider).

### How the Authentication Flow Works (OIDC)
When a user attempts to visit `http://localhost:3000/admin`, the following OpenID Connect (OIDC) sequence happens:

1. **Interception:** Next.js Middleware detects an unauthenticated attempt to access a protected route.
2. **Redirection:** NextAuth securely redirects the browser to the Okta tenant, passing the `Client ID` to identify the application.
3. **Authentication:** The Okta login screen is presented. The user enters their Okta credentials.
4. **Authorization Code:** Upon successful verification, Okta redirects back to the Next.js app with a temporary "Authorization Code".
5. **Token Exchange:** NextAuth exchanges this code and the hidden `Client Secret` with Okta for an **Access Token** and an **ID Token**.
6. **Session Created:** An encrypted cookie is established, granting secure access to the `/admin` dashboard.

### Managing the IAM System
All user identity management occurs inside the **Okta Admin Console**, entirely separate from the application code.

#### 1. User Assignment & Access Policies
Okta uses "Zero Trust", meaning users don't automatically get access to apps. Access is controlled by Authentication Policies.
If your app uses **Federation Broker Mode** (Implicit Assignment):
1. In the Okta Admin Console, go to **Applications** > **Applications** and click your app.
2. Go to the **Assignments** tab. You will see "This app is implicitly assigned to users".
3. Click the **Configure Sign On Policy** button.
4. Ensure there is a rule that **Allows** access. If you are getting a "Not allowed to access" error, edit the rule to explicitly "Allow access" and set the requirement to "Any 1 factor type" (Password) or "Any 2 factor types" (if you have Okta Verify setup).

If your app uses **Explicit Assignment**:
1. On the **Assignments** tab, click **Assign** > **Assign to People**.
2. Find your user and assign them.

#### 2. Enforcing Multi-Factor Authentication (MFA)
Demonstrate zero-trust principles by enforcing MFA:
1. In Okta, go to **Security** > **Authentication Policies**.
2. Find the policy attached to your app.
3. Edit the rules to require **Any 2 factor types** (e.g., Password + Okta Verify).
4. Subsequent logins will mandate MFA approval.

#### 3. Deprovisioning (Revoking Access)
To demonstrate immediate access revocation:
1. In the Okta Admin Console, navigate to **Directory** > **People**.
2. Select a user and click **Suspend** or **Deactivate**.
3. The user's active session in the application will immediately become invalid.

---

## 🛠️ Implementation Walkthrough

### 1. NextAuth.js Integration
- Integrated `next-auth` to handle the OIDC flow.
- Configured the Okta Provider at `/app/api/auth/[...nextauth]/route.ts` utilizing environment variables (`OKTA_CLIENT_ID`, `OKTA_CLIENT_SECRET`, `OKTA_ISSUER`).
- Increased the internal `httpOptions` timeout to 10 seconds to accommodate local development network latency.

### 2. Route Protection (Middleware)
- Created `middleware.ts` at the project root.
- Established a gatekeeper policy: any request matching `/admin/:path*` requires an active session token. Unauthenticated requests trigger an automatic 302 redirect to the Okta login portal.

### 3. Security Headers configuration
- Native Next.js security headers were heavily configured in `next.config.ts`, rendering packages like `helmet` redundant.
- **Headers Enforced:**
  - `Strict-Transport-Security` (HSTS)
  - `X-Frame-Options: SAMEORIGIN` (Clickjacking protection)
  - `X-XSS-Protection: 1; mode=block`
  - `Content-Security-Policy` (CSP)
- **CSP Adjustment:** Modified the `form-action` directive to `'self' https:;` to securely permit POST form submissions redirecting to external HTTPS Identity Providers (Okta) during the OAuth flow.

### 4. UI/UX Refinements
- Converted `AdminSidebar.tsx` to a Client Component.
- Implemented a secure "Sign Out" function utilizing NextAuth's `signOut()` method to properly destroy local cookies and terminate the session.

---

## 🚀 Getting Started

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Create a `.env` file based on the setup:
   ```env
   # Database
   DATABASE_URL=your_neon_postgres_url
   
   # Sanity CMS
   SANITY_PROJECT_ID=your_project_id
   SANITY_DATASET=production
   SANITY_API_VERSION=2025-02-01

   # Okta / NextAuth
   NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32
   NEXTAUTH_URL=http://localhost:3000
   OKTA_CLIENT_ID=your_okta_client_id
   OKTA_CLIENT_SECRET=your_okta_client_secret
   OKTA_ISSUER=https://your_domain.okta.com/oauth2/default
   ```

3. **Run Development Server:**
   ```bash
   npm run dev
   ```
