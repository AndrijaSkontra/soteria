import { auth } from "@/auth";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUserOrganisations } from "@/lib/data_access";
import { Organisation } from "@/types";
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

// <div className="p-4 bg-gray-200 dark:bg-gray-800 space-y-4">
//   <OrganisationSelect organisations={userOrganisations} />
//   <LanguageSwitcher />
//   <DarkModeButton />
// </div>

// <form
//   action={async () => {
//     "use server";
//     await signOut();
//   }}
// >
//   <Button type="submit" className="fixed bottom-2 left-2">
//     Sign Out
//   </Button>
// </form>
