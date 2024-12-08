import React from "react";
import SubjectsTable from "./subject-table";
import TablePagination from "../generic-table/table-pagination";
import { getSubjectsData } from "@/lib/services/subject-service";

type Props = {
  paramsData;
  searchParamsData;
  orgId;
  rows;
  page;
};

export default async function SubjectTableAndPagination({
  paramsData,
  searchParamsData,
  orgId,
  rows,
  page,
}: Props) {
  const { subjects, pagesAmount } = await getSubjectsData(searchParamsData, paramsData);

  return (
    <>
      <SubjectsTable subjects={subjects} orgId={orgId} rows={rows} page={page} />
      <TablePagination pagesAmount={pagesAmount} />
    </>
  );
}
