import prisma from "@/index";
import { Organisation, User } from "@/types";

export async function getUserFromDb(
  email: string,
  password: string,
): Promise<User> {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: password,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      active: true,
    },
  });

  if (!user) {
    throw Error("No user");
  }

  const newUser: User = { ...user, userId: user.id };
  return newUser;
}

export async function isUserAdmin(
  organisationId: string,
  userId: string,
): Promise<boolean> {
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
}

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

export async function isUserInOrganisation(
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

export async function getUserOrganisations(
  userId: string,
): Promise<Organisation[]> {
  const organisationUserRecords = await prisma.organisationUser.findMany({
    where: { userId },
    select: { organisationId: true },
  });

  const organisationIds = organisationUserRecords.map(
    (record) => record.organisationId,
  );

  const organisations = await prisma.organisation.findMany({
    where: {
      id: { in: organisationIds },
    },
  });

  return organisations;
}
