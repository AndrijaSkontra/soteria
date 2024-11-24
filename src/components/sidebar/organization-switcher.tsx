"use client";

import * as React from "react";
import { ChevronsUpDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Organisation, OrganisationWithRoles } from "@/types/app-types";

export function OrganizationSwitcher({
  organisationsWithRoles,
  activeOrganisation,
}: {
  organisationsWithRoles: OrganisationWithRoles[];
  activeOrganisation: Organisation;
}) {
  const { isMobile } = useSidebar();

  const [activeOrganisationState, setActiveOrganisationState] =
    useState(activeOrganisation);

  const router = useRouter();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="flex items-center text-left text-sm">
                <div className="border-gray-300 border rounded-md bg-gray-100">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={activeOrganisationState.url}
                      className="object-scale-down p-1"
                    />
                    <AvatarFallback>ORG</AvatarFallback>
                  </Avatar>
                </div>
                <span className="truncate font-semibold ml-2">
                  {activeOrganisationState.name}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Organizations
            </DropdownMenuLabel>
            {organisationsWithRoles.map((orgWithRoles) => (
              <DropdownMenuItem
                key={orgWithRoles.organisation.id}
                onClick={() => {
                  router.push(`/${orgWithRoles.organisation.id}/dashboard`);
                  setActiveOrganisationState(orgWithRoles.organisation);
                }}
                className="gap-2 p-2"
              >
                {orgWithRoles.organisation.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
