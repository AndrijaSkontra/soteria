import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import InstructorTaskTable from "./inspector-task-table";
import clsx from "clsx";

import { Separator } from "@/components/ui/separator";

export default function InspectorDashboardElements({ isInspector }: { isInspector: boolean }) {
  return (
    <div className={clsx("space-y-6 mb-12", !isInspector && "hidden mb-0")}>
      <div>
        <p className="text-sm text-muted-foreground">Inspector</p>
        <Separator />
      </div>
      <div className="flex flex-col space-y-6 lg:flex-row lg:space-y-0 lg:space-x-6 lg:justify-stretch w-full">
        <Card className="grow">
          <CardHeader>
            <CardTitle>Inspector Assigned Tasks</CardTitle>
            <CardDescription>Optional description about instructor tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <InstructorTaskTable />
          </CardContent>
        </Card>
        <Card className="grow">
          <CardHeader>
            <CardTitle>In Progress Tasks</CardTitle>
            <CardDescription>Optional description about instructor tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <InstructorTaskTable />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
