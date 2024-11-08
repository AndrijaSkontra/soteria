import { auth } from "@/auth";
import { User } from "@/types/user";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const activeUser: User = session?.user as User;
  if (!activeUser) {
    redirect("/");
  }

  return <div>{children}</div>;
}
