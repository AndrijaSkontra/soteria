import { CgOrganisation } from "react-icons/cg";
import { MdOutlineTask } from "react-icons/md";
import { GrTask } from "react-icons/gr";
import { FaRegNewspaper } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { IoDocumentTextOutline } from "react-icons/io5";
import { NavigationLinkType } from "@/types/app-types";

export const allLinks: NavigationLinkType[] = [
  {
    title: "personnel",
    url: `personnel`,
    roles: ["ADMIN", "MANAGER"],
    type: "ADMINISTRATION",
  },
  {
    title: "subject",
    url: "subject",
    roles: ["ADMIN", "MANAGER"],
    type: "ADMINISTRATION",
  },
  {
    title: "playground",
    url: "playground",
    roles: ["ADMIN", "MANAGER"],
    type: "ADMINISTRATION",
  },
  {
    title: "non-complience",
    url: "non-complience",
    roles: ["ADMIN", "MANAGER"],
    type: "ADMINISTRATION",
  },
  {
    title: "norm",
    url: "norm",
    roles: ["ADMIN", "MANAGER"],
    type: "ADMINISTRATION",
  },
  {
    title: "dashboard",
    url: "dashboard",
    icon: <RxDashboard />,
    roles: ["ADMIN", "MANAGER", "INSPECTOR"],
    type: "BASIC",
  },
  {
    title: "orders",
    url: "orders",
    icon: <FaRegNewspaper />,
    roles: ["MANAGER"],
    type: "BASIC",
  },
  {
    title: "tasks",
    url: "tasks",
    icon: <MdOutlineTask />,
    roles: ["INSPECTOR", "MANAGER"],
    type: "BASIC",
  },
  {
    title: "my-tasks",
    url: "my-tasks",
    icon: <GrTask />,
    roles: ["INSPECTOR"],
    type: "BASIC",
  },
  {
    title: "organisation",
    url: "organisation",
    icon: <CgOrganisation />,
    roles: ["ADMIN", "MANAGER", "INSPECTOR"],
    type: "BASIC",
  },
  {
    title: "documentation",
    url: "documentation",
    icon: <IoDocumentTextOutline />,
    roles: ["ADMIN", "MANAGER", "INSPECTOR"],
    type: "BASIC",
  },
];
