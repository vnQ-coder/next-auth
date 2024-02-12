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
  avatar?: string | null;
};

export const authOptions: AuthOptions = {
  //   pages: {
  //     signIn: "/en/login",
  //   },
  callbacks: {
    async signIn({ user }: any) {
      dbConnection();
      try {
        const findUser = await UserModel.findOne({ email: user.email }).select(
          "firstName lastName email"
        );
        if (findUser) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.log("The error is ", error);
        return false;
      }
    },
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
      name: "Welcome Back",
      type: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials, "credentials");
        // * Connect to the MongoDb
        dbConnection();
        const user = await UserModel.findOne({ email: credentials?.email });
        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
