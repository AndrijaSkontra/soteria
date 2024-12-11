"use client";

import { SidebarMenu } from "@/components/ui/sidebar";
import AdministrationLinks from "@/components/sidebar/administration-links";
import AdministrationLink from "./administration-link";
import NavigationLink from "@/components/sidebar/navigation-link";
import { NavigationLinkType } from "@/types/app-types";

type MainNavigationProps = {
  organisationId: string;
  links: NavigationLinkType[];
};

export function MainNavigation({ organisationId, links }: MainNavigationProps) {
  const basicLinks = links.filter((link) => link.type === "BASIC");
  const administrationLinks = links.filter((link) => link.type === "ADMINISTRATION");
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
      {administrationLinks.length > 0 && (
        <AdministrationLinks>
          {administrationLinks.map((admLink, index) => {
            return (
              <AdministrationLink
                key={index}
                title={admLink.title}
                url={`/${organisationId}/administration/${admLink.url}`}
              />
            );
          })}
        </AdministrationLinks>
      )}
    </SidebarMenu>
  );
}
