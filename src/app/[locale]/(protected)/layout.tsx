import { auth } from "@/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUserOrganisations } from "@/lib/organisation-service";
import { redirect } from "next/navigation";
import { AppSidebar } from "@/components/app-sidebar";
import SidebarTriggerMobile from "@/components/sidebar-trigger-mobile";

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

  return (
    <SidebarProvider>
      <AppSidebar organisations={userOrganisations} />
      <main>
        <SidebarTriggerMobile />
        {children}
      </main>
    </SidebarProvider>
  );
}
