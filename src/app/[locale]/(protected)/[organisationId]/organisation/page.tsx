import { RouteParams } from "@/types/app-types";
import { getTranslations } from "next-intl/server";

export default async function OrganisationPage({ params }: { params: RouteParams }) {
  const t = await getTranslations("HomePage");
  const orgId = await params.then((data) => data.organisationId);
  return (
    <div>
      <h1>
        {t("welcome")}: {orgId}
      </h1>
    </div>
  );
}
