"use server";

import { z } from "zod";
import { addSubjectToDB } from "../services/subject-service";

export async function addSubjectAction(prevState: any, formData: FormData) {
  const schema = getValidationSchemaObject();
  const validatedFields = schema.safeParse({
    name: (formData.get("name") as string).trim(),
    address: (formData.get("address") as string).trim(),
    contactNumber: (formData.get("contactNumber") as string).replace(/\s/g, ""),
    oib: (formData.get("oib") as string).replace(/\s/g, ""),
    email: (formData.get("email") as string).replace(/\s/g, ""),
  });

  if (!validatedFields.success) {
    return {
      message: "Please the form again",
      errors: validatedFields.error.format(),
    };
  }

  await addSubjectToDB({
    name: validatedFields.data.name,
    oib: validatedFields.data.oib,
    email: validatedFields.data.email,
    address: validatedFields.data.address,
    contact: validatedFields.data.contactNumber,
  });

  return {
    status: "ADDED",
    subjectName: validatedFields.data.name,
    errors: {},
  };
}

/**
 * Makes a zod object that will validate form data
 * @returns z.object
 */
function getValidationSchemaObject() {
  return z.object({
    name: z.string().min(3, { message: "Name is required" }),
    address: z.string().optional(),
    contactNumber: z
      .string()
      .optional()
      .refine((value) => !value || /^\d{9,}$/.test(value), {
        message: "Contact number must be at least 9 digits",
      }),
    oib: z
      .string()
      .optional()
      .refine(
        (value) => !value || (value.length === 11 && /^\d+$/.test(value)),
        {
          message: "OIB must be exactly 11 digits",
        },
      ),
    email: z
      .string()
      .optional()
      .refine((value) => !value || value.includes("@"), {
        message: "Invalid email address",
      }),
  });
}
