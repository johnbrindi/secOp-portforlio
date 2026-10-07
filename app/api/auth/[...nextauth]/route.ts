import NextAuth, { NextAuthOptions } from "next-auth";
import OktaProvider from "next-auth/providers/okta";

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
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      return session;
    },
  },
  pages: {
    // We can define a custom sign-in page here if needed, but the default Okta redirect is fine
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
