import prisma from "@/index";
import { AdvancedSubjectSearch, CreateSubjectDTO } from "@/types/app-types";
import { revalidatePath } from "next/cache";
import { getUserOrganisationRolesFromDB } from "./organisation-service";
import { Role, Subject } from "@prisma/client";
import { DEFAULT_PAGE, DEFAULT_ROWS } from "@/lib/constants/app-constants";

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

  revalidatePath("/");
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

    revalidatePath("/");
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

  revalidatePath("/");
}

export async function getSubjectsData(searchParamsData, paramsData) {
  if (searchParamsData?.search) {
    return await getActiveSubjectsFromDB(
      paramsData.organisationId,
      searchParamsData?.search,
      searchParamsData.rows,
      searchParamsData.page,
    );
  } else {
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
  }
}

/**
 * Get all active subjects based on the filter (searchParam).
 * If searchParams is simple string it will search all fields inside the subject.
 * If searchParams is AdvancedSubjectSearch it will search only specified fields.
 * @author Andrija Skontra
 */
export async function getActiveSubjectsFromDB(
  orgId: string,
  searchParam: string | AdvancedSubjectSearch = "",
  rows: number = DEFAULT_ROWS,
  page: number = DEFAULT_PAGE,
): Promise<{ subjects: Subject[]; pagesAmount: number }> {
  const skipPages = (page - 1) * rows;

  // this whereClause filters subjects
  const whereClause: any = {
    active: true,
    organisationId: orgId,
  };

  // if when we use spotlight search (search all fields)
  if (typeof searchParam === "string" && searchParam.trim().length > 0) {
    // check does any field contain searchParam
    const stringFields = ["name", "address", "oib", "contact", "email", "country"];
    whereClause.OR = stringFields.map((field) => ({
      [field]: {
        contains: searchParam,
        mode: "insensitive",
      },
    }));
    // if advanced search was used
  } else if (
    typeof searchParam === "object" &&
    searchParam !== null &&
    Object.keys(searchParam).length > 0
  ) {
    // removing empty search params (like: "") from searchParam: AdvancedSearchSubject object
    Object.keys(searchParam).forEach((field) => {
      if (searchParam[field] === "") {
        delete searchParam[field];
      }
    });
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
      skip: skipPages,
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
