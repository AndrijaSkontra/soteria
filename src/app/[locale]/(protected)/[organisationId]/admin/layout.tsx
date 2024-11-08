import { auth } from "@/auth";
import prisma from "@/index";
import { RouteParams } from "@/types/page-types";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: RouteParams;
}) {
  const session = await auth();
  const organisationId = (await params).organisationId;
  const isAdmin = await isUserAdmin(organisationId, session!.user!.userId);
  if (!isAdmin) {
    return <p>Access denied</p>;
  }
  return <div>{children}</div>;
}

async function isUserAdmin(
  organisationId: string,
  userId: string,
): Promise<boolean> {
  try {
    const userRoles = await prisma.organisationUser.findFirst({
      where: {
        userId: userId,
        organisationId: organisationId,
        role: {
          has: "ADMIN",
        },
      },
      select: { role: true },
    });
    return userRoles !== null;
  } catch {
    //  TODO: this redirect should be in the parent layout
    redirect("/not-found");
  }
}
