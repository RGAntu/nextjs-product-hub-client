import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

export const {
  handlers,   // { GET, POST } for the route handler
  auth,       // server helper (optional use elsewhere)
  signIn,     // server signIn (optional)
  signOut,    // server signOut (optional)
} = NextAuth({
  // Recommended when running behind a proxy/container; or set AUTH_TRUST_HOST=true in env
  trustHost: true,

  session: { strategy: "jwt" },

  pages: {
    signIn: "/login", // custom login page
  },

  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    // Simple demo credentials provider (replace with your DB check)
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { email, password } = credentials;

        // Demo only: replace with real DB lookup + password verify
        if (
          email === process.env.DEMO_EMAIL &&
          password === process.env.DEMO_PASSWORD
        ) {
          return { id: "1", name: "Demo User", email };
        }
        return null; // invalid creds
      },
    }),
  ],

  callbacks: {
    // Always send users to /products after login
    async redirect() {
      return "/products";
    },
    async session({ session, token }) {
      if (token?.sub) session.user = { ...session.user, id: token.sub };
      return session;
    },
  },

  // Use AUTH_SECRET (preferred) or NEXTAUTH_SECRET
  secret: process.env.AUTH_SECRET,
});
