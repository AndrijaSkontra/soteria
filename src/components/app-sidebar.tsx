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
import { Organisation } from "@/types";

export function AppSidebar({
  organisations,
}: {
  organisations: Organisation[];
}) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <OrganizationSwitcher organisations={organisations} />
      </SidebarHeader>
      <SidebarContent>
        <MainNavigation />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
