"use client";

import { IoDocumentTextOutline } from "react-icons/io5";
import { MdOutlineTask } from "react-icons/md";
import { GrTask } from "react-icons/gr";
import { FaRegNewspaper } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineSimCardAlert } from "react-icons/md";
import { IoBasketballOutline } from "react-icons/io5";
import { MdOutlineSubject } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { SidebarMenu } from "@/components/ui/sidebar";
import AdministrationLinks from "@/components/administration-links";
import AdministrationLink from "./administration-link";
import NavigationLink from "./navigation-link";
import { useParams } from "next/navigation";

export function MainNavigation() {
  const { organisationId } = useParams();

  return (
    <SidebarMenu>
      {basicLinks.map((basicLink, index) => {
        return (
          <NavigationLink
            key={index}
            icon={basicLink.icon}
            title={basicLink.title}
            url={`/${organisationId}/${basicLink.url}`}
          />
        );
      })}
      <AdministrationLinks>
        {administrationLinks.map((admLink, index) => {
          return (
            <AdministrationLink
              key={index}
              icon={admLink.icon}
              title={admLink.title}
              url={`/${organisationId}/administration/${admLink.url}`}
            />
          );
        })}
      </AdministrationLinks>
    </SidebarMenu>
  );
}

const administrationLinks: NavigationLinkType[] = [
  {
    title: "Personel",
    url: `personnel`,
    icon: <BsPeople className="max-h-3" />,
  },
  {
    title: "Subjects",
    url: "subject",
    icon: <MdOutlineSubject className="max-h-3" />,
  },
  {
    title: "Playgrounds",
    url: "playground",
    icon: <IoBasketballOutline className="max-h-3" />,
  },
  {
    title: "Non complience",
    url: "non-complience",
    icon: <MdOutlineSimCardAlert className="max-h-3" />,
  },
];

const basicLinks: NavigationLinkType[] = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: <RxDashboard />,
  },
  {
    title: "Orders",
    url: "orders",
    icon: <FaRegNewspaper />,
  },
  {
    title: "Tasks",
    url: "tasks",
    icon: <MdOutlineTask />,
  },
  {
    title: "My Tasks",
    url: "my-tasks",
    icon: <GrTask />,
  },
  {
    title: "Documentation",
    url: "documentation",
    icon: <IoDocumentTextOutline />,
  },
];
