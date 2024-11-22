import { Subject } from "@prisma/client";
import prisma from "@/index";

export async function getActiveSubjectsFromDB(
  rows: number,
  page?: number,
  searchWord?: string,
): Promise<{ subjects: Subject[]; pagesAmount: number }> {
  if (!page) {
    page = 1;
  }
  if (!rows) {
    rows = 10;
  }
  const skip = (page - 1) * rows;

  const whereClause: any = {
    active: true,
  };

  if (searchWord) {
    whereClause.OR = [
      {
        name: {
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
    take: rows,
  });

  const count = await prisma.subject.count({
    where: whereClause,
  });

  const pagesAmount = Math.ceil(count / rows);

  return { subjects: subjects, pagesAmount: pagesAmount };
}
