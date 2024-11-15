import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function GoBackToOrganisationLink({
  callbackUrl,
  locale,
}: {
  callbackUrl: string;
  locale: string;
}) {
  return (
    <Link
      href={callbackUrl ? `${callbackUrl}` : `/${locale}/select-organisation`}
    >
      <div className="hover:bg-gray-300 dark:hover:bg-gray-700 p-2 rounded-xl">
        <ArrowLeftIcon className="w-6 h-6" />
      </div>
    </Link>
  );
}
