import PaginationButtons from "./pagination-buttons";
import { getSubjectPages } from "@/lib/services/subject-service";
import RowsPerPage from "./rows-per-page";

type Props = {
  searchParamsData: any;
  paramsData: any;
};

export default async function TablePagination({ searchParamsData, paramsData }: Props) {
  const tablePages: number = await getSubjectPages(searchParamsData, paramsData);

  return (
    <div className="flex flex-row justify-between w-full md:justify-center md:items-center md:space-x-12 md:space-y-0">
      <RowsPerPage />
      <PaginationButtons tablePages={tablePages} />
    </div>
  );
}
