import prisma from "@/index";
import { AdvancedSubjectSearch, CreateSubjectDTO } from "@/types/app-types";
import { revalidateTag } from "next/cache";

export async function getActiveSubjectsFromDB(
  searchParam: string | AdvancedSubjectSearch = "",
  rows: number = 10,
  page: number = 1,
): Promise<{ subjects: any[]; pagesAmount: number }> {
  const skip = (page - 1) * rows;

  const stringFields = [
    "name",
    "address",
    "oib",
    "contact",
    "email",
    "country",
  ];

  let whereClause: any = {
    active: true,
  };

  if (typeof searchParam === "string" && searchParam.trim().length > 0) {
    whereClause.OR = stringFields.map((field) => ({
      [field]: {
        contains: searchParam,
        mode: "insensitive",
      },
    }));
  } else if (
    typeof searchParam === "object" &&
    searchParam !== null &&
    Object.keys(searchParam).length > 0
  ) {
    whereClause = {
      active: true,
      ...searchParam,
    };
  }

  try {
    const subjects = await prisma.subject.findMany({
      where: whereClause,
      skip,
      take: Number(rows),
    });

    const count = await prisma.subject.count({
      where: whereClause,
    });

    const pagesAmount = Math.ceil(count / rows);

    return { subjects: subjects, pagesAmount: pagesAmount };
  } catch {
    return { subjects: [], pagesAmount: 0 };
  }
}

export async function addSubjectToDB(createSubjectDto: CreateSubjectDTO) {
  await prisma.subject.create({
    data: {
      name: createSubjectDto.name,
      email: createSubjectDto.email,
      oib: createSubjectDto.oib,
      contact: createSubjectDto.contact,
      address: createSubjectDto.address,
      country: createSubjectDto.country,
    },
  });

  //  INFO: this will update the subjects page
  revalidateTag("subjects");
}

export async function disableSubjectInDB(subjectId: string) {
  await prisma.subject.update({
    where: {
      id: subjectId,
    },
    data: {
      active: false,
    },
  });

  revalidateTag("subjects");
}
