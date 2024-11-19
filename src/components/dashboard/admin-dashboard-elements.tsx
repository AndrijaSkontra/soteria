import clsx from "clsx";
import AdminView from "@/components/dashboard/admin-view";
import { Separator } from "@/components/ui/separator";

export default function AdminDashboardElements({
  isAdmin,
}: {
  isAdmin: boolean;
}) {
  return (
    <div className={clsx("space-y-6 mb-12", !isAdmin && "hidden mb-0")}>
      <div>
        <p className="text-sm text-muted-foreground">Admin</p>
        <Separator />
      </div>
      <AdminView />
    </div>
  );
}
