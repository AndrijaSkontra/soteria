"use server";

import { z } from "zod";

import { signIn } from "@/auth";
import { ensureError } from "@/lib/ensure-error";

export async function loginAction(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(3),
  });

  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { message: "Password must be longer than 3 characters" };
  }

  try {
    await signIn("credentials", {
      email: validatedFields.data.email,
      password: validatedFields.data.password,
      redirect: false,
    });
  } catch (err) {
    ensureError(err);
    return { message: "Wrong password" };
  }

  return {
    message: "login success",
  };
}
