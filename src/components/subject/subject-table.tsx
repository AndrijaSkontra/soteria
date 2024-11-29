import { Role, Subject } from "@prisma/client";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import SubjectTableDropdown from "./subject-table-dropdown";
import { getUserOrganisationRolesFromDB } from "@/lib/services/organisation-service";
import clsx from "clsx";

export default async function SubjectsTable({
  orgId,
  subjects,
  page,
  rows,
}: {
  orgId: string;
  subjects: Subject[];
  page: number;
  rows: number;
}) {
  const roles: Role[] = await getUserOrganisationRolesFromDB(orgId);

  const isAdmin = roles.includes("ADMIN");

  return (
    <div className="border border-gray-200 rounded-lg overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="xl:table-cell hidden">#</TableHead>
            <TableHead>Naziv</TableHead>
            <TableHead className="xl:table-cell hidden">Adresa</TableHead>
            <TableHead className="md:table-cell hidden">Kontakt</TableHead>
            <TableHead className="xl:table-cell hidden">E-mail</TableHead>
            <TableHead className="xl:table-cell hidden">Država</TableHead>
            <TableHead className="xl:table-cell hidden">OIB</TableHead>
            <TableHead className={clsx("text-center", !isAdmin && "hidden")}>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject, index) => (
            <TableRow key={subject.id}>
              <TableCell className="xl:table-cell hidden">
                {Number(index + 1) + Number(page - 1) * Number(rows)}
              </TableCell>
              <TableCell>{subject.name}</TableCell>
              <TableCell className="xl:table-cell hidden">
                {subject.address || "-"}
              </TableCell>
              <TableCell className="md:table-cell hidden">
                {subject.contact || "-"}
              </TableCell>
              <TableCell className="xl:table-cell hidden">
                {subject.email || "-"}
              </TableCell>
              <TableCell className="xl:table-cell hidden">
                {subject.country || "-"}
              </TableCell>
              <TableCell className="xl:table-cell hidden">
                {subject.oib || "-"}
              </TableCell>
              <TableCell className={clsx("text-center", !isAdmin && "hidden")}>
                <SubjectTableDropdown subject={subject} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
