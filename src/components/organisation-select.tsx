"use client";

import { useTranslations } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";

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

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedOrganisation(event.target.value);
    console.log(event.target.value);
  }

  return (
    <div className="flex flex-col space-y-2 max-w-36 mt-4">
      <select
        defaultValue={organisations.length && organisations[0].id}
        onChange={handleChange}
        name="organisation"
        className="border-2 border-black"
      >
        {organisations.map((organisation) => {
          return (
            <option key={organisation.id} value={organisation.id}>
              {organisation.name}
            </option>
          );
        })}
      </select>
      <button
        className="border-black border-2 cursor-pointer"
        onClick={() => {
          router.push(`${pathname}/${selectedOrganisation}`);
        }}
      >
        {t("organisation-go-to")}
      </button>
    </div>
  );
}
