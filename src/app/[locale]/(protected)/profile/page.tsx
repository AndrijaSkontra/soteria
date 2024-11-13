import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export default async function ProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl: string }>;
}) {
  const callbackUrl = (await searchParams).callbackUrl;
  return (
    <div>
      <h1 className="font-semibold text-xl">Profile page</h1>
      {callbackUrl ? (
        <Link href={`/${callbackUrl}/dashboard`}>
          <Button>Save and exit</Button>
        </Link>
      ) : (
        <Link href={`/select-organisation`}>
          <Button>Save and exit</Button>
        </Link>
      )}
    </div>
  );
}
