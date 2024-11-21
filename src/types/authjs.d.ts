import { type DefaultSession } from "next-auth";

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
    } & DefaultSession["user"];
  }
}
