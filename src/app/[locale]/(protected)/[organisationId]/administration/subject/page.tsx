import SubjectsTable from "@/components/subject/subject-table";
import SubjectTableActions from "@/components/subject/table-actions";
import TablePagination from "@/components/generic-table/table-pagination";
import { getActiveSubjectsFromDB } from "@/lib/services/subject-service";
import { FaUserAltSlash } from "react-icons/fa";
import { RouteParams } from "@/types/app-types";
import { Role } from "@prisma/client";
import { getUserOrganisationRolesFromDB } from "@/lib/services/organisation-service";

export default async function SubjectPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ search: string; page: number; rows: number }>;
  params: RouteParams;
}) {
  const searchParamsData = await searchParams;
  const paramsData = await params;
  const { subjects, pagesAmount } = await getActiveSubjectsFromDB(
    paramsData.organisationId,
    searchParamsData?.search,
    searchParamsData.rows,
    searchParamsData.page,
  );

  const roles: Role[] = await getUserOrganisationRolesFromDB(
    paramsData.organisationId,
  );

  return (
    <div className="p-4 lg:px-8 space-y-4">
      <SubjectTableActions
        isAdmin={roles.includes("ADMIN")}
        orgId={paramsData.organisationId}
      />
      {pagesAmount !== 0 ? (
        <>
          <SubjectsTable
            orgId={paramsData.organisationId}
            rows={searchParamsData.rows || 10}
            subjects={subjects}
            page={searchParamsData.page || 1}
          />
          <TablePagination pagesAmount={pagesAmount} />
        </>
      ) : (
        <div className="flex items-center justify-center">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 flex space-x-2">
            <FaUserAltSlash className="size-7" />
            <p className="text-center text-lg font-bold">No Subjects</p>
          </div>
        </div>
      )}
    </div>
  );
}
