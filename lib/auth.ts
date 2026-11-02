import { getServerSession, type NextAuthOptions } from "next-auth";
import OktaProvider from "next-auth/providers/okta";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "@/lib/password";
import { rateLimit } from "@/lib/rate-limit";

/**
 * Comma-separated list of emails allowed into /admin (ADMIN_EMAILS env var).
 * Authenticating with Okta is not enough on its own — the identity must also
 * be on this allowlist. If the variable is empty, nobody is authorized (fail closed).
 */
export function getAdminEmails(): string[] {
  return (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return getAdminEmails().includes(email.toLowerCase());
}

export const authOptions: NextAuthOptions = {
  providers: [
    OktaProvider({
      clientId: process.env.OKTA_CLIENT_ID || "",
      clientSecret: process.env.OKTA_CLIENT_SECRET || "",
      issuer: process.env.OKTA_ISSUER || "",
      httpOptions: {
        timeout: 10000, // Increase timeout to 10 seconds to prevent OAUTH_ERROR
      },
    }),
    // Fallback that works without Okta. The email must be on ADMIN_EMAILS and the
    // password must match ADMIN_PASSWORD_HASH (see lib/password.ts); unset = disabled.
    CredentialsProvider({
      id: "password",
      name: "email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials?.email?.trim().toLowerCase();
        if (!email || !credentials?.password || !process.env.ADMIN_PASSWORD_HASH) return null;
        const forwarded = req?.headers?.["x-forwarded-for"];
        const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || "").split(",")[0].trim() || "unknown";
        // 5 attempts per 15 minutes per IP (per instance — a speed bump against guessing).
        if (!rateLimit(`login:${ip}`, 5, 15 * 60_000).ok) return null;
        if (!isAdminEmail(email) || !verifyPassword(credentials.password, process.env.ADMIN_PASSWORD_HASH)) return null;
        return { id: email, email, name: "Admin" };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8, // 8h admin sessions
  },
  callbacks: {
    async signIn({ user }) {
      // Reject sign-in outright for identities that are not on the allowlist
      return isAdminEmail(user.email);
    },
    async jwt({ token }) {
      // Never persist the Okta access token in the session cookie — the app doesn't need it
      token.isAdmin = isAdminEmail(token.email);
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
};

export class UnauthorizedError extends Error {
  constructor() {
    super("Unauthorized");
    this.name = "UnauthorizedError";
  }
}

/**
 * Re-verify the caller inside every Server Action and mutating Route Handler.
 * Proxy only guards page navigation — actions and API routes are reachable by direct POST.
 */
export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    throw new UnauthorizedError();
  }
  return session;
}

/** For Route Handlers: returns a 401 response when the caller is not an admin, otherwise null. */
export async function adminGuard(): Promise<Response | null> {
  try {
    await requireAdmin();
    return null;
  } catch {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
}
