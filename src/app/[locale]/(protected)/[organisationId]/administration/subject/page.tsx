import SubjectsTable from "@/components/subject/subject-table";
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
  console.log(subjects);

  return (
    <div className="p-4 lg:px-8">
      <SubjectsTable subjects={subjects} />
    </div>
  );
}
