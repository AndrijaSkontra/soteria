"use client";

import { useTranslations } from "next-intl";

export default function OrganisationSelect() {
  const t = useTranslations("HomePage");

  return (
    <div className="flex flex-col space-y-2 max-w-24 mt-4">
      <select name="organisation" className="border-2 border-black">
        <option value="Apple">Apple</option>
      </select>
      <button>{t("organisation-go-to")}</button>
    </div>
  );
}
