"use server";

import { updateUserDataInDatabase } from "../services/user-service";
import { getLocale } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { UserInformationType } from "@/types/app-types";

export async function updateUserAction(
  prevState: {
    message: string;
  },
  formData: FormData,
) {
  const schema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    firstName: z.string().min(2, { message: "Name can't be shorter than 2 characters" }),
    lastName: z.string().min(2, { message: "Surname can't be shorter than 2 characters" }),
    contactNumber: z.string().min(5, { message: "Invalid contact number" }),
  });

  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    firstName: formData.get("name"),
    lastName: formData.get("surname"),
    contactNumber: formData.get("contactNumber"),
  });

  if (!validatedFields.success) {
    const errorMessage = validatedFields.error.errors[0].message;
    return { message: errorMessage };
  }

  try {
    await updateUserDataInDatabase(validatedFields.data as UserInformationType);
    revalidatePath(`/${getLocale()}/profile`);
  } catch {
    return {
      message: "There was an error updating your information",
    };
  }

  return {
    message: "Your profile has been updated.",
  };
}
