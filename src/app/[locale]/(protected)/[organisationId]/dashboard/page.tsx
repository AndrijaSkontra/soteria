import { getOrganisationById } from "@/lib/services/organisation-service";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ organisationId: string }>;
}) {
  const organisation = await getOrganisationById((await params).organisationId);
  return (
    <div>
      <h1 className="text-xl font-semibold">{organisation.name}</h1>
    </div>
  );
}
