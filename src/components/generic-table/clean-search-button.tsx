"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function CleanSearchButton() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const urlSearchParams = new URLSearchParams(searchParams.toString());

  return (
    <Button
      className="w-full md:w-auto"
      variant="secondary"
      onClick={() => {
        urlSearchParams.set("search", "");
        router.push(`${pathname}?${urlSearchParams}`);
      }}
    >
      Očisti
    </Button>
  );
}
