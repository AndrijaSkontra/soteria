import { Card, CardHeader, CardContent } from "@/components/ui/card";
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
  searchParams: Promise<{ callbackUrl: string; editModal: string }>;
  params: RouteParams;
}) {
  const searchParamsURL = await searchParams;
  const userInfo: UserInformationType = await getUserInformation();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full p-4">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-6">
            <GoBackToOrganisationLink
              callbackUrl={searchParamsURL.callbackUrl}
              locale={(await params).locale}
            />
            <h1 className="font-semibold text-2xl">Profile</h1>
          </div>
        </CardHeader>
        <CardContent>
          <UserInformation userInfo={userInfo} />

          <div className="flex flex-col space-y-4 mt-4">
            <EditProfileDialog
              userInfo={userInfo}
              searchParams={searchParamsURL}
            />
            <ChangePasswordDialog />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
