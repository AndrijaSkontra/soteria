import { EmptyTable } from "../generic-table/empty-table";
import TablePagination from "../generic-table/table-pagination";
import ResponsiveDialog from "../ui/responsive-dialog";
import SubjectsTable from "./subject-table";
import { Role } from "@prisma/client";
import React from "react";

import { getUserOrganisationRolesFromDB } from "@/lib/services/organisation-service";
import { getSubjectsData } from "@/lib/services/subject-service";

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
      <ResponsiveDialog
        isOpen={searchParamsData.edit}
        title={`Edit`}
        description="Change data about the subject"
      >
        {/* <UpdateSubjectForm setIsOpenAction={setIsEditModalOpen} subject={currentSubject} /> */}
        <p>hello</p>
      </ResponsiveDialog>
    </>
  );
}
