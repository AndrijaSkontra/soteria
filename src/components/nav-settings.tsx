"use client";

import { signOut } from "next-auth/react";
import { BadgeCheck, ChevronsUpDown, LogOut } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useRouter } from "@/i18n/routing";
import {
  IoMoonOutline,
  IoSettingsOutline,
  IoSunnyOutline,
} from "react-icons/io5";
import { usePathname } from "next/navigation";
import { createCookie } from "@/lib/serverActions/cookie-actions";
import { getCookie } from "@/lib/get-cookie";

export function NavSettings() {
  const theme = getCookie("theme");
  const { isMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();

  function switchTheme() {
    if (theme === "light") {
      createCookie("theme", "dark");
    } else {
      createCookie("theme", "light");
    }
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <IoSettingsOutline />
              <a className="font-semibold">Settings</a>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <a className="font-semibold">Bob Smith</a>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  console.log(pathname);
                  router.push(`/profile?callbackUrl=${pathname}`);
                }}
              >
                <BadgeCheck />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={switchTheme}>
                {theme === "light" ? <IoSunnyOutline /> : <IoMoonOutline />}
                Change Theme
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
