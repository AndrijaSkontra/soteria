import { Link } from "@/i18n/routing";
import { SidebarMenuSubButton, SidebarMenuSubItem } from "./ui/sidebar";
import { NavigationLinkType } from "@/types";

export default function AdministrationLink({
  icon,
  title,
  url,
}: NavigationLinkType) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <Link href={url}>
          {icon && icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
