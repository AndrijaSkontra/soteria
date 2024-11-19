import TasksByStatus from "@/components/dashboard/task-by-status";
import InspectorLoad from "@/components/dashboard/inspector-load";
import AdminView from "@/components/dashboard/admin-view";
import { Role } from "@prisma/client";
import { getUserRolesForOrganisation } from "@/lib/services/organisation-service";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import AdminDashboardElements from "@/components/dashboard/admin-dashboard-elements";
import ManagerDashboardElements from "@/components/dashboard/manager-dashboard-elements";
import InspectorDashboardElements from "@/components/dashboard/inspector-dashboard-elements";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ organisationId: string }>;
}) {
  const { organisationId } = await params;

  const roles: Role[] = await getUserRolesForOrganisation(organisationId);

  return (
    <div className="p-4 lg:w-[calc(100vw-18rem)]">
      <AdminDashboardElements isAdmin={roles.includes("ADMIN")} />
      <ManagerDashboardElements isManager={roles.includes("MANAGER")} />
      <InspectorDashboardElements isInspector={roles.includes("INSPECTOR")} />
    </div>
  );
}
