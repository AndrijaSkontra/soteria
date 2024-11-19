import { Link } from "@/i18n/routing";
import { SidebarMenuSubButton, SidebarMenuSubItem } from "../ui/sidebar";
import { NavigationLinkType } from "@/types/app-types";

export default function AdministrationLink({ title, url }: NavigationLinkType) {
  return (
    <SidebarMenuSubItem>
      <SidebarMenuSubButton asChild>
        <Link href={url}>
          <span>{title}</span>
        </Link>
      </SidebarMenuSubButton>
    </SidebarMenuSubItem>
  );
}
