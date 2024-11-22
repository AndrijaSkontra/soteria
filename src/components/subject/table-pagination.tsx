"use client";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TablePagination({
  pagesAmount,
}: {
  pagesAmount: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  let currentPage = Number(searchParams.get("page"));
  let searchWord = searchParams.get("search");
  const rowsPerPage = searchParams.get("rows");
  if (!currentPage) {
    currentPage = 1;
  }
  if (!searchWord) {
    searchWord = "";
  }
  function changePage(direction: number) {
    router.push(
      `${pathname}?page=${currentPage + direction}&search=${searchWord}&rows=${rowsPerPage}`,
    );
  }

  function changePageDirect(pageNumber: number) {
    router.push(
      `${pathname}?page=${pageNumber}&search=${searchWord}&rows=${rowsPerPage}`,
    );
  }

  function setRowsPerPage(rows: number) {
    router.push(`${pathname}?page=1&search=${searchWord}&rows=${rows}`);
  }

  return (
    <div className="flex w-full justify-end items-center space-x-12">
      <div className="flex items-center space-x-2">
        <p className="font-medium text-nowrap">Rows per page</p>
        <Select
          onValueChange={(value) => setRowsPerPage(Number(value))}
          defaultValue={rowsPerPage || "10"}
        >
          <SelectTrigger className="w-[70px] bg-white">
            <SelectValue placeholder={rowsPerPage || "10"} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <p className="font-medium">{`Page ${currentPage} of ${pagesAmount}`}</p>
      <div className="flex items-center space-x-2">
        <Button
          className={pagesAmount === 1 ? "hidden" : ""}
          variant="outline"
          size="icon"
          onClick={() => changePageDirect(1)}
        >
          <ChevronsLeftIcon />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => changePage(-1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => changePage(1)}
          disabled={currentPage === pagesAmount}
        >
          <ChevronRight />
        </Button>
        <Button
          className={pagesAmount === 1 ? "hidden" : ""}
          variant="outline"
          size="icon"
          onClick={() => changePageDirect(pagesAmount)}
        >
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  );
}
