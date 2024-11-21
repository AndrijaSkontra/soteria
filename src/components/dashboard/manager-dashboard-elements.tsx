import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import TasksByStatus from "@/components/dashboard/task-by-status";
import InspectorLoad from "@/components/dashboard/inspector-load";

export default function ManagerDashboardElements({
  isManager,
}: {
  isManager: boolean;
}) {
  return (
    <div
      className={clsx("w-full space-y-6 mb-12", !isManager && "hidden mb-0")}
    >
      <div className="w-full">
        <p className="text-sm text-muted-foreground">Manage</p>
        <Separator />
      </div>
      <TasksByStatus />
      <InspectorLoad />
    </div>
  );
}
