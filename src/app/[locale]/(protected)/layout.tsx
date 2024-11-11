import { auth, signOut } from "@/auth";
import DarkModeButton from "@/components/dark-mode-button";
import LanguageSwitcher from "@/components/language-switcher";
import OrganisationSelect from "@/components/organisation-select";
import { Button } from "@/components/ui/button";
import { getUserOrganisations } from "@/lib/data_access";
import { Organisation } from "@/types";
import { redirect } from "next/navigation";

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
    <div>
      <div className="p-4 bg-gray-200 dark:bg-gray-800 space-y-4">
        <OrganisationSelect organisations={userOrganisations} />
        <LanguageSwitcher />
        <DarkModeButton />
      </div>
      <div>{children}</div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit" className="fixed bottom-2 left-2">
          Sign Out
        </Button>
      </form>
    </div>
  );
}
