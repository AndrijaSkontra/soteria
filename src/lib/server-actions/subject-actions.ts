"use server";

import { z } from "zod";
import {
  addSubjectToDB,
  disableSubjectInDB,
  updateSubjectInDB,
} from "@/lib/services/subject-service";
import { addSubjectLogToDB } from "../services/subject-log-service";

export async function disableSubject(subjectId: string, orgId: string) {
  await disableSubjectInDB(subjectId, orgId);
}

export async function updateSubjectAction(prevState: any, formData: FormData) {
  if (checkIsFormDataEmpty(formData)) {
    return { status: "NOCHANGE", errors: {} };
  }

  const schema = getValidationForUpdatingSubject();
  const validatedFields = getValidatedFields(formData, schema);

  if (!validatedFields.success) {
    return {
      status: "NOCHANGE",
      errors: validatedFields.error.format(),
    };
  }

  const returnObj = await updateSubjectInDB(
    String(formData.get("organisationId")),
    String(formData.get("subjectId")),
    {
      name: validatedFields.data.name,
      oib: validatedFields.data.oib,
      email: validatedFields.data.email,
      address: validatedFields.data.address,
      contact: validatedFields.data.contactNumber,
      country: validatedFields.data.country,
    },
  )
    .then(() => {
      return {
        status: "UPDATED",
        errors: {},
      };
    })
    .catch(() => {
      return { status: "ERROR", errors: {} };
    });

  return returnObj;
}

export async function addSubjectAction(prevState: any, formData: FormData) {
  const schema = getValidationForAddingSubject();
  const validatedFields = getValidatedFields(formData, schema);

  if (!validatedFields.success) {
    return {
      message: "Please fix the form.",
      errors: validatedFields.error.format(),
    };
  }

  await addSubjectToDB(String(formData.get("organisationId")), {
    name: validatedFields.data.name,
    oib: validatedFields.data.oib,
    email: validatedFields.data.email,
    address: validatedFields.data.address,
    contact: validatedFields.data.contactNumber,
    country: validatedFields.data.country,
  });

  await addSubjectLogToDB("CREATE");

  return {
    status: "ADDED",
    subjectName: validatedFields.data.name,
    errors: {},
  };
}

function getValidatedFields(formData: FormData, schema) {
  const name = String(formData.get("name")).trim() || undefined;
  const address = String(String(formData.get("address"))) || undefined;
  const contactNumber = String(formData.get("contactNumber")) || undefined;
  const oib = String(formData.get("oib")) || undefined;
  const email = String(formData.get("email")) || undefined;
  const country = String(formData.get("country")) || undefined;
  const validatedFields = schema.safeParse({
    name: name,
    address: address,
    contactNumber: contactNumber,
    oib: oib,
    email: email,
    country: country,
  });
  return validatedFields;
}

/**
 * Makes a zod object that will validate form data for adding subjects
 * @returns z.object
 */
function getValidationForAddingSubject() {
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
      .regex(/^\+?[1-9]\d{9,14}$/, {
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
    email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
    country: z.string().optional(),
  });
}

/**
 * Makes a zod object that will validate form data for updating subjects
 * @returns z.object
 */
function getValidationForUpdatingSubject() {
  return z.object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters" })
      .optional()
      .or(z.literal("")),
    address: z
      .string()
      .min(3, { message: "Address must be at least 3 characters" })
      .optional()
      .or(z.literal("")),
    contactNumber: z
      .string()
      .trim()
      .regex(/^\+?[1-9]\d{9,14}$/, {
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
    email: z.string().email({ message: "Invalid email address" }).optional().or(z.literal("")),
    country: z.string().optional(),
  });
}

function checkIsFormDataEmpty(formData): boolean {
  const fieldsToCheck = ["name", "address", "country", "contactNumber", "oib", "email"];

  const allFieldsEmpty = fieldsToCheck.every((field) => formData.get(field) === "");
  return allFieldsEmpty;
}
