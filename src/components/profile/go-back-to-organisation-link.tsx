"use client";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function GoBackToOrganisationLink() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");
  const locale = useLocale();
  return (
    <Link href={callbackUrl ? `${callbackUrl}` : `/${locale}/select-organisation`}>
      <div className="hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-xl">
        <ArrowLeftIcon className="w-6 h-6" />
      </div>
    </Link>
  );
}
