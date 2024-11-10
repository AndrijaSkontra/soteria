import { auth, signOut } from "@/auth";
import OrganisationSelect from "@/components/organisation-select";
import { Button } from "@/components/ui/button";
import prisma from "@/index";
import { Organisation } from "@/types/organisation";
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
      <div className="p-4 bg-gray-200">
        <OrganisationSelect organisations={userOrganisations} />
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

async function getUserOrganisations(userId: string): Promise<Organisation[]> {
  const organisationUserRecords = await prisma.organisationUser.findMany({
    where: { userId },
    select: { organisationId: true },
  });

  const organisationIds = organisationUserRecords.map(
    (record) => record.organisationId,
  );

  const organisations = await prisma.organisation.findMany({
    where: {
      id: { in: organisationIds },
    },
  });

  return organisations;
}
