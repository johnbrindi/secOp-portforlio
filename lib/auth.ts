import { getServerSession, type NextAuthOptions } from "next-auth";
import OktaProvider from "next-auth/providers/okta";
import CredentialsProvider from "next-auth/providers/credentials";
import { rateLimit } from "@/lib/rate-limit";
import { authenticate, isAdmin } from "@/lib/admin-users";

/**
 * Admins are the accounts in the admin_users table (lib/admin-users.ts). Signing in
 * with Okta is not enough on its own: the Okta email must also have a row there.
 * No rows means nobody is authorized (fail closed).
 */
export { isAdmin };

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
    // Email + password from the admin_users table; works without Okta.
    CredentialsProvider({
      id: "password",
      name: "email and password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Errors thrown here reach /login as ?error=<message>; keep them free of account details.
        const email = credentials?.email?.trim().toLowerCase();
        if (!email || !credentials?.password) return null;
        const forwarded = req?.headers?.["x-forwarded-for"];
        const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded || "").split(",")[0].trim() || "unknown";
        // Per-IP speed bump; the per-account lockout in authenticate() is stored in the database.
        if (!rateLimit(`login:${ip}`, 10, 15 * 60_000).ok) throw new Error("TooManyAttempts");
        const admin = await authenticate(email, credentials.password);
        return admin ? { id: admin, email: admin, name: "Admin" } : null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8, // 8h admin sessions
  },
  callbacks: {
    async signIn({ user }) {
      // Reject sign-in outright for identities without an admin account
      return isAdmin(user.email);
    },
    async jwt({ token, user }) {
      // Checked at sign-in only; pages and actions re-check the database (requireAdmin).
      // Never persist the Okta access token in the session cookie — the app doesn't need it
      if (user) token.isAdmin = await isAdmin(token.email);
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
  if (!session?.user?.email || !(await isAdmin(session.user.email))) {
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
