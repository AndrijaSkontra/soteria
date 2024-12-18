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
  name?: string;
  address?: string;
  oib?: string;
  contact?: string;
  email?: string;
  country?: string;
};

type CreateSubjectDTO = {
  name: string;
  address?: string;
  contact?: string;
  country?: string;
  oib?: string;
  email?: string;
};

type SubjectSearchParams = Promise<{
  search: string;
  page: number;
  rows: number;
  advSearch: string;
  name: string;
  email: string;
  address: string;
  oib: string;
  contact: string;
  country: string;
  from: string;
  to: string;
}>;

//
// type SubjectFormState = {
//   status: "ADDED" | "PENDING";
//   subjectName?: string;
//   errors: any;
// };
