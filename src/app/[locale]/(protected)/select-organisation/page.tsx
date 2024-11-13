import SelectOrganisation from "@/components/select-organisation";
import { getUserOrganisations } from "@/lib/services/organisation-service";

export default async function OrganisationSelectPage() {
  const userOrganisations: any = await getUserOrganisations();
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen w-screen bg-gray-100">
        <SelectOrganisation organisations={userOrganisations} />
      </div>
    </>
  );
}
