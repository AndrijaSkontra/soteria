"use client";
import { Button } from "@/components/ui/button";
import { UserInformationType } from "@/types/app-types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { EditProfileForm } from "./edit-profile-form";
import ResponsiveDialog from "../ui/responsive-dialog";

export function EditProfileDialog({ userInfo }: { userInfo: UserInformationType }) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  function profileDialogOpen(isOpen: boolean) {
    const params = new URLSearchParams(searchParams);
    params.set("edit", String(isOpen));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      <Button onClick={() => profileDialogOpen(true)}>Edit Profile</Button>
      <ResponsiveDialog
        setIsOpenAction={profileDialogOpen}
        isOpen={searchParams.get("edit") === "true"}
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
      >
        <EditProfileForm userInfo={userInfo} />
      </ResponsiveDialog>
    </>
  );
}
