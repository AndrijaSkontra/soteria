import { OrganisationWithRoles } from "@/app-types";
import SelectOrganisation from "@/components/select-organisation";
import { getUserOrganisationsWithRoles } from "@/lib/services/organisation-service";

export default async function OrganisationSelectPage() {
  const userOrganisationsWithRoles: OrganisationWithRoles[] =
    await getUserOrganisationsWithRoles();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100">
        <SelectOrganisation
          organisationsWithRoles={userOrganisationsWithRoles}
        />
      </div>
    </>
  );
}
