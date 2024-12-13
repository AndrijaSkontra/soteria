import { ChangePasswordDialog } from "@/components/profile/change-profile-dialog";
import { EditProfileDialog } from "@/components/profile/edit-profile-dialog";
import GoBackToOrganisationLink from "@/components/profile/go-back-to-organisation-link";
import UserInformation from "@/components/profile/user-information";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getUserInformation } from "@/lib/services/user-service";
import { UserInformationType } from "@/types/app-types";

export default async function ProfilePage() {
  const userInfo: UserInformationType = await getUserInformation();

  return (
    <div className="flex md:items-center justify-center min-h-screen">
      <Card className="max-w-md w-full p-4">
        <CardHeader>
          <div className="flex items-center space-x-3 mb-6">
            <GoBackToOrganisationLink />
            <h1 className="font-semibold text-2xl">Profile</h1>
          </div>
        </CardHeader>
        <CardContent>
          <UserInformation userInfo={userInfo} />

          <div className="flex flex-col space-y-4 mt-4">
            <EditProfileDialog userInfo={userInfo} />
            <ChangePasswordDialog />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
