import TasksByStatus from "@/components/dashboard/task-by-status";
import InspectorLoad from "@/components/dashboard/inspector-load";
import AdminView from "@/components/dashboard/admin-view";

export default async function DashboardPage() {
  //   {
  //   params,
  // }: {
  //   params: Promise<{ organisationId: string }>;
  // }
  return (
    <div className="p-4 flex flex-col justify-start items-start">
      <AdminView />
      <TasksByStatus />
      <div className="mt-2">
        <InspectorLoad />
      </div>
    </div>
  );
}
