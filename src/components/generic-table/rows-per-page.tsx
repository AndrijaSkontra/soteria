"use client";
import { usePathname, useRouter } from "@/i18n/routing";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RowsPerPage() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlSearchParams = useMemo(
    () => new URLSearchParams(searchParams.toString()),
    [searchParams],
  );
  const rowsPerPage = searchParams.get("rows") || String(10);

  function setRowsPerPage(rows: number) {
    urlSearchParams.set("rows", String(rows));
    router.push(`${pathname}?${urlSearchParams}`);
  }

  return (
    <div className="flex items-center space-x-2">
      <p className="hidden  md:inline font-medium text-nowrap mr-2">Rows per page</p>
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
  );
}
