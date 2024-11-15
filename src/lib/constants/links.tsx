import { FaPerson } from "react-icons/fa6";
import { CgOrganisation } from "react-icons/cg";
import { MdOutlineTask } from "react-icons/md";
import { GrTask } from "react-icons/gr";
import { FaRegNewspaper } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineSimCardAlert } from "react-icons/md";
import { IoBasketballOutline, IoDocumentTextOutline } from "react-icons/io5";
import { BsPeople } from "react-icons/bs";
import { NavigationLinkType } from "@/types/app-types";

export const allLinks: NavigationLinkType[] = [
  {
    title: "Personnel",
    url: `personnel`,
    icon: <BsPeople className="max-h-3" />,
    roles: ["ADMIN", "MANAGER"],
    type: "ADMINISTRATION",
  },
  {
    title: "Subjects",
    url: "subject",
    icon: <FaPerson className="max-h-3" />,
    roles: ["ADMIN", "MANAGER"],
    type: "ADMINISTRATION",
  },
  {
    title: "Playgrounds",
    url: "playground",
    icon: <IoBasketballOutline className="max-h-3" />,
    roles: ["ADMIN", "MANAGER"],
    type: "ADMINISTRATION",
  },
  {
    title: "Non complience",
    url: "non-complience",
    icon: <MdOutlineSimCardAlert className="max-h-3" />,
    roles: ["ADMIN", "MANAGER"],
    type: "ADMINISTRATION",
  },
  {
    title: "Dashboard",
    url: "dashboard",
    icon: <RxDashboard />,
    roles: ["ADMIN", "MANAGER", "INSPECTOR"],
    type: "BASIC",
  },
  {
    title: "Orders",
    url: "orders",
    icon: <FaRegNewspaper />,
    roles: ["MANAGER"],
    type: "BASIC",
  },
  {
    title: "Tasks",
    url: "tasks",
    icon: <MdOutlineTask />,
    roles: ["INSPECTOR", "MANAGER"],
    type: "BASIC",
  },
  {
    title: "My Tasks",
    url: "my-tasks",
    icon: <GrTask />,
    roles: ["INSPECTOR"],
    type: "BASIC",
  },
  {
    title: "Organisation",
    url: "#",
    icon: <CgOrganisation />,
    roles: ["ADMIN", "MANAGER", "INSPECTOR"],
    type: "BASIC",
  },
  {
    title: "Documentation",
    url: "documentation",
    icon: <IoDocumentTextOutline />,
    roles: ["ADMIN", "MANAGER", "INSPECTOR"],
    type: "BASIC",
  },
];
