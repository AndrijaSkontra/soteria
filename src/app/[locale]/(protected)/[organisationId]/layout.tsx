import { auth } from "@/auth";
import prisma from "@/index";
import { RouteParams } from "@/types/page-types";
import { redirect } from "next/navigation";

export default async function OrganisationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: RouteParams;
}) {
  const organisationId: string = (await params).organisationId;
  const session = await auth();

  const isOrganisationPageValid =
    (await doesOrganisationExist(organisationId)) &&
    (await isUserInOrganisation(
      organisationId,
      session!.user!.userId as string,
    ));

  if (!isOrganisationPageValid) {
    redirect("/not-found");
  }

  return <div>{children}</div>;
}

async function doesOrganisationExist(organisationId: string): Promise<boolean> {
  try {
    await prisma.organisation.findUnique({
      where: { id: organisationId },
    });
    return true;
  } catch {
    return false;
  }
}

async function isUserInOrganisation(
  organisationId: string,
  userId: string,
): Promise<boolean> {
  const org = await prisma.organisationUser.findFirst({
    where: {
      userId: userId,
      organisationId: organisationId,
    },
  });
  if (!org) {
    return false;
  } else {
    return true;
  }
}
