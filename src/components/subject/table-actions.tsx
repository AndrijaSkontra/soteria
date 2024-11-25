"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddSubjectDialog from "@/components/subject/add-subject-dialog";
import CleanSearchButton from "@/components/generic-table/clean-search-button";

export default function TableActions() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  return (
    <div className="flex md:flex-row flex-col md:space-y-0 space-y-2 items-center space-x-2">
      <Input
        placeholder="Pretraživanje"
        onChange={(ev) => setSearchWord(ev.target.value)}
        value={searchWord}
      />
      <div className="flex items-center space-x-2 w-full md:w-auto">
        <Button
          className="w-full md:w-auto"
          onClick={() => {
            urlSearchParams.set("search", searchWord);
            urlSearchParams.set("page", "1");
            router.push(`${pathname}?${urlSearchParams.toString()}`);
          }}
        >
          Pretraži
        </Button>
        <CleanSearchButton />
        <AddSubjectDialog />
      </div>
    </div>
  );
}
