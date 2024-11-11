import Credentials from "next-auth/providers/credentials";
import prisma from "@/index";
import { User } from "@/types/user";
import NextAuth, { type DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    createdAt: Date;
    active: boolean;
  }

  interface Session {
    user: {
      address: string;
      email: string;
      createdAt: Date;
      active: boolean;
      userId: string;
    } & DefaultSession["user"];
  }
}
declare module "@auth/core/types" {
  interface User {
    createdAt: Date;
    active: boolean;
  }

  interface Session {
    user: {
      address: string;
      email: string;
      createdAt: Date;
      active: boolean;
      userId: string;
    } & DefaultSession["user"];
  }

  interface JWT {
    email?: string | null;
    createdAt?: Date;
    active?: boolean;
    id?: string;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const user: User = await getUserFromDb(
          credentials.email as string,
          credentials.password as string,
        );

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.createdAt = user.createdAt;
        token.active = user.active;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      const newSession = {
        ...session,
        user: {
          ...session.user,
          email: session.user.email,
          address: session.user.address || "",
          createdAt: new Date(token.createdAt as Date),
          active: Boolean(token.active),
          userId: String(token.id),
        },
      };
      return newSession;
    },
  },
  pages: {
    signIn: "/",
  },
});

async function getUserFromDb(email: string, password: string): Promise<User> {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: password,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      active: true,
    },
  });

  if (!user) {
    throw Error("No user");
  }

  const newUser: User = { ...user, userId: user.id };
  return newUser;
}
