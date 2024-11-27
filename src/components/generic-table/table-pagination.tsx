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
import { useEffect, useMemo } from "react";

export default function TablePagination({
  pagesAmount,
}: {
  pagesAmount: number;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );
  const currentPage = searchParams.get("page") || String(1);
  const rowsPerPage = searchParams.get("rows") || String(10);

  useEffect(() => {
    if (Number(currentPage) > pagesAmount) {
      urlSearchParams.set("page", String(pagesAmount));
      router.push(`${pathname}?${urlSearchParams}`);
    }
  }, [currentPage, pagesAmount, pathname, router, urlSearchParams]);

  function changePage(pageNumber: number) {
    urlSearchParams.set("page", String(pageNumber));
    router.push(`${pathname}?${urlSearchParams}`);
  }

  function setRowsPerPage(rows: number) {
    urlSearchParams.set("rows", String(rows));
    router.push(`${pathname}?${urlSearchParams}`);
  }

  return (
    <div className="flex flex-row justify-between w-full md:justify-center md:items-center md:space-x-12 md:space-y-0">
      <div className="flex items-center space-x-2">
        <p className="hidden  md:inline font-medium text-nowrap mr-2">
          Rows per page
        </p>
        <Select
          onValueChange={(value) => setRowsPerPage(Number(value))}
          defaultValue={String(rowsPerPage)}
          value={String(rowsPerPage)}
        >
          <SelectTrigger className="w-[70px] bg-white">
            <SelectValue placeholder={String(rowsPerPage)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
            <SelectItem value="30">30</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <p className="text-nowrap font-medium mr-2 hidden  md:inline">{`Page ${currentPage} of ${pagesAmount}`}</p>
        <div className="flex items-center space-x-2">
          <Button
            className={pagesAmount === 1 ? "hidden" : ""}
            variant="outline"
            size="icon"
            onClick={() => changePage(1)}
            disabled={currentPage === "1"}
          >
            <ChevronsLeftIcon />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => changePage(Number(currentPage) - 1)}
            disabled={currentPage === "1"}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => changePage(Number(currentPage) + 1)}
            disabled={currentPage === String(pagesAmount)}
          >
            <ChevronRight />
          </Button>
          <Button
            className={pagesAmount === 1 ? "hidden" : ""}
            variant="outline"
            size="icon"
            onClick={() => changePage(pagesAmount)}
            disabled={currentPage === String(pagesAmount)}
          >
            <ChevronsRightIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
