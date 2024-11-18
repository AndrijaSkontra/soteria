"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button-with-spinner";
import { useActionState } from "react";
import { updateUserAction } from "@/lib/serverActions/user-actions";
import { UserInformationType } from "@/types/app-types";
import { usePathname, useRouter } from "next/navigation";

const initialState = {
  message: "",
};

export function EditProfileDialog({
  userInfo,
  searchParams,
}: {
  userInfo: UserInformationType;
  searchParams: { callbackUrl: string; editModal: string };
}) {
  const [state, formAction] = useActionState(updateUserAction, initialState);
  const pathname = usePathname();
  const router = useRouter();

  function modalChange(isOpen: boolean) {
    const params = new URLSearchParams(searchParams);
    params.set("editModal", String(isOpen));
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <Dialog
      onOpenChange={(isOpen) => modalChange(isOpen)}
      open={searchParams.editModal === "true"}
    >
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="">
          <div className="">
            <form action={formAction}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    defaultValue={userInfo.email}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John"
                    defaultValue={userInfo.firstName}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="surname">Surname</Label>
                  <Input
                    id="surname"
                    name="surname"
                    type="text"
                    placeholder="Doe"
                    defaultValue={userInfo.lastName}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="contactNumber">Contact Number</Label>
                  <Input
                    id="contactNumber"
                    name="contactNumber"
                    type="tel"
                    placeholder="+1 234 567 8900"
                    defaultValue={userInfo.contactNumber}
                    required
                  />
                </div>
                <div className="flex w-full justify-center items-center">
                  {state.message &&
                  state.message !== "Your profile has been updated." ? (
                    <p className="text-red-500 text-sm">{state.message}.</p>
                  ) : (
                    <p className="text-green-500 text-sm">{state.message}</p>
                  )}
                </div>
                <div className="flex justify-center items-center">
                  <SubmitButton innerText="Update Profile" />
                </div>
                <DialogClose asChild>
                  <Button variant={"outline"}>Close</Button>
                </DialogClose>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
