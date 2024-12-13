import { Role } from "@prisma/client";

import Header from "@/components/header/header";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { allLinks } from "@/lib/constants/links";
import {
  checkIsOrganisationValid,
  getOrganisationById,
  getUserOrganisationRoles,
  getUserOrganisationsWithRoles,
} from "@/lib/services/organisation-service";
import { linksToShowOnUI } from "@/lib/utils";
import { Organisation, OrganisationWithRoles, RouteParams } from "@/types/app-types";

export default async function OrganisationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: RouteParams;
}) {
  const { organisationId } = await params;

  await checkIsOrganisationValid(organisationId);

  const userOrganisationsWithRoles: OrganisationWithRoles[] = await getUserOrganisationsWithRoles();

  const activeOrganisation: Organisation = await getOrganisationById(organisationId);

  const roles = getUserOrganisationRoles(activeOrganisation, userOrganisationsWithRoles);

  return (
    <SidebarProvider>
      <AppSidebar
        organisationsWithRoles={userOrganisationsWithRoles}
        activeOrganisation={activeOrganisation}
        navigationLinks={linksToShowOnUI(roles, allLinks)}
      />
      <SidebarInset>
        <Header organisationName={activeOrganisation.name} />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
