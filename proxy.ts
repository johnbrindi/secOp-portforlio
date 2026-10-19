import { withAuth } from "next-auth/middleware";

// Gatekeeper for the admin dashboard pages. Server Actions and API routes
// re-verify the session themselves (see requireAdmin in lib/auth.ts).
export default withAuth({
  callbacks: {
    authorized: ({ token }) => token?.isAdmin === true,
  },
});

export const config = {
  matcher: ["/admin/:path*"],
};
