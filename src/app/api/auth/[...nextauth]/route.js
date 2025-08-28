import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);

        // TODO: Replace with real DB check
        if (credentials.email === "admin@test.com" && credentials.password === "123456") {
          return {
            id: "1",
            name: "Admin User",
            email: credentials.email,
          };
        }

        // If login fails
        return null;
      },
    }),
  ],

  // JWT strategy for sessions
  session: {
    strategy: "jwt",
  },

  // Add custom login page
  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
