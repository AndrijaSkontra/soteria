import { ChevronRight } from "lucide-react";

import { RiAdminLine } from "react-icons/ri";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar";
import { Fragment } from "react";

export default function AdministrationLinks({
  children,
}: {
  children: React.ReactNode[] | React.ReactNode;
}) {
  return (
    <SidebarMenu>
      <Collapsible asChild defaultOpen={false} className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={"Administration"}>
              <RiAdminLine />
              <span>Administration</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {Array.isArray(children)
                ? children.map((child, index) => (
                    <Fragment key={index}>{child}</Fragment>
                  ))
                : children}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    </SidebarMenu>
  );
}
