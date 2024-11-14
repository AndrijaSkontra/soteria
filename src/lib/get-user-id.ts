import { auth } from "@/auth";

export async function getUserId(): Promise<string> {
  const session = await auth();
  const userId = session!.user.userId;
  return userId;
}
