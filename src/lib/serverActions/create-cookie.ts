"use server";

import { cookies } from "next/headers";

export async function createCookie(key: string, value: any) {
  const cookieStore = await cookies();
  cookieStore.set(key, value);
}
