import prisma from "@/index";
import { getUserId } from "@/lib/get-user-id";
import { Organisation, OrganisationWithRoles } from "@/types/app-types";
import { Role } from "@prisma/client";
import { isUserInOrganisation } from "./user-service";
import { getLocale } from "next-intl/server";
import { redirect } from "@/i18n/routing";

export async function doesOrganisationExist(organisationId: string): Promise<boolean> {
  try {
    await prisma.organisation.findUnique({
      where: { id: organisationId, active: true },
    });
    return true;
  } catch {
    return false;
  }
}

export async function getUserOrganisationsWithRoles(): Promise<OrganisationWithRoles[]> {
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

export async function getOrganisationById(orgId: string): Promise<Organisation> {
  const organisation: Organisation | null = await prisma.organisation.findUnique({
    where: { id: orgId },
  });

  if (organisation) {
    return organisation;
  }

  throw new Error("No organisation with this id");
}

export async function getUserOrganisationRolesFromDB(orgId: string): Promise<Role[]> {
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

export function getUserOrganisationRoles(
  activeOrg: Organisation,
  userOrgWithRoles: OrganisationWithRoles[],
) {
  const roles: Role[] | undefined = userOrgWithRoles.find(
    (uo) => uo.organisation.id === activeOrg.id,
  )?.role;
  if (roles) {
    return roles;
  } else {
    throw Error("No roles connected to current user");
  }
}

export async function checkIsOrganisationValid(organisationId: string) {
  const isOrganisationPageValid =
    (await doesOrganisationExist(organisationId)) && (await isUserInOrganisation(organisationId));

  if (!isOrganisationPageValid) {
    const locale = await getLocale();
    redirect({ href: "select-organisation", locale: locale });
  }
}
