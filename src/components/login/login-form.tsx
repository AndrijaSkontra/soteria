"use client";

import { PasswordInput } from "../ui/password-input";
import { SubmitButton } from "../ui/submit-button-with-spinner";
import Link from "next/link";
import { useActionState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@/i18n/routing";
import { loginAction } from "@/lib/server-actions/auth-actions";

const initialState = {
  message: "",
};

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);
  const router = useRouter();

  if (state.message === "login success") {
    //  INFO: error if we remove this timeout
    setTimeout(() => {
      router.push("/select-organisation");
    }, 1);
  }

  return (
    <>
      <form action={formAction}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="john@example.com" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <PasswordInput id="password" name="password" required />
          </div>
          <div className="flex w-full justify-center items-center">
            {state.message !== "login success" && (
              <p className="text-red-500 text-sm">{state.message}</p>
            )}
          </div>
          <div className="flex justify-center items-center">
            <SubmitButton innerText="Login" className="w-full" />
          </div>
        </div>
      </form>
      <div className="mt-4 text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link href="#" className="underline">
          Sign up
        </Link>
      </div>
    </>
  );
}
