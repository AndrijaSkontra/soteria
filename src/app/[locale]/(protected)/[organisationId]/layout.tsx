import { SidebarProvider } from "@/components/ui/sidebar";
import {
  doesOrganisationExist,
  getOrganisationById,
  getUserOrganisationsWithRoles,
} from "@/lib/services/organisation-service";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import SidebarTriggerMobile from "@/components/sidebar/sidebar-trigger-mobile";
import { isUserInOrganisation } from "@/lib/services/user-service";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import { Role } from "@prisma/client";
import {
  NavigationLinkType,
  Organisation,
  OrganisationWithRoles,
  RouteParams,
} from "@/types/app-types";
import { allLinks } from "@/lib/constants/links";

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

  const roles = getActiveOrganisationRoles(
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
      <main>
        <SidebarTriggerMobile />
        {children}
      </main>
    </SidebarProvider>
  );
}

async function checkIsOrganisationValid(organisationId: string) {
  const isOrganisationPageValid =
    (await doesOrganisationExist(organisationId)) &&
    (await isUserInOrganisation(organisationId));

  if (!isOrganisationPageValid) {
    const locale = await getLocale();
    redirect({ href: "select-organisation", locale: locale });
  }
}

function getActiveOrganisationRoles(
  activeOrg: Organisation,
  userOrgWithRoles: OrganisationWithRoles[],
) {
  const roles: Role[] | undefined = userOrgWithRoles.find(
    (uo) => uo.organisation.id === activeOrg.id,
  )?.role;
  if (roles) {
    return roles;
  } else {
    throw Error("No roles connected to current user");
  }
}

function linksToShowOnUI(
  roles: Role[],
  links: NavigationLinkType[],
): NavigationLinkType[] {
  let finalLinks: NavigationLinkType[] = [];

  // Keep in mind Object.keys(Role) will return the lenght of Enum Role
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
