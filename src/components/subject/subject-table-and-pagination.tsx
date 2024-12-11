import React from "react";
import SubjectsTable from "./subject-table";
import TablePagination from "../generic-table/table-pagination";
import { getSubjectsData } from "@/lib/services/subject-service";
import { EmptyTable } from "../generic-table/empty-table";
import { Role } from "@prisma/client";
import { getUserOrganisationRolesFromDB } from "@/lib/services/organisation-service";

export default async function SubjectTableAndPagination({
  paramsData,
  searchParamsData,
  orgId,
  rows,
  page,
}) {
  const { subjects, pagesAmount } = await getSubjectsData(searchParamsData, paramsData);
  const roles: Role[] = await getUserOrganisationRolesFromDB(orgId);

  return (
    <>
      {subjects.length > 0 ? (
        <>
          <SubjectsTable roles={roles} subjects={subjects} rows={rows} page={page} />
          <TablePagination pagesAmount={pagesAmount} />
        </>
      ) : (
        <EmptyTable
          title="No subjects"
          description="There are no subjects you are looking for..."
        />
      )}
    </>
  );
}
