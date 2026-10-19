import { getServerSession, type NextAuthOptions } from "next-auth";
import OktaProvider from "next-auth/providers/okta";

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
