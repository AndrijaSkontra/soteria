import { IoBasketballOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { FaPerson } from "react-icons/fa6";
import AdminViewCard from "@/components/dashboard/admin-view-card";

export default async function DashboardPage({
  params,
}: {
  params: Promise<{ organisationId: string }>;
}) {
  console.log(params);
  return (
    <div className="flex space-x-4 p-4">
      <AdminViewCard
        title="Personnel"
        dataNumber={5}
        buttonText="+ Invite"
        icon={<BsPeople className="max-h-3" />}
      />
      <AdminViewCard
        title="Playgrounds"
        dataNumber={15}
        buttonText="+ Playgrounds"
        icon={<IoBasketballOutline className="max-h-3" />}
      />
      <AdminViewCard
        title="Subjects"
        dataNumber={8}
        buttonText="+ Subjects"
        icon={<FaPerson className="max-h-3" />}
      />
    </div>
  );
}
