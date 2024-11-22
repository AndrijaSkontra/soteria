"use client";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddSubjectDialog from "./add-subject-dialog";
export default function TableActions() {
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");
  const pathname = usePathname();

  return (
    <div className="flex items-center space-x-2">
      <Input
        placeholder="Pretraživanje"
        onChange={(ev) => setSearchWord(ev.target.value)}
        value={searchWord}
      />
      <Button
        onClick={() => {
          router.push(`${pathname}?searchWord=${searchWord}`);
        }}
      >
        Pretraži
      </Button>
      <Button
        variant="secondary"
        onClick={() => {
          setSearchWord("");
          router.push(`${pathname}`);
        }}
      >
        Očisti
      </Button>
      <AddSubjectDialog />
    </div>
  );
}
