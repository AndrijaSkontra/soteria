"use server";

import { z } from "zod";
import {
  addSubjectToDB,
  disableSubjectInDB,
} from "../services/subject-service";

export async function disableSubject(subjectId) {
  await disableSubjectInDB(subjectId);
}

export async function updateSubjectAction(prevState: any, formData: FormData) {
  console.log(formData);
  return { status: "PENDING", errors: {} };
}

export async function addSubjectAction(prevState: any, formData: FormData) {
  const schema = getValidationSchemaObject();
  const validatedFields = schema.safeParse({
    name: (formData.get("name") as string).trim(),
    address: (formData.get("address") as string).trim(),
    contactNumber: (formData.get("contactNumber") as string).replace(/\s/g, ""),
    oib: (formData.get("oib") as string).trim(),
    email: (formData.get("email") as string).trim(),
    country: (formData.get("country") as string).trim(),
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
    country: validatedFields.data.country,
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
    name: z.string().min(3, { message: "Name must be at least 3 characters" }),
    address: z
      .string()
      .min(3, { message: "Address must be at least 3 characters" })
      .optional()
      .or(z.literal("")),
    contactNumber: z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{1,14}$/, {
        message: "Invalid contact number",
      })
      .optional()
      .or(z.literal("")),
    oib: z
      .string()
      .trim()
      .length(11, { message: "OIB must be exactly 11 digits" })
      .regex(/^\d+$/, { message: "OIB must contain only digits" })
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .email({ message: "Invalid email address" })
      .optional()
      .or(z.literal("")),
    country: z.string().optional(),
  });
}
