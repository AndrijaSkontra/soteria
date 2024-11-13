import { Role } from "@prisma/client";
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
      userId: string;
    } & DefaultSession["user"];
  }
}

type Organisation = {
  id: string;
  name: string;
  createdAt: Date;
  active: boolean;
  url: string;
};

type OrganisationWithRoles = {
  organisation: Organisation;
  role: Role[];
};
//
// enum Role {
//   ADMIN,
//   MANAGER,
//   INSPECTOR,
// }

type RouteParams = Promise<{ locale: string; organisationId: string }>;

type User = {
  email: string;
  createdAt: Date;
  active: boolean;
  userId: string;
};

type Session = {
  user: User;
  expires: Date;
};

type NavigationLinkType = {
  title: string;
  url: string;
  icon: any;
};
