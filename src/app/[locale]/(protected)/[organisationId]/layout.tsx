import { auth } from "@/auth";
import { doesOrganisationExist, isUserInOrganisation } from "@/lib/data_access";
import { RouteParams } from "@/types/page-types";
import { redirect } from "next/navigation";

export default async function OrganisationLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: RouteParams;
}) {
  const organisationId: string = (await params).organisationId;
  const session = await auth();

  const isOrganisationPageValid =
    (await doesOrganisationExist(organisationId)) &&
    (await isUserInOrganisation(
      organisationId,
      session!.user.userId as string,
    ));

  if (!isOrganisationPageValid) {
    redirect("/not-found");
  }

  return <div>{children}</div>;
}
