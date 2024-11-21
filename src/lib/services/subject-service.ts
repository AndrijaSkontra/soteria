import { Subject } from "@prisma/client";
import prisma from "@/index";

export async function getActiveSubjectsFromDB(
  page?: number,
  searchWord?: string,
): Promise<Subject[]> {
  if (!page) {
    page = 1;
  }
  const PAGE_SIZE = 10;
  const skip = (page - 1) * PAGE_SIZE;

  const whereClause: any = {
    active: true,
  };

  if (searchWord) {
    whereClause.OR = [
      {
        firstName: {
          contains: searchWord,
          mode: "insensitive",
        },
      },
      {
        lastName: {
          contains: searchWord,
          mode: "insensitive",
        },
      },
      {
        address: {
          contains: searchWord,
          mode: "insensitive",
        },
      },
    ];
  }

  const subjects = await prisma.subject.findMany({
    where: whereClause,
    skip,
    take: PAGE_SIZE,
  });

  return subjects;
}
