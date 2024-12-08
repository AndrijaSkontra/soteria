"use client";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { loginAction } from "@/lib/serverActions/auth-actions";
import { useRouter } from "@/i18n/routing";
import { SubmitButton } from "../ui/submit-button-with-spinner";

const initialState = {
  message: "",
};

export function LoginForm() {
  const [state, formAction] = useActionState(loginAction, initialState);
  const router = useRouter();

  if (state.message === "login success") {
    //  INFO: error in console if we remove this timeout
    setTimeout(() => {
      router.push("/select-organisation");
    }, 1);
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>Enter your email below to login to your account</CardDescription>
      </CardHeader>
      <CardContent>
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
              <Input id="password" name="password" type="password" required />
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
      </CardContent>
    </Card>
  );
}
