import { getUserOrganisationRolesFromDB } from "@/lib/services/organisation-service";
import { RouteParams } from "@/types/app-types";
import { Role } from "@prisma/client";

type AdminLayoutProps = {
  children: React.ReactNode;
  params: RouteParams;
};

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const orgId = (await params).organisationId;
  const roles: Role[] = await getUserOrganisationRolesFromDB(orgId);

  const isAdmin = roles.includes(Role.ADMIN);

  console.log("IS ADMIN: " + !!isAdmin);

  if (!isAdmin) {
    return <div>Persmission denied</div>;
  }

  return <div>{children}</div>;
}
