import { User } from "next-auth";

import prisma from "@/index";
import { getUserId } from "@/lib/get-user-id";
import { UserInformationType } from "@/types/app-types";

export async function isUserInOrganisation(organisationId: string): Promise<boolean> {
  const org = await prisma.organisationUser.findFirst({
    where: {
      userId: await getUserId(),
      organisationId: organisationId,
      active: true,
    },
  });
  if (!org) {
    return false;
  } else {
    return true;
  }
}

export async function getActiveUserFromDB(email: string, password: string): Promise<User> {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
      password: password,
      active: true,
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

  const newUser: User = { ...user, id: user.id };
  return newUser;
}

export async function getUserInformation(): Promise<UserInformationType> {
  const user: UserInformationType | null = await prisma.user.findFirst({
    where: {
      id: await getUserId(),
    },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      contactNumber: true,
    },
  });

  if (!user) {
    throw Error("No user information");
  }

  return user;
}

export async function isUserAdmin(organisationId: string): Promise<boolean> {
  const userRoles = await prisma.organisationUser.findFirst({
    where: {
      userId: await getUserId(),
      organisationId: organisationId,
      role: {
        has: "ADMIN",
      },
    },
    select: { role: true },
  });
  return userRoles !== null;
}
export async function updateUserDataInDatabase(data: UserInformationType) {
  await prisma.user.update({
    where: {
      id: await getUserId(),
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      contactNumber: data.contactNumber,
    },
  });
}
