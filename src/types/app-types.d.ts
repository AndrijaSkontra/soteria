import { Role } from "@prisma/client";

type RouteParams = Promise<{ locale: string; organisationId: string }>;

// type Session = {
//   user: User;
//   expires: Date;
// };
//
type NavigationLinkType = {
  title: string;
  url: string;
  icon: any;
  roles: Role[];
  type: "BASIC" | "ADMINISTRATION";
};

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

type UserInformationType = {
  email: string;
  contactNumber: string;
  firstName: string;
  lastName: string;
};

type User = {};
