import { Role } from "@prisma/client";

import AdminDashboardElements from "@/components/dashboard/admin-dashboard-elements";
import InspectorDashboardElements from "@/components/dashboard/inspector-dashboard-elements";
import ManagerDashboardElements from "@/components/dashboard/manager-dashboard-elements";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getUserOrganisationRolesFromDB } from "@/lib/services/organisation-service";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ organisationId: string }>;
}) {
  const { organisationId } = await params;

  const roles: Role[] = await getUserOrganisationRolesFromDB(organisationId);

  return (
    <div className="px-4 lg:px-32">
      <div className="flex w-full justify-end sticky top-4 z-50">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="This Month" defaultValue="This Month" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="This Week">This Week</SelectItem>
              <SelectItem value="This Month">This Month</SelectItem>
              <SelectItem value="This Year">This Year</SelectItem>
              <SelectItem value="All Time">All Time</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <ManagerDashboardElements isManager={roles.includes("MANAGER")} />
      <InspectorDashboardElements isInspector={roles.includes("INSPECTOR")} />
      <AdminDashboardElements isAdmin={roles.includes("ADMIN")} />
    </div>
  );
}
