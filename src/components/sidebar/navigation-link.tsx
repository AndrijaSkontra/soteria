"use client";
import { Link } from "@/i18n/routing";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { NavigationLinkType } from "@/types/app-types";
import { useTranslations } from "next-intl";

export default function NavigationLink({
  title,
  icon,
  url,
}: NavigationLinkType) {
  const t = useTranslations("NavigationLinks");
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={url}>
          {icon}
          {t(title)}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
