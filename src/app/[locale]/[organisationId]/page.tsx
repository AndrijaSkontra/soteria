import { getTranslations } from "next-intl/server";

export default async function SomePage({ params }: PageProps) {
  const t = await getTranslations("HomePage");
  return (
    <div>
      <h1>
        {t("welcome")}: {params.organisationId}
      </h1>
    </div>
  );
}
