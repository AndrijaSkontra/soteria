import SubjectsTable from "@/components/subject/subject-table";
import TableActions from "@/components/subject/table-actions";
import TablePagination from "@/components/subject/table-pagination";
import { getActiveSubjectsFromDB } from "@/lib/services/subject-service";
import { Subject } from "@prisma/client";

export default async function SubjectPage({
  searchParams,
}: {
  searchParams: Promise<{ searchWord: string; page: string }>;
}) {
  const searchParamsData = await searchParams;
  const subjects: Subject[] = await getActiveSubjectsFromDB(
    Number(searchParamsData.page),
    searchParamsData?.searchWord,
  );

  return (
    <div className="p-4 lg:px-8 space-y-4">
      <TableActions />
      <SubjectsTable subjects={subjects} />
      <TablePagination />
    </div>
  );
}
