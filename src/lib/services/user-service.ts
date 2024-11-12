import prisma from "@/index";

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
