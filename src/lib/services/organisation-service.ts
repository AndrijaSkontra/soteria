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
