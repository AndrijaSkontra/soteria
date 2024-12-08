"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "@/components/ui/submit-button-with-spinner";
import { useActionState } from "react";
import { updateUserAction } from "@/lib/serverActions/user-actions";
import { UserInformationType } from "@/types/app-types";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "../ui/button";

const initialState = {
  message: "",
};

export function EditProfileForm({ userInfo }: { userInfo: UserInformationType }) {
  const [state, formAction] = useActionState(updateUserAction, initialState);

  return (
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
          {state.message && state.message !== "Your profile has been updated." ? (
            <p className="text-red-500 text-sm">{state.message}</p>
          ) : (
            <p className="text-green-500 text-sm">{state.message}</p>
          )}
        </div>
        <div className="flex justify-end items-center space-x-2">
          <SubmitButton innerText="Update Profile" />
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </div>
      </div>
    </form>
  );
}
