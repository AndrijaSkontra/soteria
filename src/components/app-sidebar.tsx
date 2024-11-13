"use client";

import * as React from "react";
import { MainNavigation } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { OrganizationSwitcher } from "@/components/organization-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

export function AppSidebar({
  organisations,
  activeOrganisation,
}: {
  organisations: Organisation[];
  activeOrganisation: Organisation;
}) {
  return (
    <Sidebar>
      <SidebarHeader>
        <OrganizationSwitcher
          organisations={organisations}
          activeOrganisation={activeOrganisation}
        />
      </SidebarHeader>
      <SidebarContent>
        <MainNavigation organisationId={activeOrganisation.id} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
