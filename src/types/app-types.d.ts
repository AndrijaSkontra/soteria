import { Role } from "@prisma/client";

type RouteParams = Promise<{ locale: string; organisationId: string }>;

type NavigationLinkType = {
  title: string;
  url: string;
  icon?: any;
  roles?: Role[];
  type?: "BASIC" | "ADMINISTRATION";
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

type AdminViewCardDataType = {
  title: string;
  dataNumber: number;
  buttonText: string;
  icon: React.ReactNode;
};

type AdvancedSubjectSearch = {
  id?: string;
  name?: string;
  address?: string;
  oib?: string;
  phone?: string;
  email?: string;
  country?: string;
};

type CreateSubjectDTO = {
  name: string;
  address?: string;
  contact?: string;
  oib?: string;
  email?: string;
};
