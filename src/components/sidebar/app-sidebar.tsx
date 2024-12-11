"use client";

import * as React from "react";
import { MainNavigation } from "@/components/sidebar/nav-main";
import { OrganizationSwitcher } from "@/components/sidebar/organization-switcher";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "@/components/ui/sidebar";
import { NavSettings } from "@/components/sidebar/nav-settings";
import { NavigationLinkType, Organisation, OrganisationWithRoles } from "@/types/app-types";
import LanguageSwitcher from "./language-switcher";

type AppSidebarProps = {
  organisationsWithRoles: OrganisationWithRoles[];
  activeOrganisation: Organisation;
  navigationLinks: NavigationLinkType[];
};

export function AppSidebar({
  organisationsWithRoles,
  activeOrganisation,
  navigationLinks,
}: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader>
        <OrganizationSwitcher
          organisationsWithRoles={organisationsWithRoles}
          activeOrganisation={activeOrganisation}
        />
      </SidebarHeader>
      <SidebarContent>
        <MainNavigation links={navigationLinks} organisationId={activeOrganisation.id} />
      </SidebarContent>
      <SidebarFooter>
        <div className="p-2">
          <LanguageSwitcher />
        </div>
        <NavSettings />
      </SidebarFooter>
    </Sidebar>
  );
}
