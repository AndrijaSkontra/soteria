import PaginationButtons from "./pagination-buttons";
import RowsPerPage from "./rows-per-page";

export default async function TablePagination({ pagesAmount }) {
  return (
    <div className="flex flex-row justify-between w-full md:justify-center md:items-center md:space-x-12 md:space-y-0">
      <RowsPerPage />
      <PaginationButtons tablePages={pagesAmount} />
    </div>
  );
}
