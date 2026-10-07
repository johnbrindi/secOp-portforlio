import { withAuth } from "next-auth/middleware";

// This exports the default NextAuth middleware object, which protects all matched routes.
export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      // Return true if the user has a valid token (is authenticated)
      return !!token;
    },
  },
});

export const config = {
  // Protect the admin dashboard and all of its sub-routes
  matcher: ["/admin/:path*"],
};
