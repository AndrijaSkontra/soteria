import clsx from "clsx";
import { Separator } from "@/components/ui/separator";

export default function InspectorDashboardElements({
  isInspector,
}: {
  isInspector: boolean;
}) {
  return (
    <div className={clsx("space-y-6 mb-12", !isInspector && "hidden mb-0")}>
      <div>
        <p className="text-sm text-muted-foreground">Inspector</p>
        <Separator />
      </div>
    </div>
  );
}
