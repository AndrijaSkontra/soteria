import { Link } from "@/i18n/routing";
import { SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { NavigationLinkType } from "@/types";

export default function NavigationLink({
  title,
  icon,
  url,
}: NavigationLinkType) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <Link href={url}>
          {icon}
          {title}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
