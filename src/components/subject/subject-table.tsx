import ResponsiveDialog from "../ui/responsive-dialog";
import SubjectTableDropdown from "./subject-table-dropdown";
import UpdateSubjectForm from "./update-subject-form";
import { Role, Subject } from "@prisma/client";
import clsx from "clsx";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SubjectsTable({
  page,
  rows,
  subjects,
  roles,
}: {
  page: number;
  rows: number;
  subjects: Subject[];
  roles: Role[];
}) {
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
            <TableHead className={clsx("text-center", !isAdmin && "hidden")}>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subjects.map((subject, index) => (
            <TableRow key={subject.id}>
              <TableCell className="xl:table-cell hidden">
                {Number(index + 1) + Number(page - 1) * Number(rows)}
              </TableCell>
              <TableCell>{subject.name}</TableCell>
              <TableCell className="xl:table-cell hidden">{subject.address || "-"}</TableCell>
              <TableCell className="md:table-cell hidden">{subject.contact || "-"}</TableCell>
              <TableCell className="xl:table-cell hidden">{subject.email || "-"}</TableCell>
              <TableCell className="xl:table-cell hidden">{subject.country || "-"}</TableCell>
              <TableCell className="xl:table-cell hidden">{subject.oib || "-"}</TableCell>
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

// <ResponsiveDialog
//   isOpen={isDetailsModalOpen}
//   setIsOpenAction={setIsDetailsModalOpen}
//   title={`Details`}
//   description="Subject info"
// >
//   <SubjectDetails subject={currentSubject} />
// </ResponsiveDialog>
// <ResponsiveDialog
//   isOpen={isEditModalOpen}
//   setIsOpenAction={setIsEditModalOpen}
//   title={`Edit`}
//   description="Change data about the subject"
// >
//   <UpdateSubjectForm setIsOpenAction={setIsEditModalOpen} subject={currentSubject} />
// </ResponsiveDialog>
// <ResponsiveDialog
//   isOpen={isDeleteModalOpen}
//   setIsOpenAction={setIsDeleteModalOpen}
//   title={`Remove`}
//   description="Are you sure you want to remove this subject?"
// >
//   <DeleteSubject setIsDeleteOpen={setIsDeleteModalOpen} subject={currentSubject} />
// </ResponsiveDialog>
