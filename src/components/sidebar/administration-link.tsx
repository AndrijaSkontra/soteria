"use client";

import { SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

import { Link } from "@/i18n/routing";

export default function AdministrationLink({ title, url }: { title: string; url: string }) {
  const t = useTranslations("NavigationLinks");
  const pathname = usePathname();
  const pathAsList = pathname.split("/");
  const lastItem = pathAsList[pathAsList.length - 1];
  return (
    <SidebarMenuSubItem
      className={clsx("", lastItem === title && "bg-gray-200 rounded-md dark:bg-gray-800")}
    >
      <SidebarMenuSubButton asChild>
        <Link href={url}>
          <span>{t(title)}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
