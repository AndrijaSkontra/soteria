"use client";

import { Organisation } from "@/types/organisation";
import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

export default function OrganisationSelect({
  organisations,
}: {
  organisations: Organisation[];
}) {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const [selectedOrganisation, setSelectedOrganisation] = useState(
    organisations[0].id,
  );
  const pathname = usePathname();
  const language: string = pathname.slice(0, 3);

  function handleChange(value: string) {
    setSelectedOrganisation(value);
  }

  return (
    <div className="flex flex-col space-y-2 max-w-44 mt-4">
      <Select onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue
            placeholder={
              organisations.length ? organisations[0].name : "no orgs"
            }
            defaultValue={organisations.length && organisations[0].id}
          />
        </SelectTrigger>
        <SelectContent>
          {organisations.map((organisation) => {
            return (
              <SelectItem key={organisation.id} value={organisation.id}>
                {organisation.name}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Button
        onClick={() => {
          router.push(`${language}/${selectedOrganisation}`);
        }}
      >
        {t("organisation-go-to")}
      </Button>
    </div>
  );
}
