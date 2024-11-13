import { SidebarProvider } from "@/components/ui/sidebar";
import {
  doesOrganisationExist,
  getOrganisationById,
  getUserOrganisationsWithRoles,
} from "@/lib/services/organisation-service";
import { AppSidebar } from "@/components/app-sidebar";
import SidebarTriggerMobile from "@/components/sidebar-trigger-mobile";
import { auth } from "@/auth";
import { isUserInOrganisation } from "@/lib/services/user-service";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import { Organisation, OrganisationWithRoles } from "@/app-types";

export default async function OrganisationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: RouteParams;
}) {
  const { organisationId } = await params;

  const session = await auth();

  const isOrganisationPageValid =
    (await doesOrganisationExist(organisationId)) &&
    (await isUserInOrganisation(organisationId, session!.user.userId));

  if (!isOrganisationPageValid) {
    const locale = await getLocale();
    redirect({ href: "select-organisation", locale: locale });
  }

  const userOrganisationsWithRoles: OrganisationWithRoles[] =
    await getUserOrganisationsWithRoles();

  const activeOrganisationId: string = organisationId;

  const activeOrganisation: Organisation =
    await getOrganisationById(activeOrganisationId);

  return (
    <SidebarProvider>
      <AppSidebar
        organisationsWithRoles={userOrganisationsWithRoles}
        activeOrganisation={activeOrganisation}
      />
      <main>
        <SidebarTriggerMobile />
        {children}
      </main>
    </SidebarProvider>
  );
}
