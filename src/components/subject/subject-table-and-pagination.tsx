import React from "react";
import SubjectsTable from "./subject-table";
import TablePagination from "../generic-table/table-pagination";
import { getSubjectsData } from "@/lib/services/subject-service";
import { EmptyTable } from "../generic-table/empty-table";

export default async function SubjectTableAndPagination({
  paramsData,
  searchParamsData,
  orgId,
  rows,
  page,
}) {
  const { subjects, pagesAmount } = await getSubjectsData(searchParamsData, paramsData);

  return (
    <>
      {subjects.length > 0 ? (
        <>
          <SubjectsTable subjects={subjects} orgId={orgId} rows={rows} page={page} />
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
