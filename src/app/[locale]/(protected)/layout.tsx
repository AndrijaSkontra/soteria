import { auth } from "@/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUserOrganisations } from "@/lib/services/organisation-service";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import SidebarTriggerMobile from "@/components/sidebar-trigger-mobile";
import { cookies } from "next/headers";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) {
    redirect("/");
  }

  const userOrganisations: Organisation[] = await getUserOrganisations(
    session.user.userId,
  );

  const activeOrganisationId =
    (await cookies()).get("active-organisation")?.value ||
    userOrganisations[0]?.id ||
    "this user doesn't have a organisation"; //  TODO: handle use case when user doesn't have org?

  return (
    <SidebarProvider>
      <AppSidebar
        organisations={userOrganisations}
        activeOrganisationId={activeOrganisationId}
      />
      <main>
        <SidebarTriggerMobile />
        {children}
      </main>
    </SidebarProvider>
  );
}
