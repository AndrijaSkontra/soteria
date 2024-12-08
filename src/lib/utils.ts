import { NavigationLinkType } from "@/types/app-types";
import { Role } from "@prisma/client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function linksToShowOnUI(roles: Role[], links: NavigationLinkType[]): NavigationLinkType[] {
  let finalLinks: NavigationLinkType[] = [];

  // Object.keys(Role) will return the lenght of Enum Role
  // If they are the same size just return all links
  if (roles.length === Object.keys(Role).length) {
    return links;
  }

  if (roles.includes(Role.INSPECTOR)) {
    finalLinks = links.filter((link) => link.roles!.includes(Role.INSPECTOR));
  }

  if (roles.includes(Role.ADMIN)) {
    finalLinks = links.filter((link) => link.roles!.includes(Role.ADMIN));
  }

  if (roles.includes(Role.MANAGER)) {
    finalLinks = links.filter((link) => link.roles!.includes(Role.MANAGER));
  }

  finalLinks = Array.from(new Set(finalLinks));

  return finalLinks;
}
