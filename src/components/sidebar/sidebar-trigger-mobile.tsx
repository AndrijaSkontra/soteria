"use client";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";

export default function SidebarTriggerMobile() {
  const { isMobile } = useSidebar();

  return (
    <>
      {isMobile && (
        <>
          <SidebarTrigger />
        </>
      )}
    </>
  );
}
