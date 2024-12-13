"use client";

import { usePathname, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function CleanSearchButton({ setSearchInput }) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Button
      className="w-full md:w-auto"
      variant="outline"
      onClick={() => {
        setSearchInput("");
        router.replace(`${pathname}?`);
      }}
    >
      Očisti
    </Button>
  );
}
