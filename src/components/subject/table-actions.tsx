"use client";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ResponsiveDialog from "@/components/ui/responsive-dialog";
import CleanSearchButton from "@/components/generic-table/clean-search-button";
import AddSubjectForm from "./add-subject-form";
import AdvancedSearchButton from "@/components/generic-table/advanced-search-button";
import AdvancedSearchSubject from "./advanced-search-subject";

export default function SubjectTableActions({ isAdmin, orgId }) {
  const router = useRouter();
  const [searchInput, setSearchInput] = useState("");
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  function dialogOpen(isOpen: boolean) {
    urlSearchParams.set("addSubject", String(isOpen));
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }

  function advancedSearchOpen(isOpen: boolean) {
    urlSearchParams.set("adv-search", String(isOpen));
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  }

  return (
    <>
      <div className="flex md:flex-row flex-col md:space-y-0 space-y-2 items-center md:space-x-2">
        <Input
          placeholder="Pretraživanje"
          disabled={urlSearchParams.get("adv-search") === "true"}
          onChange={(ev) => setSearchInput(ev.target.value)}
          value={searchInput}
        />
        <div className="flex items-center space-x-2 w-full md:w-auto">
          <AdvancedSearchButton
            setAdvancedSearchOpen={advancedSearchOpen}
            advancedSearchOpen={urlSearchParams.get("adv-search") === "true"}
          />
          <Button
            className="w-full md:w-auto"
            onClick={() => {
              urlSearchParams.set("search", searchInput);
              urlSearchParams.set("page", "1");
              router.push(`${pathname}?${urlSearchParams.toString()}`);
            }}
          >
            Pretraži
          </Button>
          <CleanSearchButton setSearchInput={setSearchInput} />
          {isAdmin && (
            <>
              <Button variant="secondary" onClick={() => dialogOpen(true)}>
                + Subjekt
              </Button>
              <ResponsiveDialog
                setIsOpenAction={dialogOpen}
                isOpen={searchParams.get("addSubject") === "true"}
                title="Dodaj subjekta"
                description="Obavezna polja su označena zvijezdicom"
              >
                <AddSubjectForm dialogOpen={dialogOpen} orgId={orgId} />
              </ResponsiveDialog>
            </>
          )}
        </div>
      </div>
      {urlSearchParams.get("adv-search") === "true" && (
        <AdvancedSearchSubject />
      )}
    </>
  );
}
