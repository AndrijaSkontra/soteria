import { RouteParams, UserInformationType } from "@/types/app-types";
import { getUserInformation } from "@/lib/services/user-service";
import UserInformation from "@/components/user-information";
import GoBackToOrganisationLink from "@/components/go-back-to-organisation-link";
import { EditProfileDialog } from "@/components/edit-profile-dialog";
import { ChangePasswordDialog } from "@/components/change-profile-dialog";

export default async function ProfilePage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
  params: RouteParams;
}) {
  const callbackUrl = (await searchParams).callbackUrl;
  const userInfo: UserInformationType = await getUserInformation();

  return (
    <div className="p-4 max-w-96">
      <div className="flex items-center space-x-3 mb-6">
        <GoBackToOrganisationLink
          callbackUrl={callbackUrl}
          locale={(await params).locale}
        />
        <h1 className="font-semibold text-2xl">Profil</h1>
      </div>

      <UserInformation userInfo={userInfo} />

      <div className="flex flex-col space-y-4">
        <EditProfileDialog userInfo={userInfo} />
        <ChangePasswordDialog />
      </div>
    </div>
  );
}
