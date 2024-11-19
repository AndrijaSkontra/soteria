"use client";
import { Link } from "@/i18n/routing";
import { SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";
import { useTranslations } from "next-intl";

export default function AdministrationLink({
  title,
  url,
}: {
  title: string;
  url: string;
}) {
  const t = useTranslations("NavigationLinks");
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <Link href={url}>
          <span>{t(title)}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
