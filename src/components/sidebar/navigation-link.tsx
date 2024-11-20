"use client";
import { Link } from "@/i18n/routing";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { NavigationLinkType } from "@/types/app-types";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function NavigationLink({
  title,
  icon,
  url,
}: NavigationLinkType) {
  const t = useTranslations("NavigationLinks");
  const pathname = usePathname();
  const pathAsList = pathname.split("/");
  const lastItem = pathAsList[pathAsList.length - 1];
  console.log(lastItem);
  return (
    <SidebarMenuItem
      className={clsx(
        "",
        lastItem === title && "bg-gray-200 rounded-md dark:bg-gray-800",
      )}
    >
      <SidebarMenuButton asChild>
        <Link href={url}>
          {icon}
          {t(title)}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
