"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import CleanSearchButton from "@/components/generic-table/clean-search-button";
import AddSubjectForm from "./add-subject-form";
import AdvancedSearchSubject from "./advanced-search-subject";

export default function SubjectTableActions({ isAdmin, orgId }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isAdvSearchOn, setAdvSearchOn] = useState(false);

  const handleSearch = () => {
    if (searchInput !== "") {
      urlSearchParams.set("search", searchInput);
      urlSearchParams.set("page", "1");
      router.replace(`${pathname}?${urlSearchParams.toString()}`);
    }
  };

  return (
    <>
      <div className="flex md:flex-row flex-col md:space-y-0 space-y-2 items-center md:space-x-2">
        <Input
          placeholder="Pretraživanje"
          disabled={isAdvSearchOn}
          onChange={(ev) => setSearchInput(ev.target.value)}
          value={searchInput}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <Button className="w-full md:w-auto" disabled={isAdvSearchOn} onClick={handleSearch}>
            Pretraži
          </Button>
          <CleanSearchButton setSearchInput={setSearchInput} />
          {isAdmin && (
            <>
              <Button variant="secondary" onClick={() => setDialogOpen(true)}>
                + Subjekt
              </Button>
              <ResponsiveDialog
                setIsOpenAction={setDialogOpen}
                isOpen={dialogOpen}
                title="Dodaj subjekta"
                description="Obavezna polja su označena zvijezdicom"
              >
                <AddSubjectForm setDialogOpen={setDialogOpen} orgId={orgId} />
              </ResponsiveDialog>
            </>
          )}
        </div>
      </div>
      <AdvancedSearchSubject isOn={isAdvSearchOn} setIsOn={setAdvSearchOn} />
    </>
  );
}
