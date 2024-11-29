import SelectOrganisation from "@/components/select-organisation/select-organisation";
import { getUserOrganisationsWithRoles } from "@/lib/services/organisation-service";
import { OrganisationWithRoles } from "@/types/app-types";

export default async function OrganisationSelectPage() {
  const userOrganisationsWithRoles: OrganisationWithRoles[] =
    await getUserOrganisationsWithRoles();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100 dark:bg-[#0a0a0a]">
        <SelectOrganisation
          organisationsWithRoles={userOrganisationsWithRoles}
        />
      </div>
    </>
  );
}
