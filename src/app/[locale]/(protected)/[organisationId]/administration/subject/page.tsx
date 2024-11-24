import SubjectsTable from "@/components/subject/subject-table";
import TableActions from "@/components/subject/table-actions";
import TablePagination from "@/components/subject/table-pagination";
import { getActiveSubjectsFromDB } from "@/lib/services/subject-service";

export default async function SubjectPage({
  searchParams,
}: {
  searchParams: Promise<{ search: string; page: string; rows: string }>;
}) {
  const searchParamsData = await searchParams;
  const { subjects, pagesAmount } = await getActiveSubjectsFromDB(
    Number(searchParamsData.rows),
    Number(searchParamsData.page),
    searchParamsData?.search,
  );

  console.log(subjects, " nice");

  return (
    <div className="p-4 lg:px-8 space-y-4">
      <TableActions />
      <SubjectsTable subjects={subjects} />
      <TablePagination pagesAmount={pagesAmount} />
    </div>
  );
}
