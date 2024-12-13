import { Role } from "@prisma/client";

import PermissionDenied from "@/components/ui/permission-denied";
import { getUserOrganisationRolesFromDB } from "@/lib/services/organisation-service";
import { RouteParams } from "@/types/app-types";

type AdminLayoutProps = {
  children: React.ReactNode;
  params: RouteParams;
};

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const orgId = (await params).organisationId;
  const roles: Role[] = await getUserOrganisationRolesFromDB(orgId);

  const isAllowed = roles.includes(Role.ADMIN) || roles.includes(Role.MANAGER);

  if (!isAllowed) {
    return <PermissionDenied />;
  }

  return <div>{children}</div>;
}
