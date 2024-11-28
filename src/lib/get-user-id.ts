import { auth } from "@/auth";

export async function getUserId(): Promise<string | undefined> {
  const session = await auth();
  const userId = session!.user.userId;
  return userId;
}
