import { SidebarProvider } from "@/components/ui/sidebar";
import {
  doesOrganisationExist,
  getOrganisationById,
  getUserOrganisationsWithRoles,
} from "@/lib/services/organisation-service";
import { AppSidebar } from "@/components/app-sidebar";
import SidebarTriggerMobile from "@/components/sidebar-trigger-mobile";
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

  await checkIsOrganisationValid(organisationId);

  const userOrganisationsWithRoles: OrganisationWithRoles[] =
    await getUserOrganisationsWithRoles();

  const activeOrganisation: Organisation =
    await getOrganisationById(organisationId);

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

async function checkIsOrganisationValid(organisationId: string) {
  const isOrganisationPageValid = (await doesOrganisationExist(organisationId)) &&
    (await isUserInOrganisation(organisationId));

  if (!isOrganisationPageValid) {
    const locale = await getLocale();
    redirect({ href: "select-organisation", locale: locale });
  }
}

