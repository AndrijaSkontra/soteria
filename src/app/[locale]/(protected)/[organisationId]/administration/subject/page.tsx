import SubjectTableActions from "@/components/subject/table-actions";
import { RouteParams, SubjectSearchParams } from "@/types/app-types";
import { Role } from "@prisma/client";
import { getUserOrganisationRolesFromDB } from "@/lib/services/organisation-service";
import { Suspense } from "react";
import TableSkeletonTenRows from "@/components/generic-table/table-skeleton-10-rows";
import { DEFAULT_PAGE, DEFAULT_ROWS } from "@/lib/constants/app-constants";
import SubjectTableAndPagination from "@/components/subject/subject-table-and-pagination";

export default async function SubjectPage({
  searchParams,
  params,
}: {
  searchParams: SubjectSearchParams;
  params: RouteParams;
}) {
  const searchParamsData = await searchParams;
  const paramsData = await params;

  const roles: Role[] = await getUserOrganisationRolesFromDB(paramsData.organisationId);

  return (
    <div className="p-4 lg:px-8 space-y-4">
      <SubjectTableActions isAdmin={roles.includes("ADMIN")} orgId={paramsData.organisationId} />
      <div key={Math.random()} className="space-y-4">
        <Suspense fallback={<TableSkeletonTenRows />}>
          <SubjectTableAndPagination
            paramsData={paramsData}
            searchParamsData={searchParamsData}
            orgId={paramsData.organisationId}
            rows={searchParamsData.rows || DEFAULT_ROWS}
            page={searchParamsData.page || DEFAULT_PAGE}
          />
        </Suspense>
      </div>
    </div>
  );
}
