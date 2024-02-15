import { dbConnection } from "@/database";
import Credentials from "next-auth/providers/credentials";
import { AuthOptions, ISODateString, User } from "next-auth";
import UserModel from "@/models/User";
import { JWT } from "next-auth/jwt";

export type CustomSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
  role?: string | null;
  picture?: string | null;
  type?: string | null;
  isVerified?: boolean | null;
  isMember?: boolean | null;
  suspended?: boolean | null;
};

export const authOptions: AuthOptions = {
  pages: {
    signIn: "/en/login",
  },
  session: { maxAge: 1440 },
  jwt: {
    maxAge: 1440,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: CustomUser }) {
      if (user) {
        user.role = user?.role == null ? "User" : user?.role;
        token.user = user;
      }
      return token;
    },
    async session({
      session,
      token,
      user,
    }: {
      session: CustomSession;
      token: JWT;
      user: User;
    }) {
      session.user = token.user as CustomUser;
      return session;
    },
  },
  providers: [
    Credentials({
      name: "",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          dbConnection();
          const user = await UserModel.findOne({
            email: credentials?.email,
          });
          return user ? user.toProfile() : null;
        } catch (error) {
          console.error("Error during authorization:", error);
          return null;
        }
      },
    }),
  ],
};
