import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "@/index";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        user = await getUserFromDb(credentials.email, credentials.password);

        if (!user) {
          throw new Error("Invalid credentials.");
        }

        return user;
      },
    }),
  ],
});

async function getUserFromDb(email, password) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: password,
    },
  });
  console.log(user, "😎");
  return user;
}
