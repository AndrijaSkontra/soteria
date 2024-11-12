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
  activeOrganisationId,
}: {
  organisations: Organisation[];
  activeOrganisationId;
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <OrganizationSwitcher organisations={organisations} />
      </SidebarHeader>
      <SidebarContent>
        <MainNavigation organisationId={activeOrganisationId} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
