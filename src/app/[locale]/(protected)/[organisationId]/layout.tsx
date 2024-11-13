import { SidebarProvider } from "@/components/ui/sidebar";
import {
  doesOrganisationExist,
  getOrganisationById,
  getUserOrganisations,
} from "@/lib/services/organisation-service";
import { AppSidebar } from "@/components/app-sidebar";
import SidebarTriggerMobile from "@/components/sidebar-trigger-mobile";
import { cookies } from "next/headers";
import { auth } from "@/auth";
import { isUserInOrganisation } from "@/lib/services/user-service";
import { redirect } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export default async function OrganisationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: RouteParams;
}) {
  const organisationId: string = (await params).organisationId;
  const session = await auth();

  const isOrganisationPageValid =
    (await doesOrganisationExist(organisationId)) &&
    (await isUserInOrganisation(organisationId, session!.user.userId));

  if (!isOrganisationPageValid) {
    const locale = await getLocale();
    redirect({ href: "select-organisation", locale: locale });
  }

  const userOrganisations: Organisation[] = await getUserOrganisations();

  const activeOrganisationId: string =
    (await cookies()).get("active-organisation")?.value ||
    userOrganisations[0]?.id;

  const activeOrganisation = await getOrganisationById(activeOrganisationId);

  return (
    <SidebarProvider>
      <AppSidebar
        organisations={userOrganisations}
        activeOrganisation={activeOrganisation}
      />
      <main>
        <SidebarTriggerMobile />
        {children}
      </main>
    </SidebarProvider>
  );
}
