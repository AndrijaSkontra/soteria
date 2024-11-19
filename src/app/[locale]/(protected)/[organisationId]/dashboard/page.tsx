import { IoBasketballOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { FaPerson } from "react-icons/fa6";
import AdminViewCard from "@/components/dashboard/admin-view-card";
import TasksByStatus from "@/components/dashboard/task-by-status";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ organisationId: string }>;
}) {
  console.log(params);
  return (
    <div className="p-4">
      <div className="flex space-x-4 p-2">
        <AdminViewCard
          title="Personnel"
          dataNumber={5}
          buttonText="+ Invite"
          icon={<BsPeople />}
        />
        <AdminViewCard
          title="Playgrounds"
          dataNumber={15}
          buttonText="+ Playgrounds"
          icon={<IoBasketballOutline />}
        />
        <AdminViewCard
          title="Subjects"
          dataNumber={8}
          buttonText="+ Subjects"
          icon={<FaPerson />}
        />
      </div>
      <TasksByStatus />
    </div>
  );
}
