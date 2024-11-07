import { signIn } from "@/auth";
import OrganisationSelect from "@/components/organisation-select";
import prisma from "@/index";
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("HomePage");
  const organisations: Organisation[] = await getOrganisations();

  return (
    <div>
      <h1>{t("title")}</h1>
      <OrganisationSelect organisations={organisations} />
      <form
        action={async (formData) => {
          "use server";
          await signIn("credentials", formData);
        }}
        className="flex flex-col space-y-4 mt-12 max-w-44"
      >
        <input name="email" type="email" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <button>Sign In</button>
      </form>
    </div>
  );
}

async function getOrganisations(): Promise<Organisation[]> {
  const orgs = await prisma.organisation.findMany();
  console.log(orgs, "😸");
  return orgs;
}
