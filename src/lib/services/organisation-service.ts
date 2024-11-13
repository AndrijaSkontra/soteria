import { OrganisationWithRoles } from "@/app-types";
import { auth } from "@/auth";
import prisma from "@/index";

export async function doesOrganisationExist(
  organisationId: string,
): Promise<boolean> {
  try {
    await prisma.organisation.findUnique({
      where: { id: organisationId },
    });
    return true;
  } catch {
    return false;
  }
}

export async function getUserOrganisations(): Promise<OrganisationWithRoles[]> {
  const session = await auth();
  const userId = session!.user.userId;

  console.log(userId);

  const userOrganisationsWithRoles: OrganisationWithRoles[] =
    await prisma.organisationUser.findMany({
      where: {
        userId: userId,
      },
      select: {
        organisation: true,
        role: true,
      },
    });

  return userOrganisationsWithRoles;
}

export async function getOrganisationById(id: string): Promise<Organisation> {
  const organisation: Organisation | null =
    await prisma.organisation.findUnique({
      where: { id: id },
    });
  if (organisation) {
    return organisation;
  }

  throw new Error("No organisation with this id");
}
