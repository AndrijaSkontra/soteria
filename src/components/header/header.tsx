import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Breadcrumbs from "@/components/header/breadcrumbs";

export default async function Header({
  organisationName,
}: {
  organisationName: string;
}) {
  return (
    <header>
      <div className="flex items-center gap-2 p-4">
        <SidebarTrigger />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumbs organisationName={organisationName} />
      </div>
    </header>
  );
}
