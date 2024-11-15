"use client";

import { SidebarMenu } from "@/components/ui/sidebar";
import AdministrationLinks from "@/components/administration-links";
import AdministrationLink from "./administration-link";
import NavigationLink from "./navigation-link";
import { NavigationLinkType } from "@/types/app-types";

export function MainNavigation({
  organisationId,
  links,
}: {
  organisationId: string;
  links: NavigationLinkType[];
}) {
  const basicLinks = links.filter((link) => link.type === "BASIC");
  const administrationLinks = links.filter(
    (link) => link.type === "ADMINISTRATION",
  );
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
                icon={admLink.icon}
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
