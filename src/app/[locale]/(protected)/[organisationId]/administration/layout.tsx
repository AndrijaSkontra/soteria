import { RouteParams } from "@/types/app-types";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
  params: RouteParams;
}) {
  return <div>{children}</div>;
}
