import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/data-access/user";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "user",
      name: "user",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;

          const existingUser = await loginUser({
            email: credentials.email,
            password: credentials.password,
          });

          if (!existingUser) throw { error: true };

          return {
            ...existingUser,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token, trigger, session }) => {
      if (user) {
        // When the user signs in, attach the accessToken and other claims
        token.accessToken = user.accessToken;

        token.roles = user.roles;

        return {
          ...token,
          ...user,
        };
      }

      if (trigger === "update") {
        return { ...token, ...session.user };
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.sub; // Maps to ClaimTypes.NameIdentifier
      session.user.roles = token.roles; // Add roles to session
      //   session.accessToken = token.accessToken;

      return {
        ...session,

        user: {
          ...session.user,
          ...token,
        },
      };
    },
  },
};
