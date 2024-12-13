import { BsPeople } from "react-icons/bs";
import { FaPerson } from "react-icons/fa6";
import { IoBasketballOutline } from "react-icons/io5";

import AdminViewCard from "@/components/dashboard/admin-view-card";

export default function AdminView() {
  return (
    <div
      className="flex flex-col lg:flex-row lg:space-x-4 space-y-4
      lg:space-y-0 mb-2 w-full lg:justify-stretch items-stretch"
    >
      <AdminViewCard title="Personnel" dataNumber={5} buttonText="+ Invite" icon={<BsPeople />} />
      <AdminViewCard
        title="Playgrounds"
        dataNumber={15}
        buttonText="+ Playgrounds"
        icon={<IoBasketballOutline />}
      />
      <AdminViewCard title="Subjects" dataNumber={8} buttonText="+ Subjects" icon={<FaPerson />} />
    </div>
  );
}
