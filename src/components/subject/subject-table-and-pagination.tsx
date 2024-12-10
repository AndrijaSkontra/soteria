import React from "react";
import SubjectsTable from "./subject-table";
import TablePagination from "../generic-table/table-pagination";
import { getSubjectsData } from "@/lib/services/subject-service";

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
      <SubjectsTable subjects={subjects} orgId={orgId} rows={rows} page={page} />
      <TablePagination pagesAmount={pagesAmount} />
    </>
  );
}
