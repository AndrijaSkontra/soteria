import { UserInformationType } from "@/types/app-types";

export default function UserInformation({ userInfo }: { userInfo: UserInformationType }) {
  return (
    <div className="space-y-2 mb-6">
      <p className="text-lg font-semibold">User Information</p>
      <p>
        <span className="font-semibold">Name:</span> {userInfo.firstName}
      </p>
      <p>
        <span className="font-semibold">Surname:</span> {userInfo.lastName}
      </p>
      <p>
        <span className="font-semibold">E-mail:</span> {userInfo.email}
      </p>
      <p>
        <span className="font-semibold">Contact number:</span> +{userInfo.contactNumber}
      </p>
    </div>
  );
}
