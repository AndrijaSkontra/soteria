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

export default function TablePagination() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  let currentPage = Number(searchParams.get("page"));
  let searchWord = searchParams.get("searchWord");
  if (!currentPage) {
    currentPage = 1;
  }
  if (!searchWord) {
    searchWord = "";
  }
  function changePage(direction) {
    router.push(
      `${pathname}?page=${currentPage + direction}&searchWord=${searchWord}`,
    );
  }

  return (
    <div className="flex w-full justify-center items-center space-x-2">
      <p className="font-medium mr-10">{`Page ${currentPage} of 10`}</p>
      <Button disabled={false} variant="outline" size="icon">
        <ChevronsLeftIcon />
      </Button>
      <Button variant="outline" size="icon" onClick={() => changePage(-1)}>
        <ChevronLeft />
      </Button>
      <Button variant="outline" size="icon" onClick={() => changePage(1)}>
        <ChevronRight />
      </Button>
      <Button disabled={false} variant="outline" size="icon">
        <ChevronsRightIcon />
      </Button>
    </div>
  );
}
