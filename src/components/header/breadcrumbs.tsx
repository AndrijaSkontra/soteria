"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Link, usePathname } from "@/i18n/routing";
import { ChevronRight } from "lucide-react";
export default function Breadcrumbs({ organisationName }: { organisationName: string }) {
  const pathname = usePathname();
  let list = pathname.split("/");
  list.shift();
  list[0] = organisationName;
  list = list.map((elem: string) => elem.charAt(0).toUpperCase() + elem.slice(1));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {list.map((elem, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <ChevronRight className="stroke-gray-400" />
              <BreadcrumbItem>
                <BreadcrumbPage className="font-medium">
                  <Link href="#">{elem}</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
