import { Organisation, OrganisationWithRoles } from "@/app-types";
import prisma from "@/index";
import { getUserId } from "@/lib/get-user-id";
import { Role } from "@prisma/client";

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

export async function getUserOrganisationsWithRoles(): Promise<
  OrganisationWithRoles[]
> {
  const userOrganisationsWithRoles: OrganisationWithRoles[] =
    await prisma.organisationUser.findMany({
      where: {
        userId: await getUserId(),
      },
      select: {
        organisation: true,
        role: true,
      },
    });

  return userOrganisationsWithRoles;
}

export async function getOrganisationById(
  orgId: string,
): Promise<Organisation> {
  const organisation: Organisation | null =
    await prisma.organisation.findUnique({
      where: { id: orgId },
    });

  if (organisation) {
    return organisation;
  }

  throw new Error("No organisation with this id");
}

export async function getUserRolesForOrganisation(
  orgId: string,
): Promise<Role[]> {
  const orgUser = await prisma.organisationUser.findFirst({
    where: {
      userId: await getUserId(),
      organisationId: orgId,
      active: true,
    },
    select: {
      role: true,
    },
  });

  if (!orgUser) {
    return [];
  }

  return orgUser.role;
}
