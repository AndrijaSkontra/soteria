"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

type Props = {
  tablePages: number;
};

export default function PaginationButtons({ tablePages }: Props) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );
  const currentPage = searchParams.get("page") || String(1);

  useEffect(() => {
    if (Number(currentPage) > tablePages) {
      urlSearchParams.set("page", String(tablePages));
      router.push(`${pathname}?${urlSearchParams}`);
    }
  }, [currentPage, tablePages, pathname, router, urlSearchParams]);

  function changePage(pageNumber: number) {
    urlSearchParams.set("page", String(pageNumber));
    router.push(`${pathname}?${urlSearchParams}`);
  }

  return (
    <div className="flex items-center space-x-2">
      <p className="text-nowrap font-medium mr-2 hidden  md:inline">{`Page ${currentPage} of ${tablePages}`}</p>
      <div className="flex items-center space-x-2">
        <Button
          className={tablePages === 1 ? "hidden" : ""}
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
          disabled={currentPage === String(tablePages)}
        >
          <ChevronRight />
        </Button>
        <Button
          className={tablePages === 1 ? "hidden" : ""}
          variant="outline"
          size="icon"
          onClick={() => changePage(tablePages)}
          disabled={currentPage === String(tablePages)}
        >
          <ChevronsRightIcon />
        </Button>
      </div>
    </div>
  );
}
