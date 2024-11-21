import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  checkIsOrganisationValid,
  getUserOrganisationRoles,
  getOrganisationById,
  getUserOrganisationsWithRoles,
} from "@/lib/services/organisation-service";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { Role } from "@prisma/client";
import {
  NavigationLinkType,
  Organisation,
  OrganisationWithRoles,
  RouteParams,
} from "@/types/app-types";
import { allLinks } from "@/lib/constants/links";
import Header from "@/components/header/header";

export default async function OrganisationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: RouteParams;
}) {
  const { organisationId } = await params;

  await checkIsOrganisationValid(organisationId);

  const userOrganisationsWithRoles: OrganisationWithRoles[] =
    await getUserOrganisationsWithRoles();

  const activeOrganisation: Organisation =
    await getOrganisationById(organisationId);

  const roles = getUserOrganisationRoles(
    activeOrganisation,
    userOrganisationsWithRoles,
  );

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

function linksToShowOnUI(
  roles: Role[],
  links: NavigationLinkType[],
): NavigationLinkType[] {
  let finalLinks: NavigationLinkType[] = [];

  // Object.keys(Role) will return the lenght of Enum Role
  // If they are the same size just return all links
  if (roles.length === Object.keys(Role).length) {
    return links;
  }

  if (roles.includes(Role.INSPECTOR)) {
    finalLinks = links.filter((link) => link.roles.includes(Role.INSPECTOR));
  }

  if (roles.includes(Role.ADMIN)) {
    finalLinks = links.filter((link) => link.roles.includes(Role.ADMIN));
  }

  if (roles.includes(Role.MANAGER)) {
    finalLinks = links.filter((link) => link.roles.includes(Role.MANAGER));
  }

  finalLinks = Array.from(new Set(finalLinks));

  return finalLinks;
}
