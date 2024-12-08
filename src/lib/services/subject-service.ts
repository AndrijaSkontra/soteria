import prisma from "@/index";
import { AdvancedSubjectSearch, CreateSubjectDTO } from "@/types/app-types";
import { revalidatePath, revalidateTag } from "next/cache";
import { getUserOrganisationRolesFromDB } from "./organisation-service";
import { Role } from "@prisma/client";
import { DEFAULT_PAGE, DEFAULT_ROWS } from "@/lib/constants/app-constants";

export async function getActiveSubjectsFromDB(
  orgId: string,
  searchParam: string | AdvancedSubjectSearch = "",
  rows: number = DEFAULT_ROWS,
  page: number = DEFAULT_PAGE,
): Promise<{ subjects: any[]; pagesAmount: number }> {
  // removing empty search params (like: "") from searchParam object
  Object.keys(searchParam).forEach((field) => {
    if (searchParam[field] === "") {
      delete searchParam[field];
    }
  });

  const skip = (page - 1) * rows;

  const stringFields = ["name", "address", "oib", "contact", "email", "country"];

  const whereClause: any = {
    active: true,
    organisationId: orgId,
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
    whereClause.AND = Object.keys(searchParam).map((field) => ({
      [field]: {
        contains: searchParam[field],
        mode: "insensitive",
      },
    }));
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

export async function addSubjectToDB(organisationId: string, createSubjectDto: CreateSubjectDTO) {
  const roles: Role[] = await getUserOrganisationRolesFromDB(organisationId);
  if (!roles.includes("ADMIN")) {
    throw new Error("You don't have permissions to add subjects!");
  }
  await prisma.subject.create({
    data: {
      name: createSubjectDto.name,
      email: createSubjectDto.email,
      oib: createSubjectDto.oib,
      contact: createSubjectDto.contact,
      address: createSubjectDto.address,
      country: createSubjectDto.country,
      organisationId: organisationId,
    },
  });

  //  INFO: this will update the subjects page
  revalidateTag("subjects");
}

export async function updateSubjectInDB(
  orgId: string,
  subjectId: string,
  createSubjectDto: CreateSubjectDTO,
) {
  const roles: Role[] = await getUserOrganisationRolesFromDB(orgId);
  if (!roles.includes("ADMIN")) {
    throw new Error("You don't have permissions to delete subjects!");
  }
  const updateData: Record<string, any> = {};
  for (const [key, value] of Object.entries(createSubjectDto)) {
    if (value !== "") {
      updateData[key] = value;
    }
  }

  if (Object.keys(updateData).length > 0) {
    await prisma.subject.update({
      where: { id: subjectId },
      data: updateData,
    });

    revalidateTag("subjects");
  } else {
    throw new Error("No valid fields provided to update.");
  }
}

export async function disableSubjectInDB(subjectId: string, orgId: string) {
  const roles: Role[] = await getUserOrganisationRolesFromDB(orgId);
  if (roles.includes("ADMIN")) {
    await prisma.subject.update({
      where: {
        id: subjectId,
        organisationId: orgId,
      },
      data: {
        active: false,
      },
    });
  } else {
    throw new Error("You don't have permissions to delete subjects!");
  }

  revalidateTag("subjects");
}

export async function getSubjectsData(searchParamsData, paramsData) {
  if (!searchParamsData?.search || searchParamsData.search === "") {
    const advSearchData: AdvancedSubjectSearch = {
      name: searchParamsData.name,
      address: searchParamsData.address,
      oib: searchParamsData.oib,
      contact: searchParamsData.contact,
      email: searchParamsData.email,
      country: searchParamsData.country,
    };

    return await getActiveSubjectsFromDB(
      paramsData.organisationId,
      advSearchData,
      searchParamsData.rows,
      searchParamsData.page,
    );
  } else {
    return await getActiveSubjectsFromDB(
      paramsData.organisationId,
      searchParamsData?.search,
      searchParamsData.rows,
      searchParamsData.page,
    );
  }
}
